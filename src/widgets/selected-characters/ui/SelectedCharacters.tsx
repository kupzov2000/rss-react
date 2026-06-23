'use client';

import { useAppDispatch, useAppSelector } from '@/application/store/hooks';
import {
  clearAllCharacters,
  downloadSelectedCharactersCsv,
} from '@/features/select-character';
import { useTranslations } from 'next-intl';
import './SelectedCharacters.css';

export function SelectedCharacters() {
  const dispatch = useAppDispatch();
  const t = useTranslations('SelectedCharacters');

  const results = useAppSelector((state) => state.selectCharacter.results);
  const selectedCount = results.length;

  function handleClearClick() {
    dispatch(clearAllCharacters());
  }

  async function handleDownloadClick() {
    await downloadSelectedCharactersCsv(results);
  }

  return (
    <div className="selected-wrapper">
      <div className="selected-characters">
        <div className="selected-characters__info">
          <div className="selected-characters__count">{selectedCount}</div>
          <span className="selected-characters__text">
            {selectedCount === 1 ? t('itemSelected') : t('itemsSelected')}
          </span>
        </div>

        <div className="selected-characters__actions">
          <button
            className="button selected-characters__button selected-characters__button_clear"
            type="button"
            onClick={handleClearClick}
          >
            {t('clear')}
          </button>
          <button
            className="button selected-characters__button selected-characters__button_download"
            type="button"
            onClick={handleDownloadClick}
          >
            {t('download')}
          </button>
        </div>
      </div>
    </div>
  );
}
