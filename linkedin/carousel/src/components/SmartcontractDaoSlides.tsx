import { useEffect, useState } from "react"
import { ArrowRight, BookOpen, ShieldCheck } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import bookCover from "@book-cover"
import { SolidityCodeBlock } from "./SolidityCodeBlock"

const slides = ["Abertura", "Linha do tempo", "Sequência", "Código", "Veredito"]

const timeline = [
  ["Abr — Mai 2016", "A promessa", "The DAO capta mais de US$ 150 milhões em ETH de 11 mil participantes — o maior crowdfunding registrado até então."],
  ["Semanas antes", "O alerta ignorado", "Pesquisadores alertam sobre reentrância na função de saque. A comunidade discute, mas o fundo já está em produção."],
  ["17 Jun 2016", "O ataque", "Um contrato malicioso chama splitDAO() recursivamente e saca o mesmo saldo antes que o registro seja zerado."],
  ["20 Jul 2016", "O hard fork", "A rede reverte o ataque por hard fork. A decisão cria uma cisão permanente: Ethereum e Ethereum Classic."],
]

const attackSteps = [
  ["01", "Depósito legítimo", "O atacante deposita ETH e se torna um investidor válido, com direito de saque."],
  ["02", "Pedido de saque", "O contrato atacante chama a função de saque e solicita de volta o ETH depositado."],
  ["03", "O contrato paga antes de atualizar o registro", "The DAO envia o ETH antes de zerar o saldo. Durante esse intervalo, o saldo antigo ainda existe."],
  ["04", "O pagamento aciona o atacante", "Ao receber ETH, a fallback function reentra no saque antes de devolver o controle."],
  ["05", "Loop sobre o mesmo saldo", "Como o estado ainda não mudou, o contrato aprova o saque repetidas vezes na mesma transação."],
]

const lessons = [
  ["01", "Ordem de operações é superfície de ataque", "Atualize o estado interno antes de transferir valor ou chamar contratos externos."],
  ["02", "Toda chamada externa é uma fronteira de confiança", "call, send e transferências cedem execução. Trate-as como pontos de reentrada em potencial."],
  ["03", "Auditoria não é seguro", "A falha já era conhecida. Identificar um risco não significa que ele foi mitigado em produção."],
  ["04", "Imutabilidade tem um preço social", "A correção exigiu um hard fork e dividiu a rede. Responder ao incidente também é uma decisão de design."],
]

function CaseBar({ index, label, danger = false }: { index: number; label: string; danger?: boolean }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-white/[0.02] px-5 py-4 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40 md:px-8">
      <span>CASO Nº 2016-0617 · THE DAO</span>
      <Badge variant="outline" className={danger ? "border-red-500/40 bg-red-500/5 text-red-400" : "border-white/15 bg-white/[0.03] text-white/60"}>
        <span className={`mr-2 inline-block size-1.5 rounded-full ${danger ? "bg-red-500" : "bg-[#ccff00]"}`} />
        {label}
      </Badge>
      <span>FICHA <b className="text-white/70">0{index}</b> / 05</span>
    </div>
  )
}

function SlideShell({ id, index, label, danger, children }: { id: string; index: number; label: string; danger?: boolean; children: React.ReactNode }) {
  return (
    <section id={id} className="relative mx-auto flex min-h-[630px] w-full max-w-[1120px] snap-center flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-[#0c0c0c] shadow-2xl shadow-black/60">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.035)_1px,transparent_1px)] bg-[size:60px_60px]" />
      <div className="pointer-events-none absolute -right-40 -top-56 size-[580px] rounded-full bg-[#ccff00]/[0.055] blur-3xl" />
      <CaseBar index={index} label={label} danger={danger} />
      <div className="relative z-10 flex flex-1 flex-col p-7 md:p-14">{children}</div>
    </section>
  )
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.22em] text-[#ccff00]">[ {children} ]</p>
}

