'use client';

import { useGetCharacterByIdQuery } from '@/entities/character';
import { useRouter } from '@/i18n/navigation';
import { useUrlSearchParameters } from '@/shared/lib/router/use-url-search-parameters';
import { LoadingSpinner } from '@/shared/ui/spinner';
import { useTranslations } from 'next-intl';
import { type ReactNode } from 'react';

import './CharacterDetails.css';
import { CharacterDetailsCard } from './CharacterDetailsCard';

interface CharacterDetailsProps {
  id: string;
}

export function CharacterDetails({ id }: CharacterDetailsProps) {
  const router = useRouter();
  const { page } = useUrlSearchParameters();

  const t = useTranslations('CharacterDetails');

  const {
    data: character,
    isLoading,
    isFetching,
    isError,
  } = useGetCharacterByIdQuery(id, {
    skip: !id,
  });

  const isPending = isLoading || isFetching;

  function handleClose() {
    router.push(`/?page=${page}`);
  }

  let content: ReactNode = null;

  if (!id) {
    content = <p>{t('missingId')}</p>;
  } else if (isPending) {
    content = <LoadingSpinner />;
  } else if (isError) {
    content = <p>{t('serverError')}</p>;
  } else if (character === null) {
    content = <p>{t('notFound')}</p>;
  } else if (character) {
    content = <CharacterDetailsCard character={character} />;
  }

  return (
    <div className="details-panel">
      <button className="button" onClick={handleClose}>
        {t('close')}
      </button>

      {content}
    </div>
  );
}
    