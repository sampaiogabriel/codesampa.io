import { MetadataRoute } from 'next';

import { routing } from '@/lib/i18n/routing';

import { HOST } from './utils/constants/host';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/projects', '/blog', '/contact'];

  const sitemapEntries = routes.flatMap((route) => {
    return routing.locales.map((locale) => ({
      url: `${HOST}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: route === '' ? 1 : 0.8
    }));
  });

  return sitemapEntries;
}
