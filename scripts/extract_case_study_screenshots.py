"""
Extract real screenshots for the RAMS, Student-Depression and Blockchain
case studies from their PDF reports.

Usage:
    py scripts/extract_case_study_screenshots.py

Keyed by (pdf_page_1indexed, image_index_on_page) -> filename.
"""

import sys
from pathlib import Path

try:
    import fitz  # PyMuPDF
except ImportError:
    print("PyMuPDF not found. Install: py -m pip install pymupdf")
    sys.exit(1)

ROOT = Path(__file__).parent.parent / "public" / "images" / "projects"

JOBS = {
    "rams": {
        "pdf": r"D:/SEM 7/FYP 2/M/PSM2_CB22162.pdf",
        "extracts": {
            (82, 0): "dashboard.png",
            (85, 0): "match.png",
            (84, 0): "result.png",
            (83, 0): "discover.png",
            (86, 0): "compare.png",
            (87, 1): "builder.png",
        },
    },
    "depression": {
        "pdf": r"D:/SEM 7/MACHINE LEARNING APPLICATIONS/project/final submation/FINAL_ASSESSMENT_CB22162_ML.pdf",
        "extracts": {
            (5, 3): "app.png",
            (5, 1): "result.png",
            (3, 3): "confusion.png",
            (4, 2): "importance.png",
            (3, 0): "correlation.png",
            (2, 0): "distribution.png",
        },
    },
    "blockchain": {
        "pdf": r"D:/SEM 7/BLOCKCHAIN TECHNOLOGY/CB22162_FinalReport.pdf",
        "extracts": {
            (48, 0): "create.png",
            (49, 0): "query.png",
            (52, 0): "verify.png",
            (53, 0): "viewall.png",
            (55, 0): "refund.png",
            (57, 0): "access.png",
        },
    },
}


def main():
    for slug, job in JOBS.items():
        pdf_path = Path(job["pdf"])
        if not pdf_path.exists():
            print(f"  SKIP {slug}: PDF not found -> {pdf_path}")
            continue
        out_dir = ROOT / slug
        out_dir.mkdir(parents=True, exist_ok=True)
        doc = fitz.open(str(pdf_path))
        print(f"=== {slug}: {pdf_path.name} ({doc.page_count} pages) ===")
        for (page_num, img_idx), filename in job["extracts"].items():
            idx = page_num - 1
            if idx >= doc.page_count:
                print(f"  SKIP p{page_num} (only {doc.page_count} pages)")
                continue
            imgs = doc[idx].get_images(full=True)
            if img_idx >= len(imgs):
                print(f"  SKIP p{page_num} img{img_idx} (only {len(imgs)} imgs)")
                continue
            xref = imgs[img_idx][0]
            data = doc.extract_image(xref)
            (out_dir / filename).write_bytes(data["image"])
            print(f"  SAVED {slug}/{filename:18s} {data['width']}x{data['height']}")
        doc.close()
    print("\nDone.")


if __name__ == "__main__":
    main()
