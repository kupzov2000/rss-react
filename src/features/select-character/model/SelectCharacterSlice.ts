import type { ViewModelCard } from '@/entities/character/lib/types';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface SelectedCharacters {
  results: ViewModelCard[];
}

const initialState: SelectedCharacters = {
  results: [],
};

export const selectCharacterSlice = createSlice({
  name: 'selectCharacter',
  initialState,
  reducers: {
    addSelectCharacter: (state, action: PayloadAction<ViewModelCard>) => {
      state.results.push(action.payload);
    },

    removeSelectCharacter: (state, action: PayloadAction<ViewModelCard>) => {
      state.results = state.results.filter(
        (character) => character.id !== action.payload.id
      );
    },
  },
});

export const { addSelectCharacter, removeSelectCharacter } =
  selectCharacterSlice.actions;

export const selectCharacter = selectCharacterSlice.reducer;
