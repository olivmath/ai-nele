# Scoter Monorepo Organization Design

**Date:** 2026-08-27

## Goal

Organize the repository by product boundary without adding a workspace
or build orchestrator. Each product keeps its own commands and dependency
configuration.

## Target Layout

```text
scoter/
├── linkedin/
│   ├── automation/
│   │   ├── scoter/
│   │   ├── scripts/
│   │   ├── tests/
│   │   ├── pyproject.toml
│   │   └── .env.example
│   ├── posts/
│   ├── carousel/
│   │   ├── src/
│   │   ├── data/
│   │   ├── public/
│   │   ├── package.json
│   │   └── exports/
│   ├── landing-pages/
│   │   └── livro/
│   └── skills/
├── video/
│   └── rust-vs-solidity-smart-contracts/
├── docs/
├── .gitignore
└── README.md
```

## Ownership

| Area | Responsibility |
| --- | --- |
| `linkedin/automation` | Python package, MCP server, operational scripts, tests, and environment template. |
| `linkedin/posts` | Source Markdown for LinkedIn posts. |
| `linkedin/carousel` | Independent React + shadcn frontend and carousel source data. |
| `linkedin/landing-pages` | LinkedIn-related landing page projects and their source assets. |
| `linkedin/skills` | Content and marketing skills used by the LinkedIn product. |
| `video` | HyperFrames projects, briefs, scripts, source assets, and video tooling. |
| `docs` | Cross-product specifications and implementation plans. |

## Migration Map

| Current path | Target path | Git policy |
| --- | --- | --- |
| `linkedin/scoter`, `linkedin/scripts`, `linkedin/tests`, `linkedin/pyproject.toml`, `linkedin/uv.lock`, `linkedin/.env.example` | `linkedin/automation/` | Versioned |
| `carousel/` | `linkedin/carousel/` | Versioned source |
| Root `carousel-hack-*.html`, `dashboard-hack-posts.html`, `linkedin/carousel-rwa.html` | `linkedin/carousel/exports/` | Ignored generated output |
| `pdfs/` | `linkedin/carousel/exports/pdfs/` | Ignored generated output |
| `landing-pages/` | `linkedin/landing-pages/` | Versioned source |
| `skills/` | `linkedin/skills/` | Versioned |
| `videos/` | `video/` | Versioned source; generated renders ignored |

## Generated Artifacts

Generated outputs remain available locally but are not versioned:

```gitignore
linkedin/carousel/dist/
linkedin/carousel/exports/
video/*/renders/
video/*/capture/
```

Sources, source assets, input data, Markdown posts, scripts, and project
configuration remain versioned. Existing tracked generated files are removed
from Git index during the migration without deleting local copies.

## Package Boundaries

- No root workspace, task runner, or shared dependency manifest is introduced.
- `linkedin/automation` is the Python package boundary and is invoked from that
  directory with `uv`.
- `linkedin/carousel` is the JavaScript frontend boundary; its build/export
  scripts run from that directory.
- Each video folder remains independently renderable from within `video/`.
- The root README only identifies products and links to their local READMEs.

## Validation

After migration:

1. Run the Python test and lint commands from `linkedin/automation`.
2. Install and run the carousel build from `linkedin/carousel`.
3. Run the video project's existing validation command from its directory.
4. Confirm Git tracks no generated PDFs, carousel exports, video renders, or
   captures.
