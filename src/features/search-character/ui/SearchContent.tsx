import type { Character } from '@/entities/character';
import { ResultList } from '@/entities/character/ui';
import { LoadingSpinner } from '@/shared/ui/spinner';

interface Props {
  loading: boolean;
  error: string | null;
  items: Character[];
}

export default function SearchContent({ loading, error, items }: Props) {

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error != null) {
    return <p className="error-container">{error}</p>;
  }

 return <ResultList viewModelCards={items} />;
}

