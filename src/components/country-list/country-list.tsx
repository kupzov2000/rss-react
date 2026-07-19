import type { Country } from '../../types';
import { CountryCard } from '../country-card/country-card';
import { List, type RowComponentProps } from 'react-window';

import styles from './country-list.module.css';
import { memo, useMemo } from 'react';

type CountryListProps = {
  countries: Country[];
  searchQuery: string;
  selectedColumns: string[];
  selectedRegion: string;
  selectedYear: number;
  sortField: 'name' | 'population';
  sortOrder: 'asc' | 'desc';
  onYearChange: (year: number) => void;
};

type CountryRowCustomProps = {
  countries: Country[];
  selectedColumns: string[];
  selectedYear: number;
};

const LIST_HEIGHT = 700;
const COUNTRY_ROW_HEIGHT = 340;
const OVERSCAN_COUNT = 5;

function CountryRow({
  ariaAttributes,
  countries,
  index,
  selectedColumns,
  selectedYear,
  style,
}: RowComponentProps<CountryRowCustomProps>) {
  const country = countries[index];

  if (!country) {
    return null;
  }

  return (
    <div {...ariaAttributes} className={styles.countryRow} style={style}>
      <CountryCard
        country={country}
        selectedYear={selectedYear}
        selectedColumns={selectedColumns}
      />
    </div>
  );
}

export const CountryList = memo(function CountryList({
  countries,
  searchQuery,
  selectedColumns,
  selectedRegion,
  selectedYear,
  sortField,
  sortOrder,
}: CountryListProps) {
  const filteredCountries = useMemo(() => {
    return countries
      .filter((c) => {
        const matchesSearch = c.id.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesRegion = !selectedRegion || c.data.some((d) => d.region === selectedRegion);
        return matchesSearch && matchesRegion;
      })
      .sort((a, b) => {
        if (sortField === 'name') {
          return sortOrder === 'asc' ? a.id.localeCompare(b.id) : b.id.localeCompare(a.id);
        }

        const popA = a.data.find((data) => data.year === selectedYear)?.population ?? 0;
        const popB = b.data.find((data) => data.year === selectedYear)?.population ?? 0;

        return sortOrder === 'asc' ? popA - popB : popB - popA;
      });
  }, [countries, searchQuery, selectedRegion, selectedYear, sortField, sortOrder]);

  const rowProps = useMemo(
    () => ({
      countries: filteredCountries,
      selectedColumns,
      selectedYear,
    }),
    [filteredCountries, selectedColumns, selectedYear]
  );

  return (
    <div className={styles.countryList}>
      <List
        className={styles.virtualList}
        rowComponent={CountryRow}
        rowCount={filteredCountries.length}
        rowHeight={COUNTRY_ROW_HEIGHT}
        rowProps={rowProps}
        overscanCount={OVERSCAN_COUNT}
        style={{ height: LIST_HEIGHT }}
      />
    </div>
  );
});
