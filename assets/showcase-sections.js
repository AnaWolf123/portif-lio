(() => {
  const download = document.querySelector('.download-showcase');
  if (download) {
    const cards=[...download.querySelectorAll('.download-card')],prev=download.querySelector('[data-download-prev]'),next=download.querySelector('[data-download-next]');
    let active=Math.min(1,cards.length-1);
    const draw=()=>{const gap=Math.max(430,window.innerWidth*.53);cards.forEach((card,i)=>{const d=i-active,ad=Math.abs(d);card.style.setProperty('--dx',`${d*gap}px`);card.style.setProperty('--scale',d===0?'1':'.82');card.style.setProperty('--ry',`${d*-8}deg`);card.style.setProperty('--opacity',ad>1?'.12':d===0?'1':'.72');card.style.setProperty('--z',String(10-ad));card.classList.toggle('is-active',d===0)});prev.disabled=active===0;next.disabled=active===cards.length-1;download.style.setProperty('--active-bg',cards[active].dataset.color)};
    prev.onclick=()=>{active=Math.max(0,active-1);draw()};next.onclick=()=>{active=Math.min(cards.length-1,active+1);draw()};cards.forEach((c,i)=>c.addEventListener('click',e=>{if(i!==active){e.preventDefault();active=i;draw()}}));draw();
  }
  document.querySelectorAll('[data-download-parts]').forEach(link=>{
    link.addEventListener('click',async event=>{
      event.preventDefault();
      if(link.dataset.loading==='true')return;
      const original=link.textContent;
      link.dataset.loading='true';
      link.textContent='Preparando download…';
      try{
        const responses=await Promise.all(link.dataset.downloadParts.split(',').map(part=>fetch(part)));
        if(responses.some(response=>!response.ok))throw new Error('Falha ao carregar o arquivo');
        const pieces=await Promise.all(responses.map(response=>response.blob()));
        const url=URL.createObjectURL(new Blob(pieces,{type:'application/octet-stream'}));
        const anchor=document.createElement('a');
        anchor.href=url;
        anchor.download=link.dataset.downloadName;
        document.body.appendChild(anchor);
        anchor.click();
        anchor.remove();
        setTimeout(()=>URL.revokeObjectURL(url),1000);
      }catch(error){
        alert('Não foi possível preparar o download. Tente novamente.');
      }finally{
        link.dataset.loading='false';
        link.textContent=original;
      }
    });
  });
  const contact=document.querySelector('.social-contact');
  if(contact){
    const slides=[...contact.querySelectorAll('.social-slide')],row=contact.querySelector('.social-row'),prev=contact.querySelector('[data-social-prev]'),next=contact.querySelector('[data-social-next]'),dialog=document.getElementById('social-dialog');
    let active=Math.min(1,slides.length-1);
    const draw=()=>{const spacing=Math.max(88,Math.min(135,window.innerWidth*.09));slides.forEach((s,i)=>{const d=i-active,ad=Math.abs(d),tile=s.querySelector('.social-tile');s.classList.toggle('is-active',d===0);s.style.setProperty('--z',String(30-ad));tile.style.setProperty('--sx',`${d*spacing}px`);tile.style.setProperty('--turn',d<0?'64deg':d>0?'-64deg':'0deg');tile.style.setProperty('--social-scale',d===0?'1':String(Math.max(.72,.9-ad*.05)));s.style.opacity=ad>4?'0':'1'});prev.disabled=active===0;next.disabled=active===slides.length-1};
    const open=s=>{const b=s.querySelector('.social-tile');dialog.style.setProperty('--social',b.dataset.color);dialog.querySelector('img').src=b.querySelector('img').src;dialog.querySelector('small').textContent=b.dataset.label;dialog.querySelector('h3').textContent=b.dataset.title;dialog.querySelector('p').textContent=b.dataset.detail;const a=dialog.querySelector('a');a.href=b.dataset.href;a.hidden=!b.dataset.href;dialog.showModal()};
    slides.forEach((s,i)=>s.querySelector('.social-tile').onclick=()=>i===active?open(s):(active=i,draw()));prev.onclick=()=>{active=Math.max(0,active-1);draw()};next.onclick=()=>{active=Math.min(slides.length-1,active+1);draw()};dialog.querySelector('.social-dialog-close').onclick=()=>dialog.close();dialog.onclick=e=>{if(e.target===dialog)dialog.close()};draw();
  }
})();
