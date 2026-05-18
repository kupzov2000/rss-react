import { SearchBar, SearchContent } from '@/features/search-character/ui';
import { useEffect, useReducer, type ChangeEvent } from 'react';
import './SearchCharacterWidget.css';
import { reducer } from '../model/reducer';
import { searchCharacters } from '../model/search';
import { initialState } from '../model/InitialState';
import { ErrorViewButton } from '@/features/error-view-toggle';
import { PaginationMenu } from './PaginationMenu';
import { useSearchParams } from 'react-router-dom';

export default function SearchCharacterWidget() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const [searchParameters, setSearchParameters] = useSearchParams();

  const page = Number(searchParameters.get('page')) || 1;

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
    setSearchParameters({ page: '1' });

    searchCharacters(state.value, 1).then((data) => {
      dispatch({ type: 'SEARCH_RESULT', payload: data });
    });
  }

  function handleErrorView() {
    dispatch({ type: 'CRASH' });
  }

  if (state.shouldCrash) {
    throw new Error('Test error from Error Button');
  }

  return (
    <>
      <header className="header">
        <SearchBar
          value={state.value}
          onChange={handleChange}
          onClick={handleSearch}
          placeholder="Search by name..."
        />
      </header>
      <main className="main">
        <PaginationMenu pages={state.pages} />
        <SearchContent
          loading={state.loading}
          error={state.error}
          items={state.items}
        />
        <ErrorViewButton onClick={handleErrorView} />
      </main>
    </>
  );
}
