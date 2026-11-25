// Player data (split across mockDataPart1.js, mockDataPart2.js, and mockData.js)
window.INITIAL_PLAYERS = [].concat(
  window.INITIAL_PLAYERS_PART1 || [],
  window.INITIAL_PLAYERS_PART2 || [],
  [
  {
    id: 'p400',
    name: 'テオ・エルナンデス',
    readingName: 'てお・えるなんです',
    category: 'DF',
    mainPosition: 'LFB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'フランス',
    policy: 'ムービング',
    playStyle: '攻撃的LFB',
    playStyleLevel: 'Ⅱ',
    overall: 7358,
    maxOverall: 15649,
    baseStats: { shoot: 1206, pass: 1272, dribble: 1336, defense: 1338, physical: 1334, speed: 937 },
    detailStats: {
      shoot: { finishing: 398, power: 405, composure: 403 },
      pass: { shortPass: 425, longPass: 420, accuracy: 427 },
      dribble: { breakout: 449, keeping: 449, ballTouch: 438 },
      defense: { tackle: 455, interception: 446, marking: 437 },
      physical: { jumping: 434, contact: 446, stamina: 454 },
      speed: { running: 477, agility: 460 }
    },
    maxEnhanced: {
      overall: 15649,
      baseStats: { shoot: 2703, pass: 2841, dribble: 2869, defense: 2943, physical: 2903, speed: 2007 },
      detailStats: {
        shoot: { finishing: 897, power: 904, composure: 902 },
        pass: { shortPass: 948, longPass: 943, accuracy: 950 },
        dribble: { breakout: 960, keeping: 960, ballTouch: 949 },
        defense: { tackle: 990, interception: 981, marking: 972 },
        physical: { jumping: 945, contact: 969, stamina: 989 },
        speed: { running: 1012, agility: 995 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -1, shoot: -1, longShoot: -1,
      shortPass: 0, longPass: 0, throughPass: -1, cutIn: -1, keep: -1,
      delay: 0, rushOut: -1, feint: -1, press: 1
    },
    skill: {
      name: 'チェーンカッター',
      rank: '銀',
      description: '発動エリア：中左中右・後左中右　/　発動条件：タックル時　/　タックル・コンタクト・マークUP'
    },
    abilities: [
      { name: 'ハイスピードスティール', rank: '金', description: '発動条件：好調　/　タックル・走力・敏捷性UP' },
      { name: 'エンドレスマーカー', rank: '銀', description: '発動条件：好調　/　マーク・スタミナUP' },
      { name: '瞬間の球際力', rank: '銅', description: '発動条件：好調　/　パスカット・コンタクトUP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p401',
    name: 'マロ・ギュスト',
    readingName: 'まろ・ぎゅすと',
    category: 'DF',
    mainPosition: 'RFB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'フランス',
    policy: 'ムービング',
    playStyle: '守備的RFB',
    playStyleLevel: 'Ⅱ',
    overall: 7162,
    maxOverall: 15422,
    baseStats: { shoot: 1228, pass: 1206, dribble: 1315, defense: 1330, physical: 1239, speed: 936 },
    detailStats: {
      shoot: { finishing: 423, power: 385, composure: 420 },
      pass: { shortPass: 398, longPass: 416, accuracy: 392 },
      dribble: { breakout: 449, keeping: 421, ballTouch: 445 },
      defense: { tackle: 457, interception: 436, marking: 437 },
      physical: { jumping: 372, contact: 413, stamina: 454 },
      speed: { running: 474, agility: 462 }
    },
    maxEnhanced: {
      overall: 15422,
      baseStats: { shoot: 2725, pass: 2775, dribble: 2848, defense: 2935, physical: 2808, speed: 2006 },
      detailStats: {
        shoot: { finishing: 922, power: 884, composure: 919 },
        pass: { shortPass: 921, longPass: 939, accuracy: 915 },
        dribble: { breakout: 960, keeping: 932, ballTouch: 956 },
        defense: { tackle: 992, interception: 971, marking: 972 },
        physical: { jumping: 883, contact: 936, stamina: 989 },
        speed: { running: 1009, agility: 997 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -1, shoot: -1, longShoot: -1,
      shortPass: 0, longPass: 0, throughPass: -1, cutIn: -1, keep: -1,
      delay: 0, rushOut: -1, feint: -1, press: 1
    },
    skill: {
      name: '熟練のインターセプト',
      rank: '銀',
      description: '発動エリア：中左中右・後左中右　/　発動条件：パスカット時　/　パスカット・敏捷性UP'
    },
    abilities: [
      { name: 'スピードクラッシャー', rank: '銀', description: '発動条件：好調　/　タックル・走力UP' },
      { name: '俊敏なマーカー', rank: '銀', description: '発動条件：好調　/　パスカット・敏捷性UP' },
      { name: 'ピッチの分断者', rank: '銅', description: '発動条件：絶好調　/　パスカット・スタミナUP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p402',
    name: 'ブラッドリー・バルコラ',
    readingName: 'ぶらっどりー・ばるこら',
    category: 'FW',
    mainPosition: 'LW',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'フランス',
    policy: 'ムービング',
    playStyle: 'ドリブラーLW',
    playStyleLevel: 'Ⅱ',
    overall: 7294,
    maxOverall: 15550,
    baseStats: { shoot: 1334, pass: 1230, dribble: 1395, defense: 988, physical: 1162, speed: 946 },
    detailStats: {
      shoot: { finishing: 452, power: 439, composure: 443 },
      pass: { shortPass: 416, longPass: 411, accuracy: 403 },
      dribble: { breakout: 475, keeping: 461, ballTouch: 459 },
      defense: { tackle: 312, interception: 347, marking: 329 },
      physical: { jumping: 415, contact: 379, stamina: 368 },
      speed: { running: 473, agility: 473 }
    },
    maxEnhanced: {
      overall: 15550,
      baseStats: { shoot: 2891, pass: 2799, dribble: 2988, defense: 2497, physical: 2707, speed: 2016 },
      detailStats: {
        shoot: { finishing: 975, power: 950, composure: 966 },
        pass: { shortPass: 939, longPass: 934, accuracy: 926 },
        dribble: { breakout: 1010, keeping: 996, ballTouch: 982 },
        defense: { tackle: 823, interception: 846, marking: 828 },
        physical: { jumping: 926, contact: 890, stamina: 891 },
        speed: { running: 1008, agility: 1008 }
      }
    },
    playTendencies: {
      attack: 2, defense: -1, dribble: 2, shoot: 1, longShoot: 0,
      shortPass: 0, longPass: -1, throughPass: 0, cutIn: 1, keep: 1,
      delay: -1, rushOut: 1, feint: 2, press: 0
    },
    skill: {
      name: 'ジャックナイフ',
      rank: '銀',
      description: '発動エリア：前左右　/　発動条件：ドリブル時　/　突破力・キープ力UP　/　成功時に自身のシュート発生確率UP'
    },
    abilities: [
      { name: '俊敏なドリブラー', rank: '銀', description: '発動条件：好調　/　突破力・敏捷性UP' },
      { name: 'ムービングターゲット', rank: '銀', description: '発動条件：好調　/　キープ力・走力UP' },
      { name: 'ゴール前の落ち着き', rank: '銅', description: '発動条件：途中出場　/　決定力・ボールタッチUP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p403',
    name: 'デサビ(配布)',
    readingName: 'でさび',
    category: 'DF',
    mainPosition: 'CB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'フランス',
    policy: 'ムービング',
    playStyle: 'ストッパー',
    playStyleLevel: 'Ⅱ',
    overall: 5461,
    maxOverall: 13047,
    baseStats: { shoot: 962, pass: 739, dribble: 724, defense: 1137, physical: 1149, speed: 729 },
    detailStats: {
      shoot: { finishing: 280, power: 401, composure: 281 },
      pass: { shortPass: 294, longPass: 259, accuracy: 186 },
      dribble: { breakout: 229, keeping: 250, ballTouch: 245 },
      defense: { tackle: 379, interception: 379, marking: 379 },
      physical: { jumping: 379, contact: 379, stamina: 391 },
      speed: { running: 382, agility: 347 }
    },
    maxEnhanced: {
      overall: 13047,
      baseStats: { shoot: 2186, pass: 2035, dribble: 1984, defense: 2469, physical: 2469, speed: 1593 },
      detailStats: {
        shoot: { finishing: 688, power: 809, composure: 689 },
        pass: { shortPass: 726, longPass: 691, accuracy: 618 },
        dribble: { breakout: 649, keeping: 670, ballTouch: 665 },
        defense: { tackle: 823, interception: 823, marking: 823 },
        physical: { jumping: 823, contact: 823, stamina: 823 },
        speed: { running: 814, agility: 779 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -1, shoot: -1, longShoot: -1,
      shortPass: 0, longPass: 0, throughPass: -1, cutIn: -1, keep: -1,
      delay: 0, rushOut: -1, feint: -1, press: 1
    },
    skill: { name: '奮戦のタックル', rank: '銅', description: '発動エリア：中左中右・後左中右　/　発動条件：タックル時　/　タックル・マーク・ショートパスUP　/　成功時に自身のショートパス発生確率UP' },
    abilities: [
      { name: 'ボールハンター', rank: '銀', description: '発動条件：絶好調　/　タックル・マークUP' },
      { name: '上空の寸断者', rank: '銅', description: '発動条件：絶好調　/　パスカット・ジャンプUP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p404',
    name: 'デジレ・ドゥエ',
    readingName: 'でじれ・どぅえ',
    category: 'MF',
    mainPosition: 'AM',
    subPositions: ['LW'],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'フランス',
    policy: 'ムービング',
    playStyle: 'アタッカー',
    playStyleLevel: 'Ⅲ',
    overall: 7486,
    maxOverall: 15616,
    baseStats: { shoot: 1330, pass: 1344, dribble: 1478, defense: 1105, physical: 1263, speed: 965 },
    detailStats: {
      shoot: { finishing: 455, power: 431, composure: 444 },
      pass: { shortPass: 441, longPass: 454, accuracy: 449 },
      dribble: { breakout: 493, keeping: 493, ballTouch: 492 },
      defense: { tackle: 352, interception: 371, marking: 382 },
      physical: { jumping: 405, contact: 423, stamina: 435 },
      speed: { running: 476, agility: 489 }
    },
    maxEnhanced: {
      overall: 15616,
      baseStats: { shoot: 2875, pass: 2925, dribble: 3047, defense: 2650, physical: 2832, speed: 1999 },
      detailStats: {
        shoot: { finishing: 966, power: 942, composure: 967 },
        pass: { shortPass: 976, longPass: 977, accuracy: 972 },
        dribble: { breakout: 1016, keeping: 1016, ballTouch: 1015 },
        defense: { tackle: 875, interception: 882, marking: 893 },
        physical: { jumping: 916, contact: 946, stamina: 970 },
        speed: { running: 987, agility: 1012 }
      }
    },
    playTendencies: {
      attack: 0, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 1, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '変速ギア', rank: '銀', description: '発動エリア：前中・中中　/　発動条件：ドリブル時　/　突破力・キープ力UP' },
    abilities: [
      { name: '変幻自在のドリブラー', rank: '金', description: '発動条件：好調　/　突破力・キープ力・ボールタッチUP' },
      { name: '快速のロングパサー', rank: '銀', description: '発動条件：好調　/　ロングパス・走力UP' },
      { name: '俊敏なパサー', rank: '銅', description: '発動条件：好調　/　ショートパス・敏捷性UP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p405',
    name: 'エンゴロ・カンテ',
    readingName: 'えんごろ・かんて',
    category: 'MF',
    mainPosition: 'DM',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'フランス',
    policy: 'ムービング',
    playStyle: 'ハードマーカー',
    playStyleLevel: 'Ⅱ',
    overall: 7471,
    maxOverall: 15681,
    baseStats: { shoot: 1125, pass: 1354, dribble: 1379, defense: 1454, physical: 1302, speed: 854 },
    detailStats: {
      shoot: { finishing: 378, power: 368, composure: 379 },
      pass: { shortPass: 472, longPass: 457, accuracy: 425 },
      dribble: { breakout: 458, keeping: 455, ballTouch: 466 },
      defense: { tackle: 485, interception: 489, marking: 480 },
      physical: { jumping: 382, contact: 435, stamina: 485 },
      speed: { running: 370, agility: 484 }
    },
    maxEnhanced: {
      overall: 15681,
      baseStats: { shoot: 2670, pass: 2959, dribble: 2912, defense: 3035, physical: 2871, speed: 1876 },
      detailStats: {
        shoot: { finishing: 889, power: 879, composure: 902 },
        pass: { shortPass: 1007, longPass: 992, accuracy: 960 },
        dribble: { breakout: 969, keeping: 966, ballTouch: 977 },
        defense: { tackle: 1020, interception: 1012, marking: 1003 },
        physical: { jumping: 893, contact: 958, stamina: 1020 },
        speed: { running: 881, agility: 995 }
      }
    },
    playTendencies: {
      attack: 0, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 1, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '奪還', rank: '銀', description: '発動エリア：中左中右・後左中右　/　発動条件：タックル時　/　タックル・マーク・ショートパスUP　/　成功時に自身のショートパス発生確率UP' },
    abilities: [
      { name: '不死鳥のタックル', rank: '金', description: '発動条件：好調　/　タックル・スタミナUP　/　ハーフタイムにスタミナ回復量が30％UP' },
      { name: 'ピッチの分断者', rank: '銀', description: '発動条件：絶好調　/　パスカット・スタミナUP' },
      { name: 'リスクヘッジパサー', rank: '銅', description: '発動条件：絶好調　/　ショートパス・マークUP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p406',
    name: 'マクサンス・ラクロワ',
    readingName: 'まくさんす・らくろわ',
    category: 'DF',
    mainPosition: 'CB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'フランス',
    policy: 'ムービング',
    playStyle: 'ストッパー',
    playStyleLevel: 'Ⅱ',
    overall: 7170,
    maxOverall: 15458,
    baseStats: { shoot: 1002, pass: 1108, dribble: 1237, defense: 1394, physical: 1276, speed: 918 },
    detailStats: {
      shoot: { finishing: 308, power: 367, composure: 327 },
      pass: { shortPass: 377, longPass: 374, accuracy: 357 },
      dribble: { breakout: 416, keeping: 405, ballTouch: 416 },
      defense: { tackle: 446, interception: 473, marking: 475 },
      physical: { jumping: 452, contact: 452, stamina: 372 },
      speed: { running: 489, agility: 429 }
    },
    maxEnhanced: {
      overall: 15458,
      baseStats: { shoot: 2499, pass: 2677, dribble: 2770, defense: 2999, physical: 2869, speed: 1964 },
      detailStats: {
        shoot: { finishing: 807, power: 866, composure: 826 },
        pass: { shortPass: 900, longPass: 897, accuracy: 880 },
        dribble: { breakout: 927, keeping: 916, ballTouch: 927 },
        defense: { tackle: 981, interception: 1008, marking: 1010 },
        physical: { jumping: 987, contact: 987, stamina: 895 },
        speed: { running: 1012, agility: 952 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -1, shoot: -1, longShoot: -1,
      shortPass: 0, longPass: 0, throughPass: -1, cutIn: -1, keep: -1,
      delay: 0, rushOut: -1, feint: -1, press: 1
    },
    skill: { name: '熟練のインターセプト', rank: '銀', description: '発動エリア：中左中右・後左中右　/　発動条件：パスカット時　/　パスカット・敏捷性UP' },
    abilities: [
      { name: '上空の寸断者', rank: '銀', description: '発動条件：好調　/　パスカット・ジャンプUP' },
      { name: 'ランニングマーカー', rank: '銀', description: '発動条件：絶好調　/　マーク・走力UP' },
      { name: 'ハードタックラー', rank: '銅', description: '発動条件：好調　/　タックル・コンタクトUP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p407',
    name: 'グラニト・ジャカ',
    readingName: 'ぐらにと・じゃか',
    category: 'MF',
    mainPosition: 'DM',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'スイス',
    policy: 'リアクション',
    playStyle: 'ハードマーカー',
    playStyleLevel: 'Ⅱ',
    overall: 6844,
    maxOverall: 14990,
    baseStats: { shoot: 1150, pass: 1362, dribble: 1262, defense: 1319, physical: 1306, speed: 670 },
    detailStats: {
      shoot: { finishing: 354, power: 410, composure: 386 },
      pass: { shortPass: 459, longPass: 458, accuracy: 445 },
      dribble: { breakout: 383, keeping: 411, ballTouch: 468 },
      defense: { tackle: 433, interception: 451, marking: 435 },
      physical: { jumping: 414, contact: 435, stamina: 457 },
      speed: { running: 340, agility: 330 }
    },
    maxEnhanced: {
      overall: 14990,
      baseStats: { shoot: 2695, pass: 2967, dribble: 2795, defense: 2900, physical: 2875, speed: 1692 },
      detailStats: {
        shoot: { finishing: 865, power: 921, composure: 909 },
        pass: { shortPass: 994, longPass: 993, accuracy: 980 },
        dribble: { breakout: 894, keeping: 922, ballTouch: 979 },
        defense: { tackle: 968, interception: 974, marking: 958 },
        physical: { jumping: 925, contact: 958, stamina: 992 },
        speed: { running: 851, agility: 841 }
      }
    },
    playTendencies: {
      attack: 0, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 1, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '絶好の楔', rank: '銀', description: '発動エリア：中左中右・後左中右　/　発動条件：AM・CFの選手へのショートパス・ロングパス時　/　ロングパス・キック精度・ショートパスUP　/　成功時に受け手のショートパス発生確率UP' },
    abilities: [
      { name: '不屈のキッカー', rank: '銀', description: '発動条件：好調　/　キック精度・スタミナUP' },
      { name: '長短のキック', rank: '銀', description: '発動条件：途中出場　/　ショートパス・ロングパスUP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p408',
    name: 'クリスティアーノ・ロナウド(2026)',
    readingName: 'くりすてぃあーの・ろなうど',
    category: 'FW',
    mainPosition: 'CF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'ポルトガル',
    policy: 'カウンター',
    playStyle: 'ストライカー',
    playStyleLevel: 'Ⅲ',
    overall: 7778,
    maxOverall: 15972,
    baseStats: { shoot: 1487, pass: 1403, dribble: 1470, defense: 792, physical: 1417, speed: 963 },
    detailStats: {
      shoot: { finishing: 502, power: 487, composure: 498 },
      pass: { shortPass: 452, longPass: 444, accuracy: 507 },
      dribble: { breakout: 501, keeping: 487, ballTouch: 482 },
      defense: { tackle: 264, interception: 264, marking: 264 },
      physical: { jumping: 509, contact: 476, stamina: 432 },
      speed: { running: 488, agility: 475 }
    },
    maxEnhanced: {
      overall: 15972,
      baseStats: { shoot: 3092, pass: 2936, dribble: 3051, defense: 2289, physical: 2998, speed: 2009 },
      detailStats: {
        shoot: { finishing: 1037, power: 1022, composure: 1033 },
        pass: { shortPass: 963, longPass: 955, accuracy: 1018 },
        dribble: { breakout: 1024, keeping: 1010, ballTouch: 1017 },
        defense: { tackle: 763, interception: 763, marking: 763 },
        physical: { jumping: 1032, contact: 1011, stamina: 955 },
        speed: { running: 1011, agility: 998 }
      }
    },
    playTendencies: {
      attack: 1, defense: -1, dribble: 0, shoot: 1, longShoot: 0,
      shortPass: 0, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: -1, rushOut: 0, feint: 0, press: -1
    },
    skill: { name: 'アンストッパブルショット', rank: '金', description: '発動エリア：前中　/　発動条件：シュート時　/　決定力・キック力・冷静さUP' },
    abilities: [
      { name: 'カピタォン・アルティリェイロ', rank: '金', description: '発動条件：キャプテンに指定　/　CF・LW・RWのカウンター選手が冷静さ・突破力UP' },
      { name: '冷静なフィニッシュ', rank: '銀', description: '発動条件：好調　/　決定力・冷静さUP' },
      { name: '跳躍のステップ', rank: '銀', description: '発動条件：好調　/　ジャンプ・敏捷性UP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p409',
    name: 'ヴィティーニャ',
    readingName: 'ゔぃてぃーにゃ',
    category: 'MF',
    mainPosition: 'DM',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'ポルトガル',
    policy: 'カウンター',
    playStyle: 'パサーDM',
    playStyleLevel: 'Ⅲ',
    overall: 7525,
    maxOverall: 15753,
    baseStats: { shoot: 1184, pass: 1446, dribble: 1506, defense: 1333, physical: 1138, speed: 904 },
    detailStats: {
      shoot: { finishing: 409, power: 366, composure: 409 },
      pass: { shortPass: 488, longPass: 485, accuracy: 473 },
      dribble: { breakout: 501, keeping: 504, ballTouch: 501 },
      defense: { tackle: 409, interception: 464, marking: 460 },
      physical: { jumping: 283, contact: 368, stamina: 487 },
      speed: { running: 399, agility: 505 }
    },
    maxEnhanced: {
      overall: 15753,
      baseStats: { shoot: 2729, pass: 3051, dribble: 3039, defense: 2914, physical: 2707, speed: 1926 },
      detailStats: {
        shoot: { finishing: 920, power: 877, composure: 932 },
        pass: { shortPass: 1023, longPass: 1020, accuracy: 1008 },
        dribble: { breakout: 1012, keeping: 1015, ballTouch: 1012 },
        defense: { tackle: 944, interception: 987, marking: 983 },
        physical: { jumping: 794, contact: 891, stamina: 1022 },
        speed: { running: 910, agility: 1016 }
      }
    },
    playTendencies: {
      attack: 1, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 2, longPass: -1, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: 'クリティカルウェッジ', rank: '金', description: '発動エリア：中左中右・後左中右　/　発動条件：CF・AMの選手へのパス時　/　ロングパス・キック精度・ショートパスUP　/　成功時に受け手のショートパス発生確率UP　/　ドリブル・ショートパススキル所持者優先' },
    abilities: [
      { name: '変幻のパサー', rank: '金', description: '発動条件：好調　/　ショートパス・ロングパス・ボールタッチUP' },
      { name: '無限のアジリティ', rank: '銀', description: '発動条件：好調　/　スタミナ・敏捷性UP' },
      { name: '懐の深いロングパサー', rank: '銅', description: '発動条件：絶好調　/　ロングパス・キープ力UP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p410',
    name: 'ネルソン・セメド',
    readingName: 'ねるそん・せめど',
    category: 'DF',
    mainPosition: 'RFB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'ポルトガル',
    policy: 'カウンター',
    playStyle: '攻撃的RFB',
    playStyleLevel: 'Ⅲ',
    overall: 7130,
    maxOverall: 15390,
    baseStats: { shoot: 1189, pass: 1244, dribble: 1371, defense: 1290, physical: 1259, speed: 919 },
    detailStats: {
      shoot: { finishing: 396, power: 393, composure: 400 },
      pass: { shortPass: 418, longPass: 410, accuracy: 416 },
      dribble: { breakout: 459, keeping: 462, ballTouch: 450 },
      defense: { tackle: 446, interception: 425, marking: 419 },
      physical: { jumping: 395, contact: 422, stamina: 442 },
      speed: { running: 459, agility: 460 }
    },
    maxEnhanced: {
      overall: 15390,
      baseStats: { shoot: 2686, pass: 2813, dribble: 2904, defense: 2895, physical: 2828, speed: 1989 },
      detailStats: {
        shoot: { finishing: 895, power: 892, composure: 899 },
        pass: { shortPass: 941, longPass: 933, accuracy: 939 },
        dribble: { breakout: 970, keeping: 973, ballTouch: 961 },
        defense: { tackle: 981, interception: 960, marking: 954 },
        physical: { jumping: 906, contact: 945, stamina: 977 },
        speed: { running: 994, agility: 995 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -1, shoot: -1, longShoot: -1,
      shortPass: 0, longPass: 0, throughPass: -1, cutIn: -1, keep: -1,
      delay: 0, rushOut: -1, feint: -1, press: 1
    },
    skill: { name: '演出のアーティスト', rank: '金', description: '発動エリア：中左右・後左右　/　発動条件：ドリブル時　/　突破力・ショートパスUP　/　成功時に自身のショートパス発生確率UP' },
    abilities: [
      { name: 'スピードランナー', rank: '銀', description: '発動条件：好調　/　走力・敏捷性UP' },
      { name: 'ボールハンター', rank: '銀', description: '発動条件：絶好調　/　タックル・マークUP' },
      { name: '奪取のターゲットマン', rank: '銅', description: '発動条件：好調　/　キープ力・パスカットUP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p411',
    name: 'レナト・ベイガ',
    readingName: 'れなと・べいが',
    category: 'DF',
    mainPosition: 'CB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'ポルトガル',
    policy: 'カウンター',
    playStyle: 'ストッパー',
    playStyleLevel: 'Ⅱ',
    overall: 7214,
    maxOverall: 15501,
    baseStats: { shoot: 984, pass: 1206, dribble: 1257, defense: 1414, physical: 1284, speed: 830 },
    detailStats: {
      shoot: { finishing: 304, power: 352, composure: 328 },
      pass: { shortPass: 412, longPass: 401, accuracy: 393 },
      dribble: { breakout: 414, keeping: 414, ballTouch: 429 },
      defense: { tackle: 469, interception: 470, marking: 475 },
      physical: { jumping: 434, contact: 450, stamina: 400 },
      speed: { running: 425, agility: 405 }
    },
    maxEnhanced: {
      overall: 15501,
      baseStats: { shoot: 2481, pass: 2775, dribble: 2790, defense: 3019, physical: 2877, speed: 1876 },
      detailStats: {
        shoot: { finishing: 803, power: 851, composure: 827 },
        pass: { shortPass: 935, longPass: 924, accuracy: 916 },
        dribble: { breakout: 925, keeping: 925, ballTouch: 940 },
        defense: { tackle: 1004, interception: 1005, marking: 1010 },
        physical: { jumping: 969, contact: 985, stamina: 923 },
        speed: { running: 948, agility: 928 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -1, shoot: -1, longShoot: -1,
      shortPass: 0, longPass: 0, throughPass: -1, cutIn: -1, keep: -1,
      delay: 0, rushOut: -1, feint: -1, press: 1
    },
    skill: { name: 'エリアの格闘家', rank: '銀', description: '発動エリア：中左中右・後左中右　/　発動条件：コンタクト時　/　コンタクト・タックル・マークUP' },
    abilities: [
      { name: '瞬間の球際力', rank: '銀', description: '発動条件：好調　/　パスカット・コンタクトUP' },
      { name: 'ボールハンター', rank: '銀', description: '発動条件：絶好調　/　タックル・マークUP' },
      { name: '制空のボールタッチ', rank: '銅', description: '発動条件：途中出場　/　ボールタッチ・ジャンプUP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p412',
    name: 'ラファエル・レオン',
    readingName: 'らふぁえる・れおん',
    category: 'FW',
    mainPosition: 'LW',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'ポルトガル',
    policy: 'カウンター',
    playStyle: 'サイドアタッカーLW',
    playStyleLevel: 'Ⅱ',
    overall: 7400,
    maxOverall: 15635,
    baseStats: { shoot: 1351, pass: 1193, dribble: 1439, defense: 918, physical: 1274, speed: 961 },
    detailStats: {
      shoot: { finishing: 460, power: 443, composure: 448 },
      pass: { shortPass: 402, longPass: 394, accuracy: 397 },
      dribble: { breakout: 481, keeping: 478, ballTouch: 480 },
      defense: { tackle: 286, interception: 321, marking: 311 },
      physical: { jumping: 466, contact: 437, stamina: 371 },
      speed: { running: 475, agility: 486 }
    },
    maxEnhanced: {
      overall: 15635,
      baseStats: { shoot: 2908, pass: 2762, dribble: 3032, defense: 2427, physical: 2819, speed: 2031 },
      detailStats: {
        shoot: { finishing: 983, power: 954, composure: 971 },
        pass: { shortPass: 925, longPass: 917, accuracy: 920 },
        dribble: { breakout: 1016, keeping: 1013, ballTouch: 1003 },
        defense: { tackle: 797, interception: 820, marking: 810 },
        physical: { jumping: 977, contact: 948, stamina: 894 },
        speed: { running: 1010, agility: 1021 }
      }
    },
    playTendencies: {
      attack: 1, defense: -1, dribble: 1, shoot: 0, longShoot: 0,
      shortPass: 0, longPass: 0, throughPass: 0, cutIn: -1, keep: 0,
      delay: -1, rushOut: 2, feint: 1, press: 0
    },
    skill: { name: 'カッティングエッジ', rank: '金', description: '発動エリア：前左右　/　発動条件：ドリブル中　/　突破力・キープ力UP　/　成功時にシュート発生確率UP' },
    abilities: [
      { name: '多彩な足技', rank: '金', description: '発動条件：好調　/　突破力・キープ力・敏捷性UP' },
      { name: '高速のボールタッチ', rank: '銀', description: '発動条件：好調　/　ボールタッチ・走力UP' },
      { name: '力強いフィニッシュ', rank: '銅', description: '発動条件：絶好調　/　決定力・コンタクトUP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p413',
    name: 'ブルーノ・フェルナンデス',
    readingName: 'ぶるーの・ふぇるなんです',
    category: 'MF',
    mainPosition: 'AM',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'ポルトガル',
    policy: 'カウンター',
    playStyle: 'パサーAM',
    playStyleLevel: 'Ⅱ',
    overall: 7485,
    maxOverall: 15660,
    baseStats: { shoot: 1406, pass: 1483, dribble: 1292, defense: 1148, physical: 1283, speed: 858 },
    detailStats: {
      shoot: { finishing: 489, power: 453, composure: 464 },
      pass: { shortPass: 486, longPass: 500, accuracy: 497 },
      dribble: { breakout: 420, keeping: 404, ballTouch: 468 },
      defense: { tackle: 374, interception: 374, marking: 400 },
      physical: { jumping: 372, contact: 423, stamina: 488 },
      speed: { running: 415, agility: 443 }
    },
    maxEnhanced: {
      overall: 15660,
      baseStats: { shoot: 2951, pass: 3064, dribble: 2861, defense: 2693, physical: 2852, speed: 1892 },
      detailStats: {
        shoot: { finishing: 1000, power: 964, composure: 987 },
        pass: { shortPass: 1021, longPass: 1023, accuracy: 1020 },
        dribble: { breakout: 943, keeping: 927, ballTouch: 991 },
        defense: { tackle: 897, interception: 885, marking: 911 },
        physical: { jumping: 883, contact: 946, stamina: 1023 },
        speed: { running: 926, agility: 966 }
      }
    },
    playTendencies: {
      attack: 1, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 0, longPass: 2, throughPass: 1, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '妙なる調べ', rank: '金', description: '発動エリア：前中・中中　/　発動条件：前中・中中の位置に居る選手へのダイレクトショートパス時　/　ショートパス・キック精度UP　/　成功時に受け手のシュート発生確率UP' },
    abilities: [
      { name: '無尽蔵のパサー', rank: '金', description: '発動条件：好調　/　ショートパス・ロングパス・スタミナUP' },
      { name: '精密なフィニッシュ', rank: '銀', description: '発動条件：好調　/　決定力・キック精度UP' },
      { name: '冷静なボールタッチ', rank: '銅', description: '発動条件：絶好調　/　冷静さ・ボールタッチUP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p414',
    name: 'ベルナルド・シウバ',
    readingName: 'べるなるど・しうば',
    category: 'FW',
    mainPosition: 'RW',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'ポルトガル',
    policy: 'カウンター',
    playStyle: 'ドリブラーRW',
    playStyleLevel: 'Ⅱ',
    overall: 7411,
    maxOverall: 15686,
    baseStats: { shoot: 1277, pass: 1466, dribble: 1459, defense: 1013, physical: 1108, speed: 890 },
    detailStats: {
      shoot: { finishing: 417, power: 400, composure: 460 },
      pass: { shortPass: 490, longPass: 490, accuracy: 486 },
      dribble: { breakout: 476, keeping: 487, ballTouch: 496 },
      defense: { tackle: 304, interception: 360, marking: 349 },
      physical: { jumping: 297, contact: 338, stamina: 473 },
      speed: { running: 420, agility: 470 }
    },
    maxEnhanced: {
      overall: 15686,
      baseStats: { shoot: 2834, pass: 3035, dribble: 3052, defense: 2222, physical: 2653, speed: 1960 },
      detailStats: {
        shoot: { finishing: 940, power: 911, composure: 983 },
        pass: { shortPass: 1013, longPass: 1013, accuracy: 1009 },
        dribble: { breakout: 1011, keeping: 1022, ballTouch: 1019 },
        defense: { tackle: 815, interception: 559, marking: 848 },
        physical: { jumping: 808, contact: 849, stamina: 996 },
        speed: { running: 955, agility: 1005 }
      }
    },
    playTendencies: {
      attack: 2, defense: -1, dribble: 2, shoot: 1, longShoot: 0,
      shortPass: 0, longPass: -1, throughPass: 0, cutIn: 1, keep: 1,
      delay: -1, rushOut: 1, feint: 2, press: 0
    },
    skill: { name: '予測不能', rank: '金', description: '発動エリア：前左右・中左右　/　発動条件：ドリブル中　/　突破力・キープ力UP　/　成功時にショートパス発生確率UP' },
    abilities: [
      { name: '誘いの遊戯', rank: '金', description: '発動条件：好調　/　ショートパス・キープ力・ボールタッチUP' },
      { name: 'すり抜けるロングパサー', rank: '銀', description: '発動条件：絶好調　/　ロングパス・突破力UP' },
      { name: '俊敏なキッカー', rank: '銅', description: '発動条件：好調　/　キック精度・敏捷性UP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p415',
    name: 'ヌーノ・メンデス',
    readingName: 'ぬーの・めんです',
    category: 'DF',
    mainPosition: 'LFB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'ポルトガル',
    policy: 'カウンター',
    playStyle: '攻撃的LFB',
    playStyleLevel: 'Ⅱ',
    overall: 7206,
    maxOverall: 15442,
    baseStats: { shoot: 1213, pass: 1278, dribble: 1450, defense: 1269, physical: 1223, speed: 952 },
    detailStats: {
      shoot: { finishing: 397, power: 406, composure: 410 },
      pass: { shortPass: 427, longPass: 422, accuracy: 429 },
      dribble: { breakout: 485, keeping: 482, ballTouch: 483 },
      defense: { tackle: 440, interception: 419, marking: 410 },
      physical: { jumping: 366, contact: 425, stamina: 432 },
      speed: { running: 482, agility: 470 }
    },
    maxEnhanced: {
      overall: 15442,
      baseStats: { shoot: 2710, pass: 2847, dribble: 2983, defense: 2874, physical: 2792, speed: 2022 },
      detailStats: {
        shoot: { finishing: 896, power: 905, composure: 909 },
        pass: { shortPass: 950, longPass: 945, accuracy: 952 },
        dribble: { breakout: 996, keeping: 993, ballTouch: 994 },
        defense: { tackle: 975, interception: 954, marking: 945 },
        physical: { jumping: 877, contact: 948, stamina: 967 },
        speed: { running: 1017, agility: 1005 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -1, shoot: -1, longShoot: -1,
      shortPass: 0, longPass: 0, throughPass: -1, cutIn: -1, keep: -1,
      delay: 0, rushOut: -1, feint: -1, press: 1
    },
    skill: { name: 'ビルドアップドライブ', rank: '銀', description: '発動エリア：中左右・後左右　/　発動条件：ドリブル時　/　突破力・ショートパスUP　/　成功時に自身のショートパス発生確率UP' },
    abilities: [
      { name: '俊敏なドリブラー', rank: '銀', description: '発動条件：好調　/　突破力・敏捷性UP' },
      { name: '高速のボールタッチ', rank: '銀', description: '発動条件：好調　/　ボールタッチ・走力UP' },
      { name: '不屈の魂', rank: '銅', description: '発動条件：好調　/　キープ力・スタミナUP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p416',
    name: 'ポポ(配布)',
    readingName: 'ぽぽ',
    category: 'DF',
    mainPosition: 'CB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'ポルトガル',
    policy: 'カウンター',
    playStyle: 'スプリントCB',
    playStyleLevel: 'Ⅱ',
    overall: 5460,
    maxOverall: 12727,
    baseStats: { shoot: 914, pass: 767, dribble: 800, defense: 1138, physical: 1121, speed: 691 },
    detailStats: {
      shoot: { finishing: 285, power: 351, composure: 278 },
      pass: { shortPass: 209, longPass: 333, accuracy: 225 },
      dribble: { breakout: 244, keeping: 283, ballTouch: 273 },
      defense: { tackle: 374, interception: 375, marking: 389 },
      physical: { jumping: 374, contact: 383, stamina: 364 },
      speed: { running: 359, agility: 332 }
    },
    maxEnhanced: {
      overall: 12727,
      baseStats: { shoot: 2138, pass: 2063, dribble: 2060, defense: 2470, physical: 2441, speed: 1555 },
      detailStats: {
        shoot: { finishing: 693, power: 759, composure: 686 },
        pass: { shortPass: 641, longPass: 765, accuracy: 657 },
        dribble: { breakout: 664, keeping: 703, ballTouch: 693 },
        defense: { tackle: 818, interception: 819, marking: 833 },
        physical: { jumping: 818, contact: 827, stamina: 796 },
        speed: { running: 791, agility: 764 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -1, shoot: -1, longShoot: -1,
      shortPass: 0, longPass: 0, throughPass: -1, cutIn: -1, keep: -1,
      delay: 0, rushOut: -1, feint: -1, press: 1
    },
    skill: { name: '反撃のパスカット', rank: '銅', description: '発動エリア：中左中右・後左中右　/　発動条件：パスカット時　/　パスカット・ロングパスUP　/　成功時に自身のロングパス発生確率UP' },
    abilities: [
      { name: 'ボールハンター', rank: '銀', description: '発動条件：絶好調　/　タックル・マークUP' },
      { name: 'ノンストップジャンパー', rank: '銅', description: '発動条件：途中出場　/　ジャンプ・スタミナUP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p417',
    name: 'ハリー・ケイン(2026-2027)',
    readingName: 'はりーけいん',
    category: 'FW',
    mainPosition: 'CF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'イングランド',
    policy: 'リアクション',
    playStyle: 'ポストプレーヤー',
    playStyleLevel: 'Ⅲ',
    overall: 8028,
    maxOverall: 16359,
    baseStats: { shoot: 1485, pass: 1521, dribble: 1419, defense: 903, physical: 1401, speed: 751 },
    detailStats: {
      shoot: { finishing: 496, power: 490, composure: 499 },
      pass: { shortPass: 513, longPass: 506, accuracy: 502 },
      dribble: { breakout: 437, keeping: 490, ballTouch: 492 },
      defense: { tackle: 300, interception: 309, marking: 294 },
      physical: { jumping: 496, contact: 474, stamina: 431 },
      speed: { running: 372, agility: 379 }
    },
    maxEnhanced: {
      overall: 16359,
      baseStats: { shoot: 3090, pass: 3054, dribble: 3000, defense: 2400, physical: 2982, speed: 1797 },
      detailStats: {
        shoot: { finishing: 1031, power: 1025, composure: 1034 },
        pass: { shortPass: 1024, longPass: 1017, accuracy: 1013 },
        dribble: { breakout: 960, keeping: 1013, ballTouch: 1027 },
        defense: { tackle: 799, interception: 808, marking: 793 },
        physical: { jumping: 1019, contact: 1009, stamina: 954 },
        speed: { running: 895, agility: 902 }
      }
    },
    playTendencies: {
      attack: 1, defense: -1, dribble: 0, shoot: 1, longShoot: 1,
      shortPass: 1, longPass: -1, throughPass: 1, cutIn: 0, keep: 2,
      delay: -1, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: 'ギフトタッチ', rank: '金', description: '発動エリア：前中・中中　/　発動条件：トラップ時　/　ボールタッチ・キープ力　/　成功時に自身のシュート発生確率UP' },
    abilities: [
      { name: '最優秀選手の証明', rank: '虹', description: '発動条件：常時　/　全パラメーターUP' },
      { name: '狙いすました強振', rank: '銀', description: '発動条件：好調　/　キック力・冷静さUP' },
      { name: '懐の深いボールタッチ', rank: '銀', description: '発動条件：絶好調　/　キープ力・ボールタッチUP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p418',
    name: 'ルイス・ディアス(2026-2027)',
    readingName: 'るいすでぃあす',
    category: 'FW',
    mainPosition: 'LW',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'コロンビア',
    policy: 'リアクション',
    playStyle: 'ドリブラー',
    playStyleLevel: 'Ⅱ',
    overall: 7440,
    maxOverall: 15721,
    baseStats: { shoot: 1307, pass: 1314, dribble: 1463, defense: 1052, physical: 1161, speed: 934 },
    detailStats: {
      shoot: { finishing: 455, power: 402, composure: 450 },
      pass: { shortPass: 443, longPass: 435, accuracy: 436 },
      dribble: { breakout: 484, keeping: 487, ballTouch: 492 },
      defense: { tackle: 350, interception: 361, marking: 341 },
      physical: { jumping: 395, contact: 358, stamina: 408 },
      speed: { running: 452, agility: 482 }
    },
    maxEnhanced: {
      overall: 15721,
      baseStats: { shoot: 2864, pass: 2883, dribble: 3056, defense: 2561, physical: 2706, speed: 2004 },
      detailStats: {
        shoot: { finishing: 978, power: 913, composure: 973 },
        pass: { shortPass: 966, longPass: 958, accuracy: 959 },
        dribble: { breakout: 1019, keeping: 1022, ballTouch: 1015 },
        defense: { tackle: 861, interception: 860, marking: 840 },
        physical: { jumping: 906, contact: 869, stamina: 931 },
        speed: { running: 987, agility: 1017 }
      }
    },
    playTendencies: {
      attack: 2, defense: -1, dribble: 2, shoot: 1, longShoot: 0,
      shortPass: 0, longPass: -1, throughPass: 0, cutIn: 1, keep: 1,
      delay: -1, rushOut: 1, feint: 2, press: 0
    },
    skill: { name: '幻惑の疾走', rank: '金', description: '発動エリア：前左右・中左右　/　発動条件：プレースタイルがドリブラーの選手のドリブル時　/　突破力・キープ力UP　/　発動時にCF・AMの選手の決定力が一定時間UP、ドリブル成功時に自身のショートパス発生確率UP' },
    abilities: [
      { name: '多彩な足技', rank: '金', description: '発動条件：好調　/　突破力・キープ力・敏捷性UP' },
      { name: 'ゴール前の落ち着き', rank: '銀', description: '発動条件：好調　/　決定力・ボールタッチUP' },
      { name: '冷静な破壊者', rank: '銅', description: '発動条件：好調　/　冷静さ・コンタクトUP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p419',
    name: 'ミカエル・オリーズ(2026-2027)',
    readingName: 'みかえるおりーず',
    category: 'FW',
    mainPosition: 'RW',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'フランス',
    policy: 'リアクション',
    playStyle: 'ワイドストライカー',
    playStyleLevel: 'Ⅲ',
    overall: 7480,
    maxOverall: 15699,
    baseStats: { shoot: 1415, pass: 1438, dribble: 1431, defense: 980, physical: 1111, speed: 865 },
    detailStats: {
      shoot: { finishing: 475, power: 453, composure: 487 },
      pass: { shortPass: 480, longPass: 480, accuracy: 478 },
      dribble: { breakout: 469, keeping: 475, ballTouch: 487 },
      defense: { tackle: 310, interception: 342, marking: 328 },
      physical: { jumping: 313, contact: 393, stamina: 405 },
      speed: { running: 416, agility: 449 }
    },
    maxEnhanced: {
      overall: 15699,
      baseStats: { shoot: 2972, pass: 3007, dribble: 3024, defense: 2489, physical: 2656, speed: 1935 },
      detailStats: {
        shoot: { finishing: 998, power: 964, composure: 1010 },
        pass: { shortPass: 1003, longPass: 1003, accuracy: 1001 },
        dribble: { breakout: 1004, keeping: 1010, ballTouch: 1010 },
        defense: { tackle: 821, interception: 841, marking: 827 },
        physical: { jumping: 824, contact: 904, stamina: 928 },
        speed: { running: 951, agility: 984 }
      }
    },
    playTendencies: {
      attack: 2, defense: -1, dribble: 2, shoot: 2, longShoot: 1,
      shortPass: 0, longPass: -1, throughPass: 0, cutIn: 2, keep: 0,
      delay: -1, rushOut: 1, feint: 1, press: 0
    },
    skill: { name: '流星の弾道', rank: '金', description: '発動エリア：前左中右　/　発動条件：シュート時　/　決定力、キック力UP' },
    abilities: [
      { name: '変幻自在のドリブラー', rank: '金', description: '発動条件：好調　/　突破力・キープ力・ボールタッチUP' },
      { name: 'ムービングスナイパー', rank: '銀', description: '発動条件：好調　/　冷静さ・敏捷性UP' },
      { name: '精緻なパサー', rank: '銅', description: '発動条件：絶好調　/　ショートパス・キック精度UP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p420',
    name: 'ジャマル・ムシアラ(2026-2027)',
    readingName: 'じゃまるむしあら',
    category: 'MF',
    mainPosition: 'AM',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'ドイツ',
    policy: 'リアクション',
    playStyle: 'アタッカー',
    playStyleLevel: 'Ⅱ',
    overall: 7589,
    maxOverall: 15732,
    baseStats: { shoot: 1336, pass: 1341, dribble: 1497, defense: 1195, physical: 1184, speed: 963 },
    detailStats: {
      shoot: { finishing: 465, power: 422, composure: 449 },
      pass: { shortPass: 446, longPass: 456, accuracy: 439 },
      dribble: { breakout: 500, keeping: 502, ballTouch: 495 },
      defense: { tackle: 391, interception: 407, marking: 397 },
      physical: { jumping: 423, contact: 382, stamina: 379 },
      speed: { running: 465, agility: 498 }
    },
    maxEnhanced: {
      overall: 15732,
      baseStats: { shoot: 2881, pass: 2922, dribble: 3066, defense: 2740, physical: 2753, speed: 1997 },
      detailStats: {
        shoot: { finishing: 976, power: 933, composure: 972 },
        pass: { shortPass: 981, longPass: 979, accuracy: 962 },
        dribble: { breakout: 1023, keeping: 1025, ballTouch: 1018 },
        defense: { tackle: 914, interception: 918, marking: 908 },
        physical: { jumping: 934, contact: 905, stamina: 914 },
        speed: { running: 976, agility: 1021 }
      }
    },
    playTendencies: {
      attack: 0, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 1, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: 'ショックウェーブ', rank: '金', description: '発動エリア：前中・中中　/　発動条件：ドリブル時　/　突破力・キープ力UP' },
    abilities: [
      { name: '突破からの打開', rank: '金', description: '発動条件：好調　/　ショートパス・突破力・キープ力UP' },
      { name: '俊敏なタッチ', rank: '銀', description: '発動条件：絶好調　/　ボールタッチ・敏捷性UP' },
      { name: '冷静なフィニッシュ', rank: '銅', description: '発動条件：絶好調　/　決定力・冷静さUP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p421',
    name: 'ヨシュア・キミッヒ(2026-2027)',
    readingName: 'よしゅあきみっひ',
    category: 'MF',
    mainPosition: 'DM',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'ドイツ',
    policy: 'リアクション',
    playStyle: 'パサーDM',
    playStyleLevel: 'Ⅱ',
    overall: 7451,
    maxOverall: 15661,
    baseStats: { shoot: 1202, pass: 1468, dribble: 1371, defense: 1312, physical: 1302, speed: 821 },
    detailStats: {
      shoot: { finishing: 396, power: 389, composure: 417 },
      pass: { shortPass: 490, longPass: 491, accuracy: 487 },
      dribble: { breakout: 435, keeping: 448, ballTouch: 488 },
      defense: { tackle: 431, interception: 448, marking: 433 },
      physical: { jumping: 402, contact: 411, stamina: 489 },
      speed: { running: 401, agility: 420 }
    },
    maxEnhanced: {
      overall: 15661,
      baseStats: { shoot: 2747, pass: 3073, dribble: 2904, defense: 2893, physical: 2871, speed: 1843 },
      detailStats: {
        shoot: { finishing: 907, power: 900, composure: 940 },
        pass: { shortPass: 1025, longPass: 1026, accuracy: 1022 },
        dribble: { breakout: 946, keeping: 959, ballTouch: 999 },
        defense: { tackle: 966, interception: 971, marking: 956 },
        physical: { jumping: 913, contact: 934, stamina: 1024 },
        speed: { running: 912, agility: 931 }
      }
    },
    playTendencies: {
      attack: 1, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 2, longPass: -1, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: 'テレグノシス', rank: '金', description: '発動エリア：中中・後左中右　/　発動条件：CF・AMの選手へのショートパス・ロングパス時　/　ロングパス・キック精度・ショートパスUP　/　成功時に受け手のショートパス発生確率UP' },
    abilities: [
      { name: '精緻な指揮者', rank: '金', description: '発動条件：好調　/　ロングパス・キック精度・ボールタッチUP' },
      { name: '不屈の魂', rank: '銀', description: '発動条件：好調　/　キープ力・スタミナUP' },
      { name: 'リスクヘッジパサー', rank: '銅', description: '発動条件：絶好調　/　ショートパス・マークUP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p422',
    name: 'アレクサンダル・パブロヴィッチ(2026-2027)',
    readingName: 'あれくさんだるぱぶろゔぃっち',
    category: 'MF',
    mainPosition: 'DM',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'ドイツ',
    policy: 'リアクション',
    playStyle: 'セントラルDM',
    playStyleLevel: 'Ⅱ',
    overall: 7154,
    maxOverall: 15305,
    baseStats: { shoot: 1059, pass: 1439, dribble: 1373, defense: 1276, physical: 1306, speed: 810 },
    detailStats: {
      shoot: { finishing: 336, power: 346, composure: 377 },
      pass: { shortPass: 484, longPass: 484, accuracy: 471 },
      dribble: { breakout: 433, keeping: 444, ballTouch: 496 },
      defense: { tackle: 408, interception: 443, marking: 425 },
      physical: { jumping: 424, contact: 399, stamina: 483 },
      speed: { running: 393, agility: 417 }
    },
    maxEnhanced: {
      overall: 15305,
      baseStats: { shoot: 2604, pass: 3044, dribble: 2906, defense: 2857, physical: 2875, speed: 1832 },
      detailStats: {
        shoot: { finishing: 847, power: 857, composure: 900 },
        pass: { shortPass: 1019, longPass: 1019, accuracy: 1006 },
        dribble: { breakout: 944, keeping: 955, ballTouch: 1007 },
        defense: { tackle: 943, interception: 966, marking: 948 },
        physical: { jumping: 935, contact: 922, stamina: 1018 },
        speed: { running: 904, agility: 928 }
      }
    },
    playTendencies: {
      attack: 0, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 1, longPass: 1, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '華麗なる一閃', rank: '銀', description: '発動エリア：中中・後左中右　/　発動条件：CF・AMの選手へのショートパス・ロングパス時　/　ロングパス・キック精度・ショートパスUP　/　成功時に受け手のショートパス発生確率UP' },
    abilities: [
      { name: '柔軟なキッカー', rank: '銀', description: '発動条件：絶好調　/　キック精度・ボールタッチUP' },
      { name: '懐の深いロングパサー', rank: '銀', description: '発動条件：好調　/　ロングパス・キープ力UP' },
      { name: '長短のキック', rank: '銅', description: '発動条件：好調　/　ショートパス・ロングパスUP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p423',
    name: 'ナサニエル・ブラウン(2026-2027)',
    readingName: 'なさにえるぶらうん',
    category: 'DF',
    mainPosition: 'LFB',
    subPositions: ['AM'],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'ドイツ',
    policy: 'リアクション',
    playStyle: '攻撃的LFB',
    playStyleLevel: 'Ⅱ',
    overall: 7203,
    maxOverall: 15480,
    baseStats: { shoot: 1185, pass: 1289, dribble: 1374, defense: 1355, physical: 1193, speed: 914 },
    detailStats: {
      shoot: { finishing: 404, power: 383, composure: 398 },
      pass: { shortPass: 435, longPass: 428, accuracy: 426 },
      dribble: { breakout: 469, keeping: 437, ballTouch: 468 },
      defense: { tackle: 480, interception: 441, marking: 434 },
      physical: { jumping: 372, contact: 409, stamina: 412 },
      speed: { running: 459, agility: 455 }
    },
    maxEnhanced: {
      overall: 15480,
      baseStats: { shoot: 2682, pass: 2858, dribble: 2907, defense: 2960, physical: 2762, speed: 1984 },
      detailStats: {
        shoot: { finishing: 903, power: 882, composure: 897 },
        pass: { shortPass: 958, longPass: 951, accuracy: 949 },
        dribble: { breakout: 980, keeping: 948, ballTouch: 979 },
        defense: { tackle: 1015, interception: 976, marking: 969 },
        physical: { jumping: 883, contact: 932, stamina: 947 },
        speed: { running: 994, agility: 990 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -1, shoot: -1, longShoot: -1,
      shortPass: 0, longPass: 0, throughPass: -1, cutIn: -1, keep: -1,
      delay: 0, rushOut: -1, feint: -1, press: 1
    },
    skill: { name: '極上のショートパス', rank: '銀', description: '発動エリア：中左中右・後左中右　/　発動条件：前中・中中のエリアに居る選手へのショートパス時　/　ショートパス・キック精度UP' },
    abilities: [
      { name: 'スピード溢れる突破', rank: '金', description: '発動条件：好調　/　突破力・走力・敏捷性UP' },
      { name: 'ハードスティール', rank: '銀', description: '発動条件：絶好調　/　キープ力・タックルUP' },
      { name: 'ムービングウォール', rank: '銅', description: '発動条件：絶好調　/　コンタクト・スタミナUP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p424',
    name: 'コンラート・ライマー(2026-2027)',
    readingName: 'こんらーとらいまー',
    category: 'DF',
    mainPosition: 'RFB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'オーストリア',
    policy: 'リアクション',
    playStyle: '攻撃的RFB',
    playStyleLevel: 'Ⅱ',
    overall: 7089,
    maxOverall: 15322,
    baseStats: { shoot: 1152, pass: 1312, dribble: 1285, defense: 1330, physical: 1326, speed: 857 },
    detailStats: {
      shoot: { finishing: 392, power: 378, composure: 382 },
      pass: { shortPass: 444, longPass: 440, accuracy: 428 },
      dribble: { breakout: 445, keeping: 420, ballTouch: 420 },
      defense: { tackle: 485, interception: 435, marking: 410 },
      physical: { jumping: 404, contact: 437, stamina: 485 },
      speed: { running: 440, agility: 417 }
    },
    maxEnhanced: {
      overall: 15322,
      baseStats: { shoot: 2649, pass: 2881, dribble: 2818, defense: 2935, physical: 2895, speed: 1927 },
      detailStats: {
        shoot: { finishing: 891, power: 877, composure: 881 },
        pass: { shortPass: 967, longPass: 963, accuracy: 951 },
        dribble: { breakout: 956, keeping: 931, ballTouch: 931 },
        defense: { tackle: 1020, interception: 970, marking: 945 },
        physical: { jumping: 915, contact: 960, stamina: 1020 },
        speed: { running: 975, agility: 952 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -1, shoot: -1, longShoot: -1,
      shortPass: 0, longPass: 0, throughPass: -1, cutIn: -1, keep: -1,
      delay: 0, rushOut: -1, feint: -1, press: 1
    },
    skill: { name: '逆襲', rank: '銀', description: '発動エリア：中左中右・後左中右　/　発動条件：タックル時　/　タックル・マーク・突破力UP　/　成功時に自身のドリブル発生確率UP' },
    abilities: [
      { name: 'ピッチの掃除屋', rank: '銀', description: '発動条件：好調　/　タックル・スタミナUP' },
      { name: '疾走するパサー', rank: '銀', description: '発動条件：絶好調　/　ショートパス・走力UP' },
      { name: 'すり抜けるロングパサー', rank: '銅', description: '発動条件：好調　/　ロングパス・突破力UP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p425',
    name: 'ダヨ・ウパメカノ(2026-2027)',
    readingName: 'だよ・うぱめかの',
    category: 'DF',
    mainPosition: 'CB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'フランス',
    policy: 'リアクション',
    playStyle: 'スプリントCB',
    playStyleLevel: 'Ⅱ',
    overall: 7466,
    maxOverall: 15765,
    baseStats: { shoot: 995, pass: 1293, dribble: 1274, defense: 1459, physical: 1313, speed: 854 },
    detailStats: {
      shoot: { finishing: 292, power: 364, composure: 339 },
      pass: { shortPass: 447, longPass: 446, accuracy: 400 },
      dribble: { breakout: 415, keeping: 419, ballTouch: 440 },
      defense: { tackle: 483, interception: 487, marking: 489 },
      physical: { jumping: 450, contact: 480, stamina: 383 },
      speed: { running: 456, agility: 398 }
    },
    maxEnhanced: {
      overall: 15765,
      baseStats: { shoot: 2492, pass: 2862, dribble: 2807, defense: 3064, physical: 2906, speed: 1900 },
      detailStats: {
        shoot: { finishing: 791, power: 863, composure: 838 },
        pass: { shortPass: 970, longPass: 969, accuracy: 923 },
        dribble: { breakout: 926, keeping: 930, ballTouch: 951 },
        defense: { tackle: 1018, interception: 1022, marking: 1024 },
        physical: { jumping: 985, contact: 1015, stamina: 906 },
        speed: { running: 979, agility: 921 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -1, shoot: -1, longShoot: -1,
      shortPass: 0, longPass: 0, throughPass: -1, cutIn: -1, keep: -1,
      delay: 0, rushOut: -1, feint: -1, press: 1
    },
    skill: { name: '逆襲の初動', rank: '金', description: '発動エリア：中左中右・後左中右　/　発動条件：パスカット時　/　パスカットUP　/　成功時に自身のショートパス発生確率UP' },
    abilities: [
      { name: '守りの哲学', rank: '金', description: '発動条件：好調　/　タックル・パスカット・マークUP' },
      { name: 'パワーアジリティ', rank: '銀', description: '発動条件：好調　/　コンタクト・敏捷性UP' },
      { name: '快速のロングパサー', rank: '銅', description: '発動条件：絶好調　/　ロングパス・走力UP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p426',
    name: 'キム・ミンジェ(2026-2027)',
    readingName: 'きむみんじぇ',
    category: 'DF',
    mainPosition: 'CB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '韓国',
    policy: 'リアクション',
    playStyle: 'ストッパー',
    playStyleLevel: 'Ⅱ',
    overall: 7222,
    maxOverall: 15512,
    baseStats: { shoot: 1034, pass: 1173, dribble: 1242, defense: 1397, physical: 1315, speed: 807 },
    detailStats: {
      shoot: { finishing: 340, power: 364, composure: 330 },
      pass: { shortPass: 402, longPass: 401, accuracy: 370 },
      dribble: { breakout: 402, keeping: 408, ballTouch: 432 },
      defense: { tackle: 476, interception: 452, marking: 469 },
      physical: { jumping: 455, contact: 465, stamina: 395 },
      speed: { running: 414, agility: 393 }
    },
    maxEnhanced: {
      overall: 15512,
      baseStats: { shoot: 2531, pass: 2742, dribble: 2775, defense: 3002, physical: 2908, speed: 1853 },
      detailStats: {
        shoot: { finishing: 839, power: 863, composure: 829 },
        pass: { shortPass: 925, longPass: 924, accuracy: 893 },
        dribble: { breakout: 913, keeping: 919, ballTouch: 943 },
        defense: { tackle: 1011, interception: 987, marking: 1004 },
        physical: { jumping: 990, contact: 1000, stamina: 918 },
        speed: { running: 937, agility: 916 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -1, shoot: -1, longShoot: -1,
      shortPass: 0, longPass: 0, throughPass: -1, cutIn: -1, keep: -1,
      delay: 0, rushOut: -1, feint: -1, press: 1
    },
    skill: { name: 'エリアの格闘家', rank: '銀', description: '発動エリア：中左中右・後左中右　/　発動条件：コンタクト時　/　コンタクト・タックル・マークUP' },
    abilities: [
      { name: '瞬間の球際力', rank: '銀', description: '発動条件：好調　/　パスカット・コンタクトUP' },
      { name: 'ハイタワーの天敵', rank: '銀', description: '発動条件：好調　/　マーク・ジャンプUP' },
      { name: 'スピードクラッシャー', rank: '銅', description: '発動条件：途中出場　/　タックル・走力UP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p427',
    name: 'マヌエル・ノイアー(2026-2027)',
    readingName: 'まぬえるのいあー',
    category: 'GK',
    mainPosition: 'GK',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'ドイツ',
    policy: 'リアクション',
    playStyle: 'スイーパーGK',
    playStyleLevel: 'Ⅲ',
    overall: 7682,
    maxOverall: 15921,
    baseStats: { shoot: 981, pass: 1457, dribble: 1087, defense: 1487, physical: 1317, speed: 848 },
    detailStats: {
      shoot: { finishing: 305, power: 348, composure: 328 },
      pass: { shortPass: 482, longPass: 490, accuracy: 485 },
      dribble: { breakout: 348, keeping: 365, ballTouch: 374 },
      defense: { tackle: 491, interception: 497, marking: 499 },
      physical: { jumping: 482, contact: 487, stamina: 348 },
      speed: { running: 400, agility: 448 }
    },
    maxEnhanced: {
      overall: 15921,
      baseStats: { shoot: 2442, pass: 3062, dribble: 2548, defense: 3092, physical: 2910, speed: 1870 },
      detailStats: {
        shoot: { finishing: 792, power: 835, composure: 815 },
        pass: { shortPass: 1017, longPass: 1025, accuracy: 1020 },
        dribble: { breakout: 835, keeping: 852, ballTouch: 861 },
        defense: { tackle: 1026, interception: 1032, marking: 1034 },
        physical: { jumping: 1017, contact: 1022, stamina: 871 },
        speed: { running: 911, agility: 959 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -2, shoot: -1, longShoot: -1,
      shortPass: -1, longPass: 1, throughPass: -1, cutIn: -1, keep: -1,
      delay: -1, rushOut: -1, feint: -1, press: -1
    },
    skill: { name: '難攻不落', rank: '金', description: '発動エリア：後中　/　発動条件：セービング時　/　セービング・反応速度UP' },
    abilities: [
      { name: 'ヘクセラー・カピテーン', rank: '金', description: '発動条件：キャプテンに指定　/　GK・LFB・RFB・CBのリアクション選手がコンタクト・走力UP' },
      { name: '広域の守護神', rank: '銀', description: '発動条件：好調　/　セービング・1VS1UP' },
      { name: '反撃のロングキック', rank: '銀', description: '発動条件：絶好調　/　反応速度・ロングパスUP' }
    ],
    avatarUrl: ''
  }
  ]
);

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'AM', 'CMF', 'DM', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
