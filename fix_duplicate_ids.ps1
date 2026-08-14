$path = 'c:\Users\nekon\SFCCdeta\src\data\mockData.js'
$txt = Get-Content $path -Raw

# Replace K1 BEST11 IDs at the end of mockData.js
$txt = $txt -replace "id:\s*'p124',\s*name:\s*'パブロ・サバグ\(K1 BEST11 2025\)'", "id: 'p138',`n      name: 'パブロ・サバグ(K1 BEST11 2025)'"
$txt = $txt -replace "id:\s*'p125',\s*name:\s*'ソン・ミンギュ\(K1 BEST11 2025\)'", "id: 'p139',`n      name: 'ソン・ミンギュ(K1 BEST11 2025)'"
$txt = $txt -replace "id:\s*'p126',\s*name:\s*'イ・ドンギョン\(K1 BEST11 2025\)'", "id: 'p140',`n      name: 'イ・ドンギョン(K1 BEST11 2025)'"
$txt = $txt -replace "id:\s*'p127',\s*name:\s*'カン・サンユン\(K1 BEST11 2025\)'", "id: 'p141',`n      name: 'カン・サンユン(K1 BEST11 2025)'"
$txt = $txt -replace "id:\s*'p128',\s*name:\s*'キム・ジンギュ\(K1 BEST11 2025\)'", "id: 'p142',`n      name: 'キム・ジンギュ(K1 BEST11 2025)'"
$txt = $txt -replace "id:\s*'p129',\s*name:\s*'パク・ジンソク\(K1 BEST11 2025\)'", "id: 'p143',`n      name: 'パク・ジンソク(K1 BEST11 2025)'"
$txt = $txt -replace "id:\s*'p130',\s*name:\s*'ホン・ジョンホ\(K1 BEST11 2025\)'", "id: 'p144',`n      name: 'ホン・ジョンホ(K1 BEST11 2025)'"
$txt = $txt -replace "id:\s*'p131',\s*name:\s*'イ・ミョンジェ\(K1 BEST11 2025\)'", "id: 'p145',`n      name: 'イ・ミョンジェ(K1 BEST11 2025)'"
$txt = $txt -replace "id:\s*'p132',\s*name:\s*'キム・ムンファン\(K1 BEST11 2025\)'", "id: 'p146',`n      name: 'キム・ムンファン(K1 BEST11 2025)'"
$txt = $txt -replace "id:\s*'p133',\s*name:\s*'ソン・ボムグン\(K1 BEST11 2025\)'", "id: 'p147',`n      name: 'ソン・ボムグン(K1 BEST11 2025)'"
$txt = $txt -replace "id:\s*'p134',\s*name:\s*'ヤザン・アルアラブ\(K1 BEST11 2025\)'", "id: 'p148',`n      name: 'ヤザン・アルアラブ(K1 BEST11 2025)'"

Set-Content $path $txt -Encoding UTF8
Write-Host "Re-numbered duplicate player IDs successfully!"
