$indexPath = "c:\Users\nekon\SFCCdeta\index.html"
$utf8 = New-Object System.Text.UTF8Encoding($false)

$bulletproofHtml = @"
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>サカつく2026 データベース & チームビルダー</title>


  <!-- Local Libraries -->
  <script src="./src/lib/react.min.js"></script>
  <script src="./src/lib/react-dom.min.js"></script>
  <script src="./src/lib/babel.min.js"></script>
  <script src="./src/lib/tailwind.js"></script>

  <style>
    body { background-color: #070a10; color: #f1f5f9; font-family: system-ui, -apple-system, sans-serif; }
    .glass-panel { background: rgba(15, 23, 42, 0.75); backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.08); }
    .glass-card { background: rgba(15, 23, 42, 0.6); backdrop-filter: blur(8px); }
  </style>
</head>
<body class="bg-[#070a10] text-slate-100 min-h-screen">
  <div id="root"></div>

  <!-- 1. Database (Pele & 146 Players) -->
  <script src="./src/data/mockData.js?v=$(Get-Date -Format 'yyyyMMddHHmmss')"></script>

  <!-- 2. React Application with Explicit React Preset -->
  <script type="text/babel" data-presets="react" src="./src/app.jsx?v=$(Get-Date -Format 'yyyyMMddHHmmss')"></script>
  <script type="text/babel" data-presets="react">
    window.addEventListener('DOMContentLoaded', () => {
      const rootElement = document.getElementById('root');
      if (rootElement && typeof App !== 'undefined') {
        const root = ReactDOM.createRoot(rootElement);
        root.render(React.createElement(App));
      }
    });
    // Fallback immediate render
    setTimeout(() => {
      const rootElement = document.getElementById('root');
      if (rootElement && rootElement.children.length === 0 && typeof App !== 'undefined') {
        const root = ReactDOM.createRoot(rootElement);
        root.render(React.createElement(App));
      }
    }, 300);
  </script>
</body>
</html>
"@

[System.IO.File]::WriteAllText($indexPath, $bulletproofHtml, $utf8)
Write-Host "Index.html configured with bulletproof React preset & fallback mounting!"
