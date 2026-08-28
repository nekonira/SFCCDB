const fs = require('fs');
const path = require('path');
const https = require('https');

const rootDir = path.join(__dirname, '..');
const appJsPath = path.join(rootDir, 'src', 'app.js');
const appJsxPath = path.join(rootDir, 'src', 'app.jsx');

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function run() {
  console.log('=== UPDATING YOUTUBE AUTOMATIC FETCH LOGIC ===');

  // 1. Fetch live channel RSS data via rss2json
  const rssUrl = 'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.youtube.com%2Ffeeds%2Fvideos.xml%3Fchannel_id%3DUCR4YbOvw3pjlR5Ksordt3WQ';
  const resStr = await fetchUrl(rssUrl);
  const resJson = JSON.parse(resStr);

  if (resJson.status !== 'ok' || !Array.isArray(resJson.items)) {
    console.error('Failed to fetch live YouTube channel feed!');
    return;
  }

  const liveVideos = resJson.items.map(item => {
    const videoId = item.guid ? item.guid.replace('yt:video:', '') : (item.link ? item.link.match(/v=([^&]+)/)[1] : '');
    return {
      id: videoId,
      title: item.title ? item.title.replace(/&amp;/g, '&') : '',
      thumbnail: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
      url: `https://www.youtube.com/watch?v=${videoId}`
    };
  }).filter(v => v.id);

  console.log(`Fetched ${liveVideos.length} live videos from @ねこにら1 channel!`);

  // 2. Build new YOUTUBE_VIDEOS array string
  const youtubeVideosStr = `const YOUTUBE_VIDEOS = ${JSON.stringify(liveVideos, null, 2)};`;

  // 3. Robust client-side useEffect logic
  const useEffectCode = `  const [youtubeVideos, setYoutubeVideos] = useState(YOUTUBE_VIDEOS);
  useEffect(() => {
    // チャンネルRSS（自動最新更新）
    const channelRssUrl = 'https://api.rss2json.com/v1/api.json?rss_url=' + encodeURIComponent('https://www.youtube.com/feeds/videos.xml?channel_id=UCR4YbOvw3pjlR5Ksordt3WQ');
    fetch(channelRssUrl)
      .then(res => res.json())
      .then(data => {
        if (data && data.status === 'ok' && Array.isArray(data.items) && data.items.length > 0) {
          const fetched = data.items.map(item => {
            const match = item.link ? item.link.match(/v=([^&]+)/) : null;
            const videoId = item.guid ? item.guid.replace('yt:video:', '') : (match ? match[1] : '');
            return {
              id: videoId,
              title: item.title ? item.title.replace(/&amp;/g, '&') : '',
              thumbnail: \`https://i.ytimg.com/vi/\${videoId}/hqdefault.jpg\`,
              url: item.link || \`https://www.youtube.com/watch?v=\${videoId}\`
            };
          }).filter(v => v.id);
          if (fetched.length > 0) {
            setYoutubeVideos(fetched);
          }
        }
      })
      .catch(() => {});
  }, []);`;

  // Update src/app.js
  let jsCode = fs.readFileSync(appJsPath, 'utf-8');
  jsCode = jsCode.replace(/const YOUTUBE_VIDEOS = \[[\s\S]*?\];/s, youtubeVideosStr);
  jsCode = jsCode.replace(/const \[youtubeVideos, setYoutubeVideos\] = useState\(YOUTUBE_VIDEOS\);\s*useEffect\(\(\) => \{[\s\S]*?\}, \[\]\);/s, useEffectCode);
  fs.writeFileSync(appJsPath, jsCode, 'utf-8');
  console.log('Successfully updated src/app.js with live videos and channel RSS fetch!');

  // Update src/app.jsx
  if (fs.existsSync(appJsxPath)) {
    let jsxCode = fs.readFileSync(appJsxPath, 'utf-8');
    jsxCode = jsxCode.replace(/const YOUTUBE_VIDEOS = \[[\s\S]*?\];/s, youtubeVideosStr);
    jsxCode = jsxCode.replace(/const \[youtubeVideos, setYoutubeVideos\] = useState\(YOUTUBE_VIDEOS\);\s*useEffect\(\(\) => \{[\s\S]*?\}, \[\]\);/s, useEffectCode);
    fs.writeFileSync(appJsxPath, jsxCode, 'utf-8');
    console.log('Successfully updated src/app.jsx with live videos and channel RSS fetch!');
  }
}

run();
