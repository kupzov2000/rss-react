import type { ApiResponse, Character } from './types';

export async function getCharacters(
  name: string = '',
  page = 1
): Promise<Character[]> {
  const url = `https://rickandmortyapi.com/api/character/?page=${page}&name=${name}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  const data: ApiResponse = await response.json();

  return data.results;
}
