import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, afterEach, vi, describe, test, expect } from 'vitest';
import { SearchPage } from '@/views/search-page';
import mockCharacter from './MockCharacter';
import { store } from '@/application/store/store';
import { charactersApi } from '@/entities/character';
import { renderWithRouter } from '@/shared/lib/test/render-search-page';

const character = mockCharacter({
  id: 1,
  name: 'Rick Sanchez',
  gender: 'Male',
  status: 'Alive',
  species: 'Human',
});

function mockCharactersResponse(results = [character], pages = 1) {
  return Response.json(
    {
      info: { pages },
      results,
    },
    { status: 200 }
  );
}

function mockNotFoundResponse() {
  return Response.json(
    {
      error: 'There is nothing here',
    },
    { status: 404 }
  );
}

function mockServerErrorResponse() {
  return Response.json(
    {
      error: 'Something went wrong',
    },
    { status: 500 }
  );
}

function renderPage() {
  renderWithRouter(<SearchPage />);
}

describe('SearchPage - success', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    store.dispatch(charactersApi.util.resetApiState());
    vi.restoreAllMocks();
  });

  test('renders characters after successful search', async () => {
    vi.spyOn(globalThis, 'fetch').mockImplementation(() =>
      Promise.resolve(mockCharactersResponse([character], 1))
    );

    renderPage();

    const user = userEvent.setup();

    await user.type(screen.getByPlaceholderText(/search by name/i), 'rick');
    await user.click(screen.getByRole('button', { name: /search/i }));

    expect(await screen.findByText(/rick sanchez/i)).toBeInTheDocument();
  });

  test('shows not found error', async () => {
    vi.spyOn(globalThis, 'fetch').mockImplementation(() =>
      Promise.resolve(mockNotFoundResponse())
    );

    renderPage();

    const user = userEvent.setup();

    await user.type(screen.getByPlaceholderText(/search by name/i), 'unknown');
    await user.click(screen.getByRole('button', { name: /search/i }));

    expect(await screen.findByText(/not found/i)).toBeInTheDocument();
  });

  test('shows server error', async () => {
    vi.spyOn(globalThis, 'fetch').mockImplementation(() =>
      Promise.resolve(mockServerErrorResponse())
    );

    renderPage();

    const user = userEvent.setup();

    await user.type(screen.getByPlaceholderText(/search by name/i), 'rick');
    await user.click(screen.getByRole('button', { name: /search/i }));

    expect(
      await screen.findByText(/something went wrong/i)
    ).toBeInTheDocument();
  });
});
