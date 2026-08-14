[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$text = [System.IO.File]::ReadAllText("c:\Users\nekon\SFCCdeta\src\data\mockData.js", [System.Text.Encoding]::UTF8)

$blocks = $text -split "id:\s*'"
Write-Host "Total players: $($blocks.Count - 1)"

$dict = [ordered]@{}
for ($i=1; $i -lt $blocks.Count; $i++) {
    $id = ($blocks[$i] -split "'")[0]
    $m = [regex]::Match($blocks[$i], "name:\s*'([^']+)'")
    if ($m.Success) {
        $dict[$id] = $m.Groups[1].Value
    }
}

foreach ($k in $dict.Keys) {
    $num = [int]($k -replace 'p', '')
    if ($num -ge 110) {
        Write-Host "$k -> $($dict[$k])"
    }
}
