import { defineConfig } from 'vite'
import { resolve } from 'path'

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
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        polygon: resolve(__dirname, 'polygon.html'),
        swoosh: resolve(__dirname, 'projects/swoosh.html'),
        itsfreedubai: resolve(__dirname, 'projects/itsfreedubai.html'),
        architecture: resolve(__dirname, 'projects/architecture.html'),
        music: resolve(__dirname, 'projects/music.html'),
        motionGraphics: resolve(__dirname, 'projects/motion-graphics.html')
      }
    }
  }
}) 
