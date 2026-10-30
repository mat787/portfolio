import { $ } from "./utils.js";

const STORAGE_KEY = "sound";
let context = null;
let enabled = true;

try {
  enabled = localStorage.getItem(STORAGE_KEY) !== "off";
} catch {
  /* brak dostępu do localStorage — zostaje wartość domyślna */
}

export const isSoundEnabled = () => enabled;

/** AudioContext powstaje dopiero w reakcji na gest użytkownika (bez autoplay). */
function audio() {
  if (!enabled) return null;
  if (!context) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return null;
    context = new AudioContextClass();
  }
  if (context.state === "suspended") context.resume();
  return context;
}

function tone({ type = "square", from, to = from, duration = 0.06, volume = 0.08, delay = 0 }) {
  const ctx = audio();
  if (!ctx) return;
  const start = ctx.currentTime + delay;
  const oscillator = ctx.createOscillator();
  const gain = ctx.createGain();

  oscillator.type = type;
  oscillator.frequency.setValueAtTime(from, start);
  if (to !== from) oscillator.frequency.exponentialRampToValueAtTime(to, start + duration * 0.8);

  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(volume, start + 0.003);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);

  oscillator.connect(gain);
  gain.connect(ctx.destination);
  oscillator.start(start);
  oscillator.stop(start + duration + 0.02);
}

/** Trafienie w cel (link/przycisk): jasny tick + krótki „ping". */
export function playHit() {
  tone({ type: "square", from: 2400, to: 1300, duration: 0.06, volume: 0.07 });
  tone({ type: "sine", from: 3600, to: 3000, duration: 0.04, volume: 0.05 });
}

/** Pudło (klik w tło): niższy, cichszy stuk. */
export function playMiss() {
  tone({ type: "triangle", from: 360, to: 170, duration: 0.07, volume: 0.07 });
}

export function playAura() {
  [660, 880, 1320].forEach((frequency, index) =>
    tone({ type: "sine", from: frequency, duration: 0.11, volume: 0.07, delay: index * 0.07 }),
  );
}

export function playAce() {
  [440, 554, 659, 880, 1109].forEach((frequency, index) =>
    tone({ type: "sawtooth", from: frequency, duration: 0.14, volume: 0.05, delay: index * 0.08 }),
  );
}

export function playCast() {
  tone({ type: "square", from: 900, to: 1500, duration: 0.07, volume: 0.05 });
}

function syncButton(button) {
  button.setAttribute("aria-pressed", String(enabled));
  button.setAttribute("aria-label", `Dźwięk trafienia: ${enabled ? "włączony" : "wyłączony"}`);
}

export function initSoundToggle() {
  const button = $("[data-sound-toggle]");
  syncButton(button);
  button.addEventListener("click", () => {
    enabled = !enabled;
    try {
      localStorage.setItem(STORAGE_KEY, enabled ? "on" : "off");
    } catch {
      /* ignoruj */
    }
    syncButton(button);
    if (enabled) playHit();
  });
}
