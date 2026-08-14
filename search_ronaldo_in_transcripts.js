const fs = require('fs');
const path = require('path');

const brainDir = 'C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain';
const repoDir = 'c:\\Users\\nekon\\SFCCdeta';

console.log('--- Deep Search for Cristiano Ronaldo in Transcripts & Files ---');

function getAllFiles(dirPath, arrayOfFiles = []) {
  try {
    const files = fs.readdirSync(dirPath, { withFileTypes: true });
    for (const file of files) {
      const full = path.join(dirPath, file.name);
      if (file.isDirectory()) {
        getAllFiles(full, arrayOfFiles);
      } else if (file.isFile() && (file.name.endsWith('.jsonl') || file.name.endsWith('.js') || file.name.endsWith('.py') || file.name.endsWith('.ps1'))) {
        arrayOfFiles.push(full);
      }
    }
  } catch (e) {}
  return arrayOfFiles;
}

const allFiles = getAllFiles(brainDir).concat(getAllFiles(repoDir));
console.log(`Scanning ${allFiles.length} files...`);

const ronaldoBlocks = [];

allFiles.forEach(filePath => {
  try {
    const text = fs.readFileSync(filePath, 'utf-8');
    if (text.includes('クリスティアーノ・ロナウド') || text.includes('C・ロナウド') || text.includes('ロナウド')) {
      // Find player blocks
      let cleanText = text.replace(/\\n/g, '\n').replace(/\\"/g, '"').replace(/\\\\/g, '\\');
      const matches = cleanText.match(/\{\s*id:\s*['"]p\d+['"][\s\S]*?avatarUrl:\s*['"][^'"]*['"]\s*\}/g);
      if (matches) {
        matches.forEach(block => {
          if (block.includes('ロナウド') || block.includes('Ronaldo')) {
            ronaldoBlocks.push({ file: filePath, block });
          }
        });
      }
    }
  } catch (e) {}
});

console.log(`FOUND ${ronaldoBlocks.length} RONALDO PLAYER BLOCKS!`);

ronaldoBlocks.forEach((item, idx) => {
  console.log(`\n--- Match ${idx + 1} from ${item.file} ---`);
  console.log(item.block);
});
