import { useTheme } from '@/application/providers/theme';
import { useTranslations } from 'next-intl';
import './ThemeToggleButton.css';

export function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();
  const t = useTranslations('ThemeToggle');

  const buttonText = theme === 'light' ? t('toDark') : t('toLight');

  return (
    <button className="theme-toggle-button" onClick={toggleTheme}>
      {buttonText}
    </button>
  );
}
