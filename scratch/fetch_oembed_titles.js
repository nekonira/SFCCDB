const https = require('https');
const fs = require('fs');
const path = require('path');

const parsed = JSON.parse(fs.readFileSync(path.join(__dirname, 'playlist_videos_parsed.json'), 'utf-8'));

function fetchJson(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch(e) {
          resolve(null);
        }
      });
    }).on('error', () => resolve(null));
  });
}

async function run() {
  console.log(`Fetching titles for top ${Math.min(20, parsed.length)} playlist videos via oEmbed...`);

  const topVideos = parsed.slice(0, 20);
  const results = [];

  for (const v of topVideos) {
    const oembedUrl = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${v.id}&format=json`;
    const data = await fetchJson(oembedUrl);
    const title = data && data.title ? data.title : v.title;
    results.push({
      id: v.id,
      title: title,
      thumbnail: `https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`,
      url: `https://www.youtube.com/watch?v=${v.id}`
    });
    console.log(`[${v.id}] -> ${title}`);
  }

  fs.writeFileSync(path.join(__dirname, 'scratch', 'playlist_videos_with_real_titles.json'), JSON.stringify(results, null, 2), 'utf-8');
}

run();
