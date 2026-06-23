"""
Extract SmartED (Module 4 — Manage Progress & Grades) screenshots from the
SQA final report PDF.

Usage:
    pip install pymupdf
    py scripts/extract_smarted_screenshots.py "D:/SEM 6/SOFTWARE QUALITY ASSURANCE/m/FinalReport_CB22162_1BG9.pdf"

Screenshots are the raster images embedded in the report's "4.4 System Result"
figures, saved at full resolution to: public/images/projects/smarted/

Each entry maps (1-indexed PDF page, image index on that page) -> output file.
The image index matches figure order on the page (0 = first/top figure).
"""

import sys
from pathlib import Path

try:
    import fitz  # PyMuPDF
except ImportError:
    print("PyMuPDF not found. Install it with: py -m pip install pymupdf")
    sys.exit(1)

# (pdf_page_1indexed, image_index_on_page) -> filename, source figure
EXTRACTS = {
    (49, 0): ("student-grades.png",        "Fig 4.4.1  — Student course grade overview"),
    (50, 0): ("final-grade-report.png",    "Fig 4.4.3  — Student final grade report (GPA)"),
    (51, 0): ("course-breakdown.png",      "Fig 4.4.5  — Course assessment breakdown"),
    (52, 0): ("teacher-grades.png",        "Fig 4.4.6  — Teacher grades & feedback management"),
    (53, 1): ("update-grade.png",          "Fig 4.4.9  — Update grade entry form"),
    (54, 1): ("create-grade.png",          "Fig 4.4.11 — Create grade entry form"),
    (55, 0): ("class-progress.png",        "Fig 4.4.12 — Class progress dashboard"),
    (55, 1): ("performance-analytics.png", "Fig 4.4.13 — Performance analytics & trends"),
    (57, 0): ("admin-grades.png",          "Fig 4.4.16 — Admin grades management"),
    (60, 1): ("transcript.png",            "Fig 4.4.23 — Official transcript (cumulative GPA)"),
    (62, 0): ("grade-settings.png",        "Fig 4.4.26 — Grade calculation policies"),
}


def main():
    if len(sys.argv) < 2:
        print('Usage: py extract_smarted_screenshots.py "<path-to-final-report.pdf>"')
        sys.exit(1)

    pdf_path = Path(sys.argv[1])
    if not pdf_path.exists():
        print(f"PDF not found: {pdf_path}")
        sys.exit(1)

    out_dir = Path(__file__).parent.parent / "public" / "images" / "projects" / "smarted"
    out_dir.mkdir(parents=True, exist_ok=True)

    doc = fitz.open(str(pdf_path))
    print(f"Opened PDF: {pdf_path.name} ({doc.page_count} pages)")

    for (page_num, img_idx), (filename, label) in EXTRACTS.items():
        idx = page_num - 1
        if idx >= doc.page_count:
            print(f"  SKIP  page {page_num} (PDF has only {doc.page_count} pages)")
            continue
        imgs = doc[idx].get_images(full=True)
        if img_idx >= len(imgs):
            print(f"  SKIP  page {page_num} image {img_idx} (only {len(imgs)} on page)")
            continue
        xref = imgs[img_idx][0]
        data = doc.extract_image(xref)
        out_path = out_dir / filename
        out_path.write_bytes(data["image"])
        print(f"  SAVED {filename:28s} {data['width']}x{data['height']}  [{label}]")

    doc.close()
    print(f"\nDone. Images saved to: {out_dir}")
    print("Refresh the dev server to see them in the SmartED case-study gallery.")


if __name__ == "__main__":
    main()
