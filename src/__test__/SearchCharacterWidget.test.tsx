import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

import { ErrorBoundary } from '@/app/providers/error-boundary';
import { SearchCharacterWidget } from '@/widgets/search-character';

const mockSearch = vi.hoisted(() => vi.fn());

vi.mock('@/features/search-character', async () => {
  const actual = await vi.importActual('@/features/search-character');

  return {
    ...actual,
    searchCharacterModel: {
      getSavedValue: vi.fn(() => 'Rick'),
      search: mockSearch,
    },
  };
});

describe('SearchCharacterWidget', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders characters after successful search', async () => {
    mockSearch.mockResolvedValue({
      type: 'SUCCESS',
      data: {
        items: [
          {
            id: 1,
            name: 'Rick Sanchez',
            image: 'rick.png',
            created: '',
            episode: [],
            gender: '',
            location: { name: '', url: '' },
            origin: { name: '', url: '' },
            species: '',
            status: '',
            type: '',
            url: '',
          },
        ],
        pages: 1,
      },
    });

    render(
      <MemoryRouter initialEntries={['/?page=1']}>
        <SearchCharacterWidget />
      </MemoryRouter>
    );

    expect(await screen.findByText(/Rick Sanchez/i)).toBeInTheDocument();
  });

  it('shows error when search returns NOT_FOUND', async () => {
    mockSearch.mockResolvedValue({
      type: 'NOT_FOUND',
    });

    render(
      <MemoryRouter initialEntries={['/?page=1']}>
        <SearchCharacterWidget />
      </MemoryRouter>
    );

    expect(
      await screen.findByText(/character with this name not found/i)
    ).toBeInTheDocument();
  });

  it('shows error when api request fails', async () => {
    mockSearch.mockResolvedValue({
      type: 'SERVER_ERROR',
    });

    render(
      <MemoryRouter initialEntries={['/?page=1']}>
        <SearchCharacterWidget />
      </MemoryRouter>
    );

    expect(
      await screen.findByText(/something went wrong/i)
    ).toBeInTheDocument();
  });

  it('shows loading spinner while searching', async () => {
    mockSearch.mockImplementation(() => new Promise(() => {}));

    render(
      <MemoryRouter initialEntries={['/?page=1']}>
        <SearchCharacterWidget />
      </MemoryRouter>
    );

    expect(await screen.findByRole('status')).toBeInTheDocument();
  });
});

describe('SearchCharacterWidget crash state', () => {
  it('renders fallback UI when component crashes', async () => {
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    const user = userEvent.setup();

    render(
      <ErrorBoundary>
        <MemoryRouter initialEntries={['/?page=1']}>
          <SearchCharacterWidget />
        </MemoryRouter>
      </ErrorBoundary>
    );

    const crashButton = screen.getByRole('button', {
      name: /error/i,
    });

    await user.click(crashButton);

    expect(
      await screen.findByText(/something went wrong/i)
    ).toBeInTheDocument();

    consoleErrorSpy.mockRestore();
  });
});