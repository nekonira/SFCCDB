$url = "https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.youtube.com%2Ffeeds%2Fvideos.xml%3Fplaylist_id%3DPLBdUXfR7TQh42i6ZLl4GZQnTIuCgFV6F4"
$res = Invoke-RestMethod -Uri $url

$videos = @()
foreach ($item in $res.items) {
    if ($item.link -match 'v=([a-zA-Z0-9_-]{11})') {
        $id = $matches[1]
        $cleanTitle = $item.title -replace '"', '\"'
        $videos += [PSCustomObject]@{
            id = $id
            title = $cleanTitle
            thumbnail = "https://i.ytimg.com/vi/$id/hqdefault.jpg"
            url = "https://www.youtube.com/watch?v=$id"
        }
    }
}

$json = $videos | ConvertTo-Json -Depth 3
[System.IO.File]::WriteAllText("c:\Users\nekon\SFCCdeta\scratch\videos.json", $json, [System.Text.Encoding]::UTF8)
Write-Host "Wrote $($videos.Count) videos to scratch\videos.json"
