$url = "https://book.dmm.com/product/6288029/b900alds09880/"
$req = [System.Net.HttpWebRequest]::Create($url)
$req.UserAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
$req.AllowAutoRedirect = $false
try {
    $resp = $req.GetResponse()
    Write-Output ("Location: " + $resp.Headers["Location"])
} catch {
    Write-Output ("Exception Location: " + $_.Exception.Response.Headers["Location"])
}
