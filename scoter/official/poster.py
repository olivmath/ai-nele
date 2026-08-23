from __future__ import annotations

import httpx

API_BASE = "https://api.linkedin.com/v2"


def _headers(token: str) -> dict[str, str]:
    return {
        "Authorization": f"Bearer {token}",
        "X-Restli-Protocol-Version": "2.0.0",
    }


def get_user_id(token: str) -> str:
    resp = httpx.get(f"{API_BASE}/userinfo", headers=_headers(token))
    resp.raise_for_status()
    return resp.json()["sub"]


def create_text_post(token: str, text: str) -> dict:
    user_id = get_user_id(token)
    payload = {
        "author": f"urn:li:person:{user_id}",
        "lifecycleState": "PUBLISHED",
        "specificContent": {
            "com.linkedin.ugc.ShareContent": {
                "shareCommentary": {"text": text},
                "shareMediaCategory": "NONE",
            }
        },
        "visibility": {"com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC"},
    }
    resp = httpx.post(
        f"{API_BASE}/ugcPosts",
        json=payload,
        headers={**_headers(token), "Content-Type": "application/json"},
    )
    resp.raise_for_status()
    return resp.json()
