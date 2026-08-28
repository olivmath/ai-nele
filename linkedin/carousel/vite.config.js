import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'lucide-react': '/Users/olivmath/orca/workspaces/linkedin-api/scoter/linkedin/carousel/src/components/dao-adapters.jsx',
      '@/components/ui/badge': '/Users/olivmath/orca/workspaces/linkedin-api/scoter/linkedin/carousel/src/components/dao-adapters.jsx',
      '@/components/ui/button': '/Users/olivmath/orca/workspaces/linkedin-api/scoter/linkedin/carousel/src/components/dao-adapters.jsx',
      '@/components/ui/card': '/Users/olivmath/orca/workspaces/linkedin-api/scoter/linkedin/carousel/src/components/dao-adapters.jsx',
      '@/components/ui/separator': '/Users/olivmath/orca/workspaces/linkedin-api/scoter/linkedin/carousel/src/components/dao-adapters.jsx',
      '@smartcontract-dao-slides': '/Users/olivmath/orca/workspaces/linkedin-api/scoter/linkedin/carousel/src/components/SmartcontractDaoSlides.tsx',
      '@book-cover': '/Users/olivmath/orca/workspaces/linkedin-api/scoter/linkedin/landing-pages/livro/assets/social-proofs/book-cover.png',
      react: '/Users/olivmath/orca/workspaces/linkedin-api/scoter/linkedin/carousel/node_modules/react',
      'react/jsx-runtime': '/Users/olivmath/orca/workspaces/linkedin-api/scoter/linkedin/carousel/node_modules/react/jsx-runtime.js',
    },
  },
  server: {
    fs: {
      allow: [
        '/Users/olivmath/orca/workspaces/linkedin-api/scoter/linkedin/carousel',
        '/Users/olivmath/orca/workspaces/linkedin-api/scoter/linkedin/landing-pages/livro/assets/social-proofs',
      ],
    },
  },
})
