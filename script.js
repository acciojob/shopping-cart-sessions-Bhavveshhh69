const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearBtn = document.getElementById("clear-cart-btn");

// -------------------------
// Load cart from sessionStorage
// -------------------------
function getCart() {
  const data = sessionStorage.getItem("cart");
  return data ? JSON.parse(data) : [];
}

function saveCart(cart) {
  sessionStorage.setItem("cart", JSON.stringify(cart));
}

// -------------------------
// Render Product List
// -------------------------
function renderProducts() {
  products.forEach(product => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${product.name} - $${product.price}
      <button data-id="${product.id}">Add to Cart</button>
    `;
    productList.appendChild(li);
  });
}

// -------------------------
// Render Cart List
// -------------------------
function renderCart() {
  const cart = getCart();
  cartList.innerHTML = "";

  cart.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price}`;
    cartList.appendChild(li);
  });
}

// -------------------------
// Add to Cart Handler
// -------------------------
productList.addEventListener("click", (event) => {
  if (event.target.tagName === "BUTTON") {
    const id = Number(event.target.getAttribute("data-id"));
    const product = products.find(p => p.id === id);

    let cart = getCart();
    cart.push(product);  // VERY IMPORTANT: append without clearing

    saveCart(cart);
    renderCart();
  }
});

// -------------------------
// Clear Cart
// -------------------------
clearBtn.addEventListener("click", () => {
  sessionStorage.removeItem("cart");
  renderCart();
});

// -------------------------
// Initial Render
// -------------------------
renderProducts();
renderCart();
