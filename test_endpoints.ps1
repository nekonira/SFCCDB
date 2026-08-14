Write-Host "--- Testing HTTP Server Endpoints ---"
$urls = @(
    "http://localhost:3000/",
    "http://localhost:3000/src/data/mockData.js",
    "http://localhost:3000/src/app.jsx"
)

foreach ($u in $urls) {
    try {
        $res = Invoke-WebRequest -Uri $u -UseBasicParsing
        Write-Host "OK ($($res.StatusCode)): $u ($($res.Content.Length) bytes)" -ForegroundColor Green
    } catch {
        Write-Host "FAIL: $u -> $_" -ForegroundColor Red
    }
}
