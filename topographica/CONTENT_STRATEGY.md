# Topographica — Content Strategy

## 1. The job of every video

**One place, one question, answered with satellite evidence in under a minute.**

A viewer should finish knowing three things: where the place is, what the imagery shows, and what reliable sources say about why.

## 2. Content pillars

Every idea belongs to exactly one pillar. The target shares apply to any rolling run of 20 published videos.

### Pillar 1 — Earth Investigation · 30 %

Environmental change and its causes: deforestation, mining, land-use change, and pollution visible from space.

- **Typical question:** "What is changing here, and what does the evidence say is driving it?"
- **Evidence pattern:** a before/after pair or time series, plus an official or scientific source for the cause.
- **Take care:** causes are often several and disputed. Attribute precisely ("in this area, between [year] and [year]"). Never blame a company, community or government without a documented source.

### Pillar 2 — Earth Through Time · 25 %

Historical satellite comparisons: urban expansion, and changing coastlines, rivers and lakes.

- **Typical question:** "How did this place change, and when?"
- **Evidence pattern:** a time series from the same season, with each frame dated.
- **Take care:** much change predates satellites; Landsat begins in 1972. Earlier history needs dated historical maps with clear rights, labelled as maps, not imagery.

### Pillar 3 — Hidden Earth · 25 %

Remote locations, unusual geological formations, isolated settlements and unusual structures.

- **Typical question:** "What is this, and why is it here?"
- **Evidence pattern:** one strong scene, a zoom out for context, then geological or official sources.
- **Take care:** this pillar attracts myths. Mention a popular myth only to state, with a source, what the evidence supports. Never publish the precise location of private homes, sensitive security sites or vulnerable communities, such as isolated peoples.

### Pillar 4 — Human Geography · 20 %

Infrastructure, borders, canals, dams, trade routes, resources and urban development.

- **Typical question:** "Why was this built here, and what does it change?"
- **Evidence pattern:** a scene of the structure, what it connects or changes, and dated official figures.
- **Take care:** for borders and disputed areas, use neutral names, mention any dispute and take no side. Trade and production figures change every year, so always date them.

### Choosing the pillar

Ask these questions in order and stop at the first yes:

1. Is the core question *why* an environment is under pressure? → **Earth Investigation**
2. Is the core story *how a place changed* over time, told chronologically? → **Earth Through Time**
3. Is the core question *what is this*? → **Hidden Earth**
4. Is the core question *why people built or routed this here*? → **Human Geography**

If two fit, pick the one that matches the hook and put the other in `notes`.

## 3. Deciding what to make: idea scores

Fill in the four score columns of `idea_bank.csv` during the first hour of research, not at the idea stage. Each score is 1–3.

