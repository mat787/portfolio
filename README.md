# Portfolio — Matylda Drapich

Nowoczesne, responsywne portfolio w języku polskim (Vite + czysty JavaScript, bez frameworka).
Publikowane na GitHub Pages: **https://mat787.github.io/portfolio/**

## Co zawiera

- płynna nawigacja po sekcjach, podświetlanie aktywnej sekcji, pasek postępu przewijania,
- animowane pojawianie się treści (wyłączane przy `prefers-reduced-motion`),
- filtrowane karty projektów + okno ze szczegółami (galeria zrzutów, stos technologiczny, linki; link bezpośredni, np. `#projekt-jobradar`),
- przegląd umiejętności (kliknięcie technologii filtruje projekty),
- oś czasu: doświadczenie, edukacja, działalność (z filtrem),
- sekcja kontaktu (kopiowanie e-maila, formularz otwierający program pocztowy),
- motyw jasny / ciemny (domyślnie wg ustawień systemu, wybór jest zapamiętywany),
- dostępność: skip-link, widoczny focus, semantyczny HTML, obsługa klawiatury, natywny `<dialog>`,
- czcionki hostowane lokalnie (bez zewnętrznych CDN), obrazy w WebP.

## Jak edytować treść

**Cała treść jest w jednym pliku: [`src/data/content.js`](./src/data/content.js)** — opis, statystyki,
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
stronę po każdym pushu na `main`. Jednorazowo w repozytorium: **Settings → Pages → Build and deployment →
Source: GitHub Actions**.

## Struktura

```
index.html                 szkielet strony
src/data/content.js        CAŁA TREŚĆ (edytuj tutaj)
src/js/                    renderowanie sekcji, projekty + modal, motyw/nawigacja/animacje
src/styles/main.css        style (tokeny kolorów na górze pliku)
public/                    statyczne pliki: favicon, zrzuty ekranu projektów
```
