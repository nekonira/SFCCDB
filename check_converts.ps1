[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$files = Get-ChildItem -Path "c:\Users\nekon\SFCCdeta" -Filter "convert_*.ps1"

foreach ($f in $files) {
    $text = [System.IO.File]::ReadAllText($f.FullName, [System.Text.Encoding]::UTF8)
    $mName = [regex]::Match($text, 'Write-Host "([^"]+)"')
    if ($mName.Success) {
        Write-Host "$($f.Name) -> $($mName.Groups[1].Value)"
    }
}
