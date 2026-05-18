import type { ApiResponse, SearchData } from '../model/types';

const ERROR_NOT_FOUND = 404;

export async function getCharacters(
  name: string = '',
  page = 1
): Promise<SearchData> {
  const url = `https://rickandmortyapi.com/api/character/?page=${page}&name=${name}`;
  const response = await fetch(url);

  if (response.status === ERROR_NOT_FOUND) {
    return { items: [], pages: 0 };
  }

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  const data: ApiResponse = await response.json();

  return { items: data.results, pages: data.info.pages };
}
