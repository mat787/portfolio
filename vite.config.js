import { defineConfig } from "vite";

// Strona działa pod adresem https://mat787.github.io/portfolio/ — stąd domyślna baza.
// Przy własnej domenie (lub lokalnie pod "/") ustaw zmienną: VITE_BASE=/ npm run build
export default defineConfig({
  base: process.env.VITE_BASE ?? "/portfolio/",
  build: {
    target: "es2020",
    assetsInlineLimit: 0,
  },
});
