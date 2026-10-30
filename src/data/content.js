/**
 * ============================================================
 *  TREŚĆ PORTFOLIO — TO JEST GŁÓWNY PLIK DO EDYCJI
 * ============================================================
 *  Cała zawartość strony (teksty, projekty, umiejętności, oś czasu,
 *  linki) pochodzi z tego pliku. Nie trzeba ruszać HTML-a ani CSS-a.
 *
 *  Szybkie ściągawki:
 *  - Dodanie live dema projektu:  wpisz adres w `links.demo`
 *    (np. demo: "https://moja-aplikacja.streamlit.app").
 *    Dopóki jest `null`, przycisk pokazuje się jako „Demo wkrótce".
 *  - Zmiana linku do repozytorium: `links.repo`.
 *  - Dodanie zrzutów ekranu: wrzuć plik do `public/projects/`
 *    i dopisz go do tablicy `images` (ścieżka względna: "projects/plik.webp").
 *  - Ukrycie projektu bez usuwania:  `hidden: true`.
 *  - CV do pobrania: wrzuć PDF do `public/` i wpisz "cv.pdf" w `profile.cvUrl`.
 *    Przycisk pojawi się automatycznie.
 *  - Numer telefonu celowo NIE jest publikowany.
 */

export const site = {
  title: "Matylda Drapich — Data Analyst / Machine Learning",
  description:
    "Portfolio Matyldy Drapich — studentki informatyki stosowanej na Politechnice Warszawskiej i Junior Data Analyst. Projekty z obszaru analizy danych, ML i inżynierii danych.",
  lang: "pl",
};

export const profile = {
  name: "Matylda Drapich",
  initials: "MD",
  role: "Junior Data Analyst",
  tagline: "Analiza danych, uczenie maszynowe i inżynieria danych.",
  intro:
    "Studiuję informatykę stosowaną na Politechnice Warszawskiej i pracuję jako Junior Data Analyst w REDS S.A. Zamieniam dane w decyzje: od czyszczenia i modelowania, przez wizualizację, po działające narzędzia.",
  availability: "Otwarta na staż i role juniorskie · Data / ML",
  location: "Warszawa, Polska",
  // Wpisz np. "cv.pdf" (plik w katalogu public/), aby pokazać przycisk „Pobierz CV".
  cvUrl: null,
  photo: null, // np. "photo.webp" (plik w public/) — wyświetli się w sekcji „O mnie".
  about: [
    "Jestem studentką informatyki stosowanej na Politechnice Warszawskiej (specjalizacja: Inżynieria Danych i Multimedia). Na co dzień pracuję z danymi operacyjnymi kolei: analizuję je w SQL, tworzę wizualizacje 2D/3D w R i pomagam optymalizować rozkład rezerw czasowych między przystankami.",
    "Poza pracą buduję własne projekty — od klasycznej analizy i klasyfikacji, przez pipeline ETL na kilkuset megabajtach danych z urządzeń wearables, po system dopasowujący oferty pracy do CV. Cenię czytelny kod, powtarzalne analizy i wnioski, które da się obronić.",
    "Angażuję się też w społeczność studencką: jestem w Core Teamie GDG on Campus WUT i pełnię rolę Tech Ambassador w EY.",
  ],
  highlights: [
    { value: "4,22", label: "średnia ocen na studiach (skala 5,0)" },
    { value: "700 MB+", label: "danych Apple Health przetwarzanych w ETL" },
    { value: "80+", label: "osób na wydarzeniach organizowanych w GDG" },
    { value: "4", label: "projekty opisane w portfolio" },
  ],
};

export const contact = {
  heading: "Porozmawiajmy",
  text: "Szukam stażu i pierwszych ról w obszarze Data / ML. Napisz, jeśli chcesz porozmawiać o współpracy, projekcie albo rekrutacji.",
  email: "matyldadrapich@gmail.com",
  links: [
    { label: "GitHub", url: "https://github.com/mat787", handle: "github.com/mat787" },
    {
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/matylda-drapich",
      handle: "linkedin.com/in/matylda-drapich",
    },
  ],
};

/**
 * Kategorie używane do filtrowania projektów.
 * `id` musi się zgadzać z wartościami w `projects[].categories`.
 */
export const projectCategories = [
  { id: "ml", label: "Machine Learning" },
  { id: "data-engineering", label: "Inżynieria danych" },
  { id: "analysis", label: "Analiza danych" },
  { id: "software", label: "Aplikacje i algorytmy" },
];

/**
 * status: "done" | "in-progress"  (kolor i etykieta plakietki)
 * links.repo / links.demo: adres URL albo null (null = pokaże się jako „wkrótce")
 * images: [{ src, alt, caption? }]  — pierwszy obraz jest okładką karty
 */
