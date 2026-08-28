const https = require('https');

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, body: data }));
    }).on('error', reject);
  });
}

async function test() {
  console.log('=== TESTING PUBLIC YOUTUBE APIS ===');

  const targets = [
    'https://pipedapi.kavin.rocks/playlists/PLBdUXfR7TQh42i6ZLl4GZQnTIuCgFV6F4',
    'https://api.piped.video/playlists/PLBdUXfR7TQh42i6ZLl4GZQnTIuCgFV6F4',
    'https://inv.tux.pizza/api/v1/playlists/PLBdUXfR7TQh42i6ZLl4GZQnTIuCgFV6F4',
    'https://yewtu.be/api/v1/playlists/PLBdUXfR7TQh42i6ZLl4GZQnTIuCgFV6F4'
  ];

  for (const t of targets) {
    try {
      const res = await fetchUrl(t);
      console.log(`URL: ${t.slice(0, 65)} -> Status: ${res.status}, Length: ${res.body.length}`);
      if (res.status === 200 && res.body.length > 500) {
        try {
          const json = JSON.parse(res.body);
          const videos = json.relatedStreams || json.videos || json.items;
          console.log(` -> SUCCESS! Found ${videos ? videos.length : 0} videos!`);
          if (videos && videos.length > 0) {
            console.log(' -> Latest Video Title:', videos[0].title);
            console.log(' -> Latest Video ID:', videos[0].videoId || videos[0].id);
          }
        } catch(e) {
          console.log(' -> JSON parse error:', e.message);
        }
      }
    } catch (e) {
      console.log(`URL: ${t.slice(0, 65)} -> ERROR: ${e.message}`);
    }
  }
}

test();
