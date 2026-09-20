/* Book detail page: bookdetail.html?id=3 */

document.addEventListener("DOMContentLoaded", function () {
  const root = document.getElementById("book-detail");
  const book = getBook(new URLSearchParams(window.location.search).get("id"));

  if (!book) {
    document.title = "Book not found - Book Store";
    root.innerHTML = `
      <div class="col-12 text-center empty-state">
        <i class="bi bi-book"></i>
        <h2>Book Not Found</h2>
        <p>Sorry, this book does not exist.</p>
        <a href="categories.html" class="btn add-cart-btn">Back to Categories</a>
      </div>`;
    return;
  }

  document.title = book.title + " - Book Store";

  const km = book.lang === "km" ? " khmer" : "";

  root.innerHTML = `
    <div class="col-md-5 col-lg-4 text-center">
      <img src="${imgSrc(book)}" alt="Cover of ${esc(book.title)}" class="detail-cover" />
    </div>

    <div class="col-md-7 col-lg-8">
      <nav aria-label="breadcrumb" class="detail-crumbs">
        <a href="home.html">Home</a> <i class="bi bi-chevron-right"></i>
        <a href="categories.html?category=${book.category}">${esc(categoryLabel(book.category))}</a>
      </nav>

      <h1 class="detail-title${km}">${esc(book.title)}</h1>
      <p class="detail-author${km}">By ${esc(book.author)}</p>

      <div class="detail-tags">
        <a class="detail-tag" href="categories.html?category=${book.category}">${esc(categoryLabel(book.category))}</a>
        ${book.bestseller ? '<a class="detail-tag is-gold" href="categories.html?category=bestselling"><i class="bi bi-star-fill"></i> Best Seller</a>' : ""}
        <span class="detail-tag is-plain"><i class="bi bi-check2-circle"></i> In stock</span>
      </div>

      <div class="detail-price">
        ${money(book.price)}
        ${book.priceNote ? `<small class="khmer">${esc(book.priceNote)}</small>` : ""}
      </div>

      <p class="detail-description${km}">${esc(book.description)}</p>

      <div class="detail-actions">
        <div class="qty-stepper" role="group" aria-label="Quantity">
          <button type="button" id="qty-dec" aria-label="Decrease quantity">−</button>
          <input type="number" id="qty" value="1" min="1" max="${MAX_QTY}" aria-label="Quantity" />
          <button type="button" id="qty-inc" aria-label="Increase quantity">+</button>
        </div>

        <button type="button" class="btn add-cart-btn btn-lg" id="add-btn">
          <i class="bi bi-cart-plus"></i> Add to Cart
        </button>
        <button type="button" class="btn buy-now-btn btn-lg" id="buy-btn">Buy Now</button>
      </div>

      <a href="categories.html" class="detail-back"><i class="bi bi-arrow-left"></i> Back to Categories</a>
    </div>`;

  /* ---------- quantity + buttons ---------- */
  const qtyInput = document.getElementById("qty");
  const readQty = () =>
    Math.min(MAX_QTY, Math.max(1, parseInt(qtyInput.value, 10) || 1));

  document.getElementById("qty-dec").addEventListener("click", () => {
    qtyInput.value = Math.max(1, readQty() - 1);
  });
  document.getElementById("qty-inc").addEventListener("click", () => {
    qtyInput.value = Math.min(MAX_QTY, readQty() + 1);
  });
  qtyInput.addEventListener("change", () => {
    qtyInput.value = readQty();
  });

  document.getElementById("add-btn").addEventListener("click", () => {
    addToCart(book.id, readQty());
  });
  document.getElementById("buy-btn").addEventListener("click", () => {
    addToCart(book.id, readQty());
    window.location.href = "shopping_cart.html";
  });

  /* ---------- related books ---------- */
  const others = BOOKS.filter((b) => b.id !== book.id);
  const related = others
    .filter((b) => b.category === book.category)
    .concat(others.filter((b) => b.category !== book.category))
    .slice(0, 4);

  const relatedBox = document.getElementById("related-books");
  if (relatedBox && related.length) {
    relatedBox.innerHTML = related
      .map((b) => `<div class="col-6 col-md-4 col-lg-3">${bookCardHTML(b)}</div>`)
      .join("");
    document.getElementById("related-section").hidden = false;
  }
});
