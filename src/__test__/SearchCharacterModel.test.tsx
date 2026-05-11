import { describe, it, expect, vi, beforeEach } from 'vitest';
import { searchCharacterModel } from '@/features/search-character';
import { getCharacters } from '@/entities/character';
import mockCharacter from './mockCharacter';

vi.mock('@/entities/character', () => ({
  getCharacters: vi.fn(),
}));

describe('searchCharacterModel cache', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('does not call API twice for same value', async () => {
    const mockedGetCharacters = vi.mocked(getCharacters);

    mockedGetCharacters.mockResolvedValue([mockCharacter({ name: 'Rick' })]);

    await searchCharacterModel.search('Rick');
    await searchCharacterModel.search('Rick');

    expect(mockedGetCharacters).toHaveBeenCalledTimes(1);
  });
});
