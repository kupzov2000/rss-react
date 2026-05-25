import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { clearAllCharacters } from '@/features/select-character';
import './SelectedCharacters.css';

export function SelectedCharacters() {
  const dispatch = useAppDispatch();

  const results = useAppSelector((state) => state.selectCharacter.results);
  const selectedCount = results.length;

  function handleClearClick() {
    dispatch(clearAllCharacters());
  }

  return (
    <div className="selected-wrapper">
      <div className="selected-characters">
        <div className="selected-characters__info">
          <div className="selected-characters__count">{selectedCount}</div>
          <span className="selected-characters__text">
            {selectedCount === 1 ? 'Item selected' : 'Items selected'}
          </span>
        </div>

        <div className="selected-characters__actions">
          <button
            className="button selected-characters__button selected-characters__button_clear"
            type="button"
            onClick={handleClearClick}
          >
            Clear
          </button>
          <button
            className="button selected-characters__button selected-characters__button_download"
            type="button"
          >
            Download
          </button>
        </div>
      </div>
    </div>
  );
}
