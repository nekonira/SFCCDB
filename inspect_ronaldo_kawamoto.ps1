[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$text = [System.IO.File]::ReadAllText("c:\Users\nekon\SFCCdeta\src\data\mockData.js", [System.Text.Encoding]::UTF8)

$blocks = $text -split "id:\s*'"

foreach ($b in $blocks) {
    if ($b -match "河本鬼茂" -or $b -match "クリスティアーノ・ロナウド") {
        Write-Host "================================"
        Write-Host ("  {\n    id: '" + $b.Trim())
    }
}
