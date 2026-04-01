---
name: push
description: "Auto deploy: detect thay đổi → protect thiệp cưới → commit → push lên cả dev + main."
---

Auto deploy: detect thay đổi → protect thiệp cưới → commit → push lên cả dev + main.

Argument: $ARGUMENTS — commit message (tuỳ chọn). Nếu không có, tự sinh từ git diff.

---

## Quy trình tự động

### Bước 1: Kiểm tra trạng thái

```bash
git status
git diff --stat
```

Nếu không có thay đổi → báo "Không có gì để push" và dừng.

### Bước 2: Xác định branch hiện tại

- Nếu đang ở `dev` → tiếp tục
- Nếu đang ở `main` → chuyển sang `dev` trước: `git checkout dev`
- Nếu đang ở branch khác → hỏi user

### Bước 3: Commit lên dev (code gốc)

1. `git add -A` (hoặc add specific files nếu có file nhạy cảm)
2. Kiểm tra `.env`, credentials → **KHÔNG commit**
3. Sinh commit message từ `$ARGUMENTS` hoặc từ diff:
   - Thêm thiệp mới → `feat: thêm thiệp cưới #XXX ...`
   - Sửa thiệp → `fix: sửa thiệp #XXX ...`
   - Sửa code website → `fix: ...` hoặc `feat: ...`
   - Cập nhật data.js → `chore: cập nhật data.js ...`
4. `git commit -m "message"`
5. `git push origin dev`

### Bước 4: Merge dev → main + Protect

1. `git checkout main`
2. `git merge dev` — nếu conflict → báo user
3. Chạy protect thiệp cưới:
   ```bash
   node scripts/protect-wedding.js
   ```
4. `git add -A`
5. `git commit -m "deploy: protect + merge dev"`
6. `git push origin main`

### Bước 5: Quay lại dev

```bash
git checkout dev
```

### Bước 6: Báo cáo

```
✅ Push thành công!

Branch dev:  [commit hash] — message
Branch main: [commit hash] — deploy: protect + merge dev

Thiệp đã protect: X files
```

## Lưu ý

- **Luôn commit dev trước** → rồi merge sang main → protect → push main
- Nếu chỉ sửa file không liên quan thiệp (CSS website, data.js, docs) → vẫn protect (script tự skip file đã protect)
- Nếu `git merge dev` có conflict → **DỪNG**, báo user giải quyết conflict trước
- File backup (`index.dev.html`, `code.dev.html`) đã gitignore → không commit
