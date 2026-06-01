import type { Character } from '@/entities/character';

type CharacterDetailsCardProps = {
  character: Character;
};

export function CharacterDetailsCard({ character }: CharacterDetailsCardProps) {
  return (
    <div className="main_detail">
      <article className="main_detail__item">
        <img
          className="main_detail__img"
          src={character.image}
          alt={character.name}
        />
        <div className="main_detail__content">
          <span className="main_detail__name">Full name: {character.name}</span>
          <span className="main_detail__gender">
            Gender: {character.gender}
          </span>
          <span className="main_detail__status">
            Status: {character.status}
          </span>
        </div>
      </article>
    </div>
  );
}
