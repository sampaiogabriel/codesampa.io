import createMiddleware from 'next-intl/middleware';
import { routing } from './lib/i18n/routing';
import { NextRequest } from 'next/server';

const intlHandler = createMiddleware(routing);

export default function middleware(req: NextRequest) {
  return intlHandler(req);
}

export const config = {
  matcher: ['/((?!static|.*\\..*|_next).*)'],
  runtime: 'nodejs'
};
