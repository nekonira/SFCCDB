function mountApp() {
  const rootElement = document.getElementById('root');
  if (!rootElement) return;

  try {
    const _React = window.React || (typeof React !== 'undefined' ? React : null);
    const _ReactDOM = window.ReactDOM || (typeof ReactDOM !== 'undefined' ? ReactDOM : null);
    const _App = window.App || (typeof App !== 'undefined' ? App : null);

    if (!_React) {
      throw new Error('React ライブラリ (react.min.js) の読み込みに失敗しました。');
    }
    if (!_ReactDOM) {
      throw new Error('ReactDOM ライブラリ (react-dom.min.js) の読み込みに失敗しました。');
    }
    if (!_App) {
      throw new Error('アプリケーション本体 (app.js) の読み込みに失敗しました。');
    }

    if (!window.__app_root__) {
      window.__app_root__ = _ReactDOM.createRoot(rootElement);
      window.__app_root__.render(_React.createElement(_App));
    }
  } catch (err) {
    console.error('App mount failed:', err);
    rootElement.innerHTML = `
      <div style="padding: 2rem; color: #ef4444; background: #0f172a; border-radius: 12px; margin: 2rem; text-align: center; border: 1px solid #334155;">
        <h2 style="font-size: 1.5rem; margin-bottom: 1rem; color: #f87171;">⚠️ アプリケーションの起動エラー</h2>
        <p style="color: #cbd5e1; margin-bottom: 1rem;">${err.message || err}</p>
        <button onclick="location.reload()" style="padding: 0.5rem 1rem; background: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer;">再読み込み</button>
      </div>
    `;
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mountApp);
} else {
  mountApp();
}