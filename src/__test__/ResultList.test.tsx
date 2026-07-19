import { ResultList } from '@/entities/character/ui';
import { renderWithRouter } from '@/shared/lib/test/render-search-page';
import { screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

describe('ResultList', () => {
  it('renders all cards from props', () => {
    const mockData = [
      {
        id: 2,
        image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
        name: 'Morty Smith',
        gender: 'Male',
        status: 'Alive',
      },
      {
        id: 7,
        image: 'https://rickandmortyapi.com/api/character/avatar/7.jpeg',
        name: 'Abradolf Lincler',
        gender: 'Male',
        status: 'unknown',
      },
    ];

    renderWithRouter(<ResultList viewModelCards={mockData} />);

    const items = screen.getAllByRole('listitem');
    expect(items).toHaveLength(mockData.length);

    expect(screen.getByText(/Morty Smith/i)).toBeInTheDocument();
    expect(screen.getByText(/Abradolf Lincler/i)).toBeInTheDocument();
  });
});