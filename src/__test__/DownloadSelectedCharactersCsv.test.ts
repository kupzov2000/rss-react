import { downloadSelectedCharactersCsv } from '@/features/select-character';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const characters = [
  {
    id: 1,
    name: 'Rick Sanchez',
    gender: 'Male',
    status: 'Alive',
    image: 'rick.jpg',
  },
  {
    id: 2,
    name: 'Morty, Smith',
    gender: 'Male',
    status: 'Alive',
    image: 'morty.jpg',
  },
];

describe('downloadSelectedCharactersCsv', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('requests csv from api and downloads returned file', async () => {
    const response = new Response('id,name\n1,Rick', {
      status: 200,
      headers: {
        'Content-Type': 'text/csv',
      },
    });
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue(response);

    const createObjectUrlMock = vi
      .spyOn(URL, 'createObjectURL')
      .mockReturnValue('blob:test-url');

    const revokeObjectUrlMock = vi
      .spyOn(URL, 'revokeObjectURL')
      .mockImplementation(() => {});

    const clickMock = vi
      .spyOn(HTMLAnchorElement.prototype, 'click')
      .mockImplementation(() => {});

    await downloadSelectedCharactersCsv(characters);

    expect(fetchMock).toHaveBeenCalledWith('/api/selected-characters/csv', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(characters),
    });

    expect(createObjectUrlMock).toHaveBeenCalledWith(
      expect.objectContaining({
        size: 14,
        type: 'text/csv',
      })
    );
    expect(clickMock).toHaveBeenCalled();
    expect(revokeObjectUrlMock).toHaveBeenCalledWith('blob:test-url');
  });

  it('uses selected characters count as downloaded file name', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response('id,name\n1,Rick', { status: 200 })
    );

    let appendedLink: HTMLAnchorElement | undefined;

    vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:test-url');
    vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => {});
    vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {});

    vi.spyOn(document.body, 'append').mockImplementation((...nodes) => {
      for (const node of nodes) {
        if (node instanceof HTMLAnchorElement) {
          appendedLink = node;
        }
      }
    });

    await downloadSelectedCharactersCsv(characters);

    expect(appendedLink).toBeDefined();

    if (!appendedLink) {
      throw new Error('Link was not appended');
    }

    expect(appendedLink.href).toContain('blob:test-url');
    expect(appendedLink.download).toBe('2_items.csv');
  });

  it('does not download csv when selected characters list is empty', () => {
    const createObjectUrlMock = vi.spyOn(URL, 'createObjectURL');

    downloadSelectedCharactersCsv([]);

    expect(createObjectUrlMock).not.toHaveBeenCalled();
  });
});
