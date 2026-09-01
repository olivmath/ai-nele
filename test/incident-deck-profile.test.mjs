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
