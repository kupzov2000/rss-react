import type { Character } from '@/entities/character';
import {
  mapResultToState,
  searchCharacterModel,
} from '@/features/search-character';
import { SearchBar, SearchContent } from '@/features/search-character/ui';
import { Component, type ChangeEvent } from 'react';
import './SearchCharacterWidget.css';
import { ErrorViewButton } from '@/features/error-view-toggle';

interface State {
  items: Character[];
  value: string;
  loading: boolean;
  error: string | null;
  shouldCrash: boolean;
}

export default class SearchCharacterWidget extends Component {
  state: State = {
    items: [],
    value: searchCharacterModel.getSavedValue(),
    loading: false,
    error: null,
    shouldCrash: false,
  };

  async componentDidMount() {
    this.handleSearch();
  }

  handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ value: event.currentTarget.value });
  };

  handleSearch = async () => {
    const trimmed = this.state.value.trim();

    this.setState({ value: trimmed, loading: true, error: null });

    const result = await searchCharacterModel.search(trimmed);

    this.setState(mapResultToState(result));
  };

  handleErrorView = () => {
    this.setState({ shouldCrash: true });
  };

  render() {
    if (this.state.shouldCrash) {
      throw new Error('Test error from Error Button');
    }

    return (
      <>
        <header className="header">
          <SearchBar
            value={this.state.value}
            onChange={this.handleChange}
            onClick={this.handleSearch}
            placeholder="Search by name..."
          />
        </header>
        <main className="main">
          <SearchContent
            loading={this.state.loading}
            error={this.state.error}
            items={this.state.items}
          />
          <ErrorViewButton onClick={this.handleErrorView} />
        </main>
      </>
    );
  }
}