export default function SmartcontractDaoSlides() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(entry => entry.isIntersecting && setActive(Number(entry.target.id.replace("slide-", "")) - 1)),
      { threshold: 0.55 },
    )
    document.querySelectorAll("[id^='slide-']").forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <main className="min-h-screen bg-black px-4 py-8 font-['Space_Grotesk'] text-[#ebebeb] selection:bg-[#ccff00] selection:text-black md:px-8">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&family=Space+Grotesk:wght@300;400;500;600;700&display=swap'); html { scroll-behavior: smooth; }`}</style>
      <nav className="fixed right-5 top-1/2 z-50 hidden -translate-y-1/2 flex-col gap-3 lg:flex" aria-label="Navegação dos slides">
        {slides.map((slide, index) => (
          <a key={slide} href={`#slide-${index + 1}`} aria-label={slide} className={`size-2.5 rounded-full border transition-all ${active === index ? "scale-125 border-[#ccff00] bg-[#ccff00] shadow-[0_0_16px_rgba(204,255,0,.7)]" : "border-white/30 bg-black"}`} />
        ))}
      </nav>

      <div className="mx-auto flex max-w-[1120px] snap-y flex-col gap-12">
        <SlideShell id="slide-1" index={1} label="encerrado · irreversível" danger>
          <div className="my-auto">
            <Eyebrow>Relatório de incidente · Ethereum</Eyebrow>
            <h1 className="max-w-5xl text-5xl font-bold italic leading-[0.92] tracking-[-0.06em] md:text-8xl">
              3,6 milhões de ETH saíram pela porta que <span className="text-red-500">ninguém trancou.</span>
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-relaxed text-white/55">Em 17 de junho de 2016, uma função mal ordenada custou o equivalente a um terço da capitalização do Ether em circulação — e obrigou uma blockchain inteira a reescrever seu próprio passado.</p>
            <div className="mt-12 grid border-t border-white/10 sm:grid-cols-2 lg:grid-cols-4">
              {[["3.6M", "ETH drenados"], ["~US$ 60M", "valor na época"], ["1 linha", "decidiu o ataque"], ["2 chains", "ETH e ETC"]].map(([n, l]) => (
                <div key={l} className="border-b border-white/10 p-5 sm:border-r lg:border-b-0 last:border-r-0"><strong className="block font-mono text-3xl text-[#ccff00]">{n}</strong><span className="mt-2 block text-sm text-white/40">{l}</span></div>
              ))}
            </div>
          </div>
        </SlideShell>

        <SlideShell id="slide-2" index={2} label="contexto">
          <Eyebrow>História que moldou a indústria</Eyebrow>
          <h2 className="max-w-4xl text-4xl font-bold leading-tight tracking-tight md:text-6xl">Da maior captação da história à maior <span className="text-[#ccff00]">crise de confiança</span> do Ethereum.</h2>
          <p className="mt-5 max-w-3xl text-lg text-white/50">The DAO era um fundo sem gestor. A ideia era boa. O código que a sustentava, não.</p>
          <div className="mt-10 grid flex-1 gap-3 md:grid-cols-4">
            {timeline.map(([date, title, copy], i) => (
              <Card key={title} className={`rounded-2xl border-white/10 bg-white/[0.035] text-white ${i === 2 ? "border-red-500/40 shadow-[inset_3px_0_0_#ef4444]" : "shadow-[inset_3px_0_0_#ccff00]"}`}>
                <CardContent className="p-5"><span className={`font-mono text-[10px] uppercase tracking-widest ${i === 2 ? "text-red-400" : "text-[#ccff00]"}`}>{date}</span><h3 className="mt-5 text-xl font-bold">{title}</h3><p className="mt-3 text-sm leading-relaxed text-white/50">{copy}</p></CardContent>
              </Card>
            ))}
          </div>
        </SlideShell>

        <SlideShell id="slide-3" index={3} label="mecanismo do ataque" danger>
          <Eyebrow>Exploit path</Eyebrow>
          <h2 className="text-4xl font-bold tracking-tight md:text-6xl">Como quatro chamadas viraram um <span className="text-red-500">saque infinito.</span></h2>
          <div className="mt-9 divide-y divide-white/10 border-y border-white/10">
            {attackSteps.map(([num, title, copy], i) => (
              <div key={num} className={`grid gap-3 py-4 md:grid-cols-[64px_260px_1fr] md:items-center ${i === 2 || i === 3 ? "bg-red-500/[0.035]" : ""}`}>
                <span className={`font-mono text-lg ${i === 2 || i === 3 ? "text-red-400" : "text-[#ccff00]"}`}>{num}</span><h3 className="font-bold">{title}</h3><p className="text-sm leading-relaxed text-white/50">{copy}</p>
              </div>
            ))}
          </div>
        </SlideShell>

        <SlideShell id="slide-4" index={4} label="pull request · correção" danger>
          <Eyebrow>Security review · PR #001</Eyebrow>
          <div className="flex items-end justify-between gap-8">
            <h2 className="max-w-4xl text-4xl font-bold tracking-tight md:text-6xl">A vulnerabilidade cabia na inversão de <span className="text-red-500">duas linhas.</span></h2>
            <Badge className="shrink-0 bg-[#ccff00] px-3 py-2 font-mono text-xs font-bold text-black">FIX READY</Badge>
          </div>
          <div className="mt-8"><SolidityCodeBlock /></div>
        </SlideShell>

        <SlideShell id="slide-5" index={5} label="veredito">
          <div className="grid flex-1 gap-10 lg:grid-cols-[1.2fr_.8fr]">
            <div>
              <Eyebrow>O padrão por trás do incidente</Eyebrow>
              <h2 className="text-4xl font-bold tracking-tight md:text-6xl">O que The DAO ainda ensina sobre <span className="text-[#ccff00]">segurança.</span></h2>
              <div className="mt-7 space-y-1">
                {lessons.map(([num, title, copy]) => <div key={num} className="grid grid-cols-[42px_1fr] gap-4 border-t border-white/10 py-4"><span className="font-mono text-[#ccff00]">{num}</span><div><h3 className="font-bold">{title}</h3><p className="mt-1 text-sm leading-relaxed text-white/45">{copy}</p></div></div>)}
              </div>
            </div>
            <Card className="flex flex-col justify-between rounded-[2rem] border-[#ccff00]/25 bg-gradient-to-br from-[#ccff00]/10 to-white/[0.025] text-white shadow-[0_0_50px_rgba(204,255,0,.08)]">
              <CardContent className="flex h-full flex-col p-7 md:p-9">
                <div className="my-auto py-8"><img src={bookCover} alt="Capa do livro Smartcontract Engineer — Solidity" className="mx-auto mb-7 block w-[min(100%,17rem)] rounded-xl shadow-[0_24px_50px_rgba(0,0,0,.55)]"/><p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#ccff00]">Smartcontract Engineer — Solidity</p><h3 className="mt-4 text-3xl font-bold leading-tight">Não deixe seu contrato virar a próxima ficha de caso.</h3><p className="mt-4 text-sm leading-relaxed text-white/50">Aprenda a encontrar reentrância, oráculos manipuláveis e falhas de acesso antes do deploy.</p></div>
                <Separator className="mb-6 bg-white/10" />
                <Button size="lg" className="w-full rounded-full bg-[#ccff00] font-bold text-black shadow-[0_0_30px_rgba(204,255,0,.25)] hover:bg-[#dcff4d]">Garantir meu exemplar <ArrowRight className="ml-2 size-4" /></Button>
              </CardContent>
            </Card>
          </div>
        </SlideShell>
      </div>
    </main>
  )
}
