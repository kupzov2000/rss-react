import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { describe, expect, it } from 'vitest';

import { selectCharacter } from '@/features/select-character';
import { SelectedCharacters } from '@/widgets/SelectedCharacters';

function renderSelectedCharactersWithState() {
  const store = configureStore({
    reducer: {
      selectCharacter,
    },
    preloadedState: {
      selectCharacter: {
        results: [
          {
            id: 1,
            name: 'Rick Sanchez',
            gender: 'Male',
            status: 'Alive',
            image: 'test.jpg',
          },
        ],
      },
    },
  });

  return render(
    <Provider store={store}>
      <SelectedCharacters />
    </Provider>
  );
}

describe('SelectedCharacters', () => {
  it('shows selected count', () => {
    renderSelectedCharactersWithState();

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText(/item selected/i)).toBeInTheDocument();
  });

  it('clears selected characters', async () => {
    const user = userEvent.setup();

    renderSelectedCharactersWithState();

    await user.click(screen.getByRole('button', { name: /clear/i }));

    expect(screen.getByText('0')).toBeInTheDocument();
    expect(screen.getByText(/items selected/i)).toBeInTheDocument();
  });
});
