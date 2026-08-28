import puppeteer from 'puppeteer';
import { readdir } from 'fs/promises';
import { join, basename } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const WIDTH = 1080;
const HEIGHT = 1350;
const SLIDES = 5;

async function generatePDF(browser, htmlFile, outputDir) {
  const name = basename(htmlFile, '.html');
  const pdfPath = join(outputDir, `${name}.pdf`);
  const page = await browser.newPage();

  await page.setViewport({ width: WIDTH, height: HEIGHT, deviceScaleFactor: 2 });
  await page.goto(`file://${htmlFile}`, { waitUntil: 'domcontentloaded', timeout: 15000 });
  await new Promise(r => setTimeout(r, 1000));

  // Disable scaling — render at native 1080x1350
  await page.evaluate(() => {
    const wrapper = document.querySelector('.carousel-wrapper');
    if (wrapper) {
      wrapper.style.transform = 'none';
      wrapper.style.width = '1080px';
    }
  });

  const slides = [];
  for (let i = 0; i < SLIDES; i++) {
    // Navigate to slide
    await page.evaluate((idx) => {
      if (typeof goTo === 'function') goTo(idx);
    }, i);
    await new Promise(r => setTimeout(r, 400)); // wait for transition

    // Screenshot the carousel area
    const carousel = await page.$('.carousel');
    if (carousel) {
      const screenshot = await carousel.screenshot({ type: 'png', encoding: 'binary' });
      slides.push(screenshot);
    }
  }

  // Create PDF with slides as pages
  const pdfPage = await browser.newPage();
  await pdfPage.setViewport({ width: WIDTH, height: HEIGHT });

  const slidesBase64 = slides.map(s => s.toString('base64'));
  await pdfPage.setContent(`
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        @page { size: ${WIDTH}px ${HEIGHT}px; margin: 0; }
        * { margin: 0; padding: 0; }
        body { background: #0a0a0a; }
        .page { width: ${WIDTH}px; height: ${HEIGHT}px; page-break-after: always; display: flex; align-items: center; justify-content: center; }
        .page:last-child { page-break-after: avoid; }
        img { width: 100%; height: 100%; object-fit: contain; }
      </style>
    </head>
    <body>
      ${slidesBase64.map(b64 => `<div class="page"><img src="data:image/png;base64,${b64}"></div>`).join('')}
    </body>
    </html>
  `, { waitUntil: 'load' });

  await pdfPage.pdf({
    path: pdfPath,
    width: `${WIDTH}px`,
    height: `${HEIGHT}px`,
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  });

  await page.close();
  await pdfPage.close();
  console.log(`✓ ${basename(pdfPath)}`);
  return pdfPath;
}

async function main() {
  const projectRoot = join(__dirname, '..');
  const dir = join(projectRoot, 'exports', 'html');
  const outputDir = join(projectRoot, 'exports', 'pdfs');

  // Create output dir
  const { mkdirSync } = await import('fs');
  try { mkdirSync(outputDir, { recursive: true }); } catch {}

  const files = (await readdir(dir))
    .filter(f => f.startsWith('carousel-hack-') && f.endsWith('.html'))
    .sort()
    .map(f => join(dir, f));

  console.log(`Gerando ${files.length} PDFs...`);

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security', '--allow-file-access-from-files'],
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  });

  for (const file of files) {
    try {
      await generatePDF(browser, file, outputDir);
    } catch (err) {
      console.error(`✗ ${basename(file)}: ${err.message}`);
    }
  }

  await browser.close();
  console.log(`\nPDFs salvos em: ${outputDir}`);
}

main().catch(console.error);
