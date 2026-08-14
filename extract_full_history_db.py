import json
import os

log_path = r"C:\Users\nekon\.gemini\antigravity-ide\brain\d5a8fc00-3f38-416e-a6d5-880cde2dd192\.system_generated\logs\transcript_full.jsonl"
out_path = r"c:\Users\nekon\SFCCdeta\src\data\mockData.js"

longest_code = ""

if os.path.exists(log_path):
    with open(log_path, 'r', encoding='utf-8') as f:
        for line in f:
            if "INITIAL_PLAYERS" in line:
                try:
                    data = json.loads(line)
                    # search recursively for string with INITIAL_PLAYERS and maximum length
                    s = json.dumps(data, ensure_ascii=False)
                    # find all occurrences of code
                    start = 0
                    while True:
                        idx = s.find("window.INITIAL_PLAYERS = [", start)
                        if idx == -1:
                            idx = s.find("const INITIAL_PLAYERS = [", start)
                        if idx == -1:
                            break
                        end_idx = s.find("];", idx)
                        if end_idx != -1:
                            code = s[idx:end_idx+2]
                            code = code.replace('\\n', '\n').replace('\\"', '"').replace('\\\\', '\\')
                            if len(code) > len(longest_code):
                                longest_code = code
                            start = end_idx + 2
                        else:
                            break
                except Exception:
                    pass

print(f"Longest db block found: {len(longest_code)}")
if len(longest_code) > 50000:
    full_js = longest_code + "\n\nwindow.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };"
    with open(out_path, 'w', encoding='utf-8') as f:
        f.write(full_js)
    print("Full original database restored successfully!")
else:
    print("Trying alternative extraction...")
