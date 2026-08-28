"""Debug LinkedIn page structure to find correct selectors."""
import json
from playwright.sync_api import sync_playwright


def main():
    with sync_playwright() as p:
        browser = p.chromium.connect_over_cdp("http://localhost:9222")
        context = browser.contexts[0]
        page = context.new_page()

        url = "https://www.linkedin.com/search/results/content/?keywords=web3&sortBy=%22relevance%22"
        print(f"Navigating to: {url}")
        page.goto(url, wait_until="domcontentloaded", timeout=20000)
        page.wait_for_timeout(5000)

        page.screenshot(path="debug_linkedin.png", full_page=False)
        print("Screenshot saved: debug_linkedin.png")

        html_snippet = page.evaluate("""
        (() => {
            const main = document.querySelector('main') || document.body;
            return main.innerHTML.substring(0, 5000);
        })()
        """)
        print("\\n=== HTML SNIPPET (first 5000 chars) ===")
        print(html_snippet)

        classes = page.evaluate("""
        (() => {
            const els = document.querySelectorAll('[class]');
            const cls = new Set();
            for (const el of els) {
                for (const c of el.classList) {
                    if (c.includes('update') || c.includes('feed') || c.includes('post')
                        || c.includes('result') || c.includes('actor') || c.includes('social')
                        || c.includes('comment') || c.includes('like') || c.includes('repost')
                        || c.includes('search') || c.includes('content')) {
                        cls.add(c);
                    }
                }
            }
            return [...cls].sort();
        })()
        """)
        print("\\n=== RELEVANT CSS CLASSES ===")
        for c in classes:
            print(f"  .{c}")

        page.close()
        browser.close()


if __name__ == "__main__":
    main()
