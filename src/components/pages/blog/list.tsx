'use client';

import { Post } from '.velite';

import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Calendar, Hash } from 'lucide-react';
import Link from 'next/link';
import { useTranslations, useFormatter } from 'next-intl';
import { useState, useMemo } from 'react';

import { FilterBar } from '@/components/ui/filter-bar';

import { HeaderNewsletter } from './header-newsletter';
import { FileExplorer } from './filter-explorer';

export function List({ posts }: { posts: Post[] }) {
  const t = useTranslations('Components.Pages.Blog.List');
  const formatTime = useFormatter();

  // --- ESTADOS (Apenas para Mobile/Tablet) ---
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // --- LÓGICA MOBILE: Categorias e Filtragem ---
  const blogCategories = useMemo(() => {
    const allTags = posts.flatMap((post) => post.tags);
    const uniqueTags = Array.from(new Set(allTags)).sort();
    return [
      { id: 'all', label: t('categories.all') },
      ...uniqueTags.map((tag) => ({ id: tag, label: tag }))
    ];
  }, [posts, t]);

  const mobileFilteredPosts = posts.filter((post) => {
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

  const desktopPosts = posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const PostCard = ({ post, index }: { post: Post; index: number }) => (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-white/10 bg-card/20 p-6 md:p-8 transition-all duration-300 hover:border-primary/30 hover:bg-card/40 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1"
    >
      <div className="flex flex-col gap-4">
        {/* Meta Info */}
        <div className="flex items-center justify-between text-xs font-mono text-muted-foreground/70">
          <div className="flex items-center gap-2">
            <Calendar size={13} className="text-primary/70" />
            <time dateTime={post.date} className="tracking-wide">
              {formatTime.dateTime(new Date(post.date), {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })}
            </time>
          </div>

          <div className="hidden sm:flex gap-2">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded text-[10px] bg-white/5 text-muted-foreground border border-transparent group-hover:border-white/10 transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Conteúdo */}
        <div className="space-y-3">
          <h2 className="text-2xl font-bold font-space text-foreground group-hover:text-primary transition-colors line-clamp-2">
            <Link
              href={`/blog/${post.slugAsParams}`}
              className="before:absolute before:inset-0 focus:outline-none"
            >
              {post.title}
            </Link>
          </h2>

          <p className="text-muted-foreground/80 leading-relaxed line-clamp-2 text-sm md:text-base">
            {post.description}
          </p>
        </div>
      </div>

      {/* Footer do Card */}
      <div className="mt-8 flex items-center pt-6 border-t border-white/5 group-hover:border-primary/10 transition-colors">
        <div className="flex sm:hidden gap-2">
          {post.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="text-[10px] bg-white/5 px-2 py-0.5 rounded text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
        <span className="flex items-center gap-2 text-xs font-bold font-mono uppercase tracking-wider text-primary/80 group-hover:text-primary transition-colors ml-auto">
          {t('read_article')}
          <ArrowRight
            size={14}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </span>
      </div>
    </motion.article>
  );

  return (
    <div className="flex flex-col gap-10 max-w-[1400px] mx-auto">
      {/* 1. Newsletter Global */}
      <div className="w-full">
        <HeaderNewsletter />
      </div>

      {/* =========================================================
          VIEW MOBILE / TABLET (< 1024px)
          Usa FilterBar + Lista Filtrada
         ========================================================= */}
      <div className="flex flex-col gap-8 lg:hidden">
        <FilterBar
          categories={blogCategories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          onSearch={setSearchQuery}
          placeholder={t('search_placeholder')}
          className="mb-0"
        />

        <div className="grid gap-6 grid-cols-1">
          <AnimatePresence mode="popLayout">
            {mobileFilteredPosts.length > 0 ? (
              mobileFilteredPosts.map((post, i) => (
                <PostCard key={post.slug} post={post} index={i} />
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20 border border-dashed border-white/10 rounded-xl bg-white/5"
              >
                <p className="text-muted-foreground font-mono text-sm">
                  {t('empty_state')}
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory('all');
                  }}
                  className="mt-4 text-primary hover:underline text-xs font-bold uppercase tracking-widest"
                >
                  {t('clear_filters')}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* =========================================================
          VIEW DESKTOP (>= 1024px)
          Usa Layout Grid + File Explorer
         ========================================================= */}
      <div className="hidden lg:grid grid-cols-[1fr_340px] gap-8 items-start min-h-[calc(100vh-200px)]">
        {/* Coluna da Esquerda: Feed Cronológico */}
        <div className="flex flex-col gap-6 min-w-0">
          <div className="flex items-center gap-3 mb-2 opacity-60">
            <Hash size={16} className="text-primary" />
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-muted-foreground">
              Latest Entries
            </span>
            <div className="h-px flex-1 bg-linear-to-r from-white/10 to-transparent" />
          </div>

          <div className="grid gap-6 grid-cols-1">
            {desktopPosts.map((post, i) => (
              <PostCard key={post.slug} post={post} index={i} />
            ))}
          </div>
        </div>

        {/* Coluna da Direita: File Explorer (Sticky) */}
        <aside className="h-[calc(100vh-120px)] sticky top-24">
          <FileExplorer posts={posts} className="h-full" />
        </aside>
      </div>
    </div>
  );
}
