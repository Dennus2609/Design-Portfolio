import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Simple function to copy a directory
function copyDirectory(source, destination) {
  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination, { recursive: true });
  }

  const files = fs.readdirSync(source);
  
  for (const file of files) {
    const sourcePath = path.join(source, file);
    const destPath = path.join(destination, file);
    
    const stat = fs.statSync(sourcePath);
    
    if (stat.isDirectory()) {
      copyDirectory(sourcePath, destPath);
    } else {
      fs.copyFileSync(sourcePath, destPath);
    }
  }
}

// Copy public directory for the resume PDF
if (fs.existsSync('public')) {
  console.log('Copying public directory to dist...');
  copyDirectory('public', 'dist/public');
}

// Ensure the resume PDF is available and in the correct location
const resumePathInDist = 'dist/public/Dennis George Mathew - 2025 Resume.pdf';
if (!fs.existsSync(resumePathInDist) && fs.existsSync('dist/Dennis George Mathew - 2025 Resume.pdf')) {
  // Create public directory if it doesn't exist
  if (!fs.existsSync('dist/public')) {
    fs.mkdirSync('dist/public', { recursive: true });
  }
  console.log('Moving resume PDF to the correct public folder location...');
  fs.copyFileSync('dist/Dennis George Mathew - 2025 Resume.pdf', resumePathInDist);
}

console.log('Style fix completed!'); 
