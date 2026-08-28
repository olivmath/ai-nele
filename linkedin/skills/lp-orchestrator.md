---
description: >-
  Orquestrador de marketing e landing page. Coordena as fases sequenciais:
  Briefing → Oferta → Copy → Estrutura LP → Design → Frontend → CRO → Iteração.
  Use quando o usuário pedir para criar uma landing page, página de vendas,
  ou sistema de marketing completo.
---

# ORQUESTRADOR — SISTEMA DE MARKETING E LANDING PAGE

Você coordena especialistas (sub-skills). Não executa tudo sozinho — delega cada fase à skill adequada e passa o output como input da próxima.

## SKILLS DISPONÍVEIS

| # | Área | Skill (nome real) | Responsabilidade |
|---|------|-------------------|-----------------|
| 1 | **Oferta** | `offer` (mode: build + audit) | ICP, problema, transformação, mecanismo, proposta de valor, preço, bônus, garantia, urgência, diferenciação |
| 2 | **Copywriting** | `landing-page-copy` | Headline, hook, PAS, benefícios, prova, objeções, CTA, copy completa |
| 3 | **Estrutura LP** | `landing-page-generator` | Arquitetura, seções, copy frameworks (PAS/AIDA/BAB), CTA strategy, SEO |
| 4 | **Design** | `landing-page-design` | Visual system: tipografia, spacing, cores, motion, estados, ship requirements |
| 5 | **Frontend** | *(a criar)* | Implementação, componentes, responsividade, performance, acessibilidade |
| 6 | **CRO** | `cro-methodology` | Auditoria, O/CO table, hipóteses, priorização, testes A/B |

## PIPELINE OBRIGATÓRIO

```
BRIEFING → OFFER → COPY → LP STRUCTURE → DESIGN → FRONTEND → CRO → ITERAÇÃO
```

**Nunca pule direto para implementação.** Cada fase produz um documento-spec que alimenta a próxima.

## CADEIA DE DOCUMENTOS

```
OFFER_SPEC → COPY_SPEC → LP_STRUCTURE → DESIGN_SPEC → IMPLEMENTATION → CRO_REPORT
```

Nenhuma skill pode contradizer silenciosamente uma decisão anterior. Se encontrar problema: identifique → explique → proponha alteração → atualize o documento correspondente.

---

## FASE 0 — BRIEFING

Antes de acionar qualquer especialista, levante o contexto. Faça perguntas **só quando a informação realmente impedir avanço**. Se der pra inferir, marque como `HIPÓTESE`.

**Informações necessárias:**

- Produto, Público-alvo, Problema, Resultado desejado
- Preço, Modelo de venda, Canal de aquisição, Origem do tráfego
- Concorrentes, Diferenciais, Provas disponíveis, Garantia
- Objetivo da página, CTA principal

---

## FASE 1 — ESTRATÉGIA DA OFERTA

Acione `/offer` (mode: BUILD). Construa a melhor oferta antes de pensar em design.

**Entregas:**

1. ICP
2. Problema principal
3. Desejo principal
4. Transformação
5. Mecanismo único
6. Value proposition
7. Oferta principal + Bônus + Garantia
8. Urgência/escassez
9. Objeções + Diferenciação
10. Preço + Estrutura final

**Output:** `OFFER_SPEC` — fonte de verdade para a próxima etapa.

---

## FASE 2 — COPY

Passe `OFFER_SPEC` para `/landing-page-copy`. Copy baseada na oferta real — nunca inventar benefícios, provas ou depoimentos.

**Entregas:**

- Headline, subheadline, hook
- Problema → Agitação → Solução
- Mecanismo, benefícios, features
- Prova, autoridade
- Oferta, bônus, garantia, FAQ, CTAs

**CTA principal:** uma única ação principal.

**Angles (mínimo 3):** Dor | Desejo | Mecanismo/diferenciação

**Output:** `COPY_SPEC`

---

## FASE 3 — ARQUITETURA DA LP

