'use client';

import { useGetCharacterByIdQuery } from '@/entities/character';
import { useUrlSearchParameters } from '@/shared/lib/router/use-url-search-parameters';
import { LoadingSpinner } from '@/shared/ui/spinner';
import { useRouter } from 'next/navigation';
import { type ReactNode } from 'react';

import './CharacterDetails.css';
import { CharacterDetailsCard } from './CharacterDetailsCard';

interface CharacterDetailsProps {
  id: string;
}

export function CharacterDetails({ id }: CharacterDetailsProps) {
  const router = useRouter();
  const { page } = useUrlSearchParameters();

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
    content = <p>Character id is missing</p>;
  } else if (isPending) {
    content = <LoadingSpinner />;
  } else if (isError) {
    content = <p>Something went wrong. Try again later.</p>;
  } else if (character === null) {
    content = <p>Character not found</p>;
  } else if (character) {
    content = <CharacterDetailsCard character={character} />;
  }

  return (
    <div className="details-panel">
      <button className="button" onClick={handleClose}>
        Close
      </button>

      {content}
    </div>
  );
}
