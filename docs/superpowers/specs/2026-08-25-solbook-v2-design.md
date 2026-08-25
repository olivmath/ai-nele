# Solbook V2 — Design aprovado

## Objetivo

Converter audiência do LinkedIn e YouTube em reservas para os 20 exemplares da pré venda da primeira edição física do Solbook.

## Produto e oferta

| Item | Definição |
| --- | --- |
| Produto | Livro físico Solbook: Solidity de forma segura |
| Formato da primeira edição | Apenas físico |
| Pré venda | 20 exemplares a R$ 300 |
| Lançamento | 10 exemplares a R$ 350 |
| Preço final | 20 exemplares a R$ 400 |
| CTA único | Reservar um dos 20 exemplares por R$ 300 |
| Conversão | Capturar e mail no Kit e redirecionar à página de disponibilidade |

## Público e posicionamento

Desenvolvedores Web2 e iniciantes em Solidity que querem construir smart contracts com um método de segurança desde os fundamentos.

O livro se diferencia por ensinar Solidity em português com segurança como fio condutor, exercícios práticos, bugs intencionais e um projeto completo até o deploy auditado.

## Provas permitidas

- 25 capítulos, 15 contratos, 3 vulnerabilidades exploradas e 1 projeto completo.
- Lucas Oliveira é engenheiro blockchain sênior há mais de 6 anos e educador há mais de 2 anos.
- Atuações citáveis: Visa, caso 5 do DREX e bibliotecas públicas de criptografia.
- Fotos reais de aulas, eventos e palestras fornecidas pelo autor.

Não exibir depoimentos, logos, resultados de alunos, métricas de audiência ou garantias que não tenham sido confirmadas e fornecidas como prova.

## Arquitetura da página

```text
Hero editorial
  → promessa
  → VSL placeholder
  → CTA de reserva
  → fatos do livro

Livro como objeto
  → mockups substituíveis
  → método e diferenciais

Autoridade verificável
  → trajetória
  → galeria de aulas e eventos
  → link de referência pública

Como reservar
  → e mail
  → página de disponibilidade
  → aviso de lançamento

Oferta
  → 20 / R$ 300
  → 10 / R$ 350
  → 20 / R$ 400

FAQ e CTA final
```

## Direção visual

- Editorial técnico, com contraste forte, layout centralizado e leitura ampla.
- VSL como elemento central da primeira dobra.
- Base escura e superfícies neutras; azul elétrico reservado para CTA e sinalizações de Solidity.
- Galeria de fotos em faixa horizontal, com slots explícitos até os arquivos reais serem adicionados.
- Sem estética ou copy derivada das referências externas; delas, aproveitar apenas a ordem visual: vídeo, CTA, prova e galeria.
- Mobile primeiro, HTML semântico, foco visível, formulário preparado para o embed do Kit.

## VSL

O player terá estado de placeholder até a gravação. O roteiro previsto tem 75 a 90 segundos:

1. Abrir com o custo de aprender Solidity sem segurança.
2. Apresentar o método do livro: fundamentos, prática, bugs e auditoria.
3. Estabelecer a autoridade do autor.
4. Detalhar a primeira edição física e a limitação real de 20 exemplares.
5. Encerrar com o CTA de reserva por e mail.

## Critérios de aceite

- A primeira dobra comunica produto, público, benefício, VSL e CTA em até cinco segundos.
- Todo CTA leva ao mesmo formulário de reserva.
- Não há promessa de formato digital.
- A página contém slots claros para mockups, VSL e fotos reais.
- A escada de preços mostra as quantidades corretas.
- O formulário valida e mail e apresenta um ponto único para inserir o embed do Kit.
