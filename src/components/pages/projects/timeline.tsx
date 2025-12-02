'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { LIST_PROJECTS, CATEGORIES } from '@/utils/constants/projects';
import { cn } from '@/utils/functions/tw-merge';

import CardProject from './card-project';

export function TimelinePortfolio() {
  const t = useTranslations('Pages.Projects');
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredProjects =
    activeCategory === 'all'
      ? LIST_PROJECTS
      : LIST_PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <section className="container mx-auto relative w-full overflow-hidden bg-background px-4 pt-16">
      {/* Background Glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-full max-w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-[100px] md:blur-[130px]" />

      <div className="container relative z-10">
        {/* Header */}
        <div className="mb-12 flex flex-col items-center justify-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/5 px-4 py-1.5"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-blue-500"></span>
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-blue-500">
              {t('badge')}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mb-6 max-w-4xl font-space text-4xl font-black text-foreground md:text-6xl leading-tight"
          >
            {t.rich('title', {
              highlight: (chunks) => (
                <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-purple-400 to-emerald-400 animate-gradient-x">
                  {chunks}
                </span>
              ),
              br: () => <br />
            })}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="max-w-xl text-muted-foreground text-lg leading-relaxed"
          >
            {t('subtitle')}
          </motion.p>
        </div>

        {/* --- [NOVO] FILTROS DE CATEGORIA --- */}
        <div className="mb-16 flex flex-wrap justify-center gap-2">
          {CATEGORIES.map((cat) => (
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
                  layoutId="activeCategory"
                  className="absolute inset-0 rounded-full bg-white/10 border border-white/5"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Lista de Projetos com AnimatePresence para transição suave */}
        <div className="flex flex-col gap-12 md:gap-24">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <CardProject key={project.key} project={project} index={index} />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
