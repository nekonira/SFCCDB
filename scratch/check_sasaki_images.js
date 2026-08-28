const fs = require('fs');
const path = require('path');

const asahiPath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\0f868610-d568-48e9-8d5c-c399e8ee6f47\\media__1785947506705.png";
const daijuPath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\e536f7dd-c90e-4781-98c2-370755852efb\\media__1786027501415.png";

console.log('Asahi Sasaki media file exists?:', fs.existsSync(asahiPath));
console.log('Daiju Sasaki media file exists?:', fs.existsSync(daijuPath));
