# LinkedIn Carousel and MCP Design

## Goal

Replace the duplicated carousel pages with a React + shadcn/ui, data-driven renderer and expose every maintained LinkedIn workflow through a safe, testable FastMCP server.

## Scope

- Preserve the copy in all `linkedin/posts/2026-08-27-*-hack.md` files.
- Render the eleven existing hack carousels as five-page, 1080 × 1350 PDFs.
- Replace duplicated carousel HTML with a shared React application, shadcn/ui primitives, and one data module per carousel.
- Convert the workflows currently implemented under `linkedin/scripts/` into reusable Python services and FastMCP tools.
- Keep the current CLI and existing MCP tools compatible where their behavior is already public.

## Carousel Architecture

`carousel/` is a Vite React workspace. It imports local carousel data modules, renders five slide components, and owns navigation, keyboard support, touch support, and viewport scaling. shadcn/ui provides the `Button`, `Badge`, `Card`, `Separator`, and `Tooltip` primitives; their tokens are overridden by the incident-report design system.

`npm run build:carousels` creates one static HTML entry point per carousel in `dist/carousels/`. The root-level `carousel-hack-*.html` files become generated build artifacts, so the existing PDF pipeline can continue to open local HTML files without a web server.

The shared components are:

| Component | Responsibility |
|---|---|
| `CoverSlide` | Incident value, title, thesis, severity and metadata |
| `StorySlide` | Short editorial narrative with highlighted facts |
| `CodeSlide` | Vulnerable code and the security lesson |
| `FlowSlide` | Ordered attack sequence in the vertical incident trail |
| `SourcesSlide` | On-chain links and call to action |
| `CarouselViewer` | shadcn controls, dots, keyboard and touch navigation |

### Visual system

The visual language is a technical incident report rather than a decorative grid.

| Token | Value | Role |
|---|---|---|
| `ink` | `#101318` | primary background |
| `paper` | `#F5F2EA` | high-contrast content canvas |
| `signal` | `#E54B38` | incident severity and vulnerability focus |
| `chain` | `#1C6EF2` | navigation and on-chain references |
| `graphite` | `#3E4652` | supporting copy and rules |
| `mint` | `#A8E6CF` | validated / safe state only |

Each slide has a 72px outer margin, 48px internal spacing scale, a fixed footer, and a left-side incident trail. Display typography uses `Arial Narrow, Arial, sans-serif`; editorial copy uses `Georgia, serif`; code and metadata use `ui-monospace, SFMono-Regular, Menlo, monospace`. The only high-saturation emphasis per slide is `signal` or `chain`, never both for the same content role.

## Rendering Contract

`generate-pdfs.mjs` runs after `npm run build:carousels`, loads every generated `carousel-hack-*.html`, verifies that it finds exactly five `.slide` elements, captures each slide at 1080 × 1350, and writes `pdfs/<carousel-name>.pdf`. It exits non-zero with an actionable error when a carousel is invalid or a PDF cannot be created.

## MCP Architecture

Business logic moves to `linkedin/scoter/services/`; `mcp_server.py` only validates MCP input, invokes a service, and serializes its response.

```text
MCP tool -> input validation -> service -> LinkedIn / filesystem / browser
                                  -> ToolResult
```

Every tool returns this JSON-compatible shape:

```json
{
  "status": "ok | error",
  "code": "SUCCESS | MACHINE_READABLE_ERROR",
  "message": "Short, user-readable result.",
  "hint": "Optional next action.",
  "data": {},
  "artifacts": []
}
```

### Tool groups

| Group | Tools | Source workflows |
|---|---|---|
| Carousel | `list_carousels`, `render_carousel_pdf`, `validate_carousel` | `generate_carousel_pdf.py`, `generate-pdfs.mjs` |
| Publishing | `post_text`, `post_image`, `post_document`, `post_comment` | `post_firma.py`, `post_rwa.py`, `post_hack_01_the_dao.py`, `comment_sources.py` |
| Profiles | `get_profile`, `import_profiles_from_workbook`, `scrape_profiles_from_browser` | `fetch_profiles.py`, `scrape_profiles.py` |
| Trends | `collect_web3_trends` | `scrape_web3_trends.py` |
| Diagnostics | `inspect_linkedin_page` | `debug_linkedin.py` |

### Safety and errors

- Tools that publish, comment, like, message, connect, or scrape a logged-in browser require `confirm=true`; otherwise they return `CONFIRMATION_REQUIRED` without side effects.
- File inputs resolve only within the repository root. An external or missing file returns `PATH_NOT_ALLOWED` or `FILE_NOT_FOUND`.
- Missing official OAuth credentials return `AUTH_REQUIRED`; missing secondary-cookie credentials return `SECONDARY_AUTH_REQUIRED`; missing CDP browser session returns `BROWSER_SESSION_REQUIRED`.
- Network and LinkedIn API failures return `LINKEDIN_API_ERROR` with a safe status summary; tokens, cookies, and authorization headers are never exposed.
- Validation errors return `VALIDATION_ERROR` and name the invalid field plus the expected value.
- Internal exceptions are logged with traceback server-side and return `INTERNAL_ERROR` with a recovery hint.

## Tests and Validation

- Unit-test React slide rendering, carousel data validation, output-path confinement, confirmation guards, and every error code.
- Unit-test service-to-`ToolResult` conversion with HTTP/browser clients injected as fakes.
- Add a smoke test that renders The DAO carousel and confirms a five-page PDF.
- Verify the visual redesign by saving desktop screenshots of all five The DAO slides and checking all generated PDFs are five pages.

## Non-goals

- No automatic publishing: the MCP only publishes when the caller supplies `confirm=true`.
- No changes to the content files or copy in this work.
- No migration of the unofficial LinkedIn APIs to a sanctioned API; the MCP keeps their existing account separation and rate limits.
