import React from "react";
import { getPostsPaginated, getLatestPosts, getCategories } from "@/lib/wp";
import FeaturedSwiper from "@/components/FeaturedSwiper";
import PostCard from "@/components/PostCard";
import Sidebar from "@/components/Sidebar";
import AdBanner from "@/components/AdBanner";
import Pagination from "@/components/Pagination";

// Posts por página (excluindo os 3 do swiper na página 1)
const PER_PAGE = 12;
// A cada quantos posts inserir um banner
const AD_EVERY = 3;

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ pagina?: string }>;
}) {
  const { pagina } = await searchParams;
  const currentPage = Math.max(1, parseInt(pagina || "1", 10));

  const [{ posts, totalPages }, popularPosts, categories] = await Promise.all([
    getPostsPaginated(currentPage, PER_PAGE),
    getLatestPosts(4),
    getCategories(),
  ]);

  if (!posts || posts.length === 0) {
    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col items-center justify-center min-h-[50vh]">
        <h2 className="text-3xl text-gray-500 font-medium">Nenhum post encontrado.</h2>
        <p className="text-gray-400 mt-2">Verifique a conexão com a API do WordPress.</p>
      </main>
    );
  }

  // Na página 1, os 3 primeiros posts vão para o swiper
  const heroPosts = currentPage === 1 ? posts.slice(0, 3) : [];
  const listPosts = currentPage === 1 ? posts.slice(3) : posts;

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

      {/* Carousel Destaque — apenas na página 1 */}
      {heroPosts.length > 0 && <FeaturedSwiper posts={heroPosts} />}

      <div className="flex flex-col lg:flex-row gap-12 mt-16">

        {/* Conteúdo Principal */}
        <div className="w-full lg:w-2/3">
          <div className="flex justify-between items-end border-b-2 border-gray-100 pb-4 mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Últimas Publicações</h2>
          </div>

          <div className="flex flex-col gap-6">
            {listPosts.map((post, index) => (
              <React.Fragment key={post.id}>
                <PostCard post={post} />
                {(index + 1) % AD_EVERY === 0 && (
                  <AdBanner format="horizontal" />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Paginação */}
          <Pagination currentPage={currentPage} totalPages={totalPages} basePath="/" />
        </div>

        {/* Barra Lateral */}
        <div className="w-full lg:w-1/3">
          <Sidebar popularPosts={popularPosts} categories={categories} />
        </div>

      </div>
    </main>
  );
}
