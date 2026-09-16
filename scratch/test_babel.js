const fs = require('fs');

// Check if babel is available
try {
  const babel = require('@babel/core');
  console.log('@babel/core available');
} catch (e) {
  console.log('@babel/core not found');
}

try {
  const babelStandalone = require('@babel/standalone');
  console.log('@babel/standalone available');
} catch (e) {
  console.log('@babel/standalone not found');
}
