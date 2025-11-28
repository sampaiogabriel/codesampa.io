'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Cpu,
  TerminalSquare,
  GitPullRequest,
  Rocket
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import React, { useRef } from 'react';

import { cn } from '@/utils/functions/tw-merge';
import useIsMobile from '@/utils/hooks/use-mobile';

import {
  ArchitectureVisual,
  DevelopmentVisual,
  TestingVisual,
  DeployVisual
} from './pipeline-visuals';

export function EngineeringPipeline() {
  const t = useTranslations('Pages.Home.Pipeline');
  const targetRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  // Scroll Progress apenas se não for mobile para performance
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end']
  });

  // Transformação horizontal apenas desktop
  const x = useTransform(scrollYProgress, [0, 1], ['2%', '-75%']);

  const steps = [
    {
      id: '01',
      key: '01',
      visual: <ArchitectureVisual />,
      icon: <Cpu size={18} />,
      color: 'border-cyan-500'
    },
    {
      id: '02',
      key: '02',
      visual: <DevelopmentVisual />,
      icon: <TerminalSquare size={18} />,
      color: 'border-blue-500'
    },
    {
      id: '03',
      key: '03',
      visual: <TestingVisual />,
      icon: <GitPullRequest size={18} />,
      color: 'border-emerald-500'
    },
    {
      id: '04',
      key: '04',
      visual: <DeployVisual />,
      icon: <Rocket size={18} />,
      color: 'border-indigo-500'
    }
  ];

  return (
    <section
      ref={targetRef}
      // Mobile: h-auto (conteúdo define altura). Desktop: 300vh (para scroll horizontal)
      className="relative bg-background md:h-[300vh] overflow-x-clip"
      aria-label={t('title')}
    >
      {/* === BACKGROUND IDENTICO AO HERO === */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      <div className="absolute top-[-10%] left-1/2 h-[500px] w-full max-w-[1000px] -translate-x-1/2 rounded-[100%] bg-primary/20 blur-[100px] md:h-[700px] md:blur-[130px]" />
      <div className="absolute bottom-[-10%] left-1/2 h-[300px] w-full max-w-[800px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-[80px]" />

      {/* Container Sticky apenas no Desktop */}
      <div className="container mx-auto flex h-full w-full flex-col justify-start md:sticky md:top-0 md:h-screen md:justify-center md:overflow-hidden">
        
        {/* Cabeçalho da Seção */}
        <header className="px-6 py-12 md:absolute md:left-20 md:top-12 md:z-20 md:p-0">
          <div className="mb-2 flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-500"></span>
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-500">
              {t('badge')}
            </span>
          </div>
          <h2 className="font-display text-3xl font-black text-foreground md:text-5xl">
            {t.rich('title', {
              br: () => <br />
            })}
          </h2>
        </header>

        {/* Linha do Tempo (Apenas Desktop - Decorativo) */}
        <div className="hidden md:block">
          <div className="absolute left-0 top-1/2 h-[1px] w-full -translate-y-1/2 bg-border" aria-hidden="true" />
          <div className="absolute left-0 top-1/2 h-[1px] w-24 -translate-y-1/2 bg-gradient-to-r from-transparent to-cyan-500" aria-hidden="true" />
        </div>

        {/* Lista de Steps */}
        {/* Mobile: Grid vertical simples. Desktop: Motion horizontal */}
        <div className="px-6 pb-20 md:px-0 md:pb-0 relative z-10">
          <motion.ol
            style={!isMobile ? { x } : {}}
            className="flex flex-col gap-8 md:flex-row md:gap-12 md:pl-20 md:pr-20"
          >
            {steps.map((step) => {
              // Pegando traduções dinamicamente baseada no ID
              const title = t(`steps.${step.key}.title`);
              const subtitle = t(`steps.${step.key}.subtitle`);
              const desc = t(`steps.${step.key}.description`);

              return (
                // [CORREÇÃO ULTRAWIDE]: Adicionado md:flex-none para impedir que o flexbox tente "espremer" ou esticar os cards em telas muito largas.
                <li key={step.id} className="group relative md:flex-none">
                  <article className="relative flex h-auto w-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl transition-colors hover:border-primary/20 md:h-[450px] md:w-[450px]">
                    
                    {/* Header do Card (Estilo Terminal) */}
                    <header className="flex h-10 items-center justify-between border-b border-border bg-muted/30 px-4">
                      <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
                        <span aria-label={`Step ${step.id}`}>{step.id}</span>
                        <span className="text-border">/</span>
                        <span className="uppercase tracking-wider">{subtitle}</span>
                      </div>
                      <div
                        className={cn(
                          "h-2 w-2 rounded-full border bg-opacity-20",
                          step.color
                        )}
                      />
                    </header>

                    {/* Área Visual */}
                    <div className="relative h-[200px] flex-1 overflow-hidden bg-black/20 md:h-auto">
                      {step.visual}
                    </div>

                    {/* Footer com Conteúdo */}
                    <div className="border-t border-border bg-card p-6 md:h-36">
                      <h3 className="mb-2 flex items-center gap-2 text-xl font-bold text-card-foreground">
                        <span className="text-primary">{step.icon}</span>
                        {title}
                      </h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {desc}
                      </p>
                    </div>
                  </article>

                  {/* Conector Visual (Bolinha na linha) - Apenas Desktop */}
                  <div 
                    className="absolute -left-6 top-1/2 z-10 hidden h-4 w-4 -translate-y-1/2 rounded-full border-2 border-border bg-background transition-colors group-hover:border-cyan-400 md:block"
                    aria-hidden="true"
                  >
                    <div className="h-full w-full rounded-full bg-cyan-400 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  </div>
                </li>
              );
            })}
          </motion.ol>
        </div>

        {/* Footer info (Apenas Desktop) */}
        <div className="absolute bottom-8 right-8 hidden text-right md:block">
          <p className="font-mono text-xs text-muted-foreground/60">
            {t('scroll_hint')}
          </p>
        </div>
      </div>
    </section>
  );
}