import type { Character } from '@/entities/character';

export interface SearchResultData {
  error: string | null;
  items: Character[];
  loading: boolean;
  pages: number;
}

export interface State {
  error: string | null;
  items: Character[];
  loading: boolean;
  pages: number;
  value: string;
  query: string;
}

export interface SearchCharactersPayload {
  name: string;
  page: number;
}
