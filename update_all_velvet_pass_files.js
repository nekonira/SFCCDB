const fs = require('fs');
const path = require('path');

const files = ['add_takefusaKubo2026.js', 'add_pedri2026.js'];
const newDesc = '発動エリア：前左右・中左右　/　発動条件：ドリブル中　/　突破力・キープ力UP　/　成功時にショートパス発生確率UP';

files.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf-8');
    content = content.replace(/(name:\s*['"]ベルベットパス['"][\s]*,[\s]*rank:\s*['"]金['"][\s]*,[\s]*description:\s*['"])(.*?)(['"])/g, (match, p1, p2, p3) => {
      console.log(`Updated Velvet Pass in ${file}`);
      return p1 + newDesc + p3;
    });
    fs.writeFileSync(filePath, content, 'utf-8');
  }
});
