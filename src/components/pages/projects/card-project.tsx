import {
  useScroll,
  useTransform,
  useSpring,
  useInView,
  motion
} from 'framer-motion';
import {
  ArrowUpRight,
  Github,
  MessageSquarePlus,
  CheckCircle2
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRef } from 'react';

import { LIST_PROJECTS, TECH_ICONS } from '@/utils/constants/projects';
import { cn } from '@/utils/functions/tw-merge';

const CardProject = ({
  project,
  index
}: {
  project: (typeof LIST_PROJECTS)[0];
  index: number;
}) => {
  const t = useTranslations('Pages.Projects');
  const cardRef = useRef<HTMLDivElement>(null);

  const isReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);
  const smoothY = useSpring(y, { stiffness: 100, damping: 20 });
  const finalY = isReducedMotion ? 0 : smoothY;

  const isInView = useInView(cardRef, { once: true, margin: '-10%' });

  // Criamos uma constante para o ícone para usá-lo como JSX
  const ProjectIcon = project.icon;

  return (
    <motion.article
      layout
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6 }}
      className="group relative mb-20 grid w-full grid-cols-1 gap-8 last:mb-0 lg:min-h-[500px] lg:grid-cols-2 lg:items-center lg:gap-16"
    >
      <div
        className={cn(
          'flex flex-col gap-8 z-10',
          index % 2 === 1 ? 'lg:order-2' : ''
        )}
      >
        {/* Cabeçalho */}
        <div>
          <div className="mb-4 flex items-center gap-3">
            <div
              className={cn(
                'p-2 rounded-lg bg-linear-to-br bg-opacity-10 bg-clip-border border border-white/10 text-white shadow-lg',
                project.color
              )}
            >
              {/* Renderizamos o componente aqui passando o size */}
              <ProjectIcon size={24} />
            </div>
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-muted-foreground">
              {t(`projects.${project.key}.category`) || 'Case Study'}
            </span>
          </div>

          <h3 className="mb-4 font-space text-3xl font-black leading-tight text-white md:text-5xl">
            {t(`projects.${project.key}.title`)}
          </h3>

          <p className="text-base leading-relaxed text-muted-foreground">
            {t(`projects.${project.key}.description`)}
          </p>
        </div>

        {/* Grid de Métricas de Impacto */}
        <div className="grid grid-cols-3 gap-4 border-y border-white/5 py-6">
          {project.metrics?.map((metricId, i) => (
            <div key={i} className="flex flex-col gap-1">
              <span className="text-2xl font-bold text-foreground">
                {t(`projects.${project.key}.metrics_data.${i}.value`)}
              </span>
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                {t(`projects.${project.key}.metrics_data.${i}.label`)}
              </span>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-4">
          {project.tags.map((tag) => {
            const Icon = TECH_ICONS[tag] || CheckCircle2;
            return (
              <div
                key={tag}
                className="group/icon relative flex items-center justify-center p-2 rounded-md bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-colors cursor-help"
              >
                <Icon size={18} className="text-slate-300" />
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-black text-[10px] text-white rounded opacity-0 group-hover/icon:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  {tag}
                </span>
              </div>
            );
          })}
        </div>

        {/* Botões de Ação */}
        <div className="flex flex-wrap items-center gap-4 pt-2">
          {project.isProduct ? (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-bold text-background transition-transform hover:scale-105"
            >
              {t('cta_access_product')} <ArrowUpRight size={16} />
            </a>
          ) : (
            <>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-bold text-background transition-transform hover:scale-105"
              >
                {t('cta_case_study')} <ArrowUpRight size={16} />
              </a>

              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/10 p-3 text-white transition-colors hover:bg-white/10 hover:text-primary"
                aria-label="GitHub Repo"
              >
                <Github size={20} />
              </a>
            </>
          )}

          <Link
            href="/contact"
            className="ml-auto flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-primary transition-colors uppercase tracking-widest"
          >
            <MessageSquarePlus size={16} />
            {t('cta_want_similar') || 'I want this'}
          </Link>
        </div>
      </div>

      {/* --- COLUNA DA IMAGEM --- */}
      <div
        className={cn(
          'relative w-full overflow-hidden rounded-2xl border border-white/10 bg-card shadow-2xl transition-all hover:border-white/20',
          index % 2 === 1 ? 'lg:order-1' : '',
          'h-[350px] md:h-[450px] lg:h-[600px]'
        )}
      >
        <div
          className={cn(
            'absolute inset-0 z-0 bg-linear-to-br opacity-25 blur-3xl filter saturate-150 transition-all duration-500 group-hover:opacity-40',
            project.color
          )}
        />
        <div className="absolute inset-0 z-20 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-60" />

        <motion.div
          style={{ y: finalY, scale: 1.05 }}
          className="absolute inset-0 z-10 h-[120%] w-full"
        >
          <div
            className={cn(
              'h-full w-full bg-linear-to-br opacity-20',
              project.color
            )}
          />

          <div className="absolute bottom-[-5%] left-[10%] right-[10%] top-[10%] rounded-t-xl border border-white/10 bg-[#0B0C10] p-4 shadow-2xl transition-transform duration-500 group-hover:-translate-y-4">
            <div className="relative h-full w-full overflow-hidden rounded bg-slate-900/80 flex items-center justify-center">
              <span className="text-white/20 font-mono text-sm">
                Project Preview
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.article>
  );
};

export default CardProject;
