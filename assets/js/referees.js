/* Public officials directory: local synthetic data, no API or certification workflow. */
window.IPSI_REFEREE_DIRECTORY=(()=>{
 'use strict';
 let U,C;
 const query=new URLSearchParams(location.search),size=6;
 const label=(list,value)=>list.find(x=>x.value===value)?.label||'Belum dicantumkan';
 const group=value=>C.classifications.groups.find(x=>x.value===value);
 const level=c=>label(group(c.classificationGroup)?.levels||[],c.licenseLevel);
 const role=c=>label(C.classifications.roles,c.assignmentRole);
 const notice=()=>`<aside class="coach-disclaimer"><strong>Data Demonstrasi.</strong> Semua identitas, sertifikasi dan penugasan adalah sintetis. ${U.esc(C.classifications.disclaimer)}</aside>`;
 function stateFrom(raw){const s={q:(raw.get('q')||'').slice(0,160),group:'',level:'',province:'',page:Math.max(1,Math.min(999,parseInt(raw.get('page'),10)||1))};if(group(raw.get('group')))s.group=raw.get('group');if(group(s.group)?.levels.some(x=>x.value===raw.get('level')))s.level=raw.get('level');if(C.records.some(x=>x.province===raw.get('province')))s.province=raw.get('province');return s;}
 function encode(s){const p=new URLSearchParams();for(const k of ['q','group','level','province'])if(s[k])p.set(k,s[k]);if(s.page>1)p.set('page',s.page);return p.toString();}
 function back(){const q=encode(stateFrom(new URLSearchParams(query.get('from')||'')));return'referee.html'+(q?'?'+q:'');}
 const crumb=name=>`<nav class="breadcrumbs" aria-label="Breadcrumb"><a href="index.html">Beranda</a><span aria-hidden="true">/</span>${name?`<a href="${U.esc(back())}">Direktori Wasit/Juri</a><span aria-hidden="true">/</span><span aria-current="page">${U.esc(name)}</span>`:'<span aria-current="page">Direktori Wasit/Juri</span>'}</nav>`;
 const intro=(title,desc,name)=>`<section class="page-banner"><div class="container">${crumb(name)}<span class="eyebrow">TEKNIS OLAHRAGA · DATA DEMONSTRASI</span><h1>${U.esc(title)}</h1></div></section>`;
 const avatar=c=>`<span class="coach-avatar" role="img" aria-label="Avatar inisial sintetis ${U.esc(c.name)}"><span aria-hidden="true">${U.esc(c.avatar.initials)}</span><small aria-hidden="true">DEMO</small></span>`;
 const badges=c=>`<div class="coach-badges"><span class="tag tag-quiet">${U.esc(group(c.classificationGroup).label)}</span><span class="tag tag-quiet">${U.esc(level(c))}</span></div>`;
 const status=c=>c.licenseStatus?`<span class="coach-status">${U.esc(label(C.classifications.statuses,c.licenseStatus))} · simulasi</span>`:'';
 const options=rows=>rows.map(x=>`<option value="${U.esc(x.value)}">${U.esc(x.label)}</option>`).join('');
 const select=(id,text,rows,all)=>`<div class="field"><label for="${id}">${text}</label><select id="${id}"><option value="">${all}</option>${options(rows)}</select></div>`;
 function directory(){
  const s=stateFrom(query),provinces=[...new Set(C.records.map(x=>x.province))].sort((a,b)=>a.localeCompare(b,'id'));let view='grid';
  U.main.innerHTML=intro('Direktori Wasit/Juri IPSI','Telusuri profil, klasifikasi, lisensi, dan pengalaman penugasan wasit/juri.')+`<section class="section coach-section"><div class="container">${notice()}<form class="filter-panel ipsi-filter-toolbar" id="referee-filters" aria-label="Filter direktori wasit juri"><div class="ipsi-filter-main ipsi-filter-main--directory"><div class="ipsi-search-field">${U.searchField('referee-search','Cari Wasit/Juri','Nama, provinsi, atau Pengcab…')}</div><div class="ipsi-filter-select">${select('referee-group','Kelompok Klasifikasi',C.classifications.groups,'Semua klasifikasi')}</div><div class="ipsi-filter-select">${select('referee-level','Kelas / Level Lisensi',[],'Pilih klasifikasi dahulu')}</div><div class="ipsi-filter-select ipsi-filter-select--directory-last">${select('referee-province','Asal Provinsi',provinces.map(x=>({value:x,label:x})),'Seluruh Provinsi')}</div><div class="ipsi-filter-actions">${U.resetFilterButton('referee-reset')}${U.viewSwitch('Tampilan wasit juri')}</div></div><p class="referee-filter-hint" id="referee-level-hint">Kelas/level mengikuti kelompok; peran teknis bukan jenjang lisensi.</p></form><div class="results-bar results-bar--context"><span>Profil sintetis · bukan daftar resmi</span></div><span class="sr-only" id="referee-status" role="status" aria-live="polite"></span><h2 class="sr-only">Hasil direktori wasit/juri</h2><div class="coach-grid" id="referee-results"></div><nav id="referee-pagination" aria-label="Pagination wasit juri"></nav></div></section>`;
  const fields={q:'referee-search',group:'referee-group',level:'referee-level',province:'referee-province'};
  function levels(){const el=document.getElementById('referee-level'),g=group(s.group);el.innerHTML=`<option value="">${g?'Semua kelas / level':'Pilih klasifikasi dahulu'}</option>`+options(g?.levels||[]);el.disabled=!g;el.setAttribute('aria-describedby','referee-level-hint');el.value=s.level;}
  levels();for(const[k,id]of Object.entries(fields))document.getElementById(id).value=s[k];document.getElementById('referee-search').maxLength=160;document.getElementById('referee-search').setAttribute('aria-controls','referee-results');
  function render(){const q=s.q.trim().toLocaleLowerCase('id'),rows=C.records.filter(c=>(!q||`${c.name} ${c.province} ${c.branch||''}`.toLocaleLowerCase('id').includes(q))&&(!s.group||c.classificationGroup===s.group)&&(!s.level||c.licenseLevel===s.level)&&(!s.province||c.province===s.province));s.page=Math.min(s.page,Math.max(1,Math.ceil(rows.length/size)));const from=encode(s);
   document.getElementById('referee-results').className=`coach-grid${view==='list'?' coach-grid--list':''}`;document.getElementById('referee-results').innerHTML=rows.length?rows.slice((s.page-1)*size,s.page*size).map(c=>`<article class="coach-card referee-card" data-referee-id="${U.esc(c.id)}"><div class="coach-card-head">${avatar(c)}<div><span class="eyebrow">DATA DEMONSTRASI</span><h3>${U.esc(c.name)}</h3><p>${U.esc(c.province)}</p><p class="coach-branch">${U.esc(c.branch||'Pengcab belum dicantumkan')}</p></div></div>${badges(c)}<p class="referee-role">Peran / penugasan: ${U.esc(role(c))}</p><div class="coach-card-foot">${status(c)}<a class="text-link" aria-label="Lihat Profil ${U.esc(c.name)}" href="referee-profile.html?id=${encodeURIComponent(c.id)}${from?'&amp;from='+encodeURIComponent(from):''}">Lihat Profil <span aria-hidden="true">→</span></a></div></article>`).join(''):'<div class="empty-state" role="status"><h3>Tidak ada wasit/juri ditemukan</h3><p>Coba kata kunci lain atau gunakan Reset Filter.</p></div>';
   document.getElementById('referee-status').textContent=`${rows.length} wasit/juri ditemukan.`;
   document.getElementById('referee-pagination').innerHTML=U.pagination(rows.length,s.page,size);
   const url=new URL(location.href);for(const k of ['q','group','level','province','page'])url.searchParams.delete(k);for(const[k,v]of new URLSearchParams(from))url.searchParams.set(k,v);if(location.protocol!=='file:')history.replaceState(null,'',url);
  }
  for(const[k,id]of Object.entries(fields))document.getElementById(id).addEventListener(k==='q'?'input':'change',e=>{s[k]=e.target.value;s.page=1;if(k==='group'){s.level='';levels();}render();});
  document.getElementById('referee-filters').addEventListener('submit',e=>e.preventDefault());
  document.querySelectorAll('#referee-filters .ipsi-icon-view-switch [data-view]').forEach(b=>b.onclick=()=>{view=b.dataset.view;document.querySelectorAll('#referee-filters .ipsi-icon-view-switch [data-view]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));render();});
  document.getElementById('referee-reset').onclick=()=>{Object.assign(s,{q:'',group:'',level:'',province:'',page:1});levels();for(const id of Object.values(fields))document.getElementById(id).value='';render();};
  document.getElementById('referee-pagination').onclick=e=>{const b=e.target.closest('[data-page]');if(b){s.page=+b.dataset.page;render();document.getElementById('referee-results').scrollIntoView({block:'start'});}};render();
 }
 const item=(label,value)=>`<div><dt>${label}</dt><dd>${U.esc(value||'Belum dicantumkan pada fixture')}</dd></div>`;
 const date=value=>value?new Date(value+'T12:00:00').toLocaleDateString('id-ID',{day:'numeric',month:'long',year:'numeric'}):null;
 function profile(){const c=C.records.find(x=>x.id===query.get('id'));if(!c){document.title='Profil wasit/juri tidak ditemukan · IPSI';U.main.innerHTML=intro('Profil wasit/juri tidak ditemukan','ID tidak tersedia pada data demonstrasi.','Profil tidak ditemukan')+`<section class="section container">${notice()}<div class="empty-state" role="status"><h2>Periksa tautan profil</h2><a class="btn" href="${U.esc(back())}">Kembali ke Direktori Wasit/Juri</a></div></section>`;return;}
  const m=c.certificateMetadata||{};document.title=`${c.name} · Profil Wasit/Juri IPSI`;
  U.main.innerHTML=`<header class="profile-hero coach-profile-hero"><div class="container">${crumb(c.name)}<div class="profile-intro">${avatar(c)}<div><span class="eyebrow">WASIT/JURI · DATA DEMONSTRASI</span><h1>${U.esc(c.name)}</h1><p>${U.esc(c.province)} · ${U.esc(c.branch||'Pengcab belum dicantumkan')}</p>${badges(c)}${status(c)}</div></div></div></header><section class="section coach-section"><div class="container">${notice()}<div class="tabs coach-profile-tabs" role="tablist" aria-label="Bagian profil wasit juri" data-multi-panel><button type="button" role="tab" id="referee-overview-tab" aria-controls="referee-overview" aria-selected="true" tabindex="0" data-profile-panel="referee-overview">Profil & Peran</button><button type="button" role="tab" id="referee-certification-tab" aria-controls="referee-certification" aria-selected="false" tabindex="-1" data-profile-panel="referee-certification">Sertifikasi</button><button type="button" role="tab" id="referee-history-tab" aria-controls="referee-history" aria-selected="false" tabindex="-1" data-profile-panel="referee-history">Riwayat Penugasan</button></div><div class="profile-details coach-profile-details"><section class="info-panel" id="referee-overview" role="tabpanel" aria-labelledby="referee-overview-tab" tabindex="0"><h2>Profil & Peran Teknis</h2><p>${U.esc(c.summary||'Ringkasan belum dicantumkan pada fixture.')}</p><dl class="detail-grid">${item('Kelompok Klasifikasi',group(c.classificationGroup).label)}${item('Kelas / Level Lisensi',level(c))}${item('Peran / Penugasan',role(c))}${item('Keterangan peran',c.roleDescription)}</dl><p class="photo-note">Technical Delegate dan Wasit-Juri Kehormatan adalah peran/penugasan, bukan otomatis jenjang lisensi lebih tinggi.</p></section><section class="info-panel" id="referee-certification" role="tabpanel" aria-labelledby="referee-certification-tab" tabindex="0" hidden><h2>Informasi Sertifikasi</h2><dl class="detail-grid">${item('Kelompok',group(c.classificationGroup).label)}${item('Kelas / Level',level(c))}${item('Penerbit',m.issuer)}${item('Tanggal terbit',date(m.issuedAt))}${item('Masa berlaku',date(m.validUntil))}${item('Status lisensi',c.licenseStatus?label(C.classifications.statuses,c.licenseStatus)+' · simulasi':null)}</dl><p class="photo-note">Bukan bukti sertifikasi resmi. Tidak menampilkan nomor sertifikat atau menerapkan aturan kenaikan tingkat.</p></section><section class="info-panel coach-history" id="referee-history" role="tabpanel" aria-labelledby="referee-history-tab" tabindex="0" hidden><h2>Riwayat Penugasan Pertandingan</h2>${c.assignmentHistory?.length?`<ol class="coach-timeline">${c.assignmentHistory.map(h=>`<li><span class="coach-year">${U.esc(h.year)}</span><div><h3>${U.esc(h.title)}</h3><p>${U.esc(h.description)}</p></div></li>`).join('')}</ol>`:'<p>Riwayat penugasan belum dicantumkan pada fixture.</p>'}</section></div><a class="btn btn-outline coach-back" href="${U.esc(back())}">← Kembali ke Direktori Wasit/Juri</a></div></section>`;
  const list=U.main.querySelector('.coach-profile-tabs');
  const tabs=[...list.querySelectorAll('[role=tab]')];
  const activate=id=>{
   const chosen=tabs.find(t=>t.dataset.profilePanel===id)||tabs[0];
   tabs.forEach(t=>{
    const active=t===chosen;
    t.setAttribute('aria-selected',String(active));
    t.tabIndex=active?0:-1;
    document.getElementById(t.dataset.profilePanel).hidden=!active;
   });
  };
  const syncHash=()=>activate(location.hash.slice(1));
  tabs.forEach(t=>t.addEventListener('click',()=>{
   activate(t.dataset.profilePanel);
   if(location.hash!=='#'+t.dataset.profilePanel)history.pushState(null,'','#'+t.dataset.profilePanel);
  }));
  window.addEventListener('hashchange',syncHash);
  window.addEventListener('popstate',syncHash);
  syncHash();
 }
 return{render(page,ui){if(!['referee','referee-profile'].includes(page))return false;U=ui;C=window.IPSI_REFEREE_DATA;if(!C){U.main.innerHTML='<section class="section container"><h1>Data wasit/juri belum tersedia</h1><a href="index.html">Kembali ke Beranda</a></section>';return true;}page==='referee'?directory():profile();return true;}};
})();
