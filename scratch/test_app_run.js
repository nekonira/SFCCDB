const fs = require('fs');
const code = fs.readFileSync('src/app.js', 'utf8');

global.React = {
  useState: (init) => {
    let val = typeof init === 'function' ? init() : init;
    if (init === 'singleCompare') val = 'slots';
    if (init === 'category') val = 'detail';
    return [val, () => {}];
  },
  useEffect: (cb) => { cb(); },
  useMemo: (cb) => cb(),
  useRef: (init) => ({ current: init }),
  useCallback: (cb) => cb,
  createElement: () => ({})
};

global.window = {
  OFFICIAL_SPECIAL_CARDS: [],
  localStorage: {
    getItem: () => null,
    setItem: () => {}
  }
};
global.document = {
  createElement: () => ({ setAttribute: () => {}, style: {} }),
  head: { appendChild: () => {} },
  body: { appendChild: () => {} }
};

try {
  eval(code);
  console.log("SUCCESS: app.js evaluated!");
  
  if (typeof TrainingSimulatorTab === 'function') {
    console.log("Testing TrainingSimulatorTab with subTab='slots' and limitGaugeMode='detail'...");
    TrainingSimulatorTab({ players: [{ name: 'Yamal', mainPosition: 'CF' }], selectedPlayer: null, setSelectedPlayer: () => {}, onGoToDB: () => {} });
    console.log("SUCCESS: 18-detail-stat mode rendered cleanly!");
  }
} catch (e) {
  console.error("EMPIRICAL RUNTIME ERROR TRACE:", e);
}
