import { ArrowRight, Card, CardContent } from '../../components/dao-adapters'
import bookMockup from '@book-mockup'

export function BookCta() {
  return <Card className="relative overflow-hidden rounded-[2rem] border border-[#ccff00]/25 bg-gradient-to-br from-[#ccff00]/10 to-white/[0.025] text-white shadow-[0_0_50px_rgba(204,255,0,.08)]">
    <CardContent className="relative flex h-full flex-col p-7 md:p-8">
      <span className="w-fit rounded-full bg-[#ccff00] px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-black">Leitura recomendada</span>
      <div className="relative my-5 flex flex-1 items-center justify-center overflow-hidden rounded-2xl border border-[#ccff00]/15 bg-black/30">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(204,255,0,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(204,255,0,.05)_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute size-48 rounded-full bg-[#ccff00]/20 blur-3xl" />
        <img src={bookMockup} alt="Mockup 3D do livro Smartcontract Engineer — Solidity" className="relative z-10 max-h-[17rem] max-w-[14rem] drop-shadow-[0_26px_24px_rgba(0,0,0,.68)]" />
      </div>
      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#ccff00]">Smartcontract Engineer · edição física</p>
      <h3 className="mt-3 text-center text-2xl font-bold leading-[1.05] tracking-tight">Aprenda Solidity do jeito certo e não seja <span className="text-red-500">hackeado.</span></h3>
      <a href="https://soliditybook.vercel.app" target="_blank" rel="noreferrer" className="mt-5 inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-full bg-[#ccff00] px-5 py-3 font-bold text-black shadow-[0_0_30px_rgba(204,255,0,.25)] transition-colors hover:bg-[#dcff4d]">Garantir meu exemplar <ArrowRight className="size-4" /></a>
    </CardContent>
  </Card>
}
