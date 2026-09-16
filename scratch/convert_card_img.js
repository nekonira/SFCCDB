const fs = require('fs');
const path = require('path');

const srcPath = 'C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\ac89fd2a-cb35-4d55-ac69-24a7b845f8e8\\.user_uploaded\\media_1789437889536.jpg';
const dstPath = 'c:\\Users\\nekon\\SFCCdeta\\src\\data\\haalandDemonCardImage.js';

const buf = fs.readFileSync(srcPath);
const b64 = buf.toString('base64');
const content = `window.HAALAND_DEMON_CARD_IMAGE = "data:image/jpeg;base64,${b64}";\n`;

fs.writeFileSync(dstPath, content, 'utf-8');
console.log(`Generated haalandDemonCardImage.js: ${content.length} bytes`);
