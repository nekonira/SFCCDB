$indexPath = "c:\Users\nekon\SFCCdeta\index.html"
$text = [System.IO.File]::ReadAllText($indexPath, [System.Text.Encoding]::UTF8)

# Check if garbled strings exist
if ($text -match "繧|笘|繝|竇") {
    Write-Host "Cleaning up garbled tags inside index.html..."
    $text = $text -replace "['""]繧ｫ繧ｦ繝ｳ繧ｿ繝ｼ['""]", "'カウンター'"
    $text = $text -replace "['""]繝繝ｼ繝薙Φ繧ｰ['""]", "'ムービング'"
    $text = $text -replace "['""]繝昴ぞ繝・す繝ｧ繝ｳ['""]", "'ポゼッション'"
    $text = $text -replace "['""]繝ｪ繧｢繧ｯ繧ｷ繝ｧ繝ｳ['""]", "'リアクション'"
    $text = $text -replace "['""]笘・['""]", "'☆3'"
    [System.IO.File]::WriteAllText($indexPath, $text, (New-Object System.Text.UTF8Encoding($false)))
    Write-Host "All garbled tags cleaned!"
} else {
    Write-Host "Index.html is completely clean Japanese UTF8!"
}
