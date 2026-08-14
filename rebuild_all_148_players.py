import json
import re
import os

log_path = r"C:\Users\nekon\.gemini\antigravity-ide\brain\d5a8fc00-3f38-416e-a6d5-880cde2dd192\.system_generated\logs\transcript_full.jsonl"
out_path = r"c:\Users\nekon\SFCCdeta\src\data\mockData.js"

all_players = {}

# Parse all lines from transcript_full.jsonl to capture every single player object
if os.path.exists(log_path):
    with open(log_path, 'r', encoding='utf-8') as f:
        for line in f:
            if "id: 'p" in line or '"id": "p' in line:
                # Find all player blocks like { id: 'p...', ... }
                # Extract objects
                matches = re.findall(r"\{\s*id:\s*['\"](p\d+)['\"].*?avatarUrl:\s*['\"].*?['\"]\s*\}", line, re.DOTALL)
                for m in matches:
                    # Parse player id
                    pid_match = re.search(r"id:\s*['\"](p\d+)['\"]", m)
                    if pid_match:
                        pid = pid_match.group(1)
                        if pid not in all_players or len(m) > len(all_players[pid]):
                            all_players[pid] = m

print(f"Extracted unique players count: {len(all_players)}")

# If matches via regex on whole line:
if len(all_players) < 50:
    print("Scanning log file with deeper chunk parser...")
    with open(log_path, 'r', encoding='utf-8') as f:
        full_log = f.read()
        
    # Unescape JSON escaped newlines
    clean_log = full_log.replace('\\n', '\n').replace('\\"', '"').replace('\\\\', '\\')
    
    # Match player objects by pattern
    player_pattern = r"\{\s*id:\s*['\"](p\d+)['\"].*?name:\s*['\"]([^'\"]+)['\"].*?overall:\s*\d+.*?avatarUrl:\s*['\"].*?['\"]\s*\}"
    found = re.findall(player_pattern, clean_log, re.DOTALL)
    
    # Search for all raw player blocks
    # Split by { id: 'p
    blocks = clean_log.split("{ id: 'p")
    if len(blocks) < 10:
        blocks = clean_log.split('{\n id: \'p')
    if len(blocks) < 10:
        blocks = clean_log.split('{\n    id: \'p')

    print(f"Total raw blocks found: {len(blocks)}")
