const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== Syncing Skill Descriptions Across Database & Special Cards ===');

const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
const specialCardsPath = path.join(__dirname, 'src', 'data', 'specialCardsData.js');
const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
const appJsPath = path.join(__dirname, 'src', 'app.js');

let mockCode = fs.readFileSync(mockPath, 'utf-8');
let scCode = fs.readFileSync(specialCardsPath, 'utf-8');
let appJsx = fs.readFileSync(appJsxPath, 'utf-8');

// 1. Target Descriptions to update
const targetSkillDescriptions = {
  '予測不能': '発動エリア：前左右・中左右　/　発動条件：ドリブル中　/　突破力・キープ力UP　/　成功時にショートパス発生確率UP',
  'ベルベットパス': '発動エリア：前中・中中　/　発動条件：CFの位置に居る選手へのショートパス時　/　ショートパス・キック精度UP　/　成功時に受け手のシュート発生確率UP',
  '上空の覇者': '発動エリア：前中　/　発動条件：ヘディングシュート時　/　決定力・ジャンプUP'
};

// 2. Update mockData.js
Object.entries(targetSkillDescriptions).forEach(([skillName, newDesc]) => {
  const regex = new RegExp(`(name:\\s*['"]${skillName}['"][\\s]*,[\\s]*rank:\\s*['"]金['"][\\s]*,[\\s]*description:\\s*['"])(.*?)(['"])`, 'g');
  let count = 0;
  mockCode = mockCode.replace(regex, (match, p1, p2, p3) => {
    count++;
    return p1 + newDesc + p3;
  });
  console.log(`Updated ${count} occurrence(s) of 「${skillName}」 in mockData.js`);
});
fs.writeFileSync(mockPath, mockCode, 'utf-8');

// 3. Update specialCardsData.js
Object.entries(targetSkillDescriptions).forEach(([skillName, newDesc]) => {
  const regex = new RegExp(`(name:\\s*['"]${skillName}['"][\\s]*,[\\s]*rank:\\s*['"]金['"][\\s]*,[\\s]*description:\\s*['"])(.*?)(['"])`, 'g');
  let count = 0;
  scCode = scCode.replace(regex, (match, p1, p2, p3) => {
    count++;
    return p1 + newDesc + p3;
  });
  console.log(`Updated ${count} occurrence(s) of 「${skillName}」 in specialCardsData.js`);
});
fs.writeFileSync(specialCardsPath, scCode, 'utf-8');

// 4. Update individual player files for Velvet Pass / Yosoku Funo if any
const playerFiles = fs.readdirSync(__dirname).filter(f => f.startsWith('add_') && f.endsWith('.js'));
playerFiles.forEach(file => {
  const fullP = path.join(__dirname, file);
  let content = fs.readFileSync(fullP, 'utf-8');
  let updated = false;
  Object.entries(targetSkillDescriptions).forEach(([skillName, newDesc]) => {
    const regex = new RegExp(`(name:\\s*['"]${skillName}['"][\\s]*,[\\s]*rank:\\s*['"]金['"][\\s]*,[\\s]*description:\\s*['"])(.*?)(['"])`, 'g');
    if (regex.test(content)) {
      content = content.replace(regex, `$1${newDesc}$3`);
      updated = true;
    }
  });
  if (updated) {
    fs.writeFileSync(fullP, content, 'utf-8');
    console.log(`Updated skill descriptions in ${file}`);
  }
});

// 5. Enhance getSpecialCardSkill in app.jsx to dynamically lookup description from mockData if missing or redundant
const oldSkillHelper = `const getSpecialCardSkill = (c) => {
  if (!c) return null;
  if (c.skill) return c.skill;
  return null;
};`;

const newSkillHelper = `const getSpecialCardSkill = (c) => {
  if (!c) return null;
  const sk = c.skill || null;
  if (!sk) return null;

  // Sync skill description with player DB if description is missing or equal to skill name
  if (!sk.description || sk.description === sk.name) {
    if (window.INITIAL_PLAYERS && Array.isArray(window.INITIAL_PLAYERS)) {
      for (const p of window.INITIAL_PLAYERS) {
        if (p.skill && p.skill.name === sk.name && p.skill.description && p.skill.description !== sk.name) {
          return { ...sk, description: p.skill.description };
        }
      }
    }
  }
  return sk;
};`;

if (appJsx.includes(oldSkillHelper)) {
  appJsx = appJsx.replace(oldSkillHelper, newSkillHelper);
  console.log('5. Enhanced getSpecialCardSkill in app.jsx to link missing descriptions dynamically with player DB');
  fs.writeFileSync(appJsxPath, appJsx, 'utf-8');
} else {
  // Replace if formatting differs
  appJsx = appJsx.replace(
    /const getSpecialCardSkill = \(c\) => \{[\s\S]*?\};/,
    newSkillHelper
  );
  console.log('5. Replaced getSpecialCardSkill helper in app.jsx');
  fs.writeFileSync(appJsxPath, appJsx, 'utf-8');
}

// 6. Transpile app.jsx -> app.js using Babel
const babelPath = path.join(__dirname, 'src', 'lib', 'babel.min.js');
const babelCode = fs.readFileSync(babelPath, 'utf-8');
const sandbox = {};
vm.createContext(sandbox);
vm.runInContext(babelCode, sandbox);

const Babel = sandbox.Babel;
const transpiled = Babel.transform(appJsx, {
  presets: [['react', { runtime: 'classic' }]]
});

fs.writeFileSync(appJsPath, transpiled.code, 'utf-8');
console.log(`6. Transpiled src/app.jsx -> src/app.js (${transpiled.code.length} bytes)`);

console.log('=== SKILL SYNC & DESCRIPTIONS UPDATE COMPLETE! ===');
