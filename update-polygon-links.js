import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get all HTML files that contain references to polygon.html
const findCommand = "find . -name '*.html' -not -path './dist/*' -not -path './node_modules/*' -exec grep -l '/polygon.html' {} \\;";
const filesToUpdate = execSync(findCommand).toString().trim().split('\n');

console.log(`Found ${filesToUpdate.length} files to update`);

// Update all references
let updatedCount = 0;

filesToUpdate.forEach(file => {
  try {
    const content = fs.readFileSync(file, 'utf8');
    
    // Replace all occurrences of /polygon.html with /projects/polygon.html
    const updatedContent = content.replace(/href="\/polygon.html"/g, 'href="/projects/polygon.html"');
    
    // Check if anything changed
    if (content !== updatedContent) {
      fs.writeFileSync(file, updatedContent);
      console.log(`Updated references in ${file}`);
      updatedCount++;
    }
  } catch (error) {
    console.error(`Error processing ${file}:`, error);
  }
});

console.log(`Successfully updated references in ${updatedCount} files`);

// Create a redirect file in the root to handle any old links
const redirectContent = `<!DOCTYPE html>
<html>
<head>
  <meta http-equiv="refresh" content="0;url=/projects/polygon.html">
  <title>Redirecting...</title>
</head>
<body>
  <p>Redirecting to <a href="/projects/polygon.html">projects/polygon.html</a>...</p>
  <script>
    window.location.href = "/projects/polygon.html";
  </script>
</body>
</html>`;

fs.writeFileSync('polygon.html', redirectContent);
console.log('Created redirect at polygon.html');

console.log('All done! Polygon page moved to projects directory and links updated.'); 