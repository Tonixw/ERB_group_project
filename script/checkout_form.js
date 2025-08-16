const app = {
    validateForm() {
        const form = document.getElementById('checkout-form');
        if (!form) return;
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = form.querySelector('#email').value;
            const phone = form.querySelector('#phone').value;
            const address = form.querySelector('#address').value;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const phoneRegex = /^\d{8}$/;
            if (!emailRegex.test(email)) {
                alert('請輸入有效電郵地址');
                return;
            }
            if (!phoneRegex.test(phone)) {
                alert('請輸入8位數字電話號碼');
                return;
            }
            if (!address) {
                alert('請輸入送貨地址');
                return;
            }

            console.log('結帳資料:', { email, phone, address, cart: this.cart });
        });
    }
};