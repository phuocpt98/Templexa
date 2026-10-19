#!/usr/bin/env node
/**
 * deploy.js — Deploy lên Cloudflare Pages AN TOÀN: chỉ deploy đúng code đã có trên GitHub.
 *
 *   npm run deploy               # nhánh khác main → bản PREVIEW: https://<nhánh>.templexa.pages.dev
 *   npm run deploy -- --prod     # đang ở main → PRODUCTION templexa.vn (bắt buộc ghi --prod)
 *
 * Cloudflare KHÔNG tự lấy code từ GitHub — máy nào chạy wrangler thì upload thư mục trên máy đó.
 * Quy trình bắt buộc (script tự làm theo đúng thứ tự):
 *   1. Không còn file sửa dở / file mới chưa commit (thứ chưa commit thì GitHub không có) → DỪNG.
 *   2. PULL: GitHub có commit mới → git pull --rebase (xung đột → huỷ, báo, DỪNG).
 *      Nhánh khác main: phải chứa main mới nhất (đã merge main).
 *   3. PROD: gắn data.js?v=<hash> vào HTML (stamp-assets.js) — Cloudflare cache JS 1 ngày, đổi link thì
 *      khách nhận data.js mới ngay. Có thay đổi → tự commit. Chỉ chạy ở --prod để nhánh job không đụng ?v=
 *      (tránh xung đột 19 file HTML khi merge).
 *   4. PUSH: có commit chưa lên GitHub → git push.
 *   5. DEPLOY: wrangler pages deploy kèm mã commit → dashboard Cloudflare ghi rõ bản nào.
 * KHÔNG gõ thẳng `npx wrangler pages deploy .` — sẽ bỏ qua toàn bộ kiểm tra trên.
 */
const { execSync, spawnSync } = require('child_process');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const PROJECT = process.env.CF_PAGES_PROJECT || 'templexa';
const PROD = process.argv.includes('--prod');

const sh = (c, o = {}) => (execSync(c, { cwd: ROOT, encoding: 'utf8', ...o }) || '').trim();
const die = m => { console.error('\n✗ ' + m + '\n'); process.exit(1); };
const step = m => console.log('▸ ' + m);

step('Lấy trạng thái mới nhất từ GitHub');
sh('git fetch origin --prune', { stdio: 'pipe' });
const branch = sh('git rev-parse --abbrev-ref HEAD');
if (branch === 'HEAD') die('Đang ở trạng thái detached HEAD — checkout một nhánh trước.');

const dirty = sh('git status --porcelain');
if (dirty) die('Còn thay đổi chưa commit:\n' + dirty.split('\n').slice(0, 15).join('\n') + '\n→ commit trước (git add -A && git commit -m "...") rồi deploy lại — script tự pull + push.');

const count = range => Number(sh(`git rev-list --count ${range}`));
const hasRemote = sh(`git ls-remote --heads origin ${branch}`) !== '';

if (branch === 'main' && !PROD) die('Đang ở main = PRODUCTION. Chắc chắn thì chạy: npm run deploy -- --prod\n  (Thử nghiệm thì tạo nhánh: git switch -c job-<ten> rồi npm run deploy)');
if (branch !== 'main' && PROD) die('--prod chỉ dùng trên main. Nhánh "' + branch + '" chỉ deploy preview — merge vào main để lên production.');

// 1. PULL trước — lấy việc người khác đã đẩy lên (Muse, nhân viên, máy khác)
if (hasRemote && count(`HEAD..origin/${branch}`)) {
    step(`GitHub có ${count(`HEAD..origin/${branch}`)} commit mới → pull`);
    const r = spawnSync('git', ['pull', '--rebase', 'origin', branch], { cwd: ROOT, stdio: 'inherit' });
    if (r.status !== 0) {
        spawnSync('git', ['rebase', '--abort'], { cwd: ROOT, stdio: 'ignore' });
        die('Pull bị xung đột (2 người sửa cùng chỗ) — đã huỷ, code giữ nguyên. Chạy git pull, sửa xung đột, commit rồi deploy lại.');
    }
}
if (branch !== 'main') {
    const missing = count('HEAD..origin/main');
    if (missing) die(`Nhánh "${branch}" thiếu ${missing} commit mới của main — chạy: git merge origin/main (xử lý xung đột nếu có), rồi deploy lại.`);
}

// 2. STAMP (chỉ production) — data.js?v=<hash> trong HTML, có đổi thì tự commit
if (PROD) {
    sh('node scripts/stamp-assets.js', { stdio: 'inherit' });
    const changed = sh('git status --porcelain');
    if (changed) {
        const files = sh('git diff --name-only').split('\n').filter(Boolean);
        if (files.some(f => !f.endsWith('.html'))) die('stamp-assets.js đổi file ngoài HTML — kiểm tra lại:\n' + changed);
        sh('git add -- ' + files.map(f => JSON.stringify(f)).join(' '));
        sh('git commit -q -m "stamp: data.js?v= (tự động khi deploy production)"');
        step(`Đã gắn phiên bản data.js mới vào ${files.length} trang HTML (commit tự động)`);
    }
}

// 3. PUSH — GitHub luôn là bản đầy đủ nhất, giống hệt bản sắp deploy
const ahead = hasRemote ? count(`origin/${branch}..HEAD`) : 1;
if (ahead) {
    step(hasRemote ? `Push ${ahead} commit lên GitHub` : `Đẩy nhánh mới "${branch}" lên GitHub`);
    const r = spawnSync('git', ['push', '-u', 'origin', branch], { cwd: ROOT, stdio: 'inherit' });
    if (r.status !== 0) die('Push lỗi — kiểm tra quyền GitHub / mạng rồi chạy lại.');
}

const sha = sh('git rev-parse HEAD');
const msg = sh('git log -1 --format=%s').slice(0, 300);
step(`Deploy ${PROD ? 'PRODUCTION' : 'preview'} · nhánh ${branch} · ${sha.slice(0, 7)}`);
const r = spawnSync('npx', ['wrangler', 'pages', 'deploy', '.', '--project-name', PROJECT, '--branch', branch,
    '--commit-hash', sha, '--commit-message', msg, '--commit-dirty=false'], { cwd: ROOT, stdio: 'inherit' });
if (r.status !== 0) die('wrangler lỗi (mã ' + r.status + ')');

const alias = branch.toLowerCase().replace(/[^a-z0-9-]/g, '-').slice(0, 28).replace(/-+$/, '');
console.log('\n✓ Xong: ' + (PROD ? 'https://templexa.vn' : `https://${alias}.${PROJECT}.pages.dev`) + '\n');
