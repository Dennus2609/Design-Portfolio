import { defineConfig } from 'vite'
import { resolve } from 'path'
import glob from 'glob'

// Get all HTML files
const htmlFiles = glob.sync('**/*.html', {
  ignore: ['dist/**', 'node_modules/**', 'portfolio/**', 'For reference/**']
}).reduce((acc, file) => {
  const name = file.replace('.html', '')
  acc[name] = resolve(__dirname, file)
  return acc
}, {})

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
      input: htmlFiles,
      output: {
        dir: 'dist',
        assetFileNames: (assetInfo) => {
          let extType = assetInfo.name.split('.')[1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            extType = 'img';
          } else if (/mp4|webm|ogg/i.test(extType)) {
            extType = 'video';
          }
          return `assets/${extType}/[name]-[hash][extname]`;
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
      }
    },
    // Preserve all file structure
    copyPublicDir: true
  }
}) 
