import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import eslint from 'vite-plugin-eslint';

export default defineConfig(() => {
  return {
    build: {
      outDir: "build",
      chunkSizeWarningLimit: 3000
    },
    test: {
      css: true,
      setupFiles: './src/setupTests.ts',
      globals: true,
      environment: "jsdom",
      coverage: {
        provider: 'istanbul' // or 'c8'
      },
    },
    plugins: [
      react(),
      eslint(),
      VitePWA({
        registerType: "prompt",
        includeAssets: ["*.ico", "*.svg", "*.png"],
        workbox: {
          globPatterns: ['**/*.{js,css,html}', '**/*.{svg,png,jpg,gif}'],
          maximumFileSizeToCacheInBytes: 3000000,
        },
      }),
    ],
  };
});