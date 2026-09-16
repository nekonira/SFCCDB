const fs = require('fs');

let content = fs.readFileSync('src/app.jsx', 'utf8');

const targetStr = `      {/* ─────────────────────────────────────────────────────────────
          カード比較表モーダル (CardCompareModal - 選手DB同等マトリクス比較フォーマット)
         ───────────────────────────────────────────────────────────── */}
      {isCardCompareModalOpen && selectedCompareCardIds.length > 0 && (
        <CardCompareModal
          compareCardIds={selectedCompareCardIds}
          officialCards={officialCards}
          onClose={() => setIsCardCompareModalOpen(false)}
          onRemoveCard={(id) => toggleCompareCard(id)}
          onClearAll={() => setSelectedCompareCardIds([])}
        />
      )}`;

const replacementStr = `      {/* ─────────────────────────────────────────────────────────────
          カード比較表モーダル (CardCompareModal - 選手DB同等マトリクス比較フォーマット)
         ───────────────────────────────────────────────────────────── */}
      {isCardCompareModalOpen && selectedCompareCardIds.length > 0 && (
        <CardCompareModal
          compareCardIds={selectedCompareCardIds}
          officialCards={officialCards}
          onClose={() => setIsCardCompareModalOpen(false)}
          onRemoveCard={(id) => toggleCompareCard(id)}
          onClearAll={() => setSelectedCompareCardIds([])}
        />
      )}

      {/* 自動最適編成モーダル */}
      <AutoSelectModal
        isOpen={isAutoSelectModalOpen}
        onClose={() => setIsAutoSelectModalOpen(false)}
        onApply={(newSlots) => setSlots(newSlots)}
        currentPlayer={currentPlayer}
        officialCards={officialCards}
        calculateBoostedPlayer={calculateBoostedPlayer}
      />`;

if (content.includes(targetStr)) {
  content = content.replace(targetStr, replacementStr);
  fs.writeFileSync('src/app.jsx', content, 'utf8');
  console.log('Successfully inserted AutoSelectModal in app.jsx JSX body');
} else {
  console.error('Target string not found');
}
