---
format: 1080x1080
duration: 65s
message: "Rust supera Solidity para smart contracts em segurança, ecossistema e performance"
arc: Hook → Problema → Solução (3 pilares) → Landing
audience: desenvolvedores Web3, CTOs e founders no ecossistema blockchain
mode: collaborative
music: ambient-tech
---

## Video direction

Explainer técnico com tom editorial — warm, preciso, sem hype. Ritmo: cada frame revela seus elementos paced to the VO, nunca front-loaded. Design system code-editorial: cream paper, coral accents sparingly, JetBrains Mono para code, EB Garamond para display. Formato 1:1 otimizado pra LinkedIn autoplay mudo. Os primeiros 3 frames escalam a tensão (hook → problema → solução); frames 4-6 são evidence pillars com ritmo constante; frame 7 pousa com statement tipográfico. Camera sutil — push e drift, nunca dramatic. Held beats nos frames 1 e 7 pra deixar o impacto respirar.

## Frame 1 — Hook

- status: animated
- src: compositions/frames/01-hook.html
- duration: 6.9s
- transition_in: cut
- scene: Número impactante de perdas por hacks em smart contracts
- voiceover: Bilhões de dólares em smart contracts foram hackeados. E se o compilador pudesse ter evitado a maioria desses bugs?
- asset_candidates:
- blueprint: dataviz-countup (Adapt)
- focal: o número $3.8B
- roles: $3.8B = foreground subject · "em smart contracts hackeados" = supporting label · cream field = background
- sfx: tick

Adapt: keep the count-up signature; replace the trend chart with a single hero number counting up to $3.8B.
Scene 1 (0.0–3.0s): cream background held; value-scaled counter starts from $0 and climbs to $3.8B — font size grows with value, coral highlight on the number. Centered template, ~60% of frame. Subtle push-in underneath.
Scene 2 (3.0–5.0s): counter lands with a coral glow bloom; supporting text "em smart contracts hackeados" fades in below via per-word reveal. Counter holds still.
Scene 3 (5.0–6.9s): pergunta "E se o compilador pudesse ter evitado?" types in below with type-on caret. Hold for read. No further motion — stillness after the count-up is the point.

## Frame 2 — O Problema do Solidity

- status: animated
- src: compositions/frames/02-problema-solidity.html
- duration: 10.0s
- transition_in: crossfade
- scene: Vulnerabilidades clássicas do Solidity com código marcado
- voiceover: Solidity é a linguagem padrão do Ethereum. Mas ela permite reentrancy attacks, integer overflow, e delegatecall exploits — bugs que o compilador simplesmente não pega.
- asset_candidates:
- blueprint: kinetic-type-beats (Adapt)
- focal: código Solidity com vulnerabilidades marcadas
- roles: code snippet = foreground subject · vulnerability labels (reentrancy, overflow, delegatecall) = supporting · navy-soft field = background
- sfx: whoosh-soft

Adapt: keep the word-swap signature; use code surface with vulnerability labels appearing per spoken cue.
Scene 1 (0.0–3.0s): navy-soft background; Solidity code snippet (withdraw function with reentrancy pattern) fades in on JetBrains Mono, Centered ~55% of frame. Label "Solidity" in EB Garamond above code.
Scene 2 (3.0–6.0s): as VO names each exploit, a coral highlight + label appears on the code — "reentrancy" marks the external call, "overflow" marks the math, "delegatecall" marks the proxy pattern. Staggered layer-reveal timed to VO.
Scene 3 (6.0–8.5s): code dims to ~40%; bold text "bugs que o compilador não pega" per-word reveal in cream, centered below code. Coral underline on "não pega".
Scene 4 (8.5–10.0s): hold for read. Subtle drift only.

## Frame 3 — Rust: Memory Safety

- status: animated
- src: compositions/frames/03-memory-safety.html
- duration: 10.3s
- transition_in: crossfade
- scene: Ownership model do Rust — compilador rejeitando código inseguro
- voiceover: Rust resolve isso na raiz. O ownership model e o borrow checker eliminam categorias inteiras de bugs em tempo de compilação. Sem null pointers, sem data races.
- asset_candidates:
- blueprint: comparison-split (Adapt)
- focal: diagrama de ownership — variável passando ownership entre scopes
- roles: ownership diagram = foreground subject · checklist (null pointers ✗, data races ✗) = supporting · cream field = background
- sfx: tick

Adapt: keep the mirrored entry; left side shows Rust code, right side shows compiler checklist.
Scene 1 (0.0–3.0s): cream background; "Rust resolve na raiz" in EB Garamond display, coral highlight on "raiz". Centered, ~40% of frame. Fade in.
Scene 2 (3.0–6.0s): split-tilt cards enter from sides — left card: Rust code showing ownership transfer (let x = value; let y = x;) on navy surface. Right card: "ownership model" + "borrow checker" labels with coral checkmarks, per-word reveal timed to VO.
Scene 3 (6.0–8.5s): checklist assembles below: "null pointers ✗" "data races ✗" "memory leaks ✗" — each line appears with a coral ✗ mark, layer-reveal staggered. Cards hold.
Scene 4 (8.5–10.3s): held read. All elements settled and still.

## Frame 4 — Ecossistema Multi-chain

