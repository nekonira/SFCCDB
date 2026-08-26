const fs = require('fs');
const path = require('path');

console.log('=== APPLYING GAVI POSITION FIX AND NATION BADGE COLOR UNIFICATION ===');

const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
const addGaviPath = path.join(__dirname, 'add_gavi.js');
const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
const appJsPath = path.join(__dirname, 'src', 'app.js');

// 1. Update Gavi mainPosition in mockData.js
let mockCode = fs.readFileSync(mockPath, 'utf-8');
const p375Idx = mockCode.indexOf("id: 'p375'");
if (p375Idx !== -1) {
  const dmfIdx = mockCode.indexOf("mainPosition: 'DMF'", p375Idx);
  if (dmfIdx !== -1 && dmfIdx < p375Idx + 200) {
    mockCode = mockCode.substring(0, dmfIdx) + "mainPosition: 'DM'" + mockCode.substring(dmfIdx + "mainPosition: 'DMF'".length);
    fs.writeFileSync(mockPath, mockCode, 'utf-8');
    console.log("1. Updated Gavi (p375) mainPosition from 'DMF' to 'DM' in mockData.js");
  }
}

// Update add_gavi.js if exists
if (fs.existsSync(addGaviPath)) {
  let addGaviCode = fs.readFileSync(addGaviPath, 'utf-8');
  addGaviCode = addGaviCode.replace("mainPosition: 'DMF'", "mainPosition: 'DM'");
  fs.writeFileSync(addGaviPath, addGaviCode, 'utf-8');
  console.log("2. Updated add_gavi.js");
}

// 2. Unify Nation Bonus Starter Count Badge Color in app.jsx
let jsxCode = fs.readFileSync(appJsxPath, 'utf-8');
const oldJsxBadge = `<span className="px-2 py-0.5 rounded bg-red-500 text-white font-black text-[11px] whitespace-nowrap shadow">`;
const newJsxBadge = `<span className="px-2 py-0.5 rounded bg-amber-400 text-slate-950 font-black text-[11px] whitespace-nowrap shadow">`;

if (jsxCode.includes(oldJsxBadge)) {
  jsxCode = jsxCode.replace(oldJsxBadge, newJsxBadge);
  fs.writeFileSync(appJsxPath, jsxCode, 'utf-8');
  console.log("3. Unified Spain nation bonus badge color to amber-400 in app.jsx");
}

// 3. Unify Nation Bonus Starter Count Badge Color in app.js
let jsCode = fs.readFileSync(appJsPath, 'utf-8');
const oldJsBadge = `className: "px-2 py-0.5 rounded bg-red-500 text-white font-black text-[11px] whitespace-nowrap shadow"`;
const newJsBadge = `className: "px-2 py-0.5 rounded bg-amber-400 text-slate-950 font-black text-[11px] whitespace-nowrap shadow"`;

if (jsCode.includes(oldJsBadge)) {
  jsCode = jsCode.replace(oldJsBadge, newJsBadge);
  fs.writeFileSync(appJsPath, jsCode, 'utf-8');
  console.log("4. Unified Spain nation bonus badge color to amber-400 in app.js");
}

console.log('=== ALL FIXES APPLIED SUCCESSFULLY! ===');
