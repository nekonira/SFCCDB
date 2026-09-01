const https = require('https');

function fetchRssJson() {
  return new Promise((resolve, reject) => {
    const rssUrl = encodeURIComponent('https://www.youtube.com/feeds/videos.xml?playlist_id=PLBdUXfR7TQh42i6ZLl4GZQnTIuCgFV6F4');
    const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${rssUrl}`;
    
    https.get(apiUrl, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.status === 'ok' && json.items) {
            const videos = json.items.map(item => {
              const match = item.link.match(/v=([a-zA-Z0-9_-]{11})/);
              const id = match ? match[1] : '';
              return {
                id: id,
                title: item.title,
                thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
                url: item.link
              };
            }).filter(v => v.id);
            resolve(videos);
          } else {
            reject('Invalid status or no items');
          }
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

fetchRssJson()
  .then(videos => {
    console.log('SUCCESS! Fetched ' + videos.length + ' videos from rss2json:');
    videos.forEach((v, i) => console.log(`${i+1}. [${v.id}] ${v.title}`));
  })
  .catch(err => {
    console.error('FAILED:', err);
  });
