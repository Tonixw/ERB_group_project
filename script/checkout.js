window.onload = function () {
   const cartChectout = JSON.parse(localStorage.getItem('cart')) || [];
   displayCartForCheckout(cartChectout);
}

//display all cart items in the cart display area before payment
function displayCartForCheckout(cartChectout) {
   const cartDisplay = document.querySelector('.cart-display');

   // Clear previous display
   cartDisplay.innerHTML = '';

   if (cartChectout.length === 0) {
      cartDisplay.textContent = 'Your cart is empty.';
      return;
   }

   let subtotalPrice = 0;
   let totalPrice = 0;

   cartChectout.forEach(item => {
      subtotalPrice = item.price * item.quantity;
      //change according to checkout layout
      const row = document.createElement('div');
      row.classList.add('cart-row');

      // Title
      const title = document.createElement('span');
      title.textContent = item.title;
      title.classList.add('item-title');

      // Quantity controls
      const quantityContainer = document.createElement('div');
      quantityContainer.classList.add('quantity-control');


      const minusBtn = document.createElement('button');
      minusBtn.textContent = '-';
      minusBtn.onclick = function () {
         decreaseQuantity(this);
         updateSubtotalAndTotal(this);
      };

      const quantity = document.createElement('span');
      quantity.textContent = item.quantity;
      quantity.classList.add('quantity');

      const plusBtn = document.createElement('button');
      plusBtn.textContent = '+';
      plusBtn.onclick = function () {
         increaseQuantity(this);
         updateSubtotalAndTotal(this);
      };

      quantityContainer.appendChild(minusBtn);
      quantityContainer.appendChild(quantity);
      quantityContainer.appendChild(plusBtn);

      // Price
      const price = document.createElement('span');
      price.textContent = `$${item.price.toFixed(2)}`;
      price.classList.add('item-price');

      // Subtotal
      const subtotal = document.createElement('span');
      subtotal.textContent = `$${(item.price * (parseInt(quantity.innerText))).toFixed(2)}`;
      subtotal.classList.add('item-subtotal');

      totalPrice += subtotalPrice;

      // Add everything to the row
      row.appendChild(title);
      row.appendChild(quantityContainer);
      row.appendChild(price);
      row.appendChild(subtotal);

      cartDisplay.appendChild(row);


   });

   document.querySelector(".checkout-total").innerText = `$${totalPrice.toFixed(2)}`;
}

function updateSubtotalAndTotal(button) {

   //find the updated quantity
   const quantitySpan = button.parentElement.querySelector('.quantity');
   const quantity = parseInt(quantitySpan.innerText);

   const productRow = button.closest('.cart-row');

   //find the item price
   const itemSpan = productRow.querySelector('.item-price');
   const itemPrice = parseFloat(itemSpan.innerText.replace('$', ''));

   // Update subtotal
   const subtotalSpan = productRow.querySelector('.item-subtotal');
   subtotalSpan.innerText = `$${(itemPrice * quantity).toFixed(2)}`;

   // Update total
   updateTotalPrice();
}

function updateTotalPrice() {
   let totalPrice = 0;
   const allSubtotals = document.querySelectorAll('.item-subtotal');

   allSubtotals.forEach(span => {
      const value = parseFloat(span.innerText.replace('$', ''));
      totalPrice += value;
   });

   console.log(totalPrice);

   const totalDisplay = document.querySelector('.checkout-total');

   totalDisplay.innerText = `$${totalPrice.toFixed(2)}`;

}

function goToPaymentPage() {
   window.location.href = "payment.html"
}