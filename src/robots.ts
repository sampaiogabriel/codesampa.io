import { MetadataRoute } from 'next';

import { HOST } from './utils/constants/host';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/'
    },
    sitemap: `${HOST}/sitemap.xml`
  };
}
