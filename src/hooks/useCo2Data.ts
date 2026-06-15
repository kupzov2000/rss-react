import { useState, useEffect } from 'react';
import type { Country, YearData } from '../types';

interface Co2DataState {
  data: Country[] | null;
  isLoading: boolean;
  error: string | null;
}

type RawCountryData = {
  iso_code?: string;
  data: YearData[];
};

type RawCo2Data = Record<string, RawCountryData>;

const INITIAL_STATE: Co2DataState = {
  data: null,
  isLoading: true,
  error: null,
};

let cachedData: Country[] | null = null;

function parseCo2Data(json: unknown): Country[] {
  const rawData = json as RawCo2Data;

  return Object.entries(rawData).map(([countryName, countryData]) => ({
    id: countryName,
    iso_code: countryData.iso_code,
    data: countryData.data,
  }));
}

export const useCo2Data = () => {
  const [state, setState] = useState<Co2DataState>(() => {
    if (cachedData) {
      return {
        data: cachedData,
        isLoading: false,
        error: null,
      };
    }

    return INITIAL_STATE;
  });

  useEffect(() => {
    if (cachedData) {
      return;
    }

    const fetchData = async () => {
      setState((prev) => ({
        ...prev,
        isLoading: true,
        error: null,
      }));

      try {
        const res = await fetch('/data/owid-co2-data.json');

        if (!res.ok) {
          throw new Error('Failed to fetch CO2 data');
        }

        const json: unknown = await res.json();
        const parsed = parseCo2Data(json);

        cachedData = parsed;

        setState({
          data: parsed,
          isLoading: false,
          error: null,
        });
      } catch (err) {
        console.error(err);

        setState({
          data: null,
          isLoading: false,
          error: err instanceof Error ? err.message : 'Unknown error',
        });
      }
    };

    fetchData();
  }, []);

  return state;
};
