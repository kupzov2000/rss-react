import type { Character } from '@/entities/character';

export interface SearchResult {
  error: string | null;
  items: Character[];
  loading: boolean;
  pages: number;
}

export type Action =
  | { type: 'SET_VALUE'; payload: string }
  | { type: 'SEARCH_START'; payload: string }
  | { type: 'SEARCH_RESULT'; payload: SearchResult }
  | { type: 'CRASH' };

export interface State {
  error: string | null;
  items: Character[];
  loading: boolean;
  pages: number;
  shouldCrash: boolean;
  value: string;
}
