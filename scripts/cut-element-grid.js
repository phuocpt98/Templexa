#!/usr/bin/env node
/**
 * cut-element-grid.js — Cắt ảnh lưới NxN thành các element rời, tách nền trắng, xuất WebP.
 *
 * Dùng cho ảnh element trang trí do AI gen theo dạng lưới (mặc định 3x3, 9 element,
 * mỗi element nằm giữa 1 ô, các ô cách nhau bởi khoảng trắng).
 *
 * Quy trình:
 *   1. Chia ảnh gốc thành lưới rows x cols ô đều nhau
 *   2. Với mỗi ô: dò bounding box của phần nội dung (pixel không phải nền trắng)
 *      → crop sát nội dung, bỏ hết khoảng trắng thừa quanh element
 *   3. Chuyển nền trắng thành trong suốt (alpha) theo ngưỡng --threshold
 *   4. Xuất WebP có alpha vào thư mục đích, đặt tên theo --names (hoặc element-01..NN)
 *
 * Vì sao phải trim sát nội dung: element còn thừa khoảng trắng khi lật (scaleX/scaleY)
 * để làm 4 góc sẽ lệch vị trí — bài học từ thiệp #221.
 *
 * Ví dụ:
 *   node scripts/cut-element-grid.js \
 *     --input products/shared/new/elements-3x3.png \
 *     --out products/shared/images/heritage-elements \
 *     --names corner-cloud-fret-tl,crest-dragon-pair,corner-cloud-fret-tr,\
 * medallion-lotus-ring,divider-lotus-cloud,border-fret-vertical,\
 * corner-cloud-fret-bl,ornament-lotus-bloom,corner-cloud-fret-br
 */

const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

// ---------- Parse CLI args ----------
function parseArgs(argv) {
    const args = {};
    for (let i = 2; i < argv.length; i++) {
        if (!argv[i].startsWith('--')) continue;
        const key = argv[i].slice(2);
        const next = argv[i + 1];
        if (next === undefined || next.startsWith('--')) {
            args[key] = true;
        } else {
            args[key] = next;
            i++;
        }
    }
    return args;
}

const args = parseArgs(process.argv);

