/*
 * ============================================
 * TEMPLEXA — Google Sheets API (Transport Layer)
 * ============================================
 * Cổng gửi (POST) & đọc (GET) dữ liệu Google Sheets.
 * KHÔNG chứa logic nghiệp vụ — chỉ nhận sheet_id + columns A/B/C/...
 * Logic gửi gì, form nào, render thế nào → nằm trong code.html của sản phẩm.
 *
 * Cách dùng trong code.html:
 *   <script src="../../../shared/wedding/wishes-api.js"></script>
 *   <script>
 *     // Gửi dữ liệu
 *     sheetsAPI.post('SHEET_ID', { A: 'tên', B: 'nội dung', C: '15/03/2026' })
 *       .then(result => console.log('OK', result))
 *       .catch(err => console.error(err));
 *
 *     // Đọc dữ liệu
 *     sheetsAPI.get('SHEET_ID')
 *       .then(rows => console.log(rows))  // [{ A: '...', B: '...', C: '...' }, ...]
 *       .catch(err => console.error(err));
 *   </script>
 *
 * API Endpoint:
 *   POST — gửi 1 row vào sheet
 *   GET  — đọc tất cả rows từ sheet
 * ============================================
 */

var sheetsAPI = (function () {
    var API_URL = 'https://script.google.com/macros/s/AKfycbypRzazRGzTQwcEpynlIOQIHAE4cR56OZRvsV8-oyQ4iiXc-RQmKUlwxNugQ1IPik8/exec';

    /**
     * POST — gửi 1 row vào sheet
     * @param {string} sheetId — ID của sheet
     * @param {Object} columns — { A: 'value', B: 'value', C: 'value', ... }
     * @returns {Promise}
     */
    function post(sheetId, columns) {
        if (!sheetId) return Promise.reject('[Sheets API] sheetId is required');

        var payload = { sheet_id: sheetId };
        Object.keys(columns).forEach(function (key) {
            payload[key] = columns[key];
        });

        return fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'text/plain' },
            body: JSON.stringify(payload),
        }).then(function (res) { return res.json(); });
    }

    /**
     * GET — đọc tất cả rows từ sheet
     * @param {string} sheetId — ID của sheet
     * @returns {Promise<Array>} — mảng rows [{ A: '...', B: '...', ... }, ...]
     */
    function get(sheetId) {
        if (!sheetId) return Promise.reject('[Sheets API] sheetId is required');

        return fetch(API_URL + '?sheet_id=' + encodeURIComponent(sheetId))
            .then(function (res) { return res.json(); })
            .then(function (data) {
                return (data && Array.isArray(data.data)) ? data.data : [];
            });
    }

    return { post: post, get: get };
})();
