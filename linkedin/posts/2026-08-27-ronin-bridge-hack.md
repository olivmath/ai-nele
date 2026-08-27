---
status: rascunho
data: 2026-08-27
tema: Security / Hack / Ronin Bridge / Solidity
fonte: Solbook
---

💰 US$ 625 milhões. O maior hack de crypto da história. E não foi um bug de código.

Em março de 2022, o Ronin Bridge (a ponte do Axie Infinity) foi hackeado pelo grupo Lazarus, da Coreia do Norte.

O bridge usava um esquema de 9 validadores, onde 5 assinaturas bastavam para aprovar uma transação.

O atacante obteve 4 chaves de validador via spear phishing direcionado aos devs da Sky Mavis. A quinta veio de uma permissão temporária que a Axie DAO tinha concedido meses antes e esquecido de revogar.

5 de 9 chaves. Quorum atingido.

O atacante drenou 173.600 ETH e 25,5M USDC em duas transações.

O mais assustador: ninguém percebeu por 6 dias.

O código do smart contract estava correto. O multi-sig funcionava como projetado. O problema foi segurança operacional: gestão de chaves, permissões temporárias não revogadas e threshold muito baixo.

Carrossel com a timeline do ataque e as transações na blockchain.

#blockchain #web3 #solidity #security #ethereum #smartcontracts #bridge
