import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { SearchPage } from './pages/search-page';
import { ErrorBoundary } from './app/providers/error-boundary';

const root = document.querySelector('#root');

if (!root) {
  throw new Error('root element is not defined');
}

createRoot(root).render(
  <StrictMode>
    <ErrorBoundary>
      <SearchPage />
    </ErrorBoundary>
  </StrictMode>
);
