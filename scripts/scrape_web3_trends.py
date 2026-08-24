"""Scrape LinkedIn Web3 trending posts via Playwright (uses existing Chrome session via CDP)."""
import json
import re
import time
from datetime import datetime
from pathlib import Path

from playwright.sync_api import sync_playwright

OUTPUT = Path("web3_trends.json")

SEARCH_QUERIES = [
    "web3 trends 2026",
    "RWA tokenization",
    "DeFi institutional",
    "blockchain Brasil",
    "crypto AI agents",
    "DePIN infrastructure",
]

JS_EXTRACT_POSTS = """
(() => {
  const items = document.querySelectorAll('[role="listitem"]');
  const posts = [];

  for (const item of items) {
    try {
      const text = item.innerText || '';
      const lines = text.split('\\n').map(l => l.trim()).filter(l => l.length > 0);

      if (lines.length < 5) continue;

      // Skip ads/promos
      if (text.includes('Promovido') || text.includes('Promoted')) continue;

      let author = '';
      let headline = '';
      let posted = '';
      let postText = '';
      let likes = '0';
      let comments = '0';
      let reposts = '0';

      // First meaningful line is usually author name
      for (const l of lines) {
        if (l.length > 2 && !l.startsWith('Publicação') && l !== '…' && !l.startsWith('+')) {
          author = l.replace(/\\s*[•·].*/, '').trim();
          break;
        }
      }

      // Find headline (line after author, before time indicator)
      const authorIdx = lines.indexOf(author);
      if (authorIdx >= 0 && authorIdx + 1 < lines.length) {
        const next = lines[authorIdx + 1];
        if (!next.match(/^\\d+\\s*[hdsmw]/) && next !== '…') {
          headline = next;
        }
      }

      // Find time posted (e.g. "6 d", "2 h", "1 sem")
      for (const l of lines) {
        if (l.match(/^\\d+\\s*(d|h|m|s|sem|min|dia|hora|semana|mês|mes|w|mo)/i)) {
          posted = l;
          break;
        }
      }

      // Extract post body — everything between time/author block and engagement buttons
      const skipWords = /^(Seguir|Gostar|Comentar|Compartilhar|Enviar|Assinar|Exibir tradução|Mais relevantes|\\+ Seguir|\\.\\.\\. mais|… mais|Publicação no feed)/;
      const engagementLine = /^\\d+[\\s.,]*(curtida|like|coment|repost|compartilhamento|reaction)/i;
      let capture = false;
      const bodyLines = [];

      for (const l of lines) {
        if (l === posted && posted) { capture = true; continue; }
        if (capture) {
          if (skipWords.test(l)) continue;
          if (engagementLine.test(l)) break;
          if (l === 'Gostar' || l === 'Comentar' || l === 'Compartilhar' || l === 'Enviar') break;
          bodyLines.push(l);
        }
      }
      postText = bodyLines.join(' ').substring(0, 600);

      // If no body found via time marker, try grabbing text after headline
      if (!postText && headline) {
        const hlIdx = lines.indexOf(headline);
        if (hlIdx >= 0) {
          const remaining = [];
          for (let i = hlIdx + 1; i < lines.length; i++) {
            const l = lines[i];
            if (skipWords.test(l)) continue;
            if (engagementLine.test(l)) break;
            if (l === 'Gostar' || l === 'Comentar') break;
            if (l.match(/^\\d+\\s*(d|h|m|s|sem)/i)) continue;
            remaining.push(l);
          }
          postText = remaining.join(' ').substring(0, 600);
        }
      }

      // Extract engagement numbers
      for (const l of lines) {
        const likesM = l.match(/^(\\d[\\d.,]*)$/);
        if (likesM && !likes.match(/[1-9]/)) {
          likes = likesM[1];
          continue;
        }
        const commM = l.match(/(\\d[\\d.,]*)\\s*(coment|comment)/i);
        if (commM) { comments = commM[1]; continue; }
        const repM = l.match(/(\\d[\\d.,]*)\\s*(compartilhamento|repost|share)/i);
        if (repM) { reposts = repM[1]; continue; }
      }

      if (postText.length > 30 || (author && headline)) {
        posts.push({ author, headline, text: postText, likes, comments, reposts, posted });
      }
    } catch(e) {}
  }
  return JSON.stringify(posts);
})()
"""


