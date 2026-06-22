'use client';

import Link from 'next/link';

import { crash, ErrorViewButton } from '@/features/error-view-toggle';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { ThemeToggleButton } from '@/features/theme-toggle';
import { RefreshCacheButton } from '@/features/refresh-cache';
import { ReactNode } from 'react';

import './Menu.css';
import { usePathname } from 'next/navigation';

interface MenuProps {
  children: ReactNode;
}

export function Menu({ children }: MenuProps) {
  const dispatch = useAppDispatch();
  const pathname = usePathname();

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
            Home
          </Link>

          <Link href="/about" className={aboutClassName}>
            About
          </Link>
        </nav>

        <div className="button-actions">
          <ThemeToggleButton />

          <RefreshCacheButton
            tags={[
              {
                type: 'CharactersList',
                id: 'LIST',
              },
            ]}
          >
            <span>Refresh Characters</span>
          </RefreshCacheButton>
          <ErrorViewButton onClick={handleErrorView} />
        </div>
      </header>

      <main className="layout__main">{children}</main>
    </div>
  );
}
