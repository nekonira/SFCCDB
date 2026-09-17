const fs = require('fs');

let content = fs.readFileSync('src/app.jsx', 'utf8');

// Find bonuses.map block in TrainingSimulatorTab
const oldSnippet = `const active = isBonusActive(c.id, b.style);`;
const newSnippet = `const matchesPlayer = currentPlayer ? checkSingleBonusMatch(currentPlayer, b.style) : false;
                              const userToggledOn = isBonusActive(c.id, b.style);
                              const active = matchesPlayer && userToggledOn;`;

if (content.includes(oldSnippet)) {
  content = content.replace(oldSnippet, newSnippet);

  // Also replace the button title and icon display
  content = content.replace(
    `<span className="truncate">🎯 \${b.style}</span>`,
    `<span className="truncate">{matchesPlayer ? (active ? '🎯' : '⏸️') : '❌'} \${b.style}</span>`
  );

  content = content.replace(
    `title={\`\${b.style} \${b.percent}% UP の適用/非適用切り替え\`}`,
    `title={matchesPlayer ? \`\${b.style} +\${b.percent}% UP (\${active ? '適用中' : 'OFF'})\` : \`\${b.style} (選択中の選手「\${currentPlayer?.playStyle || ''} / \${currentPlayer?.mainPosition || ''}」は対象外)\`}`
  );

  fs.writeFileSync('src/app.jsx', content, 'utf8');
  console.log('Successfully updated Row 3 bonus render by snippet replacement in src/app.jsx');
} else {
  console.error('oldSnippet not found in src/app.jsx');
}
