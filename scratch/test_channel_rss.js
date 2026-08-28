const https = require('https');

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, body: data }));
    }).on('error', reject);
  });
}

async function test() {
  const url = 'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.youtube.com%2Ffeeds%2Fvideos.xml%3Fchannel_id%3DUCR4YbOvw3pjlR5Ksordt3WQ';
  console.log('Testing channel RSS url:', url);
  const res = await fetchUrl(url);
  console.log('Status:', res.status);
  if (res.status === 200) {
    const json = JSON.parse(res.body);
    console.log('Status field:', json.status);
    console.log('Items count:', json.items ? json.items.length : 0);
    if (json.items && json.items.length > 0) {
      console.log('Latest 3 Videos:');
      json.items.slice(0, 3).forEach((item, idx) => {
        console.log(` ${idx + 1}. [${item.guid ? item.guid.replace('yt:video:', '') : 'N/A'}] ${item.title}`);
        console.log(`    Link: ${item.link}`);
        console.log(`    Thumbnail: ${item.thumbnail}`);
      });
    }
  }
}

test();
