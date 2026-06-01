import { describe, it, expect, vi, afterEach } from 'vitest';
import { createTestStore } from './CreateTestStore';
import { charactersApi } from '@/entities/character';
import mockCharacter from './MockCharacter';

afterEach(() => {
  vi.restoreAllMocks();
});

describe('getCharacterById', () => {
  it('returns character on success', async () => {
    const character = mockCharacter({
      id: 1,
      name: 'Rick',
      gender: 'Male',
      status: 'Alive',
      image: 'test.jpg',
    });

    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      Response.json(character, { status: 200 })
    );

    const store = createTestStore();

    const result = await store
      .dispatch(charactersApi.endpoints.getCharacterById.initiate('1'))
      .unwrap();

    expect(result).toEqual(character);
  });

  it('returns null on 404', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(null, { status: 404 })
    );

    const store = createTestStore();

    const result = await store
      .dispatch(charactersApi.endpoints.getCharacterById.initiate('999'))
      .unwrap();

    expect(result).toBeNull();
  });

  it('throws error on non-ok response', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      Response.json({ error: 'Something went wrong' }, { status: 500 })
    );

    const store = createTestStore();

    await expect(
      store
        .dispatch(charactersApi.endpoints.getCharacterById.initiate('1'))
        .unwrap()
    ).rejects.toBeTruthy();
  });
});
