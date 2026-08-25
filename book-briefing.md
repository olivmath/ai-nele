# Solbook: Landing Page Content

## Identidade


| Campo         | Valor                                            |
| ------------- | ------------------------------------------------ |
| **Titulo**    | Solbook: Solidity de forma segura                |
| **Subtitulo** | A solidity-safe approach                         |
| **Autor**     | Lucas Oliveira                                   |
| **Idioma**    | Portugues (pt-BR)                                |
| **Ano**       | 2026                                             |
| **Formatos**  | PDF (tema escuro + claro), EPUB, audiobook (TTS) |


## Proposta de Valor (headline)

O primeiro livro em portugues que ensina Solidity com seguranca como principio, nao como capitulo avulso. Do zero ao deploy auditado, com projeto pratico completo.

## Publico-Alvo

- Desenvolvedores que querem entrar em Web3/blockchain
- Programadores Web2 migrando para smart contracts
- Estudantes de computacao interessados em Ethereum
- Devs Solidity iniciantes que querem consolidar fundamentos com foco em seguranca

## Numeros do Livro


| Metrica                     | Valor                                                 |
| --------------------------- | ----------------------------------------------------- |
| Capitulos                   | 25 (0-24)                                             |
| Apendices                   | 5 (A-E)                                               |
| Projeto pratico             | 1 full-stack (Token ERC20 + VendorMachine)            |
| Vulnerabilidades exploradas | 3 (reentrancia, controle de acesso x2)                |
| Contratos para praticar     | 15 (Flipper ao Auction House)                         |
| Ferramentas cobertas        | Foundry, Solady, PRB Math, Slither, Wagmi, RainbowKit |


## Jornada do Leitor (4 fases)

### Fase 1: Fundamentos (Cap 0-2)

O que e blockchain, como funciona por dentro, Ethereum vs sistemas tradicionais, setup do ambiente.

### Fase 2: Dominio da Linguagem (Cap 3-16)

Primeiro contrato, variaveis, tipos, expressoes, controle de fluxo, funcoes, armazenamento, erros, modificadores, eventos, heranca, libraries, ERC20.

### Fase 3: Seguranca e Pratica (Cap 17-18)

15 contratos progressivos para praticar (do Flipper ao Auction House com formato BDD). Capitulo dedicado a vulnerabilidades: reentrancia, controle de acesso, overflow, manipulacao de tempo.

### Fase 4: Projeto Real (Cap 19-24)

Ciclo completo de um protocolo DeFi em miniatura:

1. **Definicao**: regras de negocio, tokenomics com curva de preco matematica, threat model
2. **Desenvolvimento**: Token ERC20 (Solady) + VendorMachine (PRB Math, bonding curve)
3. **Testes**: suite completa com Foundry (Forge)
4. **Auditoria**: Slither + exploracao manual de 3 bugs plantados (atacante e defensor)
5. **Deploy**: forge scripts em testnet (Sepolia + Base Sepolia)
6. **Topicos avancados**: EVM internals, proxies, ZKP, account abstraction, DeFi, oraculos

## Diferenciais

- **Seguranca desde o capitulo 1**: nao e um apendice, e o fio condutor do livro
- **Bugs plantados de proposito**: o leitor ataca e defende o mesmo codigo
- **Projeto pratico ponta a ponta**: da especificacao ao deploy auditado em testnet
- **Audiobook incluso**: cada capitulo tem versao em audio (TTS)
- **Em portugues**: conteudo nativo, nao traducao
- **Tooling moderno**: Foundry (nao Hardhat/Truffle), Solady (nao OZ), PRB Math
- **Analogias Web2→Web3**: cada conceito novo e ancorado em algo que o dev Web2 ja conhece
- **TDD/BDD como metodo**: testes escritos antes do codigo, especificacoes em DADO/QUANDO/ENTAO

## Resumo por Capitulo

### Cap 0 - Fundamentos de Blockchain

