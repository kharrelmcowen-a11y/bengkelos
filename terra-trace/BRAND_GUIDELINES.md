# TERRA TRACE — Brand Guidelines

> Version 0.1, 2026-11-22. Sections marked **DRAFT** are waiting on the content-style decision (see `RESEARCH/style_references.md`). Everything else is fixed.

## 1. Identity

| | |
|---|---|
| Name | TERRA TRACE: all capitals in the logo and on screen, "Terra Trace" in running text |
| Tagline | The Stories Written on Earth. |
| Indonesian tagline (DRAFT) | Kisah yang Tertulis di Bumi. |
| Positioning | A global documentary channel that investigates Earth's geography, hidden places, environmental change, human activity, infrastructure and historical transformation, using satellite imagery and factual storytelling |
| Audience | Global, curious, short on time; trusts evidence more than hype |
| Languages | English (primary), Indonesian (secondary, localized rather than translated) |
| Platforms | YouTube Shorts (primary); Instagram Reels and TikTok (distribution) |
| Format | 9:16, 1080×1920, 40–60 s, narrated documentary |

**What we are:** investigators reading the surface of the planet. The satellite image is the witness, the narrator is the analyst, and the sources are the case file.

**What we are not:** a mystery channel, a doom channel or a "you won't believe this" channel.

## 2. Voice

### Five traits, each with its limit

| Trait | Sounds like | Never sounds like |
|---|---|---|
| Investigative | "Look at the northern shore. In [year], the water reached this line." | "What they found will shock you." |
| Evidence-driven | "Landsat images from [year] and [year] show…" | "Experts say…" (which experts?) |
| Restrained | "The lake is now a fraction of its former size," followed by the source | "The lake has been DESTROYED." |
| Educational | One mechanism, explained clearly | Ten facts with no thread between them |
| Cinematic | Short sentences with rhythm, and a pause before the reveal | Stacked adjectives, purple prose |

### The claim ladder

Every factual sentence in a script sits on one rung, and the rung decides the wording. The research file's claim ledger (section 8 of `RESEARCH/research_template.md`) records the rung of each claim.

| Rung | What it is | English pattern | Pola bahasa Indonesia | Requires |
|---|---|---|---|---|
| 1 · Observed | Visible in our imagery | "The imagery shows…" / "Here, in [year]…" / "Compare the two images…" | "Citra satelit memperlihatkan…" / "Di sini, pada [tahun]…" | The image or images, with dates |
| 2 · Measured | A value we derived from imagery | "Measured on these images, roughly…" | "Diukur dari citra ini, kira-kira…" | Method written in the research file |
| 3 · Reported | A fact or number from an official or scientific source | "According to [source]…" / "[Agency] reports…" | "Menurut [sumber]…" | A registry row; the source named on screen or in the description |
| 4 · Established | The explanation that sources agree on | "The main cause, scientists agree, was…" | "Para ilmuwan sepakat, penyebab utamanya…" | Two or more independent sources, or one authoritative review |
| 5 · Hypothesis | Proposed but not proven | "One explanation is…" / "Researchers suspect…" / "It is not yet clear…" | "Salah satu dugaan…" / "Belum diketahui pasti…" | Labelled as a hypothesis; never used in a title |

**The visual must never claim a higher rung than the narration.** A line on a map is a claim too.

### Words we avoid

Avoid *shocking*, *insane*, *terrifying*, *scientists are baffled* and *what they don't want you to know*. Avoid *nobody knows* unless a source says so. Don't use *proof* or *proven* for anything below rung 4. Don't use *destroyed*, *vanished* or *dead* for something that has shrunk or declined. Don't use *mysterious* in place of an explanation that exists. Don't present a fringe theory (lost civilisations, cover-ups) as an open question.

### Titles

- The video must answer the title.
- A question title is fine if the video answers the question.
- Name a cause in a title only if it is on rung 4.
- Keep titles to about 50 characters or fewer, so they read in full in the feed. This is a house rule, not a platform limit.
- Every title in the idea bank is a working title until research is verified.

## 3. Visual identity

### Fixed principles

1. **The image is the hero.** Graphics sit on top, small, and leave the evidence readable.
2. **Provenance is visible.** Every satellite shot carries an evidence tag.
3. **One accent colour,** used only for what the narration is talking about at that moment.
4. **Motion serves reading.** Use slow push-ins and holds. Never use shakes, glitches, light leaks or fake lens effects on imagery.
5. **Nothing generic-AI.** No AI-generated images, no AI upscaling or "enhancement" of satellite imagery, no AI frame interpolation and no AI "cinematic" filters.

