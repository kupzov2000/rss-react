import type { ViewModelCard } from '@/entities/character/lib/types';

export function escapeCsvValue(value: string | number) {
  const stringValue = String(value);

  if (
    stringValue.includes(',') ||
    stringValue.includes('"') ||
    stringValue.includes('\n')
  ) {
    return `"${stringValue.replaceAll('"', '""')}"`;
  }

  return stringValue;
}

function createCsvContent(characters: ViewModelCard[]) {
  const headers = ['id', 'name', 'gender', 'status', 'image', 'detailsUrl'];

  const rows = characters.map((character) => {
    const detailsUrl = `${globalThis.location.origin}/details/${character.id}`;

    return [
      character.id,
      character.name,
      character.gender,
      character.status,
      character.image,
      detailsUrl,
    ].map(escapeCsvValue);
  });

  return [headers, ...rows].map((row) => row.join(',')).join('\n');
}

export function downloadSelectedCharactersCsv(characters: ViewModelCard[]) {
  if (characters.length === 0) {
    return;
  }

  const csvContent = createCsvContent(characters);
  const blob = new Blob([csvContent], {
    type: 'text/csv;charset=utf-8',
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');

  link.href = url;
  link.download = `${characters.length}_items.csv`;

  document.body.append(link);
  link.click();
  link.remove();

  URL.revokeObjectURL(url);
}
