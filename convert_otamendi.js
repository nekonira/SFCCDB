const fs = require('fs');
const img = fs.readFileSync('C:/Users/nekon/.gemini/antigravity-ide/brain/b9449e35-511c-4ed5-8bcf-1fc1ea6bb9f9/.user_uploaded/media_1789466733251.jpg');
const base64 = img.toString('base64');
fs.writeFileSync('./src/data/otamendiCardImage.js', 'window.OTAMENDI_CARD_IMAGE = "data:image/jpeg;base64,' + base64 + '";\n');
console.log('Successfully created src/data/otamendiCardImage.js');
