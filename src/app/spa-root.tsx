'use client';

import { StrictMode } from 'react';
import { Provider } from 'react-redux';

import { store } from './store/store';
import { ThemeProvider } from './providers/theme';
import { ErrorBoundary } from './providers/error-boundary';
import { Router } from './routes/route';

export default function SpaRoot() {
  return (
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
}
