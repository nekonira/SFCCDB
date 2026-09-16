const fs = require('fs');

function patchFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  if (content.includes('const LIMIT_BREAK_STAGES =')) {
    // Check if it's top-level or duplicate
    console.log(filePath, 'has LIMIT_BREAK_STAGES');
  }

  // Put top-level LIMIT_BREAK_STAGES near top
  const anchor = 'const POSITION_LIMIT_ADDITIONS =';
  if (content.includes(anchor) && !content.startsWith('const LIMIT_BREAK_STAGES =')) {
    content = 'const LIMIT_BREAK_STAGES = [\'無凸\', \'1凸\', \'2凸\', \'3凸\', \'完凸\'];\n' + content;
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Added top-level LIMIT_BREAK_STAGES to:', filePath);
  }
}

patchFile('src/app.js');
if (fs.existsSync('src/app.jsx')) {
  patchFile('src/app.jsx');
}
