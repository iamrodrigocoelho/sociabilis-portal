import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { blogPlugin } from './scripts/vite-plugin-blog.ts'

export default defineConfig({
  plugins: [react(), blogPlugin()],
  build: {
    // Usado por scripts/prerender.js para gerar <link rel="modulepreload"> por rota.
    manifest: true,
  },
  server: {
    proxy: {
      '/api': 'http://localhost:3001',
    },
  },
})
