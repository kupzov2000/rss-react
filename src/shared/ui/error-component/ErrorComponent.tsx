import { useTranslations } from 'next-intl';

import './ErrorComponent.css';

export default function ErrorComponent() {
  const t = useTranslations('ErrorBoundary');

  return (
    <div className="error__wrapper">
      <h1>{t('title')}</h1>
      <button
        className="error__refresh"
        onClick={() => globalThis.location.reload()}
      >
        {t('refresh')}
      </button>
    </div>
  );
}
