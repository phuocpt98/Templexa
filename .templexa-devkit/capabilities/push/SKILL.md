---
name: push
description: "Auto deploy: detect thay đổi → protect thiệp cưới → commit → push lên main."
---

Auto deploy: detect thay đổi → protect thiệp cưới → commit → push lên main.

Argument: $ARGUMENTS — commit message (tuỳ chọn). Nếu không có, tự sinh từ git diff.

---

## Quy trình tự động

### Bước 1: Kiểm tra trạng thái

```bash
git status
git diff --stat
```

Nếu không có thay đổi → báo "Không có gì để push" và dừng.

### Bước 2: Commit lên main

1. `git add -A` (hoặc add specific files nếu có file nhạy cảm)
2. Kiểm tra `.env`, credentials → **KHÔNG commit**
3. Sinh commit message từ `$ARGUMENTS` hoặc từ diff:
   - Thêm thiệp mới → `feat: thêm thiệp cưới #XXX ...`
   - Sửa thiệp → `fix: sửa thiệp #XXX ...`
   - Sửa code website → `fix: ...` hoặc `feat: ...`
   - Cập nhật data.js → `chore: cập nhật data.js ...`
4. `git commit -m "message"`

### Bước 3: Protect thiệp cưới

1. Chạy protect:
   ```bash
   node scripts/protect-wedding.js
   ```
2. `git add -A`
3. `git commit -m "deploy: protect thiệp cưới"`

### Bước 4: Push

```bash
git push origin main
```

### Bước 5: Báo cáo

```
✅ Push thành công!

Branch main: [commit hash] — message

Thiệp đã protect: X files
```

## Lưu ý

- Làm việc trực tiếp trên branch `main`, không dùng branch dev
- Sửa trực tiếp trên `code.html` hoặc `index.html`, không dùng `code.dev.html`
- Nếu chỉ sửa file không liên quan thiệp (CSS website, data.js, docs) → vẫn protect (script tự skip file đã protect)
