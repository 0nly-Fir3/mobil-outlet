(() => {
  const menuButton = document.querySelector('.menu-toggle');
  const mainNav = document.querySelector('.main-nav');
  const form = document.querySelector('#repair-form');
  const status = document.querySelector('#form-status');
  const year = document.querySelector('#year');

  if (year) year.textContent = new Date().getFullYear();

  if (menuButton && mainNav) {
    menuButton.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', String(isOpen));
      menuButton.setAttribute('aria-label', isOpen ? 'Stäng menyn' : 'Öppna menyn');
    });
    mainNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('open');
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.setAttribute('aria-label', 'Öppna menyn');
      });
    });
  }

  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const data = new FormData(form);
      const subject = `Reparationsförfrågan – ${String(data.get('model') || '').trim()}`;
      const lines = [
        'Hej Mobil Outlet,',
        '',
        'Jag vill fråga om en reparation.',
        '',
        `Namn: ${data.get('name')}`,
        `Telefon: ${data.get('phone')}`,
        `Mobilmodell: ${data.get('model')}`,
        `Problem: ${data.get('issue')}`,
        `E-post: ${data.get('email')}`,
        `Beskrivning: ${data.get('details') || 'Ingen extra beskrivning.'}`,
        '',
        'Vänligen återkom med information om pris och nästa steg.',
      ];
      const mailto = `mailto:info@mobil-outlet.se?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`;
      if (status) status.textContent = 'Ditt e-postprogram öppnas med förfrågan ifylld. Kontrollera meddelandet och skicka det därifrån.';
      window.location.href = mailto;
    });
  }

  const sellForm = document.querySelector('#sell-form');
  const sellModelPicker = document.querySelector('.sell-model-picker');
  const sellDetails = document.querySelector('#sell-details');
  const sellResult = document.querySelector('#sell-result');
  const sellQuestionPanel = document.querySelector('#sell-question-panel');
  const sellStepNumber = document.querySelector('#sell-step-number');
  const sellQuestionType = document.querySelector('#sell-question-type');
  const sellProgress = document.querySelector('#sell-progress');
