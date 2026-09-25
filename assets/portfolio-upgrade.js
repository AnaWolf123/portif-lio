(() => {
  const body=document.body;
  const siteIntro=document.getElementById('site-intro');
  const closeIntro=()=>{if(!siteIntro||siteIntro.classList.contains('is-leaving'))return;siteIntro.classList.add('is-leaving');body.classList.remove('is-loading');setTimeout(()=>siteIntro.remove(),750)};
  document.getElementById('intro-skip')?.addEventListener('click',closeIntro);
  const introTime=matchMedia('(prefers-reduced-motion: reduce)').matches?300:2400;
  setTimeout(closeIntro,introTime);
  const header=document.querySelector('header');
  const nav=document.querySelector('.nav');
  const links=document.querySelector('.nav-links');
  const navContact=document.querySelector('.nav-contact');

  document.getElementById('projetos')?.setAttribute('hidden','');
  document.getElementById('downloads')?.setAttribute('hidden','');
  document.querySelector('.hero-fan')?.setAttribute('hidden','');
  links?.querySelector('a[href="#projetos"]')?.remove();
  if(navContact){navContact.href='#contato';navContact.textContent='Contato ↗'}

  const heroLabel=document.querySelector('.hero .kicker');
  const heroTitle=document.querySelector('.hero h1');
  const heroCopy=document.querySelector('.intro-copy');
  if(heroLabel)heroLabel.textContent='Game Designer · Jogos Digitais pela UNISO';
  if(heroTitle)heroTitle.innerHTML='<span><b>Crio experiências</b></span><span><b>pensadas para</b></span><span><b><em>quem joga.</em></b></span>';
  if(heroCopy)heroCopy.textContent='Sou Ana Laura Domingues Campos, formada em Jogos Digitais pela UNISO. Atuo com game design, level design, documentação e criação visual, transformando ideias em experiências claras e envolventes.';
  const heroBottom=document.querySelector('.hero-bottom');
  const primary=heroBottom?.querySelector('.primary');
  if(primary){primary.href='#sobre';primary.innerHTML='Conheça meu trabalho <span aria-hidden="true">↘</span>'}
  if(heroBottom && !heroBottom.querySelector('.secondary-action')){
    const resume=document.createElement('a');resume.className='secondary-action';resume.href='assets/curriculo-ana-laura.pdf';resume.download='Curriculo-Ana-Laura.pdf';resume.textContent='Baixar currículo ↓';
    heroBottom.insertBefore(resume,heroBottom.querySelector('p'));
    const note=heroBottom.querySelector('p');if(note)note.textContent='Criatividade, organização e atenção à experiência do jogador.';
  }

  const portal=document.createElement('section');
  portal.className='portfolio-portal';
  portal.setAttribute('aria-label','Navegação criativa do portfólio');
  portal.innerHTML='<a class="portal-link portal-top" href="#competencias" data-portal-title="COMPETÊNCIAS" data-portal-sub="O QUE EU FAÇO"><span>⌃</span> Competências</a><a class="portal-link portal-left" href="#contato" data-portal-title="CONTATO" data-portal-sub="VAMOS CONVERSAR"><span>‹</span> Contato</a><div class="portal-center" aria-live="polite"><small>PORTFÓLIO</small><strong>ANA LAURA</strong><em>GAME DESIGN</em></div><a class="portal-link portal-right" href="#sobre" data-portal-title="SOBRE MIM" data-portal-sub="CONHEÇA A ANA">Sobre <span>›</span></a><a class="portal-link portal-bottom" href="#ferramentas" data-portal-title="FERRAMENTAS" data-portal-sub="COMO EU CRIO">Ferramentas <span>⌄</span></a>';
  document.querySelector('.hero')?.after(portal);
  const portalCenter=portal.querySelector('.portal-center');
  const portalDefault=portalCenter.innerHTML;
  portal.querySelectorAll('.portal-link').forEach((link,index)=>{
    link.style.setProperty('--portal-index',index);
    link.addEventListener('mouseenter',()=>{portalCenter.innerHTML=`<small>${link.dataset.portalSub}</small><strong>${link.dataset.portalTitle}</strong><em>ANA LAURA</em>`;portal.dataset.active=String(index)});
    link.addEventListener('mouseleave',()=>{portalCenter.innerHTML=portalDefault;delete portal.dataset.active});
    link.addEventListener('focus',()=>{portalCenter.innerHTML=`<small>${link.dataset.portalSub}</small><strong>${link.dataset.portalTitle}</strong><em>ANA LAURA</em>`;portal.dataset.active=String(index)});
    link.addEventListener('blur',()=>{portalCenter.innerHTML=portalDefault;delete portal.dataset.active});
  });
  if('IntersectionObserver' in window&&!matchMedia('(prefers-reduced-motion: reduce)').matches){const portalObserver=new IntersectionObserver(([entry])=>{if(entry.isIntersecting){portal.classList.add('is-visible');portalObserver.disconnect()}},{threshold:.28});portalObserver.observe(portal)}else portal.classList.add('is-visible');
  if(matchMedia('(pointer:fine)').matches&&!matchMedia('(prefers-reduced-motion: reduce)').matches){portal.addEventListener('pointermove',event=>{const rect=portal.getBoundingClientRect();const x=(event.clientX-rect.left)/rect.width-.5;const y=(event.clientY-rect.top)/rect.height-.5;portal.style.setProperty('--portal-x',`${x*18}px`);portal.style.setProperty('--portal-y',`${y*14}px`)});portal.addEventListener('pointerleave',()=>{portal.style.setProperty('--portal-x','0px');portal.style.setProperty('--portal-y','0px')})}

  const theme=document.createElement('button');theme.type='button';theme.className='theme-toggle';theme.setAttribute('aria-label','Alternar tema claro e escuro');
  const menu=document.createElement('button');menu.type='button';menu.className='menu-toggle';menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-controls','site-menu');menu.textContent='Menu';
  links.id='site-menu';
  const actions=document.createElement('div');actions.className='nav-actions';actions.append(theme,menu);nav.append(actions);
  const saved=localStorage.getItem('ana-theme');if(saved==='dark')body.classList.add('theme-dark');
  const updateTheme=()=>{theme.textContent=body.classList.contains('theme-dark')?'☀':'☾';theme.title=body.classList.contains('theme-dark')?'Usar tema claro':'Usar tema escuro'};updateTheme();
  theme.onclick=()=>{const changeTheme=()=>{body.classList.toggle('theme-dark');localStorage.setItem('ana-theme',body.classList.contains('theme-dark')?'dark':'light');updateTheme()};theme.classList.remove('is-switching');void theme.offsetWidth;theme.classList.add('is-switching');setTimeout(()=>theme.classList.remove('is-switching'),700);if(document.startViewTransition&&!matchMedia('(prefers-reduced-motion: reduce)').matches)document.startViewTransition(changeTheme);else changeTheme()};
  menu.onclick=()=>{const open=links.classList.toggle('is-open');menu.setAttribute('aria-expanded',String(open));menu.textContent=open?'Fechar':'Menu'};
  links.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{links.classList.remove('is-open');menu.setAttribute('aria-expanded','false');menu.textContent='Menu'}));

  const tools=document.getElementById('ferramentas');
  if(tools){
    const text=tools.querySelector('.section-top p');if(text)text.textContent='Ferramentas organizadas por engine, programação, criação visual e fluxo de trabalho.';
    const grid=tools.querySelector('.tech-grid');
    if(grid && !tools.querySelector('.tools-groups')){const legend=document.createElement('div');legend.className='tools-groups';legend.innerHTML='<span>Engines</span><span>Programação</span><span>Arte 2D e 3D</span><span>Organização</span>';grid.before(legend)}
  }

  const skillSection=document.createElement('section');skillSection.className='skills-section';skillSection.id='competencias';skillSection.innerHTML='<div class="wrap"><div class="section-top reveal"><div><span class="kicker">Competências</span><h2>Como contribuo.</h2></div><p>Conhecimentos aplicados do conceito ao teste de uma experiência jogável.</p></div><div class="skills-grid"><article class="skill-card reveal"><span>01 · DESIGN</span><div><h3>Game Design</h3><p>Definição de mecânicas, regras, progressão, documentação e equilíbrio da experiência.</p></div></article><article class="skill-card reveal"><span>02 · FASES</span><div><h3>Level Design</h3><p>Planejamento de fluxo, ritmo, desafios e leitura dos espaços para orientar o jogador.</p></div></article><article class="skill-card reveal"><span>03 · PROTÓTIPOS</span><div><h3>Prototipagem</h3><p>Transformação de ideias em testes jogáveis para validar decisões rapidamente.</p></div></article><article class="skill-card reveal"><span>04 · VISUAL</span><div><h3>Criação 2D</h3><p>Pixel art, sprites e elementos visuais alinhados à identidade de cada jogo.</p></div></article><article class="skill-card reveal"><span>05 · NARRATIVA</span><div><h3>Experiência</h3><p>Narrativa ambiental e organização das informações sem interromper a jogabilidade.</p></div></article><article class="skill-card reveal"><span>06 · EVOLUÇÃO</span><div><h3>Testes</h3><p>Observação, coleta de retorno e ajustes para melhorar clareza, ritmo e diversão.</p></div></article></div></div>';
  tools?.before(skillSection);
  skillSection.querySelectorAll('.reveal').forEach(el=>el.classList.add('visible'));
  const about=document.getElementById('sobre');
  const resumePanel=document.createElement('section');resumePanel.className='resume-panel';resumePanel.innerHTML='<div class="wrap resume-panel-inner"><div><span class="kicker">Currículo</span><h2>Formação e competências<br>em um só documento.</h2><p>Currículo profissional com formação em Jogos Digitais, competências, ferramentas e áreas de interesse.</p></div><a class="resume-action" href="assets/curriculo-ana-laura.pdf" download="Curriculo-Ana-Laura.pdf">Baixar currículo em PDF ↓</a></div>';
  about?.after(resumePanel);

  const email=document.querySelector('[data-title="E-mail profissional"]');
  if(email){email.dataset.href='mailto:analauradominguescampos123@gmail.com';email.dataset.detail='E-mail: analauradominguescampos123@gmail.com'}
  const github=document.querySelector('[data-title="GitHub"]');if(github){github.dataset.href='https://github.com/AnaWolf123';github.dataset.detail='Confira códigos, protótipos e projetos de Ana Laura no GitHub.'}
  const linkedin=document.querySelector('[data-title="LinkedIn"]');if(linkedin){linkedin.dataset.href='https://www.linkedin.com/in/ana-laura-438330275/';linkedin.dataset.detail='Acompanhe a formação, experiências e conexões profissionais de Ana Laura no LinkedIn.'}
  const contactCopy=document.querySelector('.social-copy p');if(contactCopy)contactCopy.textContent='Entre em contato por e-mail, telefone, LinkedIn ou GitHub.';
  const status=document.createElement('span');status.className='contact-status';status.textContent='Disponível para oportunidades e colaborações';contactCopy?.after(status);

  const navAbout=links.querySelector('a[href="#sobre"]');
  if(navAbout && !links.querySelector('a[href="#competencias"]')){const a=document.createElement('a');a.href='#competencias';a.textContent='Competências';navAbout.before(a)}

  document.querySelectorAll('.reveal').forEach(el=>{if(!el.classList.contains('visible')&&matchMedia('(prefers-reduced-motion: reduce)').matches)el.classList.add('visible')});
})();
