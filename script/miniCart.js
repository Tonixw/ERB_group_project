console.log('miniCart.js loaded');
// Mini Cart functionality
function updateMiniCart() {
    const cart = getCart();
    const miniCartItems = document.getElementById('mini-cart-items');
    const miniCartTotal = document.getElementById('mini-cart-total');

    if (!miniCartItems || !miniCartTotal) {
        console.error('Mini cart elements not found!');
        return;
    }

    // Clear existing items
    miniCartItems.innerHTML = '';

    if (cart.length === 0) {
        miniCartItems.innerHTML = '<div style="text-align: center; color: #999; padding: 1rem;">Your cart is empty</div>';
        miniCartTotal.textContent = '0.00';
        return;
    }

    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const cartItem = document.createElement('div');
        cartItem.className = 'mini-cart-item';
        cartItem.innerHTML = `
            <div class="mini-cart-info">
                <div class="mini-cart-title">${item.name}</div>
                <div class="mini-cart-quantity">
                    <button onclick="decreaseQuantityMiniCart('${item.id}')" class="quantity-btn">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button onclick="increaseQuantityMiniCart('${item.id}')" class="quantity-btn">+</button>
                </div>
                <div class="mini-cart-price">$${item.price} × ${item.quantity}</div>
            </div>
            <button class="mini-cart-remove" onclick="removeFromMiniCart('${item.id}')" title="Remove item">
                <i class="fa-solid fa-times"></i>
            </button>
        `;

        miniCartItems.appendChild(cartItem);
    });

    miniCartTotal.textContent = total.toFixed(2);
}

// Increase quantity in mini cart
function increaseQuantityMiniCart(productId) {
    const cart = getCart();
    const product = products.find(p => p.id === productId);
    if (product) {
        addToCart(product, 1);
        updateMiniCart();
        updateCartCount();
    }
}

// Decrease quantity in mini cart
function decreaseQuantityMiniCart(productId) {
    const cart = getCart();
    const product = products.find(p => p.id === productId);
    if (product) {
        removeFromCart(product, 1);
        updateMiniCart();
        updateCartCount();
    }
}

// Remove item from mini cart
function removeFromMiniCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        const cart = getCart();
        const item = cart.find(i => i.id === productId);
        if (item) {
            removeFromCart(product, item.quantity); // Remove all quantity
            updateMiniCart();
            updateCartCount();
        }
    }
}

// Initialize mini cart when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('Mini cart initializing...');
    updateMiniCart();
});

// Update mini cart whenever cart changes
const originalAddToCart = window.addToCart;
window.addToCart = function(product, quantity) {
    originalAddToCart(product, quantity);
    updateMiniCart();
};

const originalRemoveFromCart = window.removeFromCart;
window.removeFromCart = function(product, quantity) {
    originalRemoveFromCart(product, quantity);
    updateMiniCart();
};