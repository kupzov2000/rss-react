import type { Character } from '@/entities/character';

export interface SearchResultData {
  error: string | null;
  items: Character[];
  loading: boolean;
  pages: number;
}

export interface SearchCharactersPayload {
  name: string;
  page: number;
}
