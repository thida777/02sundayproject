/* Home page: filter bar, suggestion counts, featured books, spotlight. */

document.addEventListener("DOMContentLoaded", function () {
  /* ---------- filter bar (Category / Author -> categories page) ---------- */
  const chosen = { category: "", author: "" };

  function fillMenu(menuId, labelId, key, allLabel, options) {
    const menu = document.getElementById(menuId);
    const label = document.getElementById(labelId);
    if (!menu || !label) return;

    const items = [{ value: "", text: allLabel }].concat(options);
    menu.innerHTML = items
      .map(
        (o) =>
          `<li><a class="dropdown-item" href="#" data-value="${esc(o.value)}">${esc(o.text)}</a></li>`,
      )
      .join("");

    menu.addEventListener("click", function (e) {
      const item = e.target.closest(".dropdown-item");
      if (!item) return;
      e.preventDefault();
      chosen[key] = item.dataset.value;
      label.textContent = item.dataset.value ? item.textContent : allLabel;
    });
  }

  fillMenu(
    "category-menu",
    "category-label",
    "category",
    "Category",
    Object.keys(CATEGORIES).map((k) => ({ value: k, text: CATEGORIES[k] })),
  );
  fillMenu(
    "author-menu",
    "author-label",
    "author",
    "Author",
    uniqueAuthors().map((a) => ({ value: a, text: a })),
  );

  const searchBtn = document.getElementById("home-search");
  if (searchBtn) {
    searchBtn.addEventListener("click", function () {
      const params = new URLSearchParams();
      if (chosen.category) params.set("category", chosen.category);
      if (chosen.author) params.set("author", chosen.author);
      const query = params.toString();
      window.location.href = "categories.html" + (query ? "?" + query : "");
    });
  }

  /* ---------- suggestion cards: real book counts ---------- */
  document.querySelectorAll("[data-count]").forEach(function (el) {
    el.textContent = countLabel(booksIn(el.dataset.count).length);
  });

  /* ---------- featured books ---------- */
  const featured = document.getElementById("featured-books");
  if (featured) {
    featured.innerHTML = BOOKS.filter((b) => b.featured)
      .slice(0, 3)
      .map((b) => `<div class="col-md-4 col-12">${bookCardHTML(b)}</div>`)
      .join("");
  }

  /* ---------- Khmer book spotlight carousel ---------- */
  const track = document.getElementById("bkspot-track");
  if (!track) return;

  track.innerHTML = BOOKS.filter((b) => b.spotlight)
    .map(
      (b) => `
      <div class="bkspot-card">
        <a class="bkspot-cover" href="bookdetail.html?id=${b.id}">
          <img src="${imgSrc(b)}" alt="${esc(b.title)}" />
        </a>
        <div class="bkspot-content">
          <h2>${esc(b.title)}</h2>
          <p>${esc(b.description)}</p>
          <a class="bkspot-cta" href="bookdetail.html?id=${b.id}">See More</a>
        </div>
      </div>`,
    )
    .join("");

  const cards = Array.from(track.children);
  if (cards.length < 2) return; // nothing to rotate

  const scroller = track.parentElement;
  const cardCount = cards.length;
  cards.forEach((card) => track.appendChild(card.cloneNode(true)));

  const GAP = 20;
  let index = 0;
  let timer = null;

  function step() {
    index++;
    const distance = track.children[0].offsetWidth + GAP;
    track.style.transition = "transform 0.8s ease";
    track.style.transform = `translateX(${-index * distance}px)`;

    if (index === cardCount) {
      setTimeout(() => {
        track.style.transition = "none";
        track.style.transform = "translateX(0px)";
        index = 0;
      }, 820);
    }
  }

  function start() {
    stop();
    timer = setInterval(step, 8000);
  }
  function stop() {
    clearInterval(timer);
  }

  start();
  scroller.addEventListener("mouseenter", stop);
  scroller.addEventListener("mouseleave", start);
});
