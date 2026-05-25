import { describe, it, expect, vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import { Router } from '@/app/routes/route';
import { renderWithProviders } from '@/shared/lib/test/render-with-providers';

vi.mock('@/entities/character', () => ({
  getCharacters: vi.fn().mockResolvedValue({
    items: [],
    pages: 0,
  }),

  getCharacterById: vi.fn().mockResolvedValue({
    id: 1,
    name: 'Rick',
    gender: 'Male',
    status: 'Alive',
    image: 'test.jpg',
  }),
}));

function renderApp(route: string) {
  globalThis.history.pushState({}, 'Test page', route);

  return renderWithProviders(<Router />);
}

describe('Router', () => {
  it('renders SearchPage on "/" route', () => {
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
    renderApp('/details/1');

    expect(screen.getByText(/close/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/full name/i)).toBeInTheDocument();
    });
  });

  it('renders NotFoundPage on unknown route', () => {
    renderApp('/some-random-page');

    expect(screen.getByText(/page is not found/i)).toBeInTheDocument();

    expect(screen.getByText(/go to home/i)).toBeInTheDocument();
  });
});
