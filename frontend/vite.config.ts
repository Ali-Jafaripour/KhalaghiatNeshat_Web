import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.woff', '**/*.woff2', '**/*.ttf'], 
  resolve: {
    alias: {
      '@': '/src', 
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor'; 
          }
        }
      }
    },
    chunkSizeWarningLimit: 1000, 
  }
})
