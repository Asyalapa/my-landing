import { defineConfig } from 'vite';

export default defineConfig({
  // base: '/my-landing/',
  root: '.',
  build: {
    minify: 'esbuild',
    outDir: 'dist',
    rollupOptions: {
      input: 'index.html'
    }
  },
  server: {
    port: 3000,
  },
  preview: {
    port: 4173,
    strictPort: true
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "scss/variables" as *;`
      }
    }
  }
});