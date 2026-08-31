---
status: postado
data: 2025-07-05
tema: Hackathon / Arquitetura Fullstack / Blockchain
fonte: ChatGPT-LINKEDIN
---

Como defini a arquitetura de um projeto fullstack blockchain em poucas horas — e ganhei uma passagem com tudo pago para Paris? 🇫🇷

Esse é o segundo post da série #1.

Pra quem perdeu: nosso projeto basicamente era um sistema de apostas esportivas P2P, totalmente descentralizado, construído na rede Chiliz.

Pensamos em 3 peças-chave:
→ Dapp (frontend)
→ Backend
→ Web3 (smart contracts)

E como tudo isso funciona?

1. O backend coleta os posts do Twitter, analisa o sentimento com IA para identificar se é a favor do time A ou B. Salva os dados no banco, calcula o hype total e grava esse valor num oráculo na blockchain: Time A: 65% | Time B: 25%

2. O dapp (frontend) busca no backend a série temporal do hype para montar o dashboard — que serve como indicador de apostas da partida — e também se conecta na blockchain para verificar se o jogo está aberto para apostas.

3. Na Web3 (smart contracts) temos: um oráculo para registrar os dados, um contrato ERC-20 para criar o token $HYPE, e um contrato DeFi responsável pelas apostas: stake, unstake e resgate dos prêmios.

>>> Vá direto para a testnet! <<<

Hoje, meu workflow ideal para desenvolvimento blockchain é:

1. Escrever testes em Solidity (quando há lógica matemática envolvida)
2. Escrever os contratos
3. Fazer deploy direto na testnet
4. Integrar o dapp com a testnet desde o primeiro dia

Além disso, precisei usar um padrão de projeto que criei há um tempo.
No próximo post, vou compartilhá-lo para avaliação dos especialistas aqui.

Ativa as notificações e segue pra mais! 🚀
