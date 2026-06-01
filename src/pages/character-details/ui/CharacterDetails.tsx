import { useGetCharacterByIdQuery } from '@/entities/character';
import { LoadingSpinner } from '@/shared/ui/spinner';
import { type ReactNode } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import './CharacterDetails.css';
import { CharacterDetailsCard } from './CharacterDetailsCard';

export function CharacterDetails() {
  const { id } = useParams();
  const [searchParameters] = useSearchParams();
  const navigate = useNavigate();

  const page = searchParameters.get('page') || '1';
  const {
    data: character,
    isLoading,
    isFetching,
    isError,
  } = useGetCharacterByIdQuery(id ?? '', {
    skip: !id,
  });

  const isPending = isLoading || isFetching;

  function handleClose() {
    navigate(`/?page=${page}`);
  }

  let content: ReactNode;

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
