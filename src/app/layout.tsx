import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TopBanner from '@/components/TopBanner';
import WhatsAppPopup from '@/components/WhatsAppPopup';
import { getCategories } from '@/lib/wp';

const SITE_URL = 'https://blogdobagada.com.br';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Blog do Bagada',
    template: '%s — Blog do Bagada',
  },
  description: 'As últimas notícias e artigos do Blog do Bagada.',
  openGraph: {
    siteName: 'Blog do Bagada',
    locale: 'pt_BR',
    type: 'website',
    url: SITE_URL,
  },
  twitter: {
    card: 'summary_large_image',
    site: '@blogdobagadao',
  },
  icons: {
    icon: [
      { url: '/favicon/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    apple: '/favicon/apple-touch-icon.png',
  },
  manifest: '/favicon/site.webmanifest',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Blog do Bagada',
  url: SITE_URL,
  potentialAction: {
    '@type': 'SearchAction',
    target: `${SITE_URL}/busca?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = await getCategories();

  return (
    <html lang="pt-BR">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className="antialiased text-gray-900 bg-gray-50 flex flex-col min-h-screen" suppressHydrationWarning>
        <TopBanner />
        <Header categories={categories} />
        <div className="flex-grow">
          {children}
        </div>
        <Footer categories={categories} />
        <WhatsAppPopup />
      </body>
    </html>
  );
}
