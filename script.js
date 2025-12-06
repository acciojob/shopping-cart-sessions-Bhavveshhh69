const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// -------------------------
//  RENDER PRODUCTS
// -------------------------
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearBtn = document.getElementById("clear-cart-btn");

function renderProducts() {
  products.forEach((product) => {
    const li = document.createElement("li");

    li.innerHTML = `
      ${product.name} - $${product.price}
      <button data-id="${product.id}">Add to Cart</button>
    `;

    productList.appendChild(li);
  });
}

// -------------------------
//  SESSION STORAGE HELPERS
// -------------------------
function getCart() {
  const stored = sessionStorage.getItem("cart");
  return stored ? JSON.parse(stored) : [];
}

function saveCart(cart) {
  sessionStorage.setItem("cart", JSON.stringify(cart));
}

// -------------------------
//  RENDER CART
// -------------------------
function renderCart() {
  const cart = getCart();

  cartList.innerHTML = ""; // Clear existing list

  cart.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price}`;
    cartList.appendChild(li);
  });
}

// -------------------------
//  ADD TO CART FUNCTIONALITY
// -------------------------
productList.addEventListener("click", (event) => {
  if (event.target.tagName === "BUTTON") {
    const id = Number(event.target.getAttribute("data-id"));
    const product = products.find((p) => p.id === id);

    const cart = getCart();
    cart.push(product);
    saveCart(cart);
    renderCart();
  }
});

// -------------------------
//  CLEAR CART
// -------------------------
clearBtn.addEventListener("click", () => {
  sessionStorage.removeItem("cart");
  renderCart();
});

// -------------------------
//  INITIALIZE PAGE
// -------------------------
renderProducts();
renderCart();
