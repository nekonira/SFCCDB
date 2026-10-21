const fs = require('fs');
const appJsx = fs.readFileSync('src/app.jsx', 'utf-8');

const lastIdx = appJsx.lastIndexOf('p402');
if (lastIdx !== -1) {
  console.log('Around p402 in app.jsx:');
  console.log(appJsx.substring(lastIdx - 100, lastIdx + 150));
} else {
  console.log('p402 not found in app.jsx');
}
