//persist cart items in local storage when users refresh the page
//initialize cart from local storage or set to empty array if not found
//define shopping array to hold cart items

//show cart items in every product page
document.addEventListener('DOMContentLoaded', function() {
   updateCartCount();
});

const products = [
  { id: EFP0006, name: "Champagne Roses", quantity : 0, price: 1280 },
  { id: EFP0011, name: "Devotion", quantity : 0, price: 1100 },
  { id: EFP0008, name: "Elegant Twist", quantity: 0, price: 700 },
  { id: EFP0002, name: "Fairytale Forever", quantity: 0, price: 600 },
  { id: EFP0012, name: "Fruitful", quantity: 0, price: 700 },
  { id: EFP0009, name: "I'm with you", quantity: 0, price: 1000 },
  { id: EFP0001, name: "Jade", quantity: 0, price: 800 },
  { id: EFP0007, name: "Luna", quantity: 0, price: 1300 },
  { id: EFP0003, name: "Overload - 18 Roses", quantity: 0, price: 1200 },
  { id: EFP0004, name: "Pink Moment", quantity: 0, price: 1000 },
  { id: EFP0010, name: "Warm Respect", quantity: 0, price: 1000 },
  { id: EFP0005, name: "Summer Happiness", quantity: 0, price: 1200 }
];

// Use a function to get cart to avoid global variable conflicts
function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

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
   console.log('Adding product to cart');
   
   const productContainer = button.closest('.container_product');
   if (!productContainer) {
      console.error('Product container not found!');
      return;
   }

   const productId = parseInt(productContainer.querySelector('.product-id').innerText);

   const quantityDiv = productContainer.querySelector('.quantity-control');
   if (!quantityDiv) {
      console.error('Quantity control not found!');
      return;
   }
   
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

   console.log(`Cart updated: ${JSON.stringify(cart)}`); 
}

//remove item from cart array
//if the quantity is greater than 1, decrease the quantity
//if the quantity is 1, remove the item from the cart
function removeFromCart(product, quantity) {
   let cart = getCart();
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
   let cart = getCart();
   const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

   //default to 0 if totalQuantity is less than 0
   document.querySelector('.cart-count').innerHTML = totalQuantity > 0 ? totalQuantity : 0;

   console.log(`Cart count updated: ${totalQuantity}`);
}

//
function goToCheckoutPage() {
   window.location.href = "shoppingcart.html"
}

function clearCart() {
    // Clear the cart array
    cart = [];
    // Clear the local storage
    localStorage.clear();
    // Update the cart count to show 0
    updateCartCount();
}
