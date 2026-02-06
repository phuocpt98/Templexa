// Filter tabs functionality
const filterTabs = document.querySelectorAll('.filter-tab');

filterTabs.forEach(tab => {
    tab.addEventListener('click', function() {
        // Only toggle active for tabs in the same group
        const parent = this.closest('.filter-tabs, .filter-tabs-right');
        if (parent) {
            parent.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        }
    });
});

// Search functionality
const searchInput = document.querySelector('.search-box input');
if (searchInput) {
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const productCards = document.querySelectorAll('.product-card');

        productCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const category = card.querySelector('p').textContent.toLowerCase();

            if (title.includes(searchTerm) || category.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

// Pagination functionality
const paginationNums = document.querySelectorAll('.pagination-num');
paginationNums.forEach(num => {
    num.addEventListener('click', function() {
        paginationNums.forEach(n => n.classList.remove('active'));
        this.classList.add('active');
    });
});
