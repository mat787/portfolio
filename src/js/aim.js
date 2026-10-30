import { easter } from "../data/content.js";
import { playAce } from "./audio.js";
import { $, $$, esc, icons } from "./utils.js";

const BEST_KEY = "aim-best";
const pick = (list) => list[Math.floor(Math.random() * list.length)];

const readBest = () => {
  try {
    return JSON.parse(localStorage.getItem(BEST_KEY)) ?? null;
  } catch {
    return null;
  }
};

const writeBest = (value) => {
  try {
    localStorage.setItem(BEST_KEY, JSON.stringify(value));
  } catch {
    /* ignoruj */
  }
};

const bestLabel = () => {
  const best = readBest();
  return best ? `${best.hits} · ${best.accuracy}%` : "—";
};

let session = null;

function stopSession() {
  if (!session) return;
  window.clearInterval(session.clock);
  window.clearTimeout(session.spawner);
  session.timeouts.forEach((id) => window.clearTimeout(id));
  session = null;
}

function arenaMarkup() {
  return `
    <div class="aim-panel">
      <div class="aim-top">
        <h2 id="aim-title">Aim trainer</h2>
        <button type="button" class="icon-btn" data-aim-close aria-label="Zamknij minigrę">${icons.close}</button>
      </div>
      <div class="aim-stats" aria-live="off">
        <div>Czas<b data-aim-time>${easter.aimSeconds.toFixed(1)}</b></div>
        <div>Trafienia<b data-aim-hits>0</b></div>
        <div>Celność<b data-aim-acc>—</b></div>
        <div>Rekord<b data-aim-best>${esc(bestLabel())}</b></div>
      </div>
      <div class="aim-arena" data-aim-arena>
        <div class="aim-overlay" data-aim-overlay>
          <p class="aim-result">Trafiaj w cele przez ${easter.aimSeconds} sekund</p>
          <p>Klikaj lub stukaj w czerwone tarcze. Pudła obniżają celność. Esc zamyka.</p>
          <div class="aim-actions"><button type="button" class="btn btn-primary" data-aim-start>Start ${icons.arrowRight}</button></div>
        </div>
      </div>
      <p class="aim-hint">Ukryty tryb · mysz lub dotyk</p>
    </div>
  `;
}

function startGame(dialog) {
  stopSession();
  const arena = $("[data-aim-arena]", dialog);
  const hitsNode = $("[data-aim-hits]", dialog);
  const accNode = $("[data-aim-acc]", dialog);
  const timeNode = $("[data-aim-time]", dialog);
  $("[data-aim-overlay]", dialog)?.remove();

  const coarse = window.matchMedia("(pointer: coarse)").matches;
  const size = coarse ? 76 : 62;
  const duration = easter.aimSeconds * 1000;
  const startedAt = performance.now();
  const state = { hits: 0, shots: 0, timeouts: [], clock: 0, spawner: 0 };
  session = state;

  const accuracy = () => (state.shots ? Math.round((state.hits / state.shots) * 100) : null);
  const updateStats = () => {
    hitsNode.textContent = String(state.hits);
    accNode.textContent = state.shots ? `${accuracy()}%` : "—";
  };

  const spawn = () => {
    if (session !== state) return;
    const alive = $$(".aim-target", arena);
    if (alive.length >= 2) return;
    const bounds = arena.getBoundingClientRect();
    const maxX = Math.max(0, bounds.width - size - 8);
    const maxY = Math.max(0, bounds.height - size - 8);
    const target = document.createElement("button");
    target.type = "button";
    target.className = "aim-target";
    target.setAttribute("aria-label", "Cel");
    target.style.setProperty("--size", `${size}px`);
    target.style.setProperty("--life", "1500ms");
    target.style.left = `${4 + Math.random() * maxX}px`;
    target.style.top = `${4 + Math.random() * maxY}px`;
    arena.appendChild(target);

    const expire = window.setTimeout(() => target.remove(), 1500);
    state.timeouts.push(expire);
    target.addEventListener("pointerdown", (event) => {
      event.preventDefault();
      window.clearTimeout(expire);
      target.remove();
      state.hits += 1;
      state.shots += 1;
      updateStats();
      spawn();
    });
    target.addEventListener("click", (event) => {
      if (event.detail !== 0) return;
      window.clearTimeout(expire);
      target.remove();
      state.hits += 1;
      state.shots += 1;
      updateStats();
      spawn();
    });
  };

  arena.addEventListener("pointerdown", (event) => {
    if (session !== state || event.target.closest(".aim-target")) return;
    state.shots += 1;
    updateStats();
  });

  const loop = () => {
    if (session !== state) return;
    spawn();
    state.spawner = window.setTimeout(loop, 520 + Math.random() * 380);
  };
  loop();

  state.clock = window.setInterval(() => {
    const left = Math.max(0, duration - (performance.now() - startedAt));
    timeNode.textContent = (left / 1000).toFixed(1);
    if (left <= 0) finish(dialog, state);
  }, 100);
}

