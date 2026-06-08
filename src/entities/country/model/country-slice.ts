import { createSlice } from '@reduxjs/toolkit';

interface CountryState {
  countries: string[];
}

const initialState: CountryState = {
  countries: ['Germany', 'Poland', 'France', 'Spain', 'Italy'],
};

export const countrySlice = createSlice({
  name: 'country',
  initialState,
  reducers: {},
});

export const countryReducer = countrySlice.reducer;
