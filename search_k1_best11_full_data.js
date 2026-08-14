const fs = require('fs');
const path = require('path');

const brainDir = 'C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain';

function getTranscriptFiles(dir, files = []) {
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        getTranscriptFiles(full, files);
      } else if (entry.isFile() && entry.name.endsWith('.jsonl')) {
        files.push(full);
      }
    }
  } catch (e) {}
  return files;
}

const files = getTranscriptFiles(brainDir);

const k1Names = [
  'サバグ', 'ソン・ミンギュ', 'ドンギョン', 'サンユン',
  'ジンギュ', 'パク・ジン', 'ホン・ジョンホ', 'ミョンジェ',
  'ムンファン', 'ソン・ボムグン', 'ヤザン'
];

console.log('--- Searching Transcripts for Full Authentic K1 BEST11 2025 Player Objects ---');

k1Names.forEach(name => {
  let found = false;
  files.forEach(file => {
    if (found) return;
    try {
      const content = fs.readFileSync(file, 'utf-8');
      if (content.includes(name) && content.includes('BEST11')) {
        let cleanText = content.replace(/\\r\\n\d+:\s*/g, '\n').replace(/\\n\d+:\s*/g, '\n').replace(/\r?\n\d+:\s*/g, '\n').replace(/\\n/g, '\n').replace(/\\"/g, '"').replace(/\\\\/g, '\\');
        const matches = cleanText.match(/\{\s*id:\s*['"]p\d+['"][\s\S]*?avatarUrl:\s*['"][^'"]*['"]\s*\}/g);
        if (matches) {
          matches.forEach(block => {
            if (block.includes(name)) {
              console.log(`\n========================================`);
              console.log(`FOUND FULL DATA FOR ${name}:`);
              console.log(block);
              found = true;
            }
          });
        }
      }
    } catch (e) {}
  });
});
