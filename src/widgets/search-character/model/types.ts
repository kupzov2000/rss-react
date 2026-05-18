import type { Character } from '@/entities/character';
import type { mapResultToState } from '@/features/search-character';

export type Action =
  | { type: 'SET_VALUE'; payload: string }
  | { type: 'SEARCH_START'; payload: string }
  | { type: 'SEARCH_RESULT'; payload: ReturnType<typeof mapResultToState> }
  | { type: 'SEARCH_INIT'; payload: string }
  | { type: 'CRASH' };

export interface State {
  items: Character[];
  value: string;
  loading: boolean;
  error: string | null;
  shouldCrash: boolean;
}
