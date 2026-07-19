import { useCallback, useMemo, useState, type ChangeEvent } from 'react';
import { useCo2Data } from '../../hooks/useCo2Data';
import { LoadingSpinner } from '../loading-spinner/loading-spinner';
import { SearchBar } from '../search-bar/search-bar';
import { YearSelector } from '../year-selector/year-selector';
import { CountryList } from '../country-list/country-list';
import { ColumnModal } from '../column-modal/column-modal';
import { getAvailableYears, getAvailableColumns } from '../../utils/data-transformers';

import styles from './app.module.css';

type SortField = 'name' | 'population';
type SortOrder = 'asc' | 'desc';

type AppState = {
  searchQuery: string;
  selectedRegion: string;
  selectedYear: number;
  sortField: SortField;
  sortOrder: SortOrder;
  selectedColumns: string[];
  isColumnModalOpen: boolean;
};

const INITIAL_STATE: AppState = {
  searchQuery: '',
  selectedRegion: '',
  selectedYear: 2020,
  sortField: 'population',
  sortOrder: 'desc',
  selectedColumns: ['year', 'population', 'co2', 'co2_per_capita'],
  isColumnModalOpen: false,
};

const AVAILABLE_COLUMNS = getAvailableColumns();

export const App = () => {
  const { data, isLoading, error } = useCo2Data();

  const [state, setState] = useState<AppState>(INITIAL_STATE);

  const years = useMemo(() => {
    return data ? getAvailableYears(data) : [];
  }, [data]);

  const handleSearch = useCallback((value: string) => {
    setState((prev) => ({ ...prev, searchQuery: value }));
  }, []);

  const handleYearChange = useCallback((year: number) => {
    setState((prev) => ({ ...prev, selectedYear: year }));
  }, []);

  const handleSortFieldChange = useCallback((field: SortField) => {
    setState((prev) => ({ ...prev, sortField: field }));
  }, []);

  const handleSortSelectChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      handleSortFieldChange(e.target.value as SortField);
    },
    [handleSortFieldChange]
  );

  const handleSortOrderToggle = useCallback(() => {
    setState((prev) => ({
      ...prev,
      sortOrder: prev.sortOrder === 'asc' ? 'desc' : 'asc',
    }));
  }, []);

  const handleColumnToggle = useCallback((column: string) => {
    setState((prev) => ({
      ...prev,
      selectedColumns: prev.selectedColumns.includes(column)
        ? prev.selectedColumns.filter((c) => c !== column)
        : [...prev.selectedColumns, column],
    }));
  }, []);

  const handleModalToggle = useCallback(() => {
    setState((prev) => ({ ...prev, isColumnModalOpen: !prev.isColumnModalOpen }));
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className={styles.errorMessage}>Error: {error}</div>;
  }

  if (!data) {
    return <div className={styles.noDataMessage}>No data available</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>CO₂ Emissions Data Explorer</h1>

      {/* Controls */}
      <div className={styles.controls}>
        <SearchBar value={state.searchQuery} onChange={handleSearch} />
        <YearSelector year={state.selectedYear} years={years} onChange={handleYearChange} />

        <div className={styles.sortContainer}>
          <label className={styles.sortLabel}>Sort by:</label>
          <select
            value={state.sortField}
            onChange={handleSortSelectChange}
            className={styles.sortSelect}
          >
            <option value="population">Population</option>
            <option value="name">Name</option>
          </select>

          <button onClick={handleSortOrderToggle} className={styles.sortButton}>
            {state.sortOrder === 'asc' ? 'Ascending' : 'Descending'}
          </button>
        </div>

        <div className={styles.columnButtonContainer}>
          <button onClick={handleModalToggle} className={styles.columnButton}>
            Select columns ({state.selectedColumns.length} selected)
          </button>
        </div>
      </div>

      {/* Country List */}
      <CountryList
        countries={data}
        searchQuery={state.searchQuery}
        selectedColumns={state.selectedColumns}
        selectedRegion={state.selectedRegion}
        selectedYear={state.selectedYear}
        sortField={state.sortField}
        sortOrder={state.sortOrder}
        onYearChange={handleYearChange}
      />

      {/* Column Modal */}
      <ColumnModal
        isOpen={state.isColumnModalOpen}
        availableColumns={AVAILABLE_COLUMNS}
        selectedColumns={state.selectedColumns}
        onToggle={handleColumnToggle}
        onClose={handleModalToggle}
      />
    </div>
  );
};
