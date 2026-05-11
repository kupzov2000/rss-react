import type { Character } from '@/entities/character';

const mockCharacter = (overrides = {}): Character => ({
  id: 1,
  name: 'Rick',
  created: '',
  episode: [],
  gender: '',
  image: '',
  location: { name: '', url: '' },
  origin: { name: '', url: '' },
  species: '',
  status: '',
  type: '',
  url: '',
  ...overrides,
});

export default mockCharacter;
