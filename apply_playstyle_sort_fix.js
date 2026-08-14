const fs = require('fs');
const path = require('path');

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let code = fs.readFileSync(appJsxPath, 'utf-8');

console.log('--- Fixing Play Style Sorting in src/app.jsx ---');

// 1. Add case 'playStyle' and case 'playStyleLevel' to switch (sortConfig.key)
const switchTarget = "switch (sortConfig.key) {";
const playStyleCases = `switch (sortConfig.key) {
        case 'playStyle': {
          const styleA = a.playStyle || '';
          const styleB = b.playStyle || '';
          primaryResult = styleA.localeCompare(styleB, 'ja');
          break;
        }
        case 'playStyleLevel': {
          const levelMap = { 'Ⅰ': 1, 'Ⅱ': 2, 'Ⅲ': 3, 'Ⅳ': 4, 'Ⅴ': 5 };
          const lvlA = levelMap[a.playStyleLevel] || parseInt(a.playStyleLevel) || 0;
          const lvlB = levelMap[b.playStyleLevel] || parseInt(b.playStyleLevel) || 0;
          primaryResult = lvlA - lvlB;
          break;
        }`;

code = code.replace(switchTarget, playStyleCases);

// 2. Add playStyle and playStyleLevel to sort select dropdown
const selectTarget = `<option value="policy">ポリシー 順</option>`;
const selectReplacement = `<option value="playStyle">プレースタイル 順</option>
              <option value="playStyleLevel">プレースタイルLV 順</option>
              <option value="policy">ポリシー 順</option>`;

code = code.replace(selectTarget, selectReplacement);

// 3. Update onChange direction condition for sort select
code = code.replace(
  `direction: (e.target.value === 'nationality' || e.target.value === 'name' || e.target.value === 'pos') ? 'asc' : 'desc'`,
  `direction: (e.target.value === 'nationality' || e.target.value === 'name' || e.target.value === 'pos' || e.target.value === 'playStyle') ? 'asc' : 'desc'`
);

// 4. Update table header <th> for プレースタイル & LV to be clickable and show sort indicator
const thTarget = `<th className="py-3 px-2">プレースタイル & LV</th>`;
const thReplacement = `<th onClick={() => handleSort('playStyle')} className="py-3 px-2 cursor-pointer hover:text-white transition-colors">
                  プレースタイル & LV {renderSortIndicator('playStyle')}
                </th>`;

code = code.replace(thTarget, thReplacement);

fs.writeFileSync(appJsxPath, code, 'utf-8');
console.log('Successfully updated src/app.jsx with Play Style sorting!');
