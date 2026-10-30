/**
 * ============================================================
 *  TREŚĆ PORTFOLIO — TO JEST GŁÓWNY PLIK DO EDYCJI
 * ============================================================
 *  Teksty, projekty, umiejętności, oś czasu i linki pochodzą z tego pliku.
 *
 *  Ściągawka:
 *  - Live demo projektu:  `links.demo` (np. "https://moja-aplikacja.streamlit.app").
 *    Dopóki jest `null`, przycisk pokazuje się jako „Demo wkrótce".
 *  - Repozytorium: `links.repo`.
 *  - Zrzuty ekranu: wrzuć plik do `public/projects/` i dopisz do `images`
 *    (ścieżka względna: "projects/plik.webp").
 *  - Ukrycie projektu: `hidden: true`.
 *  - Rzadkość karty: `rarity` = "mythic" | "legendary" | "epic" | "rare" | "common".
 *  - CV do pobrania: PDF do `public/`, potem `profile.cvUrl = "cv.pdf"`.
 *  - Numer telefonu celowo NIE jest publikowany.
 *
 *  Warstwa „brainrot" (marquee, podpisy, easter eggi) jest na dole pliku
 *  i jest czysto dekoracyjna — merytoryczne opisy są osobno.
 */

export const site = {
  title: "Matylda Drapich — Data / ML",
  lang: "pl",
};

export const profile = {
  name: "Matylda Drapich",
  agentName: "MATYLDA",
  role: "Junior Data Analyst",
  agentRole: "DATA / ML",
  lookingFor: "Szukam: staż / junior Data / ML · Warszawa",
  intro:
    "Studentka informatyki stosowanej na Politechnice Warszawskiej, Junior Data Analyst w REDS S.A. Zajmuję się wykrywaniem anomalii: w danych zdrowotnych, kolejowych i na zdjęciach chorych roślin.",
  location: "Warszawa, Polska",
  // Wpisz np. "cv.pdf" (plik w katalogu public/), aby pokazać przycisk „Pobierz CV".
  cvUrl: null,
  aboutLead: "Szukam tego, co nie pasuje do wzorca.",
  about: [
    "Studiuję informatykę stosowaną na Politechnice Warszawskiej (specjalizacja: Inżynieria Danych i Multimedia). W REDS S.A. analizuję dane operacyjne kolei w SQL i R. Poza pracą buduję modele, które wyłapują odchylenia: od tętna z Apple Watch po liście z objawami choroby.",
    "Działam też w społeczności: Core Team GDG on Campus WUT i Tech Ambassador w EY.",
  ],
};

/** „Umiejętności agenta" w hero — klawisze Q / E / C / X. */
export const abilities = [
  { key: "Q", name: "Python", note: "główna broń. no cap" },
  { key: "E", name: "SQL", note: "wchodzi w każdą bazę" },
  { key: "C", name: "Machine Learning", note: "trenuje, klasyfikuje, ocenia" },
  { key: "X", name: "Anomaly Detection", note: "znajduje to, co nie pasuje", ult: true },
];

/** Dziennik anomalii w sekcji „O mnie" — wspólny motyw trzech obszarów. */
export const anomalyLog = [
  {
    code: "ZDROWIE",
    text: "Isolation Forest na ponad 700 MB danych Apple Health: wykrywanie nietypowych wzorców tętna.",
    project: "health-analyzer",
  },
  {
    code: "KOLEJE",
    text: "REDS S.A.: dane operacyjne kolei w SQL, wizualizacje 2D/3D w R, optymalizacja rezerw czasowych między przystankami.",
    project: null,
  },
  {
    code: "UPRAWY",
    text: "Mbewu AI: fine-tuning Vision Transformera na afrykańskich danych o chorobach roślin.",
    project: "mbewu-ai",
  },
];

