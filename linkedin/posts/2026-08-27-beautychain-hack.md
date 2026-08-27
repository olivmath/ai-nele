---
status: rascunho
data: 2026-08-27
tema: Security / Hack / BeautyChain / Solidity
fonte: Solbook
---

💰 US$ 900 milhões de market cap evaporaram por causa de uma multiplicação.

Em abril de 2018, o BeautyChain (BEC) era um token ERC20 com quase US$ 1 bilhão de capitalização.

Até que alguém encontrou uma linha na função batchTransfer:

uint256 amount = receivers.length * value;

O atacante usou value = 2²⁵⁵ e receivers.length = 2.

2²⁵⁵ × 2 = 2²⁵⁶. Mas uint256 só suporta até 2²⁵⁶ - 1.

O resultado? Overflow. amount = 0.

O require(balance >= amount) passou. O contrato distribuiu tokens do nada.

A oferta explodiu. O preço foi a zero.

Esse ataque popularizou o SafeMath e acelerou a proteção automática contra overflow que veio no Solidity 0.8.

Uma multiplicação sem proteção destruiu um projeto inteiro.

Desliza no carrossel para ver a linha exata do código e a transação do ataque.

#blockchain #web3 #solidity #security #ethereum #smartcontracts
