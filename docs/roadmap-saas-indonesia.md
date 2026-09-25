# Roadmap SaaS Indonesia — dari Sabang sampai Merauke

> Disusun September 2026. Semua angka ada sumbernya (lihat [Sumber](#12-sumber)).
> Yang ditandai **(asumsi)** adalah perkiraan kerja yang harus divalidasi di lapangan, bukan data resmi.

---

## 0. Ringkasan satu halaman

**Masalah inti yang dipilih:** 64 juta UMKM menyumbang ±61% PDB dan menyerap ±97% tenaga kerja,
tapi mayoritas **tidak punya catatan usaha yang rapi**. Akibatnya berantai:

1. pemilik tidak tahu untung/rugi sebenarnya → usaha stagnan;
2. tidak punya rekam jejak → sulit dapat kredit murah → lari ke rentenir/pinjol;
3. pajak & perizinan terasa menakutkan (PP 20/2026 mewajibkan WP OP lama pindah ke pembukuan/NPPN);
4. pelanggan tidak terlayani baik (antre, tidak ada pengingat servis, harga tidak transparan).

**Tesis:** SaaS yang *dipakai setiap hari untuk operasional* (kasir, stok, antrean, WA ke pelanggan)
secara otomatis menghasilkan **pembukuan dan rekam jejak** — tanpa pemilik harus "belajar akuntansi".
Dari rekam jejak itu dibuka manfaat sosial: laporan pajak sekali klik, akses modal lewat mitra resmi,
dan data harga yang transparan untuk pelanggan.

**Rekomendasi strategi:** jangan bikin "super-app untuk semua masalah". Mulai dari **satu vertikal
yang sudah terbukti jalan — bengkel (BengkelOS, sudah live di Pontianak)** — lalu melebar ke
**usaha jasa sejenis** dan **koperasi desa/nelayan** dengan inti mesin yang sama.

| Fase | Waktu | Fokus | Target keluar fase |
|---|---|---|---|
| 0. Validasi | Okt–Des 2026 | 10 bengkel berbayar di Pontianak | 10 pelanggan bayar, churn 0–1 |
| 1. Product–market fit | Jan–Jun 2027 | Kalimantan + 2 kota Sumatra/Sulawesi | 150 bengkel, MRR Rp22 jt |
| 2. Mesin sosial | Jul–Des 2027 | Laporan pajak, skor usaha, mitra modal | 600 bengkel, 1 mitra pembiayaan |
| 3. Nusantara | 2028 | Vertikal ke-2 (jasa/koperasi), mode offline untuk Timur | 2.500 tenant, 7 wilayah |
| 4. Platform | 2029+ | API, marketplace sparepart, data harga publik | 10.000 tenant |

---

## 1. Kenapa Indonesia, kenapa sekarang

| Indikator | Angka | Artinya untuk SaaS |
|---|---|---|
| Jumlah UMKM | >64,2 juta unit (99,99% usaha) | Pasar sangat besar tapi terfragmentasi |
| Kontribusi UMKM ke PDB | 61,07% (2023) | Masalah UMKM = masalah ekonomi nasional |
| Tenaga kerja di UMKM | >123 juta orang (±97%) | Dampak sosial langsung ke rumah tangga |
| UMKM sudah "go digital" | 25,5 juta (Juli 2024) | Baru ±40% — dan kebanyakan baru sebatas jualan online, bukan operasional |
| Merchant QRIS | 42,75 juta; pengguna 59,53 juta (Q4 2025) | Pembayaran digital sudah biasa; tinggal *pencatatan*-nya |
| Penetrasi internet | 80,66% nasional (APJII 2025) | Cukup untuk SaaS berbasis HP, tapi timpang per wilayah |
| Literasi keuangan | 66,46% vs inklusi 80,51% (SNLIK 2025) | Orang *punya* akses keuangan, tapi belum paham mengelolanya — celah untuk alat yang "membimbing" |
| Biaya logistik | 14,29% PDB; target 12% di 2029 | Disparitas harga Jawa vs Timur 20–40% |
| Kendaraan bermotor | 168,3 juta unit (April 2025), 83,7% motor | ±400.000 bengkel, 95% UMKM |
| Pajak UMKM | PP 20/2026: WP OP terdaftar ≤2018 wajib pembukuan/NPPN mulai 2026 | Pendorong regulasi untuk mulai mencatat |
| Perlindungan data | UU PDP berlaku penuh sejak 17 Okt 2024; Lembaga PDP ditargetkan 2026 | Wajib desain privasi sejak awal — sekaligus jadi nilai jual vs aplikasi abal-abal |

**Momentum 2026 yang jarang terjadi:**
- **Koperasi Desa/Kelurahan Merah Putih**: target 60.000 aktif akhir 2026, anggaran digitalisasi
  Rp480 miliar, rekrutmen 30.000 manajer koperasi. Ribuan organisasi baru yang *butuh* kasir,
  pembukuan, dan stok — dengan pengelola yang baru direkrut.
- **Kampung Nelayan Merah Putih**: 1.269 lokasi ditargetkan beroperasi 2026.
- **Makan Bergizi Gratis**: 21.102 SPPG (dapur) per Jan 2026, target ±28.000 — rantai pasok pangan
  lokal yang besar dan butuh pencatatan bahan baku.

---

## 2. Peta masalah masyarakat → peluang SaaS

Dinilai 1–5 (5 = terbaik). *Akses* = seberapa mudah kita menjangkau pembelinya sebagai tim kecil.

| # | Masalah | Siapa yang kena | Dampak sosial | Mau bayar? | Akses | Keunggulan kita | **Total** |
|---|---|---|---|---|---|---|---|
| A | Usaha jasa tidak punya catatan (bengkel, laundry, salon, servis HP) | Jutaan usaha mikro | 4 | 4 | 5 | 5 (BengkelOS sudah live) | **18** |
| B | Koperasi desa baru tanpa sistem | 60.000 KDKMP | 5 | 3 (anggaran pemerintah) | 3 | 3 | **14** |
| C | Nelayan rugi karena ikan busuk & harga ditekan | Nelayan kecil pesisir Timur | 5 | 2 | 2 | 2 | **11** |
| D | Petani gurem tergantung tengkulak | 17,25 juta petani gurem | 5 | 1 | 2 | 1 | **9** |
| E | Stok & bahan dapur SPPG/MBG tidak tercatat | 21.000+ SPPG | 4 | 3 | 2 | 2 | **11** |
| F | Pesantren kelola SPP, tabungan santri manual | 42.391 pesantren | 3 | 3 | 3 | 2 | **11** |
| G | BUMDes tidak punya laporan keuangan layak | 65.941 BUMDes (75,8% aktif) | 4 | 2 | 3 | 2 | **11** |

**Keputusan:** A sebagai *wedge* (cepat menghasilkan uang, produk sudah ada), B sebagai
ekspansi utama (mesin kasir+stok+buku besar yang sama, beda template), C sebagai modul
khusus Indonesia Timur setelah mode offline matang. D dan E dicatat sebagai peluang jangka panjang
— pembelinya bukan pengguna (dinas/lembaga), siklus jualnya panjang, tidak cocok untuk tim kecil di awal.

---

## 3. Riset pasar per wilayah — Sabang sampai Merauke

Penetrasi internet per wilayah (APJII 2025): **Jawa 85%**, Kalimantan 78,72%, Sumatera 77,12%,
Bali–Nusa Tenggara 76,86%, Sulawesi 71,64%, **Maluku–Papua 69,26%** (hanya 3,71% pengguna nasional).

Implikasi desain: produk harus jalan di HP Android murah, hemat kuota, dan **tetap bisa mencatat saat
sinyal hilang** (sinkron belakangan). Ini bukan fitur tambahan — ini syarat untuk bisa jualan di luar Jawa.

### 3.1 Sumatera (Aceh → Lampung)

- **Karakter ekonomi:** perkebunan (sawit, karet, kopi Gayo), perdagangan antarkota, jalur
  lintas Sumatera yang padat truk dan motor.
- **Masalah nyata:** stunting Aceh 28,6% (SSGI 2024); harga komoditas perkebunan fluktuatif dan
  petani kecil menjual ke pengepul tanpa catatan; bengkel truk & motor di sepanjang jalan lintas
  bekerja dengan nota tulisan tangan.
- **Peluang SaaS:** bengkel motor/truk (vertikal A), koperasi perkebunan (vertikal B).
- **Kota pintu masuk:** Medan, Palembang, Pekanbaru, Banda Aceh, Bandar Lampung.
- **Use case:** bengkel truk di jalur lintas timur melayani armada ekspedisi. Pemilik armada
  minta riwayat servis per nomor polisi untuk klaim biaya. Dengan riwayat servis per kendaraan
  (sudah ada di BengkelOS: tiket = pelanggan + kendaraan + item), bengkel bisa kirim rekap
  bulanan ke pemilik armada → jadi alasan armada tetap servis di situ. **(skenario, belum divalidasi)**

### 3.2 Jawa (Banten → Jawa Timur)

- **Karakter ekonomi:** pusat UMKM, manufaktur, jasa. Jawa Timur saja punya 26,1 juta kendaraan
  (15,5% nasional). Jawa Barat punya 12.977 pesantren (30,6% nasional).
- **Masalah nyata:** kompetisi ketat antar-usaha; persaingan aplikasi kasir juga paling ketat di
  sini (Majoo mulai Rp129 rb/bln, Moka Rp299 rb/outlet/bln, Pawoon Rp149–299 rb/bln).
- **Peluang SaaS:** *jangan* masuk Jawa duluan dengan kasir generik. Masuk dengan vertikal yang
  spesifik (bengkel, pesantren) di mana kompetitor generik lemah.
- **Kota pintu masuk:** Surabaya, Semarang, Malang — bukan Jakarta (Jabodetabek sudah punya
  30–40 ribu bengkel dan paling banyak dikejar kompetitor).
- **Use case:** pesantren di Jawa Barat mengelola SPP, uang saku dan tabungan santri di buku
  kas. Wali santri tidak tahu saldo anaknya. Modul "dompet santri" + notif WA ke wali adalah
  perluasan alami dari kasir + notifikasi WA yang sudah ada. **(vertikal fase 3–4)**

### 3.3 Kalimantan (Kalbar → Kaltara) — **basis kita**

- **Karakter ekonomi:** tambang, sawit, perdagangan sungai; IKN mendorong pembangunan Kaltim.
  Penetrasi internet 78,72% — kedua tertinggi setelah Jawa.
- **Masalah nyata:** stunting Kalbar 26,8% (SSGI 2024). Kota-kota seperti Pontianak, Singkawang,
  Kubu Raya punya banyak bengkel keluarga yang dikelola turun-temurun tanpa sistem.
- **Bukti lapangan (nyata, dari repo ini):**
  - BengkelOS sudah **live di 1 bengkel mitra di Pontianak**.
  - Outreach WhatsApp sudah dijalankan ke **34 bengkel** Pontianak (batch 1: 20, batch 2: 14 —
    lihat `outreach/`). Pelajaran dari batch 1 → batch 2: pesan pembuka dipendekkan menjadi
    satu pertanyaan tanpa pitch ("sekarang nota servis & stok dicatat pakai apa?").
- **Kota ekspansi berikutnya:** Singkawang, Kubu Raya, Balikpapan, Samarinda, Banjarmasin.
- **Use case:** bengkel mobil keluarga di Pontianak — pemilik (owner) pegang keuangan, kasir
  pegang nota, mekanik pegang tiket. Sebelum: nota kertas, stok sparepart dihitung manual,
  pelanggan ditelpon satu per satu. Sesudah (fitur yang sudah ada): PIN per peran, stok otomatis
  berkurang saat tiket selesai, pengingat booking harian, tombol WA "mobil sudah siap", laporan
  P&L. **Metrik yang harus mulai dicatat:** jam yang dihemat per hari, selisih stok per bulan,
  tingkat kembali pelanggan.

### 3.4 Sulawesi (Sulut → Sultra)

- **Karakter ekonomi:** nikel (Sulteng, Sultra), perikanan, cengkeh, kakao; Makassar sebagai hub
  Indonesia Timur.
- **Masalah nyata:** stunting Sulbar 35,4% dan Sultra 26,1% (SSGI 2024); penetrasi internet 71,64%.
- **Peluang SaaS:** bengkel & usaha jasa di Makassar/Manado/Kendari (vertikal A); koperasi nelayan
  dan kakao (vertikal B/C).
- **Kota pintu masuk:** Makassar (hub distribusi ke seluruh Timur — satu distributor sparepart di
  sini bisa jadi kanal ke ratusan bengkel), Manado, Kendari.
- **Use case:** kawasan tambang nikel di Morowali/Kendari menaikkan jumlah kendaraan operasional
  dan motor pekerja → bengkel baru tumbuh cepat, tanpa sistem. **(hipotesis pasar, perlu survei)**

### 3.5 Bali & Nusa Tenggara

- **Karakter ekonomi:** pariwisata (Bali, Labuan Bajo, Lombok), pertanian lahan kering, perikanan.
- **Masalah nyata:** stunting NTT 37% dan NTB 29,8% (SSGI 2024) — termasuk yang tertinggi;
  susut hasil tangkapan ikan tinggi.
- **Use case nyata (terdokumentasi media):** koperasi nelayan di Sulamu, Kupang (NTT) menerapkan
  *cold chain* tenaga surya dan menurunkan susut hasil tangkap yang sebelumnya **hingga 40%**.
  Pelajaran untuk SaaS: masalah nelayan bukan hanya alat pendingin, tapi **pencatatan siapa
  menyetor berapa, disimpan di mana, dijual ke siapa, harga berapa** — itulah yang membuat koperasi
  bisa membagi hasil dengan adil dan dipercaya anggotanya.
- **Peluang SaaS:** modul koperasi nelayan (setoran per anggota, stok ruang pendingin, harga jual,
  bagi hasil) — dijual ke koperasi/KNMP, bukan ke nelayan perorangan.

### 3.6 Maluku & Maluku Utara

- **Karakter ekonomi:** perikanan (cakalang, tuna), rempah (pala, cengkeh), kepulauan.
- **Masalah nyata:** stunting Maluku 28,4%; internet 69,26% (bersama Papua).
- **Use case nyata (terdokumentasi media):**
  - **Ternate, Jan 2025:** nelayan cakalang mengeluhkan kapasitas *cold storage* di Pelabuhan
    Perikanan Dufa-Dufa terbatas → saat musim ikan banyak hasil tangkapan tidak terserap.
  - **Pulau Banda, 2023:** nelayan menghasilkan 7 sampai belasan ton ikan per hari, tapi cold
    storage milik DKP Provinsi tidak bisa menampung — nelayan sampai berdemo ke kantor DKP.
- **Pelajaran:** masalahnya adalah **kapasitas dan penjadwalan**, bukan hanya jumlah mesin.
  Sistem sederhana "kapasitas tersisa hari ini + antrean setor + pembeli yang siap ambil" bisa
  mengurangi ikan terbuang tanpa membangun cold storage baru.

### 3.7 Papua (6 provinsi)

- **Karakter ekonomi:** harga barang tinggi karena logistik (kapal jarang, kontainer balik ke
  Jawa sering kosong), ekonomi kampung, dana otsus dan dana desa besar.
- **Masalah nyata:** stunting Papua Pegunungan **40%** (tertinggi nasional), Papua Tengah 32,5%,
  Papua Barat Daya 30,5%; internet paling rendah; ongkos kirim luar Jawa 20–40% lebih mahal.
- **Pendekatan yang realistis:** Papua **bukan** pasar awal untuk langganan bulanan. Masuk lewat
  kanal B2B/B2G (koperasi, BUMDes/BUMKam, dinas, CSR BUMN) di fase 3–4, dengan produk yang sudah
  terbukti offline-first di Maluku/NTT.
- **Use case:** kios/koperasi kampung mencatat stok barang kiriman kapal dan harga jual. Data
  harga agregat antar-kampung (anonim) bisa menjadi alat transparansi harga untuk pemda.
  **(visi jangka panjang)**

### 3.8 Rangkuman wilayah → urutan masuk

| Urutan | Wilayah | Alasan |
|---|---|---|
| 1 | Kalimantan (Pontianak dulu) | Basis, sudah ada pelanggan, internet baik, kompetitor sedikit |
| 2 | Sumatera & Sulawesi (kota hub) | Pasar bengkel besar, kompetitor kasir lemah di vertikal bengkel |
| 3 | Jawa Timur / Jawa Tengah | Volume terbesar — masuk setelah produk matang & ada studi kasus |
| 4 | NTT, Maluku | Modul koperasi/nelayan + offline-first, lewat mitra |
| 5 | Papua | Lewat B2B/B2G setelah terbukti di wilayah 4 |

---

## 4. Ukuran pasar (vertikal bengkel dulu)

| Level | Perhitungan | Nilai per tahun |
|---|---|---|
| TAM | 400.000 bengkel × Rp150 rb/bln × 12 | ±Rp720 miliar |
| SAM | ±30% yang punya ≥2 staf & sudah pakai HP untuk usaha **(asumsi)** = 120.000 × Rp150 rb × 12 | ±Rp216 miliar |
| SOM 3 tahun | 1% TAM = 4.000 bengkel × Rp150 rb × 12 | ±Rp7,2 miliar ARR |

Ditambah vertikal koperasi: 60.000 KDKMP × Rp100 rb/bln **(asumsi harga B2G)** = ±Rp72 miliar/tahun
potensi — tapi bersaing langsung dengan Digi Koperasi (Telkom), jadi posisikan sebagai
**alternatif yang lebih sederhana** atau integrasi, bukan lawan.

---

## 5. Produk

### 5.1 Inti yang sama untuk semua vertikal ("mesin")

Sudah ada di BengkelOS dan tinggal digeneralisasi:

- Multi-tenant (`shop_id` di setiap tabel + RLS Postgres) → ganti konsep jadi `tenant_id`/`org_id`.
- Login PIN per peran (owner / kasir / staf) dengan hash bcrypt di Postgres dan lockout.
- Tiket/transaksi → item → pembayaran → stok otomatis berkurang.
- Buku kas & P&L, pengeluaran, notifikasi in-app, WhatsApp ke pelanggan, lampiran privat.

### 5.2 Yang perlu dibangun, berurutan

| Prioritas | Fitur | Masalah sosial yang disentuh | Fase |
|---|---|---|---|
| P0 | Onboarding mandiri (daftar → bengkel siap pakai < 10 menit) & tagihan langganan | Skalabilitas | 0–1 |
| P0 | Import stok dari Excel/foto nota | Hambatan mulai | 1 |
| P0 | Pembayaran QRIS dinamis tercatat otomatis (lewat PJP berizin BI, bukan pegang dana sendiri) | Kas tercampur | 1 |
| P1 | **Laporan pajak sekali klik**: omzet bulanan untuk PPh Final 0,5% / NPPN sesuai PP 20/2026 | Takut pajak, denda | 2 |
| P1 | **Rapor Usaha**: skor kesehatan usaha dari data transaksi (omzet stabil, margin, perputaran stok) yang *pemilik sendiri* bisa bagikan | Akses modal | 2 |
| P1 | Pengingat servis berkala ke pelanggan via WA | Keselamatan kendaraan, loyalitas | 1 |
| P1 | Mode offline (PWA + antrean sinkron) | Kesenjangan internet Timur | 2–3 |
| P2 | Template vertikal: laundry, servis HP/elektronik, salon, koperasi, koperasi nelayan | Ekspansi | 3 |
| P2 | Pesan sparepart ke distributor dari titik reorder | Harga & ketersediaan | 3 |
| P3 | Indeks harga jasa/sparepart per kota (anonim, agregat) | Transparansi harga | 4 |

### 5.3 Prinsip desain

1. **HP dulu, bahasa sehari-hari.** Tidak ada istilah "debit/kredit" di layar utama.
2. **Data milik usaha.** Ekspor lengkap kapan saja; berbagi ke bank/koperasi hanya dengan
   persetujuan eksplisit per penerima (sejalan UU PDP).
3. **Kita bukan lembaga keuangan.** Tidak menyalurkan pinjaman, tidak menampung dana. Kita
   menghubungkan ke mitra berizin OJK/BI dan dibayar sebagai referal/penyedia data atas izin pengguna.
4. **Hemat kuota**: halaman ringan, gambar dikompres, sinkron hanya perubahan.

---

## 6. Model bisnis & harga

| Paket | Harga | Isi | Target |
|---|---|---|---|
| Gratis | Rp0 | 1 pengguna, 50 transaksi/bln, tanpa laporan | Corong masuk |
| Usaha | Rp99 rb/bln | 3 pengguna, stok, WA, laporan P&L | Bengkel kecil |
| Usaha Plus | Rp199 rb/bln | Pengguna tak terbatas, laporan pajak, Rapor Usaha, booking | Bengkel menengah |
| Koperasi / Lembaga | Kontrak tahunan per unit | Template koperasi, konsolidasi banyak unit, dasbor pembina | KDKMP, KNMP, BUMDes, CSR |

- Diposisikan **di bawah Moka/Pawoon (Rp299 rb)** dan setara Majoo tapi dengan fitur khusus bengkel.
- Diskon tahunan 2 bulan gratis (arus kas lebih sehat, churn lebih rendah).
- Pendapatan tambahan (fase 2+): komisi referal pembiayaan & asuransi dari mitra berizin;
  margin kecil dari pemesanan sparepart.

**Unit economics sasaran (asumsi awal, validasi di fase 1):**
ARPU Rp150 rb · CAC ≤ Rp450 rb (≤3 bulan) · churn ≤ 3%/bln · margin kotor ≥ 80%
(biaya infra per tenant di Supabase/Vercel sangat kecil pada skala ratusan).

---

## 7. Go-to-market

1. **Founder-led sales di Pontianak** (sedang berjalan): WA satu per satu, opener pendek, demo
   di lokasi, gratis bulan pertama. Catat setiap balasan di satu sheet: pakai apa sekarang,
   keberatan, hasil.
2. **Studi kasus**: dari bengkel mitra pertama — angka sebelum/sesudah (jam admin, selisih stok,
   pelanggan kembali). Satu studi kasus lokal lebih kuat dari seribu iklan.
3. **Referal bengkel-ke-bengkel**: 1 bulan gratis untuk yang merekomendasikan dan yang direkomendasikan.
4. **Mitra kanal**: distributor sparepart & toko oli (mereka mengunjungi ratusan bengkel tiap
   minggu), komunitas mekanik, SMK Teknik Otomotif (calon mekanik dilatih pakai BengkelOS).
5. **Duta kota** (fase 2+): satu orang lokal per kota, dibayar komisi berulang 20% selama 12 bulan.
6. **Kanal lembaga** (fase 3+): Dinas Koperasi & UMKM, pendamping koperasi, program CSR BUMN,
   KKP untuk KNMP. Butuh legalitas PT, NIB, terdaftar PSE di Komdigi, dan e-Katalog bila ikut
   pengadaan pemerintah.

---

## 8. Roadmap rinci

### Fase 0 — Validasi (Okt–Des 2026)

- [ ] Wawancara 20 bengkel (dari 34 lead yang sudah dihubungi) dengan skrip tetap.
- [ ] Onboard 3–5 bengkel pilot tambahan di Pontianak, gratis 1 bulan.
- [ ] Ukur dan tulis studi kasus bengkel mitra pertama.
- [ ] Ubah pilot 1 bengkel → aplikasi multi-tenant sungguhan: pendaftaran mandiri, isolasi data
      per tenant diuji (tes RLS lintas tenant), tagihan langganan.
- [ ] Legal: PT Perorangan/PT, NIB via OSS, kebijakan privasi & syarat layanan sesuai UU PDP.
- **Gerbang keluar:** ≥10 bengkel membayar, ≥70% pakai aplikasi ≥5 hari/minggu.

### Fase 1 — Product–market fit (Jan–Jun 2027)

- [ ] QRIS terintegrasi via PJP berizin; import stok; pengingat servis WA.
- [ ] Ekspansi Singkawang, Kubu Raya, lalu 1 kota Sumatera (Medan/Pekanbaru) dan Makassar.
- [ ] Program referal + 2 distributor sparepart sebagai mitra kanal.
- [ ] Dasbor metrik internal: aktivasi, retensi mingguan, churn, MRR.
- **Gerbang keluar:** 150 bengkel berbayar, MRR ±Rp22 jt, churn < 5%/bln, ≥40% pengguna bilang
  "sangat kecewa" jika aplikasi hilang (uji Sean Ellis).

### Fase 2 — Mesin sosial (Jul–Des 2027)

- [ ] Laporan pajak sekali klik (PPh Final 0,5% & NPPN); panduan setor lewat Coretax.
- [ ] Rapor Usaha + alur persetujuan berbagi data per penerima.
- [ ] 1 mitra pembiayaan berizin OJK (bank/BPR/koperasi simpan pinjam) untuk pilot modal kerja.
- [ ] Mode offline versi 1.
- [ ] Rekrut 1 orang CS/onboarding + duta di 5 kota.
- **Gerbang keluar:** 600 bengkel, ≥30 usaha mengajukan modal lewat Rapor Usaha, ≥1 cerita
  pengguna yang mendapat modal lebih murah dari sebelumnya.

### Fase 3 — Nusantara (2028)

- [ ] Rename platform/brand payung (BengkelOS tetap sebagai produk vertikal).
- [ ] Vertikal ke-2: laundry/servis HP (B2C jasa) **atau** koperasi (B2G) — pilih berdasarkan data
      permintaan fase 2.
- [ ] Modul koperasi nelayan: setoran anggota, kapasitas cold storage, bagi hasil — pilot 1 koperasi
      di NTT/Maluku lewat mitra LSM/CSR.
- [ ] Jawa Timur & Jawa Tengah dengan studi kasus luar Jawa.
- **Gerbang keluar:** 2.500 tenant di 7 wilayah, ARR ±Rp4,5 M.

### Fase 4 — Platform (2029+)

- API terbuka untuk mitra (bank, distributor, asuransi).
- Marketplace sparepart antar-bengkel & distributor.
- Indeks harga jasa/barang publik (agregat, anonim) — untuk pemda & konsumen.
- Masuk Papua lewat BUMKam/koperasi dan program pemerintah.

---

## 9. Tim & biaya (lean)

| Periode | Tim | Biaya bulanan kira-kira **(asumsi)** |
|---|---|---|
| Fase 0 | Founder (produk + jualan) | Infra < Rp1 jt + transport |
| Fase 1 | + 1 dev paruh waktu | Rp10–15 jt |
| Fase 2 | + 1 CS/onboarding, duta kota berbasis komisi | Rp25–35 jt |
| Fase 3 | + 1 dev, 1 sales lembaga | Rp60–80 jt |

Target *default alive*: MRR menutup biaya operasional di akhir fase 2 tanpa pendanaan luar.
Pendanaan (angel/hibah inovasi sosial) baru dicari untuk mempercepat fase 3.

---

## 10. Regulasi yang wajib diperhatikan

| Aturan | Dampak | Tindakan |
|---|---|---|
| UU 27/2022 PDP | Wajib dasar hukum pemrosesan, hak subjek data, notifikasi kebocoran 3×24 jam; denda s.d. 2% pendapatan | Kebijakan privasi, persetujuan berbagi data, log akses, prosedur insiden |
| PSE Lingkup Privat (Komdigi) | Wajib daftar untuk layanan digital | Daftar setelah PT & NIB ada |
| PP 20/2026 (PPh Final UMKM) | Siapa yang masih 0,5% vs wajib pembukuan | Fitur laporan pajak harus mengikuti aturan terbaru |
| Aturan BI soal pembayaran | Tidak boleh menampung dana tanpa izin | Pakai PJP berizin untuk QRIS |
| Aturan OJK | Tidak boleh menyalurkan pinjaman tanpa izin | Hanya referal ke mitra berizin |

---

## 11. Risiko & mitigasi

| Risiko | Kemungkinan | Mitigasi |
|---|---|---|
| Pemilik bengkel tidak mau bayar langganan | Tinggi | Tunjukkan uang yang diselamatkan (selisih stok, pelanggan kembali); harga Rp99 rb; tahunan |
| Staf kembali ke nota kertas | Tinggi | Alur 3 ketukan untuk tiket; pendampingan minggu pertama; kasir yang *lebih cepat* dari kertas |
| Kompetitor besar (Majoo/Moka) masuk vertikal bengkel | Sedang | Kedalaman vertikal (riwayat kendaraan, pengingat servis, sparepart), kedekatan lokal |
| Program pemerintah (KDKMP) memilih vendor BUMN | Tinggi | Jangan bergantung; posisikan sebagai pelengkap/integrasi; jual ke koperasi non-KDKMP juga |
| Kebocoran data antar-tenant | Rendah tapi fatal | RLS di setiap tabel, tes otomatis lintas tenant, audit berkala |
| Founder kelelahan / terlalu banyak vertikal | Sedang | Gerbang per fase — tidak buka vertikal baru sebelum gerbang lulus |

---

## 12. Sumber

- UMKM go digital 25,5 juta, 64,2 juta UMKM, 61,07% PDB — [ANTARA](https://www.antaranews.com/berita/4397157/kemenkop-ukm-255-juta-umkm-telah-go-digital)
- Penetrasi internet 80,66% & per wilayah — [Selular.ID](https://selular.id/2025/08/penetrasi-internet-indonesia-capai-8066-di-2025/), [Dataloka](https://dataloka.id/humaniora/4421/potret-terbaru-penetrasi-internet-di-indonesia-2025-pulau-jawa-tertinggi-maluku-papua-terendah/), [APJII](https://survei.apjii.or.id/)
- QRIS pengguna & merchant 2025 — [CNBC Indonesia](https://www.cnbcindonesia.com/market/20250917175118-17-667904/bi-jumlah-pengguna-qris-tembus-576-juta), [GoodStats](https://goodstats.id/article/qris-tumbuh-pesat-sepanjang-2025-digunakan-lebih-dari-59-juta-orang-L9I0G), [Kontan](https://nasional.kontan.co.id/news/bi-catat-transaksi-qris-capai-rp-579-triliun-pada-semester-i-2025)
- Kendaraan bermotor 168,3 juta — [CNA.id](https://www.cna.id/indonesia/kendaraan-bermotor-indonesia-tembus-168-jutaan-paling-banyak-di-mana-31031)
- ±400.000 bengkel, 95% UMKM; 30–40 ribu di Jabodetabek — [InfoPublik](https://infopublik.id/kategori/nasional-ekonomi-bisnis/714236/jumlah-kendaraan-terus-meningkat-bisnis-perbengkelan-kian-optimistis), [Kompas Otomotif](https://otomotif.kompas.com/read/2024/04/25/072200415/populasi-bengkel-motor-dan-mobil-jakarta-diklaim-tembus-40.000-titik)
- Koperasi Desa Merah Putih: target & anggaran digitalisasi — [Tempo](https://www.tempo.co/ekonomi/kebutuhan-digitalisasi-koperasi-desa-merah-putih-rp-480-miliar-2067671), [InfoKoperasi](https://www.infokoperasi.com/article/sebanyak-60-ribu-koperasi-merah-putih-ditargetkan-aktif-beroperasi-pada-akhir-2026-2026-05-30-4dbe26), [Telkom Digi Koperasi](https://www.telkom.co.id/sites/berita/id_ID/news/telkom-hadirkan-digi-koperasi,-dukung-digitalisasi-ribuan-koperasi-desa-merah-putih-3149)
- Rekrutmen SDM KDKMP & KNMP — [Kemenko Pangan](https://www.kemenkopangan.go.id/detail-artikel/pemerintah-buka-rekrutmen-nasional-sdm-untuk-perkuat-koperasi-desa-kelurahan-merah-putih-dan-kampung-nelayan-merah-putih), [Periskop (1.269 KNMP)](https://periskop.id/nasional/20260708/kkp-1269-kampung-nelayan-merah-putih)
- SPPG MBG — [BGN (19.188 SPPG)](https://www.bgn.go.id/news/siaran-pers/awal-januari-2026-bgn-operasikan-19188-sppg), [BGN (±60 juta penerima)](https://www.bgn.go.id/news/siaran-pers/awal-2026-program-mbg-jangkau-hampir-60-juta-penerima-manfaat)
- Stunting SSGI 2024 — [Kemenkes](https://kemkes.go.id/id/ssgi-2024-prevalensi-stunting-nasional-turun-menjadi-198), [GoodStats](https://data.goodstats.id/statistic/10-provinsi-dengan-prevalensi-balita-stunting-tertinggi-2024-SHDxO)
- Nelayan & cold storage — [Kompas (Ternate)](https://regional.kompas.com/read/2025/01/08/204225478/jumlah-tangkapan-ikan-melimpah-nelayan-di-ternate-keluhkan-minimnya-cold), [Mongabay (Banda)](https://www.mongabay.co.id/2023/04/17/akibat-buruknya-pengelolaan-cold-storage-nelayan-pulau-banda-demo-kantor-dkp-maluku/), [Inovarian (Kupang)](https://inovarian.id/berita/koperasi-nelayan-di-ntt-sukses-terapkan-sistem-cold-chain-tenaga-surya-untuk-kurangi-susut-hasil-tangkap)
- Harga aplikasi kasir — [majoo.id/harga](https://majoo.id/harga), [Nusantek](https://www.nusantek.com/blog/moka-vs-majoo), [founderplus](https://founderplus.id/blog/aplikasi-kasir-pos-ukm-terbaik/)
- Biaya logistik 14,29% PDB & disparitas — [Kompas Money](https://money.kompas.com/read/2025/11/04/175121726/biaya-logistik-nasional-ditargetkan-turun-jadi-12-persen-pada-2029), [TrenAsia](https://www.trenasia.id/tantangan-biaya-logistik-perbedaan-harga-barang-antara-jawa-dan-papua)
- SNLIK 2025 — [OJK](https://ojk.go.id/id/berita-dan-kegiatan/siaran-pers/Pages/OJK-dan-BPS-Umumkan-Hasil-Survei-Nasional-Literasi-Dan-Inklusi-Keuangan-SNLIK-Tahun-2025.aspx)
- PPh Final UMKM & PP 20/2026 — [DJP](https://www.pajak.go.id/id/artikel/era-baru-pph-final-umkm-bentuk-nyata-insentif-tepat-sasaran), [Ortax](https://ortax.org/pemerintah-perpanjang-jangka-waktu-pph-umkm-orang-pribadi-sampai-2029), [DDTC](https://news.ddtc.co.id/berita/nasional/1811337/pph-final-umkm-05-disetor-per-masa-pajak-kode-billing-lewat-coretax)
- Pesantren 42.391 — [Dataloka](https://dataloka.id/humaniora/5007/jumlah-pondok-pesantren-di-indonesia-2025-capai-42-391-didominasi-jawa-barat/)
- BUMDes 65.941, 75,8% aktif — [ANTARA](https://www.antaranews.com/berita/4392098/bpkp-sebut-baru-758-persen-bumdes-di-indonesia-yang-aktif)
- Petani gurem (ST2023) — [Kompas](https://money.kompas.com/read/2023/12/04/180000726/sensus-pertanian-2023-jumlah-petani-gurem-naik-jadi-16-89-juta), [BPS](https://sensus.bps.go.id/topik/tabular/st2023/215/0/0)
- UU PDP — [pasal.id](https://pasal.id/peraturan/uu/uu-no-27-tahun-2022), [YAPLegal](https://yaplegal.id/blog/kapan-uu-pdp-mulai-berlaku-efektif)
- Jumlah desa/kabupaten 2025 — [Dataindonesia.id](https://dataindonesia.id/varia/detail/data-jumlah-desakelurahan-menurut-provinsi-di-indonesia-pada-2025)
