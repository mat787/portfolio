import { playAura } from "./audio.js";
import { $, prefersReducedMotion } from "./utils.js";

/* Oryginalny pikselowy pociąg narysowany od zera: litery = kolory (patrz fx.css).
   K obrys, A akcent, W okno, R pas alarmowy, D koło. */
const CAR = [
  ".KKKKKKKKKKKK.",
  "KAAAAAAAAAAAAK",
  "KAWWAWWAWWAAAK",
  "KAWWAWWAWWAAAK",
  "KAAAAAAAAAAAAK",
  "KRRRRRRRRRRRRK",
  "KAAAAAAAAAAAAK",
  "KKKKKKKKKKKKKK",
  "..KDDK..KDDK..",
  "..KKKK..KKKK..",
];

const LOCO = [
  ".KKKKKKKKKKKK....",
  "KAAAAAAAAAAAAKK..",
  "KAWWAWWAAAAWWWWK.",
  "KAWWAWWAAAAWWWWK.",
  "KAAAAAAAAAAAAAAAK",
  "KRRRRRRRRRRRRRRRK",
  "KAAAAAAAAAAAAAAAK",
  "KKKKKKKKKKKKKKKKK",
  "..KDDK..KDDK.KDDK",
  "..KKKK..KKKK.KKKK",
];

const COUPLER = ["..", "..", "..", "..", "..", "KK", "KK", "..", "..", ".."];

const ROWS = CAR.map((row, index) => row + COUPLER[index] + CAR[index] + COUPLER[index] + LOCO[index]);

function spriteMarkup(pixel) {
  const width = ROWS[0].length;
  const rects = [];
  ROWS.forEach((row, y) => {
    let x = 0;
    while (x < row.length) {
      const char = row[x];
      let run = 1;
      while (x + run < row.length && row[x + run] === char) run += 1;
      if (char !== ".") rects.push(`<rect class="px-${char}" x="${x}" y="${y}" width="${run}" height="1"/>`);
      x += run;
    }
  });
  return `<svg class="train-sprite" viewBox="0 0 ${width} ${ROWS.length}" width="${width * pixel}" height="${ROWS.length * pixel}" data-cursor-target aria-hidden="true">${rects.join("")}</svg>`;
}

/** Ślad pociągu: wykres liniowy z losowym spacerem i kilkoma czerwonymi outlierami. */
function trailMarkup() {
  const width = 460;
  const points = [];
  let value = 34;
  for (let x = 0; x <= width; x += 20) {
    value = Math.max(10, Math.min(52, value + (Math.random() - 0.5) * 22));
    points.push([x, value]);
  }
  const path = points.map(([x, y], index) => `${index ? "L" : "M"}${x} ${y.toFixed(1)}`).join(" ");
  const dots = points
    .filter((_, index) => index % 2 === 0)
    .map(([x, y]) => `<circle class="pt" cx="${x}" cy="${y.toFixed(1)}" r="2.6"/>`)
    .join("");
  const outliers = Array.from({ length: 2 }, () => {
    const x = 120 + Math.random() * 300;
    const y = Math.random() > 0.5 ? 4 : 60;
    return `<circle class="out" cx="${x.toFixed(0)}" cy="${y}" r="3.4"/>`;
  }).join("");
  return `<svg class="train-trail" viewBox="0 0 ${width} 64" aria-hidden="true"><path class="line" d="${path}"/>${dots}${outliers}</svg>`;
}

/* ---------- Licznik aury ---------- */

const AURA_KEY = "aura";
let aura = 0;
try {
  aura = Number(localStorage.getItem(AURA_KEY)) || 0;
} catch {
  /* ignoruj */
}

function renderAura(bump = false) {
  const hud = $("[data-aura]");
  if (!hud) return;
  hud.hidden = aura === 0;
  $("[data-aura-value]", hud).textContent = aura.toLocaleString("pl-PL");
  if (bump) {
    hud.classList.remove("is-bump");
    void hud.offsetWidth;
    hud.classList.add("is-bump");
  }
}

function addAura(amount) {
  aura += amount;
  try {
    localStorage.setItem(AURA_KEY, String(aura));
  } catch {
    /* ignoruj */
  }
  renderAura(true);
}

/* ---------- Przelot ---------- */

let active = false;

export function spawnTrain() {
  if (active || prefersReducedMotion()) return;
  active = true;

  const viewportWidth = window.innerWidth;
  const pixel = viewportWidth < 600 ? 4 : 5;
  const trainWidth = 460 + 49 * pixel;
  const rtl = Math.random() > 0.5;
  const top = Math.round(window.innerHeight * (0.2 + Math.random() * 0.55));
  const distance = viewportWidth + trainWidth;
  const seconds = Math.max(5, distance / 440);

  const element = document.createElement("div");
  element.className = `train${rtl ? " is-rtl" : ""}`;
  element.style.top = `${top}px`;
  element.style.setProperty("--train-time", `${seconds.toFixed(1)}s`);
  element.style.setProperty("--train-from", rtl ? `${viewportWidth}px` : `${-trainWidth}px`);
  element.style.setProperty("--train-to", rtl ? `${-trainWidth}px` : `${viewportWidth}px`);
  element.innerHTML = `<div class="train-flip">${trailMarkup()}${spriteMarkup(pixel)}</div>`;
  document.body.appendChild(element);

  const sprite = $(".train-sprite", element);
  sprite.addEventListener("pointerdown", (event) => {
    if (element.classList.contains("is-claimed")) return;
    element.classList.add("is-claimed");
    addAura(1000);
    playAura();
    const float = document.createElement("div");
    float.className = "aura-float";
    float.textContent = "+1000 aura";
    float.style.left = `${event.clientX}px`;
    float.style.top = `${event.clientY - 12}px`;
    document.body.appendChild(float);
    window.setTimeout(() => float.remove(), 1200);
  });

  element.addEventListener("animationend", () => {
    element.remove();
    active = false;
  });
}

function scheduleNext() {
  const delay = 20000 + Math.random() * 40000;
  window.setTimeout(() => {
    if (!document.hidden) spawnTrain();
    scheduleNext();
  }, delay);
}

export function initTrain() {
  renderAura();
  window.train = spawnTrain;
  if (prefersReducedMotion()) return;
  scheduleNext();
}
