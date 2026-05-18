import type { SearchData } from '@/entities/character';

export type SearchResult =
  | { type: 'SUCCESS'; data: SearchData }
  | { type: 'NOT_FOUND' }
  | { type: 'SERVER_ERROR' };
