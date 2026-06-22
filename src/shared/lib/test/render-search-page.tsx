import type { ReactElement } from 'react';

import { renderWithProviders } from './render-with-providers';
import { nextNavigationMock } from './next-navigation-mock';

export function renderWithRouter(component: ReactElement, route = '/?page=1') {
  const url = new URL(route, 'http:localhost');

  nextNavigationMock.pathname = url.pathname;
  nextNavigationMock.search = url.search.slice(1);
  nextNavigationMock.push.mockClear();
  nextNavigationMock.replace.mockClear();

  return renderWithProviders(component);
}
