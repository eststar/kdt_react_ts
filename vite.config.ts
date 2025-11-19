import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwind from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwind(),],
  server: {
    proxy: {
      '/dataApi': {
        target: 'https://apis.data.go.kr',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/dataApi/, ''),
        secure: false,
      },
      '/kobisopenapi': {
        target: 'https://kobis.or.kr/kobisopenapi',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/kobisopenapi/, ''),
        secure: false,
      }
    }
  }
})
