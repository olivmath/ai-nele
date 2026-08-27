---
status: rascunho
data: 2026-08-27
tema: Security / Hack / Poly Network / Solidity
fonte: Solbook
---

💰 US$ 611 milhões roubados. E depois devolvidos.

Em agosto de 2021, o Poly Network sofreu o maior hack de DeFi até então.

O atacante explorou a função _executeCrossChainTx, que permitia chamadas arbitrárias entre chains.

Ele crafou uma mensagem cross-chain que chamava uma função interna do contrato de controle de acesso. Com isso, trocou a lista de keepers (validadores) por endereços que ele controlava.

Com os keepers sob seu controle, autorizou transferências em Ethereum, BSC e Polygon.

US$ 611 milhões drenados em três chains.

Mas o plot twist: o atacante devolveu tudo. Disse que fez "por diversão" e para "expor a vulnerabilidade antes que outros a encontrassem".

A Poly Network ofereceu US$ 500K de bounty e um cargo de Chief Security Advisor.

A lição: validação de chamadas cross-chain precisa ser restrita. Nunca permita execução arbitrária de código vindo de outra chain.

Carrossel com o código e as transações nas três blockchains.

#blockchain #web3 #solidity #security #ethereum #smartcontracts #crosschain
