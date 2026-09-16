const fs = require('fs');

const content = fs.readFileSync('src/app.jsx', 'utf8');

const funcs = ['getCardRankBadgeStyle', 'getRankBadgeStyle', 'getRankTextStyle', 'renderRankBadge', 'renderSkillBadge'];

funcs.forEach(fn => {
  let pos = -1;
  while ((pos = content.indexOf(fn, pos + 1)) !== -1) {
    console.log(`Symbol "${fn}" at pos ${pos}:`, content.slice(Math.max(0, pos - 40), Math.min(content.length, pos + 100)));
  }
});
