const fs = require('fs');

const mockPath = 'src/data/mockData.js';
let content = fs.readFileSync(mockPath, 'utf-8');

const targetStr = `  {
    id: 'p396',
    name: 'ウスマン・デンベレ(フランスユニ)',
    readingName: 'うすまん・でんべれ',
    category: 'MF',
    mainPosition: 'AM',
    subPositions: [],`;

const replacementStr = `  {
    id: 'p396',
    name: 'ウスマン・デンベレ(フランスユニ)',
    readingName: 'うすまん・でんべれ',
    category: 'MF',
    mainPosition: 'AM',
    subPositions: ['RW'],`;

if (!content.includes(targetStr)) {
  console.error('ERROR: targetStr not found in mockData.js');
  process.exit(1);
}

content = content.replace(targetStr, replacementStr);
fs.writeFileSync(mockPath, content, 'utf-8');
console.log('✅ Successfully updated p396 ウスマン・デンベレ(フランスユニ) to mainPosition: AM, subPositions: [\"RW\"] in mockData.js');
