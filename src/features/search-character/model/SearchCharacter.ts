import { getCharacters, type SearchData } from '@/entities/character';
import type { SearchResult } from './types';

const STORAGE_KEY = 'search_data';

let lastSearchValue = '';
let lastPage = 1;
let lastResult: SearchData | null = null;

export const searchCharacterModel = {
  getSavedValue(): string {
    return localStorage.getItem(STORAGE_KEY) ?? '';
  },

  async search(value: string, page = 1): Promise<SearchResult> {
    if (value === lastSearchValue && page === lastPage && lastResult) {
      return { type: 'SUCCESS', data: lastResult };
    }

    lastSearchValue = value;
    lastPage = page;

    localStorage.setItem(STORAGE_KEY, value);

    try {
      const result = await getCharacters(value, page);

      if (result.items.length === 0) {
        lastResult = null;
        return { type: 'NOT_FOUND' };
      }

      lastResult = result;

      return { type: 'SUCCESS', data: result };
    } catch {
      return { type: 'SERVER_ERROR' };
    }
  },
};
