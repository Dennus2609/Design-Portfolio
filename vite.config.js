import { defineConfig } from 'vite'

export default defineConfig({
  // Base public path when served in production
  base: '/',
  // Build configuration
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // Generate source maps for better debugging
    sourcemap: true,
    // Copy all HTML files
    rollupOptions: {
      input: {
        main: '/index.html',
        about: '/about.html',
        polygon: '/polygon.html',
        projects: '/projects/**/*.html'
      }
    }
  }
}) 
