const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const addFiles = fs.readdirSync(rootDir).filter(f => f.startsWith('add_') && f.endsWith('.js'));

const extractedMappings = {};

addFiles.forEach(f => {
  const content = fs.readFileSync(path.join(rootDir, f), 'utf-8');
  
  // Extract image variable created in step 1 of add_*.js script
  const imgVarMatch = content.match(/window\.([A-Z0-9_]+_IMAGE)\s*=/);
  
  // Extract main player object created in step 2 of add_*.js script
  const idMatch = content.match(/id:\s*['"](p\d+)['"]/);
  const nameMatch = content.match(/name:\s*['"]([^'"]+)['"]/);

  if (idMatch && imgVarMatch) {
    const pid = idMatch[1];
    const varName = imgVarMatch[1];
    const pname = nameMatch ? nameMatch[1] : '';
    extractedMappings[pid] = { varName, name: pname, source: f };
  }
});

console.log('Extracted mappings from add_*.js files:', Object.keys(extractedMappings).length);

fs.writeFileSync(path.join(rootDir, 'scratch', 'add_scripts_extracted_map.json'), JSON.stringify(extractedMappings, null, 2), 'utf-8');
