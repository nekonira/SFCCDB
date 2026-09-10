[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$url = "https://book.dmm.com/product/939477/b647asodn04118/"
$web = New-Object System.Net.WebClient
$web.Encoding = [System.Text.Encoding]::UTF8
$web.Headers.Add("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64)")
$html = $web.DownloadString($url)

Write-Output "--- HTML Title ---"
if ($html -match '<title>(.*?)</title>') { Write-Output $matches[1] }

Write-Output "--- OG Title ---"
if ($html -match 'property="og:title"\s+content="(.*?)"') { Write-Output $matches[1] }
if ($html -match 'content="(.*?)"\s+property="og:title"') { Write-Output $matches[1] }

Write-Output "--- OG Image ---"
if ($html -match 'property="og:image"\s+content="(.*?)"') { Write-Output $matches[1] }
if ($html -match 'content="(.*?)"\s+property="og:image"') { Write-Output $matches[1] }

Write-Output "--- Description ---"
if ($html -match 'property="og:description"\s+content="(.*?)"') { Write-Output $matches[1] }
if ($html -match 'name="description"\s+content="(.*?)"') { Write-Output $matches[1] }
