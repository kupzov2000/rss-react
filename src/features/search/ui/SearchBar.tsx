import { Component, type ChangeEvent } from 'react';
import './SearchBar.css';
import { getCharacters } from '../api/GetItems';
import type { Character } from '../api/types';

interface State {
  items: Character[];
  value: string;
}

export default class SearchBar extends Component {
  state: State = {
    items: [],
    value: localStorage.getItem('search_data') ?? '',
  };

  componentDidMount() {
    this.loadData(this.state.value);
  }

  handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ value: event.currentTarget.value });
  };

  loadData = async (name?: string) => {
    try {
      const items = await getCharacters(name);
      this.setState({ items });
      console.log('items:', items);
    } catch (error) {
      console.log(error instanceof Error ? error.message : 'Unknown error');
    }
  };

  handleSearch = async () => {
    const trimmed = this.state.value.trim();

    localStorage.setItem('search_data', trimmed);
    this.setState({ value: trimmed });

    this.loadData(trimmed);
  };

  render() {
    return (
      <header>
        <input value={this.state.value} onChange={this.handleChange} />
        <button onClick={this.handleSearch}>Search</button>
      </header>
    );
  }
}
