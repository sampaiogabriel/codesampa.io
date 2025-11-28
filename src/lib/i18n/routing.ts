import { defineRouting } from 'next-intl/routing';

import { EN_US, PT_BR } from '@/utils/constants/languages';

export const routing = defineRouting({
  locales: [EN_US, PT_BR],
  defaultLocale: EN_US
});
