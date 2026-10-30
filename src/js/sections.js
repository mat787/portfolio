import { contact, profile, projects, skillGroups, timeline, timelineFilters } from "../data/content.js";
import { $, $$, asset, esc, icons, showToast, socialIcon } from "./utils.js";

const typeLabels = { work: "Doświadczenie", education: "Edukacja", community: "Działalność" };

export function renderHero() {
  const root = $("[data-hero]");
  const visibleProjects = projects.filter((project) => !project.hidden);
  const topTech = ["Python", "SQL", "Scikit-learn", "PostgreSQL", "R"];

  root.innerHTML = `
    <div class="container hero-grid">
      <div class="hero-copy">
        <p class="status-pill" data-reveal>
          <span class="status-dot" aria-hidden="true"></span>${esc(profile.availability)}
        </p>
        <h1 id="hero-title" data-reveal style="--i:1">
          <span class="hero-name">${esc(profile.name)}</span>
          <span class="hero-role">${esc(profile.role)}</span>
        </h1>
        <p class="hero-tagline" data-reveal style="--i:2">${esc(profile.tagline)}</p>
        <p class="hero-intro" data-reveal style="--i:3">${esc(profile.intro)}</p>
        <div class="hero-actions" data-reveal style="--i:4">
          <a class="btn btn-primary" href="#projects">Zobacz projekty ${icons.arrowDown}</a>
          <a class="btn btn-secondary" href="#contact">Skontaktuj się</a>
          ${
            profile.cvUrl
              ? `<a class="btn btn-ghost" href="${esc(asset(profile.cvUrl))}" download>${icons.download} Pobierz CV</a>`
              : ""
          }
        </div>
        <ul class="hero-socials" data-reveal style="--i:5" aria-label="Profile online">
          ${contact.links
            .map(
              (link) =>
                `<li><a class="social-link" href="${esc(link.url)}" target="_blank" rel="noopener noreferrer" aria-label="${esc(link.label)} (otwiera się w nowej karcie)">${socialIcon(link.label)}<span>${esc(link.label)}</span></a></li>`,
            )
            .join("")}
          <li><a class="social-link" href="mailto:${esc(contact.email)}">${icons.mail}<span>E-mail</span></a></li>
        </ul>
      </div>

      <div class="hero-visual" data-reveal style="--i:3" aria-hidden="true">
        <div class="viz-card">
          <div class="viz-head">
            <span class="viz-dots"><i></i><i></i><i></i></span>
            <span class="viz-title">analysis.ipynb</span>
          </div>
          <svg class="viz-chart" viewBox="0 0 360 170" preserveAspectRatio="none">
            <defs>
              <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stop-color="var(--accent)" stop-opacity=".28" />
                <stop offset="1" stop-color="var(--accent)" stop-opacity="0" />
              </linearGradient>
            </defs>
            <g class="viz-grid">
              <path d="M0 34H360M0 85H360M0 136H360" />
            </g>
            <path class="viz-area" d="M0 130 C30 120 50 126 80 104 S130 96 160 76 S215 92 245 58 S310 44 360 22 V170 H0Z" fill="url(#areaFill)" />
            <path class="viz-line" pathLength="1" d="M0 130 C30 120 50 126 80 104 S130 96 160 76 S215 92 245 58 S310 44 360 22" />
            <circle class="viz-point" cx="245" cy="58" r="5" />
          </svg>
          <div class="viz-metrics">
            <div><span>${visibleProjects.length}</span><small>projekty</small></div>
            <div><span>${esc(profile.highlights[0].value)}</span><small>średnia</small></div>
            <div><span>${esc(profile.highlights[1].value)}</span><small>danych w ETL</small></div>
          </div>
          <div class="viz-tags">${topTech.map((tech) => `<span>${esc(tech)}</span>`).join("")}</div>
        </div>
      </div>
    </div>
    <a class="scroll-hint" href="#about" aria-label="Przewiń do sekcji O mnie">${icons.arrowDown}</a>
  `;
}

export function renderAbout() {
  const root = $("[data-about]");
  root.innerHTML = `
    <div class="container about-grid">
      <div class="about-copy">
        <div data-reveal>
          <p class="eyebrow">O mnie</p>
          <h2 id="about-title">Dane, które prowadzą do decyzji</h2>
        </div>
        ${profile.about.map((paragraph, index) => `<p data-reveal style="--i:${index + 1}">${esc(paragraph)}</p>`).join("")}
        <p class="about-location" data-reveal>${icons.pin}<span>${esc(profile.location)}</span></p>
      </div>
      <div class="about-side">
        ${
          profile.photo
            ? `<img class="about-photo" data-reveal src="${esc(asset(profile.photo))}" alt="Portret: ${esc(profile.name)}" width="480" height="560" loading="lazy" decoding="async" />`
            : ""
        }
        <ul class="stat-grid" aria-label="Najważniejsze liczby">
          ${profile.highlights
            .map(
              (item, index) => `
                <li class="stat" data-reveal style="--i:${index + 1}">
                  <strong>${esc(item.value)}</strong>
                  <span>${esc(item.label)}</span>
                </li>`,
            )
            .join("")}
        </ul>
      </div>
    </div>
  `;
}

