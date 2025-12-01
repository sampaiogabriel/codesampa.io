import { MetadataRoute } from 'next';

import { routing } from '@/lib/i18n/routing';

// URL base do seu site
const host = 'https://codesampa.io';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/projects', '/blog', '/contact'];

  const sitemapEntries = routes.flatMap((route) => {
    return routing.locales.map((locale) => ({
      url: `${host}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: route === '' ? 1 : 0.8
    }));
  });

  return sitemapEntries;
}
