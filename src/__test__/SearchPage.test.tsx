import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, vi, describe, test, expect } from 'vitest';
import { SearchPage } from '@/pages/search-page';
import { getCharacters } from '@/entities/character';
import { renderWidthRouter } from '@/shared/lib/test/render-search-page';

vi.mock('@/entities/character', () => ({
  getCharacters: vi.fn(),
}));

const mockedGetCharacters = vi.mocked(getCharacters);

function renderPage() {
  renderWidthRouter(<SearchPage />);
}

describe('SearchPage - success', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  test('renders characters after successful search', async () => {
    mockedGetCharacters.mockResolvedValue({
      items: [
        {
          id: 1,
          name: 'Rick Sanchez',
          gender: 'Male',
          status: 'Alive',
          species: 'Human',
          type: '',
          image: '',
          url: '',
          created: '',
          episode: [],
          location: { name: '', url: '' },
          origin: { name: '', url: '' },
        },
      ],
      pages: 1,
    });

    renderPage();

    const user = userEvent.setup();

    await user.type(screen.getByPlaceholderText(/search by name/i), 'rick');
    await user.click(screen.getByRole('button', { name: /search/i }));

    expect(await screen.findByText(/rick sanchez/i)).toBeInTheDocument();
  });
});

describe('SearchPage - not found', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  test('shows not found error', async () => {
    mockedGetCharacters.mockResolvedValue({
      items: [],
      pages: 0,
    });

    renderPage();

    const user = userEvent.setup();

    await user.type(screen.getByPlaceholderText(/search by name/i), 'unknown');
    await user.click(screen.getByRole('button', { name: /search/i }));

    expect(await screen.findByText(/not found/i)).toBeInTheDocument();
  });
});

describe('SearchPage - server error', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  test('shows server error', async () => {
    mockedGetCharacters.mockRejectedValue(new Error('Something went wrong'));

    renderPage();

    const user = userEvent.setup();

    await user.type(screen.getByPlaceholderText(/search by name/i), 'rick');
    await user.click(screen.getByRole('button', { name: /search/i }));

    expect(
      await screen.findByText(/something went wrong/i)
    ).toBeInTheDocument();
  });
});
