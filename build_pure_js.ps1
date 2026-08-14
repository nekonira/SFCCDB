$path = 'c:\Users\nekon\SFCCdeta\src\data\mockData.js'
$utf8NoBom = New-Object System.Text.UTF8Encoding($false)

$js = @"
// mockData.js - Full Clean Player Database
window.INITIAL_PLAYERS = [
  {
    id: 'p01',
    name: 'ペレ',
    readingName: 'ぺれ',
    category: 'FW',
    mainPosition: 'CF',
    subPositions: ['ST'],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'ブラジル',
    policy: 'ポゼッション',
    playStyle: 'ストライカー',
    playStyleLevel: 'Ⅱ',
    overall: 6650,
    maxOverall: 14980,
    baseStats: { shoot: 1350, pass: 1210, dribble: 1320, defense: 850, physical: 1180, speed: 740 },
    detailStats: {
      shoot: { finishing: 460, power: 440, composure: 450 },
      pass: { shortPass: 410, longPass: 390, accuracy: 410 },
      dribble: { breakout: 440, keeping: 430, ballTouch: 450 },
      defense: { tackle: 280, interception: 290, marking: 280 },
      physical: { jumping: 410, contact: 360, stamina: 410 },
      speed: { running: 360, agility: 380 }
    },
    maxEnhanced: {
      overall: 14980,
      baseStats: { shoot: 2980, pass: 2780, dribble: 2950, defense: 2310, physical: 2720, speed: 1840 },
      detailStats: {
        shoot: { finishing: 1010, power: 980, composure: 990 },
        pass: { shortPass: 940, longPass: 910, accuracy: 930 },
        dribble: { breakout: 990, keeping: 970, ballTouch: 990 },
        defense: { tackle: 770, interception: 780, marking: 760 },
        physical: { jumping: 920, contact: 880, stamina: 920 },
        speed: { running: 910, agility: 930 }
      }
    },
    playTendencies: {
      attack: 2, defense: -1, dribble: 2, shoot: 2, longShoot: 1,
      shortPass: 0, longPass: -1, throughPass: 1, cutIn: 1, keep: 1,
      delay: -1, rushOut: 2, feint: 2, press: 0
    },
    skill: { name: '伝説のフットボール', rank: '金', description: '神に選ばれしフットボールスキルで全てのDFを置き去りにする' },
    abilities: [
      { name: 'サッカーの王様', rank: '金', description: '全てのオフェンス能力が大幅に上昇し決定的な瞬間を創出する' },
      { name: '神領域のボールタッチ', rank: '金', description: '吸い付くようなファーストタッチで相手のプレスを即座に無力化する' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p127',
    name: '早川友基(2026)',
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
    overall: 6451,
    maxOverall: 14746,
    baseStats: { shoot: 843, pass: 1060, dribble: 982, defense: 1278, physical: 1118, speed: 718 },
    detailStats: {
      shoot: { finishing: 270, power: 276, composure: 297 },
      pass: { shortPass: 347, longPass: 358, accuracy: 355 },
      dribble: { breakout: 340, keeping: 313, ballTouch: 329 },
      defense: { tackle: 440, interception: 423, marking: 415 },
      physical: { jumping: 405, contact: 374, stamina: 339 },
      speed: { running: 344, agility: 374 }
    },
    maxEnhanced: {
      overall: 14746,
      baseStats: { shoot: 2304, pass: 2665, dribble: 2443, defense: 2883, physical: 2711, speed: 1740 },
      detailStats: {
        shoot: { finishing: 757, power: 763, composure: 784 },
        pass: { shortPass: 882, longPass: 893, accuracy: 890 },
        dribble: { breakout: 827, keeping: 800, ballTouch: 816 },
        defense: { tackle: 975, interception: 958, marking: 950 },
        physical: { jumping: 940, contact: 909, stamina: 862 },
        speed: { running: 855, agility: 885 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -2, shoot: -1, longShoot: -1,
      shortPass: -1, longPass: 1, throughPass: -1, cutIn: -1, keep: -1,
      delay: -1, rushOut: -1, feint: -1, press: -1
    },
    skill: { name: '驚異的なセービング', rank: '銅', description: '驚異的な反応速度と跳躍力で至近距離からのシュートを防ぎきる' },
    abilities: [
      { name: '上空の守護神', rank: '銀', description: 'ハイボールや空中戦の競り合いで絶対的な存在感を発揮しキャッチ・パンチング排除する' },
      { name: '激情的キック', rank: '銀', description: '正確かつ強烈なパントキックやロングフィードで一気に攻撃の基点を創出する' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p128',
    name: '川島永嗣(2026)',
    readingName: 'かわしまえいじ',
    category: 'GK',
    mainPosition: 'GK',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'ポゼッション',
    playStyle: 'オーソドックスGK',
    playStyleLevel: 'Ⅱ',
    overall: 6412,
    maxOverall: 14710,
    baseStats: { shoot: 852, pass: 853, dribble: 969, defense: 1259, physical: 1184, speed: 760 },
    detailStats: {
      shoot: { finishing: 274, power: 290, composure: 288 },
      pass: { shortPass: 291, longPass: 282, accuracy: 280 },
      dribble: { breakout: 326, keeping: 318, ballTouch: 325 },
      defense: { tackle: 428, interception: 418, marking: 413 },
      physical: { jumping: 418, contact: 411, stamina: 355 },
      speed: { running: 359, agility: 401 }
    },
    maxEnhanced: {
      overall: 14710,
      baseStats: { shoot: 2313, pass: 2478, dribble: 2430, defense: 2864, physical: 2777, speed: 1782 },
      detailStats: {
        shoot: { finishing: 761, power: 777, composure: 775 },
        pass: { shortPass: 826, longPass: 817, accuracy: 815 },
        dribble: { breakout: 813, keeping: 805, ballTouch: 812 },
        defense: { tackle: 963, interception: 953, marking: 948 },
        physical: { jumping: 953, contact: 946, stamina: 878 },
        speed: { running: 870, agility: 912 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -2, shoot: -1, longShoot: -1,
      shortPass: -1, longPass: 1, throughPass: -1, cutIn: -1, keep: -1,
      delay: -1, rushOut: -1, feint: -1, press: -1
    },
    skill: { name: '驚異的なセービング', rank: '銅', description: '驚異的な反応速度と跳躍力で至近距離からのシュートを防ぎきる' },
    abilities: [
      { name: '広域の守護神', rank: '銀', description: '広大なカバーエリアを誇りゴールマウスを鉄壁に守り抜く' },
      { name: '冷静沈着', rank: '銀', description: 'どんなピンチでもパニックにならず冷静な判断でゴール前を守る' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p129',
    name: '前川黛也(2026)',
    readingName: 'まえかわだいや',
    category: 'GK',
    mainPosition: 'GK',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'カウンター',
    playStyle: 'オーソドックスGK',
    playStyleLevel: 'Ⅱ',
    overall: 6418,
    maxOverall: 14716,
    baseStats: { shoot: 816, pass: 1046, dribble: 962, defense: 1253, physical: 1146, speed: 739 },
    detailStats: {
      shoot: { finishing: 260, power: 306, composure: 250 },
      pass: { shortPass: 337, longPass: 366, accuracy: 343 },
      dribble: { breakout: 314, keeping: 326, ballTouch: 322 },
      defense: { tackle: 429, interception: 412, marking: 412 },
      physical: { jumping: 418, contact: 366, stamina: 362 },
      speed: { running: 349, agility: 390 }
    },
    maxEnhanced: {
      overall: 14716,
      baseStats: { shoot: 2277, pass: 2651, dribble: 2423, defense: 2858, physical: 2739, speed: 1761 },
      detailStats: {
        shoot: { finishing: 747, power: 793, composure: 737 },
        pass: { shortPass: 872, longPass: 901, accuracy: 878 },
        dribble: { breakout: 801, keeping: 813, ballTouch: 809 },
        defense: { tackle: 964, interception: 947, marking: 947 },
        physical: { jumping: 953, contact: 901, stamina: 885 },
        speed: { running: 860, agility: 901 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -2, shoot: -1, longShoot: -1,
      shortPass: -1, longPass: 1, throughPass: -1, cutIn: -1, keep: -1,
      delay: -1, rushOut: -1, feint: -1, press: -1
    },
    skill: { name: '驚異的なセービング', rank: '銅', description: '驚異的な反応速度と跳躍力で至近距離からのシュートを防ぎきる' },
    abilities: [
      { name: '広域の守護神', rank: '銀', description: '広大なカバーエリアを誇りゴールマウスを鉄壁に守り抜く' },
      { name: '全方向の守護', rank: '銀', description: 'あらゆる角度からの攻撃やシュートに対して隙のないポジショニングでゴールを死守する' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p130',
    name: 'シュミット・ダニエル(2026)',
    readingName: 'しゅみっとだにえる',
    category: 'GK',
    mainPosition: 'GK',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'カウンター',
    playStyle: 'オーソドックスGK',
    playStyleLevel: 'Ⅱ',
    overall: 6414,
    maxOverall: 14717,
    baseStats: { shoot: 812, pass: 981, dribble: 870, defense: 1259, physical: 1210, speed: 729 },
    detailStats: {
      shoot: { finishing: 260, power: 312, composure: 240 },
      pass: { shortPass: 316, longPass: 334, accuracy: 331 },
      dribble: { breakout: 310, keeping: 300, ballTouch: 260 },
      defense: { tackle: 429, interception: 418, marking: 412 },
      physical: { jumping: 420, contact: 418, stamina: 372 },
      speed: { running: 339, agility: 390 }
    },
    maxEnhanced: {
      overall: 14717,
      baseStats: { shoot: 2273, pass: 2586, dribble: 2331, defense: 2864, physical: 2803, speed: 1751 },
      detailStats: {
        shoot: { finishing: 747, power: 799, composure: 727 },
        pass: { shortPass: 851, longPass: 869, accuracy: 866 },
        dribble: { breakout: 797, keeping: 787, ballTouch: 747 },
        defense: { tackle: 964, interception: 953, marking: 947 },
        physical: { jumping: 955, contact: 953, stamina: 895 },
        speed: { running: 850, agility: 901 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -2, shoot: -1, longShoot: -1,
      shortPass: -1, longPass: 1, throughPass: -1, cutIn: -1, keep: -1,
      delay: -1, rushOut: -1, feint: -1, press: -1
    },
    skill: { name: 'コントロールフィード', rank: '銅', description: '正確なコントロールとフォームから高精度のロングフィードを供給する' },
    abilities: [
      { name: '上空の守護神', rank: '銀', description: 'ハイボールや空中戦の競り合いで絶対的な存在感を発揮しキャッチ・パンチング排除する' },
      { name: '最後方のキッカー', rank: '銀', description: '自陣深くから前線へ正確無比なキックを供給し一気にカウンターの起点となる' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p131',
    name: '東口順昭(2026)',
    readingName: 'ひがしぐちまさあき',
    category: 'GK',
    mainPosition: 'GK',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'ポゼッション',
    playStyle: 'オーソドックスGK',
    playStyleLevel: 'Ⅱ',
    overall: 6527,
    maxOverall: 14854,
    baseStats: { shoot: 907, pass: 1014, dribble: 808, defense: 1264, physical: 1164, speed: 757 },
    detailStats: {
      shoot: { finishing: 288, power: 300, composure: 319 },
      pass: { shortPass: 310, longPass: 356, accuracy: 348 },
      dribble: { breakout: 338, keeping: 259, ballTouch: 211 },
      defense: { tackle: 408, interception: 430, marking: 426 },
      physical: { jumping: 401, contact: 371, stamina: 392 },
      speed: { running: 356, agility: 401 }
    },
    maxEnhanced: {
      overall: 14854,
      baseStats: { shoot: 2368, pass: 2619, dribble: 2269, defense: 2869, physical: 2757, speed: 1779 },
      detailStats: {
        shoot: { finishing: 775, power: 787, composure: 806 },
        pass: { shortPass: 845, longPass: 891, accuracy: 883 },
        dribble: { breakout: 825, keeping: 746, ballTouch: 698 },
        defense: { tackle: 943, interception: 965, marking: 961 },
        physical: { jumping: 936, contact: 906, stamina: 915 },
        speed: { running: 867, agility: 912 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -2, shoot: -1, longShoot: -1,
      shortPass: -1, longPass: 1, throughPass: -1, cutIn: -1, keep: -1,
      delay: -1, rushOut: -1, feint: -1, press: -1
    },
    skill: { name: '驚異的なセービング', rank: '銅', description: '驚異的な反応速度と跳躍力で至近距離からのシュートを防ぎきる' },
    abilities: [
      { name: '不動の守護神', rank: '銀', description: 'ゴール前に仁王立ちし相手の決定的なシュートを立ち塞がって防ぐ' },
      { name: '全方位への飛び出し', rank: '銀', description: 'あらゆる角度からのスルーパスやクロスに対して迅速に飛び出して処理する' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p132',
    name: '小島亨介(2026)',
    readingName: 'こじまりょうすけ',
    category: 'GK',
    mainPosition: 'GK',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'ムービング',
    playStyle: 'オーソドックスGK',
    playStyleLevel: 'Ⅱ',
    overall: 6415,
    maxOverall: 14724,
    baseStats: { shoot: 824, pass: 1033, dribble: 876, defense: 1251, physical: 1164, speed: 730 },
    detailStats: {
      shoot: { finishing: 274, power: 306, composure: 244 },
      pass: { shortPass: 354, longPass: 373, accuracy: 306 },
      dribble: { breakout: 346, keeping: 296, ballTouch: 234 },
      defense: { tackle: 430, interception: 414, marking: 407 },
      physical: { jumping: 413, contact: 368, stamina: 383 },
      speed: { running: 339, agility: 391 }
    },
    maxEnhanced: {
      overall: 14724,
      baseStats: { shoot: 2285, pass: 2638, dribble: 2337, defense: 2856, physical: 2757, speed: 1752 },
      detailStats: {
        shoot: { finishing: 761, power: 793, composure: 731 },
        pass: { shortPass: 889, longPass: 908, accuracy: 841 },
        dribble: { breakout: 833, keeping: 783, ballTouch: 721 },
        defense: { tackle: 965, interception: 949, marking: 942 },
        physical: { jumping: 948, contact: 903, stamina: 906 },
        speed: { running: 850, agility: 902 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -2, shoot: -1, longShoot: -1,
      shortPass: -1, longPass: 1, throughPass: -1, cutIn: -1, keep: -1,
      delay: -1, rushOut: -1, feint: -1, press: -1
    },
    skill: { name: '驚異的なセービング', rank: '銅', description: '驚異的な反応速度と跳躍力で至近距離からのシュートを防ぎきる' },
    abilities: [
      { name: '広域の守護神', rank: '銀', description: '広大なカバーエリアを誇りゴールマウスを鉄壁に守り抜く' },
      { name: '競り合うロングパサー', rank: '銀', description: '相手のプレッシャーや競り合いの中でも体勢を崩さず正確なロングパッシングを前線に届ける' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p133',
    name: 'マテウス(2026)',
    readingName: 'まてうす',
    category: 'GK',
    mainPosition: 'GK',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'ブラジル',
    policy: 'ムービング',
    playStyle: 'オーソドックスGK',
    playStyleLevel: 'Ⅱ',
    overall: 6402,
    maxOverall: 14702,
    baseStats: { shoot: 830, pass: 847, dribble: 1034, defense: 1244, physical: 1164, speed: 794 },
    detailStats: {
      shoot: { finishing: 257, power: 288, composure: 285 },
      pass: { shortPass: 273, longPass: 287, accuracy: 287 },
      dribble: { breakout: 375, keeping: 327, ballTouch: 332 },
      defense: { tackle: 422, interception: 422, marking: 400 },
      physical: { jumping: 465, contact: 383, stamina: 316 },
      speed: { running: 347, agility: 447 }
    },
    maxEnhanced: {
      overall: 14702,
      baseStats: { shoot: 2291, pass: 2452, dribble: 2495, defense: 2849, physical: 2757, speed: 1816 },
      detailStats: {
        shoot: { finishing: 744, power: 775, composure: 772 },
        pass: { shortPass: 808, longPass: 822, accuracy: 822 },
        dribble: { breakout: 862, keeping: 814, ballTouch: 819 },
        defense: { tackle: 957, interception: 957, marking: 935 },
        physical: { jumping: 1000, contact: 918, stamina: 839 },
        speed: { running: 858, agility: 958 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -2, shoot: -1, longShoot: -1,
      shortPass: -1, longPass: 1, throughPass: -1, cutIn: -1, keep: -1,
      delay: -1, rushOut: -1, feint: -1, press: -1
    },
    skill: { name: '驚異的なセービング', rank: '銅', description: '驚異的な反応速度と跳躍力で至近距離からのシュートを防ぎきる' },
    abilities: [
      { name: '上空の守護神', rank: '銀', description: 'ハイボールや空中戦の競り合いで絶対的な存在感を発揮しキャッチ・パンチング排除する' },
      { name: '超反応', rank: '銀', description: '至近距離からのシュートに対して超人的なレスポンスで反応し失点を防ぐ' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p134',
    name: '林彰洋(2026)',
    readingName: 'はやしあきひろ',
    category: 'GK',
    mainPosition: 'GK',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'リアクション',
    playStyle: 'オーソドックスGK',
    playStyleLevel: 'Ⅱ',
    overall: 6365,
    maxOverall: 14668,
    baseStats: { shoot: 871, pass: 1047, dribble: 970, defense: 1202, physical: 1129, speed: 724 },
    detailStats: {
      shoot: { finishing: 287, power: 297, composure: 287 },
      pass: { shortPass: 328, longPass: 358, accuracy: 361 },
      dribble: { breakout: 332, keeping: 316, ballTouch: 322 },
      defense: { tackle: 428, interception: 377, marking: 397 },
      physical: { jumping: 441, contact: 388, stamina: 300 },
      speed: { running: 343, agility: 381 }
    },
    maxEnhanced: {
      overall: 14668,
      baseStats: { shoot: 2332, pass: 2652, dribble: 2431, defense: 2807, physical: 2722, speed: 1746 },
      detailStats: {
        shoot: { finishing: 774, power: 784, composure: 774 },
        pass: { shortPass: 863, longPass: 893, accuracy: 896 },
        dribble: { breakout: 819, keeping: 803, ballTouch: 809 },
        defense: { tackle: 963, interception: 912, marking: 932 },
        physical: { jumping: 976, contact: 923, stamina: 823 },
        speed: { running: 854, agility: 892 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -2, shoot: -1, longShoot: -1,
      shortPass: -1, longPass: 1, throughPass: -1, cutIn: -1, keep: -1,
      delay: -1, rushOut: -1, feint: -1, press: -1
    },
    skill: { name: '驚異的なセービング', rank: '銅', description: '驚異的な反応速度と跳躍力で至近距離からのシュートを防ぎきる' },
    abilities: [
      { name: '全方位への飛び出し', rank: '銀', description: 'あらゆる角度からのスルーパスやクロスに対して迅速に飛び出して処理する' },
      { name: '最後方のキッカー', rank: '銀', description: '自陣深くから前線へ正確無比なキックを供給し一気にカウンターの起点となる' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p135',
    name: '太田岳志(2026)',
    readingName: 'おおたがくじ',
    category: 'GK',
    mainPosition: 'GK',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'カウンター',
    playStyle: 'オーソドックスGK',
    playStyleLevel: 'Ⅱ',
    overall: 6455,
    maxOverall: 14783,
    baseStats: { shoot: 914, pass: 1124, dribble: 845, defense: 1222, physical: 967, speed: 772 },
    detailStats: {
      shoot: { finishing: 320, power: 282, composure: 312 },
      pass: { shortPass: 367, longPass: 384, accuracy: 373 },
      dribble: { breakout: 329, keeping: 259, ballTouch: 257 },
      defense: { tackle: 431, interception: 391, marking: 400 },
      physical: { jumping: 402, contact: 388, stamina: 177 },
      speed: { running: 372, agility: 400 }
    },
    maxEnhanced: {
      overall: 14783,
      baseStats: { shoot: 2375, pass: 2729, dribble: 2306, defense: 2827, physical: 2560, speed: 1794 },
      detailStats: {
        shoot: { finishing: 807, power: 769, composure: 799 },
        pass: { shortPass: 902, longPass: 919, accuracy: 908 },
        dribble: { breakout: 816, keeping: 746, ballTouch: 744 },
        defense: { tackle: 966, interception: 926, marking: 935 },
        physical: { jumping: 937, contact: 923, stamina: 700 },
        speed: { running: 883, agility: 911 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -2, shoot: -1, longShoot: -1,
      shortPass: -1, longPass: 1, throughPass: -1, cutIn: -1, keep: -1,
      delay: -1, rushOut: -1, feint: -1, press: -1
    },
    skill: { name: '驚異的なセービング', rank: '銅', description: '驚異的な反応速度と跳躍力で至近距離からのシュートを防ぎきる' },
    abilities: [
      { name: '広域の守護神', rank: '銀', description: '広大なカバーエリアを誇りゴールマウスを鉄壁に守り抜く' },
      { name: '全方向の守護', rank: '銀', description: 'あらゆる角度からの攻撃やシュートに対して隙のないポジショニングでゴールを死守する' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p136',
    name: '後藤雅明(2026)',
    readingName: 'ごとうまさあき',
    category: 'GK',
    mainPosition: 'GK',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'リアクション',
    playStyle: 'オーソドックスGK',
    playStyleLevel: 'Ⅱ',
    overall: 6390,
    maxOverall: 14710,
    baseStats: { shoot: 970, pass: 767, dribble: 930, defense: 1239, physical: 1158, speed: 743 },
    detailStats: {
      shoot: { finishing: 273, power: 390, composure: 307 },
      pass: { shortPass: 251, longPass: 262, accuracy: 254 },
      dribble: { breakout: 373, keeping: 302, ballTouch: 255 },
      defense: { tackle: 404, interception: 415, marking: 420 },
      physical: { jumping: 435, contact: 395, stamina: 328 },
      speed: { running: 330, agility: 413 }
    },
    maxEnhanced: {
      overall: 14710,
      baseStats: { shoot: 2431, pass: 2372, dribble: 2391, defense: 2844, physical: 2751, speed: 1765 },
      detailStats: {
        shoot: { finishing: 760, power: 877, composure: 794 },
        pass: { shortPass: 786, longPass: 797, accuracy: 789 },
        dribble: { breakout: 860, keeping: 789, ballTouch: 742 },
        defense: { tackle: 939, interception: 950, marking: 955 },
        physical: { jumping: 970, contact: 930, stamina: 851 },
        speed: { running: 841, agility: 924 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -2, shoot: -1, longShoot: -1,
      shortPass: -1, longPass: 1, throughPass: -1, cutIn: -1, keep: -1,
      delay: -1, rushOut: -1, feint: -1, press: -1
    },
    skill: { name: 'コントロールフィード', rank: '銅', description: '正確なコントロールとフォームから高精度のロングフィードを供給する' },
    abilities: [
      { name: '上空の守護神', rank: '銀', description: 'ハイボールや空中戦の競り合いで絶対的な存在感を発揮しキャッチ・パンチング排除する' },
      { name: '冷静沈着', rank: '銀', description: 'どんなピンチでもパニックにならず冷静な判断でゴール前を守る' }
    ],
    avatarUrl: ''
  },
  {
    id: 'p137',
    name: 'レナート・モーザー(2026)',
    readingName: 'れなーともーざー',
    category: 'GK',
    mainPosition: 'GK',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'ドイツ',
    policy: 'カウンター',
    playStyle: 'オーソドックスGK',
    playStyleLevel: 'Ⅱ',
    overall: 6298,
    maxOverall: 14590,
    baseStats: { shoot: 926, pass: 962, dribble: 864, defense: 1213, physical: 1177, speed: 674 },
    detailStats: {
      shoot: { finishing: 286, power: 340, composure: 300 },
      pass: { shortPass: 287, longPass: 337, accuracy: 338 },
      dribble: { breakout: 298, keeping: 279, ballTouch: 287 },
      defense: { tackle: 438, interception: 392, marking: 383 },
      physical: { jumping: 465, contact: 374, stamina: 338 },
      speed: { running: 280, agility: 394 }
    },
    maxEnhanced: {
      overall: 14590,
      baseStats: { shoot: 2387, pass: 2567, dribble: 2325, defense: 2818, physical: 2770, speed: 1696 },
      detailStats: {
        shoot: { finishing: 773, power: 827, composure: 787 },
        pass: { shortPass: 822, longPass: 872, accuracy: 873 },
        dribble: { breakout: 785, keeping: 766, ballTouch: 774 },
        defense: { tackle: 973, interception: 927, marking: 918 },
        physical: { jumping: 1000, contact: 909, stamina: 861 },
        speed: { running: 791, agility: 905 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -2, shoot: -1, longShoot: -1,
      shortPass: -1, longPass: 1, throughPass: -1, cutIn: -1, keep: -1,
      delay: -1, rushOut: -1, feint: -1, press: -1
    },
    skill: { name: '驚異的なセービング', rank: '銅', description: '驚異的な反応速度と跳躍力で至近距離からのシュートを防ぎきる' },
    abilities: [
      { name: '全方向の守護', rank: '銀', description: 'あらゆる角度からの攻撃やシュートに対して隙のないポジショニングでゴールを死守する' },
      { name: 'パワーアジリティ', rank: '銀', description: 'フィジカルの強さと敏捷性を兼ね備え相手攻撃を防ぐ' }
    ],
    avatarUrl: ''
  }
];
"@

[System.IO.File]::WriteAllText($path, $js, $utf8NoBom)
Write-Host "mockData.js perfectly generated and formatted in UTF-8!"
