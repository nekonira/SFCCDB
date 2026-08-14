const fs = require('fs');
const path = require('path');

const files = ['vandijkImage.js', 'hwangInBeomImage.js', 'brunoguimaraesImage.js'];
files.forEach(file => {
  const filePath = path.join(__dirname, 'src', 'data', file);
  if (fs.existsSync(filePath)) {
    const text = fs.readFileSync(filePath, 'utf-8');
    const match = text.match(/window\.([A-Z0-9_]+_IMAGE)\s*=/);
    console.log(`${file} defines: ${match ? match[1] : 'NONE'}`);
  } else {
    console.log(`${file} does NOT exist!`);
  }
});