### The evidence tag (signature element)

A small block of monospace text sits top-left inside the safe zone on every satellite shot, for the whole time the shot is on screen:

```
SENTINEL-2 · MSI · YYYY-MM-DD
Contains modified Copernicus Sentinel data YYYY
FALSE COLOUR (NIR)            ← third line only when it applies
```

- Line 1 gives the platform, sensor and acquisition date, read from the provider's metadata.
- Line 2 gives the required credit in short form (see SOP Appendix A).
- Line 3 appears only for false colour, radar (SAR) or a mosaic built from several dates.
- In a before/after comparison, each image carries its own tag.
- For Google Earth imagery, keep Google's own attribution (Google Earth and the listed imagery providers) visible as well. If the 9:16 crop cuts it off, re-type it exactly in the safe zone.

The tag is how the brand looks, and it is also how we meet the licence terms. One element does both jobs.

### Colour — DRAFT

| Token | Hex | Use |
|---|---|---|
| Ink | `#0E1113` | Title and end cards; text boxes over imagery at 70–85 % opacity |
| Paper | `#F3F1EC` | Primary text |
| Trace (accent) | `#FFB000` | The single line or feature the narration names right now |
| Past | `#8EC9D6` | Historical extents and earlier dates, always dashed |
| Muted | `#9AA0A6` | Secondary labels, line 2 of the evidence tag |

- Don't use pure red. It reads as alarm, and the brand doesn't sound alarms.
- **Desert rule:** amber disappears on sand and salt flats (Sahara, Atacama). On those scenes, draw the trace in Paper with a 2 px Ink outline.
- Text over imagery always sits on an Ink box or has an outline. Never put bare text on a busy image.

### Typography — DRAFT

| Role | Font | Size at 1080×1920 |
|---|---|---|
| Titles and title cards | Inter Bold | 80–96 px |
| Captions | Inter SemiBold | 54–64 px |
| Evidence tags, coordinates, data labels | IBM Plex Mono Medium | 28–32 px |

- Both fonts are free under the SIL Open Font License and cover Indonesian. Keep the font files in `ASSETS/brand/fonts/`.
- Nothing that has to be read goes below 28 px.

### Annotation grammar

Each mark means one thing. That way the viewer can read our maps the same way in every video.

| Mark | Meaning | Rule |
|---|---|---|
| Solid line in Trace colour | Outline of a feature visible in the current image | Draw it only on the image it describes |
| Dashed line in Past colour, labelled with a year | The feature's extent in an earlier image | The year must match a registered image |
| Dotted line labelled "approx." | An approximate or estimated boundary, e.g. taken from a source map | Label "approx." and cite the source |
| Pin with label | A location: its name, plus coordinates in mono | Coordinates come from `location_database.csv`, verified |
| Arrow | The direction of a change you can see | Never use one for a cause, or point it at something outside the frame |
| Number label | A value | Must be rung 2 (method recorded) or rung 3 (source shown) |
| Scale bar | A distance reference | Required on any shot where size matters |
| North arrow | Shows the image is rotated from north-up | The default is north-up. A rotated image must show north |

### Layout and safe zones (1080×1920)

These are conservative working margins, because platform overlays change over time. Check them by uploading a private test video to each platform. The overlay `PRODUCTION/editing_templates/safe_zone_guide_1080x1920.png` draws them; put it on the top track and switch it off before export.

```
┌──────────────────────────┐  y = 0
│   platform UI, no text   │
├──────────────────────────┤  y = 220
│ ▌evidence tag            │
│                          │ ← right 180 px:
│        main image        │   action buttons,
│      and annotations     │   no text
│                          │
│   captions (lower part   │
│   of the safe area)      │
├──────────────────────────┤  y = 1440
│  title, channel, caption │
│   UI — no text, no key   │
│        annotations       │
└──────────────────────────┘  y = 1920
  x = 60 ……… x = 900 is text-safe
```

### Motion

