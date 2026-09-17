const fs = require('fs');
const code = fs.readFileSync('src/app.js', 'utf8');

global.React = {
  useState: (init) => [typeof init === 'function' ? init() : init, () => {}],
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
  console.log("SUCCESS: app.js evaluated without top-level errors!");
  
  if (typeof TrainingSimulatorTab === 'function') {
    console.log("Testing TrainingSimulatorTab execution...");
    TrainingSimulatorTab({ players: [{ name: 'Yamal', mainPosition: 'CF' }], selectedPlayer: null, setSelectedPlayer: () => {}, onGoToDB: () => {} });
    console.log("SUCCESS: TrainingSimulatorTab rendered completely without errors!");
  }
} catch (e) {
  console.error("RUNTIME ERROR DETECTED:", e);
}
