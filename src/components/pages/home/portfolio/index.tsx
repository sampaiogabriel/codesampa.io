'use client';

import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import {
  ArrowUpRight,
  Github,
  Smartphone,
  Monitor,
  Layers,
  ExternalLink
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import React, { useRef } from 'react';

import { cn } from '@/utils/functions/tw-merge';

// ==========================================
// CONFIGURAÇÃO DOS PROJETOS (Metadados não traduzíveis)
// ==========================================
const projectsConfig = [
  {
    key: 'kingfix',
    tags: ['Next.js 15', 'React Native', 'Neon DB', 'Prisma'],
    color: 'from-blue-600 to-cyan-500',
    icon: <Smartphone size={24} />,
    link: '#',
    repo: '#'
  },
  {
    key: 'devrex',
    tags: ['Node.js', 'OpenAI API', 'Postgres', 'Stripe'],
    color: 'from-violet-600 to-fuchsia-600',
    icon: <Layers size={24} />,
    link: '#',
    repo: '#'
  },
  {
    key: 'codesampa',
    tags: ['React', 'Framer Motion', 'Tailwind', 'Vercel'],
    color: 'from-emerald-500 to-teal-500',
    icon: <Monitor size={24} />,
    link: '#',
    repo: '#'
  }
];

// ==========================================
// SUB-COMPONENTE: PROJECT CARD
// ==========================================
const ProjectCard = ({
  project,
  index
}: {
  project: (typeof projectsConfig)[0];
  index: number;
}) => {
  const t = useTranslations('Pages.Home.SelectedWork');
  const cardRef = useRef<HTMLDivElement>(null);
  
  const isReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start']
  });

  // Parallax suave apenas se não houver preferência por redução de movimento
  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);
  const smoothY = useSpring(y, { stiffness: 100, damping: 20 });
  const finalY = isReducedMotion ? 0 : smoothY;

  // Animação de entrada
  const isInView = useInView(cardRef, { once: true, margin: "-10%" });

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="group relative mb-20 grid w-full grid-cols-1 gap-8 last:mb-0 lg:min-h-[500px] lg:grid-cols-2 lg:items-center lg:gap-12"
    >
      {/* --- COLUNA DE TEXTO --- */}
      {/* Order-2 no desktop para itens ímpares para criar o efeito zigue-zague */}
      <div
        className={cn(
          "flex flex-col gap-6 z-10",
          index % 2 === 1 ? "lg:order-2" : ""
        )}
      >
        {/* Cabeçalho do Card */}
        <div>
          <div className="mb-4 flex items-center gap-3">
            <div
              className={cn(
                "p-2 rounded-lg bg-gradient-to-br bg-opacity-10 bg-clip-border border border-white/10 text-white shadow-lg",
                project.color
              )}
            >
              {project.icon}
            </div>
            <span className="font-mono text-sm font-bold uppercase tracking-widest text-cyan-500">
              0{index + 1} — {t(`projects.${project.key}.category`)}
            </span>
          </div>

          <h3 className="mb-4 font-display text-3xl font-black leading-tight text-white md:text-5xl">
            {t(`projects.${project.key}.title`)}
          </h3>

          <p className="max-w-md text-lg leading-relaxed text-muted-foreground">
            {t(`projects.${project.key}.description`)}
          </p>
        </div>

        {/* Stat Highlight */}
        <div className="border-l-2 border-primary/50 pl-4">
          <p className="font-bold text-foreground">
            {t(`projects.${project.key}.stats`)}
          </p>
        </div>

        {/* Tags */}
        <ul className="flex flex-wrap gap-2" aria-label="Tecnologias utilizadas">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-white/5 bg-white/5 px-3 py-1 text-xs font-medium text-slate-300 transition-colors hover:border-white/10 hover:bg-white/10"
            >
              {tag}
            </li>
          ))}
        </ul>

        {/* Botões de Ação */}
        <div className="mt-2 flex items-center gap-4">
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-bold text-background transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
            aria-label={`${t('cta_case_study')} - ${t(`projects.${project.key}.title`)}`}
          >
            {t('cta_case_study')} <ArrowUpRight size={16} />
          </a>
          <a
            href={project.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-white/10 p-3 text-white transition-colors hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
            aria-label={`${t('cta_repo')} - ${t(`projects.${project.key}.title`)}`}
          >
            <Github size={20} />
          </a>
        </div>
      </div>

      {/* --- COLUNA DA IMAGEM (PARALLAX VISUAL) --- */}
      <div
        className={cn(
          "relative w-full overflow-hidden rounded-2xl border border-white/10 bg-card shadow-2xl transition-all hover:border-white/20",
          index % 2 === 1 ? "lg:order-1" : "",
          // Altura automática no mobile, fixa no desktop
          "h-[300px] md:h-[400px] lg:h-[500px]"
        )}
      >
        {/* Overlay de Brilho no Hover */}
        <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-40" />

        {/* A IMAGEM QUE SE MOVE (Mockup) */}
        <motion.div
          style={{ y: finalY, scale: 1.1 }}
          className="absolute inset-0 h-[120%] w-full bg-slate-900"
        >
          {/* Fundo Gradiente Abstrato (Placeholder da imagem) */}
          <div
            className={cn(
              "h-full w-full bg-gradient-to-br opacity-20",
              project.color
            )}
          />

          {/* Mockup Abstrato (UI Fake) - Centralizado */}
          <div className="absolute bottom-[-10%] left-[10%] right-[10%] top-[15%] rounded-t-xl border border-white/10 bg-[#0B0C10] p-4 shadow-2xl opacity-90 transition-transform duration-500 group-hover:-translate-y-2">
            <div className="relative h-full w-full overflow-hidden rounded bg-slate-900/50">
              {/* Header Fake */}
              <div className="flex h-8 items-center gap-2 border-b border-white/5 px-4">
                <div className="h-2 w-2 rounded-full bg-red-500/20" />
                <div className="h-2 w-2 rounded-full bg-yellow-500/20" />
                <div className="h-2 w-2 rounded-full bg-green-500/20" />
              </div>
              {/* Body Fake */}
              <div className="grid grid-cols-2 gap-4 p-4">
                <div className="h-24 rounded-lg bg-white/5" />
                <div className="h-24 rounded-lg bg-white/5" />
                <div className="col-span-2 h-16 rounded-lg bg-white/5" />
                <div className="col-span-2 h-32 rounded-lg bg-white/5 animate-pulse opacity-50" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Botão Flutuante no Centro (Decorativo/Ação extra) */}
        <div className="absolute inset-0 z-30 flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none">
          <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md">
            <ExternalLink className="text-white" />
          </div>
        </div>
      </div>
    </motion.article>
  );
};

export function SelectedWork() {
  const t = useTranslations('Pages.Home.SelectedWork');

  return (
    <section 
      className="relative w-full overflow-hidden bg-background py-20 md:py-32"
      aria-label={t('title')}
    >
      {/* Luz de Fundo Decorativa */}
      <div className="pointer-events-none absolute right-0 top-1/2 h-[300px] w-[300px] -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[100px] md:h-[500px] md:w-[500px] md:blur-[120px]" />

      <div className="container mx-auto px-6 max-w-7xl">
        {/* Header da Seção */}
        <div className="mb-16 flex flex-col items-start justify-between gap-8 border-b border-border/50 pb-8 md:mb-24 md:flex-row md:items-end">
          <div className="flex-1">
            <div className="mb-4 flex items-center gap-2 text-cyan-500">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-500"></span>
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

        {/* Lista de Projetos */}
        <div className="flex flex-col">
          {projectsConfig.map((project, index) => (
            <ProjectCard key={project.key} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}