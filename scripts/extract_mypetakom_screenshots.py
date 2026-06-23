"""
Extract MyPetakom screenshots from the Web Engineering project PDF.

Usage:
    pip install pymupdf
    py scripts/extract_mypetakom_screenshots.py "D:/PROJECTS/MyPetakom (Web Engineering).pdf"

The screenshots are the real colored UI images embedded in the Presentation Model
section. On each page the first embedded image is the wireframe mockup and the
second is the actual screenshot — so we pull image index 1 from each page.

Saved at full resolution to: public/images/projects/mypetakom/
"""

import sys
from pathlib import Path

try:
    import fitz  # PyMuPDF
except ImportError:
    print("PyMuPDF not found. Install it with: py -m pip install pymupdf")
    sys.exit(1)

# (pdf_page_1indexed, image_index_on_page) -> filename, source
EXTRACTS = {
    (54, 1): ("login.png",            "Login modal (Welcome To My Petakom System)"),
    (57, 1): ("membership.png",       "Manage Membership (approve / reject applications)"),
    (61, 1): ("advisor-dashboard.png","Advisor Dashboard (events by status / level pie charts)"),
    (62, 1): ("manage-events.png",    "Manage Events (with QR code)"),
    (73, 1): ("attendance.png",       "Manage Event Attendance (QR + actions)"),
    (75, 1): ("student-qr-scan.png",  "Student attendance — QR scan + geolocation"),
    (77, 1): ("admin-dashboard.png",  "Admin Dashboard (event attendance bar chart)"),
    (78, 1): ("merit-dashboard.png",  "Student merit dashboard (donut + bar charts)"),
    (84, 1): ("merit-qr.png",         "Student Merit Verification card"),
}


def main():
    if len(sys.argv) < 2:
        print('Usage: py extract_mypetakom_screenshots.py "<path-to-pdf>"')
        sys.exit(1)

    pdf_path = Path(sys.argv[1])
    if not pdf_path.exists():
        print(f"PDF not found: {pdf_path}")
        sys.exit(1)

    out_dir = Path(__file__).parent.parent / "public" / "images" / "projects" / "mypetakom"
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
    print("Refresh the dev server to see them in the MyPetakom case-study gallery.")


if __name__ == "__main__":
    main()
