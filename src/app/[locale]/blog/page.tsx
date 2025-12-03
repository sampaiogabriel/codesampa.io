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
