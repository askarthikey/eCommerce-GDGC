        const productContainer = document.getElementById('product-container');
        const searchBar = document.getElementById('search-bar');
        const cartCountElement = document.getElementById('cart-count');
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        let products = [];
    
        function fetchProducts() {
            fetch('https://fakestoreapi.com/products')
                .then(res => res.json())
                .then(data => {
                    products = data;
                    displayProducts(products);
                });
        }
    
        function displayProducts(products) {
            productContainer.innerHTML = '';
            products.forEach(product => {
                productContainer.innerHTML += `
                    <div class="product-card">
                        <img src="${product.image}" alt="${product.title}">
                        <h3>${product.title}</h3>
                        <p>$${product.price.toFixed(2)}</p>
                        <div class="rating">
                            ${'⭐'.repeat(Math.round(product.rating.rate))} ${product.rating.rate.toFixed(1)} / 5
                        </div>
                        <div class="rating-count">(${product.rating.count} ratings)</div> <!-- Added rating count -->
                        <button onclick="addToCart(${product.id})">Add to Cart</button>
                    </div>
                `;
            });
        }
    
        function addToCart(productId) {
            const product = cart.find(item => item.id === productId);
            if (product) {
                product.quantity++;
            } else {
                const selectedProduct = products.find(p => p.id === productId);
                cart.push({ ...selectedProduct, quantity: 1 });
            }
            updateCartCount();
            saveCart();
        }
    
        function updateCartCount() {
            const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
            cartCountElement.textContent = cartCount;
        }
    
        function saveCart() {
            localStorage.setItem('cart', JSON.stringify(cart));
        }
    
        function openCartPage() {
            saveCart();
            window.location.href = 'cart.html';
        }
    
        searchBar.addEventListener('input', function (e) {
            const query = e.target.value.toLowerCase();
            const filteredProducts = products.filter(product =>
                product.title.toLowerCase().includes(query)
            );
            displayProducts(filteredProducts);
        });
    
        fetchProducts();
        updateCartCount();