import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchPage } from '@/pages/search-page';
import { renderWidthRouter } from '@/shared/lib/test/render-search-page';

function mockEmptyCharactersResponse() {
  return Response.json(
    {
      info: {
        pages: 0,
      },
      results: [],
    },
    { status: 200 }
  );
}

describe('SearchPage localStorage', () => {
  beforeEach(() => {
    localStorage.clear();

    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      mockEmptyCharactersResponse()
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
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
