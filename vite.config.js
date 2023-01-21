import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: "localhost",
    port: "1312",
    open: true,
    proxy: {
      '/api': {
        target: "http://localhost:80/",
        // target: "http://192.168.0.109:80/",
        // target: "http://124.221.59.16:80/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/api/, '')
      }
    }
  },
})
