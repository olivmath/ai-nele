from __future__ import annotations

import httpx

from scoter.official.poster import API_BASE, _headers, get_user_id


def get_my_posts(token: str, count: int = 50, start: int = 0) -> list[dict]:
    user_id = get_user_id(token)
    author_urn = f"urn:li:person:{user_id}"
    all_posts: list[dict] = []
    while True:
        resp = httpx.get(
            f"{API_BASE}/ugcPosts",
            params={
                "q": "authors",
                "authors": f"List({author_urn})",
                "count": min(count, 100),
                "start": start,
            },
            headers=_headers(token),
        )
        resp.raise_for_status()
        data = resp.json()
        elements = data.get("elements", [])
        if not elements:
            break
        all_posts.extend(elements)
        start += len(elements)
        paging = data.get("paging", {})
        if start >= paging.get("total", 0):
            break
    return all_posts


def extract_post_text(post: dict) -> str:
    specific = post.get("specificContent", {})
    share = specific.get("com.linkedin.ugc.ShareContent", {})
    commentary = share.get("shareCommentary", {})
    return commentary.get("text", "")
