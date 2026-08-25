from pathlib import Path


PAGES = (
    "identity-a-security-terminal.html",
    "identity-b-engineering-blueprint.html",
    "identity-c-limited-edition.html",
)
REQUIRED_COPY = (
    "Smartcontract Engineer",
    "Senior Blockchain Engineer",
    "20 exemplares",
    "R$ 300",
    "Mercado Pago",
    "WhatsApp",
)


def test_pages_expose_verified_offer_and_waitlist() -> None:
    base = Path(__file__).parents[2] / "landing-pages" / "smartcontract-engineer"
    for page in PAGES:
        content = (base / page).read_text(encoding="utf-8")
        assert '<meta name="viewport"' in content
        assert "https://wa.me/" in content
        assert all(item in content for item in REQUIRED_COPY)
        assert "PDF" not in content
        assert "audiobook" not in content.lower()
