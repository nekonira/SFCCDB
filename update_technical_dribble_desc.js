const fs = require('fs');
const path = require('path');

console.log('=== Updating Technical Dribble Skill Description Across Codebase ===');

const newDesc = '発動エリア：前左右・中左右　/　発動条件：ドリブル中　/　突破力・キープ力UP　/　成功時にショートパス発生確率UP';

// 1. Update mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');
let mockCount = 0;

mockCode = mockCode.replace(/(["']?skill["']?:\s*\{[\s]*name:\s*['"]テクニカルドリブル['"][\s]*,[\s]*rank:\s*['"]銅['"][\s]*,[\s]*description:\s*['"])(.*?)(['"])/g, (match, p1, p2, p3) => {
  mockCount++;
  return p1 + newDesc + p3;
});

fs.writeFileSync(mockPath, mockCode, 'utf-8');
console.log(`1. Updated ${mockCount} occurrence(s) in mockData.js`);

// 2. Update specialCardsData.js
const specialCardsPath = path.join(__dirname, 'src', 'data', 'specialCardsData.js');
let scCode = fs.readFileSync(specialCardsPath, 'utf-8');
let scCount = 0;

scCode = scCode.replace(/(["']?skill["']?:\s*\{[\s]*name:\s*['"]テクニカルドリブル['"][\s]*,[\s]*rank:\s*['"]銅['"][\s]*,[\s]*description:\s*['"])(.*?)(['"])/g, (match, p1, p2, p3) => {
  scCount++;
  return p1 + newDesc + p3;
});

fs.writeFileSync(specialCardsPath, scCode, 'utf-8');
console.log(`2. Updated ${scCount} occurrence(s) in specialCardsData.js`);

// 3. Update all individual add_*.js files
const playerFiles = fs.readdirSync(__dirname).filter(f => f.startsWith('add_') && f.endsWith('.js'));
let fileCount = 0;

playerFiles.forEach(file => {
  const fullP = path.join(__dirname, file);
  let content = fs.readFileSync(fullP, 'utf-8');
  if (content.includes("name: 'テクニカルドリブル'") || content.includes('name: "テクニカルドリブル"')) {
    content = content.replace(/(["']?skill["']?:\s*\{[\s]*name:\s*['"]テクニカルドリブル['"][\s]*,[\s]*rank:\s*['"]銅['"][\s]*,[\s]*description:\s*['"])(.*?)(['"])/g, `$1${newDesc}$3`);
    fs.writeFileSync(fullP, content, 'utf-8');
    fileCount++;
    console.log(`  Updated ${file}`);
  }
});

console.log(`3. Updated ${fileCount} individual player add_*.js file(s).`);
console.log('=== UPDATE COMPLETE! ===');
