const fs = require('fs');
const path = require('path');

console.log('=== Verifying パワーアジリティ Description Update ===');

const mockDataContent = fs.readFileSync(path.join(__dirname, '..', 'src', 'data', 'mockData.js'), 'utf-8');
const cardsContent = fs.readFileSync(path.join(__dirname, '..', 'src', 'data', 'specialCardsData.js'), 'utf-8');

const targetStr = 'パワーアジリティ';
const expectedDesc = '発動条件：途中出場　/　コンタクト・敏捷性UP';

let pass = true;

if (mockDataContent.includes(expectedDesc)) {
  console.log('✅ mockData.js contains updated description!');
} else {
  console.log('❌ mockData.js does NOT contain updated description.');
  pass = false;
}

if (cardsContent.includes(expectedDesc)) {
  console.log('✅ specialCardsData.js contains updated description!');
} else {
  console.log('❌ specialCardsData.js does NOT contain updated description.');
  pass = false;
}

if (pass) {
  console.log('🎉 VERIFICATION ALL PASSED PERFECTLY!');
}
