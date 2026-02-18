// ============================================
// CONTACT PAGE — Pricing render + Form validation & submit
// ============================================

(function () {
    const pricingGrid = document.getElementById('pricingGrid');
    const consultForm = document.getElementById('consultForm');

    // ── Render pricing cards ────────────────────
    if (pricingGrid) {
        pricingGrid.innerHTML = PRICING.map(plan => {
            const featuresHTML = plan.features.map(f => {
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

            return `
                <div class="pricing-card${plan.highlighted ? ' highlighted' : ''}">
                    <div class="pricing-header">
                        <h3>${plan.name}</h3>
                        ${plan.discount ? `<span class="pricing-discount">${plan.discount}</span>` : ''}
                    </div>
                    <p class="pricing-desc">${plan.description}</p>
                    <div class="pricing-original-price${plan.showOriginalPrice ? '' : ' hidden'}">${plan.showOriginalPrice ? plan.originalPrice : '&nbsp;'}</div>
                    <div class="pricing-price">${plan.price}</div>
                    <button class="pricing-cta" data-plan="${plan.id}">Chọn Gói Ngay</button>
                    <ul class="pricing-features">${featuresHTML}</ul>
                </div>
            `;
        }).join('');

        // Click card to highlight
        function highlightCard(card) {
            pricingGrid.querySelectorAll('.pricing-card').forEach(c => c.classList.remove('highlighted'));
            card.classList.add('highlighted');
        }

        pricingGrid.querySelectorAll('.pricing-card').forEach(card => {
            card.addEventListener('click', () => highlightCard(card));
        });

        // Pricing CTA → highlight + scroll to form
        pricingGrid.querySelectorAll('.pricing-cta').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const planId = btn.dataset.plan;
                const card = btn.closest('.pricing-card');
                const formSection = document.getElementById('contactForm');
                const serviceSelect = consultForm?.querySelector('select[name="service"]');

                highlightCard(card);

                if (serviceSelect) {
                    serviceSelect.value = planId;
                }

                if (formSection) {
                    formSection.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }

    // ── Auto-select service from URL param ──────
    const urlParams = new URLSearchParams(window.location.search);
    const serviceParam = urlParams.get('service');
    if (serviceParam && consultForm) {
        const serviceSelect = consultForm.querySelector('select[name="service"]');
        if (serviceSelect) {
            serviceSelect.value = serviceParam;
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

            const formData = {
                email: consultForm.email.value,
                phone: consultForm.phone.value,
                reference: consultForm.reference.value,
                service: consultForm.service.value,
                note: consultForm.note.value,
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
