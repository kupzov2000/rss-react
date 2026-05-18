import { SearchBar, SearchContent } from '@/features/search-character/ui';
import { useEffect, useReducer, type ChangeEvent } from 'react';
import './SearchCharacterWidget.css';
import { ErrorViewButton } from '@/features/error-view-toggle';
import { reducer } from '../model/reducer';
import { initSearch } from '../model/InitSearch';
import { searchCharacters } from '../model/search';
import { initialState } from '../model/InitialState';

export default function SearchCharacterWidget() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    initSearch(dispatch);
  }, []);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    dispatch({ type: 'SET_VALUE', payload: event.currentTarget.value });
  }

  async function handleSearch() {
    dispatch({ type: 'SEARCH_START', payload: state.value.trim() });

    const data = await searchCharacters(state.value);

    dispatch({ type: 'SEARCH_RESULT', payload: data });
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
