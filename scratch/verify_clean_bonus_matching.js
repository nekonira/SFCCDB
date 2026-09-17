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

function checkBonusMatch(player, rawStyle) {
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

    // 3. Exact Position Match
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

    // 4. PlayStyle Specific Match ONLY (Strict, no bogus position fallbacks!)
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

function calculateCardBonusMult(player, card) {
  if (!player || !card || !card.playstyleBonus) return 1.0;
  let mult = 1.0;

  if (card.playstyleBonus.bonuses && Array.isArray(card.playstyleBonus.bonuses)) {
    card.playstyleBonus.bonuses.forEach(b => {
      if (checkBonusMatch(player, b.style)) {
        mult += (Number(b.percent) || 0) / 100;
      }
    });
  } else if (card.playstyleBonus.style) {
    if (checkBonusMatch(player, card.playstyleBonus.style)) {
      mult += (Number(card.playstyleBonus.percent) || 0) / 100;
    }
  }

  return parseFloat(mult.toFixed(2));
}

// Verification checks
console.log("=== VERIFYING KNOWN PLAYERS & CARDS ===");

const keyChecks = [
  // CB playstyle tests
  { pName: 'ヴィルジル・ファン・ダイク', cName: 'フィルジル・ファン・ダイク【赤き勝者の雄叫び】', expectedBonus: 1.25, reason: 'Van Dijk is 組立CB, card is 組立CB (25% UP)' },
  { pName: 'ヴィルジル・ファン・ダイク', cName: 'アレッサンドロ・バストーニ【攻守万能のクストーデ】', expectedBonus: 1.0, reason: 'Van Dijk is 組立CB, card is ストッパー (No match)' },
  { pName: 'アントニオ・リュディガー', cName: 'アントニオ・リュディガー【狂喜のゲルマンファイター】', expectedBonus: 1.30, reason: 'Rudiger is ストッパー, card is ストッパー (30% UP)' },
  { pName: 'アントニオ・リュディガー', cName: 'フィルジル・ファン・ダイク【赤き勝者の雄叫び】', expectedBonus: 1.0, reason: 'Rudiger is ストッパー, card is 組立CB (No match)' },
  { pName: 'ロナルド・アラウホ', cName: 'ロナルド・アラウホ【不敗の空中戦】', expectedBonus: 1.35, reason: 'Araujo is スプリントCB, card is スプリントCB (35% UP)' },
  { pName: 'ミッキー・ファン・デ・フェン', cName: 'ミッキー・ファン・デ・フェン【ノースロンドンの装甲列車】', expectedBonus: 1.40, reason: 'Van de Ven is 組立CB. Card has 組立CB 30% + CB 10% -> 40% UP' },

  // GK playstyle tests
  { pName: 'エミリアーノ・マルティネス', cName: 'エミリアーノ・マルティネス【世界最強の道化師】', expectedBonus: 1.30, reason: 'Martinez is オーソドックスGK, card is オーソドックスGK (30% UP)' },
  { pName: 'エミリアーノ・マルティネス', cName: 'バルト・フェルブルッヘン【ブルーガルの守護神】', expectedBonus: 1.0, reason: 'Martinez is オーソドックスGK, card is スイーパーGK (No match)' },
  { pName: 'バルト・フェルブルッヘン', cName: 'バルト・フェルブルッヘン【ブルーガルの守護神】', expectedBonus: 1.30, reason: 'Verbruggen is スイーパーGK, card is スイーパーGK (30% UP)' },

  // FW playstyle tests
  { pName: 'ペレ', cName: 'ペレ【キング・オブ・サッカー】', expectedBonus: 1.40, reason: 'Pele is ラインブレーカー. Card has ラインブレーカー 30% + CF 10% -> 40% UP' },
  { pName: 'ペレ', cName: 'オリヴィエ・ジルー【試合を決める赤黒のジョセット】', expectedBonus: 1.10, reason: 'Pele is CF (10% CF bonus matches), but NOT ポストプレーヤー (30% bonus does NOT match) -> Total 1.10x' },
  { pName: 'アーリング・ハーランド', cName: 'アーリング・ハーランド【破壊的ストライカーの進化形】', expectedBonus: 1.30, reason: 'Haaland is ストライカー, card is ストライカー (30% UP)' },
  { pName: 'アーリング・ハーランド', cName: 'キリアン・エンバペ【新時代の怪物】', expectedBonus: 1.10, reason: 'Haaland is CF (10% CF bonus matches), but NOT ラインブレーカー (15% bonus does NOT match) -> Total 1.10x' },

  // Nationality bonus tests
  { pName: '久保建英', cName: '影山優佳【知の探究者】', expectedBonus: 1.10, reason: 'Kubo is 日本 (10% 日本 bonus matches), but NOT 組立CB (40% bonus does NOT match) -> Total 1.10x' }
];

let passCount = 0;
keyChecks.forEach(kc => {
  const player = players.find(p => p.name.includes(kc.pName));
  const card = cards.find(c => c.name.includes(kc.cName));
  if (!player || !card) {
    console.log(`[ERR] Missing target: ${kc.pName} / ${kc.cName}`);
    return;
  }

  const bonusMult = calculateCardBonusMult(player, card);
  const ok = Math.abs(bonusMult - kc.expectedBonus) < 0.001;
  if (ok) passCount++;

  console.log(`[${ok ? 'PASS' : 'FAIL'}] ${player.name} + "${card.name}"`);
  console.log(`       Got: ${bonusMult}x | Expected: ${kc.expectedBonus}x | Reason: ${kc.reason}`);
});

console.log(`\nResults: ${passCount} / ${keyChecks.length} tests passed.`);
