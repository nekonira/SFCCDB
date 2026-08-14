const fs = require('fs');
const path = require('path');

const mockDataPath = path.join(__dirname, 'src/data/mockData.js');
let code = fs.readFileSync(mockDataPath, 'utf8');

code = code.replace(/export const mockPlayers =/, 'const mockPlayers =');
code += '\nmodule.exports = { mockPlayers };';

const tempPath = path.join(__dirname, 'temp_mockdata_eval.js');
fs.writeFileSync(tempPath, code);

try {
  const { mockPlayers } = require(tempPath);
  console.log(`Total players in mockData.js: ${mockPlayers.length}`);

  const nameCounts = {};
  const idCounts = {};
  const k1Players = [];
  let higashiguchiFound = false;

  mockPlayers.forEach((p, idx) => {
    nameCounts[p.name] = (nameCounts[p.name] || 0) + 1;
    idCounts[p.id] = (idCounts[p.id] || 0) + 1;

    if (p.name && (p.name.includes('東口') || p.name.includes('Higashiguchi'))) {
      higashiguchiFound = true;
      console.log(`FOUND 東口: Index ${idx}, ID: ${p.id}, Name: ${p.name}`);
    }

    if (p.name && p.name.includes('K1 BEST11')) {
      k1Players.push({ index: idx, id: p.id, name: p.name });
    }
  });

  console.log(`Higashiguchi (東口) present: ${higashiguchiFound}`);

  console.log('\n--- K1 BEST11 2025 Players Count ---');
  console.log(`Total K1 BEST11 occurrences: ${k1Players.length}`);
  k1Players.forEach(kp => {
    console.log(`Index ${kp.index} | ID: ${kp.id} | Name: ${kp.name}`);
  });

  console.log('\n--- Duplicated Player Names ---');
  Object.keys(nameCounts).forEach(name => {
    if (nameCounts[name] > 1) {
      console.log(`DUPLICATE NAME (${nameCounts[name]}x): ${name}`);
    }
  });

  console.log('\n--- Duplicated Player IDs ---');
  Object.keys(idCounts).forEach(id => {
    if (idCounts[id] > 1) {
      console.log(`DUPLICATE ID (${idCounts[id]}x): ${id}`);
    }
  });

} catch (e) {
  console.error('Error parsing mockData:', e);
} finally {
  if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
}
