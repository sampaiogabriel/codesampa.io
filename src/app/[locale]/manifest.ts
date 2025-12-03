import { MetadataRoute } from 'next';
import { getTranslations } from 'next-intl/server';

type Params = Promise<{ locale: string }>;

export default async function manifest({
  params
}: {
  params: Params;
}): Promise<MetadataRoute.Manifest> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Manifest' });

  return {
    name: t('name'),
    short_name: t('short_name'),
    description: t('description'),
    start_url: `/${locale}`,
    display: 'standalone',
    background_color: '#0a0a0a',
    theme_color: '#0047FF',
    orientation: 'portrait',
    icons: [
      {
        src: '/favicons/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon'
      },
      {
        src: '/favicons/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: '/favicons/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png'
      }
    ]
  };
}
