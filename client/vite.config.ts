import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Use React plugin in all *.jsx and *.tsx files
      include: "**/*.{jsx,tsx}",

      // fix for headlessUI
      jsxRuntime: "classic",
    }),
    eslint(),
  ],
  server: {
    port: 3000,
  },
  build: {
    emptyOutDir: true,
    sourcemap: false,
    outDir: "../API/wwwroot",
  },
});
