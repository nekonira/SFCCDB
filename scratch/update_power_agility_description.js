const fs = require('fs');
const path = require('path');

console.log('=== Updating パワーアジリティ Description ===');

const oldDesc = "発動条件：好調　/　コンタクト・敏捷性UP";
const newDesc = "発動条件：途中出場　/　コンタクト・敏捷性UP";

const targetFiles = [
  path.join(__dirname, '..', 'add_lucas_chevalier2026.js'),
  path.join(__dirname, '..', 'src', 'data', 'mockData.js'),
  path.join(__dirname, '..', 'src', 'data', 'specialCardsData.js'),
  path.join(__dirname, '..', 'extracted_d5a_mockdata.js')
];

targetFiles.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf-8');
    if (content.includes('パワーアジリティ')) {
      let count = 0;
      content = content.replace(new RegExp(oldDesc, 'g'), () => {
        count++;
        return newDesc;
      });
      fs.writeFileSync(file, content, 'utf-8');
      console.log(`✅ Updated ${path.basename(file)} (${count} occurrences replaced)`);
    }
  }
});
