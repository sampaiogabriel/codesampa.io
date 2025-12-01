'use client';

import { useTranslations } from 'next-intl';

import { LIST_PROJECTS } from '@/utils/constants/projects';

import CardProject from './card-project';

export function TimelinePortfolio() {
  const t = useTranslations('Pages.Home.SelectedWork');

  return (
    <section
      className="relative w-full overflow-hidden bg-background p-4"
      aria-label={t('title')}
    >
      <div className="pointer-events-none absolute right-0 top-1/2 h-[300px] w-[300px] -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[100px] md:h-[500px] md:w-[500px] md:blur-[120px]" />

      <div className="container mx-auto px-6 max-w-7xl">
        <div className="mb-16 flex flex-col items-start justify-between gap-8 border-b border-border/50 pb-8 md:mb-24 md:flex-row md:items-end">
          <div className="flex-1">
            <div className="mb-4 flex items-center gap-2 text-blue-500">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500"></span>
              </span>
              <span className="text-xs font-bold uppercase tracking-widest">
                {t('badge')}
              </span>
            </div>
            <h2 className="font-display text-4xl font-black text-foreground md:text-6xl">
              {t('title')}
            </h2>
          </div>

          <p className="mb-2 max-w-sm text-sm text-muted-foreground md:text-base">
            {t('subtitle')}
          </p>
        </div>

        <div className="flex flex-col">
          {LIST_PROJECTS.map((project, index) => (
            <CardProject key={project.key} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
