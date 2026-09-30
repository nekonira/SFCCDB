const fs = require('fs');
const path = require('path');

const code = fs.readFileSync(path.join(__dirname, '..', 'src', 'app.jsx'), 'utf-8');
const lines = code.split('\n');

const printRange = (start, end, label) => {
  console.log(`\n=================== ${label} (L${start}-L${end}) ===================`);
  for (let i = start - 1; i < end && i < lines.length; i++) {
    console.log(`${i+1}: ${lines[i]}`);
  }
};

printRange(9080, 9115, 'AutoSelect Buttons in UI');
printRange(10990, 11040, 'AutoSelectModal component definition');
