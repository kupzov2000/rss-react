import {
  mapResultToState,
  searchCharacterModel,
} from '@/features/search-character';
import type { Action } from './types';

export async function initSearch(dispatch: React.Dispatch<Action>) {
  const initial = searchCharacterModel.getSavedValue().trim();

  dispatch({ type: 'SEARCH_INIT', payload: initial });

  const result = await searchCharacterModel.search(initial);

  dispatch({ type: 'SEARCH_RESULT', payload: mapResultToState(result) });
}
