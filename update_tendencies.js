const fs = require('fs');
const path = 'c:/Users/nekon/SFCCdeta/src/data/mockData.js';
let content = fs.readFileSync(path, 'utf8');

// Match player objects in INITIAL_PLAYERS
// Each player object starts with `{` and contains `id: 'p...`
const playerBlocks = content.split(/(\{\s*id:\s*'p\d+[\s\S]*?avatarUrl:\s*''\s*\})/g);

let updatedCount = 0;
let updatedNames = [];

for (let i = 0; i < playerBlocks.length; i++) {
  let block = playerBlocks[i];
  if (block.includes("id: 'p")) {
    if (block.includes("セントラルAM") || block.includes("セントラルDM")) {
      const nameMatch = block.match(/name:\s*'([^']+)'/);
      const name = nameMatch ? nameMatch[1] : 'Unknown';
      const styleMatch = block.match(/playStyle:\s*'([^']+)'/);
      const style = styleMatch ? styleMatch[1] : '';

      // Replace playTendencies inside this block
      const newTendencies = `playTendencies: {
        attack: 0, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
        shortPass: 1, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
        delay: 0, rushOut: -1, feint: 0, press: 0
      }`;
      
      const newBlock = block.replace(/playTendencies:\s*\{[\s\S]*?\}/, newTendencies);
      playerBlocks[i] = newBlock;
      updatedCount++;
      updatedNames.push(`${name} (${style})`);
    }
  }
}

const finalContent = playerBlocks.join('');
fs.writeFileSync(path, finalContent, 'utf8');

console.log(`Successfully updated ${updatedCount} players:`);
updatedNames.forEach(n => console.log(` - ${n}`));
