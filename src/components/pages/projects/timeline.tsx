'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { FilterBar } from '@/components/ui/filter-bar';
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
    <>
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
              <CardProject key={project.key} project={project} index={index} />
            ))
          ) : (
            <div className="py-20 text-center text-muted-foreground">
              Nenhum projeto encontrado.
            </div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
