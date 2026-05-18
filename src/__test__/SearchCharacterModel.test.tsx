import { describe, it, expect, vi, beforeEach } from 'vitest';
import { searchCharacterModel } from '@/features/search-character';
import { getCharacters } from '@/entities/character';
import mockCharacter from './MockCharacter';
// import mockCharacter from './mockCharacter';

vi.mock('@/entities/character', () => ({
  getCharacters: vi.fn(),
}));

describe('searchCharacterModel cache', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('does not call API twice for same value', async () => {
    const mockedGetCharacters = vi.mocked(getCharacters);

    mockedGetCharacters.mockResolvedValue({
      items: [mockCharacter({ name: 'Rick' })],
      pages: 1,
    });

    await searchCharacterModel.search('Rick', 1);
    await searchCharacterModel.search('Rick', 1);

    expect(mockedGetCharacters).toHaveBeenCalledTimes(1);
  });
});