const fs = require('fs');
const path = require('path');

console.log('=== AUDITING INDEX.HTML SCRIPT TAGS ===');

const indexPath = path.join(__dirname, 'index.html');
let indexHtml = fs.readFileSync(indexPath, 'utf-8');

const dataDir = path.join(__dirname, 'src', 'data');
const allJsFiles = fs.readdirSync(dataDir).filter(f => f.endsWith('.js') && f !== 'mockData.js');

let addedCount = 0;
allJsFiles.forEach(file => {
  if (!indexHtml.includes(file)) {
    console.log(`ADDING MISSING SCRIPT TO INDEX.HTML: ${file}`);
    const scriptTag = `<script src="./src/data/${file}"></script>`;
    indexHtml = indexHtml.replace('<!-- 1. Player Photos (174 Image Files) -->', `<!-- 1. Player Photos (174 Image Files) -->\n  ${scriptTag}`);
    addedCount++;
  }
});

if (addedCount > 0) {
  fs.writeFileSync(indexPath, indexHtml, 'utf-8');
  console.log(`Successfully added ${addedCount} missing script tags to index.html!`);
} else {
  console.log('All image files are already present in index.html.');
}

console.log('=== AUDIT COMPLETE ===');
