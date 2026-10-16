#!/usr/bin/env node
/**
 * deploy.js — Deploy lên Cloudflare Pages AN TOÀN: chỉ deploy đúng code đã có trên GitHub.
 *
 *   npm run deploy               # nhánh khác main → bản PREVIEW: https://<nhánh>.templexa.pages.dev
 *   npm run deploy -- --prod     # đang ở main → PRODUCTION templexa.vn (bắt buộc ghi --prod)
 *
 * Cloudflare KHÔNG tự lấy code từ GitHub — máy nào chạy wrangler thì upload thư mục trên máy đó.
 * Vì vậy trước khi upload, script kiểm:
 *   1. Không còn file sửa dở / file mới chưa commit (thứ chưa commit thì GitHub không có).
 *   2. main: máy cũ hơn GitHub → tự pull --ff-only; máy có commit chưa push → DỪNG.
 *      nhánh khác: phải chứa main mới nhất (đã merge main) và đã push.
 *   3. Gắn protect thiệp cưới (protect-wedding.js) → commit + push nếu có thay đổi.
 *   4. wrangler pages deploy kèm mã commit → dashboard Cloudflare ghi rõ bản nào.
 * KHÔNG gõ thẳng `npx wrangler pages deploy .` — sẽ bỏ qua toàn bộ kiểm tra trên.
 */
const { execSync, spawnSync } = require('child_process');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const PROJECT = process.env.CF_PAGES_PROJECT || 'templexa';
const PROD = process.argv.includes('--prod');

const sh = (c, o = {}) => execSync(c, { cwd: ROOT, encoding: 'utf8', ...o }).trim();
const die = m => { console.error('\n✗ ' + m + '\n'); process.exit(1); };
const step = m => console.log('▸ ' + m);

step('Lấy trạng thái mới nhất từ GitHub');
sh('git fetch origin --prune', { stdio: 'pipe' });
const branch = sh('git rev-parse --abbrev-ref HEAD');
if (branch === 'HEAD') die('Đang ở trạng thái detached HEAD — checkout một nhánh trước.');

const dirty = sh('git status --porcelain');
if (dirty) die('Còn thay đổi chưa commit:\n' + dirty.split('\n').slice(0, 15).join('\n') + '\n→ commit + push trước rồi deploy.');

const count = range => Number(sh(`git rev-list --count ${range}`));
const hasRemote = sh(`git ls-remote --heads origin ${branch}`) !== '';

if (branch === 'main') {
    if (!PROD) die('Đang ở main = PRODUCTION. Chắc chắn thì chạy: npm run deploy -- --prod\n  (Thử nghiệm thì tạo nhánh: git switch -c job-<ten> rồi npm run deploy)');
    const behind = count('main..origin/main'), ahead = count('origin/main..main');
    if (behind && ahead) die(`main lệch với GitHub (thiếu ${behind}, thừa ${ahead} commit) — git pull --rebase rồi push trước.`);
    if (behind) { step(`Máy đang thiếu ${behind} commit → pull`); sh('git pull --ff-only origin main', { stdio: 'inherit' }); }
    if (ahead) die(`Có ${ahead} commit chưa push lên GitHub — chạy: git push origin main`);
} else {
    if (PROD) die('--prod chỉ dùng trên main. Nhánh "' + branch + '" chỉ deploy preview — merge vào main để lên production.');
    const missing = count(`HEAD..origin/main`);
    if (missing) die(`Nhánh "${branch}" thiếu ${missing} commit mới của main — chạy: git merge origin/main (xử lý xung đột nếu có), push, rồi deploy lại.`);
    if (!hasRemote) die(`Nhánh "${branch}" chưa có trên GitHub — chạy: git push -u origin ${branch}`);
    const unpushed = count(`origin/${branch}..HEAD`), stale = count(`HEAD..origin/${branch}`);
    if (stale) die(`GitHub có ${stale} commit mới hơn trên nhánh "${branch}" — git pull trước.`);
    if (unpushed) die(`Có ${unpushed} commit chưa push — chạy: git push origin ${branch}`);
}

step('Gắn protect thiệp cưới');
sh('node scripts/protect-wedding.js', { stdio: 'pipe' });
if (sh('git status --porcelain')) {
    sh('git add -A');
    sh('git commit -q -m "deploy: protect thiệp cưới"');
    sh(`git push -q origin ${branch}`, { stdio: 'inherit' });
    step('Đã commit + push phần protect');
}

const sha = sh('git rev-parse HEAD');
const msg = sh('git log -1 --format=%s').slice(0, 300);
step(`Deploy ${PROD ? 'PRODUCTION' : 'preview'} · nhánh ${branch} · ${sha.slice(0, 7)}`);
const r = spawnSync('npx', ['wrangler', 'pages', 'deploy', '.', '--project-name', PROJECT, '--branch', branch,
    '--commit-hash', sha, '--commit-message', msg, '--commit-dirty=false'], { cwd: ROOT, stdio: 'inherit' });
if (r.status !== 0) die('wrangler lỗi (mã ' + r.status + ')');

const alias = branch.toLowerCase().replace(/[^a-z0-9-]/g, '-').slice(0, 28).replace(/-+$/, '');
console.log('\n✓ Xong: ' + (PROD ? 'https://templexa.vn' : `https://${alias}.${PROJECT}.pages.dev`) + '\n');
