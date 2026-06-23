import type { ReactNode } from 'react';

import { LocaleHtmlLang } from '@/features/language-switcher/ui/LocaleHtmlLang';
import { Menu } from '@/widgets/menu';

import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';

interface LocaleLayoutProps {
  children: ReactNode;
  params: Promise<{
    locale: string;
  }>;
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <NextIntlClientProvider>
      <LocaleHtmlLang locale={locale} />
      <Menu>{children}</Menu>
    </NextIntlClientProvider>
  );
}
