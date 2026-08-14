[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$logPath = "C:\Users\nekon\.gemini\antigravity-ide\brain\d5a8fc00-3f38-416e-a6d5-880cde2dd192\.system_generated\logs\transcript_full.jsonl"

if (Test-Path $logPath) {
    Write-Host "Log path exists!"
    $lines = Get-Content $logPath -Encoding UTF8
    $bestCode = ""
    foreach ($l in $lines) {
        if ($l.Contains("INITIAL_PLAYERS") -and $l.Length -gt $bestCode.Length) {
            $bestCode = $l
        }
    }
    Write-Host "Best line length: $($bestCode.Length)"
    
    # Parse json object
    $raw = $bestCode -replace '\\n', "`n" -replace '\\"', '"' -replace '\\\\', '\'
    $start = $raw.IndexOf("window.INITIAL_PLAYERS")
    if ($start -lt 0) { $start = $raw.IndexOf("INITIAL_PLAYERS") }
    if ($start -gt 0) {
        $sub = $raw.Substring($start)
        $end = $sub.LastIndexOf("];")
        if ($end -gt 0) {
            $code = "window." + $sub.Substring(0, $end + 2)
            [System.IO.File]::WriteAllText("c:\Users\nekon\SFCCdeta\extracted_d5a_mockdata.js", $code, [System.Text.Encoding]::UTF8)
            Write-Host "Saved extracted_d5a_mockdata.js! Length: $($code.Length)"
        }
    }
}
