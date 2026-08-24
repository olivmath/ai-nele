"""Generate carousel PDF — each slide as a separate 1080x1350 page."""
import io
from pathlib import Path

from PIL import Image
from playwright.sync_api import sync_playwright

HTML_PATH = Path(__file__).parent.parent / "carousel-rwa.html"
OUTPUT = Path(__file__).parent.parent / "carousel-rwa.pdf"


def main():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page(viewport={"width": 1080, "height": 4000})
        page.goto(f"file://{HTML_PATH.resolve()}", wait_until="networkidle")
        page.wait_for_timeout(2000)

        slides = page.query_selector_all(".slide")
        print(f"Found {len(slides)} slides")

        images = []
        for i, slide in enumerate(slides):
            bbox = slide.bounding_box()
            if not bbox:
                continue
            raw = page.screenshot(
                clip={"x": bbox["x"], "y": bbox["y"], "width": bbox["width"], "height": bbox["height"]},
                type="png",
            )
            img = Image.open(io.BytesIO(raw)).convert("RGB")
            img = img.resize((1080, 1350), Image.LANCZOS)
            images.append(img)
            print(f"  Slide {i+1}: captured {img.size}")

        if images:
            images[0].save(
                str(OUTPUT),
                save_all=True,
                append_images=images[1:],
                resolution=150,
            )
            print(f"\nPDF saved: {OUTPUT} ({len(images)} pages)")

        browser.close()


if __name__ == "__main__":
    main()
