'use client';

import { useTranslations } from 'next-intl';

import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LANGUAGES } from '@/utils/constants/languages';
import { useChangeLanguage } from '@/utils/hooks/use-change-language';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export function LanguageSwitcher() {
  const t = useTranslations('Components.Header');
  const { changeLanguage, isPending } = useChangeLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          disabled={isPending}
          aria-label={t('language_selector')}
          className="text-muted-foreground hover:text-foreground"
        >
          <Globe className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {LANGUAGES.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            className="cursor-pointer"
          >
            <span className="text-base">{lang.flag}</span>
            {lang.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}