export interface WpCategory {
  id: number;
  name: string;
  slug: string;
  taxonomy: string;
  count: number;
}

export interface WpMedia {
  id: number;
  source_url: string;
  alt_text: string;
  media_details?: {
    sizes?: {
      thumbnail?: { source_url: string; width: number; height: number };
      medium?: { source_url: string; width: number; height: number };
      large?: { source_url: string; width: number; height: number };
      full?: { source_url: string; width: number; height: number };
    };
  };
}

export interface WpPost {
  id: number;
  date: string;
  slug: string;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
    protected?: boolean;
  };
  content: {
    rendered: string;
    protected?: boolean;
  };
  _embedded?: {
    'wp:featuredmedia'?: WpMedia[];
    'wp:term'?: WpCategory[][]; // Categorias e tags vêm como um array de arrays
  };
}

export interface WpComment {
  id: number;
  post: number;
  parent: number;
  author_name: string;
  author_url: string;
  date: string;
  content: {
    rendered: string;
  };
  author_avatar_urls?: {
    [key: string]: string;
  };
}

export interface WpBanner {
  id: number;
  title: { rendered: string };
  acf?: { url_do_link?: string };
  _embedded?: {
    'wp:featuredmedia'?: WpMedia[];
  };
}

const WORDPRESS_INTERNAL = process.env.WORDPRESS_URL || 'http://blogdobagada.com.br';
const WORDPRESS_PUBLIC = process.env.WORDPRESS_PUBLIC_URL || WORDPRESS_INTERNAL;
const API_URL = `${WORDPRESS_INTERNAL}/?rest_route=/wp/v2`;

export function fixMediaUrl(url: string): string {
  if (!url) return url;
  return url.replace('http://blogdobagada.com.br', WORDPRESS_PUBLIC)
            .replace('https://blogdobagada.com.br', WORDPRESS_PUBLIC);
}

export async function getBannersByFormat(format: string, slotIndex?: number): Promise<{ imageUrl: string; linkUrl: string } | null> {
  try {
    // Busca banners do CPT 'banners' (cada post = um banner/anunciante)
    const response = await fetch(`${API_URL}/banner&_fields=id,acf&per_page=20`, {
      next: { revalidate: 60 },
    });

    if (!response.ok) return null;

    const banners = await response.json();
    if (!Array.isArray(banners) || banners.length === 0) return null;

    // Filtra banners que têm imagem para o formato solicitado
    const validBanners = banners.filter((b: any) => b.acf && b.acf[`banner_${format}_imagem`]);
    if (validBanners.length === 0) return null;

    // Cicla pelos banners disponíveis para distribuir igualmente entre os slots
    const index = ((slotIndex ?? 1) - 1) % validBanners.length;
    const bannerData = validBanners[index];

    const acf = bannerData.acf;
    let imageUrl = acf[`banner_${format}_imagem`];
    let linkUrl = acf[`banner_${format}_link`];

    if (!imageUrl) return null;

    // Se o ACF retornar apenas o ID da imagem (ex: 17742), precisamos buscar a URL
    if (typeof imageUrl === 'number') {
      try {
        const mediaRes = await fetch(`${API_URL}/media/${imageUrl}`, {
          next: { revalidate: 60 },
        });
        if (mediaRes.ok) {
          const mediaData = await mediaRes.json();
          imageUrl = mediaData.source_url;
        } else {
          return null;
        }
      } catch {
        return null;
      }
    }

    // ACF pode retornar URL string ou objeto com .url
    const finalImageUrl = typeof imageUrl === 'string' ? imageUrl : imageUrl?.url;

    return {
      imageUrl: finalImageUrl,
      linkUrl: linkUrl || '#',
    };
  } catch (error) {
    console.error('Erro ao buscar banners via CPT:', error);
    return null;
  }
}

/**
 * Busca os posts mais recentes do WordPress
 * @param limit Número máximo de posts para buscar (padrão: 10)
 */
export async function getLatestPosts(limit: number = 10): Promise<WpPost[]> {
  try {
    const response = await fetch(`${API_URL}/posts&_embed&per_page=${limit}`, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error(`Erro na API do WordPress: ${response.status} - ${response.statusText}`);
    }

    const posts: WpPost[] = await response.json();
    return posts;
  } catch (error) {
    console.error('Erro em getLatestPosts:', error);
    throw new Error('Falha ao obter os últimos posts. Verifique a conexão com o WordPress.');
  }
}

/**
 * Busca os posts mais populares usando o plugin WordPress Popular Posts
 */
export async function getPopularPosts(limit: number = 5, range: string = 'last7days'): Promise<WpPost[]> {
  try {
    const wppApiUrl = API_URL.replace('/wp/v2', '/wordpress-popular-posts/v1/popular-posts');
    const response = await fetch(`${wppApiUrl}&limit=${limit}&range=${range}`, {
      next: { revalidate: 3600 }, // Cache de 1 hora
    });

    if (!response.ok) {
      console.warn(`Erro na API do WPP: ${response.status} - ${response.statusText}. Usando fallback para últimos posts.`);
      return getLatestPosts(limit);
    }

    const posts: WpPost[] = await response.json();
    if (posts.length < limit) {
      return getLatestPosts(limit);
    }
    return posts;
  } catch (error) {
    console.error('Erro em getPopularPosts:', error);
    return getLatestPosts(limit);
  }
}

/**
 * Busca posts com suporte a paginação real (usa headers X-WP-TotalPages)
 */
