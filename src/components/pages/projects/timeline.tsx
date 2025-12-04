'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { FilterBar } from '@/components/ui/filter-bar';
import {
  LIST_PROJECTS,
  LIST_SECONDARY_PROJECTS,
  CATEGORIES
} from '@/utils/constants/projects';

import CardProject from './card-project';
import { CardProjectSecondary } from './card-project-secondary';
import { Cta } from './cta';

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

  const secondaryProjects = LIST_SECONDARY_PROJECTS;

  return (
    <>
      <FilterBar
        categories={CATEGORIES}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        onSearch={setSearchQuery}
        placeholder={t('placeholder')}
      />

      <div className="flex flex-col gap-12 min-h-[400px]">
        <AnimatePresence mode="popLayout">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => (
              <CardProject key={project.key} project={project} index={index} />
            ))
          ) : (
            // Exibe mensagem apenas se a busca não retornar nada nos principais
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-20 text-center text-muted-foreground"
            >
              {t('empty')}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="border-t border-white/5">
          {secondaryProjects.length > 0 && (
            <>
              <h3 className="mb-4 mt-4 font-space text-2xl font-bold text-white text-center md:text-left">
                {t('more_projects')}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {secondaryProjects.map((project, index) => (
                  <CardProjectSecondary
                    key={project.key}
                    project={project}
                    index={index}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        <Cta />
      </div>
    </>
  );
}
