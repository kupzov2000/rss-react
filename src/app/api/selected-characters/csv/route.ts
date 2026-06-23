import type { NextRequest } from 'next/server';

type CsvCharacter = {
  id: number;
  name: string;
  gender: string;
  status: string;
  image: string;
};

function isCsvCharacter(value: unknown): value is CsvCharacter {
  return (
    typeof value === 'object' &&
    value !== null &&
    typeof Reflect.get(value, 'id') === 'number' &&
    typeof Reflect.get(value, 'name') === 'string' &&
    typeof Reflect.get(value, 'gender') === 'string' &&
    typeof Reflect.get(value, 'status') === 'string' &&
    typeof Reflect.get(value, 'image') === 'string'
  );
}

function escapeCsvValue(value: string | number) {
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

function createCsvContent(characters: CsvCharacter[], origin: string) {
  const headers = ['id', 'name', 'gender', 'status', 'image', 'detailsUrl'];

  const rows = characters.map((character) => {
    const detailsUrl = `${origin}/details/${character.id}`;

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

export async function POST(request: NextRequest) {
  const payload: unknown = await request.json();

  if (!Array.isArray(payload) || !payload.every(isCsvCharacter)) {
    return new Response('Invalid characters payload', { status: 400 });
  }

  const characters = payload;

  if (!Array.isArray(characters) || characters.length === 0) {
    return new Response('No characters selected', { status: 400 });
  }

  const origin = request.nextUrl.origin;
  const csvContent = createCsvContent(characters, origin);
  const fileName = `${characters.length}_items.csv`;

  return new Response(csvContent, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="${fileName}"`,
    },
  });
}
