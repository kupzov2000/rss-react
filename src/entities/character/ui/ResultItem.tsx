'use client';

import Link from 'next/link';
import type { ViewModelCard } from '../lib/types';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import {
  addSelectCharacter,
  removeSelectCharacter,
} from '@/features/select-character';

type ResultItemProps = {
  card: ViewModelCard;
  page: string;
};

export default function ResultItem({ card, page }: ResultItemProps) {
  const dispatch = useAppDispatch();

  const checked = useAppSelector((state) => {
    return state.selectCharacter.results.some(
      (character) => character.id === card.id
    );
  });

  function toggleCard() {
    if (checked) {
      dispatch(removeSelectCharacter(card));
    } else {
      dispatch(addSelectCharacter(card));
    }
  }

  return (
    <li className="result__item">
      <input
        checked={checked}
        onChange={toggleCard}
        className="item__select-input"
        type="checkbox"
      />
      <Link className="result__link" href={`/details/${card.id}?page=${page}`}>
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
