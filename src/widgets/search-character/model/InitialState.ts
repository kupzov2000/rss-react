import { searchCharacterModel } from '@/features/search-character';
import type { State } from './types';

export const initialState: State = {
  items: [],
  value: searchCharacterModel.getSavedValue(),
  loading: false,
  error: null,
  shouldCrash: false,
};
