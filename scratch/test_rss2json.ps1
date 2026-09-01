$url = "https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.youtube.com%2Ffeeds%2Fvideos.xml%3Fplaylist_id%3DPLBdUXfR7TQh42i6ZLl4GZQnTIuCgFV6F4"
$res = Invoke-RestMethod -Uri $url
foreach ($item in $res.items) {
    Write-Host "$($item.title) | $($item.link) | $($item.thumbnail)"
}
