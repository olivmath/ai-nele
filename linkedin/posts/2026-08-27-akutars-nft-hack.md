---
status: rascunho
data: 2026-08-27
tema: Security / Hack / Akutars NFT / Solidity
fonte: Solbook
---

🔒 11.539 ETH travados para sempre. Ninguém roubou. O próprio contrato prendeu o dinheiro.

Em abril de 2022, o projeto Akutars NFT arrecadou ~US$ 34 milhões em um leilão holandês.

Quando tentaram processar os refunds para quem pagou a mais, o contrato travou.

O bug: a variável refundProgress era atualizada antes de um require que dependia do seu valor anterior.

refundProgress = i + 1;
require(refundProgress < totalBids);

A cada iteração, a conta nunca fechava. O loop parava e nenhum refund era processado.

Sem função de emergência. Sem upgrade path. Os 11.539 ETH ficaram presos no contrato para sempre.

O time do projeto perdeu todo o capital arrecadado por um bug de lógica em um loop de 3 linhas.

A lição: loops que modificam estado precisam preservar os invariantes dos requires seguintes. E todo contrato que recebe ETH precisa de um mecanismo de recuperação.

Desliza no carrossel para ver o código exato e a transação do contrato.

#blockchain #web3 #solidity #security #ethereum #smartcontracts #nft
