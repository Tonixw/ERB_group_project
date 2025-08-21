const app = {
    searchProducts() {
        const searchInput = document.getElementById('search-input');
        if (!searchInput) return;
        searchInput.addEventListener('input', () => {
            const keyword = searchInput.value.toLowerCase();
            const filteredProducts = this.products.filter(p => 
                p.name.toLowerCase().includes(keyword) || 
                p.category.toLowerCase().includes(keyword)
            );
            this.renderProducts(filteredProducts);
        });
    }
};