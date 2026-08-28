from __future__ import annotations

from linkedin_api import Linkedin

from scoter.unofficial.connection import connect


def like_post(api: Linkedin, post_urn: str) -> bool:
    return api.react_to_post(post_urn, "LIKE")


def comment_on_post(api: Linkedin, post_urn: str, text: str) -> dict:
    return api.comment_on_post(post_urn, text)


def send_connection(api: Linkedin, profile_id: str, message: str = "") -> bool:
    return api.add_connection(profile_id, message=message)


def send_message(api: Linkedin, profile_id: str, text: str) -> bool:
    return api.send_message(message_body=text, recipients=[profile_id])


def get_feed(api: Linkedin, limit: int = 10) -> list[dict]:
    return api.get_feed_posts(limit=limit)
