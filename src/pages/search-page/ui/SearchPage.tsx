import {
  initialState,
  reducer,
  searchCharacters,
} from '@/features/search-character';
import { SearchBar, SearchContent } from '@/features/search-character/ui';
import { PaginationMenu } from '@/widgets/pagination-menu';
import { useEffect, useReducer, type ChangeEvent } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';
import './SearchPage.css';
import { useLocalStorage } from '@/shared/lib/storage';

export default function SearchPage() {
  const [savedSearch, setSavedSearch] = useLocalStorage('search_data', '');
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    value: savedSearch,
  });
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
    const load = async () => {
      dispatch({
        type: 'SEARCH_START',
        payload: state.value.trim(),
      });

      const data = await searchCharacters(state.value, page);

      dispatch({
        type: 'SEARCH_RESULT',
        payload: data,
      });
    };

    load();
  }, [page]);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    dispatch({ type: 'SET_VALUE', payload: event.currentTarget.value });
  }

  function handleSearch() {
    setSavedSearch(state.value);
    setSearchParameters({ page: '1' });

    searchCharacters(state.value, 1).then((data) => {
      dispatch({ type: 'SEARCH_RESULT', payload: data });
    });
  }

  if (state.shouldCrash) {
    throw new Error('Test error from Error Button');
  }

  return (
    <div className="search-layout">
      <header className="header">
        <SearchBar
          value={state.value}
          onChange={handleChange}
          onClick={handleSearch}
          placeholder="Search by name..."
        />
      </header>
      <main className="main">
        <div className="main__left">
          <PaginationMenu pages={state.pages} />
          <SearchContent
            loading={state.loading}
            error={state.error}
            items={state.items}
          />
        </div>
        <Outlet></Outlet>
      </main>
    </div>
  );
}
