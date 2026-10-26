/* Synchronous head bootstrap: apply before styles/content paint. */
(() => {
 'use strict';
 const C=window.IPSI_THEME_SETTINGS||{},ids=['official','prestasi','modern','internasional','tradisi'];
 const fallback={name:'IPSI Official',brand:['#FFFEFA','#F3EFE5'],nav:['#980C19','#C81020'],banner:['#043E38','#086454'],surface:'#FAF8F3',action:'#C81020',hover:'#980C19',tint:'#FFF3F3',border:'#879398',accent:'#D0AA50'};
 const hex=v=>typeof v==='string'&&/^#[0-9a-f]{6}$/i.test(v);
 const valid=p=>p&&typeof p.name==='string'&&p.name.trim()&&['brand','nav','banner'].every(k=>Array.isArray(p[k])&&p[k].length===2&&p[k].every(hex))&&['surface','action','hover','tint','border','accent'].every(k=>hex(p[k]));
 const presets=Object.fromEntries(ids.map(id=>[id,valid(C.presets?.[id])?C.presets[id]:fallback]));
 const enabled=ids.filter(id=>id==='official'||(Array.isArray(C.enabledThemes)&&C.enabledThemes.includes(id)));
 const defaultTheme=enabled.includes(C.defaultTheme)?C.defaultTheme:'official';
 const key='ipsi.portal.theme.v1';
 function apply(request,persist=true){const id=enabled.includes(request)?request:'official',p=presets[id],root=document.documentElement;
  const tokens={'theme-brand-gradient':`linear-gradient(115deg,${p.brand.join(',')})`,'theme-nav-gradient':`linear-gradient(110deg,${p.nav.join(',')})`,'theme-banner-gradient':`linear-gradient(115deg,${p.banner.join(',')})`,'theme-surface':p.surface,'theme-action':p.action,'theme-hover':p.hover,'theme-tint':p.tint,'theme-border':p.border,'theme-accent':p.accent,'theme-text':'#102C34','theme-on-dark':'#FFFFFF','focus':p.action};
  for(const [name,value] of Object.entries(tokens))root.style.setProperty('--'+name,value);
  root.dataset.theme=id;root.dataset.themeVersion=typeof C.version==='string'?C.version:'1.0.0';
  if(persist)try{localStorage.setItem(key,id);}catch{}
  document.dispatchEvent(new CustomEvent('ipsi:theme',{detail:{id}}));return id;
 }
 let saved=null;try{saved=localStorage.getItem(key);}catch{}
 apply(saved===null?defaultTheme:saved,false);
 window.IPSI_THEME_ENGINE={apply,presets,enabled,key,defaultTheme};
 window.addEventListener('storage',e=>{if(e.key===key)apply(e.newValue===null?defaultTheme:e.newValue,false);});
})();
