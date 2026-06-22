import { nextNavigationMock } from '@/shared/lib/test/next-navigation-mock';
import { PaginationMenu } from '@/widgets/pagination-menu/ui/PaginationMenu';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

function renderWithRouter(initialPage = '1') {
  nextNavigationMock.pathname = '/';
  nextNavigationMock.search = `page=${initialPage}`;
  nextNavigationMock.push.mockClear();
  nextNavigationMock.replace.mockClear();

  return render(<PaginationMenu pages={5} />);
}

describe('PaginationMenu', () => {
  it('renders current page from query param', () => {
    renderWithRouter('3');

    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('goes to next page when Next clicked', async () => {
    const user = userEvent.setup();

    renderWithRouter('1');

    await user.click(screen.getByText('Next'));

    expect(nextNavigationMock.push).toHaveBeenCalledWith('/?page=2');
  });

  it('goes to previous page when Prev clicked', async () => {
    const user = userEvent.setup();

    renderWithRouter('3');

    await user.click(screen.getByText('Prev'));

    expect(nextNavigationMock.push).toHaveBeenCalledWith('/?page=2');
  });

  it('does not go below page 1', async () => {
    const user = userEvent.setup();

    renderWithRouter('1');

    await user.click(screen.getByText('Prev'));

    expect(nextNavigationMock.push).not.toHaveBeenCalled();
  });

  it('does not go above max pages', async () => {
    const user = userEvent.setup();

    renderWithRouter('5');

    await user.click(screen.getByText('Next'));

    expect(nextNavigationMock.push).not.toHaveBeenCalled();
  });
});
