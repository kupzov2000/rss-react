import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getCharacters } from '@/entities/character';
import mockCharacter from './MockCharacter';
import { configureStore } from '@reduxjs/toolkit';
import { searchCharacters, searchReducer } from '@/features/search-character';

vi.mock('@/entities/character', () => ({
  getCharacters: vi.fn(),
}));

function createTestStore() {
  return configureStore({
    reducer: {
      searchCharacter: searchReducer,
    },
  });
}

describe('searchCharacters thunk', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('calls API when search is dispatched', async () => {
    const mockedGetCharacters = vi.mocked(getCharacters);

    mockedGetCharacters.mockResolvedValue({
      items: [mockCharacter({ name: 'Rick' })],
      pages: 1,
    });

    const store = createTestStore();

    await store.dispatch(searchCharacters({ name: 'Rick', page: 1 }));

    expect(mockedGetCharacters).toHaveBeenCalledTimes(1);
    expect(mockedGetCharacters).toHaveBeenCalledWith('Rick', 1);
  });
});
