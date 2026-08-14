[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$files = Get-ChildItem -Path "c:\Users\nekon\SFCCdeta" -Include "*.js","*.py","*.ps1" -Recurse

foreach ($f in $files) {
    if ($f.Name -eq "mockData.js") { continue }
    $content = [System.IO.File]::ReadAllText($f.FullName, [System.Text.Encoding]::UTF8)
    if ($content -like "*東口*" -or $content -like "*前川黛也*" -or $content -like "*小島亨介*") {
        Write-Host "File with original GK data: $($f.Name)"
    }
}
