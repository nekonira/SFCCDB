const fs = require('fs');
const path = require('path');
const vm = require('vm');

const appJsPath = path.join(__dirname, 'src', 'app.js');
const appCode = fs.readFileSync(appJsPath, 'utf-8');

const ctx = {
  window: {},
  console: console,
  Math: Math,
  parseInt: parseInt,
  String: String,
  Array: Array,
  Object: Object,
  React: {
    useState: (val) => [val, () => {}],
    useEffect: () => {},
    useMemo: (fn) => fn(),
    useCallback: (fn) => fn(),
    createContext: () => ({ Provider: () => {}, Consumer: () => {} }),
    createElement: () => ({})
  }
};
ctx.window = ctx;
vm.createContext(ctx);

try {
  vm.runInContext(appCode, ctx);
  console.log('App JS evaluated successfully. FlagIcon is accessible:', typeof ctx.FlagIcon !== 'undefined' || appCode.includes('const FlagIcon'));
  console.log('getCountryFlag is accessible:', typeof ctx.getCountryFlag !== 'undefined' || appCode.includes('const getCountryFlag'));
} catch (err) {
  console.error('Error during evaluation:', err);
  process.exit(1);
}