if (!args.input || args.help) {
    console.log(fs.readFileSync(__filename, 'utf8').split('*/')[0].replace(/^#!.*\n/, ''));
    process.exit(args.input ? 0 : 1);
}

const INPUT = args.input;
const OUT_DIR = args.out || 'products/shared/images/heritage-elements';
const ROWS = parseInt(args.rows || '3', 10);
const COLS = parseInt(args.cols || '3', 10);
// Pixel được coi là "nền" khi vừa SÁNG (>= threshold) vừa TRUNG TÍNH (chroma < CHROMA_MIN).
// Phải xét cả chroma vì vàng nhạt highlight (#F5E6B8, lum 245) sáng gần bằng nền trắng —
// nếu chỉ so độ sáng sẽ đục thủng các mảng vàng sáng nhất của element.
const THRESHOLD = parseInt(args.threshold || '248', 10);
// Chênh lệch max(R,G,B) - min(R,G,B). Trắng/xám ~0, vàng kim >= 40.
const CHROMA_MIN = parseInt(args.chroma || '14', 10);
// Đệm thêm vài px quanh bounding box để nét không bị cụt
const PADDING = parseInt(args.padding || '4', 10);
const QUALITY = parseInt(args.quality || '90', 10);
// Bán kính gộp (px): các mảnh rời cách nhau dưới mức này được coi là cùng element.
// Nhỏ quá → element bị vỡ vụn; lớn quá → 2 element cạnh nhau bị dính làm một.
const MIN_GAP = parseInt(args.gap || '24', 10);
// Bỏ qua đốm nhiễu nhỏ hơn ngưỡng này (px)
const MIN_SIZE = parseInt(args.minsize || '20', 10);
// Bỏ lưới, tự dò hoàn toàn (dùng khi ảnh không xếp theo lưới đều)
const FREE_MODE = Boolean(args.free);
const NAMES = args.names ? String(args.names).split(',').map(s => s.trim()).filter(Boolean) : [];

/**
 * Xây bản đồ occupancy: mỗi pixel là true nếu KHÔNG phải nền.
 */
function buildOccupancy(data, width, height, channels) {
    const occ = new Uint8Array(width * height);
    for (let p = 0; p < width * height; p++) {
        const i = p * channels;
        const r = data[i], g = data[i + 1], b = data[i + 2];
        const a = channels === 4 ? data[i + 3] : 255;
        const hi = Math.max(r, g, b);
        const chroma = hi - Math.min(r, g, b);
        occ[p] = (a < 16 || (hi >= THRESHOLD && chroma < CHROMA_MIN)) ? 0 : 1;
    }
    return occ;
}

/**
 * Gán nhãn các vùng liên thông (8-connectivity) bằng flood fill lặp.
 * Trả về mảng bounding box của từng vùng.
 *
 * Dùng liên thông thay vì projection profile vì các element trong ảnh AI gen
 * thường CHỒNG LẤN nhau theo trục X hoặc Y (ví dụ góc trên-trái và đôi rồng
 * cùng nằm dải trên, x-range giao nhau) — projection sẽ gộp chúng làm một,
 * còn liên thông tách đúng vì chúng không dính pixel nào.
 */
function labelComponents(occ, width, height) {
    const seen = new Uint8Array(width * height);
    // labels[p] = chỉ số component chứa pixel p, -1 nếu là nền.
    // Giữ lại để lúc xuất ảnh có thể XOÁ hẳn pixel của component không thuộc nhóm
    // (bỏ khỏi bbox thôi là chưa đủ — vùng crop vẫn copy nguyên pixel đó).
    const labels = new Int32Array(width * height).fill(-1);
    const boxes = [];
    const stack = new Int32Array(width * height);

    for (let start = 0; start < occ.length; start++) {
        if (!occ[start] || seen[start]) continue;

        const id = boxes.length;
        let sp = 0;
        stack[sp++] = start;
        seen[start] = 1;

        let minX = width, minY = height, maxX = -1, maxY = -1, area = 0;

        while (sp > 0) {
            const p = stack[--sp];
            labels[p] = id;
            const x = p % width;
            const y = (p - x) / width;
            area++;
            if (x < minX) minX = x;
            if (x > maxX) maxX = x;
            if (y < minY) minY = y;
            if (y > maxY) maxY = y;

            for (let dy = -1; dy <= 1; dy++) {
                const ny = y + dy;
                if (ny < 0 || ny >= height) continue;
                for (let dx = -1; dx <= 1; dx++) {
                    const nx = x + dx;
                    if (nx < 0 || nx >= width) continue;
                    const np = ny * width + nx;
                    if (occ[np] && !seen[np]) {
                        seen[np] = 1;
                        stack[sp++] = np;
                    }
                }
            }
        }

        boxes.push({ id, left: minX, top: minY, right: maxX, bottom: maxY, area });
    }
    return { boxes, labels };
}

/** Hai box được coi là cùng một element nếu nới rộng `dist` px thì chạm nhau. */
function boxesNear(a, b, dist) {
    return !(a.right + dist < b.left || b.right + dist < a.left ||
             a.bottom + dist < b.top || b.bottom + dist < a.top);
}

/**
 * Gộp các MẢNH NHỎ rời rạc vào element lớn ở gần (mây tách khỏi thân rồng,
 * nhuỵ sen, chấm trang trí…).
 *
 * Chỉ gộp khi mảnh nhỏ hơn hẳn element nhận (area < FRAGMENT_RATIO) —
 * KHÔNG bao giờ gộp hai element lớn với nhau. Lý do: element hình chữ L
 * (góc trang trí) có bounding box rất rộng, dễ chồng lên bbox của element
 * bên cạnh dù không hề dính pixel — gộp theo bbox sẽ dính nhầm cả hàng.
 */
const FRAGMENT_RATIO = 0.18;

function mergeNearby(boxes, dist) {
    let merged = boxes.slice().sort((a, b) => b.area - a.area);
    let changed = true;

    while (changed) {
        changed = false;

        for (let i = 0; i < merged.length && !changed; i++) {
            for (let j = i + 1; j < merged.length; j++) {
                const big = merged[i], small = merged[j];
                if (small.area > big.area * FRAGMENT_RATIO) continue;
                if (!boxesNear(big, small, dist)) continue;

                merged[i] = {
                    left: Math.min(big.left, small.left),
                    top: Math.min(big.top, small.top),
                    right: Math.max(big.right, small.right),
                    bottom: Math.max(big.bottom, small.bottom),
                    area: big.area + small.area,
                    members: new Set([...big.members, ...small.members]),
                };
                merged.splice(j, 1);
                merged.sort((a, b) => b.area - a.area);
                changed = true;
                break;
            }
        }
    }
    return merged;
}

/** Sắp xếp theo thứ tự đọc: trên→dưới, trong mỗi hàng thì trái→phải. */
function sortReadingOrder(boxes) {
    if (!boxes.length) return boxes;
    const medianH = boxes.map(b => b.bottom - b.top).sort((a, b) => a - b)[Math.floor(boxes.length / 2)];
    const rowTol = Math.max(20, medianH * 0.5);

    return boxes.slice().sort((a, b) => {
        const ca = (a.top + a.bottom) / 2;
        const cb = (b.top + b.bottom) / 2;
        if (Math.abs(ca - cb) > rowTol) return ca - cb;
        return a.left - b.left;
    });
}

/**
 * Gom các vùng liên thông thành element theo LƯỚI rows×cols — chế độ mặc định.
 *
 * Mỗi component được gán về ô chứa TÂM của nó, rồi hợp nhất mọi component
 * cùng ô thành một bounding box. Cách này giải quyết đồng thời hai ca khó:
 *   - Element gồm nhiều mảnh rời (đôi rồng + viên ngọc, dải dọc 3 thanh)
 *     → cùng ô nên được gộp lại đúng.
 *   - Element tràn khỏi biên ô (đôi rồng rộng hơn 1/3 ảnh)
 *     → bbox hợp nhất vẫn lấy trọn, không bị lưới cắt cụt.
 */
function groupByGrid(occ, width, height, rows, cols, mergeDist, minSize) {
    const { boxes: all, labels } = labelComponents(occ, width, height);
    const raw = all.filter(b =>
        (b.right - b.left + 1) >= 3 && (b.bottom - b.top + 1) >= 3 && b.area >= 12
    );

    const cellW = width / cols;
    const cellH = height / rows;
    const cellOf = b => {
        const col = Math.min(cols - 1, Math.floor(((b.left + b.right) / 2) / cellW));
        const row = Math.min(rows - 1, Math.floor(((b.top + b.bottom) / 2) / cellH));
        return row * cols + col;
    };

    // Bước 1 — mỗi ô lấy component LỚN NHẤT làm "lõi" đại diện cho element của ô đó.
    const cores = new Map();
    for (const b of raw) {
        const key = cellOf(b);
        const cur = cores.get(key);
        if (!cur || b.area > cur.area) cores.set(key, b);
    }

    // Bước 2 — gộp các component cùng ô vào lõi của ô đó.
    //
    // Bỏ qua "mảnh vụn lạc": component quá nhỏ so với lõi (< SPECK_RATIO) mà lại
    // nằm ngoài lõi một khoảng > mergeDist. Đó thường là mẩu của element Ô BÊN CẠNH
    // thò sang (đầu tua mây, chóp đuôi rồng) — giữ lại sẽ phình bbox và lôi theo
    // rác vào ảnh cắt ra.
    const SPECK_RATIO = 0.02;
    const groups = new Map();

    for (const b of raw) {
        const key = cellOf(b);
        const core = cores.get(key);

        if (b !== core && b.area < core.area * SPECK_RATIO) {
            const dx = Math.max(0, Math.max(core.left - b.right, b.left - core.right));
            const dy = Math.max(0, Math.max(core.top - b.bottom, b.top - core.bottom));
            if (Math.hypot(dx, dy) > mergeDist) continue;
        }

        const cur = groups.get(key);
        groups.set(key, cur ? {
            left: Math.min(cur.left, b.left),
            top: Math.min(cur.top, b.top),
            right: Math.max(cur.right, b.right),
            bottom: Math.max(cur.bottom, b.bottom),
            area: cur.area + b.area,
            members: cur.members.add(b.id),
        } : { ...b, members: new Set([b.id]) });
    }

    const result = [...groups.entries()]
        .sort((a, b) => a[0] - b[0])
        .map(e => e[1])
        .filter(b => (b.right - b.left + 1) >= minSize || (b.bottom - b.top + 1) >= minSize);

    return { boxes: result, labels };
}

/**
 * Tự dò các element rời rạc: liên thông → bỏ nhiễu → gộp mảnh gần nhau
 * → sắp thứ tự đọc. Không phụ thuộc lưới nên element tràn ô vẫn lấy trọn vẹn.
 */
function detectElements(occ, width, height, mergeDist, minSize) {
    const { boxes, labels } = labelComponents(occ, width, height);
    const kept = boxes
        .filter(b => (b.right - b.left + 1) >= 3 && (b.bottom - b.top + 1) >= 3 && b.area >= 12)
        .map(b => ({ ...b, members: new Set([b.id]) }));
    const merged = mergeNearby(kept, mergeDist).filter(b =>
        (b.right - b.left + 1) >= minSize || (b.bottom - b.top + 1) >= minSize
    );
    return { boxes: sortReadingOrder(merged), labels };
}

/**
 * Dò bounding box phần nội dung trong 1 ô: quét raw pixel, tìm min/max x,y
 * của những pixel KHÔNG phải nền trắng. Trả về null nếu ô trống hoàn toàn.
 */
function findContentBox(data, width, height, channels) {
    let minX = width, minY = height, maxX = -1, maxY = -1;

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const i = (y * width + x) * channels;
            const r = data[i], g = data[i + 1], b = data[i + 2];
            const a = channels === 4 ? data[i + 3] : 255;

            const chroma = Math.max(r, g, b) - Math.min(r, g, b);
            const isBackground = a < 16 || (Math.max(r, g, b) >= THRESHOLD && chroma < CHROMA_MIN);
            if (isBackground) continue;

            if (x < minX) minX = x;
            if (x > maxX) maxX = x;
            if (y < minY) minY = y;
            if (y > maxY) maxY = y;
        }
    }

    if (maxX < 0) return null;
    return { minX, minY, maxX, maxY };
}

