const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const appJsPath = path.join(rootDir, 'src', 'app.js');
const mapPath = path.join(rootDir, 'scratch', 'accurate_player_image_map.json');

const playerImageMap = JSON.parse(fs.readFileSync(mapPath, 'utf-8'));
let appJsContent = fs.readFileSync(appJsPath, 'utf-8');

// Format PLAYER_IMAGE_MAP object code
const mapEntries = Object.entries(playerImageMap)
  .map(([pid, varName]) => `  "${pid}": "${varName}"`)
  .join(',\n');

const newPlayerImageMapCode = `const PLAYER_IMAGE_MAP = {\n${mapEntries}\n};`;

// Replace PLAYER_IMAGE_MAP in app.js
const regex = /const PLAYER_IMAGE_MAP = \{[\s\S]*?\};/;
if (regex.test(appJsContent)) {
  appJsContent = appJsContent.replace(regex, newPlayerImageMapCode);
  fs.writeFileSync(appJsPath, appJsContent, 'utf-8');
  console.log('Successfully updated PLAYER_IMAGE_MAP in src/app.js with 372 mappings!');
} else {
  console.error('Could not find PLAYER_IMAGE_MAP in src/app.js');
}
