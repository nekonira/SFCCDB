[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$files = @("clean_restore_mockdata.ps1", "fix_syntax_utf8.ps1", "rebuild_full_database_148.ps1")

foreach ($fileName in $files) {
    $filePath = Join-Path "c:\Users\nekon\SFCCdeta" $fileName
    if (Test-Path $filePath) {
        $text = [System.IO.File]::ReadAllText($filePath, [System.Text.Encoding]::UTF8)
        $blocks = $text -split "id:\s*'"
        Write-Host "$fileName -> Player Count: $($blocks.Count - 1)"
    }
}
