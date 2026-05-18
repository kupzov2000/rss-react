import {
  mapResultToState,
  searchCharacterModel,
} from '@/features/search-character';

export async function searchCharacters(query: string) {
  const trimmed = query.trim();

  const result = await searchCharacterModel.search(trimmed);

  return mapResultToState(result);
}
