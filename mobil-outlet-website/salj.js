(() => {
  const form = document.querySelector('#sell-form');
  const modelStep = document.querySelector('#model-step');
  const questionStep = document.querySelector('#question-step');
  const resultStep = document.querySelector('#result-step');
  const questionPanel = document.querySelector('#question-panel');
  const stepNumber = document.querySelector('#step-number');
  const questionType = document.querySelector('#question-type');
  const progressBar = document.querySelector('#progress-bar');
  const priceOutput = document.querySelector('#sell-price');
  const status = document.querySelector('#sell-status');
  let currentQuestion = 0;
  let answers = {};

  const models = {
    'iPhone 15': { base: 4400, storage: ['128 GB', '256 GB', '512 GB'] },
    'iPhone 14 Pro': { base: 3900, storage: ['128 GB', '256 GB', '512 GB'] },
    'iPhone 13': { base: 2550, storage: ['128 GB', '256 GB', '512 GB'] },
    'Samsung Galaxy S24': { base: 3480, storage: ['128 GB', '256 GB'] },
    'Samsung Galaxy S23': { base: 2850, storage: ['128 GB', '256 GB'] },
    'Google Pixel 8': { base: 2450, storage: ['128 GB', '256 GB'] },
    'Annan modell': { base: 900, storage: ['32 GB', '64 GB', '128 GB', '256 GB', '512 GB'] },
  };
  const questions = [
    { type: 'Färg', name: 'color', title: 'Vilken färg har den?', options: ['Svart', 'Vit', 'Grön', 'Blå', 'Röd', 'Annan'] },
    { type: 'Lagring', name: 'storage', title: 'Hur mycket lagring har den?', options: [] },
    { type: 'Skärm', name: 'screen', title: 'Vilket skick är skärmen i?', options: ['Nyskick', 'Normalt sliten', 'Mycket sliten', 'Sprickor i glaset (bild och touch fungerar)', 'Trasig skärm eller touchfunktion'] },
    { type: 'Baksida', name: 'body', title: 'Vilket skick är sidorna och baksidan?', options: ['Nyskick', 'Normalt sliten', 'Mycket sliten', 'Sprickor'] },
    { type: 'Funktionsfel', name: 'function', title: 'Finns det något funktionsfel på den?', options: ['Nej', 'Face ID / fingeravtryck fungerar inte', 'Ljudet är dåligt', 'Den startar inte', 'Annat fel'] },
    { type: 'Skador', name: 'damage', title: 'Är den böjd eller fuktskadad?', options: ['Nej', 'Ja, men den fungerar ändå', 'Ja, och det finns saker som inte fungerar'] },
    { type: 'Batteri', name: 'battery', title: 'Hur är batterihälsan?', options: ['Minst 85 %', 'Under 85 %', 'Vet inte'] },
  ];
  const storageFactors = { '32 GB': .75, '64 GB': .9, '128 GB': 1, '256 GB': 1.15, '512 GB': 1.3 };
  const optionFactors = {
    screen: { 'Nyskick': 1, 'Normalt sliten': .92, 'Mycket sliten': .78, 'Sprickor i glaset (bild och touch fungerar)': .62, 'Trasig skärm eller touchfunktion': .35 },
    body: { 'Nyskick': 1, 'Normalt sliten': .94, 'Mycket sliten': .8, 'Sprickor': .6 },
    function: { 'Nej': 1, 'Face ID / fingeravtryck fungerar inte': .72, 'Ljudet är dåligt': .78, 'Den startar inte': .38, 'Annat fel': .65 },
    damage: { 'Nej': 1, 'Ja, men den fungerar ändå': .7, 'Ja, och det finns saker som inte fungerar': .45 },
    battery: { 'Minst 85 %': 1, 'Under 85 %': .82, 'Vet inte': .9 },
  };

  const renderQuestion = () => {
    const question = questions[currentQuestion];
    if (question.name === 'storage') question.options = models[form.elements.model.value].storage;
    stepNumber.textContent = String(currentQuestion + 1).padStart(2, '0');
    questionType.textContent = question.type;
    progressBar.style.width = `${((currentQuestion + 1) / questions.length) * 100}%`;
    questionPanel.innerHTML = `<legend>${question.title}</legend><p class="hint">Välj det alternativ som bäst stämmer med din mobil.</p><div class="question-options">${question.options.map((option) => `<label class="question-option"><input type="radio" name="${question.name}" value="${option}" ${answers[question.name] === option ? 'checked' : ''} required><span>${option}</span><b>＋</b></label>`).join('')}</div>`;
  };

  const getPrice = () => {
    let price = models[form.elements.model.value].base * storageFactors[answers.storage];
    ['screen', 'body', 'function', 'damage', 'battery'].forEach((name) => { price *= optionFactors[name][answers[name]] || 1; });
    return Math.max(0, Math.round(price / 50) * 50);
  };

  document.querySelector('#start-sell-flow').addEventListener('click', () => {
    if (!form.elements.model.checkValidity()) { form.elements.model.reportValidity(); return; }
    answers = {};
    currentQuestion = 0;
    document.querySelector('#selected-model-name').textContent = form.elements.model.value;
    modelStep.hidden = true;
    questionStep.hidden = false;
    resultStep.hidden = true;
    renderQuestion();
  });

  document.querySelector('#next-button').addEventListener('click', () => {
    const selected = questionPanel.querySelector('input:checked');
    if (!selected) { questionPanel.querySelector('input').reportValidity(); return; }
    answers[selected.name] = selected.value;
    if (currentQuestion < questions.length - 1) { currentQuestion += 1; renderQuestion(); return; }
    questionStep.hidden = true;
    resultStep.hidden = false;
    priceOutput.textContent = `${getPrice().toLocaleString('sv-SE')} kr`;
  });

  document.querySelector('#back-button').addEventListener('click', () => {
    if (currentQuestion === 0) { questionStep.hidden = true; modelStep.hidden = false; return; }
    currentQuestion -= 1;
    renderQuestion();
  });

  document.querySelector('#edit-button').addEventListener('click', () => {
    resultStep.hidden = true;
    questionStep.hidden = false;
    renderQuestion();
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const model = form.elements.model.value;
    const subject = `Värderingsförfrågan – ${model}`;
    const lines = ['Hej Mobil Outlet,', '', 'Jag vill sälja min mobil.', '', `Modell: ${model}`, ...questions.map((question) => `${question.type}: ${answers[question.name]}`), `Preliminär värdering: ${priceOutput.textContent}`, '', 'Vänligen återkom med nästa steg.'];
    status.textContent = 'Ditt e-postprogram öppnas med uppgifterna ifyllda. Kontrollera meddelandet och skicka det därifrån.';
    window.location.href = `mailto:info@mobil-outlet.se?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`;
  });
})();
