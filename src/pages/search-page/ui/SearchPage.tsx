'use client';

import { setQuery, setValue } from '@/features/search-character';
import { SearchBar, SearchContent } from '@/features/search-character/ui';
import { PaginationMenu } from '@/widgets/pagination-menu';
import { useEffect, type ChangeEvent, type ReactNode } from 'react';
import './SearchPage.css';
import { useLocalStorage } from '@/shared/lib/storage';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { SelectedCharacters } from '@/widgets/selected-characters';
import { useGetCharactersQuery } from '@/entities/character';
import { useUrlSearchParameters } from '@/shared/lib/router/use-url-search-parameters';

interface SearchPageProps {
  children?: ReactNode;
}

export default function SearchPage({ children }: SearchPageProps) {
  const dispatch = useAppDispatch();

  const results = useAppSelector((state) => state.selectCharacter.results);
  const value = useAppSelector((state) => state.searchCharacter.value);
  const query = useAppSelector((state) => state.searchCharacter.query);

  const [savedSearch, setSavedSearch] = useLocalStorage('search_data', '');
  const { page, hasPageParameter, setParameter, replaceParameter } =
    useUrlSearchParameters();

  const { data, isLoading, isFetching, isError } = useGetCharactersQuery({
    name: query,
    page,
  });

  const items = data?.items ?? [];
  const pages = data?.pages ?? 0;
  const loading = isLoading || isFetching;

  const hasNoResults = !loading && !isError && items.length === 0;

  const error = isError
    ? 'Something went wrong. Try again later.'
    : hasNoResults
      ? 'Character with this name not found'
      : null;

  useEffect(() => {
    if (!hasPageParameter) {
      replaceParameter('page', '1');
    }
  }, [hasPageParameter, replaceParameter]);

  useEffect(() => {
    dispatch(setValue(savedSearch));
    dispatch(setQuery(savedSearch));
  }, [dispatch, savedSearch]);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    dispatch(setValue(event.currentTarget.value));
  }

  function handleSearch() {
    const trimmed = value.trim();

    const isCurrentSearch = trimmed === query;

    if (isCurrentSearch) {
      return;
    }

    dispatch(setValue(trimmed));
    dispatch(setQuery(trimmed));

    setSavedSearch(trimmed);

    setParameter('page', '1');
  }

  return (
    <div className="search-layout">
      <header className="header">
        <SearchBar
          value={value}
          onChange={handleChange}
          onClick={handleSearch}
          placeholder="Search by name..."
        />
      </header>
      <main className="main">
        <div className="main__left">
          <PaginationMenu pages={pages} />
          <SearchContent loading={loading} error={error} items={items} />
          {results.length > 0 ? <SelectedCharacters /> : null}
        </div>

        {children}
      </main>
    </div>
  );
}
