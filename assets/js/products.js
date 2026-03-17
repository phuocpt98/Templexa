// ============================================
// PRODUCTS PAGE — Search, Filter, Render, Paginate + Product Popup
// ============================================

(function () {
    const grid = document.getElementById('productsGrid');
    const emptyState = document.getElementById('productsEmpty');
    const paginationEl = document.getElementById('pagination');
    const searchInput = document.getElementById('searchInput');
    const categoryFiltersEl = document.getElementById('categoryFilters');
    const typeFiltersEl = document.getElementById('typeFilters');
    const filtersToggle = document.getElementById('filtersToggle');
    const filtersWrapper = document.getElementById('filtersWrapper');

    if (!grid) return;

    // ── Detail data cache for mobileView ─────
    let detailDataCache = {};

    // ── Popup elements ─────────────────────────
    const popupOverlay = document.getElementById('productPopup');
    const popupBody = document.getElementById('popupBody');
    const popupClose = document.getElementById('popupClose');
    const popupModalForm = document.getElementById('popupModalForm');
    const popupModalSuccess = document.getElementById('popupModalSuccess');

    // ── Two-level filter: show category on type hover ──
    function showCategoryFor(type) {
        const allowed = TYPE_CATEGORIES[type] || TYPE_CATEGORIES['all'];
        const cats = CATEGORIES.filter(c => allowed.includes(c.id));
        categoryFiltersEl.innerHTML = cats.map(cat =>
            `<button class="filter-btn${cat.id === currentCategory ? ' active' : ''}" data-category="${cat.id}">${cat.label}</button>`
        ).join('');
        // Re-bind category click
        categoryFiltersEl.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                currentCategory = btn.dataset.category;
                currentPage = 1;
                render();
                if (filtersWrapper) filtersWrapper.classList.add('category-locked');
            });
        });
        if (filtersWrapper) {
            filtersWrapper.classList.remove('category-locked');
            filtersWrapper.classList.add('category-open');
        }
    }

    function hideCategoryRow() {
        if (filtersWrapper) {
            filtersWrapper.classList.remove('category-open');
        }
    }

    // ── Mobile dropdown toggle ───────────────────
    if (filtersToggle && filtersWrapper) {
        filtersToggle.addEventListener('click', function (e) {
            e.stopPropagation();
            filtersToggle.classList.toggle('open');
            filtersWrapper.classList.toggle('open');
        });

        document.addEventListener('click', function (e) {
            if (!filtersWrapper.classList.contains('open')) return;
            // Don't close if clicking a filter button (target may be removed by re-render)
            if (e.target.closest('.filter-btn')) return;
            if (!filtersWrapper.contains(e.target) && !filtersToggle.contains(e.target)) {
                filtersToggle.classList.remove('open');
                filtersWrapper.classList.remove('open');
            }
        });
    }

    // ── Legacy URL redirects ──
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('category') === 'invitation') {
        urlParams.delete('category');
        urlParams.set('type', 'invitation');
        history.replaceState(null, '', '?' + urlParams.toString());
    }
    if (urlParams.get('type') === 'trending') {
        urlParams.set('type', 'invitation');
        history.replaceState(null, '', '?' + urlParams.toString());
    }

    let currentCategory = urlParams.get('category') || 'all';
    let currentType = urlParams.get('type') || 'all';
    let currentSearch = urlParams.get('search') || '';
    let currentPage = parseInt(urlParams.get('page')) || 1;
    let perPage = 9;

    if (currentSearch && searchInput) {
        searchInput.value = currentSearch;
    }

    // ── Render filters ──────────────────────────
    function renderFilters() {
        // Category filters — chỉ hiện categories phù hợp với type đang chọn
        const allowedCats = TYPE_CATEGORIES[currentType] || TYPE_CATEGORIES['all'];
        const visibleCategories = CATEGORIES.filter(cat => allowedCats.includes(cat.id));

        categoryFiltersEl.innerHTML = visibleCategories.map(cat =>
            `<button class="filter-btn${cat.id === currentCategory ? ' active' : ''}" data-category="${cat.id}">${cat.label}</button>`
        ).join('');

        // Type filters
        typeFiltersEl.innerHTML = TYPES.map(t =>
            `<button class="filter-btn${t.id === currentType ? ' active' : ''}" data-type="${t.id}">${t.label}</button>`
        ).join('');

        // Event listeners — category
        categoryFiltersEl.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                currentCategory = btn.dataset.category;
                currentPage = 1;
                render();
                if (filtersWrapper) filtersWrapper.classList.add('category-locked');
            });
        });

        // Event listeners — type (click + hover to show categories)
        typeFiltersEl.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                currentType = btn.dataset.type;
                const newAllowed = TYPE_CATEGORIES[currentType] || TYPE_CATEGORIES['all'];
                if (!newAllowed.includes(currentCategory)) {
                    currentCategory = 'all';
                }
                currentPage = 1;
                render();
            });

            // Hover → show categories for this type
            btn.addEventListener('mouseenter', () => {
                showCategoryFor(btn.dataset.type);
            });
        });

        // Hide category row when mouse leaves the entire filter area
        if (filtersWrapper) {
            filtersWrapper.addEventListener('mouseleave', hideCategoryRow);
        }
    }

    // ── Render product cards ────────────────────
    function renderProducts(products) {
        if (products.length === 0) {
            grid.style.display = 'none';
            emptyState.style.display = 'block';
            return;
        }

        grid.style.display = '';
        emptyState.style.display = 'none';

        const isInvitation = document.body.classList.contains('invitation-theme');
        const invDetail = detailDataCache['invitation'];

        grid.innerHTML = products.map(p => {
            const categoryLabel = CATEGORIES.find(c => c.id === p.category)?.label || p.category;
            let badgeHTML = '';
            if (p.status === 'new') badgeHTML = '<span class="product-badge new">NEW</span>';
            else if (p.status === 'hot') badgeHTML = '<span class="product-badge hot">HOT</span>';
            if (p.price === 'free') badgeHTML += '<span class="product-badge free" style="top:auto;bottom:12px;right:12px;">FREE</span>';

            const imgSrc = (isInvitation && invDetail && invDetail[p.id] && invDetail[p.id].mobileView) || p.thumbnail;

            return `
                <a href="product-detail.html?id=${p.id}" class="product-card" data-product-id="${p.id}"${p.demoUrl ? ` data-demo-url="${p.demoUrl}"` : ''}>
                    <div class="product-card-image">
                        <img src="${imgSrc}" alt="${p.name}" loading="lazy">
                        ${badgeHTML}
                    </div>
                    <div class="product-card-info">
                        <h3>${p.name}</h3>
                        <p>${categoryLabel}</p>
                    </div>
                </a>
            `;
        }).join('');
    }

    // ── Render pagination ───────────────────────
    function renderPagination(totalPages) {
        if (totalPages <= 1) {
            paginationEl.innerHTML = '';
            return;
        }

        let html = '';

        // First page
        html += `<button ${currentPage === 1 ? 'disabled' : ''} data-page="1">&laquo; Trang đầu</button>`;
        // Previous
        html += `<button ${currentPage === 1 ? 'disabled' : ''} data-page="${currentPage - 1}">&lsaquo;</button>`;

        // Page numbers
        const maxVisible = 5;
        let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
        let end = Math.min(totalPages, start + maxVisible - 1);
        if (end - start < maxVisible - 1) start = Math.max(1, end - maxVisible + 1);

        for (let i = start; i <= end; i++) {
            html += `<button class="${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</button>`;
        }

        if (end < totalPages) {
            html += `<span style="color:var(--text-tertiary)">...</span>`;
        }

        // Next
        html += `<button ${currentPage === totalPages ? 'disabled' : ''} data-page="${currentPage + 1}">&rsaquo;</button>`;
        // Last page
        html += `<button ${currentPage === totalPages ? 'disabled' : ''} data-page="${totalPages}">Trang cuối &raquo;</button>`;

        paginationEl.innerHTML = html;

        paginationEl.querySelectorAll('button').forEach(btn => {
            btn.addEventListener('click', () => {
                const page = Number(btn.dataset.page);
                if (page && page !== currentPage) {
                    currentPage = page;
                    render();
                    window.scrollTo({ top: grid.offsetTop - 100, behavior: 'smooth' });
                }
            });
        });
    }

    // ── Update URL params ──────────────────────
    function updateURL() {
        const params = new URLSearchParams();
        if (currentCategory !== 'all') params.set('category', currentCategory);
        if (currentType !== 'all') params.set('type', currentType);
        if (currentSearch) params.set('search', currentSearch);
        if (currentPage > 1) params.set('page', currentPage);
        // Preserve pid if popup is open
        var existingPid = new URLSearchParams(window.location.search).get('pid');
        if (existingPid) params.set('pid', existingPid);
        const qs = params.toString();
        history.replaceState(null, '', qs ? '?' + qs : window.location.pathname);
    }

    // ── Hover iframe preview + auto-scroll ──────
    const supportsHover = window.matchMedia('(hover: hover)').matches;

    function initHoverIframes() {
        if (!supportsHover) return;
        if (document.body.classList.contains('invitation-theme')) return;
        var cards = grid.querySelectorAll('.product-card[data-demo-url]');

        cards.forEach(function (card) {
            var iframe = null;
            var hovered = false;

            card.addEventListener('mouseenter', function () {
                hovered = true;
                var container = card.querySelector('.product-card-image');
                if (!container || !card.dataset.demoUrl) return;

                iframe = document.createElement('iframe');
                iframe.src = card.dataset.demoUrl;
                iframe.setAttribute('sandbox', 'allow-scripts allow-same-origin');
                iframe.setAttribute('scrolling', 'no');

                iframe.onload = function () {
                    if (!hovered) { iframe.remove(); iframe = null; return; }
                    iframe.classList.add('loaded');
                    setTimeout(function () {
                        if (hovered && iframe) iframe.classList.add('scrolling');
                    }, 400);
                };

                container.appendChild(iframe);
            });

            card.addEventListener('mouseleave', function () {
                hovered = false;
                if (iframe) { iframe.remove(); iframe = null; }
            });
        });
    }

    // ============================================
    // PRODUCT POPUP
    // ============================================
    let popupCurrentProduct = null;
    let popupCurrentIndex = 0;

    function openPopup() {
        popupOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closePopup() {
        popupOverlay.classList.remove('active');
        document.body.style.overflow = '';
        popupCurrentProduct = null;
        setPopupURL(null);
    }

    function openModal(modal) {
        modal.classList.add('active');
    }

    function closeModal(modal) {
        modal.classList.remove('active');
        // Restore popup scroll lock if popup is still open
        if (popupOverlay.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        }
    }

    // ── Popup close handlers ────────────────────
    popupClose.addEventListener('click', closePopup);

    popupOverlay.addEventListener('click', function (e) {
        if (e.target === popupOverlay) closePopup();
    });

    // ── Modal close handlers ────────────────────
    document.getElementById('popupModalFormClose').addEventListener('click', function () { closeModal(popupModalForm); });
    document.getElementById('popupModalSuccessClose').addEventListener('click', function () { closeModal(popupModalSuccess); });
    document.getElementById('popupModalSuccessBtn').addEventListener('click', function () { closeModal(popupModalSuccess); });

    [popupModalForm, popupModalSuccess].forEach(function (modal) {
        modal.addEventListener('click', function (e) {
            if (e.target === modal) closeModal(modal);
        });
    });

    // ── Escape key ──────────────────────────────
    document.addEventListener('keydown', function (e) {
        if (e.key !== 'Escape') return;
        if (popupModalForm.classList.contains('active')) {
            closeModal(popupModalForm);
        } else if (popupModalSuccess.classList.contains('active')) {
            closeModal(popupModalSuccess);
        } else if (popupOverlay.classList.contains('active')) {
            closePopup();
        }
    });

    // ── Checkbox toggle submit button ───────────
    var popupForm = document.getElementById('popupTemplateForm');
    var popupSubscribeBox = popupForm.querySelector('input[name="subscribe"]');
    var popupSubmitBtn = popupForm.querySelector('.modal-submit');
    popupSubscribeBox.addEventListener('change', function () {
        popupSubmitBtn.disabled = !this.checked;
    });

    // ── Form submit ─────────────────────────────
    popupForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        popupSubmitBtn.disabled = true;
        popupSubmitBtn.textContent = 'Đang gửi...';

        var formData = {
            email: popupForm.email.value,
            name: popupForm.name.value,
            phone: popupForm.phone.value,
            reference: popupCurrentProduct
                ? window.location.origin + window.location.pathname.replace(/[^/]*$/, '') + 'product-detail.html?id=' + popupCurrentProduct.id
                : window.location.href,
            service: '',
            note: '',
            status: 'submit',
        };

        await submitToGoogleSheet(formData);

        popupSubmitBtn.disabled = false;
        popupSubmitBtn.innerHTML = 'Gửi và Nhận mẫu <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>';

        closeModal(popupModalForm);
        openModal(popupModalSuccess);
        popupForm.reset();
        popupSubscribeBox.checked = true;
        popupSubmitBtn.disabled = false;
    });

    // ── Gallery navigation inside popup ─────────
    function popupGoToImage(index) {
        if (!popupCurrentProduct) return;
        var images = popupCurrentProduct.images;
        popupCurrentIndex = (index + images.length) % images.length;

        var mainImg = popupBody.querySelector('#popupMainImg');
        if (mainImg) mainImg.src = images[popupCurrentIndex];

        popupBody.querySelectorAll('.gallery-thumb').forEach(function (t) { t.classList.remove('active'); });
        var activeThumb = popupBody.querySelector('.gallery-thumb[data-index="' + popupCurrentIndex + '"]');
        if (activeThumb) activeThumb.classList.add('active');
    }

    function initPopupGallery() {
        popupBody.querySelectorAll('.gallery-thumb').forEach(function (thumb) {
            thumb.addEventListener('click', function () { popupGoToImage(Number(thumb.dataset.index)); });
        });

        var btnPrev = popupBody.querySelector('#popupGalleryPrev');
        var btnNext = popupBody.querySelector('#popupGalleryNext');
        if (btnPrev) btnPrev.addEventListener('click', function () { popupGoToImage(popupCurrentIndex - 1); });
        if (btnNext) btnNext.addEventListener('click', function () { popupGoToImage(popupCurrentIndex + 1); });
    }

    // ── Update URL with product ID ──────────────
    function setPopupURL(productId) {
        var params = new URLSearchParams(window.location.search);
        if (productId) {
            params.set('pid', productId);
        } else {
            params.delete('pid');
        }
        var qs = params.toString();
        history.replaceState(null, '', qs ? '?' + qs : window.location.pathname);
    }

    // ── Render popup content ────────────────────
    function renderPopup(product) {
        popupCurrentProduct = product;
        popupCurrentIndex = 0;
        setPopupURL(product.id);

        var categoryLabel = CATEGORIES.find(function (c) { return c.id === product.category; });
        categoryLabel = categoryLabel ? categoryLabel.label : product.category;

        var priceClass = product.price === 'free' ? 'free' : 'paid';
        var priceLabel = product.price === 'free' ? 'FREE' : product.price;

        var featuresHTML = (product.features || []).map(function (f) {
            return '<li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>' + f + '</li>';
        }).join('');

        var images = product.images || [product.thumbnail];

        var thumbsHTML = images.map(function (img, i) {
            return '<div class="gallery-thumb' + (i === 0 ? ' active' : '') + '" data-index="' + i + '"><img src="' + img + '" alt="Thumb ' + (i + 1) + '"></div>';
        }).join('');

        var galleryArrows = images.length > 1
            ? '<button class="gallery-arrow prev" id="popupGalleryPrev" aria-label="Ảnh trước"><svg viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"></polyline></svg></button>'
            + '<button class="gallery-arrow next" id="popupGalleryNext" aria-label="Ảnh tiếp"><svg viewBox="0 0 24 24"><polyline points="9 6 15 12 9 18"></polyline></svg></button>'
            : '';

        var demoBtn = product.demoUrl
            ? '<a href="preview.html?id=' + product.id + '" target="_blank" class="btn-outline"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>Xem demo</a>'
            : '';

        var customBtn = product.type === 'invitation'
            ? '<a href="bang-gia-thiep-cuoi.html" class="btn-custom">Bảng giá dịch vụ</a>'
            : '<a href="contact.html" class="btn-custom">Yêu cầu tùy chỉnh</a>';

        popupBody.innerHTML =
            '<div class="popup-header">' +
                '<h2>' + product.name + '</h2>' +
                '<p>' + categoryLabel + '</p>' +
            '</div>' +
            '<div class="popup-layout">' +
                '<div class="popup-gallery">' +
                    '<div class="gallery-main">' +
                        galleryArrows +
                        '<img src="' + images[0] + '" alt="' + product.name + '" id="popupMainImg">' +
                    '</div>' +
                    (images.length > 1 ? '<div class="gallery-thumbs">' + thumbsHTML + '</div>' : '') +
                '</div>' +
                '<div class="popup-sidebar">' +
                    (priceLabel ? '<span class="price-badge ' + priceClass + '">' + priceLabel + '</span>' : '') +
                    '<button class="btn-primary" id="popupBtnGetTemplate">Dùng ngay <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></button>' +
                    demoBtn +
                    '<p class="sidebar-features-title">Tính năng nổi bật</p>' +
                    '<ul class="sidebar-features">' + featuresHTML + '</ul>' +
                    customBtn +
                '</div>' +
            '</div>';

        // Init gallery
        initPopupGallery();

        // "Dùng ngay" → open modal form
        var btnGetTemplate = popupBody.querySelector('#popupBtnGetTemplate');
        if (btnGetTemplate) {
            btnGetTemplate.addEventListener('click', function () {
                openModal(popupModalForm);
            });
        }
    }

    // ── Show loading in popup ───────────────────
    function showPopupLoading() {
        popupBody.innerHTML =
            '<div class="popup-loading">' +
                '<div style="text-align:center;opacity:0.5">' +
                    '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12a9 9 0 11-6.219-8.56"></path></svg>' +
                    '<p style="margin-top:12px;color:var(--text-tertiary)">Đang tải...</p>' +
                '</div>' +
            '</div>';
    }

    // ── Prefetch on hover ─────────────────────────
    grid.addEventListener('mouseenter', function (e) {
        var card = e.target.closest('.product-card');
        if (!card || !card.dataset.productId) return;
        ProductDetail.prefetch(card.dataset.productId);
    }, true);

    // ── Click handler on product cards ──────────
    grid.addEventListener('click', function (e) {
        var card = e.target.closest('.product-card');
        if (!card) return;

        e.preventDefault();

        var productId = card.dataset.productId;
        if (!productId) return;

        // Show popup with loading
        showPopupLoading();
        openPopup();

        // Fetch full product detail
        ProductDetail.getFullProduct(productId).then(function (product) {
            if (!product) {
                popupBody.innerHTML = '<div style="padding:40px;text-align:center;color:var(--text-tertiary)">Không tìm thấy sản phẩm</div>';
                return;
            }
            renderPopup(product);
        }).catch(function () {
            // Fallback: use summary data
            var summary = getProductById(productId);
            if (summary) {
                renderPopup(Object.assign({}, summary, {
                    images: [summary.thumbnail],
                    features: [],
                }));
            } else {
                popupBody.innerHTML = '<div style="padding:40px;text-align:center;color:var(--text-tertiary)">Không thể tải sản phẩm</div>';
            }
        });
    });

    // ── Main render ─────────────────────────────
    function render() {
        perPage = currentType === 'invitation' ? 12 : 9;

        // Toggle invitation theme trước khi render
        if (currentType === 'invitation') {
            document.body.classList.add('invitation-theme');
        } else {
            document.body.classList.remove('invitation-theme');
        }

        // Fetch invitation detail data (mobileView) nếu chưa có
        if (currentType === 'invitation' && !detailDataCache['invitation']) {
            ProductDetail.fetchCategoryData('invitation').then(function (data) {
                detailDataCache['invitation'] = data;
                renderCore(); // re-render với mobileView
            }).catch(function () {});
        }

        renderCore();
    }

    function renderCore() {
        // Giữ trạng thái dropdown mobile trước khi rebuild
        const wasOpen = filtersWrapper && filtersWrapper.classList.contains('open');

        const filtered = filterProducts({
            category: currentCategory,
            type: currentType,
            search: currentSearch,
        });

        const { items, totalPages } = paginateProducts(filtered, currentPage, perPage);

        updateURL();
        renderFilters();
        renderProducts(items);
        initHoverIframes();
        renderPagination(totalPages);

        // Khôi phục trạng thái dropdown sau render
        if (wasOpen && filtersWrapper && filtersToggle) {
            filtersWrapper.classList.add('open');
            filtersToggle.classList.add('open');
        }
    }

    // ── Search debounce ─────────────────────────
    let searchTimeout;
    searchInput.addEventListener('input', () => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            currentSearch = searchInput.value.trim();
            currentPage = 1;
            render();
        }, 300);
    });

    // Init
    render();

    // ── Auto-open popup if ?pid= exists ─────────
    var pidParam = urlParams.get('pid');
    if (pidParam) {
        showPopupLoading();
        openPopup();
        ProductDetail.getFullProduct(pidParam).then(function (product) {
            if (!product) {
                popupBody.innerHTML = '<div style="padding:40px;text-align:center;color:var(--text-tertiary)">Không tìm thấy sản phẩm</div>';
                return;
            }
            renderPopup(product);
        }).catch(function () {
            var summary = getProductById(pidParam);
            if (summary) {
                renderPopup(Object.assign({}, summary, {
                    images: [summary.thumbnail],
                    features: [],
                }));
            } else {
                popupBody.innerHTML = '<div style="padding:40px;text-align:center;color:var(--text-tertiary)">Không thể tải sản phẩm</div>';
            }
        });
    }
})();
