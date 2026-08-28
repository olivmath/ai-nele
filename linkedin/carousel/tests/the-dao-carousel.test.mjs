import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const dataUrl = new URL('../data/the-dao.json', import.meta.url)
const stylesUrl = new URL('../src/styles.css', import.meta.url)

async function readCarousel() {
  return JSON.parse(await readFile(dataUrl, 'utf8'))
}

async function readStyles() {
  return readFile(stylesUrl, 'utf8')
}

function assertSectionClassTokens(html, ...tokens) {
  const sectionClass = html.match(/<section\s+class="([^"]*)"/)
  assert.ok(sectionClass, 'Each panel must begin with a section carrying layout classes')
  const classes = new Set(sectionClass[1].trim().split(/\s+/))

  for (const token of tokens) {
    assert.ok(classes.has(token), `Panel section must include the ${token} class token`)
  }
}

test('The DAO exposes a five-panel incident narrative with dedicated layout hooks', async () => {
  const carousel = await readCarousel()

  assert.equal(carousel.slug, 'the-dao')
  assert.ok(carousel.theme, 'The DAO must declare its landing-page visual tokens')
  assert.equal(carousel.theme.background, '#0a0a0a')
  assert.equal(carousel.theme.accent, '#ccff00')
  assert.deepEqual(carousel.theme.fonts, ['Space Grotesk', 'JetBrains Mono'])

  assert.deepEqual(
    carousel.slides.map(({ id, narrative }) => [id, narrative]),
    [
      ['impact', 'cover'],
      ['protocol', 'protocol'],
      ['vulnerability', 'vulnerability'],
      ['reentrancy', 'reentrancy'],
      ['hard-fork', 'hard-fork'],
    ],
  )

  for (const slide of carousel.slides) {
    assertSectionClassTokens(slide.html, 'dao-slide', `dao-slide--${slide.id}`)
  }
})

test('The DAO keeps the incident evidence that makes each narrative panel meaningful', async () => {
  const carousel = await readCarousel()
  assert.ok(
    carousel.slides.every((slide) => typeof slide === 'object' && typeof slide.html === 'string'),
    'Each panel must be structured as an exportable slide object',
  )
  const [impact, protocol, vulnerability, reentrancy, hardFork] = carousel.slides

  assert.match(impact.html, /3,641,694[\s\S]*ETH/)
  assert.match(protocol.html, /splitDAO\(\)/)
  assert.match(vulnerability.html, /msg\.sender\.call\.value\(balance\)\(\)/)
  assert.match(reentrancy.html, /REENTRA\s*→\s*SACA\s*→\s*REENTRA\s*→\s*SACA/)
  assert.match(hardFork.html, /Ethereum Classic/)
})

test('The DAO retains the legacy layout hooks behind every rebuilt panel', async () => {
  const carousel = await readCarousel()
  const legacyLayouts = {
    impact: 'td--cover',
    protocol: 'td--protocol',
    vulnerability: 'td--trace',
    reentrancy: 'td--reentry',
    'hard-fork': 'td--fork',
  }

  for (const slide of carousel.slides) {
    const layoutHook = legacyLayouts[slide.id]
    assertSectionClassTokens(slide.html, 'dao-slide', `dao-slide--${slide.id}`, layoutHook)
  }
})

test('IDE styling stays scoped to code blocks while The DAO inline code resets to inline flow', async () => {
  const styles = await readStyles()

  assert.doesNotMatch(
    styles,
    /\.slide-content\s+code\s*[{,]/,
    'Inline code must not share the IDE block selector',
  )
  assert.match(styles, /\.slide-content\s+\.code-block\s*\{/, 'IDE styling must remain scoped to .code-block')

  const inlineCodeRule = styles.match(/\.dao-slide\s+code\s*\{([^}]*)\}/)
  assert.ok(inlineCodeRule, 'The DAO must explicitly reset inline code styling')
  assert.match(inlineCodeRule[1], /display:\s*inline\s*;/, 'The DAO inline code must remain in text flow')
})
