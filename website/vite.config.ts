import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/_mantine";`,
      },
    },
  },
  optimizeDeps: {
    include: ["react-router-dom"],
  },
});
