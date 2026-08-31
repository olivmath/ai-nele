import puppeteer from 'puppeteer';
import { mkdirSync, readdirSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';

const PAGE_W = 1280;
const PAGE_H = 960;
const CARD_W = 1120;
const SLIDE_COUNT = 5;
import { homedir } from 'os';
const outputDir = join(homedir(), 'Downloads');

const INCIDENTS = [
  'the-dao', 'parity-wallet', 'beautychain', 'bzx', 'poly-network',
  'cream-finance', 'ronin-bridge', 'akutars-nft', 'nomad-bridge',
  'euler-finance', 'curve-finance',
];

function slideSelector(index) {
  return index === 0
    ? 'section[id^="slide-"]'
    : 'section[id^="incident-slide-"]';
}

async function captureSlides(page, sidebarIndex) {
  await page.evaluate((idx) => {
    document.querySelectorAll('.sidebar-item')[idx]?.click();
  }, sidebarIndex);
  await new Promise(r => setTimeout(r, 2000));

  await page.evaluate(() => {
    document.querySelectorAll('.sidebar, .menu-toggle, nav.fixed, .sidebar-backdrop').forEach(el => {
      el.style.display = 'none';
    });
  });

  const sel = slideSelector(sidebarIndex);
  const slides = [];

  for (let i = 0; i < SLIDE_COUNT; i++) {
    const els = await page.$$(sel);
    if (!els[i]) break;
    const screenshot = await els[i].screenshot({ type: 'png' });
    const box = await els[i].boundingBox();
    slides.push({
      b64: Buffer.from(screenshot).toString('base64'),
      w: Math.round(box.width),
      h: Math.round(box.height),
    });
  }
  return slides;
}

async function buildPdf(browser, slides, outputPath) {
  const pdfPage = await browser.newPage();
  await pdfPage.setViewport({ width: PAGE_W, height: PAGE_H });

  const pages = slides.map(({ b64, w, h }) => {
    const scale = Math.min(CARD_W / w, (PAGE_H - 80) / h);
    const imgW = Math.round(w * scale);
    const imgH = Math.round(h * scale);
    return `<div class="page"><img src="data:image/png;base64,${b64}" style="width:${imgW}px;height:${imgH}px;"></div>`;
  }).join('');

  await pdfPage.setContent(`<!DOCTYPE html><html><head><style>
    @page { size: ${PAGE_W}px ${PAGE_H}px; margin: 0; }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { background: #000; }
    .page {
      width: ${PAGE_W}px;
      height: ${PAGE_H}px;
      display: flex;
      align-items: center;
      justify-content: center;
      page-break-after: always;
    }
    .page:last-child { page-break-after: avoid; }
    img { display: block; }
  </style></head><body>${pages}</body></html>`, { waitUntil: 'load' });

  await pdfPage.pdf({
    path: outputPath,
    width: `${PAGE_W}px`,
    height: `${PAGE_H}px`,
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  });

  await pdfPage.close();
}

async function main() {
  const args = process.argv.slice(2);
  const PORT = process.env.PORT || '5173';
  const url = `http://localhost:${PORT}/`;

  let targets;
  if (args.includes('--all')) {
    targets = INCIDENTS.map((slug, i) => ({ slug, index: i }));
  } else if (args.length > 0) {
    targets = args.filter(a => !a.startsWith('--')).map(slug => {
      const index = INCIDENTS.indexOf(slug);
      if (index === -1) { console.error(`✗ incidente desconhecido: ${slug}`); process.exit(1); }
      return { slug, index };
    });
  } else {
    console.log(`Uso: node gen-pdf.mjs <slug> [slug...] | --all\n\nIncidentes: ${INCIDENTS.join(', ')}`);
    process.exit(0);
  }

  mkdirSync(outputDir, { recursive: true });

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  });

  const page = await browser.newPage();
  await page.setViewport({ width: PAGE_W, height: 4000, deviceScaleFactor: 2 });
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 15000 });
  await page.evaluate(async () => { await document.fonts.ready; });

  for (const { slug, index } of targets) {
    const num = String(index + 1).padStart(2, '0');
    const output = join(outputDir, `carousel-hack-${num}-${slug}.pdf`);
    console.log(`\n📄 ${slug}`);

    const slides = await captureSlides(page, index);
    console.log(`  ${slides.length} slides (${slides.map(s => `${s.w}×${s.h}`).join(', ')})`);

    await buildPdf(browser, slides, output);
    console.log(`  ✓ ${output}`);
  }

  await browser.close();
  console.log('\n✓ Concluído');
}

main().catch(console.error);
