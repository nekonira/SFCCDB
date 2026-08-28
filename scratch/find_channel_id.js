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
  console.log('Fetching watch page...');
  const html = await fetchUrl('https://www.youtube.com/watch?v=EFmaOGfDggw');
  const channelIdMatch = html.match(/"channelId":\s*"(UC[a-zA-Z0-9_-]{22})"/);
  const ucMatch = html.match(/(UC[a-zA-Z0-9_-]{22})/);
  console.log('channelIdMatch:', channelIdMatch ? channelIdMatch[1] : 'NONE');
  console.log('ucMatch:', ucMatch ? ucMatch[1] : 'NONE');
}

run();
