import type { State } from './types';

export const initialState: State = {
  items: [],
  pages: 0,
  value: '',
  loading: false,
  error: null,
  shouldCrash: false,
};
