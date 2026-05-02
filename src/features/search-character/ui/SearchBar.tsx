import { Component, type ChangeEvent } from 'react';
import './SearchBar.css';

interface Props {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onClick: () => Promise<void>;
}

export default class SearchBar extends Component<Props> {
  render() {
    return (
      <>
        <input value={this.props.value} onChange={this.props.onChange} />
        <button onClick={this.props.onClick}>Search</button>
      </>
    );
  }
}
