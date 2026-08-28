const fs = require('fs');
const path = require('path');
const https = require('https');

const rootDir = path.join(__dirname, '..');
const appJsPath = path.join(rootDir, 'src', 'app.js');
const appJsxPath = path.join(rootDir, 'src', 'app.jsx');

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)', 'Accept-Language': 'ja,en-US;q=0.9' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

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
  console.log('=== FETCHING EXACT PLAYLIST VIDEOS (PLBdUXfR7TQh42i6ZLl4GZQnTIuCgFV6F4) ===');

  const html = await fetchUrl('https://www.youtube.com/playlist?list=PLBdUXfR7TQh42i6ZLl4GZQnTIuCgFV6F4');
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

  console.log(`Found ${videoIds.length} video IDs in playlist!`);

  const playlistVideos = [];
  const top20Ids = videoIds.slice(0, 20);

  for (const id of top20Ids) {
    const oembedUrl = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${id}&format=json`;
    const data = await fetchJson(oembedUrl);
    const title = data && data.title ? data.title : `サカつく2026 攻略動画 (${id})`;
    playlistVideos.push({
      id: id,
      title: title,
      thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
      url: `https://www.youtube.com/watch?v=${id}`
    });
  }

  console.log(`Successfully built ${playlistVideos.length} playlist video objects!`);

  // 1. Static YOUTUBE_VIDEOS string
  const youtubeVideosStr = `const YOUTUBE_VIDEOS = ${JSON.stringify(playlistVideos, null, 2)};`;

  // 2. Real-time dynamic fetch logic for playlist PLBdUXfR7TQh42i6ZLl4GZQnTIuCgFV6F4
  const useEffectCode = `  const [youtubeVideos, setYoutubeVideos] = useState(YOUTUBE_VIDEOS);
  useEffect(() => {
    // 再生リスト(PLBdUXfR7TQh42i6ZLl4GZQnTIuCgFV6F4)のリアルタイム自動最新取得
    const playlistUrl = 'https://api.allorigins.win/raw?url=' + encodeURIComponent('https://www.youtube.com/playlist?list=PLBdUXfR7TQh42i6ZLl4GZQnTIuCgFV6F4');
    fetch(playlistUrl)
      .then(res => res.text())
      .then(html => {
        const matches = [...html.matchAll(/"videoId":"([a-zA-Z0-9_-]{11})"/g)];
        const seen = new Set();
        const videoIds = [];
        matches.forEach(m => {
          if (!seen.has(m[1])) {
            seen.add(m[1]);
            videoIds.push(m[1]);
          }
        });
        if (videoIds.length > 0) {
          const topIds = videoIds.slice(0, 20);
          Promise.all(topIds.map(id => 
            fetch(\`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=\${id}&format=json\`)
              .then(r => r.json())
              .then(data => ({
                id: id,
                title: data && data.title ? data.title : \`サカつく2026 攻略動画 (\${id})\`,
                thumbnail: \`https://i.ytimg.com/vi/\${id}/hqdefault.jpg\`,
                url: \`https://www.youtube.com/watch?v=\${id}\`
              }))
              .catch(() => ({
                id: id,
                title: \`サカつく2026 攻略動画 (\${id})\`,
                thumbnail: \`https://i.ytimg.com/vi/\${id}/hqdefault.jpg\`,
                url: \`https://www.youtube.com/watch?v=\${id}\`
              }))
          )).then(fetched => {
            if (fetched.length > 0) {
              setYoutubeVideos(fetched);
            }
          });
        }
      })
      .catch(() => {});
  }, []);`;

  // Update src/app.js
  let jsCode = fs.readFileSync(appJsPath, 'utf-8');
  jsCode = jsCode.replace(/const YOUTUBE_VIDEOS = \[[\s\S]*?\];/s, youtubeVideosStr);
  jsCode = jsCode.replace(/const \[youtubeVideos, setYoutubeVideos\] = useState\(YOUTUBE_VIDEOS\);\s*useEffect\(\(\) => \{[\s\S]*?\}, \[\]\);/s, useEffectCode);
  fs.writeFileSync(appJsPath, jsCode, 'utf-8');
  console.log('Updated src/app.js with playlist fetch logic!');

  // Update src/app.jsx
  if (fs.existsSync(appJsxPath)) {
    let jsxCode = fs.readFileSync(appJsxPath, 'utf-8');
    jsxCode = jsxCode.replace(/const YOUTUBE_VIDEOS = \[[\s\S]*?\];/s, youtubeVideosStr);
    jsxCode = jsxCode.replace(/const \[youtubeVideos, setYoutubeVideos\] = useState\(YOUTUBE_VIDEOS\);\s*useEffect\(\(\) => \{[\s\S]*?\}, \[\]\);/s, useEffectCode);
    fs.writeFileSync(appJsxPath, jsxCode, 'utf-8');
    console.log('Updated src/app.jsx with playlist fetch logic!');
  }
}

run();
