import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import compression from 'vite-plugin-compression'

const deviceServer = 'http://127.0.0.1:8080'

export default defineConfig({
  plugins: [
    preact(),
    compression({ algorithm: 'gzip', verbose: false, deleteOriginFile: true })
  ],
  server: {
    proxy: {
      '/api': {
        target: deviceServer,
        changeOrigin: true,
      }
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: undefined,
        inlineDynamicImports: true,
        entryFileNames: 'assets/app.js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]'
      }
    }
  }
})
