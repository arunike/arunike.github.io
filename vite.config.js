import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: { 
    chunkSizeWarningLimit: 1600, 
    outDir: 'build',
  },
  server: {
    port: 3000,
  }
})
