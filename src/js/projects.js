import { projectCategories, projects as allProjects } from "../data/content.js";
import { $, $$, asset, esc, icons, prefersReducedMotion } from "./utils.js";
import { emptyFilterText } from "./sections.js";

const projects = allProjects.filter((project) => !project.hidden);
const statusLabels = { done: "Ukończony", "in-progress": "W trakcie" };
const categoryLabel = (id) => projectCategories.find((category) => category.id === id)?.label ?? id;

const initials = (title) =>
  title
    .split(/\s+/)
    .map((word) => word[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();

const state = { category: "all", tech: null };

const hasTech = (project, tech) => project.tech.some((item) => item.toLowerCase() === tech.toLowerCase());

const matches = (project) =>
  (state.category === "all" || project.categories.includes(state.category)) &&
  (!state.tech || hasTech(project, state.tech));

const fallbackCover = (project, extraClass = "") =>
  `<div class="cover-fallback ${extraClass}" aria-hidden="true"><span>${esc(project.coverLabel ?? initials(project.title))}</span><small>${esc(project.coverNote ?? project.tech.slice(0, 3).join(" · "))}</small></div>`;

function cover(project) {
  const image = project.images?.[0];
  if (image) return `<img src="${esc(asset(image.src))}" alt="" loading="lazy" decoding="async" />`;
  return fallbackCover(project);
}

const rarityBadge = (project) =>
  `<span class="rarity rarity-${esc(project.rarity ?? "common")}" title="${esc(project.flavor ?? "")}">${esc(project.rarity ?? "common")}</span>`;

function linkButtons(project, { size = "" } = {}) {
  const { repo, demo } = project.links ?? {};
  const cls = `btn btn-sm ${size}`;
  return `
    ${
      repo
        ? `<a class="${cls}" href="${esc(repo)}" target="_blank" rel="noopener noreferrer">${icons.github} Kod</a>`
        : `<span class="${cls} btn-disabled" aria-disabled="true">Repo wkrótce</span>`
    }
    ${
      demo
        ? `<a class="${cls} btn-primary" href="${esc(demo)}" target="_blank" rel="noopener noreferrer">${icons.external} Live demo</a>`
        : `<span class="${cls} btn-disabled" aria-disabled="true" title="Link do demo pojawi się po wdrożeniu projektu">Demo wkrótce</span>`
    }
  `;
}

function cardMarkup(project, index) {
  return `
    <article class="project-card frame ${project.featured ? "is-featured" : ""}" data-id="${esc(project.id)}" data-rarity="${esc(project.rarity ?? "common")}" data-reveal style="--i:${index % 2}">
      <div class="project-cover">
        ${cover(project)}
        <div class="cover-ui">
          <span class="slot-tag">Slot ${String(projects.indexOf(project) + 1).padStart(2, "0")}</span>
          ${rarityBadge(project)}
        </div>
      </div>
      <div class="project-body">
        <div class="project-meta">
          <span class="status status-${project.status}">${statusLabels[project.status] ?? ""}</span>
          <span class="project-year">${esc(project.year)}</span>
        </div>
        <h3 class="project-title">
          <button type="button" class="project-open" data-open="${esc(project.id)}" aria-haspopup="dialog">${esc(project.title)}</button>
        </h3>
        <p class="project-subtitle">${esc(project.subtitle)}</p>
        <p class="project-summary">${esc(project.summary)}</p>
        <ul class="chip-list" aria-label="Technologie">
          ${project.tech
            .slice(0, project.featured ? 6 : 5)
            .map((tech) => `<li><span class="chip">${esc(tech)}</span></li>`)
            .join("")}
          ${
            project.tech.length > (project.featured ? 6 : 5)
              ? `<li><span class="chip chip-more">+${project.tech.length - (project.featured ? 6 : 5)}</span></li>`
              : ""
          }
        </ul>
        <div class="project-footer">
          <span class="project-more" aria-hidden="true">Szczegóły ${icons.arrowRight}</span>
          <div class="project-links">${linkButtons(project)}</div>
        </div>
      </div>
    </article>
  `;
}

function renderFilters() {
  const root = $("[data-project-filters]");
  const options = [{ id: "all", label: "Wszystkie" }, ...projectCategories];
  root.innerHTML = `
    ${options
      .map(
        (option) =>
          `<button type="button" class="filter-chip" data-category="${option.id}" aria-pressed="${state.category === option.id}">${esc(option.label)}</button>`,
      )
      .join("")}
    ${
      state.tech
        ? `<button type="button" class="filter-chip filter-tech" data-clear-tech aria-label="Usuń filtr technologii ${esc(state.tech)}">Skill: ${esc(state.tech)} ${icons.close}</button>`
        : ""
    }
  `;
}

function renderGrid({ animate = true } = {}) {
  const grid = $("[data-project-grid]");
  const visible = projects.filter(matches);
  const status = $("[data-filter-status]");

  grid.innerHTML = visible.length
    ? visible.map(cardMarkup).join("")
    : `<div class="empty-state"><strong>${esc(emptyFilterText)}</strong>Brak projektów dla wybranych filtrów. <button type="button" class="link-btn" data-reset-filters>Wyczyść filtry</button></div>`;

  status.textContent = `Wyświetlono ${visible.length} z ${projects.length} projektów`;

  if (animate) {
    $$(".project-card", grid).forEach((card) => card.classList.add("is-visible", "is-entering"));
  }
  document.dispatchEvent(new CustomEvent("reveal:refresh"));
}

function refresh() {
  renderFilters();
  renderGrid();
}

export function filterByTech(tech) {
  state.tech = tech;
  state.category = "all";
  refresh();
  $("#projects").scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth" });
}

/* ---------- Modal ---------- */

let activeId = null;
let opener = null;

function galleryMarkup(project) {
  const images = project.images ?? [];
  if (!images.length) {
    return `<div class="modal-gallery">${fallbackCover(project, "modal-stage")}</div>`;
  }
  return `
    <div class="modal-gallery" data-gallery>
      <figure class="modal-stage">
        <img data-gallery-main src="${esc(asset(images[0].src))}" alt="${esc(images[0].alt)}" decoding="async" />
        <figcaption data-gallery-caption>${esc(images[0].caption ?? "")}</figcaption>
      </figure>
      ${
        images.length > 1
          ? `<div class="modal-thumbs" role="group" aria-label="Galeria zrzutów ekranu">
              ${images
                .map(
                  (image, index) => `
                    <button type="button" class="thumb" data-thumb="${index}" aria-pressed="${index === 0}" aria-label="Pokaż obraz ${index + 1} z ${images.length}">
                      <img src="${esc(asset(image.src))}" alt="" loading="lazy" decoding="async" />
                    </button>`,
                )
                .join("")}
            </div>`
          : ""
      }
    </div>
  `;
}

function modalMarkup(project) {
  const index = projects.indexOf(project);
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  return `
    <div class="modal-top">
      <div class="project-meta">
        ${rarityBadge(project)}
        <span class="status status-${project.status}">${statusLabels[project.status] ?? ""}</span>
        <span class="project-year">${esc(project.year)}</span>
      </div>
      <button type="button" class="icon-btn" data-modal-close aria-label="Zamknij okno projektu">${icons.close}</button>
    </div>
    <div class="modal-scroll">
      <h2 id="modal-title">${esc(project.title)}</h2>
      <p class="project-subtitle">${esc(project.subtitle)}</p>
      ${project.flavor ? `<p class="modal-flavor">${esc(project.flavor)}</p>` : ""}
      ${galleryMarkup(project)}
      <div class="modal-columns">
        <div>
          <h3>// O PROJEKCIE</h3>
          <p>${esc(project.description)}</p>
          <h3>// CO ZOSTAŁO ZROBIONE</h3>
          <ul class="check-list">
            ${project.highlights.map((item) => `<li>${esc(item)}</li>`).join("")}
          </ul>
        </div>
        <aside>
          <h3>// TECHNOLOGIE</h3>
          <ul class="chip-list">
            ${project.tech.map((tech) => `<li><span class="chip">${esc(tech)}</span></li>`).join("")}
          </ul>
          <h3>// KATEGORIE</h3>
          <ul class="chip-list">
            ${project.categories.map((id) => `<li><span class="chip">${esc(categoryLabel(id))}</span></li>`).join("")}
          </ul>
          <h3>// LINKI</h3>
          <div class="modal-links">${linkButtons(project, { size: "btn-block" })}</div>
        </aside>
      </div>
    </div>
    <div class="modal-nav">
      <button type="button" class="btn btn-sm btn-ghost" data-modal-go="${esc(prev.id)}">${icons.arrowLeft}<span>${esc(prev.title)}</span></button>
      <button type="button" class="btn btn-sm btn-ghost" data-modal-go="${esc(next.id)}"><span>${esc(next.title)}</span>${icons.arrowRight}</button>
    </div>
  `;
}

function setHash(id) {
  const url = `${location.pathname}${location.search}${id ? `#projekt-${id}` : ""}`;
  history.replaceState(null, "", url);
}

export function openProject(id, { fromHash = false } = {}) {
  const project = projects.find((item) => item.id === id);
  const modal = $("[data-modal]");
  if (!project) return;

  const panel = $("[data-modal-panel]");
  panel.innerHTML = modalMarkup(project);
  $(".modal-scroll", panel).scrollTop = 0;
  activeId = id;

  if (!modal.open) {
    opener = fromHash ? null : document.activeElement;
    modal.showModal();
    document.documentElement.classList.add("modal-open");
    document.dispatchEvent(new CustomEvent("dialog:open"));
  }
  setHash(id);
}

function closeModal() {
  const modal = $("[data-modal]");
  if (modal.open) modal.close();
}

function onClosed() {
  document.documentElement.classList.remove("modal-open");
  activeId = null;
  setHash(null);
  document.dispatchEvent(new CustomEvent("dialog:close"));
  if (opener && document.contains(opener)) opener.focus({ preventScroll: true });
  opener = null;
}

function initModal() {
  const modal = $("[data-modal]");

  modal.addEventListener("close", onClosed);
  modal.addEventListener("click", (event) => {
    if (event.target === modal) return closeModal();
    const closeButton = event.target.closest("[data-modal-close]");
    if (closeButton) return closeModal();
    const go = event.target.closest("[data-modal-go]");
    if (go) return openProject(go.dataset.modalGo);
    const thumb = event.target.closest("[data-thumb]");
    if (thumb) {
      const project = projects.find((item) => item.id === activeId);
      const image = project.images[Number(thumb.dataset.thumb)];
      const main = $("[data-gallery-main]", modal);
      main.src = asset(image.src);
      main.alt = image.alt;
      $("[data-gallery-caption]", modal).textContent = image.caption ?? "";
      $$("[data-thumb]", modal).forEach((button) => button.setAttribute("aria-pressed", String(button === thumb)));
    }
  });

  window.addEventListener("hashchange", syncFromHash);
}

function syncFromHash() {
  const match = location.hash.match(/^#projekt-(.+)$/);
  if (match && match[1] !== activeId) openProject(decodeURIComponent(match[1]), { fromHash: true });
  if (!match && activeId) closeModal();
}

export function initProjects() {
  renderFilters();
  renderGrid({ animate: false });
  initModal();

  const section = $("#projects");
  section.addEventListener("click", (event) => {
    const category = event.target.closest("[data-category]");
    if (category) {
      state.category = category.dataset.category;
      refresh();
      $(`[data-category="${state.category}"]`)?.focus({ preventScroll: true });
      return;
    }
    if (event.target.closest("[data-clear-tech]")) {
      state.tech = null;
      refresh();
      return;
    }
    if (event.target.closest("[data-reset-filters]")) {
      state.category = "all";
      state.tech = null;
      refresh();
      return;
    }
    const open = event.target.closest("[data-open]");
    if (open) return openProject(open.dataset.open);

    const card = event.target.closest(".project-card");
    if (card && !event.target.closest("a, button")) openProject(card.dataset.id);
  });

  syncFromHash();
}
