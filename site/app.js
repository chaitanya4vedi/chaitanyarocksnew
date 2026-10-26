const buttons = [...document.querySelectorAll('[data-filter]')];
buttons.forEach(button => button.addEventListener('click', () => {
  const filter = button.dataset.filter;
  buttons.forEach(item => { const active = item === button; item.classList.toggle('active', active); item.setAttribute('aria-pressed', String(active)); });
  document.querySelectorAll('.project').forEach(card => { card.hidden = filter !== 'all' && card.dataset.category !== filter; });
  document.querySelector('.more-work').hidden = filter === 'product';
}));
const dialog = document.querySelector('#review-dialog');
document.querySelectorAll('[data-review-open]').forEach(button => button.addEventListener('click', () => dialog.showModal()));
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) { const rect = dialog.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close(); } });
document.querySelector('#copy-password').addEventListener('click', async () => { try { await navigator.clipboard.writeText('ExploreMyWork26!'); document.querySelector('#copy-status').textContent = 'Password copied.'; } catch { document.querySelector('#copy-status').textContent = 'Select the password above to copy it.'; } });
// Availability is a public read-only check. A paused demo keeps its request page available.
const checked = new WeakSet();
const check = async card => {
  if (checked.has(card)) return; checked.add(card);
  const badge = card.querySelector('.demo-status');
  try {
    const response = await fetch(card.dataset.host + '/__demo/status', {signal: AbortSignal.timeout(7000), cache:'no-store'});
    if (!response.ok) return;
    const data = await response.json(); badge.textContent = data.online ? 'Available now' : 'Request a viewing'; badge.classList.add(data.online ? 'online' : 'paused');
  } catch { badge.textContent = 'Laptop demo'; }
};
if ('IntersectionObserver' in window) { const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { check(entry.target); observer.unobserve(entry.target); } }), {rootMargin:'120px'}); document.querySelectorAll('.project[data-host]').forEach(card => observer.observe(card)); }
// Retire the old portfolio's offline cache so it cannot keep serving the outdated design.
if ('serviceWorker' in navigator) { navigator.serviceWorker.getRegistrations().then(registrations => registrations.forEach(registration => registration.update().catch(() => {}))).catch(() => {}); }
