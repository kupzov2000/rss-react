import { useState } from 'react';

export function useLocalStorage(key: string, initialValue = '') {
  const [storedValue, setStoredValue] = useState(() => {
    if (globalThis.window === undefined) {
      return initialValue;
    }

    return localStorage.getItem(key) ?? initialValue;
  });

  function setValue(value: string) {
    setStoredValue(value);

    if (globalThis.window !== undefined) {
      localStorage.setItem(key, value);
    }
  }

  return [storedValue, setValue] as const;
}