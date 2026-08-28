const https = require('https');
const fs = require('fs');

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
  
  // Find all videoId + title in html
  const regex = /"videoId":"([a-zA-Z0-9_-]{11})".*?"title":\{"runs":\[\{"text":"(.*?)"\}/g;
  const videos = [];
  const seen = new Set();

  let match;
  while ((match = regex.exec(html)) !== null) {
    const id = match[1];
    const rawTitle = match[2];
    if (!seen.has(id)) {
      seen.add(id);
      const title = rawTitle.replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)));
      videos.push({
        id: id,
        title: title,
        thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
        url: `https://www.youtube.com/watch?v=${id}`
      });
    }
  }

  console.log('Total extracted playlist videos with title:', videos.length);
  videos.slice(0, 10).forEach((v, i) => console.log(` ${i+1}. [${v.id}] ${v.title}`));

  fs.writeFileSync('scratch/playlist_videos_final.json', JSON.stringify(videos, null, 2), 'utf-8');
}

run();