function finish(dialog, state) {
  if (session !== state) return;
  const hits = state.hits;
  const accuracy = state.shots ? Math.round((hits / state.shots) * 100) : 0;
  stopSession();
  $$(".aim-target", dialog).forEach((node) => node.remove());

  const benchmark = easter.aimBenchmark;
  const tier = hits >= benchmark.hits ? "above" : hits >= benchmark.hits * 0.7 ? "close" : "below";
  const verdict = pick(easter.aimComments[tier]);

  const best = readBest();
  const isRecord = !best || hits > best.hits || (hits === best.hits && accuracy > best.accuracy);
  if (isRecord && hits > 0) writeBest({ hits, accuracy });
  $("[data-aim-best]", dialog).textContent = bestLabel();
  playAce();

  const overlay = document.createElement("div");
  overlay.className = "aim-overlay";
  overlay.innerHTML = `
    <p class="aim-result">Twój wynik: <b>${hits}</b> trafień · <b>${accuracy}%</b></p>
    <p class="aim-result" style="font-size:1.2rem;color:var(--muted)!important">Matylda: ${benchmark.hits} trafień · ${benchmark.accuracy}%</p>
    <p class="aim-verdict">> ${esc(verdict)}${isRecord && hits > 0 ? " Nowy rekord." : ""}</p>
    <div class="aim-actions">
      <button type="button" class="btn btn-primary" data-aim-start>Jeszcze raz</button>
      <button type="button" class="btn" data-aim-close>Zamknij</button>
    </div>`;
  $("[data-aim-arena]", dialog).appendChild(overlay);
  $("[data-aim-start]", overlay).focus({ preventScroll: true });
}

export function openAim() {
  const dialog = $("[data-aim]");
  if (dialog.open) return;
  dialog.innerHTML = arenaMarkup();
  dialog.showModal();
  document.documentElement.classList.add("modal-open");
  document.dispatchEvent(new CustomEvent("dialog:open"));
  $("[data-aim-start]", dialog).focus({ preventScroll: true });
}

export function initAim() {
  const dialog = $("[data-aim]");

  dialog.addEventListener("click", (event) => {
    if (event.target === dialog || event.target.closest("[data-aim-close]")) return dialog.close();
    if (event.target.closest("[data-aim-start]")) startGame(dialog);
  });
  dialog.addEventListener("close", () => {
    stopSession();
    document.documentElement.classList.remove("modal-open");
    document.dispatchEvent(new CustomEvent("dialog:close"));
  });

  // 5 kliknięć w logo w ciągu kilku sekund
  const brand = $("[data-brand]");
  let clicks = 0;
  let resetTimer = 0;
  brand.addEventListener("click", (event) => {
    clicks += 1;
    window.clearTimeout(resetTimer);
    resetTimer = window.setTimeout(() => (clicks = 0), 2500);
    if (clicks >= 5) {
      clicks = 0;
      event.preventDefault();
      openAim();
    }
  });

  window.aim = openAim;
}
