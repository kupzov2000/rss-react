import { describe, it, expect, vi, afterEach } from 'vitest';
import mockCharacter from './MockCharacter';
import { createTestStore } from './CreateTestStore';
import { charactersApi } from '@/entities/character';

describe('CharactersApi.getCharacters', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns characters list on success', async () => {
    const character = mockCharacter({ name: 'Rick Sanchez' });

    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      Response.json(
        {
          results: [character],
          info: {
            pages: 1,
          },
        },
        { status: 200 }
      )
    );

    const store = createTestStore();

    const result = await store
      .dispatch(
        charactersApi.endpoints.getCharacters.initiate({
          name: 'Rick',
          page: 1,
        })
      )
      .unwrap();

    expect(result).toEqual({
      items: [character],
      pages: 1,
    });
  });

  it('returns empty result on 404', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      Response.json(
        {
          error: 'Character with this name not found',
        },
        {
          status: 404,
        }
      )
    );

    const store = createTestStore();

    const result = await store
      .dispatch(
        charactersApi.endpoints.getCharacters.initiate({
          name: 'unknown',
          page: 1,
        })
      )
      .unwrap();

    expect(result).toEqual({ items: [], pages: 0 });
  });

  it('rejects on API failure', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      Response.json(
        {
          error: 'Something went wrong',
        },
        { status: 500 }
      )
    );

    const store = createTestStore();

    await expect(
      store
        .dispatch(
          charactersApi.endpoints.getCharacters.initiate({
            name: 'Rick',
            page: 1,
          })
        )
        .unwrap()
    ).rejects.toBeTruthy();
  });
});
