/* Categories page: category pills, author filter, search, sort. */

document.addEventListener("DOMContentLoaded", function () {
  const list = document.getElementById("book-list");
  const pills = document.getElementById("category-pills");
  const searchInput = document.getElementById("search-input");
  const authorSelect = document.getElementById("author-select");
  const sortSelect = document.getElementById("sort-select");
  const resultCount = document.getElementById("result-count");
  const emptyState = document.getElementById("no-results");

  const params = new URLSearchParams(window.location.search);
  const validCategory = (c) => c === "bestselling" || CATEGORIES[c];

  const state = {
    category: validCategory(params.get("category")) ? params.get("category") : "all",
    author: params.get("author") || "",
    q: params.get("q") || "",
    sort: params.get("sort") || "default",
  };

  /* ---------- build the controls ---------- */
  const pillItems = [["all", "All"]]
    .concat(Object.keys(CATEGORIES).map((k) => [k, CATEGORIES[k]]))
    .concat([["bestselling", "Best Selling"]]);

  pills.innerHTML = pillItems
    .map(([key, label]) => `<button type="button" class="category-btn" data-category="${key}">${label}</button>`)
    .join("");

  authorSelect.innerHTML =
    '<option value="">All authors</option>' +
    uniqueAuthors()
      .map((a) => `<option value="${esc(a)}">${esc(a)}</option>`)
      .join("");

  searchInput.value = state.q;
  authorSelect.value = state.author;
  sortSelect.value = ["default", "price-asc", "price-desc", "title"].includes(state.sort)
    ? state.sort
    : "default";
  state.sort = sortSelect.value;

  /* ---------- filtering + sorting ---------- */
  function visibleBooks() {
    const q = state.q.trim().toLowerCase();

    let result = booksIn(state.category).filter(
      (b) =>
        (!state.author || b.author === state.author) &&
        (!q || (b.title + " " + b.author).toLowerCase().includes(q)),
    );

    if (state.sort === "price-asc") result.sort((a, b) => a.price - b.price);
    if (state.sort === "price-desc") result.sort((a, b) => b.price - a.price);
    if (state.sort === "title") result.sort((a, b) => a.title.localeCompare(b.title));
    return result;
  }

  function syncUrl() {
    const next = new URLSearchParams();
    if (state.category !== "all") next.set("category", state.category);
    if (state.author) next.set("author", state.author);
    if (state.q.trim()) next.set("q", state.q.trim());
    if (state.sort !== "default") next.set("sort", state.sort);
    const query = next.toString();
    history.replaceState(null, "", window.location.pathname + (query ? "?" + query : ""));
  }

  function render() {
    const books = visibleBooks();

    list.innerHTML = books
      .map((b) => `<div class="col-6 col-md-4 col-lg-3">${bookCardHTML(b)}</div>`)
      .join("");

    pills.querySelectorAll(".category-btn").forEach((btn) => {
      const active = btn.dataset.category === state.category;
      btn.classList.toggle("active", active);
      btn.setAttribute("aria-pressed", active);
    });

    resultCount.textContent = `Showing ${books.length} of ${BOOKS.length} books`;
    emptyState.hidden = books.length !== 0;
    syncUrl();
  }

  /* ---------- events ---------- */
  pills.addEventListener("click", function (e) {
    const btn = e.target.closest(".category-btn");
    if (!btn) return;
    state.category = btn.dataset.category;
    render();
  });

  searchInput.addEventListener("input", function () {
    state.q = searchInput.value;
    render();
  });
  authorSelect.addEventListener("change", function () {
    state.author = authorSelect.value;
    render();
  });
  sortSelect.addEventListener("change", function () {
    state.sort = sortSelect.value;
    render();
  });

  document.getElementById("clear-filters").addEventListener("click", function () {
    state.category = "all";
    state.author = "";
    state.q = "";
    state.sort = "default";
    searchInput.value = "";
    authorSelect.value = "";
    sortSelect.value = "default";
    render();
  });

  render();
});
