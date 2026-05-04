import type { Character } from '@/entities/character';

export type SearchResult =
  | { type: 'SUCCESS'; data: Character[] }
  | { type: 'NOT_FOUND' }
  | { type: 'SERVER_ERROR' };
