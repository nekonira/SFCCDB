const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf-8');

const m = html.match(/<script src="\.\/src\/data\/[a-zA-Z0-9]+Image\.js"><\/script>/g);
if (m) {
  console.log('Total image scripts in index.html:', m.length);
  console.log('Sample image scripts (around D or end):');
  const dScripts = m.filter(s => s.toLowerCase().includes('des') || s.toLowerCase().includes('dembele') || s.toLowerCase().includes('barcola'));
  console.log(dScripts);
  console.log('Last 5 image scripts:');
  console.log(m.slice(-5));
}
