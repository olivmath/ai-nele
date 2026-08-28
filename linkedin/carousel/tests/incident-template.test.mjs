import assert from 'node:assert/strict'
import { readdir, readFile } from 'node:fs/promises'
import test from 'node:test'

const dataDirectory = new URL('../data/', import.meta.url)
const deckUrl = new URL('../src/components/IncidentDeck.jsx', import.meta.url)

test('every security case is rendered through the five-act incident template', async () => {
  const files = (await readdir(dataDirectory)).filter((file) => file.endsWith('.json'))
  assert.equal(files.length, 11)

  for (const file of files) {
    const incident = JSON.parse(await readFile(new URL(file, dataDirectory), 'utf8'))
    assert.equal(incident.slides.length, 5, `${incident.name} must retain five narrative sources`)
    assert.ok(incident.name && incident.report && incident.slug, `${file} requires incident identity`)
  }

  const deck = await readFile(deckUrl, 'utf8')
  for (const act of ['impact', 'contexto', 'mecanismo do ataque', 'pull request · correção', 'aprendizados']) {
    assert.match(deck, new RegExp(act), `template must expose the ${act} act`)
  }
  assert.match(deck, /SecurityDiff/, 'every case must use the shared PR diff component')
  assert.match(deck, /Garantir meu exemplar/, 'every case must use the rigid book CTA')
})
