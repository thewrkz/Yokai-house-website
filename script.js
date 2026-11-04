/* Yokai House — renders content from site.config.js */
(() => {
  const S = window.SITE || {};
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => [...document.querySelectorAll(s)];
  const esc = (t = "") => String(t).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const igUrl = (h) => `https://www.instagram.com/${encodeURIComponent(h)}/`;

  const ig = igUrl(S.instagram);
  $$("[data-name]").forEach((el) => (el.textContent = S.name));
  $$("[data-tagline]").forEach((el) => (el.textContent = S.tagline));
  $$("[data-intro]").forEach((el) => (el.textContent = S.intro));
  $$("[data-hours]").forEach((el) => (el.textContent = S.hours));
  $$("[data-ig]").forEach((el) => (el.href = ig));
  $$("[data-ig-text]").forEach((el) => (el.textContent = "@" + S.instagram));
  $$("[data-ig-dm]").forEach((el) => (el.href = `https://ig.me/m/${encodeURIComponent(S.instagram)}`));

  // Address: link to maps when provided
  const addr = $("[data-address]");
  if (S.address) {
    addr.innerHTML = `<a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(S.address)}" target="_blank" rel="noopener">${esc(S.address)} ↗</a>`;
  } else {
    addr.textContent = "San Diego, CA — exact address shared on booking";
  }

  if (S.email) {
    const e = $("[data-email]");
    e.href = `mailto:${S.email}?subject=${encodeURIComponent("Tattoo request")}`;
    e.hidden = false;
  }

  // Work grid
  const grid = $("#grid");
  if (S.work && S.work.length) {
    grid.innerHTML = S.work.map((w) => `
      <figure class="tile rv">
        <img src="${esc(w.src)}" alt="${esc(w.alt)}" loading="lazy" />
        ${w.artist ? `<figcaption>${esc(w.artist)}</figcaption>` : ""}
      </figure>`).join("");
  } else {
    grid.innerHTML = Array.from({ length: 6 }, (_, i) => `
      <a class="tile empty rv" href="${ig}" target="_blank" rel="noopener">
        <span class="num">${String(i + 1).padStart(2, "0")}</span>
        <span>View on Instagram ↗</span>
      </a>`).join("");
  }

  // Artists (hidden when none); renumber sections
  if (S.artists && S.artists.length) {
    $("#artists").hidden = false;
    $("#artist-list").innerHTML = S.artists.map((a) => `
      <li class="rv"><a href="${a.handle ? igUrl(a.handle) : ig}" target="_blank" rel="noopener">
        <span class="a-name">${esc(a.name)}</span>
        <span class="a-style">${esc(a.styles || "")}</span>
        <span class="a-handle">${a.handle ? "@" + esc(a.handle) : ""} ↗</span>
      </a></li>`).join("");
  } else {
    $$("[data-artists-link]").forEach((el) => el.remove());
    $("[data-book-n]").textContent = "02";
    $("[data-info-n]").textContent = "03";
  }

  // FAQ
  $("#faq").innerHTML = (S.faq || []).map(([q, a]) =>
    `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join("");

  $("#year").textContent = new Date().getFullYear();

  // Subtle reveal
  const items = $$(".block-head, .steps li, .facts div, .faq details, .rv");
  items.forEach((el) => el.classList.add("rv"));
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    }), { rootMargin: "0px 0px -8% 0px" });
    items.forEach((el) => io.observe(el));
  } else items.forEach((el) => el.classList.add("in"));
})();
