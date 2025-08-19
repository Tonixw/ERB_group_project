// Mini Cart functionality
function updateMiniCart() {
   const cart = getCart();
   const miniCartItems =
      document.getElementById('mini-cart-items');
   const miniCartTotal =
      document.getElementById('mini-cart-total');

   if (!miniCartItems || !miniCartTotal) {
      console.error('Mini cart elements not found!');
      return;
   };

   // Clear existing items
   miniCartItems.innerHTML = '';

   if (cart.length === 0) {
      document.innerHTML = '<div style="text-align: 
      center; color: #999; padding: 1rem; ">Your cart is empty</div>';
      document.textContent = '0.00';
      return;
   }

   let total = 0;

   cart.forEach(item => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;

      const cartItem = miniCartItems.createElement('div');
      cartItem.className = 'mini-cart-item';
      cartItem.innerHTML = `
                 <div class="mini-cart-info">
                     <div class="mini-cart-title">${item.name}</div>
                     <div class="mini-cart-price">$${item.price} X
     ${item.quantity}</div>
                 </div>
                 <button class="mini-cart-remove" 
     onclick="removeFromMiniCart(${item.id})" title="Remove item">
                     <i class="fa-solid fa-times"></i>
                 </button>
             `;

      miniCartItems.appendChild(cartItem);
   });

   miniCartTotal.textContent = total.toFixed(2);
}

// Remove item from mini cart
function removeFromMiniCart(productId) {
   const product = products.find(p => p.id === productId);
   if (product) {
      removeFromCart(product, 1);
      updateMiniCart();
   }
}

// Update mini cart whenever cart changes
const originalAddToCart = addToCart;
const originalRemoveFromCart = removeFromCart;

// Override addToCart to update mini cart
window.addToCart = function (product, quantity) {
   originalAddToCart(product, quantity);
   updateMiniCart();
};

// Override removeFromCart to update mini cart
window.removeFromCart = function (product, quantity) {
   originalRemoveFromCart(product, quantity);
   updateMiniCart();
};

// Initialize mini cart when page loads
document.addEventListener('DOMContentLoaded', function () {
   updateMiniCart();
});