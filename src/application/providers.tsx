'use client';

import { Provider } from 'react-redux';

import { store } from './store/store';
import { ErrorBoundary } from './providers/error-boundary';
import { ThemeProvider } from './providers/theme';

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
