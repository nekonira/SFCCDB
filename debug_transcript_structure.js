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
      } else if (entry.isFile() && entry.name === 'transcript_full.jsonl') {
        files.push(full);
      }
    }
  } catch (e) {}
  return files;
}

const files = getTranscriptFiles(brainDir);

files.forEach(file => {
  const text = fs.readFileSync(file, 'utf-8');
  const idx = text.indexOf('id:');
  if (idx !== -1) {
    console.log('Found id: in', file);
    console.log('Snippet:', text.substring(idx - 20, idx + 200));
  }
});
