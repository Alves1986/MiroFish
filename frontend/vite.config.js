import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { mirofishApiPlugin } from './src/server/mirofishApiPlugin.js'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), mirofishApiPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@locales': path.resolve(__dirname, '../locales')
    }
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
    open: false,
    allowedHosts: true
  },
  preview: {
    host: '0.0.0.0',
    port: 3000,
    allowedHosts: true
  }
})

