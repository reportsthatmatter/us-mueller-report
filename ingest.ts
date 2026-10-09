import { layoutRunOvers, letteredItems, asteriskBreaks, romanFolios, contentsOutline, foiaRedactions, layoutPageJoins, layoutMarkers, quoteListRunOns, pageBreakContinuations, runningFurniture, pipeline, sequencedNoteOpenings } from "@rtm/ingest";

export default pipeline({
  id: "us-mueller-report",
  title: "Report on the Investigation into Russian Interference in the 2016 Presidential Election",
  authors: "Robert S. Mueller, III, Special Counsel, U.S. Department of Justice",
  published_at: "March 2019",
  source_url: "https://www.justice.gov/storage/report_volume1.pdf",
  repo: ".",
  volumes: [
    { path: "archive/report_volume1.pdf", sha256: "0df965b7b0b8835311715f15dbf50cba371d06114ed8eebdf1a246a3c28ce3d0" },
    { path: "archive/report_volume2.pdf", sha256: "67bffcdcb98bc3dacad83f8c11992038218b110c9ad8fc225322a76a8ff69e34" },
  ],
  passes: [
    foiaRedactions(),
    romanFolios(),
    asteriskBreaks(),
    letteredItems(),
    contentsOutline({ scanned: true, centredMinor: true }),
    layoutPageJoins({ scanned: true }),
    quoteListRunOns(),
    pageBreakContinuations(),
    runningFurniture(),
    layoutMarkers(),
    layoutRunOvers(),
    sequencedNoteOpenings(),
  ],
});
