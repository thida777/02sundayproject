/* ==========================================================
   CHECKOUT
   No payment is taken and nothing is sent to a server: the
   order is saved in this browser (localStorage "bookOrders")
   so the confirmation page can show it.
   ========================================================== */

const ORDERS_KEY = "bookOrders";

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

document.addEventListener("DOMContentLoaded", function () {
  const formView = document.getElementById("checkout-view");
  const doneView = document.getElementById("confirmation-view");
  const emptyView = document.getElementById("checkout-empty");
  const form = document.getElementById("checkout-form");

  const orderId = new URLSearchParams(window.location.search).get("order");

  /* ---------- confirmation page (?order=BK-XXXX) ---------- */
  if (orderId) {
    const order = loadOrders().find((o) => o.id === orderId);
    if (order) {
      showConfirmation(order);
      return;
    }
  }

  /* ---------- nothing to check out ---------- */
  if (cart.length === 0) {
    emptyView.hidden = false;
    return;
  }

  formView.hidden = false;
  renderSummary();

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
    const { subtotal, shipping, total } = cartSummary();

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
      items: cart.map((item) => {
        const book = getBook(item.id);
        return { id: book.id, title: book.title, price: book.price, quantity: item.quantity };
      }),
      subtotal,
      shipping,
      total,
    };

    saveOrder(order);
    cart = [];
    saveCart();
    window.location.href = "checkout.html?order=" + encodeURIComponent(order.id);
  });

  /* ---------- helpers ---------- */
  function renderSummary() {
    const { subtotal, shipping, total } = cartSummary();

    document.getElementById("checkout-items").innerHTML = cart
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
      order.payment === "cod" ? "Cash on delivery" : "Bank transfer / KHQR",
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
