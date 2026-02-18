// ============================================
// PRODUCT DETAIL PAGE
// ============================================

(function () {
    const contentEl = document.getElementById('detailContent');
    const relatedSection = document.getElementById('relatedSection');
    const relatedGrid = document.getElementById('relatedGrid');
    const modalForm = document.getElementById('modalForm');
    const modalSuccess = document.getElementById('modalSuccess');

    if (!contentEl) return;

    // ── Get product from URL ────────────────────
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');
    const product = getProductById(productId);

    if (!product) {
        contentEl.innerHTML = `
            <div class="products-empty" style="padding:100px 20px">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="width:64px;height:64px;margin-bottom:16px;opacity:0.4">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="15" y1="9" x2="9" y2="15"></line>
                    <line x1="9" y1="9" x2="15" y2="15"></line>
                </svg>
                <p>Không tìm thấy sản phẩm</p>
                <a href="products.html" style="color:var(--accent);margin-top:12px;display:inline-block">&larr; Quay lại danh sách</a>
            </div>
        `;
        return;
    }

    // Update page title + meta + JSON-LD
    document.title = `${product.name} - Templexa`;

    const baseUrl = 'https://phuocpt98.github.io/Templexa/';
    function toAbsUrl(relative) {
        return baseUrl + relative.replace(/^\.\//, '');
    }

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.content = product.description;
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.content = `${product.name} - Templexa`;
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.content = product.description;
    const ogImage = document.querySelector('meta[property="og:image"]');
    if (ogImage && product.thumbnail) ogImage.content = toAbsUrl(product.thumbnail);
    const twitterImage = document.querySelector('meta[name="twitter:image"]');
    if (twitterImage && product.thumbnail) twitterImage.content = toAbsUrl(product.thumbnail);

    const schemaEl = document.getElementById('productSchema');
    if (schemaEl) {
        schemaEl.textContent = JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: product.name,
            description: product.description,
            image: product.images.map(toAbsUrl),
            url: window.location.href,
            brand: { '@type': 'Brand', name: 'Templexa' },
            category: CATEGORIES.find(c => c.id === product.category)?.label || product.category,
            aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: product.rating,
                bestRating: 5,
                ratingCount: product.downloads,
            },
            offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'VND',
                availability: 'https://schema.org/InStock',
            },
        });
    }

    // ── Category label ──────────────────────────
    const categoryLabel = CATEGORIES.find(c => c.id === product.category)?.label || product.category;

    // ── Render detail ───────────────────────────
    const featuresHTML = product.features.map(f =>
        `<li>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
            ${f}
        </li>`
    ).join('');

    const thumbsHTML = product.images.map((img, i) =>
        `<div class="gallery-thumb${i === 0 ? ' active' : ''}" data-index="${i}">
            <img src="${img}" alt="Thumb ${i + 1}">
        </div>`
    ).join('');

    const priceClass = product.price === 'free' ? 'free' : 'paid';
    const priceLabel = product.price === 'free' ? 'FREE' : product.price;

    // Time ago
    const updatedDate = new Date(product.updatedAt);
    const daysDiff = Math.floor((Date.now() - updatedDate) / 86400000);
    let timeAgo;
    if (daysDiff === 0) timeAgo = 'Hôm nay';
    else if (daysDiff === 1) timeAgo = 'Hôm qua';
    else if (daysDiff < 30) timeAgo = `${daysDiff} ngày trước`;
    else timeAgo = updatedDate.toLocaleDateString('vi-VN');

    contentEl.innerHTML = `
        <nav class="breadcrumb">
            <a href="products.html">Danh sách thiết kế</a>
            <span>&rsaquo;</span>
            <a href="products.html?category=${product.category}">${categoryLabel}</a>
            <span>&rsaquo;</span>
            <span class="current">${product.name}</span>
        </nav>

        <h1 class="detail-title">${product.name}</h1>

        <div class="detail-layout">
            <div>
                <div class="detail-gallery">
                    <div class="gallery-main">
                        <img src="${product.images[0]}" alt="${product.name}" id="galleryMainImg">
                    </div>
                    ${product.images.length > 1 ? `<div class="gallery-thumbs">${thumbsHTML}</div>` : ''}
                </div>

                <div class="action-bar">
                    <button id="btnSave">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                        Save
                    </button>
                    <button id="btnShare">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="18" cy="5" r="3"></circle>
                            <circle cx="6" cy="12" r="3"></circle>
                            <circle cx="18" cy="19" r="3"></circle>
                            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                        </svg>
                        Share
                    </button>
                    <span class="updated">Last updated: ${timeAgo}</span>
                </div>
            </div>

            <div class="detail-sidebar">
                <span class="price-badge ${priceClass}">${priceLabel}</span>

                <button class="btn-primary" id="btnGetTemplate">
                    Dùng ngay
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                </button>

                ${product.demoUrl ? `
                <a href="${product.demoUrl}" target="_blank" class="btn-outline">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                    Xem demo
                </a>` : ''}

                <p class="sidebar-features-title">Tính năng nổi bật</p>
                <ul class="sidebar-features">${featuresHTML}</ul>

                <a href="contact.html" class="btn-custom">Yêu cầu tùy chỉnh</a>
            </div>
        </div>
    `;

    // ── Gallery thumbnails ──────────────────────
    const mainImg = document.getElementById('galleryMainImg');
    document.querySelectorAll('.gallery-thumb').forEach(thumb => {
        thumb.addEventListener('click', () => {
            const index = Number(thumb.dataset.index);
            mainImg.src = product.images[index];
            document.querySelectorAll('.gallery-thumb').forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');
        });
    });

    // ── Save button ──────────────────────────────
    const btnSave = document.getElementById('btnSave');
    if (btnSave) {
        const savedKey = `saved_${product.id}`;
        if (sessionStorage.getItem(savedKey)) {
            btnSave.classList.add('saved');
        }
        btnSave.addEventListener('click', () => {
            btnSave.classList.toggle('saved');
            if (btnSave.classList.contains('saved')) {
                sessionStorage.setItem(savedKey, '1');
            } else {
                sessionStorage.removeItem(savedKey);
            }
        });
    }

    // ── Share button ────────────────────────────
    const btnShare = document.getElementById('btnShare');
    if (btnShare) {
        btnShare.addEventListener('click', () => {
            if (navigator.share) {
                navigator.share({ title: product.name, url: window.location.href });
            } else {
                navigator.clipboard.writeText(window.location.href);
                btnShare.querySelector('svg + *') || (btnShare.textContent = '');
                const origHTML = btnShare.innerHTML;
                btnShare.innerHTML = origHTML.replace('Share', 'Copied!');
                setTimeout(() => { btnShare.innerHTML = origHTML; }, 2000);
            }
        });
    }

    // ── Modal: Dùng ngay ────────────────────────
    const btnGetTemplate = document.getElementById('btnGetTemplate');

    function openModal(modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal(modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    btnGetTemplate.addEventListener('click', () => openModal(modalForm));

    document.getElementById('modalFormClose').addEventListener('click', () => closeModal(modalForm));
    document.getElementById('modalSuccessClose').addEventListener('click', () => closeModal(modalSuccess));
    document.getElementById('modalSuccessBtn').addEventListener('click', () => closeModal(modalSuccess));

    // Close on overlay click
    [modalForm, modalSuccess].forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal(modal);
        });
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal(modalForm);
            closeModal(modalSuccess);
        }
    });

    // ── Form submit ─────────────────────────────
    const templateForm = document.getElementById('templateForm');
    templateForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = templateForm.querySelector('.modal-submit');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Đang gửi...';

        const formData = {
            email: templateForm.email.value,
            name: templateForm.name.value,
            phone: templateForm.phone.value,
            reference: window.location.href,
            service: '',
            note: '',
            status: 'submit',
        };

        await submitToGoogleSheet(formData);

        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Gửi và Nhận mẫu <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>';

        closeModal(modalForm);
        openModal(modalSuccess);
        templateForm.reset();
    });

    // ── Related products ────────────────────────
    const related = getRelatedProducts(product.id, 4);
    if (related.length > 0) {
        relatedSection.style.display = '';
        relatedGrid.innerHTML = related.map(p => {
            const catLabel = CATEGORIES.find(c => c.id === p.category)?.label || p.category;
            const badgeClass = p.price === 'free' ? 'free' : '';

            return `
                <a href="product-detail.html?id=${p.id}" class="related-card">
                    <div class="related-card-image">
                        <img src="${p.thumbnail}" alt="${p.name}" loading="lazy">
                        ${p.price === 'free' ? '<span class="product-badge free">FREE</span>' : ''}
                    </div>
                    <div class="related-card-info">
                        <h4>${p.name}</h4>
                        <p>${catLabel}</p>
                        <div class="related-card-meta">
                            <span>&darr; ${p.downloads || 0}</span>
                            <span>&star; ${p.rating || 0}</span>
                        </div>
                    </div>
                </a>
            `;
        }).join('');
    }
})();
