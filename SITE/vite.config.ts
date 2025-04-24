import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      "@assets": path.resolve(__dirname, './src/assets'),
      "@components": path.resolve(__dirname, './src/components'),
      "@context": path.resolve(__dirname, './src/context'),
      "@hooks": path.resolve(__dirname, './src/hooks'),
      "@pages": path.resolve(__dirname, './src/pages'),
      "@routes": path.resolve(__dirname, './src/routes'),
      "@services": path.resolve(__dirname, './src/services'),
      "@types": path.resolve(__dirname, './src/types'),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000/api', // Your backend server
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  }
});
