'use client';

import { useAppDispatch, useAppSelector } from '@/application/store/hooks';
import {
  addSelectCharacter,
  removeSelectCharacter,
} from '@/features/select-character';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import type { ViewModelCard } from '../lib/types';

type ResultItemProps = {
  card: ViewModelCard;
  page: string;
  eager?: boolean;
};

export default function ResultItem({
  card,
  page,
  eager = false,
}: ResultItemProps) {
  const dispatch = useAppDispatch();
  const t = useTranslations('CharacterDetails');

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
        <Image
          className="item__img"
          src={card.image}
          alt={card.name}
          width={300}
          height={300}
          loading={eager ? 'eager' : 'lazy'}
          unoptimized
        />
        <div className="item__content">
          <span className="item__name">
            {t('fullName')}: {card.name}
          </span>
          <span className="item__gender">
            {t('gender')}: {card.gender}
          </span>
          <span className="item__status">
            {t('status')}: {card.status}
          </span>
        </div>
      </Link>
    </li>
  );
}
