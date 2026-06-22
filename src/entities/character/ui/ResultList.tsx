'use client';

import type { ViewModelCard } from '../lib/types';
import './ResultList.css';
import ResultItem from './ResultItem';
import { useUrlSearchParameters } from '@/shared/lib/router/use-url-search-parameters';

type Props = {
  viewModelCards: ViewModelCard[];
};

export default function ResultList({ viewModelCards }: Props) {
  const { page } = useUrlSearchParameters();

  return (
    <ul className="result__list">
      {viewModelCards.map((item) => (
        <ResultItem card={item} key={item.id} page={String(page)} />
      ))}
    </ul>
  );
}
