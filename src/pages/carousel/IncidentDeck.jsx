import { useEffect, useMemo, useState } from 'react'
import { Badge, Card, CardContent } from '../../components/dao-adapters'
import { SecurityDiff } from './SolidityCodeBlock'
import { BookCta } from './BookCta'
import { caseOverrides, protections, defaultLessons, diffExamples } from './incident-data'

const ACTS = ['Abertura', 'Contexto', 'Ataque', 'Correção', 'Aprendizados']

function clean(html = '') {
  return String(html).replace(/<br\s*\/?>/gi, ' ').replace(/<[^>]+>/g, ' ').replace(/&(?:nbsp|amp);/g, ' ').replace(/\s+/g, ' ').trim()
}

function source(incident, index) {
  const slide = incident.slides?.[index]
  return typeof slide === 'string' ? slide : slide?.html || ''
}

function capture(html, className) {
  const re = new RegExp(`<([a-z]+)[^>]*class=["'][^"']*${className}[^"']*["'][^>]*>`, 'i')
  const m = re.exec(html)
  if (!m) return ''
  const tag = m[1]
  const after = html.slice(m.index + m[0].length)
  const tags = new RegExp(`<(/?)${tag}\\b[^>]*>`, 'gi')
  let depth = 1, t
  while ((t = tags.exec(after))) { depth += t[1] ? -1 : 1; if (depth === 0) return clean(after.slice(0, t.index)) }
  return clean(after)
}

function profileFor(incident) {
  const example = diffExamples[incident.slug]
  return {
    filename: `contracts/${incident.name.replace(/\W/g, '')}.sol`,
    label: `Security fix · ${capture(source(incident, 0), 'severity-tag') || 'vulnerability remediation'}`,
    vulnerable: example?.[0] || `contract ${incident.name.replace(/\W/g, '')} {\n  // VULNERÁVEL\n}`,
    corrected: example?.[1] || `contract ${incident.name.replace(/\W/g, '')} {\n  // CORRIGIDO\n}`,
  }
}

function CaseBar({ incident, index, label, danger = false }) {
  return <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-white/[0.02] px-5 py-4 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40 md:px-8"><span>CASO · {incident.name}</span><Badge className={danger ? 'border border-red-500/40 bg-red-500/5 px-2 py-1 text-red-400' : 'border border-white/15 bg-white/[0.03] px-2 py-1 text-white/60'}>{label}</Badge><span>FICHA <b className="text-white/70">0{index}</b> / 05</span></div>
}

function ProfileSignature() {
  return <footer className="relative z-10 mt-6 flex w-full max-w-[360px] items-center gap-4 rounded-2xl border border-[#ccff00]/30 bg-[#12150d]/90 px-4 py-3 shadow-[0_0_28px_rgba(204,255,0,.12)]"><div className="size-20 shrink-0 overflow-hidden rounded-full border-2 border-[#ccff00]/75 bg-[#151515] shadow-[0_0_24px_rgba(204,255,0,.25)]"><img src="/images/lucas-profile.jpeg" alt="Lucas Bispo de Oliveira" className="size-full object-contain" /></div><div className="min-w-0"><p className="truncate text-lg font-bold tracking-tight text-white">Lucas Bispo de Oliveira</p><p className="mt-1.5 truncate font-mono text-[11px] uppercase tracking-[0.1em] text-white/60">Senior Blockchain Engineer</p></div></footer>
}

function SlideShell({ incident, id, index, label, danger, children }) {
  return <section id={id} className="relative mx-auto flex min-h-[630px] w-full max-w-[1120px] snap-center flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-[#0c0c0c] shadow-2xl shadow-black/60"><div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.035)_1px,transparent_1px)] bg-[size:60px_60px]" /><div className="pointer-events-none absolute -right-40 -top-56 size-[580px] rounded-full bg-[#ccff00]/[0.055] blur-3xl" /><CaseBar incident={incident} index={index} label={label} danger={danger} /><div className="relative z-10 flex flex-1 flex-col p-7 md:p-14">{children}</div><div className="px-7 pb-7 md:px-14 md:pb-10"><ProfileSignature /></div></section>
}

