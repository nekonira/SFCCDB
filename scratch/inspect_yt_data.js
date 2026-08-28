const https = require('https');

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)', 'Accept-Language': 'ja,en-US;q=0.9' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function run() {
  const html = await fetchUrl('https://www.youtube.com/playlist?list=PLBdUXfR7TQh42i6ZLl4GZQnTIuCgFV6F4');
  
  // Find all "videoId":"XXXXX" and adjacent title
  const matches = [...html.matchAll(/"videoId":"([a-zA-Z0-9_-]{11})"/g)];
  console.log('Total videoId occurrences:', matches.length);

  const videoIds = [];
  const seen = new Set();
  matches.forEach(m => {
    const id = m[1];
    if (!seen.has(id)) {
      seen.add(id);
      videoIds.push(id);
    }
  });

  console.log('Unique video IDs in playlist page:', videoIds.length);
  console.log(videoIds);
}

run();
