import { posts } from '.velite';

import { getLocale, getTranslations } from 'next-intl/server';

import { List } from '@/components/pages/blog/list';
import { PageTitle } from '@/components/ui/page-title';

type Params = Promise<{ locale: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata.Blog' });

  return {
    title: t('title'),
    description: t('description')
  };
}

export default async function BlogPage() {
  const locale = await getLocale();
  const t = await getTranslations('Pages.Blog');

  const initialPosts = posts
    .filter((post) => post.published && post.locale === locale)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <section className="container mx-auto px-4 py-12 md:py-24 relative">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-full max-w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-300/10 blur-[100px] md:blur-[130px]" />

      <PageTitle
        badge={t('badge')}
        badgeColor="purple"
        title={
          <>
            {t('title_prefix')}{' '}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-purple-400 to-purple-200 animate-gradient-x">
              {t('title_highlight')}
            </span>
          </>
        }
        subtitle={t('subtitle')}
      />

      <List posts={initialPosts} />
    </section>
  );
}
