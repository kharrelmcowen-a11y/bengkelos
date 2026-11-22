# TERRA TRACE — Production SOP

This is how one person takes a video from idea to published and measured. Each stage gives the status to set in `idea_bank.csv`, what to do, what it produces and the gate that ends it.

| # | Stage | `status` | Output | Gate | Starting time estimate* |
|---|---|---|---|---|---|
| 0 | Intake | `idea` | idea_bank row, location row | — | 10 min |
| 1 | Research | `researching` → `verified` | research file, registry rows, imagery | A. Research | 2–3 h |
| 2 | English script | `scripting` | EN script | — | 1 h |
| 3 | Indonesian localization | `scripting` | ID script | B. Script | 45 min |
| 4 | Storyboard and assets | `storyboarding` | storyboard, asset pull | — | 45 min |
| 5 | Voiceover | `storyboarding` | VO takes (EN, ID) | — | 30 min |
| 6 | Edit | `editing` | edited timeline | — | 2–3 h |
| 7 | Export and QC | `qc` | exports, captions, QC file | C. Edit, D. Export | 45 min |
| 8 | Publish | `scheduled` → `published` | release record, publishing log rows | publishing checklist | 30 min |
| 9 | Measure | `published` | performance log rows | — | 10 min per check-in |
| 10 | Corrections | (any) | correction note | — | as needed |

\* These are guesses to start from, about 8–10 h per video in two languages. Replace them with your own times after three videos.

---

## Stage 0 — Intake

1. Add a row to `CONTENT/idea_bank.csv` with the next free ID, a working title, the pillar (CONTENT_STRATEGY §2) and a one-sentence research question.
2. Add a row to `RESEARCH/location_database.csv` with the place name only. Leave the coordinates empty.

## Stage 1 — Research

1. Copy `RESEARCH/research_template.md` to `RESEARCH/episodes/TT-XXX_research.md` and set the status to `researching`.
2. **Sharpen the question.** It should be one sentence that the evidence can answer in 55 seconds.
3. **Verify the location.** Find the feature in two independent sources, for example an official or scientific source plus the imagery itself. Record the coordinates in `location_database.csv` as decimal degrees for the centre of the area of interest, with the source ID. Set `coordinate_status` to `verified` only when both sources agree.
4. **Pull imagery.** Start with the open archives (Landsat, Sentinel, Worldview), then use Google Earth for detail. For every image, add its row to `source_registry.csv` the moment you download it, and name the file with its SRC ID (Appendix C).
5. **Choose comparison dates honestly:**
   - Use the same season. Vegetation, snow and water levels change through the year, so a dry-season image against a wet-season one fakes a trend.
   - Use cloud-free scenes, or note the cloud cover.
   - Note gaps and artefacts. For example, Landsat 7 images from after its scan-line corrector failed in 2003 have striped gaps.
   - If same-season images don't exist, say so in the script.
6. **Write observations.** Section 5 of the research file is only for what a viewer can see. Leave out any explanation of why.
7. **Gather explanations.** Use official and scientific sources first; news is only for finding the primary source. Register each one.
8. **Fill the claim ledger.** Write every claim the script might make, with its rung (BRAND_GUIDELINES §2) and source IDs.
9. **Separate the conclusions.** Verified conclusions (rungs 1–4) go in section 9; plausible but unproven ideas go in section 10.
10. **Review rights.** Every asset needs a licence and an exact credit line (Appendix A). Anything unclear blocks the video: set it to `on_hold`.
11. **Fill the four scores** in `idea_bank.csv` (CONTENT_STRATEGY §3).
12. **Run gate A** (`TEMPLATES/video_checklist.md`) in `PRODUCTION/qc/TT-XXX_qc.md`. A pass sets the status to `verified`. A fail keeps it at `researching` or sets it to `on_hold`, with the reason in `notes`.

## Stage 2 — English script

1. Copy `TEMPLATES/script_template.md` to `CONTENT/scripts/english/TT-XXX_EN_script.md` and set the status to `scripting`.
2. Write from the claim ledger, not from memory. Every factual sentence carries its claim ID.
3. Keep to the word budget for each beat (it is in the template).
4. Fill in the on-screen text, the visual instructions and the imagery needed for each beat.
5. Read it aloud with a timer. The total must fall between 40 and 60 s, and 90–130 words is the target.
6. Pick a title that the video answers (BRAND_GUIDELINES §2, Titles).

## Stage 3 — Indonesian localization

1. Copy the template to `CONTENT/scripts/indonesia/TT-XXX_ID_script.md`.
2. Rewrite each beat in natural Indonesian (BRAND_GUIDELINES §4). Keep the same claim IDs, sources and numbers, using Indonesian number format.
3. Read it aloud with a timer, and adjust by ear rather than by word count.
4. Fill the "Localization notes" table: what changed, and why.
5. **Run gate B** for both languages.

