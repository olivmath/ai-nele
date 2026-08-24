from __future__ import annotations

from linkedin_api import Linkedin

from scoter.unofficial.connection import connect


def search_people(
    api: Linkedin,
    keywords: str | None = None,
    *,
    limit: int = 10,
    network_depths: list[str] | None = None,
    current_company: list[str] | None = None,
    regions: list[str] | None = None,
) -> list[dict]:
    return api.search_people(
        keywords=keywords,
        limit=limit,
        network_depths=network_depths,
        current_company=current_company,
        regions=regions,
    )


def search_companies(
    api: Linkedin,
    keywords: str | None = None,
    *,
    limit: int = 10,
) -> list[dict]:
    return api.search_companies(keywords=keywords, limit=limit)


def get_profile(api: Linkedin, public_id: str) -> dict:
    return api.get_profile(public_id)


def get_company(api: Linkedin, public_id: str) -> dict:
    return api.get_company(public_id)
