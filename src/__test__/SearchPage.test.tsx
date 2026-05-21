import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { vi, describe, test, expect } from 'vitest';
import { searchCharacters } from '@/features/search-character';
import { SearchPage } from '@/pages/search-page';

vi.mock('@/features/search-character', async () => {
  const actual = await vi.importActual('@/features/search-character');

  return {
    ...actual,
    searchCharacters: vi.fn(),
  };
});

const mockedSearchCharacters = vi.mocked(searchCharacters);

function renderPage() {
  return render(
    <MemoryRouter initialEntries={['/?page=1']}>
      <SearchPage />
    </MemoryRouter>
  );
}

describe('SearchPage - success', () => {
  test('renders characters after successful search', async () => {
    mockedSearchCharacters.mockResolvedValue({
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
      error: null,
      loading: false,
    });
    renderPage();

    const user = userEvent.setup();

    await user.type(screen.getByPlaceholderText(/search by name/i), 'rick');

    await user.click(screen.getByRole('button', { name: /search/i }));

    expect(await screen.findByText(/rick sanchez/i)).toBeInTheDocument();
  });
});

describe('SearchPage - not found', () => {
  test('shows not found error', async () => {
    mockedSearchCharacters.mockResolvedValue({
      items: [],
      pages: 0,
      error: 'Character with this name not found',
      loading: false,
    });

    renderPage();

    const user = userEvent.setup();

    await user.type(screen.getByPlaceholderText(/search by name/i), 'unknown');

    await user.click(screen.getByRole('button', { name: /search/i }));

    expect(await screen.findByText(/not found/i)).toBeInTheDocument();
  });
});

describe('SearchPage - server error', () => {
  test('shows server error', async () => {
    mockedSearchCharacters.mockResolvedValue({
      items: [],
      pages: 0,
      error: 'Something went wrong',
      loading: false,
    });

    renderPage();

    const user = userEvent.setup();

    await user.type(screen.getByPlaceholderText(/search by name/i), 'rick');

    await user.click(screen.getByRole('button', { name: /search/i }));

    expect(
      await screen.findByText(/something went wrong/i)
    ).toBeInTheDocument();
  });
});
