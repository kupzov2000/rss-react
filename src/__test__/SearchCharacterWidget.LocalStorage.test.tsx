import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SearchCharacterWidget } from '@/widgets/search-character';
import userEvent from '@testing-library/user-event';

vi.mock('@/entities/character', () => ({
  getCharacters: vi.fn(async () => []),
}));

describe('SearchCharacterWidget localStorage', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('reads saved value from localStorage on mount', () => {
    localStorage.setItem('search_data', 'Rick');

    render(<SearchCharacterWidget />);

    const input = screen.getByRole('textbox');

    expect(input).toHaveValue('Rick');
  });

  it('shows empty input when localStorage is empty', () => {
    render(<SearchCharacterWidget />);

    const input = screen.getByRole('textbox');

    expect(input).toHaveValue('');
  });

  it('writes value to localStorage after search', async () => {
    const user = userEvent.setup();

    render(<SearchCharacterWidget />);

    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', {
      name: /search/i,
    });

    await user.type(input, 'Morty');
    await user.click(button);

    expect(localStorage.getItem('search_data')).toBe('Morty');
  });
});
