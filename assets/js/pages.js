/* Additional public templates. Presentation helpers are shared with app.js. */
window.IPSI_PAGES = (() => {
  'use strict';
  let U, D, main;
  const query = new URLSearchParams(location.search);
  const image = (file,alt,extra='') => `<img src="assets/images/${file}" alt="${U.esc(alt)}" width="830" height="556" ${extra}>`;
  const date = value => new Date(value+'T12:00:00').toLocaleDateString('id-ID',{day:'numeric',month:'long',year:'numeric'});
  const crumb = items => `<nav class="breadcrumbs" aria-label="Breadcrumb"><a href="index.html">Beranda</a>${items.map(([label,url])=>`<span aria-hidden="true">/</span>${url?`<a href="${url}">${U.esc(label)}</a>`:`<span aria-current="page">${U.esc(label)}</span>`}`).join('')}</nav>`;
  const banner = (title,description,kicker,parents=[]) => `<section class="page-banner"><div class="container">${crumb([...parents,[title]])}<span class="eyebrow">${kicker}</span><h1>${U.esc(title)}</h1></div></section>`;
  const notFound = (label,url) => {
    document.title=`Tidak ditemukan · IPSI`;
    main.innerHTML=banner(`${label} tidak ditemukan`,'ID tidak tersedia pada fixture atau URL belum lengkap.','HALAMAN TIDAK TERSEDIA')+`<section class="section container"><div class="empty-state" role="status"><h2>Periksa tautan Anda</h2><p>Data mungkin tidak tersedia pada prototipe ini.</p><a class="btn" href="${url}">Kembali ke direktori ${U.linkArrow}</a></div></section>`;
  };
  function sync(values) {
    if(location.protocol==='file:')return;
    const url=new URL(location.href);
    Object.entries(values).forEach(([k,v])=>v?url.searchParams.set(k,v):url.searchParams.delete(k));
    history.replaceState(null,'',url);
  }
  function applyQuery(id,key) {
    const el=document.getElementById(id),value=query.get(key)||'';
    if(el.tagName==='INPUT'||[...el.options].some(o=>o.value===value))el.value=value;
  }
  // Shared listing controller: query, select filters, pagination and accessible result status.
  function listing({records,filters,matches,card,size=6,target,gridClass='news-grid',gridModeClass=''}) {
    let view='grid';
    let current=Math.max(1,parseInt(query.get('page'),10)||1);
    filters.forEach(([id,key])=>applyQuery(id,key));
    function render(){
      const values=Object.fromEntries(filters.map(([id,key])=>[key,document.getElementById(id).value]));
      const rows=records.filter(r=>matches(r,values));
      current=Math.min(current,Math.max(1,Math.ceil(rows.length/size)));
      const grid=document.getElementById(target);
      grid.className=gridClass+(gridModeClass&&view==='grid'?' '+gridModeClass:'');
      grid.innerHTML=rows.length?rows.slice((current-1)*size,current*size).map(card).join(''):U.empty();
      document.getElementById('listing-status').textContent=`${rows.length} hasil ditemukan.`;
      const pagination=document.getElementById('pagination');
      if(pagination)pagination.innerHTML=U.pagination(rows.length,current,size);
      sync({...values,page:current>1?current:''});
    }
    filters.forEach(([id])=>document.getElementById(id).addEventListener(document.getElementById(id).tagName==='INPUT'?'input':'change',()=>{current=1;render();}));
    document.getElementById('reset').onclick=()=>{filters.forEach(([id])=>document.getElementById(id).value='');current=1;render();};
    if(gridModeClass)document.querySelectorAll('.ipsi-icon-view-switch [data-view]').forEach(b=>b.onclick=()=>{view=b.dataset.view;document.querySelectorAll('.ipsi-icon-view-switch [data-view]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));render();});
    document.getElementById('pagination')?.addEventListener('click',e=>{
      const b=e.target.closest('button[data-page]');
      if(b){current=+b.dataset.page;render();document.getElementById(target).scrollIntoView({block:'start'});}
    });
    render();
  }
  function news(){
    const lead=D.news[0];
    main.innerHTML=banner('Kabar Silat','Cerita pembinaan, budaya, dan semangat dari dunia pencak silat.','BERITA & CERITA')+`<section class="section"><div class="container">${U.note}<a class="news-feature ${lead.image?'':'is-image-fallback'}" href="news-detail.html?id=${lead.id}">${lead.image?image(lead.image,lead.alt,'fetchpriority="high"'):''}<div><span class="eyebrow">PILIHAN REDAKSI · ${lead.category}</span><h2>${lead.title}</h2><p>${lead.summary}</p><span class="date-meta">${lead.date} · ${lead.author}</span><span class="text-link">Baca selengkapnya ${U.linkArrow}</span><small class="hero-image-status" role="status" ${lead.image?'hidden':''}>Foto ilustrasi belum tersedia.</small></div></a><div class="filter-panel ipsi-filter-toolbar"><div class="ipsi-filter-main ipsi-filter-main--compact"><div class="ipsi-search-field">${U.searchField('news-search','Cari berita','Judul atau isi ringkas…')}</div><div class="ipsi-filter-select">${U.field('news-category','Kategori',[...new Set(D.news.map(n=>n.category))],'Semua kategori')}</div>${U.resetFilterButton()}</div></div><div class="results-bar results-bar--context"><span>Editorial demonstrasi</span></div><span class="sr-only" id="listing-status" role="status" aria-live="polite"></span><div id="news-list"></div><div id="pagination"></div></div></section>`;
    listing({records:D.news,filters:[['news-search','q'],['news-category','category']],matches:(n,v)=>(!v.category||n.category===v.category)&&`${n.title} ${n.summary}`.toLowerCase().includes(v.q.toLowerCase()),card:U.newsCard,size:3,target:'news-list'});
  }
  function article(){
    const n=D.news.find(n=>n.id===query.get('id'));
    if(!n)return notFound('Berita','news.html');
    document.title=`${n.title} · IPSI`;
    main.innerHTML=`<article><header class="container editorial-image-hero ${n.image?'':'is-image-fallback'}">${n.image?image(n.image,n.alt,'fetchpriority="high"').replace('<img ','<img class="editorial-hero-image" '):''}<div class="editorial-hero-inner">${crumb([['Kabar Silat','news.html'],[n.title]])}<div class="editorial-hero-copy"><span class="eyebrow">${U.esc(n.category)} · CERITA DEMONSTRASI</span><h1>${U.esc(n.title)}</h1><p class="article-deck">${U.esc(n.summary)}</p><div class="article-meta"><time datetime="${n.published}">${n.date}</time><span>${U.esc(n.author)}</span></div><small class="hero-image-status" role="status" ${n.image?'hidden':''}>Foto ilustrasi belum tersedia.</small></div></div></header><p class="container editorial-caption">${U.esc(n.image?n.caption:'Foto ilustrasi belum tersedia.')} · ${U.esc(n.source)}</p><div class="reading-width article-body">${U.note}${n.body.map(p=>`<section><h2>${p.heading}</h2><p>${p.text}</p></section>`).join('')}<div class="share-row"><strong>Bagikan cerita</strong><button class="share-action" type="button" id="copy-link"><i class="fa-solid fa-link" aria-hidden="true"></i><span>Salin tautan</span></button><a class="share-action" href="https://wa.me/?text=${encodeURIComponent(n.title+' '+location.href)}" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-whatsapp" aria-hidden="true"></i><span>WhatsApp</span></a><a class="share-action" href="mailto:?subject=${encodeURIComponent(n.title)}&amp;body=${encodeURIComponent(location.href)}"><i class="fa-solid fa-envelope" aria-hidden="true"></i><span>Email</span></a><span id="share-status" role="status"></span></div><a class="text-link" href="news.html">← Kembali ke Kabar Silat</a></div></article><section class="section section-muted"><div class="container">${U.heading('BACA JUGA','Cerita terkait','news.html','Semua berita')}<div class="news-grid">${D.news.filter(x=>x.id!==n.id).map(U.newsCard).join('')}</div></div></section>`;
    document.getElementById('copy-link').onclick=async()=>{
      const status=document.getElementById('share-status');
      try{await navigator.clipboard.writeText(location.href);status.textContent='Tautan berhasil disalin.';}
      catch{status.textContent='Salin URL dari address bar browser Anda.';}
    };
  }
  function eventCard(e){return `<article class="event-card">${U.dateBlock(e)}<div><div class="event-info"><span class="tag ${e.status==='Selesai'?'tag-quiet':'tag-green'}">${e.status}</span><span>${e.category} · ${e.level}</span></div><h3><a href="event-detail.html?id=${e.id}">${e.name}</a></h3><p>${e.label} 2026 · ${e.venue}, ${e.city}</p></div><a class="btn btn-outline" href="event-detail.html?id=${e.id}" aria-label="Detail ${e.name}">Detail ${U.linkArrow}</a></article>`;}
  function event(){
    const e=D.events.find(e=>e.id===query.get('id'));
    if(!e)return notFound('Event','calendar.html');
    document.title=`${e.name} · IPSI`;
    const result=D.results[e.id];
    main.innerHTML=banner(e.name,e.description,'KOMPETISI · DATA DEMONSTRASI',[['Kalender kompetisi','calendar.html']])+`<section class="section"><div class="container">${U.note}<div class="event-summary"><div><span class="tag ${e.status==='Selesai'?'tag-quiet':'tag-green'}">${e.status} · simulasi</span><h2>${date(e.date)} – ${date(e.end)}</h2><p>${e.venue} · ${e.city}, ${e.province}</p></div><div class="event-category"><span class="eyebrow">KATEGORI PERTANDINGAN</span><strong>${e.category}</strong><span>${e.level}</span></div></div><div class="tabs" role="tablist" aria-label="Informasi event" data-multi-panel><button role="tab" id="event-info-tab" aria-controls="event-info" aria-selected="true">Informasi</button><button role="tab" id="event-program-tab" aria-controls="event-program" aria-selected="false" tabindex="-1">Program</button><button role="tab" id="event-results-tab" aria-controls="event-results" aria-selected="false" tabindex="-1">Hasil</button></div><section role="tabpanel" tabindex="0" id="event-info" aria-labelledby="event-info-tab"><div class="profile-details"><div class="info-panel"><h2>Tentang event</h2><p>${e.description}</p><dl class="detail-grid"><div><dt>Mulai</dt><dd>${date(e.date)}</dd></div><div><dt>Selesai</dt><dd>${date(e.end)}</dd></div><div><dt>Venue ilustratif</dt><dd>${e.venue}</dd></div><div><dt>Lokasi</dt><dd>${e.city}, ${e.province}</dd></div></dl></div><aside class="info-panel"><h2>Informasi pendukung</h2><p>Program dan tempat bersifat fiktif. Tidak ada pendaftaran atau konfirmasi peserta pada prototipe.</p><a class="text-link" href="documents.html?category=Kompetisi">Dokumen kompetisi ${U.linkArrow}</a><p class="photo-note">Ketersediaan dokumen ditampilkan secara eksplisit.</p></aside></div></section><section role="tabpanel" tabindex="0" id="event-program" aria-labelledby="event-program-tab" hidden><div class="info-panel"><h2>Program demonstrasi</h2><p>Contoh sesi pada tanggal mulai ${date(e.date)} · waktu ilustratif WIB (UTC+7), bukan jadwal operasional.</p><ol class="schedule-list">${D.program.map(p=>`<li><span class="schedule-time">${p.time}</span><div><h3>${p.title}</h3><p>${p.description}</p></div></li>`).join('')}</ol></div></section><section role="tabpanel" tabindex="0" id="event-results" aria-labelledby="event-results-tab" hidden>${result?`<div class="data-note"><strong>Hasil ${result.status} · simulasi</strong><span>${result.source} · ${result.updated}</span></div><p class="table-hint">Status Provisional adalah contoh label verifikasi. Tidak ada fixture hasil Official. Hasil tidak menghitung ulang ranking.</p><div class="table-wrap" tabindex="0" role="region" aria-label="Hasil demonstrasi, dapat digeser"><table><caption>${result.category} · ${result.class} · ${result.status}</caption><thead><tr><th scope="col">Posisi</th><th scope="col">Pesilat</th><th scope="col">Provinsi</th><th scope="col">Medali contoh</th></tr></thead><tbody>${result.rows.map(r=>{const a=D.athletes.find(a=>a.id===r.athlete);return `<tr><td><span class="rank-position" data-rank="${r.position}">${r.position}</span></td><td><a class="table-athlete" href="athlete-profile.html?id=${a.id}">${a.name}</a></td><td>${a.province}</td><td>${r.medal}</td></tr>`;}).join('')}</tbody></table></div>`:U.empty('Belum ada fixture hasil untuk event ini. Bukan publikasi hasil resmi.')}</section></div></section><section class="section section-muted"><div class="container">${U.heading('AGENDA LAIN','Jelajahi event berikutnya','calendar.html','Kalender')}<div class="event-list">${D.events.filter(x=>x.id!==e.id&&x.status!=='Selesai').slice(0,2).map(eventCard).join('')}</div></div></section>`;
    window.IPSI_SPORTS.enrichEvent(e,U);
    wireTabs();
  }
  function wireTabs(){
    document.querySelectorAll('[data-multi-panel]').forEach(list=>{
      const tabs=[...list.querySelectorAll('[role=tab]')];
      tabs.forEach(t=>t.onclick=()=>{tabs.forEach(b=>{const active=b===t;b.setAttribute('aria-selected',String(active));b.tabIndex=active?0:-1;document.getElementById(b.getAttribute('aria-controls')).hidden=!active;});});
      if(location.hash==='#hasil')tabs[tabs.length-1].click();
    });
  }
  function galleryCard(g){return `<a class="gallery-card" href="media-detail.html?id=${g.id}"><div class="image-wrap">${image(g.cover,g.title,'loading="lazy"')}<span class="tag">${g.photos.length} foto</span></div><div class="gallery-info"><span class="eyebrow">${g.category}</span><h2>${g.title}</h2><p>${g.description}</p><span class="date-meta">${g.date} · Galeri ilustrasi ${U.linkArrow}</span></div></a>`;}
  function media(){
    main.innerHTML=banner('Lensa pencak silat','Dokumentasi budaya, gerak, dan kebersamaan dalam galeri yang memiliki konteks.','MEDIA & GALERI')+`<section class="section"><div class="container">${U.note}<div class="filter-panel ipsi-filter-toolbar"><div class="ipsi-filter-main ipsi-filter-main--compact"><div class="ipsi-search-field">${U.searchField('media-search','Cari galeri','Judul atau deskripsi…')}</div><div class="ipsi-filter-select">${U.field('media-category','Kategori',D.galleries.map(g=>g.category),'Semua kategori')}</div>${U.resetFilterButton()}</div></div><div class="results-bar results-bar--context"><span>Arsip foto ilustratif</span></div><span class="sr-only" id="listing-status" role="status" aria-live="polite"></span><div id="media-list"></div><div id="pagination"></div><p class="asset-notice">Foto dari aset mockup existing untuk development. Hak publikasi belum diverifikasi; ganti dengan aset berizin sebelum peluncuran publik.</p></div></section>`;
    listing({records:D.galleries,filters:[['media-search','q'],['media-category','category']],matches:(g,v)=>(!v.category||g.category===v.category)&&`${g.title} ${g.description}`.toLowerCase().includes(v.q.toLowerCase()),card:galleryCard,size:6,target:'media-list',gridClass:'gallery-grid'});
  }
  function gallery(){
    const g=D.galleries.find(g=>g.id===query.get('id'));
    if(!g)return notFound('Galeri','media.html');
    document.title=`${g.title} · Galeri IPSI`;
    const e=D.events.find(e=>e.id===g.event);
    main.innerHTML=banner(g.title,g.description,`${g.category.toUpperCase()} · GALERI ILUSTRASI`,[['Media & galeri','media.html']])+`<section class="section"><div class="container">${U.note}<div class="results-bar"><span>${g.date} · ${g.photos.length} foto</span><a class="text-link" href="media.html">← Semua galeri</a></div>${e?`<aside class="context-note"><strong>Referensi event sintetik</strong><a class="text-link" href="event-detail.html?id=${e.id}">${e.name} ${U.linkArrow}</a><p>Tautan ini menguji hubungan informasi. Foto arsip bukan dokumentasi event fiktif tersebut.</p></aside>`:''}<div class="gallery-photos">${g.photos.map((p,i)=>`<figure><button class="photo-expand" data-lightbox="${i}" aria-label="Perbesar foto ${i+1}: ${U.esc(p.caption)}">${image(p.image,p.caption,i?'loading="lazy"':'fetchpriority="high"')}<span>Perbesar ${U.icon('expand',16)}</span></button><figcaption>${p.caption}</figcaption></figure>`).join('')}</div><p class="asset-notice">Sumber: aset mockup existing. Hak publikasi belum diverifikasi; foto perlu diganti atau diberi izin sebelum production.</p></div></section><section class="section section-muted"><div class="container">${U.heading('JELAJAHI LAGI','Galeri lainnya','media.html','Semua galeri')}<div class="gallery-grid">${D.galleries.filter(x=>x.id!==g.id).map(galleryCard).join('')}</div></div></section>`;
    document.querySelectorAll('[data-lightbox]').forEach(b=>b.onclick=()=>{
      const p=g.photos[+b.dataset.lightbox];
      U.showDetail(`<h2 id="dialog-title">${g.title}</h2><figure class="lightbox-photo">${image(p.image,p.caption)}<figcaption>${p.caption}</figcaption></figure><p class="photo-note">Ilustrasi dari mockup existing, bukan dokumentasi event sintetik.</p>`);
    });
  }
  function documentCard(d){return `<article class="document-card"><div class="document-icon" aria-hidden="true">${d.format}</div><div><span class="eyebrow">${d.type}</span><h2>${d.name}</h2><p>${d.description}</p><dl class="document-meta"><div><dt>Terbit</dt><dd>${date(d.published)}</dd></div><div><dt>Versi</dt><dd>${d.version}</dd></div><div><dt>Jenis</dt><dd>${d.format}</dd></div><div><dt>Ukuran</dt><dd>${d.size||'Belum tersedia'}</dd></div></dl></div><div class="document-action">${d.file?`<a class="btn btn-outline" href="${d.file}" download="panduan-evaluasi-ipsi.zip" aria-label="Unduh ${d.name} (${d.format})">Unduh ${d.format} ↓</a><small>Dokumen sintetik</small>`:'<button class="btn btn-outline" disabled>Belum Tersedia</button><small>Berkas belum disertakan</small>'}</div></article>`;}
  function documents(){
    main.innerHTML=banner('Dokumen & regulasi','Temukan informasi publik berdasarkan kategori, versi, dan ketersediaan berkas.','PUSAT DOKUMEN')+`<section class="section"><div class="container">${U.note}<div class="filter-panel ipsi-filter-toolbar"><div class="ipsi-filter-main ipsi-filter-main--with-view"><div class="ipsi-search-field">${U.searchField('document-search','Cari dokumen','Judul atau deskripsi…')}</div><div class="ipsi-filter-select">${U.field('document-category','Kategori',['Panduan','Kompetisi','Organisasi'],'Semua kategori')}</div><div class="ipsi-filter-actions">${U.resetFilterButton()}${U.viewSwitch('Tampilan dokumen')}</div></div></div><div class="results-bar results-bar--context"><span>Bukan regulasi resmi IPSI</span></div><span class="sr-only" id="listing-status" role="status" aria-live="polite"></span><div id="document-list"></div><div id="pagination"></div></div></section>`;
    listing({records:D.documents,filters:[['document-search','q'],['document-category','category']],matches:(d,v)=>(!v.category||d.type===v.category)&&`${d.name} ${d.description}`.toLowerCase().includes(v.q.toLowerCase()),card:documentCard,size:6,target:'document-list',gridClass:'document-list',gridModeClass:'document-list--grid'});
  }
  function organizationDetail(){
    const o=D.organizations.find(o=>o.id===query.get('id'));
    if(!o)return notFound('Organisasi','organization.html');
    const parent=D.organizations.find(p=>p.id===o.parent),children=D.organizations.filter(c=>c.parent===o.id);
    document.title=`${o.name} · Direktori IPSI`;
    const parents=[['Direktori organisasi','organization.html']];
    if(parent)parents.push([parent.name,`organization-detail.html?id=${parent.id}`]);
    main.innerHTML=banner(o.name,`${o.city} · ${o.province}`,`${o.level} · DIREKTORI DEMONSTRASI`,parents)+`<section class="section"><div class="container">${U.note}<div class="profile-details"><section class="info-panel"><h2>Informasi organisasi</h2><dl class="detail-grid"><div><dt>Tingkat</dt><dd>${o.level}</dd></div><div><dt>Wilayah</dt><dd>${o.province}</dd></div><div><dt>Kota</dt><dd>${o.city}</dd></div><div><dt>Induk</dt><dd>${parent?`<a class="text-link" href="organization-detail.html?id=${parent.id}">${parent.name} ${U.linkArrow}</a>`:'Tingkat pusat pada fixture'}</dd></div></dl></section><section class="info-panel"><span class="eyebrow">PENGURUS SINTETIK</span><h2>${o.leader}</h2><p>${o.role}</p><p class="photo-note">Bukan pengurus resmi. Kontak pribadi dan data internal tidak disertakan.</p></section></div><section class="subsection">${U.heading('HIERARKI ORGANISASI','Unit di bawahnya')}<div class="org-grid">${children.length?children.map(c=>`<article class="org-card"><span class="tag tag-quiet">${c.level}</span><h3>${c.name}</h3><p>${c.city}</p><a class="text-link" href="organization-detail.html?id=${c.id}">Lihat organisasi ${U.linkArrow}</a></article>`).join(''):U.empty('Belum ada unit turunan dalam fixture ini.')}</div></section><a class="text-link" href="organization.html?level=${o.level}">← Kembali ke direktori ${o.level}</a></div></section>`;
  }
  return {render(page,ui){
    U=ui;D=ui.D;main=ui.main;
    const renderers={news,article,event,media,gallery,documents,'organization-detail':organizationDetail};
    if(!renderers[page])return false;
    renderers[page]();return true;
  },eventCard:(e,ui)=>{U=ui;return eventCard(e);}};
})();
