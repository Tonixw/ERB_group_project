//persist cart items in local storage when users refresh the page
//initialize cart from local storage or set to empty array if not found
//define shopping array to hold cart items

//show cart items in every product page
window.onload = function () {
   updateCartCount();
}

const products = [
  { id: 1, name: "T-shirt", quantity : 0, price: 20 },
  { id: 2, name: "Jeans", quantity : 0, price: 40 },
  { id: 3, name: "Cap", quantity: 0, price: 10 }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

//for button to increase quantity in product page
function increaseQuantity(button) {
   const divContainer = button.parentElement;
   const quantitySpan = divContainer.querySelector('.quantity');
   let quantity = parseInt(quantitySpan.innerText);
   quantitySpan.innerText = quantity + 1;
}

//for button to decrease quantity in product page
//it won't decrease quantity of the item if the item is already added to cart
function decreaseQuantity(button) {
   const divContainer = button.parentElement;
   const quautitySpan = divContainer.querySelector('.quantity');
   const quantity = parseInt(quautitySpan.innerText);
   if (quantity > 0) {
      quautitySpan.innerText = quantity - 1;
   }
}

//for button to add the product in product page to cart
function addToCartFromProductPage(button) {
   const productContainer = button.closest('.container_product');

   const productId = parseInt(productContainer.querySelector('.product-id').innerText);

   const quantityDiv = productContainer.querySelector('.quantity-control');
   
   const quautitySpan = quantityDiv.querySelector('.quantity');

   const quantity = parseInt(quautitySpan.innerText);

   const product = products.find(item => item.id == productId);
   
   if (product) {
      addToCart (product, quantity);
   }

   console.log(`Added ${product.name} with quantity ${quantity} to cart.`);
}

// add item to cart array
// if item already exists, increase quantity
// if item does not exist, add new item with quantity
function addToCart(product, quantity) {
   const existingItem = cart.find(item => item.id === product.id);
   if (existingItem) {
      existingItem.quantity += quantity;
   }
   else {
      cart.push({ ...product, quantity: quantity });
   }
   // Save cart array to local storage
   localStorage.setItem('cart', JSON.stringify(cart)); 

   updateCartCount();   
}

//remove item from cart array
//if the quantity is greater than 1, decrease the quantity
//if the quantity is 1, remove the item from the cart
function removeFromCart(product, quantity) {
   const existingItem = cart.find(item => item.id === product.id);
   if (existingItem) {
      existingItem.quantity -= quantity;
      if (existingItem.quantity <= 0) {
         cart = cart.filter(item => item.id !== product.id);
      }
   }
   // Save cart array to local storage
   localStorage.setItem('cart', JSON.stringify(cart));
   updateCartCount();
}

//update cart icon with total quantity of items
function updateCartCount() {
   const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

   //default to 0 if totalQuantity is less than 0
   document.querySelector('.cart-count').innerHTML = totalQuantity > 0 ? totalQuantity : 0;
}

//
function goToCheckoutPage() {
   window.location.href = "checkout.html"
}

function clearCart() {
    // Clear the cart array
    cart = [];
    // Clear the local storage
    localStorage.clear();
    // Update the cart count to show 0
    updateCartCount();
}
