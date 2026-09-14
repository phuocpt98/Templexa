(function () {
    'use strict';

    var LANG = {
        vi: {
            title: 'Tạo mã QR miễn phí',
            subtitle: 'Tuỳ chỉnh kiểu dáng, màu sắc, thêm logo — tải về ngay, không cần đăng ký',
            typeUrl: 'Website',
            typeText: 'Văn bản',
            typeWifi: 'Wi-Fi',
            typePhone: 'Điện thoại',
            typeEmail: 'Email',
            typeVcard: 'Danh thiếp',
            urlPlaceholder: 'https://example.com',
            urlLabel: 'Link website',
            textLabel: 'Nội dung',
            textPlaceholder: 'Nhập văn bản bất kỳ...',
            wifiSsid: 'Tên mạng (SSID)',
            wifiPass: 'Mật khẩu',
            wifiEnc: 'Mã hoá',
            wifiNone: 'Không mã hoá',
            phonePlaceholder: '+84 xxx xxx xxx',
            phoneLabel: 'Số điện thoại',
            emailTo: 'Địa chỉ email',
            emailSubject: 'Tiêu đề',
            emailBody: 'Nội dung',
            vcardName: 'Họ và tên',
            vcardPhone: 'Số điện thoại',
            vcardEmail: 'Email',
            vcardOrg: 'Công ty',
            vcardTitle: 'Chức danh',
            designColors: 'Màu sắc',
            designPattern: 'Kiểu chấm',
            designCorners: 'Kiểu góc',
            designLogo: 'Logo',
            fgColor: 'Màu QR',
            bgColor: 'Màu nền',
            cornerSquare: 'Khung góc',
            cornerDot: 'Chấm góc',
            uploadLogo: 'Tải logo lên',
            removeLogo: 'Xoá',
            download: 'Tải QR (PNG)',
            logoNote: 'JPG, PNG, SVG — tối đa 2 MB',
            customText: 'Văn bản bên dưới QR',
            customTextPlaceholder: 'VD: Quét để xem thiệp cưới',
            designFrame: 'Khung ngoài',
            frameColor: 'Màu khung',
            frameBgImage: 'Ảnh nền khung',
            uploadFrameBg: 'Tải ảnh nền',
            frameNote: 'Ảnh sẽ phủ toàn bộ khung bên ngoài QR',
            textFont: 'Font',
            textColor: 'Màu chữ',
            textSize: 'Cỡ chữ'
        },
        en: {
            title: 'Free QR Code Generator',
            subtitle: 'Customize style, colors, add logo — download instantly, no signup',
            typeUrl: 'Website',
            typeText: 'Text',
            typeWifi: 'Wi-Fi',
            typePhone: 'Phone',
            typeEmail: 'Email',
            typeVcard: 'vCard',
            urlPlaceholder: 'https://example.com',
            urlLabel: 'Website URL',
            textLabel: 'Content',
            textPlaceholder: 'Enter any text...',
            wifiSsid: 'Network name (SSID)',
            wifiPass: 'Password',
            wifiEnc: 'Encryption',
            wifiNone: 'None',
            phonePlaceholder: '+1 xxx xxx xxxx',
            phoneLabel: 'Phone number',
            emailTo: 'Email address',
            emailSubject: 'Subject',
            emailBody: 'Body',
            vcardName: 'Full name',
            vcardPhone: 'Phone',
            vcardEmail: 'Email',
            vcardOrg: 'Company',
            vcardTitle: 'Job title',
            designColors: 'Colors',
            designPattern: 'Dot pattern',
            designCorners: 'Corners',
            designLogo: 'Logo',
            fgColor: 'QR color',
            bgColor: 'Background',
            cornerSquare: 'Corner frame',
            cornerDot: 'Corner dot',
            uploadLogo: 'Upload logo',
            removeLogo: 'Remove',
            download: 'Download QR (PNG)',
            logoNote: 'JPG, PNG, SVG — max 2 MB',
            customText: 'Text below QR',
            customTextPlaceholder: 'E.g.: Scan to view wedding invitation',
            designFrame: 'Outer frame',
            frameColor: 'Frame color',
            frameBgImage: 'Frame background',
            uploadFrameBg: 'Upload background',
            frameNote: 'Image will cover the entire frame area around QR',
            textFont: 'Font',
            textColor: 'Text color',
            textSize: 'Font size'
        }
    };

    var currentLang = 'vi';
    var isAdmin = new URLSearchParams(window.location.search).get('admin') === 'true';
    var qrCode = null;
    var currentType = 'url';
    var logoDataUrl = null;
    var frameBgDataUrl = null;

    var qrOptions = {
        width: 1024,
        height: 1024,
        data: 'https://templexa.vn',
        margin: 10,
        type: 'canvas',
        dotsOptions: { color: '#000000', type: 'rounded' },
        backgroundOptions: { color: '#ffffff' },
        cornersSquareOptions: { type: 'extra-rounded', color: '#000000' },
        cornersDotOptions: { type: 'dot', color: '#000000' },
        imageOptions: { crossOrigin: 'anonymous', margin: 8, imageSize: 0.35 }
    };

    function init() {
        qrCode = new QRCodeStyling(qrOptions);
        qrCode.append(document.getElementById('qtCanvas'));
        bindTypes();
        bindContent();
        bindDesign();
        bindLogo();
        bindDownload();
        bindCustomText();
        bindFrame();
        bindLang();
        applyLang(currentLang);
        if (isAdmin) {
            var wm = document.querySelector('.qt-watermark-top');
            if (wm) wm.hidden = true;
        }
    }

    function getData() {
        switch (currentType) {
            case 'url':
                return val('qtUrl') || 'https://templexa.vn';
            case 'text':
                return val('qtText') || 'Hello from Templexa';
            case 'wifi':
                var ssid = val('qtWifiSsid');
                var pass = val('qtWifiPass');
                var enc = val('qtWifiEnc');
                if (!ssid) return 'WIFI:T:WPA;S:MyNetwork;P:password;;';
                return 'WIFI:T:' + enc + ';S:' + escWifi(ssid) + ';P:' + escWifi(pass) + ';;';
            case 'phone':
                return 'tel:' + (val('qtPhone') || '+84000000000');
            case 'email':
                var to = val('qtEmailTo') || 'hello@example.com';
                var subj = val('qtEmailSubj');
                var body = val('qtEmailBody');
                var q = [];
                if (subj) q.push('subject=' + encodeURIComponent(subj));
                if (body) q.push('body=' + encodeURIComponent(body));
                return 'mailto:' + to + (q.length ? '?' + q.join('&') : '');
            case 'vcard':
                var n = val('qtVcardName') || 'Templexa';
                var p = val('qtVcardPhone');
                var e = val('qtVcardEmail');
                var o = val('qtVcardOrg');
                var t = val('qtVcardTitle');
                var lines = ['BEGIN:VCARD', 'VERSION:3.0', 'FN:' + n];
                if (p) lines.push('TEL:' + p);
                if (e) lines.push('EMAIL:' + e);
                if (o) lines.push('ORG:' + o);
                if (t) lines.push('TITLE:' + t);
                lines.push('END:VCARD');
                return lines.join('\n');
            default:
                return 'https://templexa.vn';
        }
    }

    function escWifi(s) {
        return (s || '').replace(/[\\;,:""]/g, function (c) { return '\\' + c; });
    }

    function val(id) {
        var el = document.getElementById(id);
        return el ? el.value.trim() : '';
    }

    function updateQR() {
        var opts = {
            data: getData(),
            dotsOptions: { color: val('qtFgColor') || '#000000', type: qrOptions.dotsOptions.type },
            backgroundOptions: { color: val('qtBgColor') || '#ffffff' },
            cornersSquareOptions: { type: qrOptions.cornersSquareOptions.type, color: val('qtFgColor') || '#000000' },
            cornersDotOptions: { type: qrOptions.cornersDotOptions.type, color: val('qtFgColor') || '#000000' }
        };
        if (logoDataUrl) {
            opts.image = logoDataUrl;
        } else {
            opts.image = '';
        }
        qrCode.update(opts);
    }

    var debounceTimer;
    function debouncedUpdate() {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(updateQR, 200);
    }

    function bindTypes() {
        var btns = document.querySelectorAll('.qt-type-btn');
        btns.forEach(function (btn) {
            btn.addEventListener('click', function () {
                btns.forEach(function (b) { b.classList.remove('active'); });
                btn.classList.add('active');
                currentType = btn.dataset.type;
                document.querySelectorAll('.qt-input-group').forEach(function (g) {
                    g.classList.toggle('active', g.dataset.type === currentType);
                });
                debouncedUpdate();
            });
        });
    }

    function bindContent() {
        document.querySelectorAll('.qt-content input, .qt-content textarea, .qt-content select').forEach(function (el) {
            el.addEventListener('input', debouncedUpdate);
        });
    }

    function bindDesign() {
        var fgColor = document.getElementById('qtFgColor');
        var bgColor = document.getElementById('qtBgColor');
        var fgHex = document.getElementById('qtFgHex');
        var bgHex = document.getElementById('qtBgHex');

        fgColor.addEventListener('input', function () { fgHex.value = fgColor.value; updateQR(); });
        bgColor.addEventListener('input', function () { bgHex.value = bgColor.value; updateQR(); });
        fgHex.addEventListener('input', function () {
            if (/^#[0-9a-f]{6}$/i.test(fgHex.value)) { fgColor.value = fgHex.value; updateQR(); }
        });
        bgHex.addEventListener('input', function () {
            if (/^#[0-9a-f]{6}$/i.test(bgHex.value)) { bgColor.value = bgHex.value; updateQR(); }
        });

        document.querySelectorAll('[data-dot-type]').forEach(function (btn) {
            btn.addEventListener('click', function () {
                document.querySelectorAll('[data-dot-type]').forEach(function (b) { b.classList.remove('active'); });
                btn.classList.add('active');
                qrOptions.dotsOptions.type = btn.dataset.dotType;
                updateQR();
            });
        });

        document.querySelectorAll('[data-corner-sq]').forEach(function (btn) {
            btn.addEventListener('click', function () {
                document.querySelectorAll('[data-corner-sq]').forEach(function (b) { b.classList.remove('active'); });
                btn.classList.add('active');
                qrOptions.cornersSquareOptions.type = btn.dataset.cornerSq;
                updateQR();
            });
        });

        document.querySelectorAll('[data-corner-dot]').forEach(function (btn) {
            btn.addEventListener('click', function () {
                document.querySelectorAll('[data-corner-dot]').forEach(function (b) { b.classList.remove('active'); });
                btn.classList.add('active');
                qrOptions.cornersDotOptions.type = btn.dataset.cornerDot;
                updateQR();
            });
        });
    }

    function bindLogo() {
        var fileInput = document.getElementById('qtLogoFile');
        var uploadBtn = document.getElementById('qtLogoBtn');
        var removeBtn = document.getElementById('qtLogoRemove');
        var preview = document.getElementById('qtLogoPreview');

        uploadBtn.addEventListener('click', function () { fileInput.click(); });

        fileInput.addEventListener('change', function () {
            var file = fileInput.files[0];
            if (!file) return;
            if (file.size > 2 * 1024 * 1024) {
                fileInput.value = '';
                return;
            }
            var reader = new FileReader();
            reader.onload = function (e) {
                logoDataUrl = e.target.result;
                preview.src = logoDataUrl;
                preview.hidden = false;
                removeBtn.hidden = false;
                updateQR();
            };
            reader.readAsDataURL(file);
        });

        removeBtn.addEventListener('click', function () {
            logoDataUrl = null;
            fileInput.value = '';
            preview.hidden = true;
            removeBtn.hidden = true;
            updateQR();
        });
    }

    function bindCustomText() {
        var input = document.getElementById('qtCustomText');
        var preview = document.getElementById('qtCustomTextPreview');
        var fontSel = document.getElementById('qtTextFont');
        var colorPick = document.getElementById('qtTextColor');
        var colorHex = document.getElementById('qtTextColorHex');
        var sizeRange = document.getElementById('qtTextSize');
        var sizeVal = document.getElementById('qtTextSizeVal');
        if (!input || !preview) return;

        function syncPreview() {
            var text = input.value.trim();
            preview.textContent = text;
            preview.style.fontFamily = fontSel.value + ', system-ui, sans-serif';
            preview.style.color = colorPick.value;
            preview.style.fontSize = sizeRange.value / 26 + 'em';
        }

        input.addEventListener('input', syncPreview);
        fontSel.addEventListener('change', syncPreview);
        colorPick.addEventListener('input', function () { colorHex.value = colorPick.value; syncPreview(); });
        colorHex.addEventListener('input', function () {
            if (/^#[0-9a-f]{6}$/i.test(colorHex.value)) { colorPick.value = colorHex.value; syncPreview(); }
        });
        sizeRange.addEventListener('input', function () { sizeVal.textContent = sizeRange.value; syncPreview(); });
    }

    function bindFrame() {
        var frameColor = document.getElementById('qtFrameColor');
        var frameHex = document.getElementById('qtFrameHex');
        var fileInput = document.getElementById('qtFrameBgFile');
        var uploadBtn = document.getElementById('qtFrameBgBtn');
        var removeBtn = document.getElementById('qtFrameBgRemove');
        var preview = document.getElementById('qtFrameBgPreview');
        var card = document.querySelector('.qt-preview-card');

        if (!frameColor || !frameHex) return;

        function updateCardBg() {
            if (frameBgDataUrl) {
                card.style.backgroundImage = 'url(' + frameBgDataUrl + ')';
                card.style.backgroundSize = 'cover';
                card.style.backgroundPosition = 'center';
            } else {
                card.style.backgroundImage = '';
                card.style.backgroundColor = frameColor.value;
            }
        }

        frameColor.addEventListener('input', function () { frameHex.value = frameColor.value; updateCardBg(); });
        frameHex.addEventListener('input', function () {
            if (/^#[0-9a-f]{6}$/i.test(frameHex.value)) { frameColor.value = frameHex.value; updateCardBg(); }
        });

        if (uploadBtn) uploadBtn.addEventListener('click', function () { fileInput.click(); });

        if (fileInput) fileInput.addEventListener('change', function () {
            var file = fileInput.files[0];
            if (!file || file.size > 4 * 1024 * 1024) { fileInput.value = ''; return; }
            var reader = new FileReader();
            reader.onload = function (e) {
                frameBgDataUrl = e.target.result;
                if (preview) { preview.src = frameBgDataUrl; preview.hidden = false; }
                if (removeBtn) removeBtn.hidden = false;
                updateCardBg();
            };
            reader.readAsDataURL(file);
        });

        if (removeBtn) removeBtn.addEventListener('click', function () {
            frameBgDataUrl = null;
            if (fileInput) fileInput.value = '';
            if (preview) preview.hidden = true;
            removeBtn.hidden = true;
            updateCardBg();
        });
    }

    function bindDownload() {
        document.getElementById('qtDownload').addEventListener('click', function () {
            var frameColor = val('qtFrameColor') || '#ffffff';
            var fgColor = val('qtFgColor') || '#000000';
            var customText = val('qtCustomText');
            var textFont = (document.getElementById('qtTextFont') || {}).value || 'Inter';
            var textColor = val('qtTextColor') || '#000000';
            var textSize = parseInt((document.getElementById('qtTextSize') || {}).value, 10) || 26;

            qrCode.getRawData('png').then(function (blob) {
                var qrImg = new Image();
                qrImg.onload = function () {
                    var pad = 40;
                    var wmH = isAdmin ? 0 : 32;
                    var ctH = customText ? (textSize + 16) : 0;
                    var cw = qrImg.width + pad * 2;
                    var ch = wmH + qrImg.height + pad + ctH + (customText ? 8 : 0);
                    var canvas = document.createElement('canvas');
                    canvas.width = cw;
                    canvas.height = ch;
                    var ctx = canvas.getContext('2d');

                    function drawContent(bgImg) {
                        if (bgImg) {
                            var scale = Math.max(cw / bgImg.width, ch / bgImg.height);
                            var sw = bgImg.width * scale;
                            var sh = bgImg.height * scale;
                            ctx.drawImage(bgImg, (cw - sw) / 2, (ch - sh) / 2, sw, sh);
                        } else {
                            ctx.fillStyle = frameColor;
                            ctx.fillRect(0, 0, cw, ch);
                        }

                        if (!isAdmin) {
                            ctx.fillStyle = fgColor;
                            ctx.globalAlpha = 0.4;
                            ctx.font = '600 20px Inter, system-ui, sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('templexa.vn', cw / 2, wmH - 8);
                            ctx.globalAlpha = 1;
                        }

                        ctx.drawImage(qrImg, pad, wmH);

                        if (customText) {
                            ctx.fillStyle = textColor;
                            ctx.font = '600 ' + textSize + 'px ' + textFont + ', system-ui, sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText(customText, cw / 2, wmH + qrImg.height + pad + 4);
                        }

                        canvas.toBlob(function (b) {
                            var a = document.createElement('a');
                            a.href = URL.createObjectURL(b);
                            a.download = 'qr-templexa.png';
                            document.body.appendChild(a);
                            a.click();
                            document.body.removeChild(a);
                            URL.revokeObjectURL(a.href);
                        }, 'image/png');
                    }

                    if (frameBgDataUrl) {
                        var bgImg = new Image();
                        bgImg.onload = function () { drawContent(bgImg); };
                        bgImg.src = frameBgDataUrl;
                    } else {
                        drawContent(null);
                    }
                };
                qrImg.src = URL.createObjectURL(blob);
            });
        });
    }

    function bindLang() {
        document.querySelectorAll('.qt-lang button').forEach(function (btn) {
            btn.addEventListener('click', function () {
                document.querySelectorAll('.qt-lang button').forEach(function (b) { b.classList.remove('active'); });
                btn.classList.add('active');
                currentLang = btn.dataset.lang;
                applyLang(currentLang);
                try { localStorage.setItem('qt-lang', currentLang); } catch (e) { }
            });
        });
        try {
            var saved = localStorage.getItem('qt-lang');
            if (saved && LANG[saved]) {
                currentLang = saved;
                document.querySelectorAll('.qt-lang button').forEach(function (b) {
                    b.classList.toggle('active', b.dataset.lang === currentLang);
                });
            }
        } catch (e) { }
    }

    function applyLang(lang) {
        var t = LANG[lang] || LANG.vi;
        document.querySelectorAll('[data-i18n]').forEach(function (el) {
            var key = el.dataset.i18n;
            if (t[key]) {
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    el.placeholder = t[key];
                } else {
                    el.textContent = t[key];
                }
            }
        });
    }

    if (typeof QRCodeStyling !== 'undefined') {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
        } else {
            init();
        }
    } else {
        window.addEventListener('load', function () {
            if (typeof QRCodeStyling !== 'undefined') init();
        });
    }
})();
