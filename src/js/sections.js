import {
  abilities,
  anomalyLog,
  contact,
  easter,
  marquee,
  profile,
  projects,
  skillGroups,
  timeline,
  timelineFilters,
} from "../data/content.js";
import { $, $$, esc, icons, showToast, socialIcon } from "./utils.js";

const visibleProjects = () => projects.filter((project) => !project.hidden);
const typeLabels = { work: "Praca", education: "Edukacja", community: "Działalność" };

const crosshairIcon =
  '<svg class="kill-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2v6M12 16v6M2 12h6M16 12h6"/><circle class="dot" cx="12" cy="12" r="1.8"/></svg>';

const secTag = (number, label) => `<p class="sec-tag"><b>[${number}]</b> // ${esc(label)}</p>`;

export function renderLiveBar() {
  const root = $("[data-live-bar]");
  const run = marquee.map((text) => `<span>${esc(text)}</span>`).join("");
  root.innerHTML = `
    <div class="live-tag"><i></i>LIVE</div>
    <div class="live-track"><div class="live-run" data-live-run>${run}${run}${run}${run}</div></div>
  `;
}

export function renderHero() {
  const root = $("[data-hero]");
  const [first, ...rest] = profile.name.split(" ");
  const last = rest.join(" ");

  root.innerHTML = `
    <div class="container">
      <div class="hero-bar" data-reveal>
        <span class="hud-label hero-select">Agent select</span>
        <span class="hud-label">Sezon 2026 · PL</span>
      </div>

      <div class="hero-grid">
        <div class="hero-copy">
          <p class="hud-label" data-reveal style="color:var(--accent-ink)">
            AGENT: ${esc(profile.agentName)} // ROLA: ${esc(profile.agentRole)}
          </p>
          <h1 id="hero-title" class="glitch" data-reveal style="--i:1">
            <span class="name-line" data-text="${esc(first)}">${esc(first)}</span>
            <span class="name-line" data-text="${esc(last)}">${esc(last)}</span>
          </h1>
          <p class="hero-role" data-reveal style="--i:2">${esc(profile.role)} <span>· REDS S.A.</span></p>
          <p class="hero-intro" data-reveal style="--i:3">${esc(profile.intro)}</p>
          <p class="hero-looking" data-reveal style="--i:3"><b>▸</b> ${esc(profile.lookingFor)}</p>
          <div class="hero-actions" data-reveal style="--i:4">
            <a class="btn btn-primary" href="#projects">Zobacz projekty ${icons.arrowRight}</a>
            <a class="btn" href="#contact">Wyślij invite</a>
            ${
              profile.cvUrl
                ? `<a class="btn btn-ghost" href="${esc(profile.cvUrl)}" download>${icons.download} Pobierz CV</a>`
                : ""
            }
          </div>
        </div>

        <aside class="agent-card frame" data-reveal style="--i:2" aria-label="Karta agenta">
          <div class="agent-bar hud-label"><span>Agent 01 / 01</span><b>Selected</b></div>
          <div class="agent-scope" aria-hidden="true">
            <svg viewBox="0 0 200 200">
              <circle class="ring" cx="100" cy="100" r="96" />
              <circle class="ring ring-accent" cx="100" cy="100" r="80" />
              <circle class="ring" cx="100" cy="100" r="58" />
              <path class="tick" d="M100 0v14M100 186v14M0 100h14M186 100h14" />
              <text x="100" y="121" text-anchor="middle">MD</text>
              <circle class="ring" cx="150" cy="52" r="11" style="stroke:var(--alert)" />
              <circle class="dot" cx="150" cy="52" r="3.5" />
            </svg>
          </div>
          <dl class="agent-spec">
            <div><dt>Rola</dt><dd>${esc(profile.agentRole)}</dd></div>
            <div><dt>Klasa</dt><dd>Łowca anomalii</dd></div>
            <div><dt>Baza</dt><dd>${esc(profile.location.split(",")[0])}</dd></div>
            <div><dt>Status</dt><dd class="on">Open to work</dd></div>
          </dl>
        </aside>
      </div>

      <ul class="abilities" aria-label="Umiejętności agenta" data-reveal style="--i:3">
        ${abilities
          .map(
            (ability) => `
              <li class="ability frame ${ability.ult ? "ability-ult" : ""}" data-ability="${esc(ability.key)}">
                <span class="ability-key" aria-hidden="true">${esc(ability.key)}</span>
                <span class="ability-name">${esc(ability.name)}</span>
                <span class="ability-note">${esc(ability.note)}</span>
              </li>`,
          )
          .join("")}
      </ul>
    </div>
  `;
}

