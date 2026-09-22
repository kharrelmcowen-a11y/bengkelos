import random, math
random.seed(20260922)
g = random.gauss

def run(S, vol, days=30, tpd=3, target=0.08, max_dd=0.10, daily_dd=0.05, n=25000):
    mu_t  = S*vol/252.0/tpd
    sig_t = vol/math.sqrt(252.0)/math.sqrt(tpd)
    P=FD=FM=FT=0
    for _ in range(n):
        eq=0.0; done=False
        for _d in range(days):
            ds=eq
            for _t in range(tpd):
                eq+=g(mu_t,sig_t)
                if eq<=-max_dd: FM+=1; done=True; break
                if eq-ds<=-daily_dd: FD+=1; done=True; break
                if eq>=target: P+=1; done=True; break
            if done: break
        if not done: FT+=1
    return P/n, FD/n, FM/n, FT/n

print("="*94)
print("MC-1  Satu fase (target +8%, maxDD 10%, dailyDD 5%, 30 hari, 3 trade/hari, N=25.000)")
print("="*94)
print(f"{'Sharpe':>7} | {'vol':>5} | {'LOLOS':>7} | {'gagal dailyDD':>13} | {'gagal maxDD':>11} | {'habis waktu':>11}")
print("-"*94)
res={}
for S in [0.0,0.5,1.0,2.0,3.0]:
    for v in [0.20,0.40]:
        r=run(S,v); res[(S,v,'p1')]=r[0]
        print(f"{S:>7.1f} | {v:>5.0%} | {r[0]:>7.1%} | {r[1]:>13.1%} | {r[2]:>11.1%} | {r[3]:>11.1%}")

print()
print("="*94)
print("MC-2  Dua fase berurutan (fase 2 target +5%, aturan sama)")
print("="*94)
print(f"{'Sharpe':>7} | {'vol':>5} | {'fase 1':>7} | {'fase 2':>7} | {'lolos keduanya':>15}")
print("-"*94)
for S in [0.0,0.5,1.0,2.0,3.0]:
    for v in [0.20,0.40]:
        p1=res[(S,v,'p1')]
        p2=run(S,v,target=0.05)[0]
        res[(S,v,'e2e')]=p1*p2
        print(f"{S:>7.1f} | {v:>5.0%} | {p1:>7.1%} | {p2:>7.1%} | {p1*p2:>15.1%}")

print()
print("="*94)
print("MC-3  Komposisi kolam funded (populasi pelamar campuran)")
print("      70% Sharpe 0.0 | 20% Sharpe 0.5 | 8% Sharpe 1.0 | 2% Sharpe 2.0")
print("="*94)
mix=[(0.70,0.0),(0.20,0.5),(0.08,1.0),(0.02,2.0)]
for v in [0.20,0.40]:
    tot=0.0; parts=[]
    for w,S in mix:
        pp=res[(S,v,'e2e')]
        parts.append((w,S,pp,w*pp)); tot+=w*pp
    print(f"\n  vol {v:.0%} -> pass-rate gabungan end-to-end = {tot:.1%}")
    for w,S,pp,c in parts:
        print(f"    Sharpe {S:>3.1f} ({w:>4.0%} pelamar): lolos {pp:>5.1%}  ->  {c/tot:>5.1%} dari kolam funded")
