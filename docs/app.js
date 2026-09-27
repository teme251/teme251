const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const projects = {
  forecast: {
    number: 'F1', title: 'US Field Recruitment Forecasting', summary: 'A hiring forecast and review tool.',
    kicker: 'AVIS BUDGET GROUP / PRIVATE EMPLOYER WORK',
    description: 'A hiring forecast and review tool with explainable outputs and a Flask interface.',
    build: 'Hiring forecasts and review views with explainable outputs and a Flask interface.',
    status: 'Employer project. Code and data are private.',
    links: [{ label: 'View GitHub project overview', href: 'https://github.com/teme251#ai-and-data-projects' }]
  },
  coaching: {
    number: 'F2', title: 'AI Coaching Dashboard Automation', summary: 'Performance signals for coaching workflows.',
    kicker: 'AVIS BUDGET GROUP / PRIVATE EMPLOYER WORK',
    description: 'A role-based prototype that brings performance signals into manager coaching workflows.',
    build: 'A role-based dashboard prototype for manager coaching workflows.',
    status: 'Employer project. Code and data are private.',
    links: [{ label: 'View GitHub project overview', href: 'https://github.com/teme251#ai-and-data-projects' }]
  },
  rsa: {
    number: '01', title: 'RSA performance tools', summary: 'Frontline scorecards and coaching views.',
    kicker: 'OPERATIONS SOFTWARE / PUBLIC PROTOTYPES',
    description: 'A set of related prototypes that turns operational observations into clearer scorecards, performance reporting, and coaching conversations.',
    build: 'Built with HTML, CSS, and JavaScript around sample data. The interfaces explore how a supervisor can move from an overall signal to a specific observation and next action.',
    status: 'Public prototypes use sample data. Employer systems and data are private.',
    links: [
      { label: 'RSA Monitor', href: 'https://github.com/teme251/rsa-monitor' },
      { label: 'RSA Ops Portal', href: 'https://github.com/teme251/rsa-ops-portal-v3' },
      { label: 'RSA Performance Metrics', href: 'https://github.com/teme251/RSA-PMS-v3' }
    ]
  },
  student: {
    number: '02', title: 'Student Performance Pattern Analysis', summary: 'Finding useful signals in student data.',
    kicker: 'APPLIED ML / DATA EXPLORATION',
    description: 'Student outcomes can hide several different patterns. This project studies the data with predictive modeling and unsupervised methods, then makes the findings explorable.',
    build: 'Python handles preparation and analysis, scikit-learn supports model experiments, and Streamlit provides an interactive view of the results.',
    approach: 'Prepare the dataset, compare model results, explore clusters of similar records, and flag unusual cases for closer inspection. Visualizations connect these outputs back to understandable student patterns.',
    challenge: 'A prediction, cluster, or outlier is only useful if it survives data-quality checks and can be interpreted without treating correlation as a cause.',
    evaluation: 'Compare model evaluation results, inspect whether clusters are meaningful, and review anomalies in context. The work presents patterns for exploration rather than a claim that a model determines a student’s outcome.',
    status: 'Applied ML portfolio project. A public source link is not included here; request a walkthrough of the implementation.',
    links: [{ label: 'Request a project walkthrough', href: 'mailto:pmtemesgen@icloud.com?subject=Project%20walkthrough' }]
  },
  crypto: {
    number: '03', title: 'Crypto ranking app + API', summary: 'A data pipeline turned into a usable dashboard.',
    kicker: 'SOFTWARE / DATA PRODUCT',
    description: 'A Flask dashboard and Python API for fetching, ranking, and presenting cryptocurrency data.',
    build: 'The application separates data retrieval and ranking logic from the presentation layer, then exposes results in a focused dashboard.',
    approach: 'A Python API retrieves and ranks market data. Flask presents the resulting list through a dashboard, keeping the ranking logic separate from the interface.',
    challenge: 'A ranking is only meaningful when the data is current, the ordering rule is understandable, and the interface makes changes easy to inspect.',
    evaluation: 'Check response behavior for missing or changing data, verify ranking order against known examples, and review whether the dashboard explains the result. This is a data product rather than a trained ML model.',
    status: 'Project overview. Contact me for an implementation walkthrough.',
    links: [{ label: 'Request a project walkthrough', href: 'mailto:pmtemesgen@icloud.com?subject=Project%20walkthrough' }]
  },
  foster: {
    number: '04', title: 'Foster caregiver AI support', summary: 'Answers shaped around a caregiver’s needs.',
    kicker: 'AI APPLICATION / SUPPORT TOOL',
    description: 'A chatbot prototype for foster-caregiver FAQs and tailored responses for Angels Among Us Pet Rescue.',
    build: 'The web experience makes common questions easier to ask and organizes useful answers around the caregiver’s immediate situation.',
    approach: 'A question-and-answer flow helps a caregiver describe the immediate concern and receive a response suited to that context. The interface is designed around common foster-care questions.',
    challenge: 'The assistant needs to be clear about what it knows, avoid confident guesses, and make it easy to seek human help when a situation is urgent or outside its scope.',
    evaluation: 'Review example caregiver questions for relevance, clarity, and unsafe or unsupported advice. This describes how to assess the prototype, not a measured production result.',
    status: 'Project overview. Contact me for an implementation walkthrough.',
    links: [{ label: 'Request a project walkthrough', href: 'mailto:pmtemesgen@icloud.com?subject=Project%20walkthrough' }]
  },
  maxfit: {
    number: '05', title: 'MaxFit AI chatbot', summary: 'A fitness-focused conversational prototype.',
    kicker: 'AI APPLICATION / CONVERSATIONAL UI',
    description: 'A fitness-focused question-and-answer chatbot prototype.',
    build: 'A conversational interface for asking fitness questions and receiving focused responses, with an emphasis on a simple user flow.',
    approach: 'The prototype takes a fitness question through a conversational interface and returns a focused answer with a short path for continuing the discussion.',
    challenge: 'A useful fitness assistant must understand the user’s question while avoiding overconfident, one-size-fits-all guidance.',
    evaluation: 'Test representative questions for relevance and consistency, and inspect where the assistant should ask for more context. This is a prototype, not a clinical or coaching product.',
    status: 'Prototype overview. Contact me for a walkthrough.',
    links: [{ label: 'Request a project walkthrough', href: 'mailto:pmtemesgen@icloud.com?subject=Project%20walkthrough' }]
  },
  qene: {
    number: '06', title: 'QENÉ & CODE', summary: 'A personal Ethiopian album in thirteen tracks.',
    kicker: 'CREATIVE AI / MUSIC + VISUALS',
    description: 'A 13-track AI-produced Ethiopian album shaped by personal stories, lyrics, and a visual world that joins heritage with technology.',
    build: 'I directed the writing, ideas, visual identity, lyric visuals, and release creative, using AI as a production instrument.',
    status: 'Released September 3, 2026 under the artist name Teme251.',
    links: [{ label: 'Explore the music page', href: 'music.html' }, { label: 'Listen on Apple Music', href: 'https://music.apple.com/album/6803089269' }, { label: 'Visit YouTube channel', href: 'https://www.youtube.com/channel/UCIlEJD_ez00ATB5yejwNp7w' }]
  }
};

