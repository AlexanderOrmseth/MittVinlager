import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Use React plugin in all *.jsx and *.tsx files
      include: "**/*.{jsx,tsx}",

      // fix for headlessUI
      jsxRuntime: "classic"
    }),
    eslint()
  ],
  resolve: {
    alias: { "@": path.join(__dirname, "src") }
  },
  server: {
    port: 3000
  },
  build: {
    emptyOutDir: true,
    sourcemap: false,
    outDir: "../API/wwwroot"
  }
});
