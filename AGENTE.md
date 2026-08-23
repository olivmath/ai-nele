# Scoter — Instruções para Agentes

## O que é
Toolkit de automação LinkedIn com abordagem **híbrida**:
- **API oficial** (OAuth 2.0) → posts na conta principal
- **API unofficial** (cookie `li_at`) → buscas, interações na conta secundária

## Contas

| Conta | Email | Uso | Auth |
|---|---|---|---|
| Principal | `olivmath@protonmail.com` | Posts via API oficial | OAuth 2.0 (`token.json`) |
| Secundária | `olivmath97@gmail.com` | Buscas, likes, comments, connections | Cookie `li_at` + `JSESSIONID` no `.env` |

## Estrutura

```
scoter/
├── config.py                    # Carrega credenciais do .env
├── cli.py                       # CLI (click) — entry point
├── official/
│   ├── auth.py                  # OAuth 2.0 flow (login, token exchange)
│   └── poster.py                # Criar posts (texto) via API oficial
└── unofficial/
    ├── connection.py             # Conexão via cookie (RequestsCookieJar)
    ├── searcher.py               # Buscar pessoas/empresas
    └── interactor.py             # Like, comment, connect, message, feed
```

## Comandos CLI

```bash
scoter login                          # OAuth login (abre browser)
scoter post "texto do post"           # Postar na conta principal
scoter search "keywords" -n 10        # Buscar pessoas
scoter like <post_urn>                # Curtir post
scoter comment <post_urn> "texto"     # Comentar em post
scoter feed -n 5                      # Ver feed recente
```

## Setup

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -e ".[dev]"
cp .env.example .env
# Preencher .env com credenciais
```

## Credenciais (.env)

```
LINKEDIN_CLIENT_ID=              # Developer Portal → App → Auth
LINKEDIN_CLIENT_SECRET=          # Developer Portal → App → Auth
LINKEDIN_REDIRECT_URI=http://localhost:8080/callback
LINKEDIN_ACCESS_TOKEN=           # Preenchido automaticamente após `scoter login`

LINKEDIN_SECONDARY_COOKIE=      # Cookie li_at da conta secundária
LINKEDIN_SECONDARY_JSESSIONID=  # Cookie JSESSIONID da conta secundária
```

## Regras para agentes

- **NUNCA commitar `.env` ou `token.json`** — contêm credenciais reais
- **Cookie `li_at` expira** — se der erro de auth, pedir novo cookie ao usuário
- **API unofficial viola ToS do LinkedIn** — usar apenas com conta secundária, nunca com a principal
- **Rate limiting** — respeitar intervalos entre requests unofficial (mínimo 2s entre chamadas)
- **Posts vão para a conta real** — sempre confirmar com o usuário antes de postar
- Ao adicionar novos módulos, manter a separação `official/` vs `unofficial/`
- Testes ficam em `tests/` — rodar com `pytest`
- Lint com `ruff check` e type check com `mypy scoter/`
