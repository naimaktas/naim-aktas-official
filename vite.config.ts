import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from "node:path";

const PROJECT_ROOT = import.meta.dirname;

export default defineConfig({
  // Buradaki base ayarı hayati önem taşıyor, tam olarak böyle olmalı
  base: "/naim-aktas-official/",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(PROJECT_ROOT, "client", "src"),
    },
  },
  root: path.resolve(PROJECT_ROOT, "client"),
  build: {
    outDir: path.resolve(PROJECT_ROOT, "dist"), // public klasörünü çıkardık, doğrudan dist'e yazsın
    emptyOutDir: true,
  },
});
