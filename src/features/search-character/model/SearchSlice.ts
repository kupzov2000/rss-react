import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface State {
  value: string;
  query: string;
}

export const initialState: State = {
  value: '',
  query: '',
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
});

export const { setValue, resetSearch, setQuery } = searchSlice.actions;

export const searchReducer = searchSlice.reducer;
