import type { Character } from '../model/types';

const ERROR_NOT_FOUND = 404;

export async function getCharacterById(id: string): Promise<Character | null> {
  const response = await fetch(
    `https://rickandmortyapi.com/api/character/${id}`
  );

  if (response.status === ERROR_NOT_FOUND) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  const data: Character = await response.json();

  return data;
}
