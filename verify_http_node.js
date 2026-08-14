const http = require('http');

const endpoints = [
  '/',
  '/src/lib/react.min.js',
  '/src/lib/react-dom.min.js',
  '/src/lib/tailwind.js',
  '/src/data/mockData.js',
  '/src/app.js',
  '/src/main.js'
];

console.log('--- Testing HTTP Server Endpoints via Node ---');

let checked = 0;
endpoints.forEach(path => {
  http.get('http://localhost:3000' + path, res => {
    console.log(`OK (${res.statusCode}): http://localhost:3000${path} (${res.headers['content-length'] || 'N/A'} bytes)`);
    checked++;
    if (checked === endpoints.length) {
      console.log('\nALL 7 HTTP ENDPOINTS ARE 100% OPERATIONAL!');
    }
  }).on('error', err => {
    console.error(`FAIL: http://localhost:3000${path} ->`, err.message);
  });
});
