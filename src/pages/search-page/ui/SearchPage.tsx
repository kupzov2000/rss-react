import { setQuery, setValue } from '@/features/search-character';
import { SearchBar, SearchContent } from '@/features/search-character/ui';
import { PaginationMenu } from '@/widgets/pagination-menu';
import { useEffect, type ChangeEvent } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';
import './SearchPage.css';
import { useLocalStorage } from '@/shared/lib/storage';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { SelectedCharacters } from '@/widgets/selected-characters';
import { useGetCharactersQuery } from '@/entities/character';

export default function SearchPage() {
  const dispatch = useAppDispatch();

  const results = useAppSelector((state) => state.selectCharacter.results);

  const value = useAppSelector((state) => state.searchCharacter.value);
  const query = useAppSelector((state) => state.searchCharacter.query);

  const [savedSearch, setSavedSearch] = useLocalStorage('search_data', '');
  const [searchParameters, setSearchParameters] = useSearchParams();

  const page = Number(searchParameters.get('page')) || 1;

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
    if (!searchParameters.get('page')) {
      const newParameters = new URLSearchParams(searchParameters);

      newParameters.set('page', '1');

      setSearchParameters(newParameters);
    }
  }, [searchParameters, setSearchParameters]);

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
    setSearchParameters({ page: '1' });
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
          {results.length > 0 ? <SelectedCharacters /> : ''}
        </div>
        <Outlet />
      </main>
    </div>
  );
}
