import { useTheme } from '@/app/providers/theme';
import './ThemeToggleButton.css';

export function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();

  const buttonText = theme === 'light' ? 'Dark theme' : 'Light theme';

  return (
    <button className="theme-toggle-button" onClick={toggleTheme}>
      {buttonText}
    </button>
  );
}
