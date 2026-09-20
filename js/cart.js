/* ==========================================================
   SHOPPING CART
   ----------------------------------------------------------
   The cart only stores { id, quantity } in localStorage.
   Titles, prices and covers always come from js/books.js,
   so a price change in the catalog is reflected instantly.
   ========================================================== */

const CART_KEY = "bookCart";
const MAX_QTY = 99;

// Shipping rules (edit these two lines to change them everywhere)
const SHIPPING_FLAT = 2.5; // USD
const FREE_SHIPPING_OVER = 40; // USD

function loadCart() {
  try {
    const raw = JSON.parse(localStorage.getItem(CART_KEY)) || [];
    return raw
      .filter((item) => getBook(item.id))
      .map((item) => ({
        id: Number(item.id),
        quantity: Math.min(MAX_QTY, Math.max(1, parseInt(item.quantity, 10) || 1)),
      }));
  } catch (err) {
    return [];
  }
}

let cart = loadCart();

function saveCart() {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  } catch (err) {
    /* storage unavailable (private mode) — cart lasts for this page only */
  }
  updateCartCount();
}

function cartSummary() {
  const count = cart.reduce((n, item) => n + item.quantity, 0);
  const subtotal = cart.reduce(
    (sum, item) => sum + getBook(item.id).price * item.quantity,
    0,
  );
  const shipping = count === 0 || subtotal >= FREE_SHIPPING_OVER ? 0 : SHIPPING_FLAT;
  return { count, subtotal, shipping, total: subtotal + shipping };
}

function updateCartCount() {
  const { count } = cartSummary();
  document.querySelectorAll("#cart-count").forEach((el) => {
    el.textContent = count;
  });
}

/* ---------- cart actions ---------- */

function addToCart(id, quantity) {
  const book = getBook(id);
  if (!book) return;

  const qty = Math.max(1, parseInt(quantity, 10) || 1);
  const line = cart.find((item) => item.id === book.id);

  if (line) {
    line.quantity = Math.min(MAX_QTY, line.quantity + qty);
  } else {
    cart.push({ id: book.id, quantity: Math.min(MAX_QTY, qty) });
  }

  saveCart();
  showToast('"' + book.title + '" was added to your cart.');
}

function changeQuantity(id, delta) {
  const line = cart.find((item) => item.id === Number(id));
  if (!line) return;

  line.quantity += delta;
  if (line.quantity < 1) {
    removeFromCart(id);
    return;
  }
  line.quantity = Math.min(MAX_QTY, line.quantity);
  saveCart();
  displayCart();
}

function increaseQuantity(id) {
  changeQuantity(id, 1);
}

function decreaseQuantity(id) {
  changeQuantity(id, -1);
}

function removeFromCart(id) {
  cart = cart.filter((item) => item.id !== Number(id));
  saveCart();
  displayCart();
}

function clearCart() {
  if (cart.length === 0) return;
  if (confirm("Are you sure you want to clear your cart?")) {
    cart = [];
    saveCart();
    displayCart();
  }
}

/* ---------- cart page rendering ---------- */

function displayCart() {
  const container = document.getElementById("cart-container");
  if (!container) return; // not on the cart page

  const emptyCart = document.getElementById("empty-cart");
  const summaryBox = document.getElementById("cart-summary");
  const { count, subtotal, shipping, total } = cartSummary();

  if (cart.length === 0) {
    container.innerHTML = "";
    if (emptyCart) emptyCart.hidden = false;
    if (summaryBox) summaryBox.hidden = true;
    return;
  }

  if (emptyCart) emptyCart.hidden = true;
  if (summaryBox) summaryBox.hidden = false;

  container.innerHTML = cart
    .map((item) => {
      const book = getBook(item.id);
      const km = book.lang === "km" ? " khmer" : "";
      return `
      <div class="cart-item">
        <a href="bookdetail.html?id=${book.id}">
          <img src="${imgSrc(book)}" alt="Cover of ${esc(book.title)}" class="cart-book-image" />
        </a>

        <div class="cart-book-info">
          <a class="cart-book-title${km}" href="bookdetail.html?id=${book.id}">${esc(book.title)}</a>
          <p class="${km}">${esc(book.author)}</p>
          <strong>${money(book.price)}</strong>
        </div>

        <div class="quantity-control" role="group" aria-label="Quantity for ${esc(book.title)}">
          <button type="button" data-cart="dec" data-id="${book.id}" aria-label="Decrease quantity">−</button>
          <span>${item.quantity}</span>
          <button type="button" data-cart="inc" data-id="${book.id}" aria-label="Increase quantity">+</button>
        </div>

        <div class="cart-subtotal">${money(book.price * item.quantity)}</div>

        <button type="button" class="remove-btn" data-cart="remove" data-id="${book.id}" aria-label="Remove ${esc(book.title)} from cart">
          <i class="bi bi-trash"></i>
        </button>
      </div>`;
    })
    .join("");

  setText("summary-count", count + (count === 1 ? " item" : " items"));
  setText("cart-subtotal", money(subtotal));
  setText("cart-shipping", shipping === 0 ? "Free" : money(shipping));
  setText("cart-total", money(total));

  const hint = document.getElementById("shipping-hint");
  if (hint) {
    hint.textContent =
      shipping === 0
        ? "You've unlocked free shipping!"
        : "Add " + money(FREE_SHIPPING_OVER - subtotal) + " more for free shipping.";
  }
}

function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

/* ---------- events ---------- */

document.addEventListener("click", function (e) {
  // "Add to cart" buttons anywhere on the site
  const addBtn = e.target.closest("[data-add]");
  if (addBtn) {
    addToCart(addBtn.dataset.add, addBtn.dataset.qty || 1);
    return;
  }

  // + / − / remove buttons on the cart page
  const cartBtn = e.target.closest("[data-cart]");
  if (cartBtn) {
    const id = cartBtn.dataset.id;
    if (cartBtn.dataset.cart === "inc") increaseQuantity(id);
    if (cartBtn.dataset.cart === "dec") decreaseQuantity(id);
    if (cartBtn.dataset.cart === "remove") removeFromCart(id);
  }
});

// Keep the badge correct if the cart changes in another tab.
window.addEventListener("storage", function (e) {
  if (e.key === CART_KEY) {
    cart = loadCart();
    updateCartCount();
    displayCart();
  }
});

document.addEventListener("DOMContentLoaded", function () {
  updateCartCount();
  displayCart();
});
