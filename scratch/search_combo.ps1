Get-ChildItem -Path "C:\Users\nekon\.gemini\antigravity-ide\brain" -Recurse -Filter "transcript.jsonl" | ForEach-Object {
    $path = $_.FullName
    $lines = Get-Content $path -Encoding UTF8
    for ($i=0; $i -lt $lines.Count; $i++) {
        $l = $lines[$i]
        if ($l -like "*フォーメーションコンボ*" -or $l -like "*コンボ能力ボーナス*" -or $l -like "*コンボ条件*" -or $l -like "*発動条件*") {
            if ($l -like "*activeComboData*" -or $l -like "*selectedFormation*" -or $l -like "*buffs*") {
                Write-Host "File: $path (Line $($i+1))"
                $sub = if ($l.Length -gt 200) { $l.Substring(0, 200) } else { $l }
                Write-Host $sub
                Write-Host "-----------------------------------"
            }
        }
    }
}
