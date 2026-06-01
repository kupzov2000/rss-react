import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { ApiResponse, Character, SearchData } from '../model/types';
import { getTimeSaveCache } from '@/shared/lib/timeSaveCache';

const cacheTtl = getTimeSaveCache();

const ERROR_NOT_FOUND = 404;
const SUCCESS_STATUS = 200;

interface QueryString {
  name: string;
  page: number;
}

type NotFoundResponse = {
  error: string;
};

interface CharacterTag {
  type: 'Characters';
  id: number | 'LIST';
}

function createCharacterTag(id: number | 'LIST'): CharacterTag {
  return {
    type: 'Characters',
    id,
  };
}

function createCharacterIdTag(id: string): CharacterTag[] {
  const numericId = Number(id);

  if (!Number.isFinite(numericId)) {
    return [];
  }

  return [createCharacterTag(numericId)];
}

export const charactersApi = createApi({
  reducerPath: 'charactersApi',

  baseQuery: fetchBaseQuery({ baseUrl: 'https://rickandmortyapi.com/api/' }),

  tagTypes: ['Characters'],

  keepUnusedDataFor: cacheTtl,

  endpoints: (builder) => ({
    getCharacterById: builder.query<Character | null, string>({
      query: (id) => ({
        url: `character/${id}`,
        method: 'GET',

        validateStatus: (response) =>
          response.status === SUCCESS_STATUS ||
          response.status === ERROR_NOT_FOUND,
      }),

      transformResponse: (
        response: Character | NotFoundResponse,
        meta
      ): Character | null => {
        if (meta?.response?.status === ERROR_NOT_FOUND) {
          return null;
        }

        if ('error' in response) {
          throw new Error(response.error);
        }

        return response;
      },

      providesTags: (_result, _error, id): CharacterTag[] =>
        createCharacterIdTag(id),
    }),

    getCharacters: builder.query<SearchData, QueryString>({
      query: ({ name, page }) => ({
        url: 'character',
        method: 'GET',
        params: { page, name },

        validateStatus: (response) =>
          response.status === SUCCESS_STATUS ||
          response.status === ERROR_NOT_FOUND,
      }),

      transformResponse: (
        response: ApiResponse | NotFoundResponse,
        meta
      ): SearchData => {
        if (meta?.response?.status === ERROR_NOT_FOUND) {
          return { items: [], pages: 0 };
        }

        if ('error' in response) {
          throw new Error(response.error);
        }

        return {
          items: response.results,
          pages: response.info.pages,
        };
      },

      providesTags: (result): CharacterTag[] =>
        result
          ? [
              ...result.items.map((character) =>
                createCharacterTag(character.id)
              ),
              createCharacterTag('LIST'),
            ]
          : [createCharacterTag('LIST')],
    }),
  }),
});

export const { useGetCharacterByIdQuery, useGetCharactersQuery } =
  charactersApi;
