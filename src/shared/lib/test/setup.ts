import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';
import { nextNavigationMock } from './next-navigation-mock';

vi.mock('next/navigation', () => {
  return {
    usePathname: () => nextNavigationMock.pathname,

    useSearchParams: () => {
      return new URLSearchParams(nextNavigationMock.search);
    },

    useRouter: () => {
      return {
        push: nextNavigationMock.push,
        replace: nextNavigationMock.replace,
        back: vi.fn(),
        forward: vi.fn(),
        refresh: vi.fn(),
        prefetch: vi.fn(),
      };
    },
  };
});

afterEach(() => {
  cleanup();

  nextNavigationMock.pathname = '/';
  nextNavigationMock.search = 'page=1';
  nextNavigationMock.push.mockClear();
  nextNavigationMock.replace.mockClear();
});