Constroi a base conceitual: o problema que blockchain resolve (confianca sem intermediario), linha do tempo da criptografia ate o Ethereum (1970→2015), e o fluxo completo de como dados percorrem a rede. Cobre wallets (derivacao de chaves, SECP256K1, EOA vs Contract Account), transacoes (campos, ciclo de vida, mempool), blocos (header/body, Merkle Tree, prev_hash e imutabilidade), consenso (PoW, PoS, BFT) e smart contracts (deploy como transacao, leitura vs escrita, ABI). Usa tabelas comparativas Web2 vs Web3 em cada conceito.

### Cap 1 - Blockchain vs Sistemas Tradicionais

Compara blockchain com Web2 em cinco dimensoes: banco de dados (CRUD vs append-only, dados em lotes via blocos), autenticacao (servidor de sessao vs criptografia assimetrica, sem "esqueci minha senha"), rede (load balancer centralizado vs replicas distribuidas, Teorema CAP), versionamento (CI/CD com rollback vs deploy permanente e imutavel) e serverless (AWS Lambda centralizada vs execucao descentralizada verificavel). Cada secao tem diagrama comparativo.

### Cap 2 - Ethereum e Smart Contracts

Aprofunda o Ethereum como "computador mundial": Ether (supply, EIP-1559, deflacao), gas (unidades, base fee, priority fee com calculo numerico), tokens (ERC-20, ERC-721), Layer 2 (Optimistic e ZK Rollups). Detalha a arquitetura da EVM com suas seis areas de dados (Stack, Memory, Calldata, Storage, Transient Storage, Code) com custos de gas por operacao. Cobre evolucao do tooling (Truffle→Hardhat→Foundry), ecossistema Foundry (Forge, Anvil, Cast, Chisel) e as 7 fases do SDLC de smart contracts (Dev→Test→Local→Audit→Fix→Testnet→Mainnet). Inclui setup completo do ambiente.

### Cap 3 - Introducao ao Solidity

Primeiro contrato: o Flipper (booleano que alterna estado). Explica cada linha: SPDX, pragma, contract como class, variavel de estado no storage, funcao de escrita (gasta gas) vs funcao view (gratuita). Percorre o ciclo completo: escrever (src/Flipper.sol), compilar (forge build, bytecode, ABI), testar (forge test, setUp, assertEq), deploy local (Anvil + forge create) e interagir (cast call/send). Inclui alerta de seguranca sobre chaves deterministicas do Anvil. Apresenta o Chisel (REPL de Solidity).

### Cap 4 - Variaveis

Tres categorias: estado (storage, 2.100 gas SLOAD, 20.000 gas SSTORE novo), locais (stack/memory, temporarias) e globais (injetadas pela EVM). Modificadores de visibilidade: public (getter automatico), private (acesso so no contrato, mas storage e legivel on-chain), internal (+ contratos derivados). Modificadores de mutabilidade: constant (valor em tempo de compilacao, zero SLOAD) e immutable (valor no construtor, zero SLOAD). Contrato integrador: DonationBox com testes usando makeAddr, vm.deal, vm.prank, vm.expectRevert.

### Cap 5 - Variaveis Globais

Detalhamento de msg (sender, value, data, sig), block (timestamp, number, chainid) e tx (origin). Diferenca critica entre msg.sender (muda a cada salto) e tx.origin (fixo na EOA original). Alerta de seguranca: nunca usar tx.origin para controle de acesso (ataque via contrato isca). Contrato pratico: TimeLock (cofre com trava temporal). Cheatcodes: vm.warp (manipula timestamp), vm.prank (troca msg.sender). Unidades de tempo do Solidity (1 days = 86400).

### Cap 6 - Tipos de Dados I

Seis tipos primitivos: bool (1 bit util, 32 bytes no storage), int/uint (256 bits nativos, protecao overflow desde 0.8, tipos menores para packing), bytes (fixos bytes1-bytes32 para hashes, dinamicos para dados binarios), address (20 bytes, payable para envio de ETH via .call, .transfer/.send sao legados inseguros, zero address como null), string (UTF-8, sem .length direto, comparacao via keccak256, string.concat desde 0.8.12). Tabela de valores padrao. Gas e strings on-chain.