export function renderAbout(onOpenProject) {
  const root = $("[data-about]");
  root.innerHTML = `
    <div class="container about-grid">
      <div class="about-lead" data-reveal>
        ${secTag("01", "Briefing")}
        <h2 id="about-title"><em>${esc(profile.aboutLead)}</em></h2>
      </div>
      <div class="about-text">
        ${profile.about.map((paragraph, index) => `<p data-reveal style="--i:${index}">${esc(paragraph)}</p>`).join("")}
        <div class="anomaly-log" role="list" aria-label="Dziennik anomalii">
          ${anomalyLog
            .map(
              (entry, index) => `
                <div class="anomaly" role="listitem" data-reveal style="--i:${index}">
                  <span class="anomaly-code">${esc(entry.code)}</span>
                  <p>${esc(entry.text)}</p>
                  ${
                    entry.project
                      ? `<button type="button" data-open-project="${esc(entry.project)}">Otwórz</button>`
                      : "<span></span>"
                  }
                </div>`,
            )
            .join("")}
        </div>
      </div>
    </div>
  `;

  $$("[data-open-project]", root).forEach((button) =>
    button.addEventListener("click", () => onOpenProject(button.dataset.openProject)),
  );
}

export function renderProjectsShell() {
  const root = $("[data-projects]");
  root.innerHTML = `
    <div class="container">
      <div class="loadout-head" data-reveal>
        <div>
          ${secTag("02", "Projekty")}
          <h2 id="projects-title">Loadout</h2>
        </div>
        <p class="lead">Wybierz kategorię albo kliknij kartę, żeby zobaczyć szczegóły i linki.</p>
      </div>
      <div class="filters" role="group" aria-label="Filtruj projekty" data-project-filters></div>
      <p class="filter-status" role="status" aria-live="polite" data-filter-status></p>
      <div class="project-grid" data-project-grid></div>
    </div>
  `;
}

