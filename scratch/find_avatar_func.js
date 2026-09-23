const fs = require('fs');
const path = require('path');

const appPath = path.join(__dirname, '..', 'src', 'app.js');
const appCode = fs.readFileSync(appPath, 'utf-8');

const matches = Array.from(appCode.matchAll(/function\s+getPlayerAvatarUrl[^{]+\{([\s\S]{1,500})/g));
if (matches.length > 0) {
  console.log('getPlayerAvatarUrl body snippet:');
  console.log(matches[0][0]);
} else {
  console.log('getPlayerAvatarUrl function signature not found, searching for avatarUrl in app.js:');
  const matches2 = Array.from(appCode.matchAll(/getPlayerAvatarUrl/g));
  console.log(`Found ${matches2.length} occurrences of getPlayerAvatarUrl`);
}
