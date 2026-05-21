import type { Action, State } from './types';

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_VALUE': {
      return {
        ...state,
        value: action.payload,
      };
    }

    case 'SEARCH_START': {
      return {
        ...state,
        value: action.payload,
        loading: true,
        error: null,
      };
    }

    case 'SEARCH_RESULT': {
      return {
        ...state,
        items: action.payload.items ?? [],
        pages: action.payload.pages ?? 0,
        error: action.payload.error ?? null,
        loading: false,
      };
    }

    case 'CRASH': {
      return {
        ...state,
        shouldCrash: true,
      };
    }

    default: {
      return state;
    }
  }
}
