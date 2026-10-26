# IPSI Sports Federation Portal — Phase 1B.6

**IMPLEMENTATION COMPLETE — PENDING OWNER VISUAL APPROVAL.** Prototype frontend mandiri. Tidak terhubung ke Laravel, Filament, API, database atau IPSI Core. Phase 1C belum dimulai.

[Buka homepage](http://localhost:8088/portal-ipsi/prototype-ijf/index.html) · [Direktori Pelatih](coach.html) · [Laporan Phase1B.5](../docs/development/PHASE_1B6_RED_ACCENT_CARD_AUDIT_REPORT.md) · [Evidence](../docs/development/phase-1b4r-evidence/).

## Pengalaman homepage

Baseline visual tersimpan tanpa perubahan di `design-reference/approved-homepage-baseline.png`. Homepage memakai satu parent Grid: **Hero | Kompetisi Mendatang | Ranking Pesilat**, kemudian **Kabar Silat** full-width dan **Quick Links**. Tiga kartu desktop sejajar pada y181–591 di viewport1536×1024. Hero memakai overlay teks pada foto, Kompetisi/News/Quick Links berwarna netral, Ranking hijau tua, latar halaman gradien terang. Foto serta record tetap dari fixture existing, bukan diekstrak dari baseline.

Kalender interaktif, hasil Provisional dan Top Athletes berada setelah tiga baris pembuka, dilanjutkan agenda, organisasi, galeri dan Pesilat Peduli pada permukaan terang. Kabar Silat menampilkan tiga berita terbit selain hero. Featured assignment manual dan visibility delapan kelompok tetap tersedia. Tablet menempatkan hero di atas sepasang kartu Kompetisi/Ranking; mobile memakai satu kolom.

Kalender mendukung Oktober–Desember 2026, tanggal pilihan, indikator agenda dan event multi-hari. Tombol bulan dibatasi pada rentang fixture. Arrow keys menggerakkan tanggal, Home/End memilih awal/akhir bulan; satu tanggal memiliki tab stop aktif. Daftar tanggal pilihan membuka detail event. Tanggal acuan demo adalah **23 Oktober 2026**, bukan koneksi jadwal live.

Ranking dan spotlight memakai satu state Putra/Putri + kategori Tanding/Seni + kelas Contoh A/B. Peringkat dan poin adalah nilai literal per konteks. Tidak ada rumus atau penggabungan kelas. Pesilat pertama menjadi spotlight; hingga tiga berikutnya tampil dalam daftar pendukung.

## Search dan navigasi

Form pencarian GET pada identity header tersedia di semua ukuran. Header kiri: IPSI → PERSILAT → nama organisasi/tagline. Header kanan: Search → Instagram → Facebook → X → Profil. Pada mobile utilities disusun ulang menjadi baris pencarian dan baris ikon. Tiga ikon sosial berstatus belum dikonfigurasi, tanpa URL rekaan. Profil membuka placeholder login fase berikutnya tanpa form authentication. Tombol Search tambahan pada navigasi membuka inline strip di801–1100px dan dedicated page di≤800px; drawer juga mempertahankan form pencarian. Tidak ada modal Search. Query di-escape/encode; hasil hanya memakai fixture lokal.

Ranking membuka filter kategori/kelas melalui disclosure “Kategori / kelas”. Putra/Putri, periode Oktober2026, link Ranking lengkap dan Top Athletes tetap memakai konteks yang sama. Tidak ada entri kelima, bendera negara atau tab olahraga baru yang direkayasa untuk menyerupai gambar.

Header putih bergulir normal; navigasi merah saja yang sticky. Menu Title Case, underline emas, standard dropdown, mega menu Organisasi dan drawer keyboard tetap dipertahankan. My IPSI adalah dialog placeholder, tidak mengarah ke CMS atau URL login Core.

## Template (16)

| Halaman | URL contoh |
|---|---|
| Homepage | `index.html` |
| Berita / detail | `news.html`, `news-detail.html?id=generasi` |
| Pesilat / profil | `athlete.html`, `athlete-profile.html?id=arka` |
| Ranking | `ranking.html?gender=Putri&category=Tanding&class=Contoh%20A` |
| Kalender | `calendar.html`, `calendar.html?status=Berlangsung` |
| Event / hasil | `event-detail.html?id=sirkuit`, `event-detail.html?id=daerah#hasil` |
| Organisasi / detail | `organization.html?level=Pengprov`, `organization-detail.html?id=jabar` |
| Media / album | `media.html`, `media-detail.html?id=arena` |
| Dokumen | `documents.html` |
| Pesilat Peduli / kegiatan | `pesilat-peduli.html`, `peduli-detail.html?id=ruang-bersama` |
| Search | `search.html?q=Jawa+Barat` |

Profil dan detail dipilih dari direktori. ID invalid menampilkan not-found. Kalender lengkap mempertahankan tampilan daftar/bulan, filter dan ringkasan mobile. Lightbox hanya untuk foto. Dokumen ZIP benar-benar tersedia; tiga berkas PDF fixture belum tersedia dan tombolnya disabled. Berita mempertahankan kategori, search, pagination, detail, copy-link dan related content; profil/event mempertahankan tabs. Organisasi mempertahankan relasi induk/unit turunan.

## Source dan konfigurasi

- `data/fixtures.js`: 16 pesilat sintetik, 7 event fiktif, 4 berita, 10 organisasi. Event tambahan Sirkuit hanya mendemonstrasikan status berlangsung pada 22–24 Oktober.
- `data/content.js`: artikel, program, hasil Provisional, galeri dan dokumen baseline.
- `data/federation.js`: tanggal acuan, bulan yang didukung, assignment Featured, visibility delapan kelompok, optional Peduli logo dan aktivitas.
- `assets/js/app.js`: shell, navigation, inline Search, dialogs yang relevan dan renderer direktori baseline.
- `assets/js/pages.js`: detail/listing serta image-integrated editorial hero.
- `assets/js/federation.js`: homepage approved baseline, mini calendar, shared ranking/spotlight, Peduli dan Search Results.
- CSS: `styles.css` untuk tokens/primitives; `pages.css` untuk baseline page compositions; `federation.css` untuk sports hub serta identitas lintas halaman.

Script klasik defer berurutan; tanpa build, instalasi package, framework baru, CDN atau font eksternal. System font Segoe UI/Arial. Jalankan melalui Apache existing localhost:8088; tidak ada konfigurasi server yang diubah.

`IPSI_THEME.featured` hanya memilih berita yang mempunyai tanggal publikasi, tanpa fallback otomatis ke Latest News. `sections` mengendalikan visibility; agenda off menyembunyikan scoreboard, mini calendar/result preview dan event cards secara terkoordinasi, tetapi menu tetap tersedia. Urutan kelompok stabil dengan komposisi side-by-side desktop dan stack mobile. Fixture varian untuk visibility/unpublished/empty ranking disimpan sebagai `.txt` di evidence; file QA sementara sudah dihapus dari prototype.

Future source boundaries tetap: Filament untuk editorial/media/documents/Peduli/Featured/visibility; penyedia olahraga untuk pesilat/ranking/kompetisi/hasil; integrasi baca Core yang diotorisasi terpisah untuk organisasi/pengurus. Tidak ada master olahraga baru di CMS.

## Logo dan foto

IPSI memakai WebP baseline dengan proporsi asli. PERSILAT kini memakai **salinan byte-identik** `assets/images/persilat-provisional.gif` dari `mockup/assets/images/logo/Persilat.gif`, 423×421, satu frame dan latar putih opaque. Metadata mendeklarasikan transparency index 255, tetapi pemeriksaan alpha menemukan 0 piksel transparan. Layak untuk demo pada sekitar70px desktop/48px mobile. Label provisional publik dihapus atas instruksi Phase 1B.4R. Status tetap dicatat pada data-asset-status dan assets/images/persilat-provisional.metadata.json; alt publik menyebut identitas logo. Kecocokan visual tidak membuktikan autentisitas; status resmi tetap menunggu approval. Tidak mengubah, menggambar ulang atau memotong lambang dan tidak menulis mockup.

Foto arsip mockup belum diverifikasi hak publikasinya, bukan dokumentasi event fiktif. Watermark tetap utuh. Profil pesilat memakai ilustrasi SVG sintetik. Logo khusus Peduli opsional (`null` → identitas teks). Kontak/sosial resmi dan tujuan My IPSI belum dikonfigurasi.

## Batas kerja dan rollback

Source yang ditulis hanya dalam prototype; laporan/evidence hanya di `docs/development`. Portal Laravel, Filament, database, `.env`, service Laragon dan IPSI Core tidak dimodifikasi atau diintegrasikan.

Snapshot sebelum Phase 1B.4: `../docs/development/phase-1b4-evidence/prototype-baseline.zip`. Berisi 36 berkas prototype Phase 1B.3 sebelum perubahan. Snapshot fase sebelumnya tetap disimpan. Untuk rollback, ekstrak ke direktori baru yang diizinkan, bandingkan manifest, lalu review perubahan sebelum mengganti file. Jangan mengekstrak menimpa aplikasi atau Core. Root ZIP existing dan mockup tetap dipertahankan.

Owner harus menilai visual actual desktop/mobile dan memberikan keputusan. Selesainya implementasi atau angka test PASS tidak berarti desain sudah disetujui.


Aset CSS/JS yang berubah memakai query version `v=1b4r.2` pada16 shell HTML untuk invalidasi cache browser. Tidak memerlukan build. Laporan berisi hasil regresi dan pembandingan visual; Phase 1C belum dimulai.


## Koreksi Phase 1B.4R

Featured artikel di Kabar Silat sekarang memakai foto penuh dengan gradient dan teks overlay; detail artikel kini memakai foto dengan judul, kategori, tanggal, penulis dan ringkasan terintegrasi. Kartu Top Athletes dan kalender bersebelahan memakai stretch agar top/bottom sejajar, profil unggulan lebih besar, metadata kategori/kelas/poin eksplisit dan daftar pendukung vertikal. State ranking tetap satu sumber dan jumlah atlet mengikuti fixture.

Sponsor & Mitra Resmi terletak tepat setelah Pesilat Peduli sebelum footer. `IPSI_THEME.sections.sponsors` mengendalikan visibility. `IPSI_THEME.sponsors.tiers/items` menyediakan name, logo, category, websiteUrl, displayOrder dan active. Enam slot netral berlogo null/URL null bukan klaim sponsorship. Records inactive tidak dirender; urutan mengikuti displayOrder. URL HTTP(S) hanya ditautkan jika logo dikonfigurasi; belum ada perusahaan atau link sponsor resmi. Siap dipetakan ke data editorial Filament pada fase terpisah, tanpa resource/backend yang dibuat sekarang.

Rollback Phase 1B.4R: `../docs/development/phase-1b4r-evidence/prototype-baseline.zip` (37 berkas Phase 1B.4). Seluruh foto/logo existing dipertahankan; metadata provisional baru tidak mengganti gambar. Prototype tetap menunggu owner visual approval, tanpa Phase 1C.

Perbaikan kontras akhir: teks placeholder Logo Mitra memakai ink muted yang lebih gelap. CSS memakai query version v=1b4r.3; JS/config tetap v=1b4r.2. Tidak mengubah layout atau perilaku.

## Final UI/UX Corrections & Global Navigation Refinement — 24 Oktober 2026

16 shell memakai v=1b4r.global3 untuk federation.css, pages.js, data/federation.js, federation.js dan app.js. Controller menu tunggal mengelola pointer, click, keyboard, focus, outside click, drawer dan cleanup pagehide. Item dropdown berwarna netral dengan indikator hijau kiri; optional nested flyout didukung dan diuji melalui fixture sementara, tanpa menambahkan hierarki produksi.

Filter ranking homepage berada dalam normal flow. Pada desktop daftar memakai bounded local scroll saat filter dibuka; semua baris dapat dicapai dengan keyboard. Header halaman non-editorial memakai gradient hijau yang sama dengan ranking homepage. Hero detail berita mengintegrasikan foto dan informasi artikel, dengan fallback jika gambar kosong/gagal. Status konfigurasi sosial tersedia melalui accessible description/tooltip, tidak menambah baris visual header.

Laporan terbaru: ../docs/development/PHASE_1B4R_FINAL_UI_UX_REFINEMENT_REPORT.md. Evidence dan rollback sebelum refinement: ../docs/development/phase-1b4r-evidence/global-refinement-20261024/. Snapshot prototype-baseline.zip berisi38 berkas. Fixture QA sementara telah dihapus. Source Laravel, Filament, Core dan mockup tidak ditulis. Database/runtime tidak termasuk klaim hash statis. Status tetap PENDING OWNER VISUAL APPROVAL; Phase1C belum dimulai.


## Phase 1B.5 — Coach Directory Baseline

Direktori: coach.html. Profil: coach-profile.html?id=demo-01. Akses melalui Organisasi → Teknis Olahraga → Pelatih; Pesilat tetap menu utama terpisah. Organisasi memakai panel vertikal ringkas dengan PB/Pengprov/Pengcab dan Pelatih.

15 identitas fiktif tersedia di data/coaches.js. Level Sertifikasi dan Lingkup Lisensi adalah field terpisah; seluruh label dan disclaimer berada pada satu classifications config. Bukan klasifikasi resmi yang telah diverifikasi. Tidak ada nomor sertifikat, telepon, NIK atau alamat pribadi. Avatar berupa inisial sintetis.

assets/js/coaches.js memakai shared shell, pagination dan escaping; filter/card/profile dilokalkan sebagai modul. assets/css/coaches.css hanya dimuat pada dua halaman baru. Search nama/provinsi/Pengcab, level, lisensi dan provinsi dapat digabungkan; reset kembali halaman pertama, pagination6 record per halaman. URL query menyimpan state lokal tanpa request API; link kembali dari profil mempertahankan filter/page. Field opsional kosong memakai fallback, ID invalid menampilkan not-found.

Future reuse: helper classification, avatar, card/filter state, definition list dan riwayat dapat dipakai direktori teknis lain pada fase terpisah; tidak ada halaman Wasit/Juri pada fase ini. Sumber data produksi harus ditetapkan melalui sistem registrasi/sertifikasi yang berotoritas. Tidak diasumsikan data pelatih sudah ada pada IPSI Core. Global Search existing belum diperluas ke domain pelatih dalam fase ini.

Rollback sebelum Phase1B.5: ../docs/development/phase-1b5-evidence/prototype-baseline.zip (38 berkas). Laporan: ../docs/development/PHASE_1B5_COACH_DIRECTORY_BASELINE_REPORT.md. Status IMPLEMENTATION COMPLETE — PENDING OWNER REVIEW. Tidak ada integrasi backend atau perubahan Laravel/Filament/Core. Phase1C tidak dimulai.


## Phase1B.5 Revision — Navigation, Wasit/Juri & Compact Cards

Ranking dipindahkan dari menu utama ke Pesilat → Direktori Pesilat / Ranking Pesilat. Organisasi tetap vertikal: Struktur Organisasi (PB/Pengprov/Pengcab), Teknis Olahraga (Pelatih/Wasit-Juri). Heading dekoratif Pesilat dihapus; controller disclosure existing dipertahankan.

Direktori baru referee.html dan referee-profile.html?id=official-demo-12 memakai data/referees.js dan assets/js/referees.js, serta stylesheet teknis coaches.css yang digunakan bersama.15 petugas fiktif dengan classificationGroup, licenseLevel dan assignmentRole terpisah. Filter level dependen pada Daerah/Nasional/Internasional; group berubah mereset level, kombinasi query invalid dinormalisasi. Technical Delegate/Kehormatan adalah peran tambahan, bukan tingkat lisensi otomatis. Tidak ada validasi, promosi jenjang atau nomor sertifikat resmi.

Global Search kini memuat fixture Pelatih dan Wasit/Juri serta membuka profil masing-masing. Pernyataan pada catatan baseline lama bahwa domain pelatih belum masuk Search digantikan oleh revisi ini. Tidak ada API/database.

Homepage opening dan foto hero tetap sama. Sports duo memakai align-items:start tanpa stretch, card content-sized, avatar spotlight128px desktop/90px mobile, metadata dan maksimal4 atlet dipertahankan. Kalender bulanan tetap interaktif; selected agenda ringkas dan hasil3 peserta menjadi preview horizontal dengan link detail. Padding/avatar direktori, event list, ranking row, news summary dan info panels dirapikan secara selektif; foto editorial/media besar dipertahankan.

Snapshot rollback sebelum revisi: ../docs/development/phase-1b5-revision-evidence/prototype-baseline.zip (43 berkas). Laporan: ../docs/development/PHASE_1B5_NAVIGATION_REFEREE_REVISION_REPORT.md. CSS federation memakai v1b5r.2; app/federation JS dan data/referees v1b5r.1. Tidak ada build/dependency/backend changes. Status IMPLEMENTATION COMPLETE — PENDING OWNER REVIEW. Phase1C tidak dimulai.


## Phase1B.6 — Approved Option3 Red Accent

Referensi owner disimpan byte-identik di design-reference/approved-option3-red-accent.png (kuadran kiri bawah). Kalender homepage kini mempunyai header gradient merah, body putih, selected date merah, range/event soft red dan kontrol disabled netral. Pesilat Teratas putih, spotlight soft red dengan garis kiri merah dan avatar compact; supporting list tetap putih. Opening, Ranking hijau dan navigasi existing dipertahankan.

Token --ipsi-*, --surface-*, --text-* dan --border-neutral berada di :root styles.css; warna navigasi legacy --red tetap. Compact sports styles diperbarui pada blok existing, dengan obsolete stretch/portrait280–300px rules dihapus. Tidak menambahkan file CSS baru atau business logic. Badge hasil Provisional kecil dan shared neutral technical-directory surfaces memakai tokens. Kicker Media/Peduli di permukaan terang diperbaiki dari emas muda menjadi merah untuk kontras.

Laporan: ../docs/development/PHASE_1B6_RED_ACCENT_CARD_AUDIT_REPORT.md. Evidence dan rollback47-file ZIP: ../docs/development/phase-1b6-evidence/.52 layout checks,41 functional checks,14 contrast samples PASS. QA visibility variants disimpan sebagai .txt; runtime QA telah dihapus. Warna kontras diperiksa dari computed CSS/endpoints, bukan klaim sertifikasi WCAG penuh.

Status IMPLEMENTATION COMPLETE — PENDING OWNER VISUAL APPROVAL. Laravel/Filament/database/Core tidak ditulis atau diintegrasikan. Tidak ada deployment atau Phase1C.

## Phase 1B.7 — Tentang IPSI & Direktori Perguruan

Enam halaman baru: about.html, history.html, perguruan-historis.html, perguruan-besar.html, perguruan.html, perguruan-detail.html?id=psht. Satu master data/perguruan.js menyimpan 18 nama dan urutan Project Owner: 10 Historis dan 8 Besar. Alias hanya dari singkatan pada daftar yang diberikan. Logo, fakta sejarah, domisili, sebaran, publikasi, dan galeri tidak diasumsikan; field tetap null/empty. Klasifikasi belum dinyatakan sebagai daftar resmi terkini.

Menu Perguruan memakai dropdown tiga tautan; Tentang IPSI memiliki tautan landing dan tombol disclosure Sejarah terpisah. Ranking tetap submenu Pesilat. Struktur homepage dan komponen Red Accent dipertahankan. Global Search menambahkan grup Perguruan. Direktori mendukung pencarian, kategori, pagination enam record per halaman, reset, empty state, dan pelestarian query ketika kembali dari profil. Filter wilayah disabled sampai ada data yang membedakan domisili sekretariat pusat dari sebaran.

Module assets/js/perguruan.js dan stylesheet assets/css/perguruan.css hanya dimuat enam halaman baru. Shell existing memakai app/federation versi1b7.1; perguruan.css memakai versi1b7.3 (target pagination44px dan panel pengantar mengisi grid). Tidak ada dependency/build/backend baru. Kontrak data masa depan, QA, manifest, dan batas verifikasi ada di ../docs/development/PHASE_1B7_ABOUT_IPSI_PERGURUAN_BASELINE_REPORT.md. Rollback 48-file source dan evidence: ../docs/development/phase-1b7-evidence/.

Status IMPLEMENTATION COMPLETE — PENDING OWNER VISUAL APPROVAL. Integrasi Core/API dan editorial Filament masih berupa rencana terpisah; Phase1C tidak dimulai.

## Phase1B.7 Addendum — Final Navigation & Mockup History Timeline

Bagian ini menggantikan susunan navigasi/timeline pada catatan Phase1B.7 sebelumnya. Main menu final: Beranda, Kabar Silat, Kompetisi, Pesilat, Perguruan, Dokumen, Pesilat Peduli, Tentang IPSI. Organisasi tidak lagi main menu; route tetap tersedia di Tentang IPSI setelah Sejarah: PB, Pengprov, Pengcab, Pelatih, Wasit/Juri. Label Struktur Organisasi/Teknis Olahraga non-clickable. Landing Tentang tetap anchor tersendiri dan mempunyai gateway keenam destination tersebut.

Sejarah memakai struktur horizontal interaktif dari mockup/sejarah.html yang dibaca read-only: side arrows, flex track/translateX, watermark besar, vertical milestone dots, swipe50px dan transisi0.7s/0.6s/fade0.8s. Palet mengikuti Portal; data sejarah tetap pending, ordinal01–04 bukan tahun. Keyboard, aria/inert/live status dan reduced motion didukung. CSS scoped menjaga transform tombol saat :active agar klik pointer tetap tepat.

Source tetap57 berkas, tanpa perubahan fixture. Cache shared app/federation CSS1b7a.1, perguruan JS1b7a.2, scoped CSS1b7a.3. QA addendum:57 layout checks,96 assertion fungsional,6 sampel kontras PASS; satu kegagalan pointer sudah diperbaiki dan dicatat RESOLVED. Pengujian touch memakai fixture event sintetis, bukan perangkat fisik. Fixture QA sudah diarsipkan di evidence dan dihapus dari runtime. Snapshot rollback57-file: ../docs/development/phase-1b7-evidence/addendum-rollback.zip. Laporan bagian23–24 dan evidence prefix addendum- merupakan hasil terbaru; file fase awal tetap menjadi rekaman historis.

IMPLEMENTATION COMPLETE — PENDING OWNER REVIEW. Tidak ada perubahan Core/Laravel/Filament/database, deployment, atau Phase1C.

## Phase 1B.8 — Global UI Component Refinement

Form/filter memakai kontrol 44px, radius9px, focus merah IPSI, panel ivory compact, tab dan pagination merah. Stylesheet shared menjadi sumber utama; definisi field/filter duplikat dikonsolidasikan. Tabel internal memakai caption forest gradient, divider netral, hover merah lembut, angka rata kanan dan badge posisi. Homepage tetap memakai komposisi/card yang disetujui. Timeline horizontal tetap mengikuti mockup dengan permukaan putih, watermark merah transparan, dan spacing compact. Ordinal fixture01–04 dipertahankan karena sejarah belum terverifikasi.

Cache asset yang berubah:1b8.3. JavaScript hanya menambah markup badge/data-rank; data dan mekanisme existing tetap. Tidak ada dependency baru. Evidence, rollback57-file, screenshot before/after dan QA tersedia di ../docs/development/phase-1b8-evidence/. Laporan: ../docs/development/PHASE_1B8_GLOBAL_UI_REFINEMENT_REPORT.md.

IMPLEMENTATION COMPLETE — PENDING OWNER VISUAL REVIEW. Phase1C tidak dimulai.