### Cap 7 - Expressoes

Operadores aritmeticos (overflow checked desde 0.8, divisao inteira, exponenciacao), comparacao (sem coercao de tipos, sem ===), logicos (curto-circuito, colocar condicao barata primeiro), bitwise (AND/OR/XOR/NOT/shift, bitmasks para permissoes), atribuicao composta (+=, -=), incremento/decremento (++i vs i++, ~5 gas de diferenca por iteracao). Tabela de precedencia completa (15 niveis). Convencao: usar parenteses para clareza.

### Cap 8 - Controle de Fluxo

Condicionais: if/else exigem bool explicito (sem truthy/falsy), operador ternario. Loops: for (convencao ++i), while. break/continue para otimizar saida cedo. Custo real de loops: cada iteracao consome gas, loops indefinidos podem estourar o limite do bloco (~36M gas). Padrao pull over push: em vez de iterar e enviar, cada destinatario chama claim(). Contrato exemplo: Airdrop (perigoso) vs padrao seguro.

### Cap 9 - Funcoes

Anatomia completa: nome, parametros, visibilidade, mutabilidade, modificadores, virtual/override, returns. Quatro visibilidades: public (interna + externa), external (so externa, le calldata direto, mais eficiente), internal (+ derivados), private (so o contrato). Mutabilidade: view (le estado), pure (nem le nem altera, nao usa immutable), payable (aceita ETH), sem modificador (altera estado, rejeita ETH). Retornos: unico, multiplos (tupla com desestruturacao), nomeados (return implicito). Sobrecarga: mesmo nome, parametros diferentes, resolucao por tipo. Funcoes especiais: receive (msg.data vazio, ETH puro) e fallback (seletor nao encontrado ou sem receive). Fluxo de decisao da EVM em tabela. Apendice: gasleft() e delete.

### Cap 10 - Tipos de Dados II

Quatro tipos compostos: enum (conjunto fixo de estados, internamente uint8, maquinas de estado), array (dinamico com push/pop/length vs fixo, arrays em memory com tamanho imutavel, tabela comparativa de operacoes), struct (campos heterogeneos, construcao posicional vs nomeada, limitacoes: sem comparacao ==, sem recursao direta, getter ignora mapping/array), mapping (chave-valor O(1), nao iteravel, so em storage, aninhavel, tipos de chave permitidos). Padrao mapping + array paralelo para iteracao. Contrato integrador: SimpleAuction com enum + struct + array + mapping.

### Cap 11 - Armazenamento

Packing: slots de 32 bytes, variaveis menores empacotam se declaradas em sequencia (exemplo eficiente vs ineficiente, 2 vs 3 slots). Regras de packing (6 regras). Custos: SLOAD cold 2.100 / warm 100, SSTORE novo 20.000 / atualizar 5.000. forge inspect para verificar layout. Calldata: somente leitura, mais barato, ideal para parametros external. Memory: temporaria, modificavel, custo quadratico em alocacoes grandes, sem push. Storage: permanente, mais caro, referencia (ponteiro direto) vs copia (local descartavel). delete e refund de gas (4.800, cap 20% EIP-3529).

### Cap 12 - Tratamento de Erros

require (valida inputs, reembolsa gas, string opcional), revert (dentro de if, equivalente a require negado), assert (invariantes internas, indica bug, Panic(uint256)), custom errors (desde 0.8.4, mais baratos que strings, ~68 bytes vs ~100 bytes, parametros tipados, desde 0.8.26 aceitos em require). try/catch (so chamadas externas, catch Error/Panic/bytes, nao para funcoes internas). Contrato integrador: FundManager com todos os mecanismos.

### Cap 13 - Modificadores e Eventos

Modifier: logica de validacao reutilizavel, _; marca corpo da funcao, com parametros, multiplos (ordem esquerda→direita, aninhamento tipo cebola), _; pode aparecer mais de uma vez (reentrancy guard). Eventos: gravam nos logs da transacao (375 gas base vs 20.000 gas storage), legiveis so off-chain, emit dispara. indexed: ate 3 parametros filtraveis por topic (32 bytes), strings/bytes indexados viram hash, eventos anonymous liberam 4o indexed sem hash de assinatura. Contrato integrador: SimpleBank.

