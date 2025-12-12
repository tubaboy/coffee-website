import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, (process as any).cwd(), '')

  return {
    plugins: [react()],
    // 修改為 '/' 以適配 Zeabur 的根目錄部署
    base: '/',
  }
})