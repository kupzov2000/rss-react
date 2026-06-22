import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { ErrorBoundary } from '@/app/providers/error-boundary';
import { renderWithProviders } from '@/shared/lib/test/render-with-providers';
import { Menu } from '@/widgets/menu/ui/Menu';

describe('Menu', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('shows error fallback after error button click', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});

    const user = userEvent.setup();

    renderWithProviders(
      <ErrorBoundary>
        <Menu>
          <div>Page content</div>
        </Menu>
      </ErrorBoundary>
    );

    await user.click(screen.getByRole('button', { name: /error/i }));

    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });
});