- status: animated
- src: compositions/frames/04-multi-chain.html
- duration: 11.7s
- transition_in: crossfade
- scene: Rust conecta múltiplas blockchains — Solidity só EVM
- voiceover: E Rust não se limita a uma chain. Solana, Near, Polkadot, Cosmos, Aptos — um dev Rust constrói em cinco ou mais ecossistemas. Solidity? Só no EVM.
- asset_candidates:
- blueprint: constellation-hub (Adapt)
- focal: "Rust" no centro com chains orbitando
- roles: Rust label = center hub · chain names (Solana, Near, Polkadot, Cosmos, Aptos) = orbiting nodes · Solidity isolated = supporting · cream field = background
- sfx: whoosh-soft

Adapt: keep the ring + center hub signature; nodes are chain names instead of icons.
Scene 1 (0.0–3.0s): cream background; "Rust" in EB Garamond display, coral, centered. Subtle scale-up from 90% to 100%.
Scene 2 (3.0–7.5s): as VO names each chain, a labeled node springs into position on a ring around "Rust" — Solana, Near, Polkadot, Cosmos, Aptos. Staggered orbit-3d-entry, one per spoken name. SVG connection lines draw from hub to each node.
Scene 3 (7.5–9.5s): camera holds; "Solidity" appears isolated bottom-right, dim ~50%, with label "EVM only" in ink. Contrast with the connected constellation.
Scene 4 (9.5–11.7s): counter badge "5+ ecossistemas" fades in below hub. Held read — orbit continues with subtle drift.

## Frame 5 — Tooling Superior

- status: animated
- src: compositions/frames/05-tooling.html
- duration: 9.8s
- transition_in: crossfade
- scene: Cargo integrado vs ferramentas fragmentadas do Solidity
- voiceover: Cargo, o package manager do Rust, integra testes, benchmarks e documentação em um só lugar. Solidity depende de ferramentas fragmentadas como Hardhat e Foundry.
- asset_candidates:
- blueprint: comparison-split (Reproduce)
- focal: Cargo (uma ferramenta) vs Solidity stack (múltiplas)
- roles: Cargo card = left foreground · Solidity stack card = right foreground · cream field = background
- sfx: tick

Reproduce: mirrored book-open entry, left Cargo vs right Solidity tools.
Scene 1 (0.0–3.0s): left card enters — navy surface, terminal showing `cargo test` with green checkmarks. Label "Cargo" in EB Garamond. Tilt entry from left.
Scene 2 (3.0–5.5s): items layer-reveal on left card as VO names them: "testes ✓" "benchmarks ✓" "docs ✓". Each with coral checkmark.
Scene 3 (5.5–8.0s): right card enters from right — cream surface with multiple scattered labels: "Hardhat" "Foundry" "Ethers.js" "OpenZeppelin" in smaller type, visually fragmented. Badge "fragmentado" springs in coral at bottom.
Scene 4 (8.0–9.8s): held read. Both cards settled.

## Frame 6 — Performance

- status: animated
- src: compositions/frames/06-performance.html
- duration: 10.2s
- transition_in: crossfade
- scene: Comparação de TPS — Solana 65k vs Ethereum 15
- voiceover: Chains baseadas em Rust processam milhares de transações por segundo. Solana alcança sessenta e cinco mil TPS teóricos. Ethereum na base layer? Quinze.
- asset_candidates:
- blueprint: dataviz-countup (Reproduce)
- focal: gráfico de barras com count-up — Solana vs Ethereum
- roles: Solana bar = foreground subject (coral) · Ethereum bar = supporting (ink dim) · TPS labels = supporting · cream field = background
- sfx: tick, whoosh-soft

Reproduce: count-up ring replaced with horizontal bar chart, camera push-through to hero metric.
Scene 1 (0.0–3.0s): cream background; title "Transações por segundo" in EB Garamond, upper area. Two bar outlines appear — "Ethereum" and "Solana". Centered layout, bars ~50% of frame.
Scene 2 (3.0–6.0s): Solana bar fills with coral, value-scaled counter climbs to 65,000. Bar grows proportionally. Count-up timed to VO "sessenta e cinco mil".
Scene 3 (6.0–8.5s): pause — "Ethereum na base layer?" VO. Ethereum bar fills in ink, counter climbs slowly to just 15. The contrast is visual — tiny bar vs massive bar.
Scene 4 (8.5–10.2s): label "~4,333x" fades in between bars with coral glow. Held read.

## Frame 7 — Landing

- status: animated
- src: compositions/frames/07-landing.html
- duration: 5.8s
- transition_in: crossfade
- scene: Statement tipográfico final — o futuro fala Rust
- voiceover: O futuro dos smart contracts fala Rust. A questão não é se você vai aprender — é quando.
- asset_candidates:
- blueprint: kinetic-type-beats (Reproduce)
- focal: "O futuro fala Rust."
- roles: statement text = foreground subject · "Rust" highlight = coral accent · cream field = background
- sfx:

Reproduce: flat centered bold-type, statement builds via per-word reveal onto a held finale.
Scene 1 (0.0–2.5s): cream background; "O futuro dos smart contracts fala" per-word staggered reveal in EB Garamond display, centered. Then "Rust" slams in bold with coral highlight and subtle scale overshoot (spring-pop).
Scene 2 (2.5–4.5s): second line "A questão não é se — é quando." fades in below, lighter weight. Coral underline on "quando".
Scene 3 (4.5–5.8s): held read. Everything still. This is the landing — stillness is the statement.
