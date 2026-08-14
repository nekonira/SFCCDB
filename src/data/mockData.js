// mockData.js - Full Clean Player Database (145 Players)
window.INITIAL_PLAYERS = [
  {
    id: 'p01',
    name: 'ペレ',
    readingName: 'ぺれ',
    category: 'FW',
    mainPosition: 'CF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'ブラジル',
    age: 30,
    growthType: '晩成',
    policy: 'リアクション',
    playStyle: 'ラインブレーカー',
    playStyleLevel: 'Ⅲ',
    overall: 7969,
    maxOverall: 16269,
    baseStats: { shoot: 1456, pass: 1336, dribble: 1452, defense: 763, physical: 1407, speed: 982 },
    detailStats: {
      shoot: { finishing: 490, power: 471, composure: 495 },
      pass: { shortPass: 436, longPass: 436, accuracy: 464 },
      dribble: { breakout: 491, keeping: 482, ballTouch: 479 },
      defense: { tackle: 283, interception: 255, marking: 225 },
      physical: { jumping: 491, contact: 447, stamina: 469 },
      speed: { running: 491, agility: 491 }
    },
    maxEnhanced: {
      overall: 16269,
      baseStats: { shoot: 3061, pass: 2869, dribble: 3033, defense: 2260, physical: 2988, speed: 2028 },
      detailStats: {
        shoot: { finishing: 1025, power: 1006, composure: 1030 },
        pass: { shortPass: 947, longPass: 947, accuracy: 975 },
        dribble: { breakout: 1014, keeping: 1005, ballTouch: 1014 },
        defense: { tackle: 782, interception: 754, marking: 724 },
        physical: { jumping: 1014, contact: 982, stamina: 992 },
        speed: { running: 1014, agility: 1014 }
      }
    },
    playTendencies: {
      attack: 2, defense: -1, dribble: 0, shoot: 2, longShoot: 1,
      shortPass: -1, longPass: -1, throughPass: -1, cutIn: 0, keep: -1,
      delay: -1, rushOut: 2, feint: 0, press: 0
    },
    skill: { name: 'アンストッパブルショット', rank: '金', description: '発動エリア：前中　/　発動条件：シュート時　/　決定力・キック力・冷静さUP' },
    abilities: [
      { name: '流氷の一撃', rank: '金', description: '発動条件：好調　/　決定力・冷静さ・突破力UP' },
      { name: '孤高(SHO)', rank: '銀', description: '発動条件：無し　/　決定力・キック力・冷静さUP' },
      { name: 'スピードランナー', rank: '銀', description: '発動条件：好調　/　走力・敏捷性UP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p02',
    name: 'クリスティアーノ・ロナウド',
    readingName: 'くりすてぃあーのろなうど',
    category: 'FW',
    mainPosition: 'CF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'ポルトガル',
    policy: 'リアクション',
    playStyle: 'ストライカー',
    playStyleLevel: 'Ⅲ',
    overall: 7638,
    maxOverall: 15972,
    baseStats: { shoot: 1467, pass: 1310, dribble: 1355, defense: 837, physical: 1287, speed: 706 },
    detailStats: {
      shoot: { finishing: 489, power: 489, composure: 489 },
      pass: { shortPass: 444, longPass: 428, accuracy: 438 },
      dribble: { breakout: 436, keeping: 449, ballTouch: 470 },
      defense: { tackle: 274, interception: 295, marking: 268 },
      physical: { jumping: 502, contact: 447, stamina: 338 },
      speed: { running: 344, agility: 362 }
    },
    maxEnhanced: {
      overall: 15972,
      baseStats: { shoot: 3072, pass: 2843, dribble: 2936, defense: 2334, physical: 2868, speed: 1752 },
      detailStats: {
        shoot: { finishing: 1024, power: 1024, composure: 1024 },
        pass: { shortPass: 955, longPass: 939, accuracy: 949 },
        dribble: { breakout: 959, keeping: 972, ballTouch: 1005 },
        defense: { tackle: 773, interception: 794, marking: 767 },
        physical: { jumping: 1025, contact: 982, stamina: 861 },
        speed: { running: 867, agility: 885 }
      }
    },
    playTendencies: {
      attack: 1, defense: -1, dribble: 0, shoot: 1, longShoot: 0,
      shortPass: 0, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: -1, rushOut: 0, feint: 0, press: -1
    },
    skill: { name: 'コントロールショット', rank: '銀', description: '発動エリア：前中　/　発動条件：シュート時　/　決定力・キック力・冷静さUP' },
    abilities: [
      { name: 'ゴールハンター', rank: '金', description: '発動条件：好調　/　決定力・キック力・冷静さUP' },
      { name: '孤高(SHO)', rank: '銀', description: '発動条件：無し　/　決定力・キック力・冷静さUP' },
      { name: 'パワフルジャンパー', rank: '銅', description: '発動条件：途中出場　/　ジャンプ・コンタクトUP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p03',
    name: 'ケヴィン・デ・ブライネ',
    readingName: 'けゔぃんでぶらいね',
    category: 'MF',
    mainPosition: 'DM',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'ベルギー',
    policy: 'ムービング',
    playStyle: 'パサーDM',
    playStyleLevel: 'Ⅱ',
    overall: 7146,
    maxOverall: 15321,
    baseStats: { shoot: 1393, pass: 1449, dribble: 1437, defense: 1027, physical: 1094, speed: 820 },
    detailStats: {
      shoot: { finishing: 457, power: 459, composure: 477 },
      pass: { shortPass: 483, longPass: 482, accuracy: 484 },
      dribble: { breakout: 450, keeping: 500, ballTouch: 487 },
      defense: { tackle: 325, interception: 357, marking: 345 },
      physical: { jumping: 305, contact: 408, stamina: 381 },
      speed: { running: 391, agility: 429 }
    },
    maxEnhanced: {
      overall: 15321,
      baseStats: { shoot: 2938, pass: 3054, dribble: 2970, defense: 2608, physical: 2663, speed: 1842 },
      detailStats: {
        shoot: { finishing: 968, power: 970, composure: 1000 },
        pass: { shortPass: 1018, longPass: 1017, accuracy: 1019 },
        dribble: { breakout: 961, keeping: 1011, ballTouch: 998 },
        defense: { tackle: 860, interception: 880, marking: 868 },
        physical: { jumping: 816, contact: 931, stamina: 916 },
        speed: { running: 902, agility: 940 }
      }
    },
    playTendencies: {
      attack: 1, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 2, longPass: -1, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '仕上げ起点', rank: '銀', description: '発動エリア：前左中右・中左中右　/　発動条件：AM・RW・LW・CFの選手へのショートパス時　/　ショートパス・キック精度UP　/　成功時に受け手のショートパス発生確率UP' },
    abilities: [
      { name: '懐の深いパサー', rank: '銀', description: '発動条件：絶好調　/　ショートパス・キープ力UP' },
      { name: '冷静なゲームメイク', rank: '銀', description: '発動条件：絶好調　/　冷静さ・ロングパスUP' },
      { name: 'シュートセンス', rank: '銅', description: '発動条件：好調　/　決定力・キック力UP' }
    ],
    avatarUrl: ''
  },
  
  {
    id: 'p05',
    name: 'ヴィルジル・ファン・ダイク',
    readingName: 'ゔぃるじるふぁんだいく',
    category: 'DF',
    mainPosition: 'CB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'オランダ',
    age: 32,
    growthType: '晩成',
    policy: 'ムービング',
    playStyle: '組立CB',
    playStyleLevel: 'Ⅲ',
    overall: 7345,
    maxOverall: 15607,
    baseStats: { shoot: 1045, pass: 1259, dribble: 1255, defense: 1445, physical: 1343, speed: 802 },
    detailStats: {
      shoot: { finishing: 326, power: 371, composure: 348 },
      pass: { shortPass: 426, longPass: 432, accuracy: 401 },
      dribble: { breakout: 401, keeping: 397, ballTouch: 457 },
      defense: { tackle: 485, interception: 479, marking: 481 },
      physical: { jumping: 465, contact: 463, stamina: 415 },
      speed: { running: 424, agility: 378 }
    },
    maxEnhanced: {
      overall: 15607,
      baseStats: { shoot: 2542, pass: 2828, dribble: 2788, defense: 3050, physical: 2936, speed: 1848 },
      detailStats: {
        shoot: { finishing: 825, power: 870, composure: 847 },
        pass: { shortPass: 949, longPass: 955, accuracy: 924 },
        dribble: { breakout: 912, keeping: 908, ballTouch: 968 },
        defense: { tackle: 1020, interception: 1014, marking: 1016 },
        physical: { jumping: 1000, contact: 998, stamina: 938 },
        speed: { running: 947, agility: 901 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -1, shoot: -1, longShoot: -1,
      shortPass: 0, longPass: 0, throughPass: -1, cutIn: -1, keep: -1,
      delay: 0, rushOut: -1, feint: -1, press: 1
    },
    skill: { name: '勝機を生み出すフィード', rank: '銀', description: '発動エリア：中中・後左中右　/　発動条件：前中に居る選手へのロングパス時　/　ロングパス・キック精度UP　/　成功時に受け手のトラップ発生確率UP' },
    abilities: [
      { name: 'ホットラインを断つ動き', rank: '金', description: '発動条件：好調　/　タックル・パスカット・スタミナUP' },
      { name: 'ランニングジャンパー', rank: '銀', description: '発動条件：絶好調　/　ジャンプ・走力UP' },
      { name: 'シルクタッチ', rank: '銅', description: '発動条件：好調　/　ショートパス・ボールタッチUP' }
    ],
    avatarUrl: '/vandijk.png'
  },
  {
    id: 'p06',
    name: 'ジュード・ベリンガム',
    readingName: 'じゅーどべりんがむ',
    category: 'MF',
    mainPosition: 'AM',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'イングランド',
    policy: 'カウンター',
    playStyle: 'アタッカー',
    playStyleLevel: 'Ⅲ',
    overall: 7608,
    maxOverall: 15749,
    baseStats: { shoot: 1445, pass: 1320, dribble: 1454, defense: 1156, physical: 1247, speed: 926 },
    detailStats: {
      shoot: { finishing: 486, power: 473, composure: 486 },
      pass: { shortPass: 444, longPass: 441, accuracy: 435 },
      dribble: { breakout: 479, keeping: 490, ballTouch: 485 },
      defense: { tackle: 398, interception: 383, marking: 375 },
      physical: { jumping: 396, contact: 413, stamina: 438 },
      speed: { running: 456, agility: 470 }
    },
    maxEnhanced: {
      overall: 15749,
      baseStats: { shoot: 2990, pass: 2901, dribble: 3023, defense: 2701, physical: 2816, speed: 1960 },
      detailStats: {
        shoot: { finishing: 997, power: 984, composure: 1009 },
        pass: { shortPass: 979, longPass: 964, accuracy: 958 },
        dribble: { breakout: 1002, keeping: 1013, ballTouch: 1008 },
        defense: { tackle: 921, interception: 894, marking: 886 },
        physical: { jumping: 907, contact: 936, stamina: 973 },
        speed: { running: 967, agility: 993 }
      }
    },
    playTendencies: {
      attack: 1, defense: 0, dribble: 0, shoot: 1, longShoot: 2,
      shortPass: 0, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: 'ロングキャノン', rank: '銀', description: '発動エリア：前中・中中　/　発動条件：シュート・ロングシュート時　/　決定力・キック力UP' },
    abilities: [
      { name: '砕氷船', rank: '金', description: '発動条件：好調　/　冷静さ・突破力・ボールタッチUP' },
      { name: '突破からの強撃', rank: '銀', description: '発動条件：絶好調　/　キック力・突破力UP' },
      { name: 'ゴール前の嗅覚', rank: '銅', description: '発動条件：絶好調　/　決定力・敏捷性UP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p07',
    name: '本田圭佑',
    readingName: 'ほんだけいすけ',
    category: 'MF',
    mainPosition: 'RM',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'ムービング',
    playStyle: 'サイドアタッカーRM',
    playStyleLevel: 'Ⅲ',
    overall: 7161,
    maxOverall: 15321,
    baseStats: { shoot: 1457, pass: 1182, dribble: 1448, defense: 859, physical: 1289, speed: 899 },
    detailStats: {
      shoot: { finishing: 483, power: 494, composure: 480 },
      pass: { shortPass: 398, longPass: 398, accuracy: 386 },
      dribble: { breakout: 478, keeping: 474, ballTouch: 496 },
      defense: { tackle: 261, interception: 303, marking: 295 },
      physical: { jumping: 436, contact: 466, stamina: 387 },
      speed: { running: 444, agility: 455 }
    },
    maxEnhanced: {
      overall: 15321,
      baseStats: { shoot: 3013, pass: 2751, dribble: 3041, defense: 2368, physical: 2834, speed: 1969 },
      detailStats: {
        shoot: { finishing: 1006, power: 1005, composure: 1002 },
        pass: { shortPass: 921, longPass: 921, accuracy: 909 },
        dribble: { breakout: 1013, keeping: 1009, ballTouch: 1019 },
        defense: { tackle: 772, interception: 802, marking: 794 },
        physical: { jumping: 947, contact: 977, stamina: 910 },
        speed: { running: 979, agility: 990 }
      }
    },
    playTendencies: {
      attack: 1, defense: -1, dribble: 1, shoot: 0, longShoot: 0,
      shortPass: 0, longPass: 0, throughPass: 0, cutIn: -1, keep: 0,
      delay: -1, rushOut: 2, feint: 1, press: 0
    },
    skill: { name: '魔術師の弾道', rank: '銀', description: '発動エリア：前中・中中　/　発動条件：直接FK時　/　キック精度・キック力・決定力UP' },
    abilities: [
      { name: '精巧なる重撃', rank: '金', description: '発動条件：好調　/　キック力・ショートパス・コンタクトUP' },
      { name: '冷静なボールキープ', rank: '銀', description: '発動条件：好調　/　冷静さ・キープ力UP' },
      { name: '不屈のキッカー', rank: '銅', description: '発動条件：好調　/　キック精度・スタミナUP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p08',
    name: 'リオネル・メッシ(MLS)',
    readingName: 'りおねるめっし',
    category: 'FW',
    mainPosition: 'RW',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'アルゼンチン',
    policy: 'ムービング',
    playStyle: 'ワイドストライカーRW',
    playStyleLevel: 'Ⅲ',
    overall: 7583,
    maxOverall: 15809,
    baseStats: { shoot: 1441, pass: 1436, dribble: 1415, defense: 1039, physical: 1072, speed: 887 },
    detailStats: {
      shoot: { finishing: 497, power: 450, composure: 494 },
      pass: { shortPass: 480, longPass: 478, accuracy: 478 },
      dribble: { breakout: 470, keeping: 465, ballTouch: 480 },
      defense: { tackle: 351, interception: 356, marking: 332 },
      physical: { jumping: 325, contact: 369, stamina: 378 },
      speed: { running: 438, agility: 449 }
    },
    maxEnhanced: {
      overall: 15809,
      baseStats: { shoot: 2998, pass: 3005, dribble: 3008, defense: 2548, physical: 2617, speed: 1957 },
      detailStats: {
        shoot: { finishing: 1020, power: 961, composure: 1017 },
        pass: { shortPass: 1003, longPass: 1001, accuracy: 1001 },
        dribble: { breakout: 1005, keeping: 1000, ballTouch: 1003 },
        defense: { tackle: 862, interception: 855, marking: 831 },
        physical: { jumping: 836, contact: 880, stamina: 901 },
        speed: { running: 973, agility: 984 }
      }
    },
    playTendencies: {
      attack: 2, defense: -1, dribble: 2, shoot: 2, longShoot: 1,
      shortPass: 0, longPass: -1, throughPass: 0, cutIn: 2, keep: 0,
      delay: -1, rushOut: 1, feint: 1, press: 0
    },
    skill: { name: 'アンストッパブルショット', rank: '金', description: '発動エリア：前中　/　発動条件：シュート時　/　決定力・キック力・冷静さUP' },
    abilities: [
      { name: '変幻自在のドリブラー', rank: '金', description: '発動条件：好調　/　突破力・キープ力・ボールタッチUP' },
      { name: '冷静なフィニッシュ', rank: '銀', description: '発動条件：好調　/　決定力・冷静さUP' },
      { name: '精密なパサー', rank: '銅', description: '発動条件：絶好調　/　ショートパス・キック精度UP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p09',
    name: 'ヴィニシウス・ジュニオール',
    readingName: 'ゔぃにしうすじゅにおーる',
    category: 'FW',
    mainPosition: 'LW',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'ブラジル',
    policy: 'リアクション',
    playStyle: 'サイドアタッカーLW',
    playStyleLevel: 'Ⅲ',
    overall: 7555,
    maxOverall: 15811,
    baseStats: { shoot: 1377, pass: 1251, dribble: 1445, defense: 939, physical: 1277, speed: 964 },
    detailStats: {
      shoot: { finishing: 470, power: 451, composure: 456 },
      pass: { shortPass: 423, longPass: 409, accuracy: 419 },
      dribble: { breakout: 480, keeping: 480, ballTouch: 485 },
      defense: { tackle: 329, interception: 314, marking: 296 },
      physical: { jumping: 395, contact: 438, stamina: 444 },
      speed: { running: 482, agility: 482 }
    },
    maxEnhanced: {
      overall: 15811,
      baseStats: { shoot: 2934, pass: 2820, dribble: 3038, defense: 2448, physical: 2822, speed: 2034 },
      detailStats: {
        shoot: { finishing: 993, power: 962, composure: 979 },
        pass: { shortPass: 946, longPass: 932, accuracy: 942 },
        dribble: { breakout: 1015, keeping: 1015, ballTouch: 1008 },
        defense: { tackle: 840, interception: 813, marking: 795 },
        physical: { jumping: 906, contact: 949, stamina: 967 },
        speed: { running: 1017, agility: 1017 }
      }
    },
    playTendencies: {
      attack: 1, defense: -1, dribble: 1, shoot: 0, longShoot: 0,
      shortPass: 0, longPass: 0, throughPass: 0, cutIn: -1, keep: 0,
      delay: -1, rushOut: 2, feint: 1, press: 0
    },
    skill: { name: 'カッティングエッジ', rank: '金', description: '発動エリア：前左右　/　発動条件：ドリブル中　/　突破力・キープ力UP　/　成功時にシュート発生確率UP' },
    abilities: [
      { name: 'スピード溢れる突破', rank: '金', description: '発動条件：好調　/　突破力・走力・敏捷性UP' },
      { name: 'ゴール前の落ち着き', rank: '銀', description: '発動条件：好調　/　決定力・ボールタッチUP' },
      { name: '冷静な破壊者', rank: '銅', description: '発動条件：好調　/　冷静さ・コンタクトUP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p10',
    name: 'トーマス・ミュラー',
    readingName: 'とーますみゅらー',
    category: 'MF',
    mainPosition: 'AM',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'ドイツ',
    policy: 'ポゼッション',
    playStyle: 'アタッカー',
    playStyleLevel: 'Ⅱ',
    overall: 7433,
    maxOverall: 15558,
    baseStats: { shoot: 1439, pass: 1395, dribble: 1378, defense: 1036, physical: 1287, speed: 915 },
    detailStats: {
      shoot: { finishing: 503, power: 435, composure: 501 },
      pass: { shortPass: 459, longPass: 472, accuracy: 464 },
      dribble: { breakout: 430, keeping: 450, ballTouch: 498 },
      defense: { tackle: 341, interception: 358, marking: 337 },
      physical: { jumping: 435, contact: 396, stamina: 456 },
      speed: { running: 443, agility: 472 }
    },
    maxEnhanced: {
      overall: 15558,
      baseStats: { shoot: 2984, pass: 2976, dribble: 2947, defense: 2581, physical: 2856, speed: 1949 },
      detailStats: {
        shoot: { finishing: 1014, power: 946, composure: 1024 },
        pass: { shortPass: 994, longPass: 995, accuracy: 987 },
        dribble: { breakout: 994, longPass: 995, accuracy: 987 },
        dribble: { breakout: 953, keeping: 973, ballTouch: 1021 },
        defense: { tackle: 864, interception: 869, marking: 848 },
        physical: { jumping: 946, contact: 919, stamina: 991 },
        speed: { running: 954, agility: 995 }
      }
    },
    playTendencies: {
      attack: 0, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 1, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '仕上げのスパイス', rank: '銀', description: '発動エリア：前中・中中　/　発動条件：前中・中中に居る選手へのショートパス時　/　ショートパス・キック精度UP　/　ダイレクトパス成功時に受け手のシュート発生確率UP' },
    abilities: [
      { name: '流動の一撃', rank: '金', description: '発動条件：途中出場　/　決定力・冷静さ・ボールタッチUP' },
      { name: '機敏なロングパサー', rank: '銀', description: '発動条件：好調　/　ロングパス・敏捷性UP' },
      { name: '跳躍のパサー', rank: '銅', description: '発動条件：好調　/　ショートパス・ジャンプUP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p11',
    name: 'ウスマン・デンベレ',
    readingName: 'うすまんでんべれ',
    category: 'FW',
    mainPosition: 'CF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'フランス',
    policy: 'ポゼッション',
    playStyle: 'ストライカー',
    playStyleLevel: 'Ⅲ',
    overall: 7436,
    maxOverall: 15703,
    baseStats: { shoot: 1441, pass: 1225, dribble: 1457, defense: 762, physical: 1257, speed: 982 },
    detailStats: {
      shoot: { finishing: 486, power: 465, composure: 490 },
      pass: { shortPass: 409, longPass: 409, accuracy: 407 },
      dribble: { breakout: 492, keeping: 492, ballTouch: 473 },
      defense: { tackle: 234, interception: 253, marking: 275 },
      physical: { jumping: 399, contact: 414, stamina: 444 },
      speed: { running: 492, agility: 490 }
    },
    maxEnhanced: {
      overall: 15703,
      baseStats: { shoot: 3046, pass: 2758, dribble: 3038, defense: 2259, physical: 2838, speed: 2028 },
      detailStats: {
        shoot: { finishing: 1021, power: 1000, composure: 1025 },
        pass: { shortPass: 920, longPass: 920, accuracy: 918 },
        dribble: { breakout: 1015, keeping: 1015, ballTouch: 1008 },
        defense: { tackle: 733, interception: 752, marking: 774 },
        physical: { jumping: 908, contact: 923, stamina: 953 },
        speed: { running: 1018, agility: 1010 }
      }
    },
    playTendencies: {
      attack: 1, defense: -1, dribble: 0, shoot: 1, longShoot: 0,
      shortPass: 0, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: -1, rushOut: 0, feint: 0, press: -1
    },
    skill: { name: '変速ギア', rank: '銀', description: '発動エリア：前中・中中　/　発動条件：ドリブル時　/　突破力・キープ力UP' },
    abilities: [
      { name: '流氷の一撃', rank: '金', description: '発動条件：好調　/　決定力・冷静さ・突破力UP' },
      { name: 'ムービングターゲット', rank: '銀', description: '発動条件：絶好調　/　キープ力・走力UP' },
      { name: '俊敏なタッチ', rank: '銅', description: '発動条件：絶好調　/　ボールタッチ・敏捷性UP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p12',
    name: 'マルコ・ロイス',
    readingName: 'まるころいす',
    category: 'MF',
    mainPosition: 'AM',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'ドイツ',
    policy: 'リアクション',
    playStyle: 'アタッカー',
    playStyleLevel: 'Ⅱ',
    overall: 7024,
    maxOverall: 15496,
    baseStats: { shoot: 1365, pass: 1359, dribble: 1406, defense: 1106, physical: 1187, speed: 945 },
    detailStats: {
      shoot: { finishing: 471, power: 422, composure: 472 },
      pass: { shortPass: 445, longPass: 455, accuracy: 459 },
      dribble: { breakout: 469, keeping: 455, ballTouch: 482 },
      defense: { tackle: 358, interception: 372, marking: 376 },
      physical: { jumping: 371, contact: 397, stamina: 419 },
      speed: { running: 483, agility: 462 }
    },
    maxEnhanced: {
      overall: 15496,
      baseStats: { shoot: 2910, pass: 2940, dribble: 2975, defense: 2651, physical: 2756, speed: 1979 },
      detailStats: {
        shoot: { finishing: 982, power: 933, composure: 995 },
        pass: { shortPass: 980, longPass: 978, accuracy: 982 },
        dribble: { breakout: 992, keeping: 978, ballTouch: 1005 },
        defense: { tackle: 881, interception: 883, marking: 887 },
        physical: { jumping: 882, contact: 920, stamina: 954 },
        speed: { running: 994, agility: 985 }
      }
    },
    playTendencies: {
      attack: 0, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 1, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: 'ルミナストラップ', rank: '銀', description: '発動エリア：前中・中中　/　発動条件：トラップ時　/　ボールタッチ・キープ力UP　/　成功時に自身のシュート発生確率UP' },
    abilities: [
      { name: '冷静なボールタッチ', rank: '銀', description: '発動条件：絶好調　/　冷静さ・ボールタッチUP' },
      { name: '俊敏なドリブラー', rank: '銀', description: '発動条件：好調　/　突破力・敏捷性UP' },
      { name: '裏への飛び出し', rank: '銅', description: '発動条件：途中出場　/　決定力・走力UP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p13',
    name: 'ヨシュコ・グヴァルディオル',
    readingName: 'よしゅこぐゔぁるでぃおる',
    category: 'DF',
    mainPosition: 'CB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'クロアチア',
    policy: 'カウンター',
    playStyle: '組立CB',
    playStyleLevel: 'Ⅱ',
    overall: 7008,
    maxOverall: 15770,
    baseStats: { shoot: 1035, pass: 1323, dribble: 1172, defense: 1428, physical: 1353, speed: 871 },
    detailStats: {
      shoot: { finishing: 311, power: 365, composure: 359 },
      pass: { shortPass: 459, longPass: 453, accuracy: 411 },
      dribble: { breakout: 382, keeping: 387, ballTouch: 403 },
      defense: { tackle: 470, interception: 481, marking: 477 },
      physical: { jumping: 428, contact: 479, stamina: 446 },
      speed: { running: 445, agility: 426 }
    },
    maxEnhanced: {
      overall: 15770,
      baseStats: { shoot: 2532, pass: 2892, dribble: 2705, defense: 3033, physical: 2946, speed: 1917 },
      detailStats: {
        shoot: { finishing: 810, power: 864, composure: 858 },
        pass: { shortPass: 982, longPass: 976, accuracy: 934 },
        dribble: { breakout: 893, keeping: 898, ballTouch: 914 },
        defense: { tackle: 1005, interception: 1016, marking: 1012 },
        physical: { jumping: 963, contact: 1014, stamina: 969 },
        speed: { running: 968, agility: 949 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -1, shoot: -1, longShoot: -1,
      shortPass: 0, longPass: 0, throughPass: -1, cutIn: -1, keep: -1,
      delay: 0, rushOut: -1, feint: -1, press: 1
    },
    skill: { name: '遮断のアクション', rank: '銀', description: '発動エリア：中左中右・後左中右　/　発動条件：パスカット時　/　パスカットUP　/　成功時に自身のショートパス発生確率UP' },
    abilities: [
      { name: 'パワークラッシャー', rank: '金', description: '発動条件：好調　/　パスカット・マーク・コンタクトUP' },
      { name: 'ピッチの掃除屋', rank: '銀', description: '発動条件：好調　/　タックル・スタミナUP' },
      { name: '長短のキック', rank: '銅', description: '発動条件：好調　/　ショートパス・ロングパスUP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p14',
    name: 'モハメド・サラー',
    readingName: 'もはめどさらー',
    category: 'FW',
    mainPosition: 'RW',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'エジプト',
    policy: 'カウンター',
    playStyle: 'ドリブラーRW',
    playStyleLevel: 'Ⅱ',
    overall: 7369,
    maxOverall: 15608,
    baseStats: { shoot: 1449, pass: 1272, dribble: 1420, defense: 949, physical: 1190, speed: 922 },
    detailStats: {
      shoot: { finishing: 489, power: 471, composure: 489 },
      pass: { shortPass: 440, longPass: 413, accuracy: 419 },
      dribble: { breakout: 475, keeping: 475, ballTouch: 470 },
      defense: { tackle: 290, interception: 339, marking: 320 },
      physical: { jumping: 306, contact: 436, stamina: 448 },
      speed: { running: 447, agility: 475 }
    },
    maxEnhanced: {
      overall: 15608,
      baseStats: { shoot: 3006, pass: 2841, dribble: 3013, defense: 2458, physical: 2735, speed: 1992 },
      detailStats: {
        shoot: { finishing: 1012, power: 982, composure: 1012 },
        pass: { shortPass: 963, longPass: 936, accuracy: 942 },
        dribble: { breakout: 1010, keeping: 1010, ballTouch: 993 },
        defense: { tackle: 801, interception: 838, marking: 819 },
        physical: { jumping: 817, contact: 947, stamina: 971 },
        speed: { running: 982, agility: 1010 }
      }
    },
    playTendencies: {
      attack: 2, defense: -1, dribble: 2, shoot: 1, longShoot: 0,
      shortPass: 0, longPass: -1, throughPass: 0, cutIn: 1, keep: 1,
      delay: -1, rushOut: 1, feint: 2, press: 0
    },
    skill: { name: 'ジャックナイフ', rank: '銀', description: '発動エリア：前左右　/　発動条件：ドリブル時　/　突破力・キープ力UP　/　成功時に自身のシュート発生確率UP' },
    abilities: [
      { name: '流氷の一撃', rank: '金', description: '発動条件：好調　/　決定力・冷静さ・突破力UP' },
      { name: '俊敏なタッチ', rank: '銀', description: '発動条件：絶好調　/　ボールタッチ・敏捷性UP' },
      { name: 'ランニングキッカー', rank: '銅', description: '発動条件：絶好調　/　キック力・走力UP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p15',
    name: 'ペドロ・ポロ',
    readingName: 'ぺどろぽろ',
    category: 'MF',
    mainPosition: 'RM',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'スペイン',
    policy: 'リアクション',
    playStyle: 'サイドアタッカーRM',
    playStyleLevel: 'Ⅱ',
    overall: 7003,
    maxOverall: 15183,
    baseStats: { shoot: 1253, pass: 1285, dribble: 1411, defense: 1025, physical: 978, speed: 925 },
    detailStats: {
      shoot: { finishing: 430, power: 417, composure: 406 },
      pass: { shortPass: 437, longPass: 432, accuracy: 416 },
      dribble: { breakout: 472, keeping: 465, ballTouch: 474 },
      defense: { tackle: 352, interception: 336, marking: 337 },
      physical: { jumping: 276, contact: 341, stamina: 361 },
      speed: { running: 459, agility: 466 }
    },
    maxEnhanced: {
      overall: 15183,
      baseStats: { shoot: 2810, pass: 2854, dribble: 3004, defense: 2534, physical: 2423, speed: 1995 },
      detailStats: {
        shoot: { finishing: 953, power: 928, composure: 929 },
        pass: { shortPass: 960, longPass: 955, accuracy: 939 },
        dribble: { breakout: 1007, keeping: 1000, ballTouch: 997 },
        defense: { tackle: 863, interception: 835, marking: 836 },
        physical: { jumping: 687, contact: 852, stamina: 884 },
        speed: { running: 994, agility: 1001 }
      }
    },
    playTendencies: {
      attack: 1, defense: -1, dribble: 1, shoot: 0, longShoot: 0,
      shortPass: 0, longPass: 0, throughPass: 0, cutIn: -1, keep: 0,
      delay: -1, rushOut: 2, feint: 1, press: 0
    },
    skill: { name: 'シルキーパス', rank: '銀', description: '発動エリア：前左右・中左右　/　発動条件：AMの位置に居る選手へのショートパス・ロングパス時　/　ロングパス・キック精度・ショートパスUP　/　成功時に受け手のロングシュート発生確率UP' },
    abilities: [
      { name: '切り裂くパサー', rank: '銀', description: '発動条件：絶好調　/　ショートパス・突破力UP' },
      { name: 'アジャイルターゲット', rank: '銀', description: '発動条件：途中出場　/　キープ力・敏捷性UP' },
      { name: '柔軟なロングパサー', rank: '銅', description: '発動条件：途中出場　/　ロングパス・ボールタッチUP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p16',
    name: 'ソン・フンミン(MLS)',
    readingName: 'そんふんみん',
    category: 'FW',
    mainPosition: 'LW',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '韓国',
    policy: 'ムービング',
    playStyle: 'サイドアタッカーLW',
    playStyleLevel: 'Ⅱ',
    overall: 7422,
    maxOverall: 15658,
    baseStats: { shoot: 1427, pass: 1265, dribble: 1377, defense: 1036, physical: 1120, speed: 943 },
    detailStats: {
      shoot: { finishing: 487, power: 453, composure: 487 },
      pass: { shortPass: 409, longPass: 405, accuracy: 451 },
      dribble: { breakout: 466, keeping: 436, ballTouch: 475 },
      defense: { tackle: 318, interception: 352, marking: 366 },
      physical: { jumping: 331, contact: 381, stamina: 408 },
      speed: { running: 480, agility: 463 }
    },
    maxEnhanced: {
      overall: 15658,
      baseStats: { shoot: 2984, pass: 2834, dribble: 2970, defense: 2545, physical: 2665, speed: 2013 },
      detailStats: {
        shoot: { finishing: 1010, power: 964, composure: 1010 },
        pass: { shortPass: 932, longPass: 928, accuracy: 974 },
        dribble: { breakout: 1001, keeping: 971, ballTouch: 998 },
        defense: { tackle: 829, interception: 851, marking: 865 },
        physical: { jumping: 842, contact: 892, stamina: 931 },
        speed: { running: 1015, agility: 998 }
      }
    },
    playTendencies: {
      attack: 1, defense: -1, dribble: 1, shoot: 0, longShoot: 0,
      shortPass: 0, longPass: 0, throughPass: 0, cutIn: -1, keep: 0,
      delay: -1, rushOut: 2, feint: 1, press: 0
    },
    skill: { name: 'ジャックナイフ', rank: '銀', description: '発動エリア：前左右　/　発動条件：ドリブル時　/　突破力・キープ力UP　/　成功時に自身のシュート発生確率UP' },
    abilities: [
      { name: '高速の斬撃', rank: '金', description: '発動条件：好調　/　決定力・冷静さ・走力UP' },
      { name: 'アジャイルキッカー', rank: '銀', description: '発動条件：途中出場　/　キック力・敏捷性UP' },
      { name: '失わないドリブラー', rank: '銅', description: '発動条件：絶好調　/　突破力・キープ力UP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p17',
    name: 'アーリング・ハーランド',
    readingName: 'あーりんぐはーらんど',
    category: 'FW',
    mainPosition: 'CF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'ノルウェー',
    policy: 'ムービング',
    playStyle: 'ストライカー',
    playStyleLevel: 'Ⅲ',
    overall: 7431,
    maxOverall: 15702,
    baseStats: { shoot: 1439, pass: 1081, dribble: 1292, defense: 981, physical: 1322, speed: 938 },
    detailStats: {
      shoot: { finishing: 491, power: 488, composure: 460 },
      pass: { shortPass: 369, longPass: 347, accuracy: 365 },
      dribble: { breakout: 443, keeping: 431, ballTouch: 418 },
      defense: { tackle: 352, interception: 318, marking: 311 },
      physical: { jumping: 456, contact: 467, stamina: 399 },
      speed: { running: 490, agility: 448 }
    },
    maxEnhanced: {
      overall: 15702,
      baseStats: { shoot: 3044, pass: 2614, dribble: 2873, defense: 2478, physical: 2903, speed: 1984 },
      detailStats: {
        shoot: { finishing: 1026, power: 1023, composure: 995 },
        pass: { shortPass: 880, longPass: 858, accuracy: 876 },
        dribble: { breakout: 966, keeping: 954, ballTouch: 953 },
        defense: { tackle: 851, interception: 817, marking: 810 },
        physical: { jumping: 979, contact: 1002, stamina: 922 },
        speed: { running: 1013, agility: 971 }
      }
    },
    playTendencies: {
      attack: 1, defense: -1, dribble: 0, shoot: 1, longShoot: 0,
      shortPass: 0, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: -1, rushOut: 0, feint: 0, press: -1
    },
    skill: { name: 'コントロールショット', rank: '銀', description: '発動エリア：前中　/　発動条件：シュート時　/　決定力・キック力・冷静さUP' },
    abilities: [
      { name: 'ランニングスナイパー', rank: '金', description: '発動条件：好調　/　決定力・キック力・走力UP' },
      { name: 'ムービングスナイパー', rank: '銀', description: '発動条件：好調　/　冷静さ・敏捷性UP' },
      { name: 'ゴール前の嗅覚', rank: '銅', description: '発動条件：絶好調　/　決定力・敏捷性UP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p18',
    name: 'アントワーヌ・グリーズマン',
    readingName: 'あんとわーぬぐりーずまん',
    category: 'MF',
    mainPosition: 'AM',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'フランス',
    policy: 'リアクション',
    playStyle: 'アタッカー',
    playStyleLevel: 'Ⅲ',
    overall: 7361,
    maxOverall: 15484,
    baseStats: { shoot: 1393, pass: 1478, dribble: 1451, defense: 1054, physical: 1131, speed: 813 },
    detailStats: {
      shoot: { finishing: 487, power: 432, composure: 474 },
      pass: { shortPass: 486, longPass: 496, accuracy: 496 },
      dribble: { breakout: 472, keeping: 480, ballTouch: 499 },
      defense: { tackle: 362, interception: 357, marking: 335 },
      physical: { jumping: 408, contact: 369, stamina: 354 },
      speed: { running: 380, agility: 433 }
    },
    maxEnhanced: {
      overall: 15484,
      baseStats: { shoot: 2938, pass: 3059, dribble: 3020, defense: 2599, physical: 2700, speed: 1847 },
      detailStats: {
        shoot: { finishing: 998, power: 943, composure: 997 },
        pass: { shortPass: 1021, longPass: 1019, accuracy: 1019 },
        dribble: { breakout: 995, keeping: 1003, ballTouch: 1022 },
        defense: { tackle: 885, interception: 868, marking: 846 },
        physical: { jumping: 919, contact: 892, stamina: 889 },
        speed: { running: 891, agility: 956 }
      }
    },
    playTendencies: {
      attack: 0, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 1, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: 'キラーパス', rank: '銀', description: '発動エリア：前中・中中　/　発動条件：CFの位置に居る選手へのショートパス時　/　ショートパス・キック精度UP　/　成功時に受け手のシュート発生確率UP' },
    abilities: [
      { name: '誘いの遊戯', rank: '金', description: '発動条件：好調　/　ショートパス・キープ力・ボールタッチUP' },
      { name: 'すり抜けるロングパサー', rank: '銀', description: '発動条件：絶好調　/　ロングパス・突破力UP' },
      { name: '冷静なフィニッシュ', rank: '銅', description: '発動条件：絶好調　/　決定力・冷静さUP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p19',
    name: 'ロベルト・レヴァンドフスキ',
    readingName: 'ろべるとれゔぁんどふすき',
    category: 'FW',
    mainPosition: 'CF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'ポーランド',
    policy: 'カウンター',
    playStyle: 'ストライカー',
    playStyleLevel: 'Ⅲ',
    overall: 7463,
    maxOverall: 15748,
    baseStats: { shoot: 1458, pass: 1203, dribble: 1307, defense: 912, physical: 1349, speed: 814 },
    detailStats: {
      shoot: { finishing: 485, power: 482, composure: 491 },
      pass: { shortPass: 416, longPass: 363, accuracy: 424 },
      dribble: { breakout: 420, keeping: 436, ballTouch: 451 },
      defense: { tackle: 311, interception: 288, marking: 313 },
      physical: { jumping: 441, contact: 458, stamina: 450 },
      speed: { running: 404, agility: 410 }
    },
    maxEnhanced: {
      overall: 15748,
      baseStats: { shoot: 3063, pass: 2736, dribble: 2888, defense: 2409, physical: 2930, speed: 1860 },
      detailStats: {
        shoot: { finishing: 1020, power: 1017, composure: 1026 },
        pass: { shortPass: 927, longPass: 874, accuracy: 935 },
        dribble: { breakout: 943, keeping: 959, ballTouch: 986 },
        defense: { tackle: 810, interception: 787, marking: 812 },
        physical: { jumping: 964, contact: 993, stamina: 973 },
        speed: { running: 927, agility: 933 }
      }
    },
    playTendencies: {
      attack: 1, defense: -1, dribble: 0, shoot: 1, longShoot: 0,
      shortPass: 0, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: -1, rushOut: 0, feint: 0, press: -1
    },
    skill: { name: 'コントロールショット', rank: '銀', description: '発動エリア：前中　/　発動条件：シュート時　/　決定力・キック力・冷静さUP' },
    abilities: [
      { name: '強靭なゴールマシン', rank: '金', description: '発動条件：好調　/　キック力・冷静さ・コンタクトUP' },
      { name: '力強いフィニッシュ', rank: '銀', description: '発動条件：好調　/　決定力・コンタクトUP' },
      { name: '剛柔のタッチ', rank: '銅', description: '発動条件：好調　/　ボールタッチ・コンタクトUP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p20',
    name: 'フェデリコ・バルベルデ',
    readingName: 'ふぇでりこばるべるで',
    category: 'MF',
    mainPosition: 'DM',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'ウルグアイ',
    policy: 'リアクション',
    playStyle: 'セントラルDM',
    playStyleLevel: 'Ⅲ',
    overall: 7365,
    maxOverall: 15533,
    baseStats: { shoot: 1153, pass: 1348, dribble: 1216, defense: 1404, physical: 1365, speed: 863 },
    detailStats: {
      shoot: { finishing: 353, power: 469, composure: 331 },
      pass: { shortPass: 458, longPass: 447, accuracy: 443 },
      dribble: { breakout: 403, keeping: 374, ballTouch: 439 },
      defense: { tackle: 474, interception: 473, marking: 457 },
      physical: { jumping: 400, contact: 474, stamina: 491 },
      speed: { running: 439, agility: 424 }
    },
    maxEnhanced: {
      overall: 15533,
      baseStats: { shoot: 2698, pass: 2953, dribble: 2749, defense: 2985, physical: 2934, speed: 1885 },
      detailStats: {
        shoot: { finishing: 864, power: 980, composure: 854 },
        pass: { shortPass: 993, longPass: 982, accuracy: 978 },
        dribble: { breakout: 914, keeping: 885, ballTouch: 950 },
        defense: { tackle: 1009, interception: 996, marking: 980 },
        physical: { jumping: 911, contact: 997, stamina: 1026 },
        speed: { running: 950, agility: 935 }
      }
    },
    playTendencies: {
      attack: 0, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 1, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: 'ロングキャノン', rank: '銀', description: '発動エリア：前中・中中　/　発動条件：シュート・ロングシュート時　/　決定力・キック力UP' },
    abilities: [
      { name: 'クイックスティール', rank: '金', description: '発動条件：絶好調　/　タックル・スタミナ・敏捷性UP' },
      { name: 'ボールスティーラー', rank: '銀', description: '発動条件：途中出場　/　タックル・パスカットUP' },
      { name: '絶え間ないボールタッチ', rank: '銅', description: '発動条件：途中出場　/　ボールタッチ・スタミナUP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p21',
    name: 'ウィリアム・サリバ',
    readingName: 'うぃりあむさりば',
    category: 'DF',
    mainPosition: 'CB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'フランス',
    policy: 'カウンター',
    playStyle: '組立CB',
    playStyleLevel: 'Ⅱ',
    overall: 7371,
    maxOverall: 15634,
    baseStats: { shoot: 1046, pass: 1203, dribble: 1250, defense: 1437, physical: 1405, speed: 793 },
    detailStats: {
      shoot: { finishing: 304, power: 372, composure: 370 },
      pass: { shortPass: 409, longPass: 400, accuracy: 394 },
      dribble: { breakout: 395, keeping: 401, ballTouch: 454 },
      defense: { tackle: 473, interception: 482, marking: 482 },
      physical: { jumping: 467, contact: 482, stamina: 456 },
      speed: { running: 387, agility: 406 }
    },
    maxEnhanced: {
      overall: 15634,
      baseStats: { shoot: 2543, pass: 2772, dribble: 2783, defense: 3042, physical: 2998, speed: 1839 },
      detailStats: {
        shoot: { finishing: 803, power: 871, composure: 869 },
        pass: { shortPass: 932, longPass: 923, accuracy: 917 },
        dribble: { breakout: 906, keeping: 912, ballTouch: 965 },
        defense: { tackle: 1008, interception: 1017, marking: 1017 },
        physical: { jumping: 1002, contact: 1017, stamina: 979 },
        speed: { running: 910, agility: 929 }
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
      { name: 'ストロングマーカー', rank: '銀', description: '発動条件：好調　/　マーク・コンタクトUP' },
      { name: '華麗なボール奪取', rank: '銅', description: '発動条件：絶好調　/　ボールタッチ・タックルUP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p22',
    name: '鎌田大地',
    readingName: 'かまだだいち',
    category: 'MF',
    mainPosition: 'DM',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'カウンター',
    playStyle: 'パサーDM',
    playStyleLevel: 'Ⅱ',
    overall: 7345,
    maxOverall: 15564,
    baseStats: { shoot: 1252, pass: 1447, dribble: 1478, defense: 1159, physical: 1146, speed: 890 },
    detailStats: {
      shoot: { finishing: 437, power: 393, composure: 422 },
      pass: { shortPass: 484, longPass: 484, accuracy: 479 },
      dribble: { breakout: 482, keeping: 496, ballTouch: 500 },
      defense: { tackle: 392, interception: 390, marking: 377 },
      physical: { jumping: 346, contact: 379, stamina: 421 },
      speed: { running: 437, agility: 453 }
    },
    maxEnhanced: {
      overall: 15564,
      baseStats: { shoot: 2797, pass: 3052, dribble: 3011, defense: 2740, physical: 2715, speed: 1912 },
      detailStats: {
        shoot: { finishing: 948, power: 904, composure: 945 },
        pass: { shortPass: 1019, longPass: 1019, accuracy: 1014 },
        dribble: { breakout: 993, keeping: 1007, ballTouch: 1011 },
        defense: { tackle: 927, interception: 913, marking: 900 },
        physical: { jumping: 857, contact: 902, stamina: 956 },
        speed: { running: 948, agility: 964 }
      }
    },
    playTendencies: {
      attack: 1, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 2, longPass: -1, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '3Dパス', rank: '銀', description: '発動エリア：後左中右　/　発動条件：中左右・後左右に居る選手へのショートパス時　/　ショートパス・キック精度UP　/　成功時に受け手のロングパス発生確率UP' },
    abilities: [
      { name: '変幻のパサー', rank: '金', description: '発動条件：好調　/　ショートパス・ロングパス・ボールタッチUP' },
      { name: '保持するキッカー', rank: '銀', description: '発動条件：好調　/　キック精度・キープ力UP' },
      { name: '俊敏なマーカー', rank: '銅', description: '発動条件：絶好調　/　パスカット・敏捷性UP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p23',
    name: 'フィル・フォーデン',
    readingName: 'ふぃるふぉーでん',
    category: 'MF',
    mainPosition: 'LM',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'イングランド',
    policy: 'ムービング',
    playStyle: 'サイドアタッカーLM',
    playStyleLevel: 'Ⅲ',
    overall: 7397,
    maxOverall: 15639,
    baseStats: { shoot: 1310, pass: 1415, dribble: 1442, defense: 1005, physical: 1020, speed: 936 },
    detailStats: {
      shoot: { finishing: 474, power: 389, composure: 447 },
      pass: { shortPass: 480, longPass: 467, accuracy: 468 },
      dribble: { breakout: 468, keeping: 481, ballTouch: 493 },
      defense: { tackle: 309, interception: 348, marking: 348 },
      physical: { jumping: 280, contact: 333, stamina: 407 },
      speed: { running: 455, agility: 481 }
    },
    maxEnhanced: {
      overall: 15639,
      baseStats: { shoot: 2867, pass: 2984, dribble: 3035, defense: 2514, physical: 2565, speed: 2006 },
      detailStats: {
        shoot: { finishing: 997, power: 900, composure: 970 },
        pass: { shortPass: 1003, longPass: 990, accuracy: 991 },
        dribble: { breakout: 1003, keeping: 1016, ballTouch: 1016 },
        defense: { tackle: 820, interception: 847, marking: 847 },
        physical: { jumping: 791, contact: 844, stamina: 930 },
        speed: { running: 990, agility: 1016 }
      }
    },
    playTendencies: {
      attack: 1, defense: -1, dribble: 1, shoot: 0, longShoot: 0,
      shortPass: 0, longPass: 0, throughPass: 0, cutIn: -1, keep: 0,
      delay: -1, rushOut: 2, feint: 1, press: 0
    },
    skill: { name: 'シャペウトラップ', rank: '銀', description: '発動エリア：前左右・中左右　/　発動条件：トラップ時　/　ボールタッチ・突破力UP　/　成功時に自身のドリブル発生確率UP' },
    abilities: [
      { name: '躍動する拠点', rank: '金', description: '発動条件：好調　/　キープ力・走力・敏捷性UP' },
      { name: '技巧派ドリブラー', rank: '銀', description: '発動条件：途中出場　/　突破力・ボールタッチUP' },
      { name: '柔軟なキッカー', rank: '銅', description: '発動条件：途中出場　/　キック精度・ボールタッチUP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p24',
    name: 'クヴィチャ・クヴァラツヘリア',
    readingName: 'くゔぃちゃくゔぁらつへりあ',
    category: 'FW',
    mainPosition: 'LW',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'ジョージア',
    policy: 'リアクション',
    playStyle: 'サイドアタッカーLW',
    playStyleLevel: 'Ⅲ',
    overall: 7440,
    maxOverall: 15704,
    baseStats: { shoot: 1332, pass: 1371, dribble: 1457, defense: 966, physical: 1037, speed: 935 },
    detailStats: {
      shoot: { finishing: 471, power: 413, composure: 448 },
      pass: { shortPass: 468, longPass: 461, accuracy: 442 },
      dribble: { breakout: 482, keeping: 481, ballTouch: 494 },
      defense: { tackle: 329, interception: 317, marking: 320 },
      physical: { jumping: 336, contact: 346, stamina: 355 },
      speed: { running: 452, agility: 483 }
    },
    maxEnhanced: {
      overall: 15704,
      baseStats: { shoot: 2889, pass: 2940, dribble: 3050, defense: 2475, physical: 2582, speed: 2005 },
      detailStats: {
        shoot: { finishing: 994, power: 924, composure: 971 },
        pass: { shortPass: 991, longPass: 984, accuracy: 965 },
        dribble: { breakout: 1017, keeping: 1016, ballTouch: 1017 },
        defense: { tackle: 840, interception: 816, marking: 819 },
        physical: { jumping: 847, contact: 857, stamina: 878 },
        speed: { running: 987, agility: 1018 }
      }
    },
    playTendencies: {
      attack: 2, defense: -1, dribble: 2, shoot: 2, longShoot: 1,
      shortPass: 0, longPass: -1, throughPass: 0, cutIn: 2, keep: 0,
      delay: -1, rushOut: 1, feint: 1, press: 0
    },
    skill: { name: 'ロングキャノン', rank: '銀', description: '発動エリア：前中・中中　/　発動条件：シュート・ロングシュート時　/　決定力・キック力UP' },
    abilities: [
      { name: '影をも踏ませぬドリブラー', rank: '金', description: '発動条件：好調　/　突破力・ボールタッチ・走力UP' },
      { name: '孤高(DRB)', rank: '銀', description: '発動条件：無し　/　突破力・キープ力・ボールタッチUP' },
      { name: '冷静なファイター', rank: '銅', description: '発動条件：好調　/　冷静さ・スタミナUP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p25',
    name: 'アマド・ディアロ',
    readingName: 'あまどでぃあろ',
    category: 'MF',
    mainPosition: 'RM',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'コートジボワール',
    policy: 'カウンター',
    playStyle: 'サイドアタッカーRM',
    playStyleLevel: 'Ⅱ',
    overall: 7036,
    maxOverall: 15230,
    baseStats: { shoot: 1210, pass: 1324, dribble: 1396, defense: 977, physical: 1068, speed: 928 },
    detailStats: {
      shoot: { finishing: 411, power: 379, composure: 420 },
      pass: { shortPass: 454, longPass: 442, accuracy: 428 },
      dribble: { breakout: 468, keeping: 456, ballTouch: 472 },
      defense: { tackle: 328, interception: 337, marking: 312 },
      physical: { jumping: 273, contact: 363, stamina: 432 },
      speed: { running: 449, agility: 479 }
    },
    maxEnhanced: {
      overall: 15230,
      baseStats: { shoot: 2767, pass: 2893, dribble: 2989, defense: 2486, physical: 2613, speed: 1998 },
      detailStats: {
        shoot: { finishing: 934, power: 890, composure: 943 },
        pass: { shortPass: 977, longPass: 965, accuracy: 951 },
        dribble: { breakout: 1003, keeping: 991, ballTouch: 995 },
        defense: { tackle: 839, interception: 836, marking: 811 },
        physical: { jumping: 784, contact: 874, stamina: 955 },
        speed: { running: 984, agility: 1014 }
      }
    },
    playTendencies: {
      attack: 1, defense: -1, dribble: 1, shoot: 0, longShoot: 0,
      shortPass: 0, longPass: 0, throughPass: 0, cutIn: -1, keep: 0,
      delay: -1, rushOut: 2, feint: 1, press: 0
    },
    skill: { name: 'スリップビート', rank: '銀', description: '発動エリア：前左右・中左右　/　発動条件：ドリブル時　/　突破力・キープ力UP　/　成功時に自身のショートパス発生確率UP' },
    abilities: [
      { name: '俊敏なタッチ', rank: '銀', description: '発動条件：絶好調　/　ボールタッチ・敏捷性UP' },
      { name: '失わないドリブラー', rank: '銀', description: '発動条件：絶好調　/　突破力・キープ力UP' },
      { name: '精密なパサー', rank: '銅', description: '発動条件：絶好調　/　ショートパス・キック精度UP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p26',
    name: 'ペドロ',
    readingName: 'ぺどろ',
    category: 'FW',
    mainPosition: 'RW',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'スペイン',
    policy: 'リアクション',
    playStyle: 'サイドアタッカーRW',
    playStyleLevel: 'Ⅱ',
    overall: 6784,
    maxOverall: 14979,
    baseStats: { shoot: 1335, pass: 1246, dribble: 1424, defense: 967, physical: 854, speed: 822 },
    detailStats: {
      shoot: { finishing: 478, power: 385, composure: 472 },
      pass: { shortPass: 406, longPass: 411, accuracy: 429 },
      dribble: { breakout: 469, keeping: 468, ballTouch: 487 },
      defense: { tackle: 361, interception: 313, marking: 293 },
      physical: { jumping: 254, contact: 317, stamina: 283 },
      speed: { running: 391, agility: 431 }
    },
    maxEnhanced: {
      overall: 14979,
      baseStats: { shoot: 2892, pass: 2815, dribble: 3017, defense: 2476, physical: 2399, speed: 1892 },
      detailStats: {
        shoot: { finishing: 1001, power: 896, composure: 995 },
        pass: { shortPass: 929, longPass: 934, accuracy: 952 },
        dribble: { breakout: 1004, keeping: 1003, ballTouch: 1010 },
        defense: { tackle: 872, interception: 812, marking: 792 },
        physical: { jumping: 765, contact: 828, stamina: 806 },
        speed: { running: 926, agility: 966 }
      }
    },
    playTendencies: {
      attack: 1, defense: -1, dribble: 1, shoot: 0, longShoot: 0,
      shortPass: 0, longPass: 0, throughPass: 0, cutIn: -1, keep: 0,
      delay: -1, rushOut: 2, feint: 1, press: 0
    },
    skill: { name: 'テクニカルドリブル', rank: '銅', description: '発動エリア：前左右・中左右　/　発動条件：ドリブル時　/　突破力・キープ力UP　/　成功時に自身のショートパス発生確率UP' },
    abilities: [
      { name: '俊敏なタッチ', rank: '銀', description: '発動条件：絶好調　/　ボールタッチ・敏捷性UP' },
      { name: '強引なフィニッシュ', rank: '銀', description: '発動条件：途中出場　/　決定力・突破力UP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p27',
    name: 'ウェストン・マッケニー',
    readingName: 'うぇすとんまっけにー',
    category: 'MF',
    mainPosition: 'RM',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'アメリカ合衆国',
    policy: 'ムービング',
    playStyle: 'サイドアタッカーRM',
    playStyleLevel: 'Ⅱ',
    overall: 6775,
    maxOverall: 14973,
    baseStats: { shoot: 1254, pass: 955, dribble: 1341, defense: 1074, physical: 1156, speed: 899 },
    detailStats: {
      shoot: { finishing: 421, power: 428, composure: 405 },
      pass: { shortPass: 330, longPass: 323, accuracy: 302 },
      dribble: { breakout: 440, keeping: 445, ballTouch: 456 },
      defense: { tackle: 356, interception: 363, marking: 355 },
      physical: { jumping: 371, contact: 376, stamina: 409 },
      speed: { running: 441, agility: 458 }
    },
    maxEnhanced: {
      overall: 14973,
      baseStats: { shoot: 2811, pass: 2524, dribble: 2934, defense: 2583, physical: 2701, speed: 1969 },
      detailStats: {
        shoot: { finishing: 944, power: 939, composure: 928 },
        pass: { shortPass: 853, longPass: 846, accuracy: 825 },
        dribble: { breakout: 975, keeping: 980, ballTouch: 979 },
        defense: { tackle: 867, interception: 862, marking: 854 },
        physical: { jumping: 882, contact: 887, stamina: 932 },
        speed: { running: 976, agility: 993 }
      }
    },
    playTendencies: {
      attack: 1, defense: -1, dribble: 1, shoot: 0, longShoot: 0,
      shortPass: 0, longPass: 0, throughPass: 0, cutIn: -1, keep: 0,
      delay: -1, rushOut: 2, feint: 1, press: 0
    },
    skill: { name: 'スリップビート', rank: '銀', description: '発動エリア：前左右・中左右　/　発動条件：ドリブル時　/　突破力・キープ力UP　/　成功時に自身のショートパス発生確率UP' },
    abilities: [
      { name: '高速のボールタッチ', rank: '銀', description: '発動条件：好調　/　ボールタッチ・走力UP' },
      { name: 'アジャイルターゲット', rank: '銀', description: '発動条件：途中出場　/　キープ力・敏捷性UP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p28',
    name: 'ステファン・エル・シャーラウィ',
    readingName: 'すてふぁんえるしゃーらうぃ',
    category: 'MF',
    mainPosition: 'LM',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'イタリア',
    policy: 'リアクション',
    playStyle: 'サイドアタッカーLM',
    playStyleLevel: 'Ⅱ',
    overall: 6691,
    maxOverall: 14867,
    baseStats: { shoot: 1218, pass: 1287, dribble: 1336, defense: 978, physical: 965, speed: 849 },
    detailStats: {
      shoot: { finishing: 430, power: 376, composure: 412 },
      pass: { shortPass: 430, longPass: 428, accuracy: 429 },
      dribble: { breakout: 438, keeping: 433, ballTouch: 465 },
      defense: { tackle: 320, interception: 344, marking: 314 },
      physical: { jumping: 265, contact: 306, stamina: 394 },
      speed: { running: 417, agility: 432 }
    },
    maxEnhanced: {
      overall: 14867,
      baseStats: { shoot: 2775, pass: 2856, dribble: 2929, defense: 2487, physical: 2510, speed: 1919 },
      detailStats: {
        shoot: { finishing: 953, power: 887, composure: 935 },
        pass: { shortPass: 953, longPass: 951, accuracy: 952 },
        dribble: { breakout: 973, keeping: 968, ballTouch: 988 },
        defense: { tackle: 831, interception: 843, marking: 813 },
        physical: { jumping: 776, contact: 817, stamina: 917 },
        speed: { running: 952, agility: 967 }
      }
    },
    playTendencies: {
      attack: 1, defense: -1, dribble: 1, shoot: 0, longShoot: 0,
      shortPass: 0, longPass: 0, throughPass: 0, cutIn: -1, keep: 0,
      delay: -1, rushOut: 2, feint: 1, press: 0
    },
    skill: { name: '切り裂くドリブル', rank: '銅', description: '発動エリア：前左右　/　発動条件：ドリブル時　/　突破力・キープ力UP　/　成功時に自身のシュート発生確率UP' },
    abilities: [
      { name: '懐の深いボールタッチ', rank: '銀', description: '発動条件：絶好調　/　キープ力・ボールタッチUP' },
      { name: '俊敏なドリブラー', rank: '銀', description: '発動条件：好調　/　突破力・敏捷性UP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p29',
    name: '倉田秋(歴戦の猛者)',
    readingName: 'くらたしゅう',
    category: 'MF',
    mainPosition: 'LM',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'ポゼッション',
    playStyle: 'サイドアタッカーLM',
    playStyleLevel: 'Ⅱ',
    overall: 6642,
    maxOverall: 14817,
    baseStats: { shoot: 1303, pass: 1202, dribble: 1303, defense: 914, physical: 1035, speed: 826 },
    detailStats: {
      shoot: { finishing: 433, power: 416, composure: 454 },
      pass: { shortPass: 402, longPass: 385, accuracy: 415 },
      dribble: { breakout: 435, keeping: 412, ballTouch: 456 },
      defense: { tackle: 295, interception: 303, marking: 316 },
      physical: { jumping: 329, contact: 296, stamina: 410 },
      speed: { running: 400, agility: 426 }
    },
    maxEnhanced: {
      overall: 14817,
      baseStats: { shoot: 2860, pass: 2771, dribble: 2896, defense: 2423, physical: 2580, speed: 1896 },
      detailStats: {
        shoot: { finishing: 956, power: 927, composure: 977 },
        pass: { shortPass: 925, longPass: 908, accuracy: 938 },
        dribble: { breakout: 970, keeping: 947, ballTouch: 979 },
        defense: { tackle: 806, interception: 802, marking: 815 },
        physical: { jumping: 840, contact: 807, stamina: 933 },
        speed: { running: 935, agility: 961 }
      }
    },
    playTendencies: {
      attack: 1, defense: -1, dribble: 1, shoot: 0, longShoot: 0,
      shortPass: 0, longPass: 0, throughPass: 0, cutIn: -1, keep: 0,
      delay: -1, rushOut: 2, feint: 1, press: 0
    },
    skill: { name: '確信のロングシュート', rank: '銅', description: '発動エリア：前中・中中　/　発動条件：シュート・ロングシュート時　/　決定力・キック力UP' },
    abilities: [
      { name: '冷静なボールタッチ', rank: '銀', description: '発動条件：絶好調　/　冷静さ・ボールタッチUP' },
      { name: '強引なフィニッシュ', rank: '銀', description: '発動条件：途中出場　/　決定力・突破力UP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p30',
    name: 'アシュリー・ヤング',
    readingName: 'あしゅりーやんぐ',
    category: 'MF',
    mainPosition: 'LM',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'イングランド',
    policy: 'カウンター',
    playStyle: 'サイドアタッカーLM',
    playStyleLevel: 'Ⅱ',
    overall: 6664,
    maxOverall: 14845,
    baseStats: { shoot: 1190, pass: 1194, dribble: 1348, defense: 969, physical: 1003, speed: 872 },
    detailStats: {
      shoot: { finishing: 403, power: 396, composure: 391 },
      pass: { shortPass: 406, longPass: 393, accuracy: 395 },
      dribble: { breakout: 439, keeping: 444, ballTouch: 465 },
      defense: { tackle: 313, interception: 342, marking: 314 },
      physical: { jumping: 283, contact: 387, stamina: 333 },
      speed: { running: 427, agility: 445 }
    },
    maxEnhanced: {
      overall: 14845,
      baseStats: { shoot: 2747, pass: 2763, dribble: 2941, defense: 2478, physical: 2548, speed: 1942 },
      detailStats: {
        shoot: { finishing: 926, power: 907, composure: 914 },
        pass: { shortPass: 929, longPass: 916, accuracy: 918 },
        dribble: { breakout: 974, keeping: 979, ballTouch: 988 },
        defense: { tackle: 824, interception: 841, marking: 813 },
        physical: { jumping: 794, contact: 898, stamina: 856 },
        speed: { running: 962, agility: 980 }
      }
    },
    playTendencies: {
      attack: 1, defense: -1, dribble: 1, shoot: 0, longShoot: 0,
      shortPass: 0, longPass: 0, throughPass: 0, cutIn: -1, keep: 0,
      delay: -1, rushOut: 2, feint: 1, press: 0
    },
    skill: { name: 'テクニカルドリブル', rank: '銅', description: '発動エリア：前左右・中左右　/　発動条件：ドリブル時　/　突破力・キープ力UP　/　成功時に自身のショートパス発生確率UP' },
    abilities: [
      { name: '懐の深いボールタッチ', rank: '銀', description: '発動条件：絶好調　/　キープ力・ボールタッチUP' },
      { name: 'スピードランナー', rank: '銀', description: '発動条件：好調　/　走力・敏捷性UP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p31',
    name: 'オマル・マーモウシュ',
    readingName: 'おまるまーもうしゅ',
    category: 'MF',
    mainPosition: 'AM',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'エジプト',
    policy: 'ムービング',
    playStyle: 'アタッカー',
    playStyleLevel: 'Ⅱ',
    overall: 7207,
    maxOverall: 15317,
    baseStats: { shoot: 1331, pass: 1236, dribble: 1406, defense: 1105, physical: 1166, speed: 919 },
    detailStats: {
      shoot: { finishing: 454, power: 430, composure: 447 },
      pass: { shortPass: 394, longPass: 408, accuracy: 434 },
      dribble: { breakout: 473, keeping: 471, ballTouch: 462 },
      defense: { tackle: 364, interception: 378, marking: 363 },
      physical: { jumping: 388, contact: 404, stamina: 374 },
      speed: { running: 457, agility: 462 }
    },
    maxEnhanced: {
      overall: 15317,
      baseStats: { shoot: 2876, pass: 2817, dribble: 2975, defense: 2650, physical: 2735, speed: 1953 },
      detailStats: {
        shoot: { finishing: 965, power: 941, composure: 970 },
        pass: { shortPass: 929, longPass: 931, accuracy: 957 },
        dribble: { breakout: 996, keeping: 994, ballTouch: 985 },
        defense: { tackle: 887, interception: 889, marking: 874 },
        physical: { jumping: 899, contact: 927, stamina: 909 },
        speed: { running: 968, agility: 985 }
      }
    },
    playTendencies: {
      attack: 0, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 1, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '変速ギア', rank: '銀', description: '発動エリア：前中・中中　/　発動条件：ドリブル時　/　突破力・キープ力UP' },
    abilities: [
      { name: '懐の深いボールタッチ', rank: '銀', description: '発動条件：絶好調　/　キープ力・ボールタッチUP' },
      { name: '冷静な突破', rank: '銀', description: '発動条件：絶好調　/　冷静さ・突破力UP' },
      { name: '裏への飛び出し', rank: '銅', description: '発動条件：途中出場　/　決定力・走力UP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p32',
    name: 'ジョアン・ペドロ',
    readingName: 'じょあんぺどろ',
    category: 'MF',
    mainPosition: 'AM',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'ブラジル',
    policy: 'リアクション',
    playStyle: 'アタッカー',
    playStyleLevel: 'Ⅱ',
    overall: 6881,
    maxOverall: 14973,
    baseStats: { shoot: 1305, pass: 1222, dribble: 1356, defense: 892, physical: 1196, speed: 863 },
    detailStats: {
      shoot: { finishing: 443, power: 426, composure: 436 },
      pass: { shortPass: 405, longPass: 411, accuracy: 406 },
      dribble: { breakout: 452, keeping: 452, ballTouch: 452 },
      defense: { tackle: 301, interception: 304, marking: 287 },
      physical: { jumping: 383, contact: 418, stamina: 395 },
      speed: { running: 431, agility: 432 }
    },
    maxEnhanced: {
      overall: 14973,
      baseStats: { shoot: 2850, pass: 2803, dribble: 2925, defense: 2437, physical: 2765, speed: 1897 },
      detailStats: {
        shoot: { finishing: 954, power: 937, composure: 959 },
        pass: { shortPass: 940, longPass: 934, accuracy: 929 },
        dribble: { breakout: 975, keeping: 975, ballTouch: 975 },
        defense: { tackle: 824, interception: 815, marking: 798 },
        physical: { jumping: 894, contact: 941, stamina: 930 },
        speed: { running: 942, agility: 955 }
      }
    },
    playTendencies: {
      attack: 0, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 1, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '切り裂くドリブル', rank: '銅', description: '発動エリア：前左右　/　発動条件：ドリブル時　/　突破力・キープ力UP　/　成功時に自身のシュート発生確率UP' },
    abilities: [
      { name: '技巧派ドリブラー', rank: '銀', description: '発動条件：途中出場　/　突破力・ボールタッチUP' },
      { name: '冷静なボールキープ', rank: '銀', description: '発動条件：好調　/　冷静さ・キープ力UP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p33',
    name: '南野拓実',
    readingName: 'みなみのたくみ',
    category: 'MF',
    mainPosition: 'AM',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'ムービング',
    playStyle: 'アタッカー',
    playStyleLevel: 'Ⅱ',
    overall: 6815,
    maxOverall: 14913,
    baseStats: { shoot: 1201, pass: 1238, dribble: 1347, defense: 1073, physical: 986, speed: 902 },
    detailStats: {
      shoot: { finishing: 432, power: 349, composure: 420 },
      pass: { shortPass: 405, longPass: 417, accuracy: 416 },
      dribble: { breakout: 457, keeping: 451, ballTouch: 439 },
      defense: { tackle: 329, interception: 378, marking: 366 },
      physical: { jumping: 284, contact: 305, stamina: 397 },
      speed: { running: 420, agility: 482 }
    },
    maxEnhanced: {
      overall: 14913,
      baseStats: { shoot: 2746, pass: 2819, dribble: 2916, defense: 2618, physical: 2555, speed: 1936 },
      detailStats: {
        shoot: { finishing: 943, power: 860, composure: 943 },
        pass: { shortPass: 940, longPass: 940, accuracy: 939 },
        dribble: { breakout: 980, keeping: 974, ballTouch: 962 },
        defense: { tackle: 852, interception: 889, marking: 877 },
        physical: { jumping: 795, contact: 828, stamina: 932 },
        speed: { running: 931, agility: 1005 }
      }
    },
    playTendencies: {
      attack: 0, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 1, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '狙いすましたシュート', rank: '銅', description: '発動エリア：前中　/　発動条件：シュート時　/　決定力・キック力・冷静さUP' },
    abilities: [
      { name: 'アジャイルターゲット', rank: '銀', description: '発動条件：途中出場　/　キープ力・敏捷性UP' },
      { name: '技巧派ドリブラー', rank: '銀', description: '発動条件：途中出場　/　突破力・ボールタッチUP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p34',
    name: 'ルカ・モドリッチ',
    readingName: 'るかもどりっち',
    category: 'MF',
    mainPosition: 'DM',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'クロアチア',
    policy: 'ポゼッション',
    playStyle: 'パサーDM',
    playStyleLevel: 'Ⅲ',
    overall: 7285,
    maxOverall: 15481,
    baseStats: { shoot: 1261, pass: 1459, dribble: 1514, defense: 1218, physical: 1000, speed: 876 },
    detailStats: {
      shoot: { finishing: 420, power: 396, composure: 445 },
      pass: { shortPass: 487, longPass: 486, accuracy: 486 },
      dribble: { breakout: 502, keeping: 506, ballTouch: 506 },
      defense: { tackle: 382, interception: 437, marking: 399 },
      physical: { jumping: 287, contact: 335, stamina: 378 },
      speed: { running: 419, agility: 457 }
    },
    maxEnhanced: {
      overall: 15481,
      baseStats: { shoot: 2806, pass: 3064, dribble: 3047, defense: 2799, physical: 2569, speed: 1898 },
      detailStats: {
        shoot: { finishing: 931, power: 907, composure: 968 },
        pass: { shortPass: 1022, longPass: 1021, accuracy: 1021 },
        dribble: { breakout: 1013, keeping: 1017, ballTouch: 1017 },
        defense: { tackle: 917, interception: 960, marking: 922 },
        physical: { jumping: 798, contact: 846, stamina: 925 },
        speed: { running: 925, agility: 973 }
      }
    },
    playTendencies: {
      attack: 1, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 2, longPass: -1, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '勝機を生み出すフィード', rank: '銀', description: '発動エリア：中中・後左中右　/　発動条件：前中に居る選手へのロングパス時　/　ロングパス・キック精度UP　/　成功時に受け手のトラップ発生確率UP' },
    abilities: [
      { name: '誘いの遊戯', rank: '金', description: '発動条件：好調　/　ショートパス・キープ力・ボールタッチUP' },
      { name: 'すり抜けるロングパサー', rank: '銀', description: '発動条件：絶好調　/　ロングパス・突破力UP' },
      { name: 'ムービングスナイパー', rank: '銅', description: '発動条件：途中出場　/　冷静さ・敏捷性UP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p35',
    name: 'マルティン・ウーデゴール',
    readingName: 'まるてぃんうーでごーる',
    category: 'MF',
    mainPosition: 'AM',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'ノルウェー',
    policy: 'ポゼッション',
    playStyle: 'パサーAM',
    playStyleLevel: 'Ⅱ',
    overall: 6956,
    maxOverall: 15110,
    baseStats: { shoot: 1224, pass: 1402, dribble: 1390, defense: 1089, physical: 1063, speed: 853 },
    detailStats: {
      shoot: { finishing: 417, power: 398, composure: 409 },
      pass: { shortPass: 457, longPass: 474, accuracy: 471 },
      dribble: { breakout: 459, keeping: 464, ballTouch: 467 },
      defense: { tackle: 341, interception: 383, marking: 365 },
      physical: { jumping: 319, contact: 348, stamina: 396 },
      speed: { running: 403, agility: 450 }
    },
    maxEnhanced: {
      overall: 15110,
      baseStats: { shoot: 2769, pass: 2983, dribble: 2959, defense: 2634, physical: 2632, speed: 1887 },
      detailStats: {
        shoot: { finishing: 928, power: 909, composure: 932 },
        pass: { shortPass: 992, longPass: 997, accuracy: 994 },
        dribble: { breakout: 982, keeping: 987, ballTouch: 990 },
        defense: { tackle: 864, interception: 894, marking: 876 },
        physical: { jumping: 830, contact: 871, stamina: 931 },
        speed: { running: 914, agility: 973 }
      }
    },
    playTendencies: {
      attack: 1, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 2, longPass: -1, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '敵陣を切り裂くパス', rank: '銅', description: '発動エリア：前中・中中　/　発動条件：CFの位置に居る選手へのショートパス時　/　ショートパス・キック精度UP　/　成功時に受け手のシュート発生確率UP' },
    abilities: [
      { name: '精緻なパサー', rank: '銀', description: '発動条件：絶好調　/　ショートパス・キック精度UP' },
      { name: '懐の深いロングパサー', rank: '銀', description: '発動条件：好調　/　ロングパス・キープ力UP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p36',
    name: 'ファビアン・ルイス',
    readingName: 'ふぁびあんるいす',
    category: 'MF',
    mainPosition: 'DM',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'スペイン',
    policy: 'ポゼッション',
    playStyle: 'パサーDM',
    playStyleLevel: 'Ⅱ',
    overall: 6771,
    maxOverall: 14907,
    baseStats: { shoot: 1174, pass: 1324, dribble: 1415, defense: 1134, physical: 1244, speed: 755 },
    detailStats: {
      shoot: { finishing: 408, power: 368, composure: 398 },
      pass: { shortPass: 446, longPass: 445, accuracy: 433 },
      dribble: { breakout: 452, keeping: 473, ballTouch: 490 },
      defense: { tackle: 367, interception: 388, marking: 379 },
      physical: { jumping: 418, contact: 397, stamina: 429 },
      speed: { running: 366, agility: 389 }
    },
    maxEnhanced: {
      overall: 14907,
      baseStats: { shoot: 2719, pass: 2929, dribble: 2948, defense: 2715, physical: 2813, speed: 1777 },
      detailStats: {
        shoot: { finishing: 919, power: 879, composure: 921 },
        pass: { shortPass: 981, longPass: 980, accuracy: 968 },
        dribble: { breakout: 963, keeping: 984, ballTouch: 1001 },
        defense: { tackle: 902, interception: 911, marking: 902 },
        physical: { jumping: 929, contact: 920, stamina: 964 },
        speed: { running: 877, agility: 900 }
      }
    },
    playTendencies: {
      attack: 0, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 1, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '意外性のあるミドルパス', rank: '銅', description: '発動エリア：中中・後左中右　/　発動条件：CF・AMの選手へのショートパス・ロングパス時　/　ロングパス・キック精度・ショートパスUP　/　成功時に受け手のショートパス発生確率UP' },
    abilities: [
      { name: '俊敏なタッチ', rank: '銀', description: '発動条件：絶好調　/　ボールタッチ・敏捷性UP' },
      { name: '懐の深いロングパサー', rank: '銀', description: '発動条件：好調　/　ロングパス・キープ力UP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p37',
    name: 'ファン・インボム',
    readingName: 'ふぁんいんぼむ',
    category: 'MF',
    mainPosition: 'DM',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '韓国',
    policy: 'ムービング',
    playStyle: 'パサーDM',
    playStyleLevel: 'Ⅱ',
    overall: 6673,
    maxOverall: 14843,
    baseStats: { shoot: 1086, pass: 1302, dribble: 1348, defense: 1155, physical: 1134, speed: 802 },
    detailStats: {
      shoot: { finishing: 357, power: 369, composure: 360 },
      pass: { shortPass: 446, longPass: 441, accuracy: 415 },
      dribble: { breakout: 442, keeping: 446, ballTouch: 460 },
      defense: { tackle: 346, interception: 415, marking: 394 },
      physical: { jumping: 357, contact: 355, stamina: 422 },
      speed: { running: 364, agility: 438 }
    },
    maxEnhanced: {
      overall: 14843,
      baseStats: { shoot: 2631, pass: 2907, dribble: 2881, defense: 2736, physical: 2703, speed: 1824 },
      detailStats: {
        shoot: { finishing: 868, power: 880, composure: 883 },
        pass: { shortPass: 981, longPass: 976, accuracy: 950 },
        dribble: { breakout: 953, keeping: 957, ballTouch: 971 },
        defense: { tackle: 881, interception: 938, marking: 917 },
        physical: { jumping: 868, contact: 878, stamina: 957 },
        speed: { running: 875, agility: 949 }
      }
    },
    playTendencies: {
      attack: 1, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 2, longPass: -1, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '安定したパスワーク', rank: '銅', description: '発動エリア：前左中右・中左中右　/　発動条件：AM・RW・LW・CFの選手へのショートパス時　/　ショートパス・キック精度UP　/　成功時に受け手のショートパス発生確率UP' },
    abilities: [
      { name: 'シルクタッチ', rank: '銀', description: '発動条件：好調　/　ショートパス・ボールタッチUP' },
      { name: '懐の深いロングパサー', rank: '銀', description: '発動条件：好調　/　ロングパス・キープ力UP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p38',
    name: 'ハカン・チャルハノール',
    readingName: 'はかんちゃるはのーる',
    category: 'MF',
    mainPosition: 'AM',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'トルコ',
    policy: 'ポゼッション',
    playStyle: 'セントラルAM',
    playStyleLevel: 'Ⅱ',
    overall: 7167,
    maxOverall: 15274,
    baseStats: { shoot: 1264, pass: 1469, dribble: 1295, defense: 1320, physical: 1155, speed: 782 },
    detailStats: {
      shoot: { finishing: 400, power: 448, composure: 416 },
      pass: { shortPass: 480, longPass: 492, accuracy: 497 },
      dribble: { breakout: 409, keeping: 395, ballTouch: 491 },
      defense: { tackle: 441, interception: 460, marking: 419 },
      physical: { jumping: 306, contact: 393, stamina: 456 },
      speed: { running: 378, agility: 404 }
    },
    maxEnhanced: {
      overall: 15274,
      baseStats: { shoot: 2809, pass: 3050, dribble: 2864, defense: 2865, physical: 2724, speed: 1816 },
      detailStats: {
        shoot: { finishing: 911, power: 959, composure: 939 },
        pass: { shortPass: 1015, longPass: 1015, accuracy: 1020 },
        dribble: { breakout: 932, keeping: 918, ballTouch: 1014 },
        defense: { tackle: 964, interception: 971, marking: 930 },
        physical: { jumping: 817, contact: 916, stamina: 991 },
        speed: { running: 889, agility: 927 }
      }
    },
    playTendencies: {
      attack: 1, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 2, longPass: -1, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '仕上げのスパイス', rank: '銀', description: '発動エリア：前中・中中　/　発動条件：前中・中中に居る選手へのショートパス時　/　ショートパス・キック精度UP　/　ダイレクトパス成功時に受け手のシュート発生確率UP' },
    abilities: [
      { name: '精緻なパサー', rank: '銀', description: '発動条件：絶好調　/　ショートパス・キック精度UP' },
      { name: '懐の深いロングパサー', rank: '銀', description: '発動条件：好調　/　ロングパス・キープ力UP' },
      { name: '柔と剛のタッチ', rank: '銅', description: '発動条件：好調　/　キック力・ボールタッチUP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p39',
    name: 'ニコロー・バレッラ',
    readingName: 'にころーばれっら',
    category: 'MF',
    mainPosition: 'DM',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'イタリア',
    policy: 'カウンター',
    playStyle: 'セントラルDM',
    playStyleLevel: 'Ⅲ',
    overall: 7250,
    maxOverall: 15423,
    baseStats: { shoot: 1134, pass: 1368, dribble: 1400, defense: 1328, physical: 1183, speed: 874 },
    detailStats: {
      shoot: { finishing: 383, power: 387, composure: 364 },
      pass: { shortPass: 450, longPass: 454, accuracy: 464 },
      dribble: { breakout: 456, keeping: 461, ballTouch: 483 },
      defense: { tackle: 464, interception: 447, marking: 417 },
      physical: { jumping: 274, contact: 425, stamina: 484 },
      speed: { running: 429, agility: 445 }
    },
    maxEnhanced: {
      overall: 15423,
      baseStats: { shoot: 2679, pass: 2973, dribble: 2933, defense: 2909, physical: 2752, speed: 1896 },
      detailStats: {
        shoot: { finishing: 894, power: 898, composure: 887 },
        pass: { shortPass: 985, longPass: 989, accuracy: 999 },
        dribble: { breakout: 967, keeping: 972, ballTouch: 994 },
        defense: { tackle: 999, interception: 970, marking: 940 },
        physical: { jumping: 785, contact: 948, stamina: 1019 },
        speed: { running: 940, agility: 956 }
      }
    },
    playTendencies: {
      attack: 0, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 1, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '華麗なる一閃', rank: '銀', description: '発動エリア：中中・後左中右　/　発動条件：CF・AMの選手へのショートパス・ロングパス時　/　ロングパス・キック精度・ショートパスUP　/　成功時に受け手のショートパス発生確率UP' },
    abilities: [
      { name: '創造の天秤', rank: '金', description: '発動条件：好調　/　キック精度・タックル・スタミナUP' },
      { name: '懐の深いパサー', rank: '銀', description: '発動条件：絶好調　/　ショートパス・キープ力UP' },
      { name: '冷静なボールタッチ', rank: '銅', description: '発動条件：絶好調　/　冷静さ・ボールタッチUP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p40',
    name: 'エデルソン',
    readingName: 'えでるそん',
    category: 'MF',
    mainPosition: 'DM',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'ブラジル',
    policy: 'リアクション',
    playStyle: 'セントラルDM',
    playStyleLevel: 'Ⅱ',
    overall: 7263,
    maxOverall: 15433,
    baseStats: { shoot: 1144, pass: 1286, dribble: 1306, defense: 1342, physical: 1388, speed: 811 },
    detailStats: {
      shoot: { finishing: 382, power: 404, composure: 358 },
      pass: { shortPass: 431, longPass: 419, accuracy: 436 },
      dribble: { breakout: 422, keeping: 425, ballTouch: 459 },
      defense: { tackle: 442, interception: 473, marking: 427 },
      physical: { jumping: 437, contact: 468, stamina: 483 },
      speed: { running: 405, agility: 406 }
    },
    maxEnhanced: {
      overall: 15433,
      baseStats: { shoot: 2689, pass: 2891, dribble: 2839, defense: 2923, physical: 2957, speed: 1833 },
      detailStats: {
        shoot: { finishing: 893, power: 915, composure: 881 },
        pass: { shortPass: 966, longPass: 954, accuracy: 971 },
        dribble: { breakout: 933, keeping: 936, ballTouch: 970 },
        defense: { tackle: 977, interception: 996, marking: 950 },
        physical: { jumping: 948, contact: 991, stamina: 1018 },
        speed: { running: 916, agility: 917 }
      }
    },
    playTendencies: {
      attack: 0, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 1, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '遮断のアクション', rank: '銀', description: '発動エリア：中左中右・後左中右　/　発動条件：パスカット時　/　パスカットUP　/　成功時に自身のショートパス発生確率UP' },
    abilities: [
      { name: 'ムービングウォール', rank: '銀', description: '発動条件：絶好調　/　コンタクト・スタミナUP' },
      { name: '精緻なパサー', rank: '銀', description: '発動条件：絶好調　/　ショートパス・キック精度UP' },
      { name: 'ボールスティーラー', rank: '銅', description: '発動条件：途中出場　/　タックル・パスカットUP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p41',
    name: 'オーレリアン・チュアメニ',
    readingName: 'おーれりあんちゅあめに',
    category: 'MF',
    mainPosition: 'DM',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'フランス',
    policy: 'リアクション',
    playStyle: 'セントラルDM',
    playStyleLevel: 'Ⅱ',
    overall: 7242,
    maxOverall: 15394,
    baseStats: { shoot: 1054, pass: 1204, dribble: 1280, defense: 1433, physical: 1409, speed: 865 },
    detailStats: {
      shoot: { finishing: 323, power: 397, composure: 334 },
      pass: { shortPass: 409, longPass: 398, accuracy: 397 },
      dribble: { breakout: 418, keeping: 414, ballTouch: 448 },
      defense: { tackle: 457, interception: 496, marking: 480 },
      physical: { jumping: 434, contact: 497, stamina: 478 },
      speed: { running: 440, agility: 425 }
    },
    maxEnhanced: {
      overall: 15394,
      baseStats: { shoot: 2599, pass: 2809, dribble: 2813, defense: 3014, physical: 2978, speed: 1887 },
      detailStats: {
        shoot: { finishing: 834, power: 908, composure: 857 },
        pass: { shortPass: 944, longPass: 933, accuracy: 932 },
        dribble: { breakout: 929, keeping: 925, ballTouch: 959 },
        defense: { tackle: 992, interception: 1019, marking: 1003 },
        physical: { jumping: 945, contact: 1020, stamina: 1013 },
        speed: { running: 951, agility: 936 }
      }
    },
    playTendencies: {
      attack: 0, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 1, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '逆襲', rank: '銀', description: '発動エリア：中左中右・後左中右　/　発動条件：タックル時　/　タックル・マーク・突破力UP　/　成功時に自身のドリブル発生確率UP' },
    abilities: [
      { name: 'ストロングマーカー', rank: '銀', description: '発動条件：好調　/　マーク・コンタクトUP' },
      { name: 'ピッチの分断者', rank: '銀', description: '発動条件：絶好調　/　パスカット・スタミナUP' },
      { name: '高速のボールタッチ', rank: '銅', description: '発動条件：好調　/　ボールタッチ・走力UP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p42',
    name: 'ロドリゴ・ベンタンクール',
    readingName: 'ろどりごべんたんくーる',
    category: 'MF',
    mainPosition: 'AM',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'ウルグアイ',
    policy: 'カウンター',
    playStyle: 'セントラルAM',
    playStyleLevel: 'Ⅱ',
    overall: 7089,
    maxOverall: 15203,
    baseStats: { shoot: 990, pass: 1336, dribble: 1321, defense: 1450, physical: 1282, speed: 769 },
    detailStats: {
      shoot: { finishing: 315, power: 352, composure: 323 },
      pass: { shortPass: 435, longPass: 445, accuracy: 456 },
      dribble: { breakout: 422, keeping: 433, ballTouch: 466 },
      defense: { tackle: 477, interception: 491, marking: 482 },
      physical: { jumping: 407, contact: 439, stamina: 436 },
      speed: { running: 368, agility: 401 }
    },
    maxEnhanced: {
      overall: 15203,
      baseStats: { shoot: 2535, pass: 2917, dribble: 2890, defense: 2995, physical: 2851, speed: 1803 },
      detailStats: {
        shoot: { finishing: 826, power: 863, composure: 846 },
        pass: { shortPass: 970, longPass: 968, accuracy: 979 },
        dribble: { breakout: 945, keeping: 956, ballTouch: 989 },
        defense: { tackle: 1000, interception: 1002, marking: 993 },
        physical: { jumping: 918, contact: 962, stamina: 971 },
        speed: { running: 879, agility: 924 }
      }
    },
    playTendencies: {
      attack: 1, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 2, longPass: -1, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '熟練のインターセプト', rank: '銀', description: '発動エリア：中左中右・後左中右　/　発動条件：パスカット時　/　パスカット・敏捷性UP' },
    abilities: [
      { name: 'ボールスティーラー', rank: '銀', description: '発動条件：途中出場　/　タックル・パスカットUP' },
      { name: '流麗なマーカー', rank: '銀', description: '発動条件：絶好調　/　ボールタッチ・マークUP' },
      { name: '冷静な破壊者', rank: '銅', description: '発動条件：好調　/　冷静さ・コンタクトUP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p43',
    name: 'クリスティアン・ロルダン',
    readingName: 'くりすてぃあんろるだん',
    category: 'MF',
    mainPosition: 'DM',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'アメリカ合衆国',
    policy: 'ムービング',
    playStyle: 'セントラルDM',
    playStyleLevel: 'Ⅱ',
    overall: 7087,
    maxOverall: 15253,
    baseStats: { shoot: 1113, pass: 1376, dribble: 1372, defense: 1277, physical: 1218, speed: 752 },
    detailStats: {
      shoot: { finishing: 372, power: 368, composure: 373 },
      pass: { shortPass: 450, longPass: 458, accuracy: 468 },
      dribble: { breakout: 445, keeping: 462, ballTouch: 465 },
      defense: { tackle: 405, interception: 446, marking: 426 },
      physical: { jumping: 340, contact: 415, stamina: 463 },
      speed: { running: 376, agility: 376 }
    },
    maxEnhanced: {
      overall: 15253,
      baseStats: { shoot: 2658, pass: 2981, dribble: 2905, defense: 2858, physical: 2787, speed: 1774 },
      detailStats: {
        shoot: { finishing: 883, power: 879, composure: 896 },
        pass: { shortPass: 985, longPass: 993, accuracy: 1003 },
        dribble: { breakout: 956, keeping: 973, ballTouch: 976 },
        defense: { tackle: 940, interception: 969, marking: 949 },
        physical: { jumping: 851, contact: 938, stamina: 998 },
        speed: { running: 887, agility: 887 }
      }
    },
    playTendencies: {
      attack: 1, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 2, longPass: -1, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '奪還', rank: '銀', description: '発動エリア：中左中右・後左中右　/　発動条件：タックル時　/　タックル・マーク・ショートパスUP　/　成功時に自身のショートパス発生確率UP' },
    abilities: [
      { name: '不屈のキッカー', rank: '銀', description: '発動条件：好調　/　キック精度・スタミナUP' },
      { name: '懐の深いボールタッチ', rank: '銀', description: '発動条件：絶好調　/　キープ力・ボールタッチUP' },
      { name: '長短のキック', rank: '銅', description: '発動条件：好調　/　ショートパス・ロングパスUP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p44',
    name: '中村憲剛',
    readingName: 'なかむらけんご',
    category: 'MF',
    mainPosition: 'DM',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'ポゼッション',
    playStyle: 'セントラルDM',
    playStyleLevel: 'Ⅲ',
    overall: 7024,
    maxOverall: 15169,
    baseStats: { shoot: 1095, pass: 1423, dribble: 1414, defense: 1132, physical: 1152, speed: 853 },
    detailStats: {
      shoot: { finishing: 377, power: 350, composure: 368 },
      pass: { shortPass: 467, longPass: 471, accuracy: 485 },
      dribble: { breakout: 461, keeping: 459, ballTouch: 494 },
      defense: { tackle: 340, interception: 414, marking: 378 },
      physical: { jumping: 315, contact: 370, stamina: 467 },
      speed: { running: 420, agility: 433 }
    },
    maxEnhanced: {
      overall: 15169,
      baseStats: { shoot: 2640, pass: 3028, dribble: 2947, defense: 2713, physical: 2721, speed: 1875 },
      detailStats: {
        shoot: { finishing: 888, power: 861, composure: 891 },
        pass: { shortPass: 1002, longPass: 1006, accuracy: 1020 },
        dribble: { breakout: 972, keeping: 970, ballTouch: 1005 },
        defense: { tackle: 875, interception: 937, marking: 901 },
        physical: { jumping: 826, contact: 893, stamina: 1002 },
        speed: { running: 931, agility: 944 }
      }
    },
    playTendencies: {
      attack: 0, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 1, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '絶好の楔', rank: '銀', description: '発動エリア：中左中右・後左中右　/　発動条件：AM・CFの選手へのショートパス・ロングパス時　/　ロングパス・キック精度・ショートパスUP　/　成功時に受け手のショートパス発生確率UP' },
    abilities: [
      { name: '精緻なパサー', rank: '銀', description: '発動条件：絶好調　/　ショートパス・キック精度UP' },
      { name: '柔軟なロングパサー', rank: '銀', description: '発動条件：途中出場　/　ロングパス・ボールタッチUP' },
      { name: '不屈の魂', rank: '銅', description: '発動条件：好調　/　キープ力・スタミナUP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p45',
    name: 'イスコ',
    readingName: 'いすこ',
    category: 'MF',
    mainPosition: 'AM',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'スペイン',
    policy: 'ポゼッション',
    playStyle: 'セントラルAM',
    playStyleLevel: 'Ⅱ',
    overall: 6799,
    maxOverall: 14887,
    baseStats: { shoot: 1161, pass: 1413, dribble: 1367, defense: 1094, physical: 1207, speed: 715 },
    detailStats: {
      shoot: { finishing: 379, power: 402, composure: 380 },
      pass: { shortPass: 457, longPass: 469, accuracy: 487 },
      dribble: { breakout: 449, keeping: 449, ballTouch: 469 },
      defense: { tackle: 359, interception: 412, marking: 323 },
      physical: { jumping: 334, contact: 439, stamina: 434 },
      speed: { running: 336, agility: 379 }
    },
    maxEnhanced: {
      overall: 14887,
      baseStats: { shoot: 2706, pass: 2994, dribble: 2936, defense: 2639, physical: 2776, speed: 1749 },
      detailStats: {
        shoot: { finishing: 890, power: 913, composure: 903 },
        pass: { shortPass: 992, longPass: 992, accuracy: 1010 },
        dribble: { breakout: 972, keeping: 972, ballTouch: 992 },
        defense: { tackle: 882, interception: 923, marking: 834 },
        physical: { jumping: 845, contact: 962, stamina: 969 },
        speed: { running: 847, agility: 902 }
      }
    },
    playTendencies: {
      attack: 0, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 1, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: 'ファストフィード', rank: '銅', description: '発動エリア：中中・後左中右　/　発動条件：CFの位置に居る選手へのロングパス時　/　ロングパス・キック精度UP　/　成功時に受け手のトラップ発生確率UP' },
    abilities: [
      { name: '精緻なパサー', rank: '銀', description: '発動条件：絶好調　/　ショートパス・キック精度UP' },
      { name: 'すり抜けるロングパサー', rank: '銀', description: '発動条件：絶好調　/　ロングパス・突破力UP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p46',
    name: 'ショーン・ロングスタッフ',
    readingName: 'しょーんろんぐすたっふ',
    category: 'MF',
    mainPosition: 'DM',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'イングランド',
    policy: 'ムービング',
    playStyle: 'セントラルDM',
    playStyleLevel: 'Ⅱ',
    overall: 6654,
    maxOverall: 14786,
    baseStats: { shoot: 1135, pass: 1122, dribble: 1266, defense: 1272, physical: 1277, speed: 712 },
    detailStats: {
      shoot: { finishing: 379, power: 388, composure: 368 },
      pass: { shortPass: 371, longPass: 371, accuracy: 380 },
      dribble: { breakout: 407, keeping: 423, ballTouch: 436 },
      defense: { tackle: 429, interception: 433, marking: 410 },
      physical: { jumping: 387, contact: 415, stamina: 475 },
      speed: { running: 355, agility: 357 }
    },
    maxEnhanced: {
      overall: 14786,
      baseStats: { shoot: 2680, pass: 2727, dribble: 2799, defense: 2853, physical: 2846, speed: 1734 },
      detailStats: {
        shoot: { finishing: 890, power: 899, composure: 891 },
        pass: { shortPass: 906, longPass: 906, accuracy: 915 },
        dribble: { breakout: 918, keeping: 934, ballTouch: 947 },
        defense: { tackle: 964, interception: 956, marking: 933 },
        physical: { jumping: 898, contact: 938, stamina: 1010 },
        speed: { running: 866, agility: 868 }
      }
    },
    playTendencies: {
      attack: 0, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 1, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '反撃のパスカット', rank: '銅', description: '発動エリア：中左中右・後左中右　/　発動条件：パスカット時　/　パスカット・ロングパスUP　/　成功時に自身のロングパス発生確率UP' },
    abilities: [
      { name: '無限のアジリティ', rank: '銀', description: '発動条件：好調　/　スタミナ・敏捷性UP' },
      { name: '華麗なボール奪取', rank: '銀', description: '発動条件：途中出場　/　ボールタッチ・タックルUP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p47',
    name: '東慶悟',
    readingName: 'ひがしけいご',
    category: 'MF',
    mainPosition: 'DM',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'リアクション',
    playStyle: 'セントラルDM',
    playStyleLevel: 'Ⅱ',
    overall: 6772,
    maxOverall: 14943,
    baseStats: { shoot: 1139, pass: 1217, dribble: 1298, defense: 1165, physical: 1234, speed: 723 },
    detailStats: {
      shoot: { finishing: 364, power: 399, composure: 376 },
      pass: { shortPass: 405, longPass: 403, accuracy: 409 },
      dribble: { breakout: 413, keeping: 427, ballTouch: 458 },
      defense: { tackle: 366, interception: 417, marking: 382 },
      physical: { jumping: 378, contact: 425, stamina: 431 },
      speed: { running: 325, agility: 398 }
    },
    maxEnhanced: {
      overall: 14943,
      baseStats: { shoot: 2684, pass: 2822, dribble: 2831, defense: 2746, physical: 2803, speed: 1745 },
      detailStats: {
        shoot: { finishing: 875, power: 910, composure: 899 },
        pass: { shortPass: 940, longPass: 938, accuracy: 944 },
        dribble: { breakout: 924, keeping: 938, ballTouch: 969 },
        defense: { tackle: 901, interception: 940, marking: 905 },
        physical: { jumping: 889, contact: 948, stamina: 966 },
        speed: { running: 836, agility: 909 }
      }
    },
    playTendencies: {
      attack: 0, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 1, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '安定したパスワーク', rank: '銅', description: '発動エリア：前左中右・中左中右　/　発動条件：AM・RW・LW・CFの選手へのショートパス時　/　ショートパス・キック精度UP　/　成功時に受け手のショートパス発生確率UP' },
    abilities: [
      { name: '剛柔のタッチ', rank: '銀', description: '発動条件：好調　/　ボールタッチ・コンタクトUP' },
      { name: '不屈のキッカー', rank: '銀', description: '発動条件：好調　/　キック精度・スタミナUP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p48',
    name: 'スコット・マクトミネイ',
    readingName: 'すこっとまくとみねい',
    category: 'MF',
    mainPosition: 'DM',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'スコットランド',
    policy: 'ムービング',
    playStyle: 'ハードマーカー',
    playStyleLevel: 'Ⅲ',
    overall: 7348,
    maxOverall: 15563,
    baseStats: { shoot: 1290, pass: 1142, dribble: 1231, defense: 1333, physical: 1473, speed: 821 },
    detailStats: {
      shoot: { finishing: 423, power: 440, composure: 427 },
      pass: { shortPass: 403, longPass: 387, accuracy: 352 },
      dribble: { breakout: 394, keeping: 410, ballTouch: 427 },
      defense: { tackle: 452, interception: 446, marking: 435 },
      physical: { jumping: 501, contact: 492, stamina: 480 },
      speed: { running: 397, agility: 424 }
    },
    maxEnhanced: {
      overall: 15563,
      baseStats: { shoot: 2835, pass: 2747, dribble: 2764, defense: 2914, physical: 3042, speed: 1843 },
      detailStats: {
        shoot: { finishing: 934, power: 951, composure: 950 },
        pass: { shortPass: 938, longPass: 922, accuracy: 887 },
        dribble: { breakout: 905, keeping: 921, ballTouch: 938 },
        defense: { tackle: 987, interception: 969, marking: 958 },
        physical: { jumping: 1012, contact: 1015, stamina: 1015 },
        speed: { running: 908, agility: 935 }
      }
    },
    playTendencies: {
      attack: 0, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 1, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '迎撃のインターセプト', rank: '銀', description: '発動エリア：中左中右・後左中右　/　発動条件：パスカット時　/　パスカット・ロングパスUP　/　成功時に自身のロングパス発生確率UP' },
    abilities: [
      { name: '肉弾戦術', rank: '金', description: '発動条件：好調　/　キック力・コンタクト・スタミナUP' },
      { name: 'エアバトラー', rank: '銀', description: '発動条件：絶好調　/　タックル・ジャンプUP' },
      { name: 'インターセプター', rank: '銅', description: '発動条件：絶好調　/　パスカット・マークUP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p49',
    name: 'エドゥアルド・カマヴィンガ',
    readingName: 'えどぅあるどかまゔぃんが',
    category: 'MF',
    mainPosition: 'DM',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'フランス',
    policy: 'カウンター',
    playStyle: 'ハードマーカー',
    playStyleLevel: 'Ⅱ',
    overall: 7163,
    maxOverall: 15353,
    baseStats: { shoot: 1036, pass: 1234, dribble: 1330, defense: 1381, physical: 1320, speed: 946 },
    detailStats: {
      shoot: { finishing: 333, power: 371, composure: 332 },
      pass: { shortPass: 419, longPass: 417, accuracy: 398 },
      dribble: { breakout: 439, keeping: 435, ballTouch: 456 },
      defense: { tackle: 470, interception: 459, marking: 452 },
      physical: { jumping: 412, contact: 443, stamina: 465 },
      speed: { running: 477, agility: 469 }
    },
    maxEnhanced: {
      overall: 15353,
      baseStats: { shoot: 2581, pass: 2839, dribble: 2863, defense: 2962, physical: 2889, speed: 1968 },
      detailStats: {
        shoot: { finishing: 844, power: 882, composure: 855 },
        pass: { shortPass: 954, longPass: 952, accuracy: 933 },
        dribble: { breakout: 950, keeping: 946, ballTouch: 967 },
        defense: { tackle: 1005, interception: 982, marking: 975 },
        physical: { jumping: 923, contact: 966, stamina: 1000 },
        speed: { running: 988, agility: 980 }
      }
    },
    playTendencies: {
      attack: 0, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 1, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: 'チェーンカッター', rank: '銀', description: '発動エリア：中左中右・後左中右　/　発動条件：タックル時　/　タックル・コンタクト・マークUP' },
    abilities: [
      { name: 'ピッチの掃除屋', rank: '銀', description: '発動条件：好調　/　タックル・スタミナUP' },
      { name: '俊敏なマーカー', rank: '銀', description: '発動条件：絶好調　/　パスカット・敏捷性UP' },
      { name: '奪取のターゲットマン', rank: '銅', description: '発動条件：好調　/　キープ力・パスカットUP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p50',
    name: '佐野海舟',
    readingName: 'さのかいしゅう',
    category: 'MF',
    mainPosition: 'DM',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'カウンター',
    playStyle: 'ハードマーカー',
    playStyleLevel: 'Ⅱ',
    overall: 7185,
    maxOverall: 15393,
    baseStats: { shoot: 1091, pass: 1192, dribble: 1302, defense: 1348, physical: 1351, speed: 881 },
    detailStats: {
      shoot: { finishing: 366, power: 364, composure: 361 },
      pass: { shortPass: 420, longPass: 406, accuracy: 366 },
      dribble: { breakout: 436, keeping: 442, ballTouch: 424 },
      defense: { tackle: 459, interception: 450, marking: 439 },
      physical: { jumping: 426, contact: 455, stamina: 470 },
      speed: { running: 447, agility: 434 }
    },
    maxEnhanced: {
      overall: 15393,
      baseStats: { shoot: 2636, pass: 2797, dribble: 2835, defense: 2929, physical: 2920, speed: 1903 },
      detailStats: {
        shoot: { finishing: 877, power: 875, composure: 884 },
        pass: { shortPass: 955, longPass: 941, accuracy: 901 },
        dribble: { breakout: 947, keeping: 953, ballTouch: 935 },
        defense: { tackle: 994, interception: 973, marking: 962 },
        physical: { jumping: 937, contact: 978, stamina: 1005 },
        speed: { running: 958, agility: 945 }
      }
    },
    playTendencies: {
      attack: 0, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 1, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '奪還', rank: '銀', description: '発動エリア：中左中右・後左中右　/　発動条件：タックル時　/　タックル・マーク・ショートパスUP　/　成功時に自身のショートパス発生確率UP' },
    abilities: [
      { name: 'ピッチの掃除屋', rank: '銀', description: '発動条件：好調　/　タックル・スタミナUP' },
      { name: '瞬間の球際力', rank: '銀', description: '発動条件：好調　/　パスカット・コンタクトUP' },
      { name: 'ランニングマーカー', rank: '銅', description: '発動条件：絶好調　/　マーク・走力UP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p51',
    name: '山口蛍(2026)',
    readingName: 'やまぐちほたる',
    category: 'MF',
    mainPosition: 'DM',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'リアクション',
    playStyle: 'ハードマーカー',
    playStyleLevel: 'Ⅱ',
    overall: 6456,
    maxOverall: 14625,
    baseStats: { shoot: 1027, pass: 1082, dribble: 1240, defense: 1284, physical: 1207, speed: 776 },
    detailStats: {
      shoot: { finishing: 338, power: 353, composure: 336 },
      pass: { shortPass: 357, longPass: 357, accuracy: 368 },
      dribble: { breakout: 409, keeping: 410, ballTouch: 421 },
      defense: { tackle: 419, interception: 434, marking: 431 },
      physical: { jumping: 368, contact: 394, stamina: 445 },
      speed: { running: 382, agility: 394 }
    },
    maxEnhanced: {
      overall: 14625,
      baseStats: { shoot: 2572, pass: 2687, dribble: 2773, defense: 2865, physical: 2776, speed: 1798 },
      detailStats: {
        shoot: { finishing: 849, power: 864, composure: 859 },
        pass: { shortPass: 892, longPass: 892, accuracy: 903 },
        dribble: { breakout: 920, keeping: 921, ballTouch: 932 },
        defense: { tackle: 954, interception: 957, marking: 954 },
        physical: { jumping: 879, contact: 917, stamina: 980 },
        speed: { running: 893, agility: 905 }
      }
    },
    playTendencies: {
      attack: 0, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 1, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '冴え渡るインターセプト', rank: '銅', description: '発動エリア：中左中右・後左中右　/　発動条件：パスカット時　/　パスカット・敏捷性UP' },
    abilities: [
      { name: 'エンドレスマーカー', rank: '銀', description: '発動条件：好調　/　マーク・スタミナUP' },
      { name: '技巧派ドリブラー', rank: '銀', description: '発動条件：途中出場　/　突破力・ボールタッチUP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p52',
    name: '橋本拳人',
    readingName: 'はしもとけんと',
    category: 'MF',
    mainPosition: 'DM',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'リアクション',
    playStyle: 'ハードマーカー',
    playStyleLevel: 'Ⅱ',
    overall: 6323,
    maxOverall: 14520,
    baseStats: { shoot: 1078, pass: 1073, dribble: 1091, defense: 1238, physical: 1121, speed: 805 },
    detailStats: {
      shoot: { finishing: 348, power: 380, composure: 350 },
      pass: { shortPass: 363, longPass: 364, accuracy: 346 },
      dribble: { breakout: 353, keeping: 356, ballTouch: 382 },
      defense: { tackle: 415, interception: 407, marking: 416 },
      physical: { jumping: 384, contact: 339, stamina: 398 },
      speed: { running: 391, agility: 414 }
    },
    maxEnhanced: {
      overall: 14520,
      baseStats: { shoot: 2623, pass: 2678, dribble: 2624, defense: 2819, physical: 2690, speed: 1827 },
      detailStats: {
        shoot: { finishing: 859, power: 891, composure: 873 },
        pass: { shortPass: 898, longPass: 899, accuracy: 881 },
        dribble: { breakout: 864, keeping: 867, ballTouch: 893 },
        defense: { tackle: 950, interception: 930, marking: 939 },
        physical: { jumping: 895, contact: 862, stamina: 933 },
        speed: { running: 902, agility: 925 }
      }
    },
    playTendencies: {
      attack: 0, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 1, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '鋭角的なタックル', rank: '銅', description: '発動エリア：中左中右・後左中右　/　発動条件：タックル時　/　タックル・コンタクト・マークUP' },
    abilities: [
      { name: 'ピッチの掃除屋', rank: '銀', description: '発動条件：好調　/　タックル・スタミナUP' },
      { name: 'インターセプター', rank: '銀', description: '発動条件：好調　/　パスカット・マークUP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p53',
    name: 'ダンテ',
    readingName: 'だんて',
    category: 'DF',
    mainPosition: 'CB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'ブラジル',
    policy: 'ムービング',
    playStyle: '組立CB',
    playStyleLevel: 'Ⅱ',
    overall: 6899,
    maxOverall: 15155,
    baseStats: { shoot: 1117, pass: 1211, dribble: 1267, defense: 1402, physical: 1201, speed: 552 },
    detailStats: {
      shoot: { finishing: 358, power: 379, composure: 380 },
      pass: { shortPass: 424, longPass: 413, accuracy: 374 },
      dribble: { breakout: 409, keeping: 420, ballTouch: 438 },
      defense: { tackle: 466, interception: 469, marking: 467 },
      physical: { jumping: 438, contact: 400, stamina: 363 },
      speed: { running: 259, agility: 293 }
    },
    maxEnhanced: {
      overall: 15155,
      baseStats: { shoot: 2614, pass: 2780, dribble: 2800, defense: 3007, physical: 2794, speed: 1598 },
      detailStats: {
        shoot: { finishing: 857, power: 878, composure: 879 },
        pass: { shortPass: 947, longPass: 936, accuracy: 897 },
        dribble: { breakout: 920, keeping: 931, ballTouch: 949 },
        defense: { tackle: 1001, interception: 1004, marking: 1002 },
        physical: { jumping: 973, contact: 935, stamina: 886 },
        speed: { running: 782, agility: 816 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -1, shoot: -1, longShoot: -1,
      shortPass: 0, longPass: 0, throughPass: -1, cutIn: -1, keep: -1,
      delay: 0, rushOut: -1, feint: -1, press: 1
    },
    skill: { name: '反撃のパスカット', rank: '銅', description: '発動エリア：中左中右・後左中右　/　発動条件：パスカット時　/　パスカット・ロングパスUP　/　成功時に自身のロングパス発生確率UP' },
    abilities: [
      { name: 'インターセプター', rank: '銀', description: '発動条件：好調　/　パスカット・マークUP' },
      { name: '反撃のパサー', rank: '銀', description: '発動条件：絶好調　/　ショートパス・タックルUP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p54',
    name: '谷口彰悟',
    readingName: 'たにぐちしょうご',
    category: 'DF',
    mainPosition: 'CB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'カウンター',
    playStyle: '組立CB',
    playStyleLevel: 'Ⅱ',
    overall: 6721,
    maxOverall: 14963,
    baseStats: { shoot: 992, pass: 1148, dribble: 1146, defense: 1346, physical: 1218, speed: 766 },
    detailStats: {
      shoot: { finishing: 310, power: 345, composure: 337 },
      pass: { shortPass: 399, longPass: 404, accuracy: 345 },
      dribble: { breakout: 349, keeping: 389, ballTouch: 408 },
      defense: { tackle: 444, interception: 460, marking: 442 },
      physical: { jumping: 421, contact: 393, stamina: 404 },
      speed: { running: 363, agility: 403 }
    },
    maxEnhanced: {
      overall: 14963,
      baseStats: { shoot: 2489, pass: 2717, dribble: 2679, defense: 2951, physical: 2811, speed: 1812 },
      detailStats: {
        shoot: { finishing: 809, power: 844, composure: 836 },
        pass: { shortPass: 922, longPass: 927, accuracy: 868 },
        dribble: { breakout: 860, keeping: 900, ballTouch: 919 },
        defense: { tackle: 979, interception: 995, marking: 977 },
        physical: { jumping: 956, contact: 928, stamina: 927 },
        speed: { running: 886, agility: 926 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -1, shoot: -1, longShoot: -1,
      shortPass: 0, longPass: 0, throughPass: -1, cutIn: -1, keep: -1,
      delay: 0, rushOut: -1, feint: -1, press: 1
    },
    skill: { name: '冴え渡るインターセプト', rank: '銅', description: '発動エリア：中左中右・後左中右　/　発動条件：パスカット時　/　パスカット・敏捷性UP' },
    abilities: [
      { name: '上空の寸断者', rank: '銀', description: '発動条件：好調　/　パスカット・ジャンプUP' },
      { name: 'パワフルジャンパー', rank: '銀', description: '発動条件：好調　/　ジャンプ・コンタクトUP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p55',
    name: '森重真人',
    readingName: 'もりしげまさと',
    category: 'DF',
    mainPosition: 'CB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'リアクション',
    playStyle: '組立CB',
    playStyleLevel: 'Ⅱ',
    overall: 6724,
    maxOverall: 14971,
    baseStats: { shoot: 1034, pass: 1184, dribble: 1172, defense: 1329, physical: 1201, speed: 678 },
    detailStats: {
      shoot: { finishing: 338, power: 345, composure: 351 },
      pass: { shortPass: 404, longPass: 399, accuracy: 381 },
      dribble: { breakout: 352, keeping: 397, ballTouch: 423 },
      defense: { tackle: 438, interception: 444, marking: 447 },
      physical: { jumping: 408, contact: 419, stamina: 374 },
      speed: { running: 304, agility: 374 }
    },
    maxEnhanced: {
      overall: 14971,
      baseStats: { shoot: 2531, pass: 2753, dribble: 2705, defense: 2934, physical: 2794, speed: 1724 },
      detailStats: {
        shoot: { finishing: 837, power: 844, composure: 850 },
        pass: { shortPass: 927, longPass: 922, accuracy: 904 },
        dribble: { breakout: 863, keeping: 908, ballTouch: 934 },
        defense: { tackle: 973, interception: 979, marking: 982 },
        physical: { jumping: 943, contact: 954, stamina: 897 },
        speed: { running: 827, agility: 897 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -1, shoot: -1, longShoot: -1,
      shortPass: 0, longPass: 0, throughPass: -1, cutIn: -1, keep: -1,
      delay: 0, rushOut: -1, feint: -1, press: 1
    },
    skill: { name: '勝機を生み出すフィード', rank: '銀', description: '発動エリア：中中・後左中右　/　発動条件：前中に居る選手へのロングパス時　/　ロングパス・キック精度UP　/　成功時に受け手のトラップ発生確率UP' },
    abilities: [
      { name: 'ボールハンター', rank: '銀', description: '発動条件：絶好調　/　タックル・マークUP' },
      { name: '分断のパサー', rank: '銀', description: '発動条件：途中出場　/　ショートパス・パスカットUP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p56',
    name: '上田綺世',
    readingName: 'うえだあやせ',
    category: 'FW',
    mainPosition: 'CF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'カウンター',
    playStyle: 'ストライカー',
    playStyleLevel: 'Ⅱ',
    overall: 7362,
    maxOverall: 15640,
    baseStats: { shoot: 1414, pass: 1169, dribble: 1287, defense: 877, physical: 1362, speed: 866 },
    detailStats: {
      shoot: { finishing: 483, power: 452, composure: 479 },
      pass: { shortPass: 397, longPass: 380, accuracy: 392 },
      dribble: { breakout: 408, keeping: 439, ballTouch: 440 },
      defense: { tackle: 281, interception: 285, marking: 311 },
      physical: { jumping: 468, contact: 444, stamina: 450 },
      speed: { running: 403, agility: 463 }
    },
    maxEnhanced: {
      overall: 15640,
      baseStats: { shoot: 3019, pass: 2702, dribble: 2868, defense: 2374, physical: 2943, speed: 1912 },
      detailStats: {
        shoot: { finishing: 1018, power: 987, composure: 1014 },
        pass: { shortPass: 908, longPass: 891, accuracy: 903 },
        dribble: { breakout: 931, keeping: 962, ballTouch: 975 },
        defense: { tackle: 780, interception: 784, marking: 810 },
        physical: { jumping: 991, contact: 979, stamina: 973 },
        speed: { running: 926, agility: 986 }
      }
    },
    playTendencies: {
      attack: 1, defense: -1, dribble: 0, shoot: 1, longShoot: 0,
      shortPass: 0, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: -1, rushOut: 0, feint: 0, press: -1
    },
    skill: { name: 'コントロールショット', rank: '銀', description: '発動エリア：前中　/　発動条件：シュート時　/　決定力・キック力・冷静さUP' },
    abilities: [
      { name: '速射砲', rank: '金', description: '発動条件：好調　/　決定力・冷静さ・敏捷性UP' },
      { name: '強靭な脚力', rank: '銀', description: '発動条件：絶好調　/　キック力・ジャンプUP' },
      { name: '剛柔のタッチ', rank: '銅', description: '発動条件：好調　/　ボールタッチ・コンタクトUP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p57',
    name: '歐偉倫',
    readingName: 'おういりん',
    category: 'FW',
    mainPosition: 'CF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '香港',
    policy: 'カウンター',
    playStyle: 'ストライカー',
    playStyleLevel: 'Ⅱ',
    overall: 7025,
    maxOverall: 15265,
    baseStats: { shoot: 1361, pass: 978, dribble: 1195, defense: 1011, physical: 1309, speed: 884 },
    detailStats: {
      shoot: { finishing: 470, power: 462, composure: 429 },
      pass: { shortPass: 315, longPass: 308, accuracy: 355 },
      dribble: { breakout: 384, keeping: 442, ballTouch: 369 },
      defense: { tackle: 301, interception: 359, marking: 351 },
      physical: { jumping: 485, contact: 470, stamina: 354 },
      speed: { running: 458, agility: 426 }
    },
    maxEnhanced: {
      overall: 15265,
      baseStats: { shoot: 2966, pass: 2511, dribble: 2776, defense: 2508, physical: 2890, speed: 1930 },
      detailStats: {
        shoot: { finishing: 1005, power: 997, composure: 964 },
        pass: { shortPass: 826, longPass: 819, accuracy: 866 },
        dribble: { breakout: 907, keeping: 965, ballTouch: 904 },
        defense: { tackle: 800, interception: 858, marking: 850 },
        physical: { jumping: 1008, contact: 1005, stamina: 877 },
        speed: { running: 981, agility: 949 }
      }
    },
    playTendencies: {
      attack: 1, defense: -1, dribble: 0, shoot: 1, longShoot: 0,
      shortPass: 0, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: -1, rushOut: 0, feint: 0, press: -1
    },
    skill: { name: '魂のワンタッチ', rank: '銀', description: '発動エリア：前中　/　発動条件：シュート時　/　決定力・キック力・冷静さUP' },
    abilities: [
      { name: '力強いフィニッシュ', rank: '銀', description: '発動条件：好調　/　決定力・コンタクトUP' },
      { name: 'ランニングジャンパー', rank: '銀', description: '発動条件：絶好調　/　ジャンプ・走力UP' },
      { name: '柔と剛のタッチ', rank: '銅', description: '発動条件：好調　/　キック力・ボールタッチUP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p58',
    name: '佐藤寿人',
    readingName: 'さとうひさと',
    category: 'FW',
    mainPosition: 'CF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'ムービング',
    playStyle: 'ストライカー',
    playStyleLevel: 'Ⅱ',
    overall: 6984,
    maxOverall: 15216,
    baseStats: { shoot: 1354, pass: 1035, dribble: 1303, defense: 889, physical: 1227, speed: 891 },
    detailStats: {
      shoot: { finishing: 457, power: 429, composure: 468 },
      pass: { shortPass: 350, longPass: 327, accuracy: 358 },
      dribble: { breakout: 433, keeping: 410, ballTouch: 460 },
      defense: { tackle: 284, interception: 295, marking: 310 },
      physical: { jumping: 451, contact: 388, stamina: 388 },
      speed: { running: 426, agility: 465 }
    },
    maxEnhanced: {
      overall: 15216,
      baseStats: { shoot: 2959, pass: 2568, dribble: 2884, defense: 2386, physical: 2808, speed: 1937 },
      detailStats: {
        shoot: { finishing: 992, power: 964, composure: 1003 },
        pass: { shortPass: 861, longPass: 838, accuracy: 869 },
        dribble: { breakout: 956, keeping: 933, ballTouch: 995 },
        defense: { tackle: 783, interception: 794, marking: 809 },
        physical: { jumping: 974, contact: 923, stamina: 911 },
        speed: { running: 949, agility: 988 }
      }
    },
    playTendencies: {
      attack: 1, defense: -1, dribble: 0, shoot: 1, longShoot: 0,
      shortPass: 0, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: -1, rushOut: 0, feint: 0, press: -1
    },
    skill: { name: '魂のワンタッチ', rank: '銀', description: '発動エリア：前中　/　発動条件：シュート時　/　決定力・キック力・冷静さUP' },
    abilities: [
      { name: 'ムービングスナイパー', rank: '銀', description: '発動条件：好調　/　冷静さ・敏捷性UP' },
      { name: 'パワーヘッド', rank: '銀', description: '発動条件：途中出場　/　決定力・ジャンプUP' },
      { name: 'ムービングターゲット', rank: '銅', description: '発動条件：絶好調　/　キープ力・走力UP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p59',
    name: '小林悠',
    readingName: 'こばやしゆう',
    category: 'FW',
    mainPosition: 'CF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'ポゼッション',
    playStyle: 'ストライカー',
    playStyleLevel: 'Ⅱ',
    overall: 6662,
    maxOverall: 14896,
    baseStats: { shoot: 1318, pass: 1062, dribble: 1251, defense: 853, physical: 1160, speed: 861 },
    detailStats: {
      shoot: { finishing: 459, power: 406, composure: 453 },
      pass: { shortPass: 366, longPass: 348, accuracy: 348 },
      dribble: { breakout: 409, keeping: 423, ballTouch: 419 },
      defense: { tackle: 258, interception: 281, marking: 314 },
      physical: { jumping: 383, contact: 382, stamina: 395 },
      speed: { running: 418, agility: 443 }
    },
    maxEnhanced: {
      overall: 14896,
      baseStats: { shoot: 2923, pass: 2595, dribble: 2832, defense: 2350, physical: 2741, speed: 1907 },
      detailStats: {
        shoot: { finishing: 994, power: 941, composure: 988 },
        pass: { shortPass: 877, longPass: 859, accuracy: 859 },
        dribble: { breakout: 932, keeping: 946, ballTouch: 954 },
        defense: { tackle: 757, interception: 780, marking: 813 },
        physical: { jumping: 906, contact: 917, stamina: 918 },
        speed: { running: 941, agility: 966 }
      }
    },
    playTendencies: {
      attack: 1, defense: -1, dribble: 0, shoot: 1, longShoot: 0,
      shortPass: 0, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: -1, rushOut: 0, feint: 0, press: -1
    },
    skill: { name: 'コントロールショット', rank: '銀', description: '発動エリア：前中　/　発動条件：シュート時　/　決定力・キック力・冷静さUP' },
    abilities: [
      { name: '冷静なフィニッシュ', rank: '銀', description: '発動条件：好調　/　決定力・冷静さUP' },
      { name: '俊敏なタッチ', rank: '銀', description: '発動条件：絶好調　/　ボールタッチ・敏捷性UP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p60',
    name: 'ソン・フンミン',
    readingName: 'そんふんみん',
    category: 'FW',
    mainPosition: 'CF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '韓国',
    policy: 'ポゼッション',
    playStyle: 'ラインブレーカー',
    playStyleLevel: 'Ⅲ',
    overall: 7212,
    maxOverall: 15475,
    baseStats: { shoot: 1403, pass: 1273, dribble: 1271, defense: 937, physical: 1018, speed: 961 },
    detailStats: {
      shoot: { finishing: 478, power: 447, composure: 478 },
      pass: { shortPass: 420, longPass: 416, accuracy: 437 },
      dribble: { breakout: 430, keeping: 414, ballTouch: 427 },
      defense: { tackle: 301, interception: 330, marking: 306 },
      physical: { jumping: 298, contact: 328, stamina: 392 },
      speed: { running: 484, agility: 477 }
    },
    maxEnhanced: {
      overall: 15475,
      baseStats: { shoot: 3008, pass: 2806, dribble: 2852, defense: 2434, physical: 2599, speed: 2007 },
      detailStats: {
        shoot: { finishing: 1013, power: 982, composure: 1013 },
        pass: { shortPass: 931, longPass: 927, accuracy: 948 },
        dribble: { breakout: 953, keeping: 937, ballTouch: 962 },
        defense: { tackle: 800, interception: 829, marking: 805 },
        physical: { jumping: 821, contact: 863, stamina: 915 },
        speed: { running: 1007, agility: 1000 }
      }
    },
    playTendencies: {
      attack: 2, defense: -1, dribble: 0, shoot: 2, longShoot: 1,
      shortPass: -1, longPass: -1, throughPass: -1, cutIn: 0, keep: -1,
      delay: -1, rushOut: 2, feint: 0, press: 0
    },
    skill: { name: 'ゴールへ導くトラップ', rank: '銀', description: '発動エリア：前中・中中　/　発動条件：トラップ時　/　ボールタッチ・キープ力・コンタクトUP　/　成功時に自身のショートパス発生確率UP' },
    abilities: [
      { name: '疾走するアタッカー', rank: '金', description: '発動条件：好調　/　決定力・走力・敏捷性UP' },
      { name: '超回復', rank: '銀', description: '発動条件：常時　/　ハーフタイムのスタミナ回復量が35％UP' },
      { name: 'スピードランナー', rank: '銅', description: '発動条件：途中出場　/　走力・敏捷性UP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p61',
    name: 'ラウタロ・マルティネス',
    readingName: 'らうたろまるてぃねす',
    category: 'FW',
    mainPosition: 'CF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'アルゼンチン',
    policy: 'リアクション',
    playStyle: 'ラインブレーカー',
    playStyleLevel: 'Ⅱ',
    overall: 7170,
    maxOverall: 15403,
    baseStats: { shoot: 1396, pass: 1123, dribble: 1304, defense: 892, physical: 1272, speed: 881 },
    detailStats: {
      shoot: { finishing: 475, power: 446, composure: 475 },
      pass: { shortPass: 383, longPass: 375, accuracy: 365 },
      dribble: { breakout: 440, keeping: 426, ballTouch: 438 },
      defense: { tackle: 330, interception: 293, marking: 269 },
      physical: { jumping: 392, contact: 389, stamina: 491 },
      speed: { running: 422, agility: 459 }
    },
    maxEnhanced: {
      overall: 15403,
      baseStats: { shoot: 3001, pass: 2656, dribble: 2885, defense: 2389, physical: 2853, speed: 1927 },
      detailStats: {
        shoot: { finishing: 1010, power: 981, composure: 1010 },
        pass: { shortPass: 894, longPass: 886, accuracy: 876 },
        dribble: { breakout: 963, keeping: 949, ballTouch: 973 },
        defense: { tackle: 829, interception: 792, marking: 768 },
        physical: { jumping: 915, contact: 924, stamina: 1014 },
        speed: { running: 945, agility: 982 }
      }
    },
    playTendencies: {
      attack: 2, defense: -1, dribble: 0, shoot: 2, longShoot: 1,
      shortPass: -1, longPass: -1, throughPass: -1, cutIn: 0, keep: -1,
      delay: -1, rushOut: 2, feint: 0, press: 0
    },
    skill: { name: '魂のワンタッチ', rank: '銀', description: '発動エリア：前中　/　発動条件：シュート時　/　決定力・キック力・冷静さUP' },
    abilities: [
      { name: '冷静なファイター', rank: '銀', description: '発動条件：絶好調　/　冷静さ・スタミナUP' },
      { name: 'ゴール前の嗅覚', rank: '銀', description: '発動条件：絶好調　/　決定力・敏捷性UP' },
      { name: '精密なフィニッシュ', rank: '銅', description: '発動条件：絶好調　/　決定力・キック精度UP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p62',
    name: '柿谷曜一朗',
    readingName: 'かきたによういちろう',
    category: 'FW',
    mainPosition: 'CF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'ポゼッション',
    playStyle: 'ラインブレーカー',
    playStyleLevel: 'Ⅲ',
    overall: 6999,
    maxOverall: 15235,
    baseStats: { shoot: 1309, pass: 1188, dribble: 1358, defense: 813, physical: 1112, speed: 912 },
    detailStats: {
      shoot: { finishing: 448, power: 393, composure: 468 },
      pass: { shortPass: 407, longPass: 362, accuracy: 419 },
      dribble: { breakout: 437, keeping: 453, ballTouch: 468 },
      defense: { tackle: 305, interception: 262, marking: 246 },
      physical: { jumping: 372, contact: 347, stamina: 393 },
      speed: { running: 438, agility: 474 }
    },
    maxEnhanced: {
      overall: 15235,
      baseStats: { shoot: 2914, pass: 2721, dribble: 2939, defense: 2310, physical: 2693, speed: 1958 },
      detailStats: {
        shoot: { finishing: 983, power: 928, composure: 1003 },
        pass: { shortPass: 918, longPass: 873, accuracy: 930 },
        dribble: { breakout: 960, keeping: 976, ballTouch: 1003 },
        defense: { tackle: 804, interception: 761, marking: 745 },
        physical: { jumping: 895, contact: 882, stamina: 916 },
        speed: { running: 961, agility: 997 }
      }
    },
    playTendencies: {
      attack: 1, defense: -1, dribble: 0, shoot: 1, longShoot: 0,
      shortPass: 0, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: -1, rushOut: 0, feint: 0, press: -1
    },
    skill: { name: '変速ギア', rank: '銀', description: '発動エリア：前中・中中　/　発動条件：ドリブル時　/　突破力・キープ力UP' },
    abilities: [
      { name: '冷静なボールタッチ', rank: '銀', description: '発動条件：絶好調　/　冷静さ・ボールタッチUP' },
      { name: 'アジャイルターゲット', rank: '銀', description: '発動条件：途中出場　/　キープ力・敏捷性UP' },
      { name: '裏への飛び出し', rank: '銅', description: '発動条件：途中出場　/　決定力・走力UP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p63',
    name: 'アンヘル・コレア',
    readingName: 'あんへるこれあ',
    category: 'FW',
    mainPosition: 'CF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'アルゼンチン',
    policy: 'ポゼッション',
    playStyle: 'ラインブレーカー',
    playStyleLevel: 'Ⅱ',
    overall: 6636,
    maxOverall: 14836,
    baseStats: { shoot: 1295, pass: 1176, dribble: 1356, defense: 863, physical: 989, speed: 882 },
    detailStats: {
      shoot: { finishing: 437, power: 417, composure: 441 },
      pass: { shortPass: 389, longPass: 388, accuracy: 399 },
      dribble: { breakout: 455, keeping: 456, ballTouch: 445 },
      defense: { tackle: 295, interception: 297, marking: 271 },
      physical: { jumping: 275, contact: 353, stamina: 361 },
      speed: { running: 429, agility: 453 }
    },
    maxEnhanced: {
      overall: 14836,
      baseStats: { shoot: 2900, pass: 2709, dribble: 2937, defense: 2360, physical: 2570, speed: 1928 },
      detailStats: {
        shoot: { finishing: 972, power: 952, composure: 976 },
        pass: { shortPass: 900, longPass: 899, accuracy: 910 },
        dribble: { breakout: 978, keeping: 979, ballTouch: 980 },
        defense: { tackle: 794, interception: 796, marking: 770 },
        physical: { jumping: 798, contact: 888, stamina: 884 },
        speed: { running: 952, agility: 976 }
      }
    },
    playTendencies: {
      attack: 2, defense: -1, dribble: 0, shoot: 2, longShoot: 1,
      shortPass: -1, longPass: -1, throughPass: -1, cutIn: 0, keep: -1,
      delay: -1, rushOut: 2, feint: 0, press: 0
    },
    skill: { name: '変速ギア', rank: '銀', description: '発動エリア：前中・中中　/　発動条件：ドリブル時　/　突破力・キープ力UP' },
    abilities: [
      { name: '冷静なボールタッチ', rank: '銀', description: '発動条件：絶好調　/　冷静さ・ボールタッチUP' },
      { name: '失わないドリブラー', rank: '銀', description: '発動条件：絶好調　/　突破力・キープ力UP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p64',
    name: 'アレクサンダー・セルロート',
    readingName: 'あれくさんだーせるろーと',
    category: 'FW',
    mainPosition: 'CF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'ノルウェー',
    policy: 'カウンター',
    playStyle: 'ポストプレーヤー',
    playStyleLevel: 'Ⅱ',
    overall: 7066,
    maxOverall: 15315,
    baseStats: { shoot: 1359, pass: 1120, dribble: 1213, defense: 869, physical: 1351, speed: 837 },
    detailStats: {
      shoot: { finishing: 447, power: 457, composure: 455 },
      pass: { shortPass: 374, longPass: 376, accuracy: 370 },
      dribble: { breakout: 402, keeping: 417, ballTouch: 394 },
      defense: { tackle: 286, interception: 299, marking: 284 },
      physical: { jumping: 457, contact: 472, stamina: 422 },
      speed: { running: 437, agility: 400 }
    },
    maxEnhanced: {
      overall: 15315,
      baseStats: { shoot: 2964, pass: 2653, dribble: 2794, defense: 2366, physical: 2932, speed: 1883 },
      detailStats: {
        shoot: { finishing: 982, power: 992, composure: 990 },
        pass: { shortPass: 885, longPass: 887, accuracy: 881 },
        dribble: { breakout: 925, keeping: 940, ballTouch: 929 },
        defense: { tackle: 785, interception: 798, marking: 783 },
        physical: { jumping: 980, contact: 1007, stamina: 945 },
        speed: { running: 960, agility: 923 }
      }
    },
    playTendencies: {
      attack: 1, defense: -1, dribble: 0, shoot: 1, longShoot: 1,
      shortPass: 1, longPass: -1, throughPass: 1, cutIn: 0, keep: 2,
      delay: -1, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '点で合わせるシュート', rank: '銅', description: '発動エリア：前中　/　発動条件：シュート時　/　決定力・キック力・冷静さUP' },
    abilities: [
      { name: '力強いフィニッシュ', rank: '銀', description: '発動条件：好調　/　決定力・コンタクトUP' },
      { name: '上空のスナイパー', rank: '銀', description: '発動条件：絶好調　/　冷静さ・ジャンプUP' },
      { name: 'ランニングキッカー', rank: '銀', description: '発動条件：絶好調　/　キック力・走力UP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p65',
    name: '林陵平',
    readingName: 'はやしりょうへい',
    category: 'FW',
    mainPosition: 'CF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'リアクション',
    playStyle: 'ポストプレーヤー',
    playStyleLevel: 'Ⅱ',
    overall: 6928,
    maxOverall: 15171,
    baseStats: { shoot: 1322, pass: 1019, dribble: 1262, defense: 902, physical: 1305, speed: 839 },
    detailStats: {
      shoot: { finishing: 439, power: 450, composure: 433 },
      pass: { shortPass: 348, longPass: 322, accuracy: 349 },
      dribble: { breakout: 396, keeping: 432, ballTouch: 434 },
      defense: { tackle: 307, interception: 303, marking: 292 },
      physical: { jumping: 447, contact: 428, stamina: 430 },
      speed: { running: 414, agility: 425 }
    },
    maxEnhanced: {
      overall: 15171,
      baseStats: { shoot: 2927, pass: 2552, dribble: 2843, defense: 2399, physical: 2886, speed: 1885 },
      detailStats: {
        shoot: { finishing: 974, power: 985, composure: 968 },
        pass: { shortPass: 859, longPass: 833, accuracy: 860 },
        dribble: { breakout: 919, keeping: 955, ballTouch: 969 },
        defense: { tackle: 806, interception: 802, marking: 791 },
        physical: { jumping: 970, contact: 963, stamina: 953 },
        speed: { running: 937, agility: 948 }
      }
    },
    playTendencies: {
      attack: 1, defense: -1, dribble: 0, shoot: 1, longShoot: 0,
      shortPass: 0, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: -1, rushOut: 0, feint: 0, press: -1
    },
    skill: { name: 'ゴールへ導くトラップ', rank: '銀', description: '発動エリア：前中・中中　/　発動条件：トラップ時　/　ボールタッチ・キープ力・コンタクトUP　/　成功時に自身のショートパス発生確率UP' },
    abilities: [
      { name: '制空のボールタッチ', rank: '銀', description: '発動条件：好調　/　ボールタッチ・ジャンプUP' },
      { name: 'ゴール前の嗅覚', rank: '銀', description: '発動条件：絶好調　/　決定力・敏捷性UP' },
      { name: '狙いすました強振', rank: '銅', description: '発動条件：絶好調　/　キック力・冷静さUP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p66',
    name: 'カラム・ウィルソン',
    readingName: 'からむうぃるそん',
    category: 'FW',
    mainPosition: 'CF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'イングランド',
    policy: 'リアクション',
    playStyle: 'ポストプレーヤー',
    playStyleLevel: 'Ⅱ',
    overall: 6748,
    maxOverall: 14972,
    baseStats: { shoot: 1347, pass: 1185, dribble: 1154, defense: 840, physical: 1249, speed: 781 },
    detailStats: {
      shoot: { finishing: 445, power: 441, composure: 461 },
      pass: { shortPass: 410, longPass: 399, accuracy: 376 },
      dribble: { breakout: 386, keeping: 380, ballTouch: 388 },
      defense: { tackle: 305, interception: 284, marking: 251 },
      physical: { jumping: 405, contact: 453, stamina: 391 },
      speed: { running: 353, agility: 428 }
    },
    maxEnhanced: {
      overall: 14972,
      baseStats: { shoot: 2952, pass: 2718, dribble: 2735, defense: 2337, physical: 2830, speed: 1827 },
      detailStats: {
        shoot: { finishing: 980, power: 976, composure: 996 },
        pass: { shortPass: 921, longPass: 910, accuracy: 887 },
        dribble: { breakout: 909, keeping: 903, ballTouch: 923 },
        defense: { tackle: 804, interception: 783, marking: 750 },
        physical: { jumping: 928, contact: 988, stamina: 914 },
        speed: { running: 876, agility: 951 }
      }
    },
    playTendencies: {
      attack: 1, defense: -1, dribble: 0, shoot: 1, longShoot: 1,
      shortPass: 1, longPass: -1, throughPass: 1, cutIn: 0, keep: 2,
      delay: -1, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '狙いすましたシュート', rank: '銅', description: '発動エリア：前中　/　発動条件：シュート時　/　決定力・キック力・冷静さUP' },
    abilities: [
      { name: '冷静なフィニッシュ', rank: '銀', description: '発動条件：好調　/　決定力・冷静さUP' },
      { name: 'パワフルキッカー', rank: '銀', description: '発動条件：絶好調　/　キック力・コンタクトUP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p67',
    name: 'エデル・ミリトン',
    readingName: 'えでるみりとん',
    category: 'DF',
    mainPosition: 'CB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'ブラジル',
    policy: 'リアクション',
    playStyle: 'スプリントCB',
    playStyleLevel: 'Ⅱ',
    overall: 7274,
    maxOverall: 15538,
    baseStats: { shoot: 1028, pass: 1177, dribble: 1203, defense: 1411, physical: 1329, speed: 878 },
    detailStats: {
      shoot: { finishing: 320, power: 377, composure: 331 },
      pass: { shortPass: 401, longPass: 394, accuracy: 382 },
      dribble: { breakout: 402, keeping: 403, ballTouch: 398 },
      defense: { tackle: 471, interception: 474, marking: 466 },
      physical: { jumping: 436, contact: 461, stamina: 432 },
      speed: { running: 446, agility: 432 }
    },
    maxEnhanced: {
      overall: 15538,
      baseStats: { shoot: 2525, pass: 2746, dribble: 2736, defense: 3016, physical: 2922, speed: 1924 },
      detailStats: {
        shoot: { finishing: 819, power: 876, composure: 830 },
        pass: { shortPass: 924, longPass: 917, accuracy: 905 },
        dribble: { breakout: 913, keeping: 914, ballTouch: 909 },
        defense: { tackle: 1006, interception: 1009, marking: 1001 },
        physical: { jumping: 971, contact: 996, stamina: 955 },
        speed: { running: 969, agility: 955 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -1, shoot: -1, longShoot: -1,
      shortPass: 0, longPass: 0, throughPass: -1, cutIn: -1, keep: -1,
      delay: 0, rushOut: -1, feint: -1, press: 1
    },
    skill: { name: 'チェーンカッター', rank: '銀', description: '発動エリア：中左中右・後左中右　/　発動条件：タックル時　/　タックル・コンタクト・マークUP' },
    abilities: [
      { name: 'インターセプター', rank: '銀', description: '発動条件：好調　/　パスカット・マークUP' },
      { name: 'エアバトラー', rank: '銀', description: '発動条件：絶好調　/　タックル・ジャンプUP' },
      { name: 'マラソンマン', rank: '銅', description: '発動条件：途中出場　/　スタミナ・走力UP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p68',
    name: '伊藤洋輝',
    readingName: 'いとうひろき',
    category: 'DF',
    mainPosition: 'CB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'カウンター',
    playStyle: 'ストッパー',
    playStyleLevel: 'Ⅱ',
    overall: 7402,
    maxOverall: 15724,
    baseStats: { shoot: 953, pass: 1299, dribble: 1283, defense: 1409, physical: 1346, speed: 797 },
    detailStats: {
      shoot: { finishing: 291, power: 325, composure: 337 },
      pass: { shortPass: 450, longPass: 443, accuracy: 406 },
      dribble: { breakout: 421, keeping: 429, ballTouch: 433 },
      defense: { tackle: 458, interception: 477, marking: 474 },
      physical: { jumping: 452, contact: 452, stamina: 442 },
      speed: { running: 417, agility: 380 }
    },
    maxEnhanced: {
      overall: 15724,
      baseStats: { shoot: 2450, pass: 2868, dribble: 2816, defense: 3014, physical: 2939, speed: 1843 },
      detailStats: {
        shoot: { finishing: 790, power: 824, composure: 836 },
        pass: { shortPass: 973, longPass: 966, accuracy: 929 },
        dribble: { breakout: 932, keeping: 940, ballTouch: 944 },
        defense: { tackle: 993, interception: 1012, marking: 1009 },
        physical: { jumping: 987, contact: 987, stamina: 965 },
        speed: { running: 940, agility: 903 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -1, shoot: -1, longShoot: -1,
      shortPass: 0, longPass: 0, throughPass: -1, cutIn: -1, keep: -1,
      delay: 0, rushOut: -1, feint: -1, press: 1
    },
    skill: { name: '遮断のアクション', rank: '銀', description: '発動エリア：中左中右・後左中右　/　発動条件：パスカット時　/　パスカットUP　/　成功時に自身のショートパス発生確率UP' },
    abilities: [
      { name: 'パワフルマーカー', rank: '金', description: '発動条件：好調　/　パスカット・マーク・ジャンプUP' },
      { name: 'ハードタックラー', rank: '銀', description: '発動条件：好調　/　タックル・コンタクトUP' },
      { name: '長短のキック', rank: '銅', description: '発動条件：好調　/　ショートパス・ロングパスUP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p69',
    name: '渡辺剛',
    readingName: 'わたなべつよし',
    category: 'DF',
    mainPosition: 'CB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'カウンター',
    playStyle: 'ストッパー',
    playStyleLevel: 'Ⅱ',
    overall: 6802,
    maxOverall: 15065,
    baseStats: { shoot: 1082, pass: 1011, dribble: 1123, defense: 1331, physical: 1331, speed: 780 },
    detailStats: {
      shoot: { finishing: 343, power: 375, composure: 364 },
      pass: { shortPass: 328, longPass: 334, accuracy: 349 },
      dribble: { breakout: 368, keeping: 357, ballTouch: 398 },
      defense: { tackle: 431, interception: 444, marking: 456 },
      physical: { jumping: 453, contact: 441, stamina: 437 },
      speed: { running: 391, agility: 389 }
    },
    maxEnhanced: {
      overall: 15065,
      baseStats: { shoot: 2579, pass: 2580, dribble: 2656, defense: 2936, physical: 2924, speed: 1826 },
      detailStats: {
        shoot: { finishing: 842, power: 874, composure: 863 },
        pass: { shortPass: 851, longPass: 857, accuracy: 872 },
        dribble: { breakout: 879, keeping: 868, ballTouch: 909 },
        defense: { tackle: 966, interception: 979, marking: 991 },
        physical: { jumping: 988, contact: 976, stamina: 960 },
        speed: { running: 914, agility: 912 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -1, shoot: -1, longShoot: -1,
      shortPass: 0, longPass: 0, throughPass: -1, cutIn: -1, keep: -1,
      delay: 0, rushOut: -1, feint: -1, press: 1
    },
    skill: { name: '鋭角的なタックル', rank: '銅', description: '発動エリア：中左中右・後左中右　/　発動条件：タックル時　/　タックル・コンタクト・マークUP' },
    abilities: [
      { name: 'ハイタワーの天敵', rank: '銀', description: '発動条件：好調　/　マーク・ジャンプUP' },
      { name: 'ハードタックラー', rank: '銀', description: '発動条件：好調　/　タックル・コンタクトUP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p70',
    name: 'ガブリエウ',
    readingName: 'がぶりえう',
    category: 'DF',
    mainPosition: 'CB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'ブラジル',
    policy: 'ポゼッション',
    playStyle: 'ストッパー',
    playStyleLevel: 'Ⅱ',
    overall: 7082,
    maxOverall: 15350,
    baseStats: { shoot: 1111, pass: 1068, dribble: 1205, defense: 1393, physical: 1362, speed: 790 },
    detailStats: {
      shoot: { finishing: 347, power: 405, composure: 359 },
      pass: { shortPass: 359, longPass: 365, accuracy: 344 },
      dribble: { breakout: 395, keeping: 396, ballTouch: 414 },
      defense: { tackle: 467, interception: 462, marking: 464 },
      physical: { jumping: 466, contact: 466, stamina: 430 },
      speed: { running: 403, agility: 387 }
    },
    maxEnhanced: {
      overall: 15350,
      baseStats: { shoot: 2608, pass: 2637, dribble: 2738, defense: 2998, physical: 2955, speed: 1836 },
      detailStats: {
        shoot: { finishing: 846, power: 904, composure: 858 },
        pass: { shortPass: 882, longPass: 888, accuracy: 867 },
        dribble: { breakout: 906, keeping: 907, ballTouch: 925 },
        defense: { tackle: 1002, interception: 997, marking: 999 },
        physical: { jumping: 1001, contact: 1001, stamina: 953 },
        speed: { running: 926, agility: 910 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -1, shoot: -1, longShoot: -1,
      shortPass: 0, longPass: 0, throughPass: -1, cutIn: -1, keep: -1,
      delay: 0, rushOut: -1, feint: -1, press: 1
    },
    skill: { name: 'チェーンカッター', rank: '銀', description: '発動エリア：中左中右・後左中右　/　発動条件：タックル時　/　タックル・コンタクト・マークUP' },
    abilities: [
      { name: 'パワフルジャンパー', rank: '銀', description: '発動条件：好調　/　ジャンプ・コンタクトUP' },
      { name: 'ボールハンター', rank: '銀', description: '発動条件：絶好調　/　タックル・マークUP' },
      { name: '懐の深いボールタッチ', rank: '銅', description: '発動条件：絶好調　/　キープ力・ボールタッチUP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p71',
    name: 'アレッサンドロ・バストーニ',
    readingName: 'あれっさんどろばすとーに',
    category: 'DF',
    mainPosition: 'CB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'イタリア',
    policy: 'リアクション',
    playStyle: 'ストッパー',
    playStyleLevel: 'Ⅱ',
    overall: 7132,
    maxOverall: 15415,
    baseStats: { shoot: 991, pass: 1284, dribble: 1197, defense: 1371, physical: 1253, speed: 827 },
    detailStats: {
      shoot: { finishing: 309, power: 355, composure: 327 },
      pass: { shortPass: 434, longPass: 436, accuracy: 414 },
      dribble: { breakout: 385, keeping: 390, ballTouch: 422 },
      defense: { tackle: 463, interception: 454, marking: 454 },
      physical: { jumping: 437, contact: 447, stamina: 369 },
      speed: { running: 431, agility: 396 }
    },
    maxEnhanced: {
      overall: 15415,
      baseStats: { shoot: 2488, pass: 2853, dribble: 2730, defense: 2976, physical: 2846, speed: 1873 },
      detailStats: {
        shoot: { finishing: 808, power: 854, composure: 826 },
        pass: { shortPass: 957, longPass: 959, accuracy: 937 },
        dribble: { breakout: 896, keeping: 901, ballTouch: 933 },
        defense: { tackle: 998, interception: 989, marking: 989 },
        physical: { jumping: 972, contact: 982, stamina: 892 },
        speed: { running: 954, agility: 919 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -1, shoot: -1, longShoot: -1,
      shortPass: 0, longPass: 0, throughPass: -1, cutIn: -1, keep: -1,
      delay: 0, rushOut: -1, feint: -1, press: 1
    },
    skill: { name: 'チェーンカッター', rank: '銀', description: '発動エリア：中左中右・後左中右　/　発動条件：タックル時　/　タックル・コンタクト・マークUP' },
    abilities: [
      { name: '瞬間の球際力', rank: '銀', description: '発動条件：好調　/　パスカット・コンタクトUP' },
      { name: '反撃のパサー', rank: '銀', description: '発動条件：絶好調　/　ショートパス・タックルUP' },
      { name: 'リスクヘッジパサー', rank: '銅', description: '発動条件：絶好調　/　ショートパス・マークUP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p72',
    name: 'ナタン・アケ',
    readingName: 'なたんあけ',
    category: 'DF',
    mainPosition: 'CB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'オランダ',
    policy: 'ムービング',
    playStyle: 'ストッパー',
    playStyleLevel: 'Ⅱ',
    overall: 7079,
    maxOverall: 15356,
    baseStats: { shoot: 956, pass: 1188, dribble: 1201, defense: 1410, physical: 1258, speed: 863 },
    detailStats: {
      shoot: { finishing: 275, power: 343, composure: 338 },
      pass: { shortPass: 405, longPass: 405, accuracy: 378 },
      dribble: { breakout: 385, keeping: 396, ballTouch: 420 },
      defense: { tackle: 447, interception: 481, marking: 482 },
      physical: { jumping: 394, contact: 435, stamina: 429 },
      speed: { running: 434, agility: 429 }
    },
    maxEnhanced: {
      overall: 15356,
      baseStats: { shoot: 2453, pass: 2757, dribble: 2734, defense: 3015, physical: 2851, speed: 1909 },
      detailStats: {
        shoot: { finishing: 774, power: 842, composure: 837 },
        pass: { shortPass: 928, longPass: 928, accuracy: 901 },
        dribble: { breakout: 896, keeping: 907, ballTouch: 931 },
        defense: { tackle: 982, interception: 1016, marking: 1017 },
        physical: { jumping: 929, contact: 970, stamina: 952 },
        speed: { running: 957, agility: 952 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -1, shoot: -1, longShoot: -1,
      shortPass: 0, longPass: 0, throughPass: -1, cutIn: -1, keep: -1,
      delay: 0, rushOut: -1, feint: -1, press: 1
    },
    skill: { name: '熟練のインターセプト', rank: '銀', description: '発動エリア：中左中右・後左中右　/　発動条件：パスカット時　/　パスカット・敏捷性UP' },
    abilities: [
      { name: 'インターセプター', rank: '銀', description: '発動条件：好調　/　パスカット・マークUP' },
      { name: 'スピードクラッシャー', rank: '銀', description: '発動条件：好調　/　タックル・走力UP' },
      { name: 'ムービングウォール', rank: '銅', description: '発動条件：絶好調　/　コンタクト・スタミナUP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p73',
    name: '坪井慶介',
    readingName: 'つぼいけいすけ',
    category: 'DF',
    mainPosition: 'CB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'ポゼッション',
    playStyle: 'ストッパー',
    playStyleLevel: 'Ⅱ',
    overall: 6920,
    maxOverall: 15182,
    baseStats: { shoot: 1020, pass: 993, dribble: 1140, defense: 1374, physical: 1286, speed: 946 },
    detailStats: {
      shoot: { finishing: 310, power: 357, composure: 353 },
      pass: { shortPass: 331, longPass: 326, accuracy: 336 },
      dribble: { breakout: 383, keeping: 372, ballTouch: 385 },
      defense: { tackle: 454, interception: 462, marking: 458 },
      physical: { jumping: 429, contact: 411, stamina: 446 },
      speed: { running: 482, agility: 464 }
    },
    maxEnhanced: {
      overall: 15182,
      baseStats: { shoot: 2517, pass: 2562, dribble: 2673, defense: 2979, physical: 2879, speed: 1992 },
      detailStats: {
        shoot: { finishing: 809, power: 856, composure: 852 },
        pass: { shortPass: 854, longPass: 849, accuracy: 859 },
        dribble: { breakout: 894, keeping: 883, ballTouch: 896 },
        defense: { tackle: 989, interception: 997, marking: 993 },
        physical: { jumping: 964, contact: 946, stamina: 969 },
        speed: { running: 1005, agility: 987 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -1, shoot: -1, longShoot: -1,
      shortPass: 0, longPass: 0, throughPass: -1, cutIn: -1, keep: -1,
      delay: 0, rushOut: -1, feint: -1, press: 1
    },
    skill: { name: '迎撃のインターセプト', rank: '銀', description: '発動エリア：中左中右・後左中右　/　発動条件：パスカット時　/　パスカット・ロングパスUP　/　成功時に自身のロングパス発生確率UP' },
    abilities: [
      { name: '俊敏なマーカー', rank: '銀', description: '発動条件：絶好調　/　パスカット・敏捷性UP' },
      { name: 'スピードクラッシャー', rank: '銀', description: '発動条件：好調　/　タックル・走力UP' },
      { name: 'ノンストップジャンパー', rank: '銅', description: '発動条件：途中出場　/　ジャンプ・スタミナUP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p74',
    name: 'フェデリコ・ガッティ',
    readingName: 'ふぇでりこがっち',
    category: 'DF',
    mainPosition: 'CB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'イタリア',
    policy: 'カウンター',
    playStyle: 'ストッパー',
    playStyleLevel: 'Ⅱ',
    overall: 6775,
    maxOverall: 15026,
    baseStats: { shoot: 1202, pass: 1025, dribble: 1058, defense: 1336, physical: 1307, speed: 736 },
    detailStats: {
      shoot: { finishing: 375, power: 434, composure: 393 },
      pass: { shortPass: 345, longPass: 345, accuracy: 335 },
      dribble: { breakout: 338, keeping: 340, ballTouch: 380 },
      defense: { tackle: 446, interception: 444, marking: 446 },
      physical: { jumping: 433, contact: 462, stamina: 412 },
      speed: { running: 368, agility: 368 }
    },
    maxEnhanced: {
      overall: 15026,
      baseStats: { shoot: 2699, pass: 2594, dribble: 2591, defense: 2941, physical: 2900, speed: 1782 },
      detailStats: {
        shoot: { finishing: 874, power: 933, composure: 892 },
        pass: { shortPass: 868, longPass: 868, accuracy: 858 },
        dribble: { breakout: 849, keeping: 851, ballTouch: 891 },
        defense: { tackle: 981, interception: 979, marking: 981 },
        physical: { jumping: 968, contact: 997, stamina: 935 },
        speed: { running: 891, agility: 891 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -1, shoot: -1, longShoot: -1,
      shortPass: 0, longPass: 0, throughPass: -1, cutIn: -1, keep: -1,
      delay: 0, rushOut: -1, feint: -1, press: 1
    },
    skill: { name: '鋭角的なタックル', rank: '銅', description: '発動エリア：中左中右・後左中右　/　発動条件：タックル時　/　タックル・コンタクト・マークUP' },
    abilities: [
      { name: 'パワーアジリティ', rank: '銀', description: '発動条件：好調　/　コンタクト・敏捷性UP' },
      { name: 'ボールスティーラー', rank: '銀', description: '発動条件：途中出場　/　タックル・パスカットUP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p75',
    name: 'アレクサンドロ・リベイロ',
    readingName: 'あれくさんどろりべいろ',
    category: 'DF',
    mainPosition: 'CB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'ブラジル',
    policy: 'ポゼッション',
    playStyle: 'ストッパー',
    playStyleLevel: 'Ⅱ',
    overall: 6663,
    maxOverall: 14902,
    baseStats: { shoot: 1140, pass: 1090, dribble: 1041, defense: 1311, physical: 1269, speed: 750 },
    detailStats: {
      shoot: { finishing: 364, power: 406, composure: 370 },
      pass: { shortPass: 392, longPass: 371, accuracy: 327 },
      dribble: { breakout: 336, keeping: 326, ballTouch: 379 },
      defense: { tackle: 407, interception: 451, marking: 453 },
      physical: { jumping: 442, contact: 429, stamina: 398 },
      speed: { running: 407, agility: 343 }
    },
    maxEnhanced: {
      overall: 14902,
      baseStats: { shoot: 2637, pass: 2659, dribble: 2574, defense: 2916, physical: 2862, speed: 1796 },
      detailStats: {
        shoot: { finishing: 863, power: 905, composure: 869 },
        pass: { shortPass: 915, longPass: 894, accuracy: 850 },
        dribble: { breakout: 847, keeping: 837, ballTouch: 890 },
        defense: { tackle: 942, interception: 986, marking: 988 },
        physical: { jumping: 977, contact: 964, stamina: 921 },
        speed: { running: 930, agility: 866 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -1, shoot: -1, longShoot: -1,
      shortPass: 0, longPass: 0, throughPass: -1, cutIn: -1, keep: -1,
      delay: 0, rushOut: -1, feint: -1, press: 1
    },
    skill: { name: '反撃のパスカット', rank: '銅', description: '発動エリア：中左中右・後左中右　/　発動条件：パスカット時　/　パスカット・ロングパスUP　/　成功時に自身のロングパス発生確率UP' },
    abilities: [
      { name: 'アジャイルマーカー', rank: '銀', description: '発動条件：途中出場　/　マーク・敏捷性UP' },
      { name: '瞬間の球際力', rank: '銀', description: '発動条件：好調　/　パスカット・コンタクトUP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p76',
    name: 'アレハンドロ・バルデ',
    readingName: 'あれはんどろばるで',
    category: 'DF',
    mainPosition: 'LFB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'スペイン',
    policy: 'ポゼッション',
    playStyle: '攻撃的LFB',
    playStyleLevel: 'Ⅱ',
    overall: 7158,
    maxOverall: 15399,
    baseStats: { shoot: 1226, pass: 1285, dribble: 1440, defense: 1177, physical: 1217, speed: 958 },
    detailStats: {
      shoot: { finishing: 418, power: 403, composure: 405 },
      pass: { shortPass: 429, longPass: 432, accuracy: 424 },
      dribble: { breakout: 494, keeping: 479, ballTouch: 467 },
      defense: { tackle: 379, interception: 404, marking: 394 },
      physical: { jumping: 361, contact: 418, stamina: 438 },
      speed: { running: 479, agility: 479 }
    },
    maxEnhanced: {
      overall: 15399,
      baseStats: { shoot: 2723, pass: 2854, dribble: 2973, defense: 2782, physical: 2786, speed: 2028 },
      detailStats: {
        shoot: { finishing: 917, power: 902, composure: 904 },
        pass: { shortPass: 952, longPass: 955, accuracy: 947 },
        dribble: { breakout: 1005, keeping: 990, ballTouch: 978 },
        defense: { tackle: 914, interception: 939, marking: 929 },
        physical: { jumping: 872, contact: 941, stamina: 973 },
        speed: { running: 1014, agility: 1014 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -1, shoot: -1, longShoot: -1,
      shortPass: 0, longPass: 0, throughPass: -1, cutIn: -1, keep: -1,
      delay: 0, rushOut: -1, feint: -1, press: 1
    },
    skill: { name: 'オープンスペースの演出家', rank: '銀', description: '発動エリア：中左右・後左右　/　発動条件：ドリブル時　/　突破力・キープ力・ロングパスUP　/　成功時に自身のロングパス発生確率UP' },
    abilities: [
      { name: '俊敏なドリブラー', rank: '銀', description: '発動条件：好調　/　突破力・敏捷性UP' },
      { name: 'ワイドカッター', rank: '銀', description: '発動条件：好調　/　突破力・パスカットUP' },
      { name: 'マラソンマン', rank: '銅', description: '発動条件：途中出場　/　スタミナ・走力UP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p77',
    name: 'ジョアン・カンセロ',
    readingName: 'じょあんかんせろ',
    category: 'DF',
    mainPosition: 'LFB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'ポルトガル',
    policy: 'リアクション',
    playStyle: '攻撃的LFB',
    playStyleLevel: 'Ⅱ',
    overall: 6937,
    maxOverall: 15140,
    baseStats: { shoot: 1157, pass: 1409, dribble: 1395, defense: 1205, physical: 1143, speed: 891 },
    detailStats: {
      shoot: { finishing: 391, power: 373, composure: 393 },
      pass: { shortPass: 470, longPass: 470, accuracy: 469 },
      dribble: { breakout: 475, keeping: 475, ballTouch: 445 },
      defense: { tackle: 426, interception: 399, marking: 380 },
      physical: { jumping: 356, contact: 380, stamina: 407 },
      speed: { running: 430, agility: 461 }
    },
    maxEnhanced: {
      overall: 15140,
      baseStats: { shoot: 2654, pass: 2978, dribble: 2928, defense: 2810, physical: 2712, speed: 1961 },
      detailStats: {
        shoot: { finishing: 890, power: 872, composure: 892 },
        pass: { shortPass: 993, longPass: 993, accuracy: 992 },
        dribble: { breakout: 986, keeping: 986, ballTouch: 956 },
        defense: { tackle: 961, interception: 934, marking: 915 },
        physical: { jumping: 867, contact: 903, stamina: 942 },
        speed: { running: 965, agility: 996 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -1, shoot: -1, longShoot: -1,
      shortPass: 0, longPass: 0, throughPass: -1, cutIn: -1, keep: -1,
      delay: 0, rushOut: -1, feint: -1, press: 1
    },
    skill: { name: '華麗なる一閃', rank: '銀', description: '発動エリア：中中・後左中右　/　発動条件：CF・AMの選手へのショートパス・ロングパス時　/　ロングパス・キック精度・ショートパスUP　/　成功時に受け手のショートパス発生確率UP' },
    abilities: [
      { name: '失わないドリブラー', rank: '銀', description: '発動条件：絶好調　/　突破力・キープ力UP' },
      { name: '長短のキック', rank: '銀', description: '発動条件：途中出場　/　ショートパス・ロングパスUP' },
      { name: 'アジャイルクラッシャー', rank: '銅', description: '発動条件：好調　/　タックル・敏捷性UP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p78',
    name: 'フェデリコ・ディマルコ',
    readingName: 'ふぇでりこでぃまるこ',
    category: 'DF',
    mainPosition: 'LFB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'イタリア',
    policy: 'ムービング',
    playStyle: '攻撃的LFB',
    playStyleLevel: 'Ⅱ',
    overall: 6934,
    maxOverall: 15141,
    baseStats: { shoot: 1198, pass: 1396, dribble: 1299, defense: 1262, physical: 1144, speed: 890 },
    detailStats: {
      shoot: { finishing: 395, power: 386, composure: 417 },
      pass: { shortPass: 458, longPass: 459, accuracy: 479 },
      dribble: { breakout: 429, keeping: 416, ballTouch: 454 },
      defense: { tackle: 397, interception: 435, marking: 430 },
      physical: { jumping: 350, contact: 384, stamina: 410 },
      speed: { running: 435, agility: 455 }
    },
    maxEnhanced: {
      overall: 15141,
      baseStats: { shoot: 2695, pass: 2965, dribble: 2832, defense: 2867, physical: 2713, speed: 1960 },
      detailStats: {
        shoot: { finishing: 894, power: 885, composure: 916 },
        pass: { shortPass: 981, longPass: 982, accuracy: 1002 },
        dribble: { breakout: 940, keeping: 927, ballTouch: 965 },
        defense: { tackle: 932, interception: 970, marking: 965 },
        physical: { jumping: 861, contact: 907, stamina: 945 },
        speed: { running: 970, agility: 990 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -1, shoot: -1, longShoot: -1,
      shortPass: 0, longPass: 0, throughPass: -1, cutIn: -1, keep: -1,
      delay: 0, rushOut: -1, feint: -1, press: 1
    },
    skill: { name: '勝機を生み出すフィード', rank: '銀', description: '発動エリア：中中・後左中右　/　発動条件：前中に居る選手へのロングパス時　/　ロングパス・キック精度UP　/　成功時に受け手のトラップ発生確率UP' },
    abilities: [
      { name: 'すり抜けるロングパサー', rank: '銀', description: '発動条件：絶好調　/　ロングパス・突破力UP' },
      { name: '俊敏なパサー', rank: '銀', description: '発動条件：好調　/　ショートパス・敏捷性UP' },
      { name: '絢爛なインターセプト', rank: '銅', description: '発動条件：絶好調　/　ボールタッチ・パスカットUP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p79',
    name: 'アクラフ・ハキミ',
    readingName: 'あくらふはきみ',
    category: 'DF',
    mainPosition: 'RFB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'モロッコ',
    policy: 'ポゼッション',
    playStyle: '攻撃的RFB',
    playStyleLevel: 'Ⅱ',
    overall: 7288,
    maxOverall: 15578,
    baseStats: { shoot: 1339, pass: 1285, dribble: 1416, defense: 1243, physical: 1172, speed: 942 },
    detailStats: {
      shoot: { finishing: 454, power: 442, composure: 443 },
      pass: { shortPass: 439, longPass: 429, accuracy: 417 },
      dribble: { breakout: 480, keeping: 472, ballTouch: 464 },
      defense: { tackle: 409, interception: 417, marking: 417 },
      physical: { jumping: 310, contact: 382, stamina: 480 },
      speed: { running: 481, agility: 461 }
    },
    maxEnhanced: {
      overall: 15578,
      baseStats: { shoot: 2836, pass: 2854, dribble: 2949, defense: 2848, physical: 2741, speed: 2012 },
      detailStats: {
        shoot: { finishing: 953, power: 941, composure: 942 },
        pass: { shortPass: 962, longPass: 952, accuracy: 940 },
        dribble: { breakout: 991, keeping: 983, ballTouch: 975 },
        defense: { tackle: 944, interception: 952, marking: 952 },
        physical: { jumping: 821, contact: 905, stamina: 1015 },
        speed: { running: 1016, agility: 996 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -1, shoot: -1, longShoot: -1,
      shortPass: 0, longPass: 0, throughPass: -1, cutIn: -1, keep: -1,
      delay: 0, rushOut: -1, feint: -1, press: 1
    },
    skill: { name: '逆襲', rank: '銀', description: '発動エリア：中左中右・後左中右　/　発動条件：タックル時　/　タックル・マーク・突破力UP　/　成功時に自身のドリブル発生確率UP' },
    abilities: [
      { name: 'アンストッパブルランナー', rank: '金', description: '発動条件：好調　/　スタミナ・走力・敏捷性UP' },
      { name: 'ハードスティール', rank: '銀', description: '発動条件：絶好調　/　キープ力・タックルUP' },
      { name: '懐の深いボールタッチ', rank: '銅', description: '発動条件：絶好調　/　キープ力・ボールタッチUP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p80',
    name: 'デンゼル・ダンフリース',
    readingName: 'でんぜるだんふりーす',
    category: 'DF',
    mainPosition: 'RFB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'オランダ',
    policy: 'ムービング',
    playStyle: '攻撃的RFB',
    playStyleLevel: 'Ⅱ',
    overall: 6945,
    maxOverall: 15165,
    baseStats: { shoot: 1203, pass: 1122, dribble: 1272, defense: 1323, physical: 1336, speed: 927 },
    detailStats: {
      shoot: { finishing: 398, power: 410, composure: 395 },
      pass: { shortPass: 377, longPass: 369, accuracy: 376 },
      dribble: { breakout: 435, keeping: 437, ballTouch: 400 },
      defense: { tackle: 448, interception: 441, marking: 434 },
      physical: { jumping: 458, contact: 446, stamina: 432 },
      speed: { running: 477, agility: 450 }
    },
    maxEnhanced: {
      overall: 15165,
      baseStats: { shoot: 2700, pass: 2691, dribble: 2805, defense: 2928, physical: 2905, speed: 1997 },
      detailStats: {
        shoot: { finishing: 897, power: 909, composure: 894 },
        pass: { shortPass: 900, longPass: 892, accuracy: 899 },
        dribble: { breakout: 946, keeping: 948, ballTouch: 911 },
        defense: { tackle: 983, interception: 976, marking: 969 },
        physical: { jumping: 969, contact: 969, stamina: 967 },
        speed: { running: 1012, agility: 985 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -1, shoot: -1, longShoot: -1,
      shortPass: 0, longPass: 0, throughPass: -1, cutIn: -1, keep: -1,
      delay: 0, rushOut: -1, feint: -1, press: 1
    },
    skill: { name: 'スリップビート', rank: '銀', description: '発動エリア：前左右・中左右　/　発動条件：ドリブル時　/　突破力・キープ力UP　/　成功時に自身のショートパス発生確率UP' },
    abilities: [
      { name: '高速のボールタッチ', rank: '銀', description: '発動条件：好調　/　ボールタッチ・走力UP' },
      { name: '俊敏なドリブラー', rank: '銀', description: '発動条件：好調　/　突破力・敏捷性UP' },
      { name: '上空のターゲットマン', rank: '銅', description: '発動条件：途中出場　/　キープ力・ジャンプUP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p81',
    name: 'ナウエル・モリーナ',
    readingName: 'なうえるもりーな',
    category: 'DF',
    mainPosition: 'RFB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'アルゼンチン',
    policy: 'カウンター',
    playStyle: '攻撃的RFB',
    playStyleLevel: 'Ⅱ',
    overall: 6750,
    maxOverall: 14979,
    baseStats: { shoot: 1197, pass: 1254, dribble: 1298, defense: 1207, physical: 1121, speed: 884 },
    detailStats: {
      shoot: { finishing: 403, power: 392, composure: 402 },
      pass: { shortPass: 419, longPass: 419, accuracy: 416 },
      dribble: { breakout: 441, keeping: 428, ballTouch: 429 },
      defense: { tackle: 409, interception: 401, marking: 397 },
      physical: { jumping: 331, contact: 387, stamina: 403 },
      speed: { running: 435, agility: 449 }
    },
    maxEnhanced: {
      overall: 14979,
      baseStats: { shoot: 2694, pass: 2823, dribble: 2831, defense: 2812, physical: 2690, speed: 1954 },
      detailStats: {
        shoot: { finishing: 902, power: 891, composure: 901 },
        pass: { shortPass: 942, longPass: 942, accuracy: 939 },
        dribble: { breakout: 952, keeping: 939, ballTouch: 940 },
        defense: { tackle: 944, interception: 936, marking: 932 },
        physical: { jumping: 842, contact: 910, stamina: 938 },
        speed: { running: 970, agility: 984 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -1, shoot: -1, longShoot: -1,
      shortPass: 0, longPass: 0, throughPass: -1, cutIn: -1, keep: -1,
      delay: 0, rushOut: -1, feint: -1, press: 1
    },
    skill: { name: 'テクニカルドリブル', rank: '銅', description: '発動エリア：前左右・中左右　/　発動条件：ドリブル時　/　突破力・キープ力UP　/　成功時に自身のショートパス発生確率UP' },
    abilities: [
      { name: '俊敏なドリブラー', rank: '銀', description: '発動条件：好調　/　突破力・敏捷性UP' },
      { name: 'スピードクラッシャー', rank: '銀', description: '発動条件：好調　/　タックル・走力UP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p82',
    name: 'レオナルド・スピナッツォーラ',
    readingName: 'れおなるどすぴなっつぉーら',
    category: 'DF',
    mainPosition: 'LFB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'イタリア',
    policy: 'カウンター',
    playStyle: '守備的LFB',
    playStyleLevel: 'Ⅱ',
    overall: 6600,
    maxOverall: 14814,
    baseStats: { shoot: 1042, pass: 1225, dribble: 1351, defense: 1248, physical: 1135, speed: 896 },
    detailStats: {
      shoot: { finishing: 346, power: 342, composure: 354 },
      pass: { shortPass: 423, longPass: 411, accuracy: 391 },
      dribble: { breakout: 455, keeping: 445, ballTouch: 451 },
      defense: { tackle: 400, interception: 429, marking: 419 },
      physical: { jumping: 389, contact: 375, stamina: 371 },
      speed: { running: 440, agility: 456 }
    },
    maxEnhanced: {
      overall: 14814,
      baseStats: { shoot: 2539, pass: 2794, dribble: 2884, defense: 2853, physical: 2704, speed: 1966 },
      detailStats: {
        shoot: { finishing: 845, power: 841, composure: 853 },
        pass: { shortPass: 946, longPass: 934, accuracy: 914 },
        dribble: { breakout: 966, keeping: 956, ballTouch: 962 },
        defense: { tackle: 935, interception: 964, marking: 954 },
        physical: { jumping: 900, contact: 898, stamina: 906 },
        speed: { running: 975, agility: 991 }
      }
    },
    playTendencies: {
      attack: 2, defense: -1, dribble: 2, shoot: 1, longShoot: 0,
      shortPass: 0, longPass: -1, throughPass: 0, cutIn: 1, keep: 1,
      delay: -1, rushOut: 1, feint: 2, press: 0
    },
    skill: { name: '反撃のパスカット', rank: '銅', description: '発動エリア：中左中右・後左中右　/　発動条件：パスカット時　/　パスカット・ロングパスUP　/　成功時に自身のロングパス発生確率UP' },
    abilities: [
      { name: '俊敏なドリブラー', rank: '銀', description: '発動条件：好調　/　突破力・敏捷性UP' },
      { name: '高速マーカー', rank: '銀', description: '発動条件：途中出場　/　パスカット・走力UP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p83',
    name: 'ユリエン・ティンバー',
    readingName: 'ゆりえんてぃんばー',
    category: 'DF',
    mainPosition: 'LFB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'オランダ',
    policy: 'ポゼッション',
    playStyle: '守備的LFB',
    playStyleLevel: 'Ⅱ',
    overall: 6770,
    maxOverall: 15001,
    baseStats: { shoot: 1101, pass: 1234, dribble: 1343, defense: 1340, physical: 1198, speed: 843 },
    detailStats: {
      shoot: { finishing: 351, power: 373, composure: 377 },
      pass: { shortPass: 430, longPass: 415, accuracy: 389 },
      dribble: { breakout: 443, keeping: 439, ballTouch: 461 },
      defense: { tackle: 443, interception: 453, marking: 444 },
      physical: { jumping: 409, contact: 402, stamina: 387 },
      speed: { running: 412, agility: 431 }
    },
    maxEnhanced: {
      overall: 15001,
      baseStats: { shoot: 2598, pass: 2803, dribble: 2876, defense: 2945, physical: 2767, speed: 1913 },
      detailStats: {
        shoot: { finishing: 850, power: 872, composure: 876 },
        pass: { shortPass: 953, longPass: 938, accuracy: 912 },
        dribble: { breakout: 954, keeping: 950, ballTouch: 972 },
        defense: { tackle: 978, interception: 988, marking: 979 },
        physical: { jumping: 920, contact: 925, stamina: 922 },
        speed: { running: 947, agility: 966 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -1, shoot: -1, longShoot: -1,
      shortPass: 0, longPass: 0, throughPass: -1, cutIn: -1, keep: -1,
      delay: 0, rushOut: -1, feint: -1, press: 1
    },
    skill: { name: '熟練のインターセプト', rank: '銀', description: '発動エリア：中左中右・後左中右　/　発動条件：パスカット時　/　パスカット・敏捷性UP' },
    abilities: [
      { name: 'ボールスティーラー', rank: '銀', description: '発動条件：途中出場　/　タックル・パスカットUP' },
      { name: '流麗なマーカー', rank: '銀', description: '発動条件：絶好調　/　ボールタッチ・マークUP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p84',
    name: 'ルーク・ショー',
    readingName: 'るーくしょー',
    category: 'DF',
    mainPosition: 'LFB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'イングランド',
    policy: 'ムービング',
    playStyle: '守備的LFB',
    playStyleLevel: 'Ⅱ',
    overall: 6686,
    maxOverall: 14910,
    baseStats: { shoot: 1041, pass: 1266, dribble: 1344, defense: 1276, physical: 1259, speed: 848 },
    detailStats: {
      shoot: { finishing: 321, power: 372, composure: 348 },
      pass: { shortPass: 426, longPass: 420, accuracy: 420 },
      dribble: { breakout: 438, keeping: 447, ballTouch: 459 },
      defense: { tackle: 392, interception: 446, marking: 438 },
      physical: { jumping: 420, contact: 455, stamina: 384 },
      speed: { running: 413, agility: 435 }
    },
    maxEnhanced: {
      overall: 14910,
      baseStats: { shoot: 2538, pass: 2835, dribble: 2877, defense: 2881, physical: 2828, speed: 1918 },
      detailStats: {
        shoot: { finishing: 820, power: 871, composure: 847 },
        pass: { shortPass: 949, longPass: 943, accuracy: 943 },
        dribble: { breakout: 949, keeping: 958, ballTouch: 970 },
        defense: { tackle: 927, interception: 981, marking: 973 },
        physical: { jumping: 931, contact: 978, stamina: 919 },
        speed: { running: 948, agility: 970 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -1, shoot: -1, longShoot: -1,
      shortPass: 0, longPass: 0, throughPass: -1, cutIn: -1, keep: -1,
      delay: 0, rushOut: -1, feint: -1, press: 1
    },
    skill: { name: 'テクニカルドリブル', rank: '銅', description: '発動エリア：前左右・中左右　/　発動条件：ドリブル時　/　突破力・キープ力UP　/　成功時に自身のショートパス発生確率UP' },
    abilities: [
      { name: 'インターセプター', rank: '銀', description: '発動条件：好調　/　パスカット・マークUP' },
      { name: '剛柔のタッチ', rank: '銀', description: '発動条件：好調　/　ボールタッチ・コンタクトUP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p85',
    name: 'カイル・ウォーカー',
    readingName: 'かいるうぉーかー',
    category: 'DF',
    mainPosition: 'RFB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'イングランド',
    policy: 'ムービング',
    playStyle: '守備的RFB',
    playStyleLevel: 'Ⅱ',
    overall: 6906,
    maxOverall: 15148,
    baseStats: { shoot: 1154, pass: 1197, dribble: 1331, defense: 1313, physical: 1255, speed: 877 },
    detailStats: {
      shoot: { finishing: 365, power: 406, composure: 383 },
      pass: { shortPass: 405, longPass: 401, accuracy: 391 },
      dribble: { breakout: 438, keeping: 440, ballTouch: 453 },
      defense: { tackle: 423, interception: 446, marking: 444 },
      physical: { jumping: 388, contact: 423, stamina: 444 },
      speed: { running: 461, agility: 416 }
    },
    maxEnhanced: {
      overall: 15148,
      baseStats: { shoot: 2651, pass: 2766, dribble: 2864, defense: 2918, physical: 2824, speed: 1947 },
      detailStats: {
        shoot: { finishing: 864, power: 905, composure: 882 },
        pass: { shortPass: 928, longPass: 924, accuracy: 914 },
        dribble: { breakout: 949, keeping: 951, ballTouch: 964 },
        defense: { tackle: 958, interception: 981, marking: 979 },
        physical: { jumping: 899, contact: 946, stamina: 979 },
        speed: { running: 996, agility: 951 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -1, shoot: -1, longShoot: -1,
      shortPass: 0, longPass: 0, throughPass: -1, cutIn: -1, keep: -1,
      delay: 0, rushOut: -1, feint: -1, press: 1
    },
    skill: { name: '遮断のアクション', rank: '銀', description: '発動エリア：中左中右・後左中右　/　発動条件：パスカット時　/　パスカットUP　/　成功時に自身のショートパス発生確率UP' },
    abilities: [
      { name: '俊敏なマーカー', rank: '銀', description: '発動条件：絶好調　/　パスカット・敏捷性UP' },
      { name: 'ランニングマーカー', rank: '銀', description: '発動条件：絶好調　/　マーク・走力UP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p86',
    name: 'ベン・ホワイト',
    readingName: 'べんほわいと',
    category: 'DF',
    mainPosition: 'RFB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'イングランド',
    policy: 'カウンター',
    playStyle: '守備的RFB',
    playStyleLevel: 'Ⅱ',
    overall: 6700,
    maxOverall: 14908,
    baseStats: { shoot: 1150, pass: 1171, dribble: 1304, defense: 1339, physical: 1283, speed: 790 },
    detailStats: {
      shoot: { finishing: 362, power: 392, composure: 396 },
      pass: { shortPass: 403, longPass: 394, accuracy: 374 },
      dribble: { breakout: 428, keeping: 419, ballTouch: 457 },
      defense: { tackle: 426, interception: 458, marking: 455 },
      physical: { jumping: 440, contact: 427, stamina: 416 },
      speed: { running: 387, agility: 403 }
    },
    maxEnhanced: {
      overall: 14908,
      baseStats: { shoot: 2647, pass: 2740, dribble: 2837, defense: 2944, physical: 2852, speed: 1860 },
      detailStats: {
        shoot: { finishing: 861, power: 891, composure: 895 },
        pass: { shortPass: 926, longPass: 917, accuracy: 897 },
        dribble: { breakout: 939, keeping: 930, ballTouch: 968 },
        defense: { tackle: 961, interception: 993, marking: 990 },
        physical: { jumping: 951, contact: 950, stamina: 951 },
        speed: { running: 922, agility: 938 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -1, shoot: -1, longShoot: -1,
      shortPass: 0, longPass: 0, throughPass: -1, cutIn: -1, keep: -1,
      delay: 0, rushOut: -1, feint: -1, press: 1
    },
    skill: { name: '反撃のパスカット', rank: '銅', description: '発動エリア：中左中右・後左中右　/　発動条件：パスカット時　/　パスカット・ロングパスUP　/　成功時に自身のロングパス発生確率UP' },
    abilities: [
      { name: '絢爛なインターセプト', rank: '銀', description: '発動条件：絶好調　/　ボールタッチ・パスカットUP' },
      { name: 'ハイタワーの天敵', rank: '銀', description: '発動条件：好調　/　マーク・ジャンプUP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p87',
    name: 'リース・ジェイムズ',
    readingName: 'りーすじぇいむず',
    category: 'DF',
    mainPosition: 'RFB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'イングランド',
    policy: 'リアクション',
    playStyle: '守備的RFB',
    playStyleLevel: 'Ⅱ',
    overall: 6698,
    maxOverall: 14913,
    baseStats: { shoot: 1178, pass: 1173, dribble: 1252, defense: 1312, physical: 1304, speed: 816 },
    detailStats: {
      shoot: { finishing: 363, power: 421, composure: 394 },
      pass: { shortPass: 387, longPass: 377, accuracy: 409 },
      dribble: { breakout: 400, keeping: 411, ballTouch: 441 },
      defense: { tackle: 452, interception: 432, marking: 428 },
      physical: { jumping: 396, contact: 484, stamina: 424 },
      speed: { running: 419, agility: 397 }
    },
    maxEnhanced: {
      overall: 14913,
      baseStats: { shoot: 2675, pass: 2742, dribble: 2785, defense: 2917, physical: 2873, speed: 1886 },
      detailStats: {
        shoot: { finishing: 862, power: 920, composure: 893 },
        pass: { shortPass: 910, longPass: 900, accuracy: 932 },
        dribble: { breakout: 911, keeping: 922, ballTouch: 952 },
        defense: { tackle: 987, interception: 967, marking: 963 },
        physical: { jumping: 907, contact: 1007, stamina: 959 },
        speed: { running: 954, agility: 932 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -1, shoot: -1, longShoot: -1,
      shortPass: 0, longPass: 0, throughPass: -1, cutIn: -1, keep: -1,
      delay: 0, rushOut: -1, feint: -1, press: 1
    },
    skill: { name: '鋭角的なタックル', rank: '銅', description: '発動エリア：中左中右・後左中右　/　発動条件：タックル時　/　タックル・コンタクト・マークUP' },
    abilities: [
      { name: 'ハードタックラー', rank: '銀', description: '発動条件：好調　/　タックル・コンタクトUP' },
      { name: '絢爛なインターセプト', rank: '銀', description: '発動条件：絶好調　/　ボールタッチ・パスカットUP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p88',
    name: 'ブカヨ・サカ',
    readingName: 'ぶかよさか',
    category: 'FW',
    mainPosition: 'RW',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'イングランド',
    policy: 'ポゼッション',
    playStyle: 'ドリブラーRW',
    playStyleLevel: 'Ⅲ',
    overall: 7337,
    maxOverall: 15587,
    baseStats: { shoot: 1284, pass: 1280, dribble: 1428, defense: 1051, physical: 1170, speed: 916 },
    detailStats: {
      shoot: { finishing: 440, power: 409, composure: 435 },
      pass: { shortPass: 410, longPass: 416, accuracy: 454 },
      dribble: { breakout: 484, keeping: 466, ballTouch: 478 },
      defense: { tackle: 342, interception: 362, marking: 347 },
      physical: { jumping: 320, contact: 379, stamina: 471 },
      speed: { running: 449, agility: 467 }
    },
    maxEnhanced: {
      overall: 15587,
      baseStats: { shoot: 2841, pass: 2849, dribble: 3021, defense: 2560, physical: 2715, speed: 1986 },
      detailStats: {
        shoot: { finishing: 963, power: 920, composure: 958 },
        pass: { shortPass: 933, longPass: 939, accuracy: 977 },
        dribble: { breakout: 1019, keeping: 1001, ballTouch: 1001 },
        defense: { tackle: 853, interception: 861, marking: 846 },
        physical: { jumping: 831, contact: 890, stamina: 994 },
        speed: { running: 984, agility: 1002 }
      }
    },
    playTendencies: {
      attack: 2, defense: -1, dribble: 2, shoot: 1, longShoot: 0,
      shortPass: 0, longPass: -1, throughPass: 0, cutIn: 1, keep: 1,
      delay: -1, rushOut: 1, feint: 2, press: 0
    },
    skill: { name: 'ジャックナイフ', rank: '銀', description: '発動エリア：前左右　/　発動条件：ドリブル時　/　突破力・キープ力UP　/　成功時に自身のシュート発生確率UP' },
    abilities: [
      { name: 'ゴールに導くターン', rank: '金', description: '発動条件：好調　/　決定力・突破力・ボールタッチUP' },
      { name: '俊敏なタッチ', rank: '銀', description: '発動条件：絶好調　/　ボールタッチ・敏捷性UP' },
      { name: '高速のボールタッチ', rank: '銅', description: '発動条件：好調　/　ボールタッチ・走力UP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p89',
    name: 'ブラヒム・ディアス',
    readingName: 'ぶらひむでぃあす',
    category: 'FW',
    mainPosition: 'RW',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'モロッコ',
    policy: 'リアクション',
    playStyle: 'ドリブラーRW',
    playStyleLevel: 'Ⅱ',
    overall: 7111,
    maxOverall: 15368,
    baseStats: { shoot: 1182, pass: 1308, dribble: 1418, defense: 1074, physical: 911, speed: 895 },
    detailStats: {
      shoot: { finishing: 417, power: 356, composure: 409 },
      pass: { shortPass: 442, longPass: 438, accuracy: 428 },
      dribble: { breakout: 473, keeping: 472, ballTouch: 473 },
      defense: { tackle: 347, interception: 373, marking: 354 },
      physical: { jumping: 249, contact: 301, stamina: 361 },
      speed: { running: 422, agility: 473 }
    },
    maxEnhanced: {
      overall: 15368,
      baseStats: { shoot: 2739, pass: 2877, dribble: 3011, defense: 2583, physical: 2456, speed: 1965 },
      detailStats: {
        shoot: { finishing: 940, power: 867, composure: 932 },
        pass: { shortPass: 965, longPass: 961, accuracy: 951 },
        dribble: { breakout: 1008, keeping: 1007, ballTouch: 996 },
        defense: { tackle: 858, interception: 872, marking: 853 },
        physical: { jumping: 760, contact: 812, stamina: 884 },
        speed: { running: 957, agility: 1008 }
      }
    },
    playTendencies: {
      attack: 2, defense: -1, dribble: 2, shoot: 1, longShoot: 0,
      shortPass: 0, longPass: -1, throughPass: 0, cutIn: 1, keep: 1,
      delay: -1, rushOut: 1, feint: 2, press: 0
    },
    skill: { name: 'ピンポイントクロス', rank: '銀', description: '発動エリア：前左右　/　発動条件：AM・RW・LW・CFの選手へのショートパス時　/　ショートパス・キック精度・ロングパスUP　/　成功時に受け手のシュート発生確率UP' },
    abilities: [
      { name: '失わないドリブラー', rank: '銀', description: '発動条件：絶好調　/　突破力・キープ力UP' },
      { name: '俊敏なタッチ', rank: '銀', description: '発動条件：絶好調　/　ボールタッチ・敏捷性UP' },
      { name: 'ランニングキッカー', rank: '銅', description: '発動条件：絶好調　/　キック力・走力UP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p90',
    name: '李健和',
    readingName: 'りけんわ',
    category: 'FW',
    mainPosition: 'RW',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '香港',
    policy: 'カウンター',
    playStyle: 'ドリブラーRW',
    playStyleLevel: 'Ⅱ',
    overall: 7090,
    maxOverall: 15329,
    baseStats: { shoot: 1132, pass: 1307, dribble: 1413, defense: 1135, physical: 903, speed: 928 },
    detailStats: {
      shoot: { finishing: 381, power: 353, composure: 398 },
      pass: { shortPass: 449, longPass: 425, accuracy: 433 },
      dribble: { breakout: 461, keeping: 468, ballTouch: 484 },
      defense: { tackle: 358, interception: 390, marking: 387 },
      physical: { jumping: 281, contact: 335, stamina: 287 },
      speed: { running: 465, agility: 463 }
    },
    maxEnhanced: {
      overall: 15329,
      baseStats: { shoot: 2689, pass: 2876, dribble: 3006, defense: 2644, physical: 2448, speed: 1998 },
      detailStats: {
        shoot: { finishing: 904, power: 864, composure: 921 },
        pass: { shortPass: 972, longPass: 948, accuracy: 956 },
        dribble: { breakout: 996, keeping: 1003, ballTouch: 1007 },
        defense: { tackle: 869, interception: 889, marking: 886 },
        physical: { jumping: 792, contact: 846, stamina: 810 },
        speed: { running: 1000, agility: 998 }
      }
    },
    playTendencies: {
      attack: 2, defense: -1, dribble: 2, shoot: 1, longShoot: 0,
      shortPass: 0, longPass: -1, throughPass: 0, cutIn: 1, keep: 1,
      delay: -1, rushOut: 1, feint: 2, press: 0
    },
    skill: { name: 'スリップビート', rank: '銀', description: '発動エリア：前左右・中左右　/　発動条件：ドリブル時　/　突破力・キープ力UP　/　成功時に自身のショートパス発生確率UP' },
    abilities: [
      { name: '高速のボールタッチ', rank: '銀', description: '発動条件：好調　/　ボールタッチ・走力UP' },
      { name: 'アジャイルターゲット', rank: '銀', description: '発動条件：途中出場　/　キープ力・敏捷性UP' },
      { name: '切り裂くパサー', rank: '銅', description: '発動条件：絶好調　/　ショートパス・突破力UP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p91',
    name: 'ミゲル・アルミロン',
    readingName: 'みげるあるみろん',
    category: 'FW',
    mainPosition: 'RW',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'パラグアイ',
    policy: 'カウンター',
    playStyle: 'ドリブラーRW',
    playStyleLevel: 'Ⅱ',
    overall: 6689,
    maxOverall: 14898,
    baseStats: { shoot: 1091, pass: 1105, dribble: 1250, defense: 1131, physical: 1054, speed: 950 },
    detailStats: {
      shoot: { finishing: 376, power: 360, composure: 355 },
      pass: { shortPass: 368, longPass: 366, accuracy: 371 },
      dribble: { breakout: 435, keeping: 411, ballTouch: 404 },
      defense: { tackle: 394, interception: 386, marking: 351 },
      physical: { jumping: 248, contact: 352, stamina: 454 },
      speed: { running: 475, agility: 475 }
    },
    maxEnhanced: {
      overall: 14898,
      baseStats: { shoot: 2648, pass: 2674, dribble: 2843, defense: 2640, physical: 2599, speed: 2020 },
      detailStats: {
        shoot: { finishing: 899, power: 871, composure: 878 },
        pass: { shortPass: 891, longPass: 889, accuracy: 894 },
        dribble: { breakout: 970, keeping: 946, ballTouch: 927 },
        defense: { tackle: 905, interception: 885, marking: 850 },
        physical: { jumping: 759, contact: 863, stamina: 977 },
        speed: { running: 1010, agility: 1010 }
      }
    },
    playTendencies: {
      attack: 2, defense: -1, dribble: 2, shoot: 1, longShoot: 0,
      shortPass: 0, longPass: -1, throughPass: 0, cutIn: 1, keep: 1,
      delay: -1, rushOut: 1, feint: 2, press: 0
    },
    skill: { name: 'テクニカルドリブル', rank: '銅', description: '発動エリア：前左右・中左右　/　発動条件：ドリブル時　/　突破力・キープ力UP　/　成功時に自身のショートパス発生確率UP' },
    abilities: [
      { name: 'マラソンマン', rank: '銀', description: '発動条件：途中出場　/　スタミナ・走力UP' },
      { name: '懐の深いボールタッチ', rank: '銀', description: '発動条件：絶好調　/　キープ力・ボールタッチUP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p92',
    name: '伊東純也',
    readingName: 'いとうじゅんや',
    category: 'MF',
    mainPosition: 'RM',
    subPositions: ['RW'],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'カウンター',
    playStyle: 'ドリブラーRM',
    playStyleLevel: 'Ⅱ',
    overall: 7177,
    maxOverall: 15434,
    baseStats: { shoot: 1283, pass: 1278, dribble: 1344, defense: 1027, physical: 1069, speed: 936 },
    detailStats: {
      shoot: { finishing: 437, power: 406, composure: 440 },
      pass: { shortPass: 426, longPass: 425, accuracy: 427 },
      dribble: { breakout: 466, keeping: 433, ballTouch: 445 },
      defense: { tackle: 321, interception: 358, marking: 348 },
      physical: { jumping: 288, contact: 364, stamina: 417 },
      speed: { running: 483, agility: 453 }
    },
    maxEnhanced: {
      overall: 15434,
      baseStats: { shoot: 2840, pass: 2847, dribble: 2937, defense: 2536, physical: 2614, speed: 2006 },
      detailStats: {
        shoot: { finishing: 960, power: 917, composure: 963 },
        pass: { shortPass: 949, longPass: 948, accuracy: 950 },
        dribble: { breakout: 1001, keeping: 968, ballTouch: 968 },
        defense: { tackle: 832, interception: 857, marking: 847 },
        physical: { jumping: 799, contact: 875, stamina: 940 },
        speed: { running: 1018, agility: 988 }
      }
    },
    playTendencies: {
      attack: 2, defense: -1, dribble: 2, shoot: 1, longShoot: 0,
      shortPass: 0, longPass: -1, throughPass: 0, cutIn: 1, keep: 1,
      delay: -1, rushOut: 1, feint: 2, press: 0
    },
    skill: { name: 'スリップビート', rank: '銀', description: '発動エリア：前左右・中左右　/　発動条件：ドリブル時　/　突破力・キープ力UP　/　成功時に自身のショートパス発生確率UP' },
    abilities: [
      { name: '俊敏なドリブラー', rank: '銀', description: '発動条件：好調　/　突破力・敏捷性UP' },
      { name: 'ムービングターゲット', rank: '銀', description: '発動条件：絶好調　/　キープ力・走力UP' },
      { name: '冷静なボールタッチ', rank: '銅', description: '発動条件：絶好調　/　冷静さ・ボールタッチUP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p93',
    name: '堂安律',
    readingName: 'どうあんりつ',
    category: 'MF',
    mainPosition: 'RM',
    subPositions: ['AM'],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'カウンター',
    playStyle: 'ドリブラーRM',
    playStyleLevel: 'Ⅱ',
    overall: 7216,
    maxOverall: 15471,
    baseStats: { shoot: 1263, pass: 1219, dribble: 1385, defense: 1007, physical: 1180, speed: 920 },
    detailStats: {
      shoot: { finishing: 412, power: 439, composure: 412 },
      pass: { shortPass: 400, longPass: 404, accuracy: 415 },
      dribble: { breakout: 465, keeping: 456, ballTouch: 464 },
      defense: { tackle: 348, interception: 335, marking: 324 },
      physical: { jumping: 329, contact: 392, stamina: 459 },
      speed: { running: 447, agility: 473 }
    },
    maxEnhanced: {
      overall: 15471,
      baseStats: { shoot: 2820, pass: 2788, dribble: 2978, defense: 2516, physical: 2725, speed: 1990 },
      detailStats: {
        shoot: { finishing: 935, power: 950, composure: 935 },
        pass: { shortPass: 923, longPass: 927, accuracy: 938 },
        dribble: { breakout: 1000, keeping: 991, ballTouch: 987 },
        defense: { tackle: 859, interception: 834, marking: 823 },
        physical: { jumping: 840, contact: 903, stamina: 982 },
        speed: { running: 982, agility: 1008 }
      }
    },
    playTendencies: {
      attack: 2, defense: -1, dribble: 2, shoot: 1, longShoot: 0,
      shortPass: 0, longPass: -1, throughPass: 0, cutIn: 1, keep: 1,
      delay: -1, rushOut: 1, feint: 2, press: 0
    },
    skill: { name: 'コントロールショット', rank: '銀', description: '発動エリア：前中　/　発動条件：シュート時　/　決定力・キック力・冷静さUP' },
    abilities: [
      { name: '俊敏なドリブラー', rank: '銀', description: '発動条件：好調　/　突破力・敏捷性UP' },
      { name: '懐の深いボールタッチ', rank: '銀', description: '発動条件：絶好調　/　キープ力・ボールタッチUP' },
      { name: 'マラソンマン', rank: '銅', description: '発動条件：途中出場　/　スタミナ・走力UP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p94',
    name: 'フアン・クアドラード',
    readingName: 'ふあんくあどらーど',
    category: 'MF',
    mainPosition: 'RM',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'コロンビア',
    policy: 'ポゼッション',
    playStyle: 'ドリブラーRM',
    playStyleLevel: 'Ⅱ',
    overall: 6768,
    maxOverall: 15004,
    baseStats: { shoot: 1067, pass: 1345, dribble: 1381, defense: 1121, physical: 918, speed: 831 },
    detailStats: {
      shoot: { finishing: 369, power: 335, composure: 363 },
      pass: { shortPass: 459, longPass: 449, accuracy: 437 },
      dribble: { breakout: 456, keeping: 462, ballTouch: 463 },
      defense: { tackle: 393, interception: 367, marking: 361 },
      physical: { jumping: 254, contact: 329, stamina: 335 },
      speed: { running: 416, agility: 415 }
    },
    maxEnhanced: {
      overall: 15004,
      baseStats: { shoot: 2624, pass: 2914, dribble: 2974, defense: 2630, physical: 2463, speed: 1901 },
      detailStats: {
        shoot: { finishing: 892, power: 846, composure: 886 },
        pass: { shortPass: 982, longPass: 972, accuracy: 960 },
        dribble: { breakout: 991, keeping: 997, ballTouch: 986 },
        defense: { tackle: 904, interception: 866, marking: 860 },
        physical: { jumping: 765, contact: 840, stamina: 858 },
        speed: { running: 951, agility: 950 }
      }
    },
    playTendencies: {
      attack: 2, defense: -1, dribble: 2, shoot: 1, longShoot: 0,
      shortPass: 0, longPass: -1, throughPass: 0, cutIn: 1, keep: 1,
      delay: -1, rushOut: 1, feint: 2, press: 0
    },
    skill: { name: '高速クロス', rank: '銅', description: '発動エリア：前左右　/　発動条件：AM・RW・LW・CFの選手へのショートパス時　/　ショートパス・キック精度・ロングパスUP　/　成功時に受け手のシュート発生確率UP' },
    abilities: [
      { name: 'アジャイルターゲット', rank: '銀', description: '発動条件：途中出場　/　キープ力・敏捷性UP' },
      { name: '切り裂くパサー', rank: '銀', description: '発動条件：絶好調　/　ショートパス・突破力UP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p95',
    name: '三笘薫(日本代表)',
    readingName: 'みとまかおる',
    category: 'MF',
    mainPosition: 'LM',
    subPositions: ['AM'],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'カウンター',
    playStyle: 'ドリブラーLM',
    playStyleLevel: 'Ⅲ',
    overall: 7411,
    maxOverall: 15692,
    baseStats: { shoot: 1216, pass: 1254, dribble: 1442, defense: 1090, physical: 1204, speed: 937 },
    detailStats: {
      shoot: { finishing: 425, power: 366, composure: 425 },
      pass: { shortPass: 427, longPass: 426, accuracy: 401 },
      dribble: { breakout: 479, keeping: 475, ballTouch: 488 },
      defense: { tackle: 344, interception: 375, marking: 371 },
      physical: { jumping: 404, contact: 362, stamina: 438 },
      speed: { running: 473, agility: 464 }
    },
    maxEnhanced: {
      overall: 15692,
      baseStats: { shoot: 2773, pass: 2823, dribble: 3035, defense: 2599, physical: 2749, speed: 2007 },
      detailStats: {
        shoot: { finishing: 948, power: 877, composure: 948 },
        pass: { shortPass: 950, longPass: 949, accuracy: 924 },
        dribble: { breakout: 1014, keeping: 1010, ballTouch: 1011 },
        defense: { tackle: 855, interception: 874, marking: 870 },
        physical: { jumping: 915, contact: 873, stamina: 961 },
        speed: { running: 1008, agility: 999 }
      }
    },
    playTendencies: {
      attack: 2, defense: -1, dribble: 2, shoot: 1, longShoot: 0,
      shortPass: 0, longPass: -1, throughPass: 0, cutIn: 1, keep: 1,
      delay: -1, rushOut: 1, feint: 2, press: 0
    },
    skill: { name: '変速ギア', rank: '銀', description: '発動エリア：前中・中中　/　発動条件：ドリブル時　/　突破力・キープ力UP' },
    abilities: [
      { name: '変幻自在のドリブラー', rank: '金', description: '発動条件：好調　/　突破力・キープ力・ボールタッチUP' },
      { name: '無限のアジリティ', rank: '銀', description: '発動条件：好調　/　スタミナ・敏捷性UP' },
      { name: '快速のロングパサー', rank: '銅', description: '発動条件：絶好調　/　ロングパス・走力UP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p96',
    name: '中村敬斗',
    readingName: 'なかむらけいと',
    category: 'MF',
    mainPosition: 'LM',
    subPositions: ['LW'],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'カウンター',
    playStyle: 'ドリブラーLM',
    playStyleLevel: 'Ⅲ',
    overall: 7043,
    maxOverall: 15263,
    baseStats: { shoot: 1348, pass: 1272, dribble: 1366, defense: 876, physical: 1142, speed: 886 },
    detailStats: {
      shoot: { finishing: 452, power: 445, composure: 451 },
      pass: { shortPass: 416, longPass: 425, accuracy: 431 },
      dribble: { breakout: 449, keeping: 453, ballTouch: 464 },
      defense: { tackle: 301, interception: 294, marking: 281 },
      physical: { jumping: 330, contact: 381, stamina: 431 },
      speed: { running: 455, agility: 431 }
    },
    maxEnhanced: {
      overall: 15263,
      baseStats: { shoot: 2905, pass: 2841, dribble: 2959, defense: 2385, physical: 2687, speed: 1956 },
      detailStats: {
        shoot: { finishing: 975, power: 956, composure: 974 },
        pass: { shortPass: 939, longPass: 948, accuracy: 954 },
        dribble: { breakout: 984, keeping: 988, ballTouch: 987 },
        defense: { tackle: 812, interception: 793, marking: 780 },
        physical: { jumping: 841, contact: 892, stamina: 954 },
        speed: { running: 990, agility: 966 }
      }
    },
    playTendencies: {
      attack: 2, defense: -1, dribble: 2, shoot: 1, longShoot: 0,
      shortPass: 0, longPass: -1, throughPass: 0, cutIn: 1, keep: 1,
      delay: -1, rushOut: 1, feint: 2, press: 0
    },
    skill: { name: 'ジャックナイフ', rank: '銀', description: '発動エリア：前左右　/　発動条件：ドリブル時　/　突破力・キープ力UP　/　成功時に自身のシュート発生確率UP' },
    abilities: [
      { name: 'ムービングスナイパー', rank: '銀', description: '発動条件：好調　/　冷静さ・敏捷性UP' },
      { name: '裏への飛び出し', rank: '銀', description: '発動条件：途中出場　/　決定力・走力UP' },
      { name: '懐の深いボールタッチ', rank: '銅', description: '発動条件：絶好調　/　キープ力・ボールタッチUP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p97',
    name: 'ニコ・ウィリアムズ',
    readingName: 'にこうぃりあむず',
    category: 'FW',
    mainPosition: 'LW',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'スペイン',
    policy: 'カウンター',
    playStyle: 'ドリブラーLW',
    playStyleLevel: 'Ⅲ',
    overall: 7156,
    maxOverall: 15440,
    baseStats: { shoot: 1222, pass: 1260, dribble: 1404, defense: 964, physical: 1179, speed: 894 },
    detailStats: {
      shoot: { finishing: 402, power: 411, composure: 409 },
      pass: { shortPass: 426, longPass: 421, accuracy: 413 },
      dribble: { breakout: 466, keeping: 459, ballTouch: 479 },
      defense: { tackle: 294, interception: 342, marking: 328 },
      physical: { jumping: 363, contact: 405, stamina: 411 },
      speed: { running: 440, agility: 454 }
    },
    maxEnhanced: {
      overall: 15440,
      baseStats: { shoot: 2779, pass: 2829, dribble: 2997, defense: 2473, physical: 2724, speed: 1964 },
      detailStats: {
        shoot: { finishing: 925, power: 922, composure: 932 },
        pass: { shortPass: 949, longPass: 944, accuracy: 936 },
        dribble: { breakout: 1001, keeping: 994, ballTouch: 1002 },
        defense: { tackle: 805, interception: 841, marking: 827 },
        physical: { jumping: 874, contact: 916, stamina: 934 },
        speed: { running: 975, agility: 989 }
      }
    },
    playTendencies: {
      attack: 2, defense: -1, dribble: 2, shoot: 1, longShoot: 0,
      shortPass: 0, longPass: -1, throughPass: 0, cutIn: 1, keep: 1,
      delay: -1, rushOut: 1, feint: 2, press: 0
    },
    skill: { name: 'スリップビート', rank: '銀', description: '発動エリア：前左右・中左右　/　発動条件：ドリブル時　/　突破力・キープ力UP　/　成功時に自身のショートパス発生確率UP' },
    abilities: [
      { name: '懐の深いボールタッチ', rank: '銀', description: '発動条件：絶好調　/　キープ力・ボールタッチUP' },
      { name: '俊敏なドリブラー', rank: '銀', description: '発動条件：好調　/　突破力・敏捷性UP' },
      { name: '快速のロングパサー', rank: '銅', description: '発動条件：絶好調　/　ロングパス・走力UP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p98',
    name: '三笘薫(25/26)',
    readingName: 'みとまかおる',
    category: 'FW',
    mainPosition: 'LW',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'ポゼッション',
    playStyle: 'ドリブラーLW',
    playStyleLevel: 'Ⅱ',
    overall: 7089,
    maxOverall: 15326,
    baseStats: { shoot: 1162, pass: 1203, dribble: 1431, defense: 1081, physical: 1023, speed: 897 },
    detailStats: {
      shoot: { finishing: 407, power: 348, composure: 407 },
      pass: { shortPass: 410, longPass: 409, accuracy: 384 },
      dribble: { breakout: 473, keeping: 473, ballTouch: 485 },
      defense: { tackle: 341, interception: 372, marking: 368 },
      physical: { jumping: 316, contact: 286, stamina: 421 },
      speed: { running: 453, agility: 444 }
    },
    maxEnhanced: {
      overall: 15326,
      baseStats: { shoot: 2719, pass: 2772, dribble: 3024, defense: 2590, physical: 2568, speed: 1967 },
      detailStats: {
        shoot: { finishing: 930, power: 859, composure: 930 },
        pass: { shortPass: 933, longPass: 932, accuracy: 907 },
        dribble: { breakout: 1008, keeping: 1008, ballTouch: 1008 },
        defense: { tackle: 852, interception: 871, marking: 867 },
        physical: { jumping: 827, contact: 797, stamina: 944 },
        speed: { running: 988, agility: 979 }
      }
    },
    playTendencies: {
      attack: 2, defense: -1, dribble: 2, shoot: 1, longShoot: 0,
      shortPass: 0, longPass: -1, throughPass: 0, cutIn: 1, keep: 1,
      delay: -1, rushOut: 1, feint: 2, press: 0
    },
    skill: { name: 'スリップビート', rank: '銀', description: '発動エリア：前左右・中左右　/　発動条件：ドリブル時　/　突破力・キープ力UP　/　成功時に自身のショートパス発生確率UP' },
    abilities: [
      { name: '技巧派ドリブラー', rank: '銀', description: '発動条件：途中出場　/　突破力・ボールタッチUP' },
      { name: 'ムービングターゲット', rank: '銀', description: '発動条件：絶好調　/　キープ力・走力UP' },
      { name: '柔と剛のタッチ', rank: '銅', description: '発動条件：好調　/　キック力・ボールタッチUP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p99',
    name: 'ファン・ヒチャン',
    readingName: 'ふぁんひちゃん',
    category: 'FW',
    mainPosition: 'LW',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '韓国',
    policy: 'カウンター',
    playStyle: 'ドリブラーLW',
    playStyleLevel: 'Ⅱ',
    overall: 6668,
    maxOverall: 14904,
    baseStats: { shoot: 1310, pass: 1052, dribble: 1272, defense: 939, physical: 1115, speed: 864 },
    detailStats: {
      shoot: { finishing: 446, power: 423, composure: 441 },
      pass: { shortPass: 349, longPass: 349, accuracy: 354 },
      dribble: { breakout: 437, keeping: 435, ballTouch: 400 },
      defense: { tackle: 329, interception: 316, marking: 294 },
      physical: { jumping: 363, contact: 370, stamina: 382 },
      speed: { running: 426, agility: 438 }
    },
    maxEnhanced: {
      overall: 14904,
      baseStats: { shoot: 2867, pass: 2621, dribble: 2865, defense: 2448, physical: 2660, speed: 1934 },
      detailStats: {
        shoot: { finishing: 969, power: 934, composure: 964 },
        pass: { shortPass: 872, longPass: 872, accuracy: 877 },
        dribble: { breakout: 972, keeping: 970, ballTouch: 923 },
        defense: { tackle: 840, interception: 815, marking: 793 },
        physical: { jumping: 874, contact: 881, stamina: 905 },
        speed: { running: 961, agility: 973 }
      }
    },
    playTendencies: {
      attack: 2, defense: -1, dribble: 2, shoot: 1, longShoot: 0,
      shortPass: 0, longPass: -1, throughPass: 0, cutIn: 1, keep: 1,
      delay: -1, rushOut: 1, feint: 2, press: 0
    },
    skill: { name: '華麗なトラップ', rank: '銅', description: '発動エリア：前左右・中左右　/　発動条件：トラップ時　/　ボールタッチ・突破力UP　/　成功時に自身のドリブル発生確率UP' },
    abilities: [
      { name: 'アジャイルターゲット', rank: '銀', description: '発動条件：途中出場　/　キープ力・敏捷性UP' },
      { name: '強引なフィニッシュ', rank: '銀', description: '発動条件：途中出場　/　決定力・突破力UP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p100',
    name: 'ティボ・クルトワ',
    readingName: 'てぃぼくるとわ',
    category: 'GK',
    mainPosition: 'GK',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'ベルギー',
    policy: 'カウンター',
    playStyle: 'オーソドックスGK',
    playStyleLevel: 'Ⅱ',
    overall: 7530,
    maxOverall: 15920,
    baseStats: { shoot: 1092, pass: 1168, dribble: 1124, defense: 1446, physical: 1157, speed: 753 },
    detailStats: {
      shoot: { finishing: 372, power: 375, composure: 345 },
      pass: { shortPass: 360, longPass: 400, accuracy: 408 },
      dribble: { breakout: 395, keeping: 382, ballTouch: 347 },
      defense: { tackle: 488, interception: 481, marking: 477 },
      physical: { jumping: 469, contact: 406, stamina: 282 },
      speed: { running: 348, agility: 405 }
    },
    maxEnhanced: {
      overall: 15920,
      baseStats: { shoot: 2553, pass: 2773, dribble: 2585, defense: 3051, physical: 2750, speed: 1775 },
      detailStats: {
        shoot: { finishing: 859, power: 862, composure: 832 },
        pass: { shortPass: 895, longPass: 935, accuracy: 943 },
        dribble: { breakout: 882, keeping: 869, ballTouch: 834 },
        defense: { tackle: 1023, interception: 1016, marking: 1012 },
        physical: { jumping: 1004, contact: 941, stamina: 805 },
        speed: { running: 859, agility: 916 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -2, shoot: -1, longShoot: -1,
      shortPass: -1, longPass: 1, throughPass: -1, cutIn: -1, keep: -1,
      delay: -1, rushOut: -1, feint: -1, press: -1
    },
    skill: { name: 'エレガントセーブ', rank: '銀', description: '発動エリア：後中　/　発動条件：セービング時　/　セービング・反応速度UP' },
    abilities: [
      { name: '譲らない制空権', rank: '金', description: '発動条件：好調　/　セービング・1対1・ジャンプUP' },
      { name: '力強い反応', rank: '銀', description: '発動条件：絶好調　/　反応速度・コンタクトUP' },
      { name: '守護のロングキック', rank: '銅', description: '発動条件：絶好調　/　セービング・ロングパスUP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p101',
    name: 'ヤン・オブラク',
    readingName: 'やんおぶらく',
    category: 'GK',
    mainPosition: 'GK',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'スロベニア',
    policy: 'ポゼッション',
    playStyle: 'オーソドックスGK',
    playStyleLevel: 'Ⅱ',
    overall: 7286,
    maxOverall: 15619,
    baseStats: { shoot: 1060, pass: 1091, dribble: 1012, defense: 1436, physical: 1243, speed: 823 },
    detailStats: {
      shoot: { finishing: 347, power: 330, composure: 383 },
      pass: { shortPass: 305, longPass: 395, accuracy: 391 },
      dribble: { breakout: 364, keeping: 320, ballTouch: 328 },
      defense: { tackle: 471, interception: 483, marking: 482 },
      physical: { jumping: 445, contact: 408, stamina: 390 },
      speed: { running: 399, agility: 424 }
    },
    maxEnhanced: {
      overall: 15619,
      baseStats: { shoot: 2521, pass: 2696, dribble: 2473, defense: 3041, physical: 2836, speed: 1845 },
      detailStats: {
        shoot: { finishing: 834, power: 817, composure: 870 },
        pass: { shortPass: 840, longPass: 930, accuracy: 926 },
        dribble: { breakout: 851, keeping: 807, ballTouch: 815 },
        defense: { tackle: 1006, interception: 1018, marking: 1017 },
        physical: { jumping: 980, contact: 943, stamina: 913 },
        speed: { running: 910, agility: 935 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -2, shoot: -1, longShoot: -1,
      shortPass: -1, longPass: 1, throughPass: -1, cutIn: -1, keep: -1,
      delay: -1, rushOut: -1, feint: -1, press: -1
    },
    skill: { name: 'エレガントセーブ', rank: '銀', description: '発動エリア：後中　/　発動条件：セービング時　/　セービング・反応速度UP' },
    abilities: [
      { name: '広域の守護神', rank: '銀', description: '発動条件：好調　/　セービング・1VS1UP' },
      { name: '守勢のロングフィード', rank: '銀', description: '発動条件：絶好調　/　1VS1・ロングパスUP' },
      { name: '跳弾', rank: '銅', description: '発動条件：好調　/　キック精度・ジャンプUP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p102',
    name: '鈴木彩艶',
    readingName: 'すずきざいおん',
    category: 'GK',
    mainPosition: 'GK',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'カウンター',
    playStyle: 'オーソドックスGK',
    playStyleLevel: 'Ⅱ',
    overall: 7142,
    maxOverall: 15472,
    baseStats: { shoot: 917, pass: 1161, dribble: 1042, defense: 1357, physical: 1265, speed: 789 },
    detailStats: {
      shoot: { finishing: 286, power: 345, composure: 286 },
      pass: { shortPass: 362, longPass: 396, accuracy: 403 },
      dribble: { breakout: 346, keeping: 352, ballTouch: 344 },
      defense: { tackle: 464, interception: 457, marking: 436 },
      physical: { jumping: 448, contact: 447, stamina: 370 },
      speed: { running: 361, agility: 428 }
    },
    maxEnhanced: {
      overall: 15472,
      baseStats: { shoot: 2378, pass: 2766, dribble: 2503, defense: 2962, physical: 2858, speed: 1811 },
      detailStats: {
        shoot: { finishing: 773, power: 832, composure: 773 },
        pass: { shortPass: 897, longPass: 931, accuracy: 938 },
        dribble: { breakout: 833, keeping: 839, ballTouch: 831 },
        defense: { tackle: 999, interception: 992, marking: 971 },
        physical: { jumping: 983, contact: 982, stamina: 893 },
        speed: { running: 872, agility: 939 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -2, shoot: -1, longShoot: -1,
      shortPass: -1, longPass: 1, throughPass: -1, cutIn: -1, keep: -1,
      delay: -1, rushOut: -1, feint: -1, press: -1
    },
    skill: { name: 'エレガントセーブ', rank: '銀', description: '発動エリア：後中　/　発動条件：セービング時　/　セービング・反応速度UP' },
    abilities: [
      { name: '広域の守護神', rank: '銀', description: '発動条件：好調　/　セービング・1VS1UP' },
      { name: '力強い反応', rank: '銀', description: '発動条件：絶好調　/　反応速度・コンタクトUP' },
      { name: '俊敏なキッカー', rank: '銅', description: '発動条件：好調　/　キック精度・敏捷性UP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p103',
    name: 'マイク・メニャン',
    readingName: 'まいくめにゃん',
    category: 'GK',
    mainPosition: 'GK',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'フランス',
    policy: 'ポゼッション',
    playStyle: 'オーソドックスGK',
    playStyleLevel: 'Ⅱ',
    overall: 7061,
    maxOverall: 15403,
    baseStats: { shoot: 999, pass: 1245, dribble: 990, defense: 1372, physical: 1293, speed: 633 },
    detailStats: {
      shoot: { finishing: 305, power: 337, composure: 357 },
      pass: { shortPass: 393, longPass: 428, accuracy: 424 },
      dribble: { breakout: 318, keeping: 342, ballTouch: 330 },
      defense: { tackle: 434, interception: 469, marking: 469 },
      physical: { jumping: 424, contact: 427, stamina: 442 },
      speed: { running: 278, agility: 355 }
    },
    maxEnhanced: {
      overall: 15403,
      baseStats: { shoot: 2460, pass: 2850, dribble: 2451, defense: 2977, physical: 2886, speed: 1655 },
      detailStats: {
        shoot: { finishing: 792, power: 824, composure: 844 },
        pass: { shortPass: 928, longPass: 963, accuracy: 959 },
        dribble: { breakout: 805, keeping: 829, ballTouch: 817 },
        defense: { tackle: 969, interception: 1004, marking: 1004 },
        physical: { jumping: 959, contact: 962, stamina: 965 },
        speed: { running: 789, agility: 866 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -2, shoot: -1, longShoot: -1,
      shortPass: -1, longPass: 1, throughPass: -1, cutIn: -1, keep: -1,
      delay: -1, rushOut: -1, feint: -1, press: -1
    },
    skill: { name: '指令のロングフィード', rank: '銀', description: '発動エリア：中左中右・後左中右　/　発動条件：LW・RW・LM・RMの選手へのロングパス時　/　ロングパス・キック精度UP　/　成功時に受け手のトラップ発生確率UP' },
    abilities: [
      { name: '絶え間ない反応', rank: '銀', description: '発動条件：途中出場　/　反応速度・スタミナUP' },
      { name: '守勢のロングフィード', rank: '銀', description: '発動条件：絶好調　/　1VS1・ロングパスUP' },
      { name: '反復の飛び出し', rank: '銅', description: '発動条件：好調　/　1VS1・スタミナUP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p104',
    name: 'ヤン・ゾマー',
    readingName: 'やんぞまー',
    category: 'GK',
    mainPosition: 'GK',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'スイス',
    policy: 'リアクション',
    playStyle: 'オーソドックスGK',
    playStyleLevel: 'Ⅱ',
    overall: 7126,
    maxOverall: 15438,
    baseStats: { shoot: 920, pass: 1227, dribble: 1004, defense: 1372, physical: 1178, speed: 793 },
    detailStats: {
      shoot: { finishing: 309, power: 273, composure: 338 },
      pass: { shortPass: 386, longPass: 422, accuracy: 419 },
      dribble: { breakout: 351, keeping: 326, ballTouch: 327 },
      defense: { tackle: 420, interception: 476, marking: 476 },
      physical: { jumping: 431, contact: 391, stamina: 356 },
      speed: { running: 336, agility: 457 }
    },
    maxEnhanced: {
      overall: 15438,
      baseStats: { shoot: 2381, pass: 2832, dribble: 2465, defense: 2977, physical: 2771, speed: 1815 },
      detailStats: {
        shoot: { finishing: 796, power: 760, composure: 825 },
        pass: { shortPass: 921, longPass: 957, accuracy: 954 },
        dribble: { breakout: 838, keeping: 813, ballTouch: 814 },
        defense: { tackle: 955, interception: 1011, marking: 1011 },
        physical: { jumping: 966, contact: 926, stamina: 879 },
        speed: { running: 847, agility: 968 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -2, shoot: -1, longShoot: -1,
      shortPass: -1, longPass: 1, throughPass: -1, cutIn: -1, keep: -1,
      delay: -1, rushOut: -1, feint: -1, press: -1
    },
    skill: { name: 'エレガントセーブ', rank: '銀', description: '発動エリア：後中　/　発動条件：セービング時　/　セービング・反応速度UP' },
    abilities: [
      { name: '超反応', rank: '銀', description: '発動条件：絶好調　/　反応速度・敏捷性UP' },
      { name: '全方位への飛び出し', rank: '銀', description: '発動条件：途中出場　/　1VS1・ジャンプUP' },
      { name: '全方向の守護', rank: '銅', description: '発動条件：途中出場　/　反応速度・ジャンプUP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p105',
    name: 'ジョアン・ガルシア',
    readingName: 'じょあんがるしあ',
    category: 'GK',
    mainPosition: 'GK',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'スペイン',
    policy: 'ムービング',
    playStyle: 'オーソドックスGK',
    playStyleLevel: 'Ⅱ',
    overall: 6931,
    maxOverall: 15251,
    baseStats: { shoot: 1318, pass: 1062, dribble: 1251, defense: 853, physical: 1160, speed: 861 },
    detailStats: {
      shoot: { finishing: 459, power: 406, composure: 453 },
      pass: { shortPass: 366, longPass: 348, accuracy: 348 },
      dribble: { breakout: 409, keeping: 423, ballTouch: 419 },
      defense: { tackle: 258, interception: 281, marking: 314 },
      physical: { jumping: 383, contact: 382, stamina: 395 },
      speed: { running: 418, agility: 443 }
    },
    maxEnhanced: {
      overall: 15251,
      baseStats: { shoot: 2923, pass: 2595, dribble: 2832, defense: 2350, physical: 2741, speed: 1907 },
      detailStats: {
        shoot: { finishing: 994, power: 941, composure: 988 },
        pass: { shortPass: 877, longPass: 859, accuracy: 859 },
        dribble: { breakout: 932, keeping: 946, ballTouch: 954 },
        defense: { tackle: 757, interception: 780, marking: 813 },
        physical: { jumping: 906, contact: 917, stamina: 918 },
        speed: { running: 941, agility: 966 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -2, shoot: -1, longShoot: -1,
      shortPass: -1, longPass: 1, throughPass: -1, cutIn: -1, keep: -1,
      delay: -1, rushOut: -1, feint: -1, press: -1
    },
    skill: { name: 'エレガントセーブ', rank: '銀', description: '発動エリア：後中　/　発動条件：セービング時　/　セービング・反応速度UP' },
    abilities: [
      { name: '上空の守護神', rank: '銀', description: '発動条件：好調　/　セービング・ジャンプUP' },
      { name: '冷静沈着', rank: '銀', description: '発動条件：途中出場　/　反応速度・1VS1UP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p106',
    name: 'ニック・ポープ',
    readingName: 'にっくぽーぷ',
    category: 'GK',
    mainPosition: 'GK',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'イングランド',
    policy: 'カウンター',
    playStyle: 'オーソドックスGK',
    playStyleLevel: 'Ⅱ',
    overall: 6874,
    maxOverall: 15194,
    baseStats: { shoot: 980, pass: 810, dribble: 1147, defense: 1362, physical: 1166, speed: 804 },
    detailStats: {
      shoot: { finishing: 307, power: 351, composure: 322 },
      pass: { shortPass: 285, longPass: 268, accuracy: 257 },
      dribble: { breakout: 406, keeping: 378, ballTouch: 363 },
      defense: { tackle: 457, interception: 448, marking: 457 },
      physical: { jumping: 457, contact: 424, stamina: 285 },
      speed: { running: 350, agility: 454 }
    },
    maxEnhanced: {
      overall: 15194,
      baseStats: { shoot: 2441, pass: 2415, dribble: 2608, defense: 2967, physical: 2759, speed: 1826 },
      detailStats: {
        shoot: { finishing: 794, power: 838, composure: 809 },
        pass: { shortPass: 820, longPass: 803, accuracy: 792 },
        dribble: { breakout: 893, keeping: 865, ballTouch: 850 },
        defense: { tackle: 992, interception: 983, marking: 992 },
        physical: { jumping: 992, contact: 959, stamina: 808 },
        speed: { running: 861, agility: 965 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -2, shoot: -1, longShoot: -1,
      shortPass: -1, longPass: 1, throughPass: -1, cutIn: -1, keep: -1,
      delay: -1, rushOut: -1, feint: -1, press: -1
    },
    skill: { name: '驚異的なセービング', rank: '銅', description: '発動エリア：後中　/　発動条件：セービング時　/　セービング・反応速度UP' },
    abilities: [
      { name: '上空の守護神', rank: '銀', description: '発動条件：好調　/　セービング・ジャンプUP' },
      { name: '冷静沈着', rank: '銀', description: '発動条件：途中出場　/　反応速度・1VS1UP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p107',
    name: 'ブルーノ・ギマランイス',
    readingName: 'ぶるーのぎまらんいす',
    category: 'MF',
    mainPosition: 'DM',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'ブラジル',
    policy: 'リアクション',
    playStyle: 'ハードマーカー',
    playStyleLevel: 'Ⅱ',
    overall: 7453,
    maxOverall: 15682,
    baseStats: { shoot: 1189, pass: 1360, dribble: 1339, defense: 1408, physical: 1372, speed: 781 },
    detailStats: {
      shoot: { finishing: 388, power: 392, composure: 409 },
      pass: { shortPass: 455, longPass: 455, accuracy: 450 },
      dribble: { breakout: 435, keeping: 462, ballTouch: 442 },
      defense: { tackle: 462, interception: 482, marking: 464 },
      physical: { jumping: 442, contact: 460, stamina: 470 },
      speed: { running: 369, agility: 412 }
    },
    maxEnhanced: {
      overall: 15682,
      baseStats: { shoot: 2734, pass: 2965, dribble: 2872, defense: 2989, physical: 2941, speed: 1803 },
      detailStats: {
        shoot: { finishing: 899, power: 903, composure: 932 },
        pass: { shortPass: 990, longPass: 990, accuracy: 985 },
        dribble: { breakout: 946, keeping: 973, ballTouch: 953 },
        defense: { tackle: 997, interception: 1005, marking: 987 },
        physical: { jumping: 953, contact: 983, stamina: 1005 },
        speed: { running: 880, agility: 923 }
      }
    },
    playTendencies: {
      attack: 0, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 1, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '奪還', rank: '銀', description: '発動エリア：中左中右・後左中右　/　発動条件：タックル時　/　タックル・マーク・ショートパスUP　/　成功時に自身のショートパス発生確率UP' },
    abilities: [
      { name: 'ホットラインを断つ動き', rank: '金', description: '発動条件：好調　/　タックル・パスカット・スタミナUP' },
      { name: '精緻なパサー', rank: '銀', description: '発動条件：絶好調　/　ショートパス・キック精度UP' },
      { name: 'リスクヘッジロングパサー', rank: '銅', description: '発動条件：途中出場　/　ロングパス・マークUP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p108',
    name: 'ハフィーニャ',
    readingName: 'はふぃーにゃ',
    category: 'MF',
    mainPosition: 'AM',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'ブラジル',
    policy: 'リアクション',
    playStyle: 'アタッカー',
    playStyleLevel: 'Ⅱ',
    overall: 7564,
    maxOverall: 15700,
    baseStats: { shoot: 1392, pass: 1342, dribble: 1431, defense: 1139, physical: 1264, speed: 964 },
    detailStats: {
      shoot: { finishing: 490, power: 435, composure: 467 },
      pass: { shortPass: 443, longPass: 447, accuracy: 452 },
      dribble: { breakout: 480, keeping: 476, ballTouch: 475 },
      defense: { tackle: 402, interception: 377, marking: 360 },
      physical: { jumping: 378, contact: 423, stamina: 463 },
      speed: { running: 490, agility: 474 }
    },
    maxEnhanced: {
      overall: 15700,
      baseStats: { shoot: 2937, pass: 2923, dribble: 3000, defense: 2684, physical: 2833, speed: 1998 },
      detailStats: {
        shoot: { finishing: 1001, power: 946, composure: 990 },
        pass: { shortPass: 978, longPass: 970, accuracy: 975 },
        dribble: { breakout: 1003, keeping: 999, ballTouch: 998 },
        defense: { tackle: 925, interception: 888, marking: 871 },
        physical: { jumping: 889, contact: 946, stamina: 998 },
        speed: { running: 1001, agility: 997 }
      }
    },
    playTendencies: {
      attack: 0, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 1, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: 'ルミナストラップ', rank: '銀', description: '発動エリア：前中・中中　/　発動条件：トラップ時　/　ボールタッチ・キープ力UP　/　成功時に自身のシュート発生確率UP' },
    abilities: [
      { name: 'ゴールに導くターン', rank: '金', description: '発動条件：好調　/　決定力・突破力・ボールタッチUP' },
      { name: 'ムービングターゲット', rank: '銀', description: '発動条件：絶好調　/　キープ力・走力UP' },
      { name: 'マラソンマン', rank: '銅', description: '発動条件：途中出場　/　スタミナ・走力UP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p109',
    name: 'ロドリゴ',
    readingName: 'ろどりご',
    category: 'FW',
    mainPosition: 'RW',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'ブラジル',
    policy: 'リアクション',
    playStyle: 'ドリブラーRW',
    playStyleLevel: 'Ⅱ',
    overall: 7297,
    maxOverall: 15532,
    baseStats: { shoot: 1384, pass: 1247, dribble: 1406, defense: 916, physical: 1240, speed: 905 },
    detailStats: {
      shoot: { finishing: 464, power: 443, composure: 477 },
      pass: { shortPass: 416, longPass: 408, accuracy: 423 },
      dribble: { breakout: 478, keeping: 476, ballTouch: 452 },
      defense: { tackle: 295, interception: 322, marking: 299 },
      physical: { jumping: 388, contact: 426, stamina: 426 },
      speed: { running: 442, agility: 463 }
    },
    maxEnhanced: {
      overall: 15532,
      baseStats: { shoot: 2941, pass: 2816, dribble: 2999, defense: 2425, physical: 2785, speed: 1975 },
      detailStats: {
        shoot: { finishing: 987, power: 954, composure: 1000 },
        pass: { shortPass: 939, longPass: 931, accuracy: 946 },
        dribble: { breakout: 1013, keeping: 1011, ballTouch: 975 },
        defense: { tackle: 806, interception: 821, marking: 798 },
        physical: { jumping: 899, contact: 937, stamina: 949 },
        speed: { running: 977, agility: 998 }
      }
    },
    playTendencies: {
      attack: 2, defense: -1, dribble: 2, shoot: 1, longShoot: 0,
      shortPass: 0, longPass: -1, throughPass: 0, cutIn: 1, keep: 1,
      delay: -1, rushOut: 1, feint: 2, press: 0
    },
    skill: { name: 'ジャックナイフ', rank: '銀', description: '発動エリア：前左右　/　発動条件：ドリブル時　/　突破力・キープ力UP　/　成功時に自身のシュート発生確率UP' },
    abilities: [
      { name: '冷静な突破', rank: '銀', description: '発動条件：絶好調　/　冷静さ・突破力UP' },
      { name: 'ターゲットマン', rank: '銀', description: '発動条件：途中出場　/　決定力・キープ力UP' },
      { name: 'スピードランナー', rank: '銅', description: '発動条件：途中出場　/　走力・敏捷性UP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p110',
    name: 'ブレーメル',
    readingName: 'ぶれーめる',
    category: 'DF',
    mainPosition: 'CB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'ブラジル',
    policy: 'リアクション',
    playStyle: 'ストッパー',
    playStyleLevel: 'Ⅱ',
    overall: 7276,
    maxOverall: 15568,
    baseStats: { shoot: 1208, pass: 1112, dribble: 1120, defense: 1413, physical: 1365, speed: 798 },
    detailStats: {
      shoot: { finishing: 374, power: 423, composure: 411 },
      pass: { shortPass: 386, longPass: 376, accuracy: 350 },
      dribble: { breakout: 357, keeping: 358, ballTouch: 405 },
      defense: { tackle: 475, interception: 469, marking: 469 },
      physical: { jumping: 481, contact: 454, stamina: 430 },
      speed: { running: 429, agility: 369 }
    },
    maxEnhanced: {
      overall: 15568,
      baseStats: { shoot: 2705, pass: 2681, dribble: 2653, defense: 3018, physical: 2958, speed: 1844 },
      detailStats: {
        shoot: { finishing: 873, power: 922, composure: 910 },
        pass: { shortPass: 909, longPass: 899, accuracy: 873 },
        dribble: { breakout: 868, keeping: 869, ballTouch: 916 },
        defense: { tackle: 1010, interception: 1004, marking: 1004 },
        physical: { jumping: 1016, contact: 989, stamina: 953 },
        speed: { running: 952, agility: 892 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -1, shoot: -1, longShoot: -1,
      shortPass: 0, longPass: 0, throughPass: -1, cutIn: -1, keep: -1,
      delay: 0, rushOut: -1, feint: -1, press: 1
    },
    skill: { name: 'チェーンカッター', rank: '銀', description: '発動エリア：中左中右・後左中右　/　発動条件：タックル時　/　タックル・コンタクト・マークUP' },
    abilities: [
      { name: 'エアバトラー', rank: '銀', description: '発動条件：絶好調　/　タックル・ジャンプUP' },
      { name: 'インターセプター', rank: '銀', description: '発動条件：好調　/　パスカット・マークUP' },
      { name: 'ムービングウォール', rank: '銅', description: '発動条件：絶好調　/　コンタクト・スタミナUP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p111',
    name: '河本鬼茂',
    readingName: 'かわもとおにしげ',
    category: 'FW',
    mainPosition: 'CF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'カウンター',
    playStyle: 'ストライカー',
    playStyleLevel: 'Ⅲ',
    overall: 6156,
    maxOverall: 12089,
    baseStats: { shoot: 1240, pass: 987, dribble: 1161, defense: 934, physical: 1171, speed: 813 },
    detailStats: {
      shoot: { finishing: 416, power: 387, composure: 437 },
      pass: { shortPass: 328, longPass: 260, accuracy: 399 },
      dribble: { breakout: 348, keeping: 425, ballTouch: 388 },
      defense: { tackle: 328, interception: 292, marking: 314 },
      physical: { jumping: 425, contact: 407, stamina: 339 },
      speed: { running: 387, agility: 426 }
    },
    maxEnhanced: {
      overall: 12089,
      baseStats: { shoot: 2305, pass: 1980, dribble: 2202, defense: 1891, physical: 2212, speed: 1499 },
      detailStats: {
        shoot: { finishing: 771, power: 742, composure: 792 },
        pass: { shortPass: 659, longPass: 591, accuracy: 730 },
        dribble: { breakout: 691, keeping: 768, ballTouch: 743 },
        defense: { tackle: 647, interception: 611, marking: 633 },
        physical: { jumping: 768, contact: 762, stamina: 682 },
        speed: { running: 730, agility: 769 }
      }
    },
    playTendencies: {
      attack: 1, defense: -1, dribble: 0, shoot: 1, longShoot: 0,
      shortPass: 0, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: -1, rushOut: 0, feint: 0, press: -1
    },
    skill: { name: '点で合わせるシュート', rank: '銅', description: '発動エリア：前中　/　発動条件：シュート時　/　決定力・キック力・冷静さUP' },
    abilities: [
      { name: '決めきる力', rank: '銀', description: '発動条件：途中出場　/　決定力・スタミナUP' },
      { name: 'ムービングターゲット', rank: '銅', description: '発動条件：絶好調　/　キープ力・走力UP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p112',
    name: 'リオネル・メッシ(配布)',
    readingName: 'りおねるめっしはいふ',
    category: 'FW',
    mainPosition: 'RW',
    subPositions: ['CF'],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'アルゼンチン',
    policy: 'リアクション',
    playStyle: 'ドリブラーRW',
    playStyleLevel: 'Ⅱ',
    overall: 6103,
    maxOverall: 11910,
    baseStats: { shoot: 1281, pass: 1302, dribble: 1338, defense: 695, physical: 807, speed: 694 },
    detailStats: {
      shoot: { finishing: 439, power: 403, composure: 439 },
      pass: { shortPass: 434, longPass: 434, accuracy: 434 },
      dribble: { breakout: 442, keeping: 442, ballTouch: 454 },
      defense: { tackle: 236, interception: 242, marking: 217 },
      physical: { jumping: 242, contact: 286, stamina: 279 },
      speed: { running: 286, agility: 408 }
    },
    maxEnhanced: {
      overall: 11910,
      baseStats: { shoot: 2298, pass: 2331, dribble: 2391, defense: 1664, physical: 1812, speed: 1414 },
      detailStats: {
        shoot: { finishing: 782, power: 734, composure: 782 },
        pass: { shortPass: 777, longPass: 777, accuracy: 777 },
        dribble: { breakout: 797, keeping: 797, ballTouch: 797 },
        defense: { tackle: 567, interception: 561, marking: 536 },
        physical: { jumping: 573, contact: 617, stamina: 622 },
        speed: { running: 651, agility: 763 }
      }
    },
    playTendencies: {
      attack: 2, defense: -1, dribble: 2, shoot: 1, longShoot: 0,
      shortPass: 0, longPass: -1, throughPass: 0, cutIn: 1, keep: 1,
      delay: -1, rushOut: 1, feint: 2, press: 0
    },
    skill: { name: '切り裂くドリブル', rank: '銅', description: '発動エリア：前左右　/　発動条件：ドリブル時　/　突破力・キープ力UP　/　成功時に自身のシュート発生確率UP' },
    abilities: [
      { name: 'ゴール前の落ち着き', rank: '銀', description: '発動条件：好調　/　決定力・ボールタッチUP' },
      { name: '切り裂くパサー', rank: '銅', description: '発動条件：絶好調　/　ショートパス・突破力UP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p113',
    name: '相馬勇紀(J1 BEST11 2025)',
    readingName: 'そうまゆうき',
    category: 'MF',
    mainPosition: 'AM',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'カウンター',
    playStyle: 'アタッカー',
    playStyleLevel: 'Ⅱ',
    overall: 6391,
    maxOverall: 15217,
    baseStats: { shoot: 1220, pass: 1183, dribble: 1251, defense: 940, physical: 987, speed: 793 },
    detailStats: {
      shoot: { finishing: 419, power: 403, composure: 398 },
      pass: { shortPass: 376, longPass: 394, accuracy: 413 },
      dribble: { breakout: 420, keeping: 408, ballTouch: 423 },
      defense: { tackle: 294, interception: 331, marking: 315 },
      physical: { jumping: 308, contact: 322, stamina: 357 },
      speed: { running: 364, agility: 429 }
    },
    maxEnhanced: {
      overall: 15217,
      baseStats: { shoot: 2765, pass: 2764, dribble: 2820, defense: 2485, physical: 2556, speed: 1827 },
      detailStats: {
        shoot: { finishing: 930, power: 914, composure: 921 },
        pass: { shortPass: 911, longPass: 917, accuracy: 936 },
        dribble: { breakout: 943, keeping: 931, ballTouch: 946 },
        defense: { tackle: 817, interception: 842, marking: 826 },
        physical: { jumping: 819, contact: 845, stamina: 892 },
        speed: { running: 875, agility: 952 }
      }
    },
    playTendencies: {
      attack: 0, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 1, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '強引な中央突破', rank: '銅', description: '発動エリア：前中・中中　/　発動条件：ドリブル時　/　突破力・キープ力UP' },
    abilities: [
      { name: '強引なフィニッシュ', rank: '銀', description: '発動条件：途中出場　/　決定力・突破力UP' },
      { name: '俊敏なタッチ', rank: '銀', description: '発動条件：絶好調　/　ボールタッチ・敏捷性UP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p114',
    name: 'ラファエル・エリアス(J1 BEST11 2025)',
    readingName: 'らふぁえるえりあす',
    category: 'MF',
    mainPosition: 'AM',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'ブラジル',
    policy: 'カウンター',
    playStyle: 'アタッカー',
    playStyleLevel: 'Ⅱ',
    overall: 6318,
    maxOverall: 14560,
    baseStats: { shoot: 1236, pass: 1008, dribble: 1135, defense: 878, physical: 1135, speed: 774 },
    detailStats: {
      shoot: { finishing: 424, power: 395, composure: 417 },
      pass: { shortPass: 331, longPass: 317, accuracy: 360 },
      dribble: { breakout: 388, keeping: 392, ballTouch: 355 },
      defense: { tackle: 282, interception: 302, marking: 294 },
      physical: { jumping: 392, contact: 373, stamina: 370 },
      speed: { running: 379, agility: 395 }
    },
    maxEnhanced: {
      overall: 14560,
      baseStats: { shoot: 2841, pass: 2541, dribble: 2716, defense: 2375, physical: 2716, speed: 1820 },
      detailStats: {
        shoot: { finishing: 959, power: 930, composure: 952 },
        pass: { shortPass: 842, longPass: 828, accuracy: 871 },
        dribble: { breakout: 911, keeping: 915, ballTouch: 890 },
        defense: { tackle: 781, interception: 801, marking: 793 },
        physical: { jumping: 915, contact: 908, stamina: 893 },
        speed: { running: 902, agility: 918 }
      }
    },
    playTendencies: {
      attack: 1, defense: -1, dribble: 0, shoot: 1, longShoot: 0,
      shortPass: 0, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: -1, rushOut: 0, feint: 0, press: -1
    },
    skill: { name: '狙いすましたシュート', rank: '銅', description: '発動エリア：前中　/　発動条件：シュート時　/　決定力・キック力・冷静さUP' },
    abilities: [
      { name: '強引なフィニッシュ', rank: '銀', description: '発動条件：途中出場　/　決定力・突破力UP' },
      { name: '保持からの一撃', rank: '銀', description: '発動条件：途中出場　/　キック力・キープ力UP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p115',
    name: 'レオ・セアラ(J1 BEST11 2025)',
    readingName: 'れおせあら',
    category: 'FW',
    mainPosition: 'CF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'ブラジル',
    policy: 'リアクション',
    playStyle: 'ラインブレーカー',
    playStyleLevel: 'Ⅱ',
    overall: 6257,
    maxOverall: 14471,
    baseStats: { shoot: 1207, pass: 1021, dribble: 1113, defense: 893, physical: 1154, speed: 767 },
    detailStats: {
      shoot: { finishing: 412, power: 387, composure: 408 },
      pass: { shortPass: 352, longPass: 336, accuracy: 333 },
      dribble: { breakout: 366, keeping: 368, ballTouch: 379 },
      defense: { tackle: 303, interception: 303, marking: 287 },
      physical: { jumping: 364, contact: 389, stamina: 401 },
      speed: { running: 377, agility: 390 }
    },
    maxEnhanced: {
      overall: 14471,
      baseStats: { shoot: 2812, pass: 2554, dribble: 2694, defense: 2390, physical: 2735, speed: 1813 },
      detailStats: {
        shoot: { finishing: 947, power: 922, composure: 943 },
        pass: { shortPass: 863, longPass: 847, accuracy: 844 },
        dribble: { breakout: 889, keeping: 891, ballTouch: 914 },
        defense: { tackle: 802, interception: 802, marking: 786 },
        physical: { jumping: 887, contact: 924, stamina: 924 },
        speed: { running: 900, agility: 913 }
      }
    },
    playTendencies: {
      attack: 2, defense: -1, dribble: 0, shoot: 2, longShoot: 1,
      shortPass: -1, longPass: -1, throughPass: -1, cutIn: 0, keep: -1,
      delay: -1, rushOut: 2, feint: 0, press: 0
    },
    skill: { name: '点で合わせるシュート', rank: '銅', description: '発動エリア：前中　/　発動条件：シュート時　/　決定力・キック力・冷静さUP' },
    abilities: [
      { name: '力強いフィニッシュ', rank: '銀', description: '発動条件：好調　/　決定力・コンタクトUP' },
      { name: 'ムービングスナイパー', rank: '銀', description: '発動条件：好調　/　冷静さ・敏捷性UP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p116',
    name: '伊藤達哉(J1 BEST11 2025)',
    readingName: 'いとうたつや',
    category: 'FW',
    mainPosition: 'LW',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'ポゼッション',
    playStyle: 'ドリブラーLW',
    playStyleLevel: 'Ⅱ',
    overall: 6291,
    maxOverall: 14508,
    baseStats: { shoot: 1184, pass: 1024, dribble: 1249, defense: 883, physical: 757, speed: 808 },
    detailStats: {
      shoot: { finishing: 391, power: 368, composure: 425 },
      pass: { shortPass: 356, longPass: 347, accuracy: 321 },
      dribble: { breakout: 431, keeping: 425, ballTouch: 393 },
      defense: { tackle: 259, interception: 301, marking: 323 },
      physical: { jumping: 185, contact: 199, stamina: 373 },
      speed: { running: 361, agility: 447 }
    },
    maxEnhanced: {
      overall: 14508,
      baseStats: { shoot: 2741, pass: 2593, dribble: 2842, defense: 2392, physical: 2302, speed: 1878 },
      detailStats: {
        shoot: { finishing: 914, power: 879, composure: 948 },
        pass: { shortPass: 879, longPass: 870, accuracy: 844 },
        dribble: { breakout: 966, keeping: 960, ballTouch: 916 },
        defense: { tackle: 770, interception: 800, marking: 822 },
        physical: { jumping: 696, contact: 710, stamina: 896 },
        speed: { running: 896, agility: 982 }
      }
    },
    playTendencies: {
      attack: 2, defense: -1, dribble: 2, shoot: 1, longShoot: 0,
      shortPass: 0, longPass: -1, throughPass: 0, cutIn: 1, keep: 1,
      delay: -1, rushOut: 1, feint: 2, press: 0
    },
    skill: { name: '狙いすましたシュート', rank: '銅', description: '発動エリア：前中　/　発動条件：シュート時　/　決定力・キック力・冷静さUP' },
    abilities: [
      { name: 'ゴール前の嗅覚', rank: '銀', description: '発動条件：絶好調　/　決定力・敏捷性UP' },
      { name: '失わないドリブラー', rank: '銀', description: '発動条件：絶好調　/　突破力・キープ力UP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p117',
    name: '小泉佳穂(J1 BEST11 2025)',
    readingName: 'こいずみよしお',
    category: 'MF',
    mainPosition: 'AM',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'ムービング',
    playStyle: 'パサーAM',
    playStyleLevel: 'Ⅱ',
    overall: 6233,
    maxOverall: 14375,
    baseStats: { shoot: 1181, pass: 1210, dribble: 1207, defense: 983, physical: 1138, speed: 701 },
    detailStats: {
      shoot: { finishing: 396, power: 401, composure: 384 },
      pass: { shortPass: 409, longPass: 404, accuracy: 397 },
      dribble: { breakout: 390, keeping: 405, ballTouch: 412 },
      defense: { tackle: 344, interception: 333, marking: 306 },
      physical: { jumping: 354, contact: 383, stamina: 401 },
      speed: { running: 335, agility: 366 }
    },
    maxEnhanced: {
      overall: 14375,
      baseStats: { shoot: 2726, pass: 2791, dribble: 2776, defense: 2528, physical: 2707, speed: 1735 },
      detailStats: {
        shoot: { finishing: 907, power: 912, composure: 907 },
        pass: { shortPass: 944, longPass: 927, accuracy: 920 },
        dribble: { breakout: 913, keeping: 928, ballTouch: 935 },
        defense: { tackle: 867, interception: 844, marking: 817 },
        physical: { jumping: 865, contact: 906, stamina: 936 },
        speed: { running: 846, agility: 889 }
      }
    },
    playTendencies: {
      attack: 0, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 1, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '敵陣を切り裂くパス', rank: '銅', description: '発動エリア：前中・中中　/　発動条件：CFの位置に居る選手へのショートパス時　/　ショートパス・キック精度UP　/　成功時に受け手のシュート発生確率UP' },
    abilities: [
      { name: '不屈のパサー', rank: '銀', description: '発動条件：途中出場　/　ショートパス・スタミナUP' },
      { name: '冷静なキッカー', rank: '銀', description: '発動条件：絶好調　/　冷静さ・キック精度UP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p118',
    name: '稲垣祥(J1 BEST11 2025)',
    readingName: 'いながきしょう',
    category: 'MF',
    mainPosition: 'DM',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'カウンター',
    playStyle: 'セントラルDM',
    playStyleLevel: 'Ⅱ',
    overall: 6286,
    maxOverall: 14453,
    baseStats: { shoot: 1133, pass: 1061, dribble: 1163, defense: 1121, physical: 1155, speed: 782 },
    detailStats: {
      shoot: { finishing: 377, power: 380, composure: 376 },
      pass: { shortPass: 369, longPass: 341, accuracy: 351 },
      dribble: { breakout: 386, keeping: 377, ballTouch: 400 },
      defense: { tackle: 357, interception: 409, marking: 355 },
      physical: { jumping: 347, contact: 346, stamina: 462 },
      speed: { running: 372, agility: 410 }
    },
    maxEnhanced: {
      overall: 14453,
      baseStats: { shoot: 2678, pass: 2666, dribble: 2696, defense: 2702, physical: 2724, speed: 1804 },
      detailStats: {
        shoot: { finishing: 888, power: 891, composure: 899 },
        pass: { shortPass: 904, longPass: 876, accuracy: 886 },
        dribble: { breakout: 897, keeping: 888, ballTouch: 911 },
        defense: { tackle: 892, interception: 932, marking: 878 },
        physical: { jumping: 858, contact: 869, stamina: 997 },
        speed: { running: 883, agility: 921 }
      }
    },
    playTendencies: {
      attack: 0, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 1, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '確信のロングシュート', rank: '銅', description: '発動エリア：前中・中中　/　発動条件：シュート・ロングシュート時　/　決定力・キック力UP' },
    abilities: [
      { name: '絶え間ないボールタッチ', rank: '銀', description: '発動条件：途中出場　/　ボールタッチ・スタミナUP' },
      { name: 'ダイナミックカッター', rank: '銀', description: '発動条件：好調　/　キック力・パスカットUP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p119',
    name: '田中聡(J1 BEST11 2025)',
    readingName: 'たなかさとし',
    category: 'MF',
    mainPosition: 'DM',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'ムービング',
    playStyle: 'パサーDM',
    playStyleLevel: 'Ⅱ',
    overall: 6322,
    maxOverall: 14490,
    baseStats: { shoot: 965, pass: 1215, dribble: 1275, defense: 1117, physical: 1125, speed: 817 },
    detailStats: {
      shoot: { finishing: 318, power: 322, composure: 325 },
      pass: { shortPass: 419, longPass: 414, accuracy: 382 },
      dribble: { breakout: 400, keeping: 433, ballTouch: 442 },
      defense: { tackle: 367, interception: 377, marking: 373 },
      physical: { jumping: 389, contact: 353, stamina: 383 },
      speed: { running: 395, agility: 422 }
    },
    maxEnhanced: {
      overall: 14490,
      baseStats: { shoot: 2510, pass: 2820, dribble: 2808, defense: 2698, physical: 2694, speed: 1839 },
      detailStats: {
        shoot: { finishing: 829, power: 833, composure: 848 },
        pass: { shortPass: 954, longPass: 949, accuracy: 917 },
        dribble: { breakout: 911, keeping: 944, ballTouch: 953 },
        defense: { tackle: 902, interception: 900, marking: 896 },
        physical: { jumping: 900, contact: 876, stamina: 918 },
        speed: { running: 906, agility: 933 }
      }
    },
    playTendencies: {
      attack: 0, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 1, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '意外性のあるミドルパス', rank: '銅', description: '発動エリア：中中・後左中右　/　発動条件：CF・AMの選手へのショートパス・ロングパス時　/　ロングパス・キック精度・ショートパスUP　/　成功時に受け手のショートパス発生確率UP' },
    abilities: [
      { name: '懐の深いパサー', rank: '銀', description: '発動条件：絶好調　/　ショートパス・キープ力UP' },
      { name: '機敏なロングパサー', rank: '銀', description: '発動条件：好調　/　ロングパス・敏捷性UP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p120',
    name: '荒木隼人(J1 BEST11 2025)',
    readingName: 'あらきはやと',
    category: 'DF',
    mainPosition: 'CB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'ムービング',
    playStyle: 'ストッパー',
    playStyleLevel: 'Ⅱ',
    overall: 6262,
    maxOverall: 14534,
    baseStats: { shoot: 975, pass: 1024, dribble: 937, defense: 1206, physical: 1216, speed: 627 },
    detailStats: {
      shoot: { finishing: 327, power: 337, composure: 311 },
      pass: { shortPass: 340, longPass: 340, accuracy: 344 },
      dribble: { breakout: 290, keeping: 296, ballTouch: 351 },
      defense: { tackle: 386, interception: 411, marking: 409 },
      physical: { jumping: 404, contact: 434, stamina: 378 },
      speed: { running: 317, agility: 310 }
    },
    maxEnhanced: {
      overall: 14534,
      baseStats: { shoot: 2472, pass: 2593, dribble: 2470, defense: 2811, physical: 2809, speed: 1673 },
      detailStats: {
        shoot: { finishing: 826, power: 836, composure: 810 },
        pass: { shortPass: 863, longPass: 863, accuracy: 867 },
        dribble: { breakout: 801, keeping: 807, ballTouch: 862 },
        defense: { tackle: 921, interception: 946, marking: 944 },
        physical: { jumping: 939, contact: 969, stamina: 901 },
        speed: { running: 840, agility: 833 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -1, shoot: -1, longShoot: -1,
      shortPass: 0, longPass: 0, throughPass: -1, cutIn: -1, keep: -1,
      delay: 0, rushOut: -1, feint: -1, press: 1
    },
    skill: { name: '鋭角的なタックル', rank: '銅', description: '発動エリア：中左中右・後左中右　/　発動条件：タックル時　/　タックル・コンタクト・マークUP' },
    abilities: [
      { name: '瞬間の球際力', rank: '銀', description: '発動条件：好調　/　パスカット・コンタクトUP' },
      { name: 'ハイタワーの天敵', rank: '銀', description: '発動条件：好調　/　マーク・ジャンプUP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p121',
    name: '古賀太陽(J1 BEST11 2025)',
    readingName: 'こがたいよう',
    category: 'DF',
    mainPosition: 'CB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'ムービング',
    playStyle: '組立CB',
    playStyleLevel: 'Ⅱ',
    overall: 6185,
    maxOverall: 14441,
    baseStats: { shoot: 1074, pass: 1089, dribble: 1088, defense: 1192, physical: 1130, speed: 694 },
    detailStats: {
      shoot: { finishing: 354, power: 370, composure: 350 },
      pass: { shortPass: 378, longPass: 384, accuracy: 327 },
      dribble: { breakout: 369, keeping: 358, ballTouch: 361 },
      defense: { tackle: 376, interception: 410, marking: 406 },
      physical: { jumping: 353, contact: 384, stamina: 393 },
      speed: { running: 363, agility: 331 }
    },
    maxEnhanced: {
      overall: 14441,
      baseStats: { shoot: 2571, pass: 2658, dribble: 2621, defense: 2797, physical: 2723, speed: 1740 },
      detailStats: {
        shoot: { finishing: 853, power: 869, composure: 849 },
        pass: { shortPass: 901, longPass: 907, accuracy: 850 },
        dribble: { breakout: 880, keeping: 869, ballTouch: 872 },
        defense: { tackle: 911, interception: 945, marking: 941 },
        physical: { jumping: 888, contact: 919, stamina: 916 },
        speed: { running: 886, agility: 854 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -1, shoot: -1, longShoot: -1,
      shortPass: 0, longPass: 0, throughPass: -1, cutIn: -1, keep: -1,
      delay: 0, rushOut: -1, feint: -1, press: 1
    },
    skill: { name: '楔のパス', rank: '銅', description: '発動エリア：中左中右・後左中右　/　発動条件：AM・CFの選手へのショートパス・ロングパス時　/　ロングパス・キック精度・ショートパスUP　/　成功時に受け手のショートパス発生確率UP' },
    abilities: [
      { name: 'インターセプター', rank: '銀', description: '発動条件：好調　/　パスカット・マークUP' },
      { name: '強靭なパサー', rank: '銀', description: '発動条件：絶好調　/　ショートパス・コンタクトUP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p122',
    name: '植田直通(J1 BEST11 2025)',
    readingName: 'うえだなおみち',
    category: 'DF',
    mainPosition: 'CB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'リアクション',
    playStyle: 'ストッパー',
    playStyleLevel: 'Ⅱ',
    overall: 6318,
    maxOverall: 14594,
    baseStats: { shoot: 926, pass: 1012, dribble: 1007, defense: 1246, physical: 1171, speed: 641 },
    detailStats: {
      shoot: { finishing: 289, power: 327, composure: 310 },
      pass: { shortPass: 322, longPass: 347, accuracy: 343 },
      dribble: { breakout: 317, keeping: 328, ballTouch: 362 },
      defense: { tackle: 427, interception: 408, marking: 411 },
      physical: { jumping: 387, contact: 429, stamina: 355 },
      speed: { running: 327, agility: 314 }
    },
    maxEnhanced: {
      overall: 14594,
      baseStats: { shoot: 2423, pass: 2581, dribble: 2540, defense: 2851, physical: 2764, speed: 1687 },
      detailStats: {
        shoot: { finishing: 788, power: 826, composure: 809 },
        pass: { shortPass: 845, longPass: 870, accuracy: 866 },
        dribble: { breakout: 828, keeping: 839, ballTouch: 873 },
        defense: { tackle: 962, interception: 943, marking: 946 },
        physical: { jumping: 922, contact: 964, stamina: 878 },
        speed: { running: 850, agility: 837 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -1, shoot: -1, longShoot: -1,
      shortPass: 0, longPass: 0, throughPass: -1, cutIn: -1, keep: -1,
      delay: 0, rushOut: -1, feint: -1, press: 1
    },
    skill: { name: '冴え渡るインターセプト', rank: '銅', description: '発動エリア：中左中右・後左中右　/　発動条件：パスカット時　/　パスカット・敏捷性UP' },
    abilities: [
      { name: 'ハードタックラー', rank: '銀', description: '発動条件：好調　/　タックル・コンタクトUP' },
      { name: 'インターセプター', rank: '銀', description: '発動条件：好調　/　パスカット・マークUP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p123',
    name: '早川友基(J1 BEST11 2025)',
    readingName: 'はやかわともき',
    category: 'GK',
    mainPosition: 'GK',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'リアクション',
    playStyle: 'オーソドックスGK',
    playStyleLevel: 'Ⅱ',
    overall: 6322,
    maxOverall: 14650,
    baseStats: { shoot: 903, pass: 1084, dribble: 1066, defense: 1190, physical: 1074, speed: 784 },
    detailStats: {
      shoot: { finishing: 290, power: 296, composure: 317 },
      pass: { shortPass: 355, longPass: 366, accuracy: 363 },
      dribble: { breakout: 368, keeping: 341, ballTouch: 357 },
      defense: { tackle: 391, interception: 397, marking: 402 },
      physical: { jumping: 397, contact: 346, stamina: 331 },
      speed: { running: 382, agility: 402 }
    },
    maxEnhanced: {
      overall: 14650,
      baseStats: { shoot: 2364, pass: 2689, dribble: 2527, defense: 2795, physical: 2667, speed: 1796 },
      detailStats: {
        shoot: { finishing: 777, power: 783, composure: 804 },
        pass: { shortPass: 890, longPass: 901, accuracy: 898 },
        dribble: { breakout: 855, keeping: 828, ballTouch: 844 },
        defense: { tackle: 926, interception: 932, marking: 937 },
        physical: { jumping: 932, contact: 881, stamina: 854 },
        speed: { running: 883, agility: 913 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -2, shoot: -1, longShoot: -1,
      shortPass: -1, longPass: 1, throughPass: -1, cutIn: -1, keep: -1,
      delay: -1, rushOut: -1, feint: -1, press: -1
    },
    skill: { name: '驚異的なセービング', rank: '銅', description: '発動エリア：後中　/　発動条件：セービング時　/　セービング・反応速度UP' },
    abilities: [
      { name: '不動の守護神', rank: '銀', description: '発動条件：途中出場　/　セービング・反応速度UP' },
      { name: '全方位への飛び出し', rank: '銀', description: '発動条件：途中出場　/　1VS1・ジャンプUP' }
    ],
    avatarUrl: ''
  },
  {
    "id": "p127",
    "name": "早川友基(2026)",
    "readingName": "はやかわともき",
    "category": "GK",
    "mainPosition": "GK",
    "subPositions": [],
    "rarity": "☆3",
    "baseRarity": "☆3",
    "nationality": "日本",
    "policy": "リアクション",
    "playStyle": "オーソドックスGK",
    "playStyleLevel": "Ⅱ",
    "overall": 6451,
    "maxOverall": 14746,
    "baseStats": {
      "shoot": 843,
      "pass": 1060,
      "dribble": 982,
      "defense": 1278,
      "physical": 1118,
      "speed": 718
    },
    "detailStats": {
      "shoot": {
        "finishing": 270,
        "power": 276,
        "composure": 297
      },
      "pass": {
        "shortPass": 347,
        "longPass": 358,
        "accuracy": 355
      },
      "dribble": {
        "breakout": 340,
        "keeping": 313,
        "ballTouch": 329
      },
      "defense": {
        "tackle": 440,
        "interception": 423,
        "marking": 415
      },
      "physical": {
        "jumping": 405,
        "contact": 374,
        "stamina": 339
      },
      "speed": {
        "running": 344,
        "agility": 374
      }
    },
    "maxEnhanced": {
      "overall": 14746,
      "baseStats": {
        "shoot": 2304,
        "pass": 2665,
        "dribble": 2443,
        "defense": 2883,
        "physical": 2711,
        "speed": 1740
      },
      "detailStats": {
        "shoot": {
          "finishing": 757,
          "power": 763,
          "composure": 784
        },
        "pass": {
          "shortPass": 882,
          "longPass": 893,
          "accuracy": 890
        },
        "dribble": {
          "breakout": 827,
          "keeping": 800,
          "ballTouch": 816
        },
        "defense": {
          "tackle": 975,
          "interception": 958,
          "marking": 950
        },
        "physical": {
          "jumping": 940,
          "contact": 909,
          "stamina": 862
        },
        "speed": {
          "running": 855,
          "agility": 885
        }
      }
    },
    "playTendencies": {
      "attack": -1,
      "defense": 1,
      "dribble": -2,
      "shoot": -1,
      "longShoot": -1,
      "shortPass": -1,
      "longPass": 1,
      "throughPass": -1,
      "cutIn": -1,
      "keep": -1,
      "delay": -1,
      "rushOut": -1,
      "feint": -1,
      "press": -1
    },
    "skill": { name: '驚異的なセービング', rank: '銅', description: '発動エリア：後中　/　発動条件：セービング時　/　セービング・反応速度UP' },
    "abilities": [
      { name: '上空の守護神', rank: '銀', description: '発動条件：好調　/　セービング・ジャンプUP' },
      { name: '激情のキック', rank: '銀', description: '発動条件：途中出場　/　キック精度・コンタクトUP' }
    ],
    "avatarUrl": ""
  },
  {
    "id": "p128",
    "name": "川島永嗣(2026)",
    "readingName": "かわしまえいじ",
    "category": "GK",
    "mainPosition": "GK",
    "subPositions": [],
    "rarity": "☆3",
    "baseRarity": "☆3",
    "nationality": "日本",
    "policy": "ポゼッション",
    "playStyle": "オーソドックスGK",
    "playStyleLevel": "Ⅱ",
    "overall": 6412,
    "maxOverall": 14710,
    "baseStats": {
      "shoot": 852,
      "pass": 853,
      "dribble": 969,
      "defense": 1259,
      "physical": 1184,
      "speed": 760
    },
    "detailStats": {
      "shoot": {
        "finishing": 274,
        "power": 290,
        "composure": 288
      },
      "pass": {
        "shortPass": 291,
        "longPass": 282,
        "accuracy": 280
      },
      "dribble": {
        "breakout": 326,
        "keeping": 318,
        "ballTouch": 325
      },
      "defense": {
        "tackle": 428,
        "interception": 418,
        "marking": 413
      },
      "physical": {
        "jumping": 418,
        "contact": 411,
        "stamina": 355
      },
      "speed": {
        "running": 359,
        "agility": 401
      }
    },
    "maxEnhanced": {
      "overall": 14710,
      "baseStats": {
        "shoot": 2313,
        "pass": 2478,
        "dribble": 2430,
        "defense": 2864,
        "physical": 2777,
        "speed": 1782
      },
      "detailStats": {
        "shoot": {
          "finishing": 761,
          "power": 777,
          "composure": 775
        },
        "pass": {
          "shortPass": 826,
          "longPass": 817,
          "accuracy": 815
        },
        "dribble": {
          "breakout": 813,
          "keeping": 805,
          "ballTouch": 812
        },
        "defense": {
          "tackle": 963,
          "interception": 953,
          "marking": 948
        },
        "physical": {
          "jumping": 953,
          "contact": 946,
          "stamina": 878
        },
        "speed": {
          "running": 870,
          "agility": 912
        }
      }
    },
    "playTendencies": {
      "attack": -1,
      "defense": 1,
      "dribble": -2,
      "shoot": -1,
      "longShoot": -1,
      "shortPass": -1,
      "longPass": 1,
      "throughPass": -1,
      "cutIn": -1,
      "keep": -1,
      "delay": -1,
      "rushOut": -1,
      "feint": -1,
      "press": -1
    },
    "skill": { name: 'コントロールフィード', rank: '銅', description: '発動エリア：中左中右・後左中右　/　発動条件：LW・RW・LM・RMの選手へのロングパス時　/　ロングパス・キック精度UP　/　成功時に受け手のトラップ発生確率UP' },
    "abilities": [
      { name: '広域の守護神', rank: '銀', description: '発動条件：好調　/　セービング・1VS1UP' },
      { name: '跳躍するロングパサー', rank: '銀', description: '発動条件：途中出場　/　ロングパス・ジャンプUP' }
    ],
    "avatarUrl": ""
  },
  {
    "id": "p129",
    "name": "前川黛也(2026)",
    "readingName": "まえかわだいや",
    "category": "GK",
    "mainPosition": "GK",
    "subPositions": [],
    "rarity": "☆3",
    "baseRarity": "☆3",
    "nationality": "日本",
    "policy": "カウンター",
    "playStyle": "オーソドックスGK",
    "playStyleLevel": "Ⅱ",
    "overall": 6418,
    "maxOverall": 14716,
    "baseStats": {
      "shoot": 816,
      "pass": 1046,
      "dribble": 962,
      "defense": 1253,
      "physical": 1146,
      "speed": 739
    },
    "detailStats": {
      "shoot": {
        "finishing": 260,
        "power": 306,
        "composure": 250
      },
      "pass": {
        "shortPass": 337,
        "longPass": 366,
        "accuracy": 343
      },
      "dribble": {
        "breakout": 314,
        "keeping": 326,
        "ballTouch": 322
      },
      "defense": {
        "tackle": 429,
        "interception": 412,
        "marking": 412
      },
      "physical": {
        "jumping": 418,
        "contact": 366,
        "stamina": 362
      },
      "speed": {
        "running": 349,
        "agility": 390
      }
    },
    "maxEnhanced": {
      "overall": 14716,
      "baseStats": {
        "shoot": 2277,
        "pass": 2651,
        "dribble": 2423,
        "defense": 2858,
        "physical": 2739,
        "speed": 1761
      },
      "detailStats": {
        "shoot": {
          "finishing": 747,
          "power": 793,
          "composure": 737
        },
        "pass": {
          "shortPass": 872,
          "longPass": 901,
          "accuracy": 878
        },
        "dribble": {
          "breakout": 801,
          "keeping": 813,
          "ballTouch": 809
        },
        "defense": {
          "tackle": 964,
          "interception": 947,
          "marking": 947
        },
        "physical": {
          "jumping": 953,
          "contact": 901,
          "stamina": 885
        },
        "speed": {
          "running": 860,
          "agility": 901
        }
      }
    },
    "playTendencies": {
      "attack": -1,
      "defense": 1,
      "dribble": -2,
      "shoot": -1,
      "longShoot": -1,
      "shortPass": -1,
      "longPass": 1,
      "throughPass": -1,
      "cutIn": -1,
      "keep": -1,
      "delay": -1,
      "rushOut": -1,
      "feint": -1,
      "press": -1
    },
    "skill": { name: '驚異的なセービング', rank: '銅', description: '発動エリア：後中　/　発動条件：セービング時　/　セービング・反応速度UP' },
    "abilities": [
      { name: '広域の守護神', rank: '銀', description: '発動条件：好調　/　セービング・1VS1UP' },
      { name: '全方向の守護', rank: '銀', description: '発動条件：途中出場　/　反応速度・ジャンプUP' }
    ],
    "avatarUrl": ""
  },
  {
    "id": "p130",
    "name": "シュミット・ダニエル(2026)",
    "readingName": "しゅみっとだにえる",
    "category": "GK",
    "mainPosition": "GK",
    "subPositions": [],
    "rarity": "☆3",
    "baseRarity": "☆3",
    "nationality": "日本",
    "policy": "カウンター",
    "playStyle": "オーソドックスGK",
    "playStyleLevel": "Ⅱ",
    "overall": 6414,
    "maxOverall": 14717,
    "baseStats": {
      "shoot": 812,
      "pass": 981,
      "dribble": 870,
      "defense": 1259,
      "physical": 1210,
      "speed": 729
    },
    "detailStats": {
      "shoot": {
        "finishing": 260,
        "power": 312,
        "composure": 240
      },
      "pass": {
        "shortPass": 316,
        "longPass": 334,
        "accuracy": 331
      },
      "dribble": {
        "breakout": 310,
        "keeping": 300,
        "ballTouch": 260
      },
      "defense": {
        "tackle": 429,
        "interception": 418,
        "marking": 412
      },
      "physical": {
        "jumping": 420,
        "contact": 418,
        "stamina": 372
      },
      "speed": {
        "running": 339,
        "agility": 390
      }
    },
    "maxEnhanced": {
      "overall": 14717,
      "baseStats": {
        "shoot": 2273,
        "pass": 2586,
        "dribble": 2331,
        "defense": 2864,
        "physical": 2803,
        "speed": 1751
      },
      "detailStats": {
        "shoot": {
          "finishing": 747,
          "power": 799,
          "composure": 727
        },
        "pass": {
          "shortPass": 851,
          "longPass": 869,
          "accuracy": 866
        },
        "dribble": {
          "breakout": 797,
          "keeping": 787,
          "ballTouch": 747
        },
        "defense": {
          "tackle": 964,
          "interception": 953,
          "marking": 947
        },
        "physical": {
          "jumping": 955,
          "contact": 953,
          "stamina": 895
        },
        "speed": {
          "running": 850,
          "agility": 901
        }
      }
    },
    "playTendencies": {
      "attack": -1,
      "defense": 1,
      "dribble": -2,
      "shoot": -1,
      "longShoot": -1,
      "shortPass": -1,
      "longPass": 1,
      "throughPass": -1,
      "cutIn": -1,
      "keep": -1,
      "delay": -1,
      "rushOut": -1,
      "feint": -1,
      "press": -1
    },
    "skill": { name: '驚異的なセービング', rank: '銅', description: '発動エリア：後中　/　発動条件：セービング時　/　セービング・反応速度UP' },
    "abilities": [
      { name: '全方向の守護', rank: '銀', description: '発動条件：途中出場　/　反応速度・ジャンプUP' },
      { name: '強靭な守護神', rank: '銀', description: '発動条件：好調　/　セービング・コンタクトUP' }
    ],
    "avatarUrl": ""
  },
  {
    "id": "p131",
    "name": "東口順昭(2026)",
    "readingName": "ひがしぐちまさあき",
    "category": "GK",
    "mainPosition": "GK",
    "subPositions": [],
    "rarity": "☆3",
    "baseRarity": "☆3",
    "nationality": "日本",
    "policy": "ポゼッション",
    "playStyle": "オーソドックスGK",
    "playStyleLevel": "Ⅱ",
    "overall": 6527,
    "maxOverall": 14854,
    "baseStats": {
      "shoot": 907,
      "pass": 1014,
      "dribble": 808,
      "defense": 1264,
      "physical": 1164,
      "speed": 757
    },
    "detailStats": {
      "shoot": {
        "finishing": 288,
        "power": 300,
        "composure": 319
      },
      "pass": {
        "shortPass": 310,
        "longPass": 356,
        "accuracy": 348
      },
      "dribble": {
        "breakout": 338,
        "keeping": 259,
        "ballTouch": 211
      },
      "defense": {
        "tackle": 408,
        "interception": 430,
        "marking": 426
      },
      "physical": {
        "jumping": 401,
        "contact": 371,
        "stamina": 392
      },
      "speed": {
        "running": 356,
        "agility": 401
      }
    },
    "maxEnhanced": {
      "overall": 14854,
      "baseStats": {
        "shoot": 2368,
        "pass": 2619,
        "dribble": 2269,
        "defense": 2869,
        "physical": 2757,
        "speed": 1779
      },
      "detailStats": {
        "shoot": {
          "finishing": 775,
          "power": 787,
          "composure": 806
        },
        "pass": {
          "shortPass": 845,
          "longPass": 891,
          "accuracy": 883
        },
        "dribble": {
          "breakout": 825,
          "keeping": 746,
          "ballTouch": 698
        },
        "defense": {
          "tackle": 943,
          "interception": 965,
          "marking": 961
        },
        "physical": {
          "jumping": 936,
          "contact": 906,
          "stamina": 915
        },
        "speed": {
          "running": 867,
          "agility": 912
        }
      }
    },
    "playTendencies": {
      "attack": -1,
      "defense": 1,
      "dribble": -2,
      "shoot": -1,
      "longShoot": -1,
      "shortPass": -1,
      "longPass": 1,
      "throughPass": -1,
      "cutIn": -1,
      "keep": -1,
      "delay": -1,
      "rushOut": -1,
      "feint": -1,
      "press": -1
    },
    "skill": { name: '驚異的なセービング', rank: '銅', description: '発動エリア：後中　/　発動条件：セービング時　/　セービング・反応速度UP' },
    "abilities": [
      { name: '不動の守護神', rank: '銀', description: '発動条件：途中出場　/　セービング・反応速度UP' },
      { name: '全方位への飛び出し', rank: '銀', description: '発動条件：途中出場　/　1VS1・ジャンプUP' }
    ],
    "avatarUrl": ""
  },
  {
    "id": "p132",
    "name": "小島亨介(2026)",
    "readingName": "こじまりょうすけ",
    "category": "GK",
    "mainPosition": "GK",
    "subPositions": [],
    "rarity": "☆3",
    "baseRarity": "☆3",
    "nationality": "日本",
    "policy": "ムービング",
    "playStyle": "オーソドックスGK",
    "playStyleLevel": "Ⅱ",
    "overall": 6415,
    "maxOverall": 14724,
    "baseStats": {
      "shoot": 824,
      "pass": 1033,
      "dribble": 876,
      "defense": 1251,
      "physical": 1164,
      "speed": 730
    },
    "detailStats": {
      "shoot": {
        "finishing": 274,
        "power": 306,
        "composure": 244
      },
      "pass": {
        "shortPass": 354,
        "longPass": 373,
        "accuracy": 306
      },
      "dribble": {
        "breakout": 346,
        "keeping": 296,
        "ballTouch": 234
      },
      "defense": {
        "tackle": 430,
        "interception": 414,
        "marking": 407
      },
      "physical": {
        "jumping": 413,
        "contact": 368,
        "stamina": 383
      },
      "speed": {
        "running": 339,
        "agility": 391
      }
    },
    "maxEnhanced": {
      "overall": 14724,
      "baseStats": {
        "shoot": 2285,
        "pass": 2638,
        "dribble": 2337,
        "defense": 2856,
        "physical": 2757,
        "speed": 1752
      },
      "detailStats": {
        "shoot": {
          "finishing": 761,
          "power": 793,
          "composure": 731
        },
        "pass": {
          "shortPass": 889,
          "longPass": 908,
          "accuracy": 841
        },
        "dribble": {
          "breakout": 833,
          "keeping": 783,
          "ballTouch": 721
        },
        "defense": {
          "tackle": 965,
          "interception": 949,
          "marking": 942
        },
        "physical": {
          "jumping": 948,
          "contact": 903,
          "stamina": 906
        },
        "speed": {
          "running": 850,
          "agility": 902
        }
      }
    },
    "playTendencies": {
      "attack": -1,
      "defense": 1,
      "dribble": -2,
      "shoot": -1,
      "longShoot": -1,
      "shortPass": -1,
      "longPass": 1,
      "throughPass": -1,
      "cutIn": -1,
      "keep": -1,
      "delay": -1,
      "rushOut": -1,
      "feint": -1,
      "press": -1
    },
    "skill": { name: '驚異的なセービング', rank: '銅', description: '発動エリア：後中　/　発動条件：セービング時　/　セービング・反応速度UP' },
    "abilities": [
      { name: '広域の守護神', rank: '銀', description: '発動条件：好調　/　セービング・1VS1UP' },
      { name: '競り合うロングパサー', rank: '銀', description: '発動条件：途中出場　/　ロングパス・コンタクトUP' }
    ],
    "avatarUrl": ""
  },
  {
    "id": "p133",
    "name": "マテウス(2026)",
    "readingName": "まてうす",
    "category": "GK",
    "mainPosition": "GK",
    "subPositions": [],
    "rarity": "☆3",
    "baseRarity": "☆3",
    "nationality": "ブラジル",
    "policy": "ムービング",
    "playStyle": "オーソドックスGK",
    "playStyleLevel": "Ⅱ",
    "overall": 6402,
    "maxOverall": 14702,
    "baseStats": {
      "shoot": 830,
      "pass": 847,
      "dribble": 1034,
      "defense": 1244,
      "physical": 1164,
      "speed": 794
    },
    "detailStats": {
      "shoot": {
        "finishing": 257,
        "power": 288,
        "composure": 285
      },
      "pass": {
        "shortPass": 273,
        "longPass": 287,
        "accuracy": 287
      },
      "dribble": {
        "breakout": 375,
        "keeping": 327,
        "ballTouch": 332
      },
      "defense": {
        "tackle": 422,
        "interception": 422,
        "marking": 400
      },
      "physical": {
        "jumping": 465,
        "contact": 383,
        "stamina": 316
      },
      "speed": {
        "running": 347,
        "agility": 447
      }
    },
    "maxEnhanced": {
      "overall": 14702,
      "baseStats": {
        "shoot": 2291,
        "pass": 2452,
        "dribble": 2495,
        "defense": 2849,
        "physical": 2757,
        "speed": 1816
      },
      "detailStats": {
        "shoot": {
          "finishing": 744,
          "power": 775,
          "composure": 772
        },
        "pass": {
          "shortPass": 808,
          "longPass": 822,
          "accuracy": 822
        },
        "dribble": {
          "breakout": 862,
          "keeping": 814,
          "ballTouch": 819
        },
        "defense": {
          "tackle": 957,
          "interception": 957,
          "marking": 935
        },
        "physical": {
          "jumping": 1000,
          "contact": 918,
          "stamina": 839
        },
        "speed": {
          "running": 858,
          "agility": 958
        }
      }
    },
    "playTendencies": {
      "attack": -1,
      "defense": 1,
      "dribble": -2,
      "shoot": -1,
      "longShoot": -1,
      "shortPass": -1,
      "longPass": 1,
      "throughPass": -1,
      "cutIn": -1,
      "keep": -1,
      "delay": -1,
      "rushOut": -1,
      "feint": -1,
      "press": -1
    },
    "skill": { name: '驚異的なセービング', rank: '銅', description: '発動エリア：後中　/　発動条件：セービング時　/　セービング・反応速度UP' },
    "abilities": [
      { name: '上空の守護神', rank: '銀', description: '発動条件：好調　/　セービング・ジャンプUP' },
      { name: '超反応', rank: '銀', description: '発動条件：絶好調　/　反応速度・敏捷性UP' }
    ],
    "avatarUrl": ""
  },
  {
    "id": "p134",
    "name": "林彰洋(2026)",
    "readingName": "はやしあきひろ",
    "category": "GK",
    "mainPosition": "GK",
    "subPositions": [],
    "rarity": "☆3",
    "baseRarity": "☆3",
    "nationality": "日本",
    "policy": "リアクション",
    "playStyle": "オーソドックスGK",
    "playStyleLevel": "Ⅱ",
    "overall": 6365,
    "maxOverall": 14668,
    "baseStats": {
      "shoot": 871,
      "pass": 1047,
      "dribble": 970,
      "defense": 1202,
      "physical": 1129,
      "speed": 724
    },
    "detailStats": {
      "shoot": {
        "finishing": 287,
        "power": 297,
        "composure": 287
      },
      "pass": {
        "shortPass": 328,
        "longPass": 358,
        "accuracy": 361
      },
      "dribble": {
        "breakout": 332,
        "keeping": 316,
        "ballTouch": 322
      },
      "defense": {
        "tackle": 428,
        "interception": 377,
        "marking": 397
      },
      "physical": {
        "jumping": 441,
        "contact": 388,
        "stamina": 300
      },
      "speed": {
        "running": 343,
        "agility": 381
      }
    },
    "maxEnhanced": {
      "overall": 14668,
      "baseStats": {
        "shoot": 2332,
        "pass": 2652,
        "dribble": 2431,
        "defense": 2807,
        "physical": 2722,
        "speed": 1746
      },
      "detailStats": {
        "shoot": {
          "finishing": 774,
          "power": 784,
          "composure": 774
        },
        "pass": {
          "shortPass": 863,
          "longPass": 893,
          "accuracy": 896
        },
        "dribble": {
          "breakout": 819,
          "keeping": 803,
          "ballTouch": 809
        },
        "defense": {
          "tackle": 963,
          "interception": 912,
          "marking": 932
        },
        "physical": {
          "jumping": 976,
          "contact": 923,
          "stamina": 823
        },
        "speed": {
          "running": 854,
          "agility": 892
        }
      }
    },
    "playTendencies": {
      "attack": -1,
      "defense": 1,
      "dribble": -2,
      "shoot": -1,
      "longShoot": -1,
      "shortPass": -1,
      "longPass": 1,
      "throughPass": -1,
      "cutIn": -1,
      "keep": -1,
      "delay": -1,
      "rushOut": -1,
      "feint": -1,
      "press": -1
    },
    "skill": { name: '驚異的なセービング', rank: '銅', description: '発動エリア：後中　/　発動条件：セービング時　/　セービング・反応速度UP' },
    "abilities": [
      { name: '全方位への飛び出し', rank: '銀', description: '発動条件：途中出場　/　1VS1・ジャンプUP' },
      { name: '最後方のキッカー', rank: '銀', description: '発動条件：途中出場　/　反応速度・キック精度UP' }
    ],
    "avatarUrl": ""
  },
  {
    "id": "p135",
    "name": "太田岳志(2026)",
    "readingName": "おおたがくじ",
    "category": "GK",
    "mainPosition": "GK",
    "subPositions": [],
    "rarity": "☆3",
    "baseRarity": "☆3",
    "nationality": "日本",
    "policy": "カウンター",
    "playStyle": "オーソドックスGK",
    "playStyleLevel": "Ⅱ",
    "overall": 6455,
    "maxOverall": 14783,
    "baseStats": {
      "shoot": 914,
      "pass": 1124,
      "dribble": 845,
      "defense": 1222,
      "physical": 967,
      "speed": 772
    },
    "detailStats": {
      "shoot": {
        "finishing": 320,
        "power": 282,
        "composure": 312
      },
      "pass": {
        "shortPass": 367,
        "longPass": 384,
        "accuracy": 373
      },
      "dribble": {
        "breakout": 329,
        "keeping": 259,
        "ballTouch": 257
      },
      "defense": {
        "tackle": 431,
        "interception": 391,
        "marking": 400
      },
      "physical": {
        "jumping": 402,
        "contact": 388,
        "stamina": 177
      },
      "speed": {
        "running": 372,
        "agility": 400
      }
    },
    "maxEnhanced": {
      "overall": 14783,
      "baseStats": {
        "shoot": 2375,
        "pass": 2729,
        "dribble": 2306,
        "defense": 2827,
        "physical": 2560,
        "speed": 1794
      },
      "detailStats": {
        "shoot": {
          "finishing": 807,
          "power": 769,
          "composure": 799
        },
        "pass": {
          "shortPass": 902,
          "longPass": 919,
          "accuracy": 908
        },
        "dribble": {
          "breakout": 816,
          "keeping": 746,
          "ballTouch": 744
        },
        "defense": {
          "tackle": 966,
          "interception": 926,
          "marking": 935
        },
        "physical": {
          "jumping": 937,
          "contact": 923,
          "stamina": 700
        },
        "speed": {
          "running": 883,
          "agility": 911
        }
      }
    },
    "playTendencies": {
      "attack": -1,
      "defense": 1,
      "dribble": -2,
      "shoot": -1,
      "longShoot": -1,
      "shortPass": -1,
      "longPass": 1,
      "throughPass": -1,
      "cutIn": -1,
      "keep": -1,
      "delay": -1,
      "rushOut": -1,
      "feint": -1,
      "press": -1
    },
    "skill": { name: '驚異的なセービング', rank: '銅', description: '発動エリア：後中　/　発動条件：セービング時　/　セービング・反応速度UP' },
    "abilities": [
      { name: '広域の守護神', rank: '銀', description: '発動条件：好調　/　セービング・1VS1UP' },
      { name: '全方向の守護', rank: '銀', description: '発動条件：途中出場　/　反応速度・ジャンプUP' }
    ],
    "avatarUrl": ""
  },
  {
    "id": "p136",
    "name": "後藤雅明(2026)",
    "readingName": "ごとうまさあき",
    "category": "GK",
    "mainPosition": "GK",
    "subPositions": [],
    "rarity": "☆3",
    "baseRarity": "☆3",
    "nationality": "日本",
    "policy": "リアクション",
    "playStyle": "オーソドックスGK",
    "playStyleLevel": "Ⅱ",
    "overall": 6390,
    "maxOverall": 14710,
    "baseStats": {
      "shoot": 970,
      "pass": 767,
      "dribble": 930,
      "defense": 1239,
      "physical": 1158,
      "speed": 743
    },
    "detailStats": {
      "shoot": {
        "finishing": 273,
        "power": 390,
        "composure": 307
      },
      "pass": {
        "shortPass": 251,
        "longPass": 262,
        "accuracy": 254
      },
      "dribble": {
        "breakout": 373,
        "keeping": 302,
        "ballTouch": 255
      },
      "defense": {
        "tackle": 404,
        "interception": 415,
        "marking": 420
      },
      "physical": {
        "jumping": 435,
        "contact": 395,
        "stamina": 328
      },
      "speed": {
        "running": 330,
        "agility": 413
      }
    },
    "maxEnhanced": {
      "overall": 14710,
      "baseStats": {
        "shoot": 2431,
        "pass": 2372,
        "dribble": 2391,
        "defense": 2844,
        "physical": 2751,
        "speed": 1765
      },
      "detailStats": {
        "shoot": {
          "finishing": 760,
          "power": 877,
          "composure": 794
        },
        "pass": {
          "shortPass": 786,
          "longPass": 797,
          "accuracy": 789
        },
        "dribble": {
          "breakout": 860,
          "keeping": 789,
          "ballTouch": 742
        },
        "defense": {
          "tackle": 939,
          "interception": 950,
          "marking": 955
        },
        "physical": {
          "jumping": 970,
          "contact": 930,
          "stamina": 851
        },
        "speed": {
          "running": 841,
          "agility": 924
        }
      }
    },
    "playTendencies": {
      "attack": -1,
      "defense": 1,
      "dribble": -2,
      "shoot": -1,
      "longShoot": -1,
      "shortPass": -1,
      "longPass": 1,
      "throughPass": -1,
      "cutIn": -1,
      "keep": -1,
      "delay": -1,
      "rushOut": -1,
      "feint": -1,
      "press": -1
    },
    "skill": { name: 'コントロールフィード', rank: '銅', description: '発動エリア：中左中右・後左中右　/　発動条件：LW・RW・LM・RMの選手へのロングパス時　/　ロングパス・キック精度UP　/　成功時に受け手のトラップ発生確率UP' },
    "abilities": [
      { name: '上空の守護神', rank: '銀', description: '発動条件：好調　/　セービング・ジャンプUP' },
      { name: '冷静沈着', rank: '銀', description: '発動条件：途中出場　/　反応速度・1VS1UP' }
    ],
    "avatarUrl": ""
  },
  {
    "id": "p137",
    "name": "レナート・モーザー(2026)",
    "readingName": "れなーともーざー",
    "category": "GK",
    "mainPosition": "GK",
    "subPositions": [],
    "rarity": "☆3",
    "baseRarity": "☆3",
    "nationality": "ドイツ",
    "policy": "カウンター",
    "playStyle": "オーソドックスGK",
    "playStyleLevel": "Ⅱ",
    "overall": 6298,
    "maxOverall": 14590,
    "baseStats": {
      "shoot": 926,
      "pass": 962,
      "dribble": 864,
      "defense": 1213,
      "physical": 1177,
      "speed": 674
    },
    "detailStats": {
      "shoot": {
        "finishing": 286,
        "power": 340,
        "composure": 300
      },
      "pass": {
        "shortPass": 287,
        "longPass": 337,
        "accuracy": 338
      },
      "dribble": {
        "breakout": 298,
        "keeping": 279,
        "ballTouch": 287
      },
      "defense": {
        "tackle": 438,
        "interception": 392,
        "marking": 383
      },
      "physical": {
        "jumping": 465,
        "contact": 374,
        "stamina": 338
      },
      "speed": {
        "running": 280,
        "agility": 394
      }
    },
    "maxEnhanced": {
      "overall": 14590,
      "baseStats": {
        "shoot": 2387,
        "pass": 2567,
        "dribble": 2325,
        "defense": 2818,
        "physical": 2770,
        "speed": 1696
      },
      "detailStats": {
        "shoot": {
          "finishing": 773,
          "power": 827,
          "composure": 787
        },
        "pass": {
          "shortPass": 822,
          "longPass": 872,
          "accuracy": 873
        },
        "dribble": {
          "breakout": 785,
          "keeping": 766,
          "ballTouch": 774
        },
        "defense": {
          "tackle": 973,
          "interception": 927,
          "marking": 918
        },
        "physical": {
          "jumping": 1000,
          "contact": 909,
          "stamina": 861
        },
        "speed": {
          "running": 791,
          "agility": 905
        }
      }
    },
    "playTendencies": {
      "attack": -1,
      "defense": 1,
      "dribble": -2,
      "shoot": -1,
      "longShoot": -1,
      "shortPass": -1,
      "longPass": 1,
      "throughPass": -1,
      "cutIn": -1,
      "keep": -1,
      "delay": -1,
      "rushOut": -1,
      "feint": -1,
      "press": -1
    },
    "skill": { name: '驚異的なセービング', rank: '銅', description: '発動エリア：後中　/　発動条件：セービング時　/　セービング・反応速度UP' },
    "abilities": [
      { name: '全方向の守護', rank: '銀', description: '発動条件：途中出場　/　反応速度・ジャンプUP' },
      { name: 'パワーアジリティ', rank: '銀', description: '発動条件：好調　/　コンタクト・敏捷性UP' }
    ],
    "avatarUrl": ""
  },
  {
    "id": "p138",
    "name": "パブロ・サバグ(K1 BEST11 2025)",
    "readingName": "ぱぶろさばぐ",
    "category": "FW",
    "mainPosition": "CF",
    "subPositions": [],
    "rarity": "☆3",
    "baseRarity": "☆3",
    "nationality": "シリア",
    "policy": "リアクション",
    "playStyle": "ラインブレーカー",
    "playStyleLevel": "Ⅱ",
    "overall": 6128,
    "maxOverall": 14356,
    "baseStats": {
      "shoot": 1147,
      "pass": 1162,
      "dribble": 1172,
      "defense": 928,
      "physical": 1036,
      "speed": 805
    },
    "detailStats": {
      "shoot": {
        "finishing": 413,
        "power": 330,
        "composure": 404
      },
      "pass": {
        "shortPass": 399,
        "longPass": 389,
        "accuracy": 374
      },
      "dribble": {
        "breakout": 398,
        "keeping": 395,
        "ballTouch": 379
      },
      "defense": {
        "tackle": 309,
        "interception": 314,
        "marking": 305
      },
      "physical": {
        "jumping": 420,
        "contact": 241,
        "stamina": 375
      },
      "speed": {
        "running": 411,
        "agility": 394
      }
    },
    "maxEnhanced": {
      "overall": 14356,
      "baseStats": {
        "shoot": 2752,
        "pass": 2695,
        "dribble": 2753,
        "defense": 2425,
        "physical": 2617,
        "speed": 1851
      },
      "detailStats": {
        "shoot": {
          "finishing": 948,
          "power": 865,
          "composure": 939
        },
        "pass": {
          "shortPass": 910,
          "longPass": 900,
          "accuracy": 885
        },
        "dribble": {
          "breakout": 921,
          "keeping": 918,
          "ballTouch": 914
        },
        "defense": {
          "tackle": 808,
          "interception": 813,
          "marking": 804
        },
        "physical": {
          "jumping": 943,
          "contact": 776,
          "stamina": 898
        },
        "speed": {
          "running": 934,
          "agility": 917
        }
      }
    },
    "playTendencies": {
      "attack": 2,
      "defense": -1,
      "dribble": 0,
      "shoot": 2,
      "longShoot": 1,
      "shortPass": -1,
      "longPass": -1,
      "throughPass": -1,
      "cutIn": 0,
      "keep": -1,
      "delay": -1,
      "rushOut": 2,
      "feint": 0,
      "press": 0
    },
    "skill": { name: '狙いすましたシュート', rank: '銅', description: '発動エリア：前中　/　発動条件：シュート時　/　決定力・キック力・冷静さUP' },
    "abilities": [
      { name: '裏への飛び出し', rank: '銀', description: '発動条件：途中出場　/　決定力・走力UP' },
      { name: '冷静な突破', rank: '銀', description: '発動条件：絶好調　/　冷静さ・突破力UP' }
    ],
    "avatarUrl": ""
  },
  {
    "id": "p139",
    "name": "ソン・ミンギュ(K1 BEST11 2025)",
    "readingName": "そんみんぎゅ",
    "category": "FW",
    "mainPosition": "LW",
    "subPositions": [],
    "rarity": "☆3",
    "baseRarity": "☆3",
    "nationality": "韓国",
    "policy": "ポゼッション",
    "playStyle": "サイドアタッカー",
    "playStyleLevel": "Ⅱ",
    "overall": 6087,
    "maxOverall": 14262,
    "baseStats": {
      "shoot": 1233,
      "pass": 1151,
      "dribble": 1169,
      "defense": 995,
      "physical": 1213,
      "speed": 681
    },
    "detailStats": {
      "shoot": {
        "finishing": 430,
        "power": 400,
        "composure": 403
      },
      "pass": {
        "shortPass": 386,
        "longPass": 384,
        "accuracy": 381
      },
      "dribble": {
        "breakout": 382,
        "keeping": 383,
        "ballTouch": 404
      },
      "defense": {
        "tackle": 343,
        "interception": 337,
        "marking": 315
      },
      "physical": {
        "jumping": 405,
        "contact": 353,
        "stamina": 455
      },
      "speed": {
        "running": 334,
        "agility": 347
      }
    },
    "maxEnhanced": {
      "overall": 14262,
      "baseStats": {
        "shoot": 2790,
        "pass": 2720,
        "dribble": 2762,
        "defense": 2504,
        "physical": 2758,
        "speed": 1751
      },
      "detailStats": {
        "shoot": {
          "finishing": 953,
          "power": 911,
          "composure": 926
        },
        "pass": {
          "shortPass": 909,
          "longPass": 907,
          "accuracy": 904
        },
        "dribble": {
          "breakout": 917,
          "keeping": 918,
          "ballTouch": 927
        },
        "defense": {
          "tackle": 854,
          "interception": 836,
          "marking": 814
        },
        "physical": {
          "jumping": 916,
          "contact": 864,
          "stamina": 978
        },
        "speed": {
          "running": 869,
          "agility": 882
        }
      }
    },
    "playTendencies": {
      "attack": 1,
      "defense": -1,
      "dribble": 1,
      "shoot": 0,
      "longShoot": 0,
      "shortPass": 0,
      "longPass": 0,
      "throughPass": 0,
      "cutIn": -1,
      "keep": 0,
      "delay": -1,
      "rushOut": 2,
      "feint": 1,
      "press": 0
    },
    "skill": { name: '華麗なトラップ', rank: '銅', description: '発動エリア：前左右・中左右　/　発動条件：トラップ時　/　ボールタッチ・突破力UP　/　成功時に自身のドリブル発生確率UP' },
    "abilities": [
      {
        "name": "ゴール前の落ち着き",
        "rank": "銀",
        "description": "発動条件：好調　/　決定力・ボールタッチUP"
      },
      { name: '冷静なファイター', rank: '銀', description: '発動条件：絶好調　/　冷静さ・スタミナUP' }
    ],
    "avatarUrl": ""
  },
  {
    "id": "p140",
    "name": "イ・ドンギョン(K1 BEST11 2025)",
    "readingName": "いどんぎょん",
    "category": "MF",
    "mainPosition": "AM",
    "subPositions": [],
    "rarity": "☆3",
    "baseRarity": "☆3",
    "nationality": "韓国",
    "policy": "リアクション",
    "playStyle": "アタッカー",
    "playStyleLevel": "Ⅱ",
    "overall": 6214,
    "maxOverall": 14299,
    "baseStats": {
      "shoot": 1095,
      "pass": 1160,
      "dribble": 1234,
      "defense": 1059,
      "physical": 927,
      "speed": 850
    },
    "detailStats": {
      "shoot": {
        "finishing": 376,
        "power": 354,
        "composure": 365
      },
      "pass": {
        "shortPass": 377,
        "longPass": 378,
        "accuracy": 405
      },
      "dribble": {
        "breakout": 416,
        "keeping": 402,
        "ballTouch": 416
      },
      "defense": {
        "tackle": 345,
        "interception": 363,
        "marking": 351
      },
      "physical": {
        "jumping": 263,
        "contact": 323,
        "stamina": 341
      },
      "speed": {
        "running": 403,
        "agility": 447
      }
    },
    "maxEnhanced": {
      "overall": 14299,
      "baseStats": {
        "shoot": 2640,
        "pass": 2741,
        "dribble": 2803,
        "defense": 2604,
        "physical": 2496,
        "speed": 1884
      },
      "detailStats": {
        "shoot": {
          "finishing": 887,
          "power": 865,
          "composure": 888
        },
        "pass": {
          "shortPass": 912,
          "longPass": 901,
          "accuracy": 928
        },
        "dribble": {
          "breakout": 939,
          "keeping": 925,
          "ballTouch": 939
        },
        "defense": {
          "tackle": 868,
          "interception": 874,
          "marking": 862
        },
        "physical": {
          "jumping": 774,
          "contact": 846,
          "stamina": 876
        },
        "speed": {
          "running": 914,
          "agility": 970
        }
      }
    },
    "playTendencies": {
      "attack": 0,
      "defense": 0,
      "dribble": 0,
      "shoot": 0,
      "longShoot": 0,
      "shortPass": 1,
      "longPass": 0,
      "throughPass": 0,
      "cutIn": 0,
      "keep": 0,
      "delay": 0,
      "rushOut": -1,
      "feint": 0,
      "press": 0
    },
    "skill": { name: '確信のロングシュート', rank: '銅', description: '発動エリア：前中・中中　/　発動条件：シュート・ロングシュート時　/　決定力・キック力UP' },
    "abilities": [
      { name: 'スピードドリブラー', rank: '銀', description: '発動条件：途中出場　/　突破力・走力UP' },
      { name: '俊敏なキッカー', rank: '銀', description: '発動条件：好調　/　キック精度・敏捷性UP' }
    ],
    "avatarUrl": ""
  },
  {
    "id": "p141",
    "name": "カン・サンユン(K1 BEST11 2025)",
    "readingName": "かんさんゆん",
    "category": "MF",
    "mainPosition": "AM",
    "subPositions": [],
    "rarity": "☆3",
    "baseRarity": "☆3",
    "nationality": "韓国",
    "policy": "ポゼッション",
    "playStyle": "アタッカー",
    "playStyleLevel": "Ⅱ",
    "overall": 6138,
    "maxOverall": 14229,
    "baseStats": {
      "shoot": 1023,
      "pass": 1106,
      "dribble": 1225,
      "defense": 1023,
      "physical": 1090,
      "speed": 831
    },
    "detailStats": {
      "shoot": {
        "finishing": 333,
        "power": 349,
        "composure": 341
      },
      "pass": {
        "shortPass": 366,
        "longPass": 374,
        "accuracy": 366
      },
      "dribble": {
        "breakout": 420,
        "keeping": 405,
        "ballTouch": 400
      },
      "defense": {
        "tackle": 313,
        "interception": 358,
        "marking": 352
      },
      "physical": {
        "jumping": 317,
        "contact": 379,
        "stamina": 394
      },
      "speed": {
        "running": 383,
        "agility": 448
      }
    },
    "maxEnhanced": {
      "overall": 14229,
      "baseStats": {
        "shoot": 2568,
        "pass": 2687,
        "dribble": 2794,
        "defense": 2568,
        "physical": 2659,
        "speed": 1865
      },
      "detailStats": {
        "shoot": {
          "finishing": 844,
          "power": 860,
          "composure": 864
        },
        "pass": {
          "shortPass": 901,
          "longPass": 897,
          "accuracy": 889
        },
        "dribble": {
          "breakout": 943,
          "keeping": 928,
          "ballTouch": 923
        },
        "defense": {
          "tackle": 836,
          "interception": 869,
          "marking": 863
        },
        "physical": {
          "jumping": 828,
          "contact": 902,
          "stamina": 929
        },
        "speed": {
          "running": 894,
          "agility": 971
        }
      }
    },
    "playTendencies": {
      "attack": 0,
      "defense": 0,
      "dribble": 0,
      "shoot": 0,
      "longShoot": 0,
      "shortPass": 1,
      "longPass": 0,
      "throughPass": 0,
      "cutIn": 0,
      "keep": 0,
      "delay": 0,
      "rushOut": -1,
      "feint": 0,
      "press": 0
    },
    "skill": { name: '強引な中央突破', rank: '銅', description: '発動エリア：前中・中中　/　発動条件：ドリブル時　/　突破力・キープ力UP' },
    "abilities": [
      {
        "name": "技巧派ドリブラー",
        "rank": "銀",
        "description": "発動条件：途中出場　/　突破力・ボールタッチUP"
      },
      { name: 'アジャイルターゲット', rank: '銀', description: '発動条件：途中出場　/　キープ力・敏捷性UP' }
    ],
    "avatarUrl": ""
  },
  {
    "id": "p142",
    "name": "キム・ジンギュ(K1 BEST11 2025)",
    "readingName": "きむじんぎゅ",
    "category": "MF",
    "mainPosition": "DM",
    "subPositions": [],
    "rarity": "☆3",
    "baseRarity": "☆3",
    "nationality": "韓国",
    "policy": "ポゼッション",
    "playStyle": "パサーDM",
    "playStyleLevel": "Ⅱ",
    "overall": 6081,
    "maxOverall": 14252,
    "baseStats": {
      "shoot": 1059,
      "pass": 1167,
      "dribble": 1135,
      "defense": 1015,
      "physical": 1060,
      "speed": 827
    },
    "detailStats": {
      "shoot": {
        "finishing": 355,
        "power": 350,
        "composure": 354
      },
      "pass": {
        "shortPass": 392,
        "longPass": 383,
        "accuracy": 392
      },
      "dribble": {
        "breakout": 379,
        "keeping": 386,
        "ballTouch": 370
      },
      "defense": {
        "tackle": 325,
        "interception": 351,
        "marking": 339
      },
      "physical": {
        "jumping": 327,
        "contact": 355,
        "stamina": 378
      },
      "speed": {
        "running": 410,
        "agility": 417
      }
    },
    "maxEnhanced": {
      "overall": 14252,
      "baseStats": {
        "shoot": 2604,
        "pass": 2772,
        "dribble": 2668,
        "defense": 2596,
        "physical": 2629,
        "speed": 1849
      },
      "detailStats": {
        "shoot": {
          "finishing": 866,
          "power": 861,
          "composure": 877
        },
        "pass": {
          "shortPass": 927,
          "longPass": 918,
          "accuracy": 927
        },
        "dribble": {
          "breakout": 890,
          "keeping": 897,
          "ballTouch": 881
        },
        "defense": {
          "tackle": 860,
          "interception": 874,
          "marking": 862
        },
        "physical": {
          "jumping": 838,
          "contact": 878,
          "stamina": 913
        },
        "speed": {
          "running": 921,
          "agility": 928
        }
      }
    },
    "playTendencies": {
      "attack": 0,
      "defense": 0,
      "dribble": 0,
      "shoot": 0,
      "longShoot": 0,
      "shortPass": 1,
      "longPass": 0,
      "throughPass": 0,
      "cutIn": 0,
      "keep": 0,
      "delay": 0,
      "rushOut": -1,
      "feint": 0,
      "press": 0
    },
    "skill": { name: 'ファストフィード', rank: '銅', description: '発動エリア：中中・後左中右　/　発動条件：CFの位置に居る選手へのロングパス時　/　ロングパス・キック精度UP　/　成功時に受け手のトラップ発生確率UP' },
    "abilities": [
      { name: '俊敏なパサー', rank: '銀', description: '発動条件：好調　/　ショートパス・敏捷性UP' },
      { name: '走り切るロングパサー', rank: '銀', description: '発動条件：途中出場　/　ロングパス・スタミナUP' }
    ],
    "avatarUrl": ""
  },
  {
    "id": "p143",
    "name": "パク・ジンソプ(K1 BEST11 2025)",
    "readingName": "ぱくじんそぷ",
    "category": "MF",
    "mainPosition": "DM",
    "subPositions": [],
    "rarity": "☆3",
    "baseRarity": "☆3",
    "nationality": "韓国",
    "policy": "ポゼッション",
    "playStyle": "ハードマーカー",
    "playStyleLevel": "Ⅱ",
    "overall": 6112,
    "maxOverall": 14240,
    "baseStats": {
      "shoot": 850,
      "pass": 980,
      "dribble": 950,
      "defense": 1250,
      "physical": 1210,
      "speed": 872
    },
    "detailStats": {
      "shoot": {
        "finishing": 270,
        "power": 300,
        "composure": 280
      },
      "pass": {
        "shortPass": 330,
        "longPass": 330,
        "accuracy": 320
      },
      "dribble": {
        "breakout": 310,
        "keeping": 320,
        "ballTouch": 320
      },
      "defense": {
        "tackle": 420,
        "interception": 415,
        "marking": 415
      },
      "physical": {
        "jumping": 410,
        "contact": 410,
        "stamina": 390
      },
      "speed": {
        "running": 420,
        "agility": 452
      }
    },
    "maxEnhanced": {
      "overall": 14240,
      "baseStats": {
        "shoot": 2310,
        "pass": 2510,
        "dribble": 2470,
        "defense": 2830,
        "physical": 2760,
        "speed": 1860
      },
      "detailStats": {
        "shoot": {
          "finishing": 760,
          "power": 780,
          "composure": 770
        },
        "pass": {
          "shortPass": 830,
          "longPass": 840,
          "accuracy": 840
        },
        "dribble": {
          "breakout": 820,
          "keeping": 830,
          "ballTouch": 820
        },
        "defense": {
          "tackle": 950,
          "interception": 940,
          "marking": 940
        },
        "physical": {
          "jumping": 930,
          "contact": 930,
          "stamina": 900
        },
        "speed": {
          "running": 910,
          "agility": 950
        }
      }
    },
    "playTendencies": {
      "attack": -1,
      "defense": 2,
      "dribble": -1,
      "shoot": -1,
      "longShoot": -1,
      "shortPass": 0,
      "longPass": 1,
      "throughPass": -1,
      "cutIn": -1,
      "keep": -1,
      "delay": 1,
      "rushOut": 0,
      "feint": -1,
      "press": 2
    },
    "skill": { name: '反撃のパスカット', rank: '銅', description: '発動エリア：中左中右・後左中右　/　発動条件：パスカット時　/　パスカット・ロングパスUP　/　成功時に自身のロングパス発生確率UP' },
    "abilities": [
      { name: 'ハイタワーの天敵', rank: '銀', description: '発動条件：好調　/　マーク・ジャンプUP' },
      { name: '奪取のターゲットマン', rank: '銀', description: '発動条件：好調　/　キープ力・パスカットUP' }
    ],
    "avatarUrl": ""
  },
  {
    "id": "p144",
    "name": "ホン・ジョンホ(K1 BEST11 2025)",
    "readingName": "ほんじょんほ",
    "category": "DF",
    "mainPosition": "CB",
    "subPositions": [],
    "rarity": "☆3",
    "baseRarity": "☆3",
    "nationality": "韓国",
    "policy": "ポゼッション",
    "playStyle": "ハードタッカー",
    "playStyleLevel": "Ⅱ",
    "overall": 6150,
    "maxOverall": 14280,
    "baseStats": {
      "shoot": 860,
      "pass": 1000,
      "dribble": 960,
      "defense": 1260,
      "physical": 1220,
      "speed": 850
    },
    "detailStats": {
      "shoot": {
        "finishing": 280,
        "power": 300,
        "composure": 280
      },
      "pass": {
        "shortPass": 340,
        "longPass": 330,
        "accuracy": 330
      },
      "dribble": {
        "breakout": 320,
        "keeping": 320,
        "ballTouch": 320
      },
      "defense": {
        "tackle": 425,
        "interception": 418,
        "marking": 417
      },
      "physical": {
        "jumping": 415,
        "contact": 415,
        "stamina": 390
      },
      "speed": {
        "running": 410,
        "agility": 440
      }
    },
    "maxEnhanced": {
      "overall": 14280,
      "baseStats": {
        "shoot": 2330,
        "pass": 2540,
        "dribble": 2490,
        "defense": 2850,
        "physical": 2780,
        "speed": 1830
      },
      "detailStats": {
        "shoot": {
          "finishing": 770,
          "power": 790,
          "composure": 770
        },
        "pass": {
          "shortPass": 850,
          "longPass": 840,
          "accuracy": 850
        },
        "dribble": {
          "breakout": 830,
          "keeping": 830,
          "ballTouch": 830
        },
        "defense": {
          "tackle": 960,
          "interception": 945,
          "marking": 945
        },
        "physical": {
          "jumping": 940,
          "contact": 940,
          "stamina": 900
        },
        "speed": {
          "running": 900,
          "agility": 930
        }
      }
    },
    "playTendencies": {
      "attack": -1,
      "defense": 2,
      "dribble": -1,
      "shoot": -1,
      "longShoot": -1,
      "shortPass": 0,
      "longPass": 1,
      "throughPass": -1,
      "cutIn": -1,
      "keep": -1,
      "delay": 1,
      "rushOut": 0,
      "feint": -1,
      "press": 2
    },
    "skill": { name: '鋭角的なタックル', rank: '銅', description: '発動エリア：中左中右・後左中右　/　発動条件：タックル時　/　タックル・コンタクト・マークUP' },
    "abilities": [
      { name: '瞬間の球際力', rank: '銀', description: '発動条件：好調　/　パスカット・コンタクトUP' },
      { name: 'ハイタワーの天敵', rank: '銀', description: '発動条件：好調　/　マーク・ジャンプUP' }
    ],
    "avatarUrl": ""
  },
  {
    "id": "p145",
    "name": "イ・ミョンジェ(K1 BEST11 2025)",
    "readingName": "いみょんじぇ",
    "category": "DF",
    "mainPosition": "LFB",
    "subPositions": [],
    "rarity": "☆3",
    "baseRarity": "☆3",
    "nationality": "韓国",
    "policy": "リアクション",
    "playStyle": "守備的LFB",
    "playStyleLevel": "Ⅱ",
    "overall": 6090,
    "maxOverall": 14210,
    "baseStats": {
      "shoot": 950,
      "pass": 1150,
      "dribble": 1120,
      "defense": 1080,
      "physical": 1050,
      "speed": 840
    },
    "detailStats": {
      "shoot": {
        "finishing": 310,
        "power": 320,
        "composure": 320
      },
      "pass": {
        "shortPass": 380,
        "longPass": 390,
        "accuracy": 380
      },
      "dribble": {
        "breakout": 370,
        "keeping": 370,
        "ballTouch": 380
      },
      "defense": {
        "tackle": 360,
        "interception": 360,
        "marking": 360
      },
      "physical": {
        "jumping": 340,
        "contact": 350,
        "stamina": 360
      },
      "speed": {
        "running": 410,
        "agility": 430
      }
    },
    "maxEnhanced": {
      "overall": 14210,
      "baseStats": {
        "shoot": 2470,
        "pass": 2750,
        "dribble": 2650,
        "defense": 2610,
        "physical": 2580,
        "speed": 1820
      },
      "detailStats": {
        "shoot": {
          "finishing": 810,
          "power": 830,
          "composure": 830
        },
        "pass": {
          "shortPass": 920,
          "longPass": 920,
          "accuracy": 910
        },
        "dribble": {
          "breakout": 880,
          "keeping": 880,
          "ballTouch": 890
        },
        "defense": {
          "tackle": 870,
          "interception": 870,
          "marking": 870
        },
        "physical": {
          "jumping": 850,
          "contact": 860,
          "stamina": 870
        },
        "speed": {
          "running": 900,
          "agility": 920
        }
      }
    },
    "playTendencies": {
      "attack": 1,
      "defense": 0,
      "dribble": 1,
      "shoot": -1,
      "longShoot": 0,
      "shortPass": 1,
      "longPass": 1,
      "throughPass": 0,
      "cutIn": 0,
      "keep": 0,
      "delay": -1,
      "rushOut": 1,
      "feint": 0,
      "press": 1
    },
    "skill": { name: 'ダイナミックタックル', rank: '銅', description: '発動エリア：中左中右・後左中右　/　発動条件：タックル時　/　タックル・マーク・突破力UP　/　成功時に自身のドリブル発生確率UP' },
    "abilities": [
      { name: 'ワイドカッター', rank: '銀', description: '発動条件：好調　/　突破力・パスカットUP' },
      { name: '密着するターゲットマン', rank: '銀', description: '発動条件：好調　/　マーク・キープ力UP' }
    ],
    "avatarUrl": ""
  },
  {
    "id": "p146",
    "name": "キム・ムンファン(K1 BEST11 2025)",
    "readingName": "きむむんはん",
    "category": "DF",
    "mainPosition": "RFB",
    "subPositions": [],
    "rarity": "☆3",
    "baseRarity": "☆3",
    "nationality": "韓国",
    "policy": "リアクション",
    "playStyle": "攻撃的RFB",
    "playStyleLevel": "Ⅱ",
    "overall": 6080,
    "maxOverall": 14200,
    "baseStats": {
      "shoot": 940,
      "pass": 1140,
      "dribble": 1130,
      "defense": 1070,
      "physical": 1060,
      "speed": 850
    },
    "detailStats": {
      "shoot": {
        "finishing": 300,
        "power": 320,
        "composure": 320
      },
      "pass": {
        "shortPass": 380,
        "longPass": 380,
        "accuracy": 380
      },
      "dribble": {
        "breakout": 380,
        "keeping": 370,
        "ballTouch": 380
      },
      "defense": {
        "tackle": 355,
        "interception": 360,
        "marking": 355
      },
      "physical": {
        "jumping": 340,
        "contact": 360,
        "stamina": 360
      },
      "speed": {
        "running": 420,
        "agility": 430
      }
    },
    "maxEnhanced": {
      "overall": 14200,
      "baseStats": {
        "shoot": 2450,
        "pass": 2730,
        "dribble": 2670,
        "defense": 2590,
        "physical": 2600,
        "speed": 1840
      },
      "detailStats": {
        "shoot": {
          "finishing": 800,
          "power": 820,
          "composure": 830
        },
        "pass": {
          "shortPass": 910,
          "longPass": 910,
          "accuracy": 910
        },
        "dribble": {
          "breakout": 890,
          "keeping": 880,
          "ballTouch": 890
        },
        "defense": {
          "tackle": 860,
          "interception": 870,
          "marking": 860
        },
        "physical": {
          "jumping": 850,
          "contact": 870,
          "stamina": 880
        },
        "speed": {
          "running": 910,
          "agility": 930
        }
      }
    },
    "playTendencies": {
      "attack": 1,
      "defense": 0,
      "dribble": 1,
      "shoot": -1,
      "longShoot": 0,
      "shortPass": 1,
      "longPass": 1,
      "throughPass": 0,
      "cutIn": 0,
      "keep": 0,
      "delay": -1,
      "rushOut": 1,
      "feint": 0,
      "press": 1
    },
    "skill": { name: 'テクニカルドリブル', rank: '銅', description: '発動エリア：前左右・中左右　/　発動条件：ドリブル時　/　突破力・キープ力UP　/　成功時に自身のショートパス発生確率UP' },
    "abilities": [
      { name: '高速のボールタッチ', rank: '銀', description: '発動条件：好調　/　ボールタッチ・走力UP' },
      { name: '無限のアジリティ', rank: '銀', description: '発動条件：好調　/　スタミナ・敏捷性UP' }
    ],
    "avatarUrl": ""
  },
  {
    "id": "p147",
    "name": "ソン・ボムグン(K1 BEST11 2025)",
    "readingName": "そんぼむぐん",
    "category": "GK",
    "mainPosition": "GK",
    "subPositions": [],
    "rarity": "☆3",
    "baseRarity": "☆3",
    "nationality": "韓国",
    "policy": "ポゼッション",
    "playStyle": "オーソドックスGK",
    "playStyleLevel": "Ⅱ",
    "overall": 6140,
    "maxOverall": 14270,
    "baseStats": {
      "shoot": 860,
      "pass": 920,
      "dribble": 900,
      "defense": 1250,
      "physical": 1230,
      "speed": 820
    },
    "detailStats": {
      "shoot": {
        "finishing": 280,
        "power": 300,
        "composure": 280
      },
      "pass": {
        "shortPass": 310,
        "longPass": 310,
        "accuracy": 300
      },
      "dribble": {
        "breakout": 300,
        "keeping": 300,
        "ballTouch": 300
      },
      "defense": {
        "tackle": 420,
        "interception": 415,
        "marking": 415
      },
      "physical": {
        "jumping": 420,
        "contact": 415,
        "stamina": 395
      },
      "speed": {
        "running": 400,
        "agility": 420
      }
    },
    "maxEnhanced": {
      "overall": 14270,
      "baseStats": {
        "shoot": 2330,
        "pass": 2470,
        "dribble": 2430,
        "defense": 2830,
        "physical": 2800,
        "speed": 1780
      },
      "detailStats": {
        "shoot": {
          "finishing": 770,
          "power": 790,
          "composure": 770
        },
        "pass": {
          "shortPass": 830,
          "longPass": 830,
          "accuracy": 810
        },
        "dribble": {
          "breakout": 810,
          "keeping": 810,
          "ballTouch": 810
        },
        "defense": {
          "tackle": 950,
          "interception": 940,
          "marking": 940
        },
        "physical": {
          "jumping": 950,
          "contact": 940,
          "stamina": 910
        },
        "speed": {
          "running": 880,
          "agility": 900
        }
      }
    },
    "playTendencies": {
      "attack": -1,
      "defense": 1,
      "dribble": -2,
      "shoot": -1,
      "longShoot": -1,
      "shortPass": -1,
      "longPass": 1,
      "throughPass": -1,
      "cutIn": -1,
      "keep": -1,
      "delay": -1,
      "rushOut": -1,
      "feint": -1,
      "press": -1
    },
    "skill": { name: '驚異的なセービング', rank: '銅', description: '発動エリア：後中　/　発動条件：セービング時　/　セービング・反応速度UP' },
    "abilities": [
      { name: '上空の守護神', rank: '銀', description: '発動条件：好調　/　セービング・ジャンプUP' },
      { name: '俊英な砦', rank: '銀', description: '発動条件：好調　/　1VS1・敏捷性UP' }
    ],
    "avatarUrl": ""
  },
  {
    "id": "p148",
    "name": "ヤザン・アルアラブ(K1 BEST11 2025)",
    "readingName": "やざんあるあらぶ",
    "category": "DF",
    "mainPosition": "CB",
    "subPositions": [],
    "rarity": "☆3",
    "baseRarity": "☆3",
    "nationality": "ヨルダン",
    "policy": "ムービング",
    "playStyle": "ストッパー",
    "playStyleLevel": "Ⅱ",
    "overall": 6130,
    "maxOverall": 14260,
    "baseStats": {
      "shoot": 850,
      "pass": 970,
      "dribble": 940,
      "defense": 1260,
      "physical": 1230,
      "speed": 840
    },
    "detailStats": {
      "shoot": {
        "finishing": 270,
        "power": 300,
        "composure": 280
      },
      "pass": {
        "shortPass": 320,
        "longPass": 320,
        "accuracy": 320
      },
      "dribble": {
        "breakout": 310,
        "keeping": 310,
        "ballTouch": 320
      },
      "defense": {
        "tackle": 425,
        "interception": 418,
        "marking": 417
      },
      "physical": {
        "jumping": 420,
        "contact": 415,
        "stamina": 395
      },
      "speed": {
        "running": 410,
        "agility": 430
      }
    },
    "maxEnhanced": {
      "overall": 14260,
      "baseStats": {
        "shoot": 2310,
        "pass": 2490,
        "dribble": 2440,
        "defense": 2850,
        "physical": 2800,
        "speed": 1810
      },
      "detailStats": {
        "shoot": {
          "finishing": 760,
          "power": 780,
          "composure": 770
        },
        "pass": {
          "shortPass": 830,
          "longPass": 830,
          "accuracy": 830
        },
        "dribble": {
          "breakout": 810,
          "keeping": 810,
          "ballTouch": 820
        },
        "defense": {
          "tackle": 960,
          "interception": 945,
          "marking": 945
        },
        "physical": {
          "jumping": 950,
          "contact": 940,
          "stamina": 910
        },
        "speed": {
          "running": 890,
          "agility": 920
        }
      }
    },
    "playTendencies": {
      "attack": -1,
      "defense": 2,
      "dribble": -1,
      "shoot": -1,
      "longShoot": -1,
      "shortPass": 0,
      "longPass": 1,
      "throughPass": -1,
      "cutIn": -1,
      "keep": -1,
      "delay": 1,
      "rushOut": 0,
      "feint": -1,
      "press": 2
    },
    "skill": { name: '冴え渡るインターセプト', rank: '銅', description: '発動エリア：中左中右・後左中右　/　発動条件：パスカット時　/　パスカット・敏捷性UP' },
    "abilities": [
      { name: 'エレガントスティール', rank: '銀', description: '発動条件：絶好調　/　ボールタッチ・パスカットUP' },
      { name: '制空のボールタッチ', rank: '銀', description: '発動条件：好調　/　ボールタッチ・ジャンプUP' }
    ],
    "avatarUrl": ""
  }
  ,
  {
    id: 'p149',
    name: '荒木隼人(2026)',
    readingName: 'あらきはやと',
    category: 'DF',
    mainPosition: 'CB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'ムービング',
    playStyle: 'ストッパー',
    playStyleLevel: 'Ⅱ',
    overall: 6431,
    maxOverall: 14684,
    baseStats: { shoot: 1068, pass: 1072, dribble: 1049, defense: 1257, physical: 1244, speed: 659 },
    detailStats: {
      shoot: { finishing: 358, power: 368, composure: 342 },
      pass: { shortPass: 356, longPass: 356, accuracy: 360 },
      dribble: { breakout: 334, keeping: 340, ballTouch: 375 },
      defense: { tackle: 403, interception: 428, marking: 426 },
      physical: { jumping: 410, contact: 440, stamina: 394 },
      speed: { running: 333, agility: 326 }
    },
    maxEnhanced: {
      overall: 14684,
      baseStats: { shoot: 2565, pass: 2641, dribble: 2582, defense: 2862, physical: 2837, speed: 1705 },
      detailStats: {
        shoot: { finishing: 857, power: 867, composure: 841 },
        pass: { shortPass: 879, longPass: 879, accuracy: 883 },
        dribble: { breakout: 845, keeping: 851, ballTouch: 886 },
        defense: { tackle: 938, interception: 963, marking: 961 },
        physical: { jumping: 945, contact: 975, stamina: 917 },
        speed: { running: 856, agility: 849 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -1, shoot: -1, longShoot: -1,
      shortPass: 0, longPass: 0, throughPass: -1, cutIn: -1, keep: -1,
      delay: 0, rushOut: -1, feint: -1, press: 1
    },
    skill: { name: '冴え渡るインターセプト', rank: '銅', description: '発動エリア：中左中右・後左中右　/　発動条件：パスカット時　/　パスカット・敏捷性UP' },
    abilities: [
      { name: 'ストロングマーカー', rank: '銀', description: '発動条件：好調　/　マーク・コンタクトUP' },
      { name: 'ピッチの掃除屋', rank: '銀', description: '発動条件：好調　/　タックル・スタミナUP' }
    ],
    avatarUrl: ''
  }
  ,
  {
    id: 'p150',
    name: 'マテイ・ヨニッチ(2026)',
    readingName: 'まていよにっち',
    category: 'DF',
    mainPosition: 'CB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'クロアチア',
    policy: 'ムービング',
    playStyle: 'ストッパー',
    playStyleLevel: 'Ⅱ',
    overall: 6313,
    maxOverall: 14570,
    baseStats: { shoot: 1033, pass: 1077, dribble: 1031, defense: 1245, physical: 1177, speed: 681 },
    detailStats: {
      shoot: { finishing: 320, power: 381, composure: 332 },
      pass: { shortPass: 341, longPass: 379, accuracy: 357 },
      dribble: { breakout: 321, keeping: 376, ballTouch: 334 },
      defense: { tackle: 465, interception: 387, marking: 393 },
      physical: { jumping: 403, contact: 380, stamina: 394 },
      speed: { running: 312, agility: 369 }
    },
    maxEnhanced: {
      overall: 14570,
      baseStats: { shoot: 2530, pass: 2646, dribble: 2564, defense: 2850, physical: 2770, speed: 1727 },
      detailStats: {
        shoot: { finishing: 819, power: 880, composure: 831 },
        pass: { shortPass: 864, longPass: 902, accuracy: 880 },
        dribble: { breakout: 832, keeping: 887, ballTouch: 845 },
        defense: { tackle: 1000, interception: 922, marking: 928 },
        physical: { jumping: 938, contact: 915, stamina: 917 },
        speed: { running: 835, agility: 892 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -1, shoot: -1, longShoot: -1,
      shortPass: 0, longPass: 0, throughPass: -1, cutIn: -1, keep: -1,
      delay: 0, rushOut: -1, feint: -1, press: 1
    },
    skill: { name: '鋭角的なタックル', rank: '銅', description: '発動エリア：中左中右・後左中右　/　発動条件：タックル時　/　タックル・コンタクト・マークUP' },
    abilities: [
      { name: 'ボールハンター', rank: '銀', description: '発動条件：絶好調　/　タックル・マークUP' },
      { name: 'ムービングウォール', rank: '銀', description: '発動条件：絶好調　/　コンタクト・スタミナUP' }
    ],
    avatarUrl: ''
  }
  ,
  {
    id: 'p151',
    name: '立田悠悟(2026)',
    readingName: 'たつたゆうご',
    category: 'DF',
    mainPosition: 'CB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'カウンター',
    playStyle: 'ストッパー',
    playStyleLevel: 'Ⅱ',
    overall: 6268,
    maxOverall: 14524,
    baseStats: { shoot: 1027, pass: 1084, dribble: 1118, defense: 1196, physical: 1231, speed: 666 },
    detailStats: {
      shoot: { finishing: 316, power: 381, composure: 330 },
      pass: { shortPass: 376, longPass: 368, accuracy: 340 },
      dribble: { breakout: 366, keeping: 371, ballTouch: 381 },
      defense: { tackle: 433, interception: 362, marking: 401 },
      physical: { jumping: 431, contact: 411, stamina: 389 },
      speed: { running: 320, agility: 346 }
    },
    maxEnhanced: {
      overall: 14524,
      baseStats: { shoot: 2524, pass: 2653, dribble: 2651, defense: 2801, physical: 2824, speed: 1712 },
      detailStats: {
        shoot: { finishing: 815, power: 880, composure: 829 },
        pass: { shortPass: 899, longPass: 891, accuracy: 863 },
        dribble: { breakout: 877, keeping: 882, ballTouch: 892 },
        defense: { tackle: 968, interception: 897, marking: 936 },
        physical: { jumping: 966, contact: 946, stamina: 912 },
        speed: { running: 843, agility: 869 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -1, shoot: -1, longShoot: -1,
      shortPass: 0, longPass: 0, throughPass: -1, cutIn: -1, keep: -1,
      delay: 0, rushOut: -1, feint: -1, press: 1
    },
    skill: { name: '鋭角的なタックル', rank: '銅', description: '発動エリア：中左中右・後左中右　/　発動条件：タックル時　/　タックル・コンタクト・マークUP' },
    abilities: [
      { name: 'ハードタックラー', rank: '銀', description: '発動条件：好調　/　タックル・コンタクトUP' },
      { name: '不屈のパサー', rank: '銀', description: '発動条件：途中出場　/　ショートパス・スタミナUP' }
    ],
    avatarUrl: ''
  }
  ,
  {
    id: 'p152',
    name: '岡哲平(2026)',
    readingName: 'おかてっぺい',
    category: 'DF',
    mainPosition: 'CB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'カウンター',
    playStyle: 'ストッパー',
    playStyleLevel: 'Ⅱ',
    overall: 6239,
    maxOverall: 14501,
    baseStats: { shoot: 903, pass: 1120, dribble: 1010, defense: 1161, physical: 1175, speed: 757 },
    detailStats: {
      shoot: { finishing: 279, power: 317, composure: 307 },
      pass: { shortPass: 375, longPass: 392, accuracy: 353 },
      dribble: { breakout: 306, keeping: 326, ballTouch: 378 },
      defense: { tackle: 392, interception: 385, marking: 384 },
      physical: { jumping: 419, contact: 406, stamina: 350 },
      speed: { running: 381, agility: 376 }
    },
    maxEnhanced: {
      overall: 14501,
      baseStats: { shoot: 2400, pass: 2689, dribble: 2543, defense: 2766, physical: 2768, speed: 1803 },
      detailStats: {
        shoot: { finishing: 778, power: 816, composure: 806 },
        pass: { shortPass: 898, longPass: 915, accuracy: 876 },
        dribble: { breakout: 817, keeping: 837, ballTouch: 889 },
        defense: { tackle: 927, interception: 920, marking: 919 },
        physical: { jumping: 954, contact: 941, stamina: 873 },
        speed: { running: 904, agility: 899 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -1, shoot: -1, longShoot: -1,
      shortPass: 0, longPass: 0, throughPass: -1, cutIn: -1, keep: -1,
      delay: 0, rushOut: -1, feint: -1, press: 1
    },
    skill: { name: '鋭角的なタックル', rank: '銅', description: '発動エリア：中左中右・後左中右　/　発動条件：タックル時　/　タックル・コンタクト・マークUP' },
    abilities: [
      { name: 'エアバトラー', rank: '銀', description: '発動条件：絶好調　/　タックル・ジャンプUP' },
      { name: 'リスクヘッジロングパサー', rank: '銀', description: '発動条件：途中出場　/　ロングパス・マークUP' }
    ],
    avatarUrl: ''
  }
  ,
  {
    id: 'p153',
    name: '岩下航(2026)',
    readingName: 'いわしたわたる',
    category: 'DF',
    mainPosition: 'CB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'ムービング',
    playStyle: 'ストッパー',
    playStyleLevel: 'Ⅱ',
    overall: 6062,
    maxOverall: 14300,
    baseStats: { shoot: 990, pass: 1112, dribble: 1098, defense: 1116, physical: 1173, speed: 784 },
    detailStats: {
      shoot: { finishing: 328, power: 345, composure: 317 },
      pass: { shortPass: 374, longPass: 374, accuracy: 364 },
      dribble: { breakout: 383, keeping: 355, ballTouch: 360 },
      defense: { tackle: 390, interception: 378, marking: 348 },
      physical: { jumping: 368, contact: 385, stamina: 420 },
      speed: { running: 388, agility: 396 }
    },
    maxEnhanced: {
      overall: 14300,
      baseStats: { shoot: 2487, pass: 2681, dribble: 2631, defense: 2721, physical: 2766, speed: 1830 },
      detailStats: {
        shoot: { finishing: 827, power: 844, composure: 816 },
        pass: { shortPass: 897, longPass: 897, accuracy: 887 },
        dribble: { breakout: 894, keeping: 866, ballTouch: 871 },
        defense: { tackle: 925, interception: 913, marking: 883 },
        physical: { jumping: 903, contact: 920, stamina: 943 },
        speed: { running: 911, agility: 919 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -1, shoot: -1, longShoot: -1,
      shortPass: 0, longPass: 0, throughPass: -1, cutIn: -1, keep: -1,
      delay: 0, rushOut: -1, feint: -1, press: 1
    },
    skill: { name: '鋭角的なタックル', rank: '銅', description: '発動エリア：中左中右・後左中右　/　発動条件：タックル時　/　タックル・コンタクト・マークUP' },
    abilities: [
      { name: 'ムービングウォール', rank: '銀', description: '発動条件：絶好調　/　コンタクト・スタミナUP' },
      { name: 'アジャイルクラッシャー', rank: '銀', description: '発動条件：好調　/　タックル・敏捷性UP' }
    ],
    avatarUrl: ''
  }
  ,
  {
    id: 'p154',
    name: '喜岡佳太(2026)',
    readingName: 'よしおかけいた',
    category: 'DF',
    mainPosition: 'CB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'リアクション',
    playStyle: 'ストッパー',
    playStyleLevel: 'Ⅱ',
    overall: 6007,
    maxOverall: 14269,
    baseStats: { shoot: 870, pass: 927, dribble: 1017, defense: 1171, physical: 1183, speed: 632 },
    detailStats: {
      shoot: { finishing: 276, power: 276, composure: 318 },
      pass: { shortPass: 338, longPass: 306, accuracy: 283 },
      dribble: { breakout: 353, keeping: 322, ballTouch: 342 },
      defense: { tackle: 391, interception: 391, marking: 389 },
      physical: { jumping: 411, contact: 397, stamina: 375 },
      speed: { running: 313, agility: 319 }
    },
    maxEnhanced: {
      overall: 14269,
      baseStats: { shoot: 2367, pass: 2496, dribble: 2550, defense: 2776, physical: 2776, speed: 1678 },
      detailStats: {
        shoot: { finishing: 775, power: 775, composure: 817 },
        pass: { shortPass: 861, longPass: 829, accuracy: 806 },
        dribble: { breakout: 864, keeping: 833, ballTouch: 853 },
        defense: { tackle: 926, interception: 926, marking: 924 },
        physical: { jumping: 946, contact: 932, stamina: 898 },
        speed: { running: 836, agility: 842 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -1, shoot: -1, longShoot: -1,
      shortPass: 0, longPass: 0, throughPass: -1, cutIn: -1, keep: -1,
      delay: 0, rushOut: -1, feint: -1, press: 1
    },
    skill: { name: 'ダイナミックタックル', rank: '銅', description: '発動エリア：中左中右・後左中右　/　発動条件：タックル時　/　タックル・マーク・突破力UP　/　成功時に自身のドリブル発生確率UP' },
    abilities: [
      { name: 'エアバトラー', rank: '銀', description: '発動条件：絶好調　/　タックル・ジャンプUP' },
      { name: 'エンドレスマーカー', rank: '銀', description: '発動条件：好調　/　マーク・スタミナUP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p155',
    name: '西山大雅(2026)',
    readingName: 'にしやまたいが',
    category: 'DF',
    mainPosition: 'CB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'リアクション',
    playStyle: 'ストッパー',
    playStyleLevel: 'Ⅱ',
    overall: 6016,
    maxOverall: 14279,
    baseStats: { shoot: 949, pass: 923, dribble: 1054, defense: 1170, physical: 1156, speed: 593 },
    detailStats: {
      shoot: { finishing: 304, power: 333, composure: 312 },
      pass: { shortPass: 317, longPass: 314, accuracy: 292 },
      dribble: { breakout: 342, keeping: 352, ballTouch: 360 },
      defense: { tackle: 378, interception: 389, marking: 403 },
      physical: { jumping: 410, contact: 410, stamina: 336 },
      speed: { running: 280, agility: 313 }
    },
    maxEnhanced: {
      overall: 14279,
      baseStats: { shoot: 2446, pass: 2492, dribble: 2587, defense: 2775, physical: 2749, speed: 1639 },
      detailStats: {
        shoot: { finishing: 803, power: 832, composure: 811 },
        pass: { shortPass: 840, longPass: 837, accuracy: 815 },
        dribble: { breakout: 853, keeping: 863, ballTouch: 871 },
        defense: { tackle: 913, interception: 924, marking: 938 },
        physical: { jumping: 945, contact: 945, stamina: 859 },
        speed: { running: 803, agility: 836 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -1, shoot: -1, longShoot: -1,
      shortPass: 0, longPass: 0, throughPass: -1, cutIn: -1, keep: -1,
      delay: 0, rushOut: -1, feint: -1, press: 1
    },
    skill: { name: '冴え渡るインターセプト', rank: '銅', description: '発動エリア：中左中右・後左中右　/　発動条件：パスカット時　/　パスカット・敏捷性UP' },
    abilities: [
      { name: 'ハイタワーの天敵', rank: '銀', description: '発動条件：好調　/　マーク・ジャンプUP' },
      { name: '瞬間の球際力', rank: '銀', description: '発動条件：好調　/　パスカット・コンタクトUP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p156',
    name: 'ジュリアン・セレスティン(2026)',
    readingName: 'じゅりあんせれすてぃん',
    category: 'DF',
    mainPosition: 'CB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'フランス',
    policy: 'ムービング',
    playStyle: 'ストッパー',
    playStyleLevel: 'Ⅱ',
    overall: 6357,
    maxOverall: 14629,
    baseStats: { shoot: 1031, pass: 891, dribble: 1084, defense: 1259, physical: 1216, speed: 720 },
    detailStats: {
      shoot: { finishing: 323, power: 366, composure: 342 },
      pass: { shortPass: 291, longPass: 289, accuracy: 311 },
      dribble: { breakout: 365, keeping: 373, ballTouch: 346 },
      defense: { tackle: 402, interception: 427, marking: 430 },
      physical: { jumping: 437, contact: 406, stamina: 373 },
      speed: { running: 347, agility: 373 }
    },
    maxEnhanced: {
      overall: 14629,
      baseStats: { shoot: 2528, pass: 2460, dribble: 2617, defense: 2864, physical: 2809, speed: 1766 },
      detailStats: {
        shoot: { finishing: 822, power: 865, composure: 841 },
        pass: { shortPass: 814, longPass: 812, accuracy: 834 },
        dribble: { breakout: 876, keeping: 884, ballTouch: 857 },
        defense: { tackle: 937, interception: 962, marking: 965 },
        physical: { jumping: 972, contact: 941, stamina: 896 },
        speed: { running: 870, agility: 896 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -1, shoot: -1, longShoot: -1,
      shortPass: 0, longPass: 0, throughPass: -1, cutIn: -1, keep: -1,
      delay: 0, rushOut: -1, feint: -1, press: 1
    },
    skill: { name: '冴え渡るインターセプト', rank: '銅', description: '発動エリア：中左中右・後左中右　/　発動条件：パスカット時　/　パスカット・敏捷性UP' },
    abilities: [
      { name: '上空の寸断者', rank: '銀', description: '発動条件：好調　/　パスカット・ジャンプUP' },
      { name: 'ストロングマーカー', rank: '銀', description: '発動条件：好調　/　マーク・コンタクトUP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p157',
    name: '塩谷司(2026)',
    readingName: 'しおたにつかさ',
    category: 'DF',
    mainPosition: 'CB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'ムービング',
    playStyle: '組立CB',
    playStyleLevel: 'Ⅱ',
    overall: 6497,
    maxOverall: 14754,
    baseStats: { shoot: 1052, pass: 1223, dribble: 1035, defense: 1286, physical: 1126, speed: 674 },
    detailStats: {
      shoot: { finishing: 342, power: 357, composure: 353 },
      pass: { shortPass: 384, longPass: 398, accuracy: 441 },
      dribble: { breakout: 335, keeping: 335, ballTouch: 365 },
      defense: { tackle: 426, interception: 429, marking: 431 },
      physical: { jumping: 357, contact: 392, stamina: 377 },
      speed: { running: 329, agility: 345 }
    },
    maxEnhanced: {
      overall: 14754,
      baseStats: { shoot: 2549, pass: 2792, dribble: 2568, defense: 2891, physical: 2719, speed: 1720 },
      detailStats: {
        shoot: { finishing: 841, power: 856, composure: 852 },
        pass: { shortPass: 907, longPass: 921, accuracy: 964 },
        dribble: { breakout: 846, keeping: 846, ballTouch: 876 },
        defense: { tackle: 961, interception: 964, marking: 966 },
        physical: { jumping: 892, contact: 927, stamina: 900 },
        speed: { running: 852, agility: 868 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -1, shoot: -1, longShoot: -1,
      shortPass: 0, longPass: 0, throughPass: -1, cutIn: -1, keep: -1,
      delay: 0, rushOut: -1, feint: -1, press: 1
    },
    skill: { name: '反撃のパスカット', rank: '銅', description: '発動エリア：中左中右・後左中右　/　発動条件：パスカット時　/　パスカット・ロングパスUP　/　成功時に自身のロングパス発生確率UP' },
    abilities: [
      { name: 'インターセプター', rank: '銀', description: '発動条件：好調　/　パスカット・マークUP' },
      { name: '競り合うロングパサー', rank: '銀', description: '発動条件：途中出場　/　ロングパス・コンタクトUP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p158',
    name: '昌子源(2026)',
    readingName: 'しょうじげん',
    category: 'DF',
    mainPosition: 'CB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'カウンター',
    playStyle: '組立CB',
    playStyleLevel: 'Ⅱ',
    overall: 6510,
    maxOverall: 14750,
    baseStats: { shoot: 996, pass: 1117, dribble: 1196, defense: 1295, physical: 1171, speed: 620 },
    detailStats: {
      shoot: { finishing: 311, power: 365, composure: 320 },
      pass: { shortPass: 358, longPass: 380, accuracy: 379 },
      dribble: { breakout: 375, keeping: 397, ballTouch: 424 },
      defense: { tackle: 433, interception: 432, marking: 430 },
      physical: { jumping: 386, contact: 414, stamina: 371 },
      speed: { running: 301, agility: 319 }
    },
    maxEnhanced: {
      overall: 14750,
      baseStats: { shoot: 2493, pass: 2686, dribble: 2729, defense: 2900, physical: 2764, speed: 1666 },
      detailStats: {
        shoot: { finishing: 810, power: 864, composure: 819 },
        pass: { shortPass: 881, longPass: 903, accuracy: 902 },
        dribble: { breakout: 886, keeping: 908, ballTouch: 935 },
        defense: { tackle: 968, interception: 967, marking: 965 },
        physical: { jumping: 921, contact: 949, stamina: 894 },
        speed: { running: 824, agility: 842 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -1, shoot: -1, longShoot: -1,
      shortPass: 0, longPass: 0, throughPass: -1, cutIn: -1, keep: -1,
      delay: 0, rushOut: -1, feint: -1, press: 1
    },
    skill: { name: '鋭角的なタックル', rank: '銅', description: '発動エリア：中左中右・後左中右　/　発動条件：タックル時　/　タックル・コンタクト・マークUP' },
    abilities: [
      { name: 'ハードタックラー', rank: '銀', description: '発動条件：好調　/　タックル・コンタクトUP' },
      { name: 'インターセプター', rank: '銀', description: '発動条件：好調　/　パスカット・マークUP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p159',
    name: '畠中槙之輔(2026)',
    readingName: 'はたなかしんのすけ',
    category: 'DF',
    mainPosition: 'CB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'ポゼッション',
    playStyle: '組立CB',
    playStyleLevel: 'Ⅱ',
    overall: 6300,
    maxOverall: 14528,
    baseStats: { shoot: 1004, pass: 1120, dribble: 1272, defense: 1042, physical: 1118, speed: 860 },
    detailStats: {
      shoot: { finishing: 314, power: 346, composure: 344 },
      pass: { shortPass: 374, longPass: 374, accuracy: 372 },
      dribble: { breakout: 420, keeping: 429, ballTouch: 423 },
      defense: { tackle: 353, interception: 359, marking: 330 },
      physical: { jumping: 363, contact: 333, stamina: 422 },
      speed: { running: 424, agility: 436 }
    },
    maxEnhanced: {
      overall: 14528,
      baseStats: { shoot: 2501, pass: 2689, dribble: 2805, defense: 2647, physical: 2687, speed: 1930 },
      detailStats: {
        shoot: { finishing: 813, power: 845, composure: 843 },
        pass: { shortPass: 897, longPass: 897, accuracy: 895 },
        dribble: { breakout: 931, keeping: 940, ballTouch: 934 },
        defense: { tackle: 888, interception: 894, marking: 865 },
        physical: { jumping: 874, contact: 856, stamina: 957 },
        speed: { running: 959, agility: 971 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -1, shoot: -1, longShoot: -1,
      shortPass: 0, longPass: 0, throughPass: -1, cutIn: -1, keep: -1,
      delay: 0, rushOut: -1, feint: -1, press: 1
    },
    skill: { name: '鋭角的なタックル', rank: '銅', description: '発動エリア：中左中右・後左中右　/　発動条件：タックル時　/　タックル・コンタクト・マークUP' },
    abilities: [
      { name: 'ピッチの掃除屋', rank: '銀', description: '発動条件：好調　/　タックル・スタミナUP' },
      { name: '跳躍するロングパサー', rank: '銀', description: '発動条件：途中出場　/　ロングパス・ジャンプUP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p160',
    name: '根本健太(2026)',
    readingName: 'ねもとけんた',
    category: 'DF',
    mainPosition: 'CB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'ポゼッション',
    playStyle: '組立CB',
    playStyleLevel: 'Ⅱ',
    overall: 6414,
    maxOverall: 14664,
    baseStats: { shoot: 923, pass: 1101, dribble: 1050, defense: 1258, physical: 1171, speed: 727 },
    detailStats: {
      shoot: { finishing: 287, power: 339, composure: 297 },
      pass: { shortPass: 365, longPass: 384, accuracy: 352 },
      dribble: { breakout: 334, keeping: 345, ballTouch: 371 },
      defense: { tackle: 401, interception: 419, marking: 438 },
      physical: { jumping: 386, contact: 397, stamina: 388 },
      speed: { running: 371, agility: 356 }
    },
    maxEnhanced: {
      overall: 14664,
      baseStats: { shoot: 2420, pass: 2670, dribble: 2583, defense: 2863, physical: 2764, speed: 1773 },
      detailStats: {
        shoot: { finishing: 786, power: 838, composure: 796 },
        pass: { shortPass: 888, longPass: 907, accuracy: 875 },
        dribble: { breakout: 845, keeping: 856, ballTouch: 882 },
        defense: { tackle: 936, interception: 954, marking: 973 },
        physical: { jumping: 921, contact: 932, stamina: 911 },
        speed: { running: 894, agility: 879 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -1, shoot: -1, longShoot: -1,
      shortPass: 0, longPass: 0, throughPass: -1, cutIn: -1, keep: -1,
      delay: 0, rushOut: -1, feint: -1, press: 1
    },
    skill: { name: '奮戦のパスカット', rank: '銅', description: '発動エリア：中左中右・後左中右　/　発動条件：パスカット時　/　パスカットUP　/　成功時に自身のショートパス発生確率UP' },
    abilities: [
      { name: 'ストロングマーカー', rank: '銀', description: '発動条件：好調　/　マーク・コンタクトUP' },
      { name: 'ボールスティーラー', rank: '銀', description: '発動条件：途中出場　/　タックル・パスカットUP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p161',
    name: '細井響(2026)',
    readingName: 'ほそいきょう',
    category: 'DF',
    mainPosition: 'CB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'リアクション',
    playStyle: '組立CB',
    playStyleLevel: 'Ⅱ',
    overall: 6226,
    maxOverall: 14470,
    baseStats: { shoot: 866, pass: 1161, dribble: 1089, defense: 1174, physical: 1152, speed: 687 },
    detailStats: {
      shoot: { finishing: 284, power: 293, composure: 289 },
      pass: { shortPass: 380, longPass: 404, accuracy: 377 },
      dribble: { breakout: 372, keeping: 349, ballTouch: 368 },
      defense: { tackle: 395, interception: 380, marking: 399 },
      physical: { jumping: 391, contact: 378, stamina: 383 },
      speed: { running: 323, agility: 364 }
    },
    maxEnhanced: {
      overall: 14470,
      baseStats: { shoot: 2363, pass: 2730, dribble: 2622, defense: 2779, physical: 2745, speed: 1733 },
      detailStats: {
        shoot: { finishing: 783, power: 792, composure: 788 },
        pass: { shortPass: 903, longPass: 927, accuracy: 900 },
        dribble: { breakout: 883, keeping: 860, ballTouch: 879 },
        defense: { tackle: 930, interception: 915, marking: 934 },
        physical: { jumping: 926, contact: 913, stamina: 906 },
        speed: { running: 846, agility: 887 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -1, shoot: -1, longShoot: -1,
      shortPass: 0, longPass: 0, throughPass: -1, cutIn: -1, keep: -1,
      delay: 0, rushOut: -1, feint: -1, press: 1
    },
    skill: { name: '奮戦のタックル', rank: '銅', description: '発動エリア：中左中右・後左中右　/　発動条件：タックル時　/　タックル・マーク・ショートパスUP　/　成功時に自身のショートパス発生確率UP' },
    abilities: [
      { name: 'リスクヘッジロングパサー', rank: '銀', description: '発動条件：途中出場　/　ロングパス・マークUP' },
      { name: '瞬間の球際力', rank: '銀', description: '発動条件：好調　/　パスカット・コンタクトUP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p162',
    name: 'フアン・アントニオ・ロス(2026)',
    readingName: 'ふあんあんとにおろす',
    category: 'DF',
    mainPosition: 'CB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'スペイン',
    policy: 'ムービング',
    playStyle: '組立CB',
    playStyleLevel: 'Ⅱ',
    overall: 6481,
    maxOverall: 14731,
    baseStats: { shoot: 939, pass: 1157, dribble: 1130, defense: 1251, physical: 1173, speed: 732 },
    detailStats: {
      shoot: { finishing: 293, power: 326, composure: 320 },
      pass: { shortPass: 406, longPass: 388, accuracy: 363 },
      dribble: { breakout: 366, keeping: 368, ballTouch: 396 },
      defense: { tackle: 411, interception: 426, marking: 414 },
      physical: { jumping: 411, contact: 378, stamina: 384 },
      speed: { running: 381, agility: 351 }
    },
    maxEnhanced: {
      overall: 14731,
      baseStats: { shoot: 2436, pass: 2726, dribble: 2663, defense: 2856, physical: 2766, speed: 1778 },
      detailStats: {
        shoot: { finishing: 792, power: 825, composure: 819 },
        pass: { shortPass: 929, longPass: 911, accuracy: 886 },
        dribble: { breakout: 877, keeping: 879, ballTouch: 907 },
        defense: { tackle: 946, interception: 961, marking: 949 },
        physical: { jumping: 946, contact: 913, stamina: 907 },
        speed: { running: 904, agility: 874 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -1, shoot: -1, longShoot: -1,
      shortPass: 0, longPass: 0, throughPass: -1, cutIn: -1, keep: -1,
      delay: 0, rushOut: -1, feint: -1, press: 1
    },
    skill: { name: '奮戦のパスカット', rank: '銅', description: '発動エリア：中左中右・後左中右　/　発動条件：パスカット時　/　パスカットUP　/　成功時に自身のショートパス発生確率UP' },
    abilities: [
      { name: '上空の寸断者', rank: '銀', description: '発動条件：好調　/　パスカット・ジャンプUP' },
      { name: 'ボールハンター', rank: '銀', description: '発動条件：絶好調　/　タックル・マークUP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p163',
    name: '藤井陽也(2026)',
    readingName: 'ふじいはるや',
    category: 'DF',
    mainPosition: 'CB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'カウンター',
    playStyle: 'スプリントCB',
    playStyleLevel: 'Ⅱ',
    overall: 6356,
    maxOverall: 14598,
    baseStats: { shoot: 885, pass: 1016, dribble: 1079, defense: 1299, physical: 1072, speed: 819 },
    detailStats: {
      shoot: { finishing: 291, power: 312, composure: 282 },
      pass: { shortPass: 329, longPass: 339, accuracy: 348 },
      dribble: { breakout: 372, keeping: 343, ballTouch: 364 },
      defense: { tackle: 430, interception: 439, marking: 430 },
      physical: { jumping: 398, contact: 334, stamina: 340 },
      speed: { running: 403, agility: 416 }
    },
    maxEnhanced: {
      overall: 14598,
      baseStats: { shoot: 2382, pass: 2585, dribble: 2612, defense: 2904, physical: 2665, speed: 1865 },
      detailStats: {
        shoot: { finishing: 790, power: 811, composure: 781 },
        pass: { shortPass: 852, longPass: 862, accuracy: 871 },
        dribble: { breakout: 883, keeping: 854, ballTouch: 875 },
        defense: { tackle: 965, interception: 974, marking: 965 },
        physical: { jumping: 933, contact: 869, stamina: 863 },
        speed: { running: 926, agility: 939 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -1, shoot: -1, longShoot: -1,
      shortPass: 0, longPass: 0, throughPass: -1, cutIn: -1, keep: -1,
      delay: 0, rushOut: -1, feint: -1, press: 1
    },
    skill: { name: '冴え渡るインターセプト', rank: '銅', description: '発動エリア：中左中右・後左中右　/　発動条件：パスカット時　/　パスカット・敏捷性UP' },
    abilities: [
      { name: 'インターセプター', rank: '銀', description: '発動条件：好調　/　パスカット・マークUP' },
      { name: 'ランニングジャンパー', rank: '銀', description: '発動条件：絶好調　/　ジャンプ・走力UP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p164',
    name: '酒井高徳(2026)',
    readingName: 'さかいごうとく',
    category: 'DF',
    mainPosition: 'RFB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'カウンター',
    playStyle: '守備的RFB',
    playStyleLevel: 'Ⅱ',
    overall: 6531,
    maxOverall: 14775,
    baseStats: { shoot: 1181, pass: 1186, dribble: 1159, defense: 1309, physical: 1192, speed: 727 },
    detailStats: {
      shoot: { finishing: 387, power: 388, composure: 406 },
      pass: { shortPass: 390, longPass: 394, accuracy: 402 },
      dribble: { breakout: 370, keeping: 383, ballTouch: 406 },
      defense: { tackle: 428, interception: 440, marking: 441 },
      physical: { jumping: 386, contact: 384, stamina: 422 },
      speed: { running: 363, agility: 364 }
    },
    maxEnhanced: {
      overall: 14775,
      baseStats: { shoot: 2678, pass: 2755, dribble: 2692, defense: 2914, physical: 2761, speed: 1797 },
      detailStats: {
        shoot: { finishing: 886, power: 887, composure: 905 },
        pass: { shortPass: 913, longPass: 917, accuracy: 925 },
        dribble: { breakout: 881, keeping: 894, ballTouch: 917 },
        defense: { tackle: 963, interception: 975, marking: 976 },
        physical: { jumping: 897, contact: 907, stamina: 957 },
        speed: { running: 898, agility: 899 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -1, shoot: -1, longShoot: -1,
      shortPass: 0, longPass: 0, throughPass: -1, cutIn: -1, keep: -1,
      delay: 0, rushOut: -1, feint: -1, press: 1
    },
    skill: { name: '反撃のパスカット', rank: '銅', description: '発動エリア：中左中右・後左中右　/　発動条件：パスカット時　/　パスカット・ロングパスUP　/　成功時に自身のロングパス発生確率UP' },
    abilities: [
      { name: 'エンドレスマーカー', rank: '銀', description: '発動条件：好調　/　マーク・スタミナUP' },
      { name: 'ボールスティーラー', rank: '銀', description: '発動条件：途中出場　/　タックル・パスカットUP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p165',
    name: '望月ヘンリー海輝(2026)',
    readingName: 'もちづきへんりーひろき',
    category: 'DF',
    mainPosition: 'RFB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'カウンター',
    playStyle: '守備的RFB',
    playStyleLevel: 'Ⅱ',
    overall: 6292,
    maxOverall: 14501,
    baseStats: { shoot: 940, pass: 1016, dribble: 1093, defense: 1136, physical: 1300, speed: 849 },
    detailStats: {
      shoot: { finishing: 280, power: 381, composure: 279 },
      pass: { shortPass: 336, longPass: 388, accuracy: 292 },
      dribble: { breakout: 391, keeping: 361, ballTouch: 341 },
      defense: { tackle: 390, interception: 377, marking: 369 },
      physical: { jumping: 456, contact: 436, stamina: 408 },
      speed: { running: 424, agility: 425 }
    },
    maxEnhanced: {
      overall: 14501,
      baseStats: { shoot: 2437, pass: 2585, dribble: 2626, defense: 2741, physical: 2869, speed: 1919 },
      detailStats: {
        shoot: { finishing: 779, power: 880, composure: 778 },
        pass: { shortPass: 859, longPass: 911, accuracy: 815 },
        dribble: { breakout: 902, keeping: 872, ballTouch: 852 },
        defense: { tackle: 925, interception: 912, marking: 904 },
        physical: { jumping: 967, contact: 959, stamina: 943 },
        speed: { running: 959, agility: 960 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -1, shoot: -1, longShoot: -1,
      shortPass: 0, longPass: 0, throughPass: -1, cutIn: -1, keep: -1,
      delay: 0, rushOut: -1, feint: -1, press: 1
    },
    skill: { name: '鋭角的なタックル', rank: '銅', description: '発動エリア：中左中右・後左中右　/　発動条件：タックル時　/　タックル・コンタクト・マークUP' },
    abilities: [
      { name: 'パワフルジャンパー', rank: '銀', description: '発動条件：好調　/　ジャンプ・コンタクトUP' },
      { name: 'スピードランナー', rank: '銀', description: '発動条件：好調　/　走力・敏捷性UP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p166',
    name: '生駒稀生(2026)',
    readingName: 'いこまけい',
    category: 'DF',
    mainPosition: 'RFB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'ポゼッション',
    playStyle: '守備的RFB',
    playStyleLevel: 'Ⅱ',
    overall: 5936,
    maxOverall: 14173,
    baseStats: { shoot: 1146, pass: 1097, dribble: 1121, defense: 1219, physical: 1078, speed: 659 },
    detailStats: {
      shoot: { finishing: 372, power: 405, composure: 369 },
      pass: { shortPass: 386, longPass: 376, accuracy: 335 },
      dribble: { breakout: 370, keeping: 370, ballTouch: 381 },
      defense: { tackle: 398, interception: 419, marking: 402 },
      physical: { jumping: 368, contact: 415, stamina: 295 },
      speed: { running: 313, agility: 346 }
    },
    maxEnhanced: {
      overall: 14173,
      baseStats: { shoot: 2643, pass: 2666, dribble: 2654, defense: 2824, physical: 2647, speed: 1729 },
      detailStats: {
        shoot: { finishing: 871, power: 904, composure: 868 },
        pass: { shortPass: 909, longPass: 899, accuracy: 858 },
        dribble: { breakout: 881, keeping: 881, ballTouch: 892 },
        defense: { tackle: 933, interception: 954, marking: 937 },
        physical: { jumping: 879, contact: 938, stamina: 830 },
        speed: { running: 848, agility: 881 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -1, shoot: -1, longShoot: -1,
      shortPass: 0, longPass: 0, throughPass: -1, cutIn: -1, keep: -1,
      delay: 0, rushOut: -1, feint: -1, press: 1
    },
    skill: { name: '奮戦のパスカット', rank: '銅', description: '発動エリア：中左中右・後左中右　/　発動条件：パスカット時　/　パスカットUP　/　成功時に自身のショートパス発生確率UP' },
    abilities: [
      { name: 'ボールスティーラー', rank: '銀', description: '発動条件：途中出場　/　タックル・パスカットUP' },
      { name: 'ストロングマーカー', rank: '銀', description: '発動条件：好調　/　マーク・コンタクトUP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p167',
    name: '佐々木旭(2026)',
    readingName: 'ささきあさひ',
    category: 'DF',
    mainPosition: 'LFB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'ポゼッション',
    playStyle: '守備的LFB',
    playStyleLevel: 'Ⅱ',
    overall: 6353,
    maxOverall: 14592,
    baseStats: { shoot: 1023, pass: 1093, dribble: 1147, defense: 1180, physical: 1221, speed: 799 },
    detailStats: {
      shoot: { finishing: 328, power: 365, composure: 330 },
      pass: { shortPass: 372, longPass: 364, accuracy: 357 },
      dribble: { breakout: 387, keeping: 376, ballTouch: 384 },
      defense: { tackle: 396, interception: 391, marking: 393 },
      physical: { jumping: 393, contact: 406, stamina: 422 },
      speed: { running: 432, agility: 367 }
    },
    maxEnhanced: {
      overall: 14592,
      baseStats: { shoot: 2520, pass: 2662, dribble: 2680, defense: 2785, physical: 2790, speed: 1869 },
      detailStats: {
        shoot: { finishing: 827, power: 864, composure: 829 },
        pass: { shortPass: 895, longPass: 887, accuracy: 880 },
        dribble: { breakout: 898, keeping: 887, ballTouch: 895 },
        defense: { tackle: 931, interception: 926, marking: 928 },
        physical: { jumping: 904, contact: 929, stamina: 957 },
        speed: { running: 967, agility: 902 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -1, shoot: -1, longShoot: -1,
      shortPass: 0, longPass: 0, throughPass: -1, cutIn: -1, keep: -1,
      delay: 0, rushOut: -1, feint: -1, press: 1
    },
    skill: { name: '鋭角的なタックル', rank: '銅', description: '発動エリア：中左中右・後左中右　/　発動条件：タックル時　/　タックル・コンタクト・マークUP' },
    abilities: [
      { name: 'スピードクラッシャー', rank: '銀', description: '発動条件：好調　/　タックル・走力UP' },
      { name: 'インターセプター', rank: '銀', description: '発動条件：好調　/　パスカット・マークUP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p168',
    name: '吉田豊(2026)',
    readingName: 'よしだゆたか',
    category: 'DF',
    mainPosition: 'LFB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'リアクション',
    playStyle: '守備的LFB',
    playStyleLevel: 'Ⅱ',
    overall: 6312,
    maxOverall: 14550,
    baseStats: { shoot: 902, pass: 1093, dribble: 1156, defense: 1171, physical: 1215, speed: 783 },
    detailStats: {
      shoot: { finishing: 278, power: 320, composure: 304 },
      pass: { shortPass: 367, longPass: 365, accuracy: 361 },
      dribble: { breakout: 382, keeping: 374, ballTouch: 400 },
      defense: { tackle: 389, interception: 393, marking: 389 },
      physical: { jumping: 366, contact: 418, stamina: 431 },
      speed: { running: 400, agility: 383 }
    },
    maxEnhanced: {
      overall: 14550,
      baseStats: { shoot: 2399, pass: 2662, dribble: 2689, defense: 2776, physical: 2784, speed: 1853 },
      detailStats: {
        shoot: { finishing: 777, power: 819, composure: 803 },
        pass: { shortPass: 890, longPass: 888, accuracy: 884 },
        dribble: { breakout: 893, keeping: 885, ballTouch: 911 },
        defense: { tackle: 924, interception: 928, marking: 924 },
        physical: { jumping: 877, contact: 941, stamina: 966 },
        speed: { running: 935, agility: 918 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -1, shoot: -1, longShoot: -1,
      shortPass: 0, longPass: 0, throughPass: -1, cutIn: -1, keep: -1,
      delay: 0, rushOut: -1, feint: -1, press: 1
    },
    skill: { name: '冴え渡るインターセプト', rank: '銅', description: '発動エリア：中左中右・後左中右　/　発動条件：パスカット時　/　パスカット・敏捷性UP' },
    abilities: [
      { name: 'マラソンマン', rank: '銀', description: '発動条件：途中出場　/　スタミナ・走力UP' },
      { name: 'ボールハンター', rank: '銀', description: '発動条件：絶好調　/　タックル・マークUP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p169',
    name: '大崎航詩(2026)',
    readingName: 'おおさきこうし',
    category: 'DF',
    mainPosition: 'LFB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'カウンター',
    playStyle: '守備的LFB',
    playStyleLevel: 'Ⅱ',
    overall: 6277,
    maxOverall: 14513,
    baseStats: { shoot: 1063, pass: 1112, dribble: 1110, defense: 1196, physical: 1196, speed: 756 },
    detailStats: {
      shoot: { finishing: 347, power: 364, composure: 352 },
      pass: { shortPass: 379, longPass: 364, accuracy: 369 },
      dribble: { breakout: 361, keeping: 353, ballTouch: 396 },
      defense: { tackle: 402, interception: 412, marking: 382 },
      physical: { jumping: 394, contact: 380, stamina: 422 },
      speed: { running: 363, agility: 393 }
    },
    maxEnhanced: {
      overall: 14513,
      baseStats: { shoot: 2560, pass: 2681, dribble: 2643, defense: 2801, physical: 2765, speed: 1826 },
      detailStats: {
        shoot: { finishing: 846, power: 863, composure: 851 },
        pass: { shortPass: 902, longPass: 887, accuracy: 892 },
        dribble: { breakout: 872, keeping: 864, ballTouch: 907 },
        defense: { tackle: 937, interception: 947, marking: 917 },
        physical: { jumping: 905, contact: 903, stamina: 957 },
        speed: { running: 898, agility: 928 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -1, shoot: -1, longShoot: -1,
      shortPass: 0, longPass: 0, throughPass: -1, cutIn: -1, keep: -1,
      delay: 0, rushOut: -1, feint: -1, press: 1
    },
    skill: { name: '冴え渡るインターセプト', rank: '銅', description: '発動エリア：中左中右・後左中右　/　発動条件：パスカット時　/　パスカット・敏捷性UP' },
    abilities: [
      { name: '無限のアジリティ', rank: '銀', description: '発動条件：好調　/　スタミナ・敏捷性UP' },
      { name: 'ハイタワーの天敵', rank: '銀', description: '発動条件：好調　/　マーク・ジャンプUP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p170',
    name: '前嶋洋太(2026)',
    readingName: 'まえじまようた',
    category: 'DF',
    mainPosition: 'LFB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'カウンター',
    playStyle: '攻撃的LFB',
    playStyleLevel: 'Ⅱ',
    overall: 6252,
    maxOverall: 14469,
    baseStats: { shoot: 958, pass: 1115, dribble: 1286, defense: 1125, physical: 1099, speed: 813 },
    detailStats: {
      shoot: { finishing: 310, power: 305, composure: 343 },
      pass: { shortPass: 368, longPass: 368, accuracy: 379 },
      dribble: { breakout: 428, keeping: 420, ballTouch: 438 },
      defense: { tackle: 390, interception: 372, marking: 363 },
      physical: { jumping: 365, contact: 323, stamina: 411 },
      speed: { running: 378, agility: 435 }
    },
    maxEnhanced: {
      overall: 14469,
      baseStats: { shoot: 2455, pass: 2684, dribble: 2819, defense: 2730, physical: 2668, speed: 1883 },
      detailStats: {
        shoot: { finishing: 809, power: 804, composure: 842 },
        pass: { shortPass: 891, longPass: 891, accuracy: 902 },
        dribble: { breakout: 939, keeping: 931, ballTouch: 949 },
        defense: { tackle: 925, interception: 907, marking: 898 },
        physical: { jumping: 876, contact: 846, stamina: 946 },
        speed: { running: 913, agility: 970 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -1, shoot: -1, longShoot: -1,
      shortPass: 0, longPass: 0, throughPass: -1, cutIn: -1, keep: -1,
      delay: 0, rushOut: -1, feint: -1, press: 1
    },
    skill: { name: '鋭角的なタックル', rank: '銅', description: '発動エリア：中左中右・後左中右　/　発動条件：タックル時　/　タックル・コンタクト・マークUP' },
    abilities: [
      { name: '俊敏なドリブラー', rank: '銀', description: '発動条件：好調　/　突破力・敏捷性UP' },
      { name: '絶え間ないボールタッチ', rank: '銀', description: '発動条件：途中出場　/　ボールタッチ・スタミナUP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p171',
    name: '藤春廣輝(2026)',
    readingName: 'ふじはるひろき',
    category: 'DF',
    mainPosition: 'LFB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'ポゼッション',
    playStyle: '攻撃的LFB',
    playStyleLevel: 'Ⅱ',
    overall: 6181,
    maxOverall: 14409,
    baseStats: { shoot: 1009, pass: 1125, dribble: 1155, defense: 1111, physical: 1045, speed: 797 },
    detailStats: {
      shoot: { finishing: 368, power: 310, composure: 331 },
      pass: { shortPass: 360, longPass: 399, accuracy: 366 },
      dribble: { breakout: 423, keeping: 360, ballTouch: 372 },
      defense: { tackle: 348, interception: 388, marking: 375 },
      physical: { jumping: 333, contact: 300, stamina: 412 },
      speed: { running: 414, agility: 383 }
    },
    maxEnhanced: {
      overall: 14409,
      baseStats: { shoot: 2506, pass: 2694, dribble: 2688, defense: 2716, physical: 2614, speed: 1867 },
      detailStats: {
        shoot: { finishing: 867, power: 809, composure: 830 },
        pass: { shortPass: 883, longPass: 922, accuracy: 889 },
        dribble: { breakout: 934, keeping: 871, ballTouch: 883 },
        defense: { tackle: 883, interception: 923, marking: 910 },
        physical: { jumping: 844, contact: 823, stamina: 947 },
        speed: { running: 949, agility: 918 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -1, shoot: -1, longShoot: -1,
      shortPass: 0, longPass: 0, throughPass: -1, cutIn: -1, keep: -1,
      delay: 0, rushOut: -1, feint: -1, press: 1
    },
    skill: { name: '展開のドリブル', rank: '銅', description: '発動エリア：中左右・後左右　/　発動条件：ドリブル時　/　突破力・キープ力・ロングパスUP　/　成功時に自身のロングパス発生確率UP' },
    abilities: [
      { name: '高速マーカー', rank: '銀', description: '発動条件：途中出場　/　パスカット・走力UP' },
      { name: '不屈のドリブル突破', rank: '銀', description: '発動条件：絶好調　/　突破力・スタミナUP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p172',
    name: '室屋成(2026)',
    readingName: 'むろやせい',
    category: 'DF',
    mainPosition: 'RFB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'リアクション',
    playStyle: '攻撃的RFB',
    playStyleLevel: 'Ⅱ',
    overall: 6380,
    maxOverall: 14605,
    baseStats: { shoot: 958, pass: 1136, dribble: 1265, defense: 1216, physical: 1051, speed: 799 },
    detailStats: {
      shoot: { finishing: 309, power: 324, composure: 325 },
      pass: { shortPass: 379, longPass: 378, accuracy: 379 },
      dribble: { breakout: 421, keeping: 419, ballTouch: 425 },
      defense: { tackle: 408, interception: 406, marking: 402 },
      physical: { jumping: 277, contact: 370, stamina: 404 },
      speed: { running: 391, agility: 408 }
    },
    maxEnhanced: {
      overall: 14605,
      baseStats: { shoot: 2455, pass: 2705, dribble: 2798, defense: 2821, physical: 2620, speed: 1869 },
      detailStats: {
        shoot: { finishing: 808, power: 823, composure: 824 },
        pass: { shortPass: 902, longPass: 901, accuracy: 902 },
        dribble: { breakout: 932, keeping: 930, ballTouch: 936 },
        defense: { tackle: 943, interception: 941, marking: 937 },
        physical: { jumping: 788, contact: 893, stamina: 939 },
        speed: { running: 926, agility: 943 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -1, shoot: -1, longShoot: -1,
      shortPass: 0, longPass: 0, throughPass: -1, cutIn: -1, keep: -1,
      delay: 0, rushOut: -1, feint: -1, press: 1
    },
    skill: { name: 'ダイナミックタックル', rank: '銅', description: '発動エリア：中左中右・後左中右　/　発動条件：タックル時　/　タックル・マーク・突破力UP　/　成功時に自身のドリブル発生確率UP' },
    abilities: [
      { name: 'ピッチの掃除屋', rank: '銀', description: '発動条件：好調　/　タックル・スタミナUP' },
      { name: '俊敏なマーカー', rank: '銀', description: '発動条件：絶好調　/　パスカット・敏捷性UP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p173',
    name: '梅木怜(2026)',
    readingName: 'うめきれい',
    category: 'DF',
    mainPosition: 'RFB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'カウンター',
    playStyle: '攻撃的RFB',
    playStyleLevel: 'Ⅱ',
    overall: 6369,
    maxOverall: 14600,
    baseStats: { shoot: 968, pass: 1120, dribble: 1153, defense: 1134, physical: 966, speed: 880 },
    detailStats: {
      shoot: { finishing: 316, power: 333, composure: 319 },
      pass: { shortPass: 357, longPass: 391, accuracy: 372 },
      dribble: { breakout: 428, keeping: 340, ballTouch: 385 },
      defense: { tackle: 402, interception: 370, marking: 362 },
      physical: { jumping: 286, contact: 286, stamina: 394 },
      speed: { running: 415, agility: 465 }
    },
    maxEnhanced: {
      overall: 14600,
      baseStats: { shoot: 2465, pass: 2689, dribble: 2686, defense: 2739, physical: 2535, speed: 1950 },
      detailStats: {
        shoot: { finishing: 815, power: 832, composure: 818 },
        pass: { shortPass: 880, longPass: 914, accuracy: 895 },
        dribble: { breakout: 939, keeping: 851, ballTouch: 896 },
        defense: { tackle: 937, interception: 905, marking: 897 },
        physical: { jumping: 797, contact: 809, stamina: 929 },
        speed: { running: 950, agility: 1000 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -1, shoot: -1, longShoot: -1,
      shortPass: 0, longPass: 0, throughPass: -1, cutIn: -1, keep: -1,
      delay: 0, rushOut: -1, feint: -1, press: 1
    },
    skill: { name: '展開のドリブル', rank: '銅', description: '発動エリア：中左右・後左右　/　発動条件：ドリブル時　/　突破力・キープ力・ロングパスUP　/　成功時に自身のロングパス発生確率UP' },
    abilities: [
      { name: 'アジャイルクラッシャー', rank: '銀', description: '発動条件：好調　/　タックル・敏捷性UP' },
      { name: 'ピッチの分断者', rank: '銀', description: '発動条件：絶好調　/　パスカット・スタミナUP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p174',
    name: '福田心之助(2026)',
    readingName: 'ふくだしんのすけ',
    category: 'DF',
    mainPosition: 'RFB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'カウンター',
    playStyle: '攻撃的RFB',
    playStyleLevel: 'Ⅱ',
    overall: 6300,
    maxOverall: 14528,
    baseStats: { shoot: 1004, pass: 1120, dribble: 1272, defense: 1042, physical: 1118, speed: 860 },
    detailStats: {
      shoot: { finishing: 314, power: 346, composure: 344 },
      pass: { shortPass: 374, longPass: 374, accuracy: 372 },
      dribble: { breakout: 420, keeping: 429, ballTouch: 423 },
      defense: { tackle: 353, interception: 359, marking: 330 },
      physical: { jumping: 363, contact: 333, stamina: 422 },
      speed: { running: 424, agility: 436 }
    },
    maxEnhanced: {
      overall: 14528,
      baseStats: { shoot: 2501, pass: 2689, dribble: 2805, defense: 2647, physical: 2687, speed: 1930 },
      detailStats: {
        shoot: { finishing: 813, power: 845, composure: 843 },
        pass: { shortPass: 897, longPass: 897, accuracy: 895 },
        dribble: { breakout: 931, keeping: 940, ballTouch: 934 },
        defense: { tackle: 888, interception: 894, marking: 865 },
        physical: { jumping: 874, contact: 856, stamina: 957 },
        speed: { running: 959, agility: 971 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -1, shoot: -1, longShoot: -1,
      shortPass: 0, longPass: 0, throughPass: -1, cutIn: -1, keep: -1,
      delay: 0, rushOut: -1, feint: -1, press: 1
    },
    skill: { name: '打開のドリブル', rank: '銅', description: '発動エリア：中左右・後左右　/　発動条件：ドリブル時　/　突破力・ショートパスUP　/　成功時に自身のショートパス発生確率UP' },
    abilities: [
      { name: '無限のアジリティ', rank: '銀', description: '発動条件：好調　/　スタミナ・敏捷性UP' },
      { name: '技巧派ドリブラー', rank: '銀', description: '発動条件：途中出場　/　突破力・ボールタッチUP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p175',
    name: '西谷優希(2026)',
    readingName: 'にしやゆうき',
    category: 'MF',
    mainPosition: 'DMF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'リアクション',
    playStyle: 'ハードマーカー',
    playStyleLevel: 'Ⅱ',
    overall: 6212,
    maxOverall: 14389,
    baseStats: { shoot: 971, pass: 1110, dribble: 1133, defense: 1179, physical: 1139, speed: 749 },
    detailStats: {
      shoot: { finishing: 292, power: 374, composure: 305 },
      pass: { shortPass: 395, longPass: 370, accuracy: 345 },
      dribble: { breakout: 329, keeping: 402, ballTouch: 402 },
      defense: { tackle: 397, interception: 384, marking: 398 },
      physical: { jumping: 351, contact: 391, stamina: 397 },
      speed: { running: 385, agility: 364 }
    },
    maxEnhanced: {
      overall: 14389,
      baseStats: { shoot: 2516, pass: 2715, dribble: 2666, defense: 2760, physical: 2708, speed: 1771 },
      detailStats: {
        shoot: { finishing: 803, power: 885, composure: 828 },
        pass: { shortPass: 930, longPass: 905, accuracy: 880 },
        dribble: { breakout: 840, keeping: 913, ballTouch: 913 },
        defense: { tackle: 932, interception: 907, marking: 921 },
        physical: { jumping: 862, contact: 914, stamina: 932 },
        speed: { running: 896, agility: 875 }
      }
    },
    playTendencies: {
      attack: 0, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 1, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '奮戦のタックル', rank: '銅', description: '発動エリア：中左中右・後左中右　/　発動条件：タックル時　/　タックル・マーク・ショートパスUP　/　成功時に自身のショートパス発生確率UP' },
    abilities: [
      { name: '反撃のパサー', rank: '銀', description: '発動条件：絶好調　/　ショートパス・タックルUP' },
      { name: 'エンドレスマーカー', rank: '銀', description: '発動条件：好調　/　マーク・スタミナUP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p176',
    name: '西村恭史(2026)',
    readingName: 'にしむらやすふみ',
    category: 'MF',
    mainPosition: 'DMF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'ポゼッション',
    playStyle: 'ハードマーカー',
    playStyleLevel: 'Ⅱ',
    overall: 6038,
    maxOverall: 14217,
    baseStats: { shoot: 876, pass: 1053, dribble: 1092, defense: 1146, physical: 1144, speed: 792 },
    detailStats: {
      shoot: { finishing: 276, power: 325, composure: 275 },
      pass: { shortPass: 349, longPass: 352, accuracy: 352 },
      dribble: { breakout: 369, keeping: 353, ballTouch: 370 },
      defense: { tackle: 378, interception: 384, marking: 384 },
      physical: { jumping: 383, contact: 371, stamina: 390 },
      speed: { running: 396, agility: 396 }
    },
    maxEnhanced: {
      overall: 14217,
      baseStats: { shoot: 2421, pass: 2658, dribble: 2625, defense: 2727, physical: 2713, speed: 1814 },
      detailStats: {
        shoot: { finishing: 787, power: 836, composure: 798 },
        pass: { shortPass: 884, longPass: 887, accuracy: 887 },
        dribble: { breakout: 880, keeping: 864, ballTouch: 881 },
        defense: { tackle: 913, interception: 907, marking: 907 },
        physical: { jumping: 894, contact: 894, stamina: 925 },
        speed: { running: 907, agility: 907 }
      }
    },
    playTendencies: {
      attack: 0, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 1, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '鋭角的なタックル', rank: '銅', description: '発動エリア：中左中右・後左中右　/　発動条件：タックル時　/　タックル・コンタクト・マークUP' },
    abilities: [
      { name: 'エンドレスマーカー', rank: '銀', description: '発動条件：好調　/　マーク・スタミナUP' },
      { name: 'ランニングジャンパー', rank: '銀', description: '発動条件：絶好調　/　ジャンプ・走力UP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p177',
    name: 'メン・ソンウン(2026)',
    readingName: 'めんそんうん',
    category: 'MF',
    mainPosition: 'DMF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '韓国',
    policy: 'ポゼッション',
    playStyle: 'ハードマーカー',
    playStyleLevel: 'Ⅱ',
    overall: 5956,
    maxOverall: 14132,
    baseStats: { shoot: 1019, pass: 1012, dribble: 1167, defense: 1185, physical: 1056, speed: 785 },
    detailStats: {
      shoot: { finishing: 320, power: 384, composure: 315 },
      pass: { shortPass: 399, longPass: 360, accuracy: 253 },
      dribble: { breakout: 363, keeping: 404, ballTouch: 400 },
      defense: { tackle: 403, interception: 396, marking: 386 },
      physical: { jumping: 344, contact: 332, stamina: 380 },
      speed: { running: 405, agility: 380 }
    },
    maxEnhanced: {
      overall: 14132,
      baseStats: { shoot: 2564, pass: 2617, dribble: 2700, defense: 2766, physical: 2625, speed: 1807 },
      detailStats: {
        shoot: { finishing: 831, power: 895, composure: 838 },
        pass: { shortPass: 934, longPass: 895, accuracy: 788 },
        dribble: { breakout: 874, keeping: 915, ballTouch: 911 },
        defense: { tackle: 938, interception: 919, marking: 909 },
        physical: { jumping: 855, contact: 855, stamina: 915 },
        speed: { running: 916, agility: 891 }
      }
    },
    playTendencies: {
      attack: 0, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 1, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '鋭角的なタックル', rank: '銅', description: '発動エリア：中左中右・後左中右　/　発動条件：タックル時　/　タックル・コンタクト・マークUP' },
    abilities: [
      { name: 'ボールスティーラー', rank: '銀', description: '発動条件：途中出場　/　タックル・パスカットUP' },
      { name: '不屈の魂', rank: '銀', description: '発動条件：好調　/　キープ力・スタミナUP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p178',
    name: '河原創(2026)',
    readingName: 'かわはらそう',
    category: 'MF',
    mainPosition: 'DMF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'ポゼッション',
    playStyle: 'セントラルDM',
    playStyleLevel: 'Ⅱ',
    overall: 6471,
    maxOverall: 14625,
    baseStats: { shoot: 1036, pass: 1195, dribble: 1249, defense: 1237, physical: 1129, speed: 796 },
    detailStats: {
      shoot: { finishing: 347, power: 330, composure: 359 },
      pass: { shortPass: 390, longPass: 401, accuracy: 404 },
      dribble: { breakout: 392, keeping: 435, ballTouch: 422 },
      defense: { tackle: 398, interception: 426, marking: 413 },
      physical: { jumping: 332, contact: 350, stamina: 447 },
      speed: { running: 395, agility: 401 }
    },
    maxEnhanced: {
      overall: 14625,
      baseStats: { shoot: 2581, pass: 2800, dribble: 2782, defense: 2818, physical: 2698, speed: 1818 },
      detailStats: {
        shoot: { finishing: 858, power: 841, composure: 882 },
        pass: { shortPass: 925, longPass: 936, accuracy: 939 },
        dribble: { breakout: 903, keeping: 946, ballTouch: 933 },
        defense: { tackle: 933, interception: 949, marking: 936 },
        physical: { jumping: 843, contact: 873, stamina: 982 },
        speed: { running: 906, agility: 912 }
      }
    },
    playTendencies: {
      attack: 0, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 1, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '反撃のパスカット', rank: '銅', description: '発動エリア：中左中右・後左中右　/　発動条件：パスカット時　/　パスカット・ロングパスUP　/　成功時に自身のロングパス発生確率UP' },
    abilities: [
      { name: '不屈のキッカー', rank: '銀', description: '発動条件：好調　/　キック精度・スタミナUP' },
      { name: '奪取のターゲットマン', rank: '銀', description: '発動条件：好調　/　キープ力・パスカットUP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p179',
    name: 'ソ・ミヌ(2026)',
    readingName: 'そみぬ',
    category: 'MF',
    mainPosition: 'DMF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '韓国',
    policy: 'カウンター',
    playStyle: 'セントラルDM',
    playStyleLevel: 'Ⅱ',
    overall: 6281,
    maxOverall: 14400,
    baseStats: { shoot: 1238, pass: 1162, dribble: 1105, defense: 1138, physical: 1151, speed: 714 },
    detailStats: {
      shoot: { finishing: 424, power: 416, composure: 398 },
      pass: { shortPass: 395, longPass: 391, accuracy: 376 },
      dribble: { breakout: 350, keeping: 344, ballTouch: 411 },
      defense: { tackle: 324, interception: 420, marking: 394 },
      physical: { jumping: 327, contact: 412, stamina: 412 },
      speed: { running: 347, agility: 367 }
    },
    maxEnhanced: {
      overall: 14400,
      baseStats: { shoot: 2783, pass: 2767, dribble: 2638, defense: 2719, physical: 2720, speed: 1736 },
      detailStats: {
        shoot: { finishing: 935, power: 927, composure: 921 },
        pass: { shortPass: 930, longPass: 926, accuracy: 911 },
        dribble: { breakout: 861, keeping: 855, ballTouch: 922 },
        defense: { tackle: 859, interception: 943, marking: 917 },
        physical: { jumping: 838, contact: 935, stamina: 947 },
        speed: { running: 858, agility: 878 }
      }
    },
    playTendencies: {
      attack: 0, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 1, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '奮戦のパスカット', rank: '銅', description: '発動エリア：中左中右・後左中右　/　発動条件：パスカット時　/　パスカットUP　/　成功時に自身のショートパス発生確率UP' },
    abilities: [
      { name: '決めきる力', rank: '銀', description: '発動条件：途中出場　/　決定力・スタミナUP' },
      { name: '突き刺すパス', rank: '銀', description: '発動条件：途中出場　/　キック力・ショートパスUP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p180',
    name: '山根陸(2026)',
    readingName: 'やまねりく',
    category: 'MF',
    mainPosition: 'DMF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'リアクション',
    playStyle: 'セントラルDM',
    playStyleLevel: 'Ⅱ',
    overall: 6366,
    maxOverall: 14509,
    baseStats: { shoot: 1029, pass: 1133, dribble: 1255, defense: 1208, physical: 1138, speed: 843 },
    detailStats: {
      shoot: { finishing: 349, power: 341, composure: 339 },
      pass: { shortPass: 392, longPass: 383, accuracy: 358 },
      dribble: { breakout: 411, keeping: 407, ballTouch: 437 },
      defense: { tackle: 387, interception: 417, marking: 404 },
      physical: { jumping: 369, contact: 355, stamina: 414 },
      speed: { running: 423, agility: 420 }
    },
    maxEnhanced: {
      overall: 14509,
      baseStats: { shoot: 2574, pass: 2738, dribble: 2788, defense: 2789, physical: 2707, speed: 1865 },
      detailStats: {
        shoot: { finishing: 860, power: 852, composure: 862 },
        pass: { shortPass: 927, longPass: 918, accuracy: 893 },
        dribble: { breakout: 922, keeping: 918, ballTouch: 948 },
        defense: { tackle: 922, interception: 940, marking: 927 },
        physical: { jumping: 880, contact: 878, stamina: 949 },
        speed: { running: 934, agility: 931 }
      }
    },
    playTendencies: {
      attack: 0, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 1, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '奮戦のパスカット', rank: '銅', description: '発動エリア：中左中右・後左中右　/　発動条件：パスカット時　/　パスカットUP　/　成功時に自身のショートパス発生確率UP' },
    abilities: [
      { name: 'マラソンマン', rank: '銀', description: '発動条件：途中出場　/　スタミナ・走力UP' },
      { name: '絢爛なインターセプト', rank: '銀', description: '発動条件：絶好調　/　ボールタッチ・パスカットUP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p181',
    name: '西澤健太(2026)',
    readingName: 'にしざわけんた',
    category: 'MF',
    mainPosition: 'AM',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'ポゼッション',
    playStyle: 'セントラルAM',
    playStyleLevel: 'Ⅱ',
    overall: 6448,
    maxOverall: 14590,
    baseStats: { shoot: 1090, pass: 1174, dribble: 1204, defense: 1223, physical: 1144, speed: 820 },
    detailStats: {
      shoot: { finishing: 364, power: 378, composure: 348 },
      pass: { shortPass: 385, longPass: 396, accuracy: 393 },
      dribble: { breakout: 400, keeping: 401, ballTouch: 403 },
      defense: { tackle: 392, interception: 422, marking: 409 },
      physical: { jumping: 336, contact: 387, stamina: 421 },
      speed: { running: 397, agility: 423 }
    },
    maxEnhanced: {
      overall: 14590,
      baseStats: { shoot: 2635, pass: 2755, dribble: 2773, defense: 2768, physical: 2713, speed: 1854 },
      detailStats: {
        shoot: { finishing: 875, power: 889, composure: 871 },
        pass: { shortPass: 920, longPass: 919, accuracy: 916 },
        dribble: { breakout: 923, keeping: 924, ballTouch: 926 },
        defense: { tackle: 915, interception: 933, marking: 920 },
        physical: { jumping: 847, contact: 910, stamina: 956 },
        speed: { running: 908, agility: 946 }
      }
    },
    playTendencies: {
      attack: 0, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 1, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '安定したパスワーク', rank: '銅', description: '発動エリア：前左中右・中左中右　/　発動条件：AM・RW・LW・CFの選手へのショートパス時　/　ショートパス・キック精度UP　/　成功時に受け手のショートパス発生確率UP' },
    abilities: [
      { name: '絶え間ないボールタッチ', rank: '銀', description: '発動条件：途中出場　/　ボールタッチ・スタミナUP' },
      { name: '俊敏なマーカー', rank: '銀', description: '発動条件：絶好調　/　パスカット・敏捷性UP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p182',
    name: 'イ・ヒギュン(2026)',
    readingName: 'いひぎゅん',
    category: 'MF',
    mainPosition: 'AM',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '韓国',
    policy: 'ポゼッション',
    playStyle: 'セントラルAM',
    playStyleLevel: 'Ⅱ',
    overall: 6169,
    maxOverall: 14271,
    baseStats: { shoot: 1107, pass: 1179, dribble: 1167, defense: 1129, physical: 1143, speed: 751 },
    detailStats: {
      shoot: { finishing: 352, power: 410, composure: 345 },
      pass: { shortPass: 393, longPass: 397, accuracy: 389 },
      dribble: { breakout: 393, keeping: 383, ballTouch: 391 },
      defense: { tackle: 348, interception: 394, marking: 387 },
      physical: { jumping: 353, contact: 381, stamina: 409 },
      speed: { running: 375, agility: 376 }
    },
    maxEnhanced: {
      overall: 14271,
      baseStats: { shoot: 2652, pass: 2760, dribble: 2736, defense: 2674, physical: 2712, speed: 1785 },
      detailStats: {
        shoot: { finishing: 863, power: 921, composure: 868 },
        pass: { shortPass: 928, longPass: 920, accuracy: 912 },
        dribble: { breakout: 916, keeping: 906, ballTouch: 914 },
        defense: { tackle: 871, interception: 905, marking: 898 },
        physical: { jumping: 864, contact: 904, stamina: 944 },
        speed: { running: 886, agility: 899 }
      }
    },
    playTendencies: {
      attack: 0, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 1, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '操舵のパス', rank: '銅', description: '発動エリア：前中・中中　/　発動条件：前中・中中に居る選手へのショートパス時　/　ショートパス・キック精度UP　/　ダイレクトショートパス成功時に受け手のシュート発生確率UP' },
    abilities: [
      { name: '走り切るロングパサー', rank: '銀', description: '発動条件：途中出場　/　ロングパス・スタミナUP' },
      { name: '突き刺すパス', rank: '銀', description: '発動条件：途中出場　/　キック力・ショートパスUP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p183',
    name: '柴崎岳(2026)',
    readingName: 'しばさきがく',
    category: 'MF',
    mainPosition: 'DMF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'リアクション',
    playStyle: 'パサーDM',
    playStyleLevel: 'Ⅱ',
    overall: 6489,
    maxOverall: 14651,
    baseStats: { shoot: 1061, pass: 1306, dribble: 1335, defense: 1098, physical: 1040, speed: 776 },
    detailStats: {
      shoot: { finishing: 344, power: 356, composure: 361 },
      pass: { shortPass: 443, longPass: 443, accuracy: 420 },
      dribble: { breakout: 419, keeping: 452, ballTouch: 464 },
      defense: { tackle: 341, interception: 380, marking: 377 },
      physical: { jumping: 353, contact: 314, stamina: 373 },
      speed: { running: 358, agility: 418 }
    },
    maxEnhanced: {
      overall: 14651,
      baseStats: { shoot: 2606, pass: 2911, dribble: 2868, defense: 2679, physical: 2609, speed: 1798 },
      detailStats: {
        shoot: { finishing: 855, power: 867, composure: 884 },
        pass: { shortPass: 978, longPass: 978, accuracy: 955 },
        dribble: { breakout: 930, keeping: 963, ballTouch: 975 },
        defense: { tackle: 876, interception: 903, marking: 900 },
        physical: { jumping: 864, contact: 837, stamina: 908 },
        speed: { running: 869, agility: 929 }
      }
    },
    playTendencies: {
      attack: 1, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 2, longPass: -1, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '楔のパス', rank: '銅', description: '発動エリア：中左中右・後左中右　/　発動条件：AM・CFの選手へのショートパス・ロングパス時　/　ロングパス・キック精度・ショートパスUP　/　成功時に受け手のショートパス発生確率UP' },
    abilities: [
      { name: 'シルクタッチ', rank: '銀', description: '発動条件：好調　/　ショートパス・ボールタッチUP' },
      { name: '切り開くキッカー', rank: '銀', description: '発動条件：好調　/　キック精度・突破力UP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p184',
    name: 'マテウス・ブエノ(2026)',
    readingName: 'まてうすぶえの',
    category: 'MF',
    mainPosition: 'DMF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'ブラジル',
    policy: 'リアクション',
    playStyle: 'パサーDM',
    playStyleLevel: 'Ⅱ',
    overall: 6456,
    maxOverall: 14632,
    baseStats: { shoot: 1092, pass: 1248, dribble: 1210, defense: 1178, physical: 1110, speed: 820 },
    detailStats: {
      shoot: { finishing: 357, power: 400, composure: 335 },
      pass: { shortPass: 440, longPass: 417, accuracy: 391 },
      dribble: { breakout: 374, keeping: 413, ballTouch: 423 },
      defense: { tackle: 410, interception: 380, marking: 388 },
      physical: { jumping: 304, contact: 393, stamina: 413 },
      speed: { running: 401, agility: 419 }
    },
    maxEnhanced: {
      overall: 14632,
      baseStats: { shoot: 2637, pass: 2853, dribble: 2743, defense: 2759, physical: 2679, speed: 1842 },
      detailStats: {
        shoot: { finishing: 868, power: 911, composure: 858 },
        pass: { shortPass: 975, longPass: 952, accuracy: 926 },
        dribble: { breakout: 885, keeping: 924, ballTouch: 934 },
        defense: { tackle: 945, interception: 903, marking: 911 },
        physical: { jumping: 815, contact: 916, stamina: 948 },
        speed: { running: 912, agility: 930 }
      }
    },
    playTendencies: {
      attack: 1, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 2, longPass: -1, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '楔のパス', rank: '銅', description: '発動エリア：中左中右・後左中右　/　発動条件：AM・CFの選手へのショートパス・ロングパス時　/　ロングパス・キック精度・ショートパスUP　/　成功時に受け手のショートパス発生確率UP' },
    abilities: [
      { name: '不屈のパサー', rank: '銀', description: '発動条件：途中出場　/　ショートパス・スタミナUP' },
      { name: '反攻のロングパサー', rank: '銀', description: '発動条件：途中出場　/　ロングパス・タックルUP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p185',
    name: '清武弘嗣(2026)',
    readingName: 'きよたけひろし',
    category: 'MF',
    mainPosition: 'DMF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'リアクション',
    playStyle: 'パサーDM',
    playStyleLevel: 'Ⅱ',
    overall: 6502,
    maxOverall: 14690,
    baseStats: { shoot: 1150, pass: 1296, dribble: 1234, defense: 895, physical: 1126, speed: 745 },
    detailStats: {
      shoot: { finishing: 379, power: 388, composure: 383 },
      pass: { shortPass: 434, longPass: 443, accuracy: 419 },
      dribble: { breakout: 394, keeping: 405, ballTouch: 435 },
      defense: { tackle: 301, interception: 303, marking: 291 },
      physical: { jumping: 335, contact: 364, stamina: 427 },
      speed: { running: 350, agility: 395 }
    },
    maxEnhanced: {
      overall: 14690,
      baseStats: { shoot: 2695, pass: 2901, dribble: 2767, defense: 2476, physical: 2695, speed: 1767 },
      detailStats: {
        shoot: { finishing: 890, power: 899, composure: 906 },
        pass: { shortPass: 969, longPass: 978, accuracy: 954 },
        dribble: { breakout: 905, keeping: 916, ballTouch: 946 },
        defense: { tackle: 836, interception: 826, marking: 814 },
        physical: { jumping: 846, contact: 887, stamina: 962 },
        speed: { running: 861, agility: 906 }
      }
    },
    playTendencies: {
      attack: 1, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 2, longPass: -1, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: 'ファストフィード', rank: '銅', description: '発動エリア：中中・後左中右　/　発動条件：CFの位置に居る選手へのロングパス時　/　ロングパス・キック精度UP　/　成功時に受け手のトラップ発生確率UP' },
    abilities: [
      { name: '高性能ロングパサー', rank: '銀', description: '発動条件：途中出場　/　ロングパス・キック精度UP' },
      { name: '不屈のパサー', rank: '銀', description: '発動条件：途中出場　/　ショートパス・スタミナUP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p186',
    name: '川辺駿(2026)',
    readingName: 'かわべはやお',
    category: 'MF',
    mainPosition: 'DMF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'ムービング',
    playStyle: 'パサーDM',
    playStyleLevel: 'Ⅱ',
    overall: 6509,
    maxOverall: 14684,
    baseStats: { shoot: 1115, pass: 1265, dribble: 1280, defense: 1159, physical: 1071, speed: 784 },
    detailStats: {
      shoot: { finishing: 378, power: 364, composure: 373 },
      pass: { shortPass: 427, longPass: 421, accuracy: 417 },
      dribble: { breakout: 413, keeping: 424, ballTouch: 443 },
      defense: { tackle: 357, interception: 403, marking: 399 },
      physical: { jumping: 335, contact: 353, stamina: 383 },
      speed: { running: 356, agility: 428 }
    },
    maxEnhanced: {
      overall: 14684,
      baseStats: { shoot: 2660, pass: 2870, dribble: 2813, defense: 2740, physical: 2640, speed: 1806 },
      detailStats: {
        shoot: { finishing: 889, power: 875, composure: 896 },
        pass: { shortPass: 962, longPass: 956, accuracy: 952 },
        dribble: { breakout: 924, keeping: 935, ballTouch: 954 },
        defense: { tackle: 892, interception: 926, marking: 922 },
        physical: { jumping: 846, contact: 876, stamina: 918 },
        speed: { running: 867, agility: 939 }
      }
    },
    playTendencies: {
      attack: 1, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 2, longPass: -1, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '楔のパス', rank: '銅', description: '発動エリア：中左中右・後左中右　/　発動条件：AM・CFの選手へのショートパス・ロングパス時　/　ロングパス・キック精度・ショートパスUP　/　成功時に受け手のショートパス発生確率UP' },
    abilities: [
      { name: 'シルクタッチ', rank: '銀', description: '発動条件：好調　/　ショートパス・ボールタッチUP' },
      { name: '高性能ロングパサー', rank: '銀', description: '発動条件：途中出場　/　ロングパス・キック精度UP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p187',
    name: '山本悠樹(2026)',
    readingName: 'やまもとゆうき',
    category: 'MF',
    mainPosition: 'DMF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'ポゼッション',
    playStyle: 'パサーDM',
    playStyleLevel: 'Ⅱ',
    overall: 6382,
    maxOverall: 14536,
    baseStats: { shoot: 1040, pass: 1265, dribble: 1277, defense: 1167, physical: 1157, speed: 763 },
    detailStats: {
      shoot: { finishing: 328, power: 379, composure: 333 },
      pass: { shortPass: 431, longPass: 417, accuracy: 417 },
      dribble: { breakout: 403, keeping: 435, ballTouch: 439 },
      defense: { tackle: 391, interception: 387, marking: 389 },
      physical: { jumping: 389, contact: 368, stamina: 400 },
      speed: { running: 362, agility: 401 }
    },
    maxEnhanced: {
      overall: 14536,
      baseStats: { shoot: 2585, pass: 2870, dribble: 2810, defense: 2748, physical: 2726, speed: 1785 },
      detailStats: {
        shoot: { finishing: 839, power: 890, composure: 856 },
        pass: { shortPass: 966, longPass: 952, accuracy: 952 },
        dribble: { breakout: 914, keeping: 946, ballTouch: 950 },
        defense: { tackle: 926, interception: 910, marking: 912 },
        physical: { jumping: 900, contact: 891, stamina: 935 },
        speed: { running: 873, agility: 912 }
      }
    },
    playTendencies: {
      attack: 1, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 2, longPass: -1, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '意外性のあるミドルパス', rank: '銅', description: '発動エリア：中中・後左中右　/　発動条件：CF・AMの選手へのショートパス・ロングパス時　/　ロングパス・キック精度・ショートパスUP　/　成功時に受け手のショートパス発生確率UP' },
    abilities: [
      { name: 'シルクタッチ', rank: '銀', description: '発動条件：好調　/　ショートパス・ボールタッチUP' },
      { name: 'ハードスティール', rank: '銀', description: '発動条件：絶好調　/　キープ力・タックルUP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p188',
    name: '山口大輝(2026)',
    readingName: 'やまぐちだいき',
    category: 'MF',
    mainPosition: 'DMF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'カウンター',
    playStyle: 'パサーDM',
    playStyleLevel: 'Ⅱ',
    overall: 6178,
    maxOverall: 14356,
    baseStats: { shoot: 1069, pass: 1166, dribble: 1138, defense: 1107, physical: 1089, speed: 835 },
    detailStats: {
      shoot: { finishing: 361, power: 368, composure: 340 },
      pass: { shortPass: 407, longPass: 395, accuracy: 364 },
      dribble: { breakout: 355, keeping: 390, ballTouch: 393 },
      defense: { tackle: 381, interception: 370, marking: 356 },
      physical: { jumping: 313, contact: 384, stamina: 392 },
      speed: { running: 413, agility: 422 }
    },
    maxEnhanced: {
      overall: 14356,
      baseStats: { shoot: 2614, pass: 2771, dribble: 2671, defense: 2688, physical: 2658, speed: 1857 },
      detailStats: {
        shoot: { finishing: 872, power: 879, composure: 863 },
        pass: { shortPass: 942, longPass: 930, accuracy: 899 },
        dribble: { breakout: 866, keeping: 901, ballTouch: 904 },
        defense: { tackle: 916, interception: 893, marking: 879 },
        physical: { jumping: 824, contact: 907, stamina: 927 },
        speed: { running: 924, agility: 933 }
      }
    },
    playTendencies: {
      attack: 1, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 2, longPass: -1, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '意外性のあるミドルパス', rank: '銅', description: '発動エリア：中中・後左中右　/　発動条件：CF・AMの選手へのショートパス・ロングパス時　/　ロングパス・キック精度・ショートパスUP　/　成功時に受け手のショートパス発生確率UP' },
    abilities: [
      { name: '不屈のパサー', rank: '銀', description: '発動条件：途中出場　/　ショートパス・スタミナUP' },
      { name: '機敏なロングパサー', rank: '銀', description: '発動条件：好調　/　ロングパス・敏捷性UP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p189',
    name: '東條敦輝(2026)',
    readingName: 'とうじょうあつき',
    category: 'MF',
    mainPosition: 'DMF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'ムービング',
    playStyle: 'パサーDM',
    playStyleLevel: 'Ⅱ',
    overall: 5930,
    maxOverall: 14092,
    baseStats: { shoot: 1056, pass: 1116, dribble: 1163, defense: 1118, physical: 960, speed: 777 },
    detailStats: {
      shoot: { finishing: 386, power: 305, composure: 365 },
      pass: { shortPass: 394, longPass: 367, accuracy: 355 },
      dribble: { breakout: 381, keeping: 379, ballTouch: 403 },
      defense: { tackle: 379, interception: 374, marking: 365 },
      physical: { jumping: 285, contact: 322, stamina: 353 },
      speed: { running: 370, agility: 407 }
    },
    maxEnhanced: {
      overall: 14092,
      baseStats: { shoot: 2601, pass: 2721, dribble: 2696, defense: 2699, physical: 2529, speed: 1799 },
      detailStats: {
        shoot: { finishing: 897, power: 816, composure: 888 },
        pass: { shortPass: 929, longPass: 902, accuracy: 890 },
        dribble: { breakout: 892, keeping: 890, ballTouch: 914 },
        defense: { tackle: 914, interception: 897, marking: 888 },
        physical: { jumping: 796, contact: 845, stamina: 888 },
        speed: { running: 881, agility: 918 }
      }
    },
    playTendencies: {
      attack: 1, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 2, longPass: -1, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '意外性のあるミドルパス', rank: '銅', description: '発動エリア：中中・後左中右　/　発動条件：CF・AMの選手へのショートパス・ロングパス時　/　ロングパス・キック精度・ショートパスUP　/　成功時に受け手のショートパス発生確率UP' },
    abilities: [
      { name: '反撃のパサー', rank: '銀', description: '発動条件：絶好調　/　ショートパス・タックルUP' },
      { name: '流れを切るロングパサー', rank: '銀', description: '発動条件：途中出場　/　ロングパス・パスカットUP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p190',
    name: '小泉佳穂(2026)',
    readingName: 'こいずみよしお',
    category: 'MF',
    mainPosition: 'AM',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'ムービング',
    playStyle: 'パサーAM',
    playStyleLevel: 'Ⅱ',
    overall: 6526,
    maxOverall: 14676,
    baseStats: { shoot: 1222, pass: 1275, dribble: 1240, defense: 1034, physical: 1174, speed: 740 },
    detailStats: {
      shoot: { finishing: 403, power: 428, composure: 391 },
      pass: { shortPass: 431, longPass: 426, accuracy: 418 },
      dribble: { breakout: 397, keeping: 412, ballTouch: 431 },
      defense: { tackle: 361, interception: 350, marking: 323 },
      physical: { jumping: 361, contact: 405, stamina: 408 },
      speed: { running: 342, agility: 398 }
    },
    maxEnhanced: {
      overall: 14676,
      baseStats: { shoot: 2767, pass: 2856, dribble: 2809, defense: 2579, physical: 2743, speed: 1774 },
      detailStats: {
        shoot: { finishing: 914, power: 939, composure: 914 },
        pass: { shortPass: 966, longPass: 949, accuracy: 941 },
        dribble: { breakout: 920, keeping: 935, ballTouch: 954 },
        defense: { tackle: 884, interception: 861, marking: 834 },
        physical: { jumping: 872, contact: 928, stamina: 943 },
        speed: { running: 853, agility: 921 }
      }
    },
    playTendencies: {
      attack: 1, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 2, longPass: -1, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '操舵のパス', rank: '銅', description: '発動エリア：前中・中中　/　発動条件：前中・中中に居る選手へのショートパス時　/　ショートパス・キック精度UP　/　ダイレクトショートパス成功時に受け手のシュート発生確率UP' },
    abilities: [
      { name: '不屈のパサー', rank: '銀', description: '発動条件：途中出場　/　ショートパス・スタミナUP' },
      { name: '柔軟なロングパサー', rank: '銀', description: '発動条件：途中出場　/　ロングパス・ボールタッチUP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p191',
    name: 'タイアニ・ラインデルス(配布)',
    readingName: 'たいあにらいんでるす',
    category: 'MF',
    mainPosition: 'AM',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'オランダ',
    policy: 'ムービング',
    playStyle: 'パサーAM',
    playStyleLevel: 'Ⅱ',
    overall: 6826,
    maxOverall: 13168,
    baseStats: { shoot: 1334, pass: 1363, dribble: 1411, defense: 1162, physical: 1201, speed: 914 },
    detailStats: {
      shoot: { finishing: 459, power: 432, composure: 443 },
      pass: { shortPass: 455, longPass: 458, accuracy: 450 },
      dribble: { breakout: 470, keeping: 469, ballTouch: 472 },
      defense: { tackle: 377, interception: 398, marking: 387 },
      physical: { jumping: 376, contact: 392, stamina: 433 },
      speed: { running: 439, agility: 475 }
    },
    maxEnhanced: {
      overall: 13168,
      baseStats: { shoot: 2339, pass: 2404, dribble: 2440, defense: 2167, physical: 2230, speed: 1588 },
      detailStats: {
        shoot: { finishing: 790, power: 763, composure: 786 },
        pass: { shortPass: 810, longPass: 801, accuracy: 793 },
        dribble: { breakout: 813, keeping: 812, ballTouch: 815 },
        defense: { tackle: 720, interception: 729, marking: 718 },
        physical: { jumping: 707, contact: 735, stamina: 788 },
        speed: { running: 770, agility: 818 }
      }
    },
    playTendencies: {
      attack: 0, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 1, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '敵陣を切り裂くパス', rank: '銅', description: '発動エリア：前中・中中　/　発動条件：CFの位置に居る選手へのショートパス時　/　ショートパス・キック精度UP　/　成功時に受け手のシュート発生確率UP' },
    abilities: [
      { name: '突き刺すパス', rank: '銀', description: '発動条件：途中出場　/　キック力・ショートパスUP' },
      { name: '不屈のパサー', rank: '銅', description: '発動条件：途中出場　/　ショートパス・スタミナUP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p192',
    name: '遠野大弥(2026)',
    readingName: 'とおのだいや',
    category: 'MF',
    mainPosition: 'AM',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'リアクション',
    playStyle: 'アタッカー',
    playStyleLevel: 'Ⅱ',
    overall: 6499,
    maxOverall: 14597,
    baseStats: { shoot: 1170, pass: 1154, dribble: 1300, defense: 1199, physical: 988, speed: 845 },
    detailStats: {
      shoot: { finishing: 408, power: 379, composure: 383 },
      pass: { shortPass: 374, longPass: 376, accuracy: 404 },
      dribble: { breakout: 430, keeping: 438, ballTouch: 432 },
      defense: { tackle: 394, interception: 403, marking: 402 },
      physical: { jumping: 340, contact: 298, stamina: 350 },
      speed: { running: 415, agility: 430 }
    },
    maxEnhanced: {
      overall: 14597,
      baseStats: { shoot: 2715, pass: 2735, dribble: 2869, defense: 2744, physical: 2557, speed: 1879 },
      detailStats: {
        shoot: { finishing: 919, power: 890, composure: 906 },
        pass: { shortPass: 909, longPass: 899, accuracy: 927 },
        dribble: { breakout: 953, keeping: 961, ballTouch: 955 },
        defense: { tackle: 917, interception: 914, marking: 913 },
        physical: { jumping: 851, contact: 821, stamina: 885 },
        speed: { running: 926, agility: 953 }
      }
    },
    playTendencies: {
      attack: 0, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 1, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '強引な中央突破', rank: '銅', description: '発動エリア：前中・中中　/　発動条件：ドリブル時　/　突破力・キープ力UP' },
    abilities: [
      { name: 'アジャイルターゲット', rank: '銀', description: '発動条件：途中出場　/　キープ力・敏捷性UP' },
      { name: '技巧派ドリブラー', rank: '銀', description: '発動条件：途中出場　/　突破力・ボールタッチUP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p193',
    name: '佐々木大樹(2026)',
    readingName: 'ささきだいじゅ',
    category: 'MF',
    mainPosition: 'AM',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'カウンター',
    playStyle: 'アタッカー',
    playStyleLevel: 'Ⅱ',
    overall: 6380,
    maxOverall: 14437,
    baseStats: { shoot: 1218, pass: 1139, dribble: 1237, defense: 1047, physical: 1238, speed: 811 },
    detailStats: {
      shoot: { finishing: 405, power: 411, composure: 402 },
      pass: { shortPass: 409, longPass: 381, accuracy: 349 },
      dribble: { breakout: 400, keeping: 428, ballTouch: 409 },
      defense: { tackle: 349, interception: 333, marking: 365 },
      physical: { jumping: 441, contact: 404, stamina: 393 },
      speed: { running: 403, agility: 408 }
    },
    maxEnhanced: {
      overall: 14437,
      baseStats: { shoot: 2763, pass: 2720, dribble: 2806, defense: 2592, physical: 2807, speed: 1845 },
      detailStats: {
        shoot: { finishing: 916, power: 922, composure: 925 },
        pass: { shortPass: 944, longPass: 904, accuracy: 872 },
        dribble: { breakout: 923, keeping: 951, ballTouch: 932 },
        defense: { tackle: 872, interception: 844, marking: 876 },
        physical: { jumping: 952, contact: 927, stamina: 928 },
        speed: { running: 914, agility: 931 }
      }
    },
    playTendencies: {
      attack: 0, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 1, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '敵陣を切り裂くパス', rank: '銅', description: '発動エリア：前中・中中　/　発動条件：CFの位置に居る選手へのショートパス時　/　ショートパス・キック精度UP　/　成功時に受け手のシュート発生確率UP' },
    abilities: [
      { name: '跳躍のパサー', rank: '銀', description: '発動条件：好調　/　ショートパス・ジャンプUP' },
      { name: '懐の深いボールタッチ', rank: '銀', description: '発動条件：絶好調　/　キープ力・ボールタッチUP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p194',
    name: '山見大登(2026)',
    readingName: 'やまみひろと',
    category: 'MF',
    mainPosition: 'AM',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'ムービング',
    playStyle: 'アタッカー',
    playStyleLevel: 'Ⅱ',
    overall: 6406,
    maxOverall: 14481,
    baseStats: { shoot: 1208, pass: 1165, dribble: 1277, defense: 928, physical: 1083, speed: 817 },
    detailStats: {
      shoot: { finishing: 404, power: 402, composure: 402 },
      pass: { shortPass: 368, longPass: 416, accuracy: 381 },
      dribble: { breakout: 438, keeping: 413, ballTouch: 426 },
      defense: { tackle: 298, interception: 323, marking: 307 },
      physical: { jumping: 393, contact: 304, stamina: 386 },
      speed: { running: 401, agility: 416 }
    },
    maxEnhanced: {
      overall: 14481,
      baseStats: { shoot: 2753, pass: 2746, dribble: 2846, defense: 2473, physical: 2652, speed: 1851 },
      detailStats: {
        shoot: { finishing: 915, power: 913, composure: 925 },
        pass: { shortPass: 903, longPass: 939, accuracy: 904 },
        dribble: { breakout: 961, keeping: 936, ballTouch: 949 },
        defense: { tackle: 821, interception: 834, marking: 818 },
        physical: { jumping: 904, contact: 827, stamina: 921 },
        speed: { running: 912, agility: 939 }
      }
    },
    playTendencies: {
      attack: 0, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 1, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '強引な中央突破', rank: '銅', description: '発動エリア：前中・中中　/　発動条件：ドリブル時　/　突破力・キープ力UP' },
    abilities: [
      { name: 'すり抜けるロングパサー', rank: '銀', description: '発動条件：絶好調　/　ロングパス・突破力UP' },
      { name: '俊敏なタッチ', rank: '銀', description: '発動条件：絶好調　/　ボールタッチ・敏捷性UP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p195',
    name: '名古新太郎(2026)',
    readingName: 'なごしんたろう',
    category: 'MF',
    mainPosition: 'AM',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'カウンター',
    playStyle: 'アタッカー',
    playStyleLevel: 'Ⅱ',
    overall: 6457,
    maxOverall: 14548,
    baseStats: { shoot: 1101, pass: 1085, dribble: 1323, defense: 1138, physical: 1052, speed: 871 },
    detailStats: {
      shoot: { finishing: 375, power: 354, composure: 372 },
      pass: { shortPass: 351, longPass: 335, accuracy: 399 },
      dribble: { breakout: 441, keeping: 445, ballTouch: 437 },
      defense: { tackle: 393, interception: 376, marking: 369 },
      physical: { jumping: 320, contact: 337, stamina: 395 },
      speed: { running: 433, agility: 438 }
    },
    maxEnhanced: {
      overall: 14548,
      baseStats: { shoot: 2646, pass: 2666, dribble: 2892, defense: 2683, physical: 2621, speed: 1905 },
      detailStats: {
        shoot: { finishing: 886, power: 865, composure: 895 },
        pass: { shortPass: 886, longPass: 858, accuracy: 922 },
        dribble: { breakout: 964, keeping: 968, ballTouch: 960 },
        defense: { tackle: 916, interception: 887, marking: 880 },
        physical: { jumping: 831, contact: 860, stamina: 930 },
        speed: { running: 944, agility: 961 }
      }
    },
    playTendencies: {
      attack: 0, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 1, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '強引な中央突破', rank: '銅', description: '発動エリア：前中・中中　/　発動条件：ドリブル時　/　突破力・キープ力UP' },
    abilities: [
      { name: '懐の深いボールタッチ', rank: '銀', description: '発動条件：絶好調　/　キープ力・ボールタッチUP' },
      { name: '俊敏なドリブラー', rank: '銀', description: '発動条件：好調　/　突破力・敏捷性UP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p196',
    name: '木村太哉(2026)',
    readingName: 'きむらたかや',
    category: 'MF',
    mainPosition: 'AM',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'カウンター',
    playStyle: 'アタッカー',
    playStyleLevel: 'Ⅱ',
    overall: 6385,
    maxOverall: 14474,
    baseStats: { shoot: 1151, pass: 1147, dribble: 1214, defense: 1070, physical: 1149, speed: 839 },
    detailStats: {
      shoot: { finishing: 390, power: 352, composure: 409 },
      pass: { shortPass: 374, longPass: 395, accuracy: 378 },
      dribble: { breakout: 406, keeping: 399, ballTouch: 409 },
      defense: { tackle: 341, interception: 370, marking: 359 },
      physical: { jumping: 405, contact: 378, stamina: 366 },
      speed: { running: 405, agility: 434 }
    },
    maxEnhanced: {
      overall: 14474,
      baseStats: { shoot: 2696, pass: 2728, dribble: 2783, defense: 2615, physical: 2718, speed: 1873 },
      detailStats: {
        shoot: { finishing: 901, power: 863, composure: 932 },
        pass: { shortPass: 909, longPass: 918, accuracy: 901 },
        dribble: { breakout: 929, keeping: 922, ballTouch: 932 },
        defense: { tackle: 864, interception: 881, marking: 870 },
        physical: { jumping: 916, contact: 901, stamina: 901 },
        speed: { running: 916, agility: 957 }
      }
    },
    playTendencies: {
      attack: 0, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 1, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '点で合わせるシュート', rank: '銅', description: '発動エリア：前中　/　発動条件：シュート時　/　決定力・キック力・冷静さUP' },
    abilities: [
      { name: '俊敏なタッチ', rank: '銀', description: '発動条件：絶好調　/　ボールタッチ・敏捷性UP' },
      { name: '冷静な突破', rank: '銀', description: '発動条件：絶好調　/　冷静さ・突破力UP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p197',
    name: '後藤優介(2026)',
    readingName: 'ごとうゆうすけ',
    category: 'MF',
    mainPosition: 'AM',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'カウンター',
    playStyle: 'アタッカー',
    playStyleLevel: 'Ⅱ',
    overall: 6071,
    maxOverall: 14159,
    baseStats: { shoot: 1111, pass: 1058, dribble: 1201, defense: 1024, physical: 1022, speed: 790 },
    detailStats: {
      shoot: { finishing: 384, power: 357, composure: 370 },
      pass: { shortPass: 345, longPass: 358, accuracy: 355 },
      dribble: { breakout: 399, keeping: 397, ballTouch: 405 },
      defense: { tackle: 339, interception: 350, marking: 335 },
      physical: { jumping: 316, contact: 320, stamina: 386 },
      speed: { running: 373, agility: 417 }
    },
    maxEnhanced: {
      overall: 14159,
      baseStats: { shoot: 2656, pass: 2639, dribble: 2770, defense: 2569, physical: 2591, speed: 1824 },
      detailStats: {
        shoot: { finishing: 895, power: 868, composure: 893 },
        pass: { shortPass: 880, longPass: 881, accuracy: 878 },
        dribble: { breakout: 922, keeping: 920, ballTouch: 928 },
        defense: { tackle: 862, interception: 861, marking: 846 },
        physical: { jumping: 827, contact: 843, stamina: 921 },
        speed: { running: 884, agility: 940 }
      }
    },
    playTendencies: {
      attack: 0, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 1, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '絶妙なトラップ', rank: '銅', description: '発動エリア：前中・中中　/　発動条件：トラップ時　/　ボールタッチ・キープ力UP　/　成功時に自身のシュート発生確率UP' },
    abilities: [
      { name: '俊敏なドリブラー', rank: '銀', description: '発動条件：好調　/　突破力・敏捷性UP' },
      { name: '絶え間ないボールタッチ', rank: '銀', description: '発動条件：途中出場　/　ボールタッチ・スタミナUP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p198',
    name: '藤川虎太朗(2026)',
    readingName: 'ふじかわこたろう',
    category: 'MF',
    mainPosition: 'AM',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'リアクション',
    playStyle: 'アタッカー',
    playStyleLevel: 'Ⅱ',
    overall: 6023,
    maxOverall: 14097,
    baseStats: { shoot: 1129, pass: 1134, dribble: 1156, defense: 897, physical: 987, speed: 784 },
    detailStats: {
      shoot: { finishing: 382, power: 373, composure: 374 },
      pass: { shortPass: 399, longPass: 384, accuracy: 351 },
      dribble: { breakout: 378, keeping: 386, ballTouch: 392 },
      defense: { tackle: 286, interception: 311, marking: 300 },
      physical: { jumping: 318, contact: 348, stamina: 321 },
      speed: { running: 379, agility: 405 }
    },
    maxEnhanced: {
      overall: 14097,
      baseStats: { shoot: 2674, pass: 2715, dribble: 2725, defense: 2442, physical: 2556, speed: 1818 },
      detailStats: {
        shoot: { finishing: 893, power: 884, composure: 897 },
        pass: { shortPass: 934, longPass: 907, accuracy: 874 },
        dribble: { breakout: 901, keeping: 909, ballTouch: 915 },
        defense: { tackle: 809, interception: 822, marking: 811 },
        physical: { jumping: 829, contact: 871, stamina: 856 },
        speed: { running: 890, agility: 928 }
      }
    },
    playTendencies: {
      attack: 0, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 1, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '操舵のパス', rank: '銅', description: '発動エリア：前中・中中　/　発動条件：前中・中中に居る選手へのショートパス時　/　ショートパス・キック精度UP　/　ダイレクトショートパス成功時に受け手のシュート発生確率UP' },
    abilities: [
      { name: 'シルクタッチ', rank: '銀', description: '発動条件：好調　/　ショートパス・ボールタッチUP' },
      { name: 'アジャイルターゲット', rank: '銀', description: '発動条件：途中出場　/　キープ力・敏捷性UP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p199',
    name: '荒木遼太郎(2026)',
    readingName: 'あらきりょうたろう',
    category: 'MF',
    mainPosition: 'AM',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'リアクション',
    playStyle: 'アタッカー',
    playStyleLevel: 'Ⅱ',
    overall: 6418,
    maxOverall: 14517,
    baseStats: { shoot: 1263, pass: 1073, dribble: 1182, defense: 1036, physical: 1068, speed: 822 },
    detailStats: {
      shoot: { finishing: 451, power: 363, composure: 449 },
      pass: { shortPass: 371, longPass: 362, accuracy: 340 },
      dribble: { breakout: 376, keeping: 387, ballTouch: 419 },
      defense: { tackle: 340, interception: 337, marking: 359 },
      physical: { jumping: 392, contact: 318, stamina: 358 },
      speed: { running: 394, agility: 428 }
    },
    maxEnhanced: {
      overall: 14517,
      baseStats: { shoot: 2808, pass: 2654, dribble: 2751, defense: 2581, physical: 2637, speed: 1856 },
      detailStats: {
        shoot: { finishing: 962, power: 874, composure: 972 },
        pass: { shortPass: 906, longPass: 885, accuracy: 863 },
        dribble: { breakout: 899, keeping: 910, ballTouch: 942 },
        defense: { tackle: 863, interception: 848, marking: 870 },
        physical: { jumping: 903, contact: 841, stamina: 893 },
        speed: { running: 905, agility: 951 }
      }
    },
    playTendencies: {
      attack: 0, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 1, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '狙いすましたシュート', rank: '銅', description: '発動エリア：前中　/　発動条件：シュート時　/　決定力・キック力・冷静さUP' },
    abilities: [
      { name: 'ムービングスナイパー', rank: '銀', description: '発動条件：好調　/　冷静さ・敏捷性UP' },
      { name: 'ゴール前の落ち着き', rank: '銀', description: '発動条件：好調　/　決定力・ボールタッチUP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p200',
    name: 'マテウス・サヴィオ(2026)',
    readingName: 'まてうすさゔぃお',
    category: 'MF',
    mainPosition: 'LM',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'ブラジル',
    policy: 'ポゼッション',
    playStyle: 'サイドアタッカーLM',
    playStyleLevel: 'Ⅱ',
    overall: 6511,
    maxOverall: 14715,
    baseStats: { shoot: 1207, pass: 1224, dribble: 1232, defense: 934, physical: 1006, speed: 839 },
    detailStats: {
      shoot: { finishing: 408, power: 373, composure: 426 },
      pass: { shortPass: 417, longPass: 408, accuracy: 399 },
      dribble: { breakout: 427, keeping: 382, ballTouch: 423 },
      defense: { tackle: 278, interception: 346, marking: 310 },
      physical: { jumping: 305, contact: 352, stamina: 349 },
      speed: { running: 415, agility: 424 }
    },
    maxEnhanced: {
      overall: 14715,
      baseStats: { shoot: 2764, pass: 2793, dribble: 2825, defense: 2443, physical: 2551, speed: 1909 },
      detailStats: {
        shoot: { finishing: 931, power: 884, composure: 949 },
        pass: { shortPass: 940, longPass: 931, accuracy: 922 },
        dribble: { breakout: 962, keeping: 917, ballTouch: 946 },
        defense: { tackle: 789, interception: 845, marking: 809 },
        physical: { jumping: 816, contact: 863, stamina: 872 },
        speed: { running: 950, agility: 959 }
      }
    },
    playTendencies: {
      attack: 1, defense: -1, dribble: 1, shoot: 0, longShoot: 0,
      shortPass: 0, longPass: 0, throughPass: 0, cutIn: -1, keep: 0,
      delay: -1, rushOut: 2, feint: 1, press: 0
    },
    skill: { name: '切り裂くドリブル', rank: '銅', description: '発動エリア：前左右　/　発動条件：ドリブル時　/　突破力・キープ力UP　/　成功時に自身のシュート発生確率UP' },
    abilities: [
      { name: 'スピードドリブラー', rank: '銀', description: '発動条件：途中出場　/　突破力・走力UP' },
      { name: 'ムービングスナイパー', rank: '銀', description: '発動条件：好調　/　冷静さ・敏捷性UP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p201',
    name: '佐藤龍之介(2026)',
    readingName: 'さとうりゅうのすけ',
    category: 'MF',
    mainPosition: 'LM',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'リアクション',
    playStyle: 'サイドアタッカーLM',
    playStyleLevel: 'Ⅱ',
    overall: 6528,
    maxOverall: 14738,
    baseStats: { shoot: 1162, pass: 1122, dribble: 1270, defense: 1009, physical: 1049, speed: 841 },
    detailStats: {
      shoot: { finishing: 397, power: 368, composure: 397 },
      pass: { shortPass: 370, longPass: 383, accuracy: 369 },
      dribble: { breakout: 441, keeping: 406, ballTouch: 423 },
      defense: { tackle: 335, interception: 347, marking: 327 },
      physical: { jumping: 357, contact: 308, stamina: 384 },
      speed: { running: 417, agility: 424 }
    },
    maxEnhanced: {
      overall: 14738,
      baseStats: { shoot: 2719, pass: 2691, dribble: 2863, defense: 2518, physical: 2594, speed: 1911 },
      detailStats: {
        shoot: { finishing: 920, power: 879, composure: 920 },
        pass: { shortPass: 893, longPass: 906, accuracy: 892 },
        dribble: { breakout: 976, keeping: 941, ballTouch: 946 },
        defense: { tackle: 846, interception: 846, marking: 826 },
        physical: { jumping: 868, contact: 819, stamina: 907 },
        speed: { running: 952, agility: 959 }
      }
    },
    playTendencies: {
      attack: 1, defense: -1, dribble: 1, shoot: 0, longShoot: 0,
      shortPass: 0, longPass: 0, throughPass: 0, cutIn: -1, keep: 0,
      delay: -1, rushOut: 2, feint: 1, press: 0
    },
    skill: { name: '切り裂くドリブル', rank: '銅', description: '発動エリア：前左右　/　発動条件：ドリブル時　/　突破力・キープ力UP　/　成功時に自身のシュート発生確率UP' },
    abilities: [
      { name: 'スピードドリブラー', rank: '銀', description: '発動条件：途中出場　/　突破力・走力UP' },
      { name: '俊敏なタッチ', rank: '銀', description: '発動条件：絶好調　/　ボールタッチ・敏捷性UP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p202',
    name: '姫野誠(2026)',
    readingName: 'ひめのまこと',
    category: 'MF',
    mainPosition: 'LM',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'ムービング',
    playStyle: 'サイドアタッカーLM',
    playStyleLevel: 'Ⅱ',
    overall: 6319,
    maxOverall: 14511,
    baseStats: { shoot: 1152, pass: 1110, dribble: 1223, defense: 1035, physical: 991, speed: 813 },
    detailStats: {
      shoot: { finishing: 393, power: 335, composure: 424 },
      pass: { shortPass: 362, longPass: 374, accuracy: 374 },
      dribble: { breakout: 428, keeping: 367, ballTouch: 428 },
      defense: { tackle: 342, interception: 351, marking: 342 },
      physical: { jumping: 298, contact: 331, stamina: 362 },
      speed: { running: 402, agility: 411 }
    },
    maxEnhanced: {
      overall: 14511,
      baseStats: { shoot: 2709, pass: 2679, dribble: 2816, defense: 2544, physical: 2536, speed: 1883 },
      detailStats: {
        shoot: { finishing: 916, power: 846, composure: 947 },
        pass: { shortPass: 885, longPass: 897, accuracy: 897 },
        dribble: { breakout: 963, keeping: 902, ballTouch: 951 },
        defense: { tackle: 853, interception: 850, marking: 841 },
        physical: { jumping: 809, contact: 842, stamina: 885 },
        speed: { running: 937, agility: 946 }
      }
    },
    playTendencies: {
      attack: 1, defense: -1, dribble: 1, shoot: 0, longShoot: 0,
      shortPass: 0, longPass: 0, throughPass: 0, cutIn: -1, keep: 0,
      delay: -1, rushOut: 2, feint: 1, press: 0
    },
    skill: { name: '切り裂くドリブル', rank: '銅', description: '発動エリア：前左右　/　発動条件：ドリブル時　/　突破力・キープ力UP　/　成功時に自身のシュート発生確率UP' },
    abilities: [
      { name: '俊敏なドリブラー', rank: '銀', description: '発動条件：好調　/　突破力・敏捷性UP' },
      { name: '冷静なボールタッチ', rank: '銀', description: '発動条件：絶好調　/　冷静さ・ボールタッチUP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p203',
    name: '加藤千尋(2026)',
    readingName: 'かとうちひろ',
    category: 'MF',
    mainPosition: 'RM',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'カウンター',
    playStyle: 'サイドアタッカーRM',
    playStyleLevel: 'Ⅱ',
    overall: 6167,
    maxOverall: 14335,
    baseStats: { shoot: 1185, pass: 1175, dribble: 1148, defense: 1121, physical: 1103, speed: 794 },
    detailStats: {
      shoot: { finishing: 380, power: 418, composure: 387 },
      pass: { shortPass: 393, longPass: 391, accuracy: 391 },
      dribble: { breakout: 371, keeping: 386, ballTouch: 391 },
      defense: { tackle: 368, interception: 385, marking: 368 },
      physical: { jumping: 329, contact: 373, stamina: 401 },
      speed: { running: 392, agility: 402 }
    },
    maxEnhanced: {
      overall: 14335,
      baseStats: { shoot: 2742, pass: 2744, dribble: 2741, defense: 2630, physical: 2648, speed: 1864 },
      detailStats: {
        shoot: { finishing: 903, power: 929, composure: 910 },
        pass: { shortPass: 916, longPass: 914, accuracy: 914 },
        dribble: { breakout: 906, keeping: 921, ballTouch: 914 },
        defense: { tackle: 879, interception: 884, marking: 867 },
        physical: { jumping: 840, contact: 884, stamina: 924 },
        speed: { running: 927, agility: 937 }
      }
    },
    playTendencies: {
      attack: 1, defense: -1, dribble: 1, shoot: 0, longShoot: 0,
      shortPass: 0, longPass: 0, throughPass: 0, cutIn: -1, keep: 0,
      delay: -1, rushOut: 2, feint: 1, press: 0
    },
    skill: { name: '高速クロス', rank: '銅', description: '発動エリア：前左右　/　発動条件：AM・RW・LW・CFの選手へのショートパス時　/　ショートパス・キック精度・ロングパスUP　/　成功時に受け手のシュート発生確率UP' },
    abilities: [
      { name: '無限のアジリティ', rank: '銀', description: '発動条件：好調　/　スタミナ・敏捷性UP' },
      { name: '懐の深いロングパサー', rank: '銀', description: '発動条件：好調　/　ロングパス・キープ力UP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p204',
    name: 'ノーマン・キャンベル(2026)',
    readingName: 'のーまんきゃんべる',
    category: 'FW',
    mainPosition: 'RW',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'ジャマイカ',
    policy: 'リアクション',
    playStyle: 'サイドアタッカーRW',
    playStyleLevel: 'Ⅱ',
    overall: 6379,
    maxOverall: 14585,
    baseStats: { shoot: 1161, pass: 985, dribble: 1235, defense: 862, physical: 934, speed: 880 },
    detailStats: {
      shoot: { finishing: 392, power: 374, composure: 395 },
      pass: { shortPass: 331, longPass: 323, accuracy: 331 },
      dribble: { breakout: 429, keeping: 404, ballTouch: 402 },
      defense: { tackle: 277, interception: 298, marking: 287 },
      physical: { jumping: 319, contact: 288, stamina: 327 },
      speed: { running: 465, agility: 415 }
    },
    maxEnhanced: {
      overall: 14585,
      baseStats: { shoot: 2718, pass: 2554, dribble: 2828, defense: 2371, physical: 2479, speed: 1950 },
      detailStats: {
        shoot: { finishing: 915, power: 885, composure: 918 },
        pass: { shortPass: 854, longPass: 846, accuracy: 854 },
        dribble: { breakout: 964, keeping: 939, ballTouch: 925 },
        defense: { tackle: 788, interception: 797, marking: 786 },
        physical: { jumping: 830, contact: 799, stamina: 850 },
        speed: { running: 1000, agility: 950 }
      }
    },
    playTendencies: {
      attack: 1, defense: -1, dribble: 1, shoot: 0, longShoot: 0,
      shortPass: 0, longPass: 0, throughPass: 0, cutIn: -1, keep: 0,
      delay: -1, rushOut: 2, feint: 1, press: 0
    },
    skill: { name: '切り裂くドリブル', rank: '銅', description: '発動エリア：前左右　/　発動条件：ドリブル時　/　突破力・キープ力UP　/　成功時に自身のシュート発生確率UP' },
    abilities: [
      { name: 'スピードランナー', rank: '銀', description: '発動条件：好調　/　走力・敏捷性UP' },
      { name: '失わないドリブラー', rank: '銀', description: '発動条件：絶好調　/　突破力・キープ力UP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p205',
    name: 'カルリーニョス・ジュニオ(2026)',
    readingName: 'かるりーにょすじゅにお',
    category: 'FW',
    mainPosition: 'LW',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'ブラジル',
    policy: 'ムービング',
    playStyle: 'サイドアタッカーLW',
    playStyleLevel: 'Ⅱ',
    overall: 6298,
    maxOverall: 14473,
    baseStats: { shoot: 1196, pass: 1147, dribble: 1188, defense: 939, physical: 1164, speed: 809 },
    detailStats: {
      shoot: { finishing: 382, power: 436, composure: 378 },
      pass: { shortPass: 385, longPass: 385, accuracy: 377 },
      dribble: { breakout: 396, keeping: 390, ballTouch: 402 },
      defense: { tackle: 283, interception: 339, marking: 317 },
      physical: { jumping: 362, contact: 403, stamina: 399 },
      speed: { running: 410, agility: 399 }
    },
    maxEnhanced: {
      overall: 14473,
      baseStats: { shoot: 2753, pass: 2716, dribble: 2781, defense: 2448, physical: 2709, speed: 1879 },
      detailStats: {
        shoot: { finishing: 905, power: 947, composure: 901 },
        pass: { shortPass: 908, longPass: 908, accuracy: 900 },
        dribble: { breakout: 931, keeping: 925, ballTouch: 925 },
        defense: { tackle: 794, interception: 838, marking: 816 },
        physical: { jumping: 873, contact: 914, stamina: 922 },
        speed: { running: 945, agility: 934 }
      }
    },
    playTendencies: {
      attack: 1, defense: -1, dribble: 1, shoot: 0, longShoot: 0,
      shortPass: 0, longPass: 0, throughPass: 0, cutIn: -1, keep: 0,
      delay: -1, rushOut: 2, feint: 1, press: 0
    },
    skill: { name: '確信のロングシュート', rank: '銅', description: '発動エリア：前中・中中　/　発動条件：シュート・ロングシュート時　/　決定力・キック力UP' },
    abilities: [
      { name: 'アジャイルキッカー', rank: '銀', description: '発動条件：途中出場　/　キック力・敏捷性UP' },
      { name: '懐の深いボールタッチ', rank: '銀', description: '発動条件：絶好調　/　キープ力・ボールタッチUP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p206',
    name: '相馬勇紀(2026)',
    readingName: 'そうまゆうき',
    category: 'FW',
    mainPosition: 'LW',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'カウンター',
    playStyle: 'ワイドストライカーLW',
    playStyleLevel: 'Ⅱ',
    overall: 6474,
    maxOverall: 14628,
    baseStats: { shoot: 1247, pass: 1228, dribble: 1260, defense: 937, physical: 1047, speed: 781 },
    detailStats: {
      shoot: { finishing: 420, power: 416, composure: 411 },
      pass: { shortPass: 399, longPass: 405, accuracy: 424 },
      dribble: { breakout: 419, keeping: 407, ballTouch: 434 },
      defense: { tackle: 293, interception: 330, marking: 314 },
      physical: { jumping: 320, contact: 346, stamina: 381 },
      speed: { running: 352, agility: 429 }
    },
    maxEnhanced: {
      overall: 14628,
      baseStats: { shoot: 2804, pass: 2797, dribble: 2853, defense: 2446, physical: 2592, speed: 1851 },
      detailStats: {
        shoot: { finishing: 943, power: 927, composure: 934 },
        pass: { shortPass: 922, longPass: 928, accuracy: 947 },
        dribble: { breakout: 954, keeping: 942, ballTouch: 957 },
        defense: { tackle: 804, interception: 829, marking: 813 },
        physical: { jumping: 831, contact: 857, stamina: 904 },
        speed: { running: 887, agility: 964 }
      }
    },
    playTendencies: {
      attack: 2, defense: -1, dribble: 2, shoot: 2, longShoot: 1,
      shortPass: 0, longPass: -1, throughPass: 0, cutIn: 2, keep: 0,
      delay: -1, rushOut: 1, feint: 1, press: 0
    },
    skill: { name: '切り裂くドリブル', rank: '銅', description: '発動エリア：前左右　/　発動条件：ドリブル時　/　突破力・キープ力UP　/　成功時に自身のシュート発生確率UP' },
    abilities: [
      { name: '俊敏なキッカー', rank: '銀', description: '発動条件：好調　/　キック精度・敏捷性UP' },
      { name: '技巧派ドリブラー', rank: '銀', description: '発動条件：途中出場　/　突破力・ボールタッチUP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p207',
    name: '倉田秋(2026)',
    readingName: 'くらたしゅう',
    category: 'FW',
    mainPosition: 'LW',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'ポゼッション',
    playStyle: 'ワイドストライカーLW',
    playStyleLevel: 'Ⅱ',
    overall: 6453,
    maxOverall: 14648,
    baseStats: { shoot: 1220, pass: 1172, dribble: 1225, defense: 924, physical: 1005, speed: 774 },
    detailStats: {
      shoot: { finishing: 407, power: 375, composure: 438 },
      pass: { shortPass: 392, longPass: 375, accuracy: 405 },
      dribble: { breakout: 409, keeping: 386, ballTouch: 430 },
      defense: { tackle: 295, interception: 303, marking: 326 },
      physical: { jumping: 329, contact: 281, stamina: 395 },
      speed: { running: 364, agility: 410 }
    },
    maxEnhanced: {
      overall: 14648,
      baseStats: { shoot: 2777, pass: 2741, dribble: 2818, defense: 2433, physical: 2550, speed: 1844 },
      detailStats: {
        shoot: { finishing: 930, power: 886, composure: 961 },
        pass: { shortPass: 915, longPass: 898, accuracy: 928 },
        dribble: { breakout: 944, keeping: 921, ballTouch: 953 },
        defense: { tackle: 806, interception: 802, marking: 825 },
        physical: { jumping: 840, contact: 792, stamina: 918 },
        speed: { running: 899, agility: 945 }
      }
    },
    playTendencies: {
      attack: 2, defense: -1, dribble: 2, shoot: 2, longShoot: 1,
      shortPass: 0, longPass: -1, throughPass: 0, cutIn: 2, keep: 0,
      delay: -1, rushOut: 1, feint: 1, press: 0
    },
    skill: { name: '切り裂くドリブル', rank: '銅', description: '発動エリア：前左右　/　発動条件：ドリブル時　/　突破力・キープ力UP　/　成功時に自身のシュート発生確率UP' },
    abilities: [
      { name: '冷静な突破', rank: '銀', description: '発動条件：絶好調　/　冷静さ・突破力UP' },
      { name: '俊敏なタッチ', rank: '銀', description: '発動条件：絶好調　/　ボールタッチ・敏捷性UP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p208',
    name: '石井久継(2026)',
    readingName: 'いしいひさつぐ',
    category: 'FW',
    mainPosition: 'LW',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'カウンター',
    playStyle: 'ワイドストライカーLW',
    playStyleLevel: 'Ⅱ',
    overall: 6258,
    maxOverall: 14444,
    baseStats: { shoot: 1153, pass: 1041, dribble: 1188, defense: 774, physical: 1002, speed: 800 },
    detailStats: {
      shoot: { finishing: 398, power: 345, composure: 410 },
      pass: { shortPass: 366, longPass: 357, accuracy: 318 },
      dribble: { breakout: 398, keeping: 371, ballTouch: 419 },
      defense: { tackle: 244, interception: 270, marking: 260 },
      physical: { jumping: 269, contact: 350, stamina: 383 },
      speed: { running: 386, agility: 414 }
    },
    maxEnhanced: {
      overall: 14444,
      baseStats: { shoot: 2710, pass: 2610, dribble: 2781, defense: 2283, physical: 2547, speed: 1870 },
      detailStats: {
        shoot: { finishing: 921, power: 856, composure: 933 },
        pass: { shortPass: 889, longPass: 880, accuracy: 841 },
        dribble: { breakout: 933, keeping: 906, ballTouch: 942 },
        defense: { tackle: 755, interception: 769, marking: 759 },
        physical: { jumping: 780, contact: 861, stamina: 906 },
        speed: { running: 921, agility: 949 }
      }
    },
    playTendencies: {
      attack: 2, defense: -1, dribble: 2, shoot: 2, longShoot: 1,
      shortPass: 0, longPass: -1, throughPass: 0, cutIn: 2, keep: 0,
      delay: -1, rushOut: 1, feint: 1, press: 0
    },
    skill: { name: '切り裂くドリブル', rank: '銅', description: '発動エリア：前左右　/　発動条件：ドリブル時　/　突破力・キープ力UP　/　成功時に自身のシュート発生確率UP' },
    abilities: [
      { name: '俊敏なドリブラー', rank: '銀', description: '発動条件：好調　/　突破力・敏捷性UP' },
      { name: '冷静なボールタッチ', rank: '銀', description: '発動条件：絶好調　/　冷静さ・ボールタッチUP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p209',
    name: '中村亮太(2026)',
    readingName: 'なかむらりょうた',
    category: 'FW',
    mainPosition: 'RW',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'カウンター',
    playStyle: 'ワイドストライカーRW',
    playStyleLevel: 'Ⅱ',
    overall: 6152,
    maxOverall: 14331,
    baseStats: { shoot: 1210, pass: 1052, dribble: 1136, defense: 1012, physical: 1101, speed: 725 },
    detailStats: {
      shoot: { finishing: 401, power: 413, composure: 396 },
      pass: { shortPass: 361, longPass: 351, accuracy: 340 },
      dribble: { breakout: 386, keeping: 379, ballTouch: 371 },
      defense: { tackle: 350, interception: 337, marking: 325 },
      physical: { jumping: 362, contact: 392, stamina: 347 },
      speed: { running: 301, agility: 424 }
    },
    maxEnhanced: {
      overall: 14331,
      baseStats: { shoot: 2767, pass: 2621, dribble: 2729, defense: 2521, physical: 2646, speed: 1795 },
      detailStats: {
        shoot: { finishing: 924, power: 924, composure: 919 },
        pass: { shortPass: 884, longPass: 874, accuracy: 863 },
        dribble: { breakout: 921, keeping: 914, ballTouch: 894 },
        defense: { tackle: 861, interception: 836, marking: 824 },
        physical: { jumping: 873, contact: 903, stamina: 870 },
        speed: { running: 836, agility: 959 }
      }
    },
    playTendencies: {
      attack: 2, defense: -1, dribble: 2, shoot: 2, longShoot: 1,
      shortPass: 0, longPass: -1, throughPass: 0, cutIn: 2, keep: 0,
      delay: -1, rushOut: 1, feint: 1, press: 0
    },
    skill: { name: 'テクニカルドリブル', rank: '銅', description: '発動エリア：前左右・中左右　/　発動条件：ドリブル時　/　突破力・キープ力UP　/　成功時に自身のショートパス発生確率UP' },
    abilities: [
      { name: '俊敏なドリブラー', rank: '銀', description: '発動条件：好調　/　突破力・敏捷性UP' },
      { name: '冷静な破壊者', rank: '銀', description: '発動条件：好調　/　冷静さ・コンタクトUP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p210',
    name: 'マルコ・トゥーリオ(2026)',
    readingName: 'まることぅーりお',
    category: 'FW',
    mainPosition: 'RW',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'ブラジル',
    policy: 'カウンター',
    playStyle: 'ワイドストライカーRW',
    playStyleLevel: 'Ⅱ',
    overall: 6294,
    maxOverall: 14452,
    baseStats: { shoot: 1198, pass: 1186, dribble: 1238, defense: 864, physical: 1080, speed: 778 },
    detailStats: {
      shoot: { finishing: 403, power: 391, composure: 404 },
      pass: { shortPass: 393, longPass: 403, accuracy: 390 },
      dribble: { breakout: 407, keeping: 410, ballTouch: 421 },
      defense: { tackle: 272, interception: 301, marking: 291 },
      physical: { jumping: 309, contact: 438, stamina: 333 },
      speed: { running: 426, agility: 352 }
    },
    maxEnhanced: {
      overall: 14452,
      baseStats: { shoot: 2755, pass: 2755, dribble: 2831, defense: 2373, physical: 2625, speed: 1848 },
      detailStats: {
        shoot: { finishing: 926, power: 902, composure: 927 },
        pass: { shortPass: 916, longPass: 926, accuracy: 913 },
        dribble: { breakout: 942, keeping: 945, ballTouch: 944 },
        defense: { tackle: 783, interception: 800, marking: 790 },
        physical: { jumping: 820, contact: 949, stamina: 856 },
        speed: { running: 961, agility: 887 }
      }
    },
    playTendencies: {
      attack: 2, defense: -1, dribble: 2, shoot: 2, longShoot: 1,
      shortPass: 0, longPass: -1, throughPass: 0, cutIn: 2, keep: 0,
      delay: -1, rushOut: 1, feint: 1, press: 0
    },
    skill: { name: 'ムービングターゲット', rank: '銅', description: '発動条件：絶好調　/　キープ力・走力UP' },
    abilities: [
      { name: '俊敏なドリブラー', rank: '銀', description: '発動条件：好調　/　突破力・敏捷性UP' },
      { name: '剛柔のタッチ', rank: '銀', description: '発動条件：好調　/　ボールタッチ・コンタクトUP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p211',
    name: 'マテウス・モラエス(2026)',
    readingName: 'まてうすもらえす',
    category: 'FW',
    mainPosition: 'RW',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'ブラジル',
    policy: 'ポゼッション',
    playStyle: 'ワイドストライカーRW',
    playStyleLevel: 'Ⅱ',
    overall: 6389,
    maxOverall: 14574,
    baseStats: { shoot: 1229, pass: 1135, dribble: 1242, defense: 891, physical: 905, speed: 752 },
    detailStats: {
      shoot: { finishing: 432, power: 374, composure: 423 },
      pass: { shortPass: 376, longPass: 373, accuracy: 386 },
      dribble: { breakout: 407, keeping: 409, ballTouch: 426 },
      defense: { tackle: 284, interception: 314, marking: 293 },
      physical: { jumping: 343, contact: 293, stamina: 269 },
      speed: { running: 349, agility: 403 }
    },
    maxEnhanced: {
      overall: 14574,
      baseStats: { shoot: 2786, pass: 2704, dribble: 2835, defense: 2400, physical: 2450, speed: 1822 },
      detailStats: {
        shoot: { finishing: 955, power: 885, composure: 946 },
        pass: { shortPass: 899, longPass: 896, accuracy: 909 },
        dribble: { breakout: 942, keeping: 944, ballTouch: 949 },
        defense: { tackle: 795, interception: 813, marking: 792 },
        physical: { jumping: 854, contact: 804, stamina: 792 },
        speed: { running: 884, agility: 938 }
      }
    },
    playTendencies: {
      attack: 2, defense: -1, dribble: 2, shoot: 2, longShoot: 1,
      shortPass: 0, longPass: -1, throughPass: 0, cutIn: 2, keep: 0,
      delay: -1, rushOut: 1, feint: 1, press: 0
    },
    skill: { name: '切り裂くドリブル', rank: '銅', description: '発動エリア：前左右　/　発動条件：ドリブル時　/　突破力・キープ力UP　/　成功時に自身のシュート発生確率UP' },
    abilities: [
      { name: 'ターゲットマン', rank: '銀', description: '発動条件：途中出場　/　決定力・キープ力UP' },
      { name: '切り開くキッカー', rank: '銀', description: '発動条件：好調　/　キック精度・突破力UP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p212',
    name: 'グスタフ・ルドヴィグソン(2026)',
    readingName: 'ぐすたふるどゔぃぐそん',
    category: 'FW',
    mainPosition: 'RW',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'スウェーデン',
    policy: 'リアクション',
    playStyle: 'ワイドストライカーRW',
    playStyleLevel: 'Ⅱ',
    overall: 6430,
    maxOverall: 14600,
    baseStats: { shoot: 1251, pass: 1030, dribble: 1187, defense: 976, physical: 1162, speed: 819 },
    detailStats: {
      shoot: { finishing: 417, power: 429, composure: 405 },
      pass: { shortPass: 333, longPass: 342, accuracy: 355 },
      dribble: { breakout: 395, keeping: 401, ballTouch: 391 },
      defense: { tackle: 314, interception: 339, marking: 323 },
      physical: { jumping: 385, contact: 375, stamina: 402 },
      speed: { running: 411, agility: 408 }
    },
    maxEnhanced: {
      overall: 14600,
      baseStats: { shoot: 2808, pass: 2599, dribble: 2780, defense: 2485, physical: 2707, speed: 1889 },
      detailStats: {
        shoot: { finishing: 940, power: 940, composure: 928 },
        pass: { shortPass: 856, longPass: 865, accuracy: 878 },
        dribble: { breakout: 930, keeping: 936, ballTouch: 914 },
        defense: { tackle: 825, interception: 838, marking: 822 },
        physical: { jumping: 896, contact: 886, stamina: 925 },
        speed: { running: 946, agility: 943 }
      }
    },
    playTendencies: {
      attack: 2, defense: -1, dribble: 2, shoot: 2, longShoot: 1,
      shortPass: 0, longPass: -1, throughPass: 0, cutIn: 2, keep: 0,
      delay: -1, rushOut: 1, feint: 1, press: 0
    },
    skill: { name: '切り裂くドリブル', rank: '銅', description: '発動エリア：前左右　/　発動条件：ドリブル時　/　突破力・キープ力UP　/　成功時に自身のシュート発生確率UP' },
    abilities: [
      { name: 'ランニングキッカー', rank: '銀', description: '発動条件：絶好調　/　キック力・走力UP' },
      { name: '冷静なボールキープ', rank: '銀', description: '発動条件：好調　/　冷静さ・キープ力UP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p213',
    name: 'イ・チュンヨン(2026)',
    readingName: 'い・ちゅんよん',
    category: 'FW',
    mainPosition: 'RW',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '韓国',
    policy: 'リアクション',
    playStyle: 'ワイドストライカーRW',
    playStyleLevel: 'Ⅱ',
    overall: 6319,
    maxOverall: 14499,
    baseStats: { shoot: 1226, pass: 1128, dribble: 1239, defense: 1089, physical: 974, speed: 720 },
    detailStats: {
      shoot: { finishing: 427, power: 381, composure: 418 },
      pass: { shortPass: 395, longPass: 382, accuracy: 351 },
      dribble: { breakout: 380, keeping: 401, ballTouch: 458 },
      defense: { tackle: 361, interception: 367, marking: 361 },
      physical: { jumping: 332, contact: 339, stamina: 303 },
      speed: { running: 360, agility: 360 }
    },
    maxEnhanced: {
      overall: 14499,
      baseStats: { shoot: 2783, pass: 2697, dribble: 2832, defense: 2598, physical: 2519, speed: 1790 },
      detailStats: {
        shoot: { finishing: 950, power: 892, composure: 941 },
        pass: { shortPass: 918, longPass: 905, accuracy: 874 },
        dribble: { breakout: 915, keeping: 936, ballTouch: 981 },
        defense: { tackle: 872, interception: 866, marking: 860 },
        physical: { jumping: 843, contact: 850, stamina: 826 },
        speed: { running: 895, agility: 895 }
      }
    },
    playTendencies: {
      attack: 2, defense: -1, dribble: 2, shoot: 2, longShoot: 1,
      shortPass: 0, longPass: -1, throughPass: 0, cutIn: 2, keep: 0,
      delay: -1, rushOut: 1, feint: 1, press: 0
    },
    skill: { name: '疾走のトラップ', rank: '銅', description: '発動エリア：前左右・中左右　/　発動条件：トラップ時　/　ボールタッチ・ショートパスUP　/　成功時に自身のショートパス発生確率UP' },
    abilities: [
      { name: '冷静なボールタッチ', rank: '銀', description: '発動条件：絶好調　/　冷静さ・ボールタッチUP' },
      { name: '切り裂くパサー', rank: '銀', description: '発動条件：絶好調　/　ショートパス・突破力UP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p214',
    name: 'コ・ジェヒョン(2026)',
    readingName: 'こ・じぇひょん',
    category: 'FW',
    mainPosition: 'RW',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '韓国',
    policy: 'リアクション',
    playStyle: 'ワイドストライカーRW',
    playStyleLevel: 'Ⅱ',
    overall: 6253,
    maxOverall: 14406,
    baseStats: { shoot: 1182, pass: 1173, dribble: 1259, defense: 1074, physical: 1009, speed: 738 },
    detailStats: {
      shoot: { finishing: 390, power: 388, composure: 404 },
      pass: { shortPass: 368, longPass: 379, accuracy: 426 },
      dribble: { breakout: 397, keeping: 425, ballTouch: 437 },
      defense: { tackle: 352, interception: 367, marking: 355 },
      physical: { jumping: 360, contact: 263, stamina: 386 },
      speed: { running: 364, agility: 374 }
    },
    maxEnhanced: {
      overall: 14406,
      baseStats: { shoot: 2739, pass: 2742, dribble: 2852, defense: 2583, physical: 2554, speed: 1808 },
      detailStats: {
        shoot: { finishing: 913, power: 899, composure: 927 },
        pass: { shortPass: 891, longPass: 902, accuracy: 949 },
        dribble: { breakout: 932, keeping: 960, ballTouch: 960 },
        defense: { tackle: 863, interception: 866, marking: 854 },
        physical: { jumping: 871, contact: 774, stamina: 909 },
        speed: { running: 899, agility: 909 }
      }
    },
    playTendencies: {
      attack: 2, defense: -1, dribble: 2, shoot: 2, longShoot: 1,
      shortPass: 0, longPass: -1, throughPass: 0, cutIn: 2, keep: 0,
      delay: -1, rushOut: 1, feint: 1, press: 0
    },
    skill: { name: '切り裂くドリブル', rank: '銅', description: '発動エリア：前左右　/　発動条件：ドリブル時　/　突破力・キープ力UP　/　成功時に自身のシュート発生確率UP' },
    abilities: [
      { name: '保持するキッカー', rank: '銀', description: '発動条件：好調　/　キック精度・キープ力UP' },
      { name: '技巧派ドリブラー', rank: '銀', description: '発動条件：途中出場　/　突破力・ボールタッチUP' }
    ],
    avatarUrl: ''
  },
  {
    "id": "p215",
    "name": "久保藤次郎(2026)",
    "readingName": "くぼとうじろう",
    "category": "MF",
    "mainPosition": "RM",
    "subPositions": [],
    "rarity": "☆3",
    "baseRarity": "☆3",
    "nationality": "日本",
    "policy": "ムービング",
    "playStyle": "ドリブラーRM",
    "playStyleLevel": "Ⅱ",
    "overall": 6304,
    "maxOverall": 14496,
    "baseStats": { "shoot": 1057, "pass": 1126, "dribble": 1201, "defense": 1093, "physical": 1059, "speed": 875 },
    "detailStats": {
      "shoot": { "finishing": 366, "power": 334, "composure": 357 },
      "pass": { "shortPass": 402, "longPass": 387, "accuracy": 337 },
      "dribble": { "breakout": 436, "keeping": 370, "ballTouch": 395 },
      "defense": { "tackle": 336, "interception": 398, "marking": 359 },
      "physical": { "jumping": 312, "contact": 343, "stamina": 404 },
      "speed": { "running": 452, "agility": 423 }
    },
    "maxEnhanced": {
      "overall": 14496,
      "baseStats": { "shoot": 2614, "pass": 2695, "dribble": 2794, "defense": 2602, "physical": 2604, "speed": 1945 },
      "detailStats": {
        "shoot": { "finishing": 889, "power": 845, "composure": 880 },
        "pass": { "shortPass": 925, "longPass": 910, "accuracy": 860 },
        "dribble": { "breakout": 971, "keeping": 905, "ballTouch": 918 },
        "defense": { "tackle": 847, "interception": 897, "marking": 858 },
        "physical": { "jumping": 823, "contact": 854, "stamina": 927 },
        "speed": { "running": 987, "agility": 958 }
      }
    },
    "playTendencies": {
      "attack": 2, "defense": -1, "dribble": 2, "shoot": 1, "longShoot": 0,
      "shortPass": 0, "longPass": -1, "throughPass": 0, "cutIn": 1, "keep": 1,
      "delay": -1, "rushOut": 1, "feint": 2, "press": 0
    },
    "skill": { name: 'テクニカルドリブル', rank: '銅', description: '発動エリア：前左右・中左右　/　発動条件：ドリブル時　/　突破力・キープ力UP　/　成功時に自身のショートパス発生確率UP' },
    "abilities": [
      { name: 'マラソンマン', rank: '銀', description: '発動条件：途中出場　/　スタミナ・走力UP' },
      { name: '長短のキック', rank: '銀', description: '発動条件：途中出場　/　ショートパス・ロングパスUP' }
    ],
    "avatarUrl": ""
  },
  {
    "id": "p216",
    "name": "髙橋大悟(2026)",
    "readingName": "たかはしだいご",
    "category": "MF",
    "mainPosition": "RM",
    "subPositions": [],
    "rarity": "☆3",
    "baseRarity": "☆3",
    "nationality": "日本",
    "policy": "カウンター",
    "playStyle": "ドリブラーRM",
    "playStyleLevel": "Ⅱ",
    "overall": 6116,
    "maxOverall": 14318,
    "baseStats": { "shoot": 1144, "pass": 1187, "dribble": 1259, "defense": 880, "physical": 1029, "speed": 720 },
    "detailStats": {
      "shoot": { "finishing": 391, "power": 370, "composure": 383 },
      "pass": { "shortPass": 395, "longPass": 397, "accuracy": 395 },
      "dribble": { "breakout": 402, "keeping": 412, "ballTouch": 445 },
      "defense": { "tackle": 283, "interception": 306, "marking": 291 },
      "physical": { "jumping": 314, "contact": 337, "stamina": 378 },
      "speed": { "running": 356, "agility": 364 }
    },
    "maxEnhanced": {
      "overall": 14318,
      "baseStats": { "shoot": 2701, "pass": 2756, "dribble": 2852, "defense": 2389, "physical": 2574, "speed": 1790 },
      "detailStats": {
        "shoot": { "finishing": 914, "power": 881, "composure": 906 },
        "pass": { "shortPass": 918, "longPass": 920, "accuracy": 918 },
        "dribble": { "breakout": 937, "keeping": 947, "ballTouch": 968 },
        "defense": { "tackle": 794, "interception": 805, "marking": 790 },
        "physical": { "jumping": 825, "contact": 848, "stamina": 901 },
        "speed": { "running": 891, "agility": 899 }
      }
    },
    "playTendencies": {
      "attack": 2, "defense": -1, "dribble": 2, "shoot": 1, "longShoot": 0,
      "shortPass": 0, "longPass": -1, "throughPass": 0, "cutIn": 1, "keep": 1,
      "delay": -1, "rushOut": 1, "feint": 2, "press": 0
    },
    "skill": { name: '疾走のトラップ', rank: '銅', description: '発動エリア：前左右・中左右　/　発動条件：トラップ時　/　ボールタッチ・ショートパスUP　/　成功時に自身のショートパス発生確率UP' },
    "abilities": [
      { "name": "技巧派ドリブラー", "rank": "銀", "description": "発動条件：途中出場　/　突破力・ボールタッチUP" },
      { "name": "精緻なパサー", "rank": "銀", "description": "発動条件：絶好調　/　ショートパス・キック精度UP" }
    ],
    "avatarUrl": ""
  },
  {
    "id": "p217",
    "name": "モ・ジェヒョン(2026)",
    "readingName": "もじぇひょん",
    "category": "MF",
    "mainPosition": "RM",
    "subPositions": [],
    "rarity": "☆3",
    "baseRarity": "☆3",
    "nationality": "韓国",
    "policy": "カウンター",
    "playStyle": "ドリブラーRM",
    "playStyleLevel": "Ⅱ",
    "overall": 6203,
    "maxOverall": 14403,
    "baseStats": { "shoot": 1021, "pass": 1147, "dribble": 1158, "defense": 994, "physical": 955, "speed": 878 },
    "detailStats": {
      "shoot": { "finishing": 354, "power": 324, "composure": 343 },
      "pass": { "shortPass": 400, "longPass": 388, "accuracy": 359 },
      "dribble": { "breakout": 417, "keeping": 388, "ballTouch": 353 },
      "defense": { "tackle": 268, "interception": 367, "marking": 359 },
      "physical": { "jumping": 380, "contact": 279, "stamina": 296 },
      "speed": { "running": 435, "agility": 443 }
    },
    "maxEnhanced": {
      "overall": 14403,
      "baseStats": { "shoot": 2578, "pass": 2716, "dribble": 2751, "defense": 2503, "physical": 2500, "speed": 1948 },
      "detailStats": {
        "shoot": { "finishing": 877, "power": 835, "composure": 866 },
        "pass": { "shortPass": 923, "longPass": 911, "accuracy": 882 },
        "dribble": { "breakout": 952, "keeping": 923, "ballTouch": 876 },
        "defense": { "tackle": 779, "interception": 866, "marking": 858 },
        "physical": { "jumping": 891, "contact": 790, "stamina": 819 },
        "speed": { "running": 970, "agility": 978 }
      }
    },
    "playTendencies": {
      "attack": 2, "defense": -1, "dribble": 2, "shoot": 1, "longShoot": 0,
      "shortPass": 0, "longPass": -1, "throughPass": 0, "cutIn": 1, "keep": 1,
      "delay": -1, "rushOut": 1, "feint": 2, "press": 0
    },
    "skill": { name: '高速クロス', rank: '銅', description: '発動エリア：前左右　/　発動条件：AM・RW・LW・CFの選手へのショートパス時　/　ショートパス・キック精度・ロングパスUP　/　成功時に受け手のシュート発生確率UP' },
    "abilities": [
      { name: '俊敏なパサー', rank: '銀', description: '発動条件：好調　/　ショートパス・敏捷性UP' },
      { name: '上空のターゲットマン', rank: '銀', description: '発動条件：途中出場　/　キープ力・ジャンプUP' }
    ],
    "avatarUrl": ""
  },
  {
    "id": "p218",
    "name": "松橋優安(2026)",
    "readingName": "まつはしゆあん",
    "category": "MF",
    "mainPosition": "LM",
    "subPositions": [],
    "rarity": "☆3",
    "baseRarity": "☆3",
    "nationality": "日本",
    "policy": "ムービング",
    "playStyle": "ドリブラーLM",
    "playStyleLevel": "Ⅱ",
    "overall": 6268,
    "maxOverall": 14506,
    "baseStats": { "shoot": 1140, "pass": 1062, "dribble": 1203, "defense": 1162, "physical": 988, "speed": 797 },
    "detailStats": {
      "shoot": { "finishing": 395, "power": 346, "composure": 399 },
      "pass": { "shortPass": 360, "longPass": 353, "accuracy": 349 },
      "dribble": { "breakout": 400, "keeping": 391, "ballTouch": 412 },
      "defense": { "tackle": 385, "interception": 393, "marking": 384 },
      "physical": { "jumping": 307, "contact": 308, "stamina": 373 },
      "speed": { "running": 389, "agility": 408 }
    },
    "maxEnhanced": {
      "overall": 14506,
      "baseStats": { "shoot": 2697, "pass": 2631, "dribble": 2796, "defense": 2671, "physical": 2533, "speed": 1867 },
      "detailStats": {
        "shoot": { "finishing": 918, "power": 857, "composure": 922 },
        "pass": { "shortPass": 883, "longPass": 876, "accuracy": 872 },
        "dribble": { "breakout": 935, "keeping": 926, "ballTouch": 935 },
        "defense": { "tackle": 896, "interception": 892, "marking": 883 },
        "physical": { "jumping": 818, "contact": 819, "stamina": 896 },
        "speed": { "running": 924, "agility": 943 }
      }
    },
    "playTendencies": {
      "attack": 2, "defense": -1, "dribble": 2, "shoot": 1, "longShoot": 0,
      "shortPass": 0, "longPass": -1, "throughPass": 0, "cutIn": 1, "keep": 1,
      "delay": -1, "rushOut": 1, "feint": 2, "press": 0
    },
    "skill": { name: '切り裂くドリブル', rank: '銅', description: '発動エリア：前左右　/　発動条件：ドリブル時　/　突破力・キープ力UP　/　成功時に自身のシュート発生確率UP' },
    "abilities": [
      { name: 'アジャイルターゲット', rank: '銀', description: '発動条件：途中出場　/　キープ力・敏捷性UP' },
      { "name": "技巧派ドリブラー", "rank": "銀", "description": "発動条件：途中出場　/　突破力・ボールタッチUP" }
    ],
    "avatarUrl": ""
  },
  {
    "id": "p219",
    "name": "竹本雄飛(2026)",
    "readingName": "たけもとゆうひ",
    "category": "MF",
    "mainPosition": "LM",
    "subPositions": [],
    "rarity": "☆3",
    "baseRarity": "☆3",
    "nationality": "日本",
    "policy": "ムービング",
    "playStyle": "ドリブラーLM",
    "playStyleLevel": "Ⅱ",
    "overall": 6033,
    "maxOverall": 14253,
    "baseStats": { "shoot": 1025, "pass": 1178, "dribble": 1174, "defense": 1036, "physical": 1025, "speed": 765 },
    "detailStats": {
      "shoot": { "finishing": 352, "power": 353, "composure": 320 },
      "pass": { "shortPass": 392, "longPass": 396, "accuracy": 390 },
      "dribble": { "breakout": 390, "keeping": 371, "ballTouch": 413 },
      "defense": { "tackle": 337, "interception": 362, "marking": 337 },
      "physical": { "jumping": 322, "contact": 324, "stamina": 379 },
      "speed": { "running": 354, "agility": 411 }
    },
    "maxEnhanced": {
      "overall": 14253,
      "baseStats": { "shoot": 2582, "pass": 2747, "dribble": 2767, "defense": 2545, "physical": 2570, "speed": 1835 },
      "detailStats": {
        "shoot": { "finishing": 875, "power": 864, "composure": 843 },
        "pass": { "shortPass": 915, "longPass": 919, "accuracy": 913 },
        "dribble": { "breakout": 925, "keeping": 906, "ballTouch": 936 },
        "defense": { "tackle": 848, "interception": 861, "marking": 836 },
        "physical": { "jumping": 833, "contact": 835, "stamina": 902 },
        "speed": { "running": 889, "agility": 946 }
      }
    },
    "playTendencies": {
      "attack": 2, "defense": -1, "dribble": 2, "shoot": 1, "longShoot": 0,
      "shortPass": 0, "longPass": -1, "throughPass": 0, "cutIn": 1, "keep": 1,
      "delay": -1, "rushOut": 1, "feint": 2, "press": 0
    },
    "skill": { name: '華麗なトラップ', rank: '銅', description: '発動エリア：前左右・中左右　/　発動条件：トラップ時　/　ボールタッチ・突破力UP　/　成功時に自身のドリブル発生確率UP' },
    "abilities": [
      { name: '俊敏なドリブラー', rank: '銀', description: '発動条件：好調　/　突破力・敏捷性UP' },
      { "name": "精緻なパサー", "rank": "銀", "description": "発動条件：絶好調　/　ショートパス・キック精度UP" }
    ],
    "avatarUrl": ""
  },
  {
    "id": "p220",
    "name": "亀田歩夢(2026)",
    "readingName": "かめだあゆむ",
    "category": "MF",
    "mainPosition": "LM",
    "subPositions": [],
    "rarity": "☆3",
    "baseRarity": "☆3",
    "nationality": "日本",
    "policy": "カウンター",
    "playStyle": "ドリブラーLM",
    "playStyleLevel": "Ⅱ",
    "overall": 6182,
    "maxOverall": 14412,
    "baseStats": { "shoot": 1114, "pass": 1066, "dribble": 1202, "defense": 974, "physical": 906, "speed": 812 },
    "detailStats": {
      "shoot": { "finishing": 376, "power": 364, "composure": 374 },
      "pass": { "shortPass": 352, "longPass": 346, "accuracy": 368 },
      "dribble": { "breakout": 406, "keeping": 378, "ballTouch": 418 },
      "defense": { "tackle": 329, "interception": 324, "marking": 321 },
      "physical": { "jumping": 290, "contact": 261, "stamina": 355 },
      "speed": { "running": 391, "agility": 421 }
    },
    "maxEnhanced": {
      "overall": 14412,
      "baseStats": { "shoot": 2671, "pass": 2635, "dribble": 2795, "defense": 2483, "physical": 2451, "speed": 1882 },
      "detailStats": {
        "shoot": { "finishing": 899, "power": 875, "composure": 897 },
        "pass": { "shortPass": 875, "longPass": 869, "accuracy": 891 },
        "dribble": { "breakout": 941, "keeping": 913, "ballTouch": 941 },
        "defense": { "tackle": 840, "interception": 823, "marking": 820 },
        "physical": { "jumping": 801, "contact": 772, "stamina": 878 },
        "speed": { "running": 926, "agility": 956 }
      }
    },
    "playTendencies": {
      "attack": 2, "defense": -1, "dribble": 2, "shoot": 1, "longShoot": 0,
      "shortPass": 0, "longPass": -1, "throughPass": 0, "cutIn": 1, "keep": 1,
      "delay": -1, "rushOut": 1, "feint": 2, "press": 0
    },
    "skill": { name: '切り裂くドリブル', rank: '銅', description: '発動エリア：前左右　/　発動条件：ドリブル時　/　突破力・キープ力UP　/　成功時に自身のシュート発生確率UP' },
    "abilities": [
      { "name": "スピードランナー", "rank": "銀", "description": "発動条件：好調　/　走力・敏捷性UP" },
      { "name": "技巧派ドリブラー", "rank": "銀", "description": "発動条件：途中出場　/　突破力・ボールタッチUP" }
    ],
    "avatarUrl": ""
  },
  {
    "id": "p221",
    "name": "チアゴ・アンドラーデ(2026)",
    "readingName": "ちあごあんどらーで",
    "category": "FW",
    "mainPosition": "LW",
    "subPositions": [],
    "rarity": "☆3",
    "baseRarity": "☆3",
    "nationality": "ブラジル",
    "policy": "ポゼッション",
    "playStyle": "ドリブラーLW",
    "playStyleLevel": "Ⅱ",
    "overall": 6496,
    "maxOverall": 14747,
    "baseStats": { "shoot": 1129, "pass": 1100, "dribble": 1258, "defense": 883, "physical": 1031, "speed": 840 },
    "detailStats": {
      "shoot": { "finishing": 372, "power": 388, "composure": 369 },
      "pass": { "shortPass": 360, "longPass": 380, "accuracy": 360 },
      "dribble": { "breakout": 427, "keeping": 418, "ballTouch": 413 },
      "defense": { "tackle": 314, "interception": 292, "marking": 277 },
      "physical": { "jumping": 324, "contact": 362, "stamina": 345 },
      "speed": { "running": 426, "agility": 414 }
    },
    "maxEnhanced": {
      "overall": 14747,
      "baseStats": { "shoot": 2686, "pass": 2669, "dribble": 2851, "defense": 2392, "physical": 2576, "speed": 1910 },
      "detailStats": {
        "shoot": { "finishing": 895, "power": 899, "composure": 892 },
        "pass": { "shortPass": 883, "longPass": 903, "accuracy": 883 },
        "dribble": { "breakout": 962, "keeping": 953, "ballTouch": 936 },
        "defense": { "tackle": 825, "interception": 791, "marking": 776 },
        "physical": { "jumping": 835, "contact": 873, "stamina": 868 },
        "speed": { "running": 961, "agility": 949 }
      }
    },
    "playTendencies": {
      "attack": 2, "defense": -1, "dribble": 2, "shoot": 1, "longShoot": 0,
      "shortPass": 0, "longPass": -1, "throughPass": 0, "cutIn": 1, "keep": 1,
      "delay": -1, "rushOut": 1, "feint": 2, "press": 0
    },
    "skill": { name: 'テクニカルドリブル', rank: '銅', description: '発動エリア：前左右・中左右　/　発動条件：ドリブル時　/　突破力・キープ力UP　/　成功時に自身のショートパス発生確率UP' },
    "abilities": [
      { name: '失わないドリブラー', rank: '銀', description: '発動条件：絶好調　/　突破力・キープ力UP' },
      { "name": "スピードランナー", "rank": "銀", "description": "発動条件：好調　/　走力・敏捷性UP" }
    ],
    "avatarUrl": ""
  },
  {
    "id": "p222",
    "name": "ガレゴ(2026)",
    "readingName": "がれご",
    "category": "FW",
    "mainPosition": "LW",
    "subPositions": [],
    "rarity": "☆3",
    "baseRarity": "☆3",
    "nationality": "ブラジル",
    "policy": "ポゼッション",
    "playStyle": "ドリブラーLW",
    "playStyleLevel": "Ⅱ",
    "overall": 6405,
    "maxOverall": 14651,
    "baseStats": { "shoot": 1102, "pass": 1065, "dribble": 1235, "defense": 954, "physical": 948, "speed": 823 },
    "detailStats": {
      "shoot": { "finishing": 385, "power": 337, "composure": 380 },
      "pass": { "shortPass": 352, "longPass": 354, "accuracy": 359 },
      "dribble": { "breakout": 426, "keeping": 414, "ballTouch": 395 },
      "defense": { "tackle": 327, "interception": 309, "marking": 318 },
      "physical": { "jumping": 279, "contact": 287, "stamina": 382 },
      "speed": { "running": 395, "agility": 428 }
    },
    "maxEnhanced": {
      "overall": 14651,
      "baseStats": { "shoot": 2659, "pass": 2634, "dribble": 2828, "defense": 2463, "physical": 2493, "speed": 1893 },
      "detailStats": {
        "shoot": { "finishing": 908, "power": 848, "composure": 903 },
        "pass": { "shortPass": 875, "longPass": 877, "accuracy": 882 },
        "dribble": { "breakout": 961, "keeping": 949, "ballTouch": 918 },
        "defense": { "tackle": 838, "interception": 808, "marking": 817 },
        "physical": { "jumping": 790, "contact": 798, "stamina": 905 },
        "speed": { "running": 930, "agility": 963 }
      }
    },
    "playTendencies": {
      "attack": 2, "defense": -1, "dribble": 2, "shoot": 1, "longShoot": 0,
      "shortPass": 0, "longPass": -1, "throughPass": 0, "cutIn": 1, "keep": 1,
      "delay": -1, "rushOut": 1, "feint": 2, "press": 0
    },
    "skill": { name: '切り裂くドリブル', rank: '銅', description: '発動エリア：前左右　/　発動条件：ドリブル時　/　突破力・キープ力UP　/　成功時に自身のシュート発生確率UP' },
    "abilities": [
      { name: 'アジャイルターゲット', rank: '銀', description: '発動条件：途中出場　/　キープ力・敏捷性UP' },
      { name: 'スピードドリブラー', rank: '銀', description: '発動条件：途中出場　/　突破力・走力UP' }
    ],
    "avatarUrl": ""
  },
  {
    id: 'p223',
    name: 'チアギーニョ(2026)',
    readingName: 'ちあぎーにょ',
    category: 'FW',
    mainPosition: 'LW',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'ブラジル',
    policy: 'ポゼッション',
    playStyle: 'ドリブラーLW',
    playStyleLevel: 'Ⅱ',
    overall: 6283,
    maxOverall: 14496,
    baseStats: { shoot: 1116, pass: 1070, dribble: 1183, defense: 1017, physical: 835, speed: 879 },
    detailStats: {
      shoot: { finishing: 394, power: 337, composure: 385 },
      pass: { shortPass: 359, longPass: 354, accuracy: 357 },
      dribble: { breakout: 416, keeping: 379, ballTouch: 388 },
      defense: { tackle: 313, interception: 359, marking: 345 },
      physical: { jumping: 244, contact: 251, stamina: 340 },
      speed: { running: 426, agility: 453 }
    },
    maxEnhanced: {
      overall: 14496,
      baseStats: { shoot: 2673, pass: 2639, dribble: 2776, defense: 2526, physical: 2380, speed: 1949 },
      detailStats: {
        shoot: { finishing: 917, power: 848, composure: 908 },
        pass: { shortPass: 882, longPass: 877, accuracy: 880 },
        dribble: { breakout: 951, keeping: 914, ballTouch: 911 },
        defense: { tackle: 824, interception: 858, marking: 844 },
        physical: { jumping: 755, contact: 762, stamina: 863 },
        speed: { running: 961, agility: 988 }
      }
    },
    playTendencies: {
      attack: 2, defense: -1, dribble: 2, shoot: 1, longShoot: 0,
      shortPass: 0, longPass: -1, throughPass: 0, cutIn: 1, keep: 1,
      delay: -1, rushOut: 1, feint: 2, press: 0
    },
    skill: { name: '切り裂くドリブル', rank: '銅', description: '発動エリア：前左右　/　発動条件：ドリブル時　/　突破力・キープ力UP　/　成功時に自身のシュート発生確率UP' },
    abilities: [
      { name: 'ゴール前の嗅覚', rank: '銀', description: '発動条件：絶好調　/　決定力・敏捷性UP' },
      { name: 'スピードドリブラー', rank: '銀', description: '発動条件：途中出場　/　突破力・走力UP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p224',
    name: 'チョン・ビョングァン(2026)',
    readingName: 'ちょん・びょんぐぁん',
    category: 'FW',
    mainPosition: 'LW',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '韓国',
    policy: 'リアクション',
    playStyle: 'ドリブラーLW',
    playStyleLevel: 'Ⅱ',
    overall: 6152,
    maxOverall: 14356,
    baseStats: { shoot: 1066, pass: 1174, dribble: 1170, defense: 1045, physical: 1016, speed: 786 },
    detailStats: {
      shoot: { finishing: 371, power: 318, composure: 377 },
      pass: { shortPass: 398, longPass: 396, accuracy: 380 },
      dribble: { breakout: 392, keeping: 381, ballTouch: 397 },
      defense: { tackle: 319, interception: 375, marking: 351 },
      physical: { jumping: 318, contact: 265, stamina: 433 },
      speed: { running: 352, agility: 434 }
    },
    maxEnhanced: {
      overall: 14356,
      baseStats: { shoot: 2623, pass: 2743, dribble: 2763, defense: 2554, physical: 2561, speed: 1856 },
      detailStats: {
        shoot: { finishing: 894, power: 829, composure: 900 },
        pass: { shortPass: 921, longPass: 919, accuracy: 903 },
        dribble: { breakout: 927, keeping: 916, ballTouch: 920 },
        defense: { tackle: 830, interception: 874, marking: 850 },
        physical: { jumping: 829, contact: 776, stamina: 956 },
        speed: { running: 887, agility: 969 }
      }
    },
    playTendencies: {
      attack: 2, defense: -1, dribble: 2, shoot: 1, longShoot: 0,
      shortPass: 0, longPass: -1, throughPass: 0, cutIn: 1, keep: 1,
      delay: -1, rushOut: 1, feint: 2, press: 0
    },
    skill: { name: 'テクニカルドリブル', rank: '銅', description: '発動エリア：前左右・中左右　/　発動条件：ドリブル時　/　突破力・キープ力UP　/　成功時に自身のショートパス発生確率UP' },
    abilities: [
      { name: '俊敏なパサー', rank: '銀', description: '発動条件：好調　/　ショートパス・敏捷性UP' },
      { name: '不屈のドリブル突破', rank: '銀', description: '発動条件：絶好調　/　突破力・スタミナUP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p225',
    name: 'チェ・ゴンジュ(2026)',
    readingName: 'ちぇ・ごんじゅ',
    category: 'FW',
    mainPosition: 'LW',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '韓国',
    policy: 'ムービング',
    playStyle: 'ドリブラーLW',
    playStyleLevel: 'Ⅱ',
    overall: 6085,
    maxOverall: 14294,
    baseStats: { shoot: 1094, pass: 1097, dribble: 1123, defense: 801, physical: 969, speed: 851 },
    detailStats: {
      shoot: { finishing: 351, power: 393, composure: 350 },
      pass: { shortPass: 356, longPass: 377, accuracy: 364 },
      dribble: { breakout: 408, keeping: 352, ballTouch: 363 },
      defense: { tackle: 272, interception: 258, marking: 271 },
      physical: { jumping: 365, contact: 308, stamina: 296 },
      speed: { running: 429, agility: 422 }
    },
    maxEnhanced: {
      overall: 14294,
      baseStats: { shoot: 2651, pass: 2666, dribble: 2716, defense: 2310, physical: 2514, speed: 1921 },
      detailStats: {
        shoot: { finishing: 874, power: 904, composure: 873 },
        pass: { shortPass: 879, longPass: 900, accuracy: 887 },
        dribble: { breakout: 943, keeping: 887, ballTouch: 886 },
        defense: { tackle: 783, interception: 757, marking: 770 },
        physical: { jumping: 876, contact: 819, stamina: 819 },
        speed: { running: 964, agility: 957 }
      }
    },
    playTendencies: {
      attack: 2, defense: -1, dribble: 2, shoot: 1, longShoot: 0,
      shortPass: 0, longPass: -1, throughPass: 0, cutIn: 1, keep: 1,
      delay: -1, rushOut: 1, feint: 2, press: 0
    },
    skill: { name: 'テクニカルドリブル', rank: '銅', description: '発動エリア：前左右・中左右　/　発動条件：ドリブル時　/　突破力・キープ力UP　/　成功時に自身のショートパス発生確率UP' },
    abilities: [
      { name: 'ランニングキッカー', rank: '銀', description: '発動条件：絶好調　/　キック力・走力UP' },
      { name: '俊敏なドリブラー', rank: '銀', description: '発動条件：好調　/　突破力・敏捷性UP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p226',
    name: 'イ・ドンジュン(2026)',
    readingName: 'い・どんじゅん',
    category: 'FW',
    mainPosition: 'RW',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '韓国',
    policy: 'ポゼッション',
    playStyle: 'ドリブラーRW',
    playStyleLevel: 'Ⅱ',
    overall: 6273,
    maxOverall: 14476,
    baseStats: { shoot: 1096, pass: 1184, dribble: 1340, defense: 1031, physical: 1120, speed: 685 },
    detailStats: {
      shoot: { finishing: 375, power: 370, composure: 351 },
      pass: { shortPass: 390, longPass: 401, accuracy: 393 },
      dribble: { breakout: 441, keeping: 463, ballTouch: 436 },
      defense: { tackle: 321, interception: 362, marking: 348 },
      physical: { jumping: 367, contact: 392, stamina: 361 },
      speed: { running: 359, agility: 326 }
    },
    maxEnhanced: {
      overall: 14476,
      baseStats: { shoot: 2653, pass: 2753, dribble: 2933, defense: 2540, physical: 2665, speed: 1755 },
      detailStats: {
        shoot: { finishing: 898, power: 881, composure: 874 },
        pass: { shortPass: 913, longPass: 924, accuracy: 916 },
        dribble: { breakout: 976, keeping: 998, ballTouch: 959 },
        defense: { tackle: 832, interception: 861, marking: 847 },
        physical: { jumping: 878, contact: 903, stamina: 884 },
        speed: { running: 894, agility: 861 }
      }
    },
    playTendencies: {
      attack: 2, defense: -1, dribble: 2, shoot: 1, longShoot: 0,
      shortPass: 0, longPass: -1, throughPass: 0, cutIn: 1, keep: 1,
      delay: -1, rushOut: 1, feint: 2, press: 0
    },
    skill: { name: 'テクニカルドリブル', rank: '銅', description: '発動エリア：前左右・中左右　/　発動条件：ドリブル時　/　突破力・キープ力UP　/　成功時に自身のショートパス発生確率UP' },
    abilities: [
      { name: '懐の深いボールタッチ', rank: '銀', description: '発動条件：絶好調　/　キープ力・ボールタッチUP' },
      { name: '精緻なパサー', rank: '銀', description: '発動条件：絶好調　/　ショートパス・キック精度UP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p227',
    name: 'エメルソン・ハモン(2026)',
    readingName: 'えめるそん・はもん',
    category: 'FW',
    mainPosition: 'RW',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'ブラジル',
    policy: 'ムービング',
    playStyle: 'ドリブラーRW',
    playStyleLevel: 'Ⅱ',
    overall: 6416,
    maxOverall: 14663,
    baseStats: { shoot: 1033, pass: 996, dribble: 1218, defense: 1103, physical: 1026, speed: 860 },
    detailStats: {
      shoot: { finishing: 360, power: 334, composure: 339 },
      pass: { shortPass: 336, longPass: 327, accuracy: 333 },
      dribble: { breakout: 421, keeping: 405, ballTouch: 392 },
      defense: { tackle: 354, interception: 378, marking: 371 },
      physical: { jumping: 304, contact: 323, stamina: 399 },
      speed: { running: 423, agility: 437 }
    },
    maxEnhanced: {
      overall: 14663,
      baseStats: { shoot: 2590, pass: 2565, dribble: 2811, defense: 2612, physical: 2571, speed: 1930 },
      detailStats: {
        shoot: { finishing: 883, power: 845, composure: 862 },
        pass: { shortPass: 859, longPass: 850, accuracy: 856 },
        dribble: { breakout: 956, keeping: 940, ballTouch: 915 },
        defense: { tackle: 865, interception: 877, marking: 870 },
        physical: { jumping: 815, contact: 834, stamina: 922 },
        speed: { running: 958, agility: 972 }
      }
    },
    playTendencies: {
      attack: 2, defense: -1, dribble: 2, shoot: 1, longShoot: 0,
      shortPass: 0, longPass: -1, throughPass: 0, cutIn: 1, keep: 1,
      delay: -1, rushOut: 1, feint: 2, press: 0
    },
    skill: { name: 'テクニカルドリブル', rank: '銅', description: '発動エリア：前左右・中左右　/　発動条件：ドリブル時　/　突破力・キープ力UP　/　成功時に自身のショートパス発生確率UP' },
    abilities: [
      { name: '俊敏なドリブラー', rank: '銀', description: '発動条件：好調　/　突破力・敏捷性UP' },
      { name: 'ムービングターゲット', rank: '銀', description: '発動条件：絶好調　/　キープ力・走力UP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p228',
    name: '氣田亮真(2026)',
    readingName: 'きだりょうま',
    category: 'FW',
    mainPosition: 'RW',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'ポゼッション',
    playStyle: 'ドリブラーRW',
    playStyleLevel: 'Ⅱ',
    overall: 6196,
    maxOverall: 14423,
    baseStats: { shoot: 966, pass: 1144, dribble: 1148, defense: 1055, physical: 946, speed: 867 },
    detailStats: {
      shoot: { finishing: 325, power: 309, composure: 332 },
      pass: { shortPass: 392, longPass: 400, accuracy: 352 },
      dribble: { breakout: 410, keeping: 359, ballTouch: 379 },
      defense: { tackle: 360, interception: 348, marking: 347 },
      physical: { jumping: 316, contact: 274, stamina: 356 },
      speed: { running: 404, agility: 463 }
    },
    maxEnhanced: {
      overall: 14423,
      baseStats: { shoot: 2523, pass: 2713, dribble: 2741, defense: 2564, physical: 2491, speed: 1937 },
      detailStats: {
        shoot: { finishing: 848, power: 820, composure: 855 },
        pass: { shortPass: 915, longPass: 923, accuracy: 875 },
        dribble: { breakout: 945, keeping: 894, ballTouch: 902 },
        defense: { tackle: 871, interception: 847, marking: 846 },
        physical: { jumping: 827, contact: 785, stamina: 879 },
        speed: { running: 939, agility: 998 }
      }
    },
    playTendencies: {
      attack: 2, defense: -1, dribble: 2, shoot: 1, longShoot: 0,
      shortPass: 0, longPass: -1, throughPass: 0, cutIn: 1, keep: 1,
      delay: -1, rushOut: 1, feint: 2, press: 0
    },
    skill: { name: 'テクニカルドリブル', rank: '銅', description: '発動エリア：前左右・中左右　/　発動条件：ドリブル時　/　突破力・キープ力UP　/　成功時に自身のショートパス発生確率UP' },
    abilities: [
      { name: 'スピードランナー', rank: '銀', description: '発動条件：好調　/　走力・敏捷性UP' },
      { name: 'すり抜けるロングパサー', rank: '銀', description: '発動条件：絶好調　/　ロングパス・突破力UP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p229',
    name: 'ジュニーニョ・ロシャ(2026)',
    readingName: 'じゅにーにょ・ろしゃ',
    category: 'FW',
    mainPosition: 'RW',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'ブラジル',
    policy: 'ムービング',
    playStyle: 'ドリブラーRW',
    playStyleLevel: 'Ⅱ',
    overall: 6032,
    maxOverall: 14245,
    baseStats: { shoot: 942, pass: 990, dribble: 1140, defense: 862, physical: 1059, speed: 850 },
    detailStats: {
      shoot: { finishing: 312, power: 317, composure: 313 },
      pass: { shortPass: 314, longPass: 325, accuracy: 351 },
      dribble: { breakout: 393, keeping: 406, ballTouch: 341 },
      defense: { tackle: 276, interception: 299, marking: 287 },
      physical: { jumping: 346, contact: 388, stamina: 325 },
      speed: { running: 405, agility: 445 }
    },
    maxEnhanced: {
      overall: 14245,
      baseStats: { shoot: 2499, pass: 2559, dribble: 2733, defense: 2371, physical: 2604, speed: 1920 },
      detailStats: {
        shoot: { finishing: 835, power: 828, composure: 836 },
        pass: { shortPass: 837, longPass: 848, accuracy: 874 },
        dribble: { breakout: 928, keeping: 941, ballTouch: 864 },
        defense: { tackle: 787, interception: 798, marking: 786 },
        physical: { jumping: 857, contact: 899, stamina: 848 },
        speed: { running: 940, agility: 980 }
      }
    },
    playTendencies: {
      attack: 2, defense: -1, dribble: 2, shoot: 1, longShoot: 0,
      shortPass: 0, longPass: -1, throughPass: 0, cutIn: 1, keep: 1,
      delay: -1, rushOut: 1, feint: 2, press: 0
    },
    skill: { name: 'テクニカルドリブル', rank: '銅', description: '発動エリア：前左右・中左右　/　発動条件：ドリブル時　/　突破力・キープ力UP　/　成功時に自身のショートパス発生確率UP' },
    abilities: [
      { name: '俊敏なドリブラー', rank: '銀', description: '発動条件：好調　/　突破力・敏捷性UP' },
      { name: '剛柔のタッチ', rank: '銀', description: '発動条件：好調　/　ボールタッチ・コンタクトUP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p230',
    name: 'ジュ・ミンギュ(2026)',
    readingName: 'じゅ・みんぎゅ',
    category: 'FW',
    mainPosition: 'CF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '韓国',
    policy: 'リアクション',
    playStyle: 'ポストプレーヤー',
    playStyleLevel: 'Ⅱ',
    overall: 6087,
    maxOverall: 14262,
    baseStats: { shoot: 1233, pass: 1151, dribble: 1169, defense: 995, physical: 1213, speed: 681 },
    detailStats: {
      shoot: { finishing: 430, power: 400, composure: 403 },
      pass: { shortPass: 386, longPass: 384, accuracy: 381 },
      dribble: { breakout: 382, keeping: 383, ballTouch: 404 },
      defense: { tackle: 343, interception: 337, marking: 315 },
      physical: { jumping: 405, contact: 353, stamina: 455 },
      speed: { running: 334, agility: 347 }
    },
    maxEnhanced: {
      overall: 14262,
      baseStats: { shoot: 2790, pass: 2720, dribble: 2762, defense: 2504, physical: 2758, speed: 1751 },
      detailStats: {
        shoot: { finishing: 953, power: 911, composure: 926 },
        pass: { shortPass: 909, longPass: 907, accuracy: 904 },
        dribble: { breakout: 917, keeping: 918, ballTouch: 927 },
        defense: { tackle: 854, interception: 836, marking: 814 },
        physical: { jumping: 916, contact: 864, stamina: 978 },
        speed: { running: 869, agility: 882 }
      }
    },
    playTendencies: {
      attack: 1, defense: -1, dribble: 0, shoot: 1, longShoot: 1,
      shortPass: 1, longPass: -1, throughPass: 1, cutIn: 0, keep: 2,
      delay: -1, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '点で合わせるシュート', rank: '銅', description: '発動エリア：前中　/　発動条件：シュート時　/　決定力・キック力・冷静さUP' },
    abilities: [
      { name: '冷静な破壊者', rank: '銀', description: '発動条件：好調　/　冷静さ・コンタクトUP' },
      { name: '俊敏なタッチ', rank: '銀', description: '発動条件：絶好調　/　ボールタッチ・敏捷性UP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p231',
    name: 'ホルムベルト・アーロン・フリズヨンソン(2026)',
    readingName: 'ほるむべると・あーろん・ふりずよんそん',
    category: 'FW',
    mainPosition: 'CF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'アイスランド',
    policy: 'カウンター',
    playStyle: 'ポストプレーヤー',
    playStyleLevel: 'Ⅱ',
    overall: 6341,
    maxOverall: 14560,
    baseStats: { shoot: 1166, pass: 1008, dribble: 1036, defense: 895, physical: 1279, speed: 615 },
    detailStats: {
      shoot: { finishing: 367, power: 419, composure: 380 },
      pass: { shortPass: 336, longPass: 334, accuracy: 338 },
      dribble: { breakout: 328, keeping: 354, ballTouch: 354 },
      defense: { tackle: 296, interception: 305, marking: 294 },
      physical: { jumping: 477, contact: 465, stamina: 337 },
      speed: { running: 301, agility: 314 }
    },
    maxEnhanced: {
      overall: 14560,
      baseStats: { shoot: 2771, pass: 2541, dribble: 2617, defense: 2392, physical: 2860, speed: 1661 },
      detailStats: {
        shoot: { finishing: 902, power: 954, composure: 915 },
        pass: { shortPass: 847, longPass: 845, accuracy: 849 },
        dribble: { breakout: 851, keeping: 877, ballTouch: 889 },
        defense: { tackle: 795, interception: 804, marking: 793 },
        physical: { jumping: 1000, contact: 1000, stamina: 860 },
        speed: { running: 824, agility: 837 }
      }
    },
    playTendencies: {
      attack: 1, defense: -1, dribble: 0, shoot: 1, longShoot: 1,
      shortPass: 1, longPass: -1, throughPass: 1, cutIn: 0, keep: 2,
      delay: -1, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '狙いすましたシュート', rank: '銅', description: '発動エリア：前中　/　発動条件：シュート時　/　決定力・キック力・冷静さUP' },
    abilities: [
      { name: '上空のスナイパー', rank: '銀', description: '発動条件：絶好調　/　冷静さ・ジャンプUP' },
      { name: 'ターゲットマン', rank: '銀', description: '発動条件：途中出場　/　決定力・キープ力UP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p232',
    name: 'ヤゴ・カリエッロ(2026)',
    readingName: 'やご・かりえっろ',
    category: 'FW',
    mainPosition: 'CF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'ブラジル',
    policy: 'ポゼッション',
    playStyle: 'ポストプレーヤー',
    playStyleLevel: 'Ⅱ',
    overall: 6342,
    maxOverall: 14574,
    baseStats: { shoot: 1124, pass: 1118, dribble: 1137, defense: 991, physical: 1245, speed: 792 },
    detailStats: {
      shoot: { finishing: 367, power: 388, composure: 369 },
      pass: { shortPass: 375, longPass: 371, accuracy: 372 },
      dribble: { breakout: 383, keeping: 384, ballTouch: 370 },
      defense: { tackle: 330, interception: 334, marking: 327 },
      physical: { jumping: 457, contact: 433, stamina: 355 },
      speed: { running: 392, agility: 400 }
    },
    maxEnhanced: {
      overall: 14574,
      baseStats: { shoot: 2729, pass: 2651, dribble: 2718, defense: 2488, physical: 2826, speed: 1838 },
      detailStats: {
        shoot: { finishing: 902, power: 923, composure: 904 },
        pass: { shortPass: 886, longPass: 882, accuracy: 883 },
        dribble: { breakout: 906, keeping: 907, ballTouch: 905 },
        defense: { tackle: 829, interception: 833, marking: 826 },
        physical: { jumping: 980, contact: 968, stamina: 878 },
        speed: { running: 915, agility: 923 }
      }
    },
    playTendencies: {
      attack: 1, defense: -1, dribble: 0, shoot: 1, longShoot: 1,
      shortPass: 1, longPass: -1, throughPass: 1, cutIn: 0, keep: 2,
      delay: -1, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '狙いすましたシュート', rank: '銅', description: '発動エリア：前中　/　発動条件：シュート時　/　決定力・キック力・冷静さUP' },
    abilities: [
      { name: '強靭な脚力', rank: '銀', description: '発動条件：絶好調　/　キック力・ジャンプUP' },
      { name: 'ムービングターゲット', rank: '銀', description: '発動条件：絶好調　/　キープ力・走力UP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p233',
    name: 'ルーカス・バルセロス(2026)',
    readingName: 'るーかす・ばるせろす',
    category: 'FW',
    mainPosition: 'CF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'ブラジル',
    policy: 'ポゼッション',
    playStyle: 'ポストプレーヤー',
    playStyleLevel: 'Ⅱ',
    overall: 6375,
    maxOverall: 14619,
    baseStats: { shoot: 1185, pass: 1108, dribble: 1174, defense: 959, physical: 1130, speed: 788 },
    detailStats: {
      shoot: { finishing: 393, power: 416, composure: 376 },
      pass: { shortPass: 356, longPass: 370, accuracy: 382 },
      dribble: { breakout: 384, keeping: 401, ballTouch: 389 },
      defense: { tackle: 299, interception: 331, marking: 329 },
      physical: { jumping: 418, contact: 387, stamina: 325 },
      speed: { running: 369, agility: 419 }
    },
    maxEnhanced: {
      overall: 14619,
      baseStats: { shoot: 2790, pass: 2641, dribble: 2755, defense: 2456, physical: 2711, speed: 1834 },
      detailStats: {
        shoot: { finishing: 928, power: 951, composure: 911 },
        pass: { shortPass: 867, longPass: 881, accuracy: 893 },
        dribble: { breakout: 907, keeping: 924, ballTouch: 924 },
        defense: { tackle: 798, interception: 830, marking: 828 },
        physical: { jumping: 941, contact: 922, stamina: 848 },
        speed: { running: 892, agility: 942 }
      }
    },
    playTendencies: {
      attack: 1, defense: -1, dribble: 0, shoot: 1, longShoot: 1,
      shortPass: 1, longPass: -1, throughPass: 1, cutIn: 0, keep: 2,
      delay: -1, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '狙いすましたシュート', rank: '銅', description: '発動エリア：前中　/　発動条件：シュート時　/　決定力・キック力・冷静さUP' },
    abilities: [
      { name: '強靭な脚力', rank: '銀', description: '発動条件：絶好調　/　キック力・ジャンプUP' },
      { name: '懐の深いボールタッチ', rank: '銀', description: '発動条件：絶好調　/　キープ力・ボールタッチUP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p234',
    name: 'アマドゥ・バカヨコ(2026)',
    readingName: 'あまどぅ・ばかよこ',
    category: 'FW',
    mainPosition: 'CF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'シエラレオーネ',
    policy: 'ムービング',
    playStyle: 'ポストプレーヤー',
    playStyleLevel: 'Ⅱ',
    overall: 6312,
    maxOverall: 14551,
    baseStats: { shoot: 1140, pass: 976, dribble: 1120, defense: 941, physical: 1229, speed: 703 },
    detailStats: {
      shoot: { finishing: 388, power: 389, composure: 363 },
      pass: { shortPass: 319, longPass: 324, accuracy: 333 },
      dribble: { breakout: 347, keeping: 395, ballTouch: 378 },
      defense: { tackle: 321, interception: 319, marking: 301 },
      physical: { jumping: 447, contact: 407, stamina: 375 },
      speed: { running: 334, agility: 369 }
    },
    maxEnhanced: {
      overall: 14551,
      baseStats: { shoot: 2745, pass: 2509, dribble: 2701, defense: 2438, physical: 2810, speed: 1749 },
      detailStats: {
        shoot: { finishing: 923, power: 924, composure: 898 },
        pass: { shortPass: 830, longPass: 835, accuracy: 844 },
        dribble: { breakout: 870, keeping: 918, ballTouch: 913 },
        defense: { tackle: 820, interception: 818, marking: 800 },
        physical: { jumping: 970, contact: 942, stamina: 898 },
        speed: { running: 857, agility: 892 }
      }
    },
    playTendencies: {
      attack: 1, defense: -1, dribble: 0, shoot: 1, longShoot: 1,
      shortPass: 1, longPass: -1, throughPass: 1, cutIn: 0, keep: 2,
      delay: -1, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '狙いすましたシュート', rank: '銅', description: '発動エリア：前中　/　発動条件：シュート時　/　決定力・キック力・冷静さUP' },
    abilities: [
      { name: 'パワーヘッド', rank: '銀', description: '発動条件：途中出場　/　決定力・ジャンプUP' },
      { name: 'パワフルキッカー', rank: '銀', description: '発動条件：絶好調　/　キック力・コンタクトUP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p235',
    name: 'ブルーノ・エルクラーノ(2026)',
    readingName: 'ぶるーの・えるくらーの',
    category: 'FW',
    mainPosition: 'CF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'ブラジル',
    policy: 'ムービング',
    playStyle: 'ポストプレーヤー',
    playStyleLevel: 'Ⅱ',
    overall: 6257,
    maxOverall: 14499,
    baseStats: { shoot: 1149, pass: 1080, dribble: 1053, defense: 963, physical: 1200, speed: 695 },
    detailStats: {
      shoot: { finishing: 381, power: 396, composure: 372 },
      pass: { shortPass: 362, longPass: 362, accuracy: 356 },
      dribble: { breakout: 344, keeping: 337, ballTouch: 372 },
      defense: { tackle: 308, interception: 334, marking: 321 },
      physical: { jumping: 452, contact: 415, stamina: 333 },
      speed: { running: 348, agility: 347 }
    },
    maxEnhanced: {
      overall: 14499,
      baseStats: { shoot: 2754, pass: 2613, dribble: 2634, defense: 2460, physical: 2781, speed: 1741 },
      detailStats: {
        shoot: { finishing: 916, power: 931, composure: 907 },
        pass: { shortPass: 873, longPass: 873, accuracy: 867 },
        dribble: { breakout: 867, keeping: 860, ballTouch: 907 },
        defense: { tackle: 807, interception: 833, marking: 820 },
        physical: { jumping: 975, contact: 950, stamina: 856 },
        speed: { running: 871, agility: 870 }
      }
    },
    playTendencies: {
      attack: 1, defense: -1, dribble: 0, shoot: 1, longShoot: 1,
      shortPass: 1, longPass: -1, throughPass: 1, cutIn: 0, keep: 2,
      delay: -1, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '狙いすましたシュート', rank: '銅', description: '発動エリア：前中　/　発動条件：シュート時　/　決定力・キック力・冷静さUP' },
    abilities: [
      { name: '強靭な脚力', rank: '銀', description: '発動条件：絶好調　/　キック力・ジャンプUP' },
      { name: '冷静なボールタッチ', rank: '銀', description: '発動条件：絶好調　/　冷静さ・ボールタッチUP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p236',
    name: '杉本健勇(2026)',
    readingName: 'すぎもと・けんゆう',
    category: 'FW',
    mainPosition: 'CF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'カウンター',
    playStyle: 'ポストプレーヤー',
    playStyleLevel: 'Ⅱ',
    overall: 6348,
    maxOverall: 14586,
    baseStats: { shoot: 1193, pass: 1111, dribble: 1171, defense: 856, physical: 1130, speed: 752 },
    detailStats: {
      shoot: { finishing: 398, power: 407, composure: 388 },
      pass: { shortPass: 385, longPass: 342, accuracy: 384 },
      dribble: { breakout: 367, keeping: 410, ballTouch: 394 },
      defense: { tackle: 286, interception: 293, marking: 277 },
      physical: { jumping: 375, contact: 401, stamina: 354 },
      speed: { running: 352, agility: 400 }
    },
    maxEnhanced: {
      overall: 14586,
      baseStats: { shoot: 2798, pass: 2644, dribble: 2752, defense: 2353, physical: 2711, speed: 1798 },
      detailStats: {
        shoot: { finishing: 933, power: 942, composure: 923 },
        pass: { shortPass: 896, longPass: 853, accuracy: 895 },
        dribble: { breakout: 890, keeping: 933, ballTouch: 929 },
        defense: { tackle: 785, interception: 792, marking: 776 },
        physical: { jumping: 898, contact: 936, stamina: 877 },
        speed: { running: 875, agility: 923 }
      }
    },
    playTendencies: {
      attack: 1, defense: -1, dribble: 0, shoot: 1, longShoot: 1,
      shortPass: 1, longPass: -1, throughPass: 1, cutIn: 0, keep: 2,
      delay: -1, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '狙いすましたシュート', rank: '銅', description: '発動エリア：前中　/　発動条件：シュート時　/　決定力・キック力・冷静さUP' },
    abilities: [
      { name: '保持からの一撃', rank: '銀', description: '発動条件：途中出場　/　キック力・キープ力UP' },
      { name: '力強いフィニッシュ', rank: '銀', description: '発動条件：好調　/　決定力・コンタクトUP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p237',
    name: '櫻川ソロモン(2026)',
    readingName: 'さくらがわ・そろもん',
    category: 'FW',
    mainPosition: 'CF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'ポゼッション',
    playStyle: 'ポストプレーヤー',
    playStyleLevel: 'Ⅱ',
    overall: 6244,
    maxOverall: 14470,
    baseStats: { shoot: 1076, pass: 974, dribble: 1231, defense: 856, physical: 1194, speed: 759 },
    detailStats: {
      shoot: { finishing: 370, power: 361, composure: 345 },
      pass: { shortPass: 376, longPass: 319, accuracy: 279 },
      dribble: { breakout: 387, keeping: 428, ballTouch: 416 },
      defense: { tackle: 314, interception: 275, marking: 267 },
      physical: { jumping: 392, contact: 451, stamina: 351 },
      speed: { running: 358, agility: 401 }
    },
    maxEnhanced: {
      overall: 14470,
      baseStats: { shoot: 2681, pass: 2507, dribble: 2812, defense: 2353, physical: 2775, speed: 1805 },
      detailStats: {
        shoot: { finishing: 905, power: 896, composure: 880 },
        pass: { shortPass: 887, longPass: 830, accuracy: 790 },
        dribble: { breakout: 910, keeping: 951, ballTouch: 951 },
        defense: { tackle: 813, interception: 774, marking: 766 },
        physical: { jumping: 915, contact: 986, stamina: 874 },
        speed: { running: 881, agility: 924 }
      }
    },
    playTendencies: {
      attack: 1, defense: -1, dribble: 0, shoot: 1, longShoot: 1,
      shortPass: 1, longPass: -1, throughPass: 1, cutIn: 0, keep: 2,
      delay: -1, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '絶妙なトラップ', rank: '銅', description: '発動エリア：前中・中中　/　発動条件：トラップ時　/　ボールタッチ・キープ力UP　/　成功時に自身のシュート発生確率UP' },
    abilities: [
      { name: '剛柔のタッチ', rank: '銀', description: '発動条件：好調　/　ボールタッチ・コンタクトUP' },
      { name: 'アジャイルターゲット', rank: '銀', description: '発動条件：途中出場　/　キープ力・敏捷性UP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p238',
    name: '土信田悠生(2026)',
    readingName: 'としだ・ゆうせい',
    category: 'FW',
    mainPosition: 'CF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'ポゼッション',
    playStyle: 'ポストプレーヤー',
    playStyleLevel: 'Ⅱ',
    overall: 6200,
    maxOverall: 14425,
    baseStats: { shoot: 1176, pass: 932, dribble: 1122, defense: 908, physical: 1161, speed: 749 },
    detailStats: {
      shoot: { finishing: 395, power: 386, composure: 395 },
      pass: { shortPass: 313, longPass: 293, accuracy: 326 },
      dribble: { breakout: 349, keeping: 398, ballTouch: 375 },
      defense: { tackle: 308, interception: 307, marking: 293 },
      physical: { jumping: 416, contact: 395, stamina: 350 },
      speed: { running: 374, agility: 375 }
    },
    maxEnhanced: {
      overall: 14425,
      baseStats: { shoot: 2781, pass: 2465, dribble: 2703, defense: 2405, physical: 2742, speed: 1795 },
      detailStats: {
        shoot: { finishing: 930, power: 921, composure: 930 },
        pass: { shortPass: 824, longPass: 804, accuracy: 837 },
        dribble: { breakout: 872, keeping: 921, ballTouch: 910 },
        defense: { tackle: 807, interception: 806, marking: 792 },
        physical: { jumping: 939, contact: 930, stamina: 873 },
        speed: { running: 897, agility: 898 }
      }
    },
    playTendencies: {
      attack: 1, defense: -1, dribble: 0, shoot: 1, longShoot: 1,
      shortPass: 1, longPass: -1, throughPass: 1, cutIn: 0, keep: 2,
      delay: -1, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '点で合わせるシュート', rank: '銅', description: '発動エリア：前中　/　発動条件：シュート時　/　決定力・キック力・冷静さUP' },
    abilities: [
      { name: '上空のスナイパー', rank: '銀', description: '発動条件：絶好調　/　冷静さ・ジャンプUP' },
      { name: '力強いフィニッシュ', rank: '銀', description: '発動条件：好調　/　決定力・コンタクトUP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p239',
    name: '澤上竜二(2026)',
    readingName: 'さわかみ・りゅうじ',
    category: 'FW',
    mainPosition: 'CF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'ムービング',
    playStyle: 'ポストプレーヤー',
    playStyleLevel: 'Ⅱ',
    overall: 6200,
    maxOverall: 14425,
    baseStats: { shoot: 1176, pass: 932, dribble: 1122, defense: 908, physical: 1161, speed: 749 },
    detailStats: {
      shoot: { finishing: 395, power: 386, composure: 395 },
      pass: { shortPass: 313, longPass: 293, accuracy: 326 },
      dribble: { breakout: 349, keeping: 398, ballTouch: 375 },
      defense: { tackle: 308, interception: 307, marking: 293 },
      physical: { jumping: 416, contact: 395, stamina: 350 },
      speed: { running: 374, agility: 375 }
    },
    maxEnhanced: {
      overall: 14425,
      baseStats: { shoot: 2781, pass: 2465, dribble: 2703, defense: 2405, physical: 2742, speed: 1795 },
      detailStats: {
        shoot: { finishing: 930, power: 921, composure: 930 },
        pass: { shortPass: 824, longPass: 804, accuracy: 837 },
        dribble: { breakout: 872, keeping: 921, ballTouch: 910 },
        defense: { tackle: 807, interception: 806, marking: 792 },
        physical: { jumping: 939, contact: 930, stamina: 873 },
        speed: { running: 897, agility: 898 }
      }
    },
    playTendencies: {
      attack: 1, defense: -1, dribble: 0, shoot: 1, longShoot: 1,
      shortPass: 1, longPass: -1, throughPass: 1, cutIn: 0, keep: 2,
      delay: -1, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '狙いすましたシュート', rank: '銅', description: '発動エリア：前中　/　発動条件：シュート時　/　決定力・キック力・冷静さUP' },
    abilities: [
      { name: 'パワーヘッド', rank: '銀', description: '発動条件：途中出場　/　決定力・ジャンプUP' },
      { name: 'ムービングスナイパー', rank: '銀', description: '発動条件：好調　/　冷静さ・敏捷性UP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p240',
    name: '島田拓海(2026)',
    readingName: 'しまだ・たくみ',
    category: 'FW',
    mainPosition: 'CF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'カウンター',
    playStyle: 'ポストプレーヤー',
    playStyleLevel: 'Ⅱ',
    overall: 5923,
    maxOverall: 14135,
    baseStats: { shoot: 1099, pass: 977, dribble: 1058, defense: 963, physical: 1143, speed: 726 },
    detailStats: {
      shoot: { finishing: 378, power: 356, composure: 365 },
      pass: { shortPass: 335, longPass: 326, accuracy: 316 },
      dribble: { breakout: 357, keeping: 349, ballTouch: 352 },
      defense: { tackle: 337, interception: 328, marking: 298 },
      physical: { jumping: 432, contact: 397, stamina: 314 },
      speed: { running: 349, agility: 377 }
    },
    maxEnhanced: {
      overall: 14135,
      baseStats: { shoot: 2704, pass: 2510, dribble: 2639, defense: 2460, physical: 2724, speed: 1772 },
      detailStats: {
        shoot: { finishing: 913, power: 891, composure: 900 },
        pass: { shortPass: 846, longPass: 837, accuracy: 827 },
        dribble: { breakout: 880, keeping: 872, ballTouch: 887 },
        defense: { tackle: 836, interception: 827, marking: 797 },
        physical: { jumping: 955, contact: 932, stamina: 837 },
        speed: { running: 872, agility: 900 }
      }
    },
    playTendencies: {
      attack: 1, defense: -1, dribble: 0, shoot: 1, longShoot: 1,
      shortPass: 1, longPass: -1, throughPass: 1, cutIn: 0, keep: 2,
      delay: -1, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '点で合わせるシュート', rank: '銅', description: '発動エリア：前中　/　発動条件：シュート時　/　決定力・キック力・冷静さUP' },
    abilities: [
      { name: '上空のスナイパー', rank: '銀', description: '発動条件：絶好調　/　冷静さ・ジャンプUP' },
      { name: '俊敏なタッチ', rank: '銀', description: '発動条件：絶好調　/　ボールタッチ・敏捷性UP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p241',
    name: '三浦知良(2026)',
    readingName: 'みうら・かずよし',
    category: 'FW',
    mainPosition: 'CF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'ムービング',
    playStyle: 'ラインブレーカー',
    playStyleLevel: 'Ⅱ',
    overall: 6508,
    maxOverall: 14695,
    baseStats: { shoot: 1286, pass: 1194, dribble: 1230, defense: 931, physical: 1045, speed: 796 },
    detailStats: {
      shoot: { finishing: 462, power: 364, composure: 460 },
      pass: { shortPass: 400, longPass: 386, accuracy: 408 },
      dribble: { breakout: 409, keeping: 417, ballTouch: 404 },
      defense: { tackle: 291, interception: 329, marking: 311 },
      physical: { jumping: 353, contact: 324, stamina: 368 },
      speed: { running: 379, agility: 417 }
    },
    maxEnhanced: {
      overall: 14695,
      baseStats: { shoot: 2891, pass: 2727, dribble: 2811, defense: 2428, physical: 2626, speed: 1842 },
      detailStats: {
        shoot: { finishing: 997, power: 899, composure: 995 },
        pass: { shortPass: 911, longPass: 897, accuracy: 919 },
        dribble: { breakout: 932, keeping: 940, ballTouch: 939 },
        defense: { tackle: 790, interception: 828, marking: 810 },
        physical: { jumping: 876, contact: 859, stamina: 891 },
        speed: { running: 902, agility: 940 }
      }
    },
    playTendencies: {
      attack: 2, defense: -1, dribble: 0, shoot: 2, longShoot: 1,
      shortPass: -1, longPass: -1, throughPass: -1, cutIn: 0, keep: -1,
      delay: -1, rushOut: 2, feint: 0, press: 0
    },
    skill: { name: '狙いすましたシュート', rank: '銅', description: '発動エリア：前中　/　発動条件：シュート時　/　決定力・キック力・冷静さUP' },
    abilities: [
      { name: 'キングの舞', rank: '金', description: '発動条件：なし　/　踊る' },
      { name: 'シュートセンス', rank: '銀', description: '発動条件：好調　/　決定力・キック力UP' },
      { name: 'ムービングスナイパー', rank: '銀', description: '発動条件：好調　/　冷静さ・敏捷性UP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p242',
    name: '肥田野蓮治(2026)',
    readingName: 'ひだの・れんじ',
    category: 'FW',
    mainPosition: 'CF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'ポゼッション',
    playStyle: 'ラインブレーカー',
    playStyleLevel: 'Ⅱ',
    overall: 6471,
    maxOverall: 14699,
    baseStats: { shoot: 1245, pass: 1070, dribble: 1063, defense: 843, physical: 1103, speed: 847 },
    detailStats: {
      shoot: { finishing: 434, power: 378, composure: 433 },
      pass: { shortPass: 368, longPass: 359, accuracy: 343 },
      dribble: { breakout: 368, keeping: 327, ballTouch: 368 },
      defense: { tackle: 284, interception: 282, marking: 277 },
      physical: { jumping: 363, contact: 381, stamina: 359 },
      speed: { running: 410, agility: 437 }
    },
    maxEnhanced: {
      overall: 14699,
      baseStats: { shoot: 2850, pass: 2603, dribble: 2644, defense: 2340, physical: 2684, speed: 1893 },
      detailStats: {
        shoot: { finishing: 969, power: 913, composure: 968 },
        pass: { shortPass: 879, longPass: 870, accuracy: 854 },
        dribble: { breakout: 891, keeping: 850, ballTouch: 903 },
        defense: { tackle: 783, interception: 781, marking: 776 },
        physical: { jumping: 886, contact: 916, stamina: 882 },
        speed: { running: 933, agility: 960 }
      }
    },
    playTendencies: {
      attack: 2, defense: -1, dribble: 0, shoot: 2, longShoot: 1,
      shortPass: -1, longPass: -1, throughPass: -1, cutIn: 0, keep: -1,
      delay: -1, rushOut: 2, feint: 0, press: 0
    },
    skill: { name: '点で合わせるシュート', rank: '銅', description: '発動エリア：前中　/　発動条件：シュート時　/　決定力・キック力・冷静さUP' },
    abilities: [
      { name: 'ゴール前の嗅覚', rank: '銀', description: '発動条件：絶好調　/　決定力・敏捷性UP' },
      { name: '冷静なランナー', rank: '銀', description: '発動条件：好調　/　冷静さ・走力UP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p243',
    name: '長倉幹樹(2026)',
    readingName: 'ながくら・もとき',
    category: 'FW',
    mainPosition: 'CF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'リアクション',
    playStyle: 'ラインブレーカー',
    playStyleLevel: 'Ⅱ',
    overall: 6345,
    maxOverall: 14541,
    baseStats: { shoot: 1198, pass: 1011, dribble: 1201, defense: 834, physical: 1084, speed: 865 },
    detailStats: {
      shoot: { finishing: 404, power: 369, composure: 425 },
      pass: { shortPass: 332, longPass: 319, accuracy: 360 },
      dribble: { breakout: 420, keeping: 398, ballTouch: 383 },
      defense: { tackle: 247, interception: 298, marking: 289 },
      physical: { jumping: 371, contact: 307, stamina: 406 },
      speed: { running: 414, agility: 451 }
    },
    maxEnhanced: {
      overall: 14541,
      baseStats: { shoot: 2803, pass: 2544, dribble: 2782, defense: 2331, physical: 2665, speed: 1911 },
      detailStats: {
        shoot: { finishing: 939, power: 904, composure: 960 },
        pass: { shortPass: 843, longPass: 830, accuracy: 871 },
        dribble: { breakout: 943, keeping: 921, ballTouch: 918 },
        defense: { tackle: 746, interception: 797, marking: 788 },
        physical: { jumping: 894, contact: 842, stamina: 929 },
        speed: { running: 937, agility: 974 }
      }
    },
    playTendencies: {
      attack: 2, defense: -1, dribble: 0, shoot: 2, longShoot: 1,
      shortPass: -1, longPass: -1, throughPass: -1, cutIn: 0, keep: -1,
      delay: -1, rushOut: 2, feint: 0, press: 0
    },
    skill: { name: '狙いすましたシュート', rank: '銅', description: '発動エリア：前中　/　発動条件：シュート時　/　決定力・キック力・冷静さUP' },
    abilities: [
      { name: '俊敏なドリブラー', rank: '銀', description: '発動条件：好調　/　突破力・敏捷性UP' },
      { name: '冷静なフィニッシュ', rank: '銀', description: '発動条件：好調　/　決定力・冷静さUP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p244',
    name: '石川大地(2026)',
    readingName: 'いしかわ・だいち',
    category: 'FW',
    mainPosition: 'CF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'ムービング',
    playStyle: 'ラインブレーカー',
    playStyleLevel: 'Ⅱ',
    overall: 6331,
    maxOverall: 14556,
    baseStats: { shoot: 1216, pass: 1101, dribble: 1124, defense: 983, physical: 1100, speed: 794 },
    detailStats: {
      shoot: { finishing: 418, power: 372, composure: 426 },
      pass: { shortPass: 378, longPass: 373, accuracy: 350 },
      dribble: { breakout: 364, keeping: 364, ballTouch: 396 },
      defense: { tackle: 339, interception: 335, marking: 309 },
      physical: { jumping: 381, contact: 345, stamina: 374 },
      speed: { running: 386, agility: 408 }
    },
    maxEnhanced: {
      overall: 14556,
      baseStats: { shoot: 2821, pass: 2634, dribble: 2705, defense: 2480, physical: 2681, speed: 1840 },
      detailStats: {
        shoot: { finishing: 953, power: 907, composure: 961 },
        pass: { shortPass: 889, longPass: 884, accuracy: 861 },
        dribble: { breakout: 887, keeping: 887, ballTouch: 931 },
        defense: { tackle: 838, interception: 834, marking: 808 },
        physical: { jumping: 904, contact: 880, stamina: 897 },
        speed: { running: 909, agility: 931 }
      }
    },
    playTendencies: {
      attack: 2, defense: -1, dribble: 0, shoot: 2, longShoot: 1,
      shortPass: -1, longPass: -1, throughPass: -1, cutIn: 0, keep: -1,
      delay: -1, rushOut: 2, feint: 0, press: 0
    },
    skill: { name: '狙いすましたシュート', rank: '銅', description: '発動エリア：前中　/　発動条件：シュート時　/　決定力・キック力・冷静さUP' },
    abilities: [
      { name: '冷静なボールタッチ', rank: '銀', description: '発動条件：絶好調　/　冷静さ・ボールタッチUP' },
      { name: 'ランニングキッカー', rank: '銀', description: '発動条件：絶好調　/　キック力・走力UP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p245',
    name: '矢村健(2026)',
    readingName: 'やむら・けん',
    category: 'FW',
    mainPosition: 'CF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'ムービング',
    playStyle: 'ラインブレーカー',
    playStyleLevel: 'Ⅱ',
    overall: 6167,
    maxOverall: 14472,
    baseStats: { shoot: 1166, pass: 1039, dribble: 1161, defense: 989, physical: 1139, speed: 843 },
    detailStats: {
      shoot: { finishing: 397, power: 385, composure: 384 },
      pass: { shortPass: 350, longPass: 341, accuracy: 348 },
      dribble: { breakout: 401, keeping: 369, ballTouch: 391 },
      defense: { tackle: 353, interception: 322, marking: 314 },
      physical: { jumping: 390, contact: 387, stamina: 362 },
      speed: { running: 398, agility: 445 }
    },
    maxEnhanced: {
      overall: 14472,
      baseStats: { shoot: 2771, pass: 2572, dribble: 2742, defense: 2486, physical: 2720, speed: 1889 },
      detailStats: {
        shoot: { finishing: 932, power: 920, composure: 919 },
        pass: { shortPass: 861, longPass: 852, accuracy: 859 },
        dribble: { breakout: 924, keeping: 892, ballTouch: 926 },
        defense: { tackle: 852, interception: 821, marking: 813 },
        physical: { jumping: 913, contact: 922, stamina: 885 },
        speed: { running: 921, agility: 968 }
      }
    },
    playTendencies: {
      attack: 2, defense: -1, dribble: 0, shoot: 2, longShoot: 1,
      shortPass: -1, longPass: -1, throughPass: -1, cutIn: 0, keep: -1,
      delay: -1, rushOut: 2, feint: 0, press: 0
    },
    skill: { name: '点で合わせるシュート', rank: '銅', description: '発動エリア：前中　/　発動条件：シュート時　/　決定力・キック力・冷静さUP' },
    abilities: [
      { name: '俊敏なタッチ', rank: '銀', description: '発動条件：絶好調　/　ボールタッチ・敏捷性UP' },
      { name: 'パワフルランナー', rank: '銀', description: '発動条件：途中出場　/　コンタクト・走力UP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p246',
    name: '武藤雄樹(2026)',
    readingName: 'むとう・ゆうき',
    category: 'FW',
    mainPosition: 'CF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'ポゼッション',
    playStyle: 'ラインブレーカー',
    playStyleLevel: 'Ⅱ',
    overall: 6152,
    maxOverall: 14356,
    baseStats: { shoot: 1143, pass: 1161, dribble: 1190, defense: 916, physical: 1086, speed: 806 },
    detailStats: {
      shoot: { finishing: 404, power: 334, composure: 405 },
      pass: { shortPass: 388, longPass: 386, accuracy: 387 },
      dribble: { breakout: 396, keeping: 391, ballTouch: 403 },
      defense: { tackle: 304, interception: 314, marking: 298 },
      physical: { jumping: 368, contact: 321, stamina: 397 },
      speed: { running: 392, agility: 414 }
    },
    maxEnhanced: {
      overall: 14356,
      baseStats: { shoot: 2748, pass: 2694, dribble: 2771, defense: 2413, physical: 2667, speed: 1852 },
      detailStats: {
        shoot: { finishing: 939, power: 869, composure: 940 },
        pass: { shortPass: 899, longPass: 897, accuracy: 898 },
        dribble: { breakout: 919, keeping: 914, ballTouch: 938 },
        defense: { tackle: 803, interception: 813, marking: 797 },
        physical: { jumping: 891, contact: 856, stamina: 920 },
        speed: { running: 915, agility: 937 }
      }
    },
    playTendencies: {
      attack: 2, defense: -1, dribble: 0, shoot: 2, longShoot: 1,
      shortPass: -1, longPass: -1, throughPass: -1, cutIn: 0, keep: -1,
      delay: -1, rushOut: 2, feint: 0, press: 0
    },
    skill: { name: '点で合わせるシュート', rank: '銅', description: '発動エリア：前中　/　発動条件：シュート時　/　決定力・キック力・冷静さUP' },
    abilities: [
      { name: '冷静なボールタッチ', rank: '銀', description: '発動条件：絶好調　/　冷静さ・ボールタッチUP' },
      { name: '不屈のドリブル突破', rank: '銀', description: '発動条件：絶好調　/　突破力・スタミナUP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p247',
    name: '新谷聖基(2026)',
    readingName: 'しんたに・まさき',
    category: 'FW',
    mainPosition: 'CF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'カウンター',
    playStyle: 'ラインブレーカー',
    playStyleLevel: 'Ⅱ',
    overall: 6242,
    maxOverall: 14469,
    baseStats: { shoot: 1205, pass: 871, dribble: 1106, defense: 712, physical: 970, speed: 818 },
    detailStats: {
      shoot: { finishing: 394, power: 403, composure: 408 },
      pass: { shortPass: 308, longPass: 287, accuracy: 276 },
      dribble: { breakout: 381, keeping: 352, ballTouch: 373 },
      defense: { tackle: 173, interception: 282, marking: 257 },
      physical: { jumping: 211, contact: 378, stamina: 381 },
      speed: { running: 403, agility: 415 }
    },
    maxEnhanced: {
      overall: 14469,
      baseStats: { shoot: 2810, pass: 2404, dribble: 2687, defense: 2209, physical: 2551, speed: 1864 },
      detailStats: {
        shoot: { finishing: 929, power: 938, composure: 943 },
        pass: { shortPass: 819, longPass: 798, accuracy: 787 },
        dribble: { breakout: 904, keeping: 875, ballTouch: 908 },
        defense: { tackle: 672, interception: 781, marking: 756 },
        physical: { jumping: 734, contact: 913, stamina: 904 },
        speed: { running: 926, agility: 938 }
      }
    },
    playTendencies: {
      attack: 2, defense: -1, dribble: 0, shoot: 2, longShoot: 1,
      shortPass: -1, longPass: -1, throughPass: -1, cutIn: 0, keep: -1,
      delay: -1, rushOut: 2, feint: 0, press: 0
    },
    skill: { name: '点で合わせるシュート', rank: '銅', description: '発動エリア：前中　/　発動条件：シュート時　/　決定力・キック力・冷静さUP' },
    abilities: [
      { name: 'ムービングスナイパー', rank: '銀', description: '発動条件：好調　/　冷静さ・敏捷性UP' },
      { name: 'シュートセンス', rank: '銀', description: '発動条件：好調　/　決定力・キック力UP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p248',
    name: '川本梨誉(2026)',
    readingName: 'かわもと・りよ',
    category: 'FW',
    mainPosition: 'CF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'ポゼッション',
    playStyle: 'ラインブレーカー',
    playStyleLevel: 'Ⅱ',
    overall: 6189,
    maxOverall: 14399,
    baseStats: { shoot: 1144, pass: 1088, dribble: 1174, defense: 990, physical: 1041, speed: 821 },
    detailStats: {
      shoot: { finishing: 383, power: 369, composure: 392 },
      pass: { shortPass: 370, longPass: 362, accuracy: 356 },
      dribble: { breakout: 408, keeping: 396, ballTouch: 370 },
      defense: { tackle: 332, interception: 335, marking: 323 },
      physical: { jumping: 329, contact: 362, stamina: 350 },
      speed: { running: 412, agility: 409 }
    },
    maxEnhanced: {
      overall: 14399,
      baseStats: { shoot: 2749, pass: 2621, dribble: 2755, defense: 2487, physical: 2622, speed: 1867 },
      detailStats: {
        shoot: { finishing: 918, power: 904, composure: 927 },
        pass: { shortPass: 881, longPass: 873, accuracy: 867 },
        dribble: { breakout: 931, keeping: 919, ballTouch: 905 },
        defense: { tackle: 831, interception: 834, marking: 822 },
        physical: { jumping: 852, contact: 897, stamina: 873 },
        speed: { running: 935, agility: 932 }
      }
    },
    playTendencies: {
      attack: 2, defense: -1, dribble: 0, shoot: 2, longShoot: 1,
      shortPass: -1, longPass: -1, throughPass: -1, cutIn: 0, keep: -1,
      delay: -1, rushOut: 2, feint: 0, press: 0
    },
    skill: { name: '点で合わせるシュート', rank: '銅', description: '発動エリア：前中　/　発動条件：シュート時　/　決定力・キック力・冷静さUP' },
    abilities: [
      { name: 'スピードドリブラー', rank: '銀', description: '発動条件：途中出場　/　突破力・走力UP' },
      { name: 'ムービングスナイパー', rank: '銀', description: '発動条件：好調　/　冷静さ・敏捷性UP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p249',
    name: '矢野貴章(2026)',
    readingName: 'やの・きしょう',
    category: 'FW',
    mainPosition: 'CF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'リアクション',
    playStyle: 'ラインブレーカー',
    playStyleLevel: 'Ⅱ',
    overall: 6143,
    maxOverall: 14353,
    baseStats: { shoot: 1134, pass: 979, dribble: 1093, defense: 1197, physical: 1225, speed: 796 },
    detailStats: {
      shoot: { finishing: 358, power: 397, composure: 379 },
      pass: { shortPass: 335, longPass: 330, accuracy: 314 },
      dribble: { breakout: 383, keeping: 385, ballTouch: 325 },
      defense: { tackle: 409, interception: 391, marking: 397 },
      physical: { jumping: 378, contact: 403, stamina: 444 },
      speed: { running: 401, agility: 395 }
    },
    maxEnhanced: {
      overall: 14353,
      baseStats: { shoot: 2739, pass: 2512, dribble: 2674, defense: 2694, physical: 2806, speed: 1842 },
      detailStats: {
        shoot: { finishing: 893, power: 932, composure: 914 },
        pass: { shortPass: 846, longPass: 841, accuracy: 825 },
        dribble: { breakout: 906, keeping: 908, ballTouch: 860 },
        defense: { tackle: 908, interception: 890, marking: 896 },
        physical: { jumping: 901, contact: 938, stamina: 967 },
        speed: { running: 924, agility: 918 }
      }
    },
    playTendencies: {
      attack: 2, defense: -1, dribble: 0, shoot: 2, longShoot: 1,
      shortPass: -1, longPass: -1, throughPass: -1, cutIn: 0, keep: -1,
      delay: -1, rushOut: 2, feint: 0, press: 0
    },
    skill: { name: '点で合わせるシュート', rank: '銅', description: '発動エリア：前中　/　発動条件：シュート時　/　決定力・キック力・冷静さUP' },
    abilities: [
      { name: 'マラソンマン', rank: '銀', description: '発動条件：途中出場　/　スタミナ・走力UP' },
      { name: 'アジャイルターゲット', rank: '銀', description: '発動条件：途中出場　/　キープ力・敏捷性UP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p250',
    name: '河村慶人(2026)',
    readingName: 'かわむら・けいと',
    category: 'FW',
    mainPosition: 'CF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'カウンター',
    playStyle: 'ラインブレーカー',
    playStyleLevel: 'Ⅱ',
    overall: 6055,
    maxOverall: 14253,
    baseStats: { shoot: 1092, pass: 1148, dribble: 1204, defense: 1017, physical: 1118, speed: 822 },
    detailStats: {
      shoot: { finishing: 374, power: 344, composure: 374 },
      pass: { shortPass: 403, longPass: 379, accuracy: 366 },
      dribble: { breakout: 406, keeping: 394, ballTouch: 404 },
      defense: { tackle: 347, interception: 339, marking: 331 },
      physical: { jumping: 402, contact: 347, stamina: 369 },
      speed: { running: 406, agility: 416 }
    },
    maxEnhanced: {
      overall: 14253,
      baseStats: { shoot: 2697, pass: 2681, dribble: 2785, defense: 2514, physical: 2699, speed: 1868 },
      detailStats: {
        shoot: { finishing: 909, power: 879, composure: 909 },
        pass: { shortPass: 914, longPass: 890, accuracy: 877 },
        dribble: { breakout: 929, keeping: 917, ballTouch: 939 },
        defense: { tackle: 846, interception: 838, marking: 830 },
        physical: { jumping: 925, contact: 882, stamina: 892 },
        speed: { running: 929, agility: 939 }
      }
    },
    playTendencies: {
      attack: 2, defense: -1, dribble: 0, shoot: 2, longShoot: 1,
      shortPass: -1, longPass: -1, throughPass: -1, cutIn: 0, keep: -1,
      delay: -1, rushOut: 2, feint: 0, press: 0
    },
    skill: { name: '絶妙なトラップ', rank: '銅', description: '発動エリア：前中・中中　/　発動条件：トラップ時　/　ボールタッチ・キープ力UP　/　成功時に自身のシュート発生確率UP' },
    abilities: [
      { name: '高速のボールタッチ', rank: '銀', description: '発動条件：好調　/　ボールタッチ・走力UP' },
      { name: '跳躍のパサー', rank: '銀', description: '発動条件：好調　/　ショートパス・ジャンプUP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p251',
    name: '内藤大和(2026)',
    readingName: 'ないとう・やまと',
    category: 'FW',
    mainPosition: 'CF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'ポゼッション',
    playStyle: 'ラインブレーカー',
    playStyleLevel: 'Ⅱ',
    overall: 6106,
    maxOverall: 14312,
    baseStats: { shoot: 1126, pass: 1078, dribble: 1110, defense: 978, physical: 1121, speed: 802 },
    detailStats: {
      shoot: { finishing: 385, power: 347, composure: 394 },
      pass: { shortPass: 363, longPass: 364, accuracy: 351 },
      dribble: { breakout: 371, keeping: 361, ballTouch: 378 },
      defense: { tackle: 317, interception: 331, marking: 330 },
      physical: { jumping: 384, contact: 369, stamina: 368 },
      speed: { running: 390, agility: 412 }
    },
    maxEnhanced: {
      overall: 14312,
      baseStats: { shoot: 2731, pass: 2611, dribble: 2691, defense: 2475, physical: 2702, speed: 1848 },
      detailStats: {
        shoot: { finishing: 920, power: 882, composure: 929 },
        pass: { shortPass: 874, longPass: 875, accuracy: 862 },
        dribble: { breakout: 894, keeping: 884, ballTouch: 913 },
        defense: { tackle: 816, interception: 830, marking: 829 },
        physical: { jumping: 907, contact: 904, stamina: 891 },
        speed: { running: 913, agility: 935 }
      }
    },
    playTendencies: {
      attack: 2, defense: -1, dribble: 0, shoot: 2, longShoot: 1,
      shortPass: -1, longPass: -1, throughPass: -1, cutIn: 0, keep: -1,
      delay: -1, rushOut: 2, feint: 0, press: 0
    },
    skill: { name: '狙いすましたシュート', rank: '銅', description: '発動エリア：前中　/　発動条件：シュート時　/　決定力・キック力・冷静さUP' },
    abilities: [
      { name: '俊敏なタッチ', rank: '銀', description: '発動条件：絶好調　/　ボールタッチ・敏捷性UP' },
      { name: 'パワフルランナー', rank: '銀', description: '発動条件：途中出場　/　コンタクト・走力UP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p252',
    name: '田中想来(2026)',
    readingName: 'たなか・そら',
    category: 'FW',
    mainPosition: 'CF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'リアクション',
    playStyle: 'ラインブレーカー',
    playStyleLevel: 'Ⅱ',
    overall: 6094,
    maxOverall: 14305,
    baseStats: { shoot: 1093, pass: 896, dribble: 1133, defense: 972, physical: 1125, speed: 834 },
    detailStats: {
      shoot: { finishing: 383, power: 331, composure: 379 },
      pass: { shortPass: 296, longPass: 292, accuracy: 308 },
      dribble: { breakout: 381, keeping: 369, ballTouch: 383 },
      defense: { tackle: 295, interception: 338, marking: 339 },
      physical: { jumping: 395, contact: 365, stamina: 365 },
      speed: { running: 412, agility: 422 }
    },
    maxEnhanced: {
      overall: 14305,
      baseStats: { shoot: 2698, pass: 2429, dribble: 2714, defense: 2469, physical: 2706, speed: 1880 },
      detailStats: {
        shoot: { finishing: 918, power: 866, composure: 914 },
        pass: { shortPass: 807, longPass: 803, accuracy: 819 },
        dribble: { breakout: 904, keeping: 892, ballTouch: 918 },
        defense: { tackle: 794, interception: 837, marking: 838 },
        physical: { jumping: 918, contact: 900, stamina: 888 },
        speed: { running: 935, agility: 945 }
      }
    },
    playTendencies: {
      attack: 2, defense: -1, dribble: 0, shoot: 2, longShoot: 1,
      shortPass: -1, longPass: -1, throughPass: -1, cutIn: 0, keep: -1,
      delay: -1, rushOut: 2, feint: 0, press: 0
    },
    skill: { name: '点で合わせるシュート', rank: '銅', description: '発動エリア：前中　/　発動条件：シュート時　/　決定力・キック力・冷静さUP' },
    abilities: [
      { name: '俊敏なタッチ', rank: '銀', description: '発動条件：絶好調　/　ボールタッチ・敏捷性UP' },
      { name: '裏への飛び出し', rank: '銀', description: '発動条件：途中出場　/　決定力・走力UP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p253',
    name: 'パトリク・クリマラ(2026)',
    readingName: 'ぱとりく・くりまら',
    category: 'FW',
    mainPosition: 'CF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'ポーランド',
    policy: 'ムービング',
    playStyle: 'ラインブレーカー',
    playStyleLevel: 'Ⅱ',
    overall: 6330,
    maxOverall: 14539,
    baseStats: { shoot: 1094, pass: 1089, dribble: 1266, defense: 807, physical: 1187, speed: 875 },
    detailStats: {
      shoot: { finishing: 364, power: 360, composure: 370 },
      pass: { shortPass: 369, longPass: 360, accuracy: 360 },
      dribble: { breakout: 419, keeping: 430, ballTouch: 417 },
      defense: { tackle: 296, interception: 274, marking: 237 },
      physical: { jumping: 388, contact: 374, stamina: 425 },
      speed: { running: 449, agility: 426 }
    },
    maxEnhanced: {
      overall: 14539,
      baseStats: { shoot: 2699, pass: 2622, dribble: 2847, defense: 2304, physical: 2768, speed: 1921 },
      detailStats: {
        shoot: { finishing: 899, power: 895, composure: 905 },
        pass: { shortPass: 880, longPass: 871, accuracy: 871 },
        dribble: { breakout: 942, keeping: 953, ballTouch: 952 },
        defense: { tackle: 795, interception: 773, marking: 736 },
        physical: { jumping: 911, contact: 909, stamina: 948 },
        speed: { running: 972, agility: 949 }
      }
    },
    playTendencies: {
      attack: 2, defense: -1, dribble: 0, shoot: 2, longShoot: 1,
      shortPass: -1, longPass: -1, throughPass: -1, cutIn: 0, keep: -1,
      delay: -1, rushOut: 2, feint: 0, press: 0
    },
    skill: { name: 'コントロールトラップ', rank: '銅', description: '発動エリア：前中・中中　/　発動条件：トラップ時　/　ボールタッチ・キープ力・コンタクトUP　/　成功時に自身のショートパス発生確率UP' },
    abilities: [
      { name: '高速のボールタッチ', rank: '銀', description: '発動条件：好調　/　ボールタッチ・走力UP' },
      { name: 'アジャイルターゲット', rank: '銀', description: '発動条件：途中出場　/　キープ力・敏捷性UP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p254',
    name: 'ステファン・ムゴシャ(2026)',
    readingName: 'すてふぁん・むごしゃ',
    category: 'FW',
    mainPosition: 'CF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'モンテネグロ',
    policy: 'リアクション',
    playStyle: 'ストライカー',
    playStyleLevel: 'Ⅱ',
    overall: 6525,
    maxOverall: 14764,
    baseStats: { shoot: 1295, pass: 1128, dribble: 1174, defense: 980, physical: 1118, speed: 744 },
    detailStats: {
      shoot: { finishing: 441, power: 421, composure: 433 },
      pass: { shortPass: 388, longPass: 373, accuracy: 367 },
      dribble: { breakout: 394, keeping: 390, ballTouch: 390 },
      defense: { tackle: 371, interception: 312, marking: 297 },
      physical: { jumping: 418, contact: 365, stamina: 335 },
      speed: { running: 355, agility: 389 }
    },
    maxEnhanced: {
      overall: 14764,
      baseStats: { shoot: 2900, pass: 2661, dribble: 2755, defense: 2477, physical: 2699, speed: 1790 },
      detailStats: {
        shoot: { finishing: 976, power: 956, composure: 968 },
        pass: { shortPass: 899, longPass: 884, accuracy: 878 },
        dribble: { breakout: 917, keeping: 913, ballTouch: 925 },
        defense: { tackle: 870, interception: 811, marking: 796 },
        physical: { jumping: 941, contact: 900, stamina: 858 },
        speed: { running: 878, agility: 912 }
      }
    },
    playTendencies: {
      attack: 1, defense: -1, dribble: 0, shoot: 1, longShoot: 0,
      shortPass: 0, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: -1, rushOut: 0, feint: 0, press: -1
    },
    skill: { name: '点で合わせるシュート', rank: '銅', description: '発動エリア：前中　/　発動条件：シュート時　/　決定力・キック力・冷静さUP' },
    abilities: [
      { name: 'シュートセンス', rank: '銀', description: '発動条件：好調　/　決定力・キック力UP' },
      { name: '上空のスナイパー', rank: '銀', description: '発動条件：絶好調　/　冷静さ・ジャンプUP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p255',
    name: 'ヤコブ・トランジスカ(2026)',
    readingName: 'やこぶ・とらんじすか',
    category: 'FW',
    mainPosition: 'CF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'ドイツ',
    policy: 'ムービング',
    playStyle: 'ストライカー',
    playStyleLevel: 'Ⅱ',
    overall: 6179,
    maxOverall: 14385,
    baseStats: { shoot: 1146, pass: 1047, dribble: 1150, defense: 828, physical: 1213, speed: 809 },
    detailStats: {
      shoot: { finishing: 391, power: 378, composure: 377 },
      pass: { shortPass: 353, longPass: 352, accuracy: 342 },
      dribble: { breakout: 392, keeping: 388, ballTouch: 370 },
      defense: { tackle: 288, interception: 278, marking: 262 },
      physical: { jumping: 433, contact: 358, stamina: 422 },
      speed: { running: 405, agility: 404 }
    },
    maxEnhanced: {
      overall: 14385,
      baseStats: { shoot: 2751, pass: 2580, dribble: 2731, defense: 2325, physical: 2794, speed: 1855 },
      detailStats: {
        shoot: { finishing: 926, power: 913, composure: 912 },
        pass: { shortPass: 864, longPass: 863, accuracy: 853 },
        dribble: { breakout: 915, keeping: 911, ballTouch: 905 },
        defense: { tackle: 787, interception: 777, marking: 761 },
        physical: { jumping: 956, contact: 893, stamina: 945 },
        speed: { running: 928, agility: 927 }
      }
    },
    playTendencies: {
      attack: 1, defense: -1, dribble: 0, shoot: 1, longShoot: 0,
      shortPass: 0, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: -1, rushOut: 0, feint: 0, press: -1
    },
    skill: { name: '狙いすましたシュート', rank: '銅', description: '発動エリア：前中　/　発動条件：シュート時　/　決定力・キック力・冷静さUP' },
    abilities: [
      { name: 'ランニングジャンパー', rank: '銀', description: '発動条件：絶好調　/　ジャンプ・走力UP' },
      { name: '強引なフィニッシュ', rank: '銀', description: '発動条件：途中出場　/　決定力・突破力UP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p256',
    name: 'デニス・ヒュメット(2026)',
    readingName: 'でにす・ひゅめっと',
    category: 'FW',
    mainPosition: 'CF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'トルコ',
    policy: 'ポゼッション',
    playStyle: 'ストライカー',
    playStyleLevel: 'Ⅱ',
    overall: 6344,
    maxOverall: 14561,
    baseStats: { shoot: 1227, pass: 1104, dribble: 1218, defense: 988, physical: 1135, speed: 799 },
    detailStats: {
      shoot: { finishing: 421, power: 401, composure: 405 },
      pass: { shortPass: 373, longPass: 348, accuracy: 383 },
      dribble: { breakout: 426, keeping: 400, ballTouch: 392 },
      defense: { tackle: 315, interception: 346, marking: 327 },
      physical: { jumping: 390, contact: 378, stamina: 367 },
      speed: { running: 392, agility: 407 }
    },
    maxEnhanced: {
      overall: 14561,
      baseStats: { shoot: 2832, pass: 2637, dribble: 2799, defense: 2485, physical: 2716, speed: 1845 },
      detailStats: {
        shoot: { finishing: 956, power: 936, composure: 940 },
        pass: { shortPass: 884, longPass: 859, accuracy: 894 },
        dribble: { breakout: 949, keeping: 923, ballTouch: 927 },
        defense: { tackle: 814, interception: 845, marking: 826 },
        physical: { jumping: 913, contact: 913, stamina: 890 },
        speed: { running: 915, agility: 930 }
      }
    },
    playTendencies: {
      attack: 1, defense: -1, dribble: 0, shoot: 1, longShoot: 0,
      shortPass: 0, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: -1, rushOut: 0, feint: 0, press: -1
    },
    skill: { name: '点で合わせるシュート', rank: '銅', description: '発動エリア：前中　/　発動条件：シュート時　/　決定力・キック力・冷静さUP' },
    abilities: [
      { name: 'シュートセンス', rank: '銀', description: '発動条件：好調　/　決定力・キック力UP' },
      { name: 'アジャイルターゲット', rank: '銀', description: '発動条件：途中出場　/　キープ力・敏捷性UP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p257',
    name: '谷村海那(2026)',
    readingName: 'たにむら・かいな',
    category: 'FW',
    mainPosition: 'CF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'リアクション',
    playStyle: 'ストライカー',
    playStyleLevel: 'Ⅱ',
    overall: 6330,
    maxOverall: 14555,
    baseStats: { shoot: 1147, pass: 1016, dribble: 1143, defense: 964, physical: 1251, speed: 762 },
    detailStats: {
      shoot: { finishing: 369, power: 374, composure: 404 },
      pass: { shortPass: 377, longPass: 321, accuracy: 318 },
      dribble: { breakout: 377, keeping: 391, ballTouch: 375 },
      defense: { tackle: 400, interception: 293, marking: 271 },
      physical: { jumping: 455, contact: 422, stamina: 374 },
      speed: { running: 378, agility: 384 }
    },
    maxEnhanced: {
      overall: 14555,
      baseStats: { shoot: 2779, pass: 2549, dribble: 2724, defense: 2461, physical: 2832, speed: 1808 },
      detailStats: {
        shoot: { finishing: 931, power: 909, composure: 939 },
        pass: { shortPass: 888, longPass: 832, accuracy: 829 },
        dribble: { breakout: 900, keeping: 914, ballTouch: 910 },
        defense: { tackle: 899, interception: 792, marking: 770 },
        physical: { jumping: 978, contact: 957, stamina: 897 },
        speed: { running: 901, agility: 907 }
      }
    },
    playTendencies: {
      attack: 1, defense: -1, dribble: 0, shoot: 1, longShoot: 0,
      shortPass: 0, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: -1, rushOut: 0, feint: 0, press: -1
    },
    skill: { name: '点で合わせるシュート', rank: '銅', description: '発動エリア：前中　/　発動条件：シュート時　/　決定力・キック力・冷静さUP' },
    abilities: [
      { name: 'パワーヘッド', rank: '銀', description: '発動条件：途中出場　/　決定力・ジャンプUP' },
      { name: '保持からの一撃', rank: '銀', description: '発動条件：途中出場　/　キック力・キープ力UP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p258',
    name: '山岸祐也(2026)',
    readingName: 'やまぎし・ゆうや',
    category: 'FW',
    mainPosition: 'CF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'カウンター',
    playStyle: 'ストライカー',
    playStyleLevel: 'Ⅱ',
    overall: 6247,
    maxOverall: 14458,
    baseStats: { shoot: 1158, pass: 1139, dribble: 1227, defense: 946, physical: 1141, speed: 786 },
    detailStats: {
      shoot: { finishing: 408, power: 329, composure: 421 },
      pass: { shortPass: 387, longPass: 377, accuracy: 375 },
      dribble: { breakout: 390, keeping: 396, ballTouch: 441 },
      defense: { tackle: 282, interception: 335, marking: 329 },
      physical: { jumping: 393, contact: 377, stamina: 371 },
      speed: { running: 375, agility: 411 }
    },
    maxEnhanced: {
      overall: 14458,
      baseStats: { shoot: 2763, pass: 2672, dribble: 2808, defense: 2443, physical: 2722, speed: 1832 },
      detailStats: {
        shoot: { finishing: 943, power: 864, composure: 956 },
        pass: { shortPass: 898, longPass: 888, accuracy: 886 },
        dribble: { breakout: 913, keeping: 919, ballTouch: 976 },
        defense: { tackle: 781, interception: 834, marking: 828 },
        physical: { jumping: 916, contact: 912, stamina: 894 },
        speed: { running: 898, agility: 934 }
      }
    },
    playTendencies: {
      attack: 1, defense: -1, dribble: 0, shoot: 1, longShoot: 0,
      shortPass: 0, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: -1, rushOut: 0, feint: 0, press: -1
    },
    skill: { name: '絶妙なトラップ', rank: '銅', description: '発動エリア：前中・中中　/　発動条件：トラップ時　/　ボールタッチ・キープ力UP　/　成功時に自身のシュート発生確率UP' },
    abilities: [
      { name: 'ゴール前の落ち着き', rank: '銀', description: '発動条件：好調　/　決定力・ボールタッチUP' },
      { name: '上空のターゲットマン', rank: '銀', description: '発動条件：途中出場　/　キープ力・ジャンプUP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p259',
    name: 'アーリング・ハーランド(配布)',
    readingName: 'あーりんぐ・はーらんど',
    category: 'FW',
    mainPosition: 'CF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'ノルウェー',
    policy: 'ムービング',
    playStyle: 'ストライカー',
    playStyleLevel: 'Ⅱ',
    overall: 6748,
    maxOverall: 12421,
    baseStats: { shoot: 1363, pass: 991, dribble: 1319, defense: 766, physical: 1301, speed: 898 },
    detailStats: {
      shoot: { finishing: 463, power: 463, composure: 437 },
      pass: { shortPass: 349, longPass: 297, accuracy: 345 },
      dribble: { breakout: 452, keeping: 440, ballTouch: 427 },
      defense: { tackle: 307, interception: 238, marking: 221 },
      physical: { jumping: 448, contact: 462, stamina: 391 },
      speed: { running: 474, agility: 424 }
    },
    maxEnhanced: {
      overall: 12421,
      baseStats: { shoot: 2428, pass: 1984, dribble: 2360, defense: 1723, physical: 2342, speed: 1584 },
      detailStats: {
        shoot: { finishing: 818, power: 818, composure: 792 },
        pass: { shortPass: 680, longPass: 628, accuracy: 676 },
        dribble: { breakout: 795, keeping: 783, ballTouch: 782 },
        defense: { tackle: 626, interception: 557, marking: 540 },
        physical: { jumping: 791, contact: 817, stamina: 734 },
        speed: { running: 817, agility: 767 }
      }
    },
    playTendencies: {
      attack: 1, defense: -1, dribble: 0, shoot: 1, longShoot: 0,
      shortPass: 0, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: -1, rushOut: 0, feint: 0, press: -1
    },
    skill: { name: '点で合わせるシュート', rank: '銅', description: '発動エリア：前中　/　発動条件：シュート時　/　決定力・キック力・冷静さUP' },
    abilities: [
      { name: '力強いフィニッシュ', rank: '銀', description: '発動条件：好調　/　決定力・コンタクトUP' },
      { name: 'アジャイルキッカー', rank: '銅', description: '発動条件：途中出場　/　キック力・敏捷性UP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p260',
    name: 'ルベン・ディアス(配布)',
    readingName: 'るべん・でぃあす',
    category: 'DF',
    mainPosition: 'CB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'ポルトガル',
    policy: 'ムービング',
    playStyle: 'ストッパー',
    playStyleLevel: 'Ⅱ',
    overall: 6719,
    maxOverall: 12161,
    baseStats: { shoot: 891, pass: 1151, dribble: 1174, defense: 1392, physical: 1369, speed: 761 },
    detailStats: {
      shoot: { finishing: 255, power: 333, composure: 303 },
      pass: { shortPass: 394, longPass: 391, accuracy: 366 },
      dribble: { breakout: 378, keeping: 385, ballTouch: 411 },
      defense: { tackle: 464, interception: 464, marking: 464 },
      physical: { jumping: 442, contact: 450, stamina: 477 },
      speed: { running: 373, agility: 388 }
    },
    maxEnhanced: {
      overall: 12161,
      baseStats: { shoot: 1848, pass: 1820, dribble: 2167, defense: 2457, physical: 2422, speed: 1447 },
      detailStats: {
        shoot: { finishing: 574, power: 652, composure: 622 },
        pass: { shortPass: 737, longPass: 374, accuracy: 709 },
        dribble: { breakout: 709, keeping: 716, ballTouch: 742 },
        defense: { tackle: 819, interception: 819, marking: 819 },
        physical: { jumping: 797, contact: 805, stamina: 820 },
        speed: { running: 716, agility: 731 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -1, shoot: -1, longShoot: -1,
      shortPass: 0, longPass: 0, throughPass: -1, cutIn: -1, keep: -1,
      delay: 0, rushOut: -1, feint: -1, press: 1
    },
    skill: { name: '鋭角的なタックル', rank: '銅', description: '発動エリア：中左中右・後左中右　/　発動条件：タックル時　/　タックル・コンタクト・マークUP' },
    abilities: [
      { name: 'ピッチの掃除屋', rank: '銀', description: '発動条件：好調　/　タックル・スタミナUP' },
      { name: 'ピッチの分断者', rank: '銅', description: '発動条件：絶好調　/　パスカット・スタミナUP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p261',
    name: '平塚浪馬(配布)',
    readingName: 'ひらつか・ろうま',
    category: 'MF',
    mainPosition: 'AM',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'カウンター',
    playStyle: 'アタッカー',
    playStyleLevel: 'Ⅱ',
    overall: 6178,
    maxOverall: 12318,
    baseStats: { shoot: 1141, pass: 1313, dribble: 1333, defense: 974, physical: 1033, speed: 741 },
    detailStats: {
      shoot: { finishing: 407, power: 354, composure: 380 },
      pass: { shortPass: 463, longPass: 398, accuracy: 452 },
      dribble: { breakout: 432, keeping: 451, ballTouch: 450 },
      defense: { tackle: 299, interception: 343, marking: 332 },
      physical: { jumping: 352, contact: 318, stamina: 363 },
      speed: { running: 412, agility: 329 }
    },
    maxEnhanced: {
      overall: 12318,
      baseStats: { shoot: 2146, pass: 2354, dribble: 2362, defense: 1979, physical: 2062, speed: 1415 },
      detailStats: {
        shoot: { finishing: 738, power: 685, composure: 723 },
        pass: { shortPass: 818, longPass: 741, accuracy: 795 },
        dribble: { breakout: 775, keeping: 794, ballTouch: 793 },
        defense: { tackle: 642, interception: 674, marking: 663 },
        physical: { jumping: 683, contact: 661, stamina: 718 },
        speed: { running: 743, agility: 672 }
      }
    },
    playTendencies: {
      attack: 0, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 1, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '敵陣を切り裂くパス', rank: '銅', description: '発動エリア：前中・中中　/　発動条件：CFの位置に居る選手へのショートパス時　/　ショートパス・キック精度UP　/　成功時に受け手のシュート発生確率UP' },
    abilities: [
      { name: 'ゴール前の落ち着き', rank: '銀', description: '発動条件：好調　/　決定力・ボールタッチUP' },
      { name: '柔軟なキッカー', rank: '銅', description: '発動条件：途中出場　/　キック精度・ボールタッチUP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p262',
    name: '河本龍将(パック)',
    readingName: 'かわもと・たつまさ',
    category: 'GK',
    mainPosition: 'GK',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'カウンター',
    playStyle: 'オーソドックスGK',
    playStyleLevel: 'Ⅱ',
    overall: 5494,
    maxOverall: 11207,
    baseStats: { shoot: 830, pass: 899, dribble: 802, defense: 1308, physical: 971, speed: 710 },
    detailStats: {
      shoot: { finishing: 298, power: 269, composure: 263 },
      pass: { shortPass: 299, longPass: 326, accuracy: 274 },
      dribble: { breakout: 280, keeping: 261, ballTouch: 261 },
      defense: { tackle: 456, interception: 430, marking: 422 },
      physical: { jumping: 430, contact: 303, stamina: 238 },
      speed: { running: 362, agility: 348 }
    },
    maxEnhanced: {
      overall: 11207,
      baseStats: { shoot: 1751, pass: 1964, dribble: 1723, defense: 2373, physical: 2024, speed: 1372 },
      detailStats: {
        shoot: { finishing: 605, power: 576, composure: 570 },
        pass: { shortPass: 654, longPass: 681, accuracy: 629 },
        dribble: { breakout: 587, keeping: 568, ballTouch: 568 },
        defense: { tackle: 811, interception: 785, marking: 777 },
        physical: { jumping: 785, contact: 658, stamina: 581 },
        speed: { running: 693, agility: 679 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -2, shoot: -1, longShoot: -1,
      shortPass: -1, longPass: 1, throughPass: -1, cutIn: -1, keep: -1,
      delay: -1, rushOut: -1, feint: -1, press: -1
    },
    skill: { name: '驚異的なセービング', rank: '銅', description: '発動エリア：後中　/　発動条件：セービング時　/　セービング・反応速度UP' },
    abilities: [
      { name: '上空の守護神', rank: '銀', description: '発動条件：好調　/　セービング・ジャンプUP' },
      { name: '冷静沈着', rank: '銅', description: '発動条件：途中出場　/　反応速度・1VS1UP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p263',
    name: 'レオ・セアラ(2026TS)',
    readingName: 'れお・せあら',
    category: 'FW',
    mainPosition: 'CF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'ブラジル',
    policy: 'リアクション',
    playStyle: 'ラインブレーカー',
    playStyleLevel: 'Ⅲ',
    overall: 7045,
    maxOverall: 15280,
    baseStats: { shoot: 1376, pass: 1072, dribble: 1233, defense: 929, physical: 1266, speed: 889 },
    detailStats: {
      shoot: { finishing: 473, power: 453, composure: 450 },
      pass: { shortPass: 369, longPass: 353, accuracy: 350 },
      dribble: { breakout: 393, keeping: 421, ballTouch: 419 },
      defense: { tackle: 315, interception: 315, marking: 299 },
      physical: { jumping: 409, contact: 429, stamina: 428 },
      speed: { running: 438, agility: 451 }
    },
    maxEnhanced: {
      overall: 15280,
      baseStats: { shoot: 2981, pass: 2605, dribble: 2814, defense: 2426, physical: 2847, speed: 1935 },
      detailStats: {
        shoot: { finishing: 1008, power: 988, composure: 985 },
        pass: { shortPass: 880, longPass: 864, accuracy: 861 },
        dribble: { breakout: 916, keeping: 944, ballTouch: 954 },
        defense: { tackle: 814, interception: 814, marking: 798 },
        physical: { jumping: 932, contact: 964, stamina: 951 },
        speed: { running: 961, agility: 974 }
      }
    },
    playTendencies: {
      attack: 2, defense: -1, dribble: 0, shoot: 2, longShoot: 1,
      shortPass: -1, longPass: -1, throughPass: -1, cutIn: 0, keep: -1,
      delay: -1, rushOut: 2, feint: 0, press: 0
    },
    skill: { name: 'アンストッパブルショット', rank: '金', description: '発動エリア：前中　/　発動条件：シュート時　/　決定力・キック力・冷静さUP' },
    abilities: [
      { name: '冷静なフィニッシュ', rank: '銀', description: '発動条件：好調　/　決定力・冷静さUP' },
      { name: 'パワフルキッカー', rank: '銀', description: '発動条件：絶好調　/　キック力・コンタクトUP' },
      { name: 'ノンストップジャンパー', rank: '銅', description: '発動条件：途中出場　/　ジャンプ・スタミナUP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p264',
    name: '山岸祐也(2026TS)',
    readingName: 'やまぎし・ゆうや',
    category: 'FW',
    mainPosition: 'CF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'カウンター',
    playStyle: 'ストライカー',
    playStyleLevel: 'Ⅱ',
    overall: 7052,
    maxOverall: 15298,
    baseStats: { shoot: 1349, pass: 1115, dribble: 1333, defense: 828, physical: 1280, speed: 830 },
    detailStats: {
      shoot: { finishing: 455, power: 426, composure: 468 },
      pass: { shortPass: 379, longPass: 369, accuracy: 367 },
      dribble: { breakout: 432, keeping: 438, ballTouch: 463 },
      defense: { tackle: 266, interception: 284, marking: 278 },
      physical: { jumping: 439, contact: 423, stamina: 418 },
      speed: { running: 397, agility: 433 }
    },
    maxEnhanced: {
      overall: 15298,
      baseStats: { shoot: 2954, pass: 2648, dribble: 2914, defense: 2325, physical: 2861, speed: 1876 },
      detailStats: {
        shoot: { finishing: 990, power: 961, composure: 1003 },
        pass: { shortPass: 890, longPass: 880, accuracy: 878 },
        dribble: { breakout: 955, keeping: 961, ballTouch: 998 },
        defense: { tackle: 765, interception: 783, marking: 777 },
        physical: { jumping: 962, contact: 958, stamina: 941 },
        speed: { running: 920, agility: 956 }
      }
    },
    playTendencies: {
      attack: 1, defense: -1, dribble: 0, shoot: 1, longShoot: 0,
      shortPass: 0, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: -1, rushOut: 0, feint: 0, press: -1
    },
    skill: { name: '上空の覇者', rank: '金', description: '発動エリア：前中　/　発動条件：ヘディングシュート時　/　決定力・ジャンプUP' },
    abilities: [
      { name: '上空のスナイパー', rank: '銀', description: '発動条件：絶好調　/　冷静さ・ジャンプUP' },
      { name: 'ゴール前の落ち着き', rank: '銀', description: '発動条件：好調　/　決定力・ボールタッチUP' },
      { name: '保持からの一撃', rank: '銅', description: '発動条件：途中出場　/　キック力・キープ力UP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p265',
    name: '山田寛人(2026TS)',
    readingName: 'やまだ・ひろと',
    category: 'FW',
    mainPosition: 'CF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'カウンター',
    playStyle: 'ラインブレーカー',
    playStyleLevel: 'Ⅱ',
    overall: 6822,
    maxOverall: 15057,
    baseStats: { shoot: 1330, pass: 1213, dribble: 1203, defense: 863, physical: 1034, speed: 918 },
    detailStats: {
      shoot: { finishing: 450, power: 434, composure: 446 },
      pass: { shortPass: 419, longPass: 403, accuracy: 391 },
      dribble: { breakout: 401, keeping: 396, ballTouch: 406 },
      defense: { tackle: 272, interception: 304, marking: 287 },
      physical: { jumping: 360, contact: 322, stamina: 352 },
      speed: { running: 450, agility: 468 }
    },
    maxEnhanced: {
      overall: 15057,
      baseStats: { shoot: 2935, pass: 2746, dribble: 2784, defense: 2360, physical: 2615, speed: 1964 },
      detailStats: {
        shoot: { finishing: 985, power: 969, composure: 981 },
        pass: { shortPass: 930, longPass: 914, accuracy: 902 },
        dribble: { breakout: 924, keeping: 919, ballTouch: 941 },
        defense: { tackle: 771, interception: 803, marking: 786 },
        physical: { jumping: 883, contact: 857, stamina: 875 },
        speed: { running: 973, agility: 991 }
      }
    },
    playTendencies: {
      attack: 2, defense: -1, dribble: 0, shoot: 2, longShoot: 1,
      shortPass: -1, longPass: -1, throughPass: -1, cutIn: 0, keep: -1,
      delay: -1, rushOut: 2, feint: 0, press: 0
    },
    skill: { name: '魂のワンタッチ', rank: '銀', description: '発動エリア：前中　/　発動条件：シュート時　/　決定力・キック力・冷静さUP' },
    abilities: [
      { name: 'ムービングスナイパー', rank: '銀', description: '発動条件：好調　/　冷静さ・敏捷性UP' },
      { name: '裏への飛び出し', rank: '銀', description: '発動条件：途中出場　/　決定力・走力UP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p266',
    name: '田村翔太(2026TS)',
    readingName: 'たむら・しょうた',
    category: 'FW',
    mainPosition: 'CF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'ポゼッション',
    playStyle: 'ストライカー',
    playStyleLevel: 'Ⅱ',
    overall: 6706,
    maxOverall: 14932,
    baseStats: { shoot: 1315, pass: 1083, dribble: 1233, defense: 853, physical: 1193, speed: 871 },
    detailStats: {
      shoot: { finishing: 446, power: 423, composure: 446 },
      pass: { shortPass: 363, longPass: 353, accuracy: 367 },
      dribble: { breakout: 430, keeping: 387, ballTouch: 416 },
      defense: { tackle: 303, interception: 276, marking: 274 },
      physical: { jumping: 382, contact: 420, stamina: 391 },
      speed: { running: 435, agility: 436 }
    },
    maxEnhanced: {
      overall: 14932,
      baseStats: { shoot: 2920, pass: 2616, dribble: 2814, defense: 2350, physical: 2774, speed: 1917 },
      detailStats: {
        shoot: { finishing: 981, power: 958, composure: 981 },
        pass: { shortPass: 874, longPass: 864, accuracy: 878 },
        dribble: { breakout: 953, keeping: 910, ballTouch: 951 },
        defense: { tackle: 802, interception: 775, marking: 773 },
        physical: { jumping: 905, contact: 955, stamina: 914 },
        speed: { running: 958, agility: 959 }
      }
    },
    playTendencies: {
      attack: 1, defense: -1, dribble: 0, shoot: 1, longShoot: 0,
      shortPass: 0, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: -1, rushOut: 0, feint: 0, press: -1
    },
    skill: { name: 'コントロールショット', rank: '銀', description: '発動エリア：前中　/　発動条件：シュート時　/　決定力・キック力・冷静さUP' },
    abilities: [
      { name: 'シュートセンス', rank: '銀', description: '発動条件：好調　/　決定力・キック力UP' },
      { name: 'パワフルランナー', rank: '銀', description: '発動条件：途中出場　/　コンタクト・走力UP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p267',
    name: '土信田悠生(2026TS)',
    readingName: 'としだ・ゆうせい',
    category: 'FW',
    mainPosition: 'CF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'ポゼッション',
    playStyle: 'ポストプレーヤー',
    playStyleLevel: 'Ⅱ',
    overall: 6798,
    maxOverall: 15039,
    baseStats: { shoot: 1297, pass: 1007, dribble: 1206, defense: 974, physical: 1278, speed: 791 },
    detailStats: {
      shoot: { finishing: 435, power: 427, composure: 435 },
      pass: { shortPass: 338, longPass: 318, accuracy: 351 },
      dribble: { breakout: 370, keeping: 420, ballTouch: 416 },
      defense: { tackle: 330, interception: 329, marking: 315 },
      physical: { jumping: 455, contact: 434, stamina: 389 },
      speed: { running: 395, agility: 396 }
    },
    maxEnhanced: {
      overall: 15039,
      baseStats: { shoot: 2902, pass: 2540, dribble: 2787, defense: 2471, physical: 2859, speed: 1837 },
      detailStats: {
        shoot: { finishing: 970, power: 962, composure: 970 },
        pass: { shortPass: 849, longPass: 829, accuracy: 862 },
        dribble: { breakout: 893, keeping: 943, ballTouch: 951 },
        defense: { tackle: 829, interception: 828, marking: 814 },
        physical: { jumping: 978, contact: 969, stamina: 912 },
        speed: { running: 918, agility: 919 }
      }
    },
    playTendencies: {
      attack: 1, defense: -1, dribble: 0, shoot: 1, longShoot: 1,
      shortPass: 1, longPass: -1, throughPass: 1, cutIn: 0, keep: 2,
      delay: -1, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '魂のワンタッチ', rank: '銀', description: '発動エリア：前中　/　発動条件：シュート時　/　決定力・キック力・冷静さUP' },
    abilities: [
      { name: '力強いフィニッシュ', rank: '銀', description: '発動条件：好調　/　決定力・コンタクトUP' },
      { name: '柔と剛のタッチ', rank: '銀', description: '発動条件：好調　/　キック力・ボールタッチUP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p268',
    name: '泉柊椰(2026TS)',
    readingName: 'いずみ・とうや',
    category: 'MF',
    mainPosition: 'LM',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'カウンター',
    playStyle: 'ドリブラーLM',
    playStyleLevel: 'Ⅲ',
    overall: 6851,
    maxOverall: 15098,
    baseStats: { shoot: 1164, pass: 1200, dribble: 1324, defense: 1001, physical: 1084, speed: 870 },
    detailStats: {
      shoot: { finishing: 413, power: 318, composure: 433 },
      pass: { shortPass: 401, longPass: 414, accuracy: 385 },
      dribble: { breakout: 447, keeping: 443, ballTouch: 434 },
      defense: { tackle: 302, interception: 368, marking: 331 },
      physical: { jumping: 318, contact: 366, stamina: 400 },
      speed: { running: 425, agility: 445 }
    },
    maxEnhanced: {
      overall: 15098,
      baseStats: { shoot: 2721, pass: 2769, dribble: 2917, defense: 2510, physical: 2629, speed: 1940 },
      detailStats: {
        shoot: { finishing: 936, power: 829, composure: 956 },
        pass: { shortPass: 924, longPass: 937, accuracy: 908 },
        dribble: { breakout: 982, keeping: 978, ballTouch: 957 },
        defense: { tackle: 813, interception: 867, marking: 830 },
        physical: { jumping: 829, contact: 877, stamina: 923 },
        speed: { running: 960, agility: 980 }
      }
    },
    playTendencies: {
      attack: 2, defense: -1, dribble: 2, shoot: 1, longShoot: 0,
      shortPass: 0, longPass: -1, throughPass: 0, cutIn: 1, keep: 1,
      delay: -1, rushOut: 1, feint: 2, press: 0
    },
    skill: { name: 'ジャックナイフ', rank: '銀', description: '発動エリア：前左右　/　発動条件：ドリブル時　/　突破力・キープ力UP　/　成功時に自身のシュート発生確率UP' },
    abilities: [
      { name: 'スピードドリブラー', rank: '銀', description: '発動条件：途中出場　/　突破力・走力UP' },
      { name: 'アジャイルターゲット', rank: '銀', description: '発動条件：途中出場　/　キープ力・敏捷性UP' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p269',
    name: '山本桜大(2026TS)',
    readingName: 'やまもと・おうた',
    category: 'MF',
    mainPosition: 'AM',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'カウンター',
    playStyle: 'アタッカー',
    playStyleLevel: 'Ⅱ',
    overall: 6831,
    maxOverall: 14927,
    baseStats: { shoot: 1295, pass: 1151, dribble: 1304, defense: 1084, physical: 1193, speed: 884 },
    detailStats: {
      shoot: { finishing: 456, power: 402, composure: 437 },
      pass: { shortPass: 382, longPass: 362, accuracy: 407 },
      dribble: { breakout: 442, keeping: 444, ballTouch: 418 },
      defense: { tackle: 355, interception: 339, marking: 390 },
      physical: { jumping: 402, contact: 375, stamina: 416 },
      speed: { running: 441, agility: 443 }
    },
    maxEnhanced: {
      overall: 14927,
      baseStats: { shoot: 2840, pass: 2732, dribble: 2873, defense: 2629, physical: 2762, speed: 1918 },
      detailStats: {
        shoot: { finishing: 967, power: 913, composure: 960 },
        pass: { shortPass: 917, longPass: 885, accuracy: 930 },
        dribble: { breakout: 965, keeping: 967, ballTouch: 941 },
        defense: { tackle: 878, interception: 850, marking: 901 },
        physical: { jumping: 913, contact: 898, stamina: 951 },
        speed: { running: 952, agility: 966 }
      }
    },
    playTendencies: {
      attack: 1, defense: 0, dribble: 0, shoot: 1, longShoot: 2,
      shortPass: 0, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: 'ロングキャノン', rank: '銀', description: '発動エリア：前中・中中　/　発動条件：シュート・ロングシュート時　/　決定力・キック力UP' },
    abilities: [
      { name: 'ゴール前の嗅覚', rank: '銀', description: '発動条件：絶好調　/　決定力・敏捷性UP' },
      { name: '冷静なファイター', rank: '銀', description: '発動条件：絶好調　/　冷静さ・スタミナUP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
