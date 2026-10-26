(() => {
 'use strict';
 const E=window.IPSI_THEME_ENGINE;if(!E)return;
 const host=document.querySelector('.social-profile-controls');if(!host)return;
 const trigger=document.createElement('button');trigger.type='button';trigger.className='utility-icon theme-trigger';trigger.setAttribute('aria-label','Pilih tema tampilan');trigger.setAttribute('aria-haspopup','dialog');trigger.setAttribute('aria-expanded','false');trigger.setAttribute('aria-controls','theme-picker');
 trigger.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M12 3a9 9 0 1 0 0 18h1a2 2 0 0 0 1-3.7 1.5 1.5 0 0 1 1-2.8h2a4 4 0 0 0 4-4C21 6 17 3 12 3Z"/><circle cx="7" cy="10" r="1"/><circle cx="10" cy="6.8" r="1"/><circle cx="15" cy="7" r="1"/></svg>';
 host.append(trigger);
 const dialog=document.createElement('dialog');dialog.id='theme-picker';dialog.className='theme-picker';dialog.setAttribute('aria-labelledby','theme-picker-title');
 const header=document.createElement('div');header.className='theme-picker-heading';const title=document.createElement('h2');title.id='theme-picker-title';title.textContent='Tema tampilan';const close=document.createElement('button');close.type='button';close.className='icon-button';close.setAttribute('aria-label','Tutup pilihan tema');close.textContent='×';header.append(title,close);dialog.append(header);
 const choices=document.createElement('div');choices.className='theme-choices';choices.setAttribute('role','group');choices.setAttribute('aria-label','Lima preset tampilan');
 for(const id of E.enabled){const b=document.createElement('button');b.type='button';b.dataset.themeChoice=id;const swatch=document.createElement('span');swatch.className='theme-swatch';swatch.style.background=`linear-gradient(110deg,${E.presets[id].nav.join(',')})`;swatch.setAttribute('aria-hidden','true');const label=document.createElement('span');label.textContent=E.presets[id].name;b.append(swatch,label);b.onclick=()=>{E.apply(id);sync();};choices.append(b);}
 const status=document.createElement('p');status.className='theme-status';status.setAttribute('role','status');dialog.append(choices,status);document.body.append(dialog);
 function sync(){for(const b of choices.children)b.setAttribute('aria-pressed',String(b.dataset.themeChoice===document.documentElement.dataset.theme));status.textContent='Tema aktif: '+E.presets[document.documentElement.dataset.theme].name;}
 trigger.onclick=()=>{sync();dialog.showModal();trigger.setAttribute('aria-expanded','true');choices.querySelector('[aria-pressed=true]').focus();};
 close.onclick=()=>dialog.close();dialog.addEventListener('close',()=>{trigger.setAttribute('aria-expanded','false');trigger.focus({preventScroll:true});});dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});document.addEventListener('ipsi:theme',sync);
 // Banner fields are text-only; local image paths and safe links are allowlisted.
 const banner=document.querySelector('.page-banner'),cfg=window.IPSI_THEME_SETTINGS?.banners?.[document.body.dataset.page];
 if(!banner||!cfg||cfg.status!=='published')return;
 const now=Date.now(),parse=v=>v==null?null:Date.parse(v);
 const start=parse(cfg.startDate),end=parse(cfg.endDate);
 if((cfg.startDate!=null&&!Number.isFinite(start))||(cfg.endDate!=null&&!Number.isFinite(end))||(start!==null&&now<start)||(end!==null&&now>end)||(start!==null&&end!==null&&end<start))return;
 if(typeof cfg.title==='string'&&cfg.title.trim())banner.querySelector('h1').textContent=cfg.title;
 if(typeof cfg.subtitle==='string'&&cfg.subtitle.trim()){const p=banner.querySelector('.container > p');if(p)p.textContent=cfg.subtitle;}
 if(typeof cfg.image==='string'&&/^assets\/images\/[a-z0-9/_-]+\.(jpg|jpeg|png|webp)$/i.test(cfg.image)&&!cfg.image.includes('..')){
  const img=new Image();img.alt='';img.className='theme-banner-image';img.src=cfg.image;img.decoding='async';img.onerror=()=>{img.remove();banner.classList.remove('has-theme-image');};
  if(typeof cfg.focalPosition==='string'&&/^(100|[0-9]{1,2})% (100|[0-9]{1,2})%$/.test(cfg.focalPosition))img.style.objectPosition=cfg.focalPosition;
  banner.dataset.overlay=['forest','dark'].includes(cfg.overlay)?cfg.overlay:'forest';banner.prepend(img);banner.classList.add('has-theme-image');
 }
 if(typeof cfg.buttonText==='string'&&cfg.buttonText.trim()&&typeof cfg.buttonUrl==='string'&&/^(https:\/\/[^\s]+|[a-z0-9-]+\.html(?:[?#][^\s]*)?)$/i.test(cfg.buttonUrl)){const a=document.createElement('a');a.className='btn theme-banner-cta';a.textContent=cfg.buttonText;a.href=cfg.buttonUrl;banner.querySelector('.container').append(a);}
})();
