const fs = require('fs');
const path = require('path');

function scanFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const regex = /name:\s*(['"])【([^】]+)】([^'"]+)\1/g;
  let count = 0;
  const updated = content.replace(regex, (match, quote, title, name) => {
    count++;
    return `name: ${quote}${name.trim()}【${title.trim()}】${quote}`;
  });

  if (count > 0) {
    console.log(`Updated ${count} card names in ${filePath}`);
    fs.writeFileSync(filePath, updated, 'utf8');
  }
}

function walk(dir) {
  fs.readdirSync(dir).forEach(f => {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) {
      if (!f.startsWith('.') && f !== 'node_modules' && f !== 'scratch') walk(p);
    } else if (f.endsWith('.js') || f.endsWith('.jsx') || f.endsWith('.ps1')) {
      scanFile(p);
    }
  });
}

walk('.');
