/* ==========================================================
   SITE-WIDE HELPERS  —  toast messages, active nav link,
   newsletter form. Loaded on every page.
   ========================================================== */

function showToast(message, type) {
  let wrap = document.getElementById("toast-wrap");
  if (!wrap) {
    wrap = document.createElement("div");
    wrap.id = "toast-wrap";
    wrap.className = "toast-wrap";
    wrap.setAttribute("aria-live", "polite");
    document.body.appendChild(wrap);
  }

  const toast = document.createElement("div");
  toast.className = "site-toast" + (type === "error" ? " is-error" : "");
  toast.innerHTML =
    '<i class="bi ' +
    (type === "error" ? "bi-exclamation-circle" : "bi-check-circle") +
    '"></i><span></span>';
  toast.querySelector("span").textContent = message;
  wrap.appendChild(toast);

  requestAnimationFrame(() => toast.classList.add("show"));
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }, 2600);
}

document.addEventListener("DOMContentLoaded", function () {
  // Highlight the current page in the navbar.
  let page = window.location.pathname.split("/").pop() || "home.html";
  if (page === "index.html") page = "home.html";
  const parent = { "bookdetail.html": "categories.html", "checkout.html": "shopping_cart.html" };
  page = parent[page] || page;

  document.querySelectorAll(".custom-navbar .nav-link").forEach(function (link) {
    if (link.getAttribute("href") === page) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }
  });

  // Newsletter form in the footer.
  document.querySelectorAll(".sf-newsletter-form").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      showToast("Thanks for subscribing! Check your inbox soon.");
      form.reset();
    });
  });
});
