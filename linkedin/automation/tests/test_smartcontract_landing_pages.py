import re
from pathlib import Path

LINKEDIN_ROOT = Path(__file__).parents[2]
LANDING_PAGES_ROOT = LINKEDIN_ROOT / "landing-pages"

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
    base = LANDING_PAGES_ROOT / "smartcontract-engineer"
    for page in PAGES:
        content = (base / page).read_text(encoding="utf-8")
        assert '<meta name="viewport"' in content
        assert "https://wa.me/" in content
        assert all(item in content for item in REQUIRED_COPY)
        assert "PDF" not in content
        assert "audiobook" not in content.lower()


LIVRO_V2_PAGE = LANDING_PAGES_ROOT / "livro" / "v2" / "index.html"


def _section_markup(content: str, section_id: str) -> str:
    match = re.search(
        rf'<section\b[^>]*\bid=["\']{re.escape(section_id)}["\'][^>]*>(.*?)</section>',
        content,
        flags=re.DOTALL,
    )
    assert match, f"section #{section_id} is missing"
    return match.group(0)


def test_livro_v2_hero_features_book_mockup_not_vsl() -> None:
    """Removing the physical product from the first fold must fail this test."""
    hero = _section_markup(LIVRO_V2_PAGE.read_text(encoding="utf-8"), "livro")

    assert 'data-book-mockup="hero"' in hero
    assert "<img" in hero
    assert "<video" not in hero


def test_livro_v2_places_vsl_in_its_own_section() -> None:
    """Moving the VSL back into the hero or removing it must fail this test."""
    vsl = _section_markup(LIVRO_V2_PAGE.read_text(encoding="utf-8"), "vsl")

    assert "<video" in vsl
    assert "../assets/tenham-em-mente.mp4" in vsl


def test_livro_v2_exposes_two_book_spreads() -> None:
    """Dropping either interior-page preview must fail this test."""
    book_interior = _section_markup(
        LIVRO_V2_PAGE.read_text(encoding="utf-8"), "livro-por-dentro"
    )

    assert 'data-book-spread="one"' in book_interior
    assert 'data-book-spread="two"' in book_interior


def test_livro_v2_offer_includes_compact_book_mockup() -> None:
    """Removing the product reminder next to checkout must fail this test."""
    offer = _section_markup(LIVRO_V2_PAGE.read_text(encoding="utf-8"), "oferta")

    assert 'data-book-mockup="compact"' in offer


def test_livro_v2_checkout_price_does_not_break_between_currency_and_value() -> None:
    """Allowing the main price to wrap on narrow screens must fail this test."""
    offer = _section_markup(LIVRO_V2_PAGE.read_text(encoding="utf-8"), "oferta")

    assert re.search(
        r'<span[^>]*class=["\'][^"\']*\bshrink-0\b[^"\']*["\'][^>]*>R\$&nbsp;300</span>',
        offer,
    )


def test_livro_v2_navbar_omits_logo_and_preorder_cta() -> None:
    """Restoring either removed navbar control must fail this test."""
    content = LIVRO_V2_PAGE.read_text(encoding="utf-8")

    assert 'id="nav-logo"' not in content
    assert 'id="nav-cta-btn"' not in content


def test_livro_v2_book_cover_mockups_use_shared_asset() -> None:
    """Pointing a cover mockup at a local or stale asset must fail this test."""
    content = LIVRO_V2_PAGE.read_text(encoding="utf-8")
    mockup_sources = re.findall(
        r'<figure\b[^>]*data-book-mockup=["\'][^"\']+["\'][^>]*>.*?'
        r'<img\b[^>]*src=["\']([^"\']+)["\']',
        content,
        flags=re.DOTALL,
    )

    assert mockup_sources
    assert set(mockup_sources) == {"../assets/book-cover-mockup.png"}