const caseTabs = [...document.querySelectorAll('[data-case]')];
const casePanel = document.getElementById('case-panel');
function selectCase(key) {
  const project = projects[key];
  if (!project || !['forecast', 'coaching'].includes(key)) return;
  caseTabs.forEach(tab => {
    const active = tab.dataset.case === key;
    tab.classList.toggle('is-active', active);
    tab.setAttribute('aria-selected', String(active));
    tab.tabIndex = active ? 0 : -1;
  });
  casePanel.setAttribute('aria-labelledby', `case-tab-${key}`);
  casePanel.dataset.active = key;
  document.getElementById('console-count').textContent = key === 'forecast' ? '01 / 02' : '02 / 02';
  document.getElementById('console-title').textContent = project.title;
  document.getElementById('console-summary').textContent = project.description;
  document.getElementById('console-open').dataset.open = key;
}
caseTabs.forEach(tab => tab.addEventListener('click', () => selectCase(tab.dataset.case)));
document.querySelector('.console-tabs').addEventListener('keydown', event => {
  if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
  event.preventDefault();
  const next = caseTabs.find(tab => tab.getAttribute('aria-selected') !== 'true');
  next.focus(); selectCase(next.dataset.case);
});

document.querySelectorAll('.filter').forEach(button => button.addEventListener('click', () => {
  const filter = button.dataset.filter;
  document.querySelectorAll('.filter').forEach(item => {
    const active = item === button;
    item.classList.toggle('is-active', active);
    item.setAttribute('aria-pressed', String(active));
  });
  document.querySelectorAll('.project-card').forEach(card => {
    card.hidden = filter !== 'all' && card.dataset.category !== filter;
  });
}));

