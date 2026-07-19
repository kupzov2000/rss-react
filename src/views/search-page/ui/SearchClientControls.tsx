'use client';

import { useAppDispatch, useAppSelector } from '@/application/store/hooks';
import { setQuery, setValue } from '@/features/search-character';
import { SearchBar } from '@/features/search-character/ui';
import { useUrlSearchParameters } from '@/shared/lib/router/use-url-search-parameters';
import { useLocalStorage } from '@/shared/lib/storage';
import { useTranslations } from 'next-intl';
import { useEffect, useRef, type ChangeEvent } from 'react';

interface SearchClientControlsProps {
  initialQuery: string;
}

export function SearchClientControls({
  initialQuery,
}: SearchClientControlsProps) {
  const dispatch = useAppDispatch();
  const t = useTranslations('SearchPage');

  const value = useAppSelector((state) => state.searchCharacter.value);
  const query = useAppSelector((state) => state.searchCharacter.query);

  const [, setSavedSearch] = useLocalStorage('search_data', '');
  const { setParameter, replaceParameter, hasPageParameter } =
    useUrlSearchParameters();

  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) {
      return;
    }

    initialized.current = true;

    dispatch(setValue(initialQuery));
    dispatch(setQuery(initialQuery));

    if (!hasPageParameter) {
      replaceParameter('page', '1');
    }
  }, [dispatch, hasPageParameter, initialQuery, replaceParameter]);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    dispatch(setValue(event.currentTarget.value));
  }

  function handleSearch() {
    const trimmed = value.trim();

    if (trimmed === query) {
      return;
    }

    dispatch(setValue(trimmed));
    dispatch(setQuery(trimmed));
    setSavedSearch(trimmed);

    setParameter('name', trimmed);
    setParameter('page', '1');
  }

  return (
    <header className="header">
      <SearchBar
        value={value}
        onChange={handleChange}
        onClick={handleSearch}
        placeholder={t('placeholder')}
        buttonLabel={t('search')}
      />
    </header>
  );
}
