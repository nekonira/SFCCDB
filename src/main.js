const rootElement = document.getElementById('root');
if (rootElement && typeof App !== 'undefined') {
  const root = ReactDOM.createRoot(rootElement);
  root.render(React.createElement(App));
}