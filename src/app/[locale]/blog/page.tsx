import { posts } from '.velite';

import { getLocale } from 'next-intl/server';

import { BlogList } from '@/components/pages/blog/blog-list';

export const metadata = {
  title: 'Blog | codesampa.io',
  description: 'Insights on Software Engineering, Architecture, and Design.'
};

export default async function BlogPage() {
  const locale = await getLocale();

  const initialPosts = posts
    .filter((post) => post.published && post.locale === locale)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return <BlogList initialPosts={initialPosts} />;
}