| Column | 3 | 2 | 1 |
|---|---|---|---|
| `score_visual` | The story is visible in free imagery (Landsat, Sentinel) | It's visible only in high-resolution imagery (Google Earth) | It's barely visible; the video would lean on maps or footage |
| `score_sources` | Several official or scientific sources agree | One solid source | News or secondary sources only |
| `score_rights` | All imagery is public domain or open | Usable with strict conditions (e.g. Google Earth's on-screen attribution) | Needs a paid licence, or rights are unclear |
| `score_story` | One question, one clear answer in 55 s | The answer needs caveats | No clear answer yet |

**Total 10–12:** make it next. **7–9:** make it if it helps pillar balance. **6 or below:** set it to `on_hold` with a reason, or drop it.

## 4. Backlog snapshot (2026-11-22)

All ten are research candidates. None is verified, and every title is a working title.

| ID | Working title | Pillar | Provisional priority | Main risk to check first |
|---|---|---|---|---|
| TP-001 | The Disappearing Forests of Borneo | Earth Investigation | P2 | Island-wide scope; drivers differ by area; cloud cover |
| TP-002 | The Sea That Disappeared — Aral Sea | Earth Through Time | **P1** | The title says "disappeared"; check the current extent before titling |
| TP-003 | The Island Built From Nothing — Palm Jumeirah | Earth Through Time | P1 | "From nothing" is figurative; construction dates need an official source |
| TP-004 | What Happened to Lake Chad? | Earth Investigation | P2 | Headline shrinkage figures vary; recent research on the trend may differ |
| TP-005 | The Hidden Vault Inside a Mountain — Svalbard | Hidden Earth | P3 | It's underground, so there's little to see from orbit |
| TP-006 | The Shortcut That Changed Global Trade — Panama Canal | Human Geography | P2 | It predates satellites; trade figures must be dated |
| TP-007 | The Roads Cutting Through the Amazon | Earth Investigation | P2 | Choose one road and segment; attribute causes carefully |
| TP-008 | How Tokyo Became a Megacity | Earth Through Time | P2 | Most growth predates 1972; "megacity" depends on definition |
| TP-009 | The Desert at the Center of the Lithium Race — Atacama | Human Geography | P2 | "At the center" needs a dated source; water-impact claims are disputed |
| TP-010 | The Giant Eye in the Sahara — Richat Structure | Hidden Earth | P1 | Myths (impact crater, Atlantis); scale figures must be cited |

Priorities are provisional and set by expected evidence strength. Replace them with the scores once research starts. Full research questions, candidate sources and risks are in `CONTENT/idea_bank.csv`.

**Pillar balance of the backlog:** Earth Investigation 3 (30 %), Earth Through Time 3 (30 %), Hidden Earth 2 (20 %), Human Geography 2 (20 %). Hidden Earth is below its 25 % target, so the next ideas added should be Hidden Earth.

### Recommended first episode: TP-002, Aral Sea

- The change is visible at the resolution of free, public-domain archives, Landsat and MODIS, so the rights are low-risk.
- The topic is covered by official and scientific sources, so the claim ledger can be filled from primary material.
- It runs the whole before/after pipeline: multi-date imagery, same-season matching, co-registration, dated evidence tags and the claim ladder. The first episode should exercise every stage.
- Its working title must be checked against the evidence before publishing, which also tests the title rule.

TP-010 (Richat) is the recommended second episode. It is a single-scene story, which makes the edit simpler, and it adds to the under-target Hidden Earth pillar.

## 5. Story shapes

Three repeatable shapes map onto the five-beat script structure (hook, discovery, evidence, explanation, conclusion):

| Shape | Best for | Beat flow |
|---|---|---|
| **Before / After** | Earth Through Time, Earth Investigation | The change in one image → where and how big → evidence across dates → sourced cause → what it means now |
| **What Is This?** | Hidden Earth | The strange shape → where and how big → a closer look → the explanation (and myth vs. evidence) → the takeaway |
| **Why Here?** | Human Geography | The structure → where → what it connects or changes → dated history and economics → the takeaway |

## 6. Cadence for one person

Start with **two videos a week**, each in EN and ID. Move to three a week only after four weeks in a row ship on time with every checklist passed.

| Day | Work |
|---|---|
| Mon | Research for next week's two topics, run in parallel: imagery pull, sources, claim ledger |
| Tue | EN scripts, then the ID localization |
| Wed | Storyboards, asset capture, TTS voiceover (EN and ID) with a pronunciation check |
| Thu | Editing |
| Fri | QC on a phone, exports, scheduling, publishing logs |
| Weekend | 30 min: performance check-ins and one note on what to change |

Keep at least two videos at `verified` or later at all times. That buffer protects the schedule when research runs into a dead end.

## 7. Languages and accounts — decision needed

| Option | Pros | Cons |
|---|---|---|
| **A. Separate Indonesian accounts** (e.g. "Topographica Indonesia") | Each audience gets one language; the analytics are clean | Twice the accounts to manage |
| **B. The same accounts, both languages** | Fewer accounts | Mixed-language feeds; harder to read what works for which audience |

Recommendation: **A**, and start the Indonesian accounts once the English pipeline has shipped four videos. Until then, write and file the ID scripts anyway, so the localization habit is built from day one.

## 8. Platform notes

| | YouTube Shorts (primary) | Instagram Reels | TikTok |
|---|---|---|---|
| Title | ≤ ~50 characters, accurate | — (the first caption line acts as the title) | — (the first caption line acts as the title) |
| Sources | Full list in the description, plus a pinned comment | Main sources in the caption | Main sources in the caption |
| Captions | Burned in; also upload the .srt | Burned in | Burned in |
| Hashtags | 3–5 relevant | 3–5 relevant | 3–5 relevant |
| Watch for | Video language setting; the altered or synthetic content disclosure (AI voice) | How the cover crops on the profile grid; the AI label for AI audio | The AI-generated content label for AI audio |

## 9. Measuring and learning

Log each upload at **48 hours, 7 days and 28 days** in `ANALYTICS/performance_log.csv`.

| Column | Where to find it |
|---|---|
| `views` | Each platform's analytics |
| `avg_view_duration_sec`, `avg_pct_viewed` | YouTube Studio, TikTok and Instagram insights, where available |
| `stayed_to_watch_pct` | YouTube Studio's "viewed vs. swiped away" figure for Shorts; leave it empty where a platform has no equivalent |
| `likes`, `comments`, `shares`, `saves`, `subs_gained` | Each platform's analytics |

**Monthly review (30 min):**

1. Compare like with like: same pillar, same language, same platform.
2. Look at which hooks and story shapes kept viewers past the first 3 seconds and to the end.
3. Change one thing at a time (hook type, length or opening shot), so you can tell what worked.
4. Write the decision in the `notes` column of the month's last performance row.

Comments that point out errors go to the corrections process (SOP stage 10). A fast, public correction is part of the brand.

## 10. Adding ideas

1. Take the next free ID; IDs are never reused.
2. Add a row to `idea_bank.csv` with a working title, the pillar, the place and a one-sentence research question.
3. Leave the scores, coordinates and sources empty until research starts.
4. Add a row to `location_database.csv` with the place name only.
5. If the working title states a fact, write "title to verify" in `verification_risks`.
