/* ==========================================================
   CHECKOUT
   No payment is taken and nothing is sent to a server: the
   order is saved in this browser (localStorage "bookOrders")
   so the confirmation page can show it.

   Two ways to arrive here:
   - Normal checkout: from the cart page, using everything in `cart`.
   - "Buy Now": from a book card or the detail page, via
     checkout.html?buynow=1 with a single { id, quantity } saved in
     sessionStorage under "buyNowItem" (see buyNow() in js/cart.js).
     Only that one book is shown and ordered — the persistent cart
     is left untouched.
   ========================================================== */

const ORDERS_KEY = "bookOrders";
const BUY_NOW_KEY = "buyNowItem";

function loadOrders() {
  try {
    return JSON.parse(localStorage.getItem(ORDERS_KEY)) || [];
  } catch (err) {
    return [];
  }
}

function saveOrder(order) {
  try {
    const orders = loadOrders();
    orders.push(order);
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  } catch (err) {
    /* ignore — the confirmation still shows */
  }
}

function readBuyNowItem() {
  try {
    const raw = JSON.parse(sessionStorage.getItem(BUY_NOW_KEY));
    if (raw && getBook(raw.id)) {
      return {
        id: Number(raw.id),
        quantity: Math.min(MAX_QTY, Math.max(1, parseInt(raw.quantity, 10) || 1)),
      };
    }
  } catch (err) {
    /* ignore — falls back to the cart below */
  }
  return null;
}

function summarizeItems(items) {
  const count = items.reduce((n, item) => n + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + getBook(item.id).price * item.quantity, 0);
  const shipping = count === 0 || subtotal >= FREE_SHIPPING_OVER ? 0 : SHIPPING_FLAT;
  return { count, subtotal, shipping, total: subtotal + shipping };
}

document.addEventListener("DOMContentLoaded", function () {
  const formView = document.getElementById("checkout-view");
  const doneView = document.getElementById("confirmation-view");
  const emptyView = document.getElementById("checkout-empty");
  const form = document.getElementById("checkout-form");

  const params = new URLSearchParams(window.location.search);
  const orderId = params.get("order");

  /* ---------- confirmation page (?order=BK-XXXX) ---------- */
  if (orderId) {
    const order = loadOrders().find((o) => o.id === orderId);
    if (order) {
      showConfirmation(order);
      return;
    }
  }

  /* ---------- decide what we're checking out ---------- */
  let checkoutItems = cart;
  let buyNowMode = false;

  if (params.get("buynow") === "1") {
    const item = readBuyNowItem();
    if (item) {
      checkoutItems = [item];
      buyNowMode = true;
    }
  }

  /* ---------- nothing to check out ---------- */
  if (checkoutItems.length === 0) {
    emptyView.hidden = false;
    return;
  }

  formView.hidden = false;
  renderSummary();

  const editLink = document.getElementById("checkout-edit-link");
  const note = document.getElementById("buynow-note");
  if (buyNowMode) {
    note.hidden = false;
    editLink.href = "bookdetail.html?id=" + checkoutItems[0].id;
    editLink.innerHTML = '<i class="bi bi-arrow-left"></i> Back to book';
  }

  /* ---------- submit ---------- */
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    form.classList.add("was-validated");

    if (!form.checkValidity()) {
      const firstBad = form.querySelector(":invalid");
      if (firstBad) firstBad.focus();
      showToast("Please fill in the highlighted fields.", "error");
      return;
    }

    const data = new FormData(form);
    const { subtotal, shipping, total } = summarizeItems(checkoutItems);

    const order = {
      id: "BK-" + Date.now().toString(36).toUpperCase(),
      placedAt: new Date().toISOString(),
      customer: {
        name: data.get("name").trim(),
        phone: data.get("phone").trim(),
        email: (data.get("email") || "").trim(),
        address: data.get("address").trim(),
        city: data.get("city").trim(),
        note: (data.get("note") || "").trim(),
      },
      payment: data.get("payment"),
      items: checkoutItems.map((item) => {
        const book = getBook(item.id);
        return { id: book.id, title: book.title, price: book.price, quantity: item.quantity };
      }),
      subtotal,
      shipping,
      total,
    };

    saveOrder(order);

    if (buyNowMode) {
      try {
        sessionStorage.removeItem(BUY_NOW_KEY);
      } catch (err) {
        /* ignore */
      }
    } else {
      cart = [];
      saveCart();
    }

    window.location.href = "checkout.html?order=" + encodeURIComponent(order.id);
  });

  /* ---------- helpers ---------- */
  function renderSummary() {
    const { subtotal, shipping, total } = summarizeItems(checkoutItems);

    document.getElementById("checkout-items").innerHTML = checkoutItems
      .map((item) => {
        const book = getBook(item.id);
        const km = book.lang === "km" ? " khmer" : "";
        return `
        <li class="checkout-line">
          <img src="${imgSrc(book)}" alt="" />
          <div class="checkout-line-info">
            <span class="${km}">${esc(book.title)}</span>
            <small>Qty ${item.quantity} × ${money(book.price)}</small>
          </div>
          <strong>${money(book.price * item.quantity)}</strong>
        </li>`;
      })
      .join("");

    setText("co-subtotal", money(subtotal));
    setText("co-shipping", shipping === 0 ? "Free" : money(shipping));
    setText("co-total", money(total));
  }

  function showConfirmation(order) {
    formView.hidden = true;
    emptyView.hidden = true;
    doneView.hidden = false;
    document.getElementById("checkout-title").hidden = true;

    setText("done-id", order.id);
    setText("done-name", order.customer.name);
    setText(
      "done-payment",
      order.payment === "cod" ? "Cash on delivery" : "Pay with KHQR",
    );
    setText("done-address", order.customer.address + ", " + order.customer.city);
    setText("done-shipping", order.shipping === 0 ? "Free" : money(order.shipping));
    setText("done-total", money(order.total));

    document.getElementById("done-items").innerHTML = order.items
      .map(
        (i) =>
          `<li><span>${esc(i.title)} <small>× ${i.quantity}</small></span><span>${money(i.price * i.quantity)}</span></li>`,
      )
      .join("");
  }
});
