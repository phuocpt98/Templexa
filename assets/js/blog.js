/**
 * blog.js — tiện ích nhỏ cho trang bài viết (blogs/<slug>.html):
 *  - Nút "Sao chép link"
 *  - Đánh dấu mục đang đọc trong mục lục (IntersectionObserver)
 * Trang danh sách (blogs/index.html) có script inline riêng, không dùng file này.
 */
(function () {
    // Sao chép link
    document.querySelectorAll('[data-copy]').forEach(function (btn) {
        btn.addEventListener('click', function () {
            var url = btn.getAttribute('data-copy') || location.href;
            var done = function () { var t = btn.textContent; btn.textContent = 'Đã sao chép ✓'; setTimeout(function () { btn.textContent = t; }, 1800); };
            if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(url).then(done, done);
            else { var ta = document.createElement('textarea'); ta.value = url; document.body.appendChild(ta); ta.select(); try { document.execCommand('copy'); } catch (e) {} ta.remove(); done(); }
        });
    });

    // Mục lục: highlight heading đang trong khung nhìn
    var links = Array.prototype.slice.call(document.querySelectorAll('.bp-toc a[href^="#"]'));
    if (!links.length || !('IntersectionObserver' in window)) return;
    var map = {};
    links.forEach(function (a) { var el = document.getElementById(decodeURIComponent(a.getAttribute('href').slice(1))); if (el) map[el.id] = a; });
    var current = null;
    var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
            if (!en.isIntersecting) return;
            if (current) current.classList.remove('active');
            current = map[en.target.id]; if (current) current.classList.add('active');
        });
    }, { rootMargin: '-80px 0px -70% 0px', threshold: 0 });
    Object.keys(map).forEach(function (id) { io.observe(document.getElementById(id)); });

    // Mobile: đóng mục lục sau khi chọn (details)
    var toc = document.querySelector('details.bp-toc');
    if (toc) links.forEach(function (a) { a.addEventListener('click', function () { if (window.matchMedia('(max-width: 1024px)').matches) toc.removeAttribute('open'); }); });
})();
