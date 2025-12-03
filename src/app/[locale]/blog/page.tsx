import { posts } from '.velite';

import { getLocale } from 'next-intl/server';

import { BlogList } from '@/components/pages/blog/blog-list';
import { PageTitle } from '@/components/ui/page-title';

export const metadata = {
  title: 'Blog | codesampa.io',
  description: 'Insights on Software Engineering, Architecture, and Design.'
};

export default async function BlogPage() {
  const locale = await getLocale();

  const initialPosts = posts
    .filter((post) => post.published && post.locale === locale)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="container mx-auto px-4 py-24 max-w-4xl">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-full max-w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-[100px] md:blur-[130px]" />
      <PageTitle
        badge="Engineering Log"
        badgeColor="purple"
        title={
          <>
            Technical <span className="text-primary">Insights.</span>
          </>
        }
        subtitle="Deep dives into software architecture, design systems, and the future of web development."
      />

      <BlogList posts={initialPosts} />
    </div>
  );
}
