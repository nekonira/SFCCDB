$path = "c:\Users\nekon\SFCCdeta\src\app.jsx"
$utf8 = New-Object System.Text.UTF8Encoding($false)
$text = [System.IO.File]::ReadAllText($path, $utf8)

$head = @"
const { useState, useEffect, useMemo } = React;
const POSITIONS = ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'];
const POLICIES = ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'];
const RARITIES = ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'];
const PLAY_STYLE_LEVELS = ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'];
const PLAY_STYLES = ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'];
const INITIAL_PLAYERS = window.INITIAL_PLAYERS || [];
const INITIAL_MANAGERS = window.INITIAL_MANAGERS || [];
const INITIAL_COMBOS = window.INITIAL_COMBOS || [];

const OFFSETS = {
  '☆3': 0,
  '☆3+': 16,
  '☆3++': 33,   // 16 + 17
  '☆4': 65,     // 33 + 32
  '☆4+': 81,    // 65 + 16
  '☆4++': 98,   // 81 + 17
  '☆5': 130     // 98 + 32
};

const NATIONALITY_READINGS = {
  '日本': 'にほん',
  '韓国': 'かんこく',
  '中国': 'ちゅうごく',
  'ブラジル': 'ぶらじる',
  'アルゼンチン': 'あるぜんちん',
  'イングランド': 'いんぐらんど',
  'フランス': 'ふらんす',
  'ドイツ': 'どいつ',
  'スペイン': 'すぺいん',
  'イタリア': 'いたりあ',
  'オランダ': 'おらんだ',
  'ポルトガル': 'ぽるとがる',
  'ベルギー': 'べるぎー',
  'クロアチア': 'くろあちあ',
  'ウルグアイ': 'うるぐあい',
  'コロンビア': 'ころんびあ',
  'チリ': 'ちり',
  'パラグアイ': 'ぱらぐあい',
  'ペルー': 'ぺるー',
  'ロシア': 'ろしあ',
  'アメリカ': 'あめりか',
  'カナダ': 'かなだ',
  'メキシコ': 'めきしこ',
  'エジプト': 'えじぷと',
  'モロッコ': 'もろっこ',
  'ナイジェリア': 'ないじぇりあ',
  'セネガル': 'せねがる',
  'ガーナ': 'がーな',
  'カメルーン': 'かめるーん',
  'オーストラリア': 'おーすとらりあ',
  'ニュージーランド': 'にゅーじーらんど',
  'セルビア': 'せるびあ',
  'スウェーデン': 'すうぇーでん',
  'ノルウェー': 'のるうぇー',
  'デンマーク': 'でんまーく',
  'ポーランド': 'ぽーらんど',
  'オーストリア': 'おーすとりあ',
  'スイス': 'すいす',
  'ウクライナ': 'うくらいな',
  'スコットランド': 'すこっとらんど',
  'ウェールズ': 'うぇーるず',
  'アイルランド': 'あいるらんど',
  'トルコ': 'とるこ',
  'ギリシャ': 'ぎりしゃ',
  'チェコ': 'ちぇこ',
  'スロバキア': 'すろばきあ',
  'ハンガリー': 'はんがりー',
  'ルーマニア': 'るーまにあ',
  'ブルガリア': 'ぶるがりあ'
};
"@

$idx = $text.IndexOf("const getNationalityReading =")
if ($idx -gt 0) {
    $body = $text.Substring($idx)
    $finalText = $head + "`n`n" + $body
    [System.IO.File]::WriteAllText($path, $finalText, $utf8)
    Write-Host "src/app.jsx successfully repaired in PowerShell!" -ForegroundColor Green
} else {
    Write-Host "Marker const getNationalityReading = not found!" -ForegroundColor Red
}
