import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SearchCharacterWidget } from '@/widgets/search-character';
import userEvent from '@testing-library/user-event';
import { ErrorBoundary } from '@/app/providers/error-boundary';

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

      data: [
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
    });

    render(<SearchCharacterWidget />);

    const character = await screen.findByText(/Rick Sanchez/i);

    expect(character).toBeInTheDocument();
  });

  it('shows error when search returns NOT_FOUND', async () => {
    mockSearch.mockResolvedValue({
      type: 'NOT_FOUND',
    });

    render(<SearchCharacterWidget />);

    const errorMessage = await screen.findByText(
      /character with this name not found/i
    );

    expect(errorMessage).toBeInTheDocument();
  });

  it('shows error when api request rejects', async () => {
    mockSearch.mockResolvedValue({
      type: 'SERVER_ERROR',
    });
    render(<SearchCharacterWidget />);

    const errorMessage = await screen.findByText(/something went wrong/i);

    expect(errorMessage).toBeInTheDocument();
  });

  it('snows loading spinner while searching', async () => {
    mockSearch.mockImplementation(() => new Promise(() => {}));

    render(<SearchCharacterWidget />);

    const loader = await screen.findByRole('status');

    expect(loader).toBeInTheDocument();
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
        <SearchCharacterWidget />
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
