import { getCharacterById } from '@/entities/character';
import { describe, it, expect, vi, beforeEach } from 'vitest';

beforeEach(() => {
  vi.restoreAllMocks();
});

describe('getCharacterById', () => {
  it('returns character on success', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      Response.json(
        {
          id: 1,
          name: 'Rick',
          gender: 'Male',
          status: 'Alive',
          image: 'test.jpg',
        },
        { status: 200 }
      )
    );

    const result = await getCharacterById('1');

    expect(fetch).toHaveBeenCalledWith(
      'https://rickandmortyapi.com/api/character/1'
    );

    expect(result).toEqual({
      id: 1,
      name: 'Rick',
      gender: 'Male',
      status: 'Alive',
      image: 'test.jpg',
    });
  });

  it('returns null on 404', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(null, { status: 404 })
    );

    const result = await getCharacterById('999');

    expect(result).toBeNull();
  });

  it('throws error on non-ok response', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(null, { status: 500 })
    );

    await expect(getCharacterById('1')).rejects.toThrow('API error: 500');
  });
});
