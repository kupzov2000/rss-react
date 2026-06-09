import { countryReducer } from '@/entities/country';
import { describe, expect, it } from 'vitest';

describe('countrySlice', () => {
  it('returns default countries', () => {
    const state = countryReducer(undefined, {
      type: 'unknown',
    });

    expect(state.countries).toEqual([
      'Germany',
      'Poland',
      'France',
      'Spain',
      'Italy',
    ]);
  });
});
