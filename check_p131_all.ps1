[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$files = Get-ChildItem -Path "c:\Users\nekon\SFCCdeta" -File

foreach ($f in $files) {
    $text = [System.IO.File]::ReadAllText($f.FullName, [System.Text.Encoding]::UTF8)
    if ($text -match "id:\s*'p131'") {
        $m = [regex]::Match($text, "id:\s*'p131'.*?name:\s*'([^']+)'")
        Write-Host "$($f.Name) -> p131 Name: $($m.Groups[1].Value)"
    }
}
