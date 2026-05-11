import { mapResultToState } from '@/features/search-character';
import { describe, it, expect } from 'vitest';
import mockCharacter from './mockCharacter';

describe('MapResultToState', () => {
  it('return success state', () => {
    const result = mapResultToState({
      type: 'SUCCESS',
      data: [mockCharacter({ name: 'Rick' })],
    });
    expect(result.items).toHaveLength(1);
    expect(result.error).toBeNull();
    expect(result.loading).toBe(false);
  });
  it('returns NOT_FOUND state', () => {
    const result = mapResultToState({
      type: 'NOT_FOUND',
    });
    expect(result.items).toEqual([]);
    expect(result.error).toBe('Character with this name not found');
    expect(result.loading).toBe(false);
  });
  it('returns SERVER_ERROR state', () => {
    const result = mapResultToState({
      type: 'SERVER_ERROR',
    });
    expect(result.items).toEqual([]);
    expect(result.error).toBe('Something went wrong. Try again later.');
    expect(result.loading).toBe(false);
  });
});
