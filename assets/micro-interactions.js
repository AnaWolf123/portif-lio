(() => {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches || !matchMedia('(pointer: fine)').matches) return;

  document.querySelectorAll('.project-pin').forEach(card => {
    card.addEventListener('pointermove', event => {
      const bounds = card.getBoundingClientRect();
      card.style.setProperty('--spot-x', `${event.clientX - bounds.left}px`);
      card.style.setProperty('--spot-y', `${event.clientY - bounds.top}px`);
    });
    card.addEventListener('pointerleave', () => {
      card.style.removeProperty('--spot-x');
      card.style.removeProperty('--spot-y');
    });
  });

  document.querySelectorAll('.primary, .nav-contact, .dialog-visit').forEach(link => {
    link.addEventListener('pointermove', event => {
      const bounds = link.getBoundingClientRect();
      const x = (event.clientX - bounds.left - bounds.width / 2) * 0.12;
      const y = (event.clientY - bounds.top - bounds.height / 2) * 0.12;
      link.style.setProperty('--mag-x', `${x}px`);
      link.style.setProperty('--mag-y', `${y}px`);
    });
    link.addEventListener('pointerleave', () => {
      link.style.removeProperty('--mag-x');
      link.style.removeProperty('--mag-y');
    });
  });
})();
