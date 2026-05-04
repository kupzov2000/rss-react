import { getCharacters, type Character } from '@/entities/character';
import type { SearchResult } from './types';

const STORAGE_KEY = 'search_data';

let lastSearchValue = '';
let lastResult: Character[] = [];

export const searchCharacterModel = {
  getSavedValue(): string {
    return localStorage.getItem(STORAGE_KEY) ?? '';
  },

  async search(value: string): Promise<SearchResult> {
    if (value === lastSearchValue && lastResult.length > 0) {
      return { type: 'SUCCESS', data: lastResult };
    }

    lastSearchValue = value;

    localStorage.setItem(STORAGE_KEY, value);

    try {
      const result = await getCharacters(value);

      if (result.length === 0) {
        return { type: 'NOT_FOUND' };
      }

      lastResult = result;

      return { type: 'SUCCESS', data: result };
    } catch {
      return { type: 'SERVER_ERROR' };
    }
  },
};
