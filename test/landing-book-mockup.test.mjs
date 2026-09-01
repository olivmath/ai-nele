import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const sourcePath = new URL('../landing-pages/livro/index.html', import.meta.url)

test('keeps the compact offer book depth proportional to the hero mockup', async () => {
  const source = await readFile(sourcePath, 'utf8')

  assert.match(source, /\.book-3d-sm \.book-3d-front \{\s*transform: translateZ\(12px\);\s*\}/)
  assert.match(source, /\.book-3d-sm \.book-3d-back \{\s*transform: translateZ\(-12px\);\s*\}/)
})
