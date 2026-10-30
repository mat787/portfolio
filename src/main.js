import "@fontsource-variable/inter";
import "@fontsource-variable/jetbrains-mono";
import "@fontsource/rajdhani/latin-600.css";
import "@fontsource/rajdhani/latin-700.css";
import "@fontsource/rajdhani/latin-ext-600.css";
import "@fontsource/rajdhani/latin-ext-700.css";
import "./styles/base.css";
import "./styles/layout.css";
import "./styles/cards.css";
import "./styles/fx.css";

import { site } from "./data/content.js";
import { initAim } from "./js/aim.js";
import { initSoundToggle } from "./js/audio.js";
import { initCursor } from "./js/cursor.js";
import { initEggs } from "./js/eggs.js";
import { filterByTech, initProjects, openProject } from "./js/projects.js";
import {
  renderAbout,
  renderContact,
  renderFooter,
  renderHero,
  renderLiveBar,
  renderProjectsShell,
  renderSkills,
  renderTimeline,
} from "./js/sections.js";
import { initTrain } from "./js/train.js";
import { initHeader, initReveal, initTheme } from "./js/ui.js";

document.title = site.title;
document.documentElement.lang = site.lang;

renderLiveBar();
renderHero();
renderAbout(openProject);
renderProjectsShell();
renderSkills(filterByTech);
renderTimeline();
renderContact();
renderFooter();

initTheme();
initSoundToggle();
initHeader();
initProjects();
initReveal();
initCursor();
initAim();
initEggs();
initTrain();

document.documentElement.classList.remove("pre");
