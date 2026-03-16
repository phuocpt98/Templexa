// ============================================
// PRODUCT DETAIL LOADER
// Fetch detail data (images, path, features) on demand
// ============================================

const ProductDetail = (function () {
    const cache = {};

    /**
     * Fetch detail JSON for a category (cached per category)
     */
    async function fetchCategory(category) {
        if (cache[category]) return cache[category];

        const res = await fetch(`./assets/data/${category}.json`);
        if (!res.ok) throw new Error(`Failed to load ${category}.json`);

        const data = await res.json();
        cache[category] = data;
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

    return { getFullProduct };
})();
