function mountApp() {
  const rootElement = document.getElementById('root');
  if (rootElement && typeof App !== 'undefined') {
    if (!window.__app_root__) {
      window.__app_root__ = ReactDOM.createRoot(rootElement);
      window.__app_root__.render(React.createElement(App));
    }
  }
}
mountApp();
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mountApp);
}