import { describe, it, expect, vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import { Router } from '@/app/routes/route';
import { renderWithProviders } from '@/shared/lib/test/render-with-providers';
import mockCharacter from './MockCharacter';

const character = mockCharacter({
  id: 1,
  name: 'Rick',
  gender: 'Male',
  status: 'Alive',
  species: 'Human',
});

function mockCharactersResponse() {
  return Response.json(
    {
      info: {
        pages: 1,
      },
      results: [character],
    },
    { status: 200 }
  );
}

function mockCharacterDetailsResponse() {
  return Response.json(character, { status: 200 });
}

function renderApp(route: string) {
  globalThis.history.pushState({}, 'Test page', route);

  return renderWithProviders(<Router />);
}

describe('Router', () => {
  it('renders SearchPage on "/" route', () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(mockCharactersResponse());

    renderApp('/');

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();

    expect(screen.getByPlaceholderText(/search by name/i)).toBeInTheDocument();
  });

  it('renders AboutPage on "/about" route', () => {
    renderApp('/about');

    expect(screen.getByText(/rss react/i)).toBeInTheDocument();

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
  });

  it('renders CharacterDetails on "/details/:id" route', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      mockCharacterDetailsResponse()
    );

    renderApp('/details/1');

    expect(screen.getByText(/close/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/full name/i)).toBeInTheDocument();
    });

    expect(screen.getByText(/rick/i)).toBeInTheDocument();
  });

  it('renders NotFoundPage on unknown route', () => {
    renderApp('/some-random-page');

    expect(screen.getByText(/page is not found/i)).toBeInTheDocument();

    expect(screen.getByText(/go to home/i)).toBeInTheDocument();
  });
});
