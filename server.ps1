$port = 3000
$root = "c:\Users\nekon\SFCCdeta"

$nodeCandidates = @(
    "C:\Program Files\Adobe\Adobe Photoshop 2026\node.exe",
    "C:\Program Files\Adobe\Adobe Photoshop 2025\node.exe",
    "C:\Program Files\Adobe\Adobe Photoshop 2024\node.exe",
    "C:\Program Files\Adobe\Adobe Creative Cloud Experience\libs\node.exe"
)

$nodePath = $null
if (Get-Command node -ErrorAction SilentlyContinue) {
    $nodePath = "node"
} else {
    foreach ($cand in $nodeCandidates) {
        if (Test-Path $cand) {
            $nodePath = $cand
            break
        }
    }
}

if ($nodePath) {
    Write-Host "Starting Node.js Web Server: $nodePath"
    & $nodePath "$root\server.js"
    exit
}

Write-Host "Starting PowerShell Web Server on PORT $port..."

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Prefixes.Add("http://127.0.0.1:$port/")

try {
    $localIp = (Get-NetIPAddress -AddressFamily IPv4 -Type Unicast | Where-Object { $_.IPAddress -notlike "127.*" -and $_.IPAddress -notlike "169.254.*" } | Select-Object -First 1).IPAddress
    if ($localIp) {
        $listener.Prefixes.Add("http://${localIp}:$port/")
    }
} catch {}

try {
    $listener.Start()
    Write-Host "Server started!"
    Write-Host "PC URL:      http://localhost:$port/"
    if ($localIp) { Write-Host "iPhone/Wi-Fi: http://${localIp}:$port/" }
} catch {
    Write-Host "Server is already running on port $port."
    exit
}

while ($listener.IsListening) {
    try {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        $path = $request.Url.LocalPath
        if ($path -eq "/") { $path = "/index.html" }

        $filePath = Join-Path $root $path.TrimStart('/')

        if (Test-Path $filePath -PathType Leaf) {
            $bytes = [System.IO.File]::ReadAllBytes($filePath)
            $ext = [System.IO.Path]::GetExtension($filePath).ToLower()

            switch ($ext) {
                ".html" { $response.ContentType = "text/html; charset=utf-8" }
                ".js"   { $response.ContentType = "application/javascript; charset=utf-8" }
                ".jsx"  { $response.ContentType = "application/javascript; charset=utf-8" }
                ".css"  { $response.ContentType = "text/css; charset=utf-8" }
                ".json" { $response.ContentType = "application/json; charset=utf-8" }
                ".png"  { $response.ContentType = "image/png" }
                ".jpg"  { $response.ContentType = "image/jpeg" }
                default { $response.ContentType = "application/octet-stream" }
            }

            $response.ContentLength64 = $bytes.Length
            $response.Headers.Add("Access-Control-Allow-Origin", "*")
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
            $response.StatusCode = 404
            $buffer = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found")
            $response.OutputStream.Write($buffer, 0, $buffer.Length)
        }
        $response.OutputStream.Close()
    } catch {
        # continue
    }
}
