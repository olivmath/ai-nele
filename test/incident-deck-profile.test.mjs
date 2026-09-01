import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const sourcePath = new URL('../src/pages/carousel/IncidentDeck.jsx', import.meta.url)

test('renders the Lucas profile card in every incident slide shell', async () => {
  const source = await readFile(sourcePath, 'utf8')

  assert.match(source, /function ProfileSignature\(/)
  assert.match(source, /<ProfileSignature\s*\/>/)
  assert.match(source, /Lucas Bispo de Oliveira/)
  assert.match(source, /Senior Blockchain Engineer/)
  assert.match(source, /lucas-profile\.jpeg/)
  assert.match(source, /size-20 shrink-0/)
})

test('explains the bZx exploit with the WBTC price manipulation', async () => {
  const source = await readFile(new URL('../src/data/carousel/content/bzx.json', import.meta.url), 'utf8')

  assert.match(source, /1\.300 ETH/)
  assert.match(source, /5\.637 ETH/)
  assert.match(source, /preço do WBTC explode quase 3x/)
  assert.match(source, /posição já nasce subcolateralizada/)
  assert.match(source, /vende 112 WBTC no pico/)
  assert.doesNotMatch(source, /compra ETH massivamente/)
  assert.doesNotMatch(source, /liquida a posição errada/)
})

test('shows the bZx margin and slippage safeguards in slide 4', async () => {
  const source = await readFile(new URL('../src/data/carousel/content/bzx.json', import.meta.url), 'utf8')

  assert.match(source, /execução a qualquer preço/)
  assert.match(source, /minRate/)
  assert.match(source, /_isPositionHealthy/)
  assert.match(source, /posição que já nascia quebrada/)
})
