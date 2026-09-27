// Preserve links shared before the portfolio was split into pages.
const oldProjects = ['forecast','coaching','rsa','student','crypto','foster','maxfit'];
function routeLegacyLink() {
  const key = location.hash.replace('#case-', '');
  if (location.hash.startsWith('#case-') && oldProjects.includes(key)) location.replace(`project-${key}.html`);
  else if (location.hash === '#case-qene' || location.hash === '#qene') location.replace('music.html');
  else if (['#about','#education','#method'].includes(location.hash) && !location.pathname.endsWith('background.html')) location.replace('background.html' + (location.hash === '#education' ? '#education' : ''));
  else if (location.hash === '#work') location.replace('projects.html');
  else if (location.hash === '#contact') location.replace('mailto:pmtemesgen@icloud.com');
}
routeLegacyLink();
window.addEventListener('hashchange', routeLegacyLink);
document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('[data-filter]').forEach(item => {
    const active = item === button;
    item.classList.toggle('active', active);
    item.setAttribute('aria-pressed', String(active));
  });
  document.querySelectorAll('[data-group]').forEach(group => { group.hidden = button.dataset.filter !== 'all' && group.dataset.group !== button.dataset.filter; });
}));
document.querySelectorAll('.share-button').forEach(button => button.addEventListener('click', async () => {
  const status = button.parentElement.querySelector('.share-status');
  try { await navigator.clipboard.writeText(location.href); status.textContent = 'Project link copied.'; }
  catch { status.textContent = `Share this address: ${location.href}`; }
}));
