'use client';

import { crash, ErrorViewButton } from '@/features/error-view-toggle';
import { useAppDispatch, useAppSelector } from '@/application/store/hooks';
import { ThemeToggleButton } from '@/features/theme-toggle';
import { RefreshCacheButton } from '@/features/refresh-cache';
import { ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';

import './Menu.css';
import { LanguageSwitcher } from '@/features/language-switcher';

interface MenuProps {
  children: ReactNode;
}

export function Menu({ children }: MenuProps) {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const t = useTranslations('Menu');

  const shouldCrash = useAppSelector((state) => state.errorView.shouldCrash);

  if (shouldCrash) {
    throw new Error('Test error from Error Button');
  }

  function handleErrorView() {
    dispatch(crash());
  }

  const homeClassName = pathname === '/' ? 'button active' : 'button';
  const aboutClassName = pathname === '/about' ? 'button active' : 'button';

  return (
    <div className="layout">
      <header className="layout__header">
        <nav className="nav-menu">
          <Link href="/" className={homeClassName}>
            {t('home')}
          </Link>

          <Link href="/about" className={aboutClassName}>
            {t('about')}
          </Link>
        </nav>

        <div className="button-actions">
          <ThemeToggleButton />
          <LanguageSwitcher />

          <RefreshCacheButton
            tags={[
              {
                type: 'CharactersList',
                id: 'LIST',
              },
            ]}
          >
            <span>{t('refreshCharacters')}</span>
          </RefreshCacheButton>
          <ErrorViewButton onClick={handleErrorView}>
            {t('error')}
          </ErrorViewButton>
        </div>
      </header>

      <main className="layout__main">{children}</main>
    </div>
  );
}
