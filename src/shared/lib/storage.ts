import { useState } from 'react';

export function useLocalStorage(key: string, initialValue = '') {
  const [storedValue, setStoredValue] = useState(() => {
    return localStorage.getItem(key) ?? initialValue;
  });

  function setValue(value: string) {
    localStorage.setItem(key, value);
    setStoredValue(value);
  }

  return [storedValue, setValue] as const;
}
