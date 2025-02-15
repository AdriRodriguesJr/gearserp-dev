import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,  // Porta do servidor de desenvolvimento
    proxy: {
      '/api': {
        target: 'http://localhost:3000',  // Redireciona requisições /api para o backend
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    outDir: 'dist',  // Pasta de saída da build de produção
    emptyOutDir: true,  // Limpa a pasta de saída antes de gerar a build
    sourcemap: false,  // Desabilita sourcemaps em produção (opcional)
    minify: 'terser',  // Minifica o código para produção
  },
});