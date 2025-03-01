import { defineConfig } from 'vite'
import { resolve } from 'path'
import glob from 'glob'

// Get all HTML files
const htmlFiles = glob.sync('**/*.html', {
  ignore: ['dist/**', 'node_modules/**']
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
      input: htmlFiles
    }
  }
}) 
