'use client';

import { Post } from '.velite';

import { format } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Calendar } from 'lucide-react';
import Link from 'next/link';
import { useTranslations, useFormatter } from 'next-intl';
import { useMemo, useState } from 'react';

import { FilterBar } from '@/components/ui/filter-bar';

import { HeaderNewsletter } from './header-newsletter';

export function List({ posts }: { posts: Post[] }) {
  const t = useTranslations('Components.Pages.Blog.List');
  const formatTime = useFormatter();

  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const blogCategories = useMemo(() => {
    const allTags = posts.flatMap((post) => post.tags);
    const uniqueTags = Array.from(new Set(allTags)).sort();

    return [
      { id: 'all', label: t('categories.all') },
      ...uniqueTags.map((tag) => ({ id: tag, label: tag }))
    ];
  }, [posts, t]);

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
      <div className="mx-auto">
        <FilterBar
          categories={blogCategories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          onSearch={setSearchQuery}
          placeholder={t('search_placeholder')}
        />
      </div>

      <HeaderNewsletter />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1 xl:gap-8 min-h-[200px]">
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
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-card/30 p-6 md:p-8 transition-all duration-300 hover:border-primary/30 hover:bg-card/50 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between text-xs font-mono text-muted-foreground/80">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} className="text-primary" />
                      <time dateTime={post.date}>
                        {formatTime.dateTime(new Date(post.date), {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </time>
                    </div>

                    <div className="hidden sm:flex gap-2">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-full bg-white/5 border border-white/5 text-[10px] text-muted-foreground group-hover:border-primary/20 group-hover:text-primary/80 transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    {/* ADICIONADO: line-clamp-2 e overflow-hidden para o Título */}
                    <h2 className="text-2xl md:text-3xl font-bold font-space text-foreground group-hover:text-primary transition-colors line-clamp-2 overflow-hidden text-ellipsis">
                      <Link
                        href={`/blog/${post.slugAsParams}`}
                        className="before:absolute before:inset-0 focus:outline-none"
                      >
                        {post.title}
                      </Link>
                    </h2>

                    {/* ADICIONADO: line-clamp-3 e overflow-hidden para a Descrição */}
                    <p className="text-muted-foreground leading-relaxed line-clamp-3 overflow-hidden text-ellipsis text-sm md:text-base">
                      {post.description}
                    </p>
                  </div>
                </div>

                <div className="mt-8 flex items-center justify-between pt-6 border-t border-white/5 group-hover:border-primary/10 transition-colors">
                  <div className="flex sm:hidden gap-2">
                    {post.tags.slice(0, 1).map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] text-muted-foreground bg-white/5 px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <span className="flex items-center gap-2 text-sm font-bold text-white group-hover:text-primary transition-colors ml-auto">
                    {t('read_article')}
                    <ArrowRight
                      size={16}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </span>
                </div>
              </motion.article>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 col-span-full text-muted-foreground border border-dashed border-white/10 rounded-2xl bg-white/5"
            >
              <p>{t('empty_state')}</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                }}
                className="mt-2 text-primary hover:underline text-sm font-medium cursor-pointer"
              >
                {t('clear_filters')}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
