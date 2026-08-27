# LinkedIn Carousel and MCP Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deliver eleven harmonious React + shadcn/ui carousels as validated PDFs and expose every LinkedIn workflow through robust FastMCP tools.

**Architecture:** A Vite React workspace renders data-only carousel definitions with shared shadcn/ui slide components, then emits static HTML consumed by Puppeteer. Python services isolate every former script workflow; FastMCP tools validate inputs, enforce confirmation for external actions, and return a uniform `ToolResult` envelope.

**Tech Stack:** React 18, TypeScript, Vite, Tailwind CSS, shadcn/ui, Vitest, Testing Library, Puppeteer, Python 3.11, FastMCP, pytest.

**Spec:** `docs/superpowers/specs/2026-08-27-linkedin-carousel-mcp-design.md`

## Global Constraints

- Preserve all copy under `linkedin/posts/2026-08-27-*-hack.md`.
- Render exactly five 1080 × 1350 slides per hack carousel.
- Use React + shadcn/ui for the carousel UI; no custom duplicate control primitives.
- Resolve tool file paths only inside the repository root.
- Return `status`, `code`, `message`, `hint`, `data`, and `artifacts` from every MCP tool.
- Require `confirm=true` before publishing, commenting, interacting, or using a logged-in browser.
- Never return tokens, cookies, authorization headers, or tracebacks to a tool caller.
- Run `npm run build`, `npm run test`, `pytest`, `ruff check`, and `mypy scoter/` before handoff.

---

### Task 1: Create the carousel React workspace and data contract

**Files:**
- Create: `carousel/package.json`
- Create: `carousel/vite.config.ts`
- Create: `carousel/tsconfig.json`
- Create: `carousel/src/types.ts`
- Create: `carousel/src/data/the-dao.ts`
- Create: `carousel/src/data/index.ts`
- Test: `carousel/src/data/data.test.ts`

**Interfaces:**
- Produces: `CarouselDefinition`, `SlideDefinition`, `CAROUSELS`, and `getCarousel(slug: string): CarouselDefinition`.
- Consumes: approved carousel content in the existing HTML and markdown files.

- [ ] **Step 1: Write the failing data-contract test**

```ts
import { getCarousel } from './index'

it('returns The DAO as a five-slide carousel', () => {
  const carousel = getCarousel('the-dao')
  expect(carousel.slides).toHaveLength(5)
  expect(carousel.slides.map((slide) => slide.kind)).toEqual([
    'cover', 'story', 'code', 'flow', 'sources',
  ])
})
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm --prefix carousel test -- data.test.ts`

Expected: FAIL because `getCarousel` does not exist.

- [ ] **Step 3: Implement the types and The DAO data module**

