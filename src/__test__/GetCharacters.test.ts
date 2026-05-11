import { getCharacters } from '@/entities/character';
import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('getCharacters', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('returns characters list on success', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      Response.json(
        {
          results: [
            { id: 1, name: 'Rick' },
            { id: 2, name: 'Morty' },
          ],
        },
        { status: 200 }
      )
    );

    const result = await getCharacters('Rick');

    expect(result).toEqual([
      { id: 1, name: 'Rick' },
      { id: 2, name: 'Morty' },
    ]);
  });

  it('returns empty array on 404', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(null, { status: 404 })
    );

    const result = await getCharacters('unknown');

    expect(result).toEqual([]);
  });

  it('throws error on API failure', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(null, { status: 500 })
    );

    await expect(getCharacters('Rick')).rejects.toThrow('API error: 500');
  });
});
