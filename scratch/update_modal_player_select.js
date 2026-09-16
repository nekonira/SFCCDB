const fs = require('fs');

let content = fs.readFileSync('src/app.jsx', 'utf8');

const targetStr = `  const handleSelectPlayerFromModal = (p) => {
    setCurrentPlayer(p);
    if (setSelectedPlayer) {
      setSelectedPlayer(p);
    }
    setIsPlayerModalOpen(false);
  };`;

const replacementStr = `  const handleSelectPlayerFromModal = (p) => {
    const adjusted = getAdjustedPlayer(p, simPlayerRarity, simPlayerMaxEnhanced);
    setCurrentPlayer(adjusted);
    if (setSelectedPlayer) {
      setSelectedPlayer(adjusted);
    }
    setIsPlayerModalOpen(false);
  };`;

if (content.includes(targetStr)) {
  content = content.replace(targetStr, replacementStr);
  fs.writeFileSync('src/app.jsx', content, 'utf8');
  console.log('Successfully updated handleSelectPlayerFromModal in app.jsx');
} else {
  console.error('Target str not found');
}
