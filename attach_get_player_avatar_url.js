const fs = require('fs');
const path = require('path');

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let code = fs.readFileSync(appJsxPath, 'utf-8');

if (!code.includes('window.getPlayerAvatarUrl = getPlayerAvatarUrl;')) {
  code = code.replace(
    'const PlayerAvatar =',
    'window.getPlayerAvatarUrl = getPlayerAvatarUrl;\n\nconst PlayerAvatar ='
  );
  fs.writeFileSync(appJsxPath, code, 'utf-8');
  console.log('Attached window.getPlayerAvatarUrl in src/app.jsx!');
}
