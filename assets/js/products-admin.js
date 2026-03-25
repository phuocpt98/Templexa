// ============================================
// ADMIN OVERRIDE — Show ALL products, sort by ID descending (newest first)
// Loaded BEFORE products.js to override helper functions from data.js
// ============================================

// Override: return ALL products (including isPublic: false), sorted by ID descending
function getProductsSorted() {
    return [...PRODUCTS].sort((a, b) => b.id - a.id);
}

// Override: filter without isPublic check, keep ID descending order
function filterProducts({ category = 'all', type = 'all', search = '' } = {}) {
    return getProductsSorted().filter(p => {
        const matchCategory = category === 'all' || p.category === category;
        const matchType = type === 'all' || p.type === type;
        const matchSearch = !search ||
            p.name.toLowerCase().includes(search.toLowerCase()) ||
            p.description.toLowerCase().includes(search.toLowerCase()) ||
            p.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
        return matchCategory && matchType && matchSearch;
    });
}
