import type { Metadata } from "next";
import React from "react";
import { getCategoryBySlug, getPostsByCategory, getLatestPosts, getCategories } from "@/lib/wp";
import PostCard from "@/components/PostCard";
import Sidebar from "@/components/Sidebar";
import AdBanner from "@/components/AdBanner";
import Pagination from "@/components/Pagination";
import { Hash } from "lucide-react";
import { notFound } from "next/navigation";

const SITE_URL = 'https://blogdobagada.com.br';
const AD_EVERY = 3;

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) return {};

  const title = category.name;
  const description = `Confira todas as notícias e artigos de ${category.name} no Blog do Bagada.`;
  const url = `${SITE_URL}/categoria/${slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: 'website',
    },
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ pagina?: string }>;
}) {
  const { slug } = await params;
  const { pagina } = await searchParams;
  const currentPage = Math.max(1, parseInt(pagina || "1", 10));

  // Busca a categoria pelo slug para obter o ID real
  const [category, popularPosts, categories] = await Promise.all([
    getCategoryBySlug(slug),
    getLatestPosts(4),
    getCategories(),
  ]);

  if (!category) {
    notFound();
  }

  // Agora filtra os posts pelo ID da categoria
  const { posts, totalPages } = await getPostsByCategory(category.id, currentPage, 12);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

      {/* Category Header compacto */}
      <div className="bg-white rounded-2xl px-5 py-4 mb-8 shadow-sm border border-gray-100 flex items-center gap-3">
        <Hash className="w-5 h-5 text-blue-600 flex-shrink-0" />
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 block leading-none mb-0.5">Categoria</span>
          <h1 className="text-2xl font-extrabold text-gray-900 leading-tight">{category.name}</h1>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">

        {/* Posts */}
        <div className="w-full lg:w-2/3">
          {posts.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <Hash className="w-12 h-12 mx-auto mb-4 opacity-30" />
              <p className="text-xl font-medium">Nenhum post nesta categoria ainda.</p>
            </div>
          ) : (
            <>
              <div className="flex flex-col gap-6">
                {posts.map((post, index) => (
                  <React.Fragment key={post.id}>
                    <PostCard post={post} />
                    {(index + 1) % AD_EVERY === 0 && (
                      <AdBanner format="horizontal" slotIndex={Math.floor((index + 1) / AD_EVERY)} />
                    )}
                  </React.Fragment>
                ))}
              </div>

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                basePath={`/categoria/${slug}`}
              />
            </>
          )}
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-1/3">
          <Sidebar popularPosts={popularPosts} categories={categories} />
        </div>

      </div>
    </main>
  );
}
