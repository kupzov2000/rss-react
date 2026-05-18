import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { SearchCharacterWidget } from '@/widgets/search-character';

vi.mock('@/entities/character', () => ({
  getCharacters: vi.fn(async () => ({
    items: [],
    pages: 0,
  })),
}));

describe('SearchCharacterWidget localStorage', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('shows empty input when localStorage is empty', () => {
    render(
      <MemoryRouter initialEntries={['/?page=1']}>
        <SearchCharacterWidget />
      </MemoryRouter>
    );

    const input = screen.getByRole('textbox');

    expect(input).toHaveValue('');
  });

  it('updates localStorage after search via URL change', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={['/?page=1']}>
        <SearchCharacterWidget />
      </MemoryRouter>
    );

    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /search/i });

    await user.type(input, 'Morty');
    await user.click(button);

    await waitFor(() => {
      expect(localStorage.getItem('search_data')).toBe('Morty');
    });
  });
});