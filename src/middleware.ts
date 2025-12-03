import createMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';

import { routing } from './lib/i18n/routing';

const intlHandler = createMiddleware(routing);

export default function middleware(req: NextRequest) {
  return intlHandler(req);
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
  runtime: 'nodejs'
};
