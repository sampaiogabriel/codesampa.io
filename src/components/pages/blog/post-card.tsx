'use client';

import { Post } from '.velite';

import { format } from 'date-fns';
import { enUS, ptBR } from 'date-fns/locale';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Link } from '@/lib/i18n/navigation';

export function PostCard({
  post,
  index,
  locale
}: {
  post: Post;
  index: number;
  locale: string;
}) {
  const t = useTranslations('Components.Pages.Blog.List');
  const dateLocale = locale === 'pt-BR' ? ptBR : enUS;

  return (
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
              {format(new Date(post.date), 'MMM dd, yyyy', {
                locale: dateLocale
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
}
