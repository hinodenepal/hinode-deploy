import { NextResponse } from 'next';
import dbConnect from '@/lib/mongodb';
import Tour from '@/lib/models/Tour';
import Destination from '@/lib/models/Destination';
import Post from '@/lib/models/Post';

export const dynamic = 'force-dynamic';

export async function GET() {
  await dbConnect();

  const baseUrl = 'https://hinodenepal.jp';

  const tours = await Tour.find({}).select('slug title enTitle').lean() as any[];
  const destinations = await Destination.find({}).select('slug title enTitle').lean() as any[];
  const posts = await Post.find({}).select('slug title enTitle').lean() as any[];

  let content = `# Hinode Nepal

Hinode Nepal is a premium travel agency specializing in luxury travel experiences in Nepal for Japanese travelers. We offer customized itineraries, luxury eco-lodges, cultural insights, and expert guidance.

## Main Pages
- [Home (Japanese)](${baseUrl}/ja)
- [Home (English)](${baseUrl}/en)
- [About Us (Japanese)](${baseUrl}/ja/about)
- [About Us (English)](${baseUrl}/en/about)
- [Destinations (Japanese)](${baseUrl}/ja/destinations)
- [Destinations (English)](${baseUrl}/en/destinations)
- [Tours (Japanese)](${baseUrl}/ja/tours)
- [Tours (English)](${baseUrl}/en/tours)
- [Blog (Japanese)](${baseUrl}/ja/blog)
- [Blog (English)](${baseUrl}/en/blog)
- [Contact (Japanese)](${baseUrl}/ja/contact)
- [Contact (English)](${baseUrl}/en/contact)

## Destinations
`;

  destinations.forEach((dest) => {
    content += `- [${dest.title} / ${dest.enTitle}](${baseUrl}/ja/destinations/${dest.slug})\n`;
  });

  content += `\n## Tours\n`;
  tours.forEach((tour) => {
    content += `- [${tour.title} / ${tour.enTitle}](${baseUrl}/ja/tours/${tour.slug})\n`;
  });

  content += `\n## Blog Posts\n`;
  posts.forEach((post) => {
    content += `- [${post.title} / ${post.enTitle}](${baseUrl}/ja/blog/${post.slug})\n`;
  });

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
