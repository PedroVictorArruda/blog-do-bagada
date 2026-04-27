import type { MetadataRoute } from 'next';
import { getCategories } from '@/lib/wp';

const BASE_URL = 'https://blogdobagada.com.br';
const WP_API = 'http://blogdobagada.com.br/?rest_route=/wp/v2';

export const revalidate = 3600;

async function getAllPostSlugs(): Promise<{ slug: string; date: string }[]> {
  const results: { slug: string; date: string }[] = [];
  let page = 1;

  while (true) {
    try {
      const res = await fetch(
        `${WP_API}/posts&_fields=slug,date&per_page=100&page=${page}`,
        { next: { revalidate: 3600 } }
      );

      if (!res.ok) break;

      const posts: { slug: string; date: string }[] = await res.json();
      if (!posts.length) break;

      results.push(...posts);

      const totalPages = parseInt(res.headers.get('X-WP-TotalPages') || '1', 10);
      if (page >= totalPages) break;
      page++;
    } catch {
      break;
    }
  }

  return results;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
  ];

  const [categories, posts] = await Promise.all([
    getCategories(),
    getAllPostSlugs(),
  ]);

  for (const cat of categories) {
    entries.push({
      url: `${BASE_URL}/categoria/${cat.slug}`,
      changeFrequency: 'weekly',
      priority: 0.7,
    });
  }

  for (const post of posts) {
    entries.push({
      url: `${BASE_URL}/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  }

  return entries;
}
