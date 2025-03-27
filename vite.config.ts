import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
      '@': path.resolve(__dirname, 'src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        sourceMap: true,
        quietDeps: true,
        additionalData: `@import "@/scss/bootstrap-requires";`,
      },
    },
  },

  plugins: [react()],
  define: {
    'process.env': process.env,
  },
})
