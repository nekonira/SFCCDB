$url = "https://www.youtube.com/feeds/videos.xml?playlist_id=PLBdUXfR7TQh42i6ZLl4GZQnTIuCgFV6F4"
$wc = New-Object System.Net.WebClient
$wc.Encoding = [System.Text.Encoding]::UTF8
$xmlStr = $wc.DownloadString($url)

[xml]$xml = $xmlStr
foreach ($entry in $xml.feed.entry) {
    Write-Host "$($entry.videoId) | $($entry.title)"
}
