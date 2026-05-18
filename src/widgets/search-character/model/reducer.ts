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
        ...action.payload,
      };
    }

    case 'SEARCH_INIT': {
      return {
        ...state,
        value: action.payload,
        loading: true,
        error: null,
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
