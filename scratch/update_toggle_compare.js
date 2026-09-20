const fs = require('fs');

let code = fs.readFileSync('src/app.jsx', 'utf8');

const target = `  const toggleCompareCard = (id) => {
    setSelectedCompareCardIds(prev => {
      if (prev.includes(id)) {
        return prev.filter(cId => cId !== id);
      } else {
        if (prev.length >= 7) return prev;
        return [...prev, id];
      }
    });
  };`;

const replacement = `  const toggleCompareCard = (id) => {
    setSelectedCompareCardIds(prev => {
      if (prev.includes(id)) {
        return prev.filter(cId => cId !== id);
      } else {
        if (prev.length >= 7) return prev;
        return [...prev, id];
      }
    });
    setIsCardCompareModalOpen(true);
  };`;

if (code.includes(target)) {
  code = code.replace(target, replacement);
  console.log('Updated toggleCompareCard (LF)');
} else if (code.includes(target.replace(/\n/g, '\r\n'))) {
  code = code.replace(target.replace(/\n/g, '\r\n'), replacement.replace(/\n/g, '\r\n'));
  console.log('Updated toggleCompareCard (CRLF)');
} else {
  console.log('Target not found!');
}

fs.writeFileSync('src/app.jsx', code, 'utf8');
