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
  }
  ]
);

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'AM', 'CMF', 'DM', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
