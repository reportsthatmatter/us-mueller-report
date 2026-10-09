# The Mueller Report (Volumes I and II)

Report on the Investigation into Russian Interference in the 2016 Presidential Election, submitted by Special Counsel Robert S. Mueller, III to the Attorney General under 28 C.F.R. § 600.8(c), dated March 2019 and released in redacted form on 18 April 2019. Volume I covers Russia's interference in the 2016 election and its links to the Trump Campaign; Volume II covers the investigation of the President for obstruction of justice. Served at https://reportsthatmatter.org/reports/us-mueller-report.

## Scope: Volumes I and II, one report

Both volumes are one report id, `us-mueller-report`, in the order the report sets them (`ingest.ts` lists Volume I, then Volume II). Each volume has its own contents and its own page numbers (Volume I pp. 1-199, Volume II pp. 1-182) and its own note numbering (1-1,283 and 1-1,092), so the same page number appears once in each volume; the site's page markers carry the repeat as `%%page 12#2%%`, the second page 12.

Not yet in: the appendices (A, the appointment order; B, the glossary; C, the President's written answers; D, the Office's transferred and referred cases), which DOJ publishes as a third file, `report_appendices.pdf` (54 pp., SHA-256 `700a3aa0…cf53`, lettered folios A-1 to D-6, much of it typewritten and scanned). They are a follow-up unit (see the bead filed from reportsthatmatter-gqsy.5).

## Source

`archive/report_volume1.pdf` and `archive/report_volume2.pdf`, as the Department of Justice publishes them at https://www.justice.gov/storage/report_volume1.pdf and https://www.justice.gov/storage/report_volume2.pdf (checked 9 October 2026). Public domain: a work of the U.S. Government (17 U.S.C. 105). See `datapackage.json`.

## Materials

The source stack (stage 1, 2026-10-09, reportsthatmatter-gqsy.5):

| Layer | Source | Role |
| --- | --- | --- |
| Words | the two DOJ volume PDFs | canonical, citation target |
| Blocks and headings | the same PDFs: the layout (pdftohtml) and each volume's contents, read as an outline (`contentsOutline`) | |
| Notes | page-foot notes, numbered once through each volume | |
| Page anchors | the printed folios (arabic in the body, roman on the contents pages) | |
| Redactions | the white exemption labels printed in each black box, read as `[Redacted: (b) (3)]`; the margin labels taken out | see "Redactions" below |

How the PDFs were made (`pdfinfo`, `pdffonts`, `pdftohtml -xml`): both are Adobe Acrobat "Paper Capture" output, tagged, letter size, no bleed. Volume II (created May 2019, modified 19 June 2020) has a real text layer in Times New Roman on all 187 pages. Volume I (created 2 November 2020, modified 2 February 2022) has a real text layer on 133 of its 207 pages; the other 74 are page images (144 dpi JPEG) with Acrobat's invisible OCR text over them (font `HiddenHorzOCR`). Those 74 are the most heavily redacted pages: printed pp. 17-20, 23, 25-27, 32-35, 37-41, 43, 46-49, 55-57, 60, 63, 67, 72, 85, 92-94, 96, 98, 100-103, 109, 111-112, 114, 116-118, 120-122, 130, 134, 136-137, 139-140, 142-144, 147-148, 150-155, 161, 166-167, 169-170, 172, 194 and 199. Their OCR misreads letters often ("Trnmp", "se1ved", "Depaiiment").

Sourcing checklist:

1. How the PDFs were made: above.
2. Tagged: yes, both, but by Paper Capture (no reliable structure). Other renditions: see versions below.
3. Official HTML: none. DOJ publishes PDFs only.
4. EPUB: no official one. Commercial typeset editions (Melville House, Skyhorse, Scribner/Washington Post) exist; their typesetting is not ours to reuse and they reproduce the 2019 redactions, so they are not used.
5. Wikisource: a partial transcription (about 18 pages: the introductions, executive summaries and some appendices), proofreading status not checked; too partial to serve as a reference.
6. Court documents: the FOIA litigation (EPIC v. DOJ and BuzzFeed/Leopold v. DOJ, D.D.C.) produced the re-releases below; not a text source.
7. US congressional / govinfo: govinfo carries the April 2019 release as package GPO-SCREPORT-MUELLER (https://www.govinfo.gov/content/pkg/GPO-SCREPORT-MUELLER/pdf/GPO-SCREPORT-MUELLER.pdf, 456 pp., 141,297,139 bytes, SHA-256 `be60add9…f918`): a RICOH MP C6502 scan with Paper Capture OCR of all 456 pages, untagged. Rejected: it is the 2019 redaction (196 "Harm to Ongoing Matter" labels), every page is a scan, and it is 141 MB.
8. Originals: DOJ's Office of Information Policy; no request needed while the FOIA releases are public.

Versions. The report has been released in several versions (the dates below are from the FOIA litigation record as summarised by EPIC and by Marcy Wheeler, emptywheel.net, "The Five Versions of the Mueller Report", checked 9 October 2026): 18 April 2019 (the redacted report with labelled redactions, "Harm to Ongoing Matter", "Grand Jury", "Investigative Technique", "Personal Privacy"); 3 June 2019 (the same text processed under FOIA, the labels replaced by exemption codes); 19 June 2020 (fewer redactions after the Roger Stone trial); 2 November 2020 (more lifted under Judge Walton's order, including the charging decisions on WikiLeaks and Stone); and February 2022 (two further declinations, on Donald Trump Jr. and J.D. Gordon, in Volume I). `report_volume1.pdf` is the latest (modified 2 February 2022, its contents lists "Potential Section 1030 Violation By Donald Trump Jr."); `report_volume2.pdf` is the 19 June 2020 file. These are the versions with the most text, and the ones DOJ links today, so they are the citation target. The 2019 single-file release (`justice.gov/storage/report.pdf`, now redirected to the archived SCO page behind a bot challenge) and govinfo's copy of it are not used. Page numbers are the same in every release.

Redactions. Every black box in these releases prints, in white, the FOIA exemptions it was withheld under: (b)(3) (withheld under a statute; in this report, grand-jury material under Fed. R. Crim. P. 6(e)), (b)(6) and (b)(7)(C) (personal privacy), (b)(7)(A) (pending enforcement proceedings, the "Harm to Ongoing Matter" of the 2019 release) and (b)(7)(E) (investigative techniques). The margin beside each box repeats the codes with a processing number ("(b)(3)-1"). The text keeps each box as `[Redacted: (b) (3)]`, with the printed codes as the box prints them, and drops the margin labels (`foiaRedactions` in `@rtm/ingest`; decision record `docs/decisions/0018-redactions.md` in the site repo).

## Build

`ingest.ts` declares how the report is turned into Markdown. Rebuild from the site repo with `pnpm ingest run us-mueller-report`. `fidelity.md` lists the words the pipeline flagged for review; `reference/adjudicated.yaml` holds 30 page breaks decided from the page images (a mini-reference: there is no clean edition to score against); `golden.yaml` holds pages whose structure was checked against the page image.
