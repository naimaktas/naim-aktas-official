import { jsxLocPlugin } from "@builder.io/vite-plugin-jsx-loc";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";
import { vitePluginManusRuntime } from "vite-plugin-manus-runtime";

const PROJECT_ROOT = import.meta.dirname;

export default defineConfig({
  // GitHub Pages için kritik:
  base: '/naim-aktas-official/', 
  
  plugins: [
    react(), 
    tailwindcss(), 
    jsxLocPlugin(), 
    vitePluginManusRuntime()
  ],
  
  resolve: {
    alias: {
      "@": path.resolve(PROJECT_ROOT, "client", "src"),
      "@shared": path.resolve(PROJECT_ROOT, "shared"),
      "@assets": path.resolve(PROJECT_ROOT, "attached_assets"),
    },
  },
  
  root: path.resolve(PROJECT_ROOT, "client"),
  
  build: {
    // GitHub Pages'ın dosyaları bulabilmesi için dist/public yerine dist kullanalım
    outDir: path.resolve(PROJECT_ROOT, "dist"), 
    emptyOutDir: true,
  },
});
