import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { FormSubmission } from './types';

interface FormSubmissionState {
  submissions: FormSubmission[];
}

const initialState: FormSubmissionState = {
  submissions: [],
};

export const formSubmissionSlice = createSlice({
  name: 'formSubmission',
  initialState,
  reducers: {
    addSubmission: (state, action: PayloadAction<FormSubmission>) => {
      state.submissions.unshift(action.payload);
    },
  },
});

export const { addSubmission } = formSubmissionSlice.actions;

export const formSubmissionReducer = formSubmissionSlice.reducer;
