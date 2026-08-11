import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import PrivacyPolicy from './PrivacyPolicy.tsx';
import './index.css';

// Lightweight hash-based routing — no router dependency needed.
// "#/privacy-policy" shows the Privacy Policy page; anything else shows the main site.
// Existing in-page anchors like "#about" and "#technology" are untouched since
// they don't start with "#/".
function Root() {
  const [hash, setHash] = useState(window.location.hash);

  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash);
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  if (hash === '#/privacy-policy') {
    return <PrivacyPolicy />;
  }
  return <App />;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Root />
  </StrictMode>,
);