function Eyebrow({ children }) { return <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.22em] text-[#ccff00]">[ {children} ]</p> }

function highlightValue(title) {
  const m = title.match(/(~?US\$\s*[\d,.]+\s*[MBbi]*)/i)
  if (!m) return title
  const i = title.indexOf(m[0])
  return <>{title.slice(0, i)}<span className="text-red-500">{m[0]}</span>{title.slice(i + m[0].length)}</>
}

function Slide1({ incident, o, date }) {
  return <SlideShell incident={incident} id="incident-slide-1" index={1} label="impacto · crítico" danger>
    <div className="my-auto">
      <Eyebrow>Relatório de incidente · {date || incident.report}</Eyebrow>
      <h1 className="max-w-5xl text-5xl font-bold italic leading-[0.92] tracking-[-0.06em] md:text-8xl">{o.title ? highlightValue(o.title) : <>Como perder <span className="text-red-500">{o.value}</span> em <span className="text-red-500">{o.coin}</span> com uma única linha de código.</>}</h1>
      <p className="mt-7 max-w-3xl text-lg leading-relaxed text-white/55">{o.headline}</p>
      <div className="mt-12 grid border-t border-white/10 sm:grid-cols-3">
        <div className="border-b border-white/10 p-5 sm:border-r lg:border-b-0"><strong className="block font-mono text-3xl text-red-500">{o.value}</strong><span className="mt-1 block text-xs text-white/40">valor na época</span><span className="mt-2 block font-mono text-sm text-red-400">{o.valueToday}</span></div>
        <div className="border-b border-white/10 p-5 sm:border-r lg:border-b-0"><strong className="block font-mono text-3xl text-red-500">{o.coinAmount}</strong><span className="mt-2 block text-sm text-white/40">{o.coin}</span></div>
        <div className="p-5"><strong className="block font-mono text-3xl text-red-500">{o.attackType}</strong><span className="mt-2 block text-sm text-white/40">tipo de ataque</span></div>
      </div>
    </div>
  </SlideShell>
}

function Slide2({ incident, o }) {
  const cards = o.cards || []
  return <SlideShell incident={incident} id="incident-slide-2" index={2} label="contexto">
    <Eyebrow>História, curiosidade e contexto</Eyebrow>
    <h2 className="max-w-4xl text-4xl font-bold tracking-tight md:text-6xl">{o.contextTitle || <>Por que este <span className="text-[#ccff00]">ataque</span> foi possível.</>}</h2>
    <p className="mt-5 max-w-3xl text-lg text-white/50">{o.contextSub}</p>
    <div className="mt-8 grid flex-1 gap-3 md:grid-cols-4">
      {cards.map((c) => <Card key={c.title} className={`rounded-2xl border bg-white/[0.035] text-white ${c.danger ? 'border-red-500/40 bg-red-500/[0.035]' : 'border-white/10'}`}><CardContent className="p-5"><span className={`font-mono text-[10px] uppercase tracking-widest ${c.danger ? 'text-red-400' : 'text-[#ccff00]'}`}>{c.tag}</span><h3 className="mt-5 text-xl font-bold">{c.title}</h3><p className="mt-3 text-sm leading-relaxed text-white/50">{c.body}</p></CardContent></Card>)}
    </div>
  </SlideShell>
}

function Slide3({ incident, o }) {
  const steps = o.attack || []
  return <SlideShell incident={incident} id="incident-slide-3" index={3} label="mecanismo do ataque" danger>
    <Eyebrow>Exploit path · passo a passo</Eyebrow>
    <h2 className="text-4xl font-bold tracking-tight md:text-6xl">{o.attackTitle || <>Como a vulnerabilidade virou <span className="text-red-500">ataque.</span></>}</h2>
    <div className="mt-9 divide-y divide-white/10 border-y border-white/10">
      {steps.map((step, i) => <div key={step} className={`grid gap-3 py-4 md:grid-cols-[64px_1fr] ${i > 1 ? 'bg-red-500/[0.035]' : ''}`}><span className={i > 1 ? 'font-mono text-lg text-red-400' : 'font-mono text-lg text-[#ccff00]'}>0{i + 1}</span><p className="font-medium leading-relaxed text-white/70">{step}</p></div>)}
    </div>
  </SlideShell>
}

function Slide4({ incident, o, diff }) {
  return <SlideShell incident={incident} id="incident-slide-4" index={4} label="pull request · correção" danger>
    <Eyebrow>Security review · PR #001</Eyebrow>
    <div className="flex items-end justify-between gap-8">
      <h2 className="max-w-4xl text-4xl font-bold tracking-tight md:text-6xl">{o.diffTitle || <>O contrato hackeado à esquerda. A correção à <span className="text-red-500">direita.</span></>}</h2>
      <Badge className="shrink-0 bg-[#ccff00] px-3 py-2 font-mono text-xs font-bold text-black">FIX READY</Badge>
    </div>
    <div className="mt-8"><SecurityDiff {...diff} /></div>
  </SlideShell>
}

function Slide5({ incident, lessons }) {
  return <SlideShell incident={incident} id="incident-slide-5" index={5} label="aprendizados">
    <div className="grid flex-1 gap-10 lg:grid-cols-[1.2fr_.8fr]">
      <div>
        <Eyebrow>Aprendizados técnicos</Eyebrow>
        <h2 className="text-4xl font-bold tracking-tight md:text-6xl">O que podemos aprender com o caso do <span className="text-[#ccff00]">{incident.name}.</span></h2>
        <div className="mt-7 space-y-1">
          {[0, 2, 4, 6].map((offset, i) => lessons[offset] && <div key={lessons[offset]} className="grid grid-cols-[42px_1fr] gap-4 border-t border-white/10 py-4"><span className="font-mono text-[#ccff00]">0{i + 1}</span><div><h3 className="font-bold">{lessons[offset]}</h3><p className="mt-1 text-sm leading-relaxed text-white/45">{lessons[offset + 1]}</p></div></div>)}
        </div>
      </div>
      <BookCta />
    </div>
  </SlideShell>
}

export function IncidentDeck({ incident }) {
  const [active, setActive] = useState(0)
  const impact = source(incident, 0)
  const o = caseOverrides[incident.slug] || {}
  const date = capture(impact, 'date-badge')
  if (!o.value) o.value = capture(impact, 'value') || '—'
  if (!o.headline) o.headline = `O ataque contra ${incident.name} explorou uma vulnerabilidade no contrato inteligente e causou um roubo em escala.`
  if (!o.coin) o.coin = 'ETH'
  if (!o.coinAmount) o.coinAmount = o.value
  if (!o.attackType) o.attackType = capture(impact, 'severity-tag') || 'EXPLOIT'
  if (o.lines == null) o.lines = 1
  if (!o.valueToday) o.valueToday = o.value
  const lessons = protections[incident.slug] || defaultLessons
  const diff = useMemo(() => profileFor(incident), [incident])

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && setActive(Number(entry.target.id.split('-').pop()) - 1)), { threshold: 0.55 })
    document.querySelectorAll(`[data-incident="${incident.slug}"][id^="incident-slide-"]`).forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [incident.slug])

  return <main className="min-h-screen bg-black px-4 py-8 font-['Space_Grotesk'] text-[#ebebeb] selection:bg-[#ccff00] selection:text-black md:px-8">
    <style>{`@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&family=Space+Grotesk:wght@300;400;500;600;700&display=swap'); html { scroll-behavior: smooth; }`}</style>
    <nav className="fixed right-5 top-1/2 z-50 hidden -translate-y-1/2 flex-col gap-3 lg:flex">{ACTS.map((act, i) => <a key={act} href={`#incident-slide-${i + 1}`} className={`size-2.5 rounded-full border transition-all ${active === i ? 'scale-125 border-[#ccff00] bg-[#ccff00]' : 'border-white/30 bg-black'}`} aria-label={act} />)}</nav>
    <div className="mx-auto flex max-w-[1120px] snap-y flex-col gap-12" data-incident={incident.slug}>
      <Slide1 incident={incident} o={o} date={date} />
      <Slide2 incident={incident} o={o} />
      <Slide3 incident={incident} o={o} />
      <Slide4 incident={incident} o={o} diff={diff} />
      <Slide5 incident={incident} lessons={lessons} />
    </div>
  </main>
}
