import type { Character } from '@/entities/character';
import { RefreshCacheButton } from '@/features/refresh-cache';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

type CharacterDetailsCardProps = {
  character: Character;
};

export function CharacterDetailsCard({ character }: CharacterDetailsCardProps) {
  const t = useTranslations('CharacterDetails');

  return (
    <div className="main_detail">
      <article className="main_detail__item">
        <RefreshCacheButton
          className="refresh-detail-button"
          tags={[
            {
              type: 'CharacterDetails',
              id: character.id,
            },
          ]}
        />
        <Image
          className="main_detail__img"
          src={character.image}
          alt={character.name}
          width={300}
          height={300}
          unoptimized
        />
        <div className="main_detail__content">
          <span className="main_detail__name">
            {t('fullName')}: {character.name}
          </span>
          <span className="main_detail__gender">
            {t('gender')}: {character.gender}
          </span>
          <span className="main_detail__status">
            {t('status')}: {character.status}
          </span>
        </div>
      </article>
    </div>
  );
}
