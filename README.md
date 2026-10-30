# Portfolio — Matylda Drapich

Nowoczesne, responsywne portfolio w języku polskim (Vite + czysty JavaScript, bez frameworka).
Publikowane na GitHub Pages: **https://mat787.github.io/portfolio/**

## Styl

Wizualnie: **tactical HUD / FPS** — ciemne tło `#0B0D0F`, jeden akcent `#C6FF00`, czerwień `#FF3B5C` tylko dla trafień i alertów.
Nagłówki: Rajdhani, etykiety HUD: JetBrains Mono, tekst: Inter (wszystko hostowane lokalnie). Jasny motyw to „tryb treningowy".
Humor „brainrot" jest wyłącznie warstwą dekoracyjną (pasek na górze, tooltipy, easter eggi, 404) — opisy projektów i doświadczenia są rzeczowe.
Wszystko jest narysowane w SVG/CSS lub syntezowane w przeglądarce — żadnych cudzych sprite'ów, dźwięków ani postaci.

## Co zawiera

- sekcje jako „ekrany gry": wybór agenta (hero), briefing (o mnie), loadout (projekty z rzadkością), scoreboard (umiejętności), kill feed (doświadczenie), „zaproś do party" (kontakt),
- filtrowane karty projektów + okno ze szczegółami (galeria, stos technologiczny, linki; link bezpośredni, np. `#projekt-mbewu-ai`),
- klikalne umiejętności (filtrują projekty), filtr doświadczenia, formularz otwierający program pocztowy, motyw jasny/ciemny (zapamiętywany),
- kursor-celownik (tylko `pointer: fine`), dźwięk trafienia (Web Audio, tylko po interakcji, przycisk wyciszenia w nawigacji), hitmarker po kliknięciu,
- pasek „live" z przewijanymi tekstami, pociąg pixel-art z wykresem liniowym przelatujący co 20–60 s (kliknięcie = „+1000 aura"),
- easter eggi: kod Konami (tryb ACE), 5 kliknięć w logo (aim trainer 30 s), wpisanie `sus`, ukryty komunikat w konsoli, strona 404,
- `prefers-reduced-motion` wyłącza pociąg, marquee, drgania i glitch (zostają wersje statyczne); responsywność od 375 px; dostępność (skip-link, focus, kontrast AA, natywny `<dialog>`).

## Jak edytować treść

**Cała treść jest w jednym pliku: [`src/data/content.js`](./src/data/content.js)** — opis, umiejętności, projekty,
umiejętności, oś czasu, dane kontaktowe i projekty. Na początku pliku jest krótka ściągawka.

| Chcę… | Zmieniam… |
| --- | --- |
| dodać link do live dema | `projects[].links.demo` (np. `"https://moja-apka.streamlit.app"`); dopóki jest `null`, na karcie widnieje „Demo wkrótce" |
| zmienić link do repozytorium | `projects[].links.repo` |
| dodać zrzuty ekranu | wrzucić plik do `public/projects/` i dopisać do `projects[].images` (`src: "projects/plik.webp"`) |
| dodać nowy projekt | skopiować istniejący obiekt w `projects` i zmienić pola |
| ukryć projekt | `hidden: true` |
| zmienić status projektu | `status: "done"` lub `"in-progress"` |
| dodać CV do pobrania | wrzucić PDF do `public/cv.pdf` i ustawić `profile.cvUrl = "cv.pdf"` |
| dodać zdjęcie | wrzucić plik do `public/` i ustawić `profile.photo` |
| dodać wpis na osi czasu | `timeline` (typy: `work`, `education`, `community`) |
| zmienić rzadkość karty projektu | `projects[].rarity` (`mythic`, `legendary`, `epic`, `rare`, `common`) i `flavor` (krótki podpis na karcie) |
| zmienić teksty w pasku „live" | `marquee` |
| zmienić „wynik Matyldy" w aim trainerze i komentarze | `easter.aimBenchmark`, `easter.aimComments` (wartość startowa jest orientacyjna — wpisz swój rekord) |

Numer telefonu celowo nie jest publikowany na stronie.

## Uruchomienie lokalne

Wymagany Node.js 20+.

```bash
npm install
npm run dev        # serwer deweloperski: http://localhost:5173/portfolio/
npm run build      # build produkcyjny do katalogu dist/
npm run preview    # podgląd builda: http://localhost:4173/portfolio/
```

Strona jest budowana z bazą `/portfolio/` (pod adresem GitHub Pages projektu). Jeśli kiedyś
zmieni się nazwa repozytorium lub użyta zostanie własna domena, ustaw bazę zmienną środowiskową:

```bash
VITE_BASE=/ npm run build
```

Odwołania do plików z `public/` w danych (`projects/...`) są automatycznie poprzedzane bazą,
więc działają w każdej konfiguracji.

## Publikacja (GitHub Pages)

Workflow [`.github/workflows/deploy-pages.yml`](./.github/workflows/deploy-pages.yml) buduje i wdraża
stronę po każdym pushu na `main` (w paczce jest też `404.html`). Jednorazowo w repozytorium: **Settings → Pages → Build and deployment →
Source: GitHub Actions**.

## Struktura

```
index.html                 szkielet strony
src/data/content.js        CAŁA TREŚĆ (edytuj tutaj)
src/js/                    renderowanie sekcji, projekty + modal, motyw/nawigacja/animacje
src/js/                    …w tym cursor.js, audio.js, train.js, eggs.js, aim.js (warstwa interakcji)
src/styles/                base.css (tokeny, ramki HUD), layout.css, cards.css, fx.css
404.html                   strona błędu (budowana razem ze stroną główną)
public/                    statyczne pliki: favicon, zrzuty ekranu projektów
```
