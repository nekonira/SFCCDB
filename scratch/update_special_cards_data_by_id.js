const fs = require('fs');

const path = './src/data/specialCardsData.js';
let content = fs.readFileSync(path, 'utf8');

const cardUpdates = {
  'card_offense_basic_training_ssr': {
    style: 'ドリブラー 30% / CF 10% / LW 10% / RW 10%',
    displayText: 'ドリブラー 30% UP / CF 10% UP / LW 10% UP / RW 10% UP',
    percent: 60
  },
  'card_johnson_wide_shooter_sr': {
    style: 'LW 10% / RW 10%',
    displayText: 'LW 10% UP / RW 10% UP',
    percent: 20
  },
  'card_yamal_young_legend_ssr': {
    style: 'LW 10% / RW 10%',
    displayText: 'LW 10% UP / RW 10% UP',
    percent: 20
  },
  'card_son_world_sonny_ssr': {
    style: 'サイドアタッカー 25% / LW 10% / RW 10% / LM 10% / RM 10%',
    displayText: 'サイドアタッカー 25% UP / LW 10% UP / RW 10% UP / LM 10% UP / RM 10% UP',
    percent: 65
  },
  'card_pulisic_milano_11_sr': {
    style: 'LM 10% / RM 10%',
    displayText: 'LM 10% UP / RM 10% UP',
    percent: 20
  },
  'card_gibbs_white_hitman_sr': {
    style: 'アタッカー 20% / AM 10%',
    displayText: 'アタッカー 20% UP / AM 10% UP',
    percent: 30
  },
  'card_honda_new_world_ssr': {
    style: 'アタッカー 40% / AM 10%',
    displayText: 'アタッカー 40% UP / AM 10% UP',
    percent: 50
  },
  'card_calhanoglu_brave_commander_ssr': {
    style: 'パサー 20% / DM 20%',
    displayText: 'パサー 20% UP / DM 20% UP',
    percent: 40
  },
  'card_parejo_yellow_submarine_sr': {
    style: 'パサー 10% / AM 10%',
    displayText: 'パサー 10% UP / AM 10% UP',
    percent: 20,
    bonuses: [
      { style: 'パサー', percent: 10 },
      { style: 'AM', percent: 10 }
    ]
  },
  'card_kamada_south_london_sr': {
    style: 'セントラルMF 10% / DM 10%',
    displayText: 'セントラルMF 10% UP / DM 10% UP',
    percent: 20
  },
  'card_modric_matured_maestro_ssr': {
    style: 'セントラルMF 10% / DM 20% / AM 20%',
    displayText: 'セントラルMF 10% UP / DM 20% UP / AM 20% UP',
    percent: 50
  },
  'card_rice_ruler_of_gunners_ssr': {
    style: 'ハードマーカー 20% / DM 25%',
    displayText: 'ハードマーカー 20% UP / DM 25% UP',
    percent: 45
  }
};

Object.entries(cardUpdates).forEach(([cardId, update]) => {
  const regex = new RegExp(`(id:\\s*'${cardId}',[\\s\\S]*?playstyleBonus:\\s*\\{)([\\s\\S]*?)(\\}\\s*,\\s*stages:)`, 'm');
  const match = content.match(regex);
  if (match) {
    let bonusBlock = match[2];
    
    // Replace style
    bonusBlock = bonusBlock.replace(/style:\s*'.*?'/, `style: '${update.style}'`);
    
    // Replace percent
    bonusBlock = bonusBlock.replace(/percent:\s*\d+/, `percent: ${update.percent}`);

    // Check displayText
    if (bonusBlock.includes('displayText:')) {
      bonusBlock = bonusBlock.replace(/displayText:\s*'.*?'/, `displayText: '${update.displayText}'`);
    } else {
      bonusBlock = `\n      displayText: '${update.displayText}',` + bonusBlock;
    }

    // Check bonuses array override
    if (update.bonuses) {
      const bonusesJson = JSON.stringify(update.bonuses, null, 8).replace(/\[\n\s*/, '[\n        ').replace(/\n\s*\]/, '\n      ]');
      bonusBlock = bonusBlock.replace(/bonuses:\s*\[[\s\S]*?\]/, `bonuses: ${bonusesJson}`);
    }

    content = content.replace(regex, `$1${bonusBlock}$3`);
    console.log(`Updated card ${cardId}`);
  } else {
    console.warn(`Card ${cardId} regex match failed!`);
  }
});

fs.writeFileSync(path, content, 'utf8');
console.log("specialCardsData.js successfully updated!");
