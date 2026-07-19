'use client';

import { usePathname, useRouter } from '@/i18n/navigation';
import { useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

export function useUrlSearchParameters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParameters = useSearchParams();
  const pageParameter = searchParameters?.get('page');
  const page = Number(pageParameter) || 1;
  const hasPageParameter = pageParameter != null;

  const createUrlWithParameter = useCallback(
    function createUrlWithParameter(name: string, value: string) {
      const parameters = new URLSearchParams(
        searchParameters?.toString() ?? ''
      );

      parameters.set(name, value);

      return `${pathname}?${parameters.toString()}`;
    },
    [pathname, searchParameters]
  );

  const setParameter = useCallback(
    function setParameter(name: string, value: string) {
      router.push(createUrlWithParameter(name, value));
    },
    [router, createUrlWithParameter]
  );

  const replaceParameter = useCallback(
    function replaceParameter(name: string, value: string) {
      router.replace(createUrlWithParameter(name, value));
    },
    [router, createUrlWithParameter]
  );

  return {
    page,
    hasPageParameter,
    searchParameters,
    setParameter,
    replaceParameter,
  };
}

  
