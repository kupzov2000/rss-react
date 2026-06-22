import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

import './NotFoundPage.css';

export function NotFoundPage() {
  const t = useTranslations('NotFoundPage');

  return (
    <div className="not-found-page">
      <p className="not-found-page__code">404</p>
      <h1 className="not-found-page__title">{t('title')}</h1>
      <p className="not-found-page__description">{t('description')}</p>
      <Link href="/" className="button">
        {t('home')}
      </Link>
    </div>
  );
}
