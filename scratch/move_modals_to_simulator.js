const fs = require('fs');

let code = fs.readFileSync('src/app.jsx', 'utf8');

// 1. Remove the misplaced block from TeamBuilderTab
const startMarker = `      {/* 1. スロット装着カード変更ポップアップモーダル */}`;
const endMarker = `      {/* 4. 特練カード 比較モーダル */}
      {isCardCompareModalOpen && (
        <CardCompareModal
          compareCardIds={selectedCompareCardIds}
          officialCards={officialCards}
          currentPlayer={currentPlayer}
          onClose={() => setIsCardCompareModalOpen(false)}
          onRemoveCard={(id) => setSelectedCompareCardIds(prev => prev.filter(cId => cId !== id))}
          onClearAll={() => setSelectedCompareCardIds([])}
          onAddCard={(id) => {
            if (!selectedCompareCardIds.includes(id)) {
              setSelectedCompareCardIds(prev => [...prev, id]);
            }
          }}
        />
      )}`;

const startIdx = code.indexOf(startMarker);
const endIdx = code.indexOf(endMarker);

if (startIdx === -1 || endIdx === -1) {
  console.error('Could not find markers to extract block from TeamBuilderTab!');
  process.exit(1);
}

const blockToMove = code.substring(startIdx, endIdx + endMarker.length);
console.log('Extracted block length:', blockToMove.length);

// Remove blockToMove from TeamBuilderTab
code = code.replace(blockToMove, '');

// 2. Insert blockToMove into TrainingSimulatorTab right before `isPlayerModalOpen`
const simulatorPlayerModalMarker = `{/* 選手選択ポップアップモーダル (チームビルダー同様の視覚的切り替え) */}`;
const targetInsertIdx = code.indexOf(simulatorPlayerModalMarker);

if (targetInsertIdx === -1) {
  console.error('Could not find simulatorPlayerModalMarker in TrainingSimulatorTab!');
  process.exit(1);
}

code = code.substring(0, targetInsertIdx) + blockToMove + '\n\n      ' + code.substring(targetInsertIdx);

fs.writeFileSync('src/app.jsx', code, 'utf8');
console.log('Successfully moved modals into TrainingSimulatorTab!');