export const projects = [
  {
    id: "jobradar",
    title: "JobRadar",
    subtitle: "Dopasowywanie ofert pracy do CV",
    year: "2026",
    status: "in-progress",
    categories: ["data-engineering", "ml"],
    summary:
      "Platforma, która zbiera oferty IT, porządkuje je w bazie danych i ma dopasowywać je do CV kandydata z użyciem embeddingów i lokalnego modelu językowego.",
    description:
      "JobRadar to projekt end-to-end łączący inżynierię danych z NLP. Skraper pobiera oferty pracy i rozbija je na ustrukturyzowane sekcje, dane trafiają do PostgreSQL, a kolejne etapy obejmują deduplikację i wyszukiwanie semantyczne z użyciem pgvector. Całość działa lokalnie w Dockerze — bez kosztów zewnętrznych API.",
    highlights: [
      "Skraper ofert z ponawianiem błędnych żądań, zapisem po każdej stronie i pobieraniem szczegółów tylko dla ofert, których jeszcze nie ma w bazie.",
      "Schemat PostgreSQL z migracjami i repozytorium ofert (upsert) — wymagania, mile widziane, obowiązki, benefity, lokalizacje, tryb pracy, data ważności.",
      "Ekstrakcja tekstu z CV w formacie PDF jako wejście do dopasowania.",
      "Docelowo: embeddingi w pgvector, lokalny LLM oraz API w FastAPI.",
    ],
    tech: ["Python", "PostgreSQL", "pgvector", "FastAPI", "Docker", "LLM / RAG"],
    images: [
      {
        src: "projects/jobradar-architecture.svg",
        alt: "Schemat przepływu danych w JobRadar: scraper, PostgreSQL, embeddingi pgvector i dopasowanie do CV",
        caption: "Schemat przepływu danych (koncepcja architektury).",
      },
    ],
    links: {
      repo: "https://github.com/mat787/JobRadar",
      demo: null,
    },
  },
  {
    id: "health-analyzer",
    title: "HealthAnalyzer",
    subtitle: "Analiza i wykrywanie anomalii w danych Apple Health",
    year: "2026",
    status: "done",
    categories: ["data-engineering", "ml", "analysis"],
    summary:
      "Pipeline ETL dla ponad 700 MB eksportu Apple Health, lokalna baza SQLite, dashboard w Streamlit oraz wykrywanie nietypowych wzorców fizjologicznych modelem Isolation Forest.",
    description:
      "Aplikacja przetwarza surowy eksport XML z iPhone'a i Apple Watch, normalizuje dane, a następnie pozwala eksplorować je w interaktywnym dashboardzie. Nienadzorowany model Isolation Forest wskazuje nietypowe zachowania organizmu, np. tachykardię spoczynkową.",
    highlights: [
      "Zoptymalizowane parsowanie dużych struktur XML oraz proporcjonalne rozkładanie skumulowanych pakietów pomiarów w czasie.",
      "Wygładzanie średnią kroczącą („dług fizjologiczny”), które ogranicza liczbę fałszywych alarmów.",
      "Standaryzacja stref czasowych do UTC — spójna analiza przy zmianie czasu letniego i zimowego.",
      "Interaktywny dashboard w Streamlit z wyborem źródła danych i metryki oraz zapisem do lokalnej bazy.",
    ],
    tech: ["Python", "Pandas", "NumPy", "Scikit-learn", "Isolation Forest", "Streamlit", "SQLite"],
    images: [
      {
        src: "projects/health-analyzer-dashboard.webp",
        alt: "Dashboard HealthAnalyzer: wykres tętna w czasie z wyborem źródła danych i metryki",
        caption: "Dashboard: eksploracja metryk (tętno) z suwakiem zakresu czasu.",
      },
      {
        src: "projects/health-analyzer-upload.webp",
        alt: "Ekran wczytywania ponad 700 MB pliku eksportu Apple Health z paskiem postępu",
        caption: "Wczytywanie dużego eksportu Apple Health (ok. 0,7 GB).",
      },
    ],
    links: {
      repo: "https://github.com/mat787/HealthAnalyzer",
      demo: null,
    },
  },
  {
    id: "breast-cancer-classification",
    title: "Klasyfikacja nowotworów piersi",
    subtitle: "Analiza diagnostyczna i modele predykcyjne",
    year: "2026",
    status: "done",
    categories: ["ml", "analysis"],
    summary:
      "Pełna ścieżka analityczna na zbiorze Breast Cancer Wisconsin: EDA, selekcja cech i porównanie trzech klasyfikatorów z naciskiem na czułość (recall).",
    description:
      "Projekt z przedmiotu „Podstawy Reprezentacji i Analizy Danych” (Politechnika Warszawska). Celem jest przewidywanie, czy nowotwór jest złośliwy czy łagodny, na podstawie cech geometrycznych jąder komórkowych (569 przypadków, 30 cech). W diagnostyce medycznej kluczowa jest czułość, bo błąd fałszywie ujemny oznacza przeoczenie choroby.",
    highlights: [
      "Eksploracyjna analiza danych: miary statystyczne, macierz korelacji, rozkłady cech.",
      "Selekcja cech o największej zdolności separacji klas (np. radius_mean, concave points_mean).",
      "Porównanie k-NN, naiwnego klasyfikatora Bayesa i drzewa decyzyjnego.",
      "Wybór modelu (drzewo decyzyjne) z uwzględnieniem minimalizacji ryzyka przeoczenia choroby.",
    ],
    tech: ["Python", "Pandas", "NumPy", "Scikit-learn", "Matplotlib", "Seaborn"],
    images: [
      {
        src: "projects/breast-cancer-pairplot.webp",
        alt: "Wykres par cech diagnostycznych (pairplot) z podziałem na przypadki łagodne i złośliwe",
        caption: "Zestawienie kluczowych cech diagnostycznych.",
      },
      {
        src: "projects/breast-cancer-knn.webp",
        alt: "Granice decyzyjne klasyfikatora k-najbliższych sąsiadów",
        caption: "Granice decyzyjne klasyfikatora k-NN.",
      },
    ],
    links: {
      repo: "https://github.com/mat787/breast-cancer-classification",
      demo: null,
    },
  },
  {
    id: "huffman-compressor",
    title: "Huffman Compressor",
    subtitle: "Bezstratna kompresja plików w Javie",
    year: "2026",
    status: "done",
    categories: ["software"],
    summary:
      "Implementacja algorytmu Huffmana w Javie 24 z drzewem czerwono-czarnym do zliczania częstotliwości oraz testami jednostkowymi i raportem pokrycia kodu.",
    description:
      "Narzędzie wiersza poleceń do kompresji i dekompresji plików tekstowych oraz prostych plików binarnych. Pozwala konfigurować długość łańcucha symboli, balansując między stopniem kompresji a wydajnością.",
    highlights: [
      "Drzewo czerwono-czarne do zliczania symboli — operacje w czasie O(log n).",
      "Konfigurowalna długość łańcucha znaków (parametr -l) i obsługa plików binarnych (ISO_8859_1).",
      "Buforowane strumienie wejścia/wyjścia ograniczające liczbę operacji I/O.",
      "Testy jednostkowe w JUnit 5 i raporty pokrycia JaCoCo; budowanie w Maven.",
    ],
    tech: ["Java 24", "Maven", "JUnit 5", "JaCoCo", "Struktury danych"],
    images: [],
    links: {
      repo: "https://github.com/mat787/huffman-compressor",
      demo: null,
    },
  },
];

