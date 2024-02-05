import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: '5173',
    proxy: {
      '/upload': {
        // 后台地址
        target: 'https://api.fcip.top/jealous/',
        changeOrigin: true,
      },
      '/result': {
        // 后台地址
        target: 'http://149.88.72.168:5400/',
        changeOrigin: true,
      },
      '/resultpdf': {
        // 后台地址
        target: 'http://149.88.72.168:5400/',
        changeOrigin: true,
      }
    }
  }
})
