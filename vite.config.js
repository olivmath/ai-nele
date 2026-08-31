import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'

const root = resolve(import.meta.dirname)
const daoAdapter = resolve(root, 'src/components/dao-adapters.jsx')

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'lucide-react': daoAdapter,
      '@/components/ui/badge': daoAdapter,
      '@/components/ui/button': daoAdapter,
      '@/components/ui/card': daoAdapter,
      '@/components/ui/separator': daoAdapter,
      '@smartcontract-dao-slides': resolve(root, 'src/pages/carousel/SmartcontractDaoSlides.tsx'),
      '@book-cover': resolve(root, 'landing-pages/livro/assets/social-proofs/book-cover.png'),
      '@book-mockup': resolve(root, 'landing-pages/livro/assets/book-cover-mockup.png'),
    },
  },
  server: {
    fs: {
      allow: [root],
    },
  },
  publicDir: 'public',
})
