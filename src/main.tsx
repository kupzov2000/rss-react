import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { ErrorBoundary } from './app/providers/error-boundary';
import { Router } from './app/routes/route';
import { Provider } from 'react-redux';
import { store } from './app/store/store';
import { ThemeProvider } from './app/providers/theme';

const root = document.querySelector('#root');

if (!root) {
  throw new Error('root element is not defined');
}

createRoot(root).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <ErrorBoundary>
          <Router />
        </ErrorBoundary>
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
