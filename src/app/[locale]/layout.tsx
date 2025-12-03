import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { Geist, Geist_Mono, Space_Grotesk } from 'next/font/google';
import { Toaster } from 'sonner';

import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';
import { ThemeProvider } from '@/components/providers/theme';
import { HOST } from '@/utils/constants/host';
import { EN_US, PT_BR } from '@/utils/constants/languages';

import '../../utils/styles/globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
});

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700']
});

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#0047FF'
};

type Params = Promise<{ locale: string }>;

export async function generateMetadata({
  params
}: {
  params: Params;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('title'),
    description: t('description'),
    metadataBase: new URL(HOST),
    // manifest: `/${locale}/manifest.webmanifest`,
    icons: {
      icon: [
        { url: '/favicons/favicon.ico' },
        {
          url: '/favicons/favicon-16x16.png',
          sizes: '16x16',
          type: 'image/png'
        },
        {
          url: '/favicons/favicon-32x32.png',
          sizes: '32x32',
          type: 'image/png'
        }
      ],
      apple: [{ url: '/favicons/apple-touch-icon.png' }]
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: HOST,
      siteName: 'codesampa.io',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: t('title')
        }
      ],
      locale: locale === PT_BR ? PT_BR : EN_US,
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: ['/og-image.png'],
      creator: '@sampaiogabriel'
    }
  };
}

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Params;
}>) {
  const { locale } = await params;

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} scroll-smooth`}
    >
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} antialiased flex flex-col min-h-screen`}
      >
        <NextIntlClientProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            disableTransitionOnChange
          >
            <Header />
            <Toaster />
            <main className="grow">{children}</main>
            <Footer />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
