# Demo BengkelOS untuk bengkel motor

## Demo offline di HP (buat pitching sekarang)

Tanpa database dan tanpa deploy. Demo-nya satu file saja
(`demo/bengkel-motor.html`) yang jalan sendiri di browser. PIN: **2468**.

1. Kirim `demo/bengkel-motor.html` ke HP sendiri (WA ke nomor sendiri,
   Telegram "Saved Messages", atau Google Drive), lalu unduh.
2. Buka file itu dengan **Chrome** (Android: dari notifikasi unduhan atau
   aplikasi Files → pilih Chrome).
3. Selesai. Jalan offline; internet hanya dipakai untuk font dan tombol WA.

Belum dicoba di iPhone: aplikasi Files di iPhone kadang cuma menampilkan
pratinjau tanpa menjalankan halamannya. Paling aman pakai HP Android.

Di ⚙️ Beranda: isi nama bengkel yang sedang di-pitch dan nomor WA kamu sendiri.
"Mulai ulang data demo" mengembalikan data ke awal untuk bengkel berikutnya.

Bagian di bawah ini (app sungguhan + database) baru dipakai setelah ada client.

Cara kerjanya sama seperti demo mobil (`bengkelos-demo`): app yang sama, di-deploy
ke project Vercel terpisah, dengan data contoh dan PIN demo tertulis di halaman login.
Bedanya dua hal:

- `NEXT_PUBLIC_SHOP_KIND=motor` — semua teks "mobil" jadi "motor", contoh isian
  pakai Honda/Vario, deskripsi item pakai "servis CVT".
- Datanya bengkel motor: Beat, Vario, NMAX, Aerox, Supra; oli MPX/Yamalube,
  V-belt, roller, kampas rem, ban IRC; ±10 motor per hari selama 6 minggu terakhir.

## 1. Isi data demo (±1 menit)

Pakai database Supabase yang sama dengan demo mobil (lihat env
`NEXT_PUBLIC_SUPABASE_URL` di project Vercel `bengkelos-demo`). **Jangan** pakai
database bengkel asli — script menolak project `hyivfiybznrfnhbzyyeb`.

```bash
DEMO_SUPABASE_URL=https://<ref-demo>.supabase.co \
DEMO_PIN=2468 \
DEMO_WA_PHONE=08xxxxxxxxxx \
npm run seed:demo -- --kind motor
```

Service key-nya ditanya lewat prompt tersembunyi.

- `DEMO_PIN` harus beda dari PIN demo mobil (login mencari PIN di semua bengkel).
- `DEMO_WA_PHONE` = nomor HP kamu sendiri. Tiket yang selesai hari ini dapat
  nomor ini, jadi tombol WA bisa dipencet live tanpa mengirim ke orang asing.
- Opsional `DEMO_SHOP_NAME="Heru Motor"` — pakai nama bengkel yang sedang
  di-pitch. Efeknya besar: pemilik melihat nama bengkelnya sendiri di struk.
- **Jalankan ulang sebelum tiap pitch** (idealnya setelah jam 10 pagi). Tanggal
  ikut digeser ke hari ini, jadi "Pendapatan hari ini" dan antrean servis terisi.

## 2. Deploy (sekali saja)

```bash
vercel link --project bengkelos-demo-motor   # buat project baru saat ditanya
vercel env add NEXT_PUBLIC_SUPABASE_URL production     # sama dengan bengkelos-demo
vercel env add SUPABASE_SERVICE_ROLE_KEY production    # sama dengan bengkelos-demo
vercel env add SESSION_SECRET production               # string acak baru
vercel env add NEXT_PUBLIC_SHOP_KIND production        # motor
vercel env add NEXT_PUBLIC_DEMO_PIN_HINT production    # 2468 (= DEMO_PIN)
vercel --prod
```

Setelah itu `vercel link --project bengkelos` lagi supaya deploy berikutnya
tidak salah alamat.

## 3. Alur pitch (5 menit, dari HP)

1. **Login** pakai PIN — "Tiap orang punya PIN sendiri: pemilik, kasir, mekanik.
   Kasir nggak bisa lihat laporan untung."
2. **Dashboard** — pendapatan hari ini, motor yang sedang dikerjakan, stok menipis.
   "Ini bisa Bapak lihat dari rumah."
3. **Buat tiket baru** — ketik plat KB, nama, Vario 125. Tambah "Oli MPX2" dari
   stok + "Jasa servis CVT". Stok otomatis berkurang saat tiket selesai.
4. **Bayar + selesai** → notifikasi "motor selesai, kirim WA sekarang" → pencet,
   WA terbuka dengan pesan siap kirim (ke nomor kamu sendiri).
5. **Struk** — cetak / tunjukkan di layar.
6. **Stok** — V-Belt Beat tinggal 2, ada peringatan. "Nggak ada lagi kehabisan
   v-belt pas motor udah dibongkar."
7. **Keuangan** (login owner) — omzet bulan ini, pengeluaran (sewa, gaji,
   belanja sparepart), laba bersih.
8. **Riwayat kendaraan** — cari plat → semua servis sebelumnya. "Customer bilang
   'terakhir ganti oli kapan ya?' — langsung kelihatan."

Tutup dengan tawaran yang sama: gratis 1 bulan, tanpa kontrak.

## Pesan WA pembuka (bengkel motor)

```
Halo, ini dengan [NAMA BENGKEL] ya? Saya lagi bikin sistem kasir, stok sparepart, dan laporan keuangan khusus bengkel motor (BengkelOS). Bisa dibuka dari HP: catat servis, stok oli/v-belt/kampas otomatis berkurang, dan notif WA ke customer pas motornya selesai. Lagi cari 2-3 bengkel buat coba gratis sebulan. Boleh saya tunjukkan demonya 5 menit?
```
