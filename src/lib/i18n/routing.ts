import { EN_US, PT_BR } from '@/utils/constants/languages';
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: [EN_US, PT_BR],
  defaultLocale: EN_US
});
