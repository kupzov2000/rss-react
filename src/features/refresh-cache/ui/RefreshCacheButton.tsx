import { useAppDispatch } from '@/app/store/hooks';
import { charactersApi } from '@/entities/character';

export function RefreshCacheButton() {
  const dispatch = useAppDispatch();

  function handleRefreshCache() {
    dispatch(charactersApi.util.invalidateTags([{ type: 'Characters' }]));
  }

  return (
    <button
      className="refresh-button button"
      type="button"
      onClick={handleRefreshCache}
    >
      Refresh Cache
    </button>
  );
}