## Stage 4 — Storyboard and assets

1. Copy `TEMPLATES/storyboard_template.md` to `CONTENT/storyboards/TT-XXX_storyboard.md` and set the status to `storyboarding`.
2. Turn each beat into shots, and link each shot to a registered asset.
3. Plan the evidence tag and credit line for every satellite shot.
4. Plan the annotations using the annotation grammar only. Each one points to a claim ID.
5. Fill the asset pull list. Anything missing goes back to research; never fill a gap with an unregistered image.
6. For each before/after pair, confirm both images are co-registered and from the same season.

## Stage 5 — Voiceover

1. Record in a quiet, soft room. A phone or USB microphone 15–20 cm away is enough.
2. Record 48 kHz WAV, two or three takes of each beat, and keep the best take.
3. Name the files `ASSETS/audio/TT-XXX/TT-XXX_VO_EN_t02.wav`.
4. If a synthetic (TTS) voice is chosen in the style decision, record the tool, the voice and its licence terms in `source_registry.csv` (`source_type` = `audio`), and answer each platform's AI disclosure question truthfully.

## Stage 6 — Edit

1. Start from the editing template (Appendix D) and set the status to `editing`.
2. Work in this order: lay the VO, then lock the picture to the VO, then add annotations, evidence tags and credits, captions, music, and finally the mix.
3. **Allowed processing:** crop; scale (never with AI upscaling); rotation, with a north arrow; brightness, contrast and colour balance applied to the whole image; band combinations (labelled); and aligning the images of a comparison.
4. **Not allowed:** removing or cloning features out, AI fill, local edits that change what the image shows, and sharpening that creates detail.

## Stage 7 — Export and QC

1. Export each language (Appendix B) and set the status to `qc`.
2. Export the captions as .srt into `PRODUCTION/captions/`.
3. **Run gates C and D** on the exported file, not on the timeline. Watch it on a phone, once with sound and once muted.
4. Fix any problems, export v2, and run the gates again. Keep the version number in the filename.

## Stage 8 — Publish

1. Copy `TEMPLATES/publishing_checklist.md` to `CONTENT/published/TT-XXX_release.md` and fill it in.
2. Upload, or schedule and set the status to `scheduled`. Check each platform's metadata against the checklist.
3. Add a row to `ANALYTICS/publishing_log.csv` for each upload (every platform, every language).
4. Set the status to `published` once the video is live.
5. Treat the scripts and the release record as frozen from now on. Changes go through stage 10.

## Stage 9 — Measure

Add rows to `ANALYTICS/performance_log.csv` at 48 h, 7 d and 28 d. CONTENT_STRATEGY §9 covers the monthly review.

## Stage 10 — Corrections

When someone reports an error:

1. **Verify it** against the sources, and add any new source to the registry.
2. **If it is correct and minor** (a label, or a date off without changing the story): pin a correction comment within 24 hours and fix the description.
3. **If it is correct and material** (a misleading claim in the narration or the title): publish a corrected version, set the old one to private, and pin a note on the new one saying what changed.
4. **Log it** in the `corrections` column of `publishing_log.csv` and at the end of the research file.
5. Never change a published claim silently.

---

## Appendix A — Imagery source guide

Credit lines and licences change, so read each provider's current terms before first use and note the date you checked in `source_registry.csv`. The links below were current at setup (2026-11-22).

