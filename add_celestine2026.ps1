$mockPath = "c:\Users\nekon\SFCCdeta\src\data\mockData.js"
$utf8 = New-Object System.Text.UTF8Encoding($false)
$code = [System.IO.File]::ReadAllText($mockPath, [System.Text.Encoding]::UTF8)

Write-Host "--- Adding Julien Célestine 2026 (p156) via PowerShell ---"

$celestineObj = @"
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
    skill: { name: '冴え渡るインターセプト', rank: '銅', description: '読みを利かせたポジション取りで相手のパスを冷静にインターセプトする' },
    abilities: [
      { name: '上空の寸断者', rank: '銀', description: '高さを生かしてハイボールやクロスをヘディングで確実に跳ね返す' },
      { name: 'ストロングマーカー', rank: '銀', description: 'フィジカルを生かしたタイトなマークで相手FWに自由を与えない' }
    ],
    avatarUrl: ''
  }
"@

if ($code.Contains("id: 'p156'")) {
    Write-Host "p156 already exists in mockData.js"
} else {
    $insertIndex = $code.LastIndexOf("];")
    if ($insertIndex -gt 0) {
        $newCode = $code.Substring(0, $insertIndex).TrimEnd() + ",`n  " + $celestineObj.Trim() + "`n];`n" + $code.Substring($insertIndex + 2)
        [System.IO.File]::WriteAllText($mockPath, $newCode, $utf8)
        Write-Host "Successfully added p156 (Julien Célestine 2026) to mockData.js!"
    } else {
        Write-Host "Error: Could not find ]; in mockData.js"
    }
}
