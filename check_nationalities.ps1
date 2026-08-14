$txt = Get-Content 'c:\Users\nekon\SFCCdeta\src\data\mockData.js' -Raw
$regex = [regex]'id:\s*''(p\d+)''[\s\S]*?name:\s*''([^'']+)''[\s\S]*?nationality:\s*''([^'']+)'''
$matches = $regex.Matches($txt)
foreach ($m in $matches) {
    Write-Host ($m.Groups[1].Value + ": " + $m.Groups[2].Value + " => [" + $m.Groups[3].Value + "]")
}
