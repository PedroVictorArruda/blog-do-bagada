import Image from "next/image";
import { getPostBySlug, getLatestPosts, getCategories, getComments } from "@/lib/wp";
import { notFound } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import AdBanner from "@/components/AdBanner";
import Comments from "@/components/Comments";
import { Link as LinkIcon, Clock, Calendar } from "lucide-react";
import { getRelativeTime } from "@/lib/utils";

// SVGs das redes sociais
const FacebookIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
  </svg>
);
const TwitterIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
  </svg>
);
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

export default async function SinglePost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Get some popular posts and categories for the sidebar, and comments for the post
  const [popularPosts, categories, comments] = await Promise.all([
    getLatestPosts(5),
    getCategories(),
    getComments(post.id)
  ]);

  const getFeaturedImageUrl = () => {
    const media = post._embedded?.['wp:featuredmedia'];
    if (media && media.length > 0 && media[0].source_url) {
      return media[0].source_url;
    }
    return "https://via.placeholder.com/1200x800.png?text=Sem+Imagem";
  };

  const date = new Date(post.date).toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const categoryName = post._embedded?.['wp:term']?.[0]?.[0]?.name || "Notícia";

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col lg:flex-row gap-12">

        {/* Post Content */}
        <article className="w-full lg:w-2/3">

          {/* Header do Artigo */}
          <header className="mb-10">
            <div className="flex items-center gap-2 text-sm font-bold text-blue-600 uppercase tracking-widest mb-4">
              <span>{categoryName}</span>
            </div>

            <h1
              className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight"
              dangerouslySetInnerHTML={{ __html: post.title.rendered }}
            />

            <div
              className="text-xl text-gray-600 mb-8 leading-relaxed font-medium line-clamp-2"
              dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
            />

            <div className="flex flex-wrap items-center justify-between border-y border-gray-200 py-4 gap-4">
              <div className="flex items-center gap-6 text-sm text-gray-500 font-medium">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src="/foto-perfil.png"
                      alt="Bagadão"
                      width={40}
                      height={40}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <span className="block text-gray-900 font-bold">Por Bagadão</span>
                    <span className="flex items-center"><Calendar className="w-3 h-3 mr-1" /> {date}</span>
                  </div>
                </div>
                <div className="hidden sm:flex items-center border-l border-gray-200 pl-6 h-10">
                  <span className="flex items-center"><Clock className="w-4 h-4 mr-2 text-gray-400" /> {getRelativeTime(post.date)}</span>
                </div>
              </div>

              {/* Redes Sociais */}
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-gray-400 mr-2 uppercase tracking-widest">Compartilhar</span>
                <a
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent(post.title.rendered.replace(/<[^>]+>/g, ''))}%20https://blogdobagada.com.br/${post.slug}`}
                  target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center hover:bg-green-600 hover:text-white transition-colors"
                >
                  <WhatsAppIcon className="w-5 h-5" />
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=https://blogdobagada.com.br/${post.slug}`}
                  target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors"
                >
                  <FacebookIcon className="w-5 h-5" />
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title.rendered.replace(/<[^>]+>/g, ''))}&url=https://blogdobagada.com.br/${post.slug}`}
                  target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center hover:bg-black transition-colors"
                >
                  <TwitterIcon className="w-5 h-5" />
                </a>
                <a
                  href={`https://blogdobagada.com.br/${post.slug}`}
                  className="w-10 h-10 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-gray-300 transition-colors"
                  title="Copiar link"
                >
                  <LinkIcon className="w-5 h-5" />
                </a>
              </div>
            </div>
          </header>

          {/* Imagem de Capa */}
          <div className="relative w-full h-[400px] md:h-[550px] rounded-3xl overflow-hidden mb-12 shadow-lg">
            <Image
              src={getFeaturedImageUrl()}
              alt="Capa do artigo"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Ad Space Intro */}
          <div className="mb-10">
            <AdBanner format="horizontal" />
          </div>

          {/* Corpo do Artigo */}
          <div
            className="prose prose-lg prose-blue max-w-none prose-headings:font-bold prose-a:text-blue-600 hover:prose-a:text-blue-500 prose-img:rounded-2xl prose-p:my-3 prose-p:leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.content.rendered }}
          />

          {/* Tags e Footer do Artigo */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex flex-wrap gap-2 mb-8">
              <span className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-full hover:bg-gray-200 cursor-pointer transition-colors">#Jornalismo</span>
              <span className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-full hover:bg-gray-200 cursor-pointer transition-colors">#Notícias</span>
              <span className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-full hover:bg-gray-200 cursor-pointer transition-colors">#Atualidades</span>
            </div>

            {/* Ad Space Outro */}
            <AdBanner format="horizontal" className="mb-12" />

            {/* Nova Seção de Comentários Integrada */}
            <Comments 
              postId={post.id} 
              initialComments={comments} 
              postTitle={post.title.rendered.replace(/<[^>]+>/g, '')} 
            />
          </div>
        </article>

        {/* Sidebar */}
        <div className="w-full lg:w-1/3">
          <Sidebar popularPosts={popularPosts} categories={categories} />
        </div>

      </div>
    </main>
  );
}
