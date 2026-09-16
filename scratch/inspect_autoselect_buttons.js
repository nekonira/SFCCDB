const fs = require('fs');
const appJs = fs.readFileSync('src/app.js', 'utf8');

console.log('Total appJs length:', appJs.length);

let searchTerms = [
  'isAutoSelectModalOpen',
  'handleDirectAutoSelect',
  'AutoSelectModal',
  '自動最適編成',
  '無難最適編成',
  '自動編成',
  '最適編成'
];

for (const term of searchTerms) {
  let count = 0;
  let pos = -1;
  let indices = [];
  while ((pos = appJs.indexOf(term, pos + 1)) !== -1) {
    count++;
    indices.push(pos);
  }
  console.log(`Term "${term}": found ${count} times at indices:`, indices);
}

// Extract snippets around each occurrence of handleDirectAutoSelect or AutoSelect
let idx = 0;
while ((idx = appJs.indexOf('handleDirectAutoSelect', idx)) !== -1) {
  console.log('\n--- Snippet around handleDirectAutoSelect at pos', idx, '---');
  console.log(appJs.slice(Math.max(0, idx - 200), Math.min(appJs.length, idx + 600)));
  idx += 'handleDirectAutoSelect'.length;
}

let idxModal = 0;
while ((idxModal = appJs.indexOf('isAutoSelectModalOpen', idxModal)) !== -1) {
  console.log('\n--- Snippet around isAutoSelectModalOpen at pos', idxModal, '---');
  console.log(appJs.slice(Math.max(0, idxModal - 200), Math.min(appJs.length, idxModal + 600)));
  idxModal += 'isAutoSelectModalOpen'.length;
}
