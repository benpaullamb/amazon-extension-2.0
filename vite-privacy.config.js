import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  root: './src/privacy-policy',
  base: '/amazon-extension-2.0/',
  build: {
    outDir: '../../docs',
    assetsDir: './',
  },
});