const dialog = document.getElementById('project-dialog');
let lastTrigger;
function openProject(key, trigger) {
  const project = projects[key];
  if (!project) return;
  lastTrigger = trigger;
  document.getElementById('dialog-kicker').textContent = project.kicker;
  document.getElementById('dialog-title').textContent = project.title;
  document.getElementById('dialog-summary').textContent = project.description;
  document.getElementById('dialog-build-label').textContent = project.approach ? 'WHAT I BUILT' : 'THE BUILD';
  document.getElementById('dialog-build').textContent = project.build;
  document.getElementById('dialog-status').textContent = project.status;
  const depth = document.getElementById('dialog-depth');
  depth.hidden = !project.approach;
  if (project.approach) {
    document.getElementById('dialog-approach').textContent = project.approach;
    document.getElementById('dialog-challenge').textContent = project.challenge;
    document.getElementById('dialog-evaluation').textContent = project.evaluation;
  }
  const links = document.getElementById('dialog-links');
  links.replaceChildren(...project.links.map(({ label, href }) => {
    const link = document.createElement('a');
    link.textContent = `${label} ↗`;
    link.href = href;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    return link;
  }));
  document.getElementById('project-permalink').href = `#case-${key}`;
  document.getElementById('copy-status').textContent = '';
  history.replaceState(null, '', `#case-${key}`);
  if (!dialog.open) dialog.showModal();
}
document.querySelectorAll('[data-open]').forEach(button => button.addEventListener('click', () => openProject(button.dataset.open, button)));
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
dialog.addEventListener('close', () => {
  if (location.hash.startsWith('#case-')) history.replaceState(null, '', '#featured');
  lastTrigger?.focus();
});
function openLinkedProject() {
  const key = location.hash.startsWith('#case-') ? location.hash.slice(6) : '';
  if (projects[key]) openProject(key, document.querySelector(`[data-open="${key}"]`));
}
window.addEventListener('hashchange', openLinkedProject);
openLinkedProject();
document.getElementById('copy-project-link').addEventListener('click', async () => {
  const status = document.getElementById('copy-status');
  try { await navigator.clipboard.writeText(location.href); status.textContent = 'Link copied'; }
  catch { status.textContent = 'Use the direct link or copy the address bar.'; }
});

