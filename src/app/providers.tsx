'use client';

import { Provider } from 'react-redux';

import { ErrorBoundary } from './providers/error-boundary';
import { ThemeProvider } from './providers/theme';
import { store } from './store/store';

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <ErrorBoundary>{children}</ErrorBoundary>
      </ThemeProvider>
    </Provider>
  );
}
