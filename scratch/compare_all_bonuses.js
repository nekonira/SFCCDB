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

// OLD implementation from src/app.jsx
function checkBonusMatchOld(player, rawStyle) {
  if (!player || !rawStyle) return false;
  const parts = rawStyle.split('/');

  for (const part of parts) {
    const s = normalizeStyle(part);
    if (!s) continue;

    const pStyle = normalizeStyle(player.playStyle);
    const pPos = normalizeStyle(player.mainPosition);
    const pCat = normalizeStyle(player.category);
    const pNation = normalizeStyle(player.nationality);

    if (pPos && (pPos === s || (s.length >= 2 && pPos.includes(s)) || (pPos.length >= 2 && s.includes(pPos)))) return true;
    if (pCat && (pCat === s || pCat.includes(s) || s.includes(pCat))) return true;
    if (pNation && (pNation === s || pNation.includes(s) || s.includes(pNation))) return true;

    if (pStyle) {
      if (pStyle === s || pStyle.includes(s) || s.includes(pStyle)) return true;

      if ((s === 'cf' || s === 'st' || s === 'ストライカー') && (pPos === 'cf' || pStyle.includes('ストライカー') || pStyle.includes('ラインブレイカー') || pStyle.includes('ポストプレーヤー') || pStyle.includes('ワイドストライカー'))) return true;
      if (s.includes('ラインブレイカー') && (pStyle.includes('ラインブレイカー') || pStyle.includes('ストライカー') || pPos === 'cf')) return true;
      if (s.includes('ポストプレーヤー') && (pStyle.includes('ポストプレーヤー') || pStyle.includes('ストライカー') || pPos === 'cf')) return true;
      if (s.includes('ワイドストライカー') && (pStyle.includes('ワイドストライカー') || pPos === 'lw' || pPos === 'rw')) return true;

      if (s.includes('サイドアタッカー') && (pStyle.includes('サイドアタッカー') || pPos === 'lm' || pPos === 'rm' || pPos === 'lw' || pPos === 'rw')) return true;
      if (s.includes('ドリブラー') && (pStyle.includes('ドリブラー') || pPos === 'lw' || pPos === 'rw' || pPos === 'lm' || pPos === 'rm')) return true;
      if (s.includes('アタッカー') && (pStyle.includes('アタッカー') || pStyle.includes('サイドアタッカー') || pCat === 'fw' || pCat === 'mf')) return true;

      if (s.includes('パサー') && (pStyle.includes('パサー') || pCat === 'mf')) return true;
      if ((s.includes('セントラル') || s.includes('セントラルmf')) && (pStyle.includes('セントラル') || pPos === 'am' || pPos === 'dm' || pCat === 'mf')) return true;
      if (s.includes('ハードマーカー') && (pStyle.includes('ハードマーカー') || pStyle.includes('ハードタッカー') || pPos === 'dm' || pPos === 'cb')) return true;

      if (s.includes('攻撃的fb') && (pStyle.includes('攻撃的') || pPos === 'lfb' || pPos === 'rfb')) return true;
      if (s.includes('守備的fb') && (pStyle.includes('守備的') || pPos === 'lfb' || pPos === 'rfb')) return true;
      if ((s === 'fb' || s === 'lfb' || s === 'rfb' || s.includes('サイドバック')) && (pPos === 'lfb' || pPos === 'rfb' || pStyle.includes('lfb') || pStyle.includes('rfb'))) return true;

      if (s.includes('ストッパー') && (pStyle.includes('ストッパー') || pPos === 'cb')) return true;
      if (s.includes('組立cb') && (pStyle.includes('組立') || pPos === 'cb')) return true;
      if (s.includes('スプリントcb') && (pStyle.includes('スプリント') || pPos === 'cb')) return true;
      if (s === 'cb' && (pPos === 'cb' || pStyle.includes('cb') || pCat === 'df')) return true;

      if ((s.includes('オーソドックスgk') || s.includes('スイーパーgk') || s === 'gk') && (pPos === 'gk' || pCat === 'gk' || pStyle.includes('gk'))) return true;
    }
  }

  return false;
}

// NEW strict implementation
function checkBonusMatchNew(player, rawStyle) {
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

    // 2. Category Match (FW, MF, DF, GK)
    if (s === 'fw' || s === 'mf' || s === 'df' || s === 'gk') {
      if (pCat === s) return true;
    }

    // 3. Position Match (CF, ST, WG, LW, RW, LM, RM, AM, DM, LFB, RFB, CB, GK)
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

    // 4. PlayStyle Specific Match ONLY (Strict matching against playStyle)
    if (pStyle) {
      if (pStyle === s || pStyle.includes(s) || s.includes(pStyle)) return true;

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

let totalDiffs = 0;
const diffSamples = [];

players.forEach(p => {
  cards.forEach(c => {
    if (!c.playstyleBonus) return;
    const stylesToCheck = [];
    if (c.playstyleBonus.bonuses && Array.isArray(c.playstyleBonus.bonuses)) {
      c.playstyleBonus.bonuses.forEach(b => stylesToCheck.push(b.style));
    } else if (c.playstyleBonus.style) {
      stylesToCheck.push(c.playstyleBonus.style);
    }

    stylesToCheck.forEach(st => {
      const oldRes = checkBonusMatchOld(p, st);
      const newRes = checkBonusMatchNew(p, st);

      if (oldRes !== newRes) {
        totalDiffs++;
        if (diffSamples.length < 25) {
          diffSamples.push({
            player: `${p.name} (${p.mainPosition} | ${p.playStyle} | ${p.category})`,
            card: `${c.name}`,
            targetStyle: st,
            oldResult: oldRes,
            newResult: newRes
          });
        }
      }
    });
  });
});

console.log(`Total mismatch instances found between Old vs New algorithm: ${totalDiffs}`);
console.log("\nSample Differences (Where Old incorrectly granted bonus):");
diffSamples.forEach((d, i) => {
  console.log(`${i+1}. Player: ${d.player}`);
  console.log(`   Card: ${d.card}`);
  console.log(`   Bonus Target: "${d.targetStyle}" -> Old: ${d.oldResult}, New: ${d.newResult}`);
});