- **Push-in:** slow and steady, about 100 % → 110 % over a shot. Capture the image larger than the frame so the push-in never enlarges past the image's own detail.
- **Before/after:** a hard cut, a straight-line wipe, or a short dissolve. All three need co-registered images (same area, same scale, same orientation) with both dates visible.
- **Never:** morphing, AI-interpolated "in-between" frames, or a timelapse built from images that are not from the dates stated.
- **Orbit zoom (DRAFT):** allowed only on real imagery with attribution, for 2 s at most. It is the most generic opener in the genre.

### Sound — DRAFT

- Narration comes first. If you notice the music while listening to the words, the music is too loud.
- Mix to about −14 LUFS integrated, with true peak at or below −1 dBTP.
- Use only licensed music, and record each track in `source_registry.csv` (`source_type` = `audio`). A track cleared for one platform may not be cleared for the others, so check every platform you post to.
- Keep sound design subtle. Never put an impact hit under a claim that isn't verified.

### Logo and end card — not yet designed

- The logo must work as a small avatar and in one colour. Proposed: a wordmark "TERRA TRACE", with an optional mark made of a single trace line across a contour or horizon.
- End card (the last 1–2 s): wordmark and tagline. No begging for subscribers; one line such as "Follow the next trace" is enough.
- Store everything in `ASSETS/brand/`.

## 4. Indonesian localization

The Indonesian version is written for Indonesian viewers. It is not a word-for-word copy of the English.

1. **Localize meaning, rhythm and examples, not words.** Rewrite each beat so it sounds natural read aloud.
2. **Keep the same facts.** Same claims, same sources and same numbers. Nothing that changes a claim is added or dropped.
3. **Time it, don't count it.** Indonesian words tend to be longer, so the ID script usually needs fewer words for the same seconds. Read it aloud with a timer.
4. **Register (DRAFT):** standard but relaxed Indonesian, neither stiff officialese nor heavy slang. Use *kita* for shared discovery and avoid *Anda*.
5. **Numbers:** 1.250 (a point for thousands) and 2,5 (a comma for decimals). On screen write *km²*; in narration say *kilometer persegi*.
6. **Dates:** say *22 November 2026* in narration. Evidence tags keep `YYYY-MM-DD` in both languages.
7. **Place names:** use the standard Indonesian form: *Laut Aral*, *Danau Chad*, *Terusan Panama*, *Gurun Atacama*, *Gurun Sahara*, *Struktur Richat*, *Hutan Amazon*. Borneo becomes *Kalimantan*, which in Indonesian names the whole island; say so explicitly when you mean only the Indonesian provinces.
8. **On-screen text:** if a line is too long, rewrite it shorter rather than shrinking the font.
9. **Credit lines stay in their original wording** in both languages, because the licences specify that wording.

### Example

| | |
|---|---|
| EN | "From orbit, it looks like an eye staring back at space." |
| ID, literal (wrong) | "Dari orbit, ini terlihat seperti sebuah mata yang menatap kembali ke luar angkasa." |
| ID, localized (right) | "Dari luar angkasa, bentuknya mirip mata raksasa yang balas menatap." |

### Glossary

| English | Indonesian | Note |
|---|---|---|
| satellite imagery | citra satelit | *foto satelit* is fine in casual narration |
| acquisition date | tanggal perekaman | |
| true colour / false colour | warna alami / warna semu | |
| resolution | resolusi | |
| deforestation | deforestasi / penggundulan hutan | pick one per script |
| land-use change | perubahan tata guna lahan | |
| coastline | garis pantai | |
| artificial island / land reclamation | pulau buatan / reklamasi | |
| evaporation pond | kolam penguapan | |
| shipping route | jalur pelayaran | |
| basin | cekungan / daerah aliran sungai | depends on context |
| megacity | megapolitan | keep it consistent across videos |
| according to | menurut | |
| researchers suspect | para peneliti menduga | rung 5 |
| evidence | bukti | |

## 5. Across platforms

- One master edit serves all three platforms; only the metadata changes. Re-export only if a platform's interface covers something important.
- Captions are burned in on every platform.
- Never upload a file carrying another platform's or an editor's watermark.

## 6. Quick check

| Do | Don't |
|---|---|
| Show the date and source of every image | Show imagery with no date |
| Compare images from the same season | Compare a dry-season image with a wet-season one without saying so |
| Say "according to" and name the source | Say "experts say" |
| Let one amber line carry the story | Fill the frame with arrows and labels |
| End with what the evidence shows | End with speculation |
