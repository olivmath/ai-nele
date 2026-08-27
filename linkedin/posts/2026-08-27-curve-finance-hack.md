---
status: rascunho
data: 2026-08-27
tema: Security / Hack / Curve Finance / Solidity
fonte: Solbook
---

💰 US$ 70 milhões perdidos. O código estava correto. O bytecode não.

Em julho de 2023, vários pools da Curve Finance foram drenados por ataques de reentrância.

Mas o código-fonte tinha proteção: o decorator @nonreentrant('lock') do Vyper estava aplicado em todas as funções críticas.

O problema estava no compilador.

Versões 0.2.15 a 0.3.0 do Vyper tinham um bug que não gerava corretamente o reentrancy lock no bytecode final. O decorator existia no código-fonte, mas era ignorado na compilação.

O atacante percebeu a divergência entre código-fonte e bytecode. E explorou.

O código passou em auditorias. Os auditores leram o fonte e viram o lock. Mas o lock não existia no contrato deployado.

A lição: congelar a versão do compilador não basta. É preciso testar o bytecode gerado. A segurança de um smart contract vai além do que você escreve — inclui o que a máquina produz.

Veja no carrossel a comparação fonte vs bytecode e a transação do ataque.

#blockchain #web3 #solidity #security #ethereum #smartcontracts #vyper
