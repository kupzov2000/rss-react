import type { Character } from '@/entities/character';
import { ResultList } from '@/entities/character/ui';
import { searchCharacterModel } from '@/features/search-character';
import { SearchBar } from '@/features/search-character/ui';
import { LoadingSpinner } from '@/shared/ui/spinner';
import { Component, type ChangeEvent } from 'react';

interface State {
  items: Character[];
  value: string;
  loading: boolean;
}

export default class SearchCharacterWidget extends Component {
  state: State = {
    items: [],
    value: searchCharacterModel.getSavedValue(),
    loading: false,
  };

  async componentDidMount() {
    this.handleSearch();
  }

  handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ value: event.currentTarget.value });
  };

  handleSearch = async () => {
    this.setState({ loading: true });

    const items = await searchCharacterModel.search(this.state.value);

    this.setState({ items, loading: false });
  };

  render() {
    return (
      <>
        <header className="header">
          <SearchBar
            value={this.state.value}
            onChange={this.handleChange}
            onClick={this.handleSearch}
          />
        </header>
        <main className="main">
          {this.state.loading ? (
            <LoadingSpinner />
          ) : (
            <ResultList viewModelCards={this.state.items} />
          )}
        </main>
      </>
    );
  }
}
