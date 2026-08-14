$url = "http://localhost:3000/"
$dataUrl = "http://localhost:3000/src/data/mockData.js"

Write-Host "--- Testing HTTP Listener Response ---"

try {
    $resHtml = Invoke-WebRequest -Uri $url -UseBasicParsing
    Write-Host "Index.html Response Status: $($resHtml.StatusCode)" -ForegroundColor Green
    
    $resData = Invoke-WebRequest -Uri $dataUrl -UseBasicParsing
    Write-Host "mockData.js Response Status: $($resData.StatusCode) (Bytes: $($resData.RawContentLength))" -ForegroundColor Green
    
    if ($resData.Content.Contains("window.INITIAL_PLAYERS")) {
        Write-Host "SUCCESS: mockData.js served properly with full player data!" -ForegroundColor Green
    }
} catch {
    Write-Host "HTTP Test Failed: $_" -ForegroundColor Red
}
