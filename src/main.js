import "@fontsource-variable/inter";
import "@fontsource-variable/jetbrains-mono";
import "./styles/main.css";

import { site } from "./data/content.js";
import { filterByTech, initProjects } from "./js/projects.js";
import { renderAbout, renderContact, renderFooter, renderHero, renderSkills, renderTimeline } from "./js/sections.js";
import { initHeader, initReveal, initTheme } from "./js/ui.js";

document.title = site.title;
document.documentElement.lang = site.lang;

renderHero();
renderAbout();
renderSkills(filterByTech);
renderTimeline();
renderContact();
renderFooter();

initTheme();
initHeader();
initProjects();
initReveal();

document.documentElement.classList.remove("pre");
