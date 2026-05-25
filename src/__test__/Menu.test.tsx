import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { ErrorBoundary } from '@/app/providers/error-boundary';
import { Menu } from '@/widgets/menu/ui/Menu';
import { renderWithProviders } from '@/shared/lib/test/render-with-providers';

describe('Menu', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('shows error fallback after error button click', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});

    const user = userEvent.setup();

    renderWithProviders(
      <MemoryRouter>
        <ErrorBoundary>
          <Menu />
        </ErrorBoundary>
      </MemoryRouter>
    );

    await user.click(screen.getByRole('button', { name: /error/i }));

    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });
});
