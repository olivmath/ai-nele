# Scoter — Skills Reference

## Skills Overview

| Skill | Tipo | Descrição |
|---|---|---|
| `brand-context` | Foundation | Captura e armazena contexto core da marca (identidade, audiência, posicionamento, valores, voz). Base para todas as outras skills. |
| `brand-strategy` | Strategy | Workflow completo de brand strategy — questionário estruturado → relatório estratégico. |
| `brand-positioning` | Strategy | Define posicionamento competitivo — diferenciação, território de marca, mapa de posicionamento. |
| `brand-identity` | Creative | Brief de identidade visual — direção de logo, paleta, tipografia, estilo de imagem, design system. |
| `brand-voice` | Creative | Identidade verbal — tom, vocabulário, estilo de escrita, regras de comunicação. |
| `target-audience` | Research | Personas profundas, psicografia e ICP (Ideal Customer Profile). |
| `offer` | Conversion | Constrói ou audita ofertas usando framework $100M Offers (value equation, bônus, garantia, escassez). |
| `content-creation` | Content | Drafts de conteúdo multi-canal — blog, social media, email, press release, case study. |
| `landing-page-copy` | Content | Copy de landing page — hero, proposta de valor, prova social, objeções, CTAs. |
| `landing-page-design` | Design | Sistema visual para landing pages — tipografia, spacing tokens, radius, backgrounds, motion. |
| `landing-page-generator` | Generator | Gera landing pages completas — estrutura, frameworks de copy (PAS/AIDA/BAB), SEO, Core Web Vitals. |
| `cro-methodology` | Optimization | Auditoria de conversão e design de A/B tests — funil, persuasão, objeções. |
| `lp-orchestrator` | Orchestrator | Coordena pipeline de LP: Briefing → Oferta → Copy → Estrutura → Design → Frontend → CRO. |
| `product-marketing-orchestrator-v2` | Orchestrator | Pipeline completo: Brand Foundation → Audience → Positioning → Strategy → Identity/Voice → Oferta → LP → CRO. |

## Dependency Flow

```
brand-context (foundation)
├── brand-strategy
├── brand-positioning
├── brand-identity
├── brand-voice
├── target-audience
└── offer
     └── landing-page-copy
          └── landing-page-design
               └── landing-page-generator
                    └── cro-methodology

Orchestrators:
  lp-orchestrator ─────────────── LP pipeline (Oferta → CRO)
  product-marketing-orchestrator ─ Full pipeline (Brand → CRO)
```
