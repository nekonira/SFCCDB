const fs = require('fs');
const path = require('path');

const appPath = path.join(__dirname, '..', 'src', 'app.js');
const appCode = fs.readFileSync(appPath, 'utf-8');

const match = appCode.match(/const PLAYER_IMAGE_MAP=(\{[^}]+\});/);
if (match) {
  console.log('PLAYER_IMAGE_MAP found! Sample mapping:');
  const mapObj = JSON.parse(match[1]);
  console.log('Total mapped player IDs:', Object.keys(mapObj).length);
  console.log('Last 10 mappings:', Object.entries(mapObj).slice(-10));
} else {
  console.log('PLAYER_IMAGE_MAP match failed');
}
