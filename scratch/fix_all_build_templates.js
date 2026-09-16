const fs = require('fs');
const path = require('path');

console.log('=== ADDING GOOGLE ADSENSE TAG TO ALL INDEX TEMPLATE SCRIPTS ===');

const adSenseSnippet = `  <!-- Google AdSense -->\n  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7254824656295291"\n     crossorigin="anonymous"></script>\n`;

const targetFiles = [
  'build_clean_index.ps1',
  'build_pure_app_standalone.js',
  'build_standalone_pure.js',
  'build_pure_app.js',
  'build_index_with_all_images.js',
  'build_failproof_index.ps1',
  'build_clean_index.py',
  'clean_index_structure.ps1',
  'setup_bulletproof_app.ps1',
  'setup_local_html.ps1'
];

let updatedCount = 0;

for (const relPath of targetFiles) {
  const fullPath = path.join(__dirname, '..', relPath);
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf-8');
    if (!content.includes('ca-pub-7254824656295291')) {
      content = content.replace(
        '<title>サカつく2026 データベース & チームビルダー</title>',
        `<title>サカつく2026 データベース & チームビルダー</title>\n${adSenseSnippet}`
      );
      fs.writeFileSync(fullPath, content, 'utf-8');
      console.log(`Updated template: ${relPath}`);
      updatedCount++;
    }
  }
}

console.log(`Updated ${updatedCount} build template scripts!`);
