const https = require('https');

function fetchUrl(url) {
  https.get(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept-Language': 'ja-JP,ja;q=0.9,en-US;q=0.8,en;q=0.7'
    }
  }, (res) => {
    if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
      console.log('Redirecting to:', res.headers.location);
      fetchUrl(res.headers.location);
      return;
    }
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      console.log('Status:', res.statusCode);
      console.log('Title match:', data.match(/<title>(.*?)<\/title>/i)?.[1]);
      console.log('OG Title match:', data.match(/property="og:title"\s+content="(.*?)"/i)?.[1] || data.match(/content="(.*?)"\s+property="og:title"/i)?.[1]);
      console.log('OG Image match:', data.match(/property="og:image"\s+content="(.*?)"/i)?.[1] || data.match(/content="(.*?)"\s+property="og:image"/i)?.[1]);
      console.log('H1 match:', data.match(/<h1[^>]*>(.*?)<\/h1>/i)?.[1]);
      // Search for any book title patterns or schema json
      const schemaMatch = data.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi);
      if (schemaMatch) {
        console.log('Schema JSON:', schemaMatch.slice(0, 3));
      }
    });
  }).on('error', err => console.error(err));
}

fetchUrl('https://book.dmm.com/product/939477/b647asodn04118/');
