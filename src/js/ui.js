import { $, $$, prefersReducedMotion } from "./utils.js";

/* ---------- Motyw jasny / ciemny ---------- */

export function initTheme() {
  const root = document.documentElement;
  const button = $("[data-theme-toggle]");
  const media = window.matchMedia("(prefers-color-scheme: dark)");

  const apply = (theme) => {
    root.setAttribute("data-theme", theme);
    button.setAttribute("aria-label", theme === "dark" ? "Włącz jasny motyw" : "Włącz ciemny motyw");
  };

  apply(root.getAttribute("data-theme") ?? "light");

  button.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    apply(next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* tryb prywatny — preferencja nie zostanie zapamiętana */
    }
  });

  media.addEventListener("change", (event) => {
    let stored = null;
    try {
      stored = localStorage.getItem("theme");
    } catch {
      /* ignoruj */
    }
    if (!stored) apply(event.matches ? "dark" : "light");
  });
}

/* ---------- Nagłówek, menu mobilne, scrollspy, pasek postępu ---------- */

export function initHeader() {
  const header = $("[data-header]");
  const nav = $("[data-nav]");
  const toggle = $("[data-menu-toggle]");
  const progress = $("[data-progress]");
  const links = $$("[data-nav-link]");

  const setMenu = (open) => {
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Zamknij menu" : "Otwórz menu");
    document.documentElement.classList.toggle("menu-open", open);
  };

  toggle.addEventListener("click", () => setMenu(toggle.getAttribute("aria-expanded") !== "true"));
  nav.addEventListener("click", (event) => {
    if (event.target.closest("a")) setMenu(false);
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
      setMenu(false);
      toggle.focus();
    }
  });
  window.matchMedia("(min-width: 861px)").addEventListener("change", (event) => {
    if (event.matches) setMenu(false);
  });

  let ticking = false;
  const update = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
    progress.style.transform = `scaleX(${ratio})`;
    header.classList.toggle("is-scrolled", window.scrollY > 8);
    ticking = false;
  };
  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    },
    { passive: true },
  );
  update();

  const sections = links.map((link) => $(`#${link.dataset.navLink}`)).filter(Boolean);
  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((link) => {
          const active = link.dataset.navLink === entry.target.id;
          if (active) link.setAttribute("aria-current", "true");
          else link.removeAttribute("aria-current");
        });
      });
    },
    { rootMargin: "-45% 0px -50% 0px" },
  );
  sections.forEach((section) => spy.observe(section));

  const top = $("#top");
  new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) links.forEach((link) => link.removeAttribute("aria-current"));
    },
    { rootMargin: "-45% 0px -50% 0px" },
  ).observe(top);
}

/* ---------- Animowane pojawianie się elementów ---------- */

export function initReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
  );

  const scan = () => {
    $$("[data-reveal]:not(.is-visible):not([data-observed])").forEach((element) => {
      if (prefersReducedMotion()) {
        element.classList.add("is-visible");
        return;
      }
      element.setAttribute("data-observed", "");
      observer.observe(element);
    });
  };

  document.documentElement.classList.add("js");
  document.addEventListener("reveal:refresh", scan);
  scan();
}
