---
status: rascunho
data: 2026-08-27
tema: Security / Hack / The DAO / Solidity
fonte: Solbook
---

💰 US$ 60 milhões drenados em loop. Literalmente.

Em 2016, o The DAO era o maior crowdfunding da história: US$ 150 milhões arrecadados em 28 dias.

Até que alguém descobriu que a função splitDAO fazia uma chamada externa antes de zerar o saldo do usuário.

O atacante criou um contrato que reentrava pelo fallback e repetia o saque. Cada chamada drenava mais ETH antes que o saldo fosse atualizado.

3,6 milhões de ETH desapareceram.

O resultado? O Ethereum se dividiu em dois: ETH e Ethereum Classic.

Um hard fork para reverter um bug.

A linha que causou tudo:

call.value(balance)();
balances[msg.sender] = 0; // tarde demais

A ordem importa. Sempre.

Esse caso popularizou o padrão Checks-Effects-Interactions e mudou para sempre como escrevemos smart contracts.

Desliza no carrossel para ver o código vulnerável e a transação na blockchain.

#blockchain #web3 #solidity #security #ethereum #smartcontracts
