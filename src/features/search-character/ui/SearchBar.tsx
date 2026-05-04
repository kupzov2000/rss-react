import { Component, type ChangeEvent } from 'react';
import './SearchBar.css';

interface Props {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onClick: () => Promise<void>;
  placeholder: string;
}

export default class SearchBar extends Component<Props> {
  render() {
    return (
      <div className="search">
        <input
          className="search__input"
          value={this.props.value}
          onChange={this.props.onChange}
          placeholder={this.props.placeholder}
        />
        <button className="search__button" onClick={this.props.onClick}>
          Search
        </button>
      </div>
    );
  }
}
