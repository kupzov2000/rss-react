import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { ApiResponse, Character, SearchData } from '../model/types';
import { getTimeSaveCache } from '@/shared/lib/timeSaveCache';

type NotFoundResponse = {
  error: string;
};

type CharacterTag =
  | {
      type: 'CharactersList';
      id: 'LIST';
    }
  | {
      type: 'CharacterDetails';
      id: number;
    };

interface GetCharactersQuery {
  name: string;
  page: number;
}

const cacheTtl = getTimeSaveCache();

const ERROR_NOT_FOUND = 404;
const SUCCESS_STATUS = 200;

function createCharactersListTag(): CharacterTag {
  return {
    type: 'CharactersList',
    id: 'LIST',
  };
}

function createCharacterDetailsTag(id: string): CharacterTag[] {
  const numericId = Number(id);

  if (!Number.isFinite(numericId)) {
    return [];
  }

  return [
    {
      type: 'CharacterDetails',
      id: numericId,
    },
  ];
}

export const charactersApi = createApi({
  reducerPath: 'charactersApi',

  baseQuery: fetchBaseQuery({ baseUrl: 'https://rickandmortyapi.com/api/' }),

  tagTypes: ['CharactersList', 'CharacterDetails'],

  keepUnusedDataFor: cacheTtl,
  refetchOnReconnect: true,

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
        createCharacterDetailsTag(id),
    }),

    getCharacters: builder.query<SearchData, GetCharactersQuery>({
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

      providesTags: (): CharacterTag[] => [createCharactersListTag()],
    }),
  }),
});

export const { useGetCharacterByIdQuery, useGetCharactersQuery } =
  charactersApi;
