import { useEffect, useMemo, useState } from 'react'
import { ArrowRight, Badge, Card, CardContent } from './dao-adapters'
import bookCover from '@book-cover'
import { SecurityDiff } from './SolidityCodeBlock'

const ACTS = ['Abertura', 'Contexto', 'Ataque', 'Correção', 'Aprendizados']

const protections = {
  'parity-wallet': ['Inicialize uma única vez', 'Proteja initWallet() com initializer e um owner definido no deploy.', 'Evite selfdestruct em lógica compartilhada', 'Libraries que guardam estado ou controlam fundos não podem ser destruídas por uma wallet.', 'Isole privilégios', 'O contrato de implementação não deve aceitar chamadas administrativas diretas.', 'Teste a inicialização', 'Verifique que uma segunda chamada de init falha antes de publicar o bytecode.'],
  'ronin-bridge': ['Separe as chaves de validação', 'Nenhuma organização deve concentrar o quorum de uma bridge.', 'Revogue permissões temporárias', 'Acesso excepcional precisa expirar automaticamente.', 'Monitore retiradas anômalas', 'Limites, alertas e pausas reduzem a janela de roubo.', 'Segurança operacional é código', 'Proteja endpoints, pessoas e chaves com o mesmo rigor do contrato.'],
  'curve-finance': ['Congele o compilador', 'Declare e audite a versão exata que gera o bytecode implantado.', 'Teste o bytecode', 'Uma proteção no fonte só existe se estiver presente no artefato compilado.', 'Defesa em profundidade', 'Limites de retirada e pausas reduzem impacto quando um guard falha.', 'Audite a toolchain', 'Compilador e dependências entram no seu modelo de ameaça.'],
}

const defaultLessons = ['Defina invariantes antes do deploy', 'Todo contrato crítico precisa de propriedades de segurança testáveis.', 'Reduza privilégios e superfície', 'Menos permissões e menos caminhos administrativos significam menos exploração.', 'Use limites de dano', 'Pausas, caps e timelocks evitam que uma falha vire um roubo total.', 'Simule o atacante', 'Teste o caminho adversarial, não apenas a execução que você espera.']

const caseOverrides = {
  'the-dao': {
    value: '3,6M ETH',
    headline: 'O hack de contrato inteligente que hoje vale ~US$ 9 bilhões.',
    attack: ['O atacante deposita ETH e ganha direito legítimo de saque.', 'A chamada splitDAO() envia ETH antes de atualizar o saldo.', 'A fallback function do atacante reentra enquanto o saldo antigo continua válido.', 'O contrato autoriza outro saque do mesmo saldo.', 'O loop repete até drenar os fundos disponíveis.'],
  },
}