/**
 * Chuyển nền trắng thành trong suốt.
 *
 * Chỉ những pixel TRUNG TÍNH (chroma thấp) và SÁNG mới bị làm trong suốt.
 * Pixel có màu (vàng kim, kể cả vàng nhạt highlight) luôn giữ nguyên đục —
 * đây là điểm mấu chốt để element vàng không bị đục thủng ở vùng sáng nhất.
 * Pixel trung tính nhưng tối (nét viền, bóng đổ xám/đen) cũng được giữ.
 * Dải chuyển mềm giữa softFloor→THRESHOLD để mép nét không răng cưa.
 */
function whiteToAlpha(data, width, height, channels, keepMask) {
    const out = Buffer.alloc(width * height * 4);
    const softFloor = THRESHOLD - 40; // dưới mức này: giữ đục hoàn toàn

    for (let p = 0; p < width * height; p++) {
        // Pixel thuộc component KHÁC (mảnh vụn của element bên cạnh lọt vào
        // vùng crop) → xoá hẳn, không để dính vào ảnh xuất ra
        if (keepMask && !keepMask[p]) {
            const o0 = p * 4;
            out[o0] = out[o0 + 1] = out[o0 + 2] = out[o0 + 3] = 0;
            continue;
        }
        const i = p * channels;
        const r = data[i], g = data[i + 1], b = data[i + 2];
        const srcA = channels === 4 ? data[i + 3] : 255;

        const hi = Math.max(r, g, b);
        const chroma = hi - Math.min(r, g, b);

        let alpha;
        if (chroma >= CHROMA_MIN) {
            alpha = 255;                       // có màu → chắc chắn là element
        } else if (hi >= THRESHOLD) {
            alpha = 0;                         // trắng trung tính → nền
        } else if (hi <= softFloor) {
            alpha = 255;                       // xám/đen → nét vẽ, giữ lại
        } else {
            alpha = Math.round(255 * (THRESHOLD - hi) / (THRESHOLD - softFloor));
        }

        const o = p * 4;
        out[o] = r;
        out[o + 1] = g;
        out[o + 2] = b;
        out[o + 3] = Math.min(alpha, srcA);
    }
    return out;
}

