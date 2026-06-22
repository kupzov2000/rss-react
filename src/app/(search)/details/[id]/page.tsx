import { CharacterDetails } from '@/pages/character-details';

interface CharacterDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function CharacterDetailsPage({
  params,
}: CharacterDetailsPageProps) {
  const { id } = await params;

  return <CharacterDetails id={id} />;
}
