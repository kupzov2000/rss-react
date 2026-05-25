import { createSlice } from '@reduxjs/toolkit';

interface ErrorViewState {
  shouldCrash: boolean;
}

const initialState: ErrorViewState = {
  shouldCrash: false,
};

export const errorViewSlice = createSlice({
  name: 'errorView',
  initialState,
  reducers: {
    crash: (state) => {
      state.shouldCrash = true;
    },

    resetCrash: (state) => {
      state.shouldCrash = false;
    },
  },
});

export const { crash, resetCrash } = errorViewSlice.actions;

export const errorViewReducer = errorViewSlice.reducer;
