# Skrip reproduksi — psikologi funded trader

Menghasilkan setiap tabel kuantitatif dalam `../psikologi-funded-trader.md`.
Python 3 standar, tanpa dependensi eksternal.

| Skrip | Menghasilkan |
|---|---|
| `barrier_math.py` | Tabel §4.3 (peluang ruin), §4.6 (MinTRL), §4.7 (percobaan berulang), §4.8 (Bayes), §9.5 (inflasi ukuran) |
| `monte_carlo_challenge.py` | Tabel §4.4 (MC satu fase, dua fase, komposisi kolam funded) |
| `payout_cycles.py` | Tabel §4.5 (inversi seleksi), §6.3 (biaya revenge trade), siklus payout |

```
python3 barrier_math.py
python3 monte_carlo_challenge.py   # ~4 menit, N=25.000 per sel
python3 payout_cycles.py
```

Seed tetap (`20260922`) sehingga hasil Monte Carlo dapat direproduksi persis.
Turunan matematis ada di Lampiran B dokumen utama; asumsi model dan arah biasnya
ada di §B.4.
