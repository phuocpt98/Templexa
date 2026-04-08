# Phase 07 — Deploy Pages + cutover DNS

## Steps
1. Connect Cloudflare Pages với GitHub repo, branch `main`
2. Build settings: `Build command: (none)` (static), `Output: /`
3. Custom domains:
   - `templexa.com` → Pages
   - `api.templexa.com` → Worker route
   - `cdn.templexa.com` → R2 custom domain
4. Update DNS records (Cloudflare DNS proxy ON cho cache)
5. Test trên preview URL trước
6. Cutover: đổi `CNAME` file (hoặc xoá nếu DNS Cloudflare lo)
7. Disable GitHub Pages

## Pre-cutover checklist
- [ ] R2 100% files
- [ ] D1 220 products
- [ ] All API endpoints OK
- [ ] Frontend chạy với API base prod
- [ ] Admin login OK
- [ ] Form submission OK
- [ ] Lighthouse > 85
- [ ] Backup `data.js` cũ vào git tag `v-before-be`

## Rollback
- Pages có deploy history → 1 click rollback
- DNS revert về GitHub Pages IP

## Post-deploy
- Monitor Workers analytics 1 tuần (req count vs 100k/ngày)
- Nếu vượt → tăng cache TTL, hoặc move read-only routes lên Pages Functions
- Update `docs/SYSTEM.md` + `CLAUDE.md` reflect kiến trúc mới
- Update `workflow-protect-deploy.md` cho flow mới (không còn dev/main protect cũ?)
