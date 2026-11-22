# Topographica — Brand Guidelines

> Version 0.2, 2026-11-22. The style was decided on 2026-11-22: a hybrid of evidence and graphics, AI-voice narration, and a relaxed but smart Indonesian register. The reasoning is in `RESEARCH/style_references.md`. Items still open are marked **DRAFT**.

## 1. Identity

| | |
|---|---|
| Name | **Topographica.** Written TOPOGRAPHICA in the wordmark, "Topographica" in running text |
| Channel | YouTube @topographica |
| Tagline | The Stories Written on Earth. |
| Indonesian tagline | Kisah yang Tertulis di Bumi. |
| Positioning | A global documentary channel that investigates Earth's geography, hidden places, environmental change, human activity, infrastructure and historical transformation, using satellite imagery and factual storytelling |
| Audience | Global, curious, short on time; trusts evidence more than hype |
| Languages | English (primary), Indonesian (secondary, localized rather than translated) |
| Platforms | YouTube Shorts (primary); Instagram Reels and TikTok (distribution) |
| Format | 9:16, 1080×1920, 40–60 s, documentary narrated by a synthetic (AI) voice |

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

The English version is calm and investigative. The Indonesian version uses the same traits in a relaxed spoken register (§5).

### The claim ladder

Every factual sentence in a script sits on one rung, and the rung decides the wording. The research file's claim ledger (section 8 of `RESEARCH/research_template.md`) records the rung of each claim.

| Rung | What it is | English pattern | Pola bahasa Indonesia (santai) | Requires |
|---|---|---|---|---|
| 1 · Observed | Visible in our imagery | "The imagery shows…" / "Here, in [year]…" / "Compare the two images…" | "Di citra ini kelihatan…" / "Coba bandingin dua citra ini…" | The image or images, with dates |
| 2 · Measured | A value we derived from imagery | "Measured on these images, roughly…" | "Kalau diukur dari citra ini, kira-kira…" | Method written in the research file |
| 3 · Reported | A fact or number from an official or scientific source | "According to [source]…" / "[Agency] reports…" | "Menurut [sumber]…" / "Data [lembaga] nunjukin…" | A registry row; the source named on screen or in the description |
| 4 · Established | The explanation that sources agree on | "The main cause, scientists agree, was…" | "Para ilmuwan sepakat, penyebab utamanya…" | Two or more independent sources, or one authoritative review |
| 5 · Hypothesis | Proposed but not proven | "One explanation is…" / "Researchers suspect…" / "It is not yet clear…" | "Ada dugaan…" / "Peneliti menduga…" / "Belum pasti, tapi…" | Labelled as a hypothesis; never used in a title or a headline |

**Neither the visual nor the headline may claim a higher rung than the narration.** A line or a coloured region on a map is a claim too.

### Words we avoid

Avoid *shocking*, *insane*, *terrifying*, *scientists are baffled* and *what they don't want you to know*. Avoid *nobody knows* unless a source says so. Don't use *proof* or *proven* for anything below rung 4. Don't use *destroyed*, *vanished* or *dead* for something that has shrunk or declined. Don't use *mysterious* in place of an explanation that exists. Don't present a fringe theory (lost civilisations, cover-ups) as an open question. The Indonesian equivalents apply too: *bikin merinding*, *gila*, *rahasia yang ditutupi*, *hilang total* (when it hasn't), and the like.

### Titles

