const https = require('https');
const fs = require('fs');
const path = require('path');

const PLAYLIST_ID = 'PLBdUXfR7TQh42i6ZLl4GZQnTIuCgFV6F4';
const RSS_URL = `https://www.youtube.com/feeds/videos.xml?playlist_id=${PLAYLIST_ID}`;

function decodeEntities(str) {
  if (!str) return '';
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function fetchYoutubePlaylist() {
  return new Promise((resolve, reject) => {
    https.get(RSS_URL, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        'Accept-Language': 'ja-JP,ja;q=0.9'
      }
    }, res => {
      if (res.statusCode !== 200) {
        return reject(new Error('HTTP ' + res.statusCode));
      }
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => {
        const xml = Buffer.concat(chunks).toString('utf-8');
        const entries = [...xml.matchAll(/<entry>[\s\S]*?<yt:videoId>(.*?)<\/yt:videoId>[\s\S]*?<title>(.*?)<\/title>[\s\S]*?<\/entry>/g)];
        const videos = entries.slice(0, 10).map(m => {
          const id = m[1].trim();
          const title = decodeEntities(m[2].trim());
          return {
            id,
            title,
            thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
            url: `https://www.youtube.com/watch?v=${id}`
          };
        });
        resolve(videos);
      });
    }).on('error', reject);
  });
}

(async () => {
  const videos = await fetchYoutubePlaylist();
  console.log('Fetched', videos.length, 'latest videos. Top video:', videos[0].id, videos[0].title);

  const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
  const appJsPath = path.join(__dirname, 'src', 'app.js');

  let jsx = fs.readFileSync(appJsxPath, 'utf-8');
  let js = fs.readFileSync(appJsPath, 'utf-8');

  const newVideosJsx = 'const YOUTUBE_VIDEOS = ' + JSON.stringify(videos, null, 2) + ';';
  const newVideosJs = 'const YOUTUBE_VIDEOS=' + JSON.stringify(videos) + ';';

  jsx = jsx.replace(/const YOUTUBE_VIDEOS = \[[\s\S]*?\n\];/, newVideosJsx);
  js = js.replace(/const YOUTUBE_VIDEOS\s*=\s*\[[\s\S]*?\];/, newVideosJs);

  fs.writeFileSync(appJsxPath, jsx, 'utf-8');
  fs.writeFileSync(appJsPath, js, 'utf-8');
  console.log('Updated YOUTUBE_VIDEOS in src/app.jsx and src/app.js');
})();
