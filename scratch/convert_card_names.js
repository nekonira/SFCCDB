const fs = require('fs');
const path = 'src/data/specialCardsData.js';

let content = fs.readFileSync(path, 'utf8');

// Convert name: '【二つ名】名前' to name: '名前【二つ名】'
const regex = /name:\s*(['"])【([^】]+)】([^'"]+)\1/g;

let count = 0;
const updated = content.replace(regex, (match, quote, title, name) => {
  count++;
  return `name: ${quote}${name.trim()}【${title.trim()}】${quote}`;
});

console.log(`Transformed ${count} card names in ${path}`);
fs.writeFileSync(path, updated, 'utf8');
