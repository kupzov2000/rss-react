import { describe, it, expect, beforeEach, vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchPage } from '@/pages/search-page';
import { renderWidthRouter } from '@/shared/lib/test/render-search-page';

vi.mock('@/entities/character', () => ({
  getCharacters: vi.fn(async () => ({
    items: [],
    pages: 0,
  })),
}));

describe('SearchPage localStorage', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('shows empty input when localStorage is empty', () => {
    renderWidthRouter(<SearchPage />);

    const input = screen.getByRole('textbox');

    expect(input).toHaveValue('');
  });

  it('updates localStorage after search via URL change', async () => {
    const user = userEvent.setup();

    renderWidthRouter(<SearchPage />);

    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /search/i });

    await user.type(input, 'Morty');
    await user.click(button);

    await waitFor(() => {
      expect(localStorage.getItem('search_data')).toBe('Morty');
    });
  });
});