import { build } from 'esbuild'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { join, resolve } from 'node:path'

const root = resolve(import.meta.dirname)
const dataDir = join(root, 'data')
const outDir = join(root, 'dist')
const exportDir = join(root, 'exports', 'html')

function extractSlides(source) {
  const start = source.indexOf('<div class="slides">')
  if (start < 0) throw new Error('Missing .slides container')
  const fragment = source.slice(start); const slides = []; let cursor = 0
  while (true) {
    const open = fragment.indexOf('<div class="slide">', cursor); if (open < 0) break
    let depth = 0; let close = -1; const tags = /<\/?div\b[^>]*>/g; tags.lastIndex = open
    for (let match; (match = tags.exec(fragment));) { depth += match[0].startsWith('</') ? -1 : 1; if (depth === 0) { close = tags.lastIndex; break } }
    if (close < 0) throw new Error('Unclosed slide')
    const outer = fragment.slice(open, close); slides.push(outer.slice(outer.indexOf('>') + 1, outer.lastIndexOf('</div>'))); cursor = close
  }
  if (slides.length !== 5) throw new Error(`Expected 5 slides, found ${slides.length}`)
  return slides
}

const manifest = {
  '01-the-dao':['the-dao','The DAO','REPORT 01'],'02-parity-wallet':['parity-wallet','Parity Wallet','REPORT 02'],'03-beautychain':['beautychain','BeautyChain','REPORT 03'],'04-bzx':['bzx','bZx','REPORT 04'],'05-poly-network':['poly-network','Poly Network','REPORT 05'],'06-cream-finance':['cream-finance','Cream Finance','REPORT 06'],'07-ronin-bridge':['ronin-bridge','Ronin Bridge','REPORT 07'],'08-akutars-nft':['akutars-nft','Akutars','REPORT 08'],'09-nomad-bridge':['nomad-bridge','Nomad Bridge','REPORT 09'],'10-euler-finance':['euler-finance','Euler Finance','REPORT 10'],'11-curve-finance':['curve-finance','Curve Finance','REPORT 11'],
}

await mkdir(dataDir,{recursive:true}); await mkdir(outDir,{recursive:true}); await mkdir(exportDir,{recursive:true})
const daoAdapter = join(root, 'src', 'components', 'dao-adapters.jsx')
await build({
  entryPoints:[join(root,'src','main.jsx')],
  outfile:join(outDir,'app.js'),
  bundle:true,
  format:'iife',
  platform:'browser',
  jsx:'automatic',
  minify:true,
  loader:{ '.png':'dataurl' },
  alias:{
    '@smartcontract-dao-slides':join(root, 'src', 'components', 'SmartcontractDaoSlides.tsx'),
    '@book-cover':'/Users/olivmath/orca/workspaces/linkedin-api/scoter/linkedin/landing-pages/livro/assets/social-proofs/book-cover.png',
    'lucide-react':daoAdapter,
    '@/components/ui/badge':daoAdapter,
    '@/components/ui/button':daoAdapter,
    '@/components/ui/card':daoAdapter,
    '@/components/ui/separator':daoAdapter,
    'react':join(root, 'node_modules', 'react'),
    'react/jsx-runtime':join(root, 'node_modules', 'react', 'jsx-runtime.js'),
  },
})
for (const [key,[slug,name,report]] of Object.entries(manifest)) {
  const dataPath=join(dataDir,`${slug}.json`); const carousel=JSON.parse(await readFile(dataPath,'utf8'))
  const safe=JSON.stringify(carousel).replace(/</g,'\\u003c')
  await writeFile(join(exportDir,`carousel-hack-${key}.html`),`<!doctype html><html lang="pt-BR"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>${name} — Security Incident</title><link rel="stylesheet" href="../../dist/app.css"></head><body><div id="root"></div><script>window.CAROUSEL_DATA=${safe}</script><script src="../../dist/app.js"></script></body></html>`)
  console.log(`✓ carousel-hack-${key}.html`)
}
