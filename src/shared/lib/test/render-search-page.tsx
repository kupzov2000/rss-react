import { MemoryRouter } from 'react-router-dom';
import { renderWithProviders } from './render-with-providers';
import type { ReactElement } from 'react';

export function renderWidthRouter(component: ReactElement, route = '/?page=1') {
  return renderWithProviders(
    <MemoryRouter initialEntries={[route]}>{component}</MemoryRouter>
  );
}
