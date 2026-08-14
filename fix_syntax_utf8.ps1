$path = "c:\Users\nekon\SFCCdeta\src\data\mockData.js"
$utf8 = New-Object System.Text.UTF8Encoding($false)

# 1. 元のファイルをUTF-8として読込
$rawText = [System.IO.File]::ReadAllText($path, $utf8)

# 2. p137の直後（p138の手前）までのインデックスを探す
$splitMarker = "id: 'p137',"
$markerIndex = $rawText.IndexOf($splitMarker)

if ($markerIndex -gt 0) {
    # p137ブロックの終了（avatarUrl: '' の後の }, ）を探す
    $p137End = $rawText.IndexOf("avatarUrl: ''", $markerIndex)
    if ($p137End -gt 0) {
        $p137BlockEnd = $rawText.IndexOf("},", $p137End) + 2
        $validHead = $rawText.Substring(0, $p137BlockEnd)
        
        $cleanTail = @"

    {
      id: 'p138',
      name: 'パブロ・サバグ(K1 BEST11 2025)',
      readingName: 'ぱぶろさばぐ',
      category: 'FW',
      mainPosition: 'CF',
      subPositions: [],
      rarity: '☆3',
      baseRarity: '☆3',
      nationality: 'シリア',
      policy: 'リアクション',
      playStyle: 'ラインブレーカー',
      playStyleLevel: 'Ⅱ',
      overall: 6128,
      maxOverall: 14356,
      baseStats: { shoot: 1147, pass: 1162, dribble: 1172, defense: 928, physical: 1036, speed: 805 },
      detailStats: {
        shoot: { finishing: 413, power: 330, composure: 404 },
        pass: { shortPass: 399, longPass: 389, accuracy: 374 },
        dribble: { breakout: 398, keeping: 395, ballTouch: 379 },
        defense: { tackle: 309, interception: 314, marking: 305 },
        physical: { jumping: 420, contact: 241, stamina: 375 },
        speed: { running: 411, agility: 394 }
      },
      maxEnhanced: {
        overall: 14356,
        baseStats: { shoot: 2752, pass: 2695, dribble: 2753, defense: 2425, physical: 2617, speed: 1851 },
        detailStats: {
          shoot: { finishing: 948, power: 865, composure: 939 },
          pass: { shortPass: 910, longPass: 900, accuracy: 885 },
          dribble: { breakout: 921, keeping: 918, ballTouch: 914 },
          defense: { tackle: 808, interception: 813, marking: 804 },
          physical: { jumping: 943, contact: 776, stamina: 898 },
          speed: { running: 934, agility: 917 }
        }
      },
      playTendencies: {
        attack: 2, defense: -1, dribble: 0, shoot: 2, longShoot: 1,
        shortPass: -1, longPass: -1, throughPass: -1, cutIn: 0, keep: -1,
        delay: -1, rushOut: 2, feint: 0, press: 0
      },
      skill: { name: '狙いすましたシュート', rank: '銅', description: 'コースを突いたコントロールシュートで確実にネットを揺らす' },
      abilities: [
        { name: '裏への飛び出し', rank: '銀', description: '相手DFラインの背後へ絶妙なタイミングで飛び出し決定機を迎える' },
        { name: '冷静な突破', rank: '銀', description: 'プレッシャーがかかる場面でも冷静に相手DFの隙を突いて突破する' }
      ],
      avatarUrl: ''
    },
    {
      id: 'p139',
      name: 'ソン・ミンギュ(K1 BEST11 2025)',
      readingName: 'そんみんぎゅ',
      category: 'FW',
      mainPosition: 'LW',
      subPositions: [],
      rarity: '☆3',
      baseRarity: '☆3',
      nationality: '韓国',
      policy: 'ポゼッション',
      playStyle: 'サイドアタッカー',
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
        attack: 1, defense: -1, dribble: 1, shoot: 0, longShoot: 0,
        shortPass: 0, longPass: 0, throughPass: 0, cutIn: -1, keep: 0,
        delay: -1, rushOut: 2, feint: 1, press: 0
      },
      skill: { name: '華麗なトラップ', rank: '銅', description: '高い足元の技術でパスを正確かつ吸い付くように収める' },
      abilities: [
        { name: 'ゴール前の落ち着き', rank: '銀', description: 'プレッシャーがかかる場面でも冷静沈着にプレーし得点機会を活かす' },
        { name: '冷静なファイター', rank: '銀', description: '激しい局面でも冷静さを保ちつつタフに戦い抜く' }
      ],
      avatarUrl: ''
    },
    {
      id: 'p140',
      name: 'イ・ドンギョン(K1 BEST11 2025)',
      readingName: 'いどんぎょん',
      category: 'MF',
      mainPosition: 'AM',
      subPositions: [],
      rarity: '☆3',
      baseRarity: '☆3',
      nationality: '韓国',
      policy: 'リアクション',
      playStyle: 'アタッカー',
      playStyleLevel: 'Ⅱ',
      overall: 6214,
      maxOverall: 14299,
      baseStats: { shoot: 1095, pass: 1160, dribble: 1234, defense: 1059, physical: 927, speed: 850 },
      detailStats: {
        shoot: { finishing: 376, power: 354, composure: 365 },
        pass: { shortPass: 377, longPass: 378, accuracy: 405 },
        dribble: { breakout: 416, keeping: 402, ballTouch: 416 },
        defense: { tackle: 345, interception: 363, marking: 351 },
        physical: { jumping: 263, contact: 323, stamina: 341 },
        speed: { running: 403, agility: 447 }
      },
      maxEnhanced: {
        overall: 14299,
        baseStats: { shoot: 2640, pass: 2741, dribble: 2803, defense: 2604, physical: 2496, speed: 1884 },
        detailStats: {
          shoot: { finishing: 887, power: 865, composure: 888 },
          pass: { shortPass: 912, longPass: 901, accuracy: 928 },
          dribble: { breakout: 939, keeping: 925, ballTouch: 939 },
          defense: { tackle: 868, interception: 874, marking: 862 },
          physical: { jumping: 774, contact: 846, stamina: 876 },
          speed: { running: 914, agility: 970 }
        }
      },
      playTendencies: {
        attack: 0, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
        shortPass: 1, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
        delay: 0, rushOut: -1, feint: 0, press: 0
      },
      skill: { name: '確信のロングシュート', rank: '銅', description: 'ゴールまでの距離を見極め確信を持って強烈なミドルシュートを叩き込む' },
      abilities: [
        { name: 'スピードドリブラー', rank: '銀', description: '圧倒的なスピードを活かしたドリブルで相手DFを一気に置き去りにする' },
        { name: '俊敏なキッカー', rank: '銀', description: '素早い身のこなしからテンポ良く精度の高いシュートやパスを繰り出す' }
      ],
      avatarUrl: ''
    },
    {
      id: 'p141',
      name: 'カン・サンユン(K1 BEST11 2025)',
      readingName: 'かんさんゆん',
      category: 'MF',
      mainPosition: 'AM',
      subPositions: [],
      rarity: '☆3',
      baseRarity: '☆3',
      nationality: '韓国',
      policy: 'ポゼッション',
      playStyle: 'アタッカー',
      playStyleLevel: 'Ⅱ',
      overall: 6138,
      maxOverall: 14229,
      baseStats: { shoot: 1023, pass: 1106, dribble: 1225, defense: 1023, physical: 1090, speed: 831 },
      detailStats: {
        shoot: { finishing: 333, power: 349, composure: 341 },
        pass: { shortPass: 366, longPass: 374, accuracy: 366 },
        dribble: { breakout: 420, keeping: 405, ballTouch: 400 },
        defense: { tackle: 313, interception: 358, marking: 352 },
        physical: { jumping: 317, contact: 379, stamina: 394 },
        speed: { running: 383, agility: 448 }
      },
      maxEnhanced: {
        overall: 14229,
        baseStats: { shoot: 2568, pass: 2687, dribble: 2794, defense: 2568, physical: 2659, speed: 1865 },
        detailStats: {
          shoot: { finishing: 844, power: 860, composure: 864 },
          pass: { shortPass: 901, longPass: 897, accuracy: 889 },
          dribble: { breakout: 943, keeping: 928, ballTouch: 923 },
          defense: { tackle: 836, interception: 869, marking: 863 },
          physical: { jumping: 828, contact: 902, stamina: 929 },
          speed: { running: 894, agility: 971 }
        }
      },
      playTendencies: {
        attack: 0, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
        shortPass: 1, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
        delay: 0, rushOut: -1, feint: 0, press: 0
      },
      skill: { name: '強引な中央突破', rank: '銅', description: '中央エリアで強引なドリブルを仕掛け相手守備陣を打ち破る' },
      abilities: [
        { name: '技巧派ドリブラー', rank: '銀', description: '巧みなボディコントロールと足元の技術で相手を鮮やかにかわす' },
        { name: 'アジャイルターゲット', rank: '銀', description: '敏捷な身のこなしでマークを外しフリーでボールを引き出す' }
      ],
      avatarUrl: ''
    },
    {
      id: 'p142',
      name: 'キム・ジンギュ(K1 BEST11 2025)',
      readingName: 'きむじんぎゅ',
      category: 'MF',
      mainPosition: 'DM',
      subPositions: [],
      rarity: '☆3',
      baseRarity: '☆3',
      nationality: '韓国',
      policy: 'ポゼッション',
      playStyle: 'パサーDM',
      playStyleLevel: 'Ⅱ',
      overall: 6081,
      maxOverall: 14252,
      baseStats: { shoot: 1059, pass: 1167, dribble: 1135, defense: 1015, physical: 1060, speed: 827 },
      detailStats: {
        shoot: { finishing: 355, power: 350, composure: 354 },
        pass: { shortPass: 392, longPass: 383, accuracy: 392 },
        dribble: { breakout: 379, keeping: 386, ballTouch: 370 },
        defense: { tackle: 325, interception: 351, marking: 339 },
        physical: { jumping: 327, contact: 355, stamina: 378 },
        speed: { running: 410, agility: 417 }
      },
      maxEnhanced: {
        overall: 14252,
        baseStats: { shoot: 2604, pass: 2772, dribble: 2668, defense: 2596, physical: 2629, speed: 1849 },
        detailStats: {
          shoot: { finishing: 866, power: 861, composure: 877 },
          pass: { shortPass: 927, longPass: 918, accuracy: 927 },
          dribble: { breakout: 890, keeping: 897, ballTouch: 881 },
          defense: { tackle: 860, interception: 874, marking: 862 },
          physical: { jumping: 838, contact: 878, stamina: 913 },
          speed: { running: 921, agility: 928 }
        }
      },
      playTendencies: {
        attack: 0, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
        shortPass: 1, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
        delay: 0, rushOut: -1, feint: 0, press: 0
      },
      skill: { name: '正確なパスコントロール', rank: '銅', description: '正確なコントロールで味方の足元にピタリと合わせるパスを供給する' },
      abilities: [
        { name: '広域の司令塔', rank: '銀', description: 'ピッチ全域を見渡しゲームの組み立てを統率する' },
        { name: '展開の起点', rank: '銀', description: '攻撃のスイッチを入れる縦パスを前線に送り込む' }
      ],
      avatarUrl: ''
    },
    {
      id: 'p143',
      name: 'パク・ジンソク(K1 BEST11 2025)',
      readingName: 'ぱくじんそく',
      category: 'DF',
      mainPosition: 'CB',
      subPositions: [],
      rarity: '☆3',
      baseRarity: '☆3',
      nationality: '韓国',
      policy: 'カウンター',
      playStyle: 'ハードタッカー',
      playStyleLevel: 'Ⅱ',
      overall: 6112,
      maxOverall: 14240,
      baseStats: { shoot: 850, pass: 980, dribble: 950, defense: 1250, physical: 1210, speed: 872 },
      detailStats: {
        shoot: { finishing: 270, power: 300, composure: 280 },
        pass: { shortPass: 330, longPass: 330, accuracy: 320 },
        dribble: { breakout: 310, keeping: 320, ballTouch: 320 },
        defense: { tackle: 420, interception: 415, marking: 415 },
        physical: { jumping: 410, contact: 410, stamina: 390 },
        speed: { running: 420, agility: 452 }
      },
      maxEnhanced: {
        overall: 14240,
        baseStats: { shoot: 2310, pass: 2510, dribble: 2470, defense: 2830, physical: 2760, speed: 1860 },
        detailStats: {
          shoot: { finishing: 760, power: 780, composure: 770 },
          pass: { shortPass: 830, longPass: 840, accuracy: 840 },
          dribble: { breakout: 820, keeping: 830, ballTouch: 820 },
          defense: { tackle: 950, interception: 940, marking: 940 },
          physical: { jumping: 930, contact: 930, stamina: 900 },
          speed: { running: 910, agility: 950 }
        }
      },
      playTendencies: {
        attack: -1, defense: 2, dribble: -1, shoot: -1, longShoot: -1,
        shortPass: 0, longPass: 1, throughPass: -1, cutIn: -1, keep: -1,
        delay: 1, rushOut: 0, feint: -1, press: 2
      },
      skill: { name: '強力なタックル', rank: '銅', description: '強烈な身体接触で相手から強引にボールを奪い取る' },
      abilities: [
        { name: 'エアバトルマスター', rank: '銀', description: '高いジャンプ力と競り合いの強さでハイボールを制圧する' },
        { name: '鉄壁のディフェンス', rank: '銀', description: 'ゴール前で隙を見せず相手のシュートやパスを徹底的に阻止する' }
      ],
      avatarUrl: ''
    },
    {
      id: 'p144',
      name: 'ホン・ジョンホ(K1 BEST11 2025)',
      readingName: 'ほんじょんほ',
      category: 'DF',
      mainPosition: 'CB',
      subPositions: [],
      rarity: '☆3',
      baseRarity: '☆3',
      nationality: '韓国',
      policy: 'ポゼッション',
      playStyle: 'ハードタッカー',
      playStyleLevel: 'Ⅱ',
      overall: 6150,
      maxOverall: 14280,
      baseStats: { shoot: 860, pass: 1000, dribble: 960, defense: 1260, physical: 1220, speed: 850 },
      detailStats: {
        shoot: { finishing: 280, power: 300, composure: 280 },
        pass: { shortPass: 340, longPass: 330, accuracy: 330 },
        dribble: { breakout: 320, keeping: 320, ballTouch: 320 },
        defense: { tackle: 425, interception: 418, marking: 417 },
        physical: { jumping: 415, contact: 415, stamina: 390 },
        speed: { running: 410, agility: 440 }
      },
      maxEnhanced: {
        overall: 14280,
        baseStats: { shoot: 2330, pass: 2540, dribble: 2490, defense: 2850, physical: 2780, speed: 1830 },
        detailStats: {
          shoot: { finishing: 770, power: 790, composure: 770 },
          pass: { shortPass: 850, longPass: 840, accuracy: 850 },
          dribble: { breakout: 830, keeping: 830, ballTouch: 830 },
          defense: { tackle: 960, interception: 945, marking: 945 },
          physical: { jumping: 940, contact: 940, stamina: 900 },
          speed: { running: 900, agility: 930 }
        }
      },
      playTendencies: {
        attack: -1, defense: 2, dribble: -1, shoot: -1, longShoot: -1,
        shortPass: 0, longPass: 1, throughPass: -1, cutIn: -1, keep: -1,
        delay: 1, rushOut: 0, feint: -1, press: 2
      },
      skill: { name: '正確なインターセプト', rank: '銅', description: '相手のパスコースを読み切って見事にボールをカットする' },
      abilities: [
        { name: 'キャプテンシー', rank: '銀', description: '統率力を発揮しディフェンスライン全体の連携を高める' },
        { name: '広域のカバーリング', rank: '銀', description: '広範囲をカバーし味方DFのサポートと隙の穴埋めを行う' }
      ],
      avatarUrl: ''
    },
    {
      id: 'p145',
      name: 'イ・ミョンジェ(K1 BEST11 2025)',
      readingName: 'いみょんじぇ',
      category: 'DF',
      mainPosition: 'LFB',
      subPositions: [],
      rarity: '☆3',
      baseRarity: '☆3',
      nationality: '韓国',
      policy: 'ムービング',
      playStyle: '攻撃的SB',
      playStyleLevel: 'Ⅱ',
      overall: 6090,
      maxOverall: 14210,
      baseStats: { shoot: 950, pass: 1150, dribble: 1120, defense: 1080, physical: 1050, speed: 840 },
      detailStats: {
        shoot: { finishing: 310, power: 320, composure: 320 },
        pass: { shortPass: 380, longPass: 390, accuracy: 380 },
        dribble: { breakout: 370, keeping: 370, ballTouch: 380 },
        defense: { tackle: 360, interception: 360, marking: 360 },
        physical: { jumping: 340, contact: 350, stamina: 360 },
        speed: { running: 410, agility: 430 }
      },
      maxEnhanced: {
        overall: 14210,
        baseStats: { shoot: 2470, pass: 2750, dribble: 2650, defense: 2610, physical: 2580, speed: 1820 },
        detailStats: {
          shoot: { finishing: 810, power: 830, composure: 830 },
          pass: { shortPass: 920, longPass: 920, accuracy: 910 },
          dribble: { breakout: 880, keeping: 880, ballTouch: 890 },
          defense: { tackle: 870, interception: 870, marking: 870 },
          physical: { jumping: 850, contact: 860, stamina: 870 },
          speed: { running: 900, agility: 920 }
        }
      },
      playTendencies: {
        attack: 1, defense: 0, dribble: 1, shoot: -1, longShoot: 0,
        shortPass: 1, longPass: 1, throughPass: 0, cutIn: 0, keep: 0,
        delay: -1, rushOut: 1, feint: 0, press: 1
      },
      skill: { name: '精度の高いクロス', rank: '銅', description: 'サイドから味方の頭にピタリと合わせる高精度クロスを送る' },
      abilities: [
        { name: 'サイドの支配者', rank: '銀', description: 'タッチライン際を上下動し攻撃と守備の両面で存在感を示す' },
        { name: '高速オーバーラップ', rank: '銀', description: '圧倒的なスピードでサイドを駆け上がり前線のサポートを行う' }
      ],
      avatarUrl: ''
    },
    {
      id: 'p146',
      name: 'キム・ムンファン(K1 BEST11 2025)',
      readingName: 'きむむんはん',
      category: 'DF',
      mainPosition: 'RFB',
      subPositions: [],
      rarity: '☆3',
      baseRarity: '☆3',
      nationality: '韓国',
      policy: 'リアクション',
      playStyle: '攻撃的SB',
      playStyleLevel: 'Ⅱ',
      overall: 6080,
      maxOverall: 14200,
      baseStats: { shoot: 940, pass: 1140, dribble: 1130, defense: 1070, physical: 1060, speed: 850 },
      detailStats: {
        shoot: { finishing: 300, power: 320, composure: 320 },
        pass: { shortPass: 380, longPass: 380, accuracy: 380 },
        dribble: { breakout: 380, keeping: 370, ballTouch: 380 },
        defense: { tackle: 355, interception: 360, marking: 355 },
        physical: { jumping: 340, contact: 360, stamina: 360 },
        speed: { running: 420, agility: 430 }
      },
      maxEnhanced: {
        overall: 14200,
        baseStats: { shoot: 2450, pass: 2730, dribble: 2670, defense: 2590, physical: 2600, speed: 1840 },
        detailStats: {
          shoot: { finishing: 800, power: 820, composure: 830 },
          pass: { shortPass: 910, longPass: 910, accuracy: 910 },
          dribble: { breakout: 890, keeping: 880, ballTouch: 890 },
          defense: { tackle: 860, interception: 870, marking: 860 },
          physical: { jumping: 850, contact: 870, stamina: 880 },
          speed: { running: 910, agility: 930 }
        }
      },
      playTendencies: {
        attack: 1, defense: 0, dribble: 1, shoot: -1, longShoot: 0,
        shortPass: 1, longPass: 1, throughPass: 0, cutIn: 0, keep: 0,
        delay: -1, rushOut: 1, feint: 0, press: 1
      },
      skill: { name: '俊敏なインサイドカット', rank: '銅', description: 'サイドから中央へ俊敏にカットインし攻撃の起点を作る' },
      abilities: [
        { name: 'スタミナモンスター', rank: '銀', description: '試合終了まで衰えない運動量で右サイドを制圧し続ける' },
        { name: '粘り強いディフェンス', rank: '銀', description: '相手ウインガーの突破を粘り強いマーケティングで食い止める' }
      ],
      avatarUrl: ''
    },
    {
      id: 'p147',
      name: 'ソン・ボムグン(K1 BEST11 2025)',
      readingName: 'そんぼむぐん',
      category: 'GK',
      mainPosition: 'GK',
      subPositions: [],
      rarity: '☆3',
      baseRarity: '☆3',
      nationality: '韓国',
      policy: 'リアクション',
      playStyle: 'オーソドックスGK',
      playStyleLevel: 'Ⅱ',
      overall: 6140,
      maxOverall: 14270,
      baseStats: { shoot: 860, pass: 920, dribble: 900, defense: 1250, physical: 1230, speed: 820 },
      detailStats: {
        shoot: { finishing: 280, power: 300, composure: 280 },
        pass: { shortPass: 310, longPass: 310, accuracy: 300 },
        dribble: { breakout: 300, keeping: 300, ballTouch: 300 },
        defense: { tackle: 420, interception: 415, marking: 415 },
        physical: { jumping: 420, contact: 415, stamina: 395 },
        speed: { running: 400, agility: 420 }
      },
      maxEnhanced: {
        overall: 14270,
        baseStats: { shoot: 2330, pass: 2470, dribble: 2430, defense: 2830, physical: 2800, speed: 1780 },
        detailStats: {
          shoot: { finishing: 770, power: 790, composure: 770 },
          pass: { shortPass: 830, longPass: 830, accuracy: 810 },
          dribble: { breakout: 810, keeping: 810, ballTouch: 810 },
          defense: { tackle: 950, interception: 940, marking: 940 },
          physical: { jumping: 950, contact: 940, stamina: 910 },
          speed: { running: 880, agility: 900 }
        }
      },
      playTendencies: {
        attack: -1, defense: 1, dribble: -2, shoot: -1, longShoot: -1,
        shortPass: -1, longPass: 1, throughPass: -1, cutIn: -1, keep: -1,
        delay: -1, rushOut: -1, feint: -1, press: -1
      },
      skill: { name: '驚異的なセービング', rank: '銅', description: '驚異的な反応速度と跳躍力で至近距離からのシュートを防ぎきる' },
      abilities: [
        { name: 'ハイボール処理', rank: '銀', description: '高さを活かしてハイボールを安全かつ確実にキャッチする' },
        { name: 'ファインセーブ', rank: '銀', description: '決定的なシュートを反応良く弾き出しチームの危機を救う' }
      ],
      avatarUrl: ''
    },
    {
      id: 'p148',
      name: 'ヤザン・アルアラブ(K1 BEST11 2025)',
      readingName: 'やざんあるあらぶ',
      category: 'DF',
      mainPosition: 'CB',
      subPositions: [],
      rarity: '☆3',
      baseRarity: '☆3',
      nationality: 'ヨルダン',
      policy: 'カウンター',
      playStyle: 'ハードタッカー',
      playStyleLevel: 'Ⅱ',
      overall: 6130,
      maxOverall: 14260,
      baseStats: { shoot: 850, pass: 970, dribble: 940, defense: 1260, physical: 1230, speed: 840 },
      detailStats: {
        shoot: { finishing: 270, power: 300, composure: 280 },
        pass: { shortPass: 320, longPass: 320, accuracy: 320 },
        dribble: { breakout: 310, keeping: 310, ballTouch: 320 },
        defense: { tackle: 425, interception: 418, marking: 417 },
        physical: { jumping: 420, contact: 415, stamina: 395 },
        speed: { running: 410, agility: 430 }
      },
      maxEnhanced: {
        overall: 14260,
        baseStats: { shoot: 2310, pass: 2490, dribble: 2440, defense: 2850, physical: 2800, speed: 1810 },
        detailStats: {
          shoot: { finishing: 760, power: 780, composure: 770 },
          pass: { shortPass: 830, longPass: 830, accuracy: 830 },
          dribble: { breakout: 810, keeping: 810, ballTouch: 820 },
          defense: { tackle: 960, interception: 945, marking: 945 },
          physical: { jumping: 950, contact: 940, stamina: 910 },
          speed: { running: 890, agility: 920 }
        }
      },
      playTendencies: {
        attack: -1, defense: 2, dribble: -1, shoot: -1, longShoot: -1,
        shortPass: 0, longPass: 1, throughPass: -1, cutIn: -1, keep: -1,
        delay: 1, rushOut: 0, feint: -1, press: 2
      },
      skill: { name: '力強いヘディング', rank: '銅', description: '高い打点から強力なヘディングでクリアやシュートを放つ' },
      abilities: [
        { name: 'フィジカルモンスター', rank: '銀', description: '強靭な肉体で相手FWとの接触プレーを完全に制圧する' },
        { name: 'ゴール前の壁', rank: '銀', description: '体を張ったブロックで相手の枠内シュートを物理的に遮断する' }
      ],
      avatarUrl: ''
    }
  ]
};
"@

        $fullContent = $validHead + $cleanTail
        [System.IO.File]::WriteAllText($path, $fullContent, $utf8)
        Write-Host "Successfully fixed mockData.js with UTF8 Encoding!"
    }
}
