$logPath = "C:\Users\nekon\.gemini\antigravity-ide\brain\d5a8fc00-3f38-416e-a6d5-880cde2dd192\.system_generated\logs\transcript_full.jsonl"
$lines = Get-Content $logPath -Encoding UTF8

for ($i = 0; $i -lt $lines.Count; $i++) {
    $l = $lines[$i]
    if ($l.Contains("p01") -and $l.Contains("p50")) {
        Write-Host "Match at index $i : Length = $($l.Length)"
    }
}
