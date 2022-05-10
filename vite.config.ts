import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import checker from 'vite-plugin-checker'

export default defineConfig({
  plugins: [
    vue(), // https://vitejs.dev/config/
    checker({ vueTsc: true})
  ],
})
