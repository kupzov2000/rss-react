import { getCharacters, type SearchData } from '@/entities/character';
import { createAsyncThunk } from '@reduxjs/toolkit';
import type { SearchCharactersPayload } from './types';

export const searchCharacters = createAsyncThunk<
  SearchData,
  SearchCharactersPayload
>('searchCharacter/searchCharacters', async ({ name, page }) => {
  return await getCharacters(name.trim(), page);
});
