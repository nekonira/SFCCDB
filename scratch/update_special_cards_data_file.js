const fs = require('fs');

const specialCardsPath = './src/data/specialCardsData.js';
let content = fs.readFileSync(specialCardsPath, 'utf8');

// The 12 card updates
const replacements = [
  {
    target: `    id: 'card_offense_basic_training_ssr',
    rank: 'SSR',
    cardType: 'アタッカー',
    category: 'アタッカー',
    name: 'オフェンス基礎トレーニング',
    getImageUrl: () => window.OFFENSE_BASIC_TRAINING_CARD_IMAGE || '',
    skill: {
      type: 'スキル',
      name: 'オフェンス強化',
      rank: '銅',
      description: '発動エリア：敵陣全域　/　決定力・ショートパス・突破力UP'
    },
    playstyleBonus: {
      style: 'ドリブラー',
      percent: 30,
      bonuses: [
        { style: 'ドリブラー', percent: 30 },
        { style: 'CF', percent: 10 },
        { style: 'LW', percent: 10 },
        { style: 'RW', percent: 10 }
      ]
    },`,
    replacement: `    id: 'card_offense_basic_training_ssr',
    rank: 'SSR',
    cardType: 'アタッカー',
    category: 'アタッカー',
    name: 'オフェンス基礎トレーニング',
    getImageUrl: () => window.OFFENSE_BASIC_TRAINING_CARD_IMAGE || '',
    skill: {
      type: 'スキル',
      name: 'オフェンス強化',
      rank: '銅',
      description: '発動エリア：敵陣全域　/　決定力・ショートパス・突破力UP'
    },
    playstyleBonus: {
      style: 'ドリブラー 30% / CF 10% / LW 10% / RW 10%',
      displayText: 'ドリブラー 30% UP / CF 10% UP / LW 10% UP / RW 10% UP',
      percent: 60,
      bonuses: [
        { style: 'ドリブラー', percent: 30 },
        { style: 'CF', percent: 10 },
        { style: 'LW', percent: 10 },
        { style: 'RW', percent: 10 }
      ]
    },`
  },
  {
    target: `    id: 'card_johnson_wide_shooter_sr',
    rank: 'SR',
    cardType: 'サイドアタッカー',
    category: 'サイドアタッカー',
    name: 'ブレナン・ジョンソン【リリーホワイトのワイドシューター】',
    getImageUrl: () => window.JOHNSON_CARD_IMAGE || '',
    skill: {
      type: 'アビリティ',
      name: '疾風の突破者',
      rank: '銅',
      description: '発動条件：途中出場　/　突破力・走力UP'
    },
    playstyleBonus: {
      style: 'LW',
      percent: 10,
      bonuses: [
        { style: 'LW', percent: 10 },
        { style: 'RW', percent: 10 }
      ]
    },`,
    replacement: `    id: 'card_johnson_wide_shooter_sr',
    rank: 'SR',
    cardType: 'サイドアタッカー',
    category: 'サイドアタッカー',
    name: 'ブレナン・ジョンソン【リリーホワイトのワイドシューター】',
    getImageUrl: () => window.JOHNSON_CARD_IMAGE || '',
    skill: {
      type: 'アビリティ',
      name: '疾風の突破者',
      rank: '銅',
      description: '発動条件：途中出場　/　突破力・走力UP'
    },
    playstyleBonus: {
      style: 'LW 10% / RW 10%',
      displayText: 'LW 10% UP / RW 10% UP',
      percent: 20,
      bonuses: [
        { style: 'LW', percent: 10 },
        { style: 'RW', percent: 10 }
      ]
    },`
  },
  {
    target: `    id: 'card_yamal_young_legend_ssr',
    rank: 'SSR',
    cardType: 'サイドアタッカー',
    category: 'サイドアタッカー',
    name: 'ラミン・ヤマル【進化を続ける若き伝説】',
    getImageUrl: () => window.YAMAL_CARD_IMAGE || '',
    skill: {
      type: 'スキル',
      name: '神童の閃光カットイン',
      rank: '銀',
      description: '発動エリア：前左右・前左右中　/　発動条件：ペナルティエリア手前でのドリブル時　/　突破力・決定力UP'
    },
    playstyleBonus: {
      style: 'LW',
      percent: 10,
      bonuses: [
        { style: 'LW', percent: 10 },
        { style: 'RW', percent: 10 }
      ]
    },`,
    replacement: `    id: 'card_yamal_young_legend_ssr',
    rank: 'SSR',
    cardType: 'サイドアタッカー',
    category: 'サイドアタッカー',
    name: 'ラミン・ヤマル【進化を続ける若き伝説】',
    getImageUrl: () => window.YAMAL_CARD_IMAGE || '',
    skill: {
      type: 'スキル',
      name: '神童の閃光カットイン',
      rank: '銀',
      description: '発動エリア：前左右・前左右中　/　発動条件：ペナルティエリア手前でのドリブル時　/　突破力・決定力UP'
    },
    playstyleBonus: {
      style: 'LW 10% / RW 10%',
      displayText: 'LW 10% UP / RW 10% UP',
      percent: 20,
      bonuses: [
        { style: 'LW', percent: 10 },
        { style: 'RW', percent: 10 }
      ]
    },`
  },
  {
    target: `    id: 'card_son_world_sonny_ssr',
    rank: 'SSR',
    cardType: 'サイドアタッカー',
    category: 'サイドアタッカー',
    name: 'ソン・フンミン【ワールド・ソニー】',
    getImageUrl: () => window.SON_CARD_IMAGE || '',
    skill: {
      type: 'スキル',
      name: '両足の旋風コントロールショット',
      rank: '金',
      description: '発動エリア：前左右中・中左右中　/　発動条件：ペナルティエリア外からのシュート時　/　決定力・キック精度UP'
    },
    playstyleBonus: {
      style: 'サイドアタッカー',
      percent: 25,
      bonuses: [
        { style: 'サイドアタッカー', percent: 25 },
        { style: 'LW', percent: 10 },
        { style: 'RW', percent: 10 },
        { style: 'LM', percent: 10 },
        { style: 'RM', percent: 10 }
      ]
    },`,
    replacement: `    id: 'card_son_world_sonny_ssr',
    rank: 'SSR',
    cardType: 'サイドアタッカー',
    category: 'サイドアタッカー',
    name: 'ソン・フンミン【ワールド・ソニー】',
    getImageUrl: () => window.SON_CARD_IMAGE || '',
    skill: {
      type: 'スキル',
      name: '両足の旋風コントロールショット',
      rank: '金',
      description: '発動エリア：前左右中・中左右中　/　発動条件：ペナルティエリア外からのシュート時　/　決定力・キック精度UP'
    },
    playstyleBonus: {
      style: 'サイドアタッカー 25% / LW 10% / RW 10% / LM 10% / RM 10%',
      displayText: 'サイドアタッカー 25% UP / LW 10% UP / RW 10% UP / LM 10% UP / RM 10% UP',
      percent: 65,
      bonuses: [
        { style: 'サイドアタッカー', percent: 25 },
        { style: 'LW', percent: 10 },
        { style: 'RW', percent: 10 },
        { style: 'LM', percent: 10 },
        { style: 'RM', percent: 10 }
      ]
    },`
  },
  {
    target: `    id: 'card_pulisic_milano_11_sr',
    rank: 'SR',
    cardType: 'サイドアタッカー',
    category: 'サイドアタッカー',
    name: 'クリスティアン・プリシッチ【ミラノの11を背負う覚悟】',
    getImageUrl: () => window.PULISIC_CARD_IMAGE || '',
    skill: {
      type: 'アビリティ',
      name: '果敢なサイドアタッカー',
      rank: '銅',
      description: '発動条件：相手ゴール前ペナルティエリア内　/　突破力・決定力UP'
    },
    playstyleBonus: {
      style: 'LM',
      percent: 10,
      bonuses: [
        { style: 'LM', percent: 10 },
        { style: 'RM', percent: 10 }
      ]
    },`,
    replacement: `    id: 'card_pulisic_milano_11_sr',
    rank: 'SR',
    cardType: 'サイドアタッカー',
    category: 'サイドアタッカー',
    name: 'クリスティアン・プリシッチ【ミラノの11を背負う覚悟】',
    getImageUrl: () => window.PULISIC_CARD_IMAGE || '',
    skill: {
      type: 'アビリティ',
      name: '果敢なサイドアタッカー',
      rank: '銅',
      description: '発動条件：相手ゴール前ペナルティエリア内　/　突破力・決定力UP'
    },
    playstyleBonus: {
      style: 'LM 10% / RM 10%',
      displayText: 'LM 10% UP / RM 10% UP',
      percent: 20,
      bonuses: [
        { style: 'LM', percent: 10 },
        { style: 'RM', percent: 10 }
      ]
    },`
  },
  {
    target: `    id: 'card_gibbs_white_hitman_sr',
    rank: 'SR',
    cardType: 'アタッカー',
    category: 'アタッカー',
    name: 'モーガン・ギブス＝ホワイト【剛柔兼備のヒットマン】',
    getImageUrl: () => window.GIBBS_WHITE_CARD_IMAGE || '',
    skill: {
      type: 'アビリティ',
      name: '好機演出のパサー',
      rank: '銅',
      description: '発動条件：ラストパス時　/　ショートパス・キック精度UP'
    },
    playstyleBonus: {
      style: 'アタッカー',
      percent: 20,
      bonuses: [
        { style: 'アタッカー', percent: 20 },
        { style: 'AM', percent: 10 }
      ]
    },`,
    replacement: `    id: 'card_gibbs_white_hitman_sr',
    rank: 'SR',
    cardType: 'アタッカー',
    category: 'アタッカー',
    name: 'モーガン・ギブス＝ホワイト【剛柔兼備のヒットマン】',
    getImageUrl: () => window.GIBBS_WHITE_CARD_IMAGE || '',
    skill: {
      type: 'アビリティ',
      name: '好機演出のパサー',
      rank: '銅',
      description: '発動条件：ラストパス時　/　ショートパス・キック精度UP'
    },
    playstyleBonus: {
      style: 'アタッカー 20% / AM 10%',
      displayText: 'アタッカー 20% UP / AM 10% UP',
      percent: 30,
      bonuses: [
        { style: 'アタッカー', percent: 20 },
        { style: 'AM', percent: 10 }
      ]
    },`
  },
  {
    target: `    id: 'card_honda_new_world_ssr',
    rank: 'SSR',
    cardType: 'アタッカー',
    category: 'アタッカー',
    name: '本田圭佑【新たな世界への挑戦】',
    getImageUrl: () => window.HONDA_CARD_IMAGE || '',
    skill: {
      type: 'スキル',
      name: '不屈の弾道FK',
      rank: '金',
      description: '発動エリア：前中・中中　/　発動条件：直接FK時　/　キック精度・キック力UP'
    },
    playstyleBonus: {
      style: 'アタッカー',
      percent: 40,
      bonuses: [
        { style: 'アタッカー', percent: 40 },
        { style: 'AM', percent: 10 }
      ]
    },`,
    replacement: `    id: 'card_honda_new_world_ssr',
    rank: 'SSR',
    cardType: 'アタッカー',
    category: 'アタッカー',
    name: '本田圭佑【新たな世界への挑戦】',
    getImageUrl: () => window.HONDA_CARD_IMAGE || '',
    skill: {
      type: 'スキル',
      name: '不屈の弾道FK',
      rank: '金',
      description: '発動エリア：前中・中中　/　発動条件：直接FK時　/　キック精度・キック力UP'
    },
    playstyleBonus: {
      style: 'アタッカー 40% / AM 10%',
      displayText: 'アタッカー 40% UP / AM 10% UP',
      percent: 50,
      bonuses: [
        { style: 'アタッカー', percent: 40 },
        { style: 'AM', percent: 10 }
      ]
    },`
  },
  {
    target: `    id: 'card_calhanoglu_brave_commander_ssr',
    rank: 'SSR',
    cardType: 'パサー',
    category: 'パサー',
    name: 'ハカン・チャルハノール【青黒のブレイブ・コマンダー】',
    getImageUrl: () => window.CALHANOGLU_CARD_IMAGE || '',
    skill: {
      type: 'スキル',
      name: '魔術師の弾道',
      rank: '銀',
      description: '発動エリア：前中・中中　/　発動条件：直接FK時　/　キック精度・キック力・決定力UP'
    },
    playstyleBonus: {
      style: 'パサー',
      percent: 20,
      bonuses: [
        { style: 'DM', percent: 20 },
        { style: 'パサー', percent: 20 }
      ]
    },`,
    replacement: `    id: 'card_calhanoglu_brave_commander_ssr',
    rank: 'SSR',
    cardType: 'パサー',
    category: 'パサー',
    name: 'ハカン・チャルハノール【青黒のブレイブ・コマンダー】',
    getImageUrl: () => window.CALHANOGLU_CARD_IMAGE || '',
    skill: {
      type: 'スキル',
      name: '魔術師の弾道',
      rank: '銀',
      description: '発動エリア：前中・中中　/　発動条件：直接FK時　/　キック精度・キック力・決定力UP'
    },
    playstyleBonus: {
      style: 'パサー 20% / DM 20%',
      displayText: 'パサー 20% UP / DM 20% UP',
      percent: 40,
      bonuses: [
        { style: 'パサー', percent: 20 },
        { style: 'DM', percent: 20 }
      ]
    },`
  },
  {
    target: `    id: 'card_parejo_yellow_submarine_sr',
    rank: 'SR',
    cardType: 'パサー',
    category: 'パサー',
    name: 'ダニ・パレホ【イエローサブマリン・コマンデッチ】',
    getImageUrl: () => window.PAREJO_CARD_IMAGE || '',
    skill: {
      type: 'アビリティ',
      name: '精緻なパサー',
      rank: '銅',
      description: '発動条件：絶好調　/　ショートパス・キック精度UP'
    },
    playstyleBonus: {
      style: 'パサー',
      percent: 0,
      bonuses: [
        { style: 'AM', percent: 10 }
      ]
    },`,
    replacement: `    id: 'card_parejo_yellow_submarine_sr',
    rank: 'SR',
    cardType: 'パサー',
    category: 'パサー',
    name: 'ダニ・パレホ【イエローサブマリン・コマンデッチ】',
    getImageUrl: () => window.PAREJO_CARD_IMAGE || '',
    skill: {
      type: 'アビリティ',
      name: '精緻なパサー',
      rank: '銅',
      description: '発動条件：絶好調　/　ショートパス・キック精度UP'
    },
    playstyleBonus: {
      style: 'パサー 10% / AM 10%',
      displayText: 'パサー 10% UP / AM 10% UP',
      percent: 20,
      bonuses: [
        { style: 'パサー', percent: 10 },
        { style: 'AM', percent: 10 }
      ]
    },`
  },
  {
    target: `    id: 'card_kamada_south_london_sr',
    rank: 'SR',
    cardType: 'セントラルMF',
    category: 'セントラルMF',
    name: '鎌田大地【サウスロンドンでの交歓】',
    getImageUrl: () => window.KAMADA_CARD_IMAGE || '',
    skill: {
      type: 'アビリティ',
      name: '不屈のパサー',
      rank: '銅',
      description: '発動条件：途中出場　/　ショートパス・スタミナUP'
    },
    playstyleBonus: {
      style: 'セントラルMF',
      percent: 10,
      bonuses: [
        { style: 'DM', percent: 10 },
        { style: 'セントラルMF', percent: 10 }
      ]
    },`,
    replacement: `    id: 'card_kamada_south_london_sr',
    rank: 'SR',
    cardType: 'セントラルMF',
    category: 'セントラルMF',
    name: '鎌田大地【サウスロンドンでの交歓】',
    getImageUrl: () => window.KAMADA_CARD_IMAGE || '',
    skill: {
      type: 'アビリティ',
      name: '不屈のパサー',
      rank: '銅',
      description: '発動条件：途中出場　/　ショートパス・スタミナUP'
    },
    playstyleBonus: {
      style: 'セントラルMF 10% / DM 10%',
      displayText: 'セントラルMF 10% UP / DM 10% UP',
      percent: 20,
      bonuses: [
        { style: 'セントラルMF', percent: 10 },
        { style: 'DM', percent: 10 }
      ]
    },`
  },
  {
    target: `    id: 'card_modric_matured_maestro_ssr',
    rank: 'SSR',
    cardType: 'セントラルMF',
    category: 'セントラルMF',
    name: 'ルカ・モドリッチ【円熟のマエストロ】',
    getImageUrl: () => window.MODRIC_CARD_IMAGE || '',
    skill: {
      type: 'スキル',
      name: '勝機を生み出すフィード',
      rank: '銀',
      description: '発動エリア：中中・後左中右　/　発動条件：前中に居る選手へのロングパス時　/　ロングパス・キック精度UP　/　成功時に受け手のトラップ発生確率UP'
    },
    playstyleBonus: {
      style: 'セントラルMF',
      percent: 10,
      bonuses: [
        { style: 'DM', percent: 20 },
        { style: 'AM', percent: 20 },
        { style: 'セントラルMF', percent: 10 }
      ]
    },`,
    replacement: `    id: 'card_modric_matured_maestro_ssr',
    rank: 'SSR',
    cardType: 'セントラルMF',
    category: 'セントラルMF',
    name: 'ルカ・モドリッチ【円熟のマエストロ】',
    getImageUrl: () => window.MODRIC_CARD_IMAGE || '',
    skill: {
      type: 'スキル',
      name: '勝機を生み出すフィード',
      rank: '銀',
      description: '発動エリア：中中・後左中右　/　発動条件：前中に居る選手へのロングパス時　/　ロングパス・キック精度UP　/　成功時に受け手のトラップ発生確率UP'
    },
    playstyleBonus: {
      style: 'セントラルMF 10% / DM 20% / AM 20%',
      displayText: 'セントラルMF 10% UP / DM 20% UP / AM 20% UP',
      percent: 50,
      bonuses: [
        { style: 'セントラルMF', percent: 10 },
        { style: 'DM', percent: 20 },
        { style: 'AM', percent: 20 }
      ]
    },`
  },
  {
    target: `    id: 'card_rice_ruler_of_gunners_ssr',
    rank: 'SSR',
    cardType: 'ハードマーカー',
    category: 'ハードマーカー',
    name: 'デクラン・ライス【砲撃隊の統治者】',
    getImageUrl: () => window.RICE_CARD_IMAGE || '',
    skill: {
      type: 'スキル',
      name: '激闘の奪還タックル',
      rank: '銀',
      description: '発動エリア：中左中右・後左中右　/　発動条件：ボールホルダーへのタックル時　/　タックル・スタミナUP'
    },
    playstyleBonus: {
      style: 'ハードマーカー',
      percent: 20,
      bonuses: [
        { style: 'DM', percent: 25 },
        { style: 'ハードマーカー', percent: 20 }
      ]
    },`,
    replacement: `    id: 'card_rice_ruler_of_gunners_ssr',
    rank: 'SSR',
    cardType: 'ハードマーカー',
    category: 'ハードマーカー',
    name: 'デクラン・ライス【砲撃隊の統治者】',
    getImageUrl: () => window.RICE_CARD_IMAGE || '',
    skill: {
      type: 'スキル',
      name: '激闘の奪還タックル',
      rank: '銀',
      description: '発動エリア：中左中右・後左中右　/　発動条件：ボールホルダーへのタックル時　/　タックル・スタミナUP'
    },
    playstyleBonus: {
      style: 'ハードマーカー 20% / DM 25%',
      displayText: 'ハードマーカー 20% UP / DM 25% UP',
      percent: 45,
      bonuses: [
        { style: 'ハードマーカー', percent: 20 },
        { style: 'DM', percent: 25 }
      ]
    },`
  }
];

replacements.forEach(r => {
  if (content.includes(r.target)) {
    content = content.replace(r.target, r.replacement);
    console.log("Replaced target successfully.");
  } else {
    console.warn("Could NOT find target string!");
  }
});

fs.writeFileSync(specialCardsPath, content, 'utf8');
console.log("src/data/specialCardsData.js updated!");
