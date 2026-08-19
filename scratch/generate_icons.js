const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

function createPngBuffer(width, height, drawFn) {
  // Uncompressed RGBA buffer
  const rawData = Buffer.alloc(height * (1 + width * 4));
  for (let y = 0; y < height; y++) {
    const rowOffset = y * (1 + width * 4);
    rawData[rowOffset] = 0; // Filter type 0 (None)
    for (let x = 0; x < width; x++) {
      const pxOffset = rowOffset + 1 + x * 4;
      const [r, g, b, a] = drawFn(x, y, width, height);
      rawData[pxOffset] = r;
      rawData[pxOffset + 1] = g;
      rawData[pxOffset + 2] = b;
      rawData[pxOffset + 3] = a;
    }
  }

  const compressedData = zlib.deflateSync(rawData);

  // CRC32 helper
  const crcTable = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let j = 0; j < 8; j++) {
      c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
    }
    crcTable[i] = c;
  }
  function getCrc(buf) {
    let c = 0xffffffff;
    for (let i = 0; i < buf.length; i++) {
      c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
    }
    return (c ^ 0xffffffff) >>> 0;
  }

  function makeChunk(type, data) {
    const len = data.length;
    const buf = Buffer.alloc(4 + 4 + len + 4);
    buf.writeUInt32BE(len, 0);
    buf.write(type, 4);
    data.copy(buf, 8);
    const crcVal = getCrc(buf.slice(4, 8 + len));
    buf.writeUInt32BE(crcVal, 8 + len);
    return buf;
  }

  // PNG Header
  const header = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;  // bit depth 8
  ihdr[9] = 6;  // color type RGBA (6)
  ihdr[10] = 0; // compression
  ihdr[11] = 0; // filter
  ihdr[12] = 0; // interlace
  const ihdrChunk = makeChunk('IHDR', ihdr);

  // IDAT
  const idatChunk = makeChunk('IDAT', compressedData);

  // IEND
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([header, ihdrChunk, idatChunk, iendChunk]);
}

// Icon Drawer: Sleek Dark Metallic Shield / Circle with Neon Green Accent (#00FF66)
function drawIcon(x, y, w, h) {
  const cx = w / 2;
  const cy = h / 2;
  const dx = x - cx;
  const dy = y - cy;
  const dist = Math.sqrt(dx * dx + dy * dy);
  const radius = w * 0.45;

  // Outer transparent
  if (dist > radius) {
    return [0, 0, 0, 0];
  }

  // Dark background gradient
  const t = (y / h);
  let r = Math.round(14 + (7 - 14) * t);
  let g = Math.round(21 + (10 - 21) * t);
  let b = Math.round(34 + (16 - 34) * t);
  let a = 255;

  // Ring border (Neon Green #00FF66 / Teal)
  if (dist > radius - (w * 0.04)) {
    return [0, 255, 102, 255];
  }

  // Inner Glow & Soccer Ball / Abstract Motif
  if (dist < radius * 0.6) {
    const angle = Math.atan2(dy, dx);
    const ringPattern = Math.sin(angle * 5);
    if (ringPattern > 0.5 || dist < radius * 0.25) {
      r = 0; g = 229; b = 255; // Cyan accent
    } else {
      r = 0; g = 255; b = 102; // Green accent
    }
  }

  return [r, g, b, a];
}

const icon192 = createPngBuffer(192, 192, drawIcon);
const icon512 = createPngBuffer(512, 512, drawIcon);

const publicDir = path.join(__dirname, '..', 'public');
if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });

fs.writeFileSync(path.join(publicDir, 'icon-192.png'), icon192);
fs.writeFileSync(path.join(publicDir, 'icon-512.png'), icon512);
fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), icon192);
fs.writeFileSync(path.join(__dirname, '..', 'apple-touch-icon.png'), icon192);

console.log('App Icons successfully generated for iOS and Web App PWA!');