def parse_num(val: str) -> int:
    val = val.replace(",", "").replace(".", "").strip()
    try:
        return int(val)
    except ValueError:
        return 0


def scrape_search(page, query: str, max_scrolls: int = 6) -> list[dict]:
    search_url = f"https://www.linkedin.com/search/results/content/?keywords={query.replace(' ', '%20')}&sortBy=%22relevance%22"
    print(f"\n🔍 Searching: '{query}'")
    page.goto(search_url, wait_until="domcontentloaded", timeout=20000)
    page.wait_for_timeout(4000)

    for _ in range(max_scrolls):
        page.evaluate("window.scrollBy(0, 1000)")
        page.wait_for_timeout(2000)

    raw = page.evaluate(JS_EXTRACT_POSTS)
    posts = json.loads(raw)

    for p in posts:
        p["search_query"] = query
        p["likes_num"] = parse_num(p["likes"])
        p["comments_num"] = parse_num(p["comments"])
        p["reposts_num"] = parse_num(p["reposts"])
        p["total_engagement"] = p["likes_num"] + p["comments_num"] * 3 + p["reposts_num"] * 2

    print(f"   Found {len(posts)} posts")
    return posts


def scrape_feed(page, max_scrolls: int = 10) -> list[dict]:
    print("\n📰 Scraping feed for Web3 content...")
    page.goto("https://www.linkedin.com/feed/", wait_until="domcontentloaded", timeout=20000)
    page.wait_for_timeout(4000)

    for _ in range(max_scrolls):
        page.evaluate("window.scrollBy(0, 1000)")
        page.wait_for_timeout(2000)

    raw = page.evaluate(JS_EXTRACT_POSTS)
    posts = json.loads(raw)

    web3_kw = [
        "web3", "blockchain", "crypto", "defi", "nft", "token", "dao",
        "rwa", "depin", "solana", "ethereum", "bitcoin", "smart contract",
        "descentraliz", "on-chain", "onchain", "wallet", "stablecoin",
        "tokeniz", "layer 2", "l2", "zk", "rollup",
    ]

    filtered = []
    for p in posts:
        combined = (p.get("text", "") + " " + p.get("headline", "")).lower()
        if any(kw in combined for kw in web3_kw):
            p["search_query"] = "feed_organic"
            p["likes_num"] = parse_num(p["likes"])
            p["comments_num"] = parse_num(p["comments"])
            p["reposts_num"] = parse_num(p["reposts"])
            p["total_engagement"] = p["likes_num"] + p["comments_num"] * 3 + p["reposts_num"] * 2
            filtered.append(p)

    print(f"   Found {len(filtered)} Web3 posts in feed (from {len(posts)} total)")
    return filtered


def main():
    all_posts = []

    with sync_playwright() as p:
        browser = p.chromium.connect_over_cdp("http://localhost:9222")
        context = browser.contexts[0]
        page = context.new_page()

        all_posts.extend(scrape_feed(page))

        for query in SEARCH_QUERIES:
            posts = scrape_search(page, query)
            all_posts.extend(posts)
            time.sleep(3)

        page.close()
        browser.close()

    seen = set()
    unique = []
    for p in all_posts:
        key = (p.get("author", "") + p.get("text", "")[:80]).strip()
        if key and key not in seen:
            seen.add(key)
            unique.append(p)

    unique.sort(key=lambda x: x["total_engagement"], reverse=True)

    result = {
        "scraped_at": datetime.now().isoformat(),
        "total_posts": len(unique),
        "queries": SEARCH_QUERIES,
        "posts": unique,
    }

    with open(OUTPUT, "w", encoding="utf-8") as f:
        clean = json.dumps(result, indent=2, ensure_ascii=True)
        f.write(clean)

    print(f"\n{'='*60}")
    print(f"Total unique posts: {len(unique)}")
    print(f"Saved to: {OUTPUT}")
    print(f"\n🏆 TOP 15 by engagement:")
    print(f"{'='*60}")
    for i, p in enumerate(unique[:15]):
        print(f"\n#{i+1} | 👍 {p['likes']} | 💬 {p['comments']} | 🔄 {p['reposts']} | Score: {p['total_engagement']}")
        print(f"   Author: {p['author']}")
        if p['headline']:
            print(f"   Role: {p['headline']}")
        print(f"   Text: {p['text'][:150]}...")
        print(f"   Query: {p['search_query']}")


if __name__ == "__main__":
    main()
