import { Link } from '@/i18n/navigation';

import { useTranslations } from 'next-intl';

import './AboutWidget.css';

export function AboutWidget() {
  const t = useTranslations('About');

  return (
    <div className="about__wrapper">
      <div className="about__window">
        <span>{t('description')}</span>
        <Link
          href="https://rs.school/courses/reactjs"
          className="about__link-school"
          target="_blank"
          rel="noreferrer"
        >
          RSS React
        </Link>
      </div>
    </div>
  );
}
