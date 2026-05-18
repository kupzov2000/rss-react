import { searchCharacterModel } from '@/features/search-character';
import type { State } from './types';

export const initialState: State = {
  items: [],
  pages: 0,
  value: searchCharacterModel.getSavedValue(),
  loading: false,
  error: null,
  shouldCrash: false,
};
