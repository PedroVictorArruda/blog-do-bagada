import type { Metadata } from "next";
import { searchPosts, getLatestPosts, getCategories } from "@/lib/wp";
import PostCard from "@/components/PostCard";
import Sidebar from "@/components/Sidebar";
import { Search } from "lucide-react";

export async function generateMetadata(
  { searchParams }: { searchParams: Promise<{ q?: string }> }
): Promise<Metadata> {
  const { q } = await searchParams;
  return {
    title: q ? `Busca: "${q}"` : 'Busca',
    description: q
      ? `Resultados da busca por "${q}" no Blog do Bagada.`
      : 'Pesquise por notícias e artigos no Blog do Bagada.',
    robots: { index: false, follow: true },
  };
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedSearchParams = await searchParams;
  const q = typeof resolvedSearchParams.q === 'string' ? resolvedSearchParams.q : '';

  const posts = q ? await searchPosts(q) : [];
  const [popularPosts, categories] = await Promise.all([
    getLatestPosts(4),
    getCategories(),
  ]);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

      {/* Search Header */}
      <div className="bg-white rounded-3xl p-10 mb-12 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center justify-between">
        <div>
          <div className="flex items-center text-blue-600 mb-2">
            <Search className="w-8 h-8 mr-2" />
            <span className="text-sm font-bold uppercase tracking-widest">Busca</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            {q ? `Resultados para: "${q}"` : 'Faça uma pesquisa'}
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl">
            {posts.length > 0
              ? `Encontramos ${posts.length} resultados para a sua busca.`
              : q
                ? 'Infelizmente, não encontramos nenhum resultado para esta busca. Tente palavras diferentes.'
                : 'Digite o que você está procurando no campo de busca.'}
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">

        {/* Conteúdo Principal (Listagem de Posts) */}
        <div className="w-full lg:w-2/3">
          {posts.length > 0 ? (
            <div className="flex flex-col gap-6">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 rounded-2xl p-10 text-center border border-gray-100">
              <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Nenhum resultado</h3>
              <p className="text-gray-500">Tente buscar por termos mais genéricos ou verifique se há erros de digitação.</p>
            </div>
          )}
        </div>

        {/* Barra Lateral (Sidebar) */}
        <div className="w-full lg:w-1/3">
          <Sidebar popularPosts={popularPosts} categories={categories} />
        </div>

      </div>
    </main>
  );
}
