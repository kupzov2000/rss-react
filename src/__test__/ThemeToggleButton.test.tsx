import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';

import { ThemeProvider } from '@/application/providers/theme';
import { ThemeToggleButton } from '@/features/theme-toggle';

describe('ThemeToggleButton', () => {
  beforeEach(() => {
    localStorage.clear();
    delete document.documentElement.dataset.theme;
  });

  it('shows light theme text when current theme is dark', () => {
    localStorage.setItem('theme', 'dark');

    render(
      <ThemeProvider>
        <ThemeToggleButton />
      </ThemeProvider>
    );

    expect(screen.getByRole('button')).toHaveTextContent(/light theme/i);
  });
});
