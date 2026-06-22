import { store } from '@/application/store/store';
import { render } from '@testing-library/react';
import type { ReactElement } from 'react';
import { Provider } from 'react-redux';

export function renderWithProviders(component: ReactElement) {
  return render(<Provider store={store}>{component}</Provider>);
}
