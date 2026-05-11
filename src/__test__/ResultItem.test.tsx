import ResultItem from '@/entities/character/ui/ResultItem';
import { render, screen } from '@testing-library/react';
import { expect, describe, it } from 'vitest';

describe('testing result item', () => {
  it('renders card information correctly', () => {
    const mockData = {
      id: 1,
      image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
      name: 'Rick Sanchez',
      gender: 'Male',
      status: 'Alive',
    };

    render(<ResultItem card={mockData} />);

    expect(screen.getByText(/full name: rick sanchez/i)).toBeInTheDocument();

    expect(screen.getByText(/gender: male/i)).toBeInTheDocument();

    expect(screen.getByText(/status: alive/i)).toBeInTheDocument();

    expect(screen.getByRole('img')).toHaveAttribute(
      'src',
      'https://rickandmortyapi.com/api/character/avatar/1.jpeg'
    );
  });
});
