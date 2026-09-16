const fs = require('fs');

let content = fs.readFileSync('src/app.jsx', 'utf8');

// 1. Add normalizeStyle & checkBonusMatch & calculateCardBonusMult helper functions
const helperCode = `
// ─────────────────────────────────────────────────────────────
// プレイスタイル表記揺れ正規化 ＆ ボーナス倍率判定ヘルパー
// ─────────────────────────────────────────────────────────────
function normalizeStyle(str) {
  if (!str) return '';
  return str
    .replace(/\\d+%/g, '')
    .replace(/ブレーカー/g, 'ブレイカー')
    .replace(/\\s+/g, '')
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

    if (pStyle && (pStyle.includes(s) || s.includes(pStyle))) return true;
    if (pPos && (pPos.includes(s) || s.includes(pPos))) return true;
    if (pCat && (pCat.includes(s) || s.includes(pCat))) return true;
    if (pNation && (pNation.includes(s) || s.includes(pNation))) return true;

    if (pStyle.includes('サイドアタッカー') && s.includes('サイドアタッカー')) return true;
    if (pStyle.includes('ワイドストライカー') && s.includes('ワイドストライカー')) return true;
    if (pStyle.includes('ドリブラー') && s.includes('ドリブラー')) return true;
    if (pStyle.includes('ストライカー') && s.includes('ストライカー')) return true;
    if (pStyle.includes('ポストプレーヤー') && s.includes('ポストプレーヤー')) return true;
    if (pStyle.includes('アタッカー') && s.includes('アタッカー')) return true;
    if (pStyle.includes('パサー') && s.includes('パサー')) return true;
    if (pStyle.includes('セントラル') && (s.includes('セントラル') || s.includes('セントラルmf'))) return true;
    if (pStyle.includes('ハードマーカー') && s.includes('ハードマーカー')) return true;
    if (pStyle.includes('攻撃的') && (s.includes('攻撃的fb') || s.includes('攻撃的'))) return true;
    if (pStyle.includes('守備的') && (s.includes('守備的fb') || s.includes('守備的'))) return true;
    if (pStyle.includes('ストッパー') && s.includes('ストッパー')) return true;
    if (pStyle.includes('組立') && s.includes('組立')) return true;
    if (pStyle.includes('スプリント') && s.includes('スプリント')) return true;
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

  return mult;
}
`;

const insertTarget = `// ─────────────────────────────────────────────────────────────
// 6スロットシミュレーター用 ポジション別能力加算限界テーブル`;

if (content.includes(insertTarget)) {
  content = content.replace(insertTarget, helperCode + '\n\n' + insertTarget);
  console.log('Inserted bonus matching helper functions');
} else {
  console.error('insertTarget for helperCode not found');
}

// 2. Update calculateBoostedPlayer bonusMultiplier calculation to use calculateCardBonusMult
const boostedTarget = `      // プレイスタイル / 国籍ボーナスチェック
      let bonusMultiplier = 1.0;
      if (card.playstyleBonus) {
        if (card.playstyleBonus.bonuses && Array.isArray(card.playstyleBonus.bonuses)) {
          card.playstyleBonus.bonuses.forEach(b => {
            const matchStyle = p.playStyle && p.playStyle.includes(b.style);
            const matchNation = p.nationality && p.nationality.includes(b.style);
            if (matchStyle || matchNation) {
              bonusMultiplier += (b.percent / 100);
            }
          });
        } else if (p.playStyle && p.playStyle.includes(card.playstyleBonus.style)) {
          bonusMultiplier += (card.playstyleBonus.percent / 100);
        }
      }`;

const boostedReplacement = `      // プレイスタイル / 国籍ボーナスチェック
      const bonusMultiplier = calculateCardBonusMult(p, card);`;

if (content.includes(boostedTarget)) {
  content = content.replace(boostedTarget, boostedReplacement);
  console.log('Updated calculateBoostedPlayer with calculateCardBonusMult');
} else {
  console.error('boostedTarget not found');
}

// 3. Update optimizeSpecialCardSlots getCardScore to use calculateCardBonusMult
const optScoreTarget = `    let bonusMult = 1.0;
    if (card.playstyleBonus) {
      if (card.playstyleBonus.bonuses && Array.isArray(card.playstyleBonus.bonuses)) {
        card.playstyleBonus.bonuses.forEach(b => {
          if ((player.playStyle && player.playStyle.includes(b.style)) ||
              (player.nationality && player.nationality.includes(b.style))) {
            bonusMult += (b.percent / 100);
          }
        });
      } else if ((player.playStyle && player.playStyle.includes(card.playstyleBonus.style)) ||
                 (player.nationality && player.nationality.includes(card.playstyleBonus.style))) {
        bonusMult += (card.playstyleBonus.percent / 100);
      }
    }`;

const optScoreReplacement = `    const bonusMult = calculateCardBonusMult(player, card);`;

if (content.includes(optScoreTarget)) {
  content = content.replace(optScoreTarget, optScoreReplacement);
  console.log('Updated optimizeSpecialCardSlots getCardScore with calculateCardBonusMult');
} else {
  console.error('optScoreTarget not found');
}

// 4. Update acquiredItems rendering panel with explicit 【スキル】 and 【アビリティ】 text labels
const acquiredPanelTarget = `{item.isSkill ? renderSkillBadge(item.rank) : renderRankBadge(item.rank)}`;
const acquiredPanelReplacement = `<div className="flex items-center gap-1.5 flex-shrink-0">
                            {item.isSkill ? (
                              <span className="px-1.5 py-0.5 rounded text-[10px] font-black bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                                スキル
                              </span>
                            ) : (
                              <span className="px-1.5 py-0.5 rounded text-[10px] font-black bg-amber-500/20 text-amber-300 border border-amber-500/40">
                                アビリティ
                              </span>
                            )}
                            {item.isSkill ? renderSkillBadge(item.rank) : renderRankBadge(item.rank)}
                          </div>`;

if (content.includes(acquiredPanelTarget)) {
  content = content.replace(acquiredPanelTarget, acquiredPanelReplacement);
  console.log('Updated acquiredItems panel with explicit 【スキル】 / 【アビリティ】 text labels');
} else {
  console.error('acquiredPanelTarget not found');
}

fs.writeFileSync('src/app.jsx', content, 'utf8');
console.log('Successfully updated app.jsx with bonus matching fix and explicit type labels!');
