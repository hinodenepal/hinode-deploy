import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/hin-admin/', '/api/'],
    },
    sitemap: 'https://hinodenepal.jp/sitemap.xml',
  };
}
