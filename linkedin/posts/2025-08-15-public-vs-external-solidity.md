---
status: postado
data: 2025-08-15
tema: Solidity / Gas Optimization / Fuzz Testing
fonte: ChatGPT-LINKEDIN
---

35% de álcool na gasolina? Bora otimizar o consumo de gás no Solidity!

Public ou External: qual consome menos gás?
O GPT me garantiu que era external. Resolvi testar.

Comecei com casos simples, depois aumentei a complexidade usando Fuzz Testing para explorar muito mais cenários.

⏱ Pesquisa: ~1h
🎨 Post + imagens: ~2h

Metodologia

Sem Fuzz Testing
- Funções alterando dados no storage com public e external.
- Tipos testados: uint256, string, uint8[].
- Cada função chamada 256 vezes com valores fixos.

Com Fuzz Testing
- Valores fixos substituídos por entradas dinâmicas geradas aleatoriamente.
- vm.assume para garantir arrays com pelo menos 1 elemento.
- Cada função chamada 512 vezes.

Resultados

Sem Fuzz Testing
- public foi ligeiramente mais eficiente em todos os casos.

Arrays
- Manipular arrays custa MUITO mais gás do que strings ou inteiros.

Com Fuzz Testing
- external se saiu melhor com arrays grandes.
- Para tipos simples (uint256), o consumo se manteve estável.

Discussão
- Valores fixos mascaram comportamentos que só aparecem com entradas variadas.
- Fuzz Testing expôs casos onde a diferença entre public e external aumentou.

Conclusão
1. Na maioria dos casos: use public.
2. Sempre que possível: use Fuzz Testing.

Quer ver o código e rodar os testes? Link do repo tá nos comentários.
