import { charactersApi } from '@/entities/character';
import { errorViewReducer } from '@/features/error-view-toggle';
import { searchReducer } from '@/features/search-character';
import { selectCharacter } from '@/features/select-character';
import {
  configureStore,
  type Action,
  type ThunkAction,
} from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    searchCharacter: searchReducer,
    selectCharacter,
    errorView: errorViewReducer,

    [charactersApi.reducerPath]: charactersApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(charactersApi.middleware),
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
