import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { Geist, Geist_Mono, Space_Grotesk } from 'next/font/google';
import { Toaster } from 'sonner';

import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';
import { ThemeProvider } from '@/components/providers/theme';

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

export const metadata: Metadata = {
  title: 'codesampa.io',
  description: 'Personal Site & Blog'
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover'
};

type Params = Promise<{ locale: string }>;

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
