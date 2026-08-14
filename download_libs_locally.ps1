$libDir = "c:\Users\nekon\SFCCdeta\src\lib"
if (-not (Test-Path $libDir)) {
    New-Item -ItemType Directory -Path $libDir | Out-Null
}

$reactUrl = "https://unpkg.com/react@18/umd/react.production.min.js"
$reactDomUrl = "https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"
$babelUrl = "https://unpkg.com/@babel/standalone/babel.min.js"
$tailwindUrl = "https://cdn.tailwindcss.com"

Write-Host "Downloading local CDN Fallbacks..."

try {
    Invoke-WebRequest -Uri $reactUrl -OutFile "$libDir\react.min.js" -TimeoutSec 10
    Invoke-WebRequest -Uri $reactDomUrl -OutFile "$libDir\react-dom.min.js" -TimeoutSec 10
    Invoke-WebRequest -Uri $babelUrl -OutFile "$libDir\babel.min.js" -TimeoutSec 15
    Invoke-WebRequest -Uri $tailwindUrl -OutFile "$libDir\tailwind.js" -TimeoutSec 10
    Write-Host "All libraries saved locally to src/lib!" -ForegroundColor Green
} catch {
    Write-Host "Download failed: $_" -ForegroundColor Yellow
}
