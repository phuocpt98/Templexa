/**
 * convert-webp.js — Chuyển ảnh PNG/JPG → WebP
 *
 * Usage:
 *   node scripts/convert-webp.js [đường-dẫn-thư-mục]
 *
 * Nếu không truyền argument → scan toàn bộ products/ + assets/images/
 * Dùng sharp (quality 80). Nếu WebP lớn hơn gốc → skip, giữ gốc.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Auto-install sharp nếu chưa có
try {
    require.resolve('sharp');
} catch {
    console.log('sharp chưa cài — đang cài đặt...');
    execSync('npm install sharp', {
        cwd: path.resolve(__dirname, '..'),
        stdio: 'inherit',
    });
    console.log('sharp đã cài xong.\n');
}

const sharp = require('sharp');

const ROOT = path.resolve(__dirname, '..');
const QUALITY = 80;
const IMAGE_EXTS = ['.png', '.jpg', '.jpeg'];

// Đệ quy tìm tất cả ảnh trong thư mục
function findImages(dir) {
    const results = [];
    let entries;
    try {
        entries = fs.readdirSync(dir, { withFileTypes: true });
    } catch {
        return results;
    }
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            results.push(...findImages(fullPath));
        } else if (IMAGE_EXTS.includes(path.extname(entry.name).toLowerCase())) {
            results.push(fullPath);
        }
    }
    return results;
}

async function convertFile(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    const webpPath = filePath.replace(/\.(png|jpg|jpeg)$/i, '.webp');

    // Nếu file webp đã tồn tại → skip
    if (fs.existsSync(webpPath)) {
        return { file: filePath, status: 'skipped', reason: 'WebP đã tồn tại' };
    }

    const originalSize = fs.statSync(filePath).size;

    try {
        await sharp(filePath).webp({ quality: QUALITY }).toFile(webpPath);
    } catch (err) {
        return { file: filePath, status: 'error', reason: err.message };
    }

    const webpSize = fs.statSync(webpPath).size;

    if (webpSize >= originalSize) {
        // WebP lớn hơn hoặc bằng → xóa WebP, giữ gốc
        fs.unlinkSync(webpPath);
        return {
            file: filePath,
            status: 'skipped',
            reason: `WebP lớn hơn gốc (${formatSize(webpSize)} >= ${formatSize(originalSize)})`,
        };
    }

    // WebP nhỏ hơn → xóa gốc, giữ WebP
    try {
        fs.unlinkSync(filePath);
    } catch (unlinkErr) {
        // Không xóa được gốc → giữ cả hai, vẫn tính là converted
        console.warn(`  ⚠ Không xóa được file gốc: ${filePath} (${unlinkErr.code})`);
    }
    const saved = originalSize - webpSize;
    const percent = ((saved / originalSize) * 100).toFixed(1);

    return {
        file: filePath,
        status: 'converted',
        originalSize,
        webpSize,
        saved,
        percent,
    };
}

function formatSize(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
}

async function main() {
    const arg = process.argv[2];
    let scanDirs;

    if (arg) {
        // Resolve relative to project root
        const target = path.resolve(ROOT, arg);
        if (!fs.existsSync(target)) {
            console.error(`Thư mục không tồn tại: ${target}`);
            process.exit(1);
        }
        scanDirs = [target];
        console.log(`Scan thư mục: ${target}\n`);
    } else {
        scanDirs = [
            path.join(ROOT, 'products'),
            path.join(ROOT, 'assets', 'images'),
        ];
        console.log('Scan toàn bộ products/ + assets/images/\n');
    }

    // Tìm tất cả ảnh
    let allImages = [];
    for (const dir of scanDirs) {
        allImages.push(...findImages(dir));
    }

    if (allImages.length === 0) {
        console.log('Không tìm thấy ảnh PNG/JPG nào.');
        return;
    }

    console.log(`Tìm thấy ${allImages.length} ảnh PNG/JPG. Đang chuyển đổi...\n`);

    let converted = 0;
    let skipped = 0;
    let errors = 0;
    let totalSaved = 0;

    for (let i = 0; i < allImages.length; i++) {
        const result = await convertFile(allImages[i]);
        const relPath = path.relative(ROOT, result.file);

        if (result.status === 'converted') {
            converted++;
            totalSaved += result.saved;
            console.log(
                `  [${i + 1}/${allImages.length}] ✓ ${relPath} → .webp (-${result.percent}%, tiết kiệm ${formatSize(result.saved)})`
            );
        } else if (result.status === 'skipped') {
            skipped++;
            console.log(`  [${i + 1}/${allImages.length}] – ${relPath} (${result.reason})`);
        } else {
            errors++;
            console.log(`  [${i + 1}/${allImages.length}] ✗ ${relPath} (${result.reason})`);
        }
    }

    console.log('\n════════════════════════════════════════');
    console.log(`Kết quả:`);
    console.log(`  Đã chuyển:  ${converted} file`);
    console.log(`  Bỏ qua:    ${skipped} file`);
    console.log(`  Lỗi:       ${errors} file`);
    console.log(`  Tiết kiệm: ${formatSize(totalSaved)}`);
    console.log('════════════════════════════════════════');
}

main().catch((err) => {
    console.error('Lỗi:', err);
    process.exit(1);
});
