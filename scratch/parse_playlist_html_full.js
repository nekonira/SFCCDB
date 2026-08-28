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
  
  // Extract all videoId occurrences
  const matches = [...html.matchAll(/"videoId":"([a-zA-Z0-9_-]{11})"/g)];
  const videoIds = [];
  const seen = new Set();
  matches.forEach(m => {
    const id = m[1];
    if (!seen.has(id)) {
      seen.add(id);
      videoIds.push(id);
    }
  });

  const videos = [];

  videoIds.forEach(id => {
    // Find text near this videoId
    const idx = html.indexOf(`"videoId":"${id}"`);
    if (idx !== -1) {
      const snippet = html.slice(idx, idx + 1000);
      const titleMatch = snippet.match(/"title":\{"runs":\[\{"text":"(.*?)"\}/) || snippet.match(/"title":\{"simpleText":"(.*?)"\}/) || snippet.match(/"text":"(.*?)"/);
      let title = titleMatch ? titleMatch[1] : '';
      title = title.replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)));
      if (!title || title.includes('再生') || title.includes('秒') || title.includes('分')) {
        // Look backwards
        const backSnippet = html.slice(Math.max(0, idx - 500), idx);
        const backTitleMatch = backSnippet.match(/"title":\{"runs":\[\{"text":"(.*?)"\}/) || backSnippet.match(/"title":\{"simpleText":"(.*?)"\}/);
        if (backTitleMatch) {
          title = backTitleMatch[1].replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)));
        }
      }

      videos.push({
        id: id,
        title: title || `サカつく2026 攻略動画 (${id})`,
        thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
        url: `https://www.youtube.com/watch?v=${id}`
      });
    }
  });

  console.log('Total playlist videos extracted:', videos.length);
  videos.slice(0, 15).forEach((v, i) => console.log(` ${i+1}. [${v.id}] ${v.title}`));

  fs.writeFileSync('scratch/playlist_videos_parsed.json', JSON.stringify(videos, null, 2), 'utf-8');
}

run();
