import math
def p_first(mu,sig,a,b):
    if abs(mu)<1e-12: return b/(a+b)
    th=2*mu/sig**2
    return (1-math.exp(th*b))/(math.exp(-th*a)-math.exp(th*b))

print("="*100)
print("SIKLUS PAYOUT: funded account, payout tiap +5%, ruin di -10% (DD statis, profit ditarik habis)")
print("Tiap siklus ulang dari nol -> jumlah payout sebelum ruin ~ Geometrik")
print("="*100)
print(f"{'Sharpe':>7} | {'vol':>5} | {'p(payout/siklus)':>17} | {'E[jml payout]':>14} | {'P(>=1)':>7} | {'P(>=5)':>7} | {'P(>=10)':>8}")
print("-"*100)
for S in [0.0,0.5,1.0,1.5,2.0,3.0]:
    for v in [0.20,0.40]:
        p=p_first(S*v,v,0.05,0.10)
        E=p/(1-p) if p<1 else float('inf')
        print(f"{S:>7.1f} | {v:>5.0%} | {p:>17.1%} | {E:>14.2f} | {p:>7.1%} | {p**5:>7.1%} | {p**10:>8.2%}")

print()
print("="*100)
print("INVERSI SELEKSI: volatilitas yang MEMAKSIMALKAN peluang lolos vs yang meminimalkan ruin")
print("(Sharpe tetap 1.0; hanya ukuran posisi / agresivitas yang berubah)")
print("="*100)
print(f"{'vol tahunan':>12} | {'lolos 2 fase (MC)':>18} | {'P(ruin funded, DD 10%)':>23} | {'E[payout] sblm ruin':>20}")
print("-"*100)
mc={0.20:0.182, 0.40:0.359}   # dari MC-2, Sharpe 1.0
for v in [0.10,0.20,0.30,0.40,0.60]:
    ruin=math.exp(-2*1.0*0.10/v)
    p=p_first(1.0*v,v,0.05,0.10); E=p/(1-p)
    m=f"{mc[v]:.1%}" if v in mc else "  —"
    print(f"{v:>12.0%} | {m:>18} | {ruin:>23.1%} | {E:>20.2f}")

print()
print("="*100)
print("BIAYA SATU KALI 'REVENGE TRADE' (menggandakan risiko untuk satu sesi setelah rugi)")
print("Sharpe 1.0, vol dasar 20%, DD tersisa 6% dari batas")
print("="*100)
for mult in [1,2,3,5]:
    v=0.20*mult
    ruin=math.exp(-2*1.0*0.06/v)
    print(f"  ukuran x{mult}: vol efektif {v:>4.0%} -> P(sentuh sisa DD 6%) = {ruin:>6.1%}")
