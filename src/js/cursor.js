import { playHit, playMiss } from "./audio.js";

const TARGET_SELECTOR =
  'a[href], button:not(:disabled), [role="button"], summary, select, label, [data-ability], .project-card, .sb-row.is-link, [data-cursor-target]';
const TEXT_SELECTOR = "input, textarea, [contenteditable='true']";

const hasPopover = "popover" in HTMLElement.prototype;
let layer = null;

export function getFxLayer() {
  if (layer) return layer;
  layer = document.createElement("div");
  layer.className = "fx-layer";
  layer.setAttribute("aria-hidden", "true");
  if (hasPopover) layer.setAttribute("popover", "manual");
  document.body.appendChild(layer);
  if (hasPopover) layer.showPopover();
  return layer;
}

/** Ponowne pokazanie warstwy FX przenosi ją nad świeżo otwarte okno <dialog>. */
export function raiseFx() {
  if (!layer || !hasPopover) return;
  layer.hidePopover();
  layer.showPopover();
}

const hitSvg =
  '<svg viewBox="0 0 28 28"><path d="M5 5l6 6M23 5l-6 6M5 23l6-6M23 23l-6-6"/></svg>';

export function spawnHitmarker(x, y, isTarget) {
  const marker = document.createElement("div");
  marker.className = `hitmarker${isTarget ? " is-target" : ""}`;
  marker.style.left = `${x}px`;
  marker.style.top = `${y}px`;
  marker.innerHTML = hitSvg;
  getFxLayer().appendChild(marker);
  window.setTimeout(() => marker.remove(), 220);
}

const closestTarget = (node) => (node instanceof Element ? node.closest(TARGET_SELECTOR) : null);

function initHitFeedback() {
  document.addEventListener(
    "pointerdown",
    (event) => {
      if (event.button !== 0 && event.pointerType === "mouse") return;
      const isTarget = Boolean(closestTarget(event.target));
      spawnHitmarker(event.clientX, event.clientY, isTarget);
      if (isTarget) playHit();
      else playMiss();
    },
    { passive: true },
  );

  // klik z klawiatury (Enter/Spacja) — efekt na środku elementu
  document.addEventListener("click", (event) => {
    if (event.detail !== 0) return;
    const target = closestTarget(event.target);
    if (!target || target.matches("[data-sound-toggle]")) return;
    const rect = target.getBoundingClientRect();
    spawnHitmarker(rect.left + rect.width / 2, rect.top + rect.height / 2, true);
    playHit();
  });
}

function initCrosshair() {
  const finePointer = window.matchMedia("(pointer: fine)");
  if (!finePointer.matches) return;

  const root = document.documentElement;
  const element = document.createElement("div");
  element.className = "crosshair";
  element.innerHTML = `
    <svg viewBox="0 0 32 32">
      <g class="arms"><path d="M16 2v9M16 21v9M2 16h9M21 16h9" /></g>
      <circle class="center" cx="16" cy="16" r="1.8" />
    </svg>`;
  getFxLayer().appendChild(element);
  root.classList.add("crosshair-on");

  let x = -100;
  let y = -100;
  let frame = 0;
  let mode = "normal";

  const paint = () => {
    frame = 0;
    element.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };

  const setMode = (next) => {
    if (next === mode) return;
    mode = next;
    element.classList.toggle("is-target", next === "target");
    root.classList.toggle("crosshair-text", next === "text");
  };

  document.addEventListener(
    "pointermove",
    (event) => {
      if (event.pointerType !== "mouse" && event.pointerType !== "pen") return;
      x = event.clientX;
      y = event.clientY;
      element.classList.add("is-visible");
      if (!frame) frame = requestAnimationFrame(paint);
      const node = event.target instanceof Element ? event.target : null;
      if (node?.closest(TEXT_SELECTOR)) setMode("text");
      else setMode(closestTarget(node) ? "target" : "normal");
    },
    { passive: true },
  );

  document.addEventListener("pointerdown", () => element.classList.add("is-down"), { passive: true });
  document.addEventListener("pointerup", () => element.classList.remove("is-down"), { passive: true });
  document.documentElement.addEventListener("pointerleave", () => element.classList.remove("is-visible"));
  document.documentElement.addEventListener("pointerenter", () => element.classList.add("is-visible"));

  // bez popovera okna <dialog> przykrywają warstwę FX — wtedy zostaje zwykły kursor
  if (!hasPopover) {
    document.addEventListener("dialog:open", () => root.classList.add("crosshair-native"));
    document.addEventListener("dialog:close", () => root.classList.remove("crosshair-native"));
  }
}

export function initCursor() {
  getFxLayer();
  initCrosshair();
  initHitFeedback();
  document.addEventListener("dialog:open", raiseFx);
}
