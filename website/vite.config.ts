import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'

import { journal } from './plugins/journal'

const config = defineConfig({
  plugins: [react(), journal()],
  resolve: {
    tsconfigPaths: true,
  },
  optimizeDeps: {
    include: ['react-router-dom'],
  },
})

export default config
