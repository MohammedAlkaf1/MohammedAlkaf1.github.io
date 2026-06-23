"""
Extract SAMS (Manage Tuition Fee module) mobile mockups from the SEP
Software Requirements Specification PDF.

Usage:
    pip install pymupdf
    py scripts/extract_sams_screenshots.py "D:/SEM 7/SOFTWARE ENGINEERING PRACTICES/Software Requirements Specification_G14.pdf"

The screenshots are the Figma phone mockups embedded in section 3.2.5
(Manage Tuition Fee). Saved at full resolution to:
public/images/projects/sams/

Keyed by (pdf_page_1indexed, image_index_on_page) -> filename.
"""

import sys
from pathlib import Path

try:
    import fitz  # PyMuPDF
except ImportError:
    print("PyMuPDF not found. Install it with: py -m pip install pymupdf")
    sys.exit(1)

EXTRACTS = {
    (47, 1): ("student-dashboard.png", "Student tuition ledger — total / paid / outstanding"),
    (47, 2): ("fee-itemization.png",   "Fee itemization with paid / unpaid status"),
    (47, 3): ("treasury-edit.png",     "Treasury payment update form (with validation)"),
    (48, 0): ("payment-success.png",   "Pay-now dashboard + payment success toast"),
    (48, 1): ("restriction-notice.png","Academic access restricted (unpaid fees)"),
    (48, 2): ("recent-activity.png",   "Recent payment activity feed"),
    (48, 3): ("paid-status.png",       "Fully paid — account clear + payment history"),
}


def main():
    if len(sys.argv) < 2:
        print('Usage: py extract_sams_screenshots.py "<path-to-SRS.pdf>"')
        sys.exit(1)

    pdf_path = Path(sys.argv[1])
    if not pdf_path.exists():
        print(f"PDF not found: {pdf_path}")
        sys.exit(1)

    out_dir = Path(__file__).parent.parent / "public" / "images" / "projects" / "sams"
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
        (out_dir / filename).write_bytes(data["image"])
        print(f"  SAVED {filename:22s} {data['width']}x{data['height']}  [{label}]")

    doc.close()
    print(f"\nDone. Images saved to: {out_dir}")
    print("Refresh the dev server to see them in the SAMS case-study gallery.")


if __name__ == "__main__":
    main()
