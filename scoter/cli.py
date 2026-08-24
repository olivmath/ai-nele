from __future__ import annotations

import click
from rich.console import Console
from rich.table import Table

console = Console()


@click.group()
def cli() -> None:
    """Scoter — LinkedIn automation toolkit."""


@cli.command()
def login() -> None:
    """Authenticate with LinkedIn OAuth (official API)."""
    from scoter.config import OfficialConfig
    from scoter.official.auth import login_flow

    config = OfficialConfig.from_env()
    token = login_flow(config)
    console.print(f"[green]Authenticated![/green] Token saved to token.json")


@cli.command()
@click.argument("text")
@click.option("--document", "-d", type=click.Path(exists=True), help="PDF/document to attach (carousel)")
@click.option("--doc-title", default="Carousel", help="Title for the document")
def post(text: str, document: str | None, doc_title: str) -> None:
    """Create a post on LinkedIn (official API). Use --document for carousel."""
    from pathlib import Path

    from scoter.config import OfficialConfig
    from scoter.official.auth import load_token
    from scoter.official.poster import create_document_post, create_text_post

    token = load_token()
    if not token:
        config = OfficialConfig.from_env()
        token = config.access_token
    if not token:
        console.print("[red]No token. Run `scoter login` first.[/red]")
        raise SystemExit(1)

    if document:
        result = create_document_post(token, text, Path(document), title=doc_title)
    else:
        result = create_text_post(token, text)
    console.print(f"[green]Posted![/green] ID: {result.get('id', 'unknown')}")


@cli.command("my-posts")
@click.option("--limit", "-n", default=0, help="Max posts (0 = all)")
@click.option("--json-out", "-j", is_flag=True, help="Output raw JSON")
def my_posts(limit: int, json_out: bool) -> None:
    """Fetch all your posts from LinkedIn (official API)."""
    import json as json_mod

    from scoter.official.auth import load_token
    from scoter.official.reader import extract_post_text, get_my_posts

    token = load_token()
    if not token:
        console.print("[red]No token. Run `scoter login` first.[/red]")
        raise SystemExit(1)

    console.print("[dim]Fetching posts...[/dim]")
    posts = get_my_posts(token, count=limit if limit > 0 else 100)
    if limit > 0:
        posts = posts[:limit]

    if json_out:
        console.print_json(json_mod.dumps(posts, ensure_ascii=False))
        return

    table = Table(title=f"My Posts ({len(posts)} total)")
    table.add_column("#", style="dim", width=4)
    table.add_column("Text", max_width=80)
    table.add_column("ID", style="dim")

    for i, p in enumerate(posts, 1):
        text = extract_post_text(p)
        preview = text[:120].replace("\n", " ") + ("..." if len(text) > 120 else "")
        post_id = p.get("id", "?")
        table.add_row(str(i), preview, post_id)

    console.print(table)


@cli.command()
@click.argument("keywords")
@click.option("--limit", "-n", default=10, help="Max results")
def search(keywords: str, limit: int) -> None:
    """Search people on LinkedIn (unofficial API)."""
    from scoter.config import UnofficialConfig
    from scoter.unofficial.searcher import connect, search_people

    config = UnofficialConfig.from_env()
    api = connect(config)
    results = search_people(api, keywords, limit=limit)

    table = Table(title=f"Search: {keywords}")
    table.add_column("Name", style="bold")
    table.add_column("Headline")
    table.add_column("Public ID")

    for r in results:
        name = r.get("name", "?")
        headline = r.get("jobtitle", r.get("headline", ""))
        pub_id = r.get("public_id", "")
        table.add_row(name, headline, pub_id)

    console.print(table)


@cli.command()
@click.argument("post_urn")
def like(post_urn: str) -> None:
    """Like a post (unofficial API)."""
    from scoter.config import UnofficialConfig
    from scoter.unofficial.interactor import connect, like_post

    config = UnofficialConfig.from_env()
    api = connect(config)
    like_post(api, post_urn)
    console.print("[green]Liked![/green]")


@cli.command()
@click.argument("post_urn")
@click.argument("text")
def comment(post_urn: str, text: str) -> None:
    """Comment on a post (unofficial API)."""
    from scoter.config import UnofficialConfig
    from scoter.unofficial.interactor import connect, comment_on_post

    config = UnofficialConfig.from_env()
    api = connect(config)
    comment_on_post(api, post_urn, text)
    console.print("[green]Commented![/green]")


@cli.command()
@click.option("--limit", "-n", default=10)
def feed(limit: int) -> None:
    """Show recent feed posts (unofficial API)."""
    from scoter.config import UnofficialConfig
    from scoter.unofficial.interactor import connect, get_feed

    config = UnofficialConfig.from_env()
    api = connect(config)
    posts = get_feed(api, limit=limit)

    for i, p in enumerate(posts, 1):
        author = p.get("author", "?")
        text = p.get("text", "")[:120]
        console.print(f"[bold]{i}.[/bold] {author}")
        console.print(f"   {text}...")
        console.print()
