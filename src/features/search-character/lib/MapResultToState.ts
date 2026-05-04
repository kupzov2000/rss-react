import type { SearchResult } from '../model/types';

const ERRORS = {
  NOT_FOUND: 'Character with this name not found',
  SERVER_ERROR: 'Something went wrong. Try again later.',
};

export default function mapResultToState(result: SearchResult) {
  const baseState = {
    loading: false,
  };

  if (result.type === 'NOT_FOUND') {
    return {
      ...baseState,
      items: [],
      error: ERRORS.NOT_FOUND,
    };
  }

  if (result.type === 'SERVER_ERROR') {
    return {
      ...baseState,
      items: [],
      error: ERRORS.SERVER_ERROR,
    };
  }

  if (result.type === 'SUCCESS') {
    return {
      ...baseState,
      items: result.data,
      error: null,
    };
  }

  return {
    ...baseState,
    items: [],
    error: ERRORS.SERVER_ERROR,
  };
}
