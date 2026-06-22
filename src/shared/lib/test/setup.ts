import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';
import { nextNavigationMock } from './next-navigation-mock';

const messages: Record<string, Record<string, string>> = {
  Menu: {
    home: 'Home',
    about: 'About',
    refreshCharacters: 'Refresh Characters',
    error: 'Error',
  },
  SearchPage: {
    placeholder: 'Search by name...',
    search: 'Search',
    serverError: 'Something went wrong. Try again later.',
    notFound: 'Character with this name not found',
  },
  CharacterDetails: {
    close: 'Close',
    missingId: 'Character id is missing',
    serverError: 'Something went wrong. Try again later.',
    notFound: 'Character not found',
    fullName: 'Full name',
    gender: 'Gender',
    status: 'Status',
  },
  SelectedCharacters: {
    itemSelected: 'Item selected',
    itemsSelected: 'Items selected',
    clear: 'Clear',
    download: 'Download',
  },
  About: {
    description:
      'Hello my name is Evgeny. Successfully completed the main course. Learned a lot during the RS School course.',
  },
  ErrorBoundary: {
    title: 'Something went wrong, the button below should help',
    refresh: 'Refresh',
  },
  LanguageSwitcher: {
    label: 'Language',
    english: 'English',
    russian: 'Russian',
  },
  ThemeToggle: {
    toDark: 'Dark theme',
    toLight: 'Light theme',
  },
};

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

vi.mock('next-intl', () => {
  return {
    NextIntlClientProvider: ({ children }: { children: React.ReactNode }) =>
      children,
    hasLocale: (locales: readonly string[], locale: string | undefined) =>
      locale != null && locales.includes(locale),
    useLocale: () => 'en',
    useTranslations: (namespace: string) => {
      return (key: string) => {
        const dictionary = messages[namespace];

        return dictionary?.[key] ?? key;
      };
    },
  };
});

vi.mock('@/i18n/navigation', async () => {
  const { createElement } = await import('react');

  return {
    Link: ({
      href,
      children,
      ...props
    }: {
      href: string;
      children: React.ReactNode;
      [key: string]: unknown;
    }) => createElement('a', { href, ...props }, children),
    usePathname: () => nextNavigationMock.pathname,
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
