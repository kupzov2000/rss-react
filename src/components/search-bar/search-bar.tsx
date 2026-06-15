import { memo, useCallback, type ChangeEvent } from 'react';
import styles from './search-bar.module.css';

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

export const SearchBar = memo(function SearchBar({ value, onChange }: SearchBarProps) {
  const handleChangeInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    },
    [onChange]
  );

  return (
    <div className={styles.container}>
      <label htmlFor="search" className={styles.label}>
        Search countries:
      </label>
      <input
        id="search"
        type="text"
        value={value}
        onChange={handleChangeInput}
        placeholder="Type to search..."
        className={styles.input}
      />
    </div>
  );
});
