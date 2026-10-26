/* Editorial and presentation fixtures. All people, schedules and results are synthetic. */
(() => {
  const d = window.IPSI_DEMO;
  if (!d) return;
  const articles = {
    generasi: [
      {heading:'Dari latihan, lahir sebuah perjalanan',text:'Gelanggang bukan hanya tempat menguji ketangkasan. Dalam cerita demonstrasi ini, latihan menjadi ruang untuk membangun disiplin, keberanian, dan rasa hormat kepada sesama pesilat.'},
      {heading:'Pembinaan yang berkesinambungan',text:'Pendampingan pelatih, dukungan perguruan, dan kesempatan bertanding dapat disajikan sebagai perjalanan yang saling terhubung. Portal memberi ruang bagi cerita pembinaan dari berbagai daerah agar mudah ditemukan pembaca.'},
      {heading:'Warisan yang dibawa ke masa depan',text:'Prestasi dan pelestarian budaya berjalan bersama. Artikel ini adalah fixture editorial untuk mengevaluasi pengalaman membaca, bukan laporan kegiatan atau pernyataan resmi organisasi.'}
    ],
    budaya: [
      {heading:'Gerak yang membawa makna',text:'Di balik rangkaian gerak, ada nilai dan pengetahuan yang diwariskan antargenerasi. Cerita contoh ini menempatkan seni pencak silat sebagai bagian dari kehidupan budaya Indonesia.'},
      {heading:'Ruang perjumpaan antargenerasi',text:'Latihan bersama dan pertunjukan dapat menjadi ruang bagi generasi muda untuk mengenal tradisi. Setiap daerah memiliki cerita yang layak disajikan melalui dokumentasi yang menghormati konteksnya.'},
      {heading:'Tentang dokumentasi ini',text:'Foto berasal dari arsip aset mockup dan digunakan sebagai ilustrasi. Teks disusun khusus untuk prototipe; foto tidak menjadi bukti berlangsungnya event sintetik.'}
    ],
    latihan: [
      {heading:'Ketekunan di setiap sesi',text:'Perjalanan seorang pesilat dibangun melalui proses panjang. Dalam tulisan contoh ini, kebiasaan berlatih, pemulihan, dan sportivitas menjadi bagian dari narasi pembinaan.'},
      {heading:'Belajar bersama',text:'Lingkungan perguruan dan dukungan pelatih memberi konteks pada perkembangan pesilat. Konten ini menggambarkan bagaimana artikel pembinaan dapat ditampilkan secara ringkas, jelas, dan nyaman dibaca.'},
      {heading:'Catatan editorial',text:'Artikel ini tidak memberikan program latihan atau nasihat kesehatan. Seluruh narasi merupakan bahan evaluasi presentasi frontend.'}
    ],
    komunitas: [
      {heading:'Pembinaan dimulai dari kebersamaan',text:'Jaringan organisasi dan perguruan menghubungkan beragam pengalaman di daerah. Kolaborasi menjadi tema utama dalam cerita demonstrasi ini.'},
      {heading:'Informasi yang mudah ditemukan',text:'Direktori berjenjang membantu pembaca menelusuri hubungan pusat, provinsi, dan kabupaten atau kota. Konten editorial dan direktori dapat saling melengkapi tanpa mengambil alih sistem operasional.'},
      {heading:'Data yang bertanggung jawab',text:'Nama pengurus dan struktur contoh pada prototipe bersifat sintetik. Informasi resmi hanya akan ditampilkan setelah sumber dan izin publikasinya ditetapkan pada fase integrasi.'}
    ]
  };
  d.news.forEach((n,i) => Object.assign(n, {
    published:`2026-10-${23-i}`, author:'Redaksi Prototipe IPSI', source:'Fixture editorial Phase 1B.1',
    alt:({generasi:'Dua pesilat di gelanggang pencak silat',budaya:'Dokumentasi penampilan seni pencak silat',latihan:'Ilustrasi gerakan pesilat di arena',komunitas:'Dokumentasi kebersamaan komunitas pencak silat'})[n.id],
    caption:'Foto ilustrasi dari aset mockup existing. Tidak merepresentasikan kegiatan sintetik pada artikel.',
    body:articles[n.id]
  }));
  d.program = [
    {time:'08.00',title:'Registrasi contoh',description:'Pemeriksaan administrasi pada rancangan program.'},
    {time:'09.00',title:'Pembukaan contoh',description:'Pengantar kegiatan dan pengarahan peserta.'},
    {time:'10.00',title:'Sesi kegiatan contoh',description:'Rancangan sesi sesuai kategori event.'},
    {time:'16.00',title:'Penutupan sesi contoh',description:'Evaluasi dan informasi kegiatan berikutnya.'}
  ];
  d.results = {}; // Derived from competitionResults, not standalone achievements.
  d.galleries = [
    {id:'heritage',title:'Warisan yang hidup',category:'Seni & budaya',date:'22 Oktober 2026',cover:'heritage.jpg',event:'festival',description:'Ruang dokumentasi untuk mengenal ragam ekspresi pencak silat. Semua keterangan merupakan contoh editorial.',photos:[{image:'heritage.jpg',caption:'Gerak dan tradisi dalam dokumentasi ilustratif.'}]},
    {id:'arena',title:'Semangat di gelanggang',category:'Kompetisi',date:'21 Oktober 2026',cover:'arena.jpg',event:'nusantara',description:'Contoh galeri olahraga dengan foto aksi, caption, dan tautan konteks event sintetik.',photos:[{image:'arena.jpg',caption:'Dua pesilat di arena; foto arsip ilustrasi.'},{image:'training.jpg',caption:'Dokumentasi gerakan pencak silat dari aset mockup.'}]},
    {id:'community',title:'Tumbuh bersama',category:'Organisasi',date:'20 Oktober 2026',cover:'community.jpg',event:null,description:'Contoh galeri komunitas yang mengutamakan konteks dan keterangan gambar.',photos:[{image:'community.jpg',caption:'Kebersamaan dalam dokumentasi komunitas; bukan pengurus fixture.'}]}
  ];
  d.documents = [
    {id:'theme-guide',name:'Panduan evaluasi theme IPSI',type:'Panduan',published:'2026-10-23',version:'1.1',format:'ZIP',size:'588 B',file:'assets/documents/panduan-evaluasi.zip',description:'Paket ZIP berisi panduan TXT sintetik untuk evaluasi visual, bukan regulasi organisasi.'},
    {id:'competition-guide',name:'Contoh informasi kompetisi',type:'Kompetisi',published:'2026-10-22',version:'0.1 demo',format:'PDF',size:null,file:null,description:'Metadata fixture. Berkas pendukung kompetisi belum tersedia.'},
    {id:'organization-guide',name:'Contoh pedoman organisasi',type:'Organisasi',published:'2026-10-21',version:'0.1 demo',format:'PDF',size:null,file:null,description:'Metadata fixture, tidak berisi keputusan atau peraturan resmi IPSI.'},
    {id:'visual-guide',name:'Contoh pedoman identitas visual',type:'Panduan',published:'2026-10-20',version:'0.1 demo',format:'PDF',size:null,file:null,description:'Ruang untuk dokumen publik yang telah diverifikasi pada fase integrasi.'}
  ];
})();
