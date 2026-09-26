const projects = {
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
    number: '02', title: 'Student pattern analysis', summary: 'Finding useful signals in student data.',
    kicker: 'APPLIED ML / DATA EXPLORATION',
    description: 'An exploration of student data that combines preparation, visual analysis, model evaluation, clustering, and anomaly detection.',
    build: 'Python and scikit-learn support the analysis; Streamlit makes results explorable. The work emphasizes interpreting patterns instead of presenting model output without context.',
    status: 'Project overview. Ask for a walkthrough or visit GitHub for available code.',
    links: [{ label: 'View GitHub profile', href: 'https://github.com/teme251' }]
  },
  crypto: {
    number: '03', title: 'Crypto ranking app + API', summary: 'A data pipeline turned into a usable dashboard.',
    kicker: 'SOFTWARE / DATA PRODUCT',
    description: 'A Flask dashboard and Python API for fetching, ranking, and presenting cryptocurrency data.',
    build: 'The application separates data retrieval and ranking logic from the presentation layer, then exposes results in a focused dashboard.',
    status: 'Project overview. Visit GitHub for available code.',
    links: [{ label: 'View GitHub profile', href: 'https://github.com/teme251' }]
  },
  foster: {
    number: '04', title: 'Foster caregiver AI support', summary: 'Answers shaped around a caregiver’s needs.',
    kicker: 'AI APPLICATION / SUPPORT TOOL',
    description: 'A chatbot prototype for foster-caregiver FAQs and tailored responses for Angels Among Us Pet Rescue.',
    build: 'The web experience makes common questions easier to ask and organizes useful answers around the caregiver’s immediate situation.',
    status: 'Project overview. Visit GitHub for available code.',
    links: [{ label: 'View GitHub profile', href: 'https://github.com/teme251' }]
  },
  maxfit: {
    number: '05', title: 'MaxFit AI chatbot', summary: 'A fitness-focused conversational prototype.',
    kicker: 'AI APPLICATION / CONVERSATIONAL UI',
    description: 'A fitness-focused question-and-answer chatbot prototype.',
    build: 'A conversational interface for asking fitness questions and receiving focused responses, with an emphasis on a simple user flow.',
    status: 'Prototype overview. Visit GitHub for available code.',
    links: [{ label: 'View GitHub profile', href: 'https://github.com/teme251' }]
  },
  qene: {
    number: '06', title: 'QENÉ & CODE', summary: 'Music, visual identity, and AI-assisted creative work.',
    kicker: 'CREATIVE AI / MUSIC + VISUALS',
    description: 'A 13-track AI-assisted music and visual release with cover art, lyric visuals, and promotional creative.',
    build: 'The project connects sound, typography, visual language, and release assets into one coherent creative direction.',
    status: 'Creative project overview. Visit GitHub for additional work.',
    links: [{ label: 'View GitHub profile', href: 'https://github.com/teme251' }]
  }
};

const nodes = [...document.querySelectorAll('.node')];
const stage = document.querySelector('.hero-stage');
let selected = 'rsa';
let rotation;
let userSelected = false;
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

function selectProject(key, fromUser = false) {
  const project = projects[key];
  if (!project) return;
  selected = key;
  if (fromUser) { userSelected = true; stopRotation(); }
  nodes.forEach(node => {
    const active = node.dataset.project === key;
    node.classList.toggle('is-selected', active);
    node.setAttribute('aria-pressed', String(active));
  });
  document.getElementById('stage-number').textContent = `${project.number} / 06`;
  document.getElementById('stage-title').textContent = project.title;
  document.getElementById('stage-summary').textContent = project.summary;
  document.getElementById('stage-link').href = `#project-${key}`;
  stage.dataset.active = key;
}
function stopRotation() { clearInterval(rotation); rotation = undefined; }
function startRotation() {
  if (userSelected || reducedMotion.matches || document.hidden || rotation) return;
  rotation = setInterval(() => {
    const index = nodes.findIndex(node => node.dataset.project === selected);
    selectProject(nodes[(index + 1) % nodes.length].dataset.project);
  }, 4800);
}
nodes.forEach(node => node.addEventListener('click', () => selectProject(node.dataset.project, true)));
stage.addEventListener('mouseenter', stopRotation);
stage.addEventListener('mouseleave', startRotation);
stage.addEventListener('focusin', stopRotation);
stage.addEventListener('focusout', event => { if (!stage.contains(event.relatedTarget)) startRotation(); });
document.addEventListener('visibilitychange', () => document.hidden ? stopRotation() : startRotation());
reducedMotion.addEventListener?.('change', () => reducedMotion.matches ? stopRotation() : startRotation());
startRotation();

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
  document.getElementById('dialog-build').textContent = project.build;
  document.getElementById('dialog-status').textContent = project.status;
  const links = document.getElementById('dialog-links');
  links.replaceChildren(...project.links.map(({ label, href }) => {
    const link = document.createElement('a');
    link.textContent = `${label} ↗`;
    link.href = href;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    return link;
  }));
  dialog.showModal();
}
document.querySelectorAll('[data-open]').forEach(button => button.addEventListener('click', () => openProject(button.dataset.open, button)));
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
dialog.addEventListener('close', () => lastTrigger?.focus());

const methodSteps = [
  { glyph: '01 ↗', title: 'Find the real problem.', body: 'Map the workflow, learn what the person needs to decide, and identify where data or software can make the work clearer.' },
  { glyph: '02 ◇', title: 'Make it usable.', body: 'Turn the insight into a focused prototype. Connect the data, logic, and interface so someone can actually act on the result.' },
  { glyph: '03 ↺', title: 'Learn from the result.', body: 'Test the flow, look for confusion, and improve the details that help the work make sense in practice.' }
];
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
