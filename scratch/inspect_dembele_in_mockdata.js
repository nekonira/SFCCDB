const fs = require('fs');

const content = fs.readFileSync('src/data/mockData.js', 'utf-8');
const idx = content.indexOf('ウスマン・デンベレ(フランスユニ)');
console.log('Index:', idx);
if (idx !== -1) {
  console.log(content.slice(idx - 100, idx + 400));
} else {
  console.log('Not found by name, searching for p396:');
  const idx2 = content.indexOf('p396');
  console.log('Index p396:', idx2);
  if (idx2 !== -1) {
    console.log(content.slice(idx2 - 50, idx2 + 400));
  }
}
