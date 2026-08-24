from __future__ import annotations

import json
import webbrowser
from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import parse_qs, urlencode, urlparse

import httpx

from scoter.config import OfficialConfig, TOKEN_PATH

AUTHORIZE_URL = "https://www.linkedin.com/oauth/v2/authorization"
TOKEN_URL = "https://www.linkedin.com/oauth/v2/accessToken"
SCOPES = ["openid", "profile", "r_member_social", "w_member_social"]


def get_authorization_url(config: OfficialConfig) -> str:
    params = {
        "response_type": "code",
        "client_id": config.client_id,
        "redirect_uri": config.redirect_uri,
        "scope": " ".join(SCOPES),
        "state": "scoter-auth",
    }
    return f"{AUTHORIZE_URL}?{urlencode(params)}"


def exchange_code_for_token(code: str, config: OfficialConfig) -> dict:
    resp = httpx.post(
        TOKEN_URL,
        data={
            "grant_type": "authorization_code",
            "code": code,
            "redirect_uri": config.redirect_uri,
            "client_id": config.client_id,
            "client_secret": config.client_secret,
        },
    )
    resp.raise_for_status()
    token_data = resp.json()
    TOKEN_PATH.write_text(json.dumps(token_data, indent=2))
    return token_data


def load_token() -> str | None:
    if TOKEN_PATH.exists():
        data = json.loads(TOKEN_PATH.read_text())
        return data.get("access_token")
    return None


def login_flow(config: OfficialConfig) -> str:
    """Opens browser for OAuth, captures callback, returns access_token."""
    auth_url = get_authorization_url(config)
    captured: dict = {}

    class Handler(BaseHTTPRequestHandler):
        def do_GET(self) -> None:
            qs = parse_qs(urlparse(self.path).query)
            captured["code"] = qs.get("code", [None])[0]
            self.send_response(200)
            self.send_header("Content-Type", "text/html")
            self.end_headers()
            self.wfile.write(b"<h1>Done! You can close this tab.</h1>")

        def log_message(self, *args) -> None:  # type: ignore[override]
            pass

    parsed = urlparse(config.redirect_uri)
    server = HTTPServer((parsed.hostname or "localhost", parsed.port or 8080), Handler)

    webbrowser.open(auth_url)
    server.handle_request()

    code = captured.get("code")
    if not code:
        raise RuntimeError("No authorization code received")

    token_data = exchange_code_for_token(code, config)
    return token_data["access_token"]
