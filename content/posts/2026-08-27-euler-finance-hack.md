---
status: rascunho
data: 2026-08-27
tema: Security / Hack / Euler Finance / Solidity
fonte: Solbook
---

💰 US$ 197 milhões perdidos. Após 10 auditorias.

Em março de 2023, o Euler Finance — um dos protocolos de lending mais auditados do DeFi — foi hackeado.

O atacante usou flash loans para criar uma posição alavancada e depois chamou donateToReserves(), uma função que transferia colateral para as reservas do protocolo.

O problema: donateToReserves() não verificava a solvência do chamador após a execução.

O atacante ficou artificialmente insolvente. Depois se auto-liquidou com desconto, extraindo mais valor do que tinha depositado.

Dez auditorias de segurança. Nenhuma detectou que donateToReserves precisava de um checkLiquidity(msg.sender) no final.

O plot twist: o atacante devolveu os fundos após negociação. Mas a lição ficou.

Toda função que altera colateral ou dívida precisa terminar verificando a solvência do usuário. Sem exceção.

Carrossel com o código vulnerável e a transação do ataque.

#blockchain #web3 #solidity #security #ethereum #smartcontracts #defi
