# Smartcontract Engineer Landing-page Variants Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build three responsive HTML landing-page identities for the physical first edition of *Smartcontract Engineer — Solidity*.

**Architecture:** Each standalone page retains the same verified commercial facts and WhatsApp waitlist CTA, while its composition, palette, typography, and CSS-only signature object differ. A pytest contract test protects the facts and accessible foundation.

**Tech Stack:** HTML5, CSS3, inline JavaScript, Google Fonts, pytest 8.

**Spec:** `docs/superpowers/specs/2026-08-25-solbook-v2-design.md`

## Global Constraints

- Sell only the physical first edition; do not promise digital formats, VSL, testimonials, logos, guarantees, fake stock, or unverified claims.
- CTA: WhatsApp waitlist using `https://wa.me/` as a replaceable number placeholder.
- Preserve: 50 physical copies; 20 at R$ 300; 10 at R$ 350; 20 later with price undefined; Brazil; checkout freight; dispatch expected by late September 2026; 25 chapters; 15 contracts; 3 vulnerabilities; 1 complete project.
- Present Lucas Oliveira only as `Senior Blockchain Engineer` with `+6 anos de experiência em blockchain`.
- Mobile responsive; visible keyboard focus; respect `prefers-reduced-motion`.

## File Structure

| Path | Responsibility |
| --- | --- |
| `landing-pages/smartcontract-engineer/identity-a-security-terminal.html` | Security console identity with a terminal transcript hero. |
| `landing-pages/smartcontract-engineer/identity-b-engineering-blueprint.html` | Engineering identity with an EVM-style blueprint hero. |
| `landing-pages/smartcontract-engineer/identity-c-limited-edition.html` | Premium editorial identity with a numbered-book hero. |
| `linkedin/tests/test_smartcontract_landing_pages.py` | Static contract test for all landing pages. |

### Task 1: Write the failing static contract test

**Files:**
- Create: `linkedin/tests/test_smartcontract_landing_pages.py`

**Interfaces:**
- Consumes: the three standalone HTML files below.
- Produces: one test that checks viewport, WhatsApp link, verified offer copy, and absence of digital-format claims.

- [ ] **Step 1: Write the failing test**

```python
from pathlib import Path

PAGES = (
    "identity-a-security-terminal.html",
    "identity-b-engineering-blueprint.html",
    "identity-c-limited-edition.html",
)
REQUIRED_COPY = ("Smartcontract Engineer", "Senior Blockchain Engineer", "20 exemplares", "R$ 300", "Mercado Pago", "WhatsApp")

def test_pages_expose_verified_offer_and_waitlist() -> None:
    base = Path(__file__).parents[2] / "landing-pages" / "smartcontract-engineer"
    for page in PAGES:
        content = (base / page).read_text(encoding="utf-8")
        assert '<meta name="viewport"' in content
        assert "https://wa.me/" in content
        assert all(item in content for item in REQUIRED_COPY)
        assert "PDF" not in content
        assert "audiobook" not in content.lower()
```

- [ ] **Step 2: Verify the failure**

Run: `cd linkedin && ../.venv/bin/python -m pytest tests/test_smartcontract_landing_pages.py -q`

Expected: FAIL because the pages do not exist.

### Task 2: Build identity A — Security Terminal

**Files:**
- Create: `landing-pages/smartcontract-engineer/identity-a-security-terminal.html`

**Interfaces:**
- Consumes: global commercial constraints.
- Produces: semantic page with the waitlist CTA and terminal transcript signature.

- [ ] **Step 1: Write semantic sections**

Create `header`, `main`, `section`, and `footer` elements for hero, book facts, method, author, availability ladder, FAQ, and CTA.

- [ ] **Step 2: Write its identity CSS**

Use `Space Grotesk` and `IBM Plex Mono`; tokens `#09110d`, `#11251b`, `#d7ffe9`, `#a5ff39`, `#ff775f`, `#6a8b77`; show threat model → test → audit → deploy in the terminal hero.

- [ ] **Step 3: Implement accessibility and responsive behavior**

Stack the grids below 720px, add visible focus styles, and zero transition durations under `prefers-reduced-motion`.

### Task 3: Build identity B — Engineering Blueprint

**Files:**
- Create: `landing-pages/smartcontract-engineer/identity-b-engineering-blueprint.html`

**Interfaces:**
- Consumes: global commercial constraints.
- Produces: semantic page with the waitlist CTA and CSS blueprint signature.

- [ ] **Step 1: Write semantic sections**

Create the same content structure as Task 2; use the reader journey labels `fundamentos`, `linguagem`, `segurança`, and `deploy auditado`.

- [ ] **Step 2: Write its identity CSS**

Use `Archivo` and `DM Mono`; tokens `#edf1e9`, `#d5ddd1`, `#153b55`, `#0d6e97`, `#202b32`, `#d85c3e`; show a CSS-only flow between storage, calldata, tests, audit, and deploy.

- [ ] **Step 3: Implement accessibility and responsive behavior**

Collapse the diagram below 760px, keep focus visible, and disable transitions under reduced motion.

### Task 4: Build identity C — Limited Edition Object

**Files:**
- Create: `landing-pages/smartcontract-engineer/identity-c-limited-edition.html`

**Interfaces:**
- Consumes: global commercial constraints.
- Produces: semantic page with the waitlist CTA and CSS book-object signature.

- [ ] **Step 1: Write semantic sections**

Lead with the edition object, then show the technical method, author proof, availability ladder, FAQ, and repeated CTA.

- [ ] **Step 2: Write its identity CSS**

Use `Bodoni Moda`, `Manrope`, and `JetBrains Mono`; tokens `#15120e`, `#f4eddf`, `#b7793c`, `#e3c483`, `#766c60`, `#b8322f`; show a CSS-only cover and numbered spine labelled `1ª edição · 50 exemplares`, without claiming current stock.

- [ ] **Step 3: Implement accessibility and responsive behavior**

Stack the book object above the title below 760px, keep focus visible, and disable transitions under reduced motion.

### Task 5: Verify the variants

**Files:**
- Verify: all files in `landing-pages/smartcontract-engineer/`
- Verify: `linkedin/tests/test_smartcontract_landing_pages.py`

- [ ] **Step 1: Run the static contract test**

Run: `cd linkedin && ../.venv/bin/python -m pytest tests/test_smartcontract_landing_pages.py -q`

Expected: PASS.

- [ ] **Step 2: Inspect desktop and mobile renderings**

Run: open all three HTML pages at 1440px and 390px widths in the in-app browser.

Expected: no horizontal overflow, legible CTA, and visibly distinct identities.

- [ ] **Step 3: Commit**

Run: `git add landing-pages/smartcontract-engineer linkedin/tests/test_smartcontract_landing_pages.py && git commit -m "feat(solbook): add landing page identity variants"`