const diffExamples = {
  'the-dao': ['function withdraw(uint amount) external {\n  msg.sender.call{value: amount}("");\n  balances[msg.sender] -= amount;\n}', 'function withdraw(uint amount) external nonReentrant {\n  balances[msg.sender] -= amount;\n  msg.sender.call{value: amount}("");\n}'],
  'parity-wallet': ['function initWallet(address[] memory owners) public {\n  m_owners = owners;\n}\nfunction kill(address payable to) external onlyOwner {\n  selfdestruct(to);\n}', 'function initWallet(address[] memory owners) external initializer {\n  require(m_owners.length == 0, "initialized");\n  m_owners = owners;\n}\n// implementation cannot selfdestruct'],
  beautychain: ['function transfer(address to, uint value) public {\n  balances[msg.sender] -= value;\n  balances[to] += value;\n}', 'function transfer(address to, uint value) external {\n  require(balances[msg.sender] >= value, "balance");\n  balances[msg.sender] -= value;\n  balances[to] += value;\n}'],
  bzx: ['function borrow(uint amount) external {\n  uint price = spotOracle.getPrice();\n  _borrow(amount, price);\n}', 'function borrow(uint amount) external {\n  uint price = twapOracle.getPrice();\n  require(!twapOracle.isStale(), "stale price");\n  _borrow(amount, price);\n}'],
  'poly-network': ['function verifyHeader(bytes calldata proof) external {\n  require(verify(proof));\n  executeCrossChainTx();\n}', 'function verifyHeader(bytes calldata proof) external {\n  require(verify(proof), "invalid proof");\n  require(trustedEmitter[msg.sender], "untrusted chain");\n  executeCrossChainTx();\n}'],
  'cream-finance': ['function borrow(uint amount) external {\n  uint collateral = oracle.getPrice(asset);\n  require(collateral >= amount);\n}', 'function borrow(uint amount) external {\n  uint collateral = twapOracle.getPrice(asset);\n  require(twapOracle.isValid(asset), "unsafe price");\n  require(collateral >= amount);\n}'],
  'ronin-bridge': ['function withdraw(bytes[] calldata sigs) external {\n  require(sigs.length >= 5);\n  release();\n}', 'function withdraw(bytes[] calldata sigs) external {\n  require(uniqueTrustedSigners(sigs) >= 5, "quorum");\n  require(withdrawalLimitNotExceeded(), "limit");\n  release();\n}'],
  'akutars-nft': ['function refund() external {\n  payable(msg.sender).transfer(refundAmount);\n  refundCount++;\n}', 'function refund() external nonReentrant {\n  require(!refunded[msg.sender], "claimed");\n  refunded[msg.sender] = true;\n  payable(msg.sender).transfer(refundAmount);\n}'],
  'nomad-bridge': ['function process(bytes32 root, bytes calldata message) external {\n  require(acceptableRoot(root));\n  execute(message);\n}', 'function process(bytes32 root, bytes calldata message) external {\n  require(root != bytes32(0), "zero root");\n  require(confirmedRoots[root], "unconfirmed root");\n  execute(message);\n}'],
  'euler-finance': ['function donateToReserves(uint amount) external {\n  reserves += amount;\n  healthCheck(msg.sender);\n}', 'function donateToReserves(uint amount) external {\n  require(healthCheck(msg.sender), "unhealthy account");\n  reserves += amount;\n  enforceLiquidationCooldown();\n}'],
  'curve-finance': ["@nonreentrant('lock')\ndef remove_liquidity(_amount: uint256):\n    send(msg.sender, _amount)", "# Vyper 0.3.10, compiler pinned\n@nonreentrant('lock')\ndef remove_liquidity(_amount: uint256):\n    assert self.lock == 1\n    send(msg.sender, _amount)"],
}

