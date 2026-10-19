(() => {
  document.querySelectorAll('.tip-toggle').forEach((button) => {
    button.addEventListener('click', () => {
      const card = button.closest('.tip-card');
      const body = card.querySelector('.tip-body');
      const isOpen = card.classList.toggle('is-open');
      button.setAttribute('aria-expanded', String(isOpen));
      button.querySelector('b').textContent = isOpen ? '−' : '+';
      body.hidden = !isOpen;
    });
  });
})();
