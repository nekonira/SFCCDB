[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$text = [System.IO.File]::ReadAllText("c:\Users\nekon\SFCCdeta\build_pure_js.ps1", [System.Text.Encoding]::UTF8)

$blocks = $text -split "id:\s*'"
Write-Host "Total Player Count in build_pure_js.ps1: $($blocks.Count - 1)"

for ($i=1; $i -lt $blocks.Count; $i++) {
    $id = ($blocks[$i] -split "'")[0]
    $m = [regex]::Match($blocks[$i], "name:\s*'([^']+)'")
    if ($m.Success) {
        Write-Host "[$i] ID: $id | Name: $($m.Groups[1].Value)"
    }
}
