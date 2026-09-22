# Psikologi Funded Trader: Mengapa Lolos Challenge ≠ Bertahan di Funded Account

**Tinjauan literatur ilmiah + analisis kuantitatif**

Versi 1.0 · 22 September 2026

---

## Daftar Isi

1. [Ringkasan eksekutif](#1-ringkasan-eksekutif)
2. [Ruang lingkup, metode, dan kualitas bukti](#2-ruang-lingkup-metode-dan-kualitas-bukti)
3. [Base rate: apa yang sebenarnya terjadi](#3-base-rate-apa-yang-sebenarnya-terjadi)
4. [Lapis 1 — Masalah statistik: seleksi yang tidak menyeleksi skill](#4-lapis-1--masalah-statistik-seleksi-yang-tidak-menyeleksi-skill)
5. [Lapis 2 — Pergeseran titik acuan (reference point shift)](#5-lapis-2--pergeseran-titik-acuan-reference-point-shift)
6. [Lapis 3 — Struktur insentif: dari opsi call ke opsi barrier](#6-lapis-3--struktur-insentif-dari-opsi-call-ke-opsi-barrier)
7. [Lapis 4 — Stres, endokrinologi, dan perubahan preferensi risiko](#7-lapis-4--stres-endokrinologi-dan-perubahan-preferensi-risiko)
8. [Lapis 5 — Tekanan performa dan *choking*](#8-lapis-5--tekanan-performa-dan-choking)
9. [Lapis 6 — Overconfidence yang diproduksi oleh kelulusan itu sendiri](#9-lapis-6--overconfidence-yang-diproduksi-oleh-kelulusan-itu-sendiri)
10. [Lapis 7 — Emosi dan regulasi emosi sebagai penanda keahlian](#10-lapis-7--emosi-dan-regulasi-emosi-sebagai-penanda-keahlian)
11. [Lapis 8 — Dimensi adiktif: near-miss, reinforcement, eskalasi komitmen](#11-lapis-8--dimensi-adiktif-near-miss-reinforcement-eskalasi-komitmen)
12. [Sintesis: model kaskade "Pass-to-Fail" 6 tahap](#12-sintesis-model-kaskade-pass-to-fail-6-tahap)
13. [Operasionalisasi: apa yang bisa diukur](#13-operasionalisasi-apa-yang-bisa-diukur)
14. [Intervensi berbasis bukti, diurutkan menurut kekuatan bukti](#14-intervensi-berbasis-bukti-diurutkan-menurut-kekuatan-bukti)
15. [Protokol transisi 30 hari: challenge → funded](#15-protokol-transisi-30-hari-challenge--funded)
16. [Batasan riset ini dan agenda riset ke depan](#16-batasan-riset-ini-dan-agenda-riset-ke-depan)
17. [Lampiran A — Daftar pustaka](#lampiran-a--daftar-pustaka)
18. [Lampiran B — Turunan matematis dan kode](#lampiran-b--turunan-matematis-dan-kode)
19. [Lampiran C — Rubrik tingkat bukti](#lampiran-c--rubrik-tingkat-bukti)

---

## 1. Ringkasan eksekutif

Pertanyaannya — *"kenapa trader bisa lolos fase 1 dan 2 tapi hancur di funded account?"* — hampir selalu dijawab industri dengan satu kata: **psikologi**. Jawaban itu benar sebagian, tapi ia menyembunyikan sesuatu yang lebih penting dan lebih bisa diperbaiki.

Sepuluh temuan utama dari tinjauan ini:

**1. Sebagian besar "kegagalan psikologis" sebenarnya adalah kegagalan statistik yang salah atribusi.** Dengan kalibrasi yang cocok dengan pass rate industri yang dilaporkan (~11–12% end-to-end), simulasi Monte Carlo dalam dokumen ini menunjukkan bahwa **±59% penghuni kolam funded adalah trader ber-edge nol** yang lolos karena keberuntungan (§4.4). Mereka gagal di funded bukan karena mental runtuh, tapi karena memang tidak pernah punya edge. Menyebut ini "masalah psikologi" adalah kesalahan diagnosis yang mahal.

**2. Struktur challenge secara matematis menyeleksi justru sifat yang membunuh funded account.** Menggandakan volatilitas (dari 20% ke 40% tahunan) menaikkan peluang lolos dua fase dari 18,2% ke 35,9% bagi trader ber-Sharpe 1,0 — **tapi menaikkan peluang akhirnya kena max drawdown dari 36,8% ke 60,7%** (§4.3, §4.5). Challenge memberi hadiah pada agresi; funded account menghukumnya. Ini bukan kelemahan trader, ini cacat desain seleksi.

**3. Asimetri barrier adalah inti persoalannya.** Challenge adalah permainan **dua barrier** (target di atas, drawdown di bawah) — ada garis finish. Funded account adalah permainan **satu barrier menyerap** — tidak ada garis finish, hanya lantai yang kalau disentuh permainan berakhir permanen. Untuk gerak Brown berdrift, peluang *akhirnya* menyentuh lantai adalah `exp(−2·S·b/σ)`, di mana S = Sharpe, b = jarak drawdown, σ = volatilitas. Trader Sharpe 1,0 dengan vol 20% dan DD 10% punya **peluang 36,8% untuk akhirnya blow-up** — bukan karena dia buruk, tapi karena permainannya memang begitu (§4.3).

**4. Titik acuan psikologis bergeser tepat pada saat pendanaan diberikan.** Selama challenge, referensi adalah biaya challenge — kecil, sudah *sunk*, dan secara psikologis sudah "hilang". Setelah didanai, referensi menjadi saldo akun plus ekspektasi payout. Karena tujuan mewarisi properti fungsi nilai prospect theory — loss aversion dan diminishing sensitivity (Heath, Larrick & Wu, 1999, *Cognitive Psychology*) — setiap drawdown kecil kini didaftarkan sebagai **kerugian di domain rugi**, wilayah di mana manusia menjadi *pencari risiko*. Orang yang sama, preferensi risiko yang berbeda.

**5. Stres tidak hanya "mengganggu" keputusan — ia mengubah preferensi risiko secara terukur.** Kandasamy dkk. (2014, *PNAS* 111(9):3608–3613) memberikan hidrokortison selama 8 hari untuk mereplikasi level kortisol trader nyata, dan menemukan pergeseran substansial ke arah risk aversion dan distorsi bobot probabilitas kecil. Coates & Herbert (2008, *PNAS* 105(16):6167–6172) menunjukkan kortisol trader naik seiring *variance* hasil trading, bukan sekadar arah pasar. Artinya: funded account yang lebih menegangkan menciptakan trader dengan **fungsi utilitas yang berbeda** dari trader yang lolos challenge.

**6. Kelulusan itu sendiri memproduksi overconfidence.** Gervais & Odean (2001, *RFS* 14(1):1–27) memodelkan secara formal bagaimana trader yang belajar tentang kemampuannya sendiri mengambil terlalu banyak kredit atas keberhasilan (*self-attribution bias*), sehingga **overconfidence memuncak justru di awal karier setelah rangkaian sukses**. Lolos dua fase adalah persis peristiwa sukses yang memicu ini. Konsekuensi operasionalnya konkret: ukuran posisi naik tepat ketika seharusnya turun. Naik 1,5× saja menaikkan peluang ruin dari 36,8% ke 51,3% (§4.6).

**7. Trading adalah lingkungan belajar validitas rendah, sehingga pengalaman tidak otomatis menjadi keahlian.** Kahneman & Klein (2009, *American Psychologist* 64(6):515–526) menetapkan syarat intuisi terampil: lingkungan yang cukup teratur dan umpan balik yang cepat serta tidak ambigu. Trading gagal di kedua syarat. Seru, Shumway & Stoffman (2010, *RFS* 23(2):705–739) menemukan bahwa sebagian besar "pembelajaran" yang tampak di data investor sebenarnya adalah **atrisi** — yang buruk berhenti — bukan perbaikan individual. Confidence tetap naik walau akurasi tidak.

**8. Pembelian challenge berulang punya tanda tangan neurobiologis perjudian.** Clark dkk. (2009, *Neuron* 61(3):481–490) menunjukkan *near-miss* — gagal tipis — merekrut sirkuit striatal yang sama dengan kemenangan nyata dan **menaikkan keinginan bermain**, khususnya saat subjek merasa punya kendali personal. Gagal challenge di 7,8% dari target 8% adalah near-miss sempurna. Grall-Bronnec dkk. (2017, *Addictive Behaviors* 64:340–348) menunjukkan kriteria diagnostik gangguan judi dapat diterapkan pada trading berlebihan.

**9. Beberapa "solusi psikologi trading" yang populer tidak didukung bukti.** Kerangka *willpower / ego depletion* runtuh dalam replikasi multi-lab (Hagger dkk., 2016, N=2.141, d=0,04; Vohs dkk., 2021, 36 lab, null). Mindfulness bukan obat universal — satu eksperimen terkontrol menemukan peserta terlatih mindfulness justru **underperform hingga −35,4%** di lingkungan ketidakpastian rendah dengan beban informasi tinggi, kemungkinan karena respons terhadap berita negatif tertunda. Membangun sistem di atas fondasi yang gagal replikasi adalah pemborosan.

**10. Intervensi dengan bukti terkuat bersifat struktural, bukan motivasional.** Heimer & Imas (2022, *RFS* 35(4):1643–1681) menemukan **pembatasan leverage regulatoris menurunkan kerugian trader high-leverage sebesar 40%** dan mengurangi disposition effect — karena batas keras menaikkan biaya oportunitas menunda realisasi kerugian. *Implementation intentions* (rencana "jika-maka") punya meta-analisis 94 studi dengan d = 0,65 (Gollwitzer & Sheeran, 2006). Keduanya bekerja dengan **menghapus keputusan dari momen panas**, bukan dengan meminta trader "lebih disiplin".

> **Implikasi tunggal terpenting:** sebelum mendiagnosis masalah psikologi, tetapkan dulu apakah trader punya edge yang dapat dibedakan dari nol. Dengan Sharpe tahunan 1,0, *Minimum Track Record Length* (Bailey & López de Prado) menuntut ±708 hari trading — sekitar **34 bulan** — sebelum Sharpe dapat dinyatakan positif secara statistik pada tingkat kepercayaan 95% (§4.6). Challenge 30 hari memberikan sekitar **4% dari bukti yang dibutuhkan**.

---

## 2. Ruang lingkup, metode, dan kualitas bukti

### 2.1 Pertanyaan riset

> Mekanisme apa yang menjelaskan mengapa trader yang lulus evaluasi prop firm dua fase kemudian gagal mempertahankan akun funded — dan sejauh mana mekanisme itu psikologis, statistik, atau struktural?

### 2.2 Masalah metodologis yang harus dinyatakan di depan

**Tidak ada satu pun studi peer-review yang secara langsung meneliti populasi funded trader prop firm ritel.** Ini bukan kelalaian tinjauan ini; ini keadaan lapangan per September 2026. Penyebabnya jelas: data akun dipegang perusahaan swasta yang punya konflik kepentingan langsung untuk tidak merilisnya, tidak ada registri publik, dan populasinya baru berumur ±6 tahun dalam bentuk sekarang.

Konsekuensinya, dokumen ini **tidak dapat** menyajikan bukti kausal langsung. Yang dapat dilakukan adalah merakit bukti dari lima lapis literatur yang masing-masing menyentuh bagian dari mekanisme, lalu menguji apakah rakitan itu konsisten secara kuantitatif dengan base rate yang dilaporkan industri:

| Lapis | Populasi | Kedekatan ke funded trader | Kualitas bukti |
|---|---|---|---|
| Behavioral finance trader profesional | Trader lantai CBOT, trader bank investasi, day trader | **Tinggi** — sama-sama profesional, batas risiko, tekanan P&L harian | A–B |
| Behavioral finance investor ritel | Investor ritel Taiwan, Finlandia, AS, forex ritel | Sedang — bias sama, insentif berbeda | A |
| Psikologi eksperimental | Mahasiswa, subjek lab | Sedang — mekanisme bersih, validitas ekologis rendah | A–C |
| Neuroendokrinologi & stres | Trader nyata + RCT farmakologis | **Tinggi** untuk mekanisme, kecil untuk N | B |
| Statistik seleksi & manajemen investasi | Manajer reksa dana, hedge fund, backtest | **Tinggi** — struktur insentif hampir identik | A |

### 2.3 Rubrik tingkat bukti

Setiap klaim substantif dalam dokumen ini ditandai:

- **[A]** — Replikasi multi-lab, meta-analisis, atau studi lapangan besar (N > 10.000) di jurnal peer-review tingkat atas.
- **[B]** — Studi lapangan tunggal besar atau eksperimen terkontrol yang direplikasi, peer-review.
- **[C]** — Studi lab tunggal, N kecil, atau *working paper* yang belum peer-review.
- **[D]** — Data industri yang dilaporkan sendiri, tanpa audit independen, sering dari pihak dengan konflik kepentingan komersial.
- **[M]** — Turunan matematis / simulasi dalam dokumen ini; valid sejauh asumsinya, bukan temuan empiris.

### 2.4 Catatan kejujuran tentang sitasi

Detail bibliografis (volume, nomor terbitan, halaman) untuk sekitar 30 rujukan diverifikasi langsung melalui pencarian literatur saat penyusunan dokumen ini dan ditandai **✔** di Lampiran A. Sisanya berasal dari pengetahuan umum bidang dan **belum diverifikasi baris per baris** — ditandai **○**. Sebelum dokumen ini dipakai dalam konteks akademis formal, rujukan bertanda ○ harus dicek ulang terhadap sumber asli. Klaim substantifnya diyakini akurat; yang mungkin meleset adalah nomor halaman.

### 2.5 Yang sengaja tidak dimasukkan

- Literatur "psikologi trading" populer yang tidak peer-review (buku praktisi, kursus, konten media sosial), kecuali disebut eksplisit sebagai kontras.
- Klaim tentang perusahaan prop tertentu di luar yang terdokumentasi dalam tindakan regulator publik.
- Metode analisis teknikal atau klaim tentang edge strategi tertentu — dokumen ini tentang perilaku dan seleksi, bukan tentang strategi.

---

## 3. Base rate: apa yang sebenarnya terjadi

### 3.1 Angka yang dilaporkan industri **[D]**

Angka-angka berikut berasal dari agregator industri dan pengungkapan perusahaan. **Semuanya harus diperlakukan dengan skeptisisme tinggi**: tidak diaudit, definisinya tidak terstandardisasi, dan hampir semua penerbitnya punya kepentingan komersial dalam angka tersebut.

| Metrik | Angka yang dilaporkan | Catatan |
|---|---|---|
| Pass rate challenge (per percobaan, gabungan) | ~5–15%; satu agregator melaporkan **12,3%** untuk jendela 2025–2026 | Bervariasi tajam menurut aturan dan kelas aset |
| Pass rate dari satu analisis 300.000+ akun | ~14% | Sumber tunggal, metodologi tidak dipublikasikan |
| Trader funded yang menerima **minimal satu** payout | **~45%** | Artinya 55% funded trader tidak pernah dibayar sekali pun |
| Konversi end-to-end (beli challenge → payout) | **~7%** | 12% × 45% ≈ 5,4%; ~7% konsisten secara kasar |
| Funded trader yang jadi "dibayar konsisten, jangka panjang" | **1–3%** dari seluruh pembeli | Estimasi, definisi kabur |
| Kegagalan challenge karena **pelanggaran drawdown** (bukan gagal capai target) | **60–70%**; ~71% kegagalan fase 1 dari daily drawdown | Ini penting — lihat §3.2 |

### 3.2 Satu angka yang paling informatif

Dari seluruh tabel di atas, angka yang paling banyak memberi informasi adalah: **60–70% kegagalan berasal dari pelanggaran batas drawdown, bukan dari kehabisan waktu tanpa mencapai target.**

Kegagalan karena kehabisan waktu adalah kegagalan *edge* — strategi tidak cukup menghasilkan. Kegagalan karena pelanggaran drawdown adalah kegagalan *ukuran posisi dan timing eksposur* — trader mengambil risiko terlalu besar relatif terhadap batas yang mengikat. Dominasi jenis kedua mengarahkan perhatian ke **manajemen risiko dan perilaku di sekitar batas**, bukan ke kualitas sinyal.

Ini juga konsisten dengan temuan Coval & Shumway (2005) pada trader lantai CBOT (§6.4) dan dengan mekanisme *gambling for resurrection* (§6.3).

### 3.3 Kesenjangan model–realitas yang mengungkap "pajak perilaku" **[M]**

Ada satu inferensi yang bisa ditarik dengan membandingkan base rate industri terhadap model matematis murni.

Model dua-barrier sederhana (§4.3) memprediksi bahwa bahkan trader dengan **edge nol persis** yang masuk funded account dengan payout threshold +5% dan max drawdown −10% akan menerima setidaknya satu payout dengan probabilitas:

```
P(sentuh +5% sebelum −10%) = 10 / (5 + 10) = 66,7%
```

Angka industri yang dilaporkan adalah **~45%**.

Sebagian selisih ini dijelaskan oleh friksi struktural yang tidak ada di model: persyaratan jumlah hari trading minimum, periode tunggu payout, aturan konsistensi, biaya transaksi, dan trader yang berhenti sukarela. Tapi selisih 21 poin persentase terlalu besar untuk dijelaskan friksi saja.

Sisanya adalah kandidat kuat untuk **pajak perilaku**: derajat di mana trader nyata gagal mempertahankan volatilitas dan edge yang konstan — persis yang diprediksi oleh mekanisme di §5–§11. Model mengasumsikan trader yang sama terus bermain permainan yang sama. Manusia tidak begitu. Mereka menaikkan ukuran setelah menang (§9), menggandakan setelah kalah (§6.4), dan melebarkan stop saat tertekan (§5.7).

> **Catatan metodologis:** inferensi ini bersifat sugestif, bukan konklusif. Ia bergantung pada akurasi angka industri **[D]** yang tidak diaudit. Ia disajikan sebagai hipotesis yang dapat diuji, bukan sebagai temuan.

### 3.4 Konflik kepentingan struktural yang harus dinyatakan

Tidak mungkin menganalisis psikologi funded trader tanpa menyatakan fakta ini: pada banyak model bisnis prop ritel, **pendapatan utama berasal dari biaya evaluasi, bukan dari bagi hasil trading**. Ketika demikian, perusahaan dan trader tidak sepenuhnya sejalan kepentingannya.

Contoh terdokumentasi: pada Agustus 2023 CFTC mengajukan tindakan penegakan terhadap Traders Global Group Inc. (beroperasi sebagai "My Forex Funds"), dengan tuduhan antara lain bahwa sebagian besar akun "funded" sebenarnya tersimulasi dan bahwa eksekusi sisi server dimanipulasi agar trader gagal evaluasi. **Kasus itu kemudian dibubarkan dengan prasangka pada Mei 2025**, dengan sanksi Rule 11 lebih dari US$3 juta dijatuhkan kepada CFTC setelah pengadilan menemukan agensi tersebut memberi pernyataan keliru kepada pengadilan.

Dua hal yang benar sekaligus, dan keduanya harus dinyatakan:
1. **Tuduhan itu tidak terbukti di pengadilan** dan kasusnya gagal karena kesalahan penggugat. Tidak ada temuan pengadilan bahwa perusahaan tersebut melakukan apa yang dituduhkan.
2. **Struktur insentif yang menjadi perhatian tetap ada** di seluruh industri, terlepas dari hasil kasus itu. Setelah tindakan tersebut, banyak perusahaan mengubah bahasa situs mereka untuk mengklarifikasi bahwa aktivitasnya "tersimulasi".

Relevansi psikologisnya langsung: **atribusi kausal trader terhadap kegagalannya sendiri menjadi tidak dapat diandalkan** ketika lingkungan itu sendiri sebagian buram. Trader yang tidak tahu apakah eksekusinya adil tidak dapat belajar dari umpan balik — yang mengembalikan kita ke syarat Kahneman & Klein (§9.3): pembelajaran memerlukan umpan balik yang tidak ambigu. Ketidakjelasan struktural ini adalah hambatan belajar yang nyata, bukan kecurigaan paranoid.

---

## 4. Lapis 1 — Masalah statistik: seleksi yang tidak menyeleksi skill

Ini adalah bagian yang paling sering dilewati dalam pembahasan "psikologi trader", dan ia harus datang pertama — karena kalau bagian ini tidak diselesaikan, setiap intervensi psikologis berikutnya diterapkan pada populasi yang salah.

### 4.1 Challenge adalah opsi call, funded account adalah posisi short vol

Struktur payoff kedua fase berbeda secara fundamental.

**Selama challenge**, trader memegang sesuatu yang secara struktural mirip **opsi call**:
- Kerugian maksimum = biaya challenge (misalnya US$500), tetap dan terbatas.
- Keuntungan = akses ke akun berukuran US$100.000 dengan bagi hasil 80–90%.
- Rasio payoff sering melebihi 100:1.

Untuk payoff seperti ini, **variance adalah teman**. Nilai opsi naik seiring volatilitas aset dasarnya. Strategi optimal untuk memaksimalkan probabilitas lolos, dengan biaya tetap dan terbatas, adalah mengambil risiko lebih besar dari yang optimal untuk pertumbuhan jangka panjang.

**Setelah didanai**, struktur payoff berbalik:
- Keuntungan = aliran payout, terpotong bagi hasil, dan pada praktiknya dibatasi oleh aturan konsistensi dan ukuran akun.
- Kerugian = kehilangan aset yang dibayar mahal, ditambah biaya seluruh challenge yang sudah dibeli, ditambah biaya identitas dan waktu.
- Trader kini efektif **short volatility**: setiap lonjakan varians mengancam barrier.

> Trader yang sama, dalam satu bulan, berpindah dari memegang opsi long-vol ke memegang posisi short-vol — **tanpa ada yang memberitahunya bahwa permainannya telah berubah**. Perilaku yang optimal di fase pertama adalah perilaku yang merusak di fase kedua.

### 4.2 Matematika dua barrier vs satu barrier **[M]**

Modelkan ekuitas trader sebagai gerak Brown berdrift: `dX = μ dt + σ dW`, dimulai dari 0.

**Challenge** — dua barrier, target `+a` dan drawdown `−b`:

```
P(sentuh target sebelum drawdown) = (1 − e^(θb)) / (e^(−θa) − e^(θb)),   θ = 2μ/σ²
```

**Funded account** — satu barrier menyerap di `−b`, tanpa garis finish di atas:

```
P(akhirnya sentuh −b) = e^(−2μb/σ²) = e^(−2·S·b/σ)
```

di mana `S = μ/σ` adalah Sharpe ratio tahunan.

Bentuk kedua ini layak direnungkan. Ia hanya bergantung pada **tiga** hal: Sharpe, jarak ke drawdown, dan volatilitas. Ia tidak bergantung pada waktu — kalau trader terus bermain selamanya, itulah peluang akhirnya kena lantai. Dan ia **tidak pernah nol** untuk Sharpe berhingga.

### 4.3 Tabel survival: berapa peluang trader bagus tetap blow-up? **[M]**

Peluang **akhirnya** kena max drawdown 10% di funded account:

| Sharpe tahunan | vol 10% | vol 20% | vol 40% | vol 60% |
|---:|---:|---:|---:|---:|
| 0,0 | 100,0% | 100,0% | 100,0% | 100,0% |
| 0,5 | 36,8% | 60,7% | 77,9% | 84,6% |
| 1,0 | 13,5% | **36,8%** | 60,7% | 71,7% |
| 1,5 | 5,0% | 22,3% | 47,2% | 60,7% |
| 2,0 | 1,8% | 13,5% | 36,8% | 51,3% |
| 3,0 | 0,2% | 5,0% | 22,3% | 36,8% |

Baca baris Sharpe 1,0. Sharpe tahunan 1,0 **adalah trader yang benar-benar bagus** — itu kira-kira setara hedge fund yang baik. Trader itu tetap punya **peluang 36,8% untuk akhirnya blow-up** pada volatilitas 20%, dan 60,7% pada volatilitas 40%.

Baris Sharpe 0,0 adalah yang paling penting: **peluangnya 100%**. Trader tanpa edge pasti akhirnya kena lantai. Bukan mungkin — pasti. Satu-satunya pertanyaan adalah kapan.

> **Implikasi untuk interpretasi kegagalan:** ketika seorang funded trader blow-up, itu **bukan bukti** bahwa ia mengalami keruntuhan psikologis. Untuk populasi trader Sharpe 1,0 yang bertrading secara sempurna disiplin tanpa satu pun kesalahan emosional, sekitar **sepertiga akan tetap blow-up**. Mengatribusikan setiap kegagalan ke psikologi adalah *hindsight bias* dalam bentuk paling murni.

### 4.4 Komposisi kolam funded: simulasi Monte Carlo **[M]**

Model dua-barrier di atas mengabaikan tiga fitur penting challenge nyata: batas *daily* drawdown, batas waktu, dan fakta bahwa profit target dicapai lewat serangkaian trade diskret. Simulasi berikut memasukkan semuanya.

**Parameter:** target fase 1 = +8%, target fase 2 = +5%, max drawdown = 10%, daily drawdown = 5%, 30 hari trading per fase, 3 trade per hari, 25.000 simulasi per sel.

Hasil satu fase:

| Sharpe | vol | LOLOS | gagal dailyDD | gagal maxDD | habis waktu |
|---:|---:|---:|---:|---:|---:|
| 0,0 | 20% | 22,3% | 0,1% | 12,8% | 64,8% |
| 0,0 | 40% | **44,6%** | 25,5% | 24,0% | 5,9% |
| 1,0 | 20% | 33,1% | 0,1% | 7,6% | 59,2% |
| 1,0 | 40% | 53,8% | 22,7% | 18,0% | 5,5% |
| 2,0 | 20% | 45,2% | 0,1% | 3,8% | 50,9% |
| 2,0 | 40% | 64,0% | 19,0% | 12,4% | 4,6% |

Perhatikan baris pertama dan kedua. **Trader ber-edge nol yang menggandakan volatilitasnya menggandakan peluang lolosnya**, dari 22,3% ke 44,6%. Sebabnya: pada volatilitas rendah, moda kegagalan dominan adalah *kehabisan waktu* (64,8%) — bukan blow-up. Batas waktu 30 hari menghukum kehati-hatian jauh lebih keras daripada batas drawdown menghukum agresi.

Sekarang jalankan dua fase berurutan pada populasi pelamar campuran — 70% ber-Sharpe 0,0, 20% ber-Sharpe 0,5, 8% ber-Sharpe 1,0, 2% ber-Sharpe 2,0:

**Volatilitas 20% → pass rate gabungan end-to-end = 11,4%** *(cocok dengan ~12% yang dilaporkan industri)*

| Kelompok | % dari pelamar | Peluang lolos 2 fase | **% dari kolam funded** |
|---|---:|---:|---:|
| Sharpe 0,0 (tanpa edge) | 70% | 9,6% | **58,6%** |
| Sharpe 0,5 (marginal) | 20% | 13,3% | 23,3% |
| Sharpe 1,0 (bagus) | 8% | 18,2% | 12,8% |
| Sharpe 2,0 (sangat bagus) | 2% | 30,2% | **5,3%** |

**Volatilitas 40% → pass rate gabungan = 28,2%**

| Kelompok | % dari pelamar | Peluang lolos 2 fase | % dari kolam funded |
|---|---:|---:|---:|
| Sharpe 0,0 | 70% | 26,0% | **64,5%** |
| Sharpe 0,5 | 20% | 30,9% | 22,0% |
| Sharpe 1,0 | 8% | 35,9% | 10,2% |
| Sharpe 2,0 | 2% | 47,3% | 3,4% |

Inilah temuan kuantitatif sentral dokumen ini:

> Pada kalibrasi yang **cocok dengan pass rate yang dilaporkan industri**, hampir **59% penghuni kolam funded tidak punya edge sama sekali**, dan hanya **5,3%** yang benar-benar sangat bagus. Proses evaluasi dua fase hanya menaikkan proporsi trader ber-Sharpe ≥1,0 dari 10% populasi pelamar menjadi 18,1% kolam funded — **peningkatan kurang dari dua kali lipat**, untuk proses yang dipasarkan sebagai penyaring elite.
>
> Dan ketika volatilitas kelompok naik, penyaringan menjadi **lebih buruk**, bukan lebih baik: proporsi ber-edge nol naik ke 64,5%. Menambah agresi di kolam pelamar mengencerkan sinyal skill.

### 4.5 Inversi seleksi, dinyatakan langsung **[M]**

Gabungkan kedua tabel. Untuk trader ber-Sharpe 1,0 yang hanya mengubah agresivitas ukuran posisi:

| Volatilitas | Peluang lolos 2 fase | Peluang ruin di funded | E[jumlah payout sebelum ruin] |
|---:|---:|---:|---:|
| 10% | — | 13,5% | 10,11 |
| 20% | 18,2% | 36,8% | 4,37 |
| 30% | — | 51,3% | 3,34 |
| 40% | **35,9%** | **60,7%** | 2,93 |
| 60% | — | 71,7% | 2,58 |

Arah kedua kolom berlawanan. **Persis pengaturan yang memaksimalkan peluang lolos adalah pengaturan yang memaksimalkan peluang hancur setelah lolos.**

Seorang trader yang secara rasional mengoptimalkan untuk lolos challenge — dan mengingat biayanya terbatas dan hadiahnya besar, itu *adalah* rasional — sedang melatih dirinya, mengkalibrasi ukuran posisinya, dan membentuk kebiasaannya pada rezim risiko yang akan membunuhnya dalam tiga bulan. Ia tidak "berubah menjadi buruk setelah didanai". Ia **berhasil di permainan yang salah**.

Ini juga menjelaskan pengamatan klinis yang sering dilaporkan praktisi: trader yang lolos challenge di percobaan pertama dengan risiko besar cenderung gagal lebih cepat di funded daripada yang lolos di percobaan ketiga dengan risiko kecil. Yang pertama punya bukti skill lebih lemah **dan** kebiasaan risiko lebih berbahaya.

### 4.6 Berapa lama sampai edge dapat dibuktikan? **[A/M]**

Bailey & López de Prado memperkenalkan *Minimum Track Record Length* (MinTRL): jumlah observasi minimum sebelum Sharpe yang teramati dapat dinyatakan lebih besar dari ambang acuan pada tingkat kepercayaan tertentu, dengan koreksi untuk skewness dan kurtosis — keduanya buruk pada return trading ritel.

```
MinTRL = 1 + [1 − γ₃·ŜR + (γ₄−1)/4 · ŜR²] · (Z_α / (ŜR − SR*))²
```

Dengan `SR* = 0`, kepercayaan 95%, skewness −0,5, kurtosis 6,0 (asumsi realistis untuk return trading berleverage), 252 hari per tahun:

| Sharpe tahunan sejati | Hari trading dibutuhkan | ≈ bulan kalender |
|---:|---:|---:|
| 0,5 | 2.775 | **132** (11 tahun) |
| 1,0 | 708 | **34** (2,8 tahun) |
| 1,5 | 322 | 15 |
| 2,0 | 186 | 9 |
| 3,0 | 87 | 4 |

Challenge dua fase memberikan sekitar **60 hari trading**. Untuk trader ber-Sharpe sejati 1,0, itu adalah **8,5% dari bukti yang dibutuhkan** untuk membedakan dia dari nol pada kepercayaan 95%. Untuk Sharpe 0,5 — masih trader yang menguntungkan — itu **2,2%**.

Pernyataan ini tidak bisa dilunakkan: **challenge prop firm secara matematis tidak mampu membedakan skill dari keberuntungan untuk semua kecuali segelintir trader luar biasa.** Itu bukan kritik terhadap perusahaan; itu properti dari ukuran sampel.

### 4.7 Pengaruh percobaan berulang: masalah pengujian berganda **[A/M]**

Literatur *backtest overfitting* (Bailey, Borwein, López de Prado & Zhu) menetapkan bahwa ketika N strategi diuji, Sharpe terbaik yang teramati diharapkan tinggi **bahkan ketika semua strategi tidak punya edge**. Masalah yang sama berlaku pada trader yang mengulang challenge.

Trader ber-edge nol, dengan peluang lolos 12% per percobaan:

| Jumlah percobaan | Peluang minimal sekali lolos |
|---:|---:|
| 1 | 12,0% |
| 2 | 22,6% |
| 3 | 31,9% |
| 5 | 47,2% |
| 8 | 64,0% |
| 10 | **72,1%** |

Trader yang membeli sepuluh challenge dan akhirnya lolos satu punya peluang 72% untuk mencapai itu **tanpa edge apa pun**. Namun secara subjektif ia akan mengalami kelulusan itu sebagai bukti bahwa "akhirnya saya menemukan sistemnya" — validasi atas perubahan terakhir yang ia lakukan sebelum percobaan yang berhasil.

Ini adalah *self-attribution bias* (§9.1) yang diberi makan oleh *multiple testing*. Hasilnya adalah trader yang memasuki funded account dengan **keyakinan yang telah dinaikkan oleh proses yang tidak menghasilkan informasi apa pun**.

### 4.8 Bayes: apa yang sebenarnya diberitahukan kelulusan kepada kita **[M]**

| Prior punya edge | P(lolos\|edge) | P(lolos\|tanpa edge) | Posterior punya edge | % funded tanpa edge |
|---:|---:|---:|---:|---:|
| 2% | 60% | 12% | 9,3% | **90,7%** |
| 5% | 60% | 12% | 20,8% | **79,2%** |
| 10% | 60% | 12% | 35,7% | 64,3% |
| 20% | 60% | 12% | 55,6% | 44,4% |

Bahkan dengan prior yang murah hati (10% pelamar punya edge sejati) dan rasio likelihood 5:1 yang menguntungkan, **posterior hanya 35,7%**. Kelulusan adalah bukti — tetapi bukti yang lemah, karena base rate-nya begitu rendah.

### 4.9 Regresi ke mean, bukan keruntuhan mental

Konsekuensi langsung: performa funded account yang lebih buruk daripada performa challenge adalah **prediksi default**, bukan anomali.

Kahneman mendokumentasikan versi klasik pelajaran ini pada instruktur penerbangan Angkatan Udara Israel, yang yakin bahwa memuji pendaratan bagus membuat penerbangan berikutnya lebih buruk dan memarahi pendaratan buruk membuatnya lebih baik. Keduanya adalah regresi ke mean, salah atribusi ke intervensi.

Persis pola yang sama terjadi di sini. Challenge memilih trader berdasarkan performa periode pendek yang ekstrem. Performa periode berikutnya akan **regresi ke kemampuan sejati mereka**. Karena kemampuan sejati mayoritas kolam funded adalah nol (§4.4), regresinya mengarah ke bawah.

Trader mengalami ini sebagai kegagalan personal. Perusahaan mengatributkan ini ke psikologi trader. Keduanya melewatkan penyebab statistik.

> **Yang tidak dikatakan bagian ini:** bahwa psikologi tidak penting. Bagian §5–§11 menunjukkan mekanisme perilaku nyata, terukur, dan dapat diintervensi. Yang dikatakan bagian ini adalah bahwa **komponen statistik harus dikurangkan lebih dulu** sebelum sisanya dapat diatributkan ke psikologi — dan bahwa untuk mayoritas kolam funded, tidak banyak yang tersisa untuk diatributkan.

---

## 5. Lapis 2 — Pergeseran titik acuan (reference point shift)

Jika §4 menjelaskan mengapa mayoritas funded trader tidak punya edge, §5 menjelaskan mengapa **bahkan trader yang punya edge pun** berperilaku berbeda setelah didanai. Mekanisme intinya tunggal dan sangat terdokumentasi: **titik acuan berpindah pada saat pendanaan diberikan, dan bersamanya berpindah pula seluruh fungsi preferensi risiko.**

### 5.1 Fondasi: prospect theory **[A]**

Kahneman & Tversky (1979, *Econometrica* 47(2):263–291) dan bentuk kumulatifnya (Tversky & Kahneman, 1992, *Journal of Risk and Uncertainty* 5:297–323) menetapkan tiga properti fungsi nilai yang relevan langsung di sini:

1. **Ketergantungan pada acuan** — hasil dievaluasi sebagai keuntungan atau kerugian relatif terhadap titik acuan, bukan sebagai tingkat kekayaan absolut.
2. **Loss aversion** — kurva lebih curam di sisi rugi; rasio estimasi berkisar 1,5–2,5.
3. **Diminishing sensitivity** — kurva cekung di domain untung (menghasilkan *risk aversion*) dan **cembung di domain rugi (menghasilkan *risk seeking*)**.

Properti ketiga adalah kuncinya. Manusia yang merasa dirinya sedang rugi **secara sistematis mencari risiko**. Ini bukan kelemahan karakter; ini bentuk fungsi nilai, dan ia bertahan pada ahli di bawah taruhan besar (§8.4).

### 5.2 Tujuan mewarisi properti fungsi nilai **[A]**

Heath, Larrick & Wu (1999, *Cognitive Psychology* 38(1):79–109) menunjukkan bahwa **tujuan berfungsi sebagai titik acuan**, dan mewarisi seluruh struktur fungsi nilai prospect theory — bukan hanya lokasi acuannya, tapi juga loss aversion dan diminishing sensitivity di sekitarnya.

Implikasinya untuk struktur prop firm sangat langsung. Target profit +8% **bukan sekadar sasaran administratif** — ia menjadi titik acuan psikologis. Berada di +7,2% didaftarkan bukan sebagai "untung 7,2%" tetapi sebagai "**rugi 0,8%**" relatif terhadap tujuan. Dan kerugian yang dirasakan memicu pencarian risiko.

Ini menjelaskan pola yang sering dilaporkan: trader yang telah berjalan konservatif selama tiga minggu tiba-tiba menaikkan ukuran secara dramatis ketika berada tepat di bawah target. Secara normatif itu tidak masuk akal — ia sudah hampir sampai. Secara deskriptif itu adalah prediksi langsung dari Heath, Larrick & Wu.

Kivetz, Urminsky & Zheng (2006, *Journal of Marketing Research* 43(1):39–58) mendokumentasikan **efek gradien tujuan**: usaha mengakselerasi seiring kedekatan dengan tujuan. Digabungkan, kedua literatur ini memprediksi bahwa **zona paling berbahaya dalam challenge adalah 80–95% jalan menuju target** — bukan awal, bukan akhir.

### 5.3 Peta acuan: sebelum vs sesudah pendanaan

Inilah mekanisme sentral bagian ini, dinyatakan sebagai perbandingan.

| Dimensi | Selama challenge | Setelah didanai |
|---|---|---|
| **Titik acuan** | Biaya challenge (US$500, sudah *sunk*, sudah "hilang" secara mental) | Saldo akun + ekspektasi payout + status "funded trader" |
| **Domain psikologis dari drawdown kecil** | Netral / masih di atas acuan | **Domain rugi** |
| **Preferensi risiko yang dihasilkan** | Mendekati netral, cenderung mencari risiko (biaya tenggelam, upside besar) | Loss aversion + risk seeking saat di bawah acuan |
| **Apa yang bisa hilang** | Uang yang sudah dianggap habis | Aset yang diperoleh susah payah, identitas, seluruh biaya challenge terdahulu |
| **Struktur payoff** | Opsi call (long vol) | Short vol dengan barrier |
| **Horizon** | 30 hari, ada garis finish | Tidak terbatas, tidak ada garis finish |
| **Penonton** | Tidak ada / minimal | Perusahaan, komunitas, keluarga, diri sendiri |

Perhatikan bahwa **tidak satu pun dari perubahan ini berkaitan dengan kemampuan trading**. Semua berkaitan dengan bingkai. Namun literatur prospect theory memprediksi bahwa perubahan bingkai ini saja sudah cukup untuk menghasilkan perilaku pengambilan risiko yang berbeda secara kualitatif pada orang yang sama.

### 5.4 Efek endowment: akun menjadi "milik saya" **[A]**

Kahneman, Knetsch & Thaler (1990, *Journal of Political Economy* 98(6):1325–1348) mendemonstrasikan *endowment effect*: begitu seseorang memiliki sesuatu, ia menilainya jauh lebih tinggi daripada sebelum memilikinya, dan berpisah dengannya didaftarkan sebagai kerugian.

Akun funded adalah objek endowment yang nyaris sempurna. Ia:
- diperoleh melalui usaha dan biaya yang substansial,
- langka (hanya ~12% pelamar memilikinya),
- membawa status sosial dalam komunitas trading,
- dan bisa lenyap dalam satu hari.

Konsekuensinya adalah **loss aversion yang jauh lebih intens di sekitar akun itu sendiri**, terlepas dari jumlah uang yang terlibat. Trader tidak hanya melindungi ekuitas; ia melindungi identitas.

Ini memprediksi dua perilaku maladaptif yang spesifik dan berlawanan arah:
- **Pembekuan (*freezing*)** — tidak mengambil setup yang valid karena kerugian akan terasa terlalu buruk. Menyebabkan underperformance bertahap dan kehabisan waktu.
- **Pertahanan yang panik** — mengambil risiko besar untuk memulihkan drawdown dengan cepat, karena berada dalam drawdown terasa tak tertahankan. Menyebabkan blow-up mendadak.

Trader yang sama dapat menunjukkan keduanya dalam minggu yang sama, tergantung apakah ia berada di atas atau di bawah acuannya.

### 5.5 Efek uang rumah dan efek impas **[A]**

Thaler & Johnson (1990, *Management Science* 36(6):643–660) mendokumentasikan dua efek yang bekerja berlawanan dan keduanya relevan:

- **House money effect** — setelah keuntungan sebelumnya, orang menjadi **lebih** mencari risiko, karena keuntungan itu belum sepenuhnya diintegrasikan ke kekayaan yang dirasakan. "Ini uang perusahaan."
- **Break-even effect** — setelah kerugian sebelumnya, taruhan yang menawarkan kesempatan untuk **kembali impas menjadi sangat menarik**, bahkan ketika nilai harapannya buruk.

Funded account memicu keduanya secara berurutan dan berkala:

1. Payout pertama diterima → sisa profit di akun terasa seperti "uang perusahaan" → risiko naik (house money).
2. Risiko yang naik menghasilkan drawdown → trader sekarang di bawah acuan → taruhan impas menjadi menarik (break-even).
3. Taruhan impas diambil dengan ukuran yang dinaikkan → barrier tersentuh.

Ini adalah **siklus tertutup**, dan ia tidak memerlukan kelemahan karakter untuk berjalan. Ia hanya memerlukan dua efek yang terdokumentasi baik, dipicu oleh struktur akun itu sendiri.

### 5.6 Efek realisasi: mengapa aturan drawdown mengubah perilaku **[B]**

Imas (2016, *American Economic Review* 106(8):2086–2109) menyelesaikan kontradiksi lama dalam literatur — beberapa studi menemukan lebih banyak pengambilan risiko setelah rugi, yang lain menemukan lebih sedikit — dengan membedakan **kerugian yang direalisasi** dari **kerugian di atas kertas**:

- Setelah kerugian **direalisasi** (posisi ditutup, akun mental ditutup) → orang **menghindari** risiko.
- Setelah kerugian **di atas kertas** (posisi masih terbuka) → orang **mengambil lebih banyak** risiko.

Ini memiliki implikasi tajam dan agak berlawanan intuisi untuk desain prop firm.

Aturan *daily drawdown* memaksa realisasi. Trader yang menabrak batas harian telah menutup akun mental — dan menurut Imas, seharusnya menjadi **lebih** hati-hati esok harinya. Data industri yang menunjukkan 71% kegagalan fase 1 berasal dari pelanggaran daily drawdown **[D]** menunjukkan bahwa banyak trader tidak pernah sampai ke "esok hari" itu; mereka menabrak batas maksimum dalam sesi yang sama.

Yang lebih penting: mekanisme Imas menjelaskan mengapa **menggantung posisi rugi tanpa stop** adalah moda kegagalan yang dominan. Selama kerugian tetap di atas kertas, akun mental tetap terbuka, dan trader tetap dalam mode risk-seeking. Menutupnya memerlukan penerimaan kerugian — persis tindakan yang dihindari loss aversion. Barberis & Xiong (2009, *Journal of Finance*) memformalkan ini sebagai **realization utility**: utilitas melekat pada tindakan merealisasi, bukan pada perubahan kekayaan.

### 5.7 Disposition effect pada profesional, bukan hanya ritel **[A]**

Keberatan yang wajar: "itu semua bias investor ritel; funded trader adalah profesional."

Literatur tidak mendukung keberatan itu.

- Shefrin & Statman (1985) menamai *disposition effect*; Odean (1998, *Journal of Finance* 53(5):1775–1798) mengukurnya pada data broker diskon besar.
- **Locke & Mann (2005, *Journal of Financial Economics* 76(2):401–444)** menemukannya pada **trader lantai berjangka profesional** — orang-orang yang menggunakan kata "disiplin" secara teknis untuk merujuk strategi yang meminimalkan pengaruh perilaku ini. Mereka menemukan bahwa durasi trade yang tidak menguntungkan lebih panjang daripada trade yang menguntungkan, sepanjang hari.
- Weber & Camerer (1998) mereplikasi dalam lingkungan pasar eksperimental terkontrol.

Temuan Locke & Mann sangat berarti untuk pertanyaan kita: bahkan trader profesional penuh waktu, yang modalnya di pertaruhkan dan yang secara eksplisit mengenal bias ini, menunjukkannya secara terukur. Harapan bahwa funded trader ritel — dengan pengalaman jauh lebih sedikit dan tekanan jauh lebih besar — akan kebal adalah tidak berdasar.

### 5.8 Miopia dan frekuensi evaluasi **[A, dengan catatan replikasi]**

Benartzi & Thaler (1995, *QJE* 110(1):73–92) memperkenalkan *myopic loss aversion*: menggabungkan loss aversion dengan evaluasi yang terlalu sering menghasilkan penghindaran risiko yang berlebihan.

Gneezy & Potters (1997, *QJE* 112(2):631–645) mengujinya secara eksperimental: subjek yang menerima umpan balik setiap periode mengambil **lebih sedikit** risiko dan **memperoleh lebih sedikit** daripada yang menerima umpan balik setiap tiga periode. Thaler, Tversky, Kahneman & Schwartz (1997, *QJE* 112(2):647–661) mereplikasi; Gneezy, Kapteyn & Potters (2003, *Journal of Finance*) menunjukkan efeknya pada harga pasar eksperimental.

**Catatan kejujuran:** literatur ini tidak sepenuhnya bersih. Ada makalah yang mendokumentasikan kegagalan replikasi myopic loss aversion dan mengusulkan penyebabnya (*Judgment and Decision Making*). Efeknya kemungkinan nyata tetapi lebih bergantung konteks daripada yang disarankan sitasi populer. Intervensi yang diturunkan darinya (§14.1) harus diperlakukan sebagai kemungkinan bermanfaat, bukan terbukti.

Relevansinya tetap tinggi karena **funded account dirancang untuk memaksimalkan miopia**: dashboard real-time, batas kerugian harian yang mengharuskan pemantauan harian, dan perhitungan drawdown yang berjalan terus-menerus. Struktur itu membuat evaluasi berfrekuensi tinggi bukan pilihan, melainkan kewajiban.

### 5.9 Efek burung unta: sisi lain dari pemantauan **[B]**

Berlawanan arah, Karlsson, Loewenstein & Seppi (2009, *Journal of Risk and Uncertainty* 38(2):95–115) dan Sicherman, Loewenstein, Seppi & Utkus (2016, *RFS* 29(4):863–897) mendokumentasikan **efek burung unta**: orang secara selektif menghindari memeriksa portofolio mereka ketika pasar turun.

Pada funded trader, ini muncul sebagai pola yang dapat dikenali: memeriksa akun setiap beberapa menit ketika profit, lalu **berhenti memeriksa sama sekali** ketika dalam drawdown — persis ketika memeriksa paling penting untuk mengelola jarak ke barrier. Penghindaran ini juga memutus umpan balik yang diperlukan untuk belajar (§9.3).

---

## 6. Lapis 3 — Struktur insentif: dari opsi call ke opsi barrier

§5 membahas bagaimana bingkai internal trader bergeser. §6 membahas bagaimana insentif eksternal bergeser — dan literatur menunjukkan insentif turnamen menghasilkan pergeseran risiko yang terukur bahkan pada profesional institusional yang diawasi ketat.

### 6.1 Risk shifting dalam turnamen **[A]**

Brown, Harlow & Starks (1996, *Journal of Finance* 51(1):85–110) menganalisis 334 reksa dana berorientasi pertumbuhan, 1976–1991, dan menemukan bahwa **manajer yang kalah di pertengahan tahun menaikkan volatilitas dana pada paruh kedua** lebih besar daripada yang menang. Efeknya menguat seiring pertumbuhan industri dan kesadaran investor terhadap performa — yaitu, seiring insentif turnamen mengeras.

Chevalier & Ellison (1997, *JPE* 105(6):1167–1200) menemukan mekanisme yang sama lewat hubungan aliran dana–performa yang cembung. Lazear & Rosen (1981, *JPE* 89(5):841–864) menyediakan fondasi teoretis untuk turnamen peringkat. Genakos & Pagliero (2012, *JPE* 120(4):782–813) mereplikasi di domain yang sepenuhnya berbeda — angkat besi kompetitif — menemukan atlet yang berperingkat buruk di interim mengambil percobaan yang lebih berisiko.

Ini adalah temuan yang kokoh lintas domain: **ketika hadiah cembung terhadap performa dan kerugian dibatasi, agen yang tertinggal menaikkan varians.**

Funded trader dalam drawdown berada persis dalam posisi itu.

### 6.2 Konveksitas yang berbalik

Perbedaan penting antara funded trader dan manajer reksa dana adalah bahwa **konveksitasnya berbalik setelah pendanaan**.

| | Manajer reksa dana | Challenge trader | Funded trader |
|---|---|---|---|
| Downside | Kehilangan pekerjaan (buruk, tapi tidak absorbing) | Biaya challenge (terbatas, kecil) | **Kehilangan aset + semua biaya terdahulu + identitas** |
| Upside | Aliran dana, bonus | Akses ke akun besar | Payout, terpotong bagi hasil dan aturan konsistensi |
| Bentuk | Cembung | **Sangat cembung** | **Cekung dengan barrier menyerap** |

Trader yang belajar berperilaku optimal di kolom tengah membawa kebiasaan itu ke kolom kanan, di mana perilaku yang sama menghasilkan kehancuran. Tidak ada momen di mana sistem memberi tahu trader bahwa fungsi payoff-nya telah berbalik tanda.

### 6.3 Berjudi untuk kebangkitan (*gambling for resurrection*)

Ketika agen mendekati barrier yang menyerap dan tidak punya cara masuk akal untuk menjauh secara bertahap, **strategi yang memaksimalkan probabilitas bertahan adalah menaikkan varians** — meskipun itu menurunkan nilai harapan.

Logikanya identik dengan literatur perbankan tentang bank yang hampir insolven. Bagi trader yang tersisa 2% dari batas drawdown 10%, dengan aturan yang mengharuskan profit sebelum payout, trading konservatif menjamin kematian lambat; trading agresif menawarkan kemungkinan kecil untuk selamat. Secara lokal, itu rasional.

Berikut biaya kuantitatifnya **[M]**. Trader Sharpe 1,0, volatilitas dasar 20%, tersisa 6% ke batas drawdown:

| Ukuran posisi | Vol efektif | P(menyentuh sisa DD 6%) |
|---:|---:|---:|
| ×1 (normal) | 20% | 54,9% |
| ×2 | 40% | 74,1% |
| ×3 | 60% | 81,9% |
| ×5 | 100% | **88,7%** |

Menggandakan ukuran untuk "cepat pulih" menaikkan peluang kehancuran dari 54,9% ke 74,1%. Melipatgandakan lima kali menaikkannya ke 88,7%. Intuisi bahwa risiko lebih besar membeli peluang pemulihan **benar untuk hasil tunggal dan salah untuk kelangsungan hidup** — dan kesalahannya besar.

### 6.4 Bukti lapangan: trader CBOT setelah rugi pagi **[A]**

Bukti empiris terkuat untuk mekanisme ini pada trader nyata datang dari Coval & Shumway (2005, *Journal of Finance* 60(1):1–34), yang mempelajari trader proprietary di Chicago Board of Trade.

Temuan:
- Trader yang mengalami **kerugian pagi hari sekitar 16% lebih mungkin mengambil risiko di atas rata-rata pada sore hari** dibandingkan trader yang untung di pagi hari.
- Trader yang rugi pagi **melakukan lebih banyak trade, trade yang lebih besar, dan mengakumulasi lebih banyak inventory** di sore hari.
- Harga yang ditetapkan oleh trader yang rugi **berbalik jauh lebih cepat** daripada harga yang ditetapkan trader tak-bias — yaitu, trade mereka lebih buruk.

Ini bukan mahasiswa di lab. Ini trader profesional penuh waktu dengan modal sendiri di pertaruhan, dalam salah satu lingkungan trading paling kompetitif yang pernah ada. Efeknya tetap ada.

Liu dkk. serta Garvey, Murphy & Wu (○) mendokumentasikan pola serupa pada populasi trader lain. Ini adalah salah satu temuan paling dapat direplikasi dalam behavioral finance terapan.

### 6.5 Trailing drawdown: ratchet yang mengubah profit menjadi kewajiban

Banyak funded account menggunakan **trailing drawdown** — lantai yang naik mengikuti ekuitas puncak. Mekanisme ini layak dianalisis terpisah karena ia berinteraksi dengan prospect theory dengan cara yang sangat merusak.

Di bawah trailing drawdown:
- Setiap dolar profit **menaikkan lantai**, sehingga profit tidak menciptakan bantalan keamanan.
- Puncak ekuitas menjadi titik acuan baru yang **tidak dapat dibatalkan** — sekali tersentuh, ia permanen.
- Secara psikologis, ini mengonversi setiap keuntungan menjadi **kewajiban untuk tidak mengembalikannya**.

Gabungkan dengan Heath, Larrick & Wu (§5.2): puncak ekuitas adalah tujuan yang telah dicapai, dan turun darinya didaftarkan sebagai kerugian dengan bobot loss aversion penuh. Trader dengan trailing drawdown beroperasi **hampir permanen di domain rugi**, karena hanya ada satu titik di mana ia tidak rugi — ekuitas tertinggi sepanjang masa — dan ia meninggalkan titik itu segera setelah menyentuhnya.

Grossman & Zhou (1993, *Mathematical Finance* ○) menunjukkan secara formal bahwa batasan drawdown mengubah kebijakan portofolio optimal secara substansial, menuntut pengurangan eksposur seiring kedekatan ke batas. Trader yang tidak menghitung ini — yaitu hampir semua trader ritel — secara sistematis over-exposed persis ketika mereka paling rentan.

### 6.6 Aturan konsistensi: tekanan yang jarang dianalisis

Banyak perusahaan menerapkan aturan konsistensi — misalnya, tidak ada hari tunggal boleh melebihi 30–40% dari total profit. Secara niat, ini menyaring keberuntungan.

Secara psikologis, ini menciptakan **batas yang mengikat dua arah**: trader tidak boleh rugi terlalu besar *dan* tidak boleh untung terlalu besar dalam satu hari. Kombinasi ini mempersempit ruang perilaku yang dapat diterima dan menaikkan pemantauan yang diperlukan (§5.8) — dua faktor yang menurut literatur *choking* (§8) menurunkan performa pada tugas terampil.

Belum ada studi peer-review tentang efek aturan konsistensi pada perilaku trader. Ini adalah celah riset yang jelas (§16).

---

## 7. Lapis 4 — Stres, endokrinologi, dan perubahan preferensi risiko

Bagian ini berisi apa yang saya anggap sebagai bukti paling diremehkan dalam seluruh literatur ini. Wacana umum memperlakukan stres sebagai **gangguan** terhadap penilaian yang baik — semacam kebisingan yang dapat diatasi dengan ketenangan. Bukti neuroendokrin mengatakan sesuatu yang berbeda dan lebih serius: **stres kronis mengubah preferensi risiko itu sendiri.**

### 7.1 Kortisol naik seiring varians, bukan arah **[B]**

Coates & Herbert (2008, *PNAS* 105(16):6167–6172) mengikuti 17 trader laki-laki di lantai perdagangan London selama 8 hari kerja, mengambil sampel saliva antara pukul 11.00 dan 16.00, dan mencatat P&L harian.

Temuan:
- **Kadar testosteron pagi hari memprediksi profitabilitas hari itu.**
- **Kortisol trader naik seiring varians hasil tradingnya dan volatilitas pasar** — bukan seiring apakah ia untung atau rugi.

Poin kedua ini krusial untuk pertanyaan kita. Kortisol merespons **ketidakpastian**, bukan kerugian. Funded account meningkatkan ketidakpastian secara dramatis (konsekuensi nyata, horizon tak terbatas, barrier menyerap) bahkan ketika P&L netral. Artinya funded trader dapat mengalami beban kortisol yang lebih tinggi daripada challenge trader **meskipun hasil tradingnya identik**.

### 7.2 Kortisol menggeser preferensi risiko — bukti kausal **[B]**

Coates & Herbert bersifat korelasional. Kandasamy dkk. (2014, *PNAS* 111(9):3608–3613) menyediakan eksperimen kausalnya.

Desainnya dirancang untuk validitas ekologis: peneliti memberikan hidrokortison selama 8 hari untuk **mereplikasi kadar kortisol yang sebelumnya teramati pada trader nyata** saat menghadapi ketidakpastian dan volatilitas pasar — bukan lonjakan akut laboratorium.

Temuan:
- Partisipan menjadi **secara substansial lebih menghindari risiko**.
- **Pembobotan berlebih terhadap probabilitas kecil menjadi lebih ekstrem**.
- Efeknya lebih besar pada laki-laki dibanding perempuan.

Kesimpulan penulis: preferensi risiko **bukan sifat yang stabil**. Kortisol yang tinggi berkontribusi pada penghindaran risiko dan "pesimisme irasional" yang teramati di kalangan bankir dan manajer dana selama krisis keuangan.

> **Implikasi yang harus dinyatakan dengan jelas:** funded trader setelah tiga minggu di bawah tekanan akun **bukan pengambil keputusan yang sama** dengan trader yang lolos challenge. Fungsi utilitasnya telah bergeser secara farmakologis. Strategi yang ia uji dan kalibrasi selama challenge sekarang dijalankan oleh agen dengan preferensi risiko berbeda.
>
> Ini bukan metafora. Ini efek yang terukur, tereplikasi, dan kausal.

Arah pergeserannya — menuju **penghindaran** risiko — awalnya tampak melindungi. Tapi ia merusak lewat jalur lain: trader yang strateginya memerlukan pengambilan setup dengan konsisten kini melewatkan setup, memotong pemenang terlalu awal, dan berhenti mengambil risiko yang justru menghasilkan edge-nya. Hasilnya adalah edge yang tererosi diam-diam, bukan blow-up dramatis — kematian lambat lewat kehabisan waktu dan biaya.

### 7.3 Stres akut memperkuat pola prospect theory **[B]**

Porcelli & Delgado (2009, *Psychological Science* ○) menemukan bahwa stres akut **memperkuat** pola refleksif prospect theory: penghindaran risiko yang lebih besar di domain untung, pencarian risiko yang lebih besar di domain rugi.

Starcke & Brand (2012, *Neuroscience & Biobehavioral Reviews* ○) meninjau literatur pengambilan keputusan di bawah stres dan menyimpulkan bahwa stres menggeser pengambilan keputusan ke arah pemrosesan yang lebih otomatis dan berbasis kebiasaan, menjauh dari deliberasi terkendali.

Kombinasi kedua temuan ini memprediksi sesuatu yang sangat spesifik: **di bawah stres, funded trader akan lebih mungkin mengeksekusi kebiasaan yang telah ia latih.** Jika kebiasaan yang dilatih selama challenge adalah "naikkan ukuran ketika tertinggal dari target" (§4.5), maka stres membuat kebiasaan itu **lebih** mungkin muncul, bukan kurang.

Ini adalah hubungan yang mengikat §4 dan §7 bersama-sama: inversi seleksi tidak hanya memberi trader kebiasaan yang salah; stres funded account kemudian membuat kebiasaan itu lebih otomatis.

### 7.4 Kurang tidur menggeser dari menghindari rugi ke mengejar untung **[B]**

Venkatraman dkk. (2007, *Sleep* 30(5):603–609; 2011, *Journal of Neuroscience* 31(10):3712–3718) meneliti pengambilan keputusan berisiko setelah deprivasi tidur.

Temuan:
- Satu malam tanpa tidur menghasilkan **pergeseran strategi dari mempertahankan diri terhadap kerugian menjadi mengejar keuntungan**.
- Secara neural: peningkatan aktivasi ventromedial prefrontal dan ventral striatum terhadap keuntungan, **penurunan aktivasi anterior insula setelah kerugian**.
- Yang penting: pergeseran ini **tidak berkorelasi** dengan perubahan kewaspadaan psikomotor. Artinya trader yang merasa "masih bisa fokus" tetap mengalami pergeseran preferensi.

Poin terakhir ini adalah yang paling praktis. Introspeksi tidak mendeteksi efek ini. Trader yang kurang tidur tidak merasa lebih berani; ia merasa normal, sambil secara sistematis meremehkan sisi rugi.

Funded trading dan kurang tidur berkorelasi kuat karena alasan struktural: sesi pasar yang tidak sesuai zona waktu, pemantauan malam hari, dan kecemasan terkait akun. Ini menjadikan tidur salah satu variabel paling dapat diintervensi dalam keseluruhan dokumen ini (§14.3).

### 7.5 Kelangkaan finansial dan bandwidth kognitif **[A, dengan sanggahan]**

Mani, Mullainathan, Shafir & Zhao (2013, *Science* 341(6149):976–980) menunjukkan bahwa memicu pikiran tentang masalah keuangan **menurunkan performa kognitif pada partisipan miskin tetapi tidak pada yang berkecukupan**, dan bahwa petani yang sama menunjukkan performa kognitif lebih rendah sebelum panen (saat miskin) daripada sesudah panen (saat kaya).

Relevansinya untuk funded trader bersifat langsung: **trader yang bergantung pada payout untuk biaya hidup beroperasi di bawah kelangkaan.** Bandwidth kognitif yang tersita untuk kecemasan finansial tidak tersedia untuk eksekusi trading. Ini menciptakan lingkaran umpan balik: tekanan finansial → kognisi lebih buruk → trading lebih buruk → tekanan finansial lebih besar.

**Sanggahan yang harus dicatat:** makalah ini telah menerima kritik metodologis substantif atas dasar statistik dan psikometrik, dengan analisis ulang yang menunjukkan efek kekhawatiran finansial tidak terbatas pada orang miskin. Temuan intinya — bahwa kekhawatiran finansial menyita sumber daya kognitif — kemungkinan bertahan, tetapi besaran efek dan moderasi oleh kekayaan kurang pasti daripada yang disarankan sitasi populer. Diperlakukan di sini sebagai **[A dengan kualifikasi]**.

Implikasi praktisnya tetap kuat dan tidak bergantung pada perdebatan itu: **trading dengan uang yang dibutuhkan untuk hidup bulan depan adalah kondisi operasi yang berbeda secara kualitatif** dari trading dengan modal surplus.

### 7.6 Yang TIDAK didukung bukti: model "tangki willpower" **[A — bukti negatif]**

Bagian ini penting justru karena ia membatalkan kerangka yang paling populer dalam konten psikologi trading.

Model *ego depletion* — gagasan bahwa pengendalian diri adalah sumber daya terbatas yang menipis dengan penggunaan, seperti otot yang lelah — telah gagal dalam replikasi skala besar:

- **Hagger dkk. (2016, *Perspectives on Psychological Science*)** — replikasi multi-lab pra-terdaftar, 23 laboratorium, N = 2.141. Efek yang ditemukan: **d = 0,04**, tidak berbeda signifikan dari nol.
- **Vohs dkk. (2021, *Psychological Science*)** — uji paradigmatik pra-terdaftar 36 lab, N = 3.531. **Hasil null.**

Perdebatan ilmiah belum sepenuhnya selesai — sebagian peneliti berpendapat efeknya kecil tapi tidak nol — tetapi posisi default yang bertanggung jawab adalah bahwa **kerangka ego depletion tidak dapat menanggung beban yang dibebankan padanya.**

Ini membatalkan sejumlah nasihat trading yang umum:
- "Batasi jumlah keputusan harianmu untuk menghemat willpower." — Tidak didukung.
- "Kelelahan keputusan menyebabkan trade buruk di sore hari." — Efek sore hari mungkin nyata, tetapi mekanisme depletion tidak terbukti; penjelasan alternatif (kelelahan, perubahan kondisi pasar, akumulasi P&L) lebih baik didukung.
- "Latih otot disiplinmu." — Metafora tanpa dasar empiris.

Yang menggantikannya, dengan bukti lebih baik, adalah **modifikasi situasi**: mengubah lingkungan sehingga keputusan sulit tidak perlu dibuat (§14.1). Duckworth, Gendler & Gross (○) menyebut ini strategi pengendalian diri situasional, dan mereka mengungguli strategi berbasis kehendak secara konsisten.

---

## 8. Lapis 5 — Tekanan performa dan *choking*

### 8.1 Taruhan besar menurunkan performa **[A]**

Ariely, Gneezy, Loewenstein & Mazar (2009, *Review of Economic Studies* 76(2):451–469) menjalankan eksperimen di AS dan India di mana subjek mengerjakan berbagai tugas dengan pembayaran kontingen-performa yang bervariasi dari kecil sampai **sangat besar relatif terhadap pendapatan normal mereka** (di India, hingga setara beberapa bulan pengeluaran).

Temuan: **dengan beberapa pengecualian penting, tingkat hadiah yang sangat tinggi memiliki efek merusak terhadap performa.**

Pengecualiannya informatif: tugas yang murni mekanis (menekan tombol secepat mungkin) membaik dengan hadiah lebih tinggi. Tugas yang memerlukan **kreativitas, konsentrasi, atau keterampilan kognitif** memburuk.

Trading funded secara tegas masuk kategori kedua. Dan transisi challenge → funded adalah persis manipulasi yang dilakukan eksperimen ini: **tugas yang sama, taruhan dinaikkan secara dramatis.** Literatur memprediksi penurunan performa dari manipulasi itu saja, tanpa perubahan lain apa pun.

### 8.2 Pemantauan eksplisit merusak keterampilan yang terotomatisasi **[B]**

Baumeister (1984, ○) dan Beilock & Carr (2001, *Journal of Experimental Psychology: General* ○) mengembangkan **teori pemantauan eksplisit**: tekanan menaikkan kesadaran diri dan kecemasan tentang eksekusi yang benar, yang menaikkan perhatian pada proses keterampilan dan kendali langkah-demi-langkahnya. Untuk keterampilan yang sudah terproseduralisasi, perhatian pada level itu **mengganggu eksekusi**.

Beilock & Carr juga menunjukkan asimetri yang penting: pada **awal** pembelajaran, pemantauan eksplisit akibat tekanan **memperbaiki** performa. Baru setelah keterampilan terproseduralisasi, pemantauan eksplisit merusaknya.

Ini memprediksi pola yang khas dan sering dilaporkan pada funded trader: **trader dengan pengalaman menengah paling rentan choking.** Pemula belum mengotomatisasi apa pun, jadi tidak ada yang dirusak. Ahli sejati punya proses yang cukup kokoh. Trader di antaranya — yang persis merupakan mayoritas kolam funded — punya pola yang setengah terotomatisasi yang tekanan dapat urai.

### 8.3 Teori kendali atensi **[A]**

Eysenck, Derakshan, Santos & Calvo (2007, *Emotion* ○) memperluas teori efisiensi pemrosesan menjadi **teori kendali atensi**: kecemasan merusak fungsi eksekutif, khususnya **inhibisi** (menekan respons yang tidak relevan) dan **shifting** (beralih antar tugas), sementara relatif menyisakan eksekusi respons.

Pemetaan ke trading sangat spesifik dan berguna:

| Fungsi eksekutif | Efek kecemasan | Manifestasi trading |
|---|---|---|
| **Inhibisi** | Terganggu berat | Tidak mampu *tidak* mengambil trade; overtrading; mengejar |
| **Shifting** | Terganggu berat | Terjebak pada satu tesis; tidak mampu membalik pandangan; menggantung posisi rugi |
| **Eksekusi respons** | Relatif utuh | Masih bisa klik tombol, menempatkan order dengan benar |

Ini menjelaskan pengalaman subjektif yang dilaporkan hampir universal oleh trader yang blow-up: **mereka tahu apa yang seharusnya mereka lakukan, dan tetap melakukan hal lain.** Itu bukan kegagalan pengetahuan atau kegagalan kehendak — itu kegagalan inhibisi, yang merupakan fungsi eksekutif spesifik yang secara selektif dirusak kecemasan.

Konsekuensi desain: intervensi harus menargetkan **inhibisi** (batas keras, penguncian otomatis, ukuran posisi yang telah ditetapkan) alih-alih menargetkan pengetahuan (lebih banyak edukasi) atau motivasi (lebih banyak disiplin). Lihat §14.1.

### 8.4 Bahkan ahli elite tidak lolos: bukti Tiger Woods **[A]**

Sanggahan standar terhadap seluruh literatur bias adalah bahwa taruhan besar, kompetisi, dan pengalaman akan menghapus bias. Pope & Schweitzer (2011, *American Economic Review* 101(1):129–157) menguji sanggahan itu secara langsung dan mematahkannya.

Mereka menganalisis **lebih dari 2,5 juta putt** dari PGA Tour menggunakan pengukuran laser presisi. Golf adalah latar ideal: pegolf dibayar berdasarkan total pukulan turnamen, namun setiap lubang punya titik acuan yang menonjol — **par**.

Temuan: pegolf terbaik dunia, **termasuk Tiger Woods**, secara sistematis melakukan putt lebih akurat untuk par daripada untuk birdie pada jarak yang sama — yaitu, mereka berusaha lebih keras untuk menghindari "kerugian" (bogey) daripada untuk memperoleh "keuntungan" (birdie), meskipun secara ekonomi setiap pukulan bernilai sama. Bias ini merugikan pegolf terbaik **lebih dari US$1,2 juta hadiah turnamen per tahun**.

Ini adalah salah satu demonstrasi terkuat yang tersedia bahwa loss aversion berbasis acuan bertahan pada:
- ahli dengan keterampilan tertinggi yang dapat dicapai,
- di bawah kompetisi intens,
- dengan taruhan finansial yang besar,
- dengan umpan balik langsung dan berulang selama bertahun-tahun.

> Jika Tiger Woods tidak dapat melatih dirinya keluar dari efek titik acuan pada tugas yang jauh lebih sederhana daripada trading, dengan umpan balik yang jauh lebih bersih daripada trading, maka **harapan bahwa funded trader akan melakukannya dalam tiga bulan tidak berdasar**.
>
> Kesimpulan yang tepat bukanlah keputusasaan, melainkan pergeseran strategi: berhenti berusaha menghilangkan bias lewat kehendak, dan mulai **mendesain lingkungan di mana bias tidak dapat menyebabkan kerusakan** (§14).

### 8.5 Mengapa funded account secara struktural lebih menekan

Menggabungkan §8.1–§8.4, berikut adalah perbedaan tekanan yang dapat dihitung antara dua fase:

| Sumber tekanan | Challenge | Funded |
|---|---|---|
| Besaran taruhan finansial | Biaya challenge | Aset + seluruh biaya terdahulu + penghasilan |
| Reversibilitas kegagalan | **Tinggi** — beli lagi US$500 | **Rendah** — mulai dari nol, semua biaya hangus |
| Evaluasi eksternal | Minimal | Perusahaan memantau, komunitas tahu, keluarga tahu |
| Horizon waktu | Terbatas, ada garis finish | **Tak terbatas, tanpa garis finish** |
| Identitas yang dipertaruhkan | "Saya sedang mencoba" | **"Saya adalah funded trader"** |
| Frekuensi pemantauan yang diwajibkan | Harian | Harian, seringkali intraday |

Setiap baris memburuk. Literatur *choking* memprediksi penurunan performa dari perubahan mana pun di antaranya; funded account mengubah semuanya sekaligus.

Baris **reversibilitas** mungkin yang paling diremehkan. Kegagalan yang dapat dibalik menghasilkan tekanan yang jauh lebih kecil daripada kegagalan permanen. Challenge dapat dibeli ulang seharga biaya kecil; akun funded yang hilang mengharuskan pengulangan seluruh proses. Perbedaan itu saja mengubah perhitungan psikologis setiap trade.

---

## 9. Lapis 6 — Overconfidence yang diproduksi oleh kelulusan itu sendiri

Bagian ini menyajikan apa yang menurut saya adalah mekanisme psikologis paling spesifik terhadap pertanyaan ini. Mekanisme lain (stres, loss aversion, choking) berlaku untuk trading secara umum. Mekanisme ini berlaku **justru karena ada peristiwa kelulusan**.

### 9.1 Model formal: belajar menjadi terlalu percaya diri **[A]**

Gervais & Odean (2001, *Review of Financial Studies* 14(1):1–27) membangun model pasar multiperiode yang menjelaskan proses trader mempelajari kemampuannya sendiri, dan bagaimana bias dalam pembelajaran itu memproduksi overconfidence.

Strukturnya:
1. Trader **tidak tahu kemampuannya sendiri** di awal.
2. Ia menyimpulkan kemampuan itu dari keberhasilan dan kegagalannya.
3. Dalam menilai kemampuan, ia **mengambil terlalu banyak kredit atas keberhasilan** (*self-attribution bias*) — keberhasilan dikaitkan dengan skill, kegagalan dengan keadaan eksternal.
4. Akibatnya ia menjadi terlalu percaya diri.

Prediksi kunci model, dan yang paling relevan di sini:

> **Tingkat overconfidence yang diharapkan meningkat pada tahap awal karier trader, lalu dengan lebih banyak pengalaman ia mengenali kemampuannya sendiri dengan lebih baik.**

Puncak overconfidence terjadi **setelah rangkaian keberhasilan awal**. Lolos dua fase challenge adalah persis rangkaian keberhasilan awal itu — dan ia terjadi tepat sebelum trader diberi akses ke modal yang jauh lebih besar.

Daniel, Hirshleifer & Subrahmanyam (1998, *Journal of Finance* ○) menyediakan model self-attribution paralel dengan implikasi harga aset.

### 9.2 Illusion of control berkorelasi negatif dengan performa nyata **[B]**

Fenton-O'Creevy, Nicholson, Soane & Willman (2003, *Journal of Occupational and Organizational Psychology* ○) mengambil pendekatan yang lebih langsung: mereka mengukur illusion of control pada **107 trader nyata di empat bank investasi** menggunakan tugas komputer yang dirancang untuk lapangan, lalu menghubungkannya dengan performa.

Temuan:
- Perbedaan individual dalam bias ini punya **hubungan terbalik yang signifikan dengan performa**, diukur lewat penilaian manajer dan total remunerasi.
- Trader dengan illusion of control tinggi secara signifikan lebih buruk dalam **analisis, manajemen risiko, dan kontribusi terhadap profit desk**, dan **memperoleh penghasilan jauh lebih sedikit**.

Penulis berargumen bahwa **tugas dan lingkungan trading kondusif untuk mengembangkan ilusi kendali** — banyak tindakan, umpan balik yang jelas tapi berisik, dan keterlibatan personal yang tinggi. Langer (1975, ○) menetapkan bahwa keterlibatan personal, pilihan, dan keakraban semuanya meningkatkan ilusi kendali. Funded trading memaksimalkan ketiganya.

Hubungan dengan Clark dkk. (§11.1) patut diperhatikan: efek near-miss yang meningkatkan keinginan bermain **terbatas pada trial di mana subjek punya kendali personal atas pengaturan taruhannya**. Kendali personal adalah bahan bakar untuk beberapa mekanisme sekaligus.

### 9.3 Trading adalah lingkungan belajar validitas rendah **[A]**

Kahneman & Klein (2009, *American Psychologist* 64(6):515–526) — kolaborasi luar biasa antara dua peneliti yang sebelumnya berseberangan tentang intuisi ahli — menetapkan **syarat untuk keahlian intuitif yang valid**:

1. **Lingkungan dengan validitas tinggi** — ada keteraturan yang cukup stabil untuk dipelajari.
2. **Kesempatan untuk mempelajari keteraturan itu** — praktik berkepanjangan dengan **umpan balik yang cepat dan tidak ambigu**.

Mereka menekankan bahwa intuisi terampil "sangat sulit dicapai, memerlukan puluhan ribu jam dengan umpan balik berkualitas tinggi".

Trading gagal pada kedua syarat:

| Syarat | Pemadam kebakaran / catur / anestesi | Trading |
|---|---|---|
| Keteraturan lingkungan | Tinggi dan stabil | **Rendah, non-stasioner, kompetitif adaptif** |
| Kecepatan umpan balik | Detik sampai menit | Bisa berbulan-bulan sebelum sampel memadai |
| Ambiguitas umpan balik | Rendah — api padam atau tidak | **Sangat tinggi — trade bagus bisa rugi, trade buruk bisa untung** |
| Rasio sinyal-terhadap-derau | Tinggi | **Sangat rendah** |

Hogarth (○) menyebut ini lingkungan belajar "**wicked**" sebagai lawan "**kind**": lingkungan di mana umpan balik secara aktif menyesatkan, bukan sekadar lambat.

Kombinasinya mematikan: trader memperoleh **keyakinan** dari pengalaman (karena self-attribution bias, §9.1) tanpa memperoleh **akurasi** (karena lingkungannya validitas rendah). Confidence dan competence terpisah.

### 9.4 "Pembelajaran" yang teramati sebagian besar adalah atrisi **[A]**

Seru, Shumway & Stoffman (2010, *Review of Financial Studies* 23(2):705–739) menganalisis catatan investor individual selama sembilan tahun untuk menguji apakah investor belajar dari pengalaman trading.

Temuan mereka menemukan **dua jenis pembelajaran**:
1. Sebagian investor menjadi lebih baik seiring pengalaman.
2. Sebagian investor **berhenti bertrading** setelah menyadari kemampuannya buruk.

Kesimpulan kunci: **bagian substansial dari pembelajaran agregat dijelaskan oleh jenis kedua**, dan literatur sebelumnya — yang mengabaikan atrisi investor — **secara signifikan melebih-lebihkan seberapa cepat investor menjadi lebih baik.**

Implikasinya bagi funded trader adalah keras. Ketika seseorang mengamati bahwa "funded trader yang bertahan lama menjadi lebih baik", sebagian besar dari yang mereka amati bukanlah perbaikan individual — melainkan **seleksi bertahan hidup**. Trader yang buruk menghilang dari sampel. Yang tersisa tampak lebih baik secara agregat tanpa satu pun individu berubah.

Ini menutup lingkaran dengan §4.9: regresi ke mean plus atrisi menghasilkan data yang **terlihat seperti pembelajaran** tetapi tidak mengandung pembelajaran.

### 9.5 Dari overconfidence ke perilaku: mekanisme ukuran posisi

Jalur kausal dari overconfidence ke kehancuran akun berjalan lewat satu variabel yang dapat diamati: **ukuran posisi**.

Odean (1999, *AER* ○) dan Barber & Odean (2000, *Journal of Finance* ○; 2001, *QJE* ○) menetapkan bahwa overconfidence menghasilkan **trading berlebih**, dan bahwa trading berlebih menurunkan return. Statman, Thorley & Vorkink (○) menunjukkan volume trading naik setelah return pasar tinggi, konsisten dengan self-attribution.

Berikut biayanya, dihitung **[M]**. Trader mempertahankan Sharpe yang sama tetapi menaikkan ukuran posisi setelah lolos:

Angka di bawah adalah **peluang akhirnya menyentuh max drawdown 10%**.

| Sharpe | vol dasar | ukuran ×1 | ukuran ×1,5 | ukuran ×2 |
|---:|---:|---:|---:|---:|
| 1,0 | 20% | 36,8% | 51,3% | 60,7% |
| 1,0 | 30% | 51,3% | 64,1% | 71,7% |
| 1,5 | 20% | 22,3% | 36,8% | 47,2% |
| 1,5 | 30% | 36,8% | 51,3% | 60,7% |
| 2,0 | 20% | **13,5%** | 26,4% | **36,8%** |
| 2,0 | 30% | 26,4% | 41,1% | 51,3% |

Trader Sharpe 2,0 — sangat bagus — yang menaikkan ukuran 2× setelah lolos challenge memindahkan peluang ruin-nya dari 13,5% ke 36,8%. **Ia menaikkan peluang kehancurannya hampir tiga kali lipat tanpa mengubah kualitas keputusan tradingnya sama sekali.**

Inilah mengapa overconfidence adalah mekanisme yang paling merusak dalam dokumen ini: ia tidak memerlukan keputusan buruk. Ia hanya memerlukan keputusan yang **sama** dengan ukuran yang lebih besar.

### 9.6 Ringkasan mekanisme lapis 6

```
Lolos fase 1 (sebagian besar keberuntungan, §4)
        │
        ▼
Self-attribution bias: "ini karena skill saya"   ← Gervais & Odean 2001
        │
        ▼
Lolos fase 2 (konfirmasi yang dirasakan)
        │
        ▼
Overconfidence memuncak  ← prediksi eksplisit model: puncak di awal karier
        │
        ├──► Ukuran posisi naik           ──► P(ruin) naik tajam (§9.5)
        ├──► Frekuensi trade naik         ──► biaya naik, edge tererosi
        ├──► Illusion of control naik     ──► manajemen risiko memburuk (§9.2)
        └──► Umpan balik tidak mengoreksi ──► lingkungan validitas rendah (§9.3)
```

---

## 10. Lapis 7 — Emosi dan regulasi emosi sebagai penanda keahlian

### 10.1 Reaktivitas emosional memprediksi performa buruk **[B]**

Lo, Repin & Steenbarger (2005, *American Economic Review* 95(2):352–359) melakukan studi klinis terhadap **80 day trader anonim**, mengumpulkan survei kondisi emosional harian selama lima minggu ditambah inventori kepribadian, lalu menghubungkannya dengan catatan P&L harian yang dinormalisasi.

Dua temuan, keduanya penting:

1. **Subjek yang reaksi emosionalnya terhadap keuntungan dan kerugian moneter lebih intens — di sisi positif maupun negatif — menunjukkan performa trading yang secara signifikan lebih buruk.**

2. **Tidak ditemukan "profil kepribadian trader" yang spesifik.** Penulis menyimpulkan bahwa keterampilan trading mungkin tidak bersifat bawaan, dan bahwa tipe kepribadian yang berbeda dapat menjalankan fungsi trading sama baiknya setelah pelatihan yang tepat.

Temuan kedua ini penting secara praktis dan sering diabaikan: **tidak ada bukti bahwa sebagian orang "terlahir untuk trading"**. Ini mendukung pendekatan berbasis pelatihan dan desain sistem alih-alih seleksi berdasarkan tipe kepribadian.

Temuan pertama patut digarisbawahi: **kegembiraan yang intens sama merusaknya dengan ketakutan yang intens.** Ini bertentangan dengan narasi umum yang memperlakukan ketakutan sebagai musuh dan antusiasme sebagai sekutu. Lo & Repin (2002, *Journal of Cognitive Neuroscience* ○) menemukan pola serupa menggunakan pengukuran psikofisiologis real-time (konduktansi kulit, suhu, detak jantung) pada trader profesional.

### 10.2 Bukan menekan emosi, tapi mengatur emosi lebih awal **[B]**

Fenton-O'Creevy, Soane, Nicholson & Willman (2011, *Journal of Organizational Behavior* 32(8):1044–1061) melakukan investigasi kualitatif terhadap trader di empat bank investasi City of London — latar yang secara teoretis biasanya dianggap didominasi analisis rasional.

Kesimpulan mereka:
- **Emosi dan regulasinya memainkan peran sentral dalam pengambilan keputusan trader.**
- Ada perbedaan antara trader berkinerja tinggi dan rendah dalam **cara mereka terlibat dengan intuisi mereka**.
- **Trader yang menggunakan strategi regulasi emosi berfokus-anteseden memperoleh keunggulan performa dibanding mereka yang terutama menggunakan strategi berfokus-respons.**

Untuk memahami temuan ketiga, diperlukan model proses Gross (1998, *Review of General Psychology* ○; 2002, *Psychophysiology* ○), yang membagi regulasi emosi menurut **kapan** ia terjadi dalam proses pembangkitan emosi:

| Tipe | Kapan | Contoh | Biaya kognitif | Efektivitas |
|---|---|---|---|---|
| **Pemilihan situasi** | Sebelum | Tidak trading di hari NFP | Sangat rendah | Tinggi |
| **Modifikasi situasi** | Sebelum | Ukuran posisi dipatok sistem; platform terkunci setelah 2 loss | Rendah | **Tinggi** |
| **Penyebaran perhatian** | Selama | Tidak menatap P&L floating | Rendah–sedang | Sedang |
| **Perubahan kognitif (reappraisal)** | Selama | "Ini satu sampel dari distribusi" | Sedang | **Tinggi** |
| **Modulasi respons (suppression)** | Sesudah | Menahan diri agar tidak bereaksi | **Tinggi** | **Rendah** |

Empat yang pertama adalah **berfokus-anteseden**. Yang terakhir adalah **berfokus-respons** — dan literatur Gross secara konsisten menemukan bahwa supresi mahal secara kognitif, tidak mengurangi pengalaman emosi subjektif, dan memburukkan memori serta performa.

> **Terjemahan praktis:** menyuruh trader "tetap tenang saat drawdown" adalah instruksi untuk melakukan **supresi** — strategi berfokus-respons yang paling tidak efektif dan paling mahal dalam taksonomi. Trader berkinerja tinggi tidak melakukan itu. Mereka mengatur **sebelum** emosi terbentuk, dengan memilih dan memodifikasi situasi.
>
> Ini bukan perbedaan semantik. Ini perbedaan antara intervensi yang bekerja dan intervensi yang justru menghabiskan sumber daya yang dibutuhkan untuk eksekusi.

### 10.3 Mindfulness bukan obat universal **[C]**

Karena mindfulness adalah intervensi yang paling banyak dipromosikan dalam konten psikologi trading, temuan yang berlawanan layak disorot.

Sebuah eksperimen terkontrol acak tentang mindfulness dan keputusan trading (Ding, Ghanma, Varotto & Vogt, *working paper* — **[C]**, belum peer-review) menemukan bahwa partisipan yang terlatih mindfulness **secara signifikan underperform di lingkungan ketidakpastian rendah dengan beban informasi tinggi, khususnya setelah berita negatif, dengan underperformance mencapai −35,4%.**

Interpretasi penulis: mindfulness dapat **meredam reaksi emosional negatif**, yang berpotensi **menunda respons terhadap informasi yang merugikan** dan merusak market timing ketika keputusan cepat diperlukan.

Ini konsisten dengan kerangka yang lebih luas: emosi negatif membawa **informasi**. Meredamnya secara menyeluruh membuang sinyal bersama derau. Studi lain (Ding dkk., ○) menemukan efek mindfulness pada performa trading dimoderasi oleh kesulitan pengendalian impuls — yaitu, ia membantu sebagian orang dan tidak membantu yang lain.

Posisi yang bertanggung jawab: **mindfulness adalah intervensi yang menjanjikan untuk subpopulasi tertentu (impulsivitas tinggi), bukan intervensi universal, dan ia punya biaya yang dapat diidentifikasi.** Ia tidak boleh direkomendasikan secara buta.

### 10.4 Risiko sebagai perasaan **[A]**

Loewenstein, Weber, Hsee & Welch (2001, *Psychological Bulletin* ○) menetapkan kerangka **risk-as-feelings**: reaksi emosional terhadap situasi berisiko sering **menyimpang dari penilaian kognitif atas risiko yang sama**, dan ketika keduanya bertentangan, **emosi sering menang dalam mengarahkan perilaku**.

Mereka mengidentifikasi determinan reaksi emosional yang **tidak** memengaruhi penilaian kognitif, termasuk kedekatan temporal, vividness, dan — yang paling relevan di sini — **apakah hasilnya dialami secara personal**.

Ini menjelaskan mengapa simulasi demo gagal mempersiapkan trader untuk akun nyata, dan mengapa challenge gagal mempersiapkan trader untuk funded: **perhitungan kognitifnya identik, tetapi reaksi emosionalnya tidak.** Trader dapat menghitung bahwa risiko 1% adalah risiko 1%, dan tetap mengalami risiko 1% di akun funded sebagai sesuatu yang secara kualitatif berbeda dari risiko 1% di challenge.

---

## 11. Lapis 8 — Dimensi adiktif: near-miss, reinforcement, eskalasi komitmen

Bagian ini paling tidak nyaman dan paling penting untuk keselamatan. Ia tidak menuduh trader siapa pun; ia menjelaskan fitur struktural yang, secara literatur, memproduksi pola perilaku adiktif pada populasi umum.

### 11.1 Efek near-miss **[B]**

Clark, Lawrence, Astley-Jones & Gray (2009, *Neuron* 61(3):481–490) meneliti apa yang terjadi di otak ketika seseorang **hampir** menang.

Temuan:
- Dibandingkan kekalahan telak, **near-miss dialami sebagai kurang menyenangkan tetapi meningkatkan keinginan untuk bermain.**
- **Near-miss merekrut sirkuit striatal dan insula yang juga merespons kemenangan uang nyata.**
- Efeknya **terbatas pada trial di mana subjek punya kendali personal** atas pengaturan taruhannya.
- Aktivitas terkait near-miss di korteks cingulate anterior rostral bervariasi menurut kendali personal.

Chase & Clark (2010, *Journal of Neuroscience* ○) menemukan bahwa **keparahan gangguan judi memprediksi respons midbrain terhadap hasil near-miss** — yaitu, semakin bermasalah perjudian seseorang, semakin kuat otaknya merespons hampir-menang.

Sekarang terapkan ke struktur challenge:

| Fitur near-miss (Clark dkk.) | Padanan dalam challenge prop firm |
|---|---|
| Hasil yang proksimal ke jackpot | Gagal di +7,8% dari target +8% |
| Kurang menyenangkan tapi menaikkan keinginan bermain | "Saya *hampir* berhasil — beli satu lagi" |
| Memerlukan kendali personal | Trader memilih setiap trade sendiri — kendali maksimal |
| Merekrut sirkuit kemenangan | — |

Struktur challenge menghasilkan near-miss dengan frekuensi tinggi secara by-design: batas drawdown yang mengikat berarti banyak kegagalan terjadi **setelah** trader mendekati target. Kombinasi kendali personal maksimal dengan near-miss frekuensi tinggi adalah, dari sudut pandang literatur, konfigurasi yang secara khusus mendorong kelanjutan bermain.

### 11.2 Jadwal penguatan rasio variabel **[A]**

Trading profitabel menghasilkan penguatan pada **jadwal rasio variabel** — imbalan tiba setelah jumlah respons yang tidak dapat diprediksi. Dalam literatur pembelajaran, ini adalah jadwal yang menghasilkan **tingkat respons tertinggi dan paling tahan terhadap kepunahan** — persis jadwal yang digunakan mesin slot.

Funded account memperkuat ini dengan menambahkan **imbalan besar yang jarang** (payout) di atas imbalan kecil yang sering (trade menang). Struktur ini diketahui memaksimalkan persistensi perilaku secara independen dari apakah perilaku itu menguntungkan.

### 11.3 Trading berlebih memenuhi kriteria gangguan judi **[B]**

Grall-Bronnec dkk. (2017, *Addictive Behaviors* 64:340–348) meneliti kohort penjudi bermasalah Prancis dan menyimpulkan bahwa **kriteria diagnostik untuk gangguan judi dapat diterapkan pada trading berlebih**. Mereka menemukan asosiasi dengan depresi, kecemasan, dan konsekuensi negatif di bidang finansial serta psikososial.

Literatur pendukung:
- Cox, Kamolsareeratana & Kouwenberg (2020, *Journal of Banking & Finance* ○) — dua survei investor menemukan prevalensi perjudian kompulsif yang terukur di pasar finansial.
- Mosenhauer, Newall & Walasek (2021, *Journal of Behavioral Addictions* ○) — hubungan antara trading saham dan indikator masalah judi.
- Dorn, Dorn & Sengmueller (2015, *Management Science* ○) — korelasi antara volume trading dan pembelian lotre.
- Barber, Lee, Liu & Odean (2009, *RFS* ○) — kerugian day trader individual di Taiwan setara sekitar 2,2% dari PDB Taiwan, salah satu estimasi kerugian agregat terbesar yang pernah didokumentasikan untuk perilaku trading ritel.

Tinjauan sistematis terbaru tentang "problematic trading" (2025, *PubMed* ○) menemukan bidang ini masih kekurangan definisi terstandardisasi, yang berarti prevalensinya belum dapat diestimasi dengan andal.

**Yang dikatakan dan tidak dikatakan bagian ini:** ini **tidak** mengatakan bahwa funded trader adalah pecandu judi. Ia mengatakan bahwa (a) struktur challenge berulang memiliki beberapa fitur yang literatur identifikasi sebagai pendorong perilaku adiktif, dan (b) setiap program serius untuk mendukung funded trader harus menyertakan **skrining**, karena subpopulasi yang terdampak tidak akan mendapat manfaat dari pelatihan trading dan memerlukan jenis bantuan yang sepenuhnya berbeda (§13.3).

### 11.4 Eskalasi komitmen dan biaya tenggelam **[A]**

Staw (1976, ○) dan Arkes & Blumer (1985, ○) menetapkan bahwa orang **menaikkan komitmen terhadap arah tindakan yang gagal** untuk membenarkan investasi sebelumnya, dan bahwa biaya yang sudah tenggelam secara keliru memengaruhi keputusan ke depan.

Pada trader yang telah membeli lima challenge:
- Biaya kumulatif menjadi pembenaran untuk pembelian keenam ("saya sudah terlalu jauh").
- Berhenti akan memerlukan pengakuan bahwa seluruh pengeluaran itu adalah kerugian — persis penutupan akun mental yang dihindari loss aversion (§5.6).
- Identitas yang terbangun di komunitas menaikkan biaya sosial dari berhenti.

Digabungkan dengan §4.7 (pengujian berganda), muncul jebakan yang sangat tertutup: pembelian berulang **menaikkan peluang lolos tanpa menaikkan skill**, kelulusan yang dihasilkan **memvalidasi keputusan untuk bertahan**, dan kegagalan funded yang mengikuti **memicu pembelian berikutnya** lewat mekanisme near-miss dan biaya tenggelam.

### 11.5 Pengejaran kerugian sebagai jembatan antar-lapis

*Loss chasing* — menaikkan taruhan untuk memulihkan kerugian — adalah tempat di mana hampir semua mekanisme dalam dokumen ini bertemu:

| Lapis | Kontribusi terhadap loss chasing |
|---|---|
| §5 Prospect theory | Domain rugi → risk seeking (diminishing sensitivity) |
| §5.5 Break-even effect | Taruhan impas menjadi sangat menarik |
| §5.6 Realization effect | Kerugian di atas kertas mempertahankan mode pencarian risiko |
| §6.3 Gambling for resurrection | Dekat barrier, varians tinggi memaksimalkan P(selamat) |
| §6.4 Coval & Shumway | Bukti lapangan: +16% risiko sore setelah rugi pagi |
| §7.3 Stres | Memperkuat pola prospect theory, memicu kebiasaan otomatis |
| §8.3 Kendali atensi | Inhibisi terganggu — tidak mampu *tidak* mengambil trade |
| §11.2 Rasio variabel | Persistensi tinggi, tahan kepunahan |

Delapan mekanisme independen semuanya mendorong ke arah yang sama, pada momen yang sama. Inilah alasan mengapa loss chasing begitu sulit dihentikan dengan kehendak — dan mengapa intervensi yang efektif harus **mencegahnya secara struktural** alih-alih melawannya secara kognitif (§14.1).

---

## 12. Sintesis: model kaskade "Pass-to-Fail" 6 tahap

Menggabungkan seluruh lapis, berikut adalah model kausal terintegrasi. Setiap tahap mencantumkan mekanismenya, prediksi yang dapat diamati, dan cara mendeteksinya dalam data akun.

### Tahap 0 — Seleksi (sebelum funding)

| | |
|---|---|
| **Mekanisme** | Struktur challenge memberi hadiah pada varians tinggi (§4.5); pengujian berganda lewat pembelian berulang (§4.7); ukuran sampel tidak memadai untuk membedakan skill (§4.6) |
| **Hasil** | ~59% kolam funded ber-edge nol; ~5% benar-benar terampil (§4.4) |
| **Prediksi teramati** | Performa funded regresi tajam dari performa challenge, untuk mayoritas |
| **Terdeteksi lewat** | Perbandingan Sharpe challenge vs 60 hari pertama funded; jumlah percobaan challenge sebelum lolos |
| **Intervensi** | Perpanjang evaluasi; beri bobot pada konsistensi bukan kecepatan; batasi ukuran posisi selama evaluasi |

### Tahap 1 — Inflasi keyakinan (minggu 0)

| | |
|---|---|
| **Mekanisme** | Self-attribution bias (§9.1); lingkungan validitas rendah mencegah koreksi (§9.3); illusion of control (§9.2) |
| **Hasil** | Overconfidence memuncak tepat saat akses modal maksimal |
| **Prediksi teramati** | Ukuran posisi rata-rata naik pada 1–10 trade pertama di funded dibanding akhir fase 2 |
| **Terdeteksi lewat** | Rasio risiko-per-trade (funded 10 trade pertama ÷ fase 2 10 trade terakhir) |
| **Intervensi** | Batas ukuran yang di-hardcode selama 30 hari pertama; ramp-up bertahap |

### Tahap 2 — Pergeseran acuan (minggu 0–2)

| | |
|---|---|
| **Mekanisme** | Acuan bergeser dari biaya-tenggelam ke saldo-akun (§5.3); endowment effect (§5.4); trailing drawdown mengunci acuan di puncak (§6.5) |
| **Hasil** | Drawdown kecil kini didaftarkan di domain rugi → risk seeking |
| **Prediksi teramati** | Asimetri: waktu tahan posisi rugi memanjang, posisi untung memendek (disposition effect) |
| **Terdeteksi lewat** | Rasio durasi rata-rata (trade rugi ÷ trade untung); Odean's PGR/PLR |
| **Intervensi** | Stop otomatis di broker; tampilkan P&L sebagai R-multiple bukan mata uang |

### Tahap 3 — Beban stres terakumulasi (minggu 2–8)

| | |
|---|---|
| **Mekanisme** | Kortisol naik seiring varians (§7.1); kortisol kronis menggeser preferensi risiko (§7.2); kurang tidur menggeser ke pengejaran untung (§7.4); kelangkaan finansial mengikis bandwidth (§7.5) |
| **Hasil** | Pengambil keputusan yang berbeda secara farmakologis dari yang lolos challenge |
| **Prediksi teramati** | Salah satu dari dua pola: (a) freezing — jumlah trade turun, setup terlewat, kehabisan waktu; (b) pelebaran — jarak stop melebar, ukuran tidak konsisten |
| **Terdeteksi lewat** | Rolling 10-trade: jumlah trade/hari, deviasi standar ukuran posisi, jarak stop rata-rata; jam trading di luar rencana |
| **Intervensi** | Jadwal tidur yang dilindungi; pisahkan modal trading dari biaya hidup; kurangi frekuensi pemeriksaan |

### Tahap 4 — Pemicu (satu hari buruk)

| | |
|---|---|
| **Mekanisme** | Kerugian di atas kertas mempertahankan mode risk-seeking (§5.6); break-even effect (§5.5); inhibisi terganggu kecemasan (§8.3); gambling for resurrection dekat barrier (§6.3) |
| **Hasil** | Loss chasing — delapan mekanisme mendorong searah (§11.5) |
| **Prediksi teramati** | Lonjakan tajam: ukuran posisi, frekuensi trade, dan jeda antar-trade memendek drastis dalam satu sesi |
| **Terdeteksi lewat** | **Ini metrik paling prediktif:** waktu antara trade rugi dan trade berikutnya (*revenge latency*); ukuran trade N+1 ÷ ukuran trade N setelah kerugian |
| **Intervensi** | **Penguncian otomatis platform setelah 2 kerugian berturut-turut atau −2R harian.** Ini satu-satunya intervensi yang bekerja pada titik ini (§14.1) |

### Tahap 5 — Pelanggaran dan pembelian ulang

| | |
|---|---|
| **Mekanisme** | Near-miss merekrut sirkuit kemenangan (§11.1); eskalasi komitmen (§11.4); penguatan rasio variabel (§11.2) |
| **Hasil** | Beli challenge baru; kembali ke Tahap 0 dengan bias yang diperkuat |
| **Prediksi teramati** | Interval antar pembelian memendek; ukuran akun yang dibeli naik |
| **Terdeteksi lewat** | Riwayat pembelian; jarak dari target saat pelanggaran (near-miss = <20% dari target tersisa) |
| **Intervensi** | Periode pendinginan wajib; skrining PGSI sebelum pembelian ke-3; penawaran refund alih-alih reset |

### Diagram ringkas

```
  SELEKSI              INFLASI            PERGESERAN           BEBAN
  variansi tinggi ───► KEYAKINAN ───────► ACUAN ─────────────► STRES
  menang seleksi       self-attribution   endowment +          kortisol,
  (§4.5)               (§9.1)             trailing DD (§6.5)   tidur (§7)
       │                    │                   │                 │
       │                    ▼                   ▼                 ▼
       │              ukuran naik 1,5×     drawdown kecil    preferensi
       │              P(ruin) 37%→51%      = domain rugi     risiko bergeser
       │                    │                   │                 │
       └────────────────────┴───────────────────┴─────────────────┘
                                      │
                                      ▼
                            ┌──────────────────┐
                            │   SATU HARI      │
                            │     BURUK        │
                            └────────┬─────────┘
                                     │
              8 mekanisme mendorong searah (§11.5)
                                     │
                                     ▼
                            ┌──────────────────┐
                            │  LOSS CHASING    │──► PELANGGARAN
                            └──────────────────┘         │
                                     ▲                   ▼
                                     │            near-miss (§11.1)
                                     │            sunk cost (§11.4)
                                     │                   │
                                     └───── BELI LAGI ◄──┘
```

### Apa yang dijelaskan model ini yang tidak dijelaskan "masalah psikologi"

1. **Mengapa kegagalan terkonsentrasi di awal masa funded** — Tahap 1 dan 2 terjadi di minggu 0–2, dan keduanya menaikkan risiko sebelum beban stres sempat terakumulasi.
2. **Mengapa trader yang lolos cepat dengan risiko besar gagal lebih cepat** — mereka punya bukti skill lebih lemah (§4.6) *dan* kebiasaan risiko yang dikalibrasi lebih tinggi (§4.5).
3. **Mengapa "lebih disiplin" tidak berhasil** — Tahap 4 merusak inhibisi secara selektif (§8.3), yaitu fungsi yang tepat yang dibutuhkan disiplin.
4. **Mengapa sebagian trader freeze alih-alih blow-up** — Tahap 3 lewat jalur kortisol menghasilkan **penghindaran** risiko (§7.2), bukan pencarian risiko; keduanya adalah moda kegagalan, satu dramatis dan satu diam.
5. **Mengapa trader terus membeli ulang meskipun tahu statistiknya** — Tahap 5 beroperasi lewat jalur penguatan yang tidak dimediasi pengetahuan (§11.1–11.4).

---

## 13. Operasionalisasi: apa yang bisa diukur

Model di §12 hanya berguna kalau tahapannya dapat dideteksi sebelum kehancuran. Bagian ini menerjemahkan setiap mekanisme menjadi metrik yang dapat dihitung dari data akun atau instrumen tervalidasi.

### 13.1 Metrik perilaku dari data trade

Semua metrik berikut dapat dihitung dari log trade standar (waktu masuk, waktu keluar, ukuran, harga masuk, stop, P&L). Tidak ada yang memerlukan laporan diri.

| # | Metrik | Formula | Menandai | Ambang peringatan |
|---|---|---|---|---|
| 1 | **Rasio inflasi ukuran** | risiko rata-rata 10 trade pertama funded ÷ 10 trade terakhir fase 2 | Tahap 1: overconfidence (§9.1) | > 1,25 |
| 2 | **Rasio durasi disposition** | durasi median trade rugi ÷ durasi median trade untung | Tahap 2: disposition effect (§5.7) | > 1,3 |
| 3 | **PGR/PLR (Odean)** | (untung direalisasi ÷ peluang untung) ÷ (rugi direalisasi ÷ peluang rugi) | Tahap 2 (§5.7) | > 1,2 |
| 4 | **Revenge latency** | waktu median antara trade rugi dan trade berikutnya, dibagi waktu median antara trade normal | **Tahap 4: paling prediktif** (§11.5) | < 0,5 |
| 5 | **Rasio eskalasi ukuran** | ukuran trade N+1 ÷ ukuran trade N, dikondisikan pada trade N rugi | Tahap 4: loss chasing (§6.4) | > 1,2 |
| 6 | **Volatilitas ukuran posisi** | deviasi standar risiko-per-trade ÷ rata-rata | Tahap 3–4: hilangnya konsistensi | > 0,4 |
| 7 | **Integritas stop** | % trade dengan stop yang dipindahkan menjauh dari harga masuk | Tahap 4: loss aversion akut (§5.1) | > 5% |
| 8 | **Drift jarak stop** | jarak stop rata-rata bergulir 10-trade ÷ baseline fase 2 | Tahap 3: pelebaran di bawah stres | > 1,3 |
| 9 | **Kepatuhan jam trading** | % trade di luar jendela waktu yang direncanakan | Tahap 3: erosi proses | > 15% |
| 10 | **Rasio frekuensi trade** | trade/hari bergulir 5-hari ÷ baseline fase 2 | Tahap 1 (naik) atau 3 (turun) | < 0,5 atau > 1,5 |
| 11 | **Kedekatan barrier vs eksposur** | korelasi antara (jarak ke max DD) dan (risiko per trade) | §6.3: seharusnya **positif**; negatif = gambling for resurrection | korelasi < 0 |
| 12 | **Rasio near-miss** | (target − ekuitas puncak) ÷ target, saat pelanggaran | Tahap 5: risiko pembelian ulang (§11.1) | < 0,20 |

Metrik **#11** patut ditekankan. Grossman & Zhou (§6.5) menunjukkan bahwa kebijakan optimal di bawah batasan drawdown **menuntut pengurangan eksposur seiring kedekatan ke batas**. Artinya korelasi antara jarak-ke-barrier dan ukuran-posisi seharusnya **positif** pada trader yang berperilaku optimal. Korelasi negatif adalah tanda tangan langsung dari gambling for resurrection, dan ia dapat dihitung dari data tanpa mewawancarai siapa pun.

Metrik **#4** (revenge latency) kemungkinan merupakan sinyal peringatan dini tunggal terbaik, karena ia menangkap Tahap 4 **sebelum** ukuran posisi naik — jeda memendek sebelum taruhan membesar.

### 13.2 Instrumen psikometrik tervalidasi

Kalau sebuah program hendak mengukur konstruk psikologis, ia harus menggunakan instrumen yang sudah tervalidasi, bukan kuesioner buatan sendiri.

| Konstruk | Instrumen | Relevansi | Catatan |
|---|---|---|---|
| Regulasi emosi | **ERQ** (Emotion Regulation Questionnaire, Gross & John) | §10.2 — membedakan reappraisal vs suppression | Inti; memprediksi keunggulan performa |
| Masalah judi | **PGSI** (Problem Gambling Severity Index) atau kriteria DSM-5 | §11.3 — skrining subpopulasi | **Wajib** untuk program yang bertanggung jawab |
| Impulsivitas | **BIS-11** (Barratt Impulsiveness Scale) | §10.3 — memoderasi efek mindfulness | Menentukan siapa yang diuntungkan intervensi apa |
| Sikap risiko | **DOSPERT** (Domain-Specific Risk-Taking Scale) | §7.2 — baseline preferensi risiko | Ukur ulang berkala: preferensi tidak stabil |
| Kecemasan sifat | **STAI-T** | §8.3 — memprediksi kerentanan choking | |
| Kualitas tidur | **PSQI** (Pittsburgh Sleep Quality Index) | §7.4 — memprediksi pergeseran ke pengejaran untung | Murah, prediktif |
| Stres yang dirasakan | **PSS-10** (Perceived Stress Scale) | §7.1–7.2 | Proksi untuk beban kortisol |
| Overconfidence / kalibrasi | Tugas kalibrasi interval keyakinan | §9.1 | Tidak ada instrumen standar; tugas kustom |

**Catatan penting:** biomarker seperti kortisol saliva (§7.1) menarik tetapi mahal, memerlukan penanganan laboratorium, dan sangat bervariasi menurut waktu hari. Untuk program non-riset, **PSQI + PSS-10 adalah proksi yang jauh lebih praktis** dan menangkap sebagian besar varians yang dapat ditindaklanjuti.

### 13.3 Skrining sebagai kewajiban etis

Karena §11.3, program apa pun yang bekerja dengan funded trader **harus** menyertakan skrining masalah judi, dengan jalur rujukan yang jelas.

Alasannya praktis, bukan hanya etis: **subpopulasi ini tidak akan mendapat manfaat dari pelatihan trading.** Mengajari manajemen risiko kepada seseorang yang memenuhi kriteria gangguan judi bukan hanya tidak efektif — ia dapat berbahaya, karena memberikan kerangka teknis yang membenarkan kelanjutan. Rujukan klinis adalah respons yang benar, dan skrining adalah satu-satunya cara mengidentifikasinya.

### 13.4 Desain studi yang seharusnya dijalankan

Karena §2.2 menetapkan bahwa tidak ada studi langsung, berikut spesifikasi studi yang akan menjawab pertanyaan ini secara definitif:

**Desain:** kohort prospektif dengan eksperimen tertanam.

- **N:** minimum 2.000 trader yang lolos evaluasi, diikuti 12 bulan.
- **Pra-registrasi:** hipotesis, metrik utama, dan rencana analisis didaftarkan sebelum pengumpulan data (OSF atau setara).
- **Ukuran hasil utama:** kelangsungan hidup akun pada 180 hari; hasil sekunder: jumlah payout, Sharpe funded vs challenge.
- **Prediktor:** 12 metrik perilaku (§13.1) diukur berkelanjutan + 8 instrumen psikometrik (§13.2) pada baseline, 30, 90, 180 hari.
- **Eksperimen tertanam (randomisasi pada level trader):**
  - **Lengan A (kontrol):** aturan standar.
  - **Lengan B:** batas ukuran posisi hard-coded, di-ramp selama 30 hari (uji §14.1 / Heimer & Imas).
  - **Lengan C:** penguncian otomatis setelah −2R harian (uji §14.1 / Tahap 4).
  - **Lengan D:** umpan balik P&L yang dikurangi frekuensinya — ringkasan mingguan alih-alih dashboard real-time (uji §5.8 / Gneezy & Potters).
  - **Lengan E:** protokol implementation intentions (uji §14.2 / Gollwitzer & Sheeran).
- **Analisis:** intention-to-treat; model bahaya proporsional Cox untuk kelangsungan akun; koreksi pengujian berganda.
- **Kontrol yang krusial:** stratifikasi berdasarkan **Sharpe challenge dan volatilitas challenge**, karena §4 menunjukkan keduanya memprediksi hasil funded secara independen dari psikologi. Tanpa stratifikasi ini, setiap efek perilaku akan terkonfound dengan seleksi.

Studi ini dapat dijalankan oleh satu perusahaan prop berukuran sedang dalam 18 bulan dengan biaya moderat. Ketiadaannya adalah pilihan, bukan kendala.

---

## 14. Intervensi berbasis bukti, diurutkan menurut kekuatan bukti

Bagian ini diurutkan dengan sengaja: **struktural lebih dulu, kognitif kedua, fisiologis ketiga.** Urutan itu mengikuti bukti, dan ia kebalikan dari urutan yang ditawarkan sebagian besar konten psikologi trading.

### 14.1 Tier 1 — Intervensi struktural **[A]**

Intervensi ini bekerja dengan **menghapus keputusan dari momen panas**. Ia tidak memerlukan trader untuk lebih disiplin, tenang, atau sadar. Itulah kenapa ia bekerja.

#### (a) Batas leverage dan ukuran posisi yang di-hardcode — **bukti terkuat dalam dokumen ini**

Heimer & Imas (2022, *Review of Financial Studies* 35(4):1643–1681) meneliti regulasi yang membatasi penyediaan leverage kepada trader ritel di pasar forex AS.

Temuan:
- Pembatasan leverage **memperbaiki performa trading**.
- **Kerugian trader high-leverage turun 40%.**
- Mekanismenya: dengan menaikkan biaya oportunitas menunda realisasi kerugian, batasan leverage **memperbaiki market timing dan mengurangi disposition effect**.
- Direplikasi di dua latar eksperimental terpisah untuk mengisolasi mekanisme.

Perhatikan mekanismenya — ini bukan sekadar "risiko lebih kecil berarti kerugian lebih kecil". Batasan itu **mengubah perilaku bias**, bukan hanya membatasi konsekuensinya. Itu temuan yang lebih kuat dan lebih berguna.

**Implementasi untuk funded trader:**
- Ukuran posisi maksimum yang dikodekan di platform, bukan di rencana trading.
- Ramp-up bertahap: 30 hari pertama di 50% ukuran normal, naik hanya setelah kriteria berbasis proses terpenuhi (bukan berbasis P&L).
- Langsung menyerang Tahap 1 (§12) dan memotong lonjakan P(ruin) dari inflasi ukuran (§9.5).

#### (b) Penguncian otomatis setelah kerugian berurutan

Ini menyerang Tahap 4, satu-satunya tahap di mana intervensi kognitif dapat diprediksi akan gagal — karena §8.3 menetapkan bahwa **inhibisi** adalah fungsi eksekutif yang secara selektif dirusak kecemasan. Meminta trader menghentikan diri sendiri pada momen itu adalah meminta fungsi yang sedang terganggu untuk memperbaiki dirinya sendiri.

**Implementasi:**
- Penguncian keras setelah −2R harian atau 2 kerugian berurutan, ditegakkan platform.
- Durasi minimum: sisa sesi.
- Kunci harus **tidak dapat dibatalkan trader saat itu juga** — kalau bisa dibatalkan, ia bukan kendala.

Bukti tidak langsung: Ariely & Wertenbroch (2002, *Psychological Science* ○) menunjukkan orang **secara sukarela memilih tenggat yang mengikat** ketika memahami masalah pengendalian diri mereka sendiri, dan bahwa tenggat yang mengikat memperbaiki performa. Trader yang menandatangani aturan ini saat tenang sedang menggunakan dirinya-yang-tenang untuk mengikat dirinya-yang-panik — Ulysses dan tiang kapal.

#### (c) Kurangi frekuensi evaluasi **[A dengan kualifikasi replikasi]**

Gneezy & Potters (1997) dan Thaler dkk. (1997) menunjukkan umpan balik yang lebih jarang menghasilkan pengambilan risiko yang lebih baik dan return yang lebih tinggi (§5.8). Fellner & Sutter (2009, ○) menemukan bahwa ketika diberi pilihan, orang cenderung memilih frekuensi evaluasi yang **terlalu tinggi** — yaitu, tidak akan memilih ini sendiri.

**Implementasi:**
- Sembunyikan P&L floating selama sesi; tampilkan hanya di penutupan.
- Ganti tampilan mata uang dengan **R-multiple** (kelipatan risiko) — ini mengurangi kesalahan bingkai dan menetralkan efek ukuran akun.
- Tinjauan mingguan alih-alih harian untuk keputusan strategi.

**Kualifikasi:** §5.8 mencatat kegagalan replikasi untuk myopic loss aversion. Perlakukan ini sebagai **kemungkinan bermanfaat, belum terbukti** — layak dimasukkan ke lengan D dari studi di §13.4.

#### (d) Checklist pra-trade

Haynes dkk. (2009, *NEJM* ○) mendokumentasikan bahwa checklist keselamatan bedah 19-item menurunkan komplikasi dan mortalitas secara substansial di delapan rumah sakit lintas negara — pada populasi ahli yang sangat terlatih.

Prinsip yang ditransfer: **checklist bekerja bukan dengan mengajarkan hal baru, tetapi dengan memastikan yang sudah diketahui benar-benar dilakukan di bawah tekanan.** Itu persis masalah Tahap 4.

Checklist trading harus **berbasis proses, pendek, dan dapat diverifikasi**: ukuran dihitung? stop ditempatkan sebelum masuk? setup cocok dengan kriteria tertulis? jumlah trade hari ini di bawah batas? Bukan "apakah saya merasa tenang?" — itu tidak dapat diverifikasi.

### 14.2 Tier 2 — Intervensi kognitif **[A–B]**

#### (a) Implementation intentions — rencana "jika-maka" **[A]**

Gollwitzer (1999, ○) dan Gollwitzer & Sheeran (2006, ○) — meta-analisis **94 studi independen, >8.000 partisipan** — menemukan efek berukuran sedang-hingga-besar pada pencapaian tujuan: **d = 0,65**. Yang penting, efeknya tidak menyusut ke nol seiring pertambahan ukuran sampel, tanda ketahanan terhadap bias publikasi.

Bentuknya: *"Jika situasi Y ditemui, maka saya akan memulai perilaku X."*

Mekanismenya (didukung dalam meta-analisis): pembentukan implementation intention **menaikkan aksesibilitas kesempatan yang ditentukan** dan **mengotomatiskan respons yang sesuai**. Ini penting — ia memindahkan perilaku dari kendali sadar (yang terganggu di Tahap 4) ke pemicuan otomatis (yang tidak).

Meta-analisis juga menemukan efektivitas untuk **pelepasan diri dari arah tindakan yang gagal** — persis yang dibutuhkan untuk §11.4.

**Contoh untuk funded trader** (spesifik, situasional, dapat dieksekusi):
- "Jika saya rugi 2R hari ini, maka saya menutup platform dan berjalan keluar selama 30 menit."
- "Jika saya mendapati diri memindahkan stop menjauh, maka saya langsung menutup posisi pada harga pasar."
- "Jika ekuitas dalam 3% dari batas drawdown, maka ukuran posisi turun ke sepertiga sampai ekuitas pulih 5%."
- "Jika saya trading lebih dari 5 kali sebelum jam 12, maka sisa hari adalah no-trade."

Kunci desainnya: **situasi pemicunya harus dapat diamati secara objektif**, bukan bersifat perasaan. "Jika saya merasa frustrasi" adalah implementation intention yang buruk. "Jika dua kerugian berurutan" adalah yang baik.

#### (b) Pelatihan debiasing **[B]**

Morewedge dkk. (2015, *Policy Insights from the Behavioral and Brain Sciences* 2(1):129–140) menjalankan dua eksperimen longitudinal dengan intervensi pelatihan sekali-jalan — sebuah permainan komputer atau video instruksional.

Hasil:
- Efek langsung berukuran sedang hingga besar: **permainan ≥ −31,94%** pengurangan bias, **video ≥ −18,60%**.
- **Bertahan setidaknya 2 bulan kemudian**: permainan ≥ −23,57%, video ≥ −19,20%.
- **Permainan mengungguli video** — umpan balik yang dipersonalisasi dan latihan penting.
- **Efeknya bersifat domain-umum**: pengurangan bias terjadi lintas masalah dalam konteks berbeda dan format yang tidak diajarkan.

Sellier, Scopelliti & Morewedge (2019, *Psychological Science* ○) menemukan efek pelatihan ini **ditransfer ke pengambilan keputusan di lapangan**, bukan hanya ke tugas lab.

Ini adalah salah satu intervensi kognitif dengan bukti terbaik yang tersedia. Implikasinya untuk pelatihan trader: **latihan interaktif dengan umpan balik personal mengungguli konten video**, dan efek satu intervensi yang dirancang baik bertahan berbulan-bulan.

#### (c) Reappraisal, bukan suppression **[B]**

Dari §10.2: trader berkinerja tinggi menggunakan regulasi **berfokus-anteseden**. Implementasinya adalah melatih **reappraisal kognitif** secara spesifik:

- Membingkai ulang trade sebagai **satu sampel dari distribusi**, bukan sebagai verdict.
- Membingkai ulang drawdown sebagai **biaya operasi yang diharapkan**, bukan sebagai kesalahan.
- Melacak **kualitas keputusan secara terpisah dari hasil** — jurnal yang menilai proses, dengan hasil dicatat tapi tidak dinilai.

Poin terakhir ini menyerang langsung masalah lingkungan validitas rendah (§9.3): kalau umpan balik dari hasil menyesatkan, satu-satunya umpan balik yang bermakna adalah dari proses. Jurnal yang mencatat "apakah saya mengikuti rencana saya" menghasilkan sinyal yang jauh lebih bersih daripada jurnal yang mencatat P&L.

**Yang harus dihindari:** instruksi untuk "tetap tenang", "kendalikan emosimu", atau "jangan bereaksi". Semua itu adalah supresi — strategi yang dalam taksonomi Gross paling mahal dan paling tidak efektif (§10.2).

### 14.3 Tier 3 — Intervensi fisiologis **[B–C]**

Bukti di sini bersifat **tidak langsung**: mekanismenya terbukti (§7), tetapi tidak ada uji coba yang menunjukkan intervensi tidur memperbaiki hasil trading secara spesifik. Diperlakukan sebagai inferensi yang beralasan, bukan temuan.

| Intervensi | Dasar bukti | Kekuatan |
|---|---|---|
| **Jadwal tidur yang dilindungi** | Venkatraman dkk. — kurang tidur menggeser ke pengejaran untung, tidak terdeteksi introspeksi (§7.4) | **B** untuk mekanisme, C untuk aplikasi |
| **Pisahkan modal trading dari biaya hidup** | Mani dkk. — kelangkaan menyita bandwidth kognitif (§7.5) | B dengan kualifikasi |
| **Kurangi total beban varians** | Coates & Herbert — kortisol naik dengan varians, bukan arah (§7.1) | B untuk mekanisme |
| **Latihan aerobik teratur** | Literatur umum reaktivitas stres | C |
| **Biofeedback HRV** | Lehrer & Gevirtz (○) — bukti untuk regulasi stres umum | C untuk trading |

Yang paling dapat ditindaklanjuti adalah yang pertama, karena §7.4 menunjukkan **introspeksi tidak dapat mendeteksi efeknya**. Trader tidak dapat menilai sendiri apakah ia cukup tidur untuk trading; ia harus mengukurnya dan memberlakukan aturan.

### 14.4 Tier 4 — Perubahan desain akun (untuk perusahaan)

Ini di luar kendali trader individual, tetapi mengikuti langsung dari analisis:

| Perubahan | Mengatasi | Dasar |
|---|---|---|
| Perpanjang jendela evaluasi; hapus batas waktu | Inversi seleksi — batas waktu menghukum kehati-hatian (§4.4) | §4.4 MC: kegagalan waktu 64,8% pada vol rendah |
| Bobot pada **konsistensi** daripada kecepatan mencapai target | Mengurangi hadiah untuk varians tinggi (§4.5) | §4.5 |
| Ganti trailing drawdown dengan drawdown statis | Menghilangkan ratchet yang mengunci acuan di puncak (§6.5) | §6.5 |
| Pengurangan risiko otomatis setelah payout | Melawan house money effect (§5.5) | §5.5 |
| Batas ukuran posisi yang di-ramp untuk 30 hari pertama | Tahap 1 — inflasi ukuran (§9.5) | Heimer & Imas |
| Periode pendinginan wajib setelah kegagalan | Tahap 5 — near-miss dan sunk cost (§11.1, §11.4) | Clark dkk. |
| Skrining PGSI sebelum pembelian ke-3 | §11.3 — identifikasi subpopulasi berisiko | Grall-Bronnec |

### 14.5 Yang **tidak** didukung bukti kuat

Bagian ini sama pentingnya dengan yang di atas, karena setiap jam dan rupiah yang dikeluarkan di sini tidak tersedia untuk Tier 1.

| Klaim populer | Status |
|---|---|
| "Latih otot disiplin / kelola willpower-mu" | **Dibatalkan** — ego depletion gagal replikasi, d=0,04 pada 23 lab; null pada 36 lab (§7.6) |
| "Batasi keputusan harian untuk menghemat willpower" | Tidak didukung — mekanismenya sama yang gagal replikasi |
| "Mindfulness memperbaiki trading" | **Terkualifikasi** — bergantung konteks; satu RCT menemukan underperformance −35,4% di lingkungan tertentu (§10.3) |
| "Tetap tenang, kendalikan emosimu" | **Kontraproduktif** — ini supresi, strategi paling mahal dan paling tidak efektif (§10.2) |
| "Temukan tipe kepribadian trader yang tepat" | Tidak didukung — Lo dkk. tidak menemukan profil kepribadian trader (§10.1) |
| "Cukup 10.000 jam latihan" | **Terkualifikasi** — Macnamara dkk. (○) meta-analisis menemukan deliberate practice menjelaskan varians yang jauh lebih kecil dari klaim; dan §9.3 menunjukkan trading tidak memenuhi syarat lingkungan untuk itu |
| "Yerkes-Dodson: cari level arousal optimal" | **Terlalu diperluas** — temuan 1908 pada tikus, sering digeneralisasi jauh melampaui bukti |
| "Visualisasi dan afirmasi" | Tidak ada bukti untuk performa trading; Oettingen (○) menunjukkan fantasi positif saja dapat **menurunkan** usaha |

---

## 15. Protokol transisi 30 hari: challenge → funded

Protokol ini adalah **turunan terapan** dari bukti di atas, bukan temuan riset. Setiap elemen ditautkan ke bagian sumbernya sehingga pembaca dapat menilai dasarnya sendiri. Ia belum diuji sebagai paket; ia adalah hipotesis yang dapat diuji, dan lengan-lengannya sesuai dengan desain studi di §13.4.

### Prinsip desain

1. **Utamakan kendala keras di atas kehendak.** Setiap aturan yang bergantung pada trader "memilih dengan benar saat tertekan" akan gagal di Tahap 4 (§8.3).
2. **Kalibrasi ulang ukuran secara eksplisit.** Kebiasaan risiko yang dibangun selama challenge dioptimalkan untuk permainan yang salah (§4.5).
3. **Pisahkan kualitas keputusan dari hasil.** Lingkungan validitas rendah membuat umpan balik hasil menyesatkan (§9.3).
4. **Antisipasi bahwa Anda adalah pengambil keputusan yang berbeda.** Preferensi risiko akan bergeser secara terukur (§7.2).

### Hari −7 sampai 0 — sebelum akun aktif

| Tindakan | Dasar |
|---|---|
| Tulis rencana trading tertulis: setup, ukuran, jam, batas harian, batas mingguan | Landasan untuk semua yang lain |
| Tetapkan ukuran funded pada **50% dari ukuran challenge**, tertulis dan terkunci | §4.5 inversi seleksi; §9.5 biaya inflasi ukuran |
| Tulis 5 implementation intention dengan pemicu **yang dapat diamati secara objektif** | §14.2(a), d=0,65 |
| Siapkan penguncian otomatis: −2R harian, tidak dapat dibatalkan saat itu | §14.1(b); §8.3 inhibisi terganggu |
| Hitung baseline 12 metrik (§13.1) dari data fase 2 | Tanpa baseline, tidak ada deteksi drift |
| Isi PSQI, PSS-10, ERQ, PGSI | §13.2; §13.3 |
| Konfirmasi: **tidak ada biaya hidup yang bergantung pada payout selama 6 bulan** | §7.5 kelangkaan |

### Hari 1–10 — fase kalibrasi ulang

Ini adalah jendela di mana Tahap 1 dan 2 (§12) terjadi. Tujuannya bukan menghasilkan uang; tujuannya adalah **tidak menghancurkan akun sementara titik acuan menemukan tempat barunya**.

| Aturan | Dasar |
|---|---|
| Ukuran tetap di 50%. Tidak ada kenaikan apa pun, terlepas dari hasil. | §9.1 overconfidence memuncak persis sekarang |
| Maksimum 2 trade per hari | §8.3 membatasi ruang untuk kegagalan inhibisi |
| Tampilkan P&L sebagai **R-multiple saja**, sembunyikan nilai mata uang | §5.8; §14.1(c) |
| Jurnal harian menilai **proses saja** (ikut rencana: ya/tidak), hasil dicatat tapi tidak dinilai | §9.3 umpan balik hasil menyesatkan |
| Hitung metrik #1 (rasio inflasi ukuran) pada hari 10 | §13.1 deteksi Tahap 1 |
| Jam tidur dilacak setiap hari | §7.4 introspeksi tidak dapat mendeteksi |

**Gerbang untuk melanjutkan ke hari 11:** metrik #1 < 1,1, metrik #7 (integritas stop) = 0%, kepatuhan rencana ≥ 90%. **Gerbangnya berbasis proses, bukan berbasis P&L.** Trader yang untung besar dengan melanggar rencana **tidak** lolos gerbang — karena §4 menunjukkan P&L 10 hari tidak mengandung informasi.

### Hari 11–20 — fase konsolidasi

| Aturan | Dasar |
|---|---|
| Ukuran naik ke 65% **hanya kalau gerbang hari 10 terlampaui** | Ramp bertahap, §14.1(a) |
| Maksimum 3 trade per hari | |
| Aturan jarak-ke-barrier aktif: kalau ekuitas dalam 3% dari batas DD, ukuran turun ke sepertiga | §6.3 gambling for resurrection; §6.5 Grossman & Zhou |
| Tinjauan mingguan, bukan harian, untuk keputusan strategi | §5.8 |
| Hitung metrik #2, #4, #5 (disposition, revenge latency, eskalasi) | §13.1 deteksi Tahap 2 dan 4 |
| Latihan reappraisal terjadwal: 10 menit, membingkai ulang trade minggu itu sebagai sampel distribusi | §10.2; §14.2(c) |

**Pemicu penghentian:** metrik #4 (revenge latency) < 0,5 **pada titik mana pun** memicu 48 jam tanpa trading dan tinjauan tertulis. Ini bukan hukuman; ini adalah sinyal Tahap 4 yang paling dini yang dapat diukur (§13.1).

### Hari 21–30 — fase normalisasi

| Aturan | Dasar |
|---|---|
| Ukuran naik ke 80% kalau gerbang hari 20 terlampaui | |
| Ukuran penuh **tidak sebelum hari 60**, dan hanya dengan metrik #6 (volatilitas ukuran) < 0,3 | §4.6 — 30 hari tidak mengandung bukti skill |
| Setelah payout pertama: **turunkan ukuran ke 65% selama 5 hari** | §5.5 house money effect — ini melawan mekanisme yang terdokumentasi |
| Tinjauan bulanan penuh: 12 metrik + ulangi PSS-10 dan PSQI | §13.2 |

Aturan "turunkan ukuran setelah payout" akan terasa salah bagi trader — ia terasa seperti menghukum keberhasilan. Justru itu intinya: house money effect (§5.5) memprediksi kenaikan risiko pada momen itu secara spesifik, dan aturan yang terasa berlawanan intuisi adalah aturan yang melawan bias, bukan yang mengikutinya.

### Apa yang protokol ini tidak lakukan

Ia tidak memperbaiki ketiadaan edge. Kalau trader termasuk dalam ~59% kolam funded yang ber-Sharpe nol (§4.4), protokol ini akan **memperlambat** kegagalan dan membuatnya lebih terukur — tapi tidak mencegahnya, karena §4.3 menunjukkan P(ruin) = 100% untuk edge nol.

Itu bukan kegagalan protokol. Itu adalah informasi. Trader yang mengikuti protokol ini dengan patuh selama 6 bulan dan tetap tidak profitabel telah memperoleh sesuatu yang berharga: **bukti bahwa masalahnya bukan psikologi.** Dan itu, menurut §4, adalah kesimpulan yang benar untuk mayoritas.

---

## 16. Batasan riset ini dan agenda riset ke depan

### 16.1 Batasan yang harus dinyatakan

1. **Tidak ada bukti langsung.** Seperti ditetapkan di §2.2, tidak ada studi peer-review pada populasi funded trader prop firm ritel. Seluruh argumen bersifat ekstrapolasi dari populasi yang bersebelahan. Ekstrapolasi itu beralasan tetapi tidak terverifikasi.

2. **Base rate industri tidak diaudit.** Setiap angka di §3.1 bertanda **[D]**. Ia berasal dari pihak dengan kepentingan komersial, definisinya tidak terstandardisasi, dan tidak ada yang dapat diverifikasi secara independen. Kalibrasi di §4.4 — yang merupakan temuan kuantitatif sentral dokumen ini — **bergantung pada angka-angka ini**. Kalau pass rate sebenarnya jauh berbeda, komposisi kolam funded juga berbeda.

3. **Model Monte Carlo mengasumsikan return Gaussian dan parameter konstan.** Return trading nyata memiliki ekor gemuk, skewness negatif, dan volatilitas yang mengelompok. Semua ini **memburukkan** angka survival, artinya tabel di §4.3 dan §4.4 kemungkinan **optimistis**. Model juga mengasumsikan Sharpe dan volatilitas konstan — asumsi yang seluruh §5–§11 argumentasikan sebagai salah.

4. **Ukuran efek dari lab mungkin tidak mentransfer.** Efek yang diukur pada mahasiswa dengan taruhan kecil mungkin lebih besar, lebih kecil, atau berbeda bentuk pada trader dengan taruhan besar. Pope & Schweitzer (§8.4) memberi alasan untuk optimisme bahwa arahnya bertahan; besarannya tetap tidak pasti.

5. **Krisis replikasi menyentuh beberapa literatur yang dikutip.** Ego depletion telah dibatalkan secara eksplisit (§7.6). Myopic loss aversion memiliki kegagalan replikasi yang terdokumentasi (§5.8). Mani dkk. memiliki kritik metodologis substantif (§7.5). Ini dinyatakan di tempatnya, tetapi pembaca harus berasumsi bahwa **sebagian dari apa yang dikutip di sini akan tidak bertahan** dalam sepuluh tahun.

6. **Sitasi bertanda ○ belum diverifikasi baris per baris** (§2.4).

7. **Dokumen ini tidak mengandung nasihat investasi.** Ia adalah tinjauan literatur dan analisis kuantitatif. Trading berleverage berisiko kehilangan seluruh modal.

### 16.2 Celah riset yang paling berharga

Diurutkan menurut rasio nilai-terhadap-biaya:

1. **Perbandingan langsung perilaku challenge vs funded pada trader yang sama.** Data ini sudah ada di server setiap perusahaan prop. Analisisnya sepele. Ia akan menguji secara langsung setiap prediksi di §12. **Tidak ada alasan teknis mengapa ini belum dilakukan.**

2. **Eksperimen teracak pada batas ukuran posisi** (lengan B di §13.4). Menguji apakah temuan Heimer & Imas mentransfer ke populasi ini.

3. **Efek trailing vs static drawdown pada perilaku.** §6.5 memprediksi trailing drawdown memburukkan perilaku lewat penguncian acuan. Ini dapat diuji dengan randomisasi sederhana.

4. **Nilai prediktif dari revenge latency.** §13.1 mengusulkan ini sebagai sinyal peringatan dini terbaik. Memvalidasinya memerlukan satu analisis survival pada data yang sudah ada.

5. **Prevalensi gangguan judi pada populasi funded trader.** Belum diketahui. Konsekuensinya besar untuk kebijakan (§11.3, §13.3).

6. **Efek aturan konsistensi.** Tidak ada literatur sama sekali (§6.6).

7. **Apakah kortisol funded trader benar-benar naik relatif terhadap challenge trader.** Desain yang mahal tapi definitif untuk §7.2.

### 16.3 Pertanyaan yang seharusnya diajukan industri kepada dirinya sendiri

Kalau §4.4 kurang-lebih benar — bahwa proses evaluasi dua fase hanya menaikkan proporsi trader terampil dari 10% menjadi 18%, dan menghasilkan kolam yang 59% ber-edge nol — maka **evaluasinya tidak melakukan apa yang diklaimnya**.

Itu bukan tuduhan kecurangan. Ini adalah konsekuensi matematis dari ukuran sampel (§4.6) dan batas waktu (§4.4), dan ia dapat diperbaiki dengan perubahan desain yang tercantum di §14.4. Perusahaan yang memperbaikinya akan memiliki kolam trader yang lebih baik, retensi yang lebih tinggi, dan — kalau model bisnisnya benar-benar bagi hasil trading — ekonomi yang lebih baik.

Bahwa perubahan itu belum meluas adalah fakta tentang model bisnis, bukan tentang psikologi trader.

---

## Lampiran A — Daftar pustaka

**Kunci verifikasi:** ✔ = detail bibliografis diverifikasi lewat pencarian literatur saat penyusunan dokumen ini · ○ = dari pengetahuan umum bidang, **detail volume/halaman belum diverifikasi** dan harus dicek sebelum penggunaan akademis formal.

### A.1 Prospect theory, titik acuan, dan mental accounting

| | Rujukan | Dipakai di |
|---|---|---|
| ○ | Kahneman, D., & Tversky, A. (1979). Prospect theory: An analysis of decision under risk. *Econometrica*, 47(2), 263–291. | §5.1 |
| ○ | Tversky, A., & Kahneman, A. (1992). Advances in prospect theory: Cumulative representation of uncertainty. *Journal of Risk and Uncertainty*, 5, 297–323. | §5.1 |
| ✔ | **Heath, C., Larrick, R. P., & Wu, G. (1999). Goals as reference points. *Cognitive Psychology*, 38(1), 79–109.** | §5.2, §6.5 |
| ✔ | **Thaler, R. H., & Johnson, E. J. (1990). Gambling with the house money and trying to break even: The effects of prior outcomes on risky choice. *Management Science*, 36(6), 643–660.** | §5.5 |
| ○ | Kahneman, D., Knetsch, J. L., & Thaler, R. H. (1990). Experimental tests of the endowment effect and the Coase theorem. *Journal of Political Economy*, 98(6), 1325–1348. | §5.4 |
| ○ | Thaler, R. H. (1999). Mental accounting matters. *Journal of Behavioral Decision Making*, 12(3), 183–206. | §5.6 |
| ○ | Kivetz, R., Urminsky, O., & Zheng, Y. (2006). The goal-gradient hypothesis resurrected. *Journal of Marketing Research*, 43(1), 39–58. | §5.2 |
| ○ | Loewenstein, G., Weber, E. U., Hsee, C. K., & Welch, N. (2001). Risk as feelings. *Psychological Bulletin*, 127(2), 267–286. | §10.4 |

### A.2 Disposition effect dan realization utility

| | Rujukan | Dipakai di |
|---|---|---|
| ○ | Shefrin, H., & Statman, M. (1985). The disposition to sell winners too early and ride losers too long. *Journal of Finance*, 40(3), 777–790. | §5.7 |
| ○ | Odean, T. (1998). Are investors reluctant to realize their losses? *Journal of Finance*, 53(5), 1775–1798. | §5.7, §13.1 |
| ✔ | **Locke, P. R., & Mann, S. C. (2005). Professional trader discipline and trade disposition. *Journal of Financial Economics*, 76(2), 401–444.** | §5.7 |
| ✔ | **Imas, A. (2016). The realization effect: Risk-taking after realized versus paper losses. *American Economic Review*, 106(8), 2086–2109.** | §5.6, §12 |
| ○ | Barberis, N., & Xiong, W. (2009). What drives the disposition effect? *Journal of Finance*, 64(2), 751–784. | §5.6 |
| ○ | Weber, M., & Camerer, C. F. (1998). The disposition effect in securities trading. *Journal of Economic Behavior & Organization*, 33(2), 167–184. | §5.7 |

### A.3 Overconfidence, self-attribution, dan pembelajaran

| | Rujukan | Dipakai di |
|---|---|---|
| ✔ | **Gervais, S., & Odean, T. (2001). Learning to be overconfident. *Review of Financial Studies*, 14(1), 1–27.** | §9.1, §12 |
| ○ | Daniel, K., Hirshleifer, D., & Subrahmanyam, A. (1998). Investor psychology and security market under- and overreactions. *Journal of Finance*, 53(6), 1839–1885. | §9.1 |
| ✔ | **Fenton-O'Creevy, M., Nicholson, N., Soane, E., & Willman, P. (2003). Trading on illusions: Unrealistic perceptions of control and trading performance. *Journal of Occupational and Organizational Psychology*, 76(1), 53–68.** | §9.2 |
| ○ | Langer, E. J. (1975). The illusion of control. *Journal of Personality and Social Psychology*, 32(2), 311–328. | §9.2 |
| ✔ | **Kahneman, D., & Klein, G. (2009). Conditions for intuitive expertise: A failure to disagree. *American Psychologist*, 64(6), 515–526.** | §9.3 |
| ✔ | **Seru, A., Shumway, T., & Stoffman, N. (2010). Learning by trading. *Review of Financial Studies*, 23(2), 705–739.** | §9.4, §4.9 |
| ○ | Odean, T. (1999). Do investors trade too much? *American Economic Review*, 89(6), 1279–1298. | §9.5 |
| ○ | Barber, B. M., & Odean, T. (2000). Trading is hazardous to your wealth. *Journal of Finance*, 55(2), 773–806. | §9.5 |
| ○ | Barber, B. M., & Odean, T. (2001). Boys will be boys: Gender, overconfidence, and common stock investment. *Quarterly Journal of Economics*, 116(1), 261–292. | §9.5 |
| ○ | Macnamara, B. N., Hambrick, D. Z., & Oswald, F. L. (2014). Deliberate practice and performance: A meta-analysis. *Psychological Science*, 25(8), 1608–1618. | §14.5 |

### A.4 Trader profesional: perilaku lapangan

| | Rujukan | Dipakai di |
|---|---|---|
| ✔ | **Coval, J. D., & Shumway, T. (2005). Do behavioral biases affect prices? *Journal of Finance*, 60(1), 1–34.** | §6.4, §11.5 |
| ✔ | **Lo, A. W., Repin, D. V., & Steenbarger, B. N. (2005). Fear and greed in financial markets: A clinical study of day-traders. *American Economic Review*, 95(2), 352–359.** | §10.1 |
| ○ | Lo, A. W., & Repin, D. V. (2002). The psychophysiology of real-time financial risk processing. *Journal of Cognitive Neuroscience*, 14(3), 323–339. | §10.1 |
| ✔ | **Fenton-O'Creevy, M., Soane, E., Nicholson, N., & Willman, P. (2011). Thinking, feeling and deciding: The influence of emotions on the decision making and performance of traders. *Journal of Organizational Behavior*, 32(8), 1044–1061.** | §10.2 |
| ✔ | **Barber, B. M., Lee, Y.-T., Liu, Y.-J., & Odean, T. (2014). The cross-section of speculator skill: Evidence from day trading. *Journal of Financial Markets*, 18, 1–24.** | §1, §11.3 |
| ○ | Barber, B. M., Lee, Y.-T., Liu, Y.-J., & Odean, T. (2009). Just how much do individual investors lose by trading? *Review of Financial Studies*, 22(2), 609–632. | §11.3 |

### A.5 Turnamen, insentif, dan batasan risiko

| | Rujukan | Dipakai di |
|---|---|---|
| ✔ | **Brown, K. C., Harlow, W. V., & Starks, L. T. (1996). Of tournaments and temptations: An analysis of managerial incentives in the mutual fund industry. *Journal of Finance*, 51(1), 85–110.** | §6.1 |
| ○ | Chevalier, J., & Ellison, G. (1997). Risk taking by mutual funds as a response to incentives. *Journal of Political Economy*, 105(6), 1167–1200. | §6.1 |
| ○ | Lazear, E. P., & Rosen, S. (1981). Rank-order tournaments as optimum labor contracts. *Journal of Political Economy*, 89(5), 841–864. | §6.1 |
| ○ | Genakos, C., & Pagliero, M. (2012). Interim rankings and risk taking in sequential tournaments. *Journal of Political Economy*, 120(4), 782–813. | §6.1 |
| ○ | Grossman, S. J., & Zhou, Z. (1993). Optimal investment strategies for controlling drawdowns. *Mathematical Finance*, 3(3), 241–276. | §6.5, §13.1 |
| ✔ | **Heimer, R. Z., & Imas, A. (2022). Biased by choice: How financial constraints can reduce financial mistakes. *Review of Financial Studies*, 35(4), 1643–1681.** | §14.1(a) |

### A.6 Statistik seleksi dan overfitting

| | Rujukan | Dipakai di |
|---|---|---|
| ✔ | **Bailey, D. H., & López de Prado, M. (2012). The Sharpe ratio efficient frontier. *Journal of Risk*, 15(2), 3–44.** *(Minimum Track Record Length)* | §4.6 |
| ✔ | **Bailey, D. H., & López de Prado, M. (2014). The deflated Sharpe ratio: Correcting for selection bias, backtest overfitting, and non-normality. *Journal of Portfolio Management*, 40(5), 94–107.** | §4.7 |
| ✔ | **Bailey, D. H., Borwein, J. M., López de Prado, M., & Zhu, Q. J. (2014). Pseudo-mathematics and financial charlatanism: The effects of backtest overfitting on out-of-sample performance. *Notices of the AMS*, 61(5), 458–471.** | §4.7 |
| ○ | Barras, L., Scaillet, O., & Wermers, R. (2010). False discoveries in mutual fund performance. *Journal of Finance*, 65(1), 179–216. | §4.7 |
| ○ | Harvey, C. R., & Liu, Y. (2015). Backtesting. *Journal of Portfolio Management*, 42(1), 13–28. | §4.7 |

### A.7 Stres, endokrinologi, dan tidur

| | Rujukan | Dipakai di |
|---|---|---|
| ✔ | **Coates, J. M., & Herbert, J. (2008). Endogenous steroids and financial risk taking on a London trading floor. *PNAS*, 105(16), 6167–6172.** | §7.1 |
| ✔ | **Kandasamy, N., Hardy, B., Page, L., Schaffner, M., Graggaber, J., Powlson, A. S., Fletcher, P. C., Gurnell, M., & Coates, J. (2014). Cortisol shifts financial risk preferences. *PNAS*, 111(9), 3608–3613.** | §7.2 |
| ○ | Porcelli, A. J., & Delgado, M. R. (2009). Acute stress modulates risk taking in financial decision making. *Psychological Science*, 20(3), 278–283. | §7.3 |
| ○ | Starcke, K., & Brand, M. (2012). Decision making under stress: A selective review. *Neuroscience & Biobehavioral Reviews*, 36(4), 1228–1248. | §7.3 |
| ✔ | **Venkatraman, V., Chuah, Y. M. L., Huettel, S. A., & Chee, M. W. L. (2007). Sleep deprivation elevates expectation of gains and attenuates response to losses following risky decisions. *Sleep*, 30(5), 603–609.** | §7.4 |
| ✔ | **Venkatraman, V., Huettel, S. A., Chuah, L. Y. M., Payne, J. W., & Chee, M. W. L. (2011). Sleep deprivation biases the neural mechanisms underlying economic preferences. *Journal of Neuroscience*, 31(10), 3712–3718.** | §7.4 |
| ✔ | **Mani, A., Mullainathan, S., Shafir, E., & Zhao, J. (2013). Poverty impedes cognitive function. *Science*, 341(6149), 976–980.** *(lihat juga Comment, Science 2014)* | §7.5 |

### A.8 Tekanan, choking, dan kendali atensi

| | Rujukan | Dipakai di |
|---|---|---|
| ✔ | **Ariely, D., Gneezy, U., Loewenstein, G., & Mazar, N. (2009). Large stakes and big mistakes. *Review of Economic Studies*, 76(2), 451–469.** | §8.1 |
| ○ | Baumeister, R. F. (1984). Choking under pressure. *Journal of Personality and Social Psychology*, 46(3), 610–620. | §8.2 |
| ✔ | **Beilock, S. L., & Carr, T. H. (2001). On the fragility of skilled performance: What governs choking under pressure? *Journal of Experimental Psychology: General*, 130(4), 701–725.** | §8.2 |
| ○ | Eysenck, M. W., Derakshan, N., Santos, R., & Calvo, M. G. (2007). Anxiety and cognitive performance: Attentional control theory. *Emotion*, 7(2), 336–353. | §8.3 |
| ✔ | **Pope, D. G., & Schweitzer, M. E. (2011). Is Tiger Woods loss averse? Persistent bias in the face of experience, competition, and high stakes. *American Economic Review*, 101(1), 129–157.** | §8.4 |

### A.9 Emosi dan regulasi emosi

| | Rujukan | Dipakai di |
|---|---|---|
| ○ | Gross, J. J. (1998). The emerging field of emotion regulation: An integrative review. *Review of General Psychology*, 2(3), 271–299. | §10.2 |
| ○ | Gross, J. J. (2002). Emotion regulation: Affective, cognitive, and social consequences. *Psychophysiology*, 39(3), 281–291. | §10.2 |
| ○ | Gross, J. J., & John, O. P. (2003). Individual differences in two emotion regulation processes (ERQ). *Journal of Personality and Social Psychology*, 85(2), 348–362. | §13.2 |
| ✔ **[C]** | Ding, Z., Ghanma, D., Varotto, S., & Vogt, J. (2025). *Mindfulness and trading decisions.* SSRN working paper. **Belum peer-review.** | §10.3, §14.5 |

### A.10 Perjudian, adiksi, dan eskalasi

| | Rujukan | Dipakai di |
|---|---|---|
| ✔ | **Clark, L., Lawrence, A. J., Astley-Jones, F., & Gray, N. (2009). Gambling near-misses enhance motivation to gamble and recruit win-related brain circuitry. *Neuron*, 61(3), 481–490.** | §11.1 |
| ○ | Chase, H. W., & Clark, L. (2010). Gambling severity predicts midbrain response to near-miss outcomes. *Journal of Neuroscience*, 30(18), 6180–6187. | §11.1 |
| ✔ | **Grall-Bronnec, M., Sauvaget, A., Boutin, C., Bulteau, S., Jiménez-Murcia, S., Fernández-Aranda, F., Challet-Bouju, G., & Caillon, J. (2017). Excessive trading, a gambling disorder in its own right? A case study on a French disordered gamblers cohort. *Addictive Behaviors*, 64, 340–348.** | §11.3 |
| ○ | Cox, R., Kamolsareeratana, A., & Kouwenberg, R. (2020). Compulsive gambling in the financial markets: Evidence from two investor surveys. *Journal of Banking & Finance*, 111, 105709. | §11.3 |
| ○ | Mosenhauer, M., Newall, P. W. S., & Walasek, L. (2021). The stock market as a casino: Associations between stock market trading frequency and problem gambling. *Journal of Behavioral Addictions*, 10(3), 683–689. | §11.3 |
| ○ | Dorn, A. J., Dorn, D., & Sengmueller, P. (2015). Trading as gambling. *Management Science*, 61(10), 2376–2393. | §11.3 |
| ○ | Staw, B. M. (1976). Knee-deep in the big muddy: A study of escalating commitment to a chosen course of action. *Organizational Behavior and Human Performance*, 16(1), 27–44. | §11.4 |
| ○ | Arkes, H. R., & Blumer, C. (1985). The psychology of sunk cost. *Organizational Behavior and Human Decision Processes*, 35(1), 124–140. | §11.4 |

### A.11 Intervensi: bukti positif dan negatif

| | Rujukan | Dipakai di |
|---|---|---|
| ✔ | **Gollwitzer, P. M., & Sheeran, P. (2006). Implementation intentions and goal achievement: A meta-analysis of effects and processes. *Advances in Experimental Social Psychology*, 38, 69–119.** *(94 studi, N>8.000, d=0,65)* | §14.2(a) |
| ○ | Gollwitzer, P. M. (1999). Implementation intentions: Strong effects of simple plans. *American Psychologist*, 54(7), 493–503. | §14.2(a) |
| ✔ | **Morewedge, C. K., Yoon, H., Scopelliti, I., Symborski, C. W., Korris, J. H., & Kassam, K. S. (2015). Debiasing decisions: Improved decision making with a single training intervention. *Policy Insights from the Behavioral and Brain Sciences*, 2(1), 129–140.** | §14.2(b) |
| ✔ | **Sellier, A.-L., Scopelliti, I., & Morewedge, C. K. (2019). Debiasing training improves decision making in the field. *Psychological Science*, 30(9), 1371–1379.** | §14.2(b) |
| ✔ | **Gneezy, U., & Potters, J. (1997). An experiment on risk taking and evaluation periods. *Quarterly Journal of Economics*, 112(2), 631–645.** | §5.8, §14.1(c) |
| ○ | Thaler, R. H., Tversky, A., Kahneman, D., & Schwartz, A. (1997). The effect of myopia and loss aversion on risk taking: An experimental test. *Quarterly Journal of Economics*, 112(2), 647–661. | §5.8 |
| ○ | Benartzi, S., & Thaler, R. H. (1995). Myopic loss aversion and the equity premium puzzle. *Quarterly Journal of Economics*, 110(1), 73–92. | §5.8 |
| ○ | Fellner, G., & Sutter, M. (2009). Causes, consequences, and cures of myopic loss aversion. *Economic Journal*, 119(537), 900–916. | §14.1(c) |
| ○ | Ariely, D., & Wertenbroch, K. (2002). Procrastination, deadlines, and performance: Self-control by precommitment. *Psychological Science*, 13(3), 219–224. | §14.1(b) |
| ○ | Haynes, A. B., et al. (2009). A surgical safety checklist to reduce morbidity and mortality in a global population. *New England Journal of Medicine*, 360(5), 491–499. | §14.1(d) |
| ✔ **[bukti negatif]** | **Hagger, M. S., et al. (2016). A multilab preregistered replication of the ego-depletion effect. *Perspectives on Psychological Science*, 11(4), 546–573.** *(23 lab, N=2.141, d=0,04)* | §7.6, §14.5 |
| ✔ **[bukti negatif]** | **Vohs, K. D., et al. (2021). A multisite preregistered paradigmatic test of the ego-depletion effect. *Psychological Science*, 32(10), 1566–1581.** *(36 lab, N=3.531, null)* | §7.6, §14.5 |
| ○ | Karlsson, N., Loewenstein, G., & Seppi, D. (2009). The ostrich effect: Selective attention to information. *Journal of Risk and Uncertainty*, 38(2), 95–115. | §5.9 |
| ○ | Sicherman, N., Loewenstein, G., Seppi, D. J., & Utkus, S. P. (2016). Financial attention. *Review of Financial Studies*, 29(4), 863–897. | §5.9 |
| ○ | Duckworth, A. L., Gendler, T. S., & Gross, J. J. (2016). Situational strategies for self-control. *Perspectives on Psychological Science*, 11(1), 35–55. | §7.6 |
| ○ | Oettingen, G. (2012). Future thought and behaviour change. *European Review of Social Psychology*, 23(1), 1–63. | §14.5 |

### A.12 Sumber industri dan regulator **[D]**

Sumber-sumber ini **tidak peer-review, tidak diaudit, dan sebagian besar diterbitkan oleh pihak dengan kepentingan komersial** dalam angka yang mereka laporkan. Dikutip untuk base rate di §3 dengan peringatan itu melekat.

- Track360. *Prop Trading Statistics 2026: Pass Rates & Market Data.* — pass rate gabungan, komposisi moda kegagalan.
- Fortunly. *Prop Firm Challenge Pass Rates Statistics for 2026.*
- hoc-trade. *Why Prop Firm Traders Fail: 500,000+ Traders Analyzed.* — pola perilaku (doubling down, penghapusan stop). Metodologi tidak dipublikasikan.
- QuantVPS / The Chart Whisperer / thepropfirmguide / TradersYard. *Prop Firm Statistics 2026* (berbagai) — tingkat payout.
- Track360. *MyForexFunds Aftermath: CFTC Lessons for Prop Firm Operators.* — kronologi kasus.
- DeSilva Law Offices (Mei 2025). *CFTC Case Dismissed: My Forex Funds.* — pembubaran dan sanksi Rule 11.
- Finance Magnates; The Industry Spread. — liputan regulasi prop ritel.

---

## Lampiran B — Turunan matematis dan kode

### B.1 Probabilitas menyentuh barrier

Untuk gerak Brown berdrift `dX = μ dt + σ dW` dengan `X₀ = 0`, fungsi skala adalah `S(x) = e^(−2μx/σ²)`. Karena `S(X_t)` adalah martingale lokal, teorema optional stopping memberi, untuk barrier di `+a` dan `−b`:

```
P(T₊ₐ < T₋ᵦ) = [S(0) − S(−b)] / [S(a) − S(−b)]
             = (1 − e^(2μb/σ²)) / (e^(−2μa/σ²) − e^(2μb/σ²))
```

**Pemeriksaan batas:**
- `μ → 0` (dengan L'Hôpital): → `b / (a + b)`. Benar — random walk murni, proporsional terhadap jarak.
- `μ → ∞`: → 1. Benar.

Untuk kasus satu barrier (`a → ∞`), suku `e^(−2μa/σ²) → 0` dan dengan `μ > 0`:

```
P(akhirnya menyentuh −b) = e^(−2μb/σ²) = e^(−2·S·b/σ),   S = μ/σ
```

Ini adalah formula yang menghasilkan Tabel §4.3. Untuk `μ ≤ 0` probabilitasnya adalah 1 (recurrence).

### B.2 Minimum Track Record Length

Dari Bailey & López de Prado (2012):

```
MinTRL = 1 + [1 − γ₃·ŜR + (γ₄−1)/4 · ŜR²] · (Z_α / (ŜR − SR*))²
```

dengan `ŜR` = Sharpe per observasi, `γ₃` = skewness, `γ₄` = kurtosis, `Z_α` = kuantil normal standar, `SR*` = ambang acuan. Konversi dari Sharpe tahunan: `ŜR = SR_tahunan / √252`.

Tabel §4.6 menggunakan `SR* = 0`, `α = 0,95` (Z = 1,6449), `γ₃ = −0,5`, `γ₄ = 6,0`.

### B.3 Reproduksi

Skrip yang menghasilkan seluruh tabel dalam dokumen ini:

```python
import math, random

def p_target_first(mu, sig, a, b):
    """P(sentuh +a sebelum -b) untuk gerak Brown berdrift."""
    if abs(mu) < 1e-12:
        return b / (a + b)
    th = 2 * mu / sig**2
    return (1 - math.exp(th * b)) / (math.exp(-th * a) - math.exp(th * b))

def p_eventual_ruin(S, sig, b):
    """P(akhirnya sentuh -b) dinyatakan lewat Sharpe tahunan S."""
    return math.exp(-2 * S * b / sig)

def min_trl(SR_ann, SR_star=0.0, skew=-0.5, kurt=6.0, Z=1.6448536, obs=252):
    sr, srs = SR_ann / math.sqrt(obs), SR_star / math.sqrt(obs)
    if sr <= srs:
        return float('inf')
    return 1 + (1 - skew*sr + (kurt-1)/4 * sr**2) * (Z / (sr - srs))**2

def mc_phase(S, vol, days=30, tpd=3, target=0.08, max_dd=0.10,
             daily_dd=0.05, n=25_000, seed=20260922):
    """Monte Carlo satu fase challenge dengan daily DD dan batas waktu."""
    rng = random.Random(seed)
    mu_t  = S * vol / 252.0 / tpd
    sig_t = vol / math.sqrt(252.0) / math.sqrt(tpd)
    P = FD = FM = FT = 0
    for _ in range(n):
        eq, done = 0.0, False
        for _d in range(days):
            ds = eq
            for _t in range(tpd):
                eq += rng.gauss(mu_t, sig_t)
                if eq <= -max_dd:          FM += 1; done = True; break
                if eq - ds <= -daily_dd:   FD += 1; done = True; break
                if eq >= target:           P  += 1; done = True; break
            if done: break
        if not done: FT += 1
    return P/n, FD/n, FM/n, FT/n
```

### B.4 Asumsi model dan arah biasnya

| Asumsi | Realitas | Arah bias pada hasil |
|---|---|---|
| Return Gaussian | Ekor gemuk, skew negatif | Tabel survival **terlalu optimistis** |
| Volatilitas konstan | Volatilitas mengelompok | Terlalu optimistis |
| Sharpe konstan | Seluruh §5–§11 berargumen ini salah | Terlalu optimistis |
| Trade independen | Berkorelasi (tesis yang sama, jam yang sama) | Terlalu optimistis |
| Tanpa biaya transaksi | Spread, komisi, swap, slippage | Terlalu optimistis |
| Drawdown statis | Banyak akun memakai trailing | Terlalu optimistis |

**Setiap penyimpangan bergerak ke arah yang sama.** Angka survival nyata lebih buruk daripada yang ditabelkan, bukan lebih baik. Ini menguatkan, bukan melemahkan, kesimpulan §4.

---

## Lampiran C — Rubrik tingkat bukti

| Tingkat | Kriteria | Contoh dalam dokumen ini | Cara memperlakukannya |
|---|---|---|---|
| **A** | Replikasi multi-lab, meta-analisis, atau studi lapangan besar (N>10.000) di jurnal peer-review tingkat atas | Gollwitzer & Sheeran (94 studi); Hagger dkk. (23 lab); Barber dkk. (Taiwan); Heimer & Imas | Dapat diandalkan untuk desain; arah efek kokoh |
| **B** | Studi lapangan tunggal besar atau eksperimen terkontrol yang direplikasi, peer-review | Kandasamy dkk.; Coval & Shumway; Lo dkk.; Fenton-O'Creevy dkk. | Dapat diandalkan untuk mekanisme; besaran tidak pasti |
| **C** | Studi lab tunggal, N kecil, atau working paper belum peer-review | Ding dkk. (mindfulness); sebagian literatur biofeedback | Sugestif saja; jangan dijadikan dasar keputusan |
| **D** | Data industri yang dilaporkan sendiri, tanpa audit, sering dari pihak dengan konflik kepentingan | Seluruh §3.1 | Perlakukan sebagai indikatif; jangan dikutip sebagai fakta |
| **M** | Turunan matematis / simulasi dalam dokumen ini | §4.2–§4.8, §6.3, §9.5 | Valid sejauh asumsinya (§B.4); bukan temuan empiris |

### Distribusi bukti dalam dokumen ini

| Bagian | Tingkat dominan | Catatan |
|---|---|---|
| §3 Base rate | **D** | Paling lemah; seluruh kalibrasi §4.4 bergantung padanya |
| §4 Statistik seleksi | **M** + A | Matematikanya pasti; parameternya bergantung §3 |
| §5 Pergeseran acuan | **A** | Literatur paling kokoh dalam dokumen |
| §6 Insentif turnamen | **A** | Direplikasi lintas domain (dana, angkat besi, trading) |
| §7 Stres & endokrin | **B** | Kausal tapi N kecil; §7.6 adalah bukti negatif tingkat A |
| §8 Choking | **A–B** | Pope & Schweitzer adalah demonstrasi terkuat |
| §9 Overconfidence | **A–B** | Gervais & Odean adalah model, bukan temuan empiris langsung |
| §10 Emosi | **B** | Fenton-O'Creevy kualitatif; §10.3 adalah **C** |
| §11 Adiksi | **B** | Kuat untuk mekanisme, tidak diukur pada funded trader |
| §12 Sintesis | **M** | Model terintegrasi; belum diuji sebagai keseluruhan |
| §13–15 Aplikasi | Turunan | Inferensi terapan, bukan temuan riset |

---

## Catatan akhir

Dokumen ini adalah tinjauan literatur dan analisis kuantitatif. Ia **bukan nasihat keuangan, bukan nasihat investasi, dan bukan nasihat klinis.**

Trading berleverage membawa risiko kehilangan seluruh modal. Siapa pun yang mengenali pola dalam §11 pada dirinya sendiri — khususnya pembelian challenge berulang, mengejar kerugian, atau trading dengan uang yang dibutuhkan untuk biaya hidup — sebaiknya mencari bantuan profesional, bukan pelatihan trading lebih lanjut. Layanan bantuan gangguan judi tersedia di sebagian besar negara dan tidak dipungut biaya.

*Versi 1.0 · 22 September 2026*
