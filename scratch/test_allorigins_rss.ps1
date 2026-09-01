$url = "https://api.allorigins.win/raw?url=" + [Uri]::EscapeDataString("https://www.youtube.com/feeds/videos.xml?playlist_id=PLBdUXfR7TQh42i6ZLl4GZQnTIuCgFV6F4")
$res = Invoke-RestMethod -Uri $url
Write-Host "Length: $($res.Length)"
[xml]$xml = $res
foreach ($entry in $xml.feed.entry) {
    Write-Host "$($entry.videoId) | $($entry.title)"
}
