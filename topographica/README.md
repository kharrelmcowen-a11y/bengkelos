# Topographica — Production Workspace

**The Stories Written on Earth.**

This is the production system for Topographica (YouTube @topographica), a satellite-driven geography documentary channel run by one person. It makes vertical Shorts (9:16, 1080×1920, 40–60 s) in English first and Indonesian second. They are published on YouTube Shorts and distributed to Instagram Reels and TikTok.

This folder is a workspace, not an app. Everything in it is Markdown or CSV, so it opens in any text editor, spreadsheet or phone, and nothing needs installing.

## Start here

| If you want to… | Open |
|---|---|
| Know the brand, the voice and the visual rules | [BRAND_GUIDELINES.md](BRAND_GUIDELINES.md) |
| Decide what to make next | [CONTENT_STRATEGY.md](CONTENT_STRATEGY.md) and [CONTENT/idea_bank.csv](CONTENT/idea_bank.csv) |
| Make a video, step by step | [PRODUCTION_SOP.md](PRODUCTION_SOP.md) |
| Find satellite imagery and credit it correctly | [PRODUCTION_SOP.md, Appendix A](PRODUCTION_SOP.md#appendix-a--imagery-source-guide) |
| Study a reference channel (amati, tiru, modifikasi) | [RESEARCH/style_references.md](RESEARCH/style_references.md) |

## The five rules

1. **Nothing is invented.** A statistic, coordinate, date or citation goes into a script only after it is in `RESEARCH/source_registry.csv` with a URL you opened yourself.
2. **What you see is not why it happened.** Visual observations and proven explanations stay separate in the research, in the script and on screen.
3. **Every image carries its source.** Evidence images also show their date, and every tag stays on screen for as long as the image is visible. Context maps are labelled as maps. All of it is listed in the description.
4. **No AI-generated or AI-enhanced imagery.** Use real imagery only, processed in ways you can describe. The only AI in a video is the narration voice, and it is disclosed.
5. **A video ships only after its checklists pass.** First `TEMPLATES/video_checklist.md`, then `TEMPLATES/publishing_checklist.md`.

## Folder map

```
topographica/
├── README.md                  operating instructions (this file)
├── BRAND_GUIDELINES.md        identity, voice, claim language, visual system, localization
├── CONTENT_STRATEGY.md        pillars, idea scoring, backlog, cadence, platforms, metrics
├── PRODUCTION_SOP.md          the workflow stage by stage, source guide, specs, naming
├── RESEARCH/
│   ├── research_template.md   copy once per video
│   ├── source_registry.csv    every source and every image used, one row each
│   ├── location_database.csv  every location, with its verified coordinates
│   ├── style_references.md    amati–tiru–modifikasi notes on reference channels
│   └── episodes/              filled research files: TP-002_research.md
├── CONTENT/
│   ├── idea_bank.csv          the backlog; one row per video; status lives here
│   ├── scripts/english/       TP-002_EN_script.md
│   ├── scripts/indonesia/     TP-002_ID_script.md
│   ├── storyboards/           TP-002_storyboard.md
│   └── published/             TP-002_release.md, the frozen record of what went out
├── ASSETS/                    media (kept out of git, see "Media and git")
│   ├── brand/                 logo, fonts, colour swatches, end card (kept in git)
│   ├── satellite_imagery/     one subfolder per video: TP-002/
│   ├── maps/                  TP-002/
│   ├── audio/                 TP-002/ for voiceover; library/ for licensed music
│   └── footage/               TP-002/ for licensed or public-domain video
├── PRODUCTION/
│   ├── tts_lexicon.csv        how to make the AI voice say each tricky name
│   ├── editing_templates/     editor project templates and the safe-zone overlay
│   ├── captions/              TP-002_EN.srt, TP-002_ID.srt
│   ├── qc/                    TP-002_qc.md, the filled video checklist
│   └── exports/               TP-002_EN_v1.mp4 (kept out of git)
├── ANALYTICS/
│   ├── publishing_log.csv     one row per upload, per platform, per language
│   └── performance_log.csv    one row per check-in (48 h / 7 d / 28 d)
└── TEMPLATES/
    ├── script_template.md
    ├── storyboard_template.md
    ├── video_checklist.md     research, script, edit and export gates
    └── publishing_checklist.md
```

Four items were added to the original plan, each for an operational reason:

- `RESEARCH/episodes/` holds the filled research files, so they don't mix with the template.
- `PRODUCTION/qc/` keeps each video's filled checklist as proof that it passed its gates.
- `RESEARCH/style_references.md` is where the study of reference channels lives.
- `PRODUCTION/tts_lexicon.csv` holds the pronunciation fixes for the AI narration voice, so a mispronounced place name never ships twice.

## One video, one ID

Every video gets an ID when it enters the idea bank: `TP-001`, `TP-002`, and so on. IDs are never reused, not even for dropped ideas. An ID records when an idea arrived, not the order videos are made in. Every filename starts with the ID, so searching for `TP-002` finds everything about that video.

| Stage | File | Copied from |
|---|---|---|
| Research | `RESEARCH/episodes/TP-002_research.md` | `RESEARCH/research_template.md` |
| Script, English | `CONTENT/scripts/english/TP-002_EN_script.md` | `TEMPLATES/script_template.md` |
| Script, Indonesian | `CONTENT/scripts/indonesia/TP-002_ID_script.md` | `TEMPLATES/script_template.md` |
| Storyboard | `CONTENT/storyboards/TP-002_storyboard.md` | `TEMPLATES/storyboard_template.md` |
| Imagery | `ASSETS/satellite_imagery/TP-002/…` | named as in SOP Appendix C |
| Captions | `PRODUCTION/captions/TP-002_EN.srt` | exported from the editor |
| QC record | `PRODUCTION/qc/TP-002_qc.md` | `TEMPLATES/video_checklist.md` |
| Export | `PRODUCTION/exports/TP-002_EN_v1.mp4` | exported from the editor |
| Release record | `CONTENT/published/TP-002_release.md` | `TEMPLATES/publishing_checklist.md` |

To create a new video's files, run this from inside `topographica/`:

```bash
ID=TP-002
cp RESEARCH/research_template.md     RESEARCH/episodes/${ID}_research.md
cp TEMPLATES/script_template.md      CONTENT/scripts/english/${ID}_EN_script.md
cp TEMPLATES/script_template.md      CONTENT/scripts/indonesia/${ID}_ID_script.md
cp TEMPLATES/storyboard_template.md  CONTENT/storyboards/${ID}_storyboard.md
cp TEMPLATES/video_checklist.md      PRODUCTION/qc/${ID}_qc.md
mkdir -p ASSETS/{satellite_imagery,maps,audio,footage}/${ID}
```

You can create each file when its stage starts rather than all at once. Without a terminal, duplicate the template in a file manager and rename it.

## Status: where every video stands

The `status` column in `CONTENT/idea_bank.csv` is the one place that says where a video is. Use only these values:

| Status | Means | Moves on when |
|---|---|---|
| `idea` | In the backlog, not started | You open its research file |
| `researching` | Gathering imagery and sources | Research gate (checklist A) passes |
| `verified` | Research gate passed | Script drafting starts |
| `scripting` | EN script, then ID localization | Script gate (checklist B) passes |
| `storyboarding` | Shot list and asset pull | Every asset is in hand |
| `editing` | In the editor | Export v1 exists |
| `qc` | Edit and export gates (checklists C–D) | The QC file is fully ticked |
| `scheduled` | Uploaded and set to publish | It goes live |
| `published` | Live, at least on YouTube | — |
| `on_hold` | Blocked by rights, missing imagery or similar; give the reason in `notes` | The blocker clears |
| `dropped` | Will not be made; give the reason in `notes` | — |

## Working with the CSV files

Open them in Google Sheets, Excel, LibreOffice or Numbers.

- Don't rename or reorder the header row. The templates and this README refer to those column names.
- Use one row per thing. Leave a cell empty rather than guess.
- Write dates as `YYYY-MM-DD`. Write coordinates as decimal degrees with 4–6 decimals (`-3.4653`, not `3°27'55"S`).
- Separate several values in one cell with `; `.
- Save back as CSV (UTF-8), not .xlsx.
- If Excel shows `â€”` where a dash should be, import the file instead of double-clicking it: Data → From Text/CSV → File origin: UTF-8.
- Allowed values for each column are in [PRODUCTION_SOP.md, Appendix E](PRODUCTION_SOP.md#appendix-e--register-field-guide).

How the four registers link together:

```
idea_bank.csv ── video_id ──┬── location_database.csv  (location_id LOC-001…)
                            ├── source_registry.csv    (source_id  SRC-0001…)
                            ├── publishing_log.csv     (one row per upload)
                            └── performance_log.csv    (one row per check-in)
```

## Media and git

Media files are large, binary and sometimes licensed, so `topographica/.gitignore` keeps them out of git. It ignores everything inside the `ASSETS/` subfolders except `ASSETS/brand/`, everything in `PRODUCTION/exports/`, and video, audio, GeoTIFF and PSD files anywhere in the workspace. Keep your media on a storage drive, such as Google Drive, using this same folder layout. Git keeps each file's row in `source_registry.csv`, and that row is what proves where the file came from.

## Current state (2026-11-22)

- **Brand:** Topographica, YouTube @topographica. Tagline: "The Stories Written on Earth."
- **Style, decided 2026-11-22:**
  - Visual: real dated satellite evidence plus explainer graphics on context maps, with no characters.
  - Narration: an AI voice in English and Indonesian, disclosed.
  - Indonesian register: relaxed but smart (*santai-cerdas*).
  - Details and reasons are in BRAND_GUIDELINES.md and RESEARCH/style_references.md.
- **Still open:**
  - The ending style (the recommended default is in the brand guidelines, marked DRAFT).
  - The logo.
  - The choice of TTS tool and brand voices.
  - Whether the Indonesian versions get separate accounts (CONTENT_STRATEGY §7).
- **Ideas:** the idea bank holds 10 research candidates, all at `idea`. None is verified, and their working titles are not final.
- **Sources:** the source registry is empty and no coordinates are verified. That is deliberate: rows are added only from sources actually opened.
- **First episode:** TP-002 (Aral Sea) is recommended in CONTENT_STRATEGY.md §4.