/**
 * Grupy umiejętności. Kliknięcie umiejętności filtruje projekty, w których
 * występuje — dlatego nazwy w `tech` projektów i tutaj powinny być spójne
 * (porównanie jest nieczułe na wielkość liter).
 */
export const skillGroups = [
  {
    id: "languages",
    title: "Języki programowania",
    items: ["Python", "SQL", "R", "Java"],
  },
  {
    id: "data-ml",
    title: "Dane i uczenie maszynowe",
    items: ["Pandas", "NumPy", "Scikit-learn", "Isolation Forest", "LLM / RAG"],
  },
  {
    id: "storage",
    title: "Bazy danych i infrastruktura",
    items: ["PostgreSQL", "pgvector", "SQLite", "Docker", "Maven"],
  },
  {
    id: "viz",
    title: "Wizualizacja i aplikacje",
    items: ["Streamlit", "Matplotlib", "Seaborn", "FastAPI", "QGIS"],
  },
];

/**
 * Oś czasu. type: "work" | "education" | "community"
 * Kolejność = kolejność wyświetlania (od najnowszych).
 */
export const timeline = [
  {
    type: "work",
    period: "10.2026 – obecnie",
    title: "Junior Data Analyst",
    org: "REDS S.A.",
    description:
      "Analiza danych operacyjnych kolei w SQL, wizualizacje 2D/3D w R oraz optymalizacja rozkładu rezerw czasowych między przystankami.",
    tags: ["SQL", "R", "Szeregi czasowe"],
  },
  {
    type: "community",
    period: "10.2026 – obecnie",
    title: "Tech Ambassador",
    org: "EY",
    description:
      "Organizacja i promocja wydarzeń technologicznych dla studentów Politechniki Warszawskiej.",
    tags: ["Wydarzenia", "Komunikacja"],
  },
  {
    type: "community",
    period: "02.2026 – obecnie",
    title: "Core Team",
    org: "GDG on Campus WUT",
    description:
      "Logistyka wydarzeń dla ponad 80 osób, planowanie budżetu i koordynacja pracy zespołu.",
    tags: ["Organizacja", "Budżet", "Praca zespołowa"],
  },
  {
    type: "education",
    period: "2024 – 2028",
    title: "Informatyka stosowana",
    org: "Politechnika Warszawska",
    description:
      "Specjalizacja: Inżynieria Danych i Multimedia. Średnia ocen: 4,22 / 5,0.",
    tags: ["Inżynieria danych", "Multimedia"],
  },
];

export const timelineFilters = [
  { id: "all", label: "Wszystko" },
  { id: "work", label: "Doświadczenie" },
  { id: "education", label: "Edukacja" },
  { id: "community", label: "Działalność" },
];
