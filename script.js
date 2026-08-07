/* ═══════════════════════════════════════════════════
   Interazioni del sito — vanilla JS, nessuna dipendenza
   ═══════════════════════════════════════════════════ */
(function () {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Anno corrente nel footer ---------- */
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- Header: sfondo allo scroll + barra di avanzamento ---------- */
  const header = document.getElementById("site-header");
  const progress = document.getElementById("scroll-progress");
  const toTop = document.getElementById("to-top");

  function onScroll() {
    const y = window.scrollY;

    if (header) header.classList.toggle("is-stuck", y > 24);
    if (toTop) toTop.classList.toggle("is-visible", y > 600);

    if (progress) {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = (max > 0 ? (y / max) * 100 : 0) + "%";
    }
  }

  let ticking = false;
  window.addEventListener(
    "scroll",
    function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        onScroll();
        ticking = false;
      });
    },
    { passive: true }
  );
  onScroll();

  /* ---------- Menu mobile ---------- */
  const toggle = document.getElementById("nav-toggle");
  const nav = document.getElementById("nav");

  function closeNav() {
    if (!nav || !toggle) return;
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Apri il menu");
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      const open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Chiudi il menu" : "Apri il menu");
    });

    // chiude il menu dopo aver scelto una voce
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) closeNav();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeNav();
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 960) closeNav();
    });
  }

  /* ---------- Comparsa progressiva degli elementi ---------- */
  const revealables = document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window) || reduceMotion) {
    revealables.forEach(function (el) {
      el.classList.add("is-in");
    });
  } else {
    const revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in");
          revealObserver.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );
    revealables.forEach(function (el) {
      revealObserver.observe(el);
    });
  }

  /* ---------- Voce di menu attiva in base alla sezione ---------- */
  const navLinks = Array.prototype.slice.call(
    document.querySelectorAll('.nav a[href^="#"]')
  );
  const sections = navLinks
    .map(function (link) {
      return document.querySelector(link.getAttribute("href"));
    })
    .filter(Boolean);

  if (sections.length && "IntersectionObserver" in window) {
    const visible = new Set();

    function highlight() {
      let current = null;
      sections.forEach(function (section) {
        if (visible.has(section)) current = current || section;
      });
      navLinks.forEach(function (link) {
        const match = current && link.getAttribute("href") === "#" + current.id;
        if (match) link.setAttribute("aria-current", "true");
        else link.removeAttribute("aria-current");
      });
    }

    const spy = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) visible.add(entry.target);
          else visible.delete(entry.target);
        });
        highlight();
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach(function (s) {
      spy.observe(s);
    });
  }

  /* ---------- Conteggio animato dei numeri ---------- */
  const counters = document.querySelectorAll("[data-count]");
  if (counters.length && "IntersectionObserver" in window && !reduceMotion) {
    const countObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          countObserver.unobserve(el);

          const target = parseInt(el.dataset.count, 10);
          if (isNaN(target)) return;

          const duration = 1100;
          const start = performance.now();

          (function step(now) {
            const t = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - t, 3);
            el.textContent = String(Math.round(target * eased));
            if (t < 1) requestAnimationFrame(step);
          })(start);
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach(function (el) {
      countObserver.observe(el);
    });
  }

  /* ---------- Dimostrazione della stimolazione bilaterale (EMDR) ---------- */
  const stage = document.getElementById("demo-stage");
  const demoBtn = document.getElementById("demo-toggle");

  if (stage && demoBtn) {
    const label = demoBtn.querySelector(".demo-label");

    /* --- scelta del tipo di stimolazione bilaterale --- */
    const caption = document.getElementById("demo-caption");
    const modeBtns = document.querySelectorAll(".demo-tabs [data-mode]");

    const CAPTIONS = {
      occhi:
        "Lo sguardo segue le dita del terapeuta da un lato all'altro, per poche decine di " +
        "secondi per volta. Poi ci si ferma e si racconta cosa è arrivato in mente.",
      tocchi:
        "Quando i movimenti oculari sono faticosi o poco praticabili, si usano piccoli tocchi " +
        "alternati sulle mani, sulle ginocchia o sulle spalle. Con i bambini è spesso la via " +
        "più naturale: il cosiddetto “abbraccio della farfalla” si può fare anche da soli.",
      suoni:
        "In alternativa si usano suoni brevi che arrivano prima a un orecchio e poi all'altro, " +
        "di solito in cuffia. La logica resta la stessa: un'attivazione che passa con ritmo " +
        "regolare da un lato all'altro."
    };

    modeBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        const mode = btn.dataset.mode;
        stage.dataset.mode = mode;
        modeBtns.forEach(function (b) {
          b.setAttribute("aria-pressed", String(b === btn));
        });
        if (caption && CAPTIONS[mode]) caption.textContent = CAPTIONS[mode];
      });
    });

    function setDemo(running) {
      stage.classList.toggle("is-running", running);
      demoBtn.setAttribute("aria-pressed", String(running));
      if (label) label.textContent = running ? "Ferma la dimostrazione" : "Avvia la dimostrazione";
    }

    demoBtn.addEventListener("click", function () {
      setDemo(!stage.classList.contains("is-running"));
    });

    // si ferma quando la sezione esce dallo schermo, per non distrarre
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting && stage.classList.contains("is-running")) setDemo(false);
          });
        },
        { threshold: 0.2 }
      ).observe(stage);
    }

    if (reduceMotion) {
      demoBtn.disabled = true;
      if (label) label.textContent = "Animazione disattivata dalle tue preferenze di sistema";
    }
  }
})();
