import { Link } from 'react-router-dom';
import type { ViewModelCard } from '../lib/types';

type ResultItemProps = {
  card: ViewModelCard;
  page: string;
};

export default function ResultItem({ card, page }: ResultItemProps) {
  return (
    <li className="result__item">
      <Link className="result__link" to={`details/${card.id}?page=${page}`}>
        <img className="item__img" src={card.image} alt={card.name} />
        <div className="item__content">
          <span className="item__name">Full name: {card.name}</span>
          <span className="item__gender">Gender: {card.gender}</span>
          <span className="item__status">Status: {card.status}</span>
        </div>
      </Link>
    </li>
  );
}
