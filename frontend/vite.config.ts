import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
    },
  },
  resolve: {
    alias: {
        '@layouts': resolve(__dirname, 'src/layouts'),
        '@components': resolve(__dirname, 'src/components'),
        '@pages': resolve(__dirname, 'src/pages'),
        '@icons': resolve(__dirname, 'src/icons'),
        '@images': resolve(__dirname, 'src/assets/images'),
        '@router': resolve(__dirname, 'src/router'),
        '@assets': resolve(__dirname, 'src/assets'),
        '@store': resolve(__dirname, 'src/store'),
        '@types': resolve(__dirname, 'src/types'),
        '@lib': resolve(__dirname, 'src/lib'),
        '@profile': resolve(__dirname, 'src/pages/profile'),
        '@services': resolve(__dirname, 'src/services'),
    },
  },
})
