$url = "https://book.dmm.com/product/6288029/b900alds09880/"
$req = [System.Net.HttpWebRequest]::Create($url)
$req.UserAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
$resp = $req.GetResponse()
$stream = $resp.GetResponseStream()
$reader = New-Object System.IO.StreamReader($stream)
$html = $reader.ReadToEnd()

Write-Output "--- HTML Title ---"
$html | Select-String -Pattern '<title>(.*?)</title>' | ForEach-Object { $_.Matches.Groups[1].Value }

Write-Output "--- OG Title ---"
$html | Select-String -Pattern '<meta [^>]*property="og:title" [^>]*content="(.*?)"' | ForEach-Object { $_.Matches.Groups[1].Value }

Write-Output "--- OG Image ---"
$html | Select-String -Pattern '<meta [^>]*property="og:image" [^>]*content="(.*?)"' | ForEach-Object { $_.Matches.Groups[1].Value }

Write-Output "--- H1 ---"
$html | Select-String -Pattern '<h1[^>]*>(.*?)</h1>' | ForEach-Object { $_.Matches.Groups[1].Value }
