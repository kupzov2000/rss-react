import { memo, useCallback, type ChangeEvent } from 'react';
import styles from './year-selector.module.css';

type YearSelectorProps = {
  year: number;
  years: number[];
  onChange: (year: number) => void;
};

export const YearSelector = memo(function YearSelector({ year, years, onChange }: YearSelectorProps) {
  const handleChangeSelect = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      onChange(Number(e.target.value));
    },
    [onChange]
  );

  return (
    <div className={styles.container}>
      <label htmlFor="year" className={styles.label}>
        Select year:
      </label>
      <select id="year" value={year} onChange={handleChangeSelect} className={styles.select}>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
});
