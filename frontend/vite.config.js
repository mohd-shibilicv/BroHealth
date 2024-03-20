import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build', // Change the output directory for the production build
    sourcemap: true, // Generate source maps for the production build (set to false to disable)
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'), // Specify the entry point for the production build
      },
      output: {
        manualChunks: {
          // Split vendor modules into separate chunks
          vendor: ['react', 'react-dom'],
        },
      },
    },
  },
  define: {
    // Define environment variables for the production build
    'process.env.NODE_ENV': JSON.stringify('production'),
    'process.env.API_URL': JSON.stringify('http://127.0.0.1:8000/'),
  },
})
