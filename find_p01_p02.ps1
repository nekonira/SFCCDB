[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$files = Get-ChildItem -Path "c:\Users\nekon\SFCCdeta" -File

foreach ($f in $files) {
    $text = [System.IO.File]::ReadAllText($f.FullName, [System.Text.Encoding]::UTF8)
    if ($text -match "id:\s*'p01'" -or $text -match "id:\s*'p02'") {
        Write-Host "FOUND p01/p02 IN: $($f.Name) (Length: $($f.Length))"
    }
}
