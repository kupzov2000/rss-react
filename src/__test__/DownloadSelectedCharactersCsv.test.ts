import {
  downloadSelectedCharactersCsv,
  escapeCsvValue,
} from '@/features/select-character';
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

  it('escapes csv values', () => {
    expect(escapeCsvValue('Rick')).toBe('Rick');
    expect(escapeCsvValue('Morty, Smith')).toBe('"Morty, Smith"');
    expect(escapeCsvValue('Rick "Prime"')).toBe('"Rick ""Prime"""');
    expect(escapeCsvValue('Line\nBreak')).toBe('"Line\nBreak"');
  });

  it('downloads selected characters as csv file', () => {
    const createObjectUrlMock = vi
      .spyOn(URL, 'createObjectURL')
      .mockReturnValue('blob:test-url');

    const revokeObjectUrlMock = vi
      .spyOn(URL, 'revokeObjectURL')
      .mockImplementation(() => {});

    const clickMock = vi
      .spyOn(HTMLAnchorElement.prototype, 'click')
      .mockImplementation(() => {});

    let appendedLink: HTMLAnchorElement | undefined;

    vi.spyOn(document.body, 'append').mockImplementation((...nodes) => {
      for (const node of nodes) {
        if (node instanceof HTMLAnchorElement) {
          appendedLink = node;
        }
      }
    });

    downloadSelectedCharactersCsv(characters);

    expect(createObjectUrlMock).toHaveBeenCalled();
    expect(clickMock).toHaveBeenCalled();
    expect(revokeObjectUrlMock).toHaveBeenCalledWith('blob:test-url');

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
