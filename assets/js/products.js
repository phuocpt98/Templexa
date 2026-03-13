// ============================================
// PRODUCTS PAGE — Search, Filter, Render, Paginate
// ============================================

(function () {
    const grid = document.getElementById('productsGrid');
    const emptyState = document.getElementById('productsEmpty');
    const paginationEl = document.getElementById('pagination');
    const searchInput = document.getElementById('searchInput');
    const categoryFiltersEl = document.getElementById('categoryFilters');
    const typeFiltersEl = document.getElementById('typeFilters');

    if (!grid) return;

    const urlParams = new URLSearchParams(window.location.search);
    let currentCategory = urlParams.get('category') || 'all';
    let currentType = urlParams.get('type') || 'all';
    let currentSearch = urlParams.get('search') || '';
    let currentPage = parseInt(urlParams.get('page')) || 1;
    const perPage = 9;

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

        // Event listeners
        categoryFiltersEl.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                currentCategory = btn.dataset.category;
                currentPage = 1;
                render();
            });
        });

        typeFiltersEl.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                currentType = btn.dataset.type;
                // Reset category nếu category hiện tại không có trong type mới
                const newAllowed = TYPE_CATEGORIES[currentType] || TYPE_CATEGORIES['all'];
                if (!newAllowed.includes(currentCategory)) {
                    currentCategory = 'all';
                }
                currentPage = 1;
                render();
            });
        });
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

        grid.innerHTML = products.map(p => {
            const categoryLabel = CATEGORIES.find(c => c.id === p.category)?.label || p.category;
            let badgeHTML = '';
            if (p.status === 'new') badgeHTML = '<span class="product-badge new">NEW</span>';
            else if (p.status === 'hot') badgeHTML = '<span class="product-badge hot">HOT</span>';
            if (p.price === 'free') badgeHTML += '<span class="product-badge free" style="top:auto;bottom:12px;right:12px;">FREE</span>';

            return `
                <a href="product-detail.html?id=${p.id}" class="product-card">
                    <div class="product-card-image">
                        <img src="${p.thumbnail || p.images[0]}" alt="${p.name}" loading="lazy">
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
        const qs = params.toString();
        history.replaceState(null, '', qs ? '?' + qs : window.location.pathname);
    }

    // ── Main render ─────────────────────────────
    function render() {
        const filtered = filterProducts({
            category: currentCategory,
            type: currentType,
            search: currentSearch,
        });

        const { items, totalPages } = paginateProducts(filtered, currentPage, perPage);

        updateURL();
        renderFilters();
        renderProducts(items);
        renderPagination(totalPages);
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

    // ── Auto hover cycle ────────────────────────
    let autoHoverTimer;
    function startAutoHover() {
        clearInterval(autoHoverTimer);
        let index = 0;
        autoHoverTimer = setInterval(() => {
            const cards = grid.querySelectorAll('.product-card');
            if (!cards.length) return;
            cards.forEach(c => c.classList.remove('auto-hover'));
            index = index % cards.length;
            cards[index].classList.add('auto-hover');
            index++;
        }, 1500);
    }

    // Pause on real hover
    grid.addEventListener('mouseenter', () => {
        clearInterval(autoHoverTimer);
        grid.querySelectorAll('.product-card').forEach(c => c.classList.remove('auto-hover'));
    });
    grid.addEventListener('mouseleave', () => startAutoHover());

    // Init
    render();
    startAutoHover();
})();
