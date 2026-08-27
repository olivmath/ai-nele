"""Scoter MCP Server — LinkedIn automation tools for Claude Code."""
from __future__ import annotations

import os
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent))

from mcp.server.fastmcp import FastMCP
from scoter.services import confirmation, result, run_script, workspace_path

mcp = FastMCP("scoter-linkedin")


@mcp.tool()
def list_workflows() -> dict:
    """List the maintained LinkedIn workflows exposed by this MCP."""
    workflows = ["comment_sources.py", "debug_linkedin.py", "fetch_profiles.py", "generate_carousel_pdf.py", "post_firma.py", "post_hack_01_the_dao.py", "post_rwa.py", "scrape_profiles.py", "scrape_web3_trends.py"]
    return result("ok", "WORKFLOWS_LISTED", "Available workflows listed.", data={"workflows": workflows})


@mcp.tool()
def run_legacy_workflow(workflow: str, confirm: bool = False) -> dict:
    """Run a maintained script with confirmation, timeout, and structured errors."""
    return run_script(workflow, confirm=confirm)


@mcp.tool()
def validate_file(path: str) -> dict:
    """Validate a workspace file path before it is used by another tool."""
    try:
        file = workspace_path(path)
    except ValueError:
        return result("error", "PATH_NOT_ALLOWED", "The path must be inside this repository.", hint="Use a relative workspace path.")
    except FileNotFoundError:
        return result("error", "FILE_NOT_FOUND", "The requested file does not exist.", hint="Check the path or generate the artifact first.")
    return result("ok", "FILE_VALID", "File is available.", data={"path": str(file), "bytes": file.stat().st_size})


def _get_token() -> str:
    from scoter.official.auth import load_token

    token = load_token()
    if not token:
        from scoter.config import OfficialConfig

        config = OfficialConfig.from_env()
        token = config.access_token
    if not token:
        raise RuntimeError("No token. Run `scoter login` first.")
    return token


def _get_unofficial_api():
    from scoter.config import UnofficialConfig
    from scoter.unofficial.connection import connect

    config = UnofficialConfig.from_env()
    return connect(config)


# --- Official API tools ---


@mcp.tool()
def post_text(text: str) -> str:
    """Create a text-only LinkedIn post."""
    from scoter.official.poster import create_text_post

    token = _get_token()
    result = create_text_post(token, text)
    return f"Posted! ID: {result.get('id', 'unknown')}"


@mcp.tool()
def post_document(text: str, pdf_path: str, title: str = "Carousel") -> str:
    """Create a LinkedIn post with a PDF carousel attachment."""
    from scoter.official.poster import create_document_post

    token = _get_token()
    path = Path(pdf_path)
    if not path.exists():
        return f"Error: PDF not found at {pdf_path}"
    result = create_document_post(token, text, path, title=title)
    return f"Posted! ID: {result.get('id', 'unknown')}"


@mcp.tool()
def post_image(text: str, image_path: str) -> str:
    """Create a LinkedIn post with an image attachment."""
    from scoter.official.poster import create_image_post

    token = _get_token()
    path = Path(image_path)
    if not path.exists():
        return f"Error: Image not found at {image_path}"
    result = create_image_post(token, text, path)
    return f"Posted! ID: {result.get('id', 'unknown')}"


@mcp.tool()
def my_posts(limit: int = 10) -> str:
    """List your recent LinkedIn posts."""
    from scoter.official.reader import extract_post_text, get_my_posts

    token = _get_token()
    posts = get_my_posts(token, count=limit)
    if not posts:
        return "No posts found."

    lines = []
    for i, p in enumerate(posts[:limit], 1):
        text = extract_post_text(p)
        preview = text[:120].replace("\n", " ")
        post_id = p.get("id", "?")
        lines.append(f"{i}. [{post_id}] {preview}...")
    return "\n".join(lines)


# --- Unofficial API tools ---


@mcp.tool()
def search_people(
    keywords: str, limit: int = 10
) -> str:
    """Search people on LinkedIn by keywords."""
    from scoter.unofficial.searcher import search_people as _search

    api = _get_unofficial_api()
    results = _search(api, keywords, limit=limit)
    if not results:
        return "No results."

    lines = []
    for r in results:
        name = r.get("name", "?")
        headline = r.get("jobtitle", r.get("headline", ""))
        pub_id = r.get("public_id", "")
        lines.append(f"- {name} | {headline} | @{pub_id}")
    return "\n".join(lines)


@mcp.tool()
def search_companies(keywords: str, limit: int = 10) -> str:
    """Search companies on LinkedIn by keywords."""
    from scoter.unofficial.searcher import search_companies as _search

    api = _get_unofficial_api()
    results = _search(api, keywords, limit=limit)
    if not results:
        return "No results."

    lines = []
    for r in results:
        lines.append(f"- {r}")
    return "\n".join(lines)


@mcp.tool()
def get_profile(public_id: str) -> str:
    """Get a LinkedIn profile by public ID."""
    import json

    from scoter.unofficial.searcher import get_profile as _get

    api = _get_unofficial_api()
    profile = _get(api, public_id)
    keys = [
        "firstName", "lastName", "headline", "summary",
        "industryName", "locationName", "public_id",
    ]
    filtered = {k: profile.get(k) for k in keys if profile.get(k)}
    return json.dumps(filtered, ensure_ascii=False, indent=2)


@mcp.tool()
def like_post(post_urn: str) -> str:
    """Like a LinkedIn post by its URN."""
    from scoter.unofficial.interactor import like_post as _like

    api = _get_unofficial_api()
    _like(api, post_urn)
    return "Liked!"


@mcp.tool()
def comment_on_post(post_urn: str, text: str) -> str:
    """Comment on a LinkedIn post."""
    from scoter.unofficial.interactor import comment_on_post as _comment

    api = _get_unofficial_api()
    _comment(api, post_urn, text)
    return "Commented!"


@mcp.tool()
def send_connection(profile_id: str, message: str = "") -> str:
    """Send a connection request to a LinkedIn profile."""
    from scoter.unofficial.interactor import send_connection as _connect

    api = _get_unofficial_api()
    _connect(api, profile_id, message=message)
    return "Connection request sent!"


@mcp.tool()
def send_message(profile_id: str, text: str) -> str:
    """Send a direct message to a LinkedIn connection."""
    from scoter.unofficial.interactor import send_message as _msg

    api = _get_unofficial_api()
    _msg(api, profile_id, text)
    return "Message sent!"


@mcp.tool()
def get_feed(limit: int = 10) -> str:
    """Get recent posts from your LinkedIn feed."""
    from scoter.unofficial.interactor import get_feed as _feed

    api = _get_unofficial_api()
    posts = _feed(api, limit=limit)
    if not posts:
        return "No feed posts."

    lines = []
    for i, p in enumerate(posts[:limit], 1):
        author = p.get("author", "?")
        text = (p.get("text", "") or "")[:120].replace("\n", " ")
        lines.append(f"{i}. {author}: {text}...")
    return "\n".join(lines)


if __name__ == "__main__":
    mcp.run()
