const fs = require('fs');

let content = '';
if (fs.existsSync('src/data/mockData.js')) {
  content = fs.readFileSync('src/data/mockData.js', 'utf8');
} else {
  content = fs.readFileSync('src/app.jsx', 'utf8');
}

const posMatches = content.match(/mainPosition:\s*['"][^'"]+['"]/g) || [];
const uniquePos = [...new Set(posMatches.map(m => m.replace(/mainPosition:\s*['"]/, '').replace(/['"]/, '')))];
console.log('unique mainPosition in mockData:', uniquePos);

const levelMatches = content.match(/playStyleLevel:\s*['"][^'"]+['"]/g) || [];
const uniqueLevels = [...new Set(levelMatches.map(m => m.replace(/playStyleLevel:\s*['"]/, '').replace(/['"]/, '')))];
console.log('unique playStyleLevel in mockData:', uniqueLevels);
