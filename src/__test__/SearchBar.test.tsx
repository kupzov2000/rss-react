import { SearchBar } from '@/features/search-character/ui';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';

describe('SearchBar', () => {
  const setup = () => {
    const onChange = vi.fn();
    const onClick = vi.fn(async () => {});

    render(
      <SearchBar
        value="galactic"
        onChange={onChange}
        onClick={onClick}
        placeholder="Search by name..."
      />
    );

    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /search/i });
    const user = userEvent.setup();

    return {
      input,
      button,
      onChange,
      onClick,
      user,
    };
  };

  it('renders input and button', () => {
    const { input, button } = setup();

    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('placeholder', 'Search by name...');
    expect(button).toBeInTheDocument();
  });

  it('calls onChange when typing', async () => {
    const { input, onChange, user } = setup();

    const wordInput = 'Rick';

    await user.type(input, wordInput);

    expect(onChange).toHaveBeenCalledTimes(wordInput.length);
  });

  it('calls onClick when button clicked', async () => {
    const { button, onClick, user } = setup();

    await user.click(button);

    expect(onClick).toHaveBeenCalled();
  });
});
