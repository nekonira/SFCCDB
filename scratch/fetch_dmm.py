import urllib.request
import re

url = "https://book.dmm.com/product/939477/b647asodn04118/"
req = urllib.request.Request(url, headers={
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
})

try:
    with urllib.request.urlopen(req) as resp:
        html = resp.read().decode('utf-8', errors='ignore')
        print("URL:", resp.geturl())
        titles = re.findall(r'<title>(.*?)</title>', html, re.IGNORECASE)
        print("Title:", titles)
        og_titles = re.findall(r'property=["\']og:title["\']\s+content=["\'](.*?)["\']', html, re.IGNORECASE)
        if not og_titles:
            og_titles = re.findall(r'content=["\'](.*?)["\']\s+property=["\']og:title["\']', html, re.IGNORECASE)
        print("OG Title:", og_titles)
        og_imgs = re.findall(r'property=["\']og:image["\']\s+content=["\'](.*?)["\']', html, re.IGNORECASE)
        if not og_imgs:
            og_imgs = re.findall(r'content=["\'](.*?)["\']\s+property=["\']og:image["\']', html, re.IGNORECASE)
        print("OG Image:", og_imgs)
        
        # let's also look for product title in h1 or json-ld
        h1s = re.findall(r'<h1.*?>(.*?)</h1>', html, re.IGNORECASE | re.DOTALL)
        print("H1s:", h1s[:3])
except Exception as e:
    print("Error:", e)
