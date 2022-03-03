import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: resolve(__dirname, 'src/popup/index.html'),
      output: {
        entryFileNames: 'popup.js',
        format: 'es',
      },
    },
  },
});
