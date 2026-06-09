import { configureStore } from '@reduxjs/toolkit';
import { render, type RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import type { ReactElement } from 'react';

import { countryReducer } from '@/entities/country';
import { formSubmissionReducer } from '@/entities/form-submission';

export function createTestStore() {
  return configureStore({
    reducer: {
      formSubmission: formSubmissionReducer,
      country: countryReducer,
    },
  });
}

type TestStore = ReturnType<typeof createTestStore>;

interface RenderWithProvidersOptions extends Omit<RenderOptions, 'wrapper'> {
  store?: TestStore;
}

export function renderWithProviders(
  ui: ReactElement,
  options: RenderWithProvidersOptions = {}
) {
  const store = options.store ?? createTestStore();

  return {
    store,
    ...render(<Provider store={store}>{ui}</Provider>, options),
  };
}
