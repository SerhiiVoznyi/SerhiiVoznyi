import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'

const config = defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['react-router-dom'],
  },
})

export default config
