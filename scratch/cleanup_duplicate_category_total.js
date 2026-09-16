const fs = require('fs');

function cleanupFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  const targetStr = `function getCategoryTotal(player, catKey) {
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
}`;

  if (content.includes(targetStr)) {
    content = content.replace(targetStr + '\n\n', '');
    content = content.replace(targetStr, '');
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Cleaned up duplicate getCategoryTotal from:', filePath);
  }
}

cleanupFile('src/app.js');
if (fs.existsSync('src/app.jsx')) {
  cleanupFile('src/app.jsx');
}
