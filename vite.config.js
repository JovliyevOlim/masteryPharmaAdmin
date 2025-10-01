import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  // base: '/',
  optimizeDeps: {
    include: ['react-icons/fa'],
  },
  resolve: {
    alias: {
      jsvectormap: path.resolve(__dirname, 'node_modules/jsvectormap'),
    },
  },
  plugins: [react()],
});
