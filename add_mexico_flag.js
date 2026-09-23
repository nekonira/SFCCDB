const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const appJsPath = path.join(rootDir, 'src', 'app.js');
const appJsxPath = path.join(rootDir, 'src', 'app.jsx');
const addFlagsPath = path.join(rootDir, 'add_country_flags.js');
const replaceFlagsPath = path.join(rootDir, 'replace_emoji_with_flagcdn.js');

console.log('--- Adding Mexico Flag (🇲🇽 / mx) to Country Maps ---');

// 1. Update src/app.js
let appJs = fs.readFileSync(appJsPath, 'utf-8');
if (!appJs.includes("'メキシコ'")) {
  appJs = appJs.replace(
    "'香港':'hk'",
    "'香港':'hk','メキシコ':'mx'"
  );
  if (appJs.includes("const COUNTRY_FLAG_MAP")) {
    appJs = appJs.replace(
      "'香港': '🇭🇰'",
      "'香港': '🇭🇰',\n  'メキシコ': '🇲🇽'"
    );
  }
  fs.writeFileSync(appJsPath, appJs, 'utf-8');
  console.log('[1/4] Updated src/app.js with Mexico flag mapping');
} else {
  console.log('[1/4] src/app.js already contains Mexico');
}

// 2. Update src/app.jsx
let appJsx = fs.readFileSync(appJsxPath, 'utf-8');
if (!appJsx.includes("'メキシコ'")) {
  appJsx = appJsx.replace(
    "'香港':'hk'",
    "'香港':'hk','メキシコ':'mx'"
  );
  if (appJsx.includes("'香港': 'hk'")) {
    appJsx = appJsx.replace(
      "'香港': 'hk'",
      "'香港': 'hk',\n  'メキシコ': 'mx'"
    );
  }
  if (appJsx.includes("const COUNTRY_FLAG_MAP")) {
    appJsx = appJsx.replace(
      "'香港': '🇭🇰'",
      "'香港': '🇭🇰',\n  'メキシコ': '🇲🇽'"
    );
  }
  fs.writeFileSync(appJsxPath, appJsx, 'utf-8');
  console.log('[2/4] Updated src/app.jsx with Mexico flag mapping');
} else {
  console.log('[2/4] src/app.jsx already contains Mexico');
}

// 3. Update add_country_flags.js
if (fs.existsSync(addFlagsPath)) {
  let addFlags = fs.readFileSync(addFlagsPath, 'utf-8');
  if (!addFlags.includes("'メキシコ'")) {
    addFlags = addFlags.replace(
      "'香港': '🇭🇰'",
      "'香港': '🇭🇰',\n  'メキシコ': '🇲🇽'"
    );
    fs.writeFileSync(addFlagsPath, addFlags, 'utf-8');
    console.log('[3/4] Updated add_country_flags.js');
  }
}

// 4. Update replace_emoji_with_flagcdn.js
if (fs.existsSync(replaceFlagsPath)) {
  let replaceFlags = fs.readFileSync(replaceFlagsPath, 'utf-8');
  if (!replaceFlags.includes("'メキシコ'")) {
    replaceFlags = replaceFlags.replace(
      "'香港': 'hk'",
      "'香港': 'hk',\n  'メキシコ': 'mx'"
    );
    replaceFlags = replaceFlags.replace(
      "'香港': 'hk'",
      "'香港': 'hk',\n  'メキシコ': 'mx'"
    );
    fs.writeFileSync(replaceFlagsPath, replaceFlags, 'utf-8');
    console.log('[4/4] Updated replace_emoji_with_flagcdn.js');
  }
}

console.log('--- ALL MEXICO FLAG MAPPINGS APPLIED SUCCESSFULLY! ---');
