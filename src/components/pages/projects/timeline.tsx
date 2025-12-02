'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

import { LIST_PROJECTS } from '@/utils/constants/projects';

import CardProject from './card-project';

export function TimelinePortfolio() {
  const t = useTranslations('Pages.Projects');

  return (
    <section
      className="relative w-full overflow-hidden bg-background py-20 px-4 md:py-32"
      aria-label={t('title')}
    >
      {/* Background Glow Centralizado para dar destaque ao título */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-full max-w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-[100px] md:blur-[130px]" />

      <div className="container mx-auto relative z-10">
        {/* === HEADER CENTRALIZADO E CRIATIVO === */}
        <div className="mb-20 flex flex-col items-center justify-center text-center">
          {/* Badge Animado */}
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

          {/* Título */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mb-6 max-w-4xl font-space text-4xl font-black text-foreground md:text-6xl leading-tight"
          >
            {t('title')}
          </motion.h2>

          {/* Subtítulo */}
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

        {/* Lista de Projetos */}
        <div className="flex flex-col gap-12 md:gap-24">
          {LIST_PROJECTS.map((project, index) => (
            <CardProject key={project.key} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
