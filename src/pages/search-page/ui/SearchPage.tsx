import {
  searchCharacters,
  setQuery,
  setValue,
} from '@/features/search-character';
import { SearchBar, SearchContent } from '@/features/search-character/ui';
import { PaginationMenu } from '@/widgets/pagination-menu';
import { useEffect, type ChangeEvent } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';
import './SearchPage.css';
import { useLocalStorage } from '@/shared/lib/storage';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { SelectedCharacters } from '@/widgets/selected-characters';

export default function SearchPage() {
  const dispatch = useAppDispatch();

  const results = useAppSelector((state) => state.selectCharacter.results);

  const items = useAppSelector((state) => state.searchCharacter.items);
  const pages = useAppSelector((state) => state.searchCharacter.pages);
  const value = useAppSelector((state) => state.searchCharacter.value);
  const loading = useAppSelector((state) => state.searchCharacter.loading);
  const error = useAppSelector((state) => state.searchCharacter.error);
  const query = useAppSelector((state) => state.searchCharacter.query);

  const [savedSearch, setSavedSearch] = useLocalStorage('search_data', '');
  const [searchParameters, setSearchParameters] = useSearchParams();

  const page = Number(searchParameters.get('page')) || 1;

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

  useEffect(() => {
    const currentSearchValue = value || savedSearch;

    dispatch(searchCharacters({ name: currentSearchValue, page }));
  }, [dispatch, page]);

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
    dispatch(setQuery(savedSearch));

    setSavedSearch(trimmed);
    setSearchParameters({ page: '1' });

    dispatch(searchCharacters({ name: trimmed, page: 1 }));
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
        <Outlet></Outlet>
      </main>
    </div>
  );
}