| Source | Best for | Typical resolution | Archive | Licence and credit |
|---|---|---|---|---|
| **USGS EarthExplorer — Landsat**<br>https://earthexplorer.usgs.gov | Change across decades | 30 m multispectral (Landsat 4–9); 15 m panchromatic (Landsat 7–9); coarser for the early MSS sensor (Landsat 1–5) | From 1972 | Public domain. Suggested credit: "Landsat-[n] image courtesy of the U.S. Geological Survey" or, short, "USGS/NASA Landsat" |
| **Copernicus Browser — Sentinel-2**<br>https://browser.dataspace.copernicus.eu | Recent change, finer detail, frequent revisits | 10 m for visible and near-infrared bands | From 2015 | Free and open. Required notice for processed images (ours always are): "Contains modified Copernicus Sentinel data [year]" |
| **Copernicus Browser — Sentinel-1 (radar)** | Seeing through cloud: floods, ice, cloudy tropics | Depends on mode; not a photograph | From 2014 | Same notice. Always label "RADAR (SAR)" on screen |
| **NASA Worldview**<br>https://worldview.earthdata.nasa.gov | Daily regional views: big lakes, smoke, sediment, snow | About 250 m–1 km (MODIS, VIIRS) | MODIS from 2000 | NASA open data. NASA's GIBS acknowledgment: "We acknowledge the use of imagery provided by services from NASA's Global Imagery Browse Services (GIBS), part of NASA's Earth Science Data and Information System (ESDIS)." Short tag: "NASA Worldview / GIBS" |
| **NASA Earth Observatory**<br>https://science.nasa.gov/earth/earth-observatory | Curated images with expert captions and context, and a good map of the science | Varies | Varies | NASA images are generally free to use. Copy the credit exactly as written on the image page and look for any third-party content. The site moved here from earthobservatory.nasa.gov in December 2025; old links redirect |
| **Google Earth Pro (desktop), historical imagery** and **Google Earth**<br>https://www.google.com/earth/ | High-resolution detail; the historical imagery slider | Varies by place and provider, often far finer than Landsat | Varies by place | Attribution must stay **visible on screen the whole time** the imagery is shown: "Google Earth" plus the imagery providers it lists. End credits alone are not enough. Documentary and educational use is permitted under Google's Geo Guidelines; read them again before any sponsored video: https://about.google/brand-resource-center/products-and-services/geo-guidelines/ |
| **Google Earth Studio**<br>https://earth.google.com/studio/ | Animated camera moves on Google Earth imagery | As above | — | Credit "Google Earth", plus the imagery providers whenever satellite imagery is in frame |

### Sources for explanations (claims on rungs 3–4)

- **Official and intergovernmental bodies:** national geological, space, mapping and statistics agencies; UN bodies (UNEP, FAO, UN DESA); river and lake basin commissions; infrastructure authorities.
- **Scientific datasets:** for example Global Forest Watch (tree-cover loss), the JRC Global Surface Water Explorer (water over time), MapBiomas (land cover in Brazil and elsewhere), and INPE's PRODES/DETER deforestation monitoring.
- **Peer-reviewed papers:** find them through Google Scholar or the journal. Record the DOI in the `url` column. Read the abstract and the relevant section yourself; never cite a paper you haven't opened.
- **News:** use it only to find the primary source. It is never the only support for a number.

### Never used as evidence

- AI-generated, AI-upscaled or AI-"enhanced" satellite images, and AI-interpolated frames between dates.
- Commercial imagery (Maxar, Planet, Airbus and similar) bought or downloaded without a licence that covers online video.
- Screenshots or clips from other channels, or stock footage without a licence.
- Google Earth imagery with its attribution removed or cropped out.

## Appendix B — Export and file specs (house standard)

| Item | Spec |
|---|---|
| Frame | 1080×1920, 9:16, square pixels |
| Frame rate | 30 fps constant; pick one rate and keep it on every video |
| Video | H.264 High profile, VBR around 12–16 Mbps, MP4 container |
| Audio | AAC-LC, 48 kHz, stereo, 320 kbps |
| Loudness | About −14 LUFS integrated, true peak ≤ −1 dBTP |
| Duration | 40–60 s |
| Captions | .srt, UTF-8, one file per language |
| Imagery captures | PNG, or JPEG at maximum quality. For shots with a push-in, capture at least 1.5× the final frame size |

## Appendix C — Naming conventions

| Thing | Pattern | Example |
|---|---|---|
| Video ID | `TT-NNN`, sequential, never reused | `TT-002` |
| Source ID | `SRC-NNNN`, sequential across the whole project | `SRC-0004` |
| Location ID | `LOC-NNN` | `LOC-002` |
| Claim ID | `TT-NNN-CNN`, numbered within one research file | `TT-002-C03` |
| Satellite image | `{video}_{source}_{sensor}_{acquisition-date}_{processing}.{ext}` | `TT-002_SRC-0004_L5-TM_YYYY-MM-DD_TC.png` |
| Annotated still | as above, with `_ANN` added | `TT-002_SRC-0004_L5-TM_YYYY-MM-DD_TC_ANN.png` |
| Map | `{video}_{source}_map_{short-description}.{ext}` | `TT-002_SRC-0010_map_basin.png` |
| Voiceover | `{video}_VO_{lang}_t{take}.wav` | `TT-002_VO_EN_t02.wav` |
| Music track | `ASSETS/audio/library/{track-slug}__{source}.{ext}`, plus one registry row per video that uses it | `ambient-drift__ytaudiolibrary.wav` |
| Export | `{video}_{lang}_v{n}.mp4` | `TT-002_EN_v1.mp4` |
| Captions | `{video}_{lang}.srt` | `TT-002_ID.srt` |

