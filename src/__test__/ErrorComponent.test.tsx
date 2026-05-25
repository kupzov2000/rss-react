import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { ErrorComponent } from '@/shared/ui/error-component';

describe('ErrorComponent', () => {
  it('renders error fallback', () => {
    render(<ErrorComponent />);

    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
