import type { Character, SearchData } from '@/entities/character';

export type SearchResult =
  | { type: 'SUCCESS'; data: SearchData }
  | { type: 'NOT_FOUND' }
  | { type: 'SERVER_ERROR' };

export interface SearchResultData {
  error: string | null;
  items: Character[];
  loading: boolean;
  pages: number;
}

export type Action =
  | { type: 'SET_VALUE'; payload: string }
  | { type: 'SEARCH_START'; payload: string }
  | { type: 'SEARCH_RESULT'; payload: SearchResultData }
  | { type: 'CRASH' };

export interface State {
  error: string | null;
  items: Character[];
  loading: boolean;
  pages: number;
  shouldCrash: boolean;
  value: string;
}
