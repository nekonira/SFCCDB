const fs = require('fs');
const path = require('path');

// Test data size reduction
const mockPlayer = {
  id: 'p01',
  name: '荒木 遼太郎',
  pos: 'AM',
  overall: 85,
  avatarUrl: 'data:image/webp;base64,' + 'A'.repeat(100000) // 100KB dummy base64 string
};

const squadMapWithAvatar = { 1: mockPlayer, 2: mockPlayer, 3: mockPlayer, 4: mockPlayer, 5: mockPlayer };

// Before sanitization
const rawJson = JSON.stringify(squadMapWithAvatar);
console.log('Raw JSON size with avatarUrl:', rawJson.length, 'bytes');

// After sanitization
const sanitizeMapForStorage = (map) => {
  if (!map) return {};
  const sanitized = {};
  Object.keys(map).forEach(key => {
    const p = map[key];
    if (p && p.id) {
      const { avatarUrl, ...rest } = p;
      sanitized[key] = rest;
    }
  });
  return sanitized;
};

const sanitizedJson = JSON.stringify(sanitizeMapForStorage(squadMapWithAvatar));
console.log('Sanitized JSON size without avatarUrl:', sanitizedJson.length, 'bytes');
console.log('Reduction ratio:', (rawJson.length / sanitizedJson.length).toFixed(1) + 'x smaller!');

if (sanitizedJson.length < rawJson.length / 100) {
  console.log('TEST PASSED: Team persistence payload successfully sanitized and optimized!');
} else {
  console.error('TEST FAILED');
  process.exit(1);
}
