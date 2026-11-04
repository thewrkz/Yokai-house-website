/* Yokai House — interactions */
(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];

  /* ---------- Bestiary data ---------- */
  const yokai = [
    { id: "oni", name: "Oni", jp: "鬼 · ONI", type: "protector", color: "#d83a2b", price: "from $350", symbol: "oni",
      text: "Horned ogres of mountain and underworld. Feared as punishers of the wicked, oni masks are hung over doorways to frighten away worse things.",
      meaning: "Strength, protection, turning your demons into guardians." },
    { id: "kitsune", name: "Kitsune", jp: "狐 · KITSUNE", type: "trickster", color: "#d9a441", price: "from $300", symbol: "kitsune",
      text: "Fox spirits who grow a new tail every hundred years. Messengers of Inari — clever, shape-shifting, loyal to those who earn it.",
      meaning: "Wit, intelligence, transformation, good fortune." },
    { id: "koi", name: "Koi", jp: "鯉 · KOI", type: "water", color: "#ff7a2f", price: "from $280", glyph: "鯉",
      text: "Legend says a koi that swims up the Dragon Gate waterfall becomes a dragon. Swimming upstream means struggle; downstream means it's been overcome.",
      meaning: "Perseverance, ambition, breaking through." },
    { id: "hannya", name: "Hannya", jp: "般若 · HANNYA", type: "protector", color: "#c2185b", price: "from $380", glyph: "般",
      text: "The Noh-theater mask of a woman consumed by jealousy and grief. Turn it one way she's furious; tilt it, and she's heartbroken.",
      meaning: "Duality of emotion, passion, warding off bad luck." },
    { id: "ryu", name: "Ryū", jp: "龍 · RYŪ", type: "water", color: "#2f7fd8", price: "custom", glyph: "龍",
      text: "Japanese dragons are benevolent water gods who live in seas and clouds and bring the rain. The king of Japanese tattoo subjects.",
      meaning: "Wisdom, power, generosity, mastery over the elements." },
    { id: "tengu", name: "Tengu", jp: "天狗 · TENGU", type: "trickster", color: "#e04f2f", price: "from $320", glyph: "天",
      text: "Long-nosed mountain goblins and master swordsmen who humble the arrogant — and teach the worthy. Part bird, part warrior monk.",
      meaning: "Discipline, martial skill, keeping your ego in check." },
    { id: "kappa", name: "Kappa", jp: "河童 · KAPPA", type: "water", color: "#3fae7a", price: "from $220", glyph: "河",
      text: "River imps with a water-filled dish on their heads. Bow to a kappa and it bows back — spilling its power. Loves cucumbers. Hates bad manners.",
      meaning: "Mischief, respect, a sense of humor about danger." },
    { id: "bakeneko", name: "Bakeneko", jp: "化け猫 · BAKENEKO", type: "trickster", color: "#9b6bd8", price: "from $250", glyph: "猫",
      text: "A cat that lives long enough becomes a spirit — it walks on two legs, dances with a towel on its head, and can take human form.",
      meaning: "Independence, mystery, nine lives' worth of luck." },
  ];

  const artHTML = (y) =>
    y.symbol
      ? `<svg aria-hidden="true"><use href="#${y.symbol}"/></svg>`
      : `<span class="glyph" aria-hidden="true">${y.glyph}</span>`;

  const grid = $("#flash-grid");
  grid.innerHTML = yokai.map((y) => `
    <button class="flash reveal" data-id="${y.id}" data-type="${y.type}" style="--c:${y.color}" aria-label="Read the legend of the ${y.name}">
      <span class="flash-tag">${y.type}</span>
      <span class="flash-art">${artHTML(y)}</span>
      <span class="flash-meta">
        <span><small>${y.jp}</small><h3>${y.name}</h3></span>
        <span class="price">${y.price}</span>
      </span>
    </button>`).join("");

  /* ---------- Filters ---------- */
  $$(".chip").forEach((chip) =>
    chip.addEventListener("click", () => {
      $$(".chip").forEach((c) => { c.classList.remove("is-active"); c.setAttribute("aria-selected", "false"); });
      chip.classList.add("is-active");
      chip.setAttribute("aria-selected", "true");
      const f = chip.dataset.filter;
      $$(".flash").forEach((card) => card.classList.toggle("is-hidden", f !== "all" && card.dataset.type !== f));
    })
  );

  /* ---------- Legend modal ---------- */
  const dlg = $("#legend");
  const open = (y) => {
    dlg.style.setProperty("--c", y.color);
    $("#legend-art").innerHTML = artHTML(y);
    $("#legend-jp").textContent = y.jp;
    $("#legend-title").textContent = y.name;
    $("#legend-text").textContent = y.text;
    $("#legend-meaning").textContent = y.meaning;
    $("#legend-book").dataset.yokai = y.name;
    if (typeof dlg.showModal === "function") dlg.showModal();
    else dlg.setAttribute("open", "");
  };
  const close = () => (dlg.close ? dlg.close() : dlg.removeAttribute("open"));
  grid.addEventListener("click", (e) => {
    const card = e.target.closest(".flash");
    if (card) open(yokai.find((y) => y.id === card.dataset.id));
  });
  $(".legend-close").addEventListener("click", close);
  dlg.addEventListener("click", (e) => { if (e.target === dlg) close(); });
  $("#legend-book").addEventListener("click", (e) => {
    const name = e.currentTarget.dataset.yokai;
    close();
    $("#style").value = "Flash from the Bestiary";
    const idea = $("#idea");
    if (!idea.value.includes(name)) idea.value = `I'd like the ${name} flash. ` + idea.value;
  });

  /* ---------- Nav ---------- */
  const nav = $(".nav");
  const toggle = $(".nav-toggle");
  const links = $("#nav-links");
  const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 40);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  const setMenu = (open) => {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    links.classList.toggle("open", open);
    document.body.style.overflow = open ? "hidden" : "";
  };
  toggle.addEventListener("click", () => setMenu(toggle.getAttribute("aria-expanded") !== "true"));
  $$("a", links).forEach((a) => a.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });

  /* ---------- Reveal on scroll + counters ---------- */
  const countUp = (el) => {
    const target = +el.dataset.count;
    const start = performance.now();
    const dur = 1400;
    const tick = (t) => {
      const p = Math.min((t - start) / dur, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        en.target.classList.add("in");
        $$("[data-count]", en.target).forEach(countUp);
        io.unobserve(en.target);
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
    $$(".reveal").forEach((el, i) => {
      el.style.transitionDelay = `${(i % 4) * 70}ms`;
      io.observe(el);
    });
  } else {
    $$(".reveal").forEach((el) => el.classList.add("in"));
    $$("[data-count]").forEach((el) => (el.textContent = el.dataset.count));
  }

  /* ---------- Hero parallax + cursor glow ---------- */
  const oni = $(".hero-oni");
  const sun = $(".hero-sun");
  const glow = $(".cursor-glow");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduce) {
    window.addEventListener("pointermove", (e) => {
      glow.style.left = e.clientX + "px";
      glow.style.top = e.clientY + "px";
      const x = e.clientX / innerWidth - 0.5;
      const y = e.clientY / innerHeight - 0.5;
      if (oni) oni.style.translate = `${x * -24}px calc(-58% + ${y * -18}px)`;
      if (sun) sun.style.translate = `${x * 12}px calc(-55% + ${y * 10}px)`;
    }, { passive: true });
  }

  /* ---------- Hours: highlight today ---------- */
  const today = new Date().getDay();
  const row = $(`#hours li[data-day="${today}"]`);
  if (row) row.classList.add("today");

  /* ---------- Booking form ---------- */
  const form = $("#book-form");
  const status = $(".form-status");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let ok = true;
    $$("[required]", form).forEach((el) => {
      const field = el.closest(".field");
      const valid = el.type === "checkbox" ? el.checked : el.checkValidity() && el.value.trim() !== "";
      if (field) field.classList.toggle("invalid", !valid);
      if (!valid) ok = false;
    });
    if (!ok) {
      status.className = "form-status full err";
      status.textContent = "Please fill in your name, a valid email, your idea, and confirm you're 18+.";
      return;
    }
    const d = Object.fromEntries(new FormData(form));
    const body = `Name: ${d.name}\nEmail: ${d.email}\nStyle: ${d.style}\nPlacement & size: ${d.placement || "-"}\n\n${d.idea}`;
    window.location.href = `mailto:hello@yokaihouse.com?subject=${encodeURIComponent("Tattoo inquiry — " + d.name)}&body=${encodeURIComponent(body)}`;
    status.className = "form-status full ok";
    status.textContent = "Thank you — your email app should open with your inquiry ready to send. 妖";
    form.reset();
  });

  $("#year").textContent = new Date().getFullYear();
})();
