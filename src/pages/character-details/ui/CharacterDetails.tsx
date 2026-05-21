import { getCharacterById, type Character } from '@/entities/character';
import { LoadingSpinner } from '@/shared/ui/spinner';
import { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import './CharacterDetails.css';

export function CharacterDetails() {
  const { id } = useParams();
  const [searchParameters] = useSearchParams();
  const navigate = useNavigate();

  const [character, setCharacter] = useState<Character | null>(null);

  const page = searchParameters.get('page') || '1';

  useEffect(() => {
    async function load() {
      if (!id) {
        return;
      }

      const data = await getCharacterById(id);
      setCharacter(data);
    }

    load();
  }, [id]);

  function handleClose() {
    navigate(`/?page=${page}`);
  }

  return (
    <div className="details-panel">
      <button className="button" onClick={handleClose}>
        Close
      </button>
      {character ? (
        <div className="main_detail">
          <article className="main_detail__item">
            <img
              className="main_detail__img"
              src={character.image}
              alt={character.name}
            />
            <div className="main_detail__content">
              <span className="main_detail__name">
                Full name: {character.name}
              </span>
              <span className="main_detail__gender">
                Gender: {character.gender}
              </span>
              <span className="main_detail__status">
                Status: {character.status}
              </span>
            </div>
          </article>
        </div>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
}
