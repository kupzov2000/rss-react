import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { State } from './types';
import { searchCharacters } from './SearchCharacterThunks';

export const initialState: State = {
  items: [],
  pages: 0,
  value: '',
  query: '',
  loading: false,
  error: null,
};

export const searchSlice = createSlice({
  name: 'searchCharacter',
  initialState,
  reducers: {
    setValue: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },

    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },

    resetSearch: () => {
      return initialState;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(searchCharacters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchCharacters.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items;
        state.pages = action.payload.pages;

        if (action.payload.items.length === 0) {
          state.error = 'Character with this name not found';
          return;
        }

        state.error = null;
      })
      .addCase(searchCharacters.rejected, (state) => {
        state.loading = false;
        state.items = [];
        state.pages = 0;
        state.error = 'Something went wrong. Try again later.';
      });
  },
});

export const { setValue, resetSearch, setQuery } = searchSlice.actions;

export const searchReducer = searchSlice.reducer;
