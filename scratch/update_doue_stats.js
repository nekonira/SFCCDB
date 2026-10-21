const fs = require('fs');

const mockPath = 'src/data/mockData.js';
let content = fs.readFileSync(mockPath, 'utf-8');

const targetObj = `  {
    id: 'p404',
    name: 'デジレ・ドゥエ',
    readingName: 'でじれ・どぅえ',
    category: 'MF',
    mainPosition: 'AM',
    subPositions: ['LW'],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'フランス',
    policy: 'ムービング',
    playStyle: 'アタッカー',
    playStyleLevel: 'Ⅲ',
    overall: 7359,
    maxOverall: 15650,`;

const replacementObj = `  {
    id: 'p404',
    name: 'デジレ・ドゥエ',
    readingName: 'でじれ・どぅえ',
    category: 'MF',
    mainPosition: 'AM',
    subPositions: ['LW'],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'フランス',
    policy: 'ムービング',
    playStyle: 'アタッカー',
    playStyleLevel: 'Ⅲ',
    overall: 7486,
    maxOverall: 15616,`;

const targetMaxEnhanced = `    maxEnhanced: {
      overall: 15650,`;

const replacementMaxEnhanced = `    maxEnhanced: {
      overall: 15616,`;

// Let's locate p404 block
const p404Idx = content.indexOf("id: 'p404'");
if (p404Idx === -1) {
  console.error("p404 not found in mockData.js");
  process.exit(1);
}

const endOfP404 = content.indexOf("id: 'p405'", p404Idx);
let p404Block = content.slice(p404Idx, endOfP404);

// Replace overall: 7359 -> 7486
p404Block = p404Block.replace("overall: 7359,", "overall: 7486,");
// Replace maxOverall: 15650 -> 15616
p404Block = p404Block.replace("maxOverall: 15650,", "maxOverall: 15616,");
// Replace maxEnhanced overall: 15650 -> 15616
p404Block = p404Block.replace("overall: 15650,", "overall: 15616,");

content = content.slice(0, p404Idx) + p404Block + content.slice(endOfP404);

fs.writeFileSync(mockPath, content, 'utf-8');
console.log('✅ Successfully updated Desire Doue (p404) stats: overall 7486, maxOverall 15616 in mockData.js');
