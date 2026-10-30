import { playAce, playCast } from "./audio.js";
import { getFxLayer } from "./cursor.js";
import { $, $$, prefersReducedMotion } from "./utils.js";

const KONAMI = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
const SUS_SELECTOR =
  ".project-card, .kill:not([hidden]), .sb-row.is-skill, .anomaly, .ability, .slot, .friend, .agent-card, section h2";

const isTyping = (event) => {
  const target = event.target;
  return target instanceof Element && target.closest("input, textarea, select, [contenteditable='true']");
};

/* ---------- ACE ---------- */

function confetti(duration = 2800) {
  const canvas = document.createElement("canvas");
  canvas.className = "confetti";
  const width = (canvas.width = window.innerWidth);
  const height = (canvas.height = window.innerHeight);
  getFxLayer().appendChild(canvas);
  const context = canvas.getContext("2d");
  const accent = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim() || "#c6ff00";

  const pieces = Array.from({ length: 110 }, () => {
    const size = [6, 8, 10][Math.floor(Math.random() * 3)];
    return {
      x: width / 2 + (Math.random() - 0.5) * width * 0.25,
      y: height * 0.45,
      vx: (Math.random() - 0.5) * 16,
      vy: -Math.random() * 15 - 3,
      size,
    };
  });

  const start = performance.now();
  const tick = (now) => {
    const elapsed = now - start;
    context.clearRect(0, 0, width, height);
    context.fillStyle = accent;
    pieces.forEach((piece) => {
      piece.vy += 0.42;
      piece.x += piece.vx;
      piece.y += piece.vy;
      piece.vx *= 0.992;
      context.globalAlpha = Math.max(0, 1 - Math.max(0, elapsed - duration * 0.6) / (duration * 0.4));
      context.fillRect(Math.round(piece.x), Math.round(piece.y), piece.size, piece.size);
    });
    if (elapsed < duration) requestAnimationFrame(tick);
    else canvas.remove();
  };
  requestAnimationFrame(tick);
}

let aceActive = false;

export function triggerAce() {
  if (aceActive) return;
  aceActive = true;
  const reduced = prefersReducedMotion();

  const banner = document.createElement("div");
  banner.className = "ace-banner";
  banner.setAttribute("role", "status");
  banner.innerHTML = "<span>ACE</span><small>klan jest pod wrażeniem</small>";
  getFxLayer().appendChild(banner);

  playAce();
  if (!reduced) {
    document.documentElement.classList.add("ace");
    confetti();
  }

  window.setTimeout(() => {
    document.documentElement.classList.remove("ace");
    banner.remove();
    aceActive = false;
  }, 2800);
}

function initKonami() {
  let index = 0;
  document.addEventListener("keydown", (event) => {
    if (isTyping(event) || event.ctrlKey || event.metaKey || event.altKey) return;
    const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
    index = key === KONAMI[index] ? index + 1 : key === KONAMI[0] ? 1 : 0;
    if (index === KONAMI.length) {
      index = 0;
      triggerAce();
    }
  });
}

/* ---------- „sus" ---------- */

let susTimer = 0;

export function triggerSus() {
  $$(".sus").forEach((node) => node.classList.remove("sus"));
  $$(".sus-label").forEach((node) => node.remove());
  window.clearTimeout(susTimer);

  const candidates = $$(SUS_SELECTOR).filter((node) => node.getClientRects().length);
  if (!candidates.length) return;
  const element = candidates[Math.floor(Math.random() * candidates.length)];

  element.scrollIntoView({ block: "center", behavior: prefersReducedMotion() ? "auto" : "smooth" });
  element.classList.add("sus");

  const label = document.createElement("div");
  label.className = "sus-label";
  label.setAttribute("role", "status");
  label.textContent = "wykryto anomalię 🔍";
  document.body.appendChild(label);

  const place = () => {
    const rect = element.getBoundingClientRect();
    label.style.top = `${rect.top + window.scrollY - 28}px`;
    label.style.left = `${rect.left + window.scrollX}px`;
  };
  place();
  const settle = window.setTimeout(place, 700);

  susTimer = window.setTimeout(() => {
    element.classList.remove("sus");
    label.remove();
    window.clearTimeout(settle);
  }, 4200);
}

function initSus() {
  let buffer = "";
  document.addEventListener("keydown", (event) => {
    if (isTyping(event) || event.ctrlKey || event.metaKey || event.altKey || event.key.length !== 1) return;
    buffer = (buffer + event.key.toLowerCase()).slice(-3);
    if (buffer === "sus") {
      buffer = "";
      triggerSus();
    }
  });
}

/* ---------- Umiejętności agenta: klawisze Q / E / C / X ---------- */

function initAbilityKeys() {
  document.addEventListener("keydown", (event) => {
    if (isTyping(event) || event.ctrlKey || event.metaKey || event.altKey || event.repeat) return;
    const ability = $(`[data-ability="${event.key.toUpperCase()}"]`);
    if (!ability || event.key.length !== 1) return;
    ability.classList.add("is-cast");
    playCast();
    window.setTimeout(() => ability.classList.remove("is-cast"), 320);
  });
}

/* ---------- Konsola ---------- */

function consoleGreeting() {
  const art = [
    "          |          ",
    "          |          ",
    "          |          ",
    "   ———————   ———————   ",
    "          |          ",
    "          |          ",
    "          |          ",
  ].join("\n");
  console.log(`%c${art}`, "color:#C6FF00;font-family:monospace;font-size:13px;line-height:1.1");
  console.log(
    "%cAGENT: MATYLDA // ROLA: DATA / ML",
    "color:#0B0D0F;background:#C6FF00;font:700 14px monospace;padding:2px 8px",
  );
  console.log(
    "%cJeśli to czytasz w konsoli, jesteś dev albo rekruter z charakterem. Miło.\nSzukam stażu / roli junior Data / ML w Warszawie: matyldadrapich@gmail.com\n\npsst: ↑↑↓↓←→←→BA · wpisz „sus” · kliknij logo 5x · train()",
    "color:#8E989F;font:12px monospace",
  );
}

export function initEggs() {
  initKonami();
  initSus();
  initAbilityKeys();
  consoleGreeting();
}
