Write-Host "--- Starting High-Performance Node Web Server on Port 3000 ---"

$port = 3000
$netstat = netstat -ano | Select-String ":$port\s+"
foreach ($line in $netstat) {
    $parts = $line.ToString().Split(' ', [System.StringSplitOptions]::RemoveEmptyEntries)
    $pidToKill = $parts[-1]
    if ($pidToKill -and $pidToKill -ne "0") {
        Write-Host "Stopping process on port $port (PID: $pidToKill)"
        Stop-Process -Id $pidToKill -Force -ErrorAction SilentlyContinue
    }
}

Start-Sleep -Seconds 1

$nodeExe = "C:\Program Files\Adobe\Adobe Photoshop 2026\node.exe"
if (-not (Test-Path $nodeExe)) {
    $nodeExe = "node"
}

$job = Start-Process $nodeExe -ArgumentList "server.js" -WorkingDirectory "c:\Users\nekon\SFCCdeta" -WindowStyle Hidden -PassThru
Write-Host "Node Web Server started with Process ID: $($job.Id)"
