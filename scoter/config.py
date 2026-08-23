from __future__ import annotations

import os
from dataclasses import dataclass
from pathlib import Path

from dotenv import load_dotenv

load_dotenv()


@dataclass(frozen=True)
class OfficialConfig:
    client_id: str
    client_secret: str
    redirect_uri: str
    access_token: str | None = None

    @classmethod
    def from_env(cls) -> OfficialConfig:
        return cls(
            client_id=os.environ["LINKEDIN_CLIENT_ID"],
            client_secret=os.environ["LINKEDIN_CLIENT_SECRET"],
            redirect_uri=os.getenv("LINKEDIN_REDIRECT_URI", "http://localhost:8080/callback"),
            access_token=os.getenv("LINKEDIN_ACCESS_TOKEN"),
        )


@dataclass(frozen=True)
class UnofficialConfig:
    email: str | None = None
    password: str | None = None
    cookie: str | None = None
    jsessionid: str | None = None

    @classmethod
    def from_env(cls) -> UnofficialConfig:
        return cls(
            email=os.getenv("LINKEDIN_SECONDARY_EMAIL"),
            password=os.getenv("LINKEDIN_SECONDARY_PASSWORD"),
            cookie=os.getenv("LINKEDIN_SECONDARY_COOKIE"),
            jsessionid=os.getenv("LINKEDIN_SECONDARY_JSESSIONID"),
        )


TOKEN_PATH = Path(__file__).parent.parent / "token.json"