export function renderSkills(onSkillSelect) {
  const root = $("[data-skills]");
  const techCount = (skill) =>
    projects.filter(
      (project) => !project.hidden && project.tech.some((tech) => tech.toLowerCase() === skill.toLowerCase()),
    ).length;

  root.innerHTML = `
    <div class="container">
      <div class="section-head" data-reveal>
        <p class="eyebrow">Umiejętności</p>
        <h2 id="skills-title">Narzędzia i technologie</h2>
        <p class="lead">Kliknij technologię, aby zobaczyć projekty, w których jej używałam.</p>
      </div>
      <div class="skill-grid">
        ${skillGroups
          .map(
            (group, index) => `
              <article class="skill-card" data-reveal style="--i:${index}">
                <h3>${esc(group.title)}</h3>
                <ul class="chip-list">
                  ${group.items
                    .map((skill) => {
                      const count = techCount(skill);
                      return count
                        ? `<li><button type="button" class="chip chip-action" data-skill="${esc(skill)}">${esc(skill)}<span class="chip-count" aria-hidden="true">${count}</span><span class="sr-only">— projekty: ${count}. Pokaż projekty</span></button></li>`
                        : `<li><span class="chip">${esc(skill)}</span></li>`;
                    })
                    .join("")}
                </ul>
              </article>`,
          )
          .join("")}
      </div>
    </div>
  `;

  $$("[data-skill]", root).forEach((button) =>
    button.addEventListener("click", () => onSkillSelect(button.dataset.skill)),
  );
}

export function renderTimeline() {
  const root = $("[data-timeline]");
  root.innerHTML = `
    <div class="container">
      <div class="section-head" data-reveal>
        <p class="eyebrow">Doświadczenie</p>
        <h2 id="timeline-title">Praca, edukacja i działalność</h2>
      </div>
      <div class="filters" role="group" aria-label="Filtruj oś czasu" data-timeline-filters>
        ${timelineFilters
          .map(
            (filter, index) =>
              `<button type="button" class="filter-chip" data-timeline-filter="${filter.id}" aria-pressed="${index === 0}">${esc(filter.label)}</button>`,
          )
          .join("")}
      </div>
      <ol class="timeline">
        ${timeline
          .map(
            (item, index) => `
              <li class="timeline-item" data-type="${item.type}" data-reveal style="--i:${Math.min(index, 4)}">
                <span class="timeline-icon" aria-hidden="true">${icons[item.type]}</span>
                <div class="timeline-card">
                  <div class="timeline-meta">
                    <span class="badge badge-${item.type}">${typeLabels[item.type]}</span>
                    <time>${esc(item.period)}</time>
                  </div>
                  <h3>${esc(item.title)} <span class="timeline-org">· ${esc(item.org)}</span></h3>
                  <p>${esc(item.description)}</p>
                  ${
                    item.tags?.length
                      ? `<ul class="chip-list chip-list-sm">${item.tags.map((tag) => `<li><span class="chip">${esc(tag)}</span></li>`).join("")}</ul>`
                      : ""
                  }
                </div>
              </li>`,
          )
          .join("")}
      </ol>
    </div>
  `;

  const buttons = $$("[data-timeline-filter]", root);
  const items = $$(".timeline-item", root);
  buttons.forEach((button) =>
    button.addEventListener("click", () => {
      const active = button.dataset.timelineFilter;
      buttons.forEach((other) => other.setAttribute("aria-pressed", String(other === button)));
      items.forEach((item) => {
        item.hidden = active !== "all" && item.dataset.type !== active;
      });
    }),
  );
}

export function renderContact() {
  const root = $("[data-contact]");
  root.innerHTML = `
    <div class="container contact-grid">
      <div class="contact-copy" data-reveal>
        <p class="eyebrow">Kontakt</p>
        <h2 id="contact-title">${esc(contact.heading)}</h2>
        <p class="lead">${esc(contact.text)}</p>
        <div class="contact-email">
          <a class="email-link" href="mailto:${esc(contact.email)}">${icons.mail}<span>${esc(contact.email)}</span></a>
          <button type="button" class="btn btn-ghost btn-sm" data-copy-email>${icons.copy} Kopiuj</button>
        </div>
        <ul class="contact-links">
          ${contact.links
            .map(
              (link) =>
                `<li><a class="contact-link" href="${esc(link.url)}" target="_blank" rel="noopener noreferrer">${socialIcon(link.label)}<span><strong>${esc(link.label)}</strong><small>${esc(link.handle)}</small></span>${icons.external}</a></li>`,
            )
            .join("")}
        </ul>
      </div>

      <form class="contact-form" data-reveal style="--i:2" data-contact-form>
        <h3>Napisz wiadomość</h3>
        <label>
          <span>Imię i nazwisko</span>
          <input name="name" type="text" autocomplete="name" required />
        </label>
        <label>
          <span>Twój e-mail</span>
          <input name="from" type="email" autocomplete="email" required />
        </label>
        <label>
          <span>Wiadomość</span>
          <textarea name="message" rows="5" required></textarea>
        </label>
        <button class="btn btn-primary" type="submit">Otwórz w programie pocztowym ${icons.arrowRight}</button>
        <p class="form-note">Formularz przygotuje wiadomość w Twoim programie pocztowym — dane nie są nigdzie wysyłane ani zapisywane.</p>
      </form>
    </div>
  `;

  $("[data-copy-email]", root).addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
      showToast("Skopiowano adres e-mail");
    } catch {
      showToast(contact.email);
    }
  });

  $("[data-contact-form]", root).addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = `Wiadomość z portfolio — ${data.get("name")}`;
    const body = `${data.get("message")}\n\n—\n${data.get("name")}\n${data.get("from")}`;
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}

export function renderFooter() {
  const root = $("[data-footer]");
  root.innerHTML = `
    <div class="container footer-inner">
      <p>© ${new Date().getFullYear()} ${esc(profile.name)}</p>
      <ul class="footer-links">
        ${contact.links
          .map(
            (link) =>
              `<li><a href="${esc(link.url)}" target="_blank" rel="noopener noreferrer">${esc(link.label)}</a></li>`,
          )
          .join("")}
        <li><a href="mailto:${esc(contact.email)}">E-mail</a></li>
      </ul>
      <a class="to-top" href="#top">Do góry ↑</a>
    </div>
  `;
}
