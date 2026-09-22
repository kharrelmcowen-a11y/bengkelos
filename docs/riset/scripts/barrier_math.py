import math

# ---------------------------------------------------------------
# 1. Probabilitas MENYENTUH barrier bawah (max drawdown) SEBELUM
#    barrier atas (profit target) — random walk dengan drift.
#    dX = mu dt + sigma dW,  X0 = 0
#    P(hit +a sebelum -b) = (1 - e^{2mu*b/sig^2}) / (e^{-2mu*a/sig^2} - e^{2mu*b/sig^2})
# ---------------------------------------------------------------
def p_target_first(mu, sig, a, b):
    if abs(mu) < 1e-12:
        return b / (a + b)
    th = 2 * mu / sig**2
    return (1 - math.exp(th * b)) / (math.exp(-th * a) - math.exp(th * b))

# ---------------------------------------------------------------
# 2. Probabilitas AKHIRNYA menyentuh -b (tanpa batas atas) = e^{-2*mu*b/sig^2}
#    Dinyatakan lewat Sharpe S = mu/sigma  ->  P = exp(-2*S*b/sigma)
# ---------------------------------------------------------------
def p_eventual_ruin(S, sig, b):
    return math.exp(-2 * S * b / sig)

print("=" * 78)
print("TABEL 1. Peluang LOLOS challenge (sentuh target sebelum max DD)")
print("Target 8%, Max DD 10% (abaikan daily-DD & batas waktu)")
print("=" * 78)
print(f"{'Sharpe tahunan':>16} | {'vol 10%':>9} | {'vol 20%':>9} | {'vol 40%':>9} | {'vol 60%':>9}")
print("-" * 78)
for S in [0.0, 0.5, 1.0, 1.5, 2.0, 3.0]:
    row = []
    for sig in [0.10, 0.20, 0.40, 0.60]:
        mu = S * sig
        row.append(f"{p_target_first(mu, sig, 0.08, 0.10)*100:8.1f}%")
    print(f"{S:>16.1f} | " + " | ".join(row))

print()
print("=" * 78)
print("TABEL 2. Peluang AKHIRNYA kena max DD 10% di funded account")
print("(tanpa profit target -> hanya satu barrier yang menyerap)")
print("=" * 78)
print(f"{'Sharpe tahunan':>16} | {'vol 10%':>9} | {'vol 20%':>9} | {'vol 40%':>9} | {'vol 60%':>9}")
print("-" * 78)
for S in [0.0, 0.5, 1.0, 1.5, 2.0, 3.0]:
    row = []
    for sig in [0.10, 0.20, 0.40, 0.60]:
        p = 1.0 if S <= 0 else p_eventual_ruin(S, sig, 0.10)
        row.append(f"{p*100:8.1f}%")
    print(f"{S:>16.1f} | " + " | ".join(row))

print()
print("=" * 78)
print("TABEL 3. Bayes: P(punya edge | lolos fase 1 DAN fase 2)")
print("=" * 78)
print(f"{'prior edge':>11} | {'P(lolos|edge)':>13} | {'P(lolos|no edge)':>16} | {'posterior':>10} | {'% funded tanpa edge':>20}")
print("-" * 92)
for prior in [0.02, 0.05, 0.10, 0.20]:
    for pe, pn in [(0.60, 0.12), (0.50, 0.10), (0.45, 0.15)]:
        num = prior * pe
        den = num + (1 - prior) * pn
        post = num / den
        print(f"{prior*100:10.0f}% | {pe*100:12.0f}% | {pn*100:15.0f}% | {post*100:9.1f}% | {(1-post)*100:19.1f}%")
    print("-" * 92)

print()
print("=" * 78)
print("TABEL 4. Minimum Track Record Length (Bailey & Lopez de Prado)")
print("MinTRL = 1 + (1 - skew*SR + (kurt-1)/4 * SR^2) * (Z/(SR - SR*))^2  [observasi]")
print("SR = Sharpe per-observasi; di sini per-tahun lalu dikonversi ke jumlah hari")
print("=" * 78)

def min_trl(SR_ann, SR_star=0.0, skew=-0.5, kurt=6.0, conf=0.95, obs_per_year=252):
    Z = 1.644853627  # z_{0.95}
    sr = SR_ann / math.sqrt(obs_per_year)          # Sharpe per observasi (harian)
    srs = SR_star / math.sqrt(obs_per_year)
    if sr <= srs:
        return float('inf')
    n = 1 + (1 - skew * sr + (kurt - 1) / 4 * sr**2) * (Z / (sr - srs))**2
    return n

print(f"{'Sharpe tahunan':>16} | {'hari trading':>13} | {'~bulan kalender':>16}")
print("-" * 52)
for S in [0.5, 1.0, 1.5, 2.0, 3.0]:
    n = min_trl(S)
    print(f"{S:>16.1f} | {n:>13.0f} | {n/21:>16.1f}")

print()
print("=" * 78)
print("TABEL 5. Berapa banyak percobaan challenge yang 'menghasilkan' pemenang acak?")
print("Peluang minimal 1x lolos dari k percobaan, trader ber-edge NOL (p=12%/percobaan)")
print("=" * 78)
p = 0.12
for k in [1, 2, 3, 5, 8, 10]:
    print(f"  {k:>2} percobaan -> {1-(1-p)**k:6.1%}")

print()
print("=" * 78)
print("TABEL 6. Efek ukuran posisi: naik 1.5x setelah lolos (overconfidence)")
print("Sharpe tetap, vol naik -> peluang ruin naik")
print("=" * 78)
for S in [1.0, 1.5, 2.0]:
    for sig0 in [0.20, 0.30]:
        base = p_eventual_ruin(S, sig0, 0.10)
        up15 = p_eventual_ruin(S, sig0*1.5, 0.10)
        up20 = p_eventual_ruin(S, sig0*2.0, 0.10)
        print(f"  Sharpe {S:.1f}, vol dasar {sig0:.0%}: ruin {base:6.1%} -> x1.5 size {up15:6.1%} -> x2 size {up20:6.1%}")
