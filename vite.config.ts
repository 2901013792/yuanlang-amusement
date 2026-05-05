import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    strictPort: true,
    proxy: {
      '/tcb-api': {
        target: 'https://tcb.tencentcloudapi.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/tcb-api/, ''),
      },
    },
  },
})
