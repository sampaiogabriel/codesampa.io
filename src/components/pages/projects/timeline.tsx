'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { FilterBar } from '@/components/ui/filter-bar';
import { PageTitle } from '@/components/ui/page-title';
import { LIST_PROJECTS, CATEGORIES } from '@/utils/constants/projects';

import CardProject from './card-project';

export function TimelinePortfolio() {
  const t = useTranslations('Pages.Projects');
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = LIST_PROJECTS.filter((project) => {
    const matchesCategory =
      activeCategory === 'all' || project.category === activeCategory;

    const searchLower = searchQuery.toLowerCase();
    const title = t(`projects.${project.key}.title`).toLowerCase();
    const desc = t(`projects.${project.key}.description`).toLowerCase();

    const matchesSearch =
      searchQuery === '' ||
      title.includes(searchLower) ||
      desc.includes(searchLower) ||
      project.tags.some((tag) => tag.toLowerCase().includes(searchLower));

    return matchesCategory && matchesSearch;
  });

  return (
    <section className="container mx-auto relative w-full overflow-hidden bg-background px-4 pt-16">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-full max-w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-[100px] md:blur-[130px]" />

      <div className="container relative z-10">
        <PageTitle
          badge={t('badge')}
          badgeColor="purple"
          title={t.rich('title', {
            highlight: (chunks) => (
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-purple-400 to-emerald-400 animate-gradient-x">
                {chunks}
              </span>
            ),
            br: () => <br />
          })}
          subtitle={t('subtitle')}
        />

        <FilterBar
          categories={CATEGORIES}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          onSearch={setSearchQuery}
          placeholder="Buscar projeto..."
        />

        <div className="flex flex-col gap-12 md:gap-24 min-h-[400px]">
          <AnimatePresence mode="popLayout">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project, index) => (
                <CardProject
                  key={project.key}
                  project={project}
                  index={index}
                />
              ))
            ) : (
              <div className="py-20 text-center text-muted-foreground">
                Nenhum projeto encontrado.
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
