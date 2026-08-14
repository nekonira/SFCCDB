const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== FIXING HAALAND (GIFT) AVATAR RESOLVER HIJACK ===');

function fixFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  let code = fs.readFileSync(filePath, 'utf-8');

  // 1. Exclude '配布' from general Haaland check
  const origCheck = `if ((player.name && (player.name.includes('ハーランド') || player.name.includes('Haaland'))) || player.id === 'p17') {`;
  const altCheck = `if (player.name && (player.name.includes('ハーランド') || player.name.includes('Haaland')) || player.id === 'p17') {`;

  const newCheck = `if (player.id === 'p259' || (player.name && (player.name.includes('ハーランド(配布)') || player.name.includes('ハーランド（配布）') || player.name.includes('Haaland (Gift)')))) {\n    return window.HAALAND_GIFT_2026_IMAGE || player.avatarUrl || '';\n  }\n  if ((player.name && ((player.name.includes('ハーランド') && !player.name.includes('配布')) || player.name.includes('Haaland'))) || player.id === 'p17') {`;

  if (code.includes(origCheck)) {
    code = code.replace(origCheck, newCheck);
  } else if (code.includes(altCheck)) {
    code = code.replace(altCheck, newCheck);
  } else {
    console.warn('Could not find general Haaland check in', filePath);
  }

  fs.writeFileSync(filePath, code, 'utf-8');
  console.log('Fixed', filePath);
}

fixFile(path.join(__dirname, 'src', 'app.jsx'));
fixFile(path.join(__dirname, 'src', 'app.js'));
