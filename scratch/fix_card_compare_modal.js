const fs = require('fs');

const cardCompareHelpers = `
  const [globalStage, setGlobalStage] = useState('完凸');
  const handleGlobalStageChange = (stage) => {
    setGlobalStage(stage);
    const newStages = {};
    selectedCards.forEach(c => { if(c) newStages[c.id] = stage; });
    setCardStages(newStages);
  };

  const [activeBonuses, setActiveBonuses] = useState({});
  const getCardBonuses = (c) => {
    if (!c || !c.playstyleBonus) return [];
    if (c.playstyleBonus.bonuses && Array.isArray(c.playstyleBonus.bonuses)) {
      return c.playstyleBonus.bonuses;
    }
    if (c.playstyleBonus.style) {
      return [{ style: c.playstyleBonus.style, percent: c.playstyleBonus.percent }];
    }
    return [];
  };

  const isBonusActive = (cardId, style) => {
    const key = \`\${cardId}_\${style}\`;
    return activeBonuses[key] !== undefined ? activeBonuses[key] : true;
  };

  const toggleCardBonus = (cardId, style) => {
    const key = \`\${cardId}_\${style}\`;
    setActiveBonuses(prev => ({ ...prev, [key]: !isBonusActive(cardId, style) }));
  };

  const handleEnableAllBonuses = () => {
    const newMap = {};
    selectedCards.forEach(c => {
      if(!c) return;
      const bonuses = getCardBonuses(c);
      bonuses.forEach(b => { newMap[\`\${c.id}_\${b.style}\`] = true; });
    });
    setActiveBonuses(newMap);
  };

  const handleDisableAllBonuses = () => {
    const newMap = {};
    selectedCards.forEach(c => {
      if(!c) return;
      const bonuses = getCardBonuses(c);
      bonuses.forEach(b => { newMap[\`\${c.id}_\${b.style}\`] = false; });
    });
    setActiveBonuses(newMap);
  };

  const getCardStatData = (c, stage, statName) => {
    if (!c) return { val: 0, rawVal: 0, isBoosted: false };
    const stageStats = (c.stages && (c.stages[stage] || c.stages['完凸'])) || {};
    const rawVal = Number(stageStats[statName]) || 0;
    if (rawVal === 0) return { val: 0, rawVal: 0, isBoosted: false };
    let bonusMult = 1.0;
    const bonuses = getCardBonuses(c);
    bonuses.forEach(b => {
      if (isBonusActive(c.id, b.style)) {
        bonusMult += (Number(b.percent) || 0) / 100;
      }
    });
    const val = parseFloat((rawVal * bonusMult).toFixed(1));
    return { val, rawVal, isBoosted: bonusMult > 1.0 };
  };

  const getSpecialCardSkill = (c) => c?.skill || null;
  const getSpecialCardEffect = (c) => (c?.effect || c?.specialEffect) ? (c.effect || c.specialEffect) : null;
  const getCardRankBadgeStyle = (rank) => {
    if (rank === 'SSR' || rank === '虹') return 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-black';
    if (rank === 'SR' || rank === '金') return 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/40 font-black';
    return 'bg-slate-700/40 text-slate-300 border border-slate-600 font-bold';
  };
  const getRankBadgeStyle = (rank) => getCardRankBadgeStyle(rank);
  const getRankTextStyle = (rank) => {
    if (rank === 'SSR' || rank === '虹') return 'text-amber-300 font-black';
    if (rank === 'SR' || rank === '金') return 'text-yellow-300 font-black';
    return 'text-slate-200 font-bold';
  };
  const getRankCellBg = (val, allVals) => {
    if (!allVals || allVals.length === 0 || val <= 0) return '';
    const sorted = [...allVals].sort((a, b) => b - a);
    if (val === sorted[0]) return 'bg-red-950/40 text-red-300 font-black border-red-500/30';
    if (sorted.length > 1 && val === sorted[1]) return 'bg-amber-950/40 text-amber-300 font-black border-amber-500/30';
    if (sorted.length > 2 && val === sorted[2]) return 'bg-cyan-950/40 text-cyan-300 font-black border-cyan-500/30';
    return '';
  };
  const renderRankBadge = (val, allVals) => {
    if (!allVals || allVals.length === 0 || val <= 0) return null;
    const sorted = [...allVals].sort((a, b) => b - a);
    if (val === sorted[0]) return React.createElement('span', { className: 'text-[9px] font-black px-1 py-0.2 rounded bg-red-600 text-white' }, '1位');
    if (sorted.length > 1 && val === sorted[1]) return React.createElement('span', { className: 'text-[9px] font-black px-1 py-0.2 rounded bg-amber-500 text-slate-950' }, '2位');
    if (sorted.length > 2 && val === sorted[2]) return React.createElement('span', { className: 'text-[9px] font-black px-1 py-0.2 rounded bg-cyan-500 text-slate-950' }, '3位');
    return null;
  };
`;

function patchFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  const targetAnchor = "const getCardStage = (cardId) => cardStages[cardId] || '完凸';";
  const targetAnchorMin = "const getCardStage=cardId=>cardStages[cardId]||'完凸';";

  if (content.includes('const [globalStage, setGlobalStage]')) {
    console.log(filePath, 'already has globalStage patch');
    return;
  }

  if (content.includes(targetAnchor)) {
    content = content.replace(targetAnchor, targetAnchor + '\n' + cardCompareHelpers);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Patched CardCompareModal in', filePath);
  } else if (content.includes(targetAnchorMin)) {
    content = content.replace(targetAnchorMin, targetAnchorMin + '\n' + cardCompareHelpers);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Patched CardCompareModal in', filePath);
  } else {
    console.error('Target anchor not found in', filePath);
  }
}

patchFile('src/app.js');
if (fs.existsSync('src/app.jsx')) {
  patchFile('src/app.jsx');
}
