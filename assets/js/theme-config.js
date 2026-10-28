/* Local section defaults and a future CMS configuration boundary; no network or content database. */
window.IPSI_SECTION_HERO_CONFIG = (() => {
 const defaults = {
  news:{imageUrl:'assets/images/section-heroes/news.jpg',backgroundPosition:'60% 42%'},
  competition:{imageUrl:'assets/images/section-heroes/competition.jpg',backgroundPosition:'55% 45%'},
  athlete:{imageUrl:'assets/images/section-heroes/athlete.jpg',backgroundPosition:'70% 40%'},
  perguruan:{imageUrl:'assets/images/section-heroes/perguruan.jpg',backgroundPosition:'50% 45%'},
  documents:{imageUrl:'assets/images/section-heroes/documents.jpg',backgroundPosition:'60% 75%'},
  peduli:{imageUrl:'assets/images/section-heroes/peduli.jpg',backgroundPosition:'50% 45%'},
  organization:{imageUrl:'assets/images/section-heroes/organization.jpg',backgroundPosition:'60% 42%'},
  portal:{imageUrl:'assets/images/arena.jpg',backgroundPosition:'55% 45%'}
 };
 const pageSections = {
  news:'news',media:'news',gallery:'news',
  calendar:'competition',event:'competition',
  athlete:'athlete',ranking:'athlete',
  perguruan:'perguruan','perguruan-historis':'perguruan','perguruan-besar':'perguruan','perguruan-detail':'perguruan',
  documents:'documents',
  peduli:'peduli','peduli-detail':'peduli',
  about:'organization',history:'organization',organization:'organization','organization-detail':'organization',coach:'organization',referee:'organization',
  search:'portal'
 };
 const validImageUrl = url => typeof url==='string' && /^assets\/images\/[a-z0-9/_-]+\.(jpg|jpeg|png|webp)$/i.test(url) && !url.includes('..');
 const validPosition = value => typeof value==='string' && /^(100|[0-9]{1,2})% (100|[0-9]{1,2})%$/.test(value);
 const resolve = (sectionKey, replacement={}) => {
  const base=defaults[sectionKey];if(!base)return null;
  return {sectionKey,imageUrl:validImageUrl(replacement.imageUrl)?replacement.imageUrl:base.imageUrl,backgroundPosition:validPosition(replacement.backgroundPosition)?replacement.backgroundPosition:base.backgroundPosition};
 };
 return {defaults,pageSections,resolve,resolvePage:(page,replacement)=>resolve(pageSections[page],replacement)};
})();
window.IPSI_THEME_SETTINGS = {
 version:'1.0.0', defaultTheme:'official',
 enabledThemes:['official','prestasi','modern','internasional','tradisi'],
 presets:{
  official:{name:'IPSI Official',brand:['#FFFEFA','#F3EFE5'],nav:['#D9241B','#C05210'],banner:['#043E38','#086454'],surface:'#FAF8F3',action:'#C81020',hover:'#980C19',tint:'#FFF3F3',border:'#879398',accent:'#D0AA50'},
  prestasi:{name:'Merah Prestasi',brand:['#FFF8F8','#F7E3E6'],nav:['#7A0C1F','#B5122B'],banner:['#7A0C1F','#390713'],surface:'#FFF3F4',action:'#A60E27',hover:'#7A0C1F',tint:'#FCE8EC',border:'#9E7D84',accent:'#F0B840'},
  modern:{name:'Biru Modern',brand:['#F7FAFF','#E0EAF9'],nav:['#082858','#0B3B8C'],banner:['#0B3B8C','#061E45'],surface:'#F3F7FF',action:'#0B3B8C',hover:'#082858',tint:'#E8F0FD',border:'#7C8FA8',accent:'#F0C400'},
  internasional:{name:'Ungu Internasional',brand:['#FCF9FF','#EEE1F7'],nav:['#370957','#5B0E8B'],banner:['#5B0E8B','#28073D'],surface:'#F8F4FF',action:'#5B0E8B',hover:'#370957',tint:'#F1E7F8',border:'#97829F',accent:'#E6B85C'},
  tradisi:{name:'Hijau Tradisi',brand:['#FAFCF6','#E4EDDE'],nav:['#163922','#2E5D3A'],banner:['#2E5D3A','#10291C'],surface:'#F6F8F0',action:'#215B3D',hover:'#163922',tint:'#EAF2E5',border:'#7D9181',accent:'#C9A227'}
 },
 // Existing banner renderer consumes the central defaults; no CMS override is active.
 banners:Object.fromEntries(Object.keys(window.IPSI_SECTION_HERO_CONFIG.pageSections).map(page=>{
  const {imageUrl,backgroundPosition}=window.IPSI_SECTION_HERO_CONFIG.resolvePage(page);
  return [page,{title:null,subtitle:null,image:imageUrl,focalPosition:backgroundPosition,overlay:'forest',buttonText:null,buttonUrl:null,status:'published',startDate:null,endDate:null}];
 }))
};
