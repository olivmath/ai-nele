---
status: rascunho
data: 2026-08-27
tema: Security / Hack / Nomad Bridge / Solidity
fonte: Solbook
---

💰 US$ 190 milhões drenados. Não por um hacker. Por centenas de pessoas copiando e colando.

Em agosto de 2022, o Nomad Bridge recebeu um upgrade de rotina.

Uma mudança no contrato inicializou o trusted root hash como 0x00. Isso significa que qualquer mensagem passava na verificação de prova.

O primeiro atacante percebeu e drenou uma parte. Mas como a transação era pública na mempool, qualquer pessoa podia copiar o calldata, trocar o endereço de destino e repetir o ataque.

E foi exatamente isso que aconteceu.

Centenas de endereços drenaram o bridge. Bots, oportunistas e até usuários comuns participaram do "freeforall".

O bug: uma inicialização incorreta. O valor 0x00 era um hash válido no sistema de verificação, e qualquer prova fabricada passava.

Uma atualização de rotina. Uma variável zerada. US$ 190 milhões perdidos.

Veja no carrossel como uma linha de inicialização destruiu um protocolo inteiro.

#blockchain #web3 #solidity #security #ethereum #smartcontracts #bridge
