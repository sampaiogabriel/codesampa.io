import { posts } from '.velite';

import { format } from 'date-fns';
import { getLocale } from 'next-intl/server';
import Link from 'next/link';

import { AnimatedBadge } from '@/components/ui/animated-badge';

export const metadata = {
  title: 'Blog | codesampa.io',
  description: 'Insights on Software Engineering, Architecture, and Design.'
};

export default async function BlogPage() {
  const locale = await getLocale();

  const displayPosts = posts
    .filter((post) => post.published && post.locale.startsWith(locale))
    .sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

  return (
    <div className="container mx-auto px-4 py-24 max-w-4xl">
      <div className="mb-16 text-center">
        <AnimatedBadge className="mb-4">Engineering Log</AnimatedBadge>
        <h1 className="font-space text-4xl font-black text-foreground md:text-6xl tracking-tight mb-4">
          Technical <span className="text-primary">Insights.</span>
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Deep dives into software architecture, design systems, and the future
          of web development.
        </p>
      </div>

      <div className="grid gap-8">
        {displayPosts.map((post) => (
          <article
            key={post.slug}
            className="group relative flex flex-col md:flex-row gap-6 border border-white/10 bg-card/30 p-6 rounded-2xl transition-all hover:border-primary/30 hover:bg-card/50"
          >
            <div className="flex-1 flex flex-col justify-center">
              <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3 font-mono">
                <time dateTime={post.date}>
                  {format(new Date(post.date), 'MMMM dd, yyyy')}
                </time>
                <span>•</span>
                <div className="flex gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-primary/80 bg-primary/10 px-2 py-0.5 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <h2 className="text-2xl font-bold font-space mb-2 group-hover:text-primary transition-colors">
                <Link href={`/blog/${post.slugAsParams}`}>{post.title}</Link>
              </h2>

              <p className="text-muted-foreground leading-relaxed">
                {post.description}
              </p>

              <div className="mt-4">
                <span className="text-sm font-bold text-white border-b border-primary/50 pb-0.5 group-hover:border-primary transition-all">
                  Read Article
                </span>
              </div>
            </div>
          </article>
        ))}

        {posts.length === 0 && (
          <div className="text-center py-20 text-muted-foreground border border-dashed border-white/10 rounded-2xl">
            <p>No articles found for this language yet.</p>
            <p className="text-sm mt-2 opacity-50">
              Initializing knowledge base...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
