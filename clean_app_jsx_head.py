import sys

path = r"c:\Users\nekon\SFCCdeta\src\app.jsx"

with open(path, 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

# Replace the garbled head cleanly
head_pattern = """const { useState, useEffect, useMemo } = React;
const POSITIONS = ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'];
const POLICIES = ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'];
const RARITIES = ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'];
const PLAY_STYLE_LEVELS = ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'];
const PLAY_STYLES = ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'];
const INITIAL_PLAYERS = window.INITIAL_PLAYERS || [];
const INITIAL_MANAGERS = window.INITIAL_MANAGERS || [];
const INITIAL_COMBOS = window.INITIAL_COMBOS || [];"""

# Find index of OFFSETS
idx = text.find("const OFFSETS =")
if idx > 0:
    new_text = head_pattern + "\n\n" + text[idx:]
    with open(path, 'w', encoding='utf-8') as f:
        f.write(new_text)
    print("app.jsx head cleaned perfectly with Python!")