export const contact = {
  heading: "Zaproś do party",
  text: "Szukam stażu i pierwszej roli w Data / ML. Jeśli budujecie coś z danymi, napisz.",
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
 * status: "done" | "in-progress"
 * rarity: "mythic" | "legendary" | "epic" | "rare" | "common"
 * flavor: dekoracyjny podpis rzadkości (brainrot) — pokazuje się w tooltipie i w oknie projektu
 * featured: true → karta na całą szerokość (coverLabel/coverNote = napis na okładce, gdy nie ma zrzutów)
 * links.repo / links.demo: adres URL albo null (null = „wkrótce")
 * images: [{ src, alt, caption? }] — pierwszy obraz jest okładką karty
 */
export const projects = [
  {
    id: "mbewu-ai",
    title: "Mbewu AI",
    subtitle: "BCG Platinion Hackathon 2026, Frankfurt — Top 7",
    year: "2026",
    status: "done",
    rarity: "mythic",
    flavor: "Top 7 we Frankfurcie. it's giving finalistka.",
    featured: true,
    coverLabel: "TOP 7",
    coverNote: "BCG Platinion Hackathon 2026 · Frankfurt",
    categories: ["ml", "software"],
    summary:
      "Aplikacja offline na Raspberry Pi, która wykrywa choroby upraw i ocenia gotowość do zbioru. Zbudowana dla rolników w Malawi. Mój wkład: moduł ML.",
    description:
      "Mbewu AI powstało na BCG Platinion Hackathon 2026 we Frankfurcie, gdzie zespół zajął miejsce w pierwszej siódemce. To aplikacja działająca offline na Raspberry Pi, bo rolnicy w Malawi nie mogą liczyć na stałe łącze. Wykrywa choroby upraw i podpowiada, czy plon jest gotowy do zbioru. Odpowiadałam za moduł uczenia maszynowego.",
    highlights: [
      "Moduł ML: fine-tuning Vision Transformera na afrykańskich danych o chorobach roślin.",
      "Działanie offline na Raspberry Pi — bez dostępu do internetu w polu.",
      "Dwa zastosowania: wykrywanie chorób upraw i ocena gotowości do zbioru.",
      "Wynik: Top 7 na BCG Platinion Hackathon 2026 (Frankfurt).",
    ],
    tech: ["Python", "Vision Transformer", "Fine-tuning", "Raspberry Pi", "Computer Vision"],
    images: [],
    links: {
      repo: null,
      demo: null,
    },
  },
  {
    id: "health-analyzer",
    title: "HealthAnalyzer",
    subtitle: "Anomalie w danych Apple Health",
    year: "2026",
    status: "done",
    rarity: "legendary",
    flavor: "700 MB danych i zero paniki. no cap.",
    categories: ["data-engineering", "ml", "analysis"],
    summary:
      "Pipeline ETL dla ponad 700 MB eksportu Apple Health, dashboard w Streamlit i wykrywanie nietypowych wzorców fizjologicznych modelem Isolation Forest.",
    description:
      "Aplikacja przetwarza surowy eksport XML z iPhone'a i Apple Watch, normalizuje dane i pozwala eksplorować je w interaktywnym dashboardzie. Nienadzorowany model Isolation Forest wskazuje nietypowe zachowania organizmu, np. tachykardię spoczynkową.",
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
    id: "jobradar",
    title: "JobRadar",
    subtitle: "Dopasowywanie ofert pracy do CV",
    year: "2026",
    status: "in-progress",
    rarity: "epic",
    flavor: "W trakcie craftowania. lowkey cooking.",
    categories: ["data-engineering", "ml"],
    summary:
      "Platforma, która zbiera oferty IT, porządkuje je w bazie danych i ma dopasowywać je do CV kandydata z użyciem embeddingów i lokalnego modelu językowego.",
    description:
      "JobRadar łączy inżynierię danych z NLP. Skraper pobiera oferty pracy i rozbija je na ustrukturyzowane sekcje, dane trafiają do PostgreSQL, a kolejne etapy obejmują deduplikację i wyszukiwanie semantyczne z użyciem pgvector. Całość działa lokalnie w Dockerze, bez kosztów zewnętrznych API.",
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
    id: "breast-cancer-classification",
    title: "Klasyfikacja nowotworów piersi",
    subtitle: "Analiza diagnostyczna i modele predykcyjne",
    year: "2026",
    status: "done",
    rarity: "rare",
    flavor: "Recall > accuracy. sigma decision.",
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
    rarity: "common",
    flavor: "Common, ale działa. W.",
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
    tech: ["Java", "Maven", "JUnit 5", "JaCoCo", "Struktury danych"],
    images: [],
    links: {
      repo: "https://github.com/mat787/huffman-compressor",
      demo: null,
    },
  },
];

/**
 * Grupy umiejętności (tabela wyników). Kliknięcie umiejętności filtruje projekty,
 * w których występuje — dlatego nazwy w `tech` projektów i tutaj powinny być spójne
 * (porównanie jest nieczułe na wielkość liter).
 */
export const skillGroups = [
  {
    id: "languages",
    title: "Języki",
    items: ["Python", "SQL", "R", "Java"],
  },
  {
    id: "data-ml",
    title: "Dane i ML",
    items: [
      "Pandas",
      "NumPy",
      "Scikit-learn",
      "Isolation Forest",
      "Vision Transformer",
      "Fine-tuning",
      "LLM / RAG",
    ],
  },
  {
    id: "storage",
    title: "Bazy i infrastruktura",
    items: ["PostgreSQL", "pgvector", "SQLite", "Docker", "Raspberry Pi", "Maven"],
  },
  {
    id: "viz",
    title: "Wizualizacja i aplikacje",
    items: ["Streamlit", "Matplotlib", "Seaborn", "FastAPI", "QGIS"],
  },
];

/**
 * Oś czasu (kill feed). type: "work" | "education" | "community"
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
  { id: "work", label: "Praca" },
  { id: "education", label: "Edukacja" },
  { id: "community", label: "Działalność" },
];

/* ============================================================
 *  WARSTWA OZDOBNA („brainrot") — nie zawiera informacji o projektach
 * ============================================================ */

/** Przewijający się pasek „live" na górze strony. */
export const marquee = [
  "status: aura farming",
  "currently: wykrywam anomalie",
  "no cap ten Isolation Forest działa",
  "szukam teamu: staż / junior Data · ML",
  "6 7",
  "it's giving Top 7",
  "lowkey kocham czyszczenie danych",
  "W",
];

export const easter = {
  /** Rekord „Matyldy" w ukrytym aim trainerze (do edycji). */
  aimBenchmark: { hits: 31, accuracy: 94 },
  aimSeconds: 30,
  aimComments: {
    above: ["aura +∞. sigma, no cap.", "highkey cheater. kto Ci to pozwolił?", "it's giving MVP. W."],
    close: ["prawie. lowkey blisko.", "solidne W, ale Matylda patrzy.", "nie NPC, ale jeszcze nie sigma."],
    below: ["cooked.", "it's giving NPC.", "L. ale trening czyni mistrza."],
  },
  /** Teksty pustych stanów i 404. */
  emptyFilter: "0 wyników. cooked.",
};
