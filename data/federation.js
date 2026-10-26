/* Presentation configuration. Future CMS: editorial/visibility only; no backend calls. */
window.IPSI_THEME = {
  referenceDate:'2026-10-23',
  calendarMonths:['2026-10','2026-11','2026-12'],
  featured: {main:'generasi', supporting:['budaya','latihan']},
  // Coordinated hub regions have a stable order; each content group remains optional.
  sections: {featured:true,agenda:true,ranking:true,athletes:true,latest:true,organization:true,media:true,peduli:true,sponsors:true},
  // Future CMS presentation data only. Placeholder slots are not sponsorship claims.
  sponsors: {
    tiers:[{id:'utama',label:'Mitra Utama',displayOrder:10},{id:'pendukung',label:'Mitra Pendukung',displayOrder:20}],
    items:[
      {id:'slot-01',name:'Slot Mitra 01',logo:null,category:'utama',websiteUrl:null,displayOrder:10,active:true},
      {id:'slot-02',name:'Slot Mitra 02',logo:null,category:'utama',websiteUrl:null,displayOrder:20,active:true},
      {id:'slot-03',name:'Slot Mitra 03',logo:null,category:'pendukung',websiteUrl:null,displayOrder:30,active:true},
      {id:'slot-04',name:'Slot Mitra 04',logo:null,category:'pendukung',websiteUrl:null,displayOrder:40,active:true},
      {id:'slot-05',name:'Slot Mitra 05',logo:null,category:'pendukung',websiteUrl:null,displayOrder:50,active:true},
      {id:'slot-06',name:'Slot Mitra 06',logo:null,category:'pendukung',websiteUrl:null,displayOrder:60,active:true}
    ]
  },
  peduliLogo:null,
  activities:[
    {id:'ruang-bersama',title:'Ruang bersama, semangat saling menjaga',date:'2026-10-22',image:'community.jpg',summary:'Contoh publikasi kegiatan sosial komunitas pencak silat.',body:'Kepedulian tumbuh dari hal sederhana: hadir, mendengar, dan saling membantu. Cerita sintetik ini memperlihatkan format publikasi kegiatan komunitas, bukan pengumuman program IPSI yang sedang berlangsung.'},
    {id:'berbagi-gerak',title:'Berbagi gerak, membuka kesempatan',date:'2026-10-12',image:'heritage.jpg',summary:'Rancangan cerita tentang ruang belajar yang inklusif.',body:'Kegiatan ilustratif ini mengangkat nilai kebersamaan melalui pencak silat. Seluruh nama kegiatan dan tanggal merupakan fixture editorial, tanpa pendaftaran, donasi atau transaksi.'},
    {id:'jejak-peduli',title:'Jejak kecil kepedulian dari gelanggang',date:'2026-09-20',image:'arena.jpg',summary:'Arsip kegiatan contoh untuk perjalanan kepedulian.',body:'Arsip demonstrasi mencatat gagasan kepedulian komunitas. Foto adalah ilustrasi dari mockup existing dan bukan dokumentasi kegiatan fiktif ini.'}
  ]
};
