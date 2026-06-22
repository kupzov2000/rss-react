'use client';

import { hasLocale, useLocale, useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { ChangeEvent } from 'react';

import { usePathname, useRouter } from '@/i18n/navigation';

import { routing } from '@/i18n/routing';

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParameters = useSearchParams();
  const t = useTranslations('LanguageSwitcher');

  function handleChange(event: ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.currentTarget.value;

    if (hasLocale(routing.locales, nextLocale)) {
      const query = searchParameters.toString();
      const href = query.length > 0 ? `${pathname}?${query}` : pathname;

      router.replace(href, { locale: nextLocale });
    }
  }

  return (
    <label>
      {t('label')}
      <select value={locale} onChange={handleChange}>
        {routing.locales.map((item) => (
          <option key={item} value={item}>
            {item === 'en' ? t('english') : t('russian')}
          </option>
        ))}
      </select>
    </label>
  );
}
