import os

cwd = r"c:\Users\nekon\SFCCdeta"
data_dir = os.path.join(cwd, "src", "data")
image_files = sorted([f for f in os.listdir(data_dir) if f.endswith("Image.js")])

script_tags = "\n".join([f'  <script src="./src/data/{f}"></script>' for f in image_files])

html_content = f"""<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>サカつく2026 データベース & チームビルダー</title>
  
  <script>
    try {{ localStorage.clear(); }} catch(e) {{}}
  </script>

  <!-- Local Libraries -->
  <script src="./src/lib/react.min.js"></script>
  <script src="./src/lib/react-dom.min.js"></script>
  <script src="./src/lib/babel.min.js"></script>
  <script src="./src/lib/tailwind.js"></script>

  <style>
    body {{ background-color: #070a10; color: #f1f5f9; font-family: system-ui, -apple-system, sans-serif; }}
    .glass-panel {{ background: rgba(15, 23, 42, 0.75); backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.08); }}
    .glass-card {{ background: rgba(15, 23, 42, 0.6); backdrop-filter: blur(8px); }}
  </style>
</head>
<body class="bg-[#070a10] text-slate-100 min-h-screen">
  <div id="root"></div>

  <!-- 1. Player Photos ({len(image_files)} Image Files) -->
{script_tags}

  <!-- 2. Full Player Database -->
  <script src="./src/data/mockData.js"></script>

  <!-- 3. React Application Script -->
  <script type="text/babel" data-presets="react" src="./src/app.jsx"></script>
  <script type="text/babel" data-presets="react" src="./src/main.jsx"></script>
</body>
</html>
"""

index_path = os.path.join(cwd, "index.html")
with open(index_path, "w", encoding="utf-8") as f:
    f.write(html_content)

print(f"Index.html successfully generated in pure UTF-8 with {len(image_files)} image scripts!")
