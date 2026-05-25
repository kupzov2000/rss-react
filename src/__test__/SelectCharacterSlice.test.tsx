import { describe, expect, it } from 'vitest';

import {
  addSelectCharacter,
  clearAllCharacters,
  removeSelectCharacter,
  selectCharacter,
} from '@/features/select-character';

const rick = {
  id: 1,
  name: 'Rick Sanchez',
  gender: 'Male',
  status: 'Alive',
  image: 'test.jpg',
};

describe('selectCharacterSlice', () => {
  it('adds character', () => {
    const state = selectCharacter(undefined, addSelectCharacter(rick));

    expect(state.results).toEqual([rick]);
  });

  it('removes character', () => {
    const initialState = {
      results: [rick],
    };

    const state = selectCharacter(initialState, removeSelectCharacter(rick));

    expect(state.results).toEqual([]);
  });

  it('clears all characters', () => {
    const initialState = {
      results: [rick],
    };

    const state = selectCharacter(initialState, clearAllCharacters());

    expect(state.results).toEqual([]);
  });
});
