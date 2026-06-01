import { charactersApi } from '@/entities/character';
import { describe, expect, it, vi, afterEach } from 'vitest';
import { createTestStore } from './CreateTestStore';
import mockCharacter from './MockCharacter';

type DeferredResponse = {
  promise: Promise<Response>;
  resolve: (response: Response) => void;
};

const countCalled = 2;

function noopResolveResponse() {}

function createDeferredResponse(): DeferredResponse {
  let resolveResponse: (response: Response) => void = noopResolveResponse;

  const promise = new Promise<Response>((resolve) => {
    resolveResponse = resolve;
  });

  return {
    promise,
    resolve: resolveResponse,
  };
}

describe('CharactersApi cache behavior', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('sets loading state while getCharacters request is pending', async () => {
    const deferredResponse = createDeferredResponse();

    vi.spyOn(globalThis, 'fetch').mockReturnValue(deferredResponse.promise);

    const store = createTestStore();

    const queryArgument = {
      name: 'Rick',
      page: 1,
    };

    const request = store.dispatch(
      charactersApi.endpoints.getCharacters.initiate(queryArgument)
    );

    const queryState = charactersApi.endpoints.getCharacters.select(
      queryArgument
    )(store.getState());

    expect(queryState.isLoading).toBe(true);

    deferredResponse.resolve(
      Response.json(
        {
          results: [mockCharacter({ name: 'Rick Sanchez' })],
          info: {
            pages: 1,
          },
        },
        { status: 200 }
      )
    );

    await request.unwrap();

    request.unsubscribe();
  });

  it('uses cached getCharacters result for the same query argument', async () => {
    const character = mockCharacter({ name: 'Rick Sanchez' });

    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue(
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

    const queryArgument = {
      name: 'Rick',
      page: 1,
    };

    const firstRequest = store.dispatch(
      charactersApi.endpoints.getCharacters.initiate(queryArgument)
    );

    const firstResult = await firstRequest.unwrap();

    const secondRequest = store.dispatch(
      charactersApi.endpoints.getCharacters.initiate(queryArgument)
    );

    const secondResult = await secondRequest.unwrap();

    expect(firstResult).toEqual(secondResult);
    expect(fetchMock).toHaveBeenCalledTimes(1);

    firstRequest.unsubscribe();
    secondRequest.unsubscribe();
  });

  it('refetches active getCharacters query after list cache invalidation', async () => {
    const character = mockCharacter({ name: 'Rick Sanchez' });

    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue(
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

    const queryArgument = {
      name: 'Rick',
      page: 1,
    };

    const request = store.dispatch(
      charactersApi.endpoints.getCharacters.initiate(queryArgument)
    );

    await request.unwrap();

    store.dispatch(
      charactersApi.util.invalidateTags([
        {
          type: 'CharactersList',
          id: 'LIST',
        },
      ])
    );

    await vi.waitFor(() => {
      expect(fetchMock).toHaveBeenCalledTimes(countCalled);
    });

    request.unsubscribe();
  });

  it('uses cached getCharacterById result for the same id', async () => {
    const character = mockCharacter({
      id: 1,
      name: 'Rick Sanchez',
    });

    const fetchMock = vi
      .spyOn(globalThis, 'fetch')
      .mockResolvedValue(Response.json(character, { status: 200 }));

    const store = createTestStore();

    const firstRequest = store.dispatch(
      charactersApi.endpoints.getCharacterById.initiate('1')
    );

    const firstResult = await firstRequest.unwrap();

    const secondRequest = store.dispatch(
      charactersApi.endpoints.getCharacterById.initiate('1')
    );

    const secondResult = await secondRequest.unwrap();

    expect(firstResult).toEqual(secondResult);
    expect(fetchMock).toHaveBeenCalledTimes(1);

    firstRequest.unsubscribe();
    secondRequest.unsubscribe();
  });

  it('refetches active getCharacterById query after detail cache invalidation', async () => {
    const character = mockCharacter({
      id: 1,
      name: 'Rick Sanchez',
    });

    const fetchMock = vi
      .spyOn(globalThis, 'fetch')
      .mockResolvedValue(Response.json(character, { status: 200 }));

    const store = createTestStore();

    const request = store.dispatch(
      charactersApi.endpoints.getCharacterById.initiate('1')
    );

    await request.unwrap();

    store.dispatch(
      charactersApi.util.invalidateTags([
        {
          type: 'CharacterDetails',
          id: 1,
        },
      ])
    );

    await vi.waitFor(() => {
      expect(fetchMock).toHaveBeenCalledTimes(countCalled);
    });

    request.unsubscribe();
  });
});
