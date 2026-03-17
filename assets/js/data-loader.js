// ============================================
// PRODUCT DETAIL LOADER
// Fetch detail data (images, path, features) on demand
// ============================================

const ProductDetail = (function () {
    const cache = {};

    // Map new category → existing JSON file
    const DETAIL_FILE_MAP = { 'wedding': 'invitation', 'other': 'invitation' };

    /**
     * Fetch detail JSON for a category (cached per category)
     */
    async function fetchCategory(category) {
        const file = DETAIL_FILE_MAP[category] || category;
        if (cache[file]) return cache[file];

        const res = await fetch(`./assets/data/${file}.json`);
        if (!res.ok) throw new Error(`Failed to load ${file}.json`);

        const data = await res.json();
        cache[file] = data;
        return data;
    }

    /**
     * Get full product data (summary + detail) by id
     * Returns merged object or null if not found
     */
    async function getFullProduct(id) {
        const product = getProductById(id);
        if (!product) return null;

        const detail = await fetchCategory(product.category);
        const extra = detail[product.id];

        if (!extra) return product;

        return Object.assign({}, product, extra);
    }

    /**
     * Prefetch category JSON (fire-and-forget, warms cache)
     */
    function prefetch(id) {
        const product = getProductById(id);
        if (!product) return;
        const file = DETAIL_FILE_MAP[product.category] || product.category;
        if (!cache[file]) {
            fetchCategory(product.category).catch(function () {});
        }
    }

    return { getFullProduct, prefetch, fetchCategoryData: fetchCategory };
})();
