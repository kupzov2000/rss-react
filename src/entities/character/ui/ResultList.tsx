'use client';

import type { ViewModelCard } from '../lib/types';
import './ResultList.css';
import ResultItem from './ResultItem';
import { useUrlSearchParameters } from '@/shared/lib/router/use-url-search-parameters';

const EAGER_IMAGE_COUNT = 4;

type Props = {
  viewModelCards: ViewModelCard[];
};

export default function ResultList({ viewModelCards }: Props) {
  const { page } = useUrlSearchParameters();

  return (
    <ul className="result__list">
      {viewModelCards.map((item, index) => (
        <ResultItem
          card={item}
          key={item.id}
          page={String(page)}
          eager={index < EAGER_IMAGE_COUNT}
        />
      ))}
    </ul>
  );
}
