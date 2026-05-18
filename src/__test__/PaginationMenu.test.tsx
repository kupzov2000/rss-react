import { PaginationMenu } from '@/widgets/search-character/ui/PaginationMenu';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { describe, it, expect } from 'vitest';

function renderWithRouter(initialPage = '1') {
  return render(
    <MemoryRouter initialEntries={[`/?page=${initialPage}`]}>
      <Routes>
        <Route path="/" element={<PaginationMenu pages={5} />} />
      </Routes>
    </MemoryRouter>
  );
}

describe('PaginationMenu', () => {
  it('renders current page from query param', () => {
    renderWithRouter('3');

    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('goes to next page when Next clicked', async () => {
    const user = userEvent.setup();

    renderWithRouter('1');

    const nextButton = screen.getByText('Next');

    await user.click(nextButton);

    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('goes to previous page when Prev clicked', async () => {
    const user = userEvent.setup();

    renderWithRouter('3');

    const previousButton = screen.getByText('Prev');

    await user.click(previousButton);

    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('does not go below page 1', async () => {
    const user = userEvent.setup();

    renderWithRouter('1');

    const previousButton = screen.getByText('Prev');

    await user.click(previousButton);

    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('does not go above max pages', async () => {
    const user = userEvent.setup();

    renderWithRouter('5');

    const nextButton = screen.getByText('Next');

    await user.click(nextButton);

    expect(screen.getByText('5')).toBeInTheDocument();
  });
});
