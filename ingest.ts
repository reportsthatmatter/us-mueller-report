import {
  asteriskBreaks,
  contentsOutline,
  foiaRedactions,
  layoutMarkers,
  layoutPageJoins,
  layoutRunOvers,
  letteredItems,
  pageBreakContinuations,
  pipeline,
  quoteListRunOns,
  romanFolios,
  runningFurniture,
  sequencedNoteOpenings,
} from "@rtm/ingest";

/**
 * How this report is built. Owned by the report: every decision that shaped
 * its text is named here, and the passes it composes are library code, so a
 * fix to a shared pass reaches every report that calls it.
 *
 * Volumes I and II as DOJ publishes them today (the FOIA re-releases with the
 * fewest redactions; see README.md). Page and note numbers restart in Volume II.
 * Volume II and 133 of Volume I's 207 pages carry a real text layer; 74 Volume I
 * pages are page images with Acrobat OCR (README.md lists them).
 *
 * Needs @rtm/ingest with foiaRedactions, asteriskBreaks, layoutRunOvers and
 * contentsOutline({ scanned, centredMinor }) (ingest branch foia-redactions-1009,
 * unreleased when this was written).
 */
export default pipeline({
  id: "us-mueller-report",
  title: "Report on the Investigation into Russian Interference in the 2016 Presidential Election",
  authors: "Robert S. Mueller, III, Special Counsel, U.S. Department of Justice",
  published_at: "March 2019",
  source_url: "https://www.justice.gov/storage/report_volume1.pdf",
  repo: ".",
  // Order is semantic: Volume I, then Volume II.
  volumes: [
    { path: "archive/report_volume1.pdf", sha256: "0df965b7b0b8835311715f15dbf50cba371d06114ed8eebdf1a246a3c28ce3d0" },
    { path: "archive/report_volume2.pdf", sha256: "67bffcdcb98bc3dacad83f8c11992038218b110c9ad8fc225322a76a8ff69e34" },
  ],
  passes: [
    // Each black box prints its FOIA exemptions in white ("Richard Gates, (b) (6), (b) (7)(C) Roger Stone",
    // Vol I p.12) and the margin repeats them ("(b)(6)/" over "(b)(7)(C)-2"): the box becomes
    // "[Redacted: (b) (6), (b) (7)(C)]", the margin label goes (decision record 0019 in the site repo).
    foiaRedactions(),
    // The contents pages are folioed i-v (Vol I) and i-iv (Vol II); the running head's "Fed. R. Crim. P. 6(e)"
    // had been read as their page number, "6".
    romanFolios(),
    // A centred "* * *" before a new train of thought (Vol I pp.2, 13; Vol II p.2) was read with the next
    // paragraph's first line as a quotation, and that paragraph cut after its first line.
    asteriskBreaks(),
    // Vol II p.12: "(a) The President's January 27, 2017 dinner…" to "(f)", one space after the letter,
    // lines hanging at the text.
    letteredItems(),
    // Each volume's contents is a lettered outline (I., A., 1., a., i.) with dot or ellipsis leaders
    // (Vol I pp.i-v, Vol II pp.i-iv); every heading is one it lists. scanned: an OCR-misspelt heading
    // ("1. Trnmp Tower Moscow Project", Vol I p.67) is matched to its entry. centredMinor: the Vol II
    // executive summary's centred "STATUTORY AND CONSTITUTIONAL DEFENSES" and "CONCLUSION" (pp.7-8) are
    // subheads inside the summary, not sections beside "IV. CONCLUSION".
    contentsOutline({ scanned: true, centredMinor: true }),
    // A paragraph run over a page break joins when the layout says it runs on; the OCR pages size lines
    // a point apart.
    layoutPageJoins({ scanned: true }),
    quoteListRunOns(),
    pageBreakContinuations(),
    // "U.S. Department of Justice" / "Attorney Work Product // May Contain Material Protected Under
    // Fed. R. Crim. P. 6(e)" heads every page.
    runningFurniture(),
    // Note markers are raised digits ("operating systems).124", Vol I p.38). scanned: the OCR pages raise a
    // marker's digits one or two at a time ("sanctions.1262" as "1", "2", "6", "2", Vol I p.172).
    layoutMarkers({ scanned: true }),
    // A note's tail at the head of the next page's note block, in the notes' 16pt under an 18pt body
    // (note 285's "of James B. Comey…", Vol II p.50), belongs to the note, not the body's last paragraph.
    layoutRunOvers(),
    // A note opening after a wide gap or on OCR junk.
    sequencedNoteOpenings(),
  ],
});
