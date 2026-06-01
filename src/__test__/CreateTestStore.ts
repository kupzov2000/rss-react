import { charactersApi } from '@/entities/character';
import { configureStore } from '@reduxjs/toolkit';

export function createTestStore() {
  return configureStore({
    reducer: {
      [charactersApi.reducerPath]: charactersApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(charactersApi.middleware),
  });
}
