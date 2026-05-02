import { getCharacters, type Character } from '@/entities/character';

const STORAGE_KEY = 'search_data';

export const searchCharacterModel = {
  getSavedValue(): string {
    return localStorage.getItem(STORAGE_KEY) ?? '';
  },

  async search(value: string): Promise<Character[]> {
    const trimmed = value.trim();

    localStorage.setItem(STORAGE_KEY, trimmed);

    return await getCharacters(trimmed);
  },
};
