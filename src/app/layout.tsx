import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TopBanner from '@/components/TopBanner';
import { getCategories } from '@/lib/wp';

export const metadata: Metadata = {
  title: 'Blog do Bagadão',
  description: 'As últimas notícias e artigos do Blog do Bagadão.',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Busca as categorias uma vez no servidor — disponível imediatamente no Header
  const categories = await getCategories();

  return (
    <html lang="pt-BR">
      <body className="antialiased text-gray-900 bg-gray-50 flex flex-col min-h-screen" suppressHydrationWarning>
        <TopBanner />
        <Header categories={categories} />
        <div className="flex-grow">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