- **The video must answer the title.**
- **Preferred form:** a "Why…?" question, optionally followed by a short twist in brackets. In Indonesian, "Kenapa…?" with an optional twist. Example shape: *Why Did This Sea Shrink? (It Wasn't the Climate)*, but only if the evidence supports the twist.
- **Myth vs. evidence** is allowed for Hidden Earth: *(Myth vs. Science)* / *(Mitos vs Sains)*, only when the video shows the evidence.
- Name a cause in a title only if it is on rung 4.
- Keep titles to about 50 characters or fewer, so they read in full in the feed. This is a house rule, not a platform limit.
- Every title in the idea bank is a working title until research is verified.

## 3. Visual identity — hybrid evidence and graphics

Two kinds of image appear on screen, and the viewer must always be able to tell them apart:

| | Evidence imagery | Context map |
|---|---|---|
| What | A real satellite image of a specific date, showing what the narration claims | A basemap that shows *where* something is, plus explainer graphics |
| Source | Landsat, Sentinel, Worldview, Google Earth (SOP Appendix A) | Public-domain or open basemaps and boundary data (SOP Appendix A) |
| Tag | **Evidence tag**: `PLATFORM · SENSOR · YYYY-MM-DD` + credit | **Map tag**: `MAP · [source]`, with no date because it isn't evidence of a moment |
| Graphics allowed | Trace lines, past lines, pins, arrows, numbers, scale bar | All of those, plus region fills, route lines, pulse markers and pictograms |

### Fixed principles

1. **The image is the hero.** Graphics sit on top and leave the evidence readable.
2. **Provenance is visible.** Every shot carries an evidence tag or a map tag.
3. **One accent colour,** used only for what the narration is talking about at that moment.
4. **Motion serves reading.** Use slow push-ins, holds and clean draw-ons. Never use shakes, glitches, light leaks or fake lens effects.
5. **No characters and no mascots.** Explainer graphics are flat pictograms and map marks, never cartoon faces or figures.
6. **No AI imagery.** No AI-generated images, no AI upscaling or "enhancement" of satellite imagery, no AI frame interpolation and no AI filters. Narration uses a synthetic voice (§4), and that is the only AI in a Topographica video.

### Frame layout (1080×1920)

```
y 0     ┌────────────────────────────┐
        │   platform UI — no text    │
y 240   ├────────────────────────────┤
        │   HEADLINE LINE 1 (Paper)  │  headline zone, centred,
        │   HEADLINE LINE 2 (amber)  │  y 240–430
y 450   │ ▌LANDSAT 8 · OLI · YYYY-MM │  evidence / map tag, left,
        │ ▌credit line               │  y 450–520
y 520   │                            │
        │        image focus         │  keep the subject here
        │   (fills, lines, pins)     │  y 520–1140
        │                            │
y 1160  │   caption phrase (Paper)   │  captions, y 1160–1400
y 1440  ├────────────────────────────┤
        │ title / channel UI—no text │
y 1920  └────────────────────────────┘
          text-safe x 60–900 (right 180 px: action buttons)
```

The margins are conservative working values, because platform overlays change over time. Check them by uploading a private test video to each platform. The overlay `PRODUCTION/editing_templates/safe_zone_guide_1080x1920.png` draws these zones; put it on the top track and switch it off before export.

### Headline (adopted from the reference, made ours)

- Every beat has a two-line headline that changes with the beat. Line 1 sets up; line 2 is the punch.
- Line 1 is in Paper and line 2 in Trace amber. All caps, Inter ExtraBold, 68–80 px, with a 3 px Ink stroke or a soft Ink shadow.
- 2–4 words per line. The headline says what the shot shows or asks; it never claims more than the narration (claim ladder).
- In the ID version the headline is rewritten in Indonesian, not translated word for word.

### The evidence tag (signature element)

```
SENTINEL-2 · MSI · YYYY-MM-DD
Contains modified Copernicus Sentinel data YYYY
FALSE COLOUR (NIR)            ← third line only when it applies
```

- Set it in IBM Plex Mono Medium, 28–30 px, Paper on an Ink box at 80 % opacity, left-aligned at x 72, y 450–520.
- Line 1 gives the platform, sensor and acquisition date, read from the provider's metadata. Line 2 gives the required credit (SOP Appendix A). Line 3 appears only for false colour, radar (SAR) or a mosaic built from several dates.
- In a before/after comparison, each image carries its own tag.
- For Google Earth imagery, keep Google's own attribution (Google Earth and the listed imagery providers) visible as well. If the 9:16 crop cuts it off, re-type it exactly in the safe zone.
- On a context map, use the map tag instead: `MAP · NASA Blue Marble`, `MAP · Natural Earth`, `MAP · © OpenStreetMap contributors`.

### Colour

| Token | Hex | Use |
|---|---|---|
| Ink | `#0E1113` | Text boxes over imagery at 70–85 % opacity; text strokes; title and end cards |
| Paper | `#F3F1EC` | Primary text, headline line 1, captions, pictograms |
| Trace (accent) | `#FFB000` | Headline line 2; the line, region or point the narration names right now |
| Past | `#8EC9D6` | Historical extents and earlier dates, always dashed |
| Muted | `#9AA0A6` | Secondary labels, line 2 of the tags |

- Don't use pure red. It reads as alarm, and the brand doesn't sound alarms.
- **Desert rule:** amber disappears on sand and salt flats (Sahara, Atacama). On those scenes, draw lines and region outlines in Paper with a 2 px Ink outline; the headline keeps its amber line 2.
- Text over imagery always sits on an Ink box or has a stroke. Never put bare text on a busy image.

### Typography

| Role | Font | Size at 1080×1920 |
|---|---|---|
| Headline | Inter ExtraBold, all caps | 68–80 px |
| Captions | Inter SemiBold, sentence case | 48–56 px |
| Tags, coordinates, data labels | IBM Plex Mono Medium | 28–30 px |
| Title and end cards | Inter Bold | 80–96 px |

- Both fonts are free under the SIL Open Font License and cover Indonesian. Keep the font files in `ASSETS/brand/fonts/`.
- Nothing that has to be read goes below 28 px.

### Graphics grammar

Each mark means one thing. That way the viewer can read our maps the same way in every video.

| Mark | Meaning | Rule | Evidence imagery? |
|---|---|---|---|
| Solid line in Trace colour | Outline of a feature visible in the current image | Draw it only on the image it describes | yes |
| Dashed line in Past colour, labelled with a year | The feature's extent in an earlier image | The year must match a registered image | yes |
| Dotted line labelled "approx." | An approximate or estimated boundary | Label "approx." and cite the source | yes |
| **Region fill:** Trace colour at 35 % with a solid Trace outline | *This* area is the subject | Boundaries from cited boundary data (Natural Earth, OSM or an official source), never hand-drawn guesses | context maps only |
| **Pulse marker:** one expanding ring, then a pin | *Here* | One pulse only, then a static pin with its name, plus coordinates in mono taken from `location_database.csv` | yes |
| **Route line:** a dotted line drawn on along a path | Movement or a connection: a trade route, a migration, a road | The route must be sourced; label "approx." when it is | context maps only |
| Arrow | The direction of a change you can see | Never use one for a cause, or point it at something outside the frame | yes |
| Number label | A value | Must be rung 2 (method recorded) or rung 3 (source shown) | yes |
| **Pictogram:** a monoline icon in Paper, 3 px stroke, about 64–96 px | A thing in the explanation (a dam, a ship, a crop, a factory) | No faces, characters or mascots; icons from our own drawings or a licensed set (SOP Appendix A) | context maps only |
| Scale bar | A distance reference | Required on any shot where size matters | yes |
| North arrow | Shows the image is rotated from north-up | The default is north-up. A rotated image must show north | yes |

Never put a pictogram, region fill or route line over evidence imagery. Those marks would blur the line between what the satellite saw and what we are explaining.

### Motion

- **Push-in:** slow and steady, about 100 % → 110 % over a shot. Capture the image larger than the frame so the push-in never enlarges past the image's own detail.
- **Draw-on:** lines, routes and region outlines draw on over 0.4–0.8 s, then hold.
- **Before/after:** a hard cut, a straight-line wipe, or a short dissolve. All three need co-registered images (same area, same scale, same orientation) with both dates visible.
- **Map to evidence:** cut or push from the context map into the evidence image, and swap the map tag for the evidence tag at the cut.
- **Never:** morphing, AI-interpolated "in-between" frames, or a timelapse built from images that are not from the dates stated.
- **Orbit zoom:** allowed only on real imagery with attribution, for 2 s at most.

### Sound

- Narration comes first. If you notice the music while listening to the words, the music is too loud.
- Mix to about −14 LUFS integrated, with true peak at or below −1 dBTP.
- Use only licensed music, and record each track in `source_registry.csv` (`source_type` = `audio`). A track cleared for one platform may not be cleared for the others, so check every platform you post to.
- Keep sound design subtle: a soft tick on a draw-on, a low whoosh on a wipe. Never put an impact hit under a claim that isn't verified.

### Ending — DRAFT (recommended default, not yet confirmed)

- The last beat ends on **one evidence question** to the viewer, shown as a headline. For example "WHAT ELSE CHANGED / BETWEEN THESE YEARS?" or "WHERE SHOULD WE / LOOK NEXT?"; in Indonesian, "APA LAGI YANG BERUBAH? / TULIS DI KOMENTAR".
- Then 1 s of end card: the TOPOGRAPHICA wordmark and the tagline.
- No begging for subscribers, and no questions that are pure bait.

### Logo — not yet designed

- It must work as a small avatar and in one colour.
- Proposed: a wordmark "TOPOGRAPHICA" in a geometric sans or mono, with an optional mark of a few contour lines crossed by a single amber trace line.
- Store everything in `ASSETS/brand/`.

## 4. Narration — synthetic (AI) voice

The narration is generated with a text-to-speech tool, in both languages.

1. **One voice per language, for every video.** The voice is part of the brand, so pick it once and record the tool, voice name and settings (speed, style or stability) in `source_registry.csv` (`source_type` = `audio`). Use the same settings every time.
2. **Licensed for commercial use.** The tool's plan must allow monetized use on all three platforms. Save the terms you agreed to, with the date, in the registry `notes`.
3. **Never clone or imitate a real person's voice** without their written consent, and don't use voices sold as sounding like a celebrity.
4. **Disclose it.** Every description includes "Narration: AI voice". Answer each platform's AI or synthetic-content question truthfully under its current rules. Transparency is the brand.
5. **Pronunciation is our responsibility.** Before generating, check every place name, technical term and number against `PRODUCTION/tts_lexicon.csv`. Listen to every take; a mispronounced place name is a factual error.
6. **Write for the ear.** Use short sentences. Write numbers the way they should be read ("about two thousand", not "~2,000"). Put a full stop where a pause should fall.
7. **Timing:** the generated audio, not a read-aloud, sets the duration. Measure it and fit it to the beat budget (script template).

## 5. Indonesian localization — relaxed but smart

The Indonesian version is written for Indonesian viewers. It is not a word-for-word copy of the English.

1. **Register:** relaxed spoken Indonesian of the kind you'd use explaining something to a friend: *nggak*, *gimana*, *kayak*, *bikin*, *banget*. Use *kita* for shared discovery and *kamu* when speaking to the viewer. Avoid *Anda*, stiff officialese and heavy slang.
2. **Relaxed in tone, strict on facts.** The claim ladder applies exactly as in English. A casual phrase never inflates a claim: *bikin danau ini nyusut* is fine only if the cause is rung 4.
3. **Local metaphors are welcome** when they make the mechanism clearer, such as traffic, *mudik*, a rice field or a market. A metaphor replaces an English one; it never adds a fact.
4. **No mockery.** Jokes never target people, communities, ethnic groups or the victims of a disaster.
5. **Keep the same facts.** Same claims, same sources and same numbers. Nothing that changes a claim is added or dropped.
6. **Time the audio.** Indonesian words tend to be longer, so the ID script usually needs fewer words for the same seconds. Measure the generated audio.
7. **Numbers:** 1.250 (a point for thousands) and 2,5 (a comma for decimals). On screen write *km²*; in narration write it out for the voice: *kilometer persegi*.
8. **Dates:** write *22 November 2026* for the voice. Tags keep `YYYY-MM-DD` in both languages.
9. **Place names:** use the standard Indonesian form: *Laut Aral*, *Danau Chad*, *Terusan Panama*, *Gurun Atacama*, *Gurun Sahara*, *Struktur Richat*, *Hutan Amazon*. Borneo becomes *Kalimantan*, which in Indonesian names the whole island; say so explicitly when you mean only the Indonesian provinces.
10. **TTS and casual words:** synthetic voices often mispronounce *nggak*, *gimana* and English loanwords. Add every problem word to `PRODUCTION/tts_lexicon.csv` once you find its fix.
11. **Headlines and on-screen text:** rewrite them shorter rather than shrinking the font.
12. **Credit lines stay in their original wording** in both languages, because the licences specify that wording.

### Example

| | |
|---|---|
| EN | "From orbit, it looks like an eye staring back at space." |
| ID, literal (wrong) | "Dari orbit, ini terlihat seperti sebuah mata yang menatap kembali ke luar angkasa." |
| ID, santai-cerdas (right) | "Dari luar angkasa, bentuknya kayak mata raksasa yang balik natap kita." |

### Glossary

| English | Indonesian | Note |
|---|---|---|
| satellite imagery | citra satelit / foto satelit | either is fine in the relaxed register |
| acquisition date | tanggal perekaman | |
| true colour / false colour | warna alami / warna semu | |
| resolution | resolusi | |
| deforestation | deforestasi / penggundulan hutan | pick one per script |
| land-use change | perubahan tata guna lahan / alih fungsi lahan | |
| coastline | garis pantai | |
| artificial island / land reclamation | pulau buatan / reklamasi | |
| evaporation pond | kolam penguapan | |
| shipping route | jalur pelayaran | |
| basin | cekungan / daerah aliran sungai | depends on context |
| megacity | megapolitan | keep it consistent across videos |
| according to | menurut | |
| researchers suspect | peneliti menduga | rung 5 |
| evidence | bukti | |

## 6. Across platforms

- One master edit serves all three platforms; only the metadata changes. Re-export only if a platform's interface covers something important.
- Headlines and captions are burned in on every platform.
- Never upload a file carrying another platform's or an editor's watermark.

## 7. Quick check

| Do | Don't |
|---|---|
| Show the date and source of every evidence image | Show evidence imagery with no date |
| Label context maps as maps | Let a basemap pass as evidence |
| Compare images from the same season | Compare a dry-season image with a wet-season one without saying so |
| Say "according to" and name the source | Say "experts say" |
| Let one amber line or region carry the story | Fill the frame with arrows, icons and labels |
| Use pictograms on maps | Put icons or cartoons over satellite evidence |
| Disclose the AI voice | Hide that the narration is synthetic |
| End with what the evidence shows, then one evidence question | End with speculation or bait |
