// Mobile menu toggle
const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

if (bar) {
    bar.addEventListener('click', () => nav.classList.add('active'));
}
if (close) {
    close.addEventListener('click', () => nav.classList.remove('active'));
}

// Initialize cart from localStorage or empty array
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCartItems();
}

// Add item to cart
function addItemToCart(name, price, image) {
    let quantity = 1;
    const qtyInput = document.getElementById("product-qty");
    if (qtyInput) {
        const parsedQty = parseInt(qtyInput.value);
        if (!isNaN(parsedQty) && parsedQty > 0) {
            quantity = parsedQty;
        }
    }

    const existing = cart.find(item => item.name === name);
    if (existing) {
        existing.quantity += quantity;
    } else {
        cart.push({ name, price, image, quantity });
    }
    saveCart();
    alert(`${quantity} x ${name} added to cart`);
}

// Render cart items
function renderCartItems() {
    const container = document.getElementById("cart-items");
    if (!container) return;

    container.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        const subtotal = item.price * item.quantity;
        total += subtotal;

        const row = document.createElement("tr");
        row.innerHTML = `
            <td><a href="#" onclick="removeItem(${index})"><i class="far fa-times-circle"></i></a></td>
            <td><img src="${item.image}" width="50"></td>
            <td>${item.name}</td>
            <td>$${item.price.toFixed(2)}</td>
            <td><input type="number" min="1" value="${item.quantity}" onchange="updateQuantity(${index}, this.value)"></td>
            <td>$${subtotal.toFixed(2)}</td>
        `;
        container.appendChild(row);
    });

    const subtotalElement = document.getElementById("cart-subtotal");
    const totalElement = document.getElementById("cart-total");
    if (subtotalElement) subtotalElement.innerText = `$${total.toFixed(2)}`;
    if (totalElement) totalElement.innerText = `$${total.toFixed(2)}`;
}

// Remove item from cart
function removeItem(index) {
    cart.splice(index, 1);
    saveCart();
}

// Update item quantity
function updateQuantity(index, qty) {
    const quantity = parseInt(qty);
    if (quantity > 0) {
        cart[index].quantity = quantity;
        saveCart();
    }
}

// Buy Now - support multiple items
function buyNow(name, price, image) {
    const qtyInput = document.getElementById('product-qty');
    const quantity = qtyInput ? parseInt(qtyInput.value) || 1 : 1;

    const selectedProducts = JSON.parse(localStorage.getItem('selectedProducts')) || [];

    // Check if product already exists
    const existing = selectedProducts.find(p => p.name === name);
    if (existing) {
        existing.quantity += quantity;
    } else {
        selectedProducts.push({ name, price, image, quantity });
    }

    localStorage.setItem('selectedProducts', JSON.stringify(selectedProducts));
    window.location.href = 'order.html';
}

// Load cart items on cart.html or checkout.html
window.addEventListener("DOMContentLoaded", () => {
    renderCartItems();

    // Handle checkout form
    const checkoutForm = document.getElementById("checkout-form");
    if (checkoutForm) {
        checkoutForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const nameInput = document.getElementById("name");
            const name = nameInput ? nameInput.value : "Customer";
            alert("Thank you for your order, " + name + "!");
            localStorage.removeItem("cart");
            window.location.href = "index.html";
        });
    }
});

// Login functionality
function login() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const storedEmail = localStorage.getItem("userEmail");
    const storedPassword = localStorage.getItem("userPassword");

    if (email === storedEmail && password === storedPassword) {
        alert("Login successful!");
        window.location.href = "index.html";
    } else {
        alert("Invalid email or password.");
    }
}

// Dropdown toggle for mobile
document.addEventListener("DOMContentLoaded", function () {
    const toggle = document.querySelector(".menu-toggle");
    const dropdown = document.querySelector(".dropdown");

    if (toggle && dropdown) {
        toggle.addEventListener("click", function (e) {
            e.stopPropagation();
            dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
        });

        document.addEventListener("click", function () {
            dropdown.style.display = "none";
        });
    }
});
