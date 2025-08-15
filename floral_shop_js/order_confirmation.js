const app = {
    confirmOrder() {
        const form = document.getElementById('checkout-form');
        if (!form) return;
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const confirmation = document.getElementById('order-confirmation');
            if (confirmation) {
                confirmation.innerHTML = `
                    <h2>訂單已提交！</h2>
                    <p>感謝您的購買，我們會盡快處理您的訂單。</p>
                `;
                this.cart = []; 
                this.saveCart();
                this.renderCart();
                this.updateCartIcon();
            }
        });
    }
};