// ============================================
// CONTACT PAGE — Pricing render + Form validation & submit
// ============================================

(function () {
    const pricingGrid = document.getElementById('pricingGrid');
    const webPricingGrid = document.getElementById('webPricingGrid');
    const consultForm = document.getElementById('consultForm');
    const serviceSelect = consultForm?.querySelector('select[name="service"]');

    // Nguồn dữ liệu chính (thiệp online) — fallback về PRICING nếu chưa tồn tại
    const invitationPlans = (typeof INVITATION_PRICING !== 'undefined') ? INVITATION_PRICING : PRICING;
    // Nguồn dữ liệu web/legacy — chỉ render nếu #webPricingGrid tồn tại trên trang
    const webPlans = (typeof PRICING !== 'undefined') ? PRICING : [];

    // Map planId -> plan, dùng để resolve URL param / auto-select trên cả 2 bảng giá
    const planRegistry = {};

    function featuresHTML(plan) {
        return plan.features.map(f => {
            const isObj = typeof f === 'object';
            const text = isObj ? f.text : f;
            const disabled = isObj && f.disabled;

            return `
                <li class="${disabled ? 'disabled' : ''}">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    ${text}
                </li>
            `;
        }).join('');
    }

    function planCardHTML(plan) {
        return `
            <div class="pricing-card${plan.highlighted ? ' highlighted popular' : ''}" data-plan-id="${plan.id}">
                <div class="pricing-header">
                    <h3>${plan.name}</h3>
                    ${plan.discount ? `<span class="pricing-discount">${plan.discount}</span>` : ''}
                </div>
                <p class="pricing-desc">${plan.description}</p>
                <div class="pricing-original-price${plan.showOriginalPrice ? '' : ' hidden'}">${plan.showOriginalPrice ? plan.originalPrice : '&nbsp;'}</div>
                <div class="pricing-price">${plan.price}</div>
                <button class="pricing-cta" data-plan="${plan.id}">Chọn Gói Ngay</button>
                <ul class="pricing-features">${featuresHTML(plan)}</ul>
            </div>
        `;
    }

    // Thêm option cho <select name="service"> nếu id chưa có sẵn trong HTML
    function ensureServiceOption(plan) {
        if (!serviceSelect) return;
        const exists = Array.from(serviceSelect.options).some(opt => opt.value === plan.id);
        if (!exists) {
            const opt = document.createElement('option');
            opt.value = plan.id;
            opt.textContent = `${plan.name} — ${plan.price}`;
            serviceSelect.appendChild(opt);
        }
    }

    // Highlight 1 card trong 1 grid cụ thể (bỏ highlight card khác trong cùng grid)
    function highlightCard(grid, card) {
        card.classList.add('highlighted');
        setTimeout(() => {
            grid.querySelectorAll('.pricing-card').forEach(c => {
                if (c !== card) c.classList.remove('highlighted');
            });
        }, 100);
    }

    // Render 1 grid bảng giá + gắn event (click card, click CTA)
    function renderPricingGrid(grid, plans) {
        if (!grid) return;

        grid.innerHTML = plans.map(planCardHTML).join('');

        plans.forEach(plan => {
            planRegistry[plan.id] = { plan, grid };
            ensureServiceOption(plan);
        });

        grid.querySelectorAll('.pricing-card').forEach(card => {
            card.addEventListener('click', () => highlightCard(grid, card));
        });

        grid.querySelectorAll('.pricing-cta').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const planId = btn.dataset.plan;
                const card = btn.closest('.pricing-card');
                const formSection = document.getElementById('contactForm');

                highlightCard(grid, card);

                if (serviceSelect) {
                    serviceSelect.value = planId;
                }

                if (formSection) {
                    formSection.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }

    // ── Render pricing cards ────────────────────
    renderPricingGrid(pricingGrid, invitationPlans);
    // #webPricingGrid chưa tồn tại trong contact.html hiện tại (sẽ thêm ở phase sau) → tự bỏ qua nếu không có
    if (webPricingGrid) {
        renderPricingGrid(webPricingGrid, webPlans);
    }

    // ── Auto-select service từ URL param (?service=) ──────
    // Resolve id từ cả 2 bảng giá: thiệp online (thiep-basic/thiep-pro/thiep-custom)
    // và legacy web (basic/pro/premium/custom)
    const urlParams = new URLSearchParams(window.location.search);
    const serviceParam = urlParams.get('service');
    if (serviceParam) {
        if (serviceSelect) {
            serviceSelect.value = serviceParam;
        }

        const match = planRegistry[serviceParam];
        if (match) {
            const card = match.grid.querySelector(`.pricing-card[data-plan-id="${serviceParam}"]`);
            if (card) {
                highlightCard(match.grid, card);
            }
        }
    }

    // ── Smooth scroll for anchor links ──────────
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ── Form submission ─────────────────────────
    if (consultForm) {
        consultForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitBtn = consultForm.querySelector('.modal-submit');
            submitBtn.disabled = true;
            submitBtn.textContent = 'Đang gửi...';

            // Gộp loại thiệp (nếu có) vào note để không mất dữ liệu khi submit
            const invitationType = consultForm.invitationType ? consultForm.invitationType.value : '';
            const noteValue = invitationType
                ? `[Loại thiệp: ${invitationType}] ${consultForm.note.value}`.trim()
                : consultForm.note.value;

            const formData = {
                email: consultForm.email.value,
                phone: consultForm.phone.value,
                reference: consultForm.reference.value,
                service: consultForm.service.value,
                note: noteValue,
                status: 'tư vấn',
            };

            const result = await submitToGoogleSheet(formData);

            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Gửi Yêu Cầu Tư Vấn <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>';

            if (result.success) {
                consultForm.reset();
                // Show inline success
                const successMsg = document.createElement('div');
                successMsg.className = 'form-msg-success';
                successMsg.textContent = 'Gửi yêu cầu thành công! Chúng tôi sẽ liên hệ bạn sớm nhất.';
                consultForm.appendChild(successMsg);
                setTimeout(() => successMsg.remove(), 5000);
            } else {
                const errorMsg = document.createElement('div');
                errorMsg.className = 'form-msg-error';
                errorMsg.textContent = result.message;
                consultForm.appendChild(errorMsg);
                setTimeout(() => errorMsg.remove(), 5000);
            }
        });
    }
})();
