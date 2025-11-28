'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { useTransition } from 'react';

type LanguageCode = 'en-US' | 'pt-BR';

export function useChangeLanguage() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const [isPending, startTransition] = useTransition();

  const changeLanguage = (newLocale: LanguageCode) => {
    if (locale === newLocale) return;

    startTransition(() => {
      const cleanPath = pathname.replace(/^\/(en-US`|pt-BR)/, '');
      router.replace(`/${newLocale}${cleanPath}`);
    });
  };

  return { locale, changeLanguage, isPending };
}
