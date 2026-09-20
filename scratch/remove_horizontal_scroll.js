const fs = require('fs');

let code = fs.readFileSync('src/app.jsx', 'utf8');

// 1. Target table container and table tag
const targetContainerLf = `            /* Table Container with Horizontal Scroll */
            <div className="flex-1 overflow-y-auto overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950 shadow-inner max-h-[calc(96vh-90px)] scrollbar-thin scrollbar-thumb-amber-500/30">
              <table className="w-full min-w-[700px] border-collapse text-left text-xs sm:text-sm font-sans">`;

const replacementContainerLf = `            /* Table Container (Fit without horizontal scroll) */
            <div className="flex-1 overflow-y-auto overflow-x-hidden rounded-2xl border border-slate-800 bg-slate-950 shadow-inner max-h-[calc(96vh-90px)] scrollbar-thin scrollbar-thumb-amber-500/30">
              <table className="w-full table-fixed border-collapse text-left text-xs sm:text-sm font-sans">`;

if (code.includes(targetContainerLf)) {
  code = code.replace(targetContainerLf, replacementContainerLf);
  console.log('Replaced table container (LF)');
} else if (code.includes(targetContainerLf.replace(/\n/g, '\r\n'))) {
  code = code.replace(targetContainerLf.replace(/\n/g, '\r\n'), replacementContainerLf.replace(/\n/g, '\r\n'));
  console.log('Replaced table container (CRLF)');
} else {
  console.log('Warning: targetContainer not found!');
}

// 2. Target header column 1 (比較項目)
const targetTh1Lf = `<th className="p-2 sm:p-3 sticky left-0 top-0 z-40 bg-slate-900 w-28 sm:w-40 border-r border-slate-800 font-black text-[10px] sm:text-sm text-slate-200 uppercase tracking-wider shadow-md">`;
const replacementTh1Lf = `<th className="p-1.5 sm:p-2 sticky left-0 top-0 z-40 bg-slate-900 w-24 sm:w-32 md:w-36 border-r border-slate-800 font-black text-[10px] sm:text-xs text-slate-200 uppercase tracking-wider shadow-md">`;

if (code.includes(targetTh1Lf)) {
  code = code.replace(targetTh1Lf, replacementTh1Lf);
  console.log('Replaced th1 (LF)');
} else if (code.includes(targetTh1Lf.replace(/\n/g, '\r\n'))) {
  code = code.replace(targetTh1Lf.replace(/\n/g, '\r\n'), replacementTh1Lf.replace(/\n/g, '\r\n'));
  console.log('Replaced th1 (CRLF)');
} else {
  console.log('Warning: targetTh1 not found!');
}

// 3. Target card column th
const targetThCardLf = `<th key={c.id} className="p-2 text-center border-r border-slate-800/80 last:border-r-0 relative group bg-slate-900 sticky top-0 z-30 shadow-md align-top min-w-[130px] sm:min-w-[170px]">`;
const replacementThCardLf = `<th key={c.id} className="p-1 sm:p-2 text-center border-r border-slate-800/80 last:border-r-0 relative group bg-slate-900 sticky top-0 z-30 shadow-md align-top">`;

if (code.includes(targetThCardLf)) {
  code = code.replace(targetThCardLf, replacementThCardLf);
  console.log('Replaced thCard (LF)');
} else if (code.includes(targetThCardLf.replace(/\n/g, '\r\n'))) {
  code = code.replace(targetThCardLf.replace(/\n/g, '\r\n'), replacementThCardLf.replace(/\n/g, '\r\n'));
  console.log('Replaced thCard (CRLF)');
} else {
  console.log('Warning: targetThCard not found!');
}

// 4. Target card img size
const targetImgLf = `className="w-16 h-22 sm:w-24 sm:h-36 object-cover rounded-xl border border-amber-500/40 mx-auto shadow-lg"`;
const replacementImgLf = `className="w-12 h-16 sm:w-16 sm:h-24 md:w-20 md:h-28 object-cover rounded-lg sm:rounded-xl border border-amber-500/40 mx-auto shadow-md"`;

if (code.includes(targetImgLf)) {
  code = code.replace(targetImgLf, replacementImgLf);
  console.log('Replaced img size (LF)');
} else if (code.includes(targetImgLf.replace(/\n/g, '\r\n'))) {
  code = code.replace(targetImgLf.replace(/\n/g, '\r\n'), replacementImgLf.replace(/\n/g, '\r\n'));
  console.log('Replaced img size (CRLF)');
} else {
  console.log('Warning: targetImg not found!');
}

// 5. Target fallback div size if no img
const targetNoImgLf = `className="w-16 h-22 sm:w-24 sm:h-36 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-center text-xs text-amber-400 font-black mx-auto"`;
const replacementNoImgLf = `className="w-12 h-16 sm:w-16 sm:h-24 md:w-20 md:h-28 bg-slate-950 rounded-lg sm:rounded-xl border border-slate-800 flex items-center justify-center text-xs text-amber-400 font-black mx-auto"`;

if (code.includes(targetNoImgLf)) {
  code = code.replace(targetNoImgLf, replacementNoImgLf);
  console.log('Replaced noImg size (LF)');
} else if (code.includes(targetNoImgLf.replace(/\n/g, '\r\n'))) {
  code = code.replace(targetNoImgLf.replace(/\n/g, '\r\n'), replacementNoImgLf.replace(/\n/g, '\r\n'));
  console.log('Replaced noImg size (CRLF)');
} else {
  console.log('Warning: targetNoImg not found!');
}

fs.writeFileSync('src/app.jsx', code, 'utf8');
