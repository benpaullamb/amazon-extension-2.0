import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: resolve(__dirname, 'src/content-script/index.html'),
      output: {
        entryFileNames: 'content-script.js',
        format: 'umd',
      },
    },
  },
});
