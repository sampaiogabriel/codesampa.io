'use client';

import { format } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Calendar, Search } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useState } from 'react';

import { PageTitle } from '@/components/ui/page-title';
import { cn } from '@/utils/functions/tw-merge';

// Definição do tipo para os posts que vêm do Velite
interface Post {
  slug: string;
  slugAsParams: string;
  title: string;
  description?: string;
  date: string;
  tags: string[];
  published: boolean;
  locale: string;
}

interface BlogListProps {
  initialPosts: Post[];
}

export function BlogList({ initialPosts }: BlogListProps) {
  const t = useTranslations('Pages.Blog');
  const [activeCategory, setActiveCategory] = useState('all');

  // Categorias (Hardcoded por agora, mas podem vir dinamicamente)
  const categories = [
    { id: 'all', label: t('categories.all') },
    { id: 'Tech', label: t('categories.tech') },
    { id: 'Design', label: t('categories.design') },
    { id: 'Career', label: t('categories.career') }
  ];

  const filteredPosts = initialPosts.filter((post) => {
    if (activeCategory === 'all') return true;
    return post.tags.some(
      (tag) => tag.toLowerCase() === activeCategory.toLowerCase()
    );
  });

  return (
    <div className="container mx-auto px-4 py-16">
      <PageTitle
        badge="Engineering Log"
        badgeColor="blue"
        title={
          <>
            Technical <span className="text-primary">Insights.</span>
          </>
        }
        subtitle="Deep dives into software architecture, design systems, and the future of web development."
      />

      {/* Barra de Filtragem */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="mb-16 flex flex-wrap justify-center gap-2"
      >
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={cn(
              'relative rounded-full px-4 py-2 text-sm font-medium transition-all duration-300',
              activeCategory === cat.id
                ? 'text-white'
                : 'text-muted-foreground hover:text-white hover:bg-white/5'
            )}
          >
            {activeCategory === cat.id && (
              <motion.div
                layoutId="activeCategoryBlog"
                className="absolute inset-0 rounded-full bg-white/10 border border-white/5"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative z-10">{cat.label}</span>
          </button>
        ))}
      </motion.div>

      {/* Grid de Posts */}
      <div className="grid gap-8 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {filteredPosts.map((post) => (
            <motion.article
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              key={post.slug}
              className="group relative flex flex-col justify-between h-full border border-white/10 bg-white/5 p-8 rounded-3xl overflow-hidden transition-all hover:border-primary/30 hover:bg-white/10"
            >
              {/* Background Glow no Hover */}
              <div className="absolute inset-0 bg-linear-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-6 font-mono uppercase tracking-wider">
                  <div className="flex items-center gap-1.5">
                    <Calendar size={12} />
                    <time dateTime={post.date}>
                      {format(new Date(post.date), 'MMM dd, yyyy')}
                    </time>
                  </div>
                  <div className="flex gap-2">
                    {post.tags.map((tag) => (
                      <span key={tag} className="text-primary">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <h2 className="text-2xl md:text-3xl font-bold font-space mb-4 group-hover:text-primary transition-colors leading-tight">
                  <Link
                    href={`/blog/${post.slugAsParams}`}
                    className="before:absolute before:inset-0"
                  >
                    {post.title}
                  </Link>
                </h2>

                <p className="text-muted-foreground leading-relaxed mb-6 line-clamp-3">
                  {post.description}
                </p>
              </div>

              <div className="relative z-10 flex items-center text-sm font-bold text-white mt-auto group/link">
                {t('read_more')}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/link:translate-x-1 text-primary" />
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </div>

      {filteredPosts.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-32 border border-dashed border-white/10 rounded-3xl bg-white/5"
        >
          <div className="text-4xl mb-4 text-muted-foreground">
            <Search size={48} strokeWidth={1} />
          </div>
          <p className="text-lg font-medium text-white">{t('no_posts')}</p>
          <p className="text-muted-foreground">{t('no_posts_sub')}</p>
        </motion.div>
      )}
    </div>
  );
}
