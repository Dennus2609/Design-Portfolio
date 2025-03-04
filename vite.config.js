import { defineConfig } from 'vite';
import { glob } from 'glob';
import { resolve } from 'path';

// Find all HTML files in the root and projects directory
const htmlPages = {};
const htmlFiles = [...glob.sync('*.html'), ...glob.sync('projects/*.html')];

htmlFiles.forEach(file => {
  const name = file.split('/').pop().replace('.html', '');
  htmlPages[name] = resolve(__dirname, file);
});

export default defineConfig({
  build: {
    rollupOptions: {
      input: htmlPages
    },
    // Keep output readable for debugging if needed
    minify: false
  },
  // Ensure font files are handled correctly
  assetsInclude: ['**/*.woff', '**/*.woff2', '**/*.eot', '**/*.ttf', '**/*.otf']
}); 
