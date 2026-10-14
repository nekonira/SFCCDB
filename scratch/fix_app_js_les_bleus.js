const fs = require('fs');
const path = require('path');

const appJsPath = path.join(__dirname, '..', 'src', 'app.js');
let code = fs.readFileSync(appJsPath, 'utf-8');

const target = "NATIONAL_TEAM_BONUS_COMBOS={'selecao70':'ブラジル','laRoja26':'スペイン'}";
const replacement = "NATIONAL_TEAM_BONUS_COMBOS={'selecao70':'ブラジル','laRoja26':'スペイン','lesBleus26':'フランス'}";

const count = code.split(target).length - 1;
console.log('Occurrences of target in app.js:', count);

if (count === 2) {
  code = code.split(target).join(replacement);
  fs.writeFileSync(appJsPath, code, 'utf-8');
  console.log('✅ Successfully updated src/app.js with lesBleus26 nationality bonus!');
} else {
  console.error('❌ Target pattern count mismatch! Expected 2, got', count);
  process.exit(1);
}
