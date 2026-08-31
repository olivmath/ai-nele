# Scoter — Agent Reference

## Projeto

Toolkit unificado de conteúdo LinkedIn: carousel de security incidents, landing page do livro Solidity, posts.

## Arquitetura

```
                    ┌─────────────────────────────────┐
                    │         Vite Dev Server          │
                    │         localhost:5173           │
                    └──────┬──────────┬───────────────┘
                           │          │
              React Router │          │ Symlink (public/)
                           │          │
              ┌────────────▼──┐  ┌────▼──────────────────┐
              │  App React    │  │  Landing Page (HTML)   │
              │  /            │  │  /landing-pages/livro/ │
              │  /carousel    │  │  deploy separado       │
              └───────────────┘  └────────────────────────┘
```

## Convenções

- **Componentes compartilhados** → `src/components/`
- **Componentes de página** → `src/pages/<feature>/`
- **Dados JSON** → `src/data/`
- **Posts Markdown** → `content/posts/`
- **Landing pages** → `landing-pages/<nome>/` (deploy independente, servidas como estático no dev)

## Aliases (vite.config.js)

| Alias | Resolve para |
|---|---|
| `lucide-react` | `src/components/dao-adapters.jsx` |
| `@/components/ui/*` | `src/components/dao-adapters.jsx` |
| `@smartcontract-dao-slides` | `src/pages/carousel/SmartcontractDaoSlides.tsx` |
| `@book-cover` | `landing-pages/livro/assets/social-proofs/book-cover.png` |
| `@book-mockup` | `landing-pages/livro/assets/book-cover-mockup.png` |

## Componentes do Carousel

| Arquivo | Responsabilidade |
|---|---|
| `CarouselApp.jsx` | Shell com sidebar (11 incidents) + roteamento interno |
| `IncidentDeck.jsx` | 5 slides por incident (impacto, contexto, ataque, correção, aprendizados) |
| `CarouselViewer.jsx` | Viewer antigo (slides HTML raw com navegação) |
| `SmartcontractDaoSlides.tsx` | Slides especiais do The DAO (first item na sidebar) |
| `SolidityCodeBlock.jsx` | Diff viewer split (vulnerável vs corrigido) |
| `BookCta.jsx` | Card CTA do livro (usado no slide 5) |
| `incident-data.js` | Overrides, proteções e exemplos de diff por incident |

## Data

- `src/data/carousel/*.json` — dados base dos 11 incidents (slides HTML)
- `src/data/carousel/content/*.json` — conteúdo estruturado (slide1-4 com campos tipados)
- `src/data/web3_trends.json` — tendências Web3 para ideação de posts
- `src/data/profiles_data.json` — dados de perfis LinkedIn

## Landing Page (livro)

HTML estático standalone em `landing-pages/livro/`:
- Tailwind (play CDN) + GSAP (ScrollTrigger)
- Assets locais em `assets/` (imagens, social proofs)
- Tracking: Vercel Analytics custom events (scroll depth, CTA clicks, FAQ opens, VSL play)
- Deploy: Firebase Hosting (`firebase deploy`) ou Vercel

## Projetos separados (não fazem parte do build)

| Diretório | Stack | Propósito |
|---|---|---|
| `linkedin/automation/` | Python (uv) | CLI scoter — automação LinkedIn, MCP server |
| `video/` | HyperFrames | Composições de vídeo para LinkedIn |

## Skills disponíveis

As skills de marketing (brand, copy, LP, CRO) estão em `.agents/` e `.claude/skills/`. Use via `/skill-name` no Claude Code.
