const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');

const searchInDir = (dir) => {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.git' && file !== 'brain') {
        searchInDir(fullPath);
      }
    } else if (file.endsWith('.js') || file.endsWith('.jsx') || file.endsWith('.json') || file.endsWith('.html')) {
      const content = fs.readFileSync(fullPath, 'utf-8');
      if (content.includes('パワーアジリティ')) {
        console.log(`Found in: ${fullPath}`);
      }
    }
  });
};

searchInDir(rootDir);
