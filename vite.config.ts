import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'process.env': {
      NODE_ENV: 'production',
    }
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    lib: {
      entry: './src/index.tsx',
      name: 'widget',
      // formats: ['es', 'umd'],
      fileName: (format) => `widget.${format}.js`
    },
    target: 'esnext',
  }
})
