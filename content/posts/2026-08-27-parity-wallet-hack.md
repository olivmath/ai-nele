---
status: rascunho
data: 2026-08-27
tema: Security / Hack / Parity Wallet / Solidity
fonte: Solbook
---

🔒 US$ 280 milhões congelados para sempre. Ninguém roubou. Ninguém hackeou. Alguém só chamou uma função.

Em novembro de 2017, um usuário encontrou a library que alimentava ~587 multi-sig wallets da Parity.

Essa library era um contrato deployado, mas sem proteção de inicialização.

Ele chamou initWallet() e se tornou o owner.

Depois chamou kill().

selfdestruct destruiu a library. Todas as wallets que dependiam dela pararam de funcionar instantaneamente.

US$ 280 milhões em ETH ficaram presos em contratos sem código.

Nenhum exploit sofisticado. Nenhum flash loan. Apenas uma função pública que nunca deveria ter sido chamada.

A lição: se um contrato é uma library compartilhada, ele precisa de proteção contra inicialização externa. E selfdestruct em production é uma arma carregada.

Veja no carrossel o código exato e a transação que congelou centenas de milhões.

#blockchain #web3 #solidity #security #ethereum #smartcontracts
