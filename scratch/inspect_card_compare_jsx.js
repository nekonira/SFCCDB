const fs = require('fs');

if (fs.existsSync('src/app.jsx')) {
  const content = fs.readFileSync('src/app.jsx', 'utf8');
  const pos = content.indexOf('function CardCompareModal');
  console.log('CardCompareModal in app.jsx at:', pos);
  if (pos !== -1) {
    console.log(content.slice(pos, pos + 2500));
  }
} else {
  console.log('src/app.jsx does not exist');
}
