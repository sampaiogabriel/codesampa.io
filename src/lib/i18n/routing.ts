import { defineRouting } from 'next-intl/routing';

import { EN_US, PT_BR } from '@/utils/constants/languages';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: [EN_US, PT_BR],

  // Used when no locale matches
  defaultLocale: EN_US,

  // Explicitly enable locale detection based on the browser's Accept-Language header.
  // This is true by default, but adding it ensures clarity.
  // How it works:
  // 1. User visits root path '/'
  // 2. Middleware checks browser language
  // 3. If browser is pt-BR, redirects to /pt-BR
  // 4. If browser is en-US or other, redirects to /en-US (since it's default)
  localeDetection: true
});
