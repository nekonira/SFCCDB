const fs = require('fs');
global.window = global;
require('../src/data/mockData.js');
require('../src/data/specialCardsData.js');

const players = global.INITIAL_PLAYERS;
const cards = global.OFFICIAL_SPECIAL_CARDS;

function normalizeStyle(str) {
  if (!str) return '';
  return str
    .replace(/\d+%/g, '')
    .replace(/up/gi, '')
    .replace(/ブレーカー/g, 'ブレイカー')
    .replace(/\s+/g, '')
    .toLowerCase();
}

function checkBonusMatchFixed(player, rawStyle) {
  if (!player || !rawStyle) return false;
  const parts = rawStyle.split('/');

  for (const part of parts) {
    const s = normalizeStyle(part);
    if (!s) continue;

    const pStyle = normalizeStyle(player.playStyle);
    const pPos = normalizeStyle(player.mainPosition);
    const pCat = normalizeStyle(player.category);
    const pNation = normalizeStyle(player.nationality);

    // 1. Nationality Match
    if (pNation && (pNation === s || pNation.includes(s) || s.includes(pNation))) return true;

    // 2. Exact Category Match (FW, MF, DF, GK)
    if (s === 'fw' || s === 'mf' || s === 'df' || s === 'gk') {
      if (pCat === s) return true;
    }

    // 3. Exact Position Match (CF, ST, WG, LW, RW, LM, RM, AM, DM, LFB, RFB, CB, GK)
    const posMap = {
      'cf': ['cf', 'st'],
      'st': ['cf', 'st'],
      'lw': ['lw', 'lwg', 'lwf'],
      'rw': ['rw', 'rwg', 'rwf'],
      'lm': ['lm', 'lmf'],
      'rm': ['rm', 'rmf'],
      'am': ['am', 'omf', 'amf', 'cam', 'om'],
      'dm': ['dm', 'dmf', 'dh', 'cmf', 'cm'],
      'lfb': ['lfb', 'lsb', 'lb', 'wb'],
      'rfb': ['rfb', 'rsb', 'rb', 'wb'],
      'cb': ['cb'],
      'gk': ['gk']
    };

    if (posMap[s]) {
      if (posMap[s].includes(pPos)) return true;
    } else if (pPos === s) {
      return true;
    }

    // 4. PlayStyle Specific Match ONLY (Do NOT fall back to position/category!)
    if (pStyle) {
      if (pStyle === s || pStyle.includes(s) || s.includes(pStyle)) return true;

      // Playstyle alias mappings
      if (s === 'ストライカー') {
        if (pStyle.includes('ストライカー') || pStyle.includes('ラインブレイカー') || pStyle.includes('ポストプレーヤー') || pStyle.includes('ターゲットマン') || pStyle.includes('ワイドストライカー')) return true;
      }
      if (s.includes('ラインブレイカー')) {
        if (pStyle.includes('ラインブレイカー')) return true;
      }
      if (s.includes('ポストプレーヤー')) {
        if (pStyle.includes('ポストプレーヤー') || pStyle.includes('ターゲットマン')) return true;
      }
      if (s.includes('ワイドストライカー')) {
        if (pStyle.includes('ワイドストライカー')) return true;
      }
      if (s.includes('サイドアタッカー')) {
        if (pStyle.includes('サイドアタッカー') || pStyle.includes('ウイングバック') || pStyle.includes('ウインガー')) return true;
      }
      if (s.includes('ドリブラー')) {
        if (pStyle.includes('ドリブラー') || pStyle.includes('テクニシャン')) return true;
      }
      if (s.includes('アタッカー')) {
        if (pStyle.includes('アタッカー') || pStyle.includes('サイドアタッカー') || pStyle.includes('ストライカー') || pStyle.includes('チャンスメーカー')) return true;
      }
      if (s.includes('パサー')) {
        if (pStyle.includes('パサー') || pStyle.includes('司令塔') || pStyle.includes('ゲームメーカー')) return true;
      }
      if (s.includes('セントラル')) {
        if (pStyle.includes('セントラル') || pStyle.includes('インサイドハーフ') || pStyle.includes('ボックス')) return true;
      }
      if (s.includes('ハードマーカー')) {
        if (pStyle.includes('ハードマーカー') || pStyle.includes('ハードプレス') || pStyle.includes('クラッシャー') || pStyle.includes('ハードタッカー')) return true;
      }
      if (s.includes('攻撃的fb')) {
        if (pStyle.includes('攻撃的')) return true;
      }
      if (s.includes('守備的fb')) {
        if (pStyle.includes('守備的')) return true;
      }
      if (s.includes('ストッパー')) {
        if (pStyle.includes('ストッパー')) return true;
      }
      if (s.includes('組立cb')) {
        if (pStyle.includes('組立') || pStyle.includes('ビルドアップ')) return true;
      }
      if (s.includes('スプリントcb')) {
        if (pStyle.includes('スプリント')) return true;
      }
      if (s.includes('オーソドックスgk')) {
        if (pStyle.includes('オーソドックス')) return true;
      }
      if (s.includes('スイーパーgk')) {
        if (pStyle.includes('スイーパー')) return true;
      }
    }
  }

  return false;
}

// Compare old vs new on sample cases
console.log("=== TESTING BEFORE & AFTER FIX ===");

const testCases = [
  { name: 'バストーニ', card: 'アレッサンドロ・バストーニ【攻守万能のクストーデ】', expected: false, note: 'Bastoni is 組立CB, card requires ストッパー' },
  { name: 'バストーニ', card: 'アレッサンドロ・バストーニ【エリア95】', expected: true, note: 'Bastoni is 組立CB, card requires 組立CB' },
  { name: '上田綺世', card: 'ケヴィン・デ・ブライネ【アシストキング】', expected: false, note: 'Ueda is FW, card requires パサー' },
  { name: '上田綺世', card: '上田綺世【日本のエース】', expected: true, note: 'Ueda matches card' },
  { name: 'デ・ブライネ', card: 'ニコラス・オタメンディ【闘将の咆哮】', expected: false, note: 'De Bruyne is MF, card requires ストッパー' },
  { name: 'エミリアーノ・マルティネス', card: 'バルト・フェルブルッヘン【ブルーガルの守護神】', expected: false, note: 'Martinez is オーソドックスGK, card requires スイーパーGK' },
  { name: 'エミリアーノ・マルティネス', card: 'エミリアーノ・マルティネス【世界最強の道化師】', expected: true, note: 'Martinez is オーソドックスGK, card requires オーソドックスGK' },
];

testCases.forEach(tc => {
  const player = players.find(p => p.name.includes(tc.name));
  const card = cards.find(c => c.name.includes(tc.card));
  if (!player || !card) {
    console.log(`[ERR] Not found: ${tc.name} / ${tc.card}`);
    return;
  }
  const match = checkBonusMatchFixed(player, card.playstyleBonus?.style || '');
  const ok = (match === tc.expected) ? "PASS" : "FAIL";
  console.log(`[${ok}] ${player.name} (${player.playStyle}, ${player.mainPosition}) + Card "${card.name}" (${card.playstyleBonus?.style}): Match=${match} (Expected: ${tc.expected}) -> ${tc.note}`);
});
