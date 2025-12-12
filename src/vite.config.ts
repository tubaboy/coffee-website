import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // 修改為 '/' 以適配 Zeabur 的根目錄部署
  base: '/',
})