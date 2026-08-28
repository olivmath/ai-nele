# Smartcontract Engineer — Handoff de reconstrução

## Missão

Reconstrua uma landing page de pré-venda para o livro físico **Smartcontract Engineer**, em português do Brasil. A identidade visual pode mudar por completo, mas **a ordem, os componentes, o conteúdo e os comportamentos abaixo devem permanecer**.

Fonte de verdade para a copy completa: [`assets/book-briefing.md`](./assets/book-briefing.md). Implementação atual de referência: [`livro.html`](./livro.html).

## Estrutura obrigatória

| Ordem | Seção | Conteúdo e ação obrigatórios |
| --- | --- | --- |
| 1 | Navegação | Nome do livro + CTA que rola até a oferta. |
| 2 | Hero | Headline: “Aprenda Solidity do jeito certo. E não seja hackeado!”. Subheadline sobre projetos seguros, casos reais de hacking e protagonismo. Espaço para vídeo de apresentação. |
| 3 | Mockups | “Por dentro do livro”, logo após o hero. Três imagens: capa, miolo/páginas e detalhe físico. Cada uma precisa de legenda e `alt` descritivo. |
| 4 | Problema | Título: “O material que existe hoje não te ensina a realidade”. Carrossel com os cinco casos históricos de hack existentes no HTML de referência. |
| 5 | Autoridade | Perfil de Lucas Oliveira, empresas, sete hackathons vencidos e métricas educacionais. Usar os dados e assets existentes. |
| 6 | Comparativo | Alternativas do mercado versus Smartcontract Engineer, incluindo faixas de preço, benefícios e limitações. |
| 7 | Método | Três etapas: teoria, prática e “hackeie, depois proteja”. |
| 8 | Conteúdo | 25 capítulos em três fases expansíveis: I (0–16), II (17–18) e III (19–24). |
| 9 | Oferta | Livro físico capa dura, 25 capítulos, 15 contratos, projeto auditável, tooling, comunidade/lives; preço R$ 300; pré-venda de 10 vagas; prazo de 12 de outubro; formulário de e-mail. |
| 10 | Prova social | Espaços para três fotos de palestras/aulas e dois depoimentos. Manter como placeholders até receber material real. |
| 11 | FAQ | As seis perguntas e respostas já presentes no HTML de referência. |
| 12 | Fechamento | CTA sticky durante a navegação e rodapé com Smartcontract Engineer 2026 + LinkedIn de Lucas Oliveira. |

## Dados do produto

```text
Formato: livro físico, capa dura, edição limitada
Idioma: português (pt-BR)
Conteúdo: 25 capítulos, 15 contratos progressivos, 3 bugs exploráveis,
1 projeto completo auditável
Stack: Solidity 0.8.20, Foundry, Solady, PRB Math, Slither, Wagmi, RainbowKit
Público: devs Web2 migrando para Web3, estudantes e iniciantes em Solidity
Promessa: segurança como fio condutor, não como capítulo isolado
```

## Comportamentos obrigatórios

- CTA da navegação e CTA sticky rolam suavemente para a oferta.
- Carrossel de hacks possui anterior, próximo, indicadores clicáveis e avanço automático a cada 6 segundos.
- Fases dos capítulos usam disclosure nativo (`details`/`summary`) ou botões com ARIA equivalente.
- FAQ abre e fecha individualmente, atualizando `aria-expanded` quando usar botões.
- Formulário exige e-mail; após envio, esconde o formulário e exibe confirmação. Persistir o estado localmente é opcional.
- Revelações por scroll e microinterações são permitidas, mas respeitam `prefers-reduced-motion`.
- O player de vídeo só deve aparecer como interativo quando houver uma URL/embed real.

## Acessibilidade e estrutura

- Documento HTML completo, `lang="pt-BR"`, um único `h1` e hierarquia de títulos coerente.
- Todo botão declara `type`.
- Todo elemento clicável funciona por teclado e tem nome acessível.
- Imagens informativas têm `alt`; ícones decorativos são ocultos de leitores de tela.
- A página funciona em desktop e mobile sem depender de hover.

## Assets disponíveis

| Arquivo | Uso |
| --- | --- |
| `assets/lucas.png` | Foto do autor |
| `assets/visa.png`, `assets/tecban.png`, `assets/stellar.png`, `assets/opensense.jpg` | Logos/credenciais do autor |
| `assets/book-briefing.md` | Copy, estrutura e dados detalhados do produto |
| `assets/intrevista.md` | Material de apoio sobre o autor |

## Materiais pendentes

| Material | Destino |
| --- | --- |
| 3 mockups do livro | Seção “Por dentro do livro” |
| Vídeo de apresentação + URL/embed | Hero |
| Fotos de palestras/aulas | Prova social |
| Depoimentos reais | Prova social |

## Validação mínima

```bash
node landing-pages/livro/test/static-validation.mjs
```

O validador cobre estrutura do documento, galeria, títulos, botões e acessibilidade básica. Atualize-o se a reconstrução alterar a arquitetura sem reduzir essas garantias.