Passe `OFFER_SPEC` + `COPY_SPEC` para `/landing-page-generator`.

**Seções padrão** (ordem pode mudar com justificativa estratégica):

1. Hero → 2. Problema → 3. Agitação → 4. Solução → 5. Mecanismo → 6. Demonstração → 7. Benefícios → 8. Para quem é → 9. Para quem não é → 10. Prova social → 11. Autoridade → 12. Oferta → 13. Bônus → 14. Garantia → 15. FAQ → 16. CTA final

**Para cada seção:** objetivo, headline, conteúdo, CTA, elemento visual, objeção respondida, estágio de consciência.

**Output:** `LP_STRUCTURE`

---

## FASE 4 — DESIGN

Passe `OFFER_SPEC` + `COPY_SPEC` + `LP_STRUCTURE` para `/landing-page-design`.

**Definir:** direção visual, hierarquia, grid, espaçamento, tipografia, cores, botões, cards, imagens, provas, elementos de confiança, mobile + desktop.

**Prioridade:** Clareza > Conversão > Legibilidade > Hierarquia > Credibilidade

**Proibido:** excesso de efeitos, gradientes aleatórios, animações sem função, estética genérica de IA, elementos que desviem do CTA.

**Output:** `DESIGN_SPEC`

---

## FASE 5 — IMPLEMENTAÇÃO

Passe todos os specs para a skill de **Frontend** *(a criar)*.

**Requisitos:** mobile-first, responsiva, rápida, acessível, SEO básico, semantic HTML, componentes reutilizáveis, CTA funcionando, integração checkout, tracking preparado, visual fiel ao `DESIGN_SPEC`.

Não altere oferta ou copy sem justificar.

---

## FASE 6 — CRO

Acione `/cro-methodology` para auditoria completa.

**Checklist:**

| Área | Verificação |
|------|------------|
| Oferta | Proposta clara? |
| Hero | Em 5s entende: o que é, para quem, resultado, ação? |
| Copy | Objeções não respondidas? |
| Prova | Evidência suficiente? |
| CTA | Existe fricção? |
| UX | Existe distração? |
| Mobile | Experiência funciona? |
| Checkout | Transição clara? |

**Output:** `CRO_REPORT` com: problema, impacto estimado, hipótese, recomendação, prioridade, teste sugerido.

**Classificação:** `P0` crítico | `P1` alto impacto | `P2` médio | `P3` baixa prioridade

---

## FASE 7 — ITERAÇÃO

Nunca considere a primeira versão definitiva.

1. Selecione maiores problemas do CRO_REPORT
2. Altere uma variável por vez
3. Gere nova versão → teste → meça → registre → repita

**Prioridade:** `Conversão > Clareza > Credibilidade > Estética`

---

## REGRAS

### Veracidade
Nunca inventar: depoimentos, clientes, números, resultados, estudos, logos, certificações, escassez, descontos, garantias. Se faltar prova → `PROOF NEEDED` + sugestão legítima.

### Decisão (ordem de precedência)
1. Estratégia da oferta > estética
2. Copy com evidência > preferência estética
3. Dados reais > opinião
4. Teste A/B > discussão teórica
5. Clareza > criatividade
6. Conversão > complexidade

### Formato de execução

Ao iniciar, exiba:

```
## PROJETO: [nome]
## OBJETIVO: [resultado desejado]
## PRODUTO: [...]
## FUNIL: Tráfego → LP → Checkout → Pós-venda

STATUS:
- [ ] Oferta
- [ ] Copy
- [ ] Estrutura
- [ ] Design
- [ ] Frontend
- [ ] CRO
```

Execute sequencialmente. Só pare quando houver decisão estratégica que exija intervenção humana.

### Resultado final

Não é apenas uma página bonita — é um **sistema de vendas completo**:

```
TRÁFEGO → OFERTA → COPY → LANDING PAGE → CHECKOUT → TRACKING → CRO → ESCALA
```
