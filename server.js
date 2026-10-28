const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

const PORTS = [3000, 3001, 3002, 3003, 8080, 8081];
const ROOT = __dirname;
const PLAYLIST_ID = 'PLBdUXfR7TQh42i6ZLl4GZQnTIuCgFV6F4';
const RSS_URL = `https://www.youtube.com/feeds/videos.xml?playlist_id=${PLAYLIST_ID}`;

function decodeXmlEntities(str) {
  if (!str) return '';
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function fetchYoutubeLatestVideos() {
  return new Promise((resolve, reject) => {
    https.get(RSS_URL, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        'Accept-Language': 'ja-JP,ja;q=0.9'
      }
    }, (res) => {
      if (res.statusCode !== 200) {
        return reject(new Error('HTTP ' + res.statusCode));
      }
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => {
        try {
          const xml = Buffer.concat(chunks).toString('utf-8');
          const entries = [...xml.matchAll(/<entry>[\s\S]*?<yt:videoId>(.*?)<\/yt:videoId>[\s\S]*?<title>(.*?)<\/title>[\s\S]*?<\/entry>/g)];
          const videos = entries.slice(0, 10).map(m => {
            const id = m[1].trim();
            const title = decodeXmlEntities(m[2].trim());
            return {
              id,
              title,
              thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
              url: `https://www.youtube.com/watch?v=${id}`
            };
          });
          if (videos.length > 0) {
            try {
              const appJsxPath = path.join(ROOT, 'src', 'app.jsx');
              const appJsPath = path.join(ROOT, 'src', 'app.js');
              if (fs.existsSync(appJsxPath)) {
                const jsx = fs.readFileSync(appJsxPath, 'utf-8');
                if (!jsx.includes(`"id": "${videos[0].id}"`)) {
                  const updatedJsx = jsx.replace(/const YOUTUBE_VIDEOS = \[[\s\S]*?\n\];/, 'const YOUTUBE_VIDEOS = ' + JSON.stringify(videos, null, 2) + ';');
                  fs.writeFileSync(appJsxPath, updatedJsx, 'utf-8');
                }
              }
              if (fs.existsSync(appJsPath)) {
                const js = fs.readFileSync(appJsPath, 'utf-8');
                if (!js.includes(`"id":"${videos[0].id}"`) && !js.includes(`"id": "${videos[0].id}"`)) {
                  const updatedJs = js.replace(/const YOUTUBE_VIDEOS\s*=\s*\[[\s\S]*?\];/, 'const YOUTUBE_VIDEOS=' + JSON.stringify(videos) + ';');
                  fs.writeFileSync(appJsPath, updatedJs, 'utf-8');
                }
              }
            } catch (e) {}
          }
          resolve(videos);
        } catch (err) {
          reject(err);
        }
      });
    }).on('error', reject);
  });
}

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.jsx': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

function createServerOnPort(index) {
  if (index >= PORTS.length) {
    console.error('No available ports found.');
    return;
  }

  const port = PORTS[index];
  const server = http.createServer((req, res) => {
    let reqPath = decodeURIComponent(req.url.split('?')[0]);
    if (reqPath === '/api/youtube') {
      fetchYoutubeLatestVideos()
        .then(videos => {
          const payload = JSON.stringify({ status: 'ok', videos });
          res.writeHead(200, {
            'Content-Type': 'application/json; charset=utf-8',
            'Access-Control-Allow-Origin': '*',
            'Cache-Control': 'no-store, no-cache, must-revalidate'
          });
          res.end(payload);
        })
        .catch(err => {
          res.writeHead(500, {
            'Content-Type': 'application/json; charset=utf-8',
            'Access-Control-Allow-Origin': '*'
          });
          res.end(JSON.stringify({ status: 'error', message: err.message }));
        });
      return;
    }
    if (reqPath === '/') {
      reqPath = '/index.html';
    }

    const filePath = path.join(ROOT, reqPath.replace(/^\//, ''));

    fs.stat(filePath, (err, stats) => {
      if (err || !stats.isFile()) {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('404 Not Found');
        return;
      }

      const ext = path.extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';

      res.writeHead(200, {
        'Content-Type': contentType,
        'Content-Length': stats.size,
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      });

      const stream = fs.createReadStream(filePath);
      stream.pipe(res);
    });
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Port ${port} in use, trying next port...`);
      createServerOnPort(index + 1);
    } else {
      console.error('Server error:', err);
    }
  });

  server.listen(port, '0.0.0.0', () => {
    const os = require('os');
    let localIp = 'localhost';
    const interfaces = os.networkInterfaces();
    for (const name of Object.keys(interfaces)) {
      for (const iface of interfaces[name]) {
        if (iface.family === 'IPv4' && !iface.internal) {
          localIp = iface.address;
          break;
        }
      }
    }

    console.log(`\n==================================================`);
    console.log(` Sakatsuku 2026 Database Web Server Started!`);
    console.log(` PC URL:      http://localhost:${port}/`);
    console.log(` iPhone/Wi-Fi: http://${localIp}:${port}/`);
    console.log(`==================================================\n`);

    fetchYoutubeLatestVideos().catch(() => {});
  });
}

createServerOnPort(0);