function clean(html = '') {
  return String(html)
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&(?:nbsp|amp);/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function source(incident, index) {
  const slide = incident.slides?.[index]
  return typeof slide === 'string' ? slide : slide?.html || ''
}

function capture(html, className) {
  const match = html.match(new RegExp(`<[^>]*class=["'][^"']*${className}[^"']*["'][^>]*>([\\s\\S]*?)<\\/[^>]+>`, 'i'))
  return clean(match?.[1])
}

function flowFrom(html) {
  const entries = [...html.matchAll(/<div class=["']step["']>([\s\S]*?)<\/div>/gi)]
    .map((match) => clean(match[1]))
    .filter((item) => item && item !== '↓' && !/^PASSO \d+|^CONTEXTO|^RESULTADO$/i.test(item))
  return entries.slice(0, 5)
}

function codeFrom(html) {
  const match = html.match(/<code[^>]*class=["'][^"']*code-block[^"']*["'][^>]*>([\s\S]*?)<\/code>/i)
  return clean(match?.[1]).replace(/\s*{\s*/g, ' {\n  ').replace(/;\s*/g, ';\n  ').trim()
}

function profileFor(incident) {
  const example = diffExamples[incident.slug]
  const legacyCode = codeFrom(source(incident, 2)) || `contract ${incident.name.replace(/\W/g, '')} {\n  // ataque documentado\n}`
  const fixHint = protections[incident.slug]?.[1] || 'Aplique controles explícitos antes da operação crítica.'
  return {
    filename: `contracts/${incident.name.replace(/\W/g, '')}.sol`,
    label: `Security fix · ${capture(source(incident, 0), 'severity-tag') || 'vulnerability remediation'}`,
    vulnerable: example?.[0] || `${legacyCode}\n\n// VULNERÁVEL: controle crítico ausente`,
    corrected: example?.[1] || `${legacyCode}\n\n// CORRIGIDO: ${fixHint}\n// revisão obrigatória antes do deploy`,
  }
}

function CaseBar({ incident, index, label, danger = false }) {
  return <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-white/[0.02] px-5 py-4 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40 md:px-8"><span>CASO · {incident.name}</span><Badge className={danger ? 'border border-red-500/40 bg-red-500/5 px-2 py-1 text-red-400' : 'border border-white/15 bg-white/[0.03] px-2 py-1 text-white/60'}>{label}</Badge><span>FICHA <b className="text-white/70">0{index}</b> / 05</span></div>
}

function SlideShell({ incident, id, index, label, danger, children }) {
  return <section id={id} className="relative mx-auto flex min-h-[630px] w-full max-w-[1120px] snap-center flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-[#0c0c0c] shadow-2xl shadow-black/60"><div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.035)_1px,transparent_1px)] bg-[size:60px_60px]" /><div className="pointer-events-none absolute -right-40 -top-56 size-[580px] rounded-full bg-[#ccff00]/[0.055] blur-3xl" /><CaseBar incident={incident} index={index} label={label} danger={danger} /><div className="relative z-10 flex flex-1 flex-col p-7 md:p-14">{children}</div></section>
}

function Eyebrow({ children }) { return <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.22em] text-[#ccff00]">[ {children} ]</p> }

export function IncidentDeck({ incident }) {
  const [active, setActive] = useState(0)
  const impact = source(incident, 0)
  const story = capture(source(incident, 1), 'story-text') || clean(source(incident, 1))
  const override = caseOverrides[incident.slug] || {}
  const attack = override.attack || flowFrom(source(incident, 3))
  const [value, headline, severity, date] = [override.value || capture(impact, 'value'), override.headline || capture(impact, 'headline'), capture(impact, 'severity-tag'), capture(impact, 'date-badge')]
  const lessons = protections[incident.slug] || defaultLessons
  const diff = useMemo(() => profileFor(incident), [incident])

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && setActive(Number(entry.target.id.split('-').pop()) - 1)), { threshold: 0.55 })
    document.querySelectorAll(`[data-incident="${incident.slug}"][id^="incident-slide-"]`).forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [incident.slug])

  return <main className="min-h-screen bg-black px-4 py-8 font-['Space_Grotesk'] text-[#ebebeb] selection:bg-[#ccff00] selection:text-black md:px-8"><style>{`@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&family=Space+Grotesk:wght@300;400;500;600;700&display=swap'); html { scroll-behavior: smooth; }`}</style><nav className="fixed right-5 top-1/2 z-50 hidden -translate-y-1/2 flex-col gap-3 lg:flex">{ACTS.map((act, index) => <a key={act} href={`#incident-slide-${index + 1}`} className={`size-2.5 rounded-full border transition-all ${active === index ? 'scale-125 border-[#ccff00] bg-[#ccff00]' : 'border-white/30 bg-black'}`} aria-label={act} />)}</nav><div className="mx-auto flex max-w-[1120px] snap-y flex-col gap-12" data-incident={incident.slug}>
    <SlideShell incident={incident} id="incident-slide-1" index={1} label="impacto · crítico" danger><div className="my-auto"><Eyebrow>Relatório de incidente · {date || incident.report}</Eyebrow><h1 className="max-w-5xl text-5xl font-bold italic leading-[0.92] tracking-[-0.06em] md:text-8xl">O hack de contrato inteligente que expôs <span className="text-red-500">{value || 'valor crítico'}</span>.</h1><p className="mt-7 max-w-3xl text-lg leading-relaxed text-white/55">{headline || `O ataque contra ${incident.name} mostrou como uma vulnerabilidade pode virar roubo em escala.`}</p><div className="mt-12 grid border-t border-white/10 sm:grid-cols-3"><div className="border-b border-white/10 p-5 sm:border-r lg:border-b-0"><strong className="block font-mono text-3xl text-red-500">{value || 'impacto crítico'}</strong><span className="mt-2 block text-sm text-white/40">valor afetado</span></div><div className="border-b border-white/10 p-5 sm:border-r lg:border-b-0"><strong className="block font-mono text-3xl text-[#ccff00]">{severity || 'INCIDENTE'}</strong><span className="mt-2 block text-sm text-white/40">vetor da vulnerabilidade</span></div><div className="p-5"><strong className="block font-mono text-3xl text-red-500">ATAQUE</strong><span className="mt-2 block text-sm text-white/40">cadeia de exploração</span></div></div></div></SlideShell>
    <SlideShell incident={incident} id="incident-slide-2" index={2} label="contexto"><Eyebrow>História, curiosidade e contexto</Eyebrow><h2 className="max-w-4xl text-4xl font-bold tracking-tight md:text-6xl">Por que este <span className="text-[#ccff00]">ataque</span> foi possível.</h2><Card className="mt-8 max-w-5xl rounded-2xl border border-white/10 bg-white/[0.035] shadow-[inset_3px_0_0_#ccff00]"><CardContent className="p-6 text-lg leading-relaxed text-white/60 md:p-8">{story}</CardContent></Card></SlideShell>
    <SlideShell incident={incident} id="incident-slide-3" index={3} label="mecanismo do ataque" danger><Eyebrow>Exploit path · passo a passo</Eyebrow><h2 className="text-4xl font-bold tracking-tight md:text-6xl">Como a vulnerabilidade virou <span className="text-red-500">ataque.</span></h2><div className="mt-9 divide-y divide-white/10 border-y border-white/10">{(attack.length ? attack : ['O atacante identifica a superfície vulnerável.', 'Uma chamada crítica contorna o controle de segurança.', 'O estado do protocolo fica inconsistente.', 'A extração de valor é autorizada.', 'O roubo só é percebido após a transação.']).map((step, index) => <div key={step} className={`grid gap-3 py-4 md:grid-cols-[64px_1fr] ${index > 1 ? 'bg-red-500/[0.035]' : ''}`}><span className={index > 1 ? 'font-mono text-lg text-red-400' : 'font-mono text-lg text-[#ccff00]'}>0{index + 1}</span><p className="font-medium leading-relaxed text-white/70">{step}</p></div>)}</div></SlideShell>
    <SlideShell incident={incident} id="incident-slide-4" index={4} label="pull request · correção" danger><Eyebrow>Security review · PR #001</Eyebrow><div className="flex items-end justify-between gap-8"><h2 className="max-w-4xl text-4xl font-bold tracking-tight md:text-6xl">O contrato hackeado à esquerda. A correção à <span className="text-red-500">direita.</span></h2><Badge className="shrink-0 bg-[#ccff00] px-3 py-2 font-mono text-xs font-bold text-black">FIX READY</Badge></div><div className="mt-8"><SecurityDiff {...diff} /></div></SlideShell>
    <SlideShell incident={incident} id="incident-slide-5" index={5} label="aprendizados"><div className="grid flex-1 gap-10 lg:grid-cols-[1.2fr_.8fr]"><div><Eyebrow>Aprendizados técnicos</Eyebrow><h2 className="text-4xl font-bold tracking-tight md:text-6xl">O que este ataque ensina sobre <span className="text-[#ccff00]">segurança.</span></h2><div className="mt-7 space-y-1">{[0, 2, 4, 6].map((offset, index) => <div key={lessons[offset]} className="grid grid-cols-[42px_1fr] gap-4 border-t border-white/10 py-4"><span className="font-mono text-[#ccff00]">0{index + 1}</span><div><h3 className="font-bold">{lessons[offset]}</h3><p className="mt-1 text-sm leading-relaxed text-white/45">{lessons[offset + 1]}</p></div></div>)}</div></div><Card className="relative overflow-hidden rounded-[2rem] border border-[#ccff00]/25 bg-gradient-to-br from-[#ccff00]/10 to-white/[0.025] text-white shadow-[0_0_50px_rgba(204,255,0,.08)]"><CardContent className="relative flex h-full flex-col p-7 md:p-8"><span className="w-fit rounded-full bg-[#ccff00] px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-black">Leitura recomendada</span><div className="relative my-5 flex flex-1 items-center justify-center overflow-hidden rounded-2xl border border-[#ccff00]/15 bg-black/30"><div className="absolute inset-0 bg-[linear-gradient(rgba(204,255,0,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(204,255,0,.05)_1px,transparent_1px)] bg-[size:24px_24px]" /><div className="absolute size-48 rounded-full bg-[#ccff00]/20 blur-3xl" /><img src={bookCover} alt="Capa do livro Smartcontract Engineer — Solidity" className="relative z-10 max-h-[15rem] max-w-[10rem] rounded-lg shadow-[0_24px_50px_rgba(0,0,0,.55)]" /></div><p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#ccff00]">Smartcontract Engineer · edição física</p><h3 className="mt-3 text-center text-2xl font-bold leading-[1.05] tracking-tight">Aprenda Solidity. Não seja <span className="text-red-500">hackeado.</span></h3><a href="https://soliditybook.vercel.app" target="_blank" rel="noreferrer" className="mt-5 inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-full bg-[#ccff00] px-5 py-3 font-bold text-black shadow-[0_0_30px_rgba(204,255,0,.25)] transition-colors hover:bg-[#dcff4d]">Garantir meu exemplar <ArrowRight className="size-4" /></a></CardContent></Card></div></SlideShell>
  </div></main>
}
