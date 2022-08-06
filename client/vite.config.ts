import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [eslint(), react()],
  server: {
    port: 3000,
  },
  build: {
    emptyOutDir: true,
    outDir: "../API/wwwroot",
  },
});