export async function getPostsPaginated(
  page: number = 1,
  perPage: number = 10
): Promise<{ posts: WpPost[]; totalPages: number; total: number }> {
  try {
    const response = await fetch(
      `${API_URL}/posts&_embed&per_page=${perPage}&page=${page}`,
      { next: { revalidate: 60 } }
    );

    if (!response.ok) {
      throw new Error(`Erro na API do WordPress: ${response.status} - ${response.statusText}`);
    }

    const posts: WpPost[] = await response.json();
    const totalPages = parseInt(response.headers.get('X-WP-TotalPages') || '1', 10);
    const total = parseInt(response.headers.get('X-WP-Total') || '0', 10);

    return { posts, totalPages, total };
  } catch (error) {
    console.error('Erro em getPostsPaginated:', error);
    throw new Error('Falha ao obter os posts.');
  }
}

/**
 * Busca um post específico do WordPress utilizando o seu slug
 * @param slug O slug do post
 */
export async function getPostBySlug(slug: string): Promise<WpPost | null> {
  try {
    const response = await fetch(`${API_URL}/posts&_embed&slug=${slug}`, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error(`Erro na API do WordPress ao buscar "${slug}": ${response.status} - ${response.statusText}`);
    }

    const posts: WpPost[] = await response.json();

    if (!posts || posts.length === 0) {
      return null;
    }

    return posts[0];
  } catch (error) {
    console.error(`Erro em getPostBySlug para "${slug}":`, error);
    throw new Error(`Falha ao obter o post "${slug}". Verifique a conexão com o WordPress.`);
  }
}

/**
 * Busca posts baseado em um termo de pesquisa
 */
export async function searchPosts(query: string, limit: number = 20): Promise<WpPost[]> {
  try {
    const response = await fetch(`${API_URL}/posts&search=${encodeURIComponent(query)}&_embed&per_page=${limit}`, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error(`Erro na API do WordPress: ${response.status} - ${response.statusText}`);
    }

    const posts: WpPost[] = await response.json();
    return posts;
  } catch (error) {
    console.error(`Erro em searchPosts ('${query}'):`, error);
    throw new Error('Falha ao buscar posts da pesquisa.');
  }
}

/**
 * Busca todas as categorias que possuem pelo menos 1 post (hide_empty=true)
 */
export async function getCategories(): Promise<WpCategory[]> {
  try {
    const response = await fetch(`${API_URL}/categories&hide_empty=true&per_page=100`, {
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      throw new Error(`Erro ao buscar categorias: ${response.status} - ${response.statusText}`);
    }

    const categories: WpCategory[] = await response.json();
    // Filtra apenas categorias com pelo menos 1 post (garante segurança além do hide_empty)
    return categories.filter((cat) => cat.count > 0);
  } catch (error) {
    console.error('Erro em getCategories:', error);
    return [];
  }
}

/**
 * Busca posts filtrados por ID de categoria, com paginação
 */
export async function getPostsByCategory(
  categoryId: number,
  page: number = 1,
  perPage: number = 12
): Promise<{ posts: WpPost[]; totalPages: number; total: number }> {
  try {
    const response = await fetch(
      `${API_URL}/posts&_embed&categories=${categoryId}&per_page=${perPage}&page=${page}`,
      { next: { revalidate: 60 } }
    );

    if (!response.ok) {
      throw new Error(`Erro na API do WordPress: ${response.status} - ${response.statusText}`);
    }

    const posts: WpPost[] = await response.json();
    const totalPages = parseInt(response.headers.get('X-WP-TotalPages') || '1', 10);
    const total = parseInt(response.headers.get('X-WP-Total') || '0', 10);

    return { posts, totalPages, total };
  } catch (error) {
    console.error('Erro em getPostsByCategory:', error);
    return { posts: [], totalPages: 1, total: 0 };
  }
}

/**
 * Busca uma categoria pelo seu slug
 */
export async function getCategoryBySlug(slug: string): Promise<WpCategory | null> {
  try {
    const response = await fetch(`${API_URL}/categories&slug=${slug}`, {
      next: { revalidate: 300 },
    });

    if (!response.ok) return null;

    const categories: WpCategory[] = await response.json();
    return categories.length > 0 ? categories[0] : null;
  } catch (error) {
    console.error('Erro em getCategoryBySlug:', error);
    return null;
  }
}

/**
 * Busca comentários de um post
 */
export async function getComments(postId: number): Promise<WpComment[]> {
  try {
    const response = await fetch(`${API_URL}/comments&post=${postId}&per_page=100&order=asc`, {
      next: { revalidate: 0 }, // Comentários mudam com frequência, melhor não cachear agressivamente ou usar revalidate: 0
    });

    if (!response.ok) {
      throw new Error(`Erro ao buscar comentários: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Erro em getComments:', error);
    return [];
  }
}

/**
 * Busca posts relacionados pela mesma categoria, excluindo o post atual
 */
export async function getRelatedPosts(categoryId: number, excludePostId: number, limit: number = 4): Promise<WpPost[]> {
  try {
    const response = await fetch(
      `${API_URL}/posts&_embed&categories=${categoryId}&exclude=${excludePostId}&per_page=${limit}`,
      { next: { revalidate: 60 } }
    );

    if (!response.ok) return [];

    return await response.json();
  } catch (error) {
    console.error('Erro em getRelatedPosts:', error);
    return [];
  }
}

/**
 * Envia um novo comentário via rota proxy do Next.js (evita CORS)
 */
export async function postComment(data: {
  post: number;
  author_name: string;
  author_email: string;
  content: string;
  parent?: number;
}): Promise<{ success: boolean; message: string }> {
  try {
    const response = await fetch('/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (response.ok) {
      return { success: true, message: 'Comentário enviado com sucesso! Ele aparecerá após ser aprovado pela moderação.' };
    }

    return { success: false, message: result.error || 'Erro ao enviar comentário.' };
  } catch (error) {
    console.error('Erro em postComment:', error);
    return { success: false, message: 'Erro de conexão ao enviar comentário.' };
  }
}
