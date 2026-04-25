import Link from "next/link";
import AdBanner from "./AdBanner";
import { TrendingUp, Hash } from "lucide-react";
import { WpPost, WpCategory } from "@/lib/wp";

interface SidebarProps {
  popularPosts?: WpPost[];
  categories?: WpCategory[];
}

export default function Sidebar({ popularPosts = [], categories = [] }: SidebarProps) {
  return (
    <aside className="w-full space-y-10">

      {/* Search Widget - Mobile Only */}
      <div className="md:hidden">
        <h3 className="font-bold text-lg mb-4 text-gray-900 border-b pb-2">Pesquisar</h3>
        <form action="/busca" method="GET">
          <input
            type="text"
            name="q"
            placeholder="Digite o que procura..."
            className="w-full border border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </form>
      </div>

      {/* Ad Space */}
      <AdBanner format="square" />

      {/* Popular Posts */}
      {popularPosts.length > 0 && (
        <div>
          <h3 className="font-bold text-lg mb-4 text-gray-900 flex items-center border-b pb-2">
            <TrendingUp className="w-5 h-5 mr-2 text-blue-600" /> Em Alta
          </h3>
          <div className="space-y-6">
            {popularPosts.slice(0, 5).map((post, idx) => (
              <Link key={post.id} href={`/${post.slug}`} className="group flex gap-4 items-start">
                <span className="text-3xl font-extrabold text-gray-200 group-hover:text-blue-500 transition-colors">
                  0{idx + 1}
                </span>
                <div>
                  <h4
                    className="font-semibold text-gray-800 leading-snug group-hover:text-blue-600 transition-colors line-clamp-2"
                    dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                  />
                  <span className="text-xs text-gray-500 mt-1 block">
                    {new Date(post.date).toLocaleDateString('pt-BR')}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Categories - dinâmicas */}
      {categories.length > 0 && (
        <div>
          <h3 className="font-bold text-lg mb-4 text-gray-900 flex items-center border-b pb-2">
            <Hash className="w-5 h-5 mr-2 text-blue-600" /> Categorias
          </h3>
          <ul className="space-y-1">
            {categories.map((cat) => (
              <li key={cat.id}>
                <Link
                  href={`/categoria/${cat.slug}`}
                  className="flex items-center text-gray-600 hover:text-blue-600 p-2 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <span>{cat.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Ad Space */}
      <AdBanner format="vertical" />

    </aside>
  );
}
