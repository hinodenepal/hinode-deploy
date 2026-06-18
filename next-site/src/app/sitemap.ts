import { MetadataRoute } from 'next';
import dbConnect from '@/lib/mongodb';
import Tour from '@/lib/models/Tour';
import Destination from '@/lib/models/Destination';
import Post from '@/lib/models/Post';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  await dbConnect();

  const baseUrl = 'https://hinodenepal.jp';

  // Static routes
  const staticRoutes = ['', '/about', '/contact', '/destinations', '/blog', '/inquiry', '/testimonials', '/tours'].flatMap((route) => [
    {
      url: `${baseUrl}/ja${route}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: route === '' ? 1 : 0.8,
    },
    {
      url: `${baseUrl}/en${route}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: route === '' ? 1 : 0.8,
    },
  ]);

  // Dynamic routes
  const tours = await Tour.find({}).select('slug updatedAt').lean() as any[];
  const destinations = await Destination.find({}).select('slug updatedAt').lean() as any[];
  const posts = await Post.find({}).select('slug updatedAt').lean() as any[];

  const tourRoutes = tours.flatMap((tour) => [
    {
      url: `${baseUrl}/ja/tours/${tour.slug}`,
      lastModified: tour.updatedAt || new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/en/tours/${tour.slug}`,
      lastModified: tour.updatedAt || new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
  ]);

  const destinationRoutes = destinations.flatMap((dest) => [
    {
      url: `${baseUrl}/ja/destinations/${dest.slug}`,
      lastModified: dest.updatedAt || new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/en/destinations/${dest.slug}`,
      lastModified: dest.updatedAt || new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
  ]);

  const postRoutes = posts.flatMap((post) => [
    {
      url: `${baseUrl}/ja/blog/${post.slug}`,
      lastModified: post.updatedAt || new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/en/blog/${post.slug}`,
      lastModified: post.updatedAt || new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
  ]);

  return [...staticRoutes, ...tourRoutes, ...destinationRoutes, ...postRoutes];
}
