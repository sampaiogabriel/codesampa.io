'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { useTransition } from 'react';

import { EN_US, PT_BR } from '../constants/languages';

type LanguageCode = typeof EN_US | typeof PT_BR;

export function useChangeLanguage() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const [isPending, startTransition] = useTransition();

  const changeLanguage = (newLocale: LanguageCode) => {
    if (locale === newLocale) return;

    startTransition(() => {
      const cleanPath = pathname.replace(new RegExp(`^/(${locale})`), '') || '/';
      const pathWithSlash = cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`;
      
      router.replace(`/${newLocale}${pathWithSlash === '/' ? '' : pathWithSlash}`);
    });
  };

  return { locale, changeLanguage, isPending };
}