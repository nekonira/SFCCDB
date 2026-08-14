const fs = require('fs');
const path = require('path');

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let code = fs.readFileSync(appJsxPath, 'utf-8');

console.log('--- Replacing <img> tags with <PlayerAvatar> in src/app.jsx ---');

// Replace 1: player card thumbnail
code = code.replace(
  /<img\s+src=\{avatar\}\s+alt=\{p\.name\}\s+className="w-10 h-14 rounded-lg object-contain bg-slate-950\/90 border border-slate-700 shadow-md group-hover:border-\[#00FF66\] transition-colors"\s+title=\{p\.name\}\s*\/>/g,
  '<PlayerAvatar player={p} className="w-10 h-14 rounded-lg object-contain bg-slate-950/90 border border-slate-700 shadow-md group-hover:border-[#00FF66] transition-colors" />'
);

// Replace 2: player list table row
code = code.replace(
  /<img src=\{avatar\} alt=\{p\.name\} className="w-10 h-14 rounded-lg object-contain bg-slate-950\/90 border border-slate-700 flex-shrink-0" \/>/g,
  '<PlayerAvatar player={p} className="w-10 h-14 rounded-lg object-contain bg-slate-950/90 border border-slate-700 flex-shrink-0" />'
);

// Replace 3: player card preview
code = code.replace(
  /<img\s+src=\{avatar\}\s+alt=\{player\.name\}\s+className="w-16 h-22 rounded-xl object-contain bg-slate-950\/90 border-2 border-slate-700 group-hover:border-\[#00FF66\] transition-colors shadow-lg"\s*\/>/g,
  '<PlayerAvatar player={player} className="w-16 h-22 rounded-xl object-contain bg-slate-950/90 border-2 border-slate-700 group-hover:border-[#00FF66] transition-colors shadow-lg" />'
);

// Replace 4: player detail modal header
code = code.replace(
  /<img src=\{avatar\} alt=\{adjustedPlayer\.name\} className="w-24 h-32 md:w-28 md:h-36 rounded-2xl object-contain bg-slate-950\/90 border-2 border-\[#00FF66\] shadow-2xl" \/>/g,
  '<PlayerAvatar player={adjustedPlayer} className="w-24 h-32 md:w-28 md:h-36 rounded-2xl object-contain bg-slate-950/90 border-2 border-[#00FF66] shadow-2xl" />'
);

// Replace 5: player comparison header
code = code.replace(
  /<img src=\{avatar\} alt=\{p\.name\} className="w-16 h-22 rounded-xl object-contain bg-slate-950\/90 mx-auto border-2 border-\[#00FF66\] shadow-md" \/>/g,
  '<PlayerAvatar player={p} className="w-16 h-22 rounded-xl object-contain bg-slate-950/90 mx-auto border-2 border-[#00FF66] shadow-md" />'
);

fs.writeFileSync(appJsxPath, code, 'utf-8');
console.log('Replaced all player <img> tags with <PlayerAvatar> component!');
