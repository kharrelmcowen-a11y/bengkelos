# Video Checklist — [TP-XXX]

> Copy this file to `PRODUCTION/qc/TP-XXX_qc.md`; it is the video's quality record.
> - Tick only what you have actually checked.
> - A gate passes when every box is ticked, or marked `N/A` with a reason.
> - Gates A and B come before editing. Run gates C and D on the exported file, watched on a phone.

## A. Research gate (`researching` → `verified`)

- [ ] **Location verified.** The coordinates in `location_database.csv` are confirmed by two independent sources (SRC: ____ , ____).
- [ ] **Dates verified.** Every image's acquisition date was read from the provider's metadata, not estimated.
- [ ] Comparison images are from the same season, or the difference is stated in the script.
- [ ] **Sources recorded.** Every image and reference has a row in `source_registry.csv` with its URL and access date.
- [ ] **Claims supported.** Every claim in the ledger is `verified` or has been removed; hypotheses are marked rung 5.
- [ ] No statistic, coordinate, date or citation lacks an opened source.
- [ ] Visual observations (section 5) are kept apart from explanations.
- [ ] **Image rights reviewed.** Every asset has a licence and exact credit text recorded, and nothing is blocked.
- [ ] No AI-generated or AI-enhanced imagery is among the evidence.

| Result | Date | Notes |
|---|---|---|
| PASS / FAIL | | |

## B. Script gate (`scripting` → `storyboarding`)

- [ ] EN: every factual sentence maps to a claim ID.
- [ ] EN: 90–130 words, and the TTS draft runs 40–60 s.
- [ ] Every number has a source and, if it changes over time, a year.
- [ ] No avoid-list words (BRAND_GUIDELINES §2), and hypotheses use rung-5 wording.
- [ ] The video answers its title, and neither the title nor any beat headline claims more than the verified evidence.
- [ ] ID: relaxed but smart register, judged by listening to it rather than comparing it word by word with the EN; local metaphors add no facts, and no jokes target people.
- [ ] ID: same claims and numbers as the EN, in Indonesian number format (1.000 / 2,5).
- [ ] ID: the TTS draft runs 40–60 s.
- [ ] The source citations and attribution notes are filled in, in both scripts.

| Result | Date | Notes |
|---|---|---|
| PASS / FAIL | | |

## C. Editing gate (on the exported file)

- [ ] **Correct 9:16 aspect ratio:** 1080×1920, no black bars, no stretched imagery.
- [ ] **Legible captions:** readable on a phone at arm's length, inside the safe zone, spelled correctly, matching the narration.
- [ ] **No misleading visual transitions:** comparisons are co-registered, there is no morphing or interpolation, and every change of date shows both dates.
- [ ] **Satellite imagery properly credited:** every evidence shot has its evidence tag for its whole duration, every context map has its map tag, and Google Earth attribution is visible whenever its imagery is.
- [ ] Evidence and context are kept apart: no region fills, route lines or pictograms on evidence imagery, and no basemap passes as evidence.
- [ ] False colour and radar images are labelled.
- [ ] Rotated images show a north arrow, and size claims have a scale bar.
- [ ] **No unsupported annotations:** every line, fill, route, pin, arrow and number matches a claim ID; region boundaries come from cited boundary data; approximate lines are labelled "approx."
- [ ] **Audio is clear:** the narration is intelligible over the music on a phone speaker, with no clipping, at about −14 LUFS.
- [ ] TTS pronunciation was checked by ear: every place name, number and casual Indonesian word sounds right, and new fixes are in `PRODUCTION/tts_lexicon.csv`.
- [ ] Headlines are readable on a phone, sit in the headline zone, and change with the beats.
- [ ] Watched once with the sound off, the story still makes sense.
- [ ] **Correct language version:** the EN export has EN voiceover and captions; the ID export has ID voiceover and captions.

| Result | Date | Notes |
|---|---|---|
| PASS / FAIL | | |

## D. Export check

- [ ] The file is `PRODUCTION/exports/TP-XXX_[EN|ID]_v_.mp4`.
- [ ] It matches the specs in SOP Appendix B: H.264, 30 fps, AAC 48 kHz.
- [ ] Duration is 40–60 s.
- [ ] The captions file `PRODUCTION/captions/TP-XXX_[EN|ID].srt` is exported.
- [ ] The safe-zone guide track was switched off.
- [ ] There is no watermark or end screen from any editor or platform.

| Result | Date | Notes |
|---|---|---|
| PASS / FAIL | | |

## Sign-off

| Gate | EN | ID | Date |
|---|---|---|---|
| A. Research | | — | |
| B. Script | | | |
| C. Editing | | | |
| D. Export | | | |
