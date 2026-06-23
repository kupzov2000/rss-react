import type { ViewModelCard } from '@/entities/character/lib/types';

export async function downloadSelectedCharactersCsv(
  characters: ViewModelCard[]
) {
  if (characters.length === 0) {
    return;
  }

  const response = await fetch('/api/selected-characters/csv', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(characters),
  });

  if (!response.ok) {
    throw new Error('Failed to generate CSV file');
  }

  const blob = await response.blob();
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = `${characters.length}_items.csv`;

  document.body.append(link);
  link.click();
  link.remove();

  URL.revokeObjectURL(url);
}
