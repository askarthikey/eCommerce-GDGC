// Load cart from local storage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Display cart items
function displayCartItems() {
    const cartContainer = document.getElementById('cart-container');
    const totalAmountElement = document.getElementById('total-amount');
    const checkoutContainer = document.getElementById('checkout-container');
    cartContainer.innerHTML = ''; // Clear existing items

    if (cart.length === 0) {
        // Show empty cart message
        const emptyCart = document.createElement('div');
        emptyCart.className = 'empty-cart';
        emptyCart.innerHTML = `
            <img src="https://mir-s3-cdn-cf.behance.net/projects/404/95974e121862329.Y3JvcCw5MjIsNzIxLDAsMTM5.png" alt="Empty Cart">
            <h2>Your Cart is Empty</h2>
            <p>Looks like you haven't added anything to your cart yet.</p>
            <button onclick="goBack()">Continue Shopping</button>
        `;
        cartContainer.appendChild(emptyCart);
    } else {
        // Calculate total amount and display items
        let totalAmount = 0;
        let discountAmount = 0;

        cart.forEach(item => {
            const cartCard = document.createElement('div');
            cartCard.className = 'cart-card';
            cartCard.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <h3>${item.title}</h3>
                <p>$${item.price.toFixed(2)}</p>
                <div class="cart-quantity">
                    <button onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
                <button class="remove-button" onclick="removeFromCart(${item.id})">Remove</button>
            `;
            cartContainer.appendChild(cartCard);

            totalAmount += item.price * item.quantity;
            discountAmount += (item.price * 0.05) * item.quantity; // 5% discount on each item
        });

        // Calculate platform fee (1% of total)
        const platformFee = totalAmount * 0.01; // 1% of total
        const finalTotal = totalAmount - discountAmount + platformFee; // Final total calculation

        // Display totals
        totalAmountElement.innerHTML = `
            <strong>Total Amount: $${totalAmount.toFixed(2)}</strong><br>
            <strong>Discount ( 5% ): -$${discountAmount.toFixed(2)}</strong><br>
            <strong>Platform Fee ( 1%): +$${platformFee.toFixed(2)}</strong><br>
            <strong>Final Total: $${finalTotal.toFixed(2)}</strong>
        `;

        checkoutContainer.style.display = 'block'; // Show checkout section
    }
}

// Update quantity
function updateQuantity(id, change) {
    const item = cart.find(item => item.id === id);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(id); // Remove if quantity is zero
        } else {
            localStorage.setItem('cart', JSON.stringify(cart)); // Update local storage
            displayCartItems(); // Refresh cart display
        }
    }
    location.reload(); // Reload the page after cart update
}

// Remove item from cart
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(cart)); // Update local storage
    displayCartItems(); // Refresh cart display
    location.reload(); // Reload the page after cart update
}

// Place order function (for demo purposes)
function placeOrder() {
    alert('Order placed successfully!');
    cart = []; // Clear the cart
    localStorage.setItem('cart', JSON.stringify(cart)); // Update local storage
    displayCartItems(); // Refresh cart display
    location.reload(); // Reload the page after cart update
}

// Go back to shopping
function goBack() {
    window.location.href = 'index.html'; // Redirects to the index page
}

// Initial display
displayCartItems();