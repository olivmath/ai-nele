import puppeteer from 'puppeteer'
import { mkdir } from 'node:fs/promises'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const width = 1120
const height = 630
const slideCount = 5
const root = join(fileURLToPath(new URL('..', import.meta.url)))
const outputDir = join(root, 'exports', 'pdfs')
const outputPath = join(outputDir, 'the-dao-smartcontract-carousel.pdf')
const appUrl = process.env.CAROUSEL_URL ?? 'http://127.0.0.1:4173'

await mkdir(outputDir, { recursive: true })

const browser = await puppeteer.launch({
  headless: true,
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
})

try {
  const page = await browser.newPage()
  page.on('pageerror', error => console.error(`Browser error: ${error.message}`))
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 })
  await page.goto(appUrl, { waitUntil: 'networkidle0', timeout: 30_000 })
  await page.evaluate(async () => { await document.fonts.ready })
  await page.waitForSelector('#slide-1', { timeout: 10_000 })

  const slides = []
  for (let index = 1; index <= slideCount; index += 1) {
    const selector = `#slide-${index}`
    const slide = await page.$(selector)
    if (!slide) throw new Error(`Slide ${index} não encontrado: ${selector}`)
    slides.push(await slide.screenshot({ type: 'png', encoding: 'base64' }))
  }

  const pdfPage = await browser.newPage()
  await pdfPage.setViewport({ width, height })
  await pdfPage.setContent(`<!doctype html>
    <html><head><style>
      @page { size: ${width}px ${height}px; margin: 0; }
      * { box-sizing: border-box; margin: 0; }
      .page { width: ${width}px; height: ${height}px; break-after: page; }
      .page:last-child { break-after: auto; }
      img { display: block; width: 100%; height: 100%; }
    </style></head><body>
      ${slides.map(image => `<div class="page"><img src="data:image/png;base64,${image}"></div>`).join('')}
    </body></html>`, { waitUntil: 'load' })

  await pdfPage.pdf({
    path: outputPath,
    width: `${width}px`,
    height: `${height}px`,
    printBackground: true,
    preferCSSPageSize: true,
  })

  console.log(outputPath)
} finally {
  await browser.close()
}
