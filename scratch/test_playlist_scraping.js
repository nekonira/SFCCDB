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
  console.log('Fetching YouTube playlist page directly...');
  const html = await fetchUrl('https://www.youtube.com/playlist?list=PLBdUXfR7TQh42i6ZLl4GZQnTIuCgFV6F4');
  
  const initialDataMatch = html.match(/var ytInitialData = (\{[\s\S]*?\});<\/script>/);
  if (!initialDataMatch) {
    console.log('ytInitialData not found via regex match!');
    const altMatch = html.match(/ytInitialData\s*=\s*(\{[\s\S]*?\});/);
    console.log('altMatch found?:', !!altMatch);
    return;
  }

  const jsonStr = initialDataMatch[1];
  console.log('Found ytInitialData string! Length:', jsonStr.length);

  try {
    const videoMatches = [...jsonStr.matchAll(/"playlistVideoRenderer":\s*(\{[\s\S]*?"videoId":\s*"([^"]+)".*?"text":\s*"([^"]+)")/g)];
    const videos = [];
    const seen = new Set();

    // Regex match all videoId and title in playlistVideoRenderer blocks
    const matches = jsonStr.split('"playlistVideoRenderer":');
    matches.slice(1).forEach(block => {
      const idMatch = block.match(/"videoId":\s*"([^"]+)"/);
      const titleMatch = block.match(/"title":\s*\{"runs":\[\{"text":\s*"([^"]+)"\}/);
      if (idMatch && titleMatch && !seen.has(idMatch[1])) {
        seen.add(idMatch[1]);
        videos.push({
          id: idMatch[1],
          title: titleMatch[1].replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) => String.fromCharCode(parseInt(hex, 16))),
          thumbnail: `https://i.ytimg.com/vi/${idMatch[1]}/hqdefault.jpg`,
          url: `https://www.youtube.com/watch?v=${idMatch[1]}`
        });
      }
    });

    console.log(`Extracted ${videos.length} videos from playlist PLBdUXfR7TQh42i6ZLl4GZQnTIuCgFV6F4!`);
    console.log('Videos in playlist:');
    videos.forEach((v, i) => console.log(` ${i+1}. [${v.id}] ${v.title}`));
  } catch(e) {
    console.error('Error parsing JSON:', e.message);
  }
}

run();
