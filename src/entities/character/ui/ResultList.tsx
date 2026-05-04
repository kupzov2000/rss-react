import { Component } from 'react';
import type { ViewModelCard } from '../lib/types';
import './ResultList.css';
import ResultItem from './ResultItem';

type Props = {
  viewModelCards: ViewModelCard[];
};

export default class ResultList extends Component<Props> {
  render() {
    return (
      <ul className="result__list">
        {this.props.viewModelCards.map((item) => (
          <ResultItem card={item} key={item.id} />
        ))}
      </ul>
    );
  }
}
