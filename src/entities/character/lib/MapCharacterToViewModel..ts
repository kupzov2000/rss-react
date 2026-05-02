import type { Character } from '@/entities/character';
import type { ViewModelCard } from './types';

export default function mapCharacterToViewModel(
  data: Character
): ViewModelCard {
  return {
    id: data.id,
    image: data.image,
    name: data.name,
    gender: data.gender,
    status: data.status,
  };
}