### Cap 14 - Heranca e Polimorfismo

Heranca simples com is, chamada de construtor pai na declaracao, super para estender comportamento. virtual (permite sobrescrita) e override (confirma sobrescrita), combinaveis em cadeia. Funcoes private nao podem ser virtual. Heranca multipla: linearizacao C3 (mesmo algoritmo do Python), ordem do mais basico ao mais derivado, override(...) lista os pais diretos. super na heranca multipla segue a linearizacao (ordem inversa a declaracao). Abstract contracts: implementacao parcial, funcoes sem corpo, nao deployaveis. Interfaces: puramente declarativas (sem estado, construtor, implementacao, so external), podem herdar de interfaces (composicao de padroes ERC). Tabela comparativa interface vs abstract.

### Cap 15 - Libraries e Imports

Import nomeado (recomendado, {X} from "..."), global, com namespace (as). Remappings no foundry.toml para dependencias em lib/ (forge install, forge remappings). Library: contrato sem estado, sem ETH, sem heranca, funcoes internal embutidas no bytecode sem overhead. using...for: chama funcoes como metodos do tipo (valor vira primeiro parametro). using...for...global (desde 0.8.13): extensao automatica em todos os arquivos que importam. memory vs storage em parametros de library. internal vs public/external (DELEGATECALL para funcoes publicas).

### Cap 16 - Contratos

Muda de perspectiva: o que e um contrato na pratica. Tres fatos do deploy: endereco fixo, codigo imutavel, estado evolui. Analogia da casa (planta imutavel, mobilia muda). Leitura (call, view/pure, gratuita) vs escrita (transacao assinada, gas). Por que padroes existem: interoperabilidade (qualquer frontend fala com qualquer ERC20). Anatomia conceitual do ERC20 (totalSupply, balanceOf, transfer). Padrao approve + transferFrom (delegacao controlada de gasto). ERC20 minimo implementado do zero. Como o mundo externo chama (ABI encoding, function selector, ethers.js/wagmi). "Nao reinvente a roda": Solady, OpenZeppelin.

### Cap 17 - 15 Contratos para Praticar

Capitulo 100% pratico: trilha progressiva de 15 contratos com formato BDD (DADO/QUANDO/ENTAO). Do Flipper (nivel 1) ao Auction House (nivel avancado), passando por Calculator, Voting, Multi-Sig, ERC20, ERC721. Cada contrato tem 4 desafios que empilham complexidade. Filosofia: usar IA para escrever testes, implementar o contrato voce mesmo. Estrategia TDD: ver teste falhar, escrever codigo, ver passar, refatorar. Documentar o processo (LinkedIn, artigos) como ferramenta de aprendizado.

### Cap 18 - Seguranca em Smart Contracts

Framework mental de threat modeling: identificar ativos, adversarios, superficies de ataque. Quatro propriedades que tornam smart contracts hostis: imutabilidade, valor financeiro real, composabilidade, mempool publico. Classificacao de severidade (Critica/Alta/Media/Baixa). Catalogo de vulnerabilidades com hack historico e mitigacao para cada: controle de acesso (quem pode chamar o que), reentrancia (callback antes de atualizar estado, caso The DAO), overflow/underflow (protecao automatica desde 0.8), front-running/MEV (mempool publico), DoS por gas, manipulacao de timestamp. Principios: simplicidade, validacao de entradas, isolamento, desconfianca de contratos externos.

### Cap 19 - Definicao do Projeto

Especificacao completa do projeto final: Token ERC20 (Solady) + VendorMachine (PRB Math). Regras de negocio: maquina de venda automatica de "latinhas" pagas em ETH. Tokenomics derivada matematicamente: curva de compra linear crescente (+1 ETH por compra), curva de venda exponencial decrescente (-5,7% por venda). Tres bugs de seguranca intencionais: mint sem restricao, withdraw sem restricao, reentrancia em sellTokens. Requisitos funcionais e threat model aplicando o framework do cap 18 antes de escrever codigo.