```ts
export type SlideKind = 'cover' | 'story' | 'code' | 'flow' | 'sources'

export interface CarouselDefinition {
  slug: string
  incident: { name: string; date: string; value: string; thesis: string; severity: string }
  slides: SlideDefinition[]
}

export const getCarousel = (slug: string) => {
  const carousel = CAROUSELS[slug]
  if (!carousel) throw new Error(`Unknown carousel: ${slug}`)
  return carousel
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm --prefix carousel test -- data.test.ts`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add carousel/package.json carousel/vite.config.ts carousel/tsconfig.json carousel/src/types.ts carousel/src/data
git commit -m "feat(carousel): add data-driven React workspace"
```

### Task 2: Build and test shared shadcn/ui slide components

**Files:**
- Create: `carousel/src/components/ui/{button,badge,card,separator,tooltip}.tsx`
- Create: `carousel/src/components/{cover-slide,story-slide,code-slide,flow-slide,sources-slide,carousel-viewer}.tsx`
- Create: `carousel/src/styles/globals.css`
- Test: `carousel/src/components/carousel-viewer.test.tsx`

**Interfaces:**
- Consumes: `CarouselDefinition` from `src/types.ts`.
- Produces: `<CarouselViewer carousel={carousel} />`, with each slide rendered as `.slide`.

- [ ] **Step 1: Write the failing component test**

```tsx
render(<CarouselViewer carousel={getCarousel('the-dao')} />)
expect(screen.getByText('THE DAO')).toBeInTheDocument()
expect(document.querySelectorAll('.slide')).toHaveLength(5)
await userEvent.click(screen.getByRole('button', { name: 'Next slide' }))
expect(screen.getByText('O que aconteceu')).toBeVisible()
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm --prefix carousel test -- carousel-viewer.test.tsx`

Expected: FAIL because `CarouselViewer` does not exist.

- [ ] **Step 3: Implement shadcn/ui primitives and components**

```tsx
export function CarouselViewer({ carousel }: { carousel: CarouselDefinition }) {
  const [activeIndex, setActiveIndex] = useState(0)
  return (
    <main className="carousel" aria-label={`${carousel.incident.name} carousel`}>
      <div className="slides" style={{ transform: `translateX(-${activeIndex * 1080}px)` }}>
        {carousel.slides.map((slide, index) => <Slide key={slide.kind} slide={slide} index={index} />)}
      </div>
      <Button aria-label="Next slide" onClick={() => setActiveIndex((index) => Math.min(index + 1, 4))}>Next</Button>
    </main>
  )
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm --prefix carousel test -- carousel-viewer.test.tsx`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add carousel/src/components carousel/src/styles/globals.css
git commit -m "feat(carousel): add shared incident-report slides"
```

### Task 3: Add every carousel dataset and static HTML build

**Files:**
- Create: `carousel/src/data/{parity-wallet,beautychain,bzx,poly-network,cream-finance,ronin-bridge,akutars-nft,nomad-bridge,euler-finance,curve-finance}.ts`
- Create: `carousel/src/entry.tsx`
- Create: `carousel/scripts/build-static.mjs`
- Modify: `package.json`
- Modify: `generate-pdfs.mjs`
- Test: `carousel/scripts/build-static.test.mjs`

**Interfaces:**
- Consumes: `CAROUSELS` and `<CarouselViewer>`.
- Produces: root `carousel-hack-*.html` files that reference a built React bundle and contain the target carousel slug.

- [ ] **Step 1: Write the failing static-build test**

```js
const result = await buildStatic({ slug: 'the-dao', outputDir: tempDir })
expect(result.htmlPath).toMatch(/carousel-hack-01-the-dao\.html$/)
expect(await readFile(result.htmlPath, 'utf8')).toContain('data-carousel="the-dao"')
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `node --test carousel/scripts/build-static.test.mjs`

Expected: FAIL because `buildStatic` does not exist.

- [ ] **Step 3: Implement static entries and datasets**

```js
export async function buildStatic({ slug, outputDir }) {
  const { filename } = carouselManifest[slug]
  const html = `<!doctype html><html><body><div id="root" data-carousel="${slug}"></div><script type="module" src="/assets/entry.js"></script></body></html>`
  await writeFile(join(outputDir, filename), html)
  return { htmlPath: join(outputDir, filename) }
}
```

- [ ] **Step 4: Run the build and test to verify it passes**

Run: `node --test carousel/scripts/build-static.test.mjs && npm run build:carousels`

Expected: PASS and 11 root `carousel-hack-*.html` artifacts.

- [ ] **Step 5: Commit**

```bash
git add carousel package.json generate-pdfs.mjs carousel-hack-*.html
git commit -m "feat(carousel): build all hack carousels from React data"
```

### Task 4: Harden PDF rendering and verify the redesigned documents

**Files:**
- Modify: `generate-pdfs.mjs`
- Create: `tests/pdf/test_generate_pdfs.mjs`

**Interfaces:**
- Consumes: generated root carousel HTML entries.
- Produces: `pdfs/<carousel-name>.pdf` with exactly five pages.

- [ ] **Step 1: Write the failing PDF validation test**

```js
await expect(validateCarouselHtml(theDaoHtml)).resolves.toEqual({ slides: 5, width: 1080, height: 1350 })
await expect(validateCarouselHtml(invalidHtml)).rejects.toMatchObject({ code: 'CAROUSEL_INVALID' })
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `node --test tests/pdf/test_generate_pdfs.mjs`

Expected: FAIL because `validateCarouselHtml` does not exist.

- [ ] **Step 3: Implement validation and actionable rendering failures**

```js
if (slideCount !== 5) {
  throw new CarouselRenderError('CAROUSEL_INVALID', `Expected 5 slides, found ${slideCount}.`, 'Fix the carousel data before rendering.')
}
```

- [ ] **Step 4: Run generation and verify its output**

Run: `npm run build:carousels && node generate-pdfs.mjs && pdfinfo pdfs/carousel-hack-01-the-dao.pdf | rg '^Pages:\s+5$'`

Expected: Eleven PDFs generated; The DAO reports five pages.

- [ ] **Step 5: Capture all five The DAO slides for visual review**

Run: `node tests/pdf/capture-carousel.mjs carousel-hack-01-the-dao.html artifacts/the-dao`

Expected: five 1080 × 1350 PNGs using the incident trail with no clipped text.

- [ ] **Step 6: Commit**

```bash
git add generate-pdfs.mjs tests/pdf pdfs carousel-hack-*.html
git commit -m "fix(carousel): validate and regenerate hack PDFs"
```

### Task 5: Introduce MCP result and safety primitives

**Files:**
- Create: `linkedin/scoter/services/results.py`
- Create: `linkedin/scoter/services/paths.py`
- Create: `linkedin/scoter/services/guards.py`
- Create: `linkedin/tests/test_services_results.py`
- Create: `linkedin/tests/test_services_guards.py`

**Interfaces:**
- Produces: `ToolResult`, `tool_error`, `safe_workspace_path`, and `require_confirmation`.
- Consumed by all subsequent services and MCP tools.

- [ ] **Step 1: Write failing safety tests**

```python
def test_confirmation_guard_has_no_side_effects() -> None:
    with pytest.raises(McpToolError, match="CONFIRMATION_REQUIRED"):
        require_confirmation(False, action="publish a LinkedIn post")

def test_workspace_path_rejects_external_file(tmp_path: Path) -> None:
    with pytest.raises(McpToolError, match="PATH_NOT_ALLOWED"):
        safe_workspace_path(Path("/tmp/outside.pdf"), tmp_path)
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `cd linkedin && pytest tests/test_services_results.py tests/test_services_guards.py -v`

Expected: FAIL because `scoter.services` does not exist.

- [ ] **Step 3: Implement the typed result envelope and errors**

```python
@dataclass(frozen=True)
class ToolResult:
    status: Literal["ok", "error"]
    code: str
    message: str
    hint: str | None = None
    data: dict[str, object] = field(default_factory=dict)
    artifacts: list[str] = field(default_factory=list)

    def to_dict(self) -> dict[str, object]: ...
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `cd linkedin && pytest tests/test_services_results.py tests/test_services_guards.py -v`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add linkedin/scoter/services linkedin/tests/test_services_results.py linkedin/tests/test_services_guards.py
git commit -m "feat(mcp): add safe result and validation primitives"
```

### Task 6: Move publishing and carousel workflows into services and MCP tools

**Files:**
- Create: `linkedin/scoter/services/carousels.py`
- Create: `linkedin/scoter/services/publishing.py`
- Modify: `linkedin/scoter/mcp_server.py`
- Modify: `linkedin/scripts/{generate_carousel_pdf,post_firma,post_rwa,post_hack_01_the_dao,comment_sources}.py`
- Test: `linkedin/tests/test_services_carousels.py`
- Test: `linkedin/tests/test_services_publishing.py`

**Interfaces:**
- Consumes: Task 5 result and guard functions.
- Produces: `list_carousels`, `validate_carousel`, `render_carousel_pdf`, `post_text`, `post_image`, `post_document`, and `post_comment` MCP tools.

- [ ] **Step 1: Write failing service tests**

```python
def test_render_reports_missing_html(repo_root: Path) -> None:
    result = render_carousel_pdf("missing", repo_root)
    assert result.code == "FILE_NOT_FOUND"

def test_publish_requires_explicit_confirmation(fake_poster: FakePoster) -> None:
    result = publish_document("copy", "pdfs/the-dao.pdf", "The DAO", confirm=False, poster=fake_poster)
    assert result.code == "CONFIRMATION_REQUIRED"
    assert fake_poster.calls == []
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `cd linkedin && pytest tests/test_services_carousels.py tests/test_services_publishing.py -v`

Expected: FAIL because service functions do not exist.

- [ ] **Step 3: Implement services and thin FastMCP adapters**

```python
@mcp.tool()
def render_carousel_pdf(slug: str) -> dict[str, object]:
    return render_carousel_pdf_service(slug, REPOSITORY_ROOT).to_dict()

@mcp.tool()
def post_document(text: str, pdf_path: str, title: str, confirm: bool = False) -> dict[str, object]:
    return publish_document(text, pdf_path, title, confirm=confirm).to_dict()
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `cd linkedin && pytest tests/test_services_carousels.py tests/test_services_publishing.py -v`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add linkedin/scoter linkedin/scripts linkedin/tests
git commit -m "feat(mcp): expose safe carousel and publishing workflows"
```

### Task 7: Move profiles, trends, and diagnostics workflows into services and MCP tools

**Files:**
- Create: `linkedin/scoter/services/{profiles,trends,diagnostics}.py`
- Modify: `linkedin/scoter/mcp_server.py`
- Modify: `linkedin/scripts/{fetch_profiles,scrape_profiles,scrape_web3_trends,debug_linkedin}.py`
- Test: `linkedin/tests/test_services_{profiles,trends,diagnostics}.py`

**Interfaces:**
- Consumes: Task 5 confirmation and result primitives.
- Produces: `import_profiles_from_workbook`, `scrape_profiles_from_browser`, `collect_web3_trends`, and `inspect_linkedin_page` MCP tools.

- [ ] **Step 1: Write failing error-contract tests**

```python
def test_trend_collection_requires_confirmation() -> None:
    result = collect_web3_trends(confirm=False, browser=FakeBrowser())
    assert result.code == "CONFIRMATION_REQUIRED"

def test_diagnostic_reports_missing_cdp_session() -> None:
    result = inspect_linkedin_page(confirm=True, browser_factory=MissingSessionBrowser)
    assert result.code == "BROWSER_SESSION_REQUIRED"
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `cd linkedin && pytest tests/test_services_profiles.py tests/test_services_trends.py tests/test_services_diagnostics.py -v`

Expected: FAIL because the service modules do not exist.

- [ ] **Step 3: Implement injected browser/session services**

```python
def collect_web3_trends(*, confirm: bool, browser: BrowserClient) -> ToolResult:
    require_confirmation(confirm, action="scrape a logged-in LinkedIn browser")
    try:
        return ToolResult.ok("TRENDS_COLLECTED", "Web3 trends collected.", data=browser.collect_trends())
    except BrowserSessionMissing:
        return ToolResult.error("BROWSER_SESSION_REQUIRED", "No Chrome CDP session is available.", "Start Chrome with remote debugging and log in to LinkedIn.")
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `cd linkedin && pytest tests/test_services_profiles.py tests/test_services_trends.py tests/test_services_diagnostics.py -v`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add linkedin/scoter linkedin/scripts linkedin/tests
git commit -m "feat(mcp): expose research and diagnostic workflows"
```

### Task 8: Complete quality gates and publish MCP usage documentation

**Files:**
- Modify: `linkedin/AGENTE.md`
- Create: `linkedin/tests/test_mcp_contract.py`

**Interfaces:**
- Consumes: all MCP tools and `ToolResult`.
- Produces: documented tool catalogue and an integration-level contract test.

- [ ] **Step 1: Write the failing MCP contract test**

```python
def test_all_safe_tools_return_the_standard_envelope() -> None:
    result = list_carousels()
    assert set(result) == {"status", "code", "message", "hint", "data", "artifacts"}
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `cd linkedin && pytest tests/test_mcp_contract.py -v`

Expected: FAIL until every tool uses `ToolResult`.

- [ ] **Step 3: Document tools and normalize remaining adapters**

```markdown
| Tool | Side effect | Required flag |
|---|---:|---|
| `render_carousel_pdf` | Writes PDF | none |
| `post_document` | Publishes to LinkedIn | `confirm=true` |
| `collect_web3_trends` | Uses logged-in browser | `confirm=true` |
```

- [ ] **Step 4: Run all verification commands**

Run: `npm run build:carousels && npm --prefix carousel test && node generate-pdfs.mjs && cd linkedin && pytest && ruff check && mypy scoter/`

Expected: All commands PASS; eleven PDFs each have five pages.

- [ ] **Step 5: Commit**

```bash
git add linkedin/AGENTE.md linkedin/tests/test_mcp_contract.py
git commit -m "docs(mcp): document carousel and automation tools"
```
