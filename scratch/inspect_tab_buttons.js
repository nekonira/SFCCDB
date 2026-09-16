const fs = require('fs');
const appJs = fs.readFileSync('src/app.js', 'utf8');

const tabPos = appJs.indexOf('function TrainingSimulatorTab');
if (tabPos !== -1) {
  const tabCode = appJs.slice(tabPos, tabPos + 40000);
  
  let bPos = 0;
  while ((bPos = tabCode.indexOf('React.createElement("button"', bPos)) !== -1) {
    const endB = tabCode.indexOf(')', bPos + 30);
    // Grab chunk
    const btnSnippet = tabCode.slice(bPos, bPos + 400);
    if (btnSnippet.includes('自動') || btnSnippet.includes('最適') || btnSnippet.includes('編成') || btnSnippet.includes('handleDirect') || btnSnippet.includes('AutoSelect')) {
      console.log('\n--- Button Snippet ---');
      console.log(btnSnippet);
    }
    bPos += 30;
  }
}
