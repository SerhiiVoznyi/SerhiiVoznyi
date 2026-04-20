import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'

const config = defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/_mantine";`,
      },
    },
  },
  optimizeDeps: {
    include: ['react-router-dom'],
  },
})

export default config