export function renderSkills(onSkillSelect) {
  const root = $("[data-skills]");
  const projectsList = visibleProjects();

  const info = (skill) => {
    const key = skill.toLowerCase();
    const inProjects = projectsList.filter((project) => project.tech.some((tech) => tech.toLowerCase() === key));
    const inWork = timeline.filter((item) => item.tags?.some((tag) => tag.toLowerCase() === key));
    const where = [...inProjects.map((project) => project.title), ...inWork.map((item) => item.org)];
    return { count: inProjects.length, uses: inProjects.length + inWork.length, where };
  };

  const groups = skillGroups.map((group) => ({
    ...group,
    rows: group.items
      .map((skill, order) => ({ skill, order, ...info(skill) }))
      .sort((a, b) => b.uses - a.uses || a.order - b.order),
  }));
  const topCount = Math.max(...groups.flatMap((group) => group.rows.map((row) => row.uses)));
  let rank = 0;
  let mvpAssigned = false;

  root.innerHTML = `
    <div class="container">
      <div class="skills-head" data-reveal>
        <div>
          ${secTag("03", "Umiejętności")}
          <h2 id="skills-title">Tabela wyników</h2>
        </div>
        <p class="lead">Kliknij umiejętność, żeby odfiltrować projekty, w których grała.</p>
      </div>
      <div class="scoreboard frame" role="table" aria-label="Umiejętności i projekty, w których były użyte" data-reveal>
        <div class="sb-row sb-head" role="row">
          <span role="columnheader">#</span>
          <span role="columnheader">Umiejętność</span>
          <span role="columnheader" class="sb-where">Gdzie</span>
          <span role="columnheader" style="text-align:right">Użycie</span>
        </div>
        ${groups
          .map(
            (group) => `
              <div role="rowgroup">
                <div class="sb-row sb-team" role="row"><span role="cell"></span><span role="cell">Team // ${esc(group.title)}</span><span role="cell"></span><span role="cell"></span></div>
                ${group.rows
                  .map((row) => {
                    rank += 1;
                    const isMvp = !mvpAssigned && row.uses === topCount && row.uses > 0;
                    if (isMvp) mvpAssigned = true;
                    const pips = Array.from(
                      { length: 5 },
                      (_, index) => `<i class="${index < Math.min(row.uses, 5) ? "" : "off"}"></i>`,
                    ).join("");
                    const name = row.count
                      ? `<button type="button" data-skill="${esc(row.skill)}">${esc(row.skill)}<span class="sr-only"> — projekty: ${row.count}. Pokaż projekty</span></button>`
                      : esc(row.skill);
                    return `
                      <div class="sb-row is-skill ${row.count ? "is-link" : ""} ${isMvp ? "is-mvp" : ""}" role="row">
                        <span role="cell" class="sb-rank">${String(rank).padStart(2, "0")}</span>
                        <span role="cell" class="sb-name">${name}${isMvp ? '<span class="mvp-tag" aria-hidden="true">MVP</span>' : ""}</span>
                        <span role="cell" class="sb-where">${row.where.length ? esc(row.where.join(" · ")) : "—"}</span>
                        <span role="cell" class="sb-score"><span class="pips" aria-hidden="true">${pips}</span>${row.uses}</span>
                      </div>`;
                  })
                  .join("")}
              </div>`,
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
    <div class="container timeline-grid">
      <div class="feed-side" data-reveal>
        ${secTag("04", "Doświadczenie")}
        <h2 id="timeline-title">Kill feed</h2>
        <div class="filters" role="group" aria-label="Filtruj doświadczenie" data-timeline-filters>
          ${timelineFilters
            .map(
              (filter, index) =>
                `<button type="button" class="filter-chip" data-timeline-filter="${filter.id}" aria-pressed="${index === 0}">${esc(filter.label)}</button>`,
            )
            .join("")}
        </div>
      </div>
      <ol class="feed" aria-label="Doświadczenie i edukacja">
        ${timeline
          .map(
            (item, index) => `
              <li class="kill frame" data-type="${item.type}" data-reveal="feed" style="--i:${Math.min(index, 5)}">
                <div class="kill-line">
                  <span class="kill-who">${esc(profile.agentName)}</span>${crosshairIcon}
                  <span class="kill-org">${esc(item.org)}</span>
                  <span class="kill-role">${esc(item.title)}</span>
                </div>
                <div class="kill-body">
                  <p class="kill-meta"><span>${esc(item.period)}</span><span class="kill-type">${typeLabels[item.type]}</span></p>
                  <p>${esc(item.description)}</p>
                  ${
                    item.tags?.length
                      ? `<ul class="chip-list">${item.tags.map((tag) => `<li><span class="chip">${esc(tag)}</span></li>`).join("")}</ul>`
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
  const items = $$(".kill", root);
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
    <div class="container">
      <div class="lobby-head" data-reveal>
        ${secTag("05", "Kontakt")}
        <h2 id="contact-title">Zaproś<br /><span>do party</span></h2>
        <p class="lead">${esc(contact.text)}</p>
      </div>

      <ul class="party" aria-label="Skład party" data-reveal style="--i:1">
        <li class="slot frame is-host"><span class="slot-note">Host · 1/5</span><span class="slot-name">${esc(profile.agentName)}<br />${esc(profile.agentRole)}</span></li>
        <li class="slot frame is-you"><span class="slot-note">Slot 2 · czeka na Ciebie</span><span class="slot-name">Twoje miejsce</span></li>
        <li class="slot frame is-empty"><span class="slot-note">Slot 3</span><span class="slot-name">wolne</span></li>
        <li class="slot frame is-empty"><span class="slot-note">Slot 4</span><span class="slot-name">wolne</span></li>
        <li class="slot frame is-empty"><span class="slot-note">Slot 5</span><span class="slot-name">wolne</span></li>
      </ul>

      <div class="lobby-grid">
        <div data-reveal style="--i:1">
          <div class="contact-email">
            <a class="email-link" href="mailto:${esc(contact.email)}">${esc(contact.email)}</a>
            <button type="button" class="btn btn-sm" data-copy-email>${icons.copy} Kopiuj</button>
          </div>
          <ul class="friends" aria-label="Znajomi">
            ${contact.links
              .map(
                (link) =>
                  `<li><a class="friend" href="${esc(link.url)}" target="_blank" rel="noopener noreferrer">${socialIcon(link.label)}<span class="friend-text"><strong>${esc(link.label)}</strong><small>${esc(link.handle)}</small></span>${icons.external}</a></li>`,
              )
              .join("")}
          </ul>
        </div>

        <form class="contact-form frame" data-reveal style="--i:2" data-contact-form>
          <h3>Wyślij invite</h3>
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
            <textarea name="message" rows="5" required placeholder="Napisz coś, nie bądź NPC."></textarea>
          </label>
          <button class="btn btn-primary" type="submit">Wyślij invite ${icons.arrowRight}</button>
          <p class="form-note">Formularz przygotuje wiadomość w Twoim programie pocztowym. Dane nie są nigdzie wysyłane ani zapisywane.</p>
        </form>
      </div>
    </div>
  `;

  $("[data-copy-email]", root).addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
      showToast("Skopiowano adres e-mail. W");
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
    showToast("Invite gotowy. Dokończ w programie pocztowym");
  });
}

export function renderFooter() {
  const root = $("[data-footer]");
  root.innerHTML = `
    <div class="container footer-inner">
      <p>gg wp · © ${new Date().getFullYear()} ${esc(profile.name)}</p>
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

export const emptyFilterText = easter.emptyFilter;