const methodSteps = [
  { glyph: '01 ↗', title: 'Find the real problem.', body: 'Map the workflow, learn what the person needs to decide, and identify where data or software can make the work clearer.' },
  { glyph: '02 ◇', title: 'Make it usable.', body: 'Turn the insight into a focused prototype. Connect the data, logic, and interface so someone can actually act on the result.' },
  { glyph: '03 ↺', title: 'Learn from the result.', body: 'Test the flow, look for confusion, and improve the details that help the work make sense in practice.' }
];
const aboutStories = {
  engineer: { label: '01 / ENGINEER', text: 'I hold an M.S. in Software Engineering with an AI concentration from Kennesaw State University. I focus on taking data and AI ideas through to working software.' },
  operator: { label: '02 / OPERATOR', text: 'Leading teams taught me to look beyond a dashboard number. I design around the decisions people make, the time they have, and the clarity they need.' },
  creator: { label: '03 / CREATOR', text: 'I also make music and visual work as Teme251. QENÉ & CODE brings Ethiopian storytelling and AI-assisted production into a 13-track release.' }
};
const aboutTabs = [...document.querySelectorAll('[data-about]')];
const aboutPanel = document.getElementById('about-panel');
function selectAbout(key) {
  const story = aboutStories[key]; if (!story) return;
  aboutTabs.forEach(tab => { const active = tab.dataset.about === key; tab.classList.toggle('is-active', active); tab.setAttribute('aria-selected', String(active)); });
  aboutPanel.setAttribute('aria-labelledby', `about-tab-${key}`);
  document.getElementById('about-panel-index').textContent = story.label;
  document.getElementById('about-panel-text').textContent = story.text;
}
aboutTabs.forEach(tab => tab.addEventListener('click', () => selectAbout(tab.dataset.about)));
document.querySelector('.about-selector').addEventListener('keydown', event => {
  if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
  event.preventDefault();
  const current = aboutTabs.findIndex(tab => tab.getAttribute('aria-selected') === 'true');
  const next = aboutTabs[(current + (event.key === 'ArrowRight' ? 1 : aboutTabs.length - 1)) % aboutTabs.length];
  next.focus(); selectAbout(next.dataset.about);
});
const tabs = [...document.querySelectorAll('.method-tab')];
function activateStep(index) {
  tabs.forEach((tab, i) => {
    tab.classList.toggle('is-active', i === index);
    tab.setAttribute('aria-selected', String(i === index));
    tab.tabIndex = i === index ? 0 : -1;
  });
  const panel = document.querySelector('.method-content');
  const step = methodSteps[index];
  panel.id = `panel-${index + 1}`;
  panel.setAttribute('aria-labelledby', `tab-${index + 1}`);
  panel.querySelector('.method-glyph').textContent = step.glyph;
  panel.querySelector('h3').textContent = step.title;
  panel.querySelector('p').textContent = step.body;
}
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => activateStep(index));
  tab.addEventListener('keydown', event => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
    activateStep(next);
    tabs[next].focus();
  });
});
activateStep(0);

const themeButton = document.querySelector('.theme-toggle');
function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  themeButton.setAttribute('aria-pressed', String(theme === 'light'));
  themeButton.setAttribute('aria-label', `Switch to ${theme === 'light' ? 'dark' : 'light'} theme`);
  document.querySelector('meta[name="theme-color"]').content = theme === 'light' ? '#f2f3ef' : '#081522';
  try { localStorage.setItem('teme-portfolio-theme', theme); } catch (_) { /* Storage can be disabled. */ }
}
let savedTheme;
try { savedTheme = localStorage.getItem('teme-portfolio-theme'); } catch (_) { /* Storage can be disabled. */ }
setTheme(savedTheme === 'light' ? 'light' : 'dark');
themeButton.addEventListener('click', () => setTheme(document.documentElement.dataset.theme === 'light' ? 'dark' : 'light'));

const glow = document.querySelector('.cursor-glow');
if (window.matchMedia('(pointer: fine)').matches && !reducedMotion.matches) {
  document.addEventListener('pointermove', event => {
    glow.style.setProperty('--pointer-x', `${event.clientX}px`);
    glow.style.setProperty('--pointer-y', `${event.clientY}px`);
  }, { passive: true });
}
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile navigation keeps every section reachable.
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.getElementById('main-nav');
function closeMenu() { menuButton.setAttribute('aria-expanded', 'false'); navigation.classList.remove('is-open'); }
menuButton.addEventListener('click', () => { const open = menuButton.getAttribute('aria-expanded') !== 'true'; menuButton.setAttribute('aria-expanded', String(open)); navigation.classList.toggle('is-open', open); });
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape' && navigation.classList.contains('is-open')) { closeMenu(); menuButton.focus(); } });
