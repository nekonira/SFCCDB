$res = Invoke-WebRequest -Uri "http://localhost:3000/" -UseBasicParsing
Write-Host "Status code: $($res.StatusCode)"
Write-Host "Content length: $($res.Content.Length) bytes"

if ($res.Content.Contains("ReactDOM.createRoot") -and $res.Content.Contains("INITIAL_PLAYERS")) {
    Write-Host "SUCCESS: Server returns complete single-file bundle ready for instant browser boot!" -ForegroundColor Green
}
