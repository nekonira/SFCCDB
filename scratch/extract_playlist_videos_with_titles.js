const https = require('https');
const fs = require('fs');
const path = require('path');

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
  console.log('Fetching playlist page...');
  const html = await fetchUrl('https://www.youtube.com/playlist?list=PLBdUXfR7TQh42i6ZLl4GZQnTIuCgFV6F4');
  
  const videoBlocks = html.split('playlistVideoRenderer');
  const playlistVideos = [];
  const seen = new Set();

  videoBlocks.slice(1).forEach(block => {
    const idMatch = block.match(/"videoId":"([a-zA-Z0-9_-]{11})"/);
    const titleMatch = block.match(/"title":\{"runs":\[\{"text":"(.*?)"\}/);
    if (idMatch && !seen.has(idMatch[1])) {
      seen.add(idMatch[1]);
      const videoId = idMatch[1];
      const rawTitle = titleMatch ? titleMatch[1] : '';
      const title = rawTitle.replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) => String.fromCharCode(parseInt(hex, 16))) || `サカつく2026 攻略動画 (${videoId})`;
      playlistVideos.push({
        id: videoId,
        title: title,
        thumbnail: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
        url: `https://www.youtube.com/watch?v=${videoId}`
      });
    }
  });

  console.log(`Successfully extracted ${playlistVideos.length} playlist videos in order!`);
  console.log('Top 10 Latest Playlist Videos:');
  playlistVideos.slice(0, 10).forEach((v, idx) => {
    console.log(`${idx + 1}. [${v.id}] ${v.title}`);
  });

  fs.writeFileSync(path.join(__dirname, 'latest_playlist_videos.json'), JSON.stringify(playlistVideos, null, 2), 'utf-8');
}

run();
