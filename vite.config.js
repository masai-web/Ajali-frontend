import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    port: 5173, 
    https: {
      key: './ajalifrontend-privateKey.key',
      cert: './ajalifrontend.crt',
    }
  },
  plugins: [react()],
  define: {
    global: 'globalThis'
  }
})