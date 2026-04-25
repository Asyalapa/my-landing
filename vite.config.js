import { defineConfig } from 'vite';

export default defineConfig({
  // base: '/my-landing/',
  root: '.',
  server: {
    port: 3000,
    open: '/my-landing/'   
  },
  build: {
    minify: 'esbuild',
    outDir: 'dist',
    rollupOptions: {
      input: 'index.html'
    }
  }
});