**Sensor codes:** `L1-MSS` … `L5-MSS`, `L4-TM`, `L5-TM`, `L7-ETM`, `L8-OLI`, `L9-OLI2`, `S2-MSI`, `S1-SAR`, `MODIS-T` (Terra), `MODIS-A` (Aqua), `VIIRS`, `ISS` (astronaut photo), `GE` (Google Earth; the provider goes in the registry).

**Processing codes:** `TC` true colour, `FC` false colour, `SAR` radar, `MOS` multi-date mosaic.

## Appendix D — Editing template (build once the style is chosen)

Build one template project per editor in `PRODUCTION/editing_templates/`. Name it after the editor and version, e.g. `TT_template_capcut_v1` or `TT_template_resolve_v1`.

- **Timeline:** 1080×1920, 30 fps.
- **Tracks, top to bottom:**
  - V5: safe-zone guide (switch off before export)
  - V4: captions
  - V3: evidence tags and credits
  - V2: annotations
  - V1: imagery
  - A1: voiceover
  - A2: music
  - A3: sound effects
- **Saved presets:** the evidence tag (IBM Plex Mono 30 px, Paper on Ink at 80 %), captions, a pin with label, a trace line, a dashed past line with year label, an "approx." line, a scale bar, a north arrow, the title card and the end card.
- **Safe-zone overlay:** `PRODUCTION/editing_templates/safe_zone_guide_1080x1920.png` is included. Its margins are conservative; check them with a private test upload.

## Appendix E — Register field guide

Only the columns that need a fixed vocabulary or format are listed here. The rest are free text.

### `CONTENT/idea_bank.csv`

| Column | Values |
|---|---|
| `pillar` | `Earth Investigation` · `Earth Through Time` · `Hidden Earth` · `Human Geography` |
| `story_shape` | `Before/After` · `What Is This?` · `Why Here?` |
| `evidence_type` | `before_after` · `time_series` · `single_scene` · `multi_site` (several allowed, separated by `; `) |
| `candidate_sources` | Where to *look*. These are search leads, not citations; real sources go in the source registry |
| `score_*` | 1–3, filled in during research (CONTENT_STRATEGY §3) |
| `status` | See README, "Status" |
| `priority` | `P1` · `P2` · `P3` (provisional until the scores are in) |
| `research_file` | Path, e.g. `RESEARCH/episodes/TT-002_research.md` |

### `RESEARCH/source_registry.csv`

| Column | Values |
|---|---|
| `source_id` | `SRC-0001`, sequential across the whole project |
| `source_type` | `imagery` · `dataset` · `official_report` · `government_page` · `scientific_paper` · `map` · `footage` · `audio` · `news` · `other` |
| `url` | The page you opened; for papers, the DOI link |
| `date_published`, `date_accessed`, `acquisition_date` | `YYYY-MM-DD`; leave empty if unknown |
| `platform` | e.g. `USGS EarthExplorer`, `Copernicus Browser`, `NASA Worldview`, `Google Earth Pro` |
| `sensor_or_dataset` | A sensor code from Appendix C, or the dataset name |
| `resolution` | As the provider states it, e.g. `30 m` |
| `processing` | `TC` · `FC (bands)` · `SAR` · `MOS`, plus any adjustment made |
| `license` | e.g. `public domain`, `Copernicus open licence`, `Google Earth terms`, `licensed (invoice no.)` |
| `attribution_text` | The exact credit line required |
| `used_for` | `visual` · `claim` · `context` · `visual; claim` |
| `claim_ids` | e.g. `TT-002-C01; TT-002-C04` |
| `local_file` | Path under `ASSETS/`, or empty for a web-only source |

### `RESEARCH/location_database.csv`

| Column | Values |
|---|---|
| `latitude`, `longitude` | Decimal degrees with 4–6 decimals; south and west are negative |
| `coordinate_source_id` | The SRC IDs of the two confirming sources, separated by `; ` |
| `coordinate_status` | `unverified` · `verified` |

### `ANALYTICS/publishing_log.csv`

| Column | Values |
|---|---|
| `language` | `EN` · `ID` |
| `platform` | `YouTube` · `Instagram` · `TikTok` |
| `publish_date` / `publish_time_local` | `YYYY-MM-DD` / `HH:MM` in your local time zone, the same zone always |
| `credits_on_screen`, `credits_in_description` | `Y` · `N` |
| `corrections` | Date and a one-line summary of each correction (SOP stage 10) |

### `ANALYTICS/performance_log.csv`

| Column | Values |
|---|---|
| `checkpoint` | `48h` · `7d` · `28d` |
| `avg_pct_viewed`, `stayed_to_watch_pct` | A number without the % sign, e.g. `72.5`; leave empty when the platform has no figure |
