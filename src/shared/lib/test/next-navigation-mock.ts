import { vi } from 'vitest';

export const nextNavigationMock = {
  pathname: '/',
  search: 'page=1',
  push: vi.fn(),
  replace: vi.fn(),
};
