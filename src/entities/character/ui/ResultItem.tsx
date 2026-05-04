import type { ViewModelCard } from '../lib/types';

type ResultItemProps = {
  card: ViewModelCard;
};

export default function ResultItem({ card }: ResultItemProps) {
  return (
    <li className="result__item">
      <img className="item__img" src={card.image} alt={card.name} />
      <div className="item__content">
        <span className="item__name">Full name: {card.name}</span>
        <span className="item__gender">Gender: {card.gender}</span>
        <span className="item__status">Status: {card.status}</span>
      </div>
    </li>
  );
}
