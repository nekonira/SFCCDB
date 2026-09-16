const fs = require('fs');

const categoryTotalDef = `
function getCategoryTotal(player, catKey) {
  if (!player) return 0;
  if (player.detailStats && player.detailStats[catKey]) {
    const obj = player.detailStats[catKey];
    return Object.values(obj).reduce((sum, v) => sum + (Number(v) || 0), 0);
  }
  if (player.baseStats && player.baseStats[catKey] !== undefined) {
    return Number(player.baseStats[catKey]) || 0;
  }
  if (player.stats && player.stats[catKey] !== undefined) {
    return Number(player.stats[catKey]) || 0;
  }
  return 100;
}
`;

function patchFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  if (content.includes('function getCategoryTotal')) {
    console.log(filePath, 'already has getCategoryTotal');
    return;
  }

  const anchor = 'const POSITION_LIMIT_ADDITIONS =';
  if (content.includes(anchor)) {
    content = content.replace(anchor, categoryTotalDef.trim() + '\n\n' + anchor);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Patched getCategoryTotal into:', filePath);
  } else {
    console.error('Anchor not found in:', filePath);
  }
}

patchFile('src/app.js');
if (fs.existsSync('src/app.jsx')) {
  patchFile('src/app.jsx');
}
