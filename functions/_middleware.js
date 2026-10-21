/**
 * Cloudflare Pages Function — ảnh/tiêu đề chia sẻ theo mẫu cho link popup ?pid=<id>.
 *
 * Link chi tiết mẫu là popup trên hub (thiep-online?pid=314, landing?pid=…, products?pid=…). Facebook, Zalo,
 * bot AI không chạy JS → trước đây xem trước link luôn là ảnh chung của site. Hàm này thay og:/twitter:
 * trong HTML theo assets/data/og-pid.json (sinh bởi scripts/build-og-pid.js). canonical + <title> giữ nguyên.
 *
 * Chỉ chạy trên các trang catalog — danh sách ở _routes.json (ảnh/JS/CSS không đi qua hàm này).
 */
let OG = null;   // giữ trong isolate, đỡ đọc lại file mỗi request

export async function onRequest(context) {
    const { request, next, env } = context;
    const url = new URL(request.url);
    const pid = url.searchParams.get('pid') || url.searchParams.get('id');
    if (request.method !== 'GET' || !pid || !/^\d{1,5}$/.test(pid)) return next();

    const res = await next();
    if (!(res.headers.get('content-type') || '').includes('text/html')) return res;

    try {
        if (!OG) OG = await (await env.ASSETS.fetch(new URL('/assets/data/og-pid.json', url))).json();
    } catch (e) {
        return res;
    }
    const m = OG[pid];
    if (!m) return res;

    const shareUrl = `https://templexa.vn/${m.u}?pid=${pid}`;   // luôn domain thật (kể cả khi chạy ở bản preview)
    const set = (v) => ({ element(el) { el.setAttribute('content', v); } });
    const size = (v) => ({ element(el) { if (v) el.setAttribute('content', String(v)); else el.remove(); } });
    return new HTMLRewriter()
        .on('meta[property="og:title"]', set(m.t))
        .on('meta[property="og:description"]', set(m.d))
        .on('meta[property="og:image"]', set(m.i))
        .on('meta[property="og:image:width"]', size(m.w))
        .on('meta[property="og:image:height"]', size(m.h))
        .on('meta[property="og:url"]', set(shareUrl))
        .on('meta[name="twitter:title"]', set(m.t))
        .on('meta[name="twitter:description"]', set(m.d))
        .on('meta[name="twitter:image"]', set(m.i))
        .transform(res);
}
