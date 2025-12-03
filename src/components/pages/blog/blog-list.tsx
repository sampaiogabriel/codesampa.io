'use client';

import { Post } from '.velite';

import { format } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

import { FilterBar } from '@/components/ui/filter-bar';

const BLOG_CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'Next.js', label: 'Next.js' },
  { id: 'Architecture', label: 'Architecture' },
  { id: 'React', label: 'React' },
  { id: 'Career', label: 'Career' }
];

export function BlogList({ posts }: { posts: Post[] }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = posts.filter((post) => {
    const matchesCategory =
      activeCategory === 'all' || post.tags.includes(activeCategory);

    const searchLower = searchQuery.toLowerCase();
    const matchesSearch =
      searchQuery === '' ||
      post.title.toLowerCase().includes(searchLower) ||
      (post.description &&
        post.description.toLowerCase().includes(searchLower));

    return matchesCategory && matchesSearch;
  });

  return (
    <div>
      <FilterBar
        categories={BLOG_CATEGORIES}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        onSearch={setSearchQuery}
        placeholder="Search articles..."
      />

      <div className="grid gap-8 min-h-[400px]">
        <AnimatePresence mode="popLayout">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <motion.article
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
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
                    <Link href={`/blog/${post.slugAsParams}`}>
                      {post.title}
                    </Link>
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
              </motion.article>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 text-muted-foreground border border-dashed border-white/10 rounded-2xl"
            >
              <p>No articles found matching your criteria.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                }}
                className="mt-2 text-primary hover:underline text-sm"
              >
                Clear filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
