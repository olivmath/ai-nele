---
status: postado
data: 2026-07-14
tema: Security / Hack / BeautyChain / Solidity
fonte: ChatGPT-LINKEDIN
---

💰 US$ 2,3 bilhões evaporaram em uma noite por causa de uma multiplicação.

Você confiaria em um sistema financeiro onde uma conta matemática pode criar dinheiro infinito?

Pois é...

Em 2018 isso aconteceu na blockchain Ethereum.

O nome do projeto era BeautyChain (BEC).

Um token ERC20 que chegou a ter um market cap de aproximadamente US$ 2,3 bilhões.

Até que alguém encontrou uma linha de código problemática.

E essa linha destruiu o projeto.

O problema: Integer Overflow

O contrato tinha uma função chamada batchTransfer.

A ideia era boa: enviar tokens para várias pessoas em uma única transação e economizar gas.

Então o contrato fazia:
uint256 amount = receivers.length * value;

Depois verificava:
require(balance >= amount);

Parece correto.

Mas o atacante percebeu que poderia fazer:
value = 2²⁵⁵
receivers.length = 2

Então: 2²⁵⁵ * 2 = 2²⁵⁶
Só que uint256 não consegue armazenar esse valor.

O resultado? 0.

Qualquer saldo passava.
O contrato estava permitindo criar tokens do nada.

🚨 A oferta do token explodiu.
🚨 O preço praticamente foi para zero.

Esse ataque ajudou a popularizar o SafeMath.
A partir do Solidity 0.8, a proteção contra overflow é automática.

A maior lição:

Smart Contract não é apenas código.
É código que controla dinheiro.

Um erro que em uma aplicação tradicional causaria um bug...
Em blockchain pode criar uma falha econômica irreversível.

Por isso segurança não é uma etapa final.
Ela começa no primeiro uint256.

E você? Já estudou os maiores hacks da história dos Smart Contracts?

#blockchain #web3 #solidity #security #ethereum #smartcontracts
