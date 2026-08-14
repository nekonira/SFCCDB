[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$files = Get-ChildItem -Path "c:\Users\nekon\SFCCdeta" -File

$idMap = @{}

foreach ($f in $files) {
    if ($f.Name -eq "mockData.js") { continue }
    $text = [System.IO.File]::ReadAllText($f.FullName, [System.Text.Encoding]::UTF8)
    
    $matches = [regex]::Matches($text, "id:\s*'(p\d+)'")
    foreach ($m in $matches) {
        $id = $m.Groups[1].Value
        if (-not $idMap.ContainsKey($id)) {
            $idMap[$id] = @()
        }
        $idMap[$id] += $f.Name
    }
}

Write-Host "Total unique player IDs found in script files: $($idMap.Count)"
$sortedIds = $idMap.Keys | Sort-Object { [int]($_ -replace 'p', '') }
foreach ($id in $sortedIds) {
    $sources = ($idMap[$id] | Select-Object -Unique) -join ', '
    Write-Host "$id -> Sources: $sources"
}
