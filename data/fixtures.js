/* All names, roles, rankings, points and events below are synthetic presentation fixtures.
   No database, API, credentials, ranking formula or production data is used. */
window.IPSI_DEMO = {
  asOf: '23 Oktober 2026',
  provinces: ['DKI Jakarta', 'Jawa Barat', 'Jawa Tengah', 'DI Yogyakarta', 'Jawa Timur', 'Bali'],
  athletes: [], // Hydrated from relational sports.js by sports-data.js.
  events: [],
  news: [
    {id:'generasi',category:'PEMBINAAN',title:'Menjaga tradisi, menyiapkan generasi juara',image:'arena.jpg',date:'23 Oktober 2026',summary:'Dari gelanggang latihan menuju arena prestasi. Sebuah gambaran tentang semangat pembinaan pencak silat yang berkelanjutan.'},
    {id:'budaya',category:'SENI & BUDAYA',title:'Satu warisan, ribuan cara untuk terus menghidupkannya',image:'heritage.jpg',date:'22 Oktober 2026',summary:'Melihat pencak silat sebagai ruang bertemunya ketangkasan, nilai luhur, dan kebersamaan antargenerasi.'},
    {id:'latihan',category:'PESILAT',title:'Di balik setiap langkah, ada disiplin yang dibangun',image:'training.jpg',date:'21 Oktober 2026',summary:'Sebuah cerita contoh tentang latihan, ketekunan, dan sportivitas di dalam maupun di luar gelanggang.'},
    {id:'komunitas',category:'ORGANISASI',title:'Memperkuat pembinaan dari daerah, bersama perguruan',image:'community.jpg',date:'20 Oktober 2026',summary:'Kolaborasi menjadi penghubung antara pembinaan daerah dan kesempatan meraih prestasi.'}
  ],
  organizations: [
    {id:'pb',name:'PB IPSI',level:'PB',province:'Nasional',parent:null,city:'Jakarta',leader:'Pengurus Pusat Contoh',role:'Ketua umum · simulasi'},
    {id:'jabar',name:'Pengprov IPSI Jawa Barat',level:'Pengprov',province:'Jawa Barat',parent:'pb',city:'Bandung',leader:'Aditya Cakrawala (sintetik)',role:'Ketua pengprov · simulasi'},
    {id:'dki',name:'Pengprov IPSI DKI Jakarta',level:'Pengprov',province:'DKI Jakarta',parent:'pb',city:'Jakarta',leader:'Dewi Pramesti (sintetik)',role:'Ketua pengprov · simulasi'},
    {id:'jateng',name:'Pengprov IPSI Jawa Tengah',level:'Pengprov',province:'Jawa Tengah',parent:'pb',city:'Semarang',leader:'Bayu Wardhana (sintetik)',role:'Ketua pengprov · simulasi'},
    {id:'jatim',name:'Pengprov IPSI Jawa Timur',level:'Pengprov',province:'Jawa Timur',parent:'pb',city:'Surabaya',leader:'Rani Mahardika (sintetik)',role:'Ketua pengprov · simulasi'},
    {id:'yogya',name:'Pengprov IPSI DI Yogyakarta',level:'Pengprov',province:'DI Yogyakarta',parent:'pb',city:'Yogyakarta',leader:'Surya Anindita (sintetik)',role:'Ketua pengprov · simulasi'},
    {id:'bali',name:'Pengprov IPSI Bali',level:'Pengprov',province:'Bali',parent:'pb',city:'Denpasar',leader:'Cahya Purnama (sintetik)',role:'Ketua pengprov · simulasi'},
    {id:'bandung',name:'Pengcab IPSI Kota Bandung',level:'Pengcab',province:'Jawa Barat',parent:'jabar',city:'Bandung',leader:'Fajar Daniswara (sintetik)',role:'Ketua pengcab · simulasi'},
    {id:'bogor',name:'Pengcab IPSI Kota Bogor',level:'Pengcab',province:'Jawa Barat',parent:'jabar',city:'Bogor',leader:'Sari Widyasari (sintetik)',role:'Ketua pengcab · simulasi'},
    {id:'surabaya',name:'Pengcab IPSI Kota Surabaya',level:'Pengcab',province:'Jawa Timur',parent:'jatim',city:'Surabaya',leader:'Nusa Aryasena (sintetik)',role:'Ketua pengcab · simulasi'}
  ]
};
