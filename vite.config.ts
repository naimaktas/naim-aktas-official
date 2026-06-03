import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { jsxLocPlugin } from "@builder.io/vite-plugin-jsx-loc";
import path from "node:path";

const PROJECT_ROOT = import.meta.dirname;

export default defineConfig(({ mode }) => {
  // Sadece geliştirme ortamında (dev) çalışan eklentileri ayır
  const isDev = mode === 'development';
  
  const plugins = [
    react(), 
    tailwindcss(), 
    jsxLocPlugin(),
  ];

  return {
    base: "/naimaktas-official/",
    plugins,
    resolve: {
      alias: {
        "@": path.resolve(PROJECT_ROOT, "client", "src"),
        "@shared": path.resolve(PROJECT_ROOT, "shared"),
        "@assets": path.resolve(PROJECT_ROOT, "attached_assets"),
      },
    },
    root: path.resolve(PROJECT_ROOT, "client"),
    build: {
      outDir: path.resolve(PROJECT_ROOT, "dist/public"),
      emptyOutDir: true,
      sourcemap: false, // Prod'da dosya boyutunu küçültür
    },
    // Server ayarları sadece npm run dev için geçerlidir, build'i etkilemez.
    server: {
      port: 3000,
    }
  };
});