### Cap 20 - Desenvolvimento dos Contratos

Implementacao linha a linha dos dois contratos: Token (ERC20 com Solady, ~15 linhas) e VendorMachine (PRB Math para aritmetica de ponto fixo UD60x18, bonding curve, logica de compra/venda). Caca ativa aos bugs previstos no threat model. Decisoes de arquitetura explicadas: por que Solady e nao OpenZeppelin, por que PRB Math para precisao decimal, separacao de responsabilidades Token vs VendorMachine.

### Cap 21 - Teste dos Contratos

Boas praticas universais: caminho feliz vs caminho triste, estrutura Pre/Teste/Pos (arrange/act/assert). Quatro tipos de teste do Foundry: unitario, fuzz (inputs aleatorios), invariante (propriedades que nunca quebram), fork (estado real da mainnet). Setup modular com BaseSetup.t.sol. Estilo BDD para testes legiveis. Implementacao de quatro testes reais da VendorMachine. Cheatcodes avancados: vm.prank, vm.deal, vm.warp, vm.expectRevert, vm.expectEmit. Lista completa de 13 requisitos BDD no Apendice E.

### Cap 22 - Auditoria dos Contratos

Distincao auditoria vs revisao de seguranca (revisao nao e garantia). Tres fases: Initial Review (relatorio de findings), Protocol Fixes (correcoes + testes), Mitigation Review (verificacao das correcoes). Rekt Test para avaliar prontidez. Slither: deteccao automatica de bugs, instalacao, execucao, interpretacao de findings. Checklist de revisao manual. Demonstracao de ataques reais: Controle de Acesso (mint/withdraw sem restricao) e Reentrancia (sellTokens) com traces do Forge, correcao e validacao por testes. Contexto historico: The DAO hack. Quase $4 bilhoes perdidos por vulnerabilidades.

### Cap 23 - Deploy e Interacao

Cinco niveis de deploy: Local (Anvil, gratis), Testnet L1 (Sepolia), Testnet L2 (Base Sepolia), Mainnet L1 (Ethereum), Mainnet L2 (Base/Optimism). Script de deploy em Solidity (nao ferramentas externas) dissecado linha a linha. Gestao segura de chaves com cast wallet. O que acontece quando uma chave privada vaza. Deploy em Sepolia e Base Sepolia com verificacao automatica de codigo-fonte. Leitura de estado via CLI (cast call). Interacao via MetaMask no frontend. Erros comuns de integracao.

### Cap 24 - Proximos Passos e Topicos Avancados

Mapa estrategico para continuidade: baixo nivel da EVM (opcodes, Yul/Assembly, delegatecall, CREATE/CREATE2, transient storage, precompiles), linguagens alternativas (Vyper, Fe, Huff), L2 e Rollups (Optimistic, ZK, app-chains, OP Stack), Data Availability (Blobs, Celestia, EigenDA), padroes de tokens (ERC721, ERC1155, ERC4626), proxies (UUPS, Diamond ERC2535), Account Abstraction (ERC-4337, EIP-7702), ecossistema Web3 (DeFi, AMMs, lending, oracles, IPFS, RWA, CBDCs/DREX), verificacao formal, Zero-Knowledge Proofs, economia de agentes de IA.

### Apendice A - Funcoes Built-in do Solidity

Referencia rapida organizada por categoria: funcoes de endereco (balance, code, transfer, send, call, delegatecall, staticcall), funcoes de criptografia (keccak256, sha256, ripemd160, ecrecover), funcoes de ABI (encode, encodePacked, encodeWithSignature, encodeWithSelector, decode), funcoes utilitarias (selfdestruct, type, gasleft). Sintaxe e exemplos praticos para cada funcao.

### Apendice B - Unidades e Literais

