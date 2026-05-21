import {
  mapResultToState,
  searchCharacterModel,
} from '@/features/search-character';

export async function searchCharacters(query: string, page = 1) {
  const trimmed = query.trim();

  const result = await searchCharacterModel.search(trimmed, page);

  return mapResultToState(result);
}
