import re, json

with open('src/data/mockData.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Find all blocks with id and name
matches = re.findall(r"id:\s*['\"]([^'\"]+)['\"].*?name:\s*['\"]([^'\"]+)['\"]", content, re.DOTALL)
print(f"Total id+name pairs: {len(matches)}")

for i, (pid, name) in enumerate(matches):
    if "K1 BEST11" in name or "東口" in name or i in range(125, 140):
        print(f"[{i:3d}] ID: {pid:10s} | Name: {name}")

# Check duplicates of names
names = [m[1] for m in matches]
from collections import Counter
c = Counter(names)
dups = {k: v for k, v in c.items() if v > 1}
print("\n--- DUPLICATED NAMES ---")
for k, v in dups.items():
    print(f"{v}x : {k}")
