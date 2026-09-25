(() => {
  const projects = {
    almoxarifado: { title: 'As Aventuras de Gravetin', category: 'JOGO EDUCATIVO', description: 'Minijogos sobre sustentabilidade e crédito de carbono, com atuação em level design, sprites, GDD e testes com o público.', features: ['Unity', 'Aseprite', 'Level Design', 'GDD'], image: 'gravetin-icon.png', images: ['gravetin-icon.png'] },
    agosto: { title: 'Ajan', category: 'JOGO NARRATIVO', description: 'Experiência ambientada em um futuro pós-humanidade, construída com foco em atmosfera, level design e narrativa ambiental.', features: ['Unity', 'Aseprite', 'Sprites', 'Narrativa'], image: 'gravetin-icon.png', images: ['gravetin-icon.png'] },
    testes: { title: 'Documentação de Jogos', category: 'GAME DESIGN', description: 'Criação de documentos de design com regras, mecânicas, progressão, visão e organização dos projetos.', features: ['GDD', 'Mecânicas', 'Balanceamento', 'Progressão'], image: 'gravetin-icon.png', images: ['gravetin-icon.png'] },
    apex: { title: 'Game Jams', category: 'PRODUÇÃO EM EQUIPE', description: 'Participação em três maratonas de desenvolvimento, trabalhando com colaboração, priorização e entrega sob prazo.', features: ['Equipe', 'Prototipagem', 'Criatividade', 'Entrega'], image: 'gravetin-icon.png', images: ['gravetin-icon.png'] },
    porsche: { title: 'Level Design', category: 'DESIGN DE FASES', description: 'Planejamento de fluxo, ritmo, desafios e leitura dos espaços para criar experiências claras e envolventes.', features: ['Fluxo', 'Ritmo', 'Desafios', 'Prototipagem'], image: 'gravetin-icon.png', images: ['gravetin-icon.png'] },
    vitrine: { title: 'Arte para Jogos', category: 'CRIAÇÃO VISUAL', description: 'Produção de sprites, elementos visuais e interfaces alinhadas à identidade de cada experiência.', features: ['Pixel Art', 'Sprites', 'UI', 'Identidade Visual'], image: 'gravetin-icon.png', images: ['gravetin-icon.png'] }
  };
  const dialog = document.getElementById('project-dialog');
  const slide = document.getElementById('project-dialog-slide');
  const count = document.getElementById('project-dialog-count');
  const previous = dialog.querySelector('.dialog-prev');
  const next = dialog.querySelector('.dialog-next');
  const visit = document.getElementById('project-dialog-visit');
  const unpublished = document.getElementById('project-dialog-unpublished');
  let current = null;
  let index = 0;
  let startX = null;
  let returnFocus = null;
  function slidesFor(project) {
    const slides = (project.images || (project.image ? [project.image] : [])).map(file => ({ type: 'image', file }));
    if (project.video) slides.push({ type: 'video' });
    return slides.length ? slides : [{ type: 'concept' }, { type: 'info' }];
  }
  function render() {
    if (!current) return;
    const project = projects[current];
    const pages = slidesFor(project);
    const page = pages[index];
    slide.replaceChildren();
    if (dialog.open && !matchMedia('(prefers-reduced-motion: reduce)').matches) slide.animate([{ opacity: 0.55, transform: 'translateX(12px)' }, { opacity: 1, transform: 'translateX(0)' }], { duration: 240, easing: 'ease-out' });
    if (page.type === 'image') {
      const img = document.createElement('img');
      img.src = `assets/${page.file}`;
      img.alt = `Captura ${index + 1} da interface de ${project.title}`;
      slide.append(img);
    } else if (page.type === 'video') {
      const video = document.createElement('video');
      video.controls = true;
      video.playsInline = true;
      video.preload = 'metadata';
      video.poster = project.image === 'vitrine-veiculos.png' ? 'assets/vitrine-home.png' : 'assets/corrida-gameplay.png';
      video.setAttribute('aria-label', `Vídeo de demonstração de ${project.title}`);
      const source = document.createElement('source');
      source.src = `assets/${project.video}`;
      source.type = 'video/mp4';
      video.append(source);
      slide.append(video);
    } else if (page.type === 'concept') {
      const concept = document.createElement('div');
      concept.className = 'concept';
      const label = document.createElement('small');
      label.textContent = project.category;
      const name = document.createElement('strong');
      name.textContent = project.title;
      concept.append(label, name);
      slide.append(concept);
    } else {
      const info = document.createElement('div');
      info.className = 'info-slide';
      const heading = document.createElement('strong');
      heading.textContent = 'O que o projeto explora';
      info.append(heading);
      project.features.forEach(feature => {
        const item = document.createElement('span');
        item.textContent = feature;
        info.append(item);
      });
      slide.append(info);
    }
    count.textContent = page.type === 'video' ? 'Vídeo' : page.type === 'image' ? 'Imagem do projeto' : 'Projeto';
    previous.disabled = index === 0;
    next.disabled = index === pages.length - 1;
  }
  function open(key, trigger) {
    const project = projects[key];
    if (!project) return;
    returnFocus = trigger;
    current = key;
    index = 0;
    document.getElementById('project-dialog-category').textContent = project.category;
    document.getElementById('project-dialog-title').textContent = project.title;
    document.getElementById('project-dialog-description').textContent = project.description;
    const features = document.getElementById('project-dialog-features');
    features.replaceChildren();
    project.features.forEach(feature => {
      const chip = document.createElement('span');
      chip.textContent = feature;
      features.append(chip);
    });
    visit.hidden = !project.url;
    unpublished.hidden = Boolean(project.url);
    if (project.url) visit.href = project.url;
    else visit.removeAttribute('href');
    render();
    dialog.showModal();
    document.body.classList.add('dialog-open');
    dialog.querySelector('.dialog-close').focus();
  }
  document.querySelectorAll('[data-project]').forEach(button => button.addEventListener('click', () => open(button.dataset.project, button)));
  dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener('close', () => {
    document.body.classList.remove('dialog-open');
    slide.replaceChildren();
    current = null;
    if (returnFocus) returnFocus.focus({ preventScroll: true });
  });
  previous.addEventListener('click', () => { if (index > 0) { index--; render(); } });
  next.addEventListener('click', () => { if (current && index < slidesFor(projects[current]).length - 1) { index++; render(); } });
  dialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' && !previous.disabled) { event.preventDefault(); previous.click(); }
    if (event.key === 'ArrowRight' && !next.disabled) { event.preventDefault(); next.click(); }
  });
  slide.addEventListener('pointerdown', event => { startX = event.clientX; });
  slide.addEventListener('pointerup', event => {
    if (startX === null) return;
    const distance = event.clientX - startX;
    startX = null;
    if (Math.abs(distance) > 55) (distance < 0 ? next : previous).click();
  });
})();
