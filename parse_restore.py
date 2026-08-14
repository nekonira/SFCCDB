import re

with open('restore_all_players.py', 'r', encoding='utf-8') as f:
    text = f.read()

# Match player names
names = re.findall(r"name:\s*'([^']+)'", text)
print(f"Total player names in restore_all_players.py: {len(names)}")

# Filter out ability/skill names (which have rank or description in object)
# Player objects have id: 'p...'
players = []
blocks = text.split("id: 'p")
for b in blocks[1:]:
    pid = "p" + b.split("'")[0]
    m_name = re.search(r"name:\s*'([^']+)'", b)
    pname = m_name.group(1) if m_name else "Unknown"
    players.append((pid, pname))

print(f"Total players extracted: {len(players)}")
for pid, pname in players:
    if "東口" in pname or "K1 BEST11" in pname or "J1 BEST11" in pname or int(pid.replace('p','')) >= 120:
        print(f"ID: {pid:6s} | Name: {pname}")

from collections import Counter
c = Counter([p[1] for p in players])
dups = {k: v for k, v in c.items() if v > 1}
print("\nDuplicates:")
for k, v in dups.items():
    print(f"{v}x : {k}")
