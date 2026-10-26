/* Standalone, dependency-free prototype. All application data comes from fixtures.js. */
(() => {
'use strict';
const D = window.IPSI_DEMO, main = document.querySelector('main');
const page = document.body.dataset.page, params = new URLSearchParams(location.search);
if(!D||!window.IPSI_THEME||!window.IPSI_FEDERATION||!window.IPSI_PAGES){main.innerHTML='<section class="section container"><div class="error-state" role="alert"><h1>Konten belum dapat dimuat</h1><p>Data atau komponen lokal belum tersedia. Periksa berkas prototype dan muat ulang halaman.</p><button class="btn" onclick="location.reload()">Coba lagi</button></div></section>';return;}
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const arrow = '<span aria-hidden="true">↗</span>';
const icon = (name, size=20) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">${({search:'<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/>',menu:'<path d="M3 6h18M3 12h18M3 18h18"/>',close:'<path d="m6 6 12 12M6 18 18 6"/>',down:'<path d="m6 9 6 6 6-6"/>',info:'<circle cx="12" cy="12" r="9"/><path d="M12 10v7M12 6v1"/>',grid:'<path d="M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z"/>',list:'<path d="M8 5h13M8 12h13M8 19h13M3 5h1M3 12h1M3 19h1"/>',building:'<path d="m3 9 9-6 9 6H3ZM5 10v9m7-9v9m7-9v9M2 21h20"/>'})[name]}</svg>`;
const brand = `<a class="brand" href="index.html" aria-label="IPSI — Beranda"><img src="assets/images/ipsi.webp" alt="Lambang IPSI" width="64" height="82"><span class="wordmark">IKATAN PENCAK SILAT INDONESIA<small>Pencak Silat Mendunia Menuju Olimpiade</small></span></a>`;
const note = `<div class="demo-label">${icon('info',16)}<span><strong>Data demonstrasi.</strong> Informasi untuk pengembangan Portal IPSI; bukan data resmi organisasi atau pertandingan.</span></div>`;
const link = (url, text) => `<a href="${url}">${text} ${arrow}</a>`;
const navLink=(url,text)=>`<a href="${url}">${text}</a>`;
const menus = [
 ['kabar','Kabar Silat','Ruang editorial',navLink('news.html','Berita')+navLink('news.html?category=SENI%20%26%20BUDAYA','Artikel')+navLink('media.html','Media & Galeri')],
 ['kompetisi','Kompetisi','Dari jadwal ke hasil',navLink('calendar.html','Kalender Kompetisi')+navLink('calendar.html?status=Selesai','Hasil Kompetisi')],
 ['pesilat','Pesilat','',navLink('athlete.html','Direktori Pesilat')+navLink('ranking.html','Ranking Pesilat')],
 ['perguruan','Perguruan','',navLink('perguruan-historis.html','Perguruan Historis')+navLink('perguruan-besar.html','Perguruan Besar')+navLink('perguruan.html','Direktori Perguruan')],
 ['dokumen','Dokumen','Dokumen & Regulasi',navLink('documents.html','Direktori Dokumen')],
 ['peduli','Pesilat Peduli','Kepedulian dalam tindakan',navLink('pesilat-peduli.html#tentang','Tentang Pesilat Peduli')+navLink('pesilat-peduli.html#kegiatan','Kegiatan')+navLink('pesilat-peduli.html#galeri','Galeri Kegiatan')],
 ['tentang','Tentang IPSI','',navLink('history.html','Sejarah IPSI')+'<h3 class="nav-group-heading">Struktur Organisasi</h3>'+navLink('organization.html?level=PB','PB IPSI')+navLink('organization.html?level=Pengprov','Pengprov IPSI')+navLink('organization.html?level=Pengcab','Pengcab IPSI')+'<h3 class="nav-group-heading">Teknis Olahraga</h3>'+navLink('coach.html','Pelatih')+navLink('referee.html','Wasit/Juri')]
];
function nav(prefix){return `<ul class="nav-list"><li><a class="nav-link ${page==='home'?'current':''}" href="index.html" ${page==='home'?'aria-current="page"':''}>Beranda</a></li>${menus.map(m=>`<li class="nav-item nav-dropdown ${m[0]==='tentang'?'nav-split':''}">${m[0]==='tentang'?`<a class="nav-link about-nav-link ${page==='about'?'current':''}" href="about.html" ${page==='about'?'aria-current="page"':''}>Tentang IPSI</a>`:''}<button class="nav-link ${m[0]==='tentang'?'nav-disclosure':''}" ${m[0]==='tentang'?'aria-label="Buka submenu Tentang IPSI"':''} data-menu aria-haspopup="true" aria-expanded="false" aria-controls="${prefix}-${m[0]}">${m[0]==='tentang'?'':m[1]} ${icon('down',12)}</button><div class="mega" id="${prefix}-${m[0]}" hidden><div class="mega-inner"><div>${m[2]?`<h3>${m[2]}</h3>`:''}${m[3]}</div>${m[4]?`<div><h3>${m[4]}</h3>${m[5]}</div><div class="mega-callout"><strong>${m[6]}</strong><p>${m[7]}</p></div>`:''}</div></div></li>`).join('')}</ul>`;}
// Identity scrolls normally. The following sibling navigation alone is sticky.
const utilityIcon = name => `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">${({instagram:'<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/>',facebook:'<path d="M14 21v-8h3l.5-4H14V7c0-1 .5-2 2-2h2V2h-3c-3 0-5 2-5 5v2H7v4h3v8"/>',x:'<path d="m4 3 16 18M20 3 4 21M4 3h5l11 18h-5"/>',profile:'<circle cx="12" cy="8" r="4"/><path d="M4 22v-2a8 8 0 0 1 16 0v2"/>'})[name]}</svg>`;
const federationIdentity=`<a class="brand federation-identity" href="index.html" aria-label="IPSI — Beranda"><span class="federation-logos"><img src="assets/images/ipsi.webp" alt="Lambang IPSI" width="64" height="82"><img class="persilat-logo" src="assets/images/persilat-provisional.gif" alt="Lambang PERSILAT" width="70" height="70" data-asset-status="provisional-pending-official-approval" data-asset-metadata="assets/images/persilat-provisional.metadata.json"></span><span class="wordmark">IKATAN PENCAK SILAT INDONESIA<small>Pencak Silat Mendunia Menuju Olimpiade</small></span></a>`;
document.querySelector('#site-header').innerHTML=`<header class="site-header"><div class="container brand-row">${federationIdentity}<div class="header-utilities"><form class="identity-search" role="search" action="search.html" method="get"><label class="sr-only" for="identity-query">Cari di portal</label><input id="identity-query" name="q" type="search" maxlength="160" placeholder="Cari berita, kompetisi, pesilat…"><button type="submit" aria-label="Kirim pencarian">${icon('search')}</button></form><div class="social-profile-controls" aria-label="Utilitas portal">${[['instagram','Instagram'],['facebook','Facebook'],['x','X']].map(([key,name])=>`<button type="button" class="utility-icon social-placeholder" aria-label="${name} — belum dikonfigurasi" aria-disabled="true" aria-describedby="social-configuration-status" title="${name}: URL resmi belum dikonfigurasi">${utilityIcon(key)}</button>`).join('')}<button type="button" class="utility-icon profile-utility" data-myipsi aria-label="Profil pengguna — pratinjau login" title="Profil pengguna: login tersedia pada fase berikutnya">${utilityIcon('profile')}</button></div><small class="utility-status sr-only" id="social-configuration-status">Tautan sosial belum dikonfigurasi</small></div></div></header>`;

document.querySelector('#site-header').insertAdjacentHTML('afterend',`<div class="federation-navigation"><div class="container navigation-row"><nav class="desktop-nav" aria-label="Navigasi utama">${nav('desktop')}</nav><span class="mobile-nav-label">Portal IPSI</span><div class="header-actions"><button class="icon-button" data-search aria-label="Cari di portal" aria-expanded="false" aria-controls="inline-search">${icon('search')}</button><button class="icon-button drawer-toggle" aria-expanded="false" aria-controls="drawer" aria-label="Buka menu navigasi" id="open-drawer">${icon('menu')}</button></div></div><div class="inline-search" id="inline-search" hidden><div class="container"><form action="search.html" method="get" role="search"><label for="global-search">Cari di Portal IPSI</label><div class="inline-search-controls"><input type="search" name="q" id="global-search" maxlength="160" placeholder="Berita, pesilat, kompetisi, organisasi…" autocomplete="off"><button class="btn" type="submit">Cari</button><button class="icon-button" type="button" id="close-search" aria-label="Tutup pencarian">${icon('close')}</button></div></form></div></div></div>`);
document.querySelector('#site-footer').innerHTML=`<footer class="site-footer"><div class="container footer-top"><div>${brand}<p>Prototipe independen untuk evaluasi pengalaman portal publik IPSI.</p><p>Kontak resmi belum dikonfigurasi.</p></div><div class="footer-column"><h2>Jelajahi</h2>${link('athlete.html','Pesilat')}${link('ranking.html','Ranking')}${link('calendar.html','Kompetisi')}</div><div class="footer-column"><h2>IPSI</h2>${link('about.html','Tentang IPSI')}${link('perguruan.html','Direktori perguruan')}${link('organization.html','Direktori organisasi')}${link('news.html','Kabar Silat')}${link('pesilat-peduli.html','Pesilat Peduli')}<a href="documents.html">Dokumen</a></div><div class="footer-column"><h2>Terhubung</h2>${link('media.html','Galeri media')}<a href="search.html">Pencarian portal</a><button data-myipsi>My IPSI · pratinjau</button><p class="social-status">Instagram · YouTube<br>Tautan resmi belum tersedia.</p></div></div><div class="container footer-bottom"><span>© 2026 · Konsep portal IPSI</span><span>Seluruh informasi dalam prototipe adalah ilustrasi.</span></div></footer>`;
document.body.insertAdjacentHTML('beforeend',`<dialog class="drawer-dialog" id="drawer" aria-label="Menu navigasi"><div class="dialog-top"><strong>Jelajahi IPSI</strong><button class="icon-button" data-close aria-label="Tutup navigasi">${icon('close')}</button></div><form class="drawer-search" action="search.html" method="get" role="search"><label class="field"><span>Cari di portal</span><input type="search" name="q" maxlength="160" placeholder="Kata kunci…"></label><button class="btn" type="submit">Cari</button></form><nav aria-label="Navigasi seluler">${nav('mobile')}</nav></dialog><dialog id="detail-dialog" aria-labelledby="dialog-title"><div class="dialog-top"><span class="eyebrow">IPSI · Pratinjau</span><button class="icon-button" data-close aria-label="Tutup detail">${icon('close')}</button></div><div class="dialog-content" id="dialog-content"></div></dialog>`);
const detail=document.querySelector('#detail-dialog'), drawer=document.querySelector('#drawer'), inlineSearch=document.querySelector('#inline-search');
const activeMenu={about:'tentang',history:'tentang',perguruan:'perguruan','perguruan-historis':'perguruan','perguruan-besar':'perguruan','perguruan-detail':'perguruan',ranking:'pesilat',referee:'tentang','referee-profile':'tentang',coach:'tentang','coach-profile':'tentang',news:'kabar',article:'kabar',athlete:'pesilat',profile:'pesilat',calendar:'kompetisi',event:'kompetisi',organization:'tentang','organization-detail':'tentang',media:'kabar',gallery:'kabar',documents:'dokumen',peduli:'peduli','peduli-detail':'peduli'}[page];
if(activeMenu)document.querySelectorAll(`[aria-controls$="-${activeMenu}"]`).forEach(b=>{b.classList.add('current');b.closest('.nav-split')?.querySelector('.about-nav-link')?.classList.add('current');});
const navLocation=new URL(location.href);navLocation.searchParams.delete('review');navLocation.searchParams.sort();
document.querySelectorAll('.mega a[href]').forEach(a=>{const url=new URL(a.href);url.searchParams.sort();if(url.pathname===navLocation.pathname&&url.search===navLocation.search)a.setAttribute('aria-current','page');});
function openDialog(d){if(d.open)return;d.showModal();document.body.classList.add('modal-open');}
let dialogReturn=null;
function showDetail(html){if(!detail.open)dialogReturn=document.activeElement;closeSearch(false);drawer.close();document.querySelector('#dialog-content').innerHTML=html;openDialog(detail);}
function closeSearch(restore=true){inlineSearch.hidden=true;const trigger=document.querySelector('[data-search]');trigger.setAttribute('aria-expanded','false');if(restore)trigger.focus({preventScroll:true});}
document.querySelector('#close-search').addEventListener('click',()=>closeSearch());
matchMedia('(max-width:800px)').addEventListener('change',e=>{if(e.matches)closeSearch(false);});
inlineSearch.addEventListener('keydown',e=>{if(e.key==='Escape'){e.preventDefault();closeSearch();}});
// One disclosure path for desktop dropdowns, optional flyouts and the mobile drawer.
const menuState={path:[],mode:null,timer:null,hoverClick:null};
const navTriggerSelector='[data-menu],[data-submenu]';
const panelFor=b=>document.getElementById(b.getAttribute('aria-controls'));
function cancelMenuTimer(){clearTimeout(menuState.timer);menuState.timer=null;}
function closeMenuPath(from=0){
 cancelMenuTimer();
 menuState.path.splice(from).reverse().forEach(b=>{b.setAttribute('aria-expanded','false');panelFor(b).hidden=true;});
 if(!menuState.path.length){menuState.mode=null;menuState.hoverClick=null;}
}
function closeMenus(){
 closeMenuPath();
 document.querySelectorAll(navTriggerSelector).forEach(b=>{b.setAttribute('aria-expanded','false');const p=panelFor(b);if(p)p.hidden=true;});
}
function placeMenu(b,p){
 for(const key of ['left','right','top','maxHeight','overflowY'])p.style[key]='';
 p.removeAttribute('data-side');
 if(!b.closest('.desktop-nav'))return;
 let r=p.getBoundingClientRect();
 if(p.classList.contains('nav-submenu')){
  if(r.right>innerWidth-16){p.dataset.side='left';r=p.getBoundingClientRect();}
  if(r.left<16){p.style.left='0';p.style.right='auto';r=p.getBoundingClientRect();}
  if(r.bottom>innerHeight-16)p.style.top=Math.min(0,innerHeight-16-r.bottom)+'px';
 }else if(r.right>innerWidth-16){p.style.left='auto';p.style.right='0';}
 r=p.getBoundingClientRect();p.style.maxHeight=Math.max(120,innerHeight-r.top-16)+'px';
 if(p.scrollHeight>innerHeight-r.top-16)p.style.overflowY='auto';
}
function setMenu(b,open,mode='keyboard'){
 cancelMenuTimer();closeSearch(false);
 const existing=menuState.path.indexOf(b);
 if(!open){if(existing>=0)closeMenuPath(existing);return;}
 const parentPanel=b.closest('.mega,.nav-submenu');
 const parent=parentPanel?menuState.path.findIndex(t=>panelFor(t)===parentPanel):-1;
 const level=parent+1;
 closeMenuPath(level);menuState.path.push(b);menuState.mode=mode;
 b.setAttribute('aria-expanded','true');const p=panelFor(b);p.hidden=false;placeMenu(b,p);
}
function firstMenuTarget(p,last=false){const items=[...p.querySelectorAll('a[href],button')].filter(e=>e.getClientRects().length&&!e.disabled);return last?items.at(-1):items[0];}
function scheduleMenuLeave(item){
 cancelMenuTimer();
 const b=item.querySelector(':scope > [data-menu],:scope > [data-submenu]'),level=menuState.path.indexOf(b);
 if(level<0||menuState.mode!=='pointer')return;
 menuState.timer=setTimeout(()=>{if(menuState.path[level]===b&&!item.matches(':hover'))closeMenuPath(level);},140);
}
for(const host of [document.querySelector('.federation-navigation'),drawer]){
 host.addEventListener('click',e=>{
  const b=e.target.closest(navTriggerSelector);
  if(b){
   const pointer=e.detail>0,desktop=!!b.closest('.desktop-nav'),fromHover=pointer&&menuState.hoverClick===b;
   const open=fromHover||b.getAttribute('aria-expanded')!=='true';
   setMenu(b,open,pointer?(desktop?'pointer':'touch'):'keyboard');menuState.hoverClick=null;
  }else if(e.target.closest('nav a[href]'))closeMenus();
 });
 host.addEventListener('keydown',e=>{
  if(e.key==='Tab'&&menuState.path.length)menuState.mode='keyboard';
  const b=e.target.closest(navTriggerSelector);
  if(b&&['ArrowDown','ArrowUp','ArrowRight'].includes(e.key)){
   if(e.key==='ArrowRight'&&!b.hasAttribute('data-submenu'))return;
   e.preventDefault();setMenu(b,true,'keyboard');firstMenuTarget(panelFor(b),e.key==='ArrowUp')?.focus();
  }else if(e.key==='ArrowLeft'&&menuState.path.length>1){
   e.preventDefault();const t=menuState.path.at(-1);closeMenuPath(menuState.path.length-1);t.focus();
  }
 });
 host.addEventListener('focusout',e=>{
  if(!menuState.path.length||menuState.mode!=='keyboard')return;
  const root=menuState.path[0].closest('.nav-item');
  if(!root?.contains(e.relatedTarget))closeMenus();
 });
 host.addEventListener('pointerover',e=>{
  if(e.pointerType!=='mouse'||!matchMedia('(hover: hover)').matches)return;
  const item=e.target.closest('.desktop-nav .nav-item,.desktop-nav .submenu-item');
  if(!item||item.contains(e.relatedTarget))return;
  cancelMenuTimer();const b=item.querySelector(':scope > [data-menu],:scope > [data-submenu]');
  if(b){setMenu(b,true,'pointer');menuState.hoverClick=b;}
 });
 host.addEventListener('pointerout',e=>{
  const item=e.target.closest('.desktop-nav .nav-item,.desktop-nav .submenu-item');
  const root=item?.closest('.nav-item');
  if(root&&!root.contains(e.relatedTarget))scheduleMenuLeave(root);else if(item&&!item.contains(e.relatedTarget))scheduleMenuLeave(item);
 });
}
document.addEventListener('click',e=>{if(menuState.path.length&&!menuState.path[0].closest('.nav-item')?.contains(e.target))closeMenus();});
document.addEventListener('keydown',e=>{
 if(e.key==='Escape'&&menuState.path.length){e.preventDefault();const b=menuState.path.at(-1);closeMenuPath(menuState.path.length-1);menuState.mode=menuState.path.length?'keyboard':null;b.focus({preventScroll:true});}
});
window.addEventListener('pagehide',closeMenus);
window.addEventListener('blur',closeMenus);
window.addEventListener('resize',closeMenus);

document.addEventListener('click',e=>{
 const t=e.target.closest('button,a');
 if(!t)return;
 if(t.matches('[data-close]'))t.closest('dialog').close();
 if(t.matches('[data-search]')){if(matchMedia('(max-width:800px)').matches){location.href='search.html';return;}const opening=inlineSearch.hidden;inlineSearch.hidden=!opening;t.setAttribute('aria-expanded',String(opening));if(opening){closeMenus();document.querySelector('#global-search').focus();}else t.focus();}
 if(t.matches('[data-myipsi]'))showDetail(`<h2 id="dialog-title">Profil pengguna</h2>${note}<p>Login aplikasi IPSI akan tersedia pada fase berikutnya melalui arsitektur integrasi yang disetujui.</p><p>Prototipe ini tidak menyediakan login dan tidak mengakses IPSI Core.</p>`);
 if(t.closest('#drawer')&&t.tagName==='A')drawer.close();
});
document.querySelector('#open-drawer').addEventListener('click',()=>{closeSearch(false);closeMenus();openDialog(drawer);document.querySelector('#open-drawer').setAttribute('aria-expanded','true');});
document.querySelectorAll('dialog').forEach(d=>{
 d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close();}});
 d.addEventListener('close',()=>{if(!document.querySelector('dialog[open]'))document.body.classList.remove('modal-open');if(d===drawer){closeMenus();document.querySelector('#open-drawer').setAttribute('aria-expanded','false');}if(d===detail&&dialogReturn?.isConnected)dialogReturn.focus({preventScroll:true});});
});
// Keep keyboard focus within the active modal, including at browser chrome boundaries.
document.addEventListener('keydown',e=>{
 if(e.key!=='Tab')return;
 const modal=document.querySelector('dialog[open]');
 if(!modal)return;
 const targets=[...modal.querySelectorAll('a[href],button:not(:disabled),input,select,[tabindex]')].filter(el=>el.tabIndex>=0&&el.getClientRects().length);
 const first=targets[0],last=targets[targets.length-1];
 if(!first)return;
 if(e.shiftKey&&(document.activeElement===first||!modal.contains(document.activeElement))){e.preventDefault();last.focus();}
 else if(!e.shiftKey&&(document.activeElement===last||!modal.contains(document.activeElement))){e.preventDefault();first.focus();}
});
function portrait(a){return `<div class="portrait ${a.tone}" aria-label="Ilustrasi profil pesilat"><span class="portrait-initials">${a.initials}</span><span class="tag">Pesilat</span><svg viewBox="0 0 280 220" aria-hidden="true"><circle cx="140" cy="76" r="35" fill="currentColor" opacity=".85"/><path d="M55 220c0-65 31-103 85-103s85 38 85 103" fill="currentColor"/><path d="m107 124 33 50 33-50M140 174v46M100 194h80" stroke="#fff" stroke-width="3" opacity=".55" fill="none"/></svg></div>`;}
function athleteCard(a){return `<a class="athlete-card" href="athlete-profile.html?id=${a.id}">${portrait(a)}<div class="athlete-card-info"><span class="eyebrow">${a.category} · ${a.gender}</span><h3>${a.name}</h3><p>${a.province}</p><div class="athlete-card-bottom"><span>${a.class}</span><span>Lihat profil ${arrow}</span></div></div></a>`;}
function newsCard(n){return `<a class="news-card" href="news-detail.html?id=${n.id}"><div class="image-wrap"><img src="assets/images/${n.image}" alt="Foto ilustrasi pencak silat" loading="lazy"></div><div><span class="eyebrow">${n.category}</span><h3>${n.title}</h3><p class="news-excerpt">${n.summary}</p><span class="date-meta">${n.date} · Cerita contoh</span></div></a>`;}
function dateBlock(e){const d=new Date(e.date+'T12:00:00');return `<div class="agenda-date"><strong>${d.getDate().toString().padStart(2,'0')}</strong><small>${d.toLocaleDateString('id-ID',{month:'short'}).toUpperCase()}</small></div>`;}
function banner(title,desc,kicker='JELAJAHI IPSI'){return `<div class="page-banner"><div class="container"><nav class="breadcrumbs" aria-label="Breadcrumb"><a href="index.html">Beranda</a><span aria-hidden="true">/</span><span aria-current="page">${title}</span></nav><span class="eyebrow">${kicker}</span><h1>${title}</h1><p>${desc}</p></div></div>`;}
function heading(k,t,url,label='Lihat semua'){return `<div class="section-heading"><div><span class="eyebrow">${k}</span><h2>${t}</h2></div>${url?`<a class="text-link" href="${url}">${label} ${arrow}</a>`:''}</div>`;}
function home(){window.IPSI_FEDERATION.render('home',ui);}
function options(items,all){return `${all?`<option value="">${all}</option>`:''}${items.map(i=>`<option value="${esc(i)}">${esc(i)}</option>`).join('')}`;}
function field(id,label,items,all){return `<label class="field"><span>${label}</span><select id="${id}">${options(items,all)}</select></label>`;}
function searchField(id,label,placeholder){return `<label class="field"><span>${label}</span><div class="filter-search">${icon('search',16)}<input id="${id}" type="search" placeholder="${placeholder}" autocomplete="off"></div></label>`;}
function empty(text='Coba ubah atau reset filter.'){return `<div class="empty-state"><h2>Tidak ada hasil</h2><p>${text}</p></div>`;}
function pagination(total,current,size){const count=Math.ceil(total/size);return `<div class="pagination"><span>${total?`${(current-1)*size+1}–${Math.min(current*size,total)} dari ${total}`:'0'} hasil</span><div class="page-buttons">${Array.from({length:count},(_,i)=>`<button data-page="${i+1}" aria-label="Halaman ${i+1}" ${current===i+1?'aria-current="page"':''}>${i+1}</button>`).join('')}</div></div>`;}
function syncTableScrollHints(){document.querySelectorAll('[data-table-scroll-hint]').forEach(hint=>{const wrapper=document.getElementById(hint.dataset.tableScrollHint)?.querySelector('.table-wrap'),table=wrapper?.querySelector('table');hint.hidden=!(table&&table.scrollWidth>wrapper.clientWidth);});}
let tableHintFrame=0;
window.addEventListener('resize',()=>{if(tableHintFrame)cancelAnimationFrame(tableHintFrame);tableHintFrame=requestAnimationFrame(()=>{tableHintFrame=0;syncTableScrollHints();});});
function wireFilters(ids,render){ids.forEach(id=>document.getElementById(id).addEventListener(document.getElementById(id).tagName==='INPUT'?'input':'change',render));}
function eventDetail(id){location.replace('event-detail.html?id='+encodeURIComponent(id));}
function calendar(){let view='list';main.innerHTML=banner('Kalender kompetisi','Rencanakan perjalanan Anda melalui agenda pencak silat.','KOMPETISI & EVENT')+`<section class="section"><div class="container">${note}<div class="filter-panel"><div class="filter-grid">${field('month','Bulan',['2026-10','2026-11','2026-12'],'Semua bulan')}${field('event-category','Kategori',['Tanding','Jurus'],'Semua kategori')}${field('status','Status',['Akan datang','Berlangsung','Selesai'],'Semua status')}<button class="btn btn-outline" id="reset">Reset filter</button></div></div><div class="results-bar"><span id="event-count" role="status"></span><div class="view-switch"><button data-view="list" aria-pressed="true">${icon('list',15)} Daftar</button><button data-view="month" aria-pressed="false">${icon('grid',15)} Bulanan</button></div></div><div id="events"></div><p class="photo-note">Seluruh event dan tanggal di halaman ini bersifat fiktif.</p></div></section>`;
 document.querySelectorAll('#month option').forEach(o=>{if(o.value)o.textContent=new Date(o.value+'-01T12:00:00').toLocaleDateString('id-ID',{month:'long',year:'numeric'});});
 if(['Akan datang','Berlangsung','Selesai'].includes(params.get('status')))document.querySelector('#status').value=params.get('status');if(['Tanding','Jurus'].includes(params.get('category')))document.querySelector('#event-category').value=params.get('category');
 const render=()=>{const month=document.querySelector('#month').value,c=document.querySelector('#event-category').value,s=document.querySelector('#status').value;const all=D.events.filter(e=>(!month||e.date.startsWith(month))&&(!c||e.category_ids.includes(c==='Tanding'?'tanding':'jurus'))&&(!s||e.status===s)).sort((a,b)=>a.date.localeCompare(b.date));document.querySelector('#event-count').innerHTML=`<strong>${all.length}</strong> agenda kompetisi`;if(view==='list'){document.querySelector('#events').innerHTML=all.length?`<div class="event-list">${all.map(e=>window.IPSI_PAGES.eventCard(e,ui)).join('')}</div>`:empty();}else{const [year,m]=month.split('-').map(Number),start=new Date(year,m-1,1),days=new Date(year,m,0).getDate(),offset=(start.getDay()+6)%7;document.querySelector('#events').innerHTML=`<div class="month-heading"><h2>${start.toLocaleDateString('id-ID',{month:'long',year:'numeric'})}</h2></div><div class="month-grid">${['Sen','Sel','Rab','Kam','Jum','Sab','Min'].map(d=>`<div class="weekday">${d}</div>`).join('')}${Array.from({length:offset},()=>'<div class="month-day blank"></div>').join('')}${Array.from({length:days},(_,i)=>`<div class="month-day"><span>${i+1}</span>${all.filter(e=>+e.date.slice(8)===i+1).map(e=>`<a class="calendar-event" href="event-detail.html?id=${e.id}" aria-label="${e.name}, ${e.label} 2026"><span class="calendar-full">${e.name}</span><span class="calendar-compact" aria-hidden="true">Event</span></a>`).join('')}</div>`).join('')}</div><p class="photo-note">Event ditampilkan pada tanggal mulai. Pilih event untuk rentang tanggal lengkap.</p><div class="calendar-summary mobile-only"><h3>Agenda bulan ini</h3>${all.length?all.map(e=>`<a href="event-detail.html?id=${e.id}"><strong>${e.label}</strong><span>${e.name}</span>${arrow}</a>`).join(''):empty('Belum ada agenda dengan filter ini.')}</div>`;}};
 wireFilters(['month','event-category','status'],()=>{if(view==='month'&&!document.querySelector('#month').value)document.querySelector('#month').value='2026-10';render();});document.querySelectorAll('[data-view]').forEach(b=>b.onclick=()=>{view=b.dataset.view;if(view==='month'&&!document.querySelector('#month').value)document.querySelector('#month').value='2026-10';document.querySelectorAll('[data-view]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));render();});document.querySelector('#reset').onclick=()=>{document.querySelector('#month').value=view==='month'?'2026-10':'';document.querySelector('#event-category').value='';document.querySelector('#status').value='';render();};render();if(params.has('event'))eventDetail(params.get('event'));}
function orgDetail(id){location.replace('organization-detail.html?id='+encodeURIComponent(id));}
function organizations(){let level=['PB','Pengprov','Pengcab'].includes(params.get('level'))?params.get('level'):'Pengprov';main.innerHTML=banner('Direktori organisasi','Satu ikatan yang menghubungkan pusat, provinsi, dan kabupaten / kota.','JARINGAN IPSI')+`<section class="section"><div class="container">${note}<div class="filter-panel"><div class="filter-grid">${searchField('org-search','Cari organisasi','Nama atau kota…')}${field('org-province','Provinsi',D.provinces,'Semua provinsi')}<button class="btn btn-outline" id="reset">Reset filter</button></div></div><div class="org-layout"><aside class="org-sidebar" aria-label="Tingkat organisasi"><span class="eyebrow">TINGKAT ORGANISASI</span>${['Semua','PB','Pengprov','Pengcab'].map(l=>`<button class="org-level" data-level="${l}" aria-pressed="${l===level}"><span>${l==='PB'?'Pengurus Besar':l}</span><small>${l==='Semua'?10:D.organizations.filter(o=>o.level===l).length}</small></button>`).join('')}</aside><div><div class="results-bar"><span id="org-count" role="status"></span><span>Data demonstrasi</span></div><h2 class="sr-only">Organisasi dalam direktori</h2><div class="org-grid" id="organizations"></div></div></div></div></section>`;
 const render=()=>{const q=document.querySelector('#org-search').value.toLowerCase(),p=document.querySelector('#org-province').value,all=D.organizations.filter(o=>(level==='Semua'||o.level===level)&&(!p||o.province===p)&&`${o.name} ${o.city}`.toLowerCase().includes(q));document.querySelector('#org-count').innerHTML=`<strong>${all.length}</strong> organisasi · ${level}`;document.querySelector('#organizations').innerHTML=all.length?all.map(o=>`<article class="org-card"><div class="org-card-top"><span class="org-symbol">${icon('building',25)}</span><span class="tag tag-quiet">${o.level}</span></div><h3>${o.name}</h3><p>${o.city} · ${o.province}</p><p class="photo-note">Struktur dan pengurus demonstrasi</p><div class="org-card-actions"><a class="text-link" href="organization-detail.html?id=${o.id}">Lihat organisasi ${arrow}</a></div></article>`).join(''):empty();};
 wireFilters(['org-search','org-province'],render);document.querySelectorAll('[data-level]').forEach(b=>b.onclick=()=>{level=b.dataset.level;document.querySelectorAll('[data-level]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));render();});document.querySelector('#reset').onclick=()=>{document.querySelector('#org-search').value='';document.querySelector('#org-province').value='';render();};render();if(params.has('org'))orgDetail(params.get('org'));}
// A missing editorial photograph retains a readable gradient hero, never a broken image icon.
document.addEventListener('error',e=>{
 const image=e.target;if(!image.matches?.('.news-feature > img,.editorial-hero-image'))return;
 image.hidden=true;const hero=image.closest('.news-feature,.editorial-image-hero');hero.classList.add('is-image-fallback');
 const status=hero.querySelector('.hero-image-status');if(status)status.hidden=false;
},true);
const ui={D,main,esc,arrow,icon,note,heading,newsCard,athleteCard,portrait,dateBlock,field,searchField,empty,pagination,showDetail,syncTableScrollHints};
if(!window.IPSI_PERGURUAN?.render(page,ui)&&!window.IPSI_REFEREE_DIRECTORY?.render(page,ui)&&!window.IPSI_COACH_DIRECTORY?.render(page,ui)&&!window.IPSI_SPORTS.render(page,ui)&&!window.IPSI_FEDERATION.render(page,ui)&&!window.IPSI_PAGES.render(page,ui)){const render={home,calendar,organization:organizations}[page];if(render)render();else main.innerHTML='<section class="section container error-state" role="alert"><h1>Halaman tidak tersedia</h1><a class="btn" href="index.html">Kembali ke beranda</a></section>';}
document.querySelectorAll('img:not([width])').forEach(img=>{img.setAttribute('width','830');img.setAttribute('height','556');});
document.addEventListener('click',e=>{if(e.target.closest('button[data-page]'))document.querySelector('.page-buttons [aria-current=page]')?.focus({preventScroll:true});});
// Accessible tabs: arrow navigation, Home/End and linked tab panels.
function prepareTabs(){document.querySelectorAll('[role=tablist]:not([data-multi-panel])').forEach(list=>{const tabs=[...list.querySelectorAll('[role=tab]')],panel=list.nextElementSibling;tabs.forEach((t,i)=>{t.id=t.id||`${list.getAttribute('aria-label').replace(/\W/g,'')}-tab-${i}`;t.tabIndex=t.getAttribute('aria-selected')==='true'?0:-1;t.setAttribute('aria-controls',panel.id);});panel.setAttribute('aria-labelledby',tabs.find(t=>t.getAttribute('aria-selected')==='true').id);});}
prepareTabs();document.addEventListener('click',e=>{if(e.target.closest('[role=tab]'))prepareTabs();});
document.addEventListener('keydown',e=>{const t=e.target.closest('[role=tab]');if(!t||!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;e.preventDefault();const tabs=[...t.parentElement.querySelectorAll('[role=tab]')],i=tabs.indexOf(t),next=e.key==='Home'?0:e.key==='End'?tabs.length-1:(i+(e.key==='ArrowRight'?1:-1)+tabs.length)%tabs.length;tabs[next].click();tabs[next].focus();});
})();
