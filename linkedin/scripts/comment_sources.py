"""Post the first comment with sources on the RWA post."""
import json
import sys
from pathlib import Path

import httpx

sys.path.insert(0, str(Path(__file__).parent.parent))

from scoter.official.auth import load_token
from scoter.official.poster import get_user_id

POST_URN = "urn:li:ugcPost:7497651186200924160"

COMMENT_TEXT = """Fontes:

→ Yahoo Finance — Soneium, Plume e tokenização de ativos reais (2026)
→ CVM Sandbox — relatório do primeiro ciclo regulatório
→ Antier Solutions — Web3 Founder Survey 2026 (13 fundos institucionais)"""


def main():
    token = load_token()
    if not token:
        print("ERROR: No token.")
        sys.exit(1)

    user_id = get_user_id(token)
    headers = {
        "Authorization": f"Bearer {token}",
        "LinkedIn-Version": "202601",
        "X-Restli-Protocol-Version": "2.0.0",
        "Content-Type": "application/json",
    }

    encoded_urn = POST_URN.replace(":", "%3A")
    payload = {
        "actor": f"urn:li:person:{user_id}",
        "message": {"text": COMMENT_TEXT},
        "object": POST_URN,
    }

    resp = httpx.post(
        f"https://api.linkedin.com/rest/socialActions/{encoded_urn}/comments",
        json=payload,
        headers=headers,
    )
    print(f"Status: {resp.status_code}")
    print(f"Response: {resp.text[:500]}")


if __name__ == "__main__":
    main()
