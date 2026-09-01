import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const sourcePath = new URL('../src/pages/carousel/SmartcontractDaoSlides.tsx', import.meta.url)

test('renders Lucas profile signature in every The DAO slide shell', async () => {
  const source = await readFile(sourcePath, 'utf8')

  assert.match(source, /function ProfileSignature\(/)
  assert.match(source, /<ProfileSignature\s*\/>/)
  assert.match(source, /Lucas Bispo de Oliveira/)
  assert.match(source, /Senior Blockchain Engineer<\/p>/)
  assert.doesNotMatch(source, /OnePercent\.io/)
  assert.match(source, /lucas-profile\.jpeg/)
  assert.doesNotMatch(source, />PERFIL<\/span>/)
  assert.match(source, /size-20 shrink-0/)
  assert.match(source, /object-contain/)
})