Referencia rapida: unidades de Ether (1 wei = 10^0, 1 gwei = 10^9, 1 ether = 10^18) com tabela de conversao e exemplos em codigo. Unidades de tempo (seconds, minutes, hours, days, weeks) com conversao para segundos. Exemplos praticos de uso em contratos.

### Apendice C - Checklist do Auditor

Ferramenta de bolso para auditar qualquer contrato: 15 perguntas agrupadas em 4 areas. **Controle de acesso** (4 perguntas): funcoes publicas com gate, inicializacao protegida contra re-chamada, roles separadas, plano para owner comprometido. **Fluxo de fundos** (4): padrao CEI (Checks-Effects-Interactions), retorno de transferFrom checado, contabilidade interna vs balance, modelo pull vs push. **Aritmetica e estado** (4): blocos unchecked justificados, invariante de supply explicita, block.timestamp em janelas seguras, oraculos manipulaveis. **Input e observabilidade** (3): validacao de inputs (zero-address, zero-amount), eventos em funcoes criticas, pause/circuit breaker. Cada pergunta com racional, mitigacao e referencia a hack historico (Parity, The DAO, Nomad Bridge, bZx, Mango Markets). Metodologia de uso em 4 passadas: intuicao, classificacao, PoC, ferramentas.

### Apendice D - Checklist Pre-Mainnet

7 perguntas obrigatorias antes de deploy em mainnet: (1) testou em fork de mainnet (anvil --fork-url), (2) gas usage medido e aceitavel (forge snapshot), (3) ABI verificada no explorer (forge verify-contract), (4) contrato immutable ou upgrade path documentado (UUPS/Diamond + timelock + multisig), (5) pause/emergency stop com multisig separado, (6) monitoring em tempo real configurado (Tenderly, OpenZeppelin Defender, Forta), (7) bug bounty ativo (Immunefi, Code4rena, Sherlock). Cada pergunta com comando/ferramenta e criterio de aceitacao. Bonus: fuzzing continuo em CI, verificacao formal (Halmos/Certora), simulacao pre-flight (Tenderly), pre-deploy em testnet por N dias. Regra: "se nao conseguir responder, nao faz deploy".

### Apendice E - Requisitos BDD da VendorMachine

14 requisitos BDD completos do projeto pratico (GIVEN/WHEN/THEN), agrupados por funcao. **buyTokens** (5): compra com sucesso, compra com ETH zero, vendor sem tokens, preco sobe apos compra, saldo do vendor cresce. **sellTokens** (4): venda com sucesso, venda sem tokens, vendor sem ETH, preco cai apos venda (5,7%). **withdraw** (3): saque pelo owner, saque por nao-owner (teste negativo mais importante: ausencia permitia dreno), saque com saldo zero. **Invariantes** (2): conservacao de supply (soma de balances == totalSupply para qualquer sequencia de chamadas) e preco monotonico em compras consecutivas (handler que limita fuzzer a buyTokens). Requisitos com * ja implementados no cap 21, demais sao exercicio guiado.

## Stack Tecnica do Projeto Pratico


| Camada          | Tecnologia                                                    |
| --------------- | ------------------------------------------------------------- |
| Smart Contracts | Solidity 0.8.20, Foundry (Forge), PRB Math, Solady            |
| Frontend        | Next.js 13, React 18, TypeScript, Wagmi, RainbowKit, Tailwind |
| Auditoria       | Slither                                                       |
| Deploy          | Forge scripts, Anvil (local), Sepolia, Base Sepolia           |


## Frases-Chave para Copy

- "Seguranca nao e um capitulo. E o livro inteiro."
- "Voce vai atacar e defender o mesmo contrato."
- "Do Genesis Block ao seu primeiro deploy auditado."
- "25 capitulos, 15 contratos para praticar, 3 bugs para explorar, 1 projeto completo."
- "O livro que faltava em portugues para quem leva Solidity a serio."
- "Blockchain e um banco de dados sem o D de delete."
- "O que subiu, subiu. Trate a imutabilidade como lei."
- "Cada conceito novo ancorado em algo que voce ja conhece da Web2."

