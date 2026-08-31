# Scoter

Toolkit de conteúdo para LinkedIn — carrosseis de security incidents, landing page do livro Solidity, e posts.

## Estrutura

```
scoter/
├── src/                        ← App React (Vite + React Router)
│   ├── main.jsx                   entry point
│   ├── App.jsx                    router: /, /carousel
│   ├── pages/carousel/            IncidentDeck, CarouselViewer, SmartcontractDaoSlides
│   ├── components/                dao-adapters, ui (compartilhados)
│   ├── data/carousel/             JSONs dos 11 incidents + content/
│   └── styles/carousel.css        estilos do carousel
│
├── landing-pages/livro/        ← Landing page do livro (HTML estático, deploy separado)
│   ├── index.html                 LP v2 (Tailwind + GSAP)
│   ├── assets/                    imagens, social proofs, logos
│   ├── firebase.json              config Firebase Hosting
│   └── .firebaserc                projeto Firebase
│
├── content/posts/              ← 48 posts LinkedIn em Markdown
│
├── scripts/                    ← Build scripts
│   ├── build.mjs                  esbuild bundle para export HTML
│   └── carousel/                  geração de PDFs (Puppeteer)
│
├── linkedin/automation/        ← Python CLI (projeto separado, não faz parte do frontend)
│   ├── pyproject.toml
│   └── scoter/                    cli, config, mcp_server, services
│
└── video/                      ← HyperFrames (projeto separado)
```

## Comandos

| Comando | O que faz |
|---|---|
| `npm dev` | Dev server — app + landing page em `localhost:5173` |
| `npm build` | Build de produção do app React |
| `npm run build:landing` | Copia LP para `dist-landing/` (deploy independente) |
| `npm run build:carousel` | Bundle esbuild + HTMLs estáticos dos 11 incidents |
| `npm run export:pdf` | Gera PDFs dos carrosseis via Puppeteer |
| `npm preview` | Preview do build de produção |

## Rotas (dev)

| Rota | Conteúdo |
|---|---|
| `/` | Home — links para carousel e landing page |
| `/carousel` | Viewer dos 11 security incident reports (sidebar + slides) |
| `/landing-pages/livro/` | Landing page do livro (HTML estático via symlink) |

## Stack

- **React 19** + **Vite 6** + **React Router 7**
- **Tailwind CSS** (play CDN)
- **@git-diff-view** (diff viewer nos slides de correção)
- **shiki** (syntax highlighting)
- **Vercel Analytics** + **Speed Insights**

## Deploy

**App principal** → Vercel (ou qualquer host estático)
```bash
npm build
```

**Landing page** → Firebase Hosting (independente)
```bash
cd landing-pages/livro
firebase deploy
```

## Automation (Python)

O CLI `scoter` para automação do LinkedIn vive em `linkedin/automation/` como projeto Python separado:

```bash
cd linkedin/automation
uv sync
scoter --help
```
