from __future__ import annotations

from pathlib import Path

import httpx

API_BASE = "https://api.linkedin.com/v2"
REST_BASE = "https://api.linkedin.com/rest"


def _headers(token: str) -> dict[str, str]:
    return {
        "Authorization": f"Bearer {token}",
        "X-Restli-Protocol-Version": "2.0.0",
    }


def _rest_headers(token: str) -> dict[str, str]:
    return {
        "Authorization": f"Bearer {token}",
        "LinkedIn-Version": "202601",
        "X-Restli-Protocol-Version": "2.0.0",
        "Content-Type": "application/json",
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


def _init_image_upload(token: str, user_id: str) -> dict:
    resp = httpx.post(
        f"{REST_BASE}/images?action=initializeUpload",
        json={"initializeUploadRequest": {"owner": f"urn:li:person:{user_id}"}},
        headers=_rest_headers(token),
    )
    if not resp.is_success:
        raise RuntimeError(f"Image upload init failed ({resp.status_code}): {resp.text}")
    return resp.json()["value"]


def _upload_image(upload_url: str, file_path: Path, token: str) -> None:
    data = file_path.read_bytes()
    resp = httpx.put(
        upload_url,
        content=data,
        headers={
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/octet-stream",
        },
        timeout=60,
    )
    resp.raise_for_status()


def create_image_post(token: str, text: str, image_path: Path) -> dict:
    user_id = get_user_id(token)
    upload_info = _init_image_upload(token, user_id)
    upload_url = upload_info["uploadUrl"]
    image_urn = upload_info["image"]

    _upload_image(upload_url, image_path, token)

    payload = {
        "author": f"urn:li:person:{user_id}",
        "commentary": text,
        "visibility": "PUBLIC",
        "distribution": {
            "feedDistribution": "MAIN_FEED",
            "targetEntities": [],
            "thirdPartyDistributionChannels": [],
        },
        "content": {
            "media": {
                "id": image_urn,
            }
        },
        "lifecycleState": "PUBLISHED",
    }
    resp = httpx.post(
        f"{REST_BASE}/posts",
        json=payload,
        headers=_rest_headers(token),
    )
    resp.raise_for_status()
    return resp.json() if resp.text else {"id": resp.headers.get("x-restli-id", "posted")}


def _init_document_upload(token: str, user_id: str) -> dict:
    resp = httpx.post(
        f"{REST_BASE}/documents?action=initializeUpload",
        json={"initializeUploadRequest": {"owner": f"urn:li:person:{user_id}"}},
        headers=_rest_headers(token),
    )
    if not resp.is_success:
        raise RuntimeError(f"Document upload init failed ({resp.status_code}): {resp.text}")
    return resp.json()["value"]


def _upload_document(upload_url: str, file_path: Path, token: str) -> None:
    data = file_path.read_bytes()
    resp = httpx.put(
        upload_url,
        content=data,
        headers={
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/octet-stream",
        },
        timeout=60,
    )
    resp.raise_for_status()


def create_document_post(token: str, text: str, pdf_path: Path, title: str = "Carousel") -> dict:
    user_id = get_user_id(token)
    upload_info = _init_document_upload(token, user_id)
    upload_url = upload_info["uploadUrl"]
    document_urn = upload_info["document"]

    _upload_document(upload_url, pdf_path, token)

    payload = {
        "author": f"urn:li:person:{user_id}",
        "commentary": text,
        "visibility": "PUBLIC",
        "distribution": {
            "feedDistribution": "MAIN_FEED",
            "targetEntities": [],
            "thirdPartyDistributionChannels": [],
        },
        "content": {
            "media": {
                "title": title,
                "id": document_urn,
            }
        },
        "lifecycleState": "PUBLISHED",
    }
    resp = httpx.post(
        f"{REST_BASE}/posts",
        json=payload,
        headers=_rest_headers(token),
    )
    resp.raise_for_status()
    return resp.json() if resp.text else {"id": resp.headers.get("x-restli-id", "posted")}
