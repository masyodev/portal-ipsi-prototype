/* Owner-supplied names and ordering. Classification is pending editorial verification.
   Unknown identity/editorial fields intentionally remain empty. No Core/API access. */
window.IPSI_PERGURUAN_DATA = (() => {
 'use strict';
 const logos = {
  "psh": "assets/images/perguruan/psh.png",
  "psht": "assets/images/perguruan/psht.png",
  "perisai-diri": "assets/images/perguruan/perisai-diri.png",
  "perisai-putih": "assets/images/perguruan/perisai-putih.png",
  "tapak-suci": "assets/images/perguruan/tapak-suci.png",
  "phashadja-mataram": "assets/images/perguruan/phashadja-mataram.jpeg",
  "perpi-harimurti": "assets/images/perguruan/perpi-harimurti.jpeg",
  "ppsi": "assets/images/perguruan/ppsi.jpeg",
  "putra-betawi": "assets/images/perguruan/putra-betawi.jpeg",
  "kps-nusantara": "assets/images/perguruan/kps-nusantara.jpeg",
  "merpati-putih": "assets/images/perguruan/merpati-putih.png",
  "satria-muda-indonesia": "assets/images/perguruan/satria-muda-indonesia.webp",
  "persinas-asad": "assets/images/perguruan/persinas-asad.jpeg",
  "pstd-indonesia": "assets/images/perguruan/pstd-indonesia.jpeg",
  "tetada-kalimasada": "assets/images/perguruan/tetada-kalimasada.jpg",
  "pagar-nusa": "assets/images/perguruan/pagar-nusa.jpeg",
  "ikspi-kera-sakti": "assets/images/perguruan/ikspi-kera-sakti.jpeg",
  "psm": "assets/images/perguruan/psm.jpeg"
};
 const groups = {
  historis: [
   ['psh','Persaudaraan Setia Hati (PSH)','PSH'],
   ['psht','Persaudaraan Setia Hati Terate (PSHT)','PSHT'],
   ['perisai-diri','Keluarga Silat Nasional (KELATNAS) Indonesia Perisai Diri','KELATNAS'],
   ['perisai-putih','Perguruan Silat Nasional Perisai Putih',''],
   ['tapak-suci','Perguruan Seni Bela Diri Indonesia Tapak Suci Putera Muhammadiyah',''],
   ['phashadja-mataram','Phashadja Mataram',''],
   ['perpi-harimurti','Perguruan Pencak Silat Indonesia (PERPI) Harimurti','PERPI'],
   ['ppsi','Persatuan Pencak Silat Indonesia (PPSI)','PPSI'],
   ['putra-betawi','Persatuan Pencak Silat Putra Betawi',''],
   ['kps-nusantara','Keluarga Pencak Silat (KPS) Nusantara','KPS']
  ],
  besar: [
   ['merpati-putih','Perguruan Pencak Silat Betako Merpati Putih',''],
   ['satria-muda-indonesia','Perguruan Pencak Silat Satria Muda Indonesia (SMI)','SMI'],
   ['persinas-asad','Persinas ASAD',''],
   ['pstd-indonesia','Perguruan Silat Tenaga Dasar (PSTD) Indonesia','PSTD'],
   ['tetada-kalimasada','Tetada Kalimasada Indonesia',''],
   ['pagar-nusa','Pencak Silat Nahdlatul Ulama Pagar Nusa',''],
   ['ikspi-kera-sakti','Ikatan Keluarga Silat Putra Indonesia (IKSPI) Kera Sakti','IKSPI'],
   ['psm','Pencak Silat Militer (PSM)','PSM']
  ]
 };
 return { source:'Daftar kebutuhan Project Owner — Phase 1B.7', records:Object.entries(groups).flatMap(([category,rows])=>rows.map(([id,name,abbreviation],i)=>({
  id,name,abbreviation,aliases:abbreviation?[abbreviation]:[],category,displayOrder:i+1,
  logo:logos[id]||null,shortDescription:null,description:null,history:null,foundedYear:null,founder:null,
  headquarters:null,website:null,geographicalPresence:[],relatedNews:[],gallery:[],
  verificationStatus:'owner-baseline-pending-editorial-verification'
 }))) };
})();
