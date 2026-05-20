import type { ViewModelCard } from '../lib/types';
import './ResultList.css';
import ResultItem from './ResultItem';
import { useSearchParams } from 'react-router-dom';

type Props = {
  viewModelCards: ViewModelCard[];
};

export default function ResultList({ viewModelCards }: Props) {
  const [searchParameters] = useSearchParams();
  const currentPage = searchParameters.get('page') || '1';

  return (
    <ul className="result__list">
      {viewModelCards.map((item) => (
        <ResultItem card={item} key={item.id} page={currentPage} />
      ))}
    </ul>
  );
}