async function main() {
    if (!fs.existsSync(INPUT)) {
        console.error(`✗ Không tìm thấy ảnh: ${INPUT}`);
        process.exit(1);
    }
    fs.mkdirSync(OUT_DIR, { recursive: true });

    const src = sharp(INPUT);
    const meta = await src.metadata();
    const { data, info } = await src.raw().toBuffer({ resolveWithObject: true });
    const { width: W, height: H, channels: CH } = info;

    console.log(`Ảnh gốc: ${W}×${H} | ngưỡng nền ${THRESHOLD} | chroma ${CHROMA_MIN} | out: ${OUT_DIR}`);

    const occ = buildOccupancy(data, W, H, CH);
    const detected = FREE_MODE
        ? detectElements(occ, W, H, MIN_GAP, MIN_SIZE)
        : groupByGrid(occ, W, H, ROWS, COLS, MIN_GAP, MIN_SIZE);
    const { boxes, labels } = detected;

    console.log(FREE_MODE
        ? `Chế độ: tự do (gộp mảnh < ${MIN_GAP}px) → ${boxes.length} element\n`
        : `Chế độ: gom theo lưới ${ROWS}×${COLS} → ${boxes.length} element\n`);

    if (NAMES.length && NAMES.length !== boxes.length) {
        console.warn(
            `⚠ Có ${NAMES.length} tên nhưng dò được ${boxes.length} element.\n` +
            `  Kiểm tra danh sách tên, hoặc chỉnh --gap (hiện ${MIN_GAP}) để gộp/tách khác đi.\n`
        );
    }

    for (let i = 0; i < boxes.length; i++) {
        const box = boxes[i];
        const name = NAMES[i] || `element-${String(i + 1).padStart(2, '0')}`;
        const outPath = path.join(OUT_DIR, `${name}.webp`);

        const left = Math.max(0, box.left - PADDING);
        const top = Math.max(0, box.top - PADDING);
        const width = Math.min(W - left, box.right - box.left + 1 + PADDING * 2);
        const height = Math.min(H - top, box.bottom - box.top + 1 + PADDING * 2);

        const crop = await sharp(INPUT)
            .extract({ left, top, width, height })
            .raw()
            .toBuffer({ resolveWithObject: true });

        // Mask: chỉ giữ pixel thuộc các component của chính element này
        const keepMask = new Uint8Array(crop.info.width * crop.info.height);
        for (let y = 0; y < crop.info.height; y++) {
            for (let x = 0; x < crop.info.width; x++) {
                const lbl = labels[(top + y) * W + (left + x)];
                keepMask[y * crop.info.width + x] = (lbl < 0 || box.members.has(lbl)) ? 1 : 0;
            }
        }

        const rgba = whiteToAlpha(
            crop.data, crop.info.width, crop.info.height, crop.info.channels, keepMask
        );

        await sharp(rgba, {
            raw: { width: crop.info.width, height: crop.info.height, channels: 4 },
        })
            .webp({ quality: QUALITY, alphaQuality: 100 })
            .toFile(outPath);

        const kb = Math.round(fs.statSync(outPath).size / 1024);
        console.log(`  ✓ ${name}.webp — ${crop.info.width}×${crop.info.height} (${kb}KB) @ ${left},${top}`);
    }

    console.log(`\nXong. ${boxes.length} element → ${OUT_DIR}`);
}

main().catch(err => {
    console.error('✗ Lỗi:', err.message);
    process.exit(1);
});
