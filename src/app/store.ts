import { countryReducer } from '@/entities/country';
import { formSubmissionReducer } from '@/entities/form-submission';
import {
  configureStore,
  type Action,
  type ThunkAction,
} from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    formSubmission: formSubmissionReducer,
    country: countryReducer,
  },
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;
