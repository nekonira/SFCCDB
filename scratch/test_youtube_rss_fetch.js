const https = require('https');

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, body: data }));
    }).on('error', reject);
  });
}

async function test() {
  console.log('=== TESTING YOUTUBE RSS ENDPOINTS ===');

  const targets = [
    'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.youtube.com%2Ffeeds%2Fvideos.xml%3Fplaylist_id%3DPLBdUXfR7TQh42i6ZLl4GZQnTIuCgFV6F4',
    'https://corsproxy.io/?https%3A%2F%2Fwww.youtube.com%2Ffeeds%2Fvideos.xml%3Fplaylist_id%3DPLBdUXfR7TQh42i6ZLl4GZQnTIuCgFV6F4',
    'https://corsproxy.io/?https://www.youtube.com/feeds/videos.xml?playlist_id=PLBdUXfR7TQh42i6ZLl4GZQnTIuCgFV6F4',
    'https://api.allorigins.win/raw?url=https%3A%2F%2Fwww.youtube.com%2Ffeeds%2Fvideos.xml%3Fplaylist_id%3DPLBdUXfR7TQh42i6ZLl4GZQnTIuCgFV6F4'
  ];

  for (const t of targets) {
    try {
      const res = await fetchUrl(t);
      console.log(`URL: ${t.slice(0, 70)}... -> Status: ${res.status}, Length: ${res.body.length}`);
      if (res.body.includes('<entry>') || res.body.includes('"status":"ok"')) {
        console.log(' -> SUCCESS! Contains RSS video items!');
      }
    } catch (e) {
      console.log(`URL: ${t.slice(0, 70)}... -> ERROR: ${e.message}`);
    }
  }
}

test();
