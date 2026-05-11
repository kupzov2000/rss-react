import { LoadingSpinner } from '@/shared/ui/spinner';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('Loading Spinner', () => {
  it('renders spinner with loading role', () => {
    render(<LoadingSpinner />);

    const spinner = screen.getByRole('status', { name: /loading/i });

    expect(spinner).toBeInTheDocument();
  });
});
