---
status: rascunho
data: 2026-08-27
tema: Security / Hack / Cream Finance / Solidity
fonte: Solbook
---

💰 US$ 130 milhões drenados em um ataque que usou o próprio protocolo contra si mesmo.

Em outubro de 2021, o Cream Finance sofreu seu terceiro hack.

O atacante usou flash loans para inflar artificialmente o preço de um token colateral interno (crYUSD) e depois usou esse colateral supervalorizado para tomar empréstimos massivos em outros pools.

O ciclo: pegar flash loan, depositar, mintar token colateral, inflar o preço, emprestar contra o colateral inflado, repetir.

Cada iteração aumentava o poder de empréstimo. Quando o atacante sacou, os pools ficaram insolventes.

O bug? O protocolo usava o preço de seus próprios tokens derivativos como colateral sem proteção contra manipulação circular.

Quando o valor do colateral depende do próprio protocolo que aceita esse colateral, você cria um loop de valor que pode ser inflado até o infinito.

Veja no carrossel o mecanismo do ataque e a transação que drenou o protocolo.

#blockchain #web3 #solidity #security #ethereum #smartcontracts #defi
