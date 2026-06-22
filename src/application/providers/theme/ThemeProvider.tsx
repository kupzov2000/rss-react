'use client';

import {
  useCallback,
  useEffect,
  useSyncExternalStore,
  type ReactNode,
} from 'react';
import { ThemeContext, type Theme } from './ThemeContext';

const THEME_STORAGE_KEY = 'theme';
const THEME_CHANGE_EVENT = 'theme-change';

interface ThemeProviderProps {
  children: ReactNode;
}

function getSavedTheme(): Theme | null {
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);

  if (savedTheme === 'light' || savedTheme === 'dark') {
    return savedTheme;
  }

  return null;
}

function getThemeSnapshot(): Theme {
  return getSavedTheme() ?? 'light';
}

function getServerThemeSnapshot(): Theme {
  return 'light';
}

function subscribeToThemeChange(onStoreChange: () => void) {
  globalThis.addEventListener(THEME_CHANGE_EVENT, onStoreChange);
  globalThis.addEventListener('storage', onStoreChange);

  return () => {
    globalThis.removeEventListener(THEME_CHANGE_EVENT, onStoreChange);
    globalThis.removeEventListener('storage', onStoreChange);
  };
}

function saveTheme(theme: Theme) {
  localStorage.setItem(THEME_STORAGE_KEY, theme);
  globalThis.dispatchEvent(new Event(THEME_CHANGE_EVENT));
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const theme = useSyncExternalStore(
    subscribeToThemeChange,
    getThemeSnapshot,
    getServerThemeSnapshot
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    saveTheme(theme === 'light' ? 'dark' : 'light');
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
