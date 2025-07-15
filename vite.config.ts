import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
// 配置sourceMap
// https://cn.vitejs.dev/config/#build-sourcemap

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  server: {
    proxy: {
      '/react-admin-api': {
        target: 'http://localhost:3000/api/v1',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/react-admin-api/, '/react-admin-api')
      }
    }
  }
})
