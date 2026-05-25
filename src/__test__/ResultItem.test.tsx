import ResultItem from '@/entities/character/ui/ResultItem';
import { screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { renderWidthRouter } from '@/shared/lib/test/render-search-page';
import userEvent from '@testing-library/user-event';

describe('testing result item', () => {
  it('renders card information correctly', () => {
    const mockData = {
      id: 1,
      image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
      name: 'Rick Sanchez',
      gender: 'Male',
      status: 'Alive',
    };

    renderWidthRouter(<ResultItem card={mockData} page="1" />);

    expect(screen.getByText(/full name: rick sanchez/i)).toBeInTheDocument();
    expect(screen.getByText(/gender: male/i)).toBeInTheDocument();
    expect(screen.getByText(/status: alive/i)).toBeInTheDocument();

    expect(screen.getByRole('img')).toHaveAttribute('src', mockData.image);
  });
});

describe('ResultItem selection', () => {
  it('selects and unselects card by checkbox click', async () => {
    const user = userEvent.setup();

    const mockData = {
      id: 1,
      image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
      name: 'Rick Sanchez',
      gender: 'Male',
      status: 'Alive',
    };

    renderWidthRouter(<ResultItem card={mockData} page="1" />);

    const checkbox = screen.getByRole('checkbox');

    expect(checkbox).not.toBeChecked();

    await user.click(checkbox);
    expect(checkbox).toBeChecked();

    await user.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });
});