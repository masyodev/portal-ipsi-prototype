/* Public coach baseline. Local fixtures only; shared helpers supplied by app.js. */
window.IPSI_COACH_DIRECTORY=(()=>{
 'use strict';
 let U,C;
 const query=new URLSearchParams(location.search);
 const size=6;
 const label=(group,key)=>C.classifications[group].find(x=>x.value===key)?.label||'Belum dicantumkan';
 const disclaimer=()=>`<aside class="coach-disclaimer" aria-label="Keterangan data demonstrasi"><strong>Data pelatih sintetis.</strong> Seluruh identitas, pengalaman dan sertifikasi di halaman ini adalah contoh demonstrasi. ${U.esc(C.classifications.disclaimer)}</aside>`;
 const crumb=(name)=>`<nav class="breadcrumbs" aria-label="Breadcrumb"><a href="index.html">Beranda</a><span aria-hidden="true">/</span>${name?`<a href="${backURL()}">Direktori Pelatih IPSI</a><span aria-hidden="true">/</span><span aria-current="page">${U.esc(name)}</span>`:'<span aria-current="page">Direktori Pelatih IPSI</span>'}</nav>`;
 const intro=(title,subtitle,name)=>`<section class="page-banner"><div class="container">${crumb(name)}<span class="eyebrow">TEKNIS OLAHRAGA · DEMONSTRASI</span><h1>${U.esc(title)}</h1><p>${U.esc(subtitle)}</p></div></section>`;
 const avatar=c=>`<span class="coach-avatar" role="img" aria-label="Avatar inisial sintetis ${U.esc(c.name)}"><span aria-hidden="true">${U.esc(c.avatar.initials)}</span><small aria-hidden="true">DEMO</small></span>`;
 const status=c=>c.licenseStatus?`<span class="coach-status">${U.esc(label('statuses',c.licenseStatus))} · simulasi</span>`:'';
 const classifications=c=>`<div class="coach-badges"><span class="tag tag-quiet">${U.esc(label('levels',c.certificationLevel))}</span><span class="tag tag-quiet">Lisensi ${U.esc(label('scopes',c.licenseScope))}</span></div>`;
 function validState(raw){
  const state={q:(raw.get('q')||'').slice(0,160),level:'',scope:'',province:'',page:Math.max(1,Math.min(999,parseInt(raw.get('page'),10)||1))};
  for(const [key,values] of [['level',C.classifications.levels.map(x=>x.value)],['scope',C.classifications.scopes.map(x=>x.value)],['province',[...new Set(C.records.map(x=>x.province))]]])if(values.includes(raw.get(key)))state[key]=raw.get(key);
  return state;
 }
 function stateQuery(state){const q=new URLSearchParams();for(const key of ['q','level','scope','province'])if(state[key])q.set(key,state[key]);if(state.page>1)q.set('page',state.page);return q.toString();}
 function backURL(){const state=validState(new URLSearchParams(query.get('from')||'')),q=stateQuery(state);return 'coach.html'+(q?'?'+q:'');}
 function select(id,text,options,all){return `<div class="field"><label for="${id}">${text}</label><select id="${id}"><option value="">${all}</option>${options.map(o=>`<option value="${U.esc(o.value)}">${U.esc(o.label)}</option>`).join('')}</select></div>`;}
 function directory(){
  const state=validState(query),provinces=[...new Set(C.records.map(c=>c.province))].sort((a,b)=>a.localeCompare(b,'id'));
  U.main.innerHTML=intro('Direktori Pelatih IPSI','Informasi profil, kompetensi, dan sertifikasi pelatih pencak silat.')+`<section class="section coach-section"><div class="container">${disclaimer()}<form class="filter-panel" id="coach-filters" aria-label="Filter direktori pelatih"><div class="coach-filter-grid"><div class="field"><label for="coach-search">Cari Pelatih</label><input type="search" id="coach-search" maxlength="160" placeholder="Nama, provinsi, atau Pengcab…" aria-controls="coach-results"></div>${select('coach-level','Level Sertifikasi',C.classifications.levels,'Semua Tingkatan')}${select('coach-scope','Lingkup Lisensi',C.classifications.scopes,'Semua Lisensi')}${select('coach-province','Asal Provinsi',provinces.map(x=>({value:x,label:x})),'Seluruh Provinsi')}<button class="btn btn-outline" type="button" id="coach-reset">Reset Filter</button></div></form><div class="results-bar"><p id="coach-count" role="status" aria-live="polite" tabindex="-1"></p><span>Profil demonstrasi · bukan registrasi resmi</span></div><h2 class="sr-only">Hasil direktori pelatih</h2><div class="coach-grid" id="coach-results"></div><nav id="coach-pagination" aria-label="Pagination pelatih"></nav></div></section>`;
  const fields={q:'coach-search',level:'coach-level',scope:'coach-scope',province:'coach-province'};
  for(const [k,id] of Object.entries(fields))document.getElementById(id).value=state[k];
  function render(){
   const term=state.q.trim().toLocaleLowerCase('id');
   const rows=C.records.filter(c=>(!term||`${c.name} ${c.province} ${c.branch||''}`.toLocaleLowerCase('id').includes(term))&&(!state.level||c.certificationLevel===state.level)&&(!state.scope||c.licenseScope===state.scope)&&(!state.province||c.province===state.province));
   state.page=Math.min(state.page,Math.max(1,Math.ceil(rows.length/size)));
   const from=stateQuery(state);
   document.getElementById('coach-results').innerHTML=rows.length?rows.slice((state.page-1)*size,state.page*size).map(c=>`<article class="coach-card" data-coach-id="${U.esc(c.id)}"><div class="coach-card-head">${avatar(c)}<div><span class="eyebrow">PROFIL DEMONSTRASI</span><h3>${U.esc(c.name)}</h3><p>${U.esc(c.province)}</p><p class="coach-branch">${U.esc(c.branch||'Pengcab belum dicantumkan')}</p></div></div>${classifications(c)}<div class="coach-card-foot">${status(c)}<a class="text-link" href="coach-profile.html?id=${encodeURIComponent(c.id)}${from?'&amp;from='+encodeURIComponent(from):''}" aria-label="Lihat Profil ${U.esc(c.name)}">Lihat Profil <span aria-hidden="true">→</span></a></div></article>`).join(''):`<div class="empty-state" role="status"><h3>Tidak ada pelatih ditemukan</h3><p>Coba kata kunci lain atau gunakan Reset Filter.</p></div>`;
   document.getElementById('coach-count').textContent=`${rows.length} pelatih demonstrasi · Halaman ${state.page} dari ${Math.max(1,Math.ceil(rows.length/size))}`;
   document.getElementById('coach-pagination').innerHTML=U.pagination(rows.length,state.page,size);
   const url=new URL(location.href);for(const k of ['q','level','scope','province','page'])url.searchParams.delete(k);for(const [k,v]of new URLSearchParams(from))url.searchParams.set(k,v);if(location.protocol!=='file:')history.replaceState(null,'',url);
  }
  for(const [k,id]of Object.entries(fields))document.getElementById(id).addEventListener(k==='q'?'input':'change',e=>{state[k]=e.target.value;state.page=1;render();});
  document.getElementById('coach-filters').addEventListener('submit',e=>e.preventDefault());
  document.getElementById('coach-reset').addEventListener('click',()=>{Object.assign(state,{q:'',level:'',scope:'',province:'',page:1});for(const id of Object.values(fields))document.getElementById(id).value='';render();});
  document.getElementById('coach-pagination').addEventListener('click',e=>{const b=e.target.closest('[data-page]');if(!b)return;state.page=+b.dataset.page;render();document.getElementById('coach-count').scrollIntoView({block:'center'});});
  render();
 }
 const item=(name,value)=>`<div><dt>${name}</dt><dd>${U.esc(value||'Belum dicantumkan pada fixture')}</dd></div>`;
 const date=value=>value?new Date(value+'T12:00:00').toLocaleDateString('id-ID',{day:'numeric',month:'long',year:'numeric'}):null;
 function profile(){
  const c=C.records.find(c=>c.id===query.get('id'));
  if(!c){document.title='Profil pelatih tidak ditemukan · IPSI';U.main.innerHTML=intro('Profil pelatih tidak ditemukan','ID tidak tersedia pada data demonstrasi.','Profil tidak ditemukan')+`<section class="section container">${disclaimer()}<div class="empty-state" role="status"><h2>Periksa tautan profil</h2><p>Pilih pelatih dari direktori untuk melihat profil yang tersedia.</p><a class="btn" href="${U.esc(backURL())}">Kembali ke Direktori Pelatih</a></div></section>`;return;}
  document.title=`${c.name} · Profil Pelatih IPSI`;
  const m=c.certificateMetadata||{};
  U.main.innerHTML=`<header class="profile-hero coach-profile-hero"><div class="container">${crumb(c.name)}<div class="profile-intro">${avatar(c)}<div><span class="eyebrow">PROFIL PELATIH · SINTETIK</span><h1>${U.esc(c.name)}</h1><p>${U.esc(c.province)} · ${U.esc(c.branch||'Pengcab belum dicantumkan')}</p>${classifications(c)}${status(c)}</div></div></div></header><section class="section coach-section"><div class="container">${disclaimer()}<nav class="coach-profile-nav" aria-label="Bagian profil pelatih"><a href="#coaching-profile">Profil Kepelatihan</a><a href="#certifications">Sertifikasi</a><a href="#coaching-history">Riwayat Kepelatihan</a></nav><div class="profile-details coach-profile-details"><section class="info-panel" id="coaching-profile"><span class="eyebrow">KOMPETENSI & PEMBINAAN</span><h2>Profil Kepelatihan</h2><p>${U.esc(c.experienceSummary||'Ringkasan pengalaman belum dicantumkan pada fixture.')}</p><dl class="detail-grid">${item('Spesialisasi',c.specialization?.join(', '))}${item('Wilayah pembinaan',c.coachingRegion)}${item('Kegiatan',c.activities)}</dl></section><section class="info-panel" id="certifications"><span class="eyebrow">KLASIFIKASI CONTOH</span><h2>Sertifikasi</h2><dl class="detail-grid">${item('Level Sertifikasi',label('levels',c.certificationLevel))}${item('Lingkup Lisensi',label('scopes',c.licenseScope))}${item('Penerbit',m.issuer)}${item('Tanggal terbit',date(m.issuedAt))}${item('Masa berlaku',date(m.validUntil))}${item('Status sertifikasi',c.licenseStatus?label('statuses',c.licenseStatus)+' · simulasi':null)}</dl><p class="photo-note">Metadata contoh; bukan bukti sertifikasi atau validasi resmi. Nomor sertifikat tidak ditampilkan.</p></section></div><section class="info-panel coach-history" id="coaching-history"><span class="eyebrow">AKTIVITAS SINTETIK</span><h2>Riwayat Kepelatihan</h2>${c.coachingHistory?.length?`<ol class="coach-timeline">${c.coachingHistory.map(h=>`<li><span class="coach-year">${U.esc(h.year)}</span><div><h3>${U.esc(h.title)}</h3><p>${U.esc(h.description)}</p></div></li>`).join('')}</ol>`:'<p>Riwayat kegiatan belum dicantumkan pada fixture.</p>'}</section><a class="btn btn-outline coach-back" href="${U.esc(backURL())}">← Kembali ke Direktori Pelatih</a></div></section>`;
 }
 return{render(page,ui){if(!['coach','coach-profile'].includes(page))return false;U=ui;C=window.IPSI_COACH_DATA;if(!C){U.main.innerHTML='<section class="section container"><h1>Data pelatih belum tersedia</h1><a href="index.html">Kembali ke Beranda</a></section>';return true;}if(page==='coach')directory();else profile();return true;}};
})();
