const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const files = fs.readdirSync(rootDir);

console.log('Searching for パワーアジリティ across JS files...');

files.forEach(file => {
  if (file.endsWith('.js') || file.endsWith('.jsx')) {
    const content = fs.readFileSync(path.join(rootDir, file), 'utf-8');
    if (content.includes('パワーアジリティ')) {
      console.log(`Found in: ${file}`);
    }
  }
});

const srcFiles = fs.readdirSync(path.join(rootDir, 'src'));
srcFiles.forEach(file => {
  if (file.endsWith('.js') || file.endsWith('.jsx')) {
    const content = fs.readFileSync(path.join(rootDir, 'src', file), 'utf-8');
    if (content.includes('パワーアジリティ')) {
      console.log(`Found in src/${file}`);
    }
  }
